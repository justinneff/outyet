import {
	faDragon,
	faHatWizard,
	faRobot,
	faScroll,
	faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons'

export function getGenreIconName(name: string) {
	switch (name) {
		case 'scroll':
			return faScroll
		case 'dragon':
			return faDragon
		case 'skull-crossbones':
			return faSkullCrossbones
		case 'robot':
			return faRobot
		case 'hat-wizard':
			return faHatWizard
	}
}
