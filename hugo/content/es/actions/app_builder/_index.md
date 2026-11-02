---
aliases:
- /es/developers/datadog_apps/
- /es/developers/ui_extensions/
- /es/developers/faq/ui_extensions
- /es/service_management/app_builder/
description: Plataforma de bajo código para crear herramientas internas con interfaz
  de arrastrar y soltar, soporte para JavaScript e integración con servicios externos.
disable_toc: false
further_reading:
- link: /actions/datadog_apps/
  tag: Documentación
  text: Datadog Apps
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: 'Datadog Cloud SIEM: Impulsando la innovación en las operaciones de seguridad'
- link: /actions/actions_catalog/
  tag: Documentación
  text: Action Catalog
- link: https://www.datadoghq.com/blog/datadog-app-builder-low-code-internal-tools/
  tag: Blog
  text: Cree herramientas personalizadas de monitoreo y remediación con Datadog App
    Builder
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: Blog
  text: Remedie aplicaciones creadas con Datadog App Builder
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: Blog
  text: Cree flujos de trabajo y aplicaciones de Datadog en minutos con nuestro asistente
    de IA
- link: https://www.datadoghq.com/blog/pm-app-automation/
  tag: Blog
  text: Cómo creamos una sola aplicación para automatizar tareas repetitivas con Datadog
    Workflow Automation, Datastore y App Builder
- link: https://learn.datadoghq.com/courses/getting-started-app-builder/
  tag: Centro de aprendizaje
  text: Introducción a App Builder
- link: https://www.datadoghq.com/blog/generate-apps-with-ai/
  tag: Blog
  text: Cree aplicaciones personalizadas en segundos con IA conversacional en App
    Builder
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: Centro de aprendizaje
  text: Cree aplicaciones de autoservicio con App Builder para Third-Party Integrations
title: App Builder
---
## Descripción general {#overview}

Datadog App Builder es una plataforma de creación de aplicaciones de bajo código. Agiliza el desarrollo de sus herramientas internas con una interfaz de arrastrar y soltar fácil de usar y soporte integrado para JavaScript. App Builder se integra con servicios populares como AWS y GitHub, lo que le permite aprovechar los datos y conectarse sin problemas con API y almacenes de datos externos. Al integrarse con las capacidades existentes de Datadog, App Builder proporciona un contexto centralizado que le permite tomar medidas preventivas o responder a incidentes en curso, todo desde la misma vista que utiliza para la resolución de problemas.

Para aplicaciones más complejas que requieren un flujo de trabajo de desarrollo local, control de versiones o colaboración entre varios ingenieros, consulte [Datadog Apps][10] para crear aplicaciones como código.

{{< img src="/actions/app_builder/app-builder-app.png" alt="Una aplicación en App Builder" caption="Una aplicación en App Builder" style="width:100%;" >}}

### Ejemplos de casos de uso {#example-use-cases}
A continuación, se presentan algunos ejemplos de lo que pueden hacer las aplicaciones de App Builder:
- Identifique las causas más probables de una regresión dada una descripción de texto de un incidente y los 150 commits más recientes a un repositorio.
- Haga un seguimiento del estado de su servicio de PagerDuty para obtener un contexto completo mientras trabaja en incidentes.
- Permita que los usuarios administren sus instancias de EC2 directamente desde un Dashboard.
- Permita que los usuarios exploren y visualicen el contenido de un bucket de S3.
- Utilice una integración de PagerDuty para ver quién está de guardia para cada equipo en una organización.
- Resuma el progreso de cada PR en un repositorio determinado.

## Cómo funciona App Builder con acciones {#how-app-builder-works-with-actions}

Datadog App Builder proporciona un [Action Catalog][1] de cientos de acciones a través de múltiples integraciones. El Action Catalog y las credenciales de conexión para cada integración se comparten con [Datadog Workflow Automation][2]. Si no hay una integración que realice su tarea, puede usar acciones genéricas como las solicitudes HTTP y las funciones de JavaScript para realizar cualquier tarea que su aplicación requiera.

## Realice acciones directamente desde sus Dashboards {#take-action-directly-from-dashboards}

Puede usar sus aplicaciones desde la página de Aplicaciones o [acceder a ellas directamente desde sus Dashboards][6]. Las aplicaciones de Datadog funcionan como integraciones nativas de Dashboard, lo que le permite personalizar y realizar acciones sobre sus datos directamente desde su Dashboard.

{{< img src="/actions/app_builder/app-builder-embedded-dashboard-2.png" alt="Una aplicación de equilibrador de tareas de ECS integrada en un Dashboard, con un cursor haciendo clic en el botón Scale Service" caption="Una aplicación de equilibrador de tareas de ECS integrada en un Dashboard, con un cursor haciendo clic en un botón en él" style="width:100%;" >}}

### Aplicaciones creadas por Datadog {#apps-created-by-datadog}

Las aplicaciones creadas por Datadog son aplicaciones que están integradas en los Dashboards de integración. Funcionan sin tener que crearlas; todo lo que necesita hacer es elegir una conexión.

Por ejemplo, el [EC2 integration dashboard][7] ofrece una aplicación de gestión de instancias de EC2. Cuando carga el Dashboard, la aplicación se completa con datos de demostración:

{{< img src="/actions/app_builder/ootb-app-ec2-demo-data.png" alt="Una aplicación de EC2 creada por Datadog" caption="Una aplicación de EC2 creada por Datadog" style="width:100%;" >}}

Para usar la aplicación con sus datos, haga clic en {{< ui >}}\+ Connect Data{{< /ui >}}, luego cree una nueva conexión o seleccione una existente. Después de guardar su selección, la aplicación muestra datos de su conexión.

Puede cambiar la conexión seleccionada haciendo clic en {{< ui >}}Change Connection{{< /ui >}} en la aplicación.

## Dashboard de App Builder Overview {#app-builder-overview-dashboard}

El Dashboard de App Builder Overview proporciona una visión general de alto nivel de sus aplicaciones de Datadog. Para encontrar el Dashboard, vaya a su [Dashboard list][8] y busque `App Builder Overview`.

{{< img src="actions/app_builder/app-builder-overview-dashboard-2.png" alt="Dashboard de App Builder Overview" caption="Dashboard de App Builder Overview"style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#app-builder** en el [Datadog Community Slack][4].

[1]: https://app.datadoghq.com/actions/action-catalog/
[2]: /es/actions/workflows/
[3]: https://app.datadoghq.com/app-builder/blueprints
[4]: https://chat.datadoghq.com/
[5]: /es/actions/app_builder/build/#build-an-app-from-a-blueprint
[6]: /es/actions/app_builder/embedded_apps/#add-apps-to-your-dashboard
[7]: https://app.datadoghq.com/dash/integration/60
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/app-builder/apps/list
[10]: /es/actions/datadog_apps/