---
disable_toc: false
further_reading:
- link: /service_management/workflows/actions_catalog/
  tag: Documentación
  text: Catálogo de acciones
- link: https://www.datadoghq.com/blog/datadog-app-builder-low-code-internal-tools/
  tag: Blog
  text: Crea herramientas de monitorización y de corrección personalizadas con App
    Builder de Datadog
title: App Builder
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/dg/datadog-app-builder/" btn_hidden="false" header="Join the Beta!">}}
App Builder de Datadog está en fase beta privada. Rellena el formulario para solicitar acceso.
{{< /callout >}}

App Builder de Datadog es una plataforma de creación de aplicaciones de bajo código. Agiliza el desarrollo de tus herramientas internas con una interfaz de arrastrar y soltar fácil de utilizar y una compatibilidad integrada con JavaScript. App Builder se integra con servicios populares como AWS y GitHub, lo que te permite aprovechar los datos y conectarte de forma fluida con API externas y almacenes de datos. Al integrarse con las capacidades existentes de Datadog, App Builder proporciona un contexto centralizado que te permite tomar medidas preventivas o responder a incidentes en curso, todo desde la misma vista que utilizas para solucionar problemas.

{{< img src="/service_management/app_builder/app-builder.png" alt="Aplicación en App Builder" style="width:100%;" >}}

## Configurar acciones de App Builder

App Builder de Datadog te proporciona un [catálogo de acciones][1] con más de 300 acciones en varias integraciones. El catálogo de acciones y las credenciales de conexión para cada integración se comparten con la [automatización de flujos de trabajo de Datadog][2]. Si no hay una integración que realice tu tarea, puedes utilizar acciones genéricas, como por ejemplo las solicitudes HTTP y las funciones JavaScript, para realizar cualquier tarea que requiera tu aplicación.

{{< img src="/service_management/app_builder/app-builder-actions.png" alt="App Builder de Datadog proporciona un catálogo de acciones con más de 300 acciones en varias integraciones." style="width:100%;" >}}

## Empezar con modelos

Datadog pone a tu disposición flujos preconfigurados en forma de [modelos][3] listos para utilizar, que te ayudan a empezar.

A continuación encontrarás algunos ejemplos de lo que pueden hacer las aplicaciones de App Builder:
- Identificar las causas más probables de una regresión a partir de una descripción de texto de un incidente y los 150 ingresos más recientes a un repositorio.
- Monitorizar el estado de tu servicio PagerDuty para obtener un contexto completo mientras trabajas en los incidentes.
- Permitir a los usuarios gestionar sus instancias de EC2 directamente desde un dashboard.
- Permitir a los usuarios explorar y ver el contenido de un bucket de S3.
- Utilizar la integración PagerDuty para ver quién está de guardia en cada equipo de una organización.
- Resumir el progreso de cada solicitud push (PR) en un repositorio determinado.

{{< img src="/service_management/app_builder/app-builder-blueprints-1.png" alt="Modelos de aplicaciones" style="width:100%;" >}}

## Actuar directamente desde dashboards

Puedes utilizar tus aplicaciones desde la página de aplicaciones o acceder a ellas directamente desde tu dashboards. Las aplicaciones de Datadog funcionan como integraciones nativas de dashboards, lo que te permite personalizar y actuar sobre tus datos directamente desde tu dashboard.

{{< img src="/service_management/app_builder/app-builder-embedded-dashboard.png" alt="Aplicación integrada en un dashboard" style="width:100%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/workflows/actions_catalog/
[2]: /es/service_management/workflows/
[3]: https://app.datadoghq.com/app-builder/blueprints