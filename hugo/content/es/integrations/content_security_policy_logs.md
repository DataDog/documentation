---
algolia:
  tags:
  - csp-report
  - csp
  - report-uri
  - report-to
  - reporting-endpoints
  - Content-Security-Policy
  - violated-directive
  - blocked-uri
  - script-src
  - worker-src
  - connect-src
aliases:
- /es/real_user_monitoring/faq/content_security_policy
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/content_security_policy_logs.md
description: Detectar y agregar infracciones de CSP con Datadog
doc_link: /integrations/content_security_policy_logs/
further_reading:
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentación
  text: Más información sobre el etiquetado unificado de servicios
- link: https://www.datadoghq.com/blog/content-security-policy-reporting-with-datadog/
  tag: Blog
  text: Monitorizar las infracciones a Content Security Policy con Datadog
has_logo: true
integration_id: content_security_policy_logs
integration_title: Política de seguridad de contenido
is_public: true
name: content_security_policy_logs
public_title: Datadog-Content Security Policy
short_description: Detectar infracciones de CSP
version: '1.0'
---

## Información general

La integración de Datadog Content Security Policy (CSP) envía logs a Datadog desde los navegadores web a medida que interpretan tu CSP y detectan infracciones. Al utilizar la integración de CSP, no tienes que alojar ni gestionar un endpoint dedicado para agregar tus datos de CSP.

Para más información sobre CSP, véase [Content-Security-Policy][1].

## Requisitos previos

Antes de añadir una directiva a un encabezado de CSP, [genera un token de cliente en tu cuenta de Datadog][2].

<div class="alert alert-info">Por motivos de seguridad, debes utilizar un token de cliente para recopilar logs de los navegadores web. No puedes utilizar claves de API de Datadog para configurar el SDK de los logs de navegador de Datadog, ya que quedarían expuestas en el lado del cliente. Para más información, <a href="https://docs.datadoghq.com/logs/log_collection/?tab=host#setup">consulta la documentación del token de cliente</a>.</div>

## Preparar una URL para CSP

Necesitas una URL a la que los navegadores puedan enviar informes de infracción de la política. La URL debe tener el siguiente formato:

```
https://{{< region-param key=browser_sdk_endpoint_domain >}}/api/v2/logs?dd-api-key=<client-token>&dd-evp-origin=content-security-policy&ddsource=csp-report
```

Opcionalmente, añade la clave `ddtags` (nombre de servicio, el entorno y la versión de servicio) a la URL para configurar el [etiquetado unificado de servicios][3]:
- `env`: el entorno de la aplicación.
- `service`: el nombre de servicio para tu aplicación.
- `version`: la versión de la aplicación.

Al formatear los valores de `ddtags`, debes:
- Agrupar claves y valores con dos puntos (`:`)
- Concatenar claves y valores con una coma (`,`)
- Utilizar la codificación de URL

Por ejemplo, dados los pares clave-valor `{"service": "billingService", "env": "production"}`, la cadena codificada en URL tendría el siguiente aspecto:

```
service%3AbillingService%2Cenv%3Aproduction
```

Y la URL final con etiquetas sería:

```
https://{{< region-param key=browser_sdk_endpoint_domain >}}/api/v2/logs?dd-api-key=<client-token>&dd-evp-origin=content-security-policy&ddsource=csp-report&ddtags=service%3AbillingService%2Cenv%3Aproduction
```

## Añadir la URL a CSP

Puedes integrar la URL en un encabezado HTTP (recomendado), o integrarla en una etiqueta HTML `<meta>`.

### Integrar la política en un encabezado HTTP

Datadog recomienda integrar la Content Security Policy en un encabezado HTTP. Puedes utilizar la directiva `report-uri` o la directiva `reporting-endpoints`. La directiva `reporting-endpoints` sustituirá con el tiempo a `report-uri`, pero aún no es compatible con todos los navegadores.

- Si utilizas la directiva `report-uri`:
  ```bash
  Content-Security-Policy: ...; report-uri https://{{< region-param key=browser_sdk_endpoint_domain >}}/api/v2/logs?dd-api-key=<client-token>&dd-evp-origin=content-security-policy&ddsource=csp-report
  ```

- Si utilizas la directiva `reporting-endpoints`:
  ```json
  Content-Security-Policy: ...; report-to browser-intake-datadoghq
  Reporting-Endpoints: browser-intake-datadoghq="https://{{< region-param key=browser_sdk_endpoint_domain >}}/api/v2/logs?dd-api-key=<client-token>&dd-evp-origin=content-security-policy&ddsource=csp-report"
  ```

### La política integrada en una etiqueta HTML `<meta>`

También puedes integrar la URL en una etiqueta HTML `<meta>`.

```html
<meta http-equiv="Content-Security-Policy"
    content="...; report-uri 'https://{{< region-param key=browser_sdk_endpoint_domain >}}/api/v2/logs?dd-api-key=<client-token>&dd-evp-origin=content-security-policy&ddsource=csp-report'">
```
## Ejemplos de informes de infracción

Cada navegador interpreta el formato del informe de forma diferente:

{{< tabs >}}
{{% tab "Firefox" %}}
```json
{
  'csp-report': {
    'blocked-uri': 'https://evil.com/malicious.js',
    'document-uri': 'http://localhost:8000/',
    'original-policy': 'script-src http://good.com; report-uri http://127.0.0.1:8000/csp_reports',
    referrer: '',
    'violated-directive': 'script-src'
  }
}
```
{{% /tab %}}

{{% tab "Chrome" %}}
```json
{
  'csp-report': {
    'document-uri': 'http://localhost:8000/',
    referrer: '',
    'violated-directive': 'script-src-elem',
    'effective-directive': 'script-src-elem',
    'original-policy': 'trusted-types toto; script-src good.com; report-uri http://127.0.0.1:8000/csp_reports',
    disposition: 'enforce',
    'blocked-uri': 'https://evil.com/malicious.js',
    'status-code': 200,
    'script-sample': ''
  }
}
```
{{% /tab %}}

{{% tab "Safari" %}}
```json
{
  'csp-report': {
    'document-uri': 'http://localhost:8000/',
    referrer: '',
    'violated-directive': 'script-src good.com',
    'effective-directive': 'script-src',
    'original-policy': 'trusted-types toto; script-src good.com; report-uri http://127.0.0.1:8000/csp_reports',
    'blocked-uri': 'https://evil.com',
    'status-code': 200
  }
}
```
{{% /tab %}}
{{< /tabs >}}

## Utilizar CSP con Real User Monitoring y Session Replay

Si utilizas CSP en tus sitios web, añade las siguientes URL a tus [directivas][15] existentes en función de tu caso de uso.

### URL de admisión

Según la opción `site` utilizada para inicializar [Real User Monitoring][4] o la [recopilación de logs de navegador][5], añade la entrada `connect-src` apropiada:

```txt
connect-src https://{{< region-param key="browser_sdk_endpoint_domain" >}}
```

### Worker web

Si estás utilizando Session Replay o el [parámetro de inicialización `compressIntakeRequests`][4] de RUM, asegúrate de permitir workers con esquemas de URI `blob:` añadiendo la siguiente entrada `worker-src`:

```txt
worker-src blob:;
```

Alternativamente, a partir de la [versión 4.47.0][8], puedes autoalojar el archivo JavaScript del worker del SDK de navegador de Datadog y proporcionar la opción `workerUrl` para inicializar el [SDK del RUM Browser][8] realizando una de las siguientes acciones:

* Descárgalo de https://unpkg.com/@datadog/browser-worker, y almacénalo junto a los activos de tu aplicación web.
* Instala el [paquete NPM `@datadog/browser-worker`][9] y utiliza tu herramienta de compilación para incluirlo en los activos compilados (consulta la documentación de [Webpack 4][10], [Webpack 5][11], [Vite][12] y [rollup][13]).

Requisitos:

* Asegúrate de que la versión principal del worker coincide con la versión del SDK del navegador que estás utilizando.
* Aloja el archivo en el mismo origen que tu aplicación web. Debido a [restricciones del navegador][14], no se puede alojar en un dominio separado (por ejemplo, un host de CDN de terceros) o un esquema diferente.

### URL del paquete de CDN

Si utilizas la configuración CDN async o CDN sync para [Real User Monitoring][6] o la [recopilación de los logs de navegador][7], añade también la siguiente entrada `script-src`:

```txt
script-src https://www.datadoghq-browser-agent.com
```

[1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
[2]: https://app.datadoghq.com/organization-settings/client-tokens
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/real_user_monitoring/application_monitoring/browser/setup/#initialization-parameters
[5]: /es/logs/log_collection/javascript/#initialization-parameters
[6]: /es/real_user_monitoring/application_monitoring/browser/setup/
[7]: /es/logs/log_collection/javascript/#cdn-async
[8]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4470
[9]: https://www.npmjs.com/package/@datadog/browser-worker
[10]: https://v4.webpack.js.org/loaders/file-loader/
[11]: https://webpack.js.org/guides/asset-modules/#url-assets
[12]: https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
[13]: https://github.com/rollup/plugins/tree/master/packages/url/#readme
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker
[15]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy#directives