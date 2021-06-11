import {useSession} from 'next-auth/client'
import Image from 'next/image'
import {EmojiHappyIcon} from '@heroicons/react/outline'
import {CameraIcon, VideoCameraIcon,} from '@heroicons/react/solid'
import {useRef, useState} from 'react'
import { db, storage } from '../firebase';
import firebase from 'firebase'

function InputBox() {
    const [session] = useSession()
    const InputRef = useRef(null)
    const filePickerRef = useRef(null)
    const [imageToPost, setImageToPost] = useState()
    const sendPost = e =>{
        e.preventDefault()
        if(!InputRef.current.value) return;
        db.collection('posts').add({
            message: InputRef.current.value,
            name: session.user.name,
            email: session.user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(doc=>{
            if(imageToPost){
                const uploadTask = storage.ref(`posts/${doc.id}`).putString(imageToPost, 'data_url')

                removeImage();

                uploadTask.on('state_change', null, error => {console.log(error);}, () =>{
                    // when the upload completed,
                    storage.ref('posts').child(doc.id).getDownloadURL().then(url=>{
                        db.collection('posts').doc(doc.id).set({
                            postImage: url
                        }, {merge: true})
                    })
                })
            }
        })
        
        InputRef.current.value = ""

       
    }
    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result);
        }
        console.log(setImageToPost())
    }

    const removeImage = ()=> {
        setImageToPost(null)
    }
    return (
        <div className="bg-white rounded-2xl p-2 shadow-md">
            <div className="flex space-x-4 p-4 items-center ">
                <Image className="rounded-full" src={session.user.image} height={40} width={40} layout="fixed" />
                <form className="flex flex-1">
                    <input ref={InputRef} className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none" type="text" placeholder={`Whats on your mind ${session.user.name}?`}/>
                    <button hidden className="" onClick={sendPost} type="submit">Submit</button>
                </form>
                {
                    imageToPost && (
                        <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                            <img className="h-10 object-contain" src={imageToPost} alt="" />
                        </div>
                    )
                }
            </div>
            <div className="flex justify-evenly border-t">
                <div className="inputIcon mt-2" onClick={()=> filePickerRef.current.click()}>
                    <CameraIcon className="h-7 text-green-400"/>
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                    <input ref={filePickerRef} onChange={addImageToPost} type="file" hidden/>
                </div>
                <div className="inputIcon mt-2">
                    <VideoCameraIcon className="h-7 text-red-500"/>
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                </div>
                <div className="inputIcon mt-2">
                    <EmojiHappyIcon className="h-7 text-yellow-300"/>
                    <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox
