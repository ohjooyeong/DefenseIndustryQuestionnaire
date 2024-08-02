import React, { useCallback, useState } from "react";
import ProfileSection from "./section/ProfileSection";
import StartSection from "./section/StartSection/index.alternative";

function Start() {
  const [StartBtn, setStartBtn] = useState(false);

  const handleNext = useCallback(() => {
    localStorage.removeItem("profile");
    localStorage.removeItem("report");
    localStorage.removeItem("result");
    setStartBtn(true);
  }, []);

  if (StartBtn) {
    return <ProfileSection />;
  }

  return <StartSection handleNext={handleNext} />;
}

export default Start;
