import { z } from 'zod'

const createAdSchemaValidation = z.object({
  title: z
    .string({ required_error: 'Informe o título do anúncio.' })
    .nonempty({ message: 'Informe o título do anúncio.' }),
  description: z
    .string({ required_error: 'Informe a descrição do produto.' })
    .nonempty({ message: 'Informe a descrição do produto.' }),
  price: z
    .string({ required_error: 'Informe o valor do produto.' })
    .nonempty({ message: 'Informe o valor do produto.' }),
})

type FormDataCreateAdProps = z.infer<typeof createAdSchemaValidation>

export { FormDataCreateAdProps, createAdSchemaValidation }
