import React, { useState, useCallback } from 'react'
import Dustbin from './Dustbin'
import Box from './Box'
import ItemTypes from './ItemTypes'
import update from 'immutability-helper'
const style = {
  display: 'flex', 
  flexWrap: 'wrap', 
  justifyContent: 'space-between', 
  flexDirection: 'row'
}
const Container = () => {
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.BOX], lastDroppedItem: null }
  ])
  const [boxes] = useState([
    { name: 'down', classeName: 'btn btn-success', html: '<i class="fa fa-arrow-down" aria-hidden="true"></i>', type: ItemTypes.BOX },
    { name: 'up', classeName: 'btn btn-success', html: '<i class="fa fa-arrow-up" aria-hidden="true"></i>', type: ItemTypes.BOX },
    // { name: 'stop', classeName: 'btn btn-danger', html: '<i class="fa fa-stop" aria-hidden="true"></i>', type: ItemTypes.BOX },
    { name: 'left', classeName: 'btn btn-success', html: '<i class="fa fa-reply" aria-hidden="true"></i>', type: ItemTypes.BOX },
    { name: 'right', classeName: 'btn btn-success', html: '<i class="fa fa-share" aria-hidden="true"></i>', type: ItemTypes.BOX },
    { name: 'multiple', classeName: 'btn btn-warning', html: '<i class="fa fa-times" aria-hidden="true"></i>', type: ItemTypes.BOX },
    // { name: 'function', classeName: 'btn btn-info', html: '<i class="fa fa-cog" aria-hidden="true"></i>', type: ItemTypes.BOX },
  ])
  const [droppedBoxNames, setDroppedBoxNames] = useState([])
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }
  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [item] } : { $push: [] }),
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedBoxNames, dustbins],
  )
  return (
    <div class="container" style={{ ...style}}>
      <div class="col-sm-2">
        <div>
          {boxes.map(({ name, classeName, html, type }, index) => (
            <Box
              name={name}
              classeName={classeName}
              html={html}
              type={type}
              isDropped={isDropped(name)}
              key={index}
            />
          ))}
        </div>
      </div>
      <div class="col-sm-10">
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {dustbins.map(({ accepts, lastDroppedItem }, index) => (
            <Dustbin
              accept={accepts}
              lastDroppedItem={lastDroppedItem}
              droppedBoxNames={droppedBoxNames}
              onDrop={item => handleDrop(index, item)}
              key={index}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
export default Container
