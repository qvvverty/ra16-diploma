export default function MainContainer(props) {
  return (
    <main class="container">
      <div class="row">
        <div class="col">
          {props.children}
        </div>
      </div>
    </main>
  )
}
