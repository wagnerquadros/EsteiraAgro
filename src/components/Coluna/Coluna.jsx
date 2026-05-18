import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useBoardStore from '../../store/useBoardStore'
import './Coluna.css'

function Coluna({ id, titulo, cor }) {
    const [editandoTitulo, setEditandoTitulo] = useState(false)
    const { excluirColuna, atualizarColuna } = useBoardStore()

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id })

    const estiloArrastar = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 999 : 'auto',
    }

    function handleTituloBlur(e) {
        const novoTitulo = e.target.value.trim()
        if (novoTitulo) atualizarColuna(id, 'titulo', novoTitulo)
        setEditandoTitulo(false)
    }

    function handleTituloKeyDown(e) {
        if (e.key === 'Enter')  e.target.blur()
        if (e.key === 'Escape') setEditandoTitulo(false)
    }

    return (
        <div
            className="coluna"
            style={{ borderTopColor: cor, ...estiloArrastar }}
            ref={setNodeRef}
        >
            <div className="coluna-cabecalho">
                <div className="coluna-cabecalho-esquerda">

                    <div
                        className="coluna-alca"
                        {...attributes}
                        {...listeners}
                        title="Arrastar coluna"
                    >
                        ⠿
                    </div>

                    <input
                        type="color"
                        className="coluna-cor"
                        value={cor}
                        onChange={e => atualizarColuna(id, 'cor', e.target.value)}
                        title="Alterar cor"
                    />

                    {editandoTitulo ? (
                        <input
                            type="text"
                            className="coluna-titulo-input"
                            defaultValue={titulo}
                            onBlur={handleTituloBlur}
                            onKeyDown={handleTituloKeyDown}
                            autoFocus
                        />
                    ) : (
                        <span
                            className="coluna-titulo"
                            onClick={() => setEditandoTitulo(true)}
                            title="Clique para editar"
                        >
              {titulo}
            </span>
                    )}
                </div>

                <button
                    className="coluna-botao-excluir"
                    onClick={() => excluirColuna(id)}
                >
                    ✕
                </button>
            </div>

            <div className="coluna-lista" />
        </div>
    )
}

export default Coluna