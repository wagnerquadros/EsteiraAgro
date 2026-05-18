import useBoardStore from '../../store/useBoardStore'
import './Header.css'

function Header() {
    const { vista, setVista, colunas, cards } = useBoardStore()

    const totalCards = cards.length
    const totalValor = cards.reduce((soma, c) => soma + (c.valor || 0), 0)

    const formatarValor = (v) => v.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })

    return (
        <header className="header">
            <div className="header-esquerda">
                <h1 className="header-titulo">Controle de Financiamento Rural</h1>
            </div>

            <div className="header-centro">
                <span className="header-stat">{formatarValor(totalValor)}</span>
                <span className="header-separador">·</span>
                <span className="header-stat">{colunas.length} colunas</span>
                <span className="header-separador">·</span>
                <span className="header-stat">{totalCards} propostas</span>
            </div>

            <div className="header-direita">
                <div className="header-vistas">
                    <button
                        className={`header-vista-btn ${vista === 'kanban' ? 'ativo' : ''}`}
                        onClick={() => setVista('kanban')}
                        title="Vista Kanban"
                    >
                        ⊞
                    </button>
                    <button
                        className={`header-vista-btn ${vista === 'lista' ? 'ativo' : ''}`}
                        onClick={() => setVista('lista')}
                        title="Vista Lista"
                    >
                        ☰
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header