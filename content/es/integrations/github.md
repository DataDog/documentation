---
aliases:
- /es/integrations/github_apps
categories:
- collaboration
- developer tools
- issue tracking
- source control
custom_kind: integración
dependencies: []
description: Conecta GitHub con Datadog para monitorizar confirmaciones y solicitudes
  pull que afecten el rendimiento de tus servicios.
doc_link: https://docs.datadoghq.com/integrations/github/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/collect-github-audit-logs-alerts-datadog/
  tag: Blog
  text: Recopila logs de auditoría de GitHub y alertas de escaneo con Datadog
- link: https://www.datadoghq.com/blog/github-source-code-integration/
  tag: Blog
  text: Usa las integraciones de código fuente y GitHub de Datadog para optimizar
    la solución de problemas
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: Blog
  text: Uso GitHub Actions para Service Catalog de Datadog, y tú también deberías
    hacerlo
- link: https://docs.datadoghq.com/integrations/guide/source-code-integration/
  tag: Documentación
  text: Obtén más información sobre la integración del código fuente de Datadog
- link: https://docs.datadoghq.com/service_catalog/adding_metadata/#store-and-edit-service-definitions-in-github
  tag: Documentación
  text: Aprende a usar la integración de GitHub en Service Catalog
- link: https://docs.datadoghq.com/serverless/configuration/?tab=serverlessframework#link-errors-to-your-source-code
  tag: Documentación
  text: Aprende a usar la integración de GitHub en la monitorización serverless
git_integration_title: github
has_logo: true
integration_id: github
integration_title: GitHub
integration_version: ''
is_public: true
manifest_version: '1.0'
name: github
public_title: Integración de GitHub
short_description: Conecta GitHub con Datadog.
team: web-integrations
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Instala la integración de GitHub para configurar GitHub Apps y GitHub Actions, proteger el acceso a tus repositorios y recopilar telemetría avanzada (como logs de auditoría, informes de vulnerabilidad, escaneo de secretos y estadísticas de repositorios).

{{< img src="integrations/github/repo_configuration.png" alt="La pestaña Configuración del repositorio en el cuadro de integración de GitHub" popup="true" style="width:100%;">}}

Puedes usar la [integración de código fuente][1] de Datadog a fin de ver fragmentos de código en tus stack traces, vincular stack traces al código fuente en GitHub para tus [funciones de Lambda][2], mostrar resúmenes de resultados de tests de los comentarios de solicitudes pull en [CI Visibility][3] y acceder a diferentes definiciones de servicio en GitHub desde [Service Catalog][4].

## Configurar

<div class="alert alert-info">
Sigue estas instrucciones para instalar GitHub Apps y otorgar permisos a Datadog. En función de los permisos otorgados, puedes configurar la integración de código fuente, ver fragmentos de código en las stack traces, ver la telemetría recopilada, como los logs de auditoría, acceder a GitHub Actions en CI Visibility y más.
</div>

### Vincular un repositorio en tu organización o cuenta personal

Si eres administrador en tu organización de GitHub, puedes configurar GitHub Apps.

1. En el [cuadro de integración de GitHub][5], dirígete a la pestaña **Repo Configuration** (Configuración del repositorio).
2. Haz clic en **Link GitHub Account** (Vincular cuenta de GitHub) para crear una GitHub App nueva.
3. En **Configure** (Configurar), selecciona **Organization** (Organización) e ingresa un nombre para la organización, o selecciona **Personal Account** (Cuenta personal).

   De manera opcional, especifica la URL de tu instancia de GitHub Enterprise Server (versión 2.22 o posterior) y asegúrate de que los servidores de Datadog puedan conectarse a tu instancia de Enterprise. Las direcciones IP de los servidores se encuentran disponibles en la sección Webhooks de [Rangos de IP][6].

4. En **Edit Permissions** (Editar permisos), habilita los permisos de lectura de Datadog para problemas, solicitudes pull y contenidos. Debes seleccionar al menos un permiso.
5. Haz clic en **Create App in GitHub** (Crear aplicación en GitHub), luego se te solicitará que ingreses un nombre de GitHub App en GitHub.
6. Ingresa un nombre en el campo nombre de GitHub App y haz clic en **Create GitHub App** (Crear GitHub App).
7. En la pestaña **Configuration** (Configuración), haz clic en **Install GitHub App** (Instalar GitHub App) e **Install & Authorize** (Instalar y autorizar).

Tu GitHub App se muestra en el cuadro de integración. Para habilitar fragmentos de código en línea en las stack traces, consulta la [Configuración de la integración de código fuente][1].

### Notebooks

Si has concedido permisos de lectura para problemas y solicitudes pull a tu GitHub App, estos generarán de manera automática un cuadro flotante de vista previa con detalles que incluyen el historial de confirmaciones, el autor y la fecha en [Notebooks][7].

{{< img src="integrations/guide/github_apps/notebooks-links-to-git.png" alt="Enlaces a Git" style="width:90%;">}}

1. Dirígete a **Notebooks** > **New Notebook** (Notebook nuevo).
2. Añade una celda de **texto** y menciona un problema o solicitud pull en GitHub en el campo **Edit** (Editar), por ejemplo: `https://github.com/project/repository/pull/#`.
3. Haz clic en **Done** (Listo) y, a continuación, aparecerá el icono de GitHub junto al problema o solicitud pull vinculados.
4. Haz clic en **Connect to Preview** (Conectar a la vista previa) y **Authorize** (Autorizar).
5. Coloca el cursor sobre la solicitud pull o problema vinculado para ver la vista previa de la descripción.

### Logs de auditoría

**Requisito**: Se requiere una cuenta de GitHub Enterprise para recopilar logs de auditoría.

Los logs de auditoría abarcan todas las actividades y eventos de una organización de GitHub. Tras la instalación de una aplicación, permite que los permisos de **administración de la organización** tengan acceso de lectura. Esto permite que la aplicación comience a recopilar el flujo de auditoría de GitHub como logs en nombre de la organización de GitHub.

Sigue las instrucciones en la [Configuración de la transmisión a Datadog][8] en la documentación de GitHub para reenviar tus logs de auditoría a Datadog. A fin de obtener más información sobre los logs de auditoría, consulta la documentación de GitHub para [Acciones de log de auditoría][9].

## Datos recopilados

### Métricas

La integración de GitHub recopila métricas de alertas de escaneo de código y de secretos. Estas métricas proporcionan información general sobre el estado de alerta de la organización al categorizar su estado, repositorio y tipo de secreto. También proporcionan información a largo plazo sobre las tendencias de alerta y su progreso general.

A fin de empezar a recopilar estas métricas, selecciona los permisos correspondientes para el acceso de lectura al instalar la aplicación. Para inhabilitar las métricas de escaneo de código o de secretos, busca la organización correspondiente en la pestaña **Telemetery** (Telemetría) en el cuadro de integración, haz clic en el botón de alternancia de las secciones respectivas y haz clic en **Update Account** (Actualizar cuenta).

### Eventos

<div class="alert alert-info">
Sigue estas instrucciones para configurar webhooks en GitHub y Datadog, lo que permite que los eventos aparezcan en el Events Explorer.
</div>

#### Añadir un webhook en GitHub

1. En tu proyecto de GitHub, dirígete a **Settings** (Configuración) > **Webhooks**.
2. Haz clic en **Add webhook** (Añadir webhook).
3. Añade la siguiente URL en el campo **Payload URL** (URL de carga útil): `https://{{< region-param key="dd_full_site" code="true" >}}/intake/webhook/github?api_key=<DATADOG_API_KEY>`. No olvides reemplazar `<DATADOG_API_KEY>` con [tu clave de API de Datadog][10].
4. Selecciona `application/json` en el menú desplegable **Content type** (Tipo de contenido).
5. De manera opcional, añade un secreto en el campo **Secret** (Secreto).
6. En la sección **Which events would you like to trigger this webhook?** (¿Qué eventos te gustaría que activen este webhook?), haz clic en **Let me select individual events.** (Permíteme seleccionar eventos individuales.) y selecciona una de las siguientes opciones compatibles para enviar [eventos][11] a Datadog:

   | Nombre del evento | Acciones del evento                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
   |---|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
   | [Creación de rama o etiqueta (tag)][12] |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
   | [Comentarios de confirmación][13] |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
   | [Comentarios del problema][14] | Se admiten las siguientes acciones: <br><br>- [`created`][15]<br>- [`deleted`][16]<br>- [`edited`][17]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
   | [Problemas][18] | Se admiten las siguientes acciones: <br><br>- [`assigned`][19]<br>- [`closed`][20]<br>- [`deleted`][21]<br>- [`demilestoned`][22]<br>- [`edited`][23]<br>- [`labeled`][24]<br>- [`locked`][25]<br>- [`milestoned`][26]<br>- [`opened`][27]<br>- [`pinned`][28]<br>- [`reopened`][29]<br>- [`transferred`][30]<br>- [`unassigned`][31]<br>- [`unlabeled`][32]<br>- [`unlocked`][33]<br>- [`unpinned`][34]                                                                                                                                                                                |
   | [Comentarios de revisión de la solicitud pull][35] | Se admiten las siguientes acciones: <br><br>- [`created`][36]<br>- [`deleted`][37]<br>- [`edited`][38]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
   | [Solicitudes pull][39] | Se admiten las siguientes acciones: <br><br>- [`assigned`][40]<br>- [`unassigned`][41]<br>- [`labeled`][42]<br>- [`unlabeled`][43]<br>- [`opened`][44]<br>- [`edited`][45]<br>- [`closed`][46]<br>- [`reopened`][47]<br>- [`synchronize`][48]<br>- [`converted_to_draft`][49]<br>- [`locked`][50]<br>- [`unlocked`][51]<br>- [`enqueued`][52]<br>- [`dequeued`][53]<br>- [`milestoned`][54]<br>- [`demilestoned`][55]<br>- [`ready_for_review`][56]<br>- [`review_requested`][57]<br>- [`review_request_removed`][58]<br>- [`auto_merge_enabled`][59]<br>- [`auto_merge_disabled`][60]  |
   | [Pushes][61] |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
   | [Repositorios][62] | Se admiten las siguientes acciones: <br><br>- [`archived`][63]<br>- [`created`][64]<br>- [`deleted`][65]<br>- [`edited`][66]<br>- [`privatized`][67]<br>- [`publicized`][68]<br>- [`renamed`][69]<br>- [`transferred`][70]<br>- [`unarchived`][71]                                                                                                                                                                                                                                                                                                                                      |
   | [Aviso de seguridad][72] | |
   | [Adiciones del equipo][73] |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

7. Selecciona **Active** (Activo) para recibir detalles del evento cuando se active el enlace.
8. Haz clic en **Add webhook** (Añadir webhook) para guardar el webhook.

#### Añadir un webhook en Datadog

1. En el [cuadro de integración de GitHub][5], dirígete a la pestaña **Webhooks**.
2. Especifica los repositorios y las ramas que quieres monitorizar para cada repositorio. Para añadir todos los repositorios de un usuario u organización, usa comodines (`*`). Puedes usar comodines en los nombres de las ramas. Por ejemplo, `dev-*` incluye todas las ramas que comienzan con `dev-`.

   Para reunir todos los eventos relacionados con la rama `master` del repositorio de GitHub `DataDog/documentation`, puedes ingresar `DataDog/documentation` en el campo **Repository** (Repositorio) y `master` en el campo **Branches** (Ramas).

   Si quieres recopilar todos los eventos relacionados con **todas** las ramas `master` de la organización de Datadog, ingresa `DataDog/*` en el campo **Repository** (Repositorio) y `master` en el campo **Branches** (Ramas).
   Nota: Cuando se usa un comodín para el nombre de repositorio, se debe especificar el usuario o la organización. Por ejemplo, «*» no es un nombre de repositorio válido, pero «DataDog/*» sí lo es.

3. Haz clic en las casillas de verificación de **Commits** (Confirmaciones) e **Issues** (Problemas) para recibir alertas sobre estos eventos.
4. Haz clic en **Update Configuration** (Actualizar configuración) para guardar la configuración del webhook.

Una vez que hayas añadido webhooks en la pestaña **Webhooks** en el cuadro de integración, los eventos en los repositorios de GitHub que especificaste anteriormente empiezan a aparecer en el [Events Explorer][74]. Para obtener más información, consulta la [documentación del Events Explorer][75].

Para filtrar eventos provenientes de GitHub, selecciona **Github** en el menú de la faceta **Source** (Fuente) en **Core** (Núcleo), o ingresa `source:github` en la consulta de búsqueda. La gráfica de barras de los eventos se actualiza de manera automática a medida que editas la consulta de búsqueda.

### Checks de servicio

La integración de GitHub no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][76].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/guide/source-code-integration/
[2]: https://docs.datadoghq.com/es/serverless/configuration/?tab=serverlessframework#link-errors-to-your-source-code
[3]: https://docs.datadoghq.com/es/continuous_integration/guides/pull_request_comments/
[4]: https://docs.datadoghq.com/es/service_catalog/adding_metadata/#store-and-edit-service-definitions-in-github
[5]: https://app.datadoghq.com/integrations/github/
[6]: https://docs.datadoghq.com/es/api/latest/ip-ranges/
[7]: https://app.datadoghq.com/notebook
[8]: https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise#setting-up-streaming-to-datadog
[9]: https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization#audit-log-actions
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads
[12]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#create
[13]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#commit_comment
[14]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#issue_comment
[15]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#issue_comment
[16]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#issue_comment
[17]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#issue_comment
[18]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#issues
[19]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=assigned#issues
[20]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=closed#issues
[21]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#issues
[22]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=demilestoned#issues
[23]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#issues
[24]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=labeled#issues
[25]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=locked#issues
[26]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=milestoned#issues
[27]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=opened#issues
[28]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=pinned#issues
[29]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reopened#issues
[30]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=transferred#issues
[31]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unassigned#issues
[32]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlabeled#issues
[33]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlocked#issues
[34]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unpinned#issues
[35]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request_review_comment
[36]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#pull_request_review_comment
[37]: hhttps://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#pull_request_review_comment
[38]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#pull_request_review_comment
[39]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request
[40]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=assigned#pull_request
[41]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unassigned#pull_request
[42]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=labeled#pull_request
[43]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlabeled#pull_request
[44]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=opened#pull_request
[45]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#pull_request
[46]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=closed#pull_request
[47]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reopened#pull_request
[48]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=synchronize#pull_request
[49]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=converted_to_draft#pull_request
[50]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=locked#pull_request
[51]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlocked#pull_request
[52]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=enqueued#pull_request
[53]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=dequeued#pull_request
[54]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=milestoned#pull_request
[55]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=demilestoned#pull_request
[56]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=ready_for_review#pull_request
[57]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=review_requested#pull_request
[58]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=review_request_removed#pull_request
[59]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=auto_merge_enabled#pull_request
[60]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=auto_merge_disabled#pull_request
[61]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#push
[62]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#repository
[63]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=archived#repository
[64]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#repository
[65]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#repository
[66]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#repository
[67]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=privatized#repository
[68]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=publicized#repository
[69]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=renamed#repository
[70]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=transferred#repository
[71]: https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unarchived#repository
[72]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#security_advisory
[73]: https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#team_add
[74]: https://app.datadoghq.com/event/explorer/
[75]: https://docs.datadoghq.com/es/events/explorer/
[76]: https://docs.datadoghq.com/es/help/
