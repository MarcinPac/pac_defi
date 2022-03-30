import { useEthers } from "@usedapp/core"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const Header = () => {
    const {account, activateBrowserWallet, deactivate} = useEthers();
    const isConnected = account !== undefined;

    return (
    <Box
          sx={{
            display: 'flex',
            justifyContent: "flex-end",
            paddingTop: '10px'
          }}
        >
           {isConnected ? (
                          <Button variant="contained" onClick={deactivate}>
                              Disconnect
                          </Button>
                      ) : (
                          <Button
                              color="primary"
                              variant="contained"
                              onClick={() => activateBrowserWallet()}
                          >
                              Connect
                          </Button>
                      )}
        </Box>

    )
}