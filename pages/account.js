import { getUser } from "../lib/api";
import React from 'react';

export default function Account() {

    React.useEffect(()=>{
        console.log(document.cookie.split('=')[1]);
     },[]);

    return (
        <div>
            Account
        </div>
    )
}