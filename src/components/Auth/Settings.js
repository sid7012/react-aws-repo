import React, {useEffect, useContext, useState } from "react";
import { AccountContext } from "./Account";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export default() =>
{
    const navigate = useNavigate;
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(()=>{
        getSession().then(()=>{
            setLoggedIn(true);
        });
    },[]);

    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate]);



};