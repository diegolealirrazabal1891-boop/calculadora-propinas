import { CircleMinus } from "lucide-react";

export function OrderItem ({ name, price, id, quantity,decreaseQuantity }) {
    return (
        <div className='grid grid-cols-12'>
          <CircleMinus className='col-span-1'
          onClick={() => decreaseQuantity(id)}
          />
          <p className='text-lg col-span-7'>{name}</p>
          <p className='text-lg col-span-1'>$</p>
          <p className='text-lg col-span-3 text-right'>{price*quantity}</p>
        </div>
    )
}