import { useContext } from "react";
import { Link } from "react-router-dom";


function Menu(props){
    return(
        <div>
            <nav>
                <Link to="/">Inicio</Link><tr></tr>
                <Link to="/Verincidencias">Ver incidencias</Link><tr></tr>
                <Link to="/Registrarincidencias">Registrar incidencias</Link><tr></tr>
                
                {props.usuarioLogin.rol.nombre_rol=== "admin"? <Link to="/Gestionusuarios">Gestion usuarios</Link>
                :
                null}
            </nav>
        </div>
    );
}
export default Menu;