import React from 'react'

  type TextProps={
    variant:string,
    style?:React.CSSProperties,
    children:React.ReactNode,
    className?:string
  }


export const Text:React.FC<TextProps> = ({variant,style,children,className}) => {

    if(variant === 'h1')
        return <h1 style={style} className={className}>{children}</h1>
    if(variant === 'h2')
        return <h2 style={style} className={className}>{children}</h2>
    if(variant === 'span')
        return <span style={style} className={className}>{children}</span>
    if(variant === 'p')
        return <p style={style} className={className}>{children}</p>
  return (
    <div style={style} className={className}>{children}</div>
  )
}
