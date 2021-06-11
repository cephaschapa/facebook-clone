import Image from 'next/image'
function Contact({src, name}) {
    return (
        <div>
            <div className="flex items-center space-x-3 mb-5 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl">
                <Image className="rounded-full" src={src} height={40} width={40} layout="fixed"/>
                <p className="justify-left">{name}</p>
                <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full"></div>
            </div>

        </div>
    )
}

export default Contact
