import { describe, it, expect } from 'vitest';
import { Avatar, User } from '../../models/index.js';

describe('Models Basic Test', () => {
    it('should verify Avatar and User models', async () => {
        const avatar = await Avatar.findOne();
        expect(avatar).toBeDefined();
        
        const user = await User.findOne();
        expect(user).toBeDefined();
    });
});
