# Stardust to Sovereignty - Frontend

This is the public-facing frontend for the Stardust to Sovereignty platform.

## Features

- Landing page with 6 portal modules
- 3-column About section
- Golden orb background animations
- Scrollstream ticker
- Responsive design
- Mobile-first approach
- Custom 404 page with "coming online soon" message

## Development

```bash
npm install
npm run dev
```

## Deployment

This frontend is deployed separately from the backend CMS to avoid disruption.

- **Frontend**: Deployed to Vercel (stardusttosovereignty.com)
- **Backend**: Remains in main repository (creator dashboard)

## Structure

- `/app` - Next.js App Router pages
- `/components` - React components
- `/public` - Static assets

## Future Integration

This frontend will eventually connect to the backend CMS via API routes, but maintains separation for clean deployment.