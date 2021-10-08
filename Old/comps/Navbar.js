import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function Navbar() {  
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    return (
        <Paper className="">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Network Stats" />
            <Tab label="Mining" />
            <Tab label="Transactions" />
          </Tabs>
        </Paper>
    );
}