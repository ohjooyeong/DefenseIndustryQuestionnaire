import React, { useCallback, useState } from "react";
import ProfileSection from "./section/ProfileSection";
import StartSection from "./section/StartSection";

function Start() {
  const [StartBtn, setStartBtn] = useState(false);

  const handleNext = useCallback(() => {
    setStartBtn(true);
  }, []);

  if (StartBtn) {
    return <ProfileSection />;
  }

  return <StartSection handleNext={handleNext} />;
}

export default Start;
