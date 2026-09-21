type MenuItemProps = {
  name: string
  price: number
}

export function MenuItem({ name, price }: MenuItemProps) {

  return (
    <div className='border border-gray-300 rounded-xl p-4'>
      <p>{name}</p>
      <p>$ {price}</p>
    </div>
  )
}