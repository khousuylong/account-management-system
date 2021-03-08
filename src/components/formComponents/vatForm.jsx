import React, {useState, useEffect} from 'react';
import utils from '../../../styles/Utils.module.css'
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';

export default function VatForm({helperText, error, taxFormat, onVatValid, onVatError, vatNumber, onVatNumberChange, onSubmitVatLater}) {
	const [isBusiness, setIsBusiness] = useState('yes');
	const [haveVAT, setHaveVAT] = useState('have-vat');

	useEffect(() => {
		onVatNumberChange("")
  }, [])

	const handleBusiness = evt => {
		setIsBusiness(evt.target.value);
		if(evt.target.value === "no") onVatError()
		else onVatValid();
	}

	const handleVAT = evt => {
		setHaveVAT(evt.target.value);
	}


	let timeId = null;
	const handleVatNumberChange = evt => {
		if(timeId) clearTimeout(timeId);
		timeId = setTimeout(()=> onVatNumberChange(evt.target.value), 500);
	} 

	return (
		<React.Fragment>
			<Typography className={`business-purchase ${utils.noMargin} ${utils.paddingTopMedium}`} variant="subtitle2" gutterBottom>
				Is this a business purchase?
			</Typography>
			{
				isBusiness === "no" ?
				<Alert className={`error-alert ${utils.marginTopMedium}`} severity="error">Unfortunately we do not currently support non-business EU customers</Alert>
				: null
			}
			<RadioGroup aria-label="business" name="business" value={isBusiness} onChange={handleBusiness}>
				<FormControlLabel value='yes' control={<Radio color="primary" inputProps={{id: 'business'}}/>} label="Yes" />
				<FormControlLabel value='no' control={<Radio color="primary" inputProps={{id: 'none-business'}} />} label="No" />
			</RadioGroup>
			<Typography className={`have-vat ${utils.noMargin} ${utils.paddingTopMedium}`} variant="subtitle2" gutterBottom>
				Do you have VAT ID on hand?	
			</Typography>
			<RadioGroup aria-label="vat" name="vat" value={haveVAT} onChange={handleVAT}>
				<FormControlLabel value='have-vat' control={<Radio color="primary" inputProps={{id: 'vat-now'}} />} label="Yes, I'll enter it now " />
				<FormControlLabel value='no-vat' control={<Radio color="primary" onChange={onSubmitVatLater} inputProps={{id: 'vat-later'}} />} label="No, I'll submit one later" />
			</RadioGroup>
			{
				haveVAT === 'have-vat' ? 
					<div>
						<TextField  value={vatNumber} onChange={handleVatNumberChange} helperText={helperText} error={error} disabled={isBusiness === 'no' ? true : false} fullWidth={true} autoFocus={true} required label="VAT ID" placeholder={taxFormat} inputProps={{id: 'vat_id', 'data-recurly':"vat_number"}} />
						{ (error && !helperText.match(/blank/) ) ? <Alert severity="error"><div>Sorry we couldn’t verify this VAT number in the European Commission's VAT Information Exchange System (VIES). You can test your VAT number  <Link href="https://ec.europa.eu/taxation_customs/vies/">here</Link>.</div></Alert> : null}
					</div>
				: null
			}
		</React.Fragment>
	)
}
