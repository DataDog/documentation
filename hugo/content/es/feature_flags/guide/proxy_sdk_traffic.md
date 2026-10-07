---
description: Enrute las solicitudes de red del SDK de Datadog Feature Flag a través
  de un proxy en su propio dominio.
further_reading:
- link: /feature_flags/guide/proxy_server_setup/
  tag: Guía
  text: Configure un servidor proxy para el tráfico del SDK de Feature Flag
- link: /feature_flags/client/
  tag: Documentación
  text: Feature Flags del lado del cliente
- link: /real_user_monitoring/guide/proxy-rum-data/
  tag: Guía
  text: Proxy para datos de RUM del navegador
title: Proxy para el tráfico del SDK de Feature Flag
---
## Descripción general {#overview}

El SDK de Datadog Feature Flag realiza dos tipos de solicitudes de red salientes desde su aplicación:

1. **Descarga de configuración de marcador**: El SDK obtiene las asignaciones de marcadores precalculadas desde la CDN de Datadog al inicio y cuando cambia el contexto de evaluación. Esta solicitud determina qué variantes de marcador se devuelven a su aplicación.
2. **Cargas de eventos**: El SDK envía datos de eventos de exposición y evaluación a los puntos de conexión de ingesta de Datadog.

Puede enrutar uno o ambos tipos de estas solicitudes a través de un proxy en su propio dominio. Las razones comunes para usar un proxy incluyen:

- Políticas de red que restringen el acceso directo a dominios de terceros desde dispositivos cliente
- Requisitos de cumplimiento o residencia de datos
- Evitar bloqueadores de anuncios para aplicaciones de navegador

<div class="alert alert-info">Los ejemplos de código en esta página utilizan el sitio US1 (<code>datadoghq.com</code>) como ejemplo. Reemplace los dominios de Datadog con los valores correspondientes para su <a href="/getting_started/site/">sitio de Datadog</a>.</div>

## Configure el proxy {#configure-the-proxy}

{{< tabs >}}

{{% tab "Android" %}}

Pase las URL de punto de conexión personalizadas a `FlagsConfiguration.Builder` antes de llamar a `Flags.enable()`.

### Proxy de configuración de marcador {#flag-configuration-proxy}

Para enrutar la descarga de la configuración de marcador a través de su proxy, llame a `useCustomFlagEndpoint` con la URL completa que expone su proxy. El SDK envía una solicitud POST a esta URL con el contexto de evaluación en el cuerpo.

{{< code-block lang="kotlin" filename="Application.kt" >}}
import com.datadog.android.flags.FlagsConfiguration

val flagsConfig = FlagsConfiguration.Builder()
    .useCustomFlagEndpoint("https://proxy.example.com/precompute-assignments")
    .build()

Flags.enable(flagsConfig)
{{< /code-block >}}

Su proxy debe reenviar esta solicitud a la CDN de Datadog: `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (reemplace el subdominio según sea necesario para su [sitio de Datadog][1]). Transmita el cuerpo de la solicitud y todos los encabezados sin cambios.

### Proxy de carga de eventos {#event-upload-proxy}

Para enrutar las cargas de eventos de exposición y evaluación a través de su proxy, llame a los métodos de constructor correspondientes con la URL completa de su punto de conexión de proxy.

{{< code-block lang="kotlin" filename="Application.kt" >}}
import com.datadog.android.flags.FlagsConfiguration

val flagsConfig = FlagsConfiguration.Builder()
    .useCustomFlagEndpoint("https://proxy.example.com/precompute-assignments")
    .useCustomExposureEndpoint("https://proxy.example.com/api/v2/exposures")
    .useCustomEvaluationEndpoint("https://proxy.example.com/api/v2/flagevaluation")
    .build()

Flags.enable(flagsConfig)
{{< /code-block >}}

Su proxy debe reenviar cada solicitud al punto de conexión de ingesta de Datadog correspondiente para su [sitio de Datadog][1] (la siguiente tabla utiliza el sitio US1 como ejemplo):

| Ruta del proxy | Reenviar a |
|---|---|
| `/api/v2/exposures` | `https://api.datadoghq.com/api/v2/exposures` |
| `/api/v2/flagevaluation` | `https://api.datadoghq.com/api/v2/flagevaluation` |

[1]: /es/getting_started/site/

{{% /tab %}}

{{% tab "iOS" %}}

Establezca las URL de punto de conexión personalizadas en `Flags.Configuration` antes de llamar a `Flags.enable(with:)`.

### Proxy de configuración de marcador {#flag-configuration-proxy-1}

Para enrutar la descarga de la configuración de marcador a través de su proxy, establezca `customFlagsEndpoint` en la URL completa que expone su proxy. El SDK envía una solicitud POST a esta URL con el contexto de evaluación en el cuerpo.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
import DatadogFlags

let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments")
)

Flags.enable(with: flagsConfig)
{{< /code-block >}}

Su proxy debe reenviar esta solicitud a la CDN de Datadog: `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (reemplace el subdominio según sea necesario para su [sitio de Datadog][1]). Transmita el cuerpo de la solicitud y todos los encabezados sin cambios.

Para adjuntar encabezados HTTP adicionales a las solicitudes de configuración de marcador (por ejemplo, para la autenticación en su proxy), establezca `customFlagsHeaders`.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments"),
    customFlagsHeaders: ["X-Proxy-Token": "<YOUR_PROXY_TOKEN>"]
)
{{< /code-block >}}

### Proxy de carga de eventos {#event-upload-proxy-1}

Para enrutar las cargas de eventos de exposición y evaluación a través de su proxy, establezca `customExposureEndpoint` y `customEvaluationEndpoint`.

{{< code-block lang="swift" filename="AppDelegate.swift" >}}
let flagsConfig = Flags.Configuration(
    customFlagsEndpoint: URL(string: "https://proxy.example.com/precompute-assignments"),
    customExposureEndpoint: URL(string: "https://proxy.example.com/api/v2/exposures"),
    customEvaluationEndpoint: URL(string: "https://proxy.example.com/api/v2/flagevaluation")
)

Flags.enable(with: flagsConfig)
{{< /code-block >}}

Su proxy debe reenviar cada solicitud al punto de conexión de ingesta de Datadog correspondiente para su [sitio de Datadog][1] (la siguiente tabla utiliza el sitio US1 como ejemplo):

| Ruta del proxy | Reenviar a |
|---|---|
| `/api/v2/exposures` | `https://api.datadoghq.com/api/v2/exposures` |
| `/api/v2/flagevaluation` | `https://api.datadoghq.com/api/v2/flagevaluation` |

[1]: /es/getting_started/site/

{{% /tab %}}

{{% tab "React Native" %}}

Pase un objeto `FlagsConfiguration` a `DdFlags.enable()`.

### Proxy de configuración de marcador {#flag-configuration-proxy-2}

Para enrutar la descarga de la configuración de marcador a través de su proxy, establezca `customFlagsEndpoint` en la URL base de su proxy. El SDK añade `/precompute-assignments` a este valor automáticamente y envía una solicitud POST con el contexto de evaluación en el cuerpo.

{{< code-block lang="typescript" filename="App.tsx" >}}
import { DdFlags } from '@datadog/mobile-react-native';

await DdFlags.enable({
    customFlagsEndpoint: 'https://proxy.example.com',
    // SDK sends POST to: https://proxy.example.com/precompute-assignments
});
{{< /code-block >}}

Su proxy debe reenviar esta solicitud a la CDN de Datadog: `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (reemplace el subdominio según sea necesario para su [sitio de Datadog][1]). Transmita el cuerpo de la solicitud y todos los encabezados sin cambios.

### Proxy de carga de eventos {#event-upload-proxy-2}

Para enrutar las cargas de eventos de exposición a través de su proxy, establezca `customExposureEndpoint` en la URL base de su proxy. El SDK añade `/api/v2/exposures` a este valor automáticamente.

{{< code-block lang="typescript" filename="App.tsx" >}}
await DdFlags.enable({
    customFlagsEndpoint: 'https://proxy.example.com',
    customExposureEndpoint: 'https://proxy.example.com',
    // SDK sends POST to: https://proxy.example.com/api/v2/exposures
});
{{< /code-block >}}

Su proxy debe reenviar las solicitudes de exposición al punto de conexión de ingesta de Datadog correspondiente para su [sitio de Datadog][1]; por ejemplo, para el sitio US1 use `https://api.datadoghq.com/api/v2/exposures`.

<div class="alert alert-info">El SDK de React Native no expone un <code>customEvaluationEndpoint</code> opción. Los eventos de evaluación se envían a través del SDK nativo subyacente de Android o iOS y no se pueden enrutar a través de un punto de conexión de proxy personalizado.</div>

[1]: /es/getting_started/site/

{{% /tab %}}

{{% tab "Navegador" %}}

Pase las opciones de configuración a `DatadogBrowserFlagging.init()`.

### Proxy de configuración de marcador {#flag-configuration-proxy-3}

Para enrutar la descarga de la configuración de marcador a través de su proxy, establezca `flaggingProxy` en la URL de su punto de conexión de proxy. El SDK envía una solicitud POST con el contexto de evaluación en el cuerpo directamente a esta URL, reemplazando el punto de conexión predeterminado de la CDN de Datadog.

{{< code-block lang="javascript" filename="index.js" >}}
import { DatadogBrowserFlagging } from '@datadog/browser-flagging';

DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
});
{{< /code-block >}}

Su proxy debe reenviar esta solicitud a la CDN de Datadog: `https://preview.ff-cdn.datadoghq.com/precompute-assignments` (reemplace el subdominio según sea necesario para su [sitio de Datadog][1]). Pase el cuerpo de la solicitud y los encabezados sin cambios. El SDK incluye automáticamente los encabezados `dd-client-token` y `dd-application-id`.

Para agregar encabezados personalizados a la solicitud de configuración de marcador (por ejemplo, para la autenticación en su proxy), use `customHeaders`:

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
    customHeaders: { 'X-Proxy-Token': '<YOUR_PROXY_TOKEN>' },
});
{{< /code-block >}}

### Proxy de carga de eventos {#event-upload-proxy-3}

Los datos de eventos de marcador del navegador (exposiciones y evaluaciones) se envían a través de la canalización de ingesta estándar del SDK de navegador. Para enrutar este tráfico a través de un proxy, establezca la opción `proxy` en una URL de su dominio.

{{< code-block lang="javascript" filename="index.js" >}}
DatadogBrowserFlagging.init({
    clientToken: '<CLIENT_TOKEN>',
    site: 'datadoghq.com',
    flaggingProxy: 'https://proxy.example.com/precompute-assignments',
    proxy: 'https://proxy.example.com/intake',
});
{{< /code-block >}}

El SDK añade un parámetro de consulta `ddforward` a cada solicitud enviada a su proxy. Este parámetro contiene la ruta y la cadena de consulta codificadas en URL a las que su proxy debe reenviar. Por ejemplo:

```
POST https://proxy.example.com/intake?ddforward=%2Fapi%2Fv2%2Fexposures%3Fddsource%3Dbrowser...
```

Su proxy decodifica el valor `ddforward` y construye la URL de ingesta de Datadog:

```
https://browser-intake-datadoghq.com/api/v2/exposures?ddsource=browser...
```

El origen de la ingesta varía según el [sitio de Datadog][1]. Por ejemplo, para `datadoghq.eu` es `https://browser-intake-datadoghq.eu`. Reenvíe el cuerpo de la solicitud POST sin cambios y agregue un encabezado `X-Forwarded-For` con la IP del cliente para una geolocalización precisa. Elimine cualquier encabezado confidencial como `cookie` antes de reenviar.

La opción `proxy` también acepta una función que recibe el `path` y `parameters` decodificados y devuelve la URL completa del proxy. Consulte [Proxy Browser RUM Data][2] para ver la firma completa de la función.

[1]: /es/getting_started/site/
[2]: /es/real_user_monitoring/guide/proxy-rum-data/

{{% /tab %}}

{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}