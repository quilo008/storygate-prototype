import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export const ContentLocation = ({ location }) => {
  return (
    <div id="content-location" className="flex justify-center items-center w-full mb-1">
      <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" className="text-gray-500" />
      <span className="mx-1 text-gray-500">{location}</span>
    </div>
  )
}

export const ModifiableContentLocation = ({ location }) => {
  const [newInputLocation, setNewInputLocation] = React.useState<string>(location)
  return (
    <div id="modifiable-location" className="flex flex-col w-full mt-2">
      <div className="m-1 text-xs text-white">場所(実店舗の場合のみ)</div>
      <input
        type="text"
        placeholder="title..."
        className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-lg focus:outline-none"
        value={newInputLocation}
        onChange={e => setNewInputLocation(e.target.value)}
      />
    </div>
  )
}
