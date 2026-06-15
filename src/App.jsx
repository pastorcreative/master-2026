import puntosOro from './data/puntos-oro.json'
import puntosPlata from './data/puntos-plata.json'
import logo from './data/logo.svg'
import './App.css'

function App() {
  const oroData = puntosOro.map(p => ({ ...p, puntuacion: p.puntuacion, categoria: 'ORO' }))
  const plataData = puntosPlata.map(p => ({ ...p, puntuacion: p.puntos, categoria: 'PLATA' }))

  oroData.sort((a, b) => b.puntuacion - a.puntuacion)
  plataData.sort((a, b) => b.puntuacion - a.puntuacion)

  const oroTop16 = new Set(puntosOro.slice(0, 16).map(p => p.nombre))
  const plataTop16 = new Set(puntosPlata.slice(0, 16).map(p => p.nombre))

  const addPositions = (players) => {
    let posicion = 1
    return players.map((player, idx) => {
      if (idx > 0 && player.puntuacion === players[idx - 1].puntuacion) {
        return { ...player, posicion: '=' }
      }
      posicion = idx + 1
      return { ...player, posicion }
    })
  }

  const oroWithPos = addPositions(oroData)
  const plataWithPos = addPositions(plataData)

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">MASTER 2026 CTP LA ESTACIÓN</h1>
      </header>

      <div className="tables-container">
        <div className="table-section">
          <h2 className="table-title oro">ORO</h2>
          <table className="ranking-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Jugador</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {oroWithPos.map((player, idx) => {
                const isTop16 = oroTop16.has(player.nombre)
                return (
                  <tr key={`oro-${player.nombre}-${idx}`} className={isTop16 ? 'highlight' : ''}>
                    <td className="posicion">{player.posicion}</td>
                    <td className="nombre">{player.nombre}</td>
                    <td className="puntos">{player.puntuacion}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="table-section">
          <h2 className="table-title plata">PLATA</h2>
          <table className="ranking-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Jugador</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {plataWithPos.map((player, idx) => {
                const isTop16 = plataTop16.has(player.nombre)
                return (
                  <tr key={`plata-${player.nombre}-${idx}`} className={isTop16 ? 'highlight' : ''}>
                    <td className="posicion">{player.posicion}</td>
                    <td className="nombre">{player.nombre}</td>
                    <td className="puntos">{player.puntuacion}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App