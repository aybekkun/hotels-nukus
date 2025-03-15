import { FC } from 'react'

interface Props {
  className?: string
}

export const Footer:FC<Props> = ({ className = `` }) => {
  return (
    <div className = {className}>
     Footer
    </div>
  )
}
