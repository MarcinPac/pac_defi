import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export const EarnPanel = () =>{
    return (
<Box>
            <Card variant="outlined"  sx={{
                 padding: "20px"
            }}>
                <Box sx={{
                  padding: "20px"
                }}>
                     <div>Staking is on! </div>
                </Box>
                <Divider />

                <Box sx={{
                   padding: "20px"
                }}>
                    <Card variant="outlined" sx={{
                        padding: "20px"
                    }}>
                        <Stack spacing={3}>
                          <div>Available PAC balance: XXX</div>
                          <div><Input/></div>
                          <div>
                              <Button variant="contained">
                                  STAKE!
                              </Button>
                          </div>
                        </Stack>
                    </Card>
                 </Box>

                <Box sx={{
                   padding: "20px"
                }}>
                    <Card variant="outlined" sx={{
                        padding: "20px"
                    }}>
                        <Box sx={{
                           padding: "20px"
                        }}>
                            <div>Yours current staking balance : 0 PAC</div>
                            <div>
                                <Button variant="contained">Withdraw</Button>
                            </div>
                        </Box>
                        <Box sx={{
                           padding: "20px"
                        }}>
                            <div>Rewards to claim : 0 PELLETS</div>
                            <div>
                                <Button variant="contained">Claim</Button>
                            </div>
                        </Box>
                    </Card>
                 </Box>



            </Card>
        </Box>
    )
}