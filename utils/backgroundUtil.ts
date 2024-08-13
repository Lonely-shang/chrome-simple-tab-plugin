import { useEffect, useState } from "react";
import request from "./request";

const getBackgroundImg = ()=> {
  const [imageUrl, setImageUrl] = useState<string>("")
  useEffect(() => {
    request<IHPImageArchive>({
      url: "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
      method: "get"
    }).then((res) => {
      const imgUrl = res.data.images[0].url;
      setImageUrl(`https://cn.bing.com${imgUrl}`);
    })
  }, [])
  return imageUrl
}

export default getBackgroundImg;