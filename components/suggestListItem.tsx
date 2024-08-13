const SuggestListItem: React.FC<{
  title: string
  description?: string
  version?: string
  openUrl?: string
}> = (props) => {
  const openItem = () => {
    console.log(props.openUrl);

    !!props.openUrl && window.open(props.openUrl)
  }
  return (
    <li key={props.title} className="suggestList-item" onClick={() => openItem()}>
      <div className="item-left">
        <div>{props.title}</div>
        {!!props.description && <div className="desc">{props.description}</div>}
      </div>
      {!!props.version && <div className="item-right">v{props.version}</div>}
    </li>
  )
}

export default SuggestListItem
