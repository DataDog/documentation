---
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: Documentación
  text: Más información sobre Session Replay
title: Conectar Session Replay a tus herramientas de terceros
---

## Información general

Session Replay proporciona información visual para complementar los datos de análisis de usuarios. Si utilizas herramientas de terceros para la experiencia del cliente, el análisis de sitios web, etc., puedes conectarlas a Session Replay. En esta guía se explica cómo acceder a la URL de Session Replay para utilizarla en integraciones, en directo desde el navegador en el que se está produciendo la sesión. 

## Casos de uso

Es posible que quieras conectar una herramienta de terceros a Session Replay para tener una visión más completa de los indicadores de la experiencia del usuario, como los siguientes:

- Resultados de la encuesta
- Herramientas de experiencia del cliente
- Análisis de datos

## Ver el enlace a Session Replay

Para obtener la URL de la grabación de la sesión actual del usuario, utiliza el siguiente fragmento, dependiendo del método de instalación que hayas utilizado para configurar RUM:

**Nota**: Proporcionar un valor para `subdomain` cuando se obtiene la URL de la grabación de la sesión del usuario es opcional, pero debe proporcionarse si estás accediendo a Datadog a través de un subdominio personalizado y quieres ver el dominio personalizado en la URL que se devuelve.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    // opcional, sólo es necesario si se utiliza un nombre de dominio personalizado
    subdominio: ''
    ...
});

const url = datadogRum.getSessionReplayLink();
```

{{% /tab %}}

{{% tab "CDN asínc" %}}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        // opcional, sólo es necesario si se utiliza un nombre de dominio personalizado
        subdominio: ''
        ...
    })
    const url = DD_RUM.getSessionReplayLink();
})

```

{{% /tab %}}

{{% tab "CDN sínc" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
         // opcional, sólo es necesario si se utiliza un nombre de dominio personalizado
        subdominio: ''
        ...
    });
const url = DD_RUM && DD_RUM.getSessionReplayLink();
```

{{% /tab %}}

{{< /tabs >}}

## Enviar el enlace a una herramienta de terceros

Una vez recuperado el enlace a través del fragmento anterior, existen varias formas de pasar los datos, dependiendo de las opciones que ofrezcan tus herramientas de terceros:

- Como campo oculto del formulario.
- Como campo JSON.
- A través de un parámetro URL.
- Directamente en la integración de tu elección en JavaScript.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}