interface TextLinkProps{
    text: string,
    linkTo: string
}

export const TextLink = ({text, linkTo}: TextLinkProps)=>{
    return <a href={linkTo} 
    className="font-small hover:underline m-2">
        {text}
    </a>   
}