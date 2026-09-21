import { OrderItem } from './components/OrderItem';
import { Divider } from './components/Divider';
import { useState } from 'react';
import { MenuItem } from './components/MenuItem';

const products = [
  { id: 1, name: 'Pizza', price: 56 },
  { id: 2, name: 'Hamburguesa Dobel', price: 125 },
  { id: 3, name: 'Pollo con papas', price: 32 },
  { id: 4, name: 'Coca-Cola', price: 20 },
]
type OrderItemType = {
  id: number
  name: string
  price: number
  quantity: number
}
type Product = {
  id: number
  name: string
  price: number
}

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([])
  const [Percentage, setPercentage] = useState(0)
  const addItem = (product: Product) => {

    const orderItemsAux = [...orderItems]
    const selectedProductIndex = orderItems.findIndex(i => i.id === product.id)
    if (selectedProductIndex > -1) {
      const orderItemsAux = [...orderItems]
      const selectedProduct = orderItemsAux[selectedProductIndex]
      const newQuantity = selectedProduct.quantity + 1
      orderItemsAux[selectedProductIndex] = { ...selectedProduct, quantity: newQuantity }
      setOrderItems([...orderItemsAux])
    } else {
      setOrderItems([
        ...orderItemsAux,
        {
          ...product,
          quantity: 1
        }
      ])
    }
    setIsOpen(false)
  }

  const subtotal = orderItems.reduce(
    (acumulador, producto) => acumulador + producto.price * producto.quantity,
    0
  )
  const handlePercentage = (value : number) => {

    setPercentage(value)
  }
  const tipPercentage = (subtotal * Percentage / 100)
  const priceTotal = (subtotal + tipPercentage)
  const decreaseQuantity = (id : number) => {
    const item = orderItems.find(item => item.id === id)

  if (!item) return

  if (item.quantity === 1) {
    setOrderItems(orderItems.filter(item => item.id !== id))
  } else {
    setOrderItems(
      orderItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1
          }
        }

        return item
      })
    )
  }
}

  const clearOrder = () => {
    setOrderItems([])
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 justify-center">
      <h1 className='text-4xl text-center mb-6 font-semibold text-blue-700'>TipMaster</h1>
      <h2 className='text-2xl font-semibold'>Order Items</h2>
      <div className='space-y-4 p-6 border border-gray-300 rounded-2xl bg-white mt-4'>
        {
          orderItems.map((item, index) => (
            <div key={item.id} className='space-y-4'>
              <OrderItem name={item.name} price={item.price} id={item.id} decreaseQuantity={decreaseQuantity} quantity={item.quantity} />
              {index < orderItems.length - 1 ? <Divider /> : null}
            </div>
          ))
        }

        <button
          className='flex border w-full justify-center py-4 text-blue-700 border-gray-400 rounded-lg border-dashed'
          onClick={() => setIsOpen(true)}
        >
          <button />
          Add Item
        </button>

      </div>

      <div>
        <h1 className='text-2xl mt-10 font-semibold '> Tip Percentage</h1>


        <div>
          <div className='flex gap-4 mt-6 text-center w-full '>
            <button onClick={() => handlePercentage(10)}
              className='w-full py-4 border-gray-300 content-center font-black  bg-gray-200 rounded-lg hover:text-blue-700  ' >10%

            </button>
            <button onClick={() => handlePercentage(20)}
              className='w-full py-4 border-gray-300 content-center font-black bg-gray-200 rounded-lg hover:text-blue-700 '>20%
            </button>

            <button onClick={() => handlePercentage(30)}
              className='w-full py-4 border-gray-300 content-center font-black bg-gray-200 rounded-lg  hover:text-blue-700'>30%
            </button>

            <button onClick={() => handlePercentage(50)}
              className='w-full py-4 border-gray-300 content-center font-black bg-gray-200 rounded-lg  hover:text-blue-700'>50%</button>
          </div>
        </div>
      </div>

      <div className=' mt-20 py-4 h-64 border border-gray-300 rounded-4xl bg-white w-full'>
        <div className='flex justify-between px-6'>
          <h1 className='text-xl'>Subtotal </h1>
          <h1 className='text-xl font-bold'>${subtotal}</h1>
        </div>
        <div className='flex justify-between px-6'>
          <h1 className='text-xl mt-6'>Tip{(Percentage)}%</h1>
          <h1 className='text-xl font-bold mt-6'>${tipPercentage}</h1>
        </div>
        <hr className='my-8 mx-6 border-gray-200' />
        <div className='flex justify-between px-6'>
          <h1 className='text-xl mt-6'>Total</h1>
          <h1 className='text-5xl font-bold mt-6 text-blue-700'>${priceTotal}</h1>
        </div>
      </div>
      <div>
        <button onClick={() => clearOrder()}
          className="px-4 py-2 text-base bg-blue-500 text-white rounded mt-16 mx-5 hover:bg-blue-700 " >
          <h1>Limpiar</h1>
        </button>


      </div>


      <div className="p-10">
        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 flex bg-black/50 min-h-screen">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
              <h2 className="mb-4 text-2xl font-bold">
                Menu
              </h2>

              <div className='grid grid-cols-3 gap-2 mb-6'>
                {
                  products.map(product => (
                    <div
                      onClick={() => addItem(product)}
                      key={product.id}
                    >
                      <MenuItem
                        name={product.name}
                        price={product.price}
                      />
                    </div>

                  ))
                }
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>


    </div>
  )
}

export default App
