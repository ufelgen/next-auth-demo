import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {StyledContainer} from "../../components/StyledContainer";
import {OctopusCard} from "../../components/OctopusCard";

export const OctoDetails = () => {
  const [octopus, setOctopus] = useState(null);
  const [locked, setLocked] = useState(false);
  const router = useRouter();
  const {octoId} = router.query;
  useEffect(() => {
    const loadOctoDetails = async () => {
      try {
        const response = await fetch(`/api/octopodes/${octoId}`);
        if (!response.ok) {
          if (response.status === 401) {
            setLocked(true);
            return;
          } else {
            throw new Error(`status: ${response.status}`);
          }
        }
        const data = await response.json();
        setOctopus(data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    if (octoId) {
      loadOctoDetails();
    }
  }, [octoId]);

  return (
    <StyledContainer>
      <OctopusCard octopus={octopus} locked={locked} />
    </StyledContainer>
  );
};

export default OctoDetails;
