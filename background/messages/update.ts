import type { PlasmoMessaging } from "@plasmohq/messaging"
import { getPort } from "@plasmohq/messaging/background"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const theme = getPort("theme")
  console.log(req.body);
  
  theme.postMessage({
    theme: req.body.theme
  })
}

export default handler
