import { create } from 'zustand'
import { arrayMove } from '@dnd-kit/sortable'

const COLUNAS_INICIAIS = [
    { id: 'intencao',    titulo: 'Intenção',   cor: '#e67e22' },
    { id: 'acolhida',   titulo: 'Acolhida',   cor: '#f1c40f' },
    { id: 'despachada', titulo: 'Despachada', cor: '#1abc9c' },
    { id: 'liberada',   titulo: 'Liberada',   cor: '#27ae60' },
    { id: 'pendente',   titulo: 'Pendente',   cor: '#e74c3c' },
]

const useBoardStore = create((set) => ({

    // ── Estado ──
    colunas: COLUNAS_INICIAIS,
    cards: [],
    vista: 'kanban',

    // ── Ações das colunas ──
    adicionarColuna: () => set((state) => ({
        colunas: [
            ...state.colunas,
            {
                id: crypto.randomUUID(),
                titulo: 'Nova Coluna',
                cor: '#7a93b4',
            }
        ]
    })),

    excluirColuna: (id) => set((state) => ({
        colunas: state.colunas.filter(c => c.id !== id),
        cards:   state.cards.filter(c => c.colunaId !== id),
    })),

    atualizarColuna: (id, campo, valor) => set((state) => ({
        colunas: state.colunas.map(c =>
            c.id === id ? { ...c, [campo]: valor } : c
        )
    })),

    reordenarColunas: (idAtivo, idSobre) => set((state) => {
        const de  = state.colunas.findIndex(c => c.id === idAtivo)
        const para = state.colunas.findIndex(c => c.id === idSobre)
        return { colunas: arrayMove(state.colunas, de, para) }
    }),

    // ── Ação de vista ──
    setVista: (vista) => set({ vista }),

}))

export default useBoardStore