---
aliases:
- /es/software_catalog/overview_pages
description: Las páginas de descripción general del Internal Developer Portal ofrecen
  a los desarrolladores una vista de sus elementos de acción y el estado del servicio,
  y brindan a los gerentes de ingeniería una vista de alto nivel de la confiabilidad
  y el rendimiento del Scorecard.
further_reading:
- link: actions/app_builder
  tag: Documentación
  text: App Builder
- link: monitors/
  tag: Documentación
  text: Monitores de Datadog
- link: /incident_response/incident_management/
  tag: Documentación
  text: Incident Management
- link: /service_level_objectives/
  tag: Documentación
  text: Service Level Objectives
- link: error_tracking
  tag: Documentación
  text: Error Tracking
- link: watchdog
  tag: Documentación
  text: Watchdog
site_support_id: idp
title: Páginas de descripción general
---
{{< callout url="https://www.datadoghq.com/product-preview/developer-overview-page/" header="¡Únase a la vista previa de la página de descripción general del desarrollador!" >}}
{{< /callout >}}

## Descripción general {#overview}

La Plataforma interna para desarrolladores (IDP) de Datadog incluye **páginas de descripción general** que muestran la información más relevante para cada parte interesada:
- Los desarrolladores obtienen una vista centralizada de sus elementos de acción, problemas e información del servicio de su equipo.
- Los SREs y los gerentes de ingeniería obtienen una vista general de la confiabilidad del producto, el estado del servicio, el rendimiento del Scorecard y otras métricas clave en sus equipos.

## Página de descripción general del desarrollador {#developer-overview-page}

{{< img src="tracing/eng_reports/developer-overview-page.png" alt="La página de descripción general del desarrollador en la sección My Workspace del Internal Developer Portal, con un Overview que muestra métricas de alto nivel de alerta, incidente y SLO, y una sección My Tasks que muestra tickets de JIRA." style="width:100%;" >}}

La página de descripción general del desarrollador centraliza la siguiente información sobre su equipo y sus servicios:
- Monitores, incidentes y SLO de su equipo
- Sus PRs de GitHub
- Servicios y rendimiento del Scorecard de su equipo
- Sus problemas, errores y alertas de Watchdog

### Uso de la página de descripción general del desarrollador {#using-the-developer-overview-page}

#### Comience {#get-started}

El widget "My Pull Requests" que se muestra en la página de descripción general del desarrollador funciona con [Datadog App Builder][9] y muestra inicialmente datos de demostración.

Para usar la página de descripción general del desarrollador con sus datos, [conecte sus fuentes de datos][10]:
1. Encuentre la página de descripción general del desarrollador seleccionando la pestaña **Overview** en IDP y seleccionando **My Workspace** en el menú de la izquierda.
1. Para este widget:

   1. Haga clic en **+ Connect Data**.
   1. Cree una nueva conexión o seleccione una existente.

   <br>
   Después de guardar su selección, el widget muestra datos de su conexión. Puede cambiar la conexión seleccionada haciendo clic en Change Connection en el widget.

<div class="alert alert-info">Conectar datos es una tarea de configuración única; las conexiones seleccionadas se aplican a todo su equipo.</div>

#### Personalice su vista {#personalize-your-view}

Proporcione valores para los filtros en la parte superior de la página para personalizar su vista:
- **Team**: Nombre de su [Datadog Team][8]
- **Github_Org**: Nombre de su organización de GitHub
- **Github_Username**: Su nombre de usuario de GitHub

<div class="alert alert-info">Estos valores de filtro persisten cuando regresa a "My Workspace".</div>

### Características de la página {#page-features}

Los siguientes widgets se incluyen de forma predeterminada en la página de descripción general del desarrollador.

#### Monitors, incidents, and SLOs {#monitors-incidents-and-slos}

Muestra señales en vivo de Datadog [Monitors][6], [Incident Management][3] y [SLOs][7]. Los widgets permanecen vacíos hasta que se habilitan estos productos.

#### GitHub pull requests {#github-pull-requests}

Enumera las solicitudes de extracción abiertas que ha creado y aquellas que tiene asignadas para revisar, según la organización y el nombre de usuario de GitHub que proporcionó.

#### Servicios del equipo y rendimiento del Scorecard {#team-services-and-scorecard-performance}

- **My team's services**: Enumera los servicios pertenecientes al filtro **Team** seleccionado.
- **Scorecard performance by service**: Muestra la puntuación promedio de todos los Scorecards para cada servicio asociado al filtro **Team** seleccionado.

#### Problemas y errores {#issues-and-errors}

Muestra problemas y errores detectados por [Datadog Incidents][3] y [Error Tracking][4]. Los widgets permanecen vacíos hasta que se habilitan estos productos.

#### Alertas de Watchdog {#watchdog-alerts}

Captura alertas de [Datadog Watchdog][5].

### Clonar para una mayor personalización {#clone-for-further-customization}

Si necesita personalizar su vista, haga clic en **Clone as dashboard** en la parte superior derecha. Esto crea un dashboard precargado con contenido de la página **My Workspace**.

Aquí hay algunos ejemplos de personalizaciones que puede realizar con el dashboard clonado:
- Cree [Embedded Apps][2] usando el [Action Catalog][11] de Datadog para mostrar datos adicionales de terceros (por ejemplo, mostrar información de guardia de PagerDuty).
- Actualice el diseño y la disposición general de su vista cambiando el tamaño, reorganizando y añadiendo/eliminando [widgets][12].
- Utilice un widget de [Note][13] para añadir una sección de anuncios y actualizaciones con información relevante para su organización.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/app_builder
[2]: /es/actions/app_builder/embedded_apps/
[3]: /es/incident_response/incident_management/
[4]: /es/error_tracking/
[5]: /es/watchdog/
[6]: /es/monitors/
[7]: /es/service_level_objectives/
[8]: /es/account_management/teams/
[9]: /es/actions/app_builder/#apps-created-by-datadog
[10]: /es/actions/connections
[11]: /es/actions/actions_catalog/
[12]: /es/dashboards/widgets/
[13]: /es/dashboards/widgets/note/