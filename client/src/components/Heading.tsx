interface HeadingProps{
    text: string;
}

export const Heading = ({text}: HeadingProps)=>{
    return <div className="text-black font-bold sm:text-4xl p-6">
        {text}
    </div>
}