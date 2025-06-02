import {Link} from 'react-router-dom';


function Erro404() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80.6vh', backdropFilter: 'blur(20px)'}}>
            <h2 style={{fontSize: "52px"}}>Erro 404</h2>
            <Link className='login-button' to={'/home'}>
            Voltar para a Home</Link>
        </div>
    );
}

export default Erro404;