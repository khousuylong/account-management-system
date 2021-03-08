import {useState, useRef, useEffect} from 'react';
import utils from '../../../styles/Utils.module.css'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {LeftRightBox, LeftRightCenterBox, CenterBox} from '../wrappers/gridContainer';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import CountrySelect from './countrySelect'
import {isEU, getEUTaxFormat} from './countrySelect';
import VatForm from './vatForm';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import AdornedButton from '../adornedButton';
import {
  CardElement,
  useRecurly
} from '@recurly/react-recurly';

export default function RecurlyForm(props) {
	const {planInfo, addonsInfo} = props;
	const helperTextBase = {
		number: '',
		numberError: false,
		first_name: '',
		first_nameError: false,
		last_name: '',
		last_nameError: false,
		address1: '',
		address1Error: false,
		city: '',
		cityError: false,
		country: '',
		countryError: false,
		postal_code: '',
		postal_codeError: false,
		vat_number: '', 
		vat_numberError: false
	}
	const [companyInfo, setCompanyInfo] = useState(props.companyInfo);
	const [helperText, setHelperText] = useState({...helperTextBase});
	const [isVATApply, setIsVATApply] = useState(isEU(props.companyInfo.country));
	const [disableSubmit, setDisableSubmit] = useState(false);
	const [price, setPrice] = useState(null);
	const router = useRouter();
	const recurly = useRecurly();
  const formRef = useRef();

	useEffect(() => {
		if(props.elementError) showError(props.elementError);
  },[props.elementError])

	const showError = err => {
		const validation = {...helperTextBase};  
		err.details.map(detail=> {
			validation[detail.field] = detail.messages[0];
			validation[`${detail.field}Error`] = true;
		});
		setHelperText(validation)
	}

  const handleSubmit = event => {
		//Validat vat number first, since recurly don't validate empty vat number
		if( isVATApply && (companyInfo.vat_number !== undefined) && (companyInfo.vat_number === "") ) showError({details: [{field: 'vat_number', messages: ["can't be blank"]}]}) 
		else{
			recurly.token(formRef.current, (err, token) => {
				if(err) showError(err); 
				else{
					setHelperText(helperTextBase);
					const inputElements = formRef.current.querySelectorAll('input[data-recurly]');
					let json = {}
					for (let input of inputElements) {
						json[input.getAttribute('data-recurly')] = input.value; 
					}
					json['token'] = token; 
					json['email'] = companyInfo.email;
					setCompanyInfo(json);
					props.onSubmit(json);
				} 
			});
		}
  };

	const handleCountry = value=> {
		setIsVATApply(isEU(value));
		setCompanyInfo({...companyInfo, country: value});
		props.onDataChange({...companyInfo, country: value});
	}

	const handleVatNumber = value => {
		setCompanyInfo({...companyInfo, vat_number: value});
	}

	const cardError = (helperText.numberError||helperText.monthError||helperText.yearError);

  return (
    <form ref={formRef}>
			<Container className={utils.noPadding} maxWidth={false}>
				<Container maxWidth="sm">
					<div className={utils.paddingTopMedium}>
						{
							props.recurlyFormError ? <Alert severity="error">{props.recurlyFormError}</Alert> : null
						}
					</div>
					<div className={utils.paddingTopMedium}>
						<Grid container spacing={2}>
							<Grid item sm={6}>
								<TextField value={companyInfo.first_name || ""} helperText={helperText.first_name} error={helperText.first_nameError} fullWidth={true} required label="First name" inputProps={{
									id: 'first_name',
									'data-recurly':"first_name" 
								}} onChange={evt => setCompanyInfo({...companyInfo, first_name: evt.target.value})}/>
							</Grid>
							<Grid item sm={6}>
								<TextField value={companyInfo.last_name || ""} fullWidth={true} helperText={helperText.last_name} error={helperText.last_nameError} required label="last name" inputProps={{
									id: 'last_name',
									'data-recurly':"last_name" 
								}} onChange={evt => setCompanyInfo({...companyInfo, last_name: evt.target.value})}/>
							</Grid>
						</Grid>
					</div>
					<div className={utils.paddingTopMedium}>
						<CardElement className={`${cardError ? 'recurly-element-invalid' : '' }`} style={{
							placeholder: {
								color: `${ cardError ? 'red !important' : ''}`,
								content: {
									number: 'Card number',
									cvv: 'CVC'
								}
							},
							invalid: {
								fontColor: 'red'
							}
						}}/>
					</div>
					<div className={utils.paddingTopMedium}>
						<TextField value={companyInfo.address1} helperText={helperText.address1} error={helperText.address1Error} onChange={evt => setCompanyInfo({...companyInfo, address1: evt.target.value})} required fullWidth={true} label="Street address" inputProps={{
							'id': 'address1',
							'data-recurly':"address1" 
						}} />
					</div>
					<div className={utils.paddingTopMedium}>
						<TextField value={companyInfo.suite_unit} onChange={evt => setCompanyInfo({...companyInfo, suite_unit: evt.target.value})} fullWidth={true} label="Suite / Unit" inputProps={{
							'data-recurly':"address2" 
						}}  />
					</div>
					<div className={utils.paddingTopMedium}>
						<TextField required value={companyInfo.city} helperText={helperText.city} error={helperText.cityError} onChange={evt => setCompanyInfo({...companyInfo, city: evt.target.value})} fullWidth={true} label="City" inputProps={{
							id: 'city',
							'data-recurly':"city" 
						}}  />
					</div>
					<div className={utils.paddingTopMedium}>
						<TextField fullWidth={true} value={companyInfo.state} onChange={evt=>setCompanyInfo({...companyInfo, state: evt.target.value})}  label="State / Province" inputProps={{
							'data-recurly':"state" 
						}} />
					</div>
					<div className={utils.paddingTopMedium}>
						<TextField required fullWidth={true} helperText={helperText.postal_code} error={helperText.postal_codeError} value={companyInfo.postal_code} onChange={evt=>setCompanyInfo({...companyInfo, postal_code: evt.target.value})} label="Postal code" inputProps={{
							id: 'postal_code',
							'data-recurly':"postal_code" 
						}}  />
					</div>
					<div className={utils.paddingTopMedium}>
						<CountrySelect required={true} helperText={helperText.country} error={helperText.countryError} selected={companyInfo.country} onChange={handleCountry} />
						<TextField required fullWidth={true} type="hidden" value={companyInfo.country} inputProps={{
							'data-recurly':"country" 
						}}  />
					</div>
					{
						isVATApply ?
							<div className={utils.paddingTopMedium}>
								<VatForm onSubmitVatLater={() => delete companyInfo.vat_number } onVatNumberChange={handleVatNumber} helperText={helperText.vat_number} error={helperText.vat_numberError} onVatValid={()=>setDisableSubmit(false)} onVatError={()=>setDisableSubmit(true)} taxFormat={getEUTaxFormat(companyInfo.country)} />
							</div>
						: null
					}
					<Box className={`${utils.paddingTopXLarge} ${utils.paddingBottomLarge}`}>
						{
							props.loading ? 
							<AdornedButton fullWidth variant="outlined" color="secondary" loading={true}><span style={{marginLeft: 5}}>Processing</span></AdornedButton> : 
							<Button disabled={disableSubmit} className="purchase-order" id="purchase-order" onClick={handleSubmit} fullWidth variant="outlined" color="secondary">{props.submitEle}</Button>
						}
					</Box>
				</Container>
			</Container>
		</form>
  )
}
