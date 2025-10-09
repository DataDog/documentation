---
aliases:
- /es/real_user_monitoring/error_tracking/browser_errors
- /es/error_tracking/standalone_frontend/browser
further_reading:
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command
  tag: Código fuente
  text: Código fuente de datadog-ci
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: Documentación
  text: Carga de mapas de fuente de JavaScript
- link: /error_tracking/explorer
  tag: Documentación
  text: Más información sobre el Explorador de seguimiento de errores
title: Seguimiento de errores del navegador
---

## Información general

Los errores de procesos de [Error Tracking][4] recopilados del navegador por el SDK del navegador. Cada vez que se recopila un error [fuente][1], [personalizado][2], [informe][3], o [consola][3] que contiene un stack trace, Error Tracking los procesa y agrupa bajo una incidencia, o grupo de errores similares.

## Configurar

Si aún no has configurado el SDK del navegador, sigue las [instrucciones de configuración en la aplicación][5] o consulta la [documentación de configuración del navegador][6].

1. Descarga la última versión del [SDK del navegador][7].
2. Configura `version` , `env` y `service` de tu aplicación al [inicializar el SDK][8].
3. [Carga tus mapas de origen de JavaScript ][9] para acceder a las trazas de stack tecnológico sin minificar.

## Vinculación de los errores con tu código fuente

Además de enviar mapas de fuente, la [CLI de Datadog][10] reporta información de Git como el hash de confirmación, la URL del repositorio y una lista de rutas de archivos rastreados en el repositorio de código.

Error Tracking puede utilizar esta información para correlacionar los errores con tu código fuente, lo que te permite pivotar desde cualquier marco del stack trace a la línea de código relacionada en [GitHub][11], [GitLab][12] y [Bitbucket][13].

<div class="alert alert-info">La vinculación de los marcos de stack tecnológico con el código fuente es compatible con la versión <a href="https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command">0.12.0</a> y posteriores de la <code>CLI de Datadog</code>.</div>

Para obtener más información, consulta [Integración de código fuente en Datadog][14].

## Lista de mapas de fuente cargados

Consulta la página [Símbolos de depuración][15] para ver todos los símbolos cargados.

### Limitaciones

El tamaño de los mapas fuente está limitado a **500 MB** cada uno.

## Recopilar errores

Puedes monitorizar excepciones no gestionadas, rechazos de promesas no gestionadas, excepciones gestionadas, rechazos de promesas gestionadas y otros errores que el SDK del navegador no rastrea automáticamente. Más información sobre [Recopilación de errores del navegador][2].


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/data_collected/?tab=error#source-errors
[2]: /es/error_tracking/frontend/collecting_browser_errors/?tab=npm#collect-errors-manually
[3]: /es/error_tracking/frontend/collecting_browser_errors/?tab=npm#error-sources
[4]: https://app.datadoghq.com/rum/error-tracking
[5]: https://app.datadoghq.com/error-tracking/settings/setup/client
[6]: /es/real_user_monitoring/browser/setup/client?tab=errortracking
[7]: https://www.npmjs.com/package/@datadog/browser-rum
[8]: /es/real_user_monitoring/browser/setup/#initialization-parameters
[9]: /es/real_user_monitoring/guide/upload-javascript-source-maps
[10]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#sourcemaps-command
[11]: https://github.com
[12]: https://about.gitlab.com
[13]: https://bitbucket.org/product
[14]: /es/integrations/guide/source-code-integration/
[15]: https://app.datadoghq.com/source-code/setup/rum
