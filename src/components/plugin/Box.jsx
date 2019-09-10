import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
  // border: '1px dashed gray',
  // backgroundColor: 'white',
  // padding: '0.5rem 1rem',
  // marginRight: '1.5rem',
  // marginBottom: '1.5rem',
  // cursor: 'move',
  // float: 'left',
}

const Box = ({ content, classe }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { classe, content, type: ItemTypes.BOX },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        console.log(item);
        console.log(dropResult);
        console.log(monitor);
        alert(`You dropped ${item.content} into ${dropResult.content}!`)
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.4 : 1
  return (
    <button class={classe} ref={drag} style={{ ...style, opacity }} dangerouslySetInnerHTML={{__html: content}}>
    </button>
  )
}
export default Box
