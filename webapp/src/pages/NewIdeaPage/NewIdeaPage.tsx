import { useFormik } from 'formik'
import { zCreateIdeaTrpcInput } from '@monorepo/backend/src/router/createIdea/zCreateIdeaTrpcInput'
import { withZodSchema } from 'formik-validator-zod'
import { Input } from '@/components/Input'
import { Segment } from '@/components/Segment'
import { Textarea } from '@/components/Textarea'
import { trpc } from '@/lib/trpc'

export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      nickname: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values)
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
        <Input name="name" label="Name" formik={formik} />
        <Input name="nickname" label="Nickname" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}

        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
