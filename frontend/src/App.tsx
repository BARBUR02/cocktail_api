import { useState } from 'react'
import './App.css'
import dotenv from 'dotenv';
import Header from './components/Header'
import MainPage from './components/MainPage'
import { useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="flex flex-col h-screen">
      < Header />
      <QueryClientProvider client={queryClient}>
        < MainPage />
      </QueryClientProvider>
    </div>
  )
}

export default App
