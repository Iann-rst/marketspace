import { z } from 'zod'

const signUpSchemaValidation = z
  .object({
    name: z
      .string({ required_error: 'Informe seu nome.' })
      .nonempty({ message: 'Informe seu nome.' }),

    email: z
      .string({ required_error: 'Informe o e-mail' })
      .email('E-mail inválido'),

    tel: z
      .string({ required_error: 'Informe o número do telefone.' })
      .min(11, { message: 'Informe um número de telefone válido.' }),

    password: z
      .string({ required_error: 'Informe a senha.' })
      .min(6, 'A senha deve ter pelo menos 6 dígitos.'),

    password_confirm: z.string({ required_error: 'Confirme sua senha.' }),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Senhas diferentes!',
    path: ['password_confirm'],
  })

type FormDataSignUpProps = {
  name: string
  email: string
  tel: string
  password: string
  password_confirm: string
}

export { signUpSchemaValidation, FormDataSignUpProps }
