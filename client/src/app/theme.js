import * as colors from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


// available customization of muiTheme:
// https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js
// colors:
// https://github.com/callemall/material-ui/blob/master/src/styles/colors.js
// light base theme:
// https://github.com/callemall/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js


export default getMuiTheme({
  palette: {
    primary1Color: colors.indigo500,
    primary2Color: colors.indigo700,
    primary3Color: colors.grey400,
    accent1Color: colors.amberA400,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
//    secondaryTextColor: fade(colors.darkBlack, 0.54),
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
//    disabledColor: fade(colors.darkBlack, 0.3),
    pickerHeaderColor: colors.indigo500,
//    clockCircleColor: fade(colors.darkBlack, 0.07),
    shadowColor: colors.fullBlack,
  },
  tabs:{
    backgroundColor: colors.grey100,
    textColor: colors.grey700,
    selectedTextColor: colors.indigo900,
  }
});
