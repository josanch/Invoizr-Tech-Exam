import jwt_decode from 'jwt-decode';

export const isTokenExpired = (token: string | null): boolean => {
    //console.log("Token received by isTokenExpired: ", token);
  
    if (!token || token.trim() === '') {
      //console.error('Token is missing or empty');
      // Treat missing/empty token as expired
      return true;
    }
  
    try {
      const decoded: any = jwt_decode(token);
      //console.log("Decoded token: ", decoded);
  
      if (!decoded.exp) {
        console.error('Token does not have an exp field');
        // Treat tokens without `exp` as expired
        return true;
      }
  
      const currentTime = Date.now() / 1000;
      //console.log("Current time:", currentTime, "Token expiration:", decoded.exp);
  
      // Check if `exp` is in the past
      return decoded.exp < currentTime;
    } catch (error) {
      //console.error('Error decoding token:', error);
      // Treat invalid tokens as expired
      return true;
    }
  };
  
  