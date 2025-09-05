const N8N_URL = process.env.NEXT_PUBLIC_N8N_URL;

export async function generateVariations(imageUrl: string, count: number) {
  const response = await fetch(`${N8N_URL}/webhook/b40c88ef-a66b-4620-bd86-dfb6a10cc569`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      body: {
        imageUrl,
        variations: count,
        projectId: crypto.randomUUID()
      }
    })
  });
  return response.json();
}
