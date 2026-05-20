function GestionUsuarios(props){
    return(
        <div className="container mt-3"> 
            
            <table className="table table-striped table-hover table-sm lista-incidencias-ajustada">
                <thead>
                    <tr>
                        <th style={{width: '5%'}}>ID</th> 
                        <th style={{width: '20%'}}>Nombre</th>
                        <th style={{width: '25%'}}>Email</th>
                        <th style={{width: '10%'}}>Rol</th>
                        <th style={{width: '10%'}}>fecha_registro</th>
                    </tr>
                </thead>
                <tbody>
                    {props.usuarios.map((i, index) => (
                        <tr key={i.id || index}> 
                            <td>{i.id}</td> 
                            <td>{i.nombre}</td> 
                            <td>{i.email}</td>
                            <td>{i.rol.nombre_rol}</td>
                            <td>{i.fecha_registro}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default GestionUsuarios;