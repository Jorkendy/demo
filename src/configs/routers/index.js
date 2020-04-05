import React from 'react'

import loadable from 'utils/loadable'

const SignIn = loadable(() => import('pages/SignIn'))
const Playlists = loadable(() => import('pages/Playlists'))
const NewPlaylist = loadable(() => import('pages/NewPlaylist'))
const CodeManagement = loadable(() => import('pages/CodeManagement'))
const ClientManagement = loadable(() => import('pages/ClientManagement'))

const KeyPath = {
  Home: '/',
  SignIn: 'sign-in',
  Playlists: 'playlists',
  NewPlaylist: 'new-playlist',
  CodeManagement: 'code-management',
  ClientManagement: 'client-management'
}

const Routes = [
  {
    path: KeyPath.Home,
    redirectTo: KeyPath.Playlists
  },
  {
    path: KeyPath.Playlists,
    exact: true,
    element: <Playlists />
  }
]

export default Routes
