import Image from 'next/image'
import StoryCard from './StoryCard';
const stories = [
    {
        name: "Cephas Chapa",
        src: "https://links.papareact.com/zof",
        profile: "https://links.papareact.com/l4v"
    },
    {
        name: "Elon Musk",
        src: "https://links.papareact.com/k2j",
        profile: "https://links.papareact.com/kxK"
    },
    
    {
        name: "Mark Zuckerberg",
        src: "https://links.papareact.com/xql",
        profile: "https://links.papareact.com/snf"
    },
    {
        name: "Bill Gates",
        src: "https://links.papareact.com/4u4",
        profile: "https://links.papareact.com/zvy"
    }
];

function Stories() {

    return (
        <div className="flex justify-center space-x-3 mx-auto">
            
            {stories.map((story)=> {
                return(
                    <StoryCard key={story.src} name={story.name} src={story.src} profile={story.profile}/>
            )})}
        </div>
    )
}

export default Stories