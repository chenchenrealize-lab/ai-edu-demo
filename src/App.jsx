import { useState } from "react";
import PhoneFrame from "./components/common/PhoneFrame";
import StatusBar from "./components/common/StatusBar";
import HeaderArea from "./components/common/HeaderArea";
import TabBar from "./components/common/TabBar";
import ErrorBookTab from "./components/ErrorBookTab";
import AnalyticsTab from "./components/AnalyticsTab";
import ReviewTab from "./components/ReviewTab";
import EcosystemTab from "./components/EcosystemTab";

export default function App() {
  const [activeTab, setActiveTab] = useState("errors");

  return (
    <PhoneFrame>
      <StatusBar />
      <HeaderArea />

      {/* Tab content area */}
      <div key={activeTab} className="tab-content" style={{ minHeight: "60vh" }}>
        {activeTab === "errors" && <ErrorBookTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "review" && <ReviewTab />}
        {activeTab === "ecosystem" && <EcosystemTab />}
      </div>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </PhoneFrame>
  );
}
