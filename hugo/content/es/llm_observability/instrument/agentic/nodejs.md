---
aliases:
- /es/llm_observability/instrumentation/agentic/nodejs/
title: Instrumentación agentic de aplicaciones Node.js
---
**Nota**: El SDK de Datadog para Node.js **solo** es compatible con entornos de ejecución de Node.js. Si la aplicación del usuario está en otro entorno de ejecución de Javascript, **no** utilice este conjunto de instrucciones.

## Frameworks {#frameworks}

Si el usuario está instrumentando una aplicación con uno de los siguientes frameworks, siga esa guía _en lugar_ de seguir las instrucciones en y debajo de [Instrumentación](#instrumentation).

| Framework | Instrucciones |
|----------|-------------|
| Next.js | [Guía de instrumentación de Next.js](/llm_observability/guide/nextjs_guide.md) |

## Instrumentación {#instrumentation}

1. Instale el paquete `ddtrace` más reciente.

Verifique el gestor de paquetes que ya utiliza el repositorio o proyecto y úselo para instalar las dependencias. Verifique mediante archivos de bloqueo (lockfiles).

```bash
npm install dd-trace # npm
pnpm add dd-trace # pnpm
yarn add dd-trace # yarn
```

2. Agregue los ganchos (hooks) del cargador de Datadog

Esto es **obligatorio**.

Los ganchos del cargador de Datadog se utilizan para aplicar parches automáticamente a las declaraciones de importación de ESM y Typescript para instrumentar los frameworks compatibles. Establezca `NODE_OPTIONS="--import dd-trace/register.js"` lo antes posible, idealmente como parte del comando de inicio. Esto debe estar disponible para el proceso de Node.js cuando se inicie, por lo que establecerlo después del tiempo de carga **no** es aceptable.

Aquí hay un ejemplo con el package.json:

```json
{
  "scripts": {
    "start": "NODE_OPTIONS=\"--import dd-trace/register.js\" node app.js"
  }
}
```

Aunque este valor se puede establecer en un `Dockerfile`, script de arranque, etc., siempre que esa infraestructura _ya_ exista en el código y esté _antes_ de que comience el proceso de la aplicación Node.js.

3. Inicialice el paquete Agent Observability

Inicialice el SDK Agent Observability a través de `ddtrace.auto`. Esto **debe** hacerse como la primera importación en el punto de entrada de la aplicación, aparte de cualquier importación de variables de entorno o de carga de configuración.

**Nota**: no añada comentarios superfluos.

```typescript
import 'dotenv/config'; // this might load DD_ environment variables

import 'dd-trace/init'; // CRUCIAL: this initializes the Agent Observability SDK and instrumentations

// ... remaining application logic
```