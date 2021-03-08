import Grid from '@material-ui/core/Grid';

export function LeftRightCenterBox(props){
  return(
    <Grid container direction="row">
      <Grid item xs={4}>{props.leftContent}</Grid>
      <Grid item container xs={4} justify="center"><Grid item>{props.centerContent}</Grid></Grid>
      <Grid item container xs={4} justify="flex-end"><Grid item>{props.rightContent}</Grid></Grid>
    </Grid>
  )
}

export function LeftRightBox(props){
  return(
    <Grid container direction="row">
      <Grid item xs={6}>{props.leftContent}</Grid>
      <Grid item container xs={6} justify="flex-end">
        <Grid item>{props.rightContent}</Grid>
      </Grid>
    </Grid>
  )
}

export function CenterBox(props) {
	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
		>
			<Grid item>{props.children}</Grid>
		</Grid>
	)
}
