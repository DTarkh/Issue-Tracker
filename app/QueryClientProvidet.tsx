'use client'

import { QueryClient, QueryClientProvider as ReactQueryClientProvider} from "@tanstack/react-query"
import { PropsWithChildren } from "react"


const qieryClient = new QueryClient()
const QueryClientProvider = ({children}: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={qieryClient}>
        {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider