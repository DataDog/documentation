---
disable_toc: false
further_reading:
- link: /actions/actions_catalog/
  tag: Documentación
  text: Catálogo de acciones
- link: https://www.datadoghq.com/blog/datadog-app-builder-low-code-internal-tools/
  tag: Blog
  text: Crea herramientas de monitorización y corrección personalizadas con App Builder
    de Datadog
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: Blog
  text: Corregir aplicaciones creadas con Datadog App Builder
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: Blog
  text: Crea flujos de trabajo y aplicaciones en Datadog en cuestión de minutos con
    nuestro asistente de inteligencia artificial.
title: App Builder
site_support_id: actions
---

App Builder de Datadog es una plataforma de creación de aplicaciones de bajo código. Agiliza el desarrollo de tus herramientas internas con una interfaz de arrastrar y soltar fácil de utilizar y una compatibilidad integrada con JavaScript. App Builder se integra con servicios populares como AWS y GitHub, lo que te permite aprovechar los datos y conectarte de forma fluida con API externas y almacenes de datos. Mediante su integración con las capacidades existentes de Datadog, App Builder te proporciona un contexto centralizado que te permite tomar medidas preventivas o responder a incidentes activos, todo desde la misma vista que utilizas para solucionar problemas.

{{< img src="/service_management/app_builder/app-builder-app.png" alt="App Builder en una aplicación" style="width:100%;" >}}

## Configurar acciones de App Builder

Datadog App Builder proporciona un [Catálogo de Acciones][1] de cientos de acciones a través de múltiples integraciones. El Catálogo de acciones y las credenciales de conexión de cada integración se comparten con [Datadog Workflow Automation][2]. Si no hay una integración que realice tu tarea, puedes utilizar acciones genéricas como las solicitudes HTTP y las funciones JavaScript para realizar cualquier tarea que requiera tu aplicación.

{{< img src="/service_management/app_builder/app-builder-action-catalog.png" alt="App Builder de Datadog proporciona un catálogo de acciones con más de 300 acciones en varias integraciones." style="width:100%;" >}}

## Empezar con planos

Datadog te proporciona flujos preconfigurados en forma de [planos][3] predefinidos para ayudarte a [empezar][5].

A continuación encontrarás algunos ejemplos de lo que pueden hacer las aplicaciones de App Builder:
- Identificar las causas más probables de una regresión a partir de una descripción de texto de un incidente y los 150 ingresos más recientes a un repositorio.
- Monitorizar el estado de tu servicio PagerDuty para obtener un contexto completo, mientras trabajas en los incidentes.
- Permitir a los usuarios gestionar sus instancias de EC2 directamente desde un dashboard.
- Permitir a los usuarios explorar y ver el contenido de un bucket de S3.
- Utilizar la integración PagerDuty para ver quién está de guardia en cada equipo de una organización.
- Resumir el progreso de cada solicitud push (PR) en un repositorio determinado.

{{< img src="/service_management/app_builder/app-builder-blueprints-2.png" alt="Planos de aplicación" style="width:100%;" >}}

## Actuar directamente desde los dashboards

Puedes utilizar tus aplicaciones desde la página Aplicaciones o [acceder a ellas directamente desde tus dashboards][6]. Las aplicaciones Datadog funcionan como integraciones nativas de dashboards y te permiten personalizar tus datos y utilizarlos directamente desde tu dashboard.

{{< img src="/service_management/app_builder/app-builder-embedded-dashboard.png" alt="Aplicación integrada en un dashboard" style="width:100%;" >}}

### Aplicaciones creadas por Datadog

Las aplicaciones creadas por Datadog son aplicaciones integradas en dashboards de integraciones. Funcionan sin necesidad de crearlas y basta con elegir una conexión.

Por ejemplo, el [dashboard de integraciones EC2][7] ofrece una aplicación de gestión de instancias EC2. Al cargar el dashboard, la aplicación se rellena con datos de ejemplo:

{{< img src="/service_management/app_builder/ootb-app-ec2-demo-data.png" alt="Aplicación EC2 creada por Datadog, rellenada con datos de ejemplo" style="width:100%;" >}}

Para utilizar la aplicación con tus datos, haz clic en **+ Connect Data** (+Conectar datos) y luego crea una nueva conexión o selecciona una existente. Después de guardar tu selección, la aplicación muestra los datos de tu conexión.

Puedes cambiar la conexión seleccionada haciendo clic en **Change Connection** (Cambiar conexión) en la aplicación.

## Dashboard de información general de App Builder

El dashboard de información general de App Builder proporciona importante información general de tus aplicaciones Datadog. Para encontrar el dashboard, ve a tu [lista de dashboards][8] y busca `App Builder Overview`.

{{< img src="service_management/app_builder/app-builder-overview-dashboard.png" alt="Dashboard de información general de App Builder" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#app-builder** en [Datadog Community Slack][4].

[1]: https://app.datadoghq.com/app-builder/action-catalog
[2]: /es/service_management/workflows/
[3]: https://app.datadoghq.com/app-builder/blueprints
[4]: https://datadoghq.slack.com/
[5]: /es/service_management/app_builder/build/#build-an-app-from-a-blueprint
[6]: /es/service_management/app_builder/embedded_apps/#add-apps-to-your-dashboard
[7]: https://app.datadoghq.com/dash/integration/60
[8]: https://app.datadoghq.com/dashboard/lists