import { faFacebookF, faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { FacebookShareButton, RedditShareButton, TwitterShareButton } from 'react-share'
import { Button } from 'reactstrap'

export const SocialShare: React.FC<{
	text: string
	id: string
	hashtags: string[]
}> = ({ text, hashtags, id }) => {

	const shareUrl = new URL(id, `https://outyet.net`).toString()

	return <div className='social-share'>
		<FacebookShareButton type='button' resetButtonStyle={false} className='btn btn-sm btn-outline-warning mr-2' quote={text} url={shareUrl} hashtag={hashtags.join(' ')}>
			<FontAwesomeIcon fixedWidth icon={faFacebookF} /> Facebook
		</FacebookShareButton>

		<TwitterShareButton type='button' resetButtonStyle={false} className='btn btn-sm btn-outline-warning mr-2' title={text} hashtags={hashtags.map(h => h.replace('#', ''))} url={shareUrl}>
			<FontAwesomeIcon fixedWidth icon={faTwitter} /> Twitter
		</TwitterShareButton>
		<RedditShareButton type='button' resetButtonStyle={false} className='btn btn-sm btn-outline-warning mr-2' title={text} url={shareUrl} >
			<FontAwesomeIcon fixedWidth icon={faReddit} /> Reddit
		</RedditShareButton>
	</div>
}
