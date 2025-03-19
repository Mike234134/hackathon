import { useNavigate } from 'react-router-dom'
const Home=()=> {
    const navigate = useNavigate();
    const handleExplore = () => {
      navigate('/signup')
    }

    return (
      <>
        <div>
        <button className='signup' onClick={handleExplore}>signup</button>
          
        </div>
      </>
    )
  }
  
  export default Home