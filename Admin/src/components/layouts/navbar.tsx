'use client'



import { signOut, useSession } from "next-auth/react";
import { Button } from 'antd';
const Navbar = () => {
    const { data: session } = useSession()
    if (session) {
        return (
            <div style={{display:"flex", flexDirection:"row",justifyContent:"flex-end",padding:20,alignItems:'center',}} >
                <div style={{margin:  "0 2rem"}}>Welcome {session?.user?.email}</div>
               <Button type="primary" danger onClick={()=>signOut()} >
              Sign out
            </Button>
            </div>
        
            )
    }

   
}

export default Navbar;