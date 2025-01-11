import { promises as fs } from 'fs'
import path from 'path'
import { type Idea, type User } from '@prisma/client'
import _ from 'lodash'
import Handlebars from 'handlebars'
import { sendEmailThroughBrevo } from './brevo'
import { env } from './env'

async function findHtmlFiles(directory: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true })

    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(directory, entry.name)
        if (entry.isDirectory()) {
          return findHtmlFiles(fullPath)
        } else if (path.extname(entry.name) === '.html') {
          return [fullPath]
        }
        return []
      })
    )

    return files.flat()
  } catch (error) {
    // @ts-ignore
    if (error.code === 'ENOENT') {
      console.error(`Directory not found: ${directory}`)
    } else {
      console.error(`Error reading directory: ${error}`)
    }
    return []
  }
}

const getHbrTemplates = _.memoize(async () => {
  const baseDir = path.resolve(__dirname, '../emails/dist')
  const htmlPaths = await findHtmlFiles(baseDir)
  const hbrTemplates: Record<string, HandlebarsTemplateDelegate> = {}

  for (const htmlPath of htmlPaths) {
    const templateName = path.basename(htmlPath, '.html')
    const htmlTemplate = await fs.readFile(htmlPath, 'utf8')
    hbrTemplates[templateName] = Handlebars.compile(htmlTemplate)
  }
  return hbrTemplates
})

const getEmailHtml = async (templateName: string, templateVariables: Record<string, string> = {}) => {
  const hbrTemplates = await getHbrTemplates()
  const hbrTemplate = hbrTemplates[templateName]
  const html = hbrTemplate(templateVariables)
  return html
}

const sendEmail = async ({
  to,
  subject,
  templateName,
  templateVariables = {},
}: {
  to: string
  subject: string
  templateName: string
  templateVariables?: Record<string, any>
}) => {
  try {
    const fullTemplateVaraibles = {
      ...templateVariables,
      homeUrl: env.WEBAPP_URL,
    }

    const html = await getEmailHtml(templateName, fullTemplateVaraibles)
    const { loggableResponse } = await sendEmailThroughBrevo({ to, html, subject })

    console.info('sendEmail', {
      to,
      templateName,
      fullTemplateVaraibles,
      templateVariables,
      response: loggableResponse,
    })
    return { ok: true }
  } catch (error) {
    console.error(error)
    return { ok: false }
  }
}

export const sendWelcomeEmail = async ({ user }: { user: Pick<User, 'nick' | 'email'> }) => {
  return await sendEmail({
    to: user.email,
    subject: 'Thanks For Registration!',
    templateName: 'welcome',
    templateVariables: {
      userNick: user.nick,
      addIdeaUrl: `${env.WEBAPP_URL}/ideas/new`,
    },
  })
}

export const sendIdeaBlockedEmail = async ({ user, idea }: { user: Pick<User, 'email'>; idea: Pick<Idea, 'nick'> }) => {
  return await sendEmail({
    to: user.email,
    subject: 'Your Idea Blocked!',
    templateName: 'ideaBlocked',
    templateVariables: {
      ideaNick: idea.nick,
    },
  })
}
