import { createDbAuthClient, createAuth } from '@redwoodjs/auth-dbauth-web'
import './index.css';

const dbAuthClient = createDbAuthClient()

export const { AuthProvider, useAuth } = createAuth(dbAuthClient)
