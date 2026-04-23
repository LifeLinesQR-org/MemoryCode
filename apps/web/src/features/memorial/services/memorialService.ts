import { api } from '@/shared/api'
import type { IMemorial } from '../types/memorial.types'

class MemorialService {
    public async findPopular() {
        const response = await api.get<IMemorial[]>('memorials')
        return response
    }

    public async findById(id: string) {
        const response = await api.get<IMemorial>(`memorials/${id}`)
        return response
    }

    public async create(memorial: any) {
        const response = await api.post<IMemorial>('memorials/create', memorial)
        return response
    }

    public async edit(id: string, memorial: any) {
        const response = await api.post<IMemorial>(`memorials/${id}/update`, memorial)
        console.log("edit response: ", response)
        return response
    }
}

export const memorialService = new MemorialService()