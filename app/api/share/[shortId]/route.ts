import { type NextRequest } from 'next/server';
import { fetchDrama } from '@/lib/storage/redis';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ shortId: string }> }
) {
  const { shortId } = await params;

  try {
    const drama = await fetchDrama(shortId);
    if (!drama) {
      return Response.json({ error: 'Drama not found' }, { status: 404 });
    }
    return Response.json(drama);
  } catch {
    return Response.json({ error: 'Storage unavailable' }, { status: 503 });
  }
}
