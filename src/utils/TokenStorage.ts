export default class TokenStorage {
    private static accessTokenKey = "accessToken";
    private static refreshTokenKey = "refreshToken";

    static saveTokens(accessToken: string, refreshToken: string) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }

    static getAccessToken() {
        return localStorage.getItem(this.accessTokenKey);
    }

    static getRefreshToken() {
        return localStorage.getItem(this.refreshTokenKey)
    }

    static removeTokens() {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }
    
    
}