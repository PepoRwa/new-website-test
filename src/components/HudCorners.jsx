export default function HudCorners() {
  return (
    <>
      <div className="hud-corner" style={{ top: 8, left: 8, borderRight: 'none', borderBottom: 'none' }} />
      <div className="hud-corner" style={{ top: 8, right: 8, borderLeft: 'none', borderBottom: 'none' }} />
      <div className="hud-corner" style={{ bottom: 8, left: 8, borderRight: 'none', borderTop: 'none' }} />
      <div className="hud-corner" style={{ bottom: 8, right: 8, borderLeft: 'none', borderTop: 'none' }} />
    </>
  );
}
