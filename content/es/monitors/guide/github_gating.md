---
aliases:
- /es/continuous_integration/guides/github_gating
description: Aprende a utilizar los monitores de Datadog para realizar checks de calidad
  antes de desplegar tus aplicaciones de GitHub.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: Blog
  text: Monitoriza tus flujos de trabajo de acciones de GitHub con Datadog CI Visibility
- link: /integrations/guide/source-code-integration
  tag: Documentación
  text: Más información sobre la integración de GitHub
- link: https://docs.datadoghq.com/continuous_integration/guides/pull_request_comments/
  tag: Documentación
  text: Habilita los resúmenes de prueba en tus solicitudes pull de GitHub
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: Blog
  text: Detectar checks de calidad fallidos con las reglas de protección de despliegue
    de GitHub y Datadog
title: Controla tus despliegues de acciones de GitHub con monitores de Datadog
---

## Información general

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

Datadog es socio de integración para [Reglas de protección de despliegue de acciones de GitHub][10], que te ayuda a garantizar la entrega de aplicaciones de alta calidad a los clientes finales. Puedes imponer puertas de calidad en tus flujos de trabajo de despliegue de acciones de GitHub mediante monitores de Datadog.

Estas funciones están disponibles para todos los clientes de Datadog en GitHub Enterprise Cloud, y no requieren el uso de CI Visibility.

## Activar las reglas de protección del despliegue
Para poder confiar en Datadog y obtener checks de calidad en el despliegue de aplicaciones, debes tener activada la función Reglas de protección del despliegue para tu aplicación.

### Crear una nueva aplicación GitHub en Datadog

Consulta [estas instrucciones][1] para crear una aplicación GitHub que se conecte automáticamente a Datadog. Recuerda marcar la casilla **Reglas de protección del despliegue**.

{{< img src="ci/github_gates_new_app.png" alt="Vista previa comentada de la solicitud pull de Datadog GitHub" style="width:100%;">}}

Si ya tienes una aplicación GitHub configurada y conectada a Datadog, puedes encontrar un enlace para activar las Reglas de protección del despliegue en el [cuadro de integración de GitHub][2] en la aplicación.

{{< img src="ci/github_gates_existing_app.png" alt="Vista previa comentada de la solicitud pull de Datadog GitHub" style="width:100%;">}}

### Configurar Reglas de protección del despliegue en GitHub
1. Habilitar permisos de lectura y escritura para Despliegues.
2. Habilitar permisos de lectura para Acciones.
3. En **Subscribe to events** (Suscribir a eventos) en una aplicación, haz clic en la casilla **Deployment protection rule** (Regla de protección del despliegue).
4. En un repositorio, haz clic en **Settings** (Configuración). En la sección **Code and Automation** (Código y Automatización), haz clic en **Environments** (Entornos). En **Deployment Protection Rules** (Reglas de protección del despliegue), habilita la aplicación GitHub que está vinculada con la integración de Datadog.

## Crea monitores para controlar tus despliegues

Sigue [estas instrucciones][3] para crear y configurar un monitor de Datadog que se utilizará para controlar el despliegue de acciones de GitHub.

Puedes utilizar varios monitores independientes para los checks de calidad, pero Datadog recomienda utilizar [monitores compuestos][4] porque te permiten realizar despliegues de control basados en dos o más señales con un solo monitor. Para obtener más información, consulta [Tipos de monitores][5].

Todos los monitores que vayas a utilizar para el control de la calidad deben estar debidamente etiquetados con las siguientes etiquetas (tags):
- `git_env` 
- `git_repo` 

La etiqueta `git_repo` debe contener el nombre del propietario del repositorio en el formato `<OWNER>/<REPO>`, como `Datadog/my-repo`.

Cuando ejecutas un flujo de trabajo, las acciones GitHub envían una solicitud a tu monitor de Datadog. Basándose en uno de los resultados de la evaluación del monitor que se enumeran a continuación, Datadog envía un comentario de vuelta a GitHub, que se puede ver en GitHub en la sección **Comment** (Comentario) para el evento y entorno asociados dentro de la ejecución de tu flujo de trabajo.
- Si todos los monitores asociados a tu despliegue (a través de las etiquetas de entorno y repo) están en el estado `OK`, Datadog aprueba el despliegue.
- Si cualquier monitor asociado con tu despliegue no está en estado `OK` (en `ALERT`, `WARN`, o `NODATA`), Datadog rechaza el despliegue.

## Ejemplo de checks de calidad
### Rendimiento de la aplicación
Para asegurarte de que la tasa de error o la latencia media de tu aplicación están por debajo de determinados umbrales antes del despliegue, puedes utilizar [monitores APM][7].

### Estado de la infraestructura del entorno
Para comprobar la CPU de aplicación o servicio o el uso de la memoria antes del despliegue, utiliza [integración][8] y [monitores de métrica][9].

## Leer más
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /es/integrations/github/
[3]: /es/monitors/configuration/?tab=thresholdalert
[4]: /es/monitors/types/composite/ 
[5]: /es/monitors/types/
[6]: /es/monitors/settings/
[7]: /es/monitors/types/apm/?tab=apmmetrics
[8]: /es/monitors/types/integration/?tab=checkalert 
[9]: /es/monitors/types/metric/?tab=threshold
[10]: https://github.blog/2023-04-20-announcing-github-actions-deployment-protection-rules-now-in-public-beta/