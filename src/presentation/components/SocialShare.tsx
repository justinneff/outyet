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
		<FacebookShareButton quote={text} url={shareUrl} hashtag={hashtags.join(' ')}>
			<Button className='mr-2' size='sm' color='warning' outline ><FontAwesomeIcon fixedWidth icon={faFacebookF} /> Facebook</Button>
		</FacebookShareButton>

		<TwitterShareButton title={text} hashtags={hashtags.map(h => h.replace('#', ''))} url={shareUrl}>
			<Button className='mr-2' size='sm' color='warning' outline><FontAwesomeIcon fixedWidth icon={faTwitter} /> Twitter</Button>
		</TwitterShareButton>
		<RedditShareButton title={text} url={shareUrl} >
			<Button size='sm' color='warning' outline><FontAwesomeIcon fixedWidth icon={faReddit} /> Reddit</Button>
		</RedditShareButton>
	</div>
}
