import { gsap } from "gsap"
import { useLayoutEffect, useState, type MutableRefObject } from "react"

class AnimationManager {
  private mainDom: MutableRefObject<HTMLDivElement>

  private suggestTimeline = useState<gsap.core.Timeline>()
  private suggestReversed = useState<boolean>(true)

  private preTitleTween = useState<gsap.core.Tween>()
  private preTitleReversed = useState<boolean>(true)

  constructor(mainDom: MutableRefObject<HTMLDivElement>) {
    this.mainDom = mainDom

    this.initSuggestAnimated()
    this.initPreTitleAnimated()
  }

  get getPreTitleStatus() {
    return this.preTitleReversed[0]
  }

  setSuggestStatus(enable = true) {
    const [_, setSuggest] = this.suggestReversed
    setSuggest(!enable)
  }

  setPreTitleStatus(enable = true) {
    const [_, setPreTitle] = this.preTitleReversed
    setPreTitle(!enable)
  }

  private initPreTitleAnimated() {
    const [tl, setTl] = this.preTitleTween
    const [reversed, _] = this.preTitleReversed
    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const tween = gsap.to(".searchBox-title", {
          display: "block",
          width: "2rem",
          paddingLeft: 25,
          paddingRight: 10,
          duration: 0.5,
          ease: "back.out",
          onReverseComplete: () => {}
        })
        setTl(tween)
      }, this.mainDom.current)
      return () => ctx.revert()
    }, [])

    useLayoutEffect(() => {
      tl && tl.reversed(reversed)
    }, [reversed, tl])
  }

  private initSuggestAnimated() {
    const [tl, setTl] = this.suggestTimeline
    const [reversed, _] = this.suggestReversed
    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const time = gsap
          .timeline()
          .to(".tabBody-main", {
            borderRadius: "0.2rem",
            duration: 0.4,
            ease: "sine.out"
          })
          .to(
            ".suggestBox",
            {
              height: "3.54rem",
              duration: 0.8,
              ease: "sine.inOut"
            },
            "+=0.1"
          )
        // 把时间线实例添加进tl变量中
        setTl(time)
      }, this.mainDom.current)
      return () => ctx.revert()
    }, [])

    useLayoutEffect(() => {
      tl && tl.reversed(reversed)
    }, [reversed, tl])
  }
}

export default AnimationManager
