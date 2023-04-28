import React from 'react'
interface Props {
  size?: 'large' | 'small'
}

// TODO: insert bouncing pokeball here, add min size, that sort of things
export const Loader: React.FC<Props> = (props) => {
  return <div>Walking in circles around the grass</div>
}
