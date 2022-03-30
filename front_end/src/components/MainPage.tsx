import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

export const MainPage = () =>{
    return (
        <Box sx ={{
            minHeight: '400px'
        }}>
            <div>Welcome on Pac Defi!</div>
            <div>You can swap ETH to PAC tokens in Swap tab</div>
            <div>Pac Earn allows you to stake your tokens and receive PELLETS as a reward!</div>
            <div>App works on Kovan and Rinkeby</div>


        </Box>
    )
}