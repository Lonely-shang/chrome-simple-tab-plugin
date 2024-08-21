
const SuggestListItem: React.FC<{
  title: string
  index: number
  active: number
  description?: string
  version?: string
  openUrl?: string
}> = (props, ref) => {
  const openItem = () => {
    !!props.openUrl && window.open(props.openUrl)
  }
  return (
    <li key={props.title} className={`${props.active === props.index ? 'actived' : ''} suggestList-item`} onClick={() => openItem()}>
      <div className="item-left">
        <div>{props.title}</div>
        {!!props.description && <div className="desc">{props.description}</div>}
      </div>
      {!!props.version && <div className="item-right">v{props.version}</div>}
    </li>
  )
}

export default SuggestListItem
