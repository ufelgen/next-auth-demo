import octopodes from "../../../_data/octopodes.json";
import {getToken} from "next-auth/jwt";

async function handler(req, res) {
  const {octoId} = req.query;
  switch (req.method) {
    case "GET":
      try {
        const user = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

        if (!user) {
          return res.status(401).json({message: "you are not logged in"});
        }

        const octopus = octopodes.find(octo => octo.id === octoId);

        if (!octopus) {
          return res.status(404).json({message: "octopus not found"});
        }

        if (octopus.email !== user.email) {
          return res.status(401).json({message: "unauthorized"});
        }
        return res.status(200).json(octopus);
      } catch (error) {
        console.log(error);
        return res.status(500).json({error: "error"});
      }
    default:
      return res.status(405).json({error: "method not allowed"});
  }
}

export default handler;
