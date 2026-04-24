import fondo from '../imagenes/fondo.jpg';

function Login(props){
    const envioFormulario = (event)=>{
        event.preventDefault();
        const form = event.target;
        props.inicioSesion(form.email.value, form.password.value);
    }
    return(
        <div style={{ 
            backgroundImage: `url(${fondo})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center' 
        }}>
            <form onSubmit={envioFormulario} style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
            <h2 style={{ color: 'black', fontWeight: 'bold', marginBottom: '25px',fontSize: '24px', textAlign: 'center'}}>
                INICIO SESIÓN
            </h2>                
                <label>Email</label>
                <input text="email" name="email" placeholder=""></input>

                <label>Contraseña</label>
                <input type="password" name="password"></input>

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}
export default Login;