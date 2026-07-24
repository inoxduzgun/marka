// Gerçek fotoğraf yerine renk + baş harf ile çizilen stilize avatar.
// hue: her oyuncuya özgü renk tonu (0-360)
export default function Avatar({ firstName, lastName, hue = 40, small = false, photo = null }) {
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  const style = photo
    ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {
        background: `linear-gradient(160deg,
          hsl(${hue} 42% 34%),
          hsl(${(hue + 40) % 360} 48% 20%))`,
      }
  return (
    <div className={`avatar ${small ? 'avatar-sm' : ''}`} style={style}>
      {!photo && (
        <>
          <span className="initials">{initials}</span>
          <svg className="silhouette" viewBox="0 0 100 70" fill={`hsl(${hue} 60% 70%)`}>
            <circle cx="50" cy="22" r="16" />
            <path d="M14 70 Q50 34 86 70 Z" />
          </svg>
        </>
      )}
    </div>
  )
}
