import { isAfter } from 'date-fns'
import React from 'react'

export type ReleaseDateProps = {
  releaseDate?: number
  countdownStyle?: string
  countdownTeaserText?: string
  releasedTeaserText?: string
}

const ReleaseDate: React.FC<ReleaseDateProps> = ({releaseDate, countdownStyle = 'default', countdownTeaserText = 'Available in', releasedTeaserText = 'Available since'}) => {

  let finalText = `We don't know when this book will be available!`
  let isFutureRelease = true

  if(releaseDate){
    const parsedDate = new Date(releaseDate * 1000)
    isFutureRelease = isAfter(parsedDate, new Date())
  }

  if(!isFutureRelease){
    return <section className='release-date-container'>/header></div>
  }

}


export ReleaseDate