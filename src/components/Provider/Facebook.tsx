import * as React from 'react'
import { IframeProps } from 'src/services/interfaces/Provider'
import { ContentExplanation } from '../ContentExplanation'

export const FacebookPost: React.FC<IframeProps> = ({ TitleLine, iframeKey, text, size }) => {
  return (
    <>
      {TitleLine}
      <div className="flex justify-center">
        <iframe
          title="facebook"
          src={`https://www.facebook.com/plugins/post.php?href=${iframeKey}`}
          width={size}
          height={size ? size * 0.6 : 0}
          scrolling="no"
          frameBorder="0"
          // allowTransparency="true"
          allow="encrypted-media"
        />
      </div>
      <ContentExplanation text={text} />
    </>
  )
}

export const FacebookChannel = () => {
  return <></>
}
