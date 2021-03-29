import { AdalConfig, AuthenticationContext } from 'react-adal';

const appId = '2b71e9dc-2d06-40e6-a106-40d330c05a8b';
// Endpoint URL
//export const endpoint = 'https://htlbeta.onmicrosoft.com/2b71e9dc-2d06-40e6-a106-40d330c05a8b';
export const endpoint = 'https://login.microsoftonline.com/htlbeta.onmicrosoft.com'
// App Registration ID
export const adalConfig: AdalConfig = {
  cacheLocation: 'localStorage',
  clientId: appId,
  endpoints: {
    api:endpoint
  },
  postLogoutRedirectUri: window.location.origin,
  tenant: 'htlbeta.onmicrosoft.com'
};

export const authContext = new AuthenticationContext(adalConfig);

export const LogOut = () => {
    authContext.logOut();
};

class AdalContext {
    private authContext: AuthenticationContext;
    
    constructor() {
        this.authContext = new AuthenticationContext(adalConfig);
    }

    get AuthContext() {
        return (this.authContext as any);
    }

    public LogOut() {
        this.authContext.logOut();
    }
}

const adalContext: AdalContext = new AdalContext();
export default adalContext;