import type { PlasmoMessaging } from "@plasmohq/messaging"

const theme: PlasmoMessaging.PortHandler = async (req, res) => {
  console.log(req);
  res.send({
    theme: 'dark'
  })
}

export default theme