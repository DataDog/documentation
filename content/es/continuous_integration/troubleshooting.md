---
further_reading:
- link: /continuous_integration/tests
  tag: Documentación
  text: Aprender a monitorizar tus tests CI
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Aprender a monitorizar tus procesos CI
- link: /tests/test_impact_analysis
  tag: Documentación
  text: Más información sobre Test Impact Analyzer
title: Solucionar problemas de CI Visibility
---

## Información general

Esta página proporciona información para ayudarte a solucionar problemas con CI Visibility. Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][2].

## Tu instancia de Jenkins está instrumentada, pero Datadog no muestra ningún dato

1. Asegúrate de que al menos un pipeline haya terminado de ejecutarse. La información sobre la ejecución del pipeline sólo se envía una vez que el pipeline ha finalizado.
2. Asegúrate de que el host del Datadog Agent está configurado correctamente y es accesible por el complemento Datadog. Puedes probar la conectividad haciendo clic en el botón **Check connectivity with the Datadog Agent** (Probar conectividad con el Datadog Agent), en la interfaz de usuario (UI) de configuración del complemento Jenkins.
3. Verifica si hay errores en los logs de Jenkins. Puedes habilitar logs de nivel de depuración para el complemento Datadog [creando un archivo `logging.properties`][1] y añadiendo la línea `org.datadog.level = ALL`.

## Pipeline no encontrado

Se muestra un mensaje "Pipeline not found" (No se encontró el pipeline) cuando se hace clic en datos incompletos procedentes de un pipeline en curso para aquellos [proveedores de CI que no admiten pipelines `running`][15]. Los datos se reciben progresivamente para etapas, tareas o comandos personalizados. Espera hasta que el pipeline haya finalizado e inténtalo nuevamente.

## Faltan pipelines en la página de pipelines

La página de pipelines sólo muestra pipelines sin información Git o pipelines con información Git que pertenecen a la rama por defecto del repositorio Git.

## Faltan etapas o tareas en los cuadros de resumen

La falta de etapas o tareas en la página _Detalles del pipeline_ puede deberse a un error de configuración. Asegúrate de que el nombre del pipeline almacenado en las ejecuciones de etapas o tareas coincide con el **mismo** nombre de tu pipeline principal. Si utilizas pipelines personalizados, consulta la [especificación del endpoint de la API pública][15].

## Faltan variables en los pipelines de Gitlab

[Las variables definidas por el usuario en Gitlab][16] deben ser informadas en el campo `@ci.parameters` en CI Visibility. Sin embargo, esta información sólo está presente en algunos casos, como los pipelines aguas abajo, y puede faltar en el resto de los casos, ya que Gitlab [no siempre proporciona esta información][17] a Datadog.

## Limitaciones en la ejecución de pipelines

### La entrega de eventos de webhook no está garantizada por los proveedores de CI

El soporte para la ejecución de pipelines depende de los datos enviados por los proveedores de CI, indicando el estado de la ejecución. Si estos datos no están disponibles, es posible que las ejecuciones marcadas como `Running` en Datadog ya hayan finalizado.

### Duración máxima de la ejecución de un pipeline

Una ejecución de pipeline puede conservar el estado `Running` durante un máximo de tres días. Si sigue en ejecución después de ese tiempo, la ejecución del pipeline no aparece en CI Visibility. Si una ejecución de pipeline finaliza después de tres días, la ejecución del pipeline finalizada aparece en CI Visibility con su correspondiente estado final (`Success`, `Error`, `Canceled`, `Skipped`) y con la duración correcta.

## Limitaciones a los trabajos terminados de los pipelines

Los datos de trabajo tienen un límite de tres días para ser procesados tras su finalización. Si un pipeline incluye trabajos que finalizan más de tres días antes de que se reciba el pipeline, esos trabajos no se procesan y no aparecen en CI Visibility.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/system-administration/viewing-logs/
[2]: /es/help/
[3]: /es/continuous_integration/tests/
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://app.datadoghq.com/ci/test-services
[6]: /es/tracing/troubleshooting/tracer_debug_logs
[7]: /es/continuous_integration/tests/containers/
[8]: /es/continuous_integration/tests/junit_upload/?tabs=linux#collecting-environment-configuration-metadata
[9]: https://app.datadoghq.com/source-code/repositories
[10]: /es/tests/test_impact_analysis
[11]: https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/
[12]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui
[13]: /es/api/latest/ci-visibility-pipelines/#send-pipeline-event
[14]: /es/continuous_integration/tests/#supported-features
[15]: /es/continuous_integration/pipelines/#supported-features
[16]: https://docs.gitlab.com/ee/ci/variables/#define-a-cicd-variable-in-the-gitlab-ciyml-file
[17]: https://gitlab.com/gitlab-org/gitlab/-/issues/29539