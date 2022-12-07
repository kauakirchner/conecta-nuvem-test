export const getAcessToken = () => sessionStorage.getItem('acessToken');

const isAuthenticated = () => {
    return Boolean(getAcessToken());
}

export const processRouteAuthentication = (noAuthenticatedUrl = '/') => {
    return {
        beforeEnter: () => {
            if (isAuthenticated()) {
                return true
            }
            return noAuthenticatedUrl;
        }
    }
}

export const getAuthenticatedHeadersConfig = () => ({
    "authorization":`Bearer ${getAcessToken()}` 
})
