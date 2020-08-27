import React, { FC, useState, useEffect, useCallback } from "react";

import { Google } from "../config.js";


function LoginComp(){

  const handleGoogleLogin = useCallback(async () => {

    const qParams = [
      `redirect_uri=${Google.REDIRECT_URI}`,
      `scope=${Google.SCOPE}`,
      `login_hint=paramsinghvc@gmail.com`,
      `prompt=consent`,
      `state=google`
    ].join("&");
    
    try {
      const response = await fetch(`/api/auth-url/google?${qParams}`);
      const url = await response.text();
      window.location.assign(url);
    } catch (e) {
      console.error(e);
    }
    
  }, []);

  return (
      <button variant="contained" color="primary" onClick={handleGoogleLogin}>
        Login with Google
      </button>
  );
};

export default LoginComp;