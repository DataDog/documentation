---
aliases:
- /es/real_user_monitoring/faq/proxy_rum_data/
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Más información sobre Real User Monitoring
title: Datos del proxy de tu navegador RUM
---

## Información general

El SDK del navegador RUM puede configurarse para enviar solicitudes a través de un proxy. Cuando se configura el [parámetro de inicialización][1] del `proxy` del SDK en una URL como `https://www.example-proxy.com/any-endpoint`, todos los datos RUM se envían a esa URL utilizando el método POST. Es necesario reenviar los datos RUM a Datadog desde el proxy.

## Requisito previo de configuración del proxy

Para reenviar correctamente una solicitud a Datadog, tu proxy debe

1. [Crea la URL de admisión de Datadog](#build-the-datadog-intake-url).
2. Añade una cabecera `X-Forwarded-For` que contenga la dirección IP del cliente de la solicitud para obtener una geoIP precisa.
3. Reenvía la solicitud a la URL de admisión de Datadog utilizando el método POST.
4. No modifiques el cuerpo de la solicitud.

<div class="alert alert-warning">
<ul>
<li>Por razones de seguridad, elimina las cabeceras HTTP que puedan contener información confidencial, como la cabecera de <code>cookie</code>.</li>
<li>El cuerpo de la solicitud puede contener datos binarios y no debe convertirse en una cadena. Asegúrate de que tu implementación de proxy reenvía el cuerpo sin procesar sin conversión.</li>
<li>Asegúrate de que tu implementación de proxy no permite a un actor malicioso enviar solicitudes a un servidor diferente (por ejemplo, https://browser-intake-datadoghq.com.malicious.com)..</li>  
</ul>
</div>

### Creación de la URL de admisión de Datadog 

Una URL de admisión de Datadog (ejemplo: `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&...`) consta de tres partes:

- el origen de admisión de Datadog correspondiente a tu [parámetro de inicialización][1] `site` (ejemplo: `https://browser-intake-datadoghq.eu`)
- la ruta que contiene la versión de la API y el producto (ejemplo: `/api/v2/rum` para datos RUM o `/api/v2/replay` para datos Session Replay)
- los parámetros (ejemplo: `ddsource=browser&...`)

El origen de admisión de Datadog correspondiente a tu parámetro `site` debe definirse en su implementación del proxy. Se puede acceder a la ruta y los parámetros de cada solicitud enviada al proxy en el parámetro `ddforward` de la solicitud (por ejemplo, `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`).

A continuación se indican los orígenes de admisión de Datadog para cada sitio:

| Sitio    | Parámetro del sitio            | Origen de admisión de Datadog                      |
|---------|---------------------------|--------------------------------------------|
| US1     | `datadoghq.com` (por defecto) | `https://browser-intake-datadoghq.com`     |
| US3     | `us3.datadoghq.com`       | `https://browser-intake-us3-datadoghq.com` |
| US5     | `us5.datadoghq.com`       | `https://browser-intake-us5-datadoghq.com` |
| EU1     | `datadoghq.eu`            | `https://browser-intake-datadoghq.eu`      |
| US1-FED | `ddog-gov.com`            | `https://browser-intake-ddog-gov.com`      |
| AP1     | `ap1.datadoghq.com`       | `https://browser-intake-ap1-datadoghq.com` |

## Configuración del SDK recomendada

Configura la URL de proxy en el parámetro de inicialización `proxy`. El SDK del navegador RUM añade un parámetro de consulta `ddforward` a todas las solicitudes a tu proxy. Este parámetro de consulta contiene la ruta y los parámetros URL a los que deben reenviarse todos los datos.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    proxy: '<YOUR_PROXY_URL>',
});
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>',
    });
});
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>'
    });
```

{{% /tab %}}
{{< /tabs >}}

Por ejemplo, con un `site` configurado en `datadoghq.eu` y un `proxy` configurado en `https://example.org/datadog-intake-proxy`, el SDK del navegador RUM envía solicitudes a una URL como la siguiente: `https://example.org/datadog-intake-proxy?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`. El proxy reenvía la solicitud a `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser`.

## Configuración alternativa del SDK

A partir del SDK del navegador v5.4.0, el parámetro de inicialización `proxy` admite una entrada de función. Esta función te permite tener más control sobre cómo se añaden la ruta y los parámetros a la URL de proxy.

Esta función recibe un objeto con las siguientes propiedades:

- `path`: la ruta de las solicitudes Datadog (ejemplo: `/api/v2/rum`)
- `parameters`: los parámetros de las solicitudes Datadog (ejemplo: `ddsource=browser&...`)

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
});
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
    })
})
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`
    });
```

{{% /tab %}}
{{< /tabs >}}

Por ejemplo, con un `site` configurado en `datadoghq.eu` y la configuración del `proxy` del ejemplo, el SDK del navegador RUM envía solicitudes a una URL que tiene el siguiente aspecto: `https://www.proxy.com/foo/api/v2/rum/bar?ddsource=browser`. El proxy tendrá que reenviar la solicitud a la URL `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser`.

**Nota**
- Algunos bloqueadores de privacidad ya apuntan a [patrones URL][2] de admisión, por lo que es posible que quieras tenerlo en cuenta al crear tu URL de proxy.
- En cada solicitud se llama a la función `proxy`, por lo que deberías evitar cálculos pesado.

## Configuración del SDK heredada (anterior a v4.34.0)

Antes del SDK del navegador v4.34.0, se utilizaba el parámetro de inicialización `proxyUrl` y el origen de admisión de Datadog estaba incluido en el atributo `ddforward`. La implementación del proxy se encargaba de confirmar este host y el no hacerlo daba lugar a diversas vulnerabilidades.

El origen de admisión de Datadog debe definirse en tu implementación de proxy para garantizar la seguridad. <strong>Si sigues utilizando un proxy con una versión anterior del SDK del navegador, actualízalo a una versión más reciente para evitar vulnerabilidades.</strong>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/setup/#initialization-parameters
[2]: https://github.com/easylist/easylist/blob/997fb6533c719a015c21723b34e0cedefcc0d83d/easyprivacy/easyprivacy_general.txt#L3840