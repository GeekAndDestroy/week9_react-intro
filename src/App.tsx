
export default function App(){
  const firstName: string = 'Friedrick';
  const lastName: string = 'Von Sticlburgen';
  const isLoggedIn: boolean = false;
  let heading: string;
  // if (isLoggedIn){
  //   heading = 'Welcome back'
  // } else {
  //     heading = 'Please Log In or Sign Up'
  // }

const posts: {id:number, title:string}[] = [
  {id: 1, title: "Happy Monday"},
  {id: 2, title: "React Rules!"},
  {id: 3, title: "Spring has Sprung"}
]



  return (
      <div>
          <h1>Hello World</h1>
          <h2>{isLoggedIn ? `Welcome back${firstName} ${lastName}` : 'Please Log In or Sign Up'}</h2>
          {posts.map( p => <h4 key={p.id}>{p.title}</h4> )}
      </div>
  )
}