import { zUpdateIdeaTrpcInput } from '@monorepo/backend/src/router/ideas/updateIdea/zUpdateIdeaTrpcInput'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Segment } from '@/components/Segment'
import { Textarea } from '@/components/Textarea'
import { useForm } from '@/lib/form'
import { getViewIdeaRoute, type EditIdeaRouteParams } from '@/lib/routes'
import { withPageWrapper } from '@/lib/pageWrapper'
import { trpc } from '@/lib/trpc'

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { ideaId } = useParams() as EditIdeaRouteParams
    return trpc.getIdea.useQuery({
      ideaNick: ideaId,
    })
  },
  checkExists: ({ queryResult }) => Boolean(queryResult.data.idea),
  checkExistsMessage: 'Idea not found',
  checkAccess: ({ queryResult, ctx }) => Boolean(ctx.me) && ctx.me?.id === queryResult.data.idea?.authorId,
  checkAccessMessage: 'An idea can only be edited by the author',
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const idea = checkExists(queryResult.data.idea, 'Idea not found')
    checkAccess(ctx.me?.id === idea.authorId, 'An idea can only be edited by the author')
    return {
      idea,
    }
  },
})(({ idea }) => {
  const navigate = useNavigate()
  const { getIdea } = trpc.useUtils()
  const updateIdea = trpc.updateIdea.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
      getIdea.invalidate()
      navigate(getViewIdeaRoute({ ideaId: values.nick }))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
