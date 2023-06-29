export default ({ ChildOutlet }) => {
  return (
    <div>
      Cart Layout
      {ChildOutlet ? <ChildOutlet /> : []}
    </div>
  )
}