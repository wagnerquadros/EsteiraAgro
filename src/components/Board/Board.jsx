import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    SortableContext,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import useBoardStore from '../../store/useBoardStore'
import Coluna from '../Coluna/Coluna'
import './Board.css'

function Board() {
    const { colunas, vista, adicionarColuna, reordenarColunas } = useBoardStore()

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 }
        })
    )

    function handleDragEnd(event) {
        const { active, over } = event
        if (!over || active.id === over.id) return
        reordenarColunas(active.id, over.id)
    }

    const estrategia = vista === 'kanban'
        ? horizontalListSortingStrategy
        : verticalListSortingStrategy

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={colunas.map(c => c.id)}
                strategy={estrategia}
            >
                <div className={`board board--${vista}`}>
                    {colunas.map(coluna => (
                        <Coluna
                            key={coluna.id}
                            id={coluna.id}
                            titulo={coluna.titulo}
                            cor={coluna.cor}
                        />
                    ))}
                    <button className="board-botao-adicionar" onClick={adicionarColuna}>
                        + Nova Coluna
                    </button>
                </div>
            </SortableContext>
        </DndContext>
    )
}

export default Board