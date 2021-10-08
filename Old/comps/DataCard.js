import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function DataCard() {
  var netInfo = {
    bNum: 1,
    bHash: 'abc',
    pHash: 'def',
    bMiner: 'ghi',
    bTimestamp: 2,
    bTransactions: 3
}

    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
            <Typography component="div" style={{ backgroundColor: '#1ed42d5d', height: '75vh' }} >
                {netInfo.bNum}<br />
                {netInfo.bHash}<br />
            </Typography>
          </Container>
        </React.Fragment>
    );
}