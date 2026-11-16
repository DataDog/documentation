---
description: Una guía sobre cómo usar la propiedad basada en visualizar en Real User
  Monitoring para filtrar datos de eventos de visualizar que posee su equipo.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentación
  text: Obtenga más información sobre RUM
- link: https://www.datadoghq.com/blog/simplify-micro-frontend-observability-with-datadog-rum/
  tag: Blog
  text: Simplifique la observabilidad de micro-frontends con Datadog RUM
title: Propiedad de visualizar
---
## Descripción general {#overview}

La propiedad de visualizar le permite ver solo las métricas y los eventos de RUM de las partes de su aplicación que posee su equipo. Después de configurar la propiedad de visualizar, cada evento y métrica de RUM adjuntos a visualizar se **etiquetan** con el nombre de su equipo. Utilice el [filtro de equipo][2] para asignar el contexto de su visualizar a los equipos que seleccione. Aparece en las páginas {{< ui >}}Summary{{< /ui >}}, {{< ui >}}Optimization{{< /ui >}} y {{< ui >}}Session Explorer{{< /ui >}}.

{{< img src="/real_user_monitoring/ownership_of_views/ownership-sessions-explorer-1.png" alt="Visualizar del Explorador de sesiones, donde puede filtrar las sesiones de usuario según los equipos asignados en la Propiedad de equipo, lo que facilita la búsqueda de reproducciones relevantes para su equipo." >}}

La selección de equipos filtra las métricas y los datos de eventos a visualizar que poseen esos equipos. Si pertenece a varios equipos, puede seleccionar cualquier combinación de ellos. Para dejar de filtrar por equipo, borre su selección. Los equipos que poseen una vista también aparecen en la esquina superior derecha de todos los paneles laterales de eventos.

## Reglas de propiedad {#ownership-rules}

Existen dos tipos de reglas para configurar la propiedad de visualizar:

1. **Reglas exactas**, que se asignan uno a uno con un nombre de visualizar 
2. **Reglas de prefijo**, que capturan todos los visualizar que contienen el prefijo en su nombre

{{< img src="/real_user_monitoring/ownership_of_views/ownership-rule-type.png" alt="Panel lateral que muestra los dos tipos diferentes de reglas para definir la propiedad de visualizar." >}}

Cada regla debe tener al menos un **equipo** y un **contexto** definidos. Se admiten dos tipos de contexto:
- Para la **aplicación RUM actual** en todos los servicios
- Para un **servicio específico** en todas las aplicaciones

## Configuración {#setup}

<div class="alert alert-info">Para usar esta función, su organización debe tener los equipos habilitados y configurados.</div>

Para configurar la propiedad de equipo para el visualizar de su aplicación:

1. En Datadog, navegue a la página [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}][1] y seleccione su aplicación.
2. En el menú de navegación izquierdo, seleccione {{< ui >}}Ownership{{< /ui >}}.
3. Para cada visualizar, haga clic en {{< ui >}}Missing Ownership{{< /ui >}} y cree una regla para el visualizar.
4. Haga clic en la pestaña {{< ui >}}All Rules{{< /ui >}} para revisar todas las reglas creadas y sus visualizar asociados.

Después de asociar un visualizar con un equipo, Datadog atribuye automáticamente los nuevos datos de eventos a ese equipo.

<div class="alert alert-danger">Si cambia una asignación de equipo y visualizar, las métricas o eventos pasados no se etiquetan retroactivamente con el nuevo equipo.</div>

{{< img src="/real_user_monitoring/ownership_of_views/ownership-application-management-2.png" alt="Visualizar de la página de Propiedad de equipo, donde puede asignar diferentes páginas de su aplicación a equipos específicos." >}}

<div class="alert alert-info">También puede configurar la propiedad de visualizar con la <a href="https://docs.datadoghq.com/api/latest/rum-teams-ownership/">Datadog API</a>.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /es/account_management/teams/#team-filter