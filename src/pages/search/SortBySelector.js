import React from "react";
import styles from "./style.css";
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Theme from './Theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

const style = {
    block: {
        display: "flex",
        flexFlow: "row nowrap",
        alignContent: "flex-start"
    },
    selectField: {
        fontSize: 14,
        paddingLeft: 10
    },
    title: {
        paddingTop: 13
    }
};

@ThemeDecorator(ThemeManager.getMuiTheme(Theme))
class SortBySelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: this.props.defaultCriteria};
    }

    handleChange = (event, index, value) => {
        this.setState({value});
        this.props.onChange(this.props.criterias[index]);
    };

    render() {

        const {defaultCriteria, criterias, onChange} = this.props;
        return (
            <div style={style.block}>
                <p style={style.title}>Sort by : </p>
                <SelectField value={this.state.value} style={style.selectField}
                onChange={this.handleChange} hintStyle={style.focusField}>
                    {criterias.map((criteria, index) => {
                            return <MenuItem key={index + 1} value={index + 1} primaryText={criteria}
                                             style={style.menuItem} selectedMenuItemStyle={style.menuItem}/>
                        }
                    )}
                </SelectField>
            </div>
        )
    }
}

export default SortBySelector;
