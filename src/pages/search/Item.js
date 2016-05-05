import React from "react";
import algoliasearch from "algoliasearch";
import Theme from './Theme';

const style = {
    block: {
        marginBottom: 2,
        display: "flex",
        flexFlow: "row nowrap",
        borderBottomStyle: "solid",
        padding: 10,
        borderBottomColor: Theme.palette.borderColor,
        borderBottomWidth: 1
    },
    column: {
        padding: 5,
        margin: 5,
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "center"
    },
    row: {
        display: "flex",
        flexFlow: "row wrap"
    },
    divider: {
        marginBottom: 5
    },
    price: {
        fontWeight: "bold",
        color: "#103D62",
        paddingRight: 5
    },
    free: {
        fontWeight: "bold",
        color: Theme.palette.accent2Color
    },
    name: {
        fontWeight: "bold",
        fontSize: 16
    },
    picture: {
        width: '100',
        height: 'auto',
        maxHeight: '150px'
    },
    pictureContainer: {
        marginBottom: '30px',
        height: 'auto',
        WebkitFlex:'1 0 auto',
        flex:'0 0 auto',
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "center"
    }
};

const Item = ({item}) => {
    return (
        <div style={style.block}>
            <div style={style.pictureContainer}>
                <img src={item.image} style={style.picture} className='img'/>
            </div>
            <div style={style.column} className='item'>
                <p style={style.name}>{item.name}</p>
                <div style={style.row}>
                    <p style={style.price}>{item.price} $ </p>
                    {item.free_shipping ? <p style={style.free}>free shipping</p> : null}
                </div>
                <p>{item.description}</p>
            </div>
        </div>
    )
};

export default Item;
