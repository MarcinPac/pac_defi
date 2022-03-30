import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Header } from "./Header";
import { MainPage } from "./MainPage";
import { SwapPanel } from "./SwapPanel";
import { EarnPanel } from "./EarnPanel";

export const Main = () =>{
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const isConnected = false;

    return (
    <div>
        <Header/>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Main" value="1" />
              <Tab label="Pac Swap" value="2" />
              <Tab label="Pac Earn" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <MainPage/>
          </TabPanel>
          <TabPanel value="2">
            <SwapPanel/>
          </TabPanel>
          <TabPanel value="3">
            <EarnPanel/>
          </TabPanel>
        </TabContext>
    </div>

    )
}