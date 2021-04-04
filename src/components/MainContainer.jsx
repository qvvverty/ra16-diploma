export default function MainContainer(props) {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          {props.children}
        </div>
      </div>
    </main>
  )
}
