---
app_id: github
categories:
- automation
- developer tools
- source control
custom_kind: integración
description: GitHub es un servicio de alojamiento web para proyectos de desarrollo
  de software that use the Git revision control system.
further_reading:
- link: https://www.datadoghq.com/blog/source-code-preview/
  tag: blog
  text: Centrarse en el código importante mediante vistas previas del código fuente
    en Continuous Profiler
- link: https://www.datadoghq.com/blog/live-debugging/
  tag: blog
  text: Solucionar eficazmente los errores de producción con la depuración en directo
    de Datadog
- link: https://www.datadoghq.com/blog/datadog-code-analysis/
  tag: blog
  text: Enviar código seguro y de alta calidad más rápidamente con Datadog Code Analysis
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: blog
  text: Crea workflows (UI) / procesos (generic) y aplicaciones en Datadog en cuestión
    de minutos con nuestro asistente de inteligencia artificial.
- link: https://www.datadoghq.com/blog/monitor-github-datadog-cloud-siem/
  tag: blog
  text: Monitoriza GitHub con Cloud SIEM de Datadog
media:
- caption: Fragmento de código de GitHub en la interfaz de usuario de Datadog
  image_url: images/code_snippet.png
  media_type: imagen
- caption: Comentarios automatizados en GitHub Pull Request
  image_url: images/pr_comment.png
  media_type: imagen
- caption: Datadog’s Action Catalog for GitHub
  image_url: images/actions.png
  media_type: imagen
- caption: Dashboard de información general de GitHub
  image_url: images/overview.png
  media_type: imagen
title: GitHub
---
## Información general

La integración de Datadog y GitHub recopila cuatro tipos principales de datos:

- **Registros de auditoría**: actividades de seguimiento de datos de seguridad y cumplimiento a nivel de empresa en toda la organización, cambios de acceso de los usuarios y parámetros de seguridad a través de Audit Log Streaming.

- **Eventos de repositorio**: seguimiento en tiempo real de las actividades del repositorio, incluyendo solicitudes pull, incidentes, commits y cambios de rama a través de webhooks.

- **Información del código fuente**: proporciona acceso al código fuente para potenciar funciones bidireccionales entre Datadog y GitHub, como mostrar fragmentos de código en trazas (traces) de APM, Error Tracking y herramientas de seguridad o habilitar comentarios en solicitudes pull de Code Security y Test Optimization (optimización de tests).

- **Datos de telemetría**: recopilación automatizada de alertas de análisis de código, alertas de análisis de secretos y métricas de repositorio para realizar un seguimiento de las tendencias de seguridad y los patrones de workflow (UI) / proceso (generic).

#### GitHub Apps

La integración de aplicaciones de GitHub te permite conectar tu organización o cuenta personal de GitHub para acceder a la funcionalidad relacionada con el código de source (fuente) y recopilar datos valiosos para ayudarte a monitorizar y proteger tu entorno de GitHub. Gestiona tus aplicaciones de GitHub a través de la [pestaña Configuración](https://docs.datadoghq.com/integrations/guide/source-code-integration/) para empezar.

Configura la integración de GitHub para configurar [aplicaciones de GitHub](https://docs.github.com/en/apps) que conectan tu organización o cuenta personal de GitHub a Datadog, lo que te permite acceder a la funcionalidad relacionada con el código source (fuente), recopilar datos valiosos y ayudarte a monitorizar y proteger tu entorno de GitHub.

**Funcionalidad del código fuente**: cuando se instala con los permisos correctos, la integración de GitHub potencia diferentes funciones de código fuente en productos de Datadog para ayudarte a solucionar problemas y tomar acciones en tu código. Algunos ejemplos incluyen:

- Acelerar las investigaciones en Error Tracking, Continuous Profiler y Code Security utilizando fragmentos de código en línea para contextualizar de dónde procede un problema en tu código.
- Potenciar tus revisiones de código con comentarios automáticos y sugerencias de cambios directamente en tus solicitudes pull desde Code Security y Test Optimization (optimización de tests).
- Tomar acciones en tu código de base con automatizaciones personalizadas creadas con Datadog Actions and Remediations.

Por ejemplo, una vez instalada la aplicación de GitHub con los permisos pertinentes activados, puedes utilizar Datadog [integración del código source (fuente)](https://docs.datadoghq.com/integrations/guide/source-code-integration/) para consultar fragmentos de código en tus stack traces, obtener comentarios automatizados y sugerencias de cambios a través de los comentarios de pull request de [CI Visibility](https://docs.datadoghq.com/continuous_integration/guides/pull_request_comments/) y [Code Security](https://docs.datadoghq.com/security/code_security/dev_tool_int/github_pull_requests/), y acceder a múltiples definiciones de servicios en GitHub desde [Software Catalog](https://docs.datadoghq.com/service_catalog/adding_metadata/#store-and-edit-definitions-in-github).

![Información general de las aplicaciones de GitHub](images/github_applications.png)

Ya puedes integrar tus equipos de GitHub con tus equipos de Datadog: únete a la vista previa:
{{< callout url="https://www.datadoghq.com/product-preview/github-integration-for-teams/" header="Únete a la vista previa">}}
La integración de GitHub para equipos está en vista previa.
{{< /callout >}}

#### Eventos de repositorio

Captura eventos de GitHub en Datadog para:

- Realizar un seguimiento de las nuevas funciones a partir de cambios en el código
- Identificar cuándo los nuevos cambios de código generan alertas en el sistema o fallos de compilación
- Discutir los cambios de código con tu equipo
- Declarar un incidente o exportar un evento a un incidente en curso

Eventos de consumo relacionados con tus acciones en repositorios y/o ramificaciones específicas incluidos:
| Nombre del evento | Acciones del evento |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Creación de ramificación o tag (etiqueta)](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#create) | |
| [Eliminación de ramificación o tag (etiqueta)](https://docs.github.com/en/webhooks/webhook-events-and-payloads#delete) | |
| [Reglas de protección de ramificaciones](https://docs.github.com/en/webhooks/webhook-events-and-payloads#branch_protection_rule) | Se admiten las siguientes acciones: <br><br>- [`created`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#branch_protection_rule)<br>- [`deleted`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#branch_protection_rule)<br>- [`edited`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#branch_protection_rule) |
| [Comentarios de confirmación](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#commit_comment) | |
| [Alertas de Dependabot](https://docs.github.com/en/webhooks/webhook-events-and-payloads#dependabot_alert) | Se admiten las siguientes acciones: <br><br>- [`auto_dismissed`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=auto_dismissed#dependabot_alert)<br>- [`auto_reopened`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=auto_reopened#dependabot_alert)<br>- [`created`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#dependabot_alert)<br>- [`dismissed`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=dismissed#dependabot_alert)<br>- [`fixed`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=fixed#dependabot_alert)<br>- [`reintroduced`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reintroduced#dependabot_alert)<br>- [`reopened`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reopened#dependabot_alert) |
| [Comentarios de problemas](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#issue_comment) | Se admiten las siguientes acciones: <br><br>- [`created`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#issue_comment)<br>- [`deleted`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#issue_comment)<br>- [`edited`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#issue_comment) |
| [Problemas](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#issues) | Se admiten las siguientes acciones: <br><br>- [`assigned`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=assigned#issues)<br>- [`closed`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=closed#issues)<br>- [`deleted`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#issues)<br>- [`demilestoned`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=demilestoned#issues)<br>- [`edited`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#issues)<br>- [`labeled`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=labeled#issues)<br>- [`locked`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=locked#issues)<br>- [`milestoned`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=milestoned#issues)<br>- [`opened`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=opened#issues)<br>- [`pinned`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=pinned#issues)<br>- [`reopened`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reopened#issues)<br>- [`transferred`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=transferred#issues)<br>- [`unassigned`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unassigned#issues)<br>- [`unlabeled`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlabeled#issues)<br>- [`unlocked`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlocked#issues)<br>- [`unpinned`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unpinned#issues) |
| [Comentarios de revisión de solicitud de cambio](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request_review_comment) | Se admiten las siguientes acciones: <br><br>- [`created`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#pull_request_review_comment)<br>- [`deleted`](https://app.datadoghq.com/hhttps://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#pull_request_review_comment)<br>- [`edited`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#pull_request_review_comment) |
| [Solicitudes de cambios](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request) | Se admiten las siguientes acciones: <br><br>- [`assigned`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=assigned#pull_request)<br>- [`unassigned`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unassigned#pull_request)<br>- [`labeled`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=labeled#pull_request)<br>- [`unlabeled`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlabeled#pull_request)<br>- [`opened`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=opened#pull_request)<br>- [`edited`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#pull_request)<br>- [`closed`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=closed#pull_request)<br>- [`reopened`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reopened#pull_request)<br>- [`synchronize`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=synchronize#pull_request)<br>- [`converted_to_draft`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=converted_to_draft#pull_request)<br>- [`locked`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=locked#pull_request)<br>- [`unlocked`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unlocked#pull_request)<br>- [`enqueued`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=enqueued#pull_request)<br>- [`dequeued`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=dequeued#pull_request)<br>- [`milestoned`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=milestoned#pull_request)<br>- [`demilestoned`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=demilestoned#pull_request)<br>- [`ready_for_review`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=ready_for_review#pull_request)<br>- [`review_requested`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=review_requested#pull_request)<br>- [`review_request_removed`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=review_request_removed#pull_request)<br>- [`auto_merge_enabled`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=auto_merge_enabled#pull_request)<br>- [`auto_merge_disabled`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=auto_merge_disabled#pull_request) |
| [Inserciones](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#push) | |
| [Repositorios](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#repository) | Se admiten las siguientes acciones: <br><br>- [`archived`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=archived#repository)<br>- [`created`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=created#repository)<br>- [`deleted`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=deleted#repository)<br>- [`edited`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=edited#repository)<br>- [`privatized`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=privatized#repository)<br>- [`publicized`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=publicized#repository)<br>- [`renamed`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=renamed#repository)<br>- [`transferred`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=transferred#repository)<br>- [`unarchived`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=unarchived#repository) |
| [Alertas de vulnerabilidad del repositorio](https://docs.github.com/en/webhooks/webhook-events-and-payloads#repository_vulnerability_alert) | Se admiten las siguientes acciones: <br><br>- [`create`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=create#repository_vulnerability_alert)<br>- [`dismiss`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=dismiss#repository_vulnerability_alert)<br>- [`reopen`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=reopen#repository_vulnerability_alert)<br>- [`resolve`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=resolve#repository_vulnerability_alert) |
| [Asesoramiento de seguridad](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#security_advisory) | Se admiten las siguientes acciones: <br><br>- [`published`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=published#security_advisory)<br>- [`updated`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=updated#security_advisory)<br>- [`withdrawn`](https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=withdrawn#security_advisory)   |
| [Agregados al equipo](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#team_add) |
| [Cambios en la visibilidad](https://docs.github.com/en/webhooks/webhook-events-and-payloads#public) |

#### Datos de telemetría

Recopilación automatizada de datos mediante rastreadores de métricas y logs:

- Métricas de alerta del análisis de código
- Métricas de alerta del análisis de secretos
- Métricas de repositorio
- Seguimiento del estado de alertas
- Tendencias de flujos de trabajo

#### Registros de auditoría

Datos de seguridad y cumplimiento a nivel de empresa:

- Audit Log Streaming (recomendado para nuevos clientes)
  - Monitorización de la actividad de toda la organización en tiempo real
  - Cambios en el acceso de los usuarios
  - Modificación de los parámetros de seguridad
  - Eventos a nivel de organización
- Rastreador de logs de auditoría legacy (disponible solo para clientes que lo hayan configurado previamente)
  - Datos de logs de auditoría históricos
  - Eventos de seguridad de la organización

**Nota**: Datadog eligió Audit Log Streaming como método preferido para la recopilación de logs de auditoría. Mientras que los rastreadores de análisis de código y de seguridad siguen siendo partes activas de GitHub Telemetry, el rastreador de logs de auditoría solo está disponible para los clientes que lo hayan instalado previamente.

## Configuración

### Configuración

Cada tipo de datos requiere permisos y pasos de configuración específicos. Consulta la sección de configuración de cada tipo de datos para configurar cada parte de la integración.

- [Logs de auditoría](#audit-logs)
- [GitHub Apps](#github-apps)
- [Métricas](#metrics)
- [Eventos de repositorio](#repository-events)

### GitHub Apps

<div class="alert alert-info">
Dependiendo de la función del producto, puede ser necesaria una configuración adicional, además de la creación de una GitHub App, para habilitar completamente esa función. La creación de una GitHub App para conectar tu cuenta solo concede los permisos de GitHub que estas funciones requieren como requisitos previos. No incurrirás en gastos adicionales por la creación de GitHub Apps y ninguna función asociada a un producto facturable estará habilitada por defecto, aunque concedas los permisos necesarios para dichas funciones. 
</div>

1. En el [ícono de integración de GitHub](https://app.datadoghq.com/integrations/github/), ve a la pestaña **Configuration** (Configuración).

1. Haz clic en **Connect GitHub Account** (Conectar cuenta de GitHub) para crear una GitHub App nueva.

1. En **Configure App** (Configurar aplicación), selecciona **Organization** (Organización) e ingresa un nombre para la organización en GitHub, o selecciona **Personal Account** (Cuenta personal).

1. Para despliegues de GitHub autoalojadas, selecciona **Running GitHub enterprise server** (Ejecutar servidor empresarial de GitHub) e introduce la URL de tu instancia de servidor empresarial de GitHub (versión 2.22 o superior). Asegúrate de que los servidores de Datadog puedan conectarse con tu instancia de GitHub. Las direcciones IP de los servidores están disponibles en la sección Webhooks de [Rangos de IP](https://docs.datadoghq.com/api/latest/ip-ranges/).

1. Opcionalmente, si no quieres utilizar la configuración recomendada de Datadog, amplía **Edit GitHub App permissions** (Editar permisos de GitHub App) para ver y personalizar los permisos de GitHub que quieres conceder a Datadog. El resumen contiene estas secciones:

   - **Funciones de Datadog** enumera las funciones generales y específicas del producto en Datadog que requieren permisos específicos de GitHub. Amplía cada función para obtener detalles sobre su funcionalidad y sus requisitos.

   - **Permisos de GitHub** enumera los permisos de GitHub relacionados. Puedes utilizar los desplegables **Access Level** (Nivel de acceso) para cambiar la autorización del acceso a aspectos específicos de tu entorno de GitHub.

   Por defecto, Datadog selecciona los permisos recomendados necesarios para todas las funciones relacionadas con el código fuente. Cambiar los permisos afectará a la funcionalidad de las funciones. La sección **Datadog Features** (Funciones de Datadog) identifica cualquier función no disponible y sus requisitos faltantes.

!["Permisos faltantes de Github"](images/missing_permissions.png)

6. Haz clic en **Create App in GitHub** (Crear aplicación en GitHub). Si es necesario, se te pedirá que te autentiques en GitHub.
1. En GitHub, introduce un nombre para tu GitHub App y haz clic en **Create GitHub App** (Crear GitHub App).
1. Elige si quieres instalar la GitHub App para **All repositories** (Todos los repositorios) o **Only select repositories** (Solo los repositorios seleccionados) y, a continuación, haz clic en **Install & Authorize** (Instalar y autorizar).

Cuando termines de instalar la aplicación de GitHub, volverás al punto donde lo dejaste en Datadog. Para activar fragmentos de código en línea en APM, considera [configurar la integración del código source (fuente)](https://docs.datadoghq.com/integrations/guide/source-code-integration/).

#### Actualizar una GitHub App existente

Si una GitHub App instalada no tiene los permisos o webhooks necesarios para una función, Datadog indica los requisitos que faltan en la pestaña **Configuration** (Configuración) de la página de la integración. Esta alerta también aparece en otras áreas de Datadog en las que puedes activar y utilizar funciones con tecnología GitHub, como Test Optimization.

Para actualizar tu GitHub App con los requisitos que faltan de la página de la integración:

1. Haz clic en **Review Missing Requirements** (Revisar los requisitos que faltan).
1. Selecciona las funciones de Datadog deseadas. La lista solo incluye las funciones a las que les faltan requisitos.
1. A medida que selecciones cada función, ten en cuenta los **Repository Permissions** (Permisos de repositorio), los **Organization Permissions** (Permisos de organización) o los **Webhooks** específicos que se indican en el siguiente paso de las instrucciones.
1. Haz clic en **Go to GitHub App Settings** (Ir a los parámetros de GitHub App) y autentícate con GitHub.
1. En GitHub, actualiza los permisos y webhooks necesarios. Revisa las instrucciones en Datadog, si es necesario.
1. Asegúrate de hacer clic en **Save changes** (Guardar cambios), en la parte inferior de la página en GitHub.
1. Datadog intentará verificar que hayas realizado los cambios correctamente. Vuelve a Datadog para confirmar que la verificación se aprobó con una marca de verificación verde. Si sólo necesitas actualizar los webhooks, puedes cerrar las instrucciones y detenerte aquí.

**_Si actualizaste los permisos_**

1. Haz clic en **Accept New Permissions** (Aceptar nuevos permisos) para volver a GitHub y aceptar los cambios en los permisos.

1. En GitHub, haz clic en **Review request** (Revisar solicitud) y acepta los nuevos permisos.

1. Datadog intentará verificar que tus nuevos permisos hayan sido aceptados con éxito. Vuelve a Datadog para confirmar que la verificación se aprobó con una marca de verificación verde y, a continuación, cierra las instrucciones.

   ![Permisos de cambio](images/change_permissions.png)

#### Notebooks

Si has concedido a tu aplicación de GitHub permisos de lectura para incidencias y solicitudes de cambios, las incidencias y solicitudes de cambios de GitHub generan automáticamente una ventana emergente de previsualización con detalles que incluyen el historial de confirmaciones, el autor y la fecha en [Notebooks](https://app.datadoghq.com/notebook).

1. Ve a **Notebooks** > **New Notebook** (Notebooks > Notebook nuevo).
1. Añade una celda **Text** (Textp) y menciona una incidente o una solicitud pull en GitHub en el campo **Editar** (Editar). Por ejemplo: `https://github.com/project/repository/pull/#`.
1. Haz clic en **Done** (Listo). Aparecerá el icono de GitHub junto al incidente o la solicitud pull vinculada.
1. Si es necesario, haz clic en **Connect to Preview** (Conectar a Vista Previa) y **Authorize** (Autorizar).
1. Coloca el cursor sobre la solicitud pull o problema vinculado para ver la vista previa de la descripción.

![Notebooks](images/notebook.png)

#### Conecta GitHub Teams a Datadog Teams

Para vincular GitHub Teams a [Datadog Teams ](https://docs.datadoghq.com/account_management/teams/), tu aplicación de GitHub debe tener el permiso _Miembros leen_. En el [ícono de integración de GitHub](https://app.datadoghq.com/integrations/github/), haz clic en **Review Missing Requirements** (Revisar los requisitos que faltan) y selecciona **Link GitHub Teams** (Vincular GitHub Teams) para ver cómo actualizar tu aplicación de GitHub con los permisos necesarios.

Cuando tu aplicación de GitHub tenga el permiso _Miembros leen_, puedes vincular tu equipo de Datadog a un equipo de GitHub:

1. En Datadog, ve a **Organization Settings** (Configuración de la organización) > **Teams**.
1. Selecciona el equipo Datadog que desees vincular.
1. En la page (página) del equipo, haz clic en **Settings** (Configuración).
1. Selecciona **GitHub Connection** (Connection (conexión) con GitHub).
1. Selecciona el equipo de GitHub que desees vincular.

La connection (conexión) de GitHub Teams a Datadog Teams mejora las siguientes funciones:

- [Code Security](https://docs.datadoghq.com/security/code_security/): Datadog puede [asociar automáticamente las vulnerabilidades detectadas con Teams](https://docs.datadoghq.com/getting_started/code_security/?tab=staticcodeanalysissast#link-results-to-teams)
- [Error Tracking](https://docs.datadoghq.com/error_tracking/explorer/): Automatiza la asignación de problemas a Teans con [Issue Team Ownership](https://docs.datadoghq.com/error_tracking/issue_team_ownership/)

### Logs de auditoría

**Requirement** (Requisito): Se requiere una cuenta de GitHub Enterprise para recopilar logs de auditoría.

Los logs de auditoría abarcan todas las actividades y eventos de una organización de GitHub. Sigue las instrucciones de [configuración de streaming a Datadog](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise#setting-up-streaming-to-datadog) en la documentación de GitHub para reenviar tus logs de auditoría a Datadog. Para obtener más información sobre los logs de auditoría, consulta la documentación de GitHub para [acciones de logs de auditoría](https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization#audit-log-actions).

### Datos de telemetría

1. Configura una aplicación siguiendo las instrucciones de la sección [GitHub Apps](#github-apps).
1. Selecciona los permisos respectivos para el acceso de lectura durante la instalación de la aplicación.
1. Ve a la pestaña **Telemetry** (Telemetría) en el cuadro de Datadog.
1. Activar **Code Scan Alert** (Alerta de análisis de código) o **Secret Scan Alerts** (Alerta de análisis de secretos).
   ![Datos telemétricos](images/telemetry_data.png)

**Para excluir las métricas Análisis de códigos o Análisis de secretos:_**

1. Busca la organización correspondiente en la pestaña **Telemetry** (Telemetría) del cuadro de la integración.
1. Haz clic en el conmutador de las secciones correspondientes.
1. Haz clic en **Update Account** (Actualizar cuenta).

### Eventos de repositorio

**Prerequisite** (Requisito previo): debes ser un administrador de Github de tu repositorio.

#### En GitHub

1. Haz clic en la página **Settings** (Parámetros) de tu proyecto de GitHub.

1. Haz clic en **Webhooks** en la sección **Code, vplanning automation** (Código, planificación de la automatización).

1. Haz clic en **Add Webhook** (Añadir webhook).

1. Añade la siguiente URL en el campo **Payload URL** (URL de carga útil):
   `https://{{< region-param key="dd_full_site" code="true" >}}/intake/webhook/github?api_key=<DATADOG_API_KEY>`. No olvides sustituir `<DATADOG_API_KEY>` por [tu clave de la API de Datadog ](https://app.datadoghq.com/organization-settings/api-keys). Esto también se puede generar en el ícono.

1. Selecciona `application/json` en el menú desplegable **Content type** (Tipo de contenido).

1. De manera opcional, añade un secreto en el campo **Secret** (Secreto).

1. Asegúrate de que la casilla `Active` está seleccionada.

1. Haz clic en **Add Webhook** (Añadir webhook).

   !["Configuración de Github Webhook](images/gh_webhook_config.png)

1. En la sección **Which events would you like to trigger this webhook?** (¿Qué eventos deseas que activen este webhook?), haz clic en **Let me select individual events** (Déjame seleccionar eventos individuales). Selecciona eventos de entre las siguientes opciones compatibles para enviar [eventos](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads) a Datadog:

- creación de rama o etiqueta
- eliminación de rama o etiqueta
- reglas de protección de ramas
- comentarios de commits
- commits
- alertas de dependabot
- comentarios del incidente
- incidentes
- afiliación \**Only for Organizations** (Solo para organizaciones)
- comentarios de revisión de solicitudes pull
- solicitudes pull
- envíos
- repositorios
- alertas de vulnerabilidad de repositorios
- consultoría de seguridad
- agregado de equipos
- cambios de visibilidad

**Nota** Si seleccionas un evento que no figura en la lista anterior, Datadog no lo recibirá.

#### Configurar la integración de eventos de Github

Después de configurar el webhook en GitHub, configura qué repositorios y eventos monitorizar en Datadog.

1. Ve al [ícono de integración de GitHub](https://app.datadoghq.com/integrations/github/) en Datadog.

1. Haz clic en la pestaña **Events** (Eventos).

1. En la sección **Repository Configuration** (Configuración del repositorio):

   - Introduce el nombre o los nombres de los repositorios que desees monitorizar.
   - Formato: `organization/repository` (por ejemplo, `Datadog/documentation`)
   - Para varios repositorios:
     - Utiliza comodines: `Datadog/*` monitoriza todos los repositorios de la organización de Datadog.
     - Enumera repositorios específicos: `Datadog/documentation`, `Datadog/integrations-core`.

1. En la sección **Branch Configuration** (Configuración de la rama):

   - Introduce el nombre o los nombres de las ramas que quieres monitorizar.
   - Ejemplos:
     - Una sola rama: `main`
     - Varias ramas: `main`, `develop`
     - Utiliza comodines: `feature/*` monitoriza todas las ramas de funciones.
     - Patrón común: `dev-*` monitoriza todas las ramas de desarrollo.

1. En la sección **Event Types** (Tipos de eventos):

   - Selecciona **Commits** para realizar un seguimiento de los cambios en el código.
   - Selecciona **Issues** (Incidentes) para monitorizar actividad de incidentes.
   - Ambos pueden seleccionarse para un control exhaustivo

1. Haz clic en **Update Configuration** (Actualizar configuración) para guardar la configuración.

Después de la configuración, puedes ver los eventos de tu repositorio en [Explorer de eventos](https://app.datadoghq.com/event/explorer/):

- Filtra eventos utilizando `source (fuente):github`.
- Utiliza el menú de facetas fuente en Core para filtrar los eventos de GitHub.
- El flujo de eventos se actualiza en tiempo real a medida que se producen nuevos eventos.

**Nota**: Los eventos pueden tardar unos minutos en empezar a aparecer luego de la configuración inicial.

### Datos recopilados

Recopila datos procesables derivados de logs de auditoría, análisis de código, análisis de secretos y métricas de repositorio de GitHub. Estos datos de telemetría permitirán a tus equipos de ingeniería comprender las tendencias de los workflows / procesos (generic) y eventos de seguridad. Esta integración también recopila eventos de repositorios.

- Visualiza y realiza un seguimiento de la actividad de los repositorios, de los eventos de auditoría y de tu estado de alerta general.
- Configura monitores en repositorios específicos para asegurarte de que tu equipo realiza un seguimiento de todas las nuevas alertas de análisis de código y dirígelas directamente a Slack o Jira para tomar medidas inmediatas.
- Protege tu organización de GitHub de las amenazas utilizando [Cloud SIEM de Datadog](https://docs.datadoghq.com/continuous_integration/guides/pull_request_comments/) para detectar señales que puedan indicar actividades sospechosas.

Para empezar a ingerir estos datos, sigue las instrucciones de la [pestaña Telemetría](https://docs.datadoghq.com/security/code_security/dev_tool_int/github_pull_requests/) después de instalar la aplicación de GitHub de Datadog.

### Métricas

Esta integración recopila las siguientes métricas:

- Alertas de análisis de código: Recopila métricas relacionadas con los distintos tipos de alertas de análisis de código y realiza un seguimiento de sus tendencias a lo largo del tiempo.

- Alertas de análisis de secretos: Recopila métricas a medida que se detectan alertas de análisis de secretos y monitoriza cómo se resuelven.

Estas métricas proporcionan una información general del estado de las alertas de la organización clasificando su estado, repositorio y tipo de secreto. También proporcionan información a largo plazo sobre las tendencias de las alertas y su progreso general.

### Checks de servicio

La integración de GitHub no incluye checks de servicio.

### Eventos

Esta integración utiliza webhooks para recopilar eventos del repositorio, que puedes ver en [Explorer de eventos](https://app.datadoghq.com/event/explorer/).

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}