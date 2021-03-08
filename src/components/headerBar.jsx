import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import {LeftRightCenterBox} from './wrappers/gridContainer';
import AppContext from '../contexts/appContext';
import { useRouter } from 'next/router';
import {useContext} from 'react';

export default function HeaderBar(props){
	const router = useRouter();
	return(
		<LeftRightCenterBox 
			leftContent={
				<IconButton id="go-back" onClick={()=>router.push(`${props.quitUrl}`)} component="span">
					<ArrowBackIcon />
				</IconButton>
			} 
			centerContent={ props.title }
			rightContent={
				<IconButton id="close-button" onClick={()=> router.push(`${props.quitUrl}`)} component="span">
					<CloseIcon />
				</IconButton>
			}
		/>
	)
}
