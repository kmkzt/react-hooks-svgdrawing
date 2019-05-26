import React, {
  useEffect,
  useRef,
  Fragment,
  useCallback,
  useState
} from 'react'
import { render } from 'react-dom'
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

  const [xml, setXml] = useState('')
  const handleColor = useCallback(() => {
    changePenColor(getRandomColor())
  }, [changePenColor])

  const handlePenWidth = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changePenWidth(Number(e.target.value))
    },
    [changePenWidth]
  )
  const handleChangeXML = useCallback(() => {
    setXml(getSvgXML())
  }, [getSvgXML])
  return (
    <Fragment>
      <div>
        pen width
        <input
          type="range"
          defaultValue="5"
          min={1}
          max={50}
          onChange={handlePenWidth}
        />
      </div>
      <button onClick={undo}>Undo</button>
      <button onClick={handleColor}>Change Color</button>
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
            onTouchEnd={handleChangeXML}
            onMouseLeave={handleChangeXML}
          />
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
