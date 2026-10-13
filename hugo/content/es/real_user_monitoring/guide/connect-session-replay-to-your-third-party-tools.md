---
description: Integre Session Replay con herramientas de análisis y experiencia del
  cliente de terceros accediendo a las URL de Session Replay desde el navegador.
further_reading:
- link: /session_replay/
  tag: Documentación
  text: Obtenga más información sobre Session Replay
title: Conecte Session Replay a sus herramientas de terceros
---
## Descripción general {#overview}

Session Replay proporciona información visual para complementar los datos de análisis de usuario. Si utiliza herramientas de terceros para la experiencia del cliente, análisis de sitios web y más, puede conectarlas a Session Replay. Esta guía le explica cómo acceder a la URL de Session Replay para usarla en integraciones, directamente desde el navegador donde se está llevando a cabo la sesión. 

## Casos de uso {#use-cases}

Es posible que desee conectar una herramienta de terceros con Session Replay para visualizar de forma más completa los indicadores de experiencia del usuario, tales como los siguientes:

- Resultados de encuestas de formularios
- Herramientas de experiencia del cliente
- Análisis de datos

## Obtenga el enlace de Session Replay {#get-the-session-replay-link}

Para obtener la URL de la grabación de la sesión de usuario actual, utilice el siguiente fragmento, dependiendo del método de instalación que utilizó para configurar RUM:

**Nota**: Proporcionar un valor para `subdomain` al obtener la URL de grabación de la sesión de usuario es opcional, pero debe proporcionarse si accede a Datadog a través de un subdominio personalizado y desea ver el dominio personalizado en la URL que se devuelve.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    // optional, only needed if using a custom domain name
    subdomain: ''
    ...
});

const url = datadogRum.getSessionReplayLink();
```

{{% /tab %}}

{{% tab "CDN async" %}}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        // optional, only needed if using a custom domain name
        subdomain: ''
        ...
    })
    const url = DD_RUM.getSessionReplayLink();
})

```

{{% /tab %}}

{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
         // optional, only needed if using a custom domain name
        subdomain: ''
        ...
    });
const url = DD_RUM && DD_RUM.getSessionReplayLink();
```

{{% /tab %}}

{{< /tabs >}}

## Enviar enlace a una herramienta de terceros {#send-link-to-a-third-party-tool}

Una vez que recupere el enlace a través del fragmento anterior, tiene varias formas diferentes de pasar los datos, dependiendo de la(s) opción(es) que ofrezca su herramienta de terceros:

- Como un campo de formulario oculto.
- Como un campo JSON.
- A través de un parámetro de URL.
- Directamente en su integración de preferencia en JavaScript.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}