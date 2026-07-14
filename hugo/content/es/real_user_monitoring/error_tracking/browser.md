---
aliases:
- /es/real_user_monitoring/error_tracking/browser_errors
further_reading:
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps
  tag: Código fuente
  text: Código fuente datadog-ci
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: Documentación
  text: Cargar mapas de origen de Javascript
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentación
  text: Más información sobre el Explorador de seguimiento de errores
title: Seguimiento de errores del navegador
---

## Información general

El [Seguimiento de errores][4] procesa los errores recopilados del SDK del navegador. Cada vez que se recopila un error de [origen][1], [personalizado][2] o de [informes][3] que contiene una traza (trace) de stack tecnológico, el Seguimiento de errores lo procesa y lo agrupa bajo una incidencia o grupo de errores similares. 

## Configuración

Si aún no has configurado el SDK del navegador, sigue las [instrucciones de configuración en la aplicación][5] o consulta la [documentación de configuración del navegador][6].

1. Descarga la última versión del [SDK del navegador][7].
2. Configura `version` , `env` y `service` de tu aplicación al [inicializar el SDK][8].
3. [Carga tus mapas de origen de JavaScript ][9] para acceder a las trazas de stack tecnológico sin minificar.

## Vinculación de los errores con tu código fuente

Además de enviar mapas de origen, la [CLI de Datadog][10] proporciona información de Git como el hash de confirmación, la URL del repositorio y una lista de rutas de archivos rastreados en el repositorio de código. 

El Seguimiento de errores puede utilizar esta información para correlacionar los errores con tu código fuente. Esto te permite cambiar desde cualquier marco de traza de stack tecnológico a la línea de código relacionada en [GitHub][11], [GitLab][12] y [Bitbucket][13]. 

<div class="alert alert-info">La vinculación de los marcos de stack tecnológico con el código fuente es compatible con la versión <a href="https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command">0.12.0</a> y posteriores de la <code>CLI de Datadog</code>.</div>

Para obtener más información, consulta [Integración de código fuente en Datadog][14].

### Limitaciones

{{< site-region region="us,us3,us5,eu,gov" >}}
Los mapas de origen están limitados a **500** MB cada uno.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Los mapas de origen están limitados a **500** MB cada uno.
{{< /site-region >}}

## Recopilación manual de errores

Puedes monitorizar excepciones gestionadas, rechazos de promesas gestionadas y otros errores que el SDK del navegador no rastrea automáticamente. Para obtener más información, consulta [Recopilación de errores del navegador][2].


Para recopilar errores manualmente, utiliza la API `addError()`:

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context
);
{{< /code-block >}}

**Nota**: El [Seguimiento de errores][4] procesa errores que se envían con la fuente configurada en `custom`, `source` o `report` y que contienen una traza de stack tecnológico. El Seguimiento de errores no procesa errores enviados con cualquier otra fuente (como `console`) o enviados desde extensiones del navegador.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Enviar un error personalizado con contexto
const error = new Error('Something wrong occurred.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// Enviar un error de red
fetch('<SOME_URL>').catch(function(error) {
    datadogRum.addError(error);
})

// Enviar un error de excepción gestionada
try {
    //Some code logic
} catch (error) {
    datadogRum.addError(error);
}
```
{{% /tab %}}
{{% tab "CDN asíncrono" %}}

```JavaScript
// Enviar un error personalizado con contexto
const error = nuevo Error('Something wrong occurred.');

window.DD_RUM.onReady(function() {
    window.DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// Enviar un error de red
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    });
})

// Enviar un error de excepción manejado
probar {
    //Alguna lógica de código
} capturar (error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    })
}
```
{{% /tab %}}
{{% tab "CDN síncrono" %}}

```JavaScript
// Enviar un error personalizado con contexto
const error = nuevo Error('Something wrong occurred.');

window.DD_RUM && window.DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// Enviar un error de red
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && window.DD_RUM.addError(error);
})

// Enviar un error de excepción manejado
probar {
    //Alguna lógica de código
} capturar (error) {
    window.DD_RUM && window.DD_RUM.addError(error);
}
```
{{% /tab %}}
{{< /tabs >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/data_collected/?tab=error#source-errors
[2]: /es/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[3]: /es/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#error-sources
[4]: https://app.datadoghq.com/rum/error-tracking
[5]: https://app.datadoghq.com/rum/application/create
[6]: /es/real_user_monitoring/browser/setup
[7]: https://www.npmjs.com/package/@datadog/browser-rum
[8]: /es/real_user_monitoring/browser/setup/#initialization-parameters
[9]: /es/real_user_monitoring/guide/upload-javascript-source-maps
[10]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command
[11]: https://github.com
[12]: https://about.gitlab.com
[13]: https://bitbucket.org/product
[14]: /es/integrations/guide/source-code-integration/
