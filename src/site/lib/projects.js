import { projectsService } from '../../services/projectsService';
import { projectDetails } from '../data/projectDetails';

const isVideoOrDrive = (url = '') => /youtube\.com|youtu\.be|loom\.com|drive\.google\.com/.test(url);

/** Images saved as "./foo.png" live in /public. */
const resolveImage = (src = '') => (src.startsWith('./') ? src.slice(1) : src);

/** Merge a Supabase row with its local detail entry into one view model. */
function toViewModel(row) {
  const key = (row.title || '').trim().toLowerCase();
  const d = projectDetails[key] || {};
  const liveOrDemo = row.liveDemo || row.livedemo || '';
  const demoIsVideo = isVideoOrDrive(liveOrDemo);

  const award =
    d.award ||
    (row.is_hackathon && row.hackathon_position && row.hackathon_position !== 'None'
      ? row.hackathon_position
      : row.category || 'Project');

  return {
    id: row.id,
    key,
    title: d.title || row.title,
    category: row.category || 'Project',
    award,
    event: d.event || (row.is_hackathon ? 'Hackathon' : row.category || ''),
    image: resolveImage(row.image),
    summary: d.summary || row.short_summary || row.description,
    overview: d.overview || row.description,
    features: d.features || (row.key_features?.length ? row.key_features : []),
    how: d.how || [],
    stack: d.stack || row.technologies || [],
    links: {
      live: demoIsVideo ? null : liveOrDemo || null,
      demo: demoIsVideo ? liveOrDemo : null,
      source: row.github || null,
    },
    demoLabel: d.demoLabel || 'Watch demo',
    arch: d.arch || [],
    slug: (d.title || row.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    order: d.order ?? 999,
    createdAt: row.created_at,
  };
}

export async function loadProjects() {
  const { data, error } = await projectsService.getProjects();
  if (error) throw error;
  return (data || [])
    .map(toViewModel)
    .sort((a, b) => a.order - b.order || new Date(b.createdAt) - new Date(a.createdAt));
}
