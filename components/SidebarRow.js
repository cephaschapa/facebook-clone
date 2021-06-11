import Image from 'next/image'
function SidebarRow  ({src, Icon, title}) {
    return (
        <div className="flex p-4 hover:bg-gray-200 rounded-xl cursor-pointer items-center space-x-2 rounded-full">
           {
               src && (<Image src={src} width={30} height={30} layout="fixed" className="rounded-full"/>)
           }
           {
               Icon && <Icon className="h-8 w-8 text-blue-500"/>}
               <p className="hidden sm:inline-flex font-medium">{title}</p>
         
        </div>
    )
}
export default SidebarRow
