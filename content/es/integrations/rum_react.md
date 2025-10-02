---
app_id: rum-react
app_uuid: e112aa24-4dc9-465f-9f23-c1284c4d0d63
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- red
- rastreo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_react/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_react
integration_id: rum-react
integration_title: React
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_react
public_title: React
short_description: Monitorizar las aplicaciones de React y generar métricas utilizando
  Datadog RUM
supported_os:
- android
- linux
- Windows
- ios
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Network
  - Category::Tracing
  - Supported OS::Android
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::iOS
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorizar las aplicaciones de React y generar métricas utilizando
    Datadog RUM
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: React
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Con la integración de Datadog RUM React, resuelve rápidamente los problemas de rendimiento de los componentes de React mediante:

- Depuración de la causa raíz de los cuellos de botella en el rendimiento, como un tiempo de respuesta lento del servidor, un recurso que bloquea la representación o un error en un componente.
- Correlación automática de los datos de rendimiento web con los recorridos de los usuarios, las llamadas HTTP y los logs
- Alerta a tus equipos de ingeniería cuando las métricas cruciales del rendimiento de la web (como Core Web Vitals) caigan por debajo de un umbral que provoque una mala experiencia del usuario

Monitoriza tus aplicaciones de React de principio a fin mediante:

- Rastreo y visualización de los recorridos de los usuarios en todo el stack tecnológico
- Depuración de la causa raíz de los tiempos de carga lentos, que puede ser un problema con tu código de React, el rendimiento de red o la infraestructura subyacente
- Análisis y contextualización de cada sesión de usuario con atributos como ID de usuario, dirección de correo electrónico, nombre, etc.
- Unificación de la monitorización de stack completo en una plataforma para equipos de desarrollo frontend y backend

## Configuración

Empieza por configurar [Datadog RUM][1] en tu aplicación de React. Si estás creando una nueva aplicación de RUM en la aplicación de Datadog, selecciona React como tipo de aplicación. Si ya tienes una aplicación de RUM, puedes actualizar su tipo a React. Una vez configurada, la aplicación de Datadog proporcionará instrucciones para integrar el [complemento de RUM-React][2] con el SDK del navegador.

## Error Tracking

Para rastrear errores de representación de componentes de React, utiliza uno de los siguientes métodos:

- Un componente de `ErrorBoundary` (consulta la [documentación de React][3]) que detecta errores y los informa a Datadog.
- Una función que puedes utilizar para informar de errores desde tu propio componente `ErrorBoundary`.

#### `ErrorBoundary` uso

```javascript
import { ErrorBoundary } from '@datadog/browser-rum-react'

function App() {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <MyComponent />
    </ErrorBoundary>
  )
}

function ErrorFallback({ resetError, error }) {
  return (
    <p>
      Oops, something went wrong! <strong>{String(error)}</strong> <button onClick={resetError}>Retry</button>
    </p>
  )
}
```

### Informar de los errores de React desde tu propio `ErrorBoundary`

```javascript
import { addReactError } from '@datadog/browser-rum-react'

class MyErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    addReactError(error, errorInfo)
  }

  render() {
    ...
  }
}
```

## Integración del enrutador React

`react-router` v6 permite declarar rutas utilizando los siguientes métodos:

- Crea enrutadores con las funciones [`createMemoryRouter`][4], [`createHashRouter`][5] o [`createBrowserRouter`][6].
- Utiliza el enlace [`useRoutes`][7].
- Utiliza el componente [`Routes`][8].

Para rastrear los cambios de ruta con el SDK del navegador de Datadog RUM, primero inicializa el `reactPlugin` con la opción `router: true` y, a continuación, sustituye esas funciones por sus equivalentes de `@datadog/browser-rum-react/react-router-v6`. Ejemplo:

```javascript
import { RouterProvider } from 'react-router-dom'
import { datadogRum } from '@datadog/browser-rum'
import { reactPlugin } from '@datadog/browser-rum-react'
// Use "createBrowserRouter" from @datadog/browser-rum-react/react-router-v6 instead of react-router-dom:
import { createBrowserRouter } from '@datadog/browser-rum-react/react-router-v6'

datadogRum.init({
  ...
  plugins: [reactPlugin({ router: true })],
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    ...
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
```

## Ve más lejos con la integración de Datadog React

### Trazas

Conecta tu RUM y datos de trazas (traces) para obtener una visión completa del rendimiento de tu aplicación. Consulta [Conectar RUM y trazas (traces)][9].

### Logs

Para empezar a reenviar los logs de tu aplicación de React a Datadog, consulta [JavaScript Logs Collection][10].

### Métricas

Para generar métricas personalizadas desde tu aplicación de RUM, consulta [Generar métricas][11].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [Datadog Support][12].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [React Monitoring][13]

[1]: https://docs.datadoghq.com/es/real_user_monitoring/browser/setup/client
[2]: https://www.npmjs.com/package/@datadog/browser-rum-react
[3]: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
[4]: https://reactrouter.com/en/main/routers/create-memory-router
[5]: https://reactrouter.com/en/main/routers/create-hash-router
[6]: https://reactrouter.com/en/main/routers/create-browser-router
[7]: https://reactrouter.com/en/main/hooks/use-routes
[8]: https://reactrouter.com/en/main/components/routes
[9]: https://docs.datadoghq.com/es/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum
[10]: https://docs.datadoghq.com/es/logs/log_collection/javascript/
[11]: https://docs.datadoghq.com/es/real_user_monitoring/generate_metrics
[12]: https://docs.datadoghq.com/es/help/
[13]: https://www.datadoghq.com/blog/datadog-rum-react-components/