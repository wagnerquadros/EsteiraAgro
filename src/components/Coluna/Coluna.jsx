import './Coluna.css'

function Coluna({ titulo, cor }) {
    return (
        <div className="coluna" style={{ borderTopColor: cor }}>
            <div className="coluna-cabecalho">
                <span className="coluna-titulo">{titulo}</span>
            </div>
            <div className="coluna-lista">
            </div>
        </div>
    )
}

export default Coluna