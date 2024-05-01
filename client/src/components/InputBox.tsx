interface InputBoxParams{
    label: string,
    type: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = ({label, type, placeholder, onChange}: InputBoxParams)=>{
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input type={type} placeholder={placeholder} onChange={onChange} className="w-full px-2 py-1 border-2 rounded-xl"/>
    </div>
}