import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export const SwapPanel = () =>{

    return (
        <Box>
            <Card variant="outlined"  sx={{
                 padding: "20px"
            }}>
                <Box sx={{
                  padding: "20px"
                }}>
                     <div>Swap yours tokens here! </div>
                </Box>
                <Divider />
                <Box>
                    <Card variant="outlined" sx={{
                        margin: "20px",
                        padding: "20px"
                    }}>
                        <Stack spacing={3}>
                          <div>ETH balance:</div>
                          <div><Input/></div>
                          <div>
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <ChangeCircleOutlinedIcon/>
                            </IconButton>
                          </div>
                          <div>PAC balance</div>
                          <div><Input/></div>
                          <div>Price xxx ETH per PAC</div>
                          <div>
                              <Button variant="contained">
                                  SWAP!
                              </Button>
                          </div>
                        </Stack>
                    </Card>
                 </Box>
            </Card>
        </Box>
    )
}