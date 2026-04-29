---
aliases:
- /es/real_user_monitoring/faq/proxy_rum_data/
content_filters:
- label: SDK source
  option_group_id: rum_browser_sdk_source_options
  trait_id: lib_src
- option_group_id: rum_browser_sdk_version_for_proxying_options
  trait_id: rum_browser_sdk_version
description: Configura el proxy de datos RUM del navegador con opciones de fuente
  del SDK y configuraciones específicas de versión para el enrutamiento de red personalizado.
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: Aprende sobre Real User Monitoring
title: Proxy de los datos RUM de tu navegador
---
{% if equals($rum_browser_sdk_version, "lt_4_34_0") %}
{% alert level="danger" %}
Actualiza al SDK del navegador `4.34.0` o posterior para evitar vulnerabilidades de seguridad en la configuración de tu proxy.
{% /alert %}
{% /if %}

## Resumen {% #overview %}

El SDK del navegador RUM se puede configurar para enviar solicitudes a través de un proxy. Cuando configuras el `proxy` [parámetro de inicialización][1] del SDK a una URL como `https://www.example-proxy.com/any-endpoint`, todos los datos RUM se envían a esa URL utilizando el método POST. Los datos RUM aún necesitan ser reenviados a Datadog desde el proxy.

## Configuración previa del proxy {% #prerequisite-proxy-setup %}

Para reenviar una solicitud a Datadog con éxito, tu proxy debe

1. [Construir la URL de entrada de Datadog](#build-the-datadog-intake-url).
2. Agrega un `X-Forwarded-For` encabezado que contenga la dirección IP del cliente de la solicitud para una geoIP precisa.
3. Reenvía la solicitud a la URL de entrada de Datadog utilizando el método POST.
4. Deja el cuerpo de la solicitud sin cambios.

{% alert level="warning" %}
- Por razones de seguridad, elimina cualquier encabezado HTTP que potencialmente contenga información sensible, como el encabezado `cookie`.
- El cuerpo de la solicitud puede contener datos binarios y no debe convertirse en una cadena. Asegúrate de que tu implementación de proxy reenvíe el cuerpo sin conversión.
- Asegúrate de que tu implementación de proxy no permita que un actor malicioso envíe solicitudes a un servidor diferente. Por ejemplo: `https://browser-intake-datadoghq.com.malicious.com`.
{% /alert %}

### Construye la URL de entrada de Datadog {% #build-the-datadog-intake-url %}.

Tu URL de entrada de Datadog debe tener el formato `<INTAKE_ORIGIN>/<PATH><PARAMETERS>` (por ejemplo, `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&...`).

{% table %}
---
* origen de entrada
* 
    El origen de entrada de Datadog corresponde a tu `site` [parámetro de inicialización][1]. El origen de entrada de Datadog correspondiente a tu parámetro de sitio debe definirse en la implementación de tu proxy.

    {% site-region region="us" %}
    El origen de entrada para tu sitio de Datadog es `https://browser-intake-datadoghq.com`.
    {% /site-region %}

    {% site-region region="us3" %}
    El origen de entrada para tu sitio de Datadog es `https://browser-intake-us3-datadoghq.com`.
    {% /site-region %}

    {% site-region region="us5" %}
    El origen de entrada para tu sitio de Datadog es `https://browser-intake-us5-datadoghq.com`.
    {% /site-region %}

    {% site-region region="eu" %}
    El origen de entrada para tu sitio de Datadog es `https://browser-intake-datadoghq.eu`.
    {% /site-region %}

    {% site-region region="ap1" %}
    El origen de entrada para tu sitio de Datadog es `https://browser-intake-ap1-datadoghq.com`.
    {% /site-region %}

    {% site-region region="ap2" %}
    El origen de entrada para tu sitio de Datadog es `https://browser-intake-ap2-datadoghq.com`.
    {% /site-region %}

    {% site-region region="gov" %}
    El origen de entrada para tu sitio de Datadog es `https://browser-intake-ddog-gov.com`.
    {% /site-region %}
---
* la ruta
* 
    La ruta contiene la versión de la API y el producto (por ejemplo, `/api/v2/rum` para datos de RUM o `/api/v2/replay` para datos de reproducción de sesión). 
    
    La ruta para cada solicitud se puede acceder en el parámetro `ddforward` de la solicitud (por ejemplo, `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`).
---
* parámetros
* 
    Los parámetros de la solicitud (por ejemplo, `ddsource=browser&...`) se pueden acceder en el parámetro `ddforward` de la solicitud (por ejemplo, `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`).

{% /table %}

## Configuración del SDK {% #sdk-setup %}

<!-- SDK version >4.34.0 y superior -->
{% if includes($rum_browser_sdk_version, ["gte_5_4_0", "gte_4_34_0"]) %}

Configura la URL del proxy en el parámetro de inicialización `proxy`:

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '{% region-param key="dd_site" /%}',
    proxy: '<YOUR_PROXY_URL>',
});
```
{% /if %}
<!-- end NPM -->

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>',
    });
});
```

{% /if %}
<!-- end CDN async -->

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>'
    });
```
{% /if %}
<!-- end CDN sync -->

El SDK del navegador RUM agrega un parámetro de consulta `ddforward` a todas las solicitudes a tu proxy. Este parámetro de consulta contiene la ruta de la URL y los parámetros a donde se deben reenviar todos los datos.

Por ejemplo, con un `site` establecido en `datadoghq.eu` y un `proxy` establecido en `https://example.org/datadog-intake-proxy`, el SDK del navegador RUM envía solicitudes a una URL como esta: `https://example.org/datadog-intake-proxy?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`. El proxy reenvía la solicitud a `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser`.

<!-- SDK version >=5.4.0 -->
{% if equals($rum_browser_sdk_version, "gte_5_4_0") %}
### Pasando una función al parámetro de inicialización `proxy` {% #passing-a-function-to-the-proxy-initialization-parameter %}

El parámetro de inicialización `proxy` también admite una entrada de función. Esta función te permite tener más control sobre cómo se agregan la ruta y los parámetros a la URL del proxy.

Esta función recibe un objeto con las siguientes propiedades:

- `path`: la ruta para las solicitudes de Datadog (ejemplo: `/api/v2/rum`)
- `parameters`: los parámetros de las solicitudes de Datadog (ejemplo: `ddsource=browser&...`)

<!-- NPM -->
{% if equals($lib_src, "npm") %}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '{% region-param key="dd_site" /%}',
    proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
});
```
{% /if %}
<!-- end NPM -->

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
    })
})
```
{% /if %}
<!-- end CDN async -->

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`
    });
```
{% /if %}
<!-- end CDN sync -->

**Nota:**
- Algunos bloqueadores de privacidad ya apuntan a los patrones de URL de entrada [URL patterns][2], por lo que es posible que desees tener eso en cuenta al construir tu URL de proxy.
- La función `proxy` se llama para cada solicitud, por lo que debe evitar cualquier cálculo pesado.
- **Las aplicaciones web JSP** necesitan usar el carácter de escape `\` para propagar correctamente estos parámetros al navegador. Por ejemplo:
    ```javascript
    proxy: (options) => 'http://proxyURL:proxyPort\${options.path}?\${options.parameters}',
    ```
{% /if %}
<!-- end SDK version >=5.4.0 -->

{% /if %}
<!-- end SDK version >4.34.0 y superior -->

<!-- SDK version <4.34.0 -->
{% if equals($rum_browser_sdk_version, "lt_4_34_0") %}
Antes de la versión 4.34.0 del SDK del navegador, se utilizaba el parámetro de inicialización `proxyUrl`, y el origen de entrada de Datadog se incluía en el atributo `ddforward`. La implementación del proxy se encargaba de validar este servidor, y no hacerlo resultaba en varias vulnerabilidades.

El origen de entrada de Datadog debe definirse en tu implementación de proxy para garantizar la seguridad.

**Para evitar vulnerabilidades de seguridad, debes actualizar a Browser SDK `4.34.0` o posterior.**
{% /if %}
<!-- end SDK version <4.34.0 -->

[1]: /es/real_user_monitoring/application_monitoring/browser/setup/client/?tab=rum#initialization-parameters
[2]: https://github.com/easylist/easylist/blob/997fb6533c719a015c21723b34e0cedefcc0d83d/easyprivacy/easyprivacy_general.txt#L3840