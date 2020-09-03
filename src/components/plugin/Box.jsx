import React from 'react'
import { useDrag } from 'react-dnd'
const Box = ({ name, classeName, html, type, isDropped }) => {
  const [{ opacity },drag] = useDrag({
    item: { name, classeName, html, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })
  return (
    <button data-name={name} className={classeName} ref={drag} 
    dangerouslySetInnerHTML={{__html: html}} style={{ margin: '5px'}}>
    </button>
  )
}
export default Box
