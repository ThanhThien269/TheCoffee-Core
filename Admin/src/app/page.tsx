'use client'

import { CrownOutlined } from "@ant-design/icons"
import { Result } from "antd"
export default function Home() {
  return (
    <div style={{ padding: 20 }}>
    <Result
        icon={<CrownOutlined />}
        title="Home"
    />
</div>
   
  );
}
