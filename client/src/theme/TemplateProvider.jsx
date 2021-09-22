import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import React, {createContext} from 'react';

export const TemplateContext = createContext(null);
 
const TemplateProvider = ({children}) => {
    const theme = createTheme({
        overrides: {
            MuiDrawer: {
                paperAnchorLeft: {
                    height: '95%',
                    top: '5%',
                    width: 375,
                    left:  '4.75%',
                    boxShadow: 'none'
                }
            },
            MuiBackdrop: {
                root: {
                    backgroundColor:'unset'
                }
            }
        }
    })
    return (
        <TemplateContext.Provider>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </TemplateContext.Provider>
    )
}

export default TemplateProvider;