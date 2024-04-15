import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';


export default function App(){
    const firstName: string = 'Jeff';
    const lastName: string = 'Chebul';
    const isLoggedIn: boolean = true;

    const posts: {id:number, title:string}[] = [
        {id: 1, title: 'Happy Monday'},
        {id: 2, title: 'React Rules!'},
        {id: 3, title: 'Spring has Sprung'}
    ]

    return (
        <>
            <Navigation isLoggedIn={isLoggedIn}/>
            <Container>
              <h1>Hello World</h1>
              <h2>{isLoggedIn ? `Welcome Back ${firstName} ${lastName}` : 'Please Log In or Sign Up'}</h2>
              {posts.map( p => <h4 key={p.id}>{p.title}</h4> )}
            </Container>
        </>
    )
}
