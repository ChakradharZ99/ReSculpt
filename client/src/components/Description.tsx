interface DescriptionProps{
    text: string
}

export const Description = ({text}: DescriptionProps)=>{
    return <div className="">
        {text}
    </div>
}