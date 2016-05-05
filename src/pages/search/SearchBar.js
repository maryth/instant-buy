import React from "react";
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';
import AppBar from 'material-ui/lib/app-bar';
import Theme from './Theme';

const style = {

    focusSearchBar: {
        borderColor: Theme.palette.primary3Color
    },
    appBar: {
        backgroundColor: Theme.palette.primary1Color,
        position: 'fixed'
    },
    inputStyle: {
        color: Theme.palette.canvasColor
    },
    textField: {
        width: 500
    }
};

const buildTextField = (onChange, value) => {
    if (value === "") {
        return <TextField
            hintText="Search for products"
            onChange={onChange}
            underlineFocusStyle={style.focusSearchBar}
            inputStyle={style.inputStyle}
            hintStyle={style.inputStyle}
            style={style.textField}
    value={value}
        />
    } else {
        return <TextField
            hintText="Search for products"
            onChange={onChange}
            underlineFocusStyle={style.focusSearchBar}
            style={style.textField}
            inputStyle={style.inputStyle}
            hintStyle={style.inputStyle}
        />
    }
};

const SearchBar = ({onChange, value}) => {
    return (
        <AppBar
            title="INSTANT BUY"
            showMenuIconButton={false}
            iconElementRight={buildTextField(onChange, value)}
            style={style.appBar}
        />

    );
};

export default SearchBar;
