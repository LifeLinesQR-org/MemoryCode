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
}

export const memorialService = new MemorialService()