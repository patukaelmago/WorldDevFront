import { useState } from 'react';
export default function ImageGallery({ images = [], name, className }) {
  const pictures = images.filter(image => typeof image === 'string' && image.length);
  const [index, setIndex] = useState(0);
  if (!pictures.length) return <div className="container py-5 text-muted">No image available.</div>;
  return <section className="position-relative" aria-label={`${name} photos`}>
    <img src={pictures[index % pictures.length]} className={className} alt={`${name} · ${index % pictures.length + 1}`} />
    {pictures.length > 1 && <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 bg-white p-2 rounded d-flex gap-3 align-items-center"><button className="btn btn-outline-secondary btn-sm" type="button" aria-label="Previous photo" onClick={() => setIndex(i => (i + pictures.length - 1) % pictures.length)}>←</button><span aria-live="polite">{index % pictures.length + 1} / {pictures.length}</span><button className="btn btn-outline-secondary btn-sm" type="button" aria-label="Next photo" onClick={() => setIndex(i => (i + 1) % pictures.length)}>→</button></div>}
  </section>;
}
