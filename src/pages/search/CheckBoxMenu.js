import React from "react";
import _ from "lodash";
import Checkbox from 'material-ui/lib/checkbox';
import Divider from 'material-ui/lib/divider';
import UnChecked from 'material-ui/lib/svg-icons/toggle/radio-button-unchecked';
import Checked from 'material-ui/lib/svg-icons/navigation/cancel';
import Theme from './Theme';


const style = {
    block: {
        marginBottom: 5,
        display: "flex",
        flexFlow: "column nowrap",
        maxWidth: 250
    },
    row: {
        display: "flex",
        flexFlow: "row nowrap"
    },
    count: {
        fontSize: 12,
        fontWeight: 300
    },
    title: {
        fontSize: 14,
        marginBottom: 5,
        color: Theme.palette.primary1Color,
        fontWeight: 600
    },
    divider: {
        marginBottom: 5
    },
    iconStyle: {
        fill: Theme.palette.primary2Color
    },
    labelStyle: {
        fontWeight: "normal"
    }
};

class CheckBoxMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, items, onChecked, customIcon = false} = this.props;
        return (
            <div style={style.block}>
                <p style={style.title} className='title'>{title}</p>
                <Divider style={style.divider}/>
                {_.sortBy(items).map(i =>
                    <div style={style.row} key={i.name}>
                        {customIcon ? <Checkbox key={i.name} label={i.name} iconStyle={style.iconStyle} id={i.name}
                                               labelStyle={style.labelStyle}
                                               checked={i.isRefined}
                                               onCheck={(ev, value) => { onChecked(value, i.name)}}
                                               checkedIcon={<Checked />}
                                               unCheckedIcon={<UnChecked />}
                    /> :
                        <Checkbox key={i.name} label={i.name} iconStyle={style.iconStyle} labelStyle={style.labelStyle}
                                  checked={i.isRefined}
                                  onCheck={(ev, value) => { onChecked(value, i.name) }}
                        />}
                        <span style={style.count}>{i.count}</span>
                    </div>
                )}
            </div>
        )
    }
}
;

export default CheckBoxMenu;
