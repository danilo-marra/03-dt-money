import { createContext, useEffect, useState } from "react";

//Quando criar um estado no react, é necessário criar uma interface para o estado
interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContexType {
  transactions: Transaction[];
}

interface TransactionsProviderProps {
  children: React.ReactNode;

}

export const TransactionsContext = createContext({} as TransactionContexType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {

  //Estado são a melhor e única forma de conseguir manipular o estado de um componente
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {

    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  //Usaremos ContextAPI porque a transaction vai ser necessário em vários componentes - começa criando uma pasta context e dentro dela um arquivo transactions.tsx

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}