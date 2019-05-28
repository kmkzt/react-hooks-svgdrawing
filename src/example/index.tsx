import React, {
  useEffect,
  useRef,
  Fragment,
  useCallback,
  useState
} from 'react'
import { render } from 'react-dom'
import Pressure from 'pressure'
import { useSvgDrawing } from '../'

const getRandomInt = (max: number): number =>
  Math.floor(Math.random() * Math.floor(max))
const getRandomColor = (): string =>
  `#${Array.from({ length: 3 }, () =>
    String(getRandomInt(255).toString(16)).padStart(2, '0')
  ).join('')}`

const Example = () => {
  const [
    divRef,
    {
      two: drawingTwo,
      clear: drawingClear,
      undo,
      getSvgXML,
      download,
      changePenColor,
      changePenWidth
    }
  ] = useSvgDrawing({
    penWidth: 3,
    penColor: '#000',
    width: 500,
    height: 500
  })
  const [randomPen, switchRandom] = useState<boolean>(false)
  const [xml, setXml] = useState('')
  const [penMode, setPenMode] = useState<string>('normal')
  const [penWidth, setPenWidth] = useState<number>(5)
  const [penThinnerWidth, setPenThinnerWidth] = useState<number>(0)
  const handleColor = useCallback(() => {
    changePenColor(getRandomColor())
  }, [changePenColor])

  const handlePenWidth = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPenWidth(Number(e.target.value))
      changePenWidth(Number(e.target.value))
    },
    [changePenWidth]
  )
  const handleChangeXML = useCallback(() => {
    setXml(getSvgXML())
  }, [getSvgXML])
  const handleChangeMode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPenMode(e.target.value)
    },
    []
  )
  const handleUpdatePenConfig = useCallback(
    (e: any) => {
      if (penMode === 'rainbow') {
        changePenColor(getRandomColor())
        return
      }
      if (penMode === 'random') {
        changePenWidth(getRandomInt(50) + 5)
        return
      }
      if (penMode == 'thinner') {
        changePenWidth(penThinnerWidth)
      }
      if (penMode === 'normal') {
        changePenWidth(penWidth)
      }
    },
    [penMode, penWidth, changePenWidth, changePenColor, penThinnerWidth]
  )
  // TODO: Fix Can not switch normal pen.
  const pressureChange = useCallback(
    (force: any, event: any) => {
      setPenThinnerWidth(30 - Math.floor(force * 40))
    },
    [setPenThinnerWidth]
  )

  // Pressure -> https://github.com/stuyam/pressure
  useEffect(() => {
    if (!divRef.current) return
    Pressure.set(divRef.current, {
      change: pressureChange
    })
  }, [divRef, pressureChange])
  return (
    <Fragment>
      <fieldset>
        <label>
          <input
            type="checkbox"
            checked={penMode === 'normal'}
            value="normal"
            onChange={handleChangeMode}
          />
          Normal pen.
        </label>
        <label>
          <input
            type="checkbox"
            checked={penMode === 'thinner'}
            value="thinner"
            onChange={handleChangeMode}
          />
          Pen becoming thinner.
        </label>
        <label>
          <input
            type="checkbox"
            checked={penMode === 'random'}
            value="random"
            onChange={handleChangeMode}
          />
          Pen becoming Random Width.
        </label>
        <label>
          <input
            type="checkbox"
            checked={penMode === 'rainbow'}
            value="rainbow"
            onChange={handleChangeMode}
          />
          Rainbow pen.
        </label>
        {['normal', 'rainbow'].includes(penMode) && (
          <div>
            pen width
            <input
              type="range"
              value={penWidth}
              min={1}
              max={50}
              onChange={handlePenWidth}
            />
          </div>
        )}
        {penMode !== 'rainbow' && (
          <button onClick={handleColor}>Change Color</button>
        )}
      </fieldset>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flexWrap'
        }}
      >
        <div>
          <div
            ref={divRef}
            style={{
              border: '1px solid #eee',
              margin: 'auto'
            }}
            onMouseMove={handleUpdatePenConfig}
            onTouchMove={handleUpdatePenConfig}
            onTouchEnd={handleChangeXML}
            onMouseLeave={handleChangeXML}
          />
          <button onClick={undo}>Undo</button>
          <button onClick={drawingClear}>Clear</button>
          <button onClick={download}>Download SVG</button>
        </div>
      </div>
      <p
        style={{
          fontSize: '8px'
        }}
      >
        {xml}
      </p>
    </Fragment>
  )
}

const app = document.createElement('div')
document.body.appendChild(app)
render(<Example />, app)
