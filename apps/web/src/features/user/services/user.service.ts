import { api } from '@/shared/api'

import type { TypeSettingsSchema } from '../schemes'
import type { IUser } from '../types'

class UserService {
	public async findProfile() {
		const response = await api.get<IUser>('users/profile')

		return response
	}

	public async updateProfile(body: TypeSettingsSchema) {
		const response = await api.patch<IUser>('users/profile', body)

		return response
	}
}

export const userService = new UserService()
