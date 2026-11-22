export const accessPreviews = {
  'Locked Screen': { message: 'This screen previews a locked session. You can return through the demo sign-in screen.', link: '#sign-in', action: 'Go to Sign In' },
  'Forgot Password': { message: 'Password resets require an authentication service. You can open the demo workspace from Sign In.', link: '#sign-in', action: 'Go to Sign In' },
  'Page 404': { title: 'Page not found', message: 'The requested page could not be found.' },
  'Page 403': { title: 'Access forbidden', message: 'You do not have access to the requested page.' },
  'Page 500': { title: 'Internal server error', message: 'The server encountered an unexpected error.' },
  'Page 503': { title: 'Service unavailable', message: 'The service is temporarily unavailable.' },
} as const
export type AccessPage = keyof typeof accessPreviews
