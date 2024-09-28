'use client'
import { auth } from "@/auth";

import { CrownOutlined } from "@ant-design/icons"
import { Result } from "antd"
import { useSession } from "next-auth/react";

const HomePage = () => {
   
    return (
        <div style={{ padding: 20 }}>
        <Result
            icon={<CrownOutlined />}
            title="Home"
        />
        
    </div>

    )
}

export default HomePage;