import './Board.css'
import Coluna from '../Coluna/Coluna'

const COLUNAS = [
    { id: 'intencao', titulo: 'Intenção', cor: '#e67e22' },
    { id: 'acolhida', titulo: 'Acolhida', cor: '#f1c40f' },
    { id: 'despachada', titulo: 'Despachada', cor: '#1abc9c' },
    { id: 'liberada', titulo: 'Liberada', cor: '#27ae60' },
    { id: 'pendente', titulo: 'Pendente', cor: '#e74c3c' },
]

function Board() {
    return (
        <div className="board">
            {COLUNAS.map(coluna => (
                <Coluna key={coluna.id} titulo={coluna.titulo} cor={coluna.cor} />
            ))}
        </div>
    )
}

export default Board