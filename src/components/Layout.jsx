import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import './style.scss'
import { styled } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'
import SearchMoviesSuggestion from '../containers/SearchMoviesSuggestion';
const darkTheme = createTheme({
   palette:{
      mode:'dark'
   }
})

const TextWrapper = styled('p')({
    // marginLeft: 'auto',
    marginRight:'auto',
    display:'block',
    width: "100%",
    maxWidth:'100%',
    fontSize:"8vh",
    textAlign:'center',
    textTransform: "uppercase",
    lineHeight: "1",
   
})

const LayoutWrapper = styled('div')(({theme}) =>({
  margin:1 ,
  width:"auto",
  display: "flex",
  flexDirection: 'column',
  justifyContent: "center",
  [theme.breakpoints.up('lg')]: {
  marginLeft: 'auto',
  marginRight:'auto',
  width: theme.breakpoints.values.lg
  }
}))
function Layout({children}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <LayoutWrapper >
         <Link to='/' style={{ color: 'white', textDecoration: 'inherit', }} >
          <TextWrapper><span className="fancy">Movies</span></TextWrapper>
          </Link>
         <SearchMoviesSuggestion/>
      {children}
      </LayoutWrapper>
    </ThemeProvider>
  )
}

export default Layout