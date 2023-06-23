import { z } from 'zod'

const searchAdsSchema = z.object({
  search: z.string().optional(),
})

type SearchData = z.infer<typeof searchAdsSchema>

export { SearchData, searchAdsSchema }
