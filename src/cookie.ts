/**
 * Represents a cookie
 * @constructor
 * @param {string} name the name of the cookie
 * @param {string} value the value the cookie holds
 * @param {number} lifetime the time (in days) the cookie is valid for
 */
class TSCanvasCookie {
    name: string;
    value: string;
    lifetime: number;
    
    constructor (name: string, value: string, lifetime: number) {
        this.name = name;
        this.value = value;
        this.lifetime = lifetime;
    }
}

/**
 * Manages cookies, all methods are static
 */
class TSCanvasCookieManager {

    /**
     * Gets the cookie with a given name, undefined if it doesn't exist
     * @param {string} name the name of the cookie
     */
    static getCookie = (name: string): TSCanvasCookie => {
        let cookies = document.cookie.split(',');
        for (let i=0, len=cookies.length; i<len; i++) {
            let c = cookies[i];
            let cs = c.split('=');
            cs[0] = cs[0].replace(/^\s*/, '');
            if (cs[0] == name)
                return new TSCanvasCookie(cs[0], cs[1], 7);
            else 
                return undefined;
        }
    }

    /**
     * Saves a cookie
     * @param {TSCanvasCookie} cookie the cookie to save
     */
    static saveCookie = (cookie: TSCanvasCookie): void => {
        let d = new Date();
        d.setTime(d.getTime() + (cookie.lifetime * 24 * 60 * 60 * 1000));
        document.cookie = cookie.name + '=' + cookie.value + ';expires=' + d;
    }

    /**
     * Deletes a cookie
     * @param {TSCanvasCookie} cookie the cookie to delete
     */
    static deleteCookie = (cookie: TSCanvasCookie): void => {
        document.cookie = cookie.name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
}