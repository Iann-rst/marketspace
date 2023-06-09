import { z } from 'zod'

const signInSchemaValidation = z.object({
  email: z
    .string({ required_error: 'Informe o e-mail' })
    .email('E-mail inválido'),

  password: z
    .string({ required_error: 'Informe a senha.' })
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})

type FormDataSignInProps = {
  email: string
  password: string
}

export { signInSchemaValidation, FormDataSignInProps }
