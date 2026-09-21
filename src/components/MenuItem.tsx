export function MenuItem({name, price}) {
    return (
        <div className='border border-gray-300 rounded-xl p-4'>
            <p>{ name }</p>
            <p>$ { price }</p>
        </div>
    )
}