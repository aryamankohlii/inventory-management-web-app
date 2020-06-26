import React from 'react';
import ItemGrid from "../Item/ItemGrid/ItemGrid";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from "react-redux";
import * as actions from "../../store/actions/products";
import BrandList from "./Categories/BrandList";
import PriceSlider from "./Categories/PriceSlider";
import Cart from "../Cart/Cart";
import Landing from "../Landing/Landing";
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: "wrap"
    },
    modal: {
        marginLeft: "10rem"
    },
    drawer: {
        marginTop: "10rem",
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        backdropFilter: "saturate(180%) blur(7px)",
        backgroundColor: "rgba(241, 242, 249, 0.25)",
        color: "black",
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        padding: "1rem",
        marginLeft: "10px",
        marginTop: "10rem",
        marginBottom: "20px",
        width: drawerWidth,
        backgroundColor: "white",
        position: "static"
    },
    content: {
        marginTop: "10rem",
        // flexGrow: 1,
        padding: theme.spacing(3),
    },
    filter: {
        borderRadius: "1.5rem",
        overflow: 'auto',
        backgroundColor: "white",
        boxShadow: "0px 38px 44px 0px rgba(240,240,240,0.68)"
    },
    app: {
        display: "flex",
        flexDirection: "row"
    },
    appBarSpacer: theme.mixins.toolbar
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className={classes.filter}>
            <div className={classes.toolbar} />
            <List>
                <ListItem button onClick={() => props.getItem("shoe")} key={"shoes"}>
                    <ListItemIcon> <InboxIcon /> </ListItemIcon>
                    <ListItemText primary={"shoes"} />
                </ListItem>
                <ListItem button onClick={() => props.getItem("Phone")} key={"phones"}>
                    <ListItemIcon> <InboxIcon /> </ListItemIcon>
                    <ListItemText primary={"phones"} />
                </ListItem>
                {/* ::::::::: FILTERS STARTS HERE ::::::::: */}
                <BrandList items={props.items} />
                <PriceSlider />
                <Cart data={props.cart} />
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    console.log(props.items);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Shopify
          </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.appBarSpacer} />
            <Landing />
            <div className={classes.app}>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                                modal: classes.modal
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <ItemGrid
                        items={props.items}
                        brand={props.brand}
                        minPrice={props.minPrice}
                        maxPrice={props.maxPrice} />
                </main>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        cart: state.orders.cart,
        items: state.category.items,
        loading: state.category.loading,
        brand: state.category.brand,
        minPrice: state.category.minPrice,
        maxPrice: state.category.maxPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getItem: (item) => dispatch(actions.getItem(item))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);