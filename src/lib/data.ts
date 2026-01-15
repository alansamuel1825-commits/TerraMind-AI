import { PlaceHolderImages } from './placeholder-images';

export type Candidate = {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string;
};

const findImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        // Fallback to a default image if not found, to avoid crashes
        return {
            imageUrl: `https://picsum.photos/seed/${id}/400/400`,
            imageHint: 'portrait',
        }
    }
    return { imageUrl: img.imageUrl, imageHint: img.imageHint };
}

export const headBoyCandidates: Candidate[] = [
  { id: 'hb1', name: 'Alan', ...findImage('candidate-hb-1') },
  { id: 'hb2', name: 'Michael Johnson', ...findImage('candidate-hb-2') },
  { id: 'hb3', name: 'Robert Williams', ...findImage('candidate-hb-3') },
  { id: 'hb4', name: 'David Brown', ...findImage('candidate-hb-4') },
];

export const headGirlCandidates: Candidate[] = [
  { id: 'hg1', name: 'Mary Garcia', ...findImage('candidate-hg-1') },
  { id: 'hg2', name: 'Patricia Miller', ...findImage('candidate-hg-2') },
  { id: 'hg3', name: 'Jennifer Davis', ...findImage('candidate-hg-3') },
  { id: 'hg4', name: 'Linda Rodriguez', ...findImage('candidate-hg-4') },
];
