---
aliases:
- /es/software_catalog/overview_pages
further_reading:
- link: actions/app_builder
  tag: Documentación
  text: Creador de aplicaciones
- link: monitors/
  tag: Documentación
  text: Monitores Datadog
- link: service_management/incident_management/
  tag: Documentación
  text: Gestión de incidencias
- link: service_management/service_level_objectives/
  tag: Documentación
  text: Objetivos de nivel de servicio (SLOs)
- link: seguimiento_de_errores
  tag: Documentación
  text: Error Tracking
- link: watchdog
  tag: Documentación
  text: Watchdog
title: Páginas de información general
---

{{< callout url="https://www.datadoghq.com/product-preview/developer-overview-page/" d_target="#signupModal" btn_hidden="false" header="Únete a la vista previa de la página de información general para desarrolladores" >}}
{{< /callout >}}

## Información general

La plataforma interna para desarrolladores (IDP) de Datadog incluye **páginas de información general** que muestran la información más relevante de cada parte interesada:
- Los desarrolladores obtienen una vista centralizada de sus elementos de acción, problemas e información de servicio del equipo.
- Las ingenierías de confiabilidad del sitio (SRE) y los directores de ingeniería obtienen una visión global de la fiabilidad de los productos, la salud de los servicios, el rendimiento de los cuadros de mando y otras métricas clave de todos sus equipos.

## Página de información general para desarrolladores

{{< img src="tracing/eng_reports/developer-overview-page.png" alt="Página de información general para desarrolladores en la sección Mi espacio de trabajo del portal para desarrolladores internos, con información general que muestra métricas de alertas, incidentes y SLOs claras, y una sección Mis tareas que muestra tickets de JIRA" style="width:100%;" >}}

La página de información general para desarrolladores centraliza la siguiente información sobre tu equipo y tus servicios:
- Monitores, incidentes y SLOs de tu equipo
- Tus tickets de Jira y solicitudes pull de GitHub
- Rendimiento de servicios y cuadros de mando de tu equipo
- Tus problemas, errores y alertas de Watchdog 

### Uso de la página de información general para desarrolladores

#### Para empezar

Los widgets "Mis solicitudes pull" y "Mis tickets de Jira" que aparecen en la página de información general para desarrolladores funcionan con la tecnología del [Datadog App Builder][9] e inicialmente muestran datos de demostración.

Para utilizar la página de información general para desarrolladores con tus datos, [conecta tus fuentes de datos][10]:
1. Busca la página de información general para desarrolladores seleccionando la pestaña **Información general** en IDP y seleccionando **Mi espacio de trabajo** en el menú de la izquierda.
1. Para estos widgets:

   1. Haz clic en **+ Connect Data* (+ Conectar datos).
   1. Crea una nueva conexión o selecciona una existente.

   <br>
   Una vez guardada la selección, el widget muestra los datos de tu conexión. Puedes cambiar la conexión seleccionada haciendo clic en Change Connection (Cambiar conexión) en el widget.

<div class="alert alert-info">La conexión de datos es una tarea de configuración que se realiza una sola vez y las conexiones seleccionadas se aplican a todo tu equipo.</div>

#### Personalizar tu vista

Proporciona valores para los filtros de la parte superior de la página para personalizar tu vista:
- **Team**: Nombre de tu [equipo Datadog][8] 
- **Github_Org**: Nombre de tu organización GitHub
- **Github_Username**: Tu nombre de usuario GitHub

<div class="alert alert-info">Estos valores de filtro persisten cuando regresas a "Mi espacio de trabajo".</div>

### Funciones de la página

Los siguientes widgets se incluyen por defecto en la página de información general para desarrolladores.

#### Monitores, incidentes y SLOs

Muestra señales en directo de [monitores][6], [Incident Management][3] y [SLOs][7] de Datadog. Los widgets permanecen vacíos hasta que se activan estos productos.

#### Tickets de Jira

Enumera los incidentes de Jira abiertos asignadas a tu correo electrónico. Se excluyen los incidentes con el estado **Listo**.

#### Solicitudes pull de GitHub

Enumera las solicitudes pull abiertas que creaste y las que tienes asignadas para revisar, en función de la organización y el nombre de usuario de GitHub que hayas proporcionado.

#### Rendimiento de servicios y cuadros de mando del equipo

- **Servicios de mi equipo**: Enumera los servicios de propiedad del filtro **Equipo** seleccionado.  
- **Rendimiento de cuadros de mando por servicio**: Muestra la puntuación media en todos los cuadros de mando de cada servicio de propiedad del filtro **Equipo** seleccionado.

#### Problemas y errores

Muestra los problemas y errores detectados por [Datadog Incidents][3] y [Error Tracking][4]. Los widgets permanecen vacíos hasta que se activan estos productos.

#### Alertas Watchdog

Captura las alertas de [Datadog Watchdog][5].

### Clonar para una mayor personalización

Si necesitas personalizar tu vista, haz clic en **Clone as dashboard** (Clonar como dashboard) en la parte superior derecha. Se creará un dashboard prerellenado con contenido de la página **Mi espacio de trabajo**. 

Estos son algunos ejemplos de personalizaciones que puedes realizar con el dashboard clonado:
- Crea [aplicaciones incrustadas][2] utilizando el [Catálogo de acciones][11] de Datadog para mostrar datos adicionales de terceros (por ejemplo, mostrar información de guardia de PagerDuty).
- Actualiza la disposición y el diseño generales de tu vista cambiando el tamaño, reorganizando y añadiendo/eliminando [widgets][12].
- Utiliza un widget [Nota][13] para añadir una sección de anuncios y actualizaciones con información relevante para tu organización.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/app_builder
[2]: /es/actions/app_builder/embedded_apps/
[3]: /es/service_management/incident_management/
[4]: /es/error_tracking/
[5]: /es/watchdog/
[6]: /es/monitors/
[7]: /es/service_management/service_level_objectives/
[8]: /es/account_management/teams/
[9]: /es/actions/app_builder/#apps-created-by-datadog
[10]: /es/actions/connections
[11]: /es/actions/actions_catalog/
[12]: /es/dashboards/widgets/
[13]: /es/dashboards/widgets/note/