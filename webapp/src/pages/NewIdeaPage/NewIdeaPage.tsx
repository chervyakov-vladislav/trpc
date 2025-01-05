import { useState } from 'react'
import { useFormik } from 'formik'
import { zCreateIdeaTrpcInput } from '@monorepo/backend/src/router/createIdea/zCreateIdeaTrpcInput'
import { withZodSchema } from 'formik-validator-zod'
import { Input } from '@/components/Input'
import { Segment } from '@/components/Segment'
import { Textarea } from '@/components/Textarea'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { trpc } from '@/lib/trpc'

export const NewIdeaPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const { refetch } = trpc.getIdeas.useQuery(undefined, { enabled: false })

  const createIdea = trpc.createIdea.useMutation({
    onSuccess: () => {
      refetch()
      setSuccessMessageVisible(true)
      setTimeout(() => {
        setSuccessMessageVisible(false)
      }, 3000)
    },
    onError: (error) => {
      setSubmittingError(error.message)
      setTimeout(() => {
        setSubmittingError(null)
      }, 3000)
    },
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async (values) => {
      try {
        await createIdea.mutateAsync(values)
        formik.resetForm()
      } catch (error: any) {
        setSubmittingError(error.message)
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
    },
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && <Alert color="green">Idea created!</Alert>}
          <Button loading={formik.isSubmitting}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
