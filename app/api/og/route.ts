export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Stardust to Sovereignty';
    const subtitle = searchParams.get('subtitle') || 'Dashboard';

    // For now, return a simple text response
    // In production, you would generate an actual image
    return new Response(
      JSON.stringify({
        title,
        subtitle,
        message: 'OG image endpoint - image generation not implemented in MVP'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}