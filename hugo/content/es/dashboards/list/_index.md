---
description: Organice y administre dashboards con listas
disable_toc: false
further_reading:
- link: dashboards/
  tag: Documentación
  text: Descripción general de dashboards
- link: dashboards/guide/maintain-relevant-dashboards
  tag: Guía
  text: Prácticas recomendadas para mantener dashboards relevantes
title: Dashboard List
---
## Descripción general {#overview}

Organice y optimice su creciente colección de dashboards con las funciones de Dashboard List. Agrupe dashboards en listas, asígnelos a equipos específicos y marque los importantes como favoritos para acceder rápidamente a visualizaciones clave. Administre mejor la organización de dashboards utilizando funcionalidades como el filtrado por Teams, la realización de acciones masivas para una gestión eficiente y la asignación de Teams a múltiples dashboards. Explore, cree y administre dashboards personalizados o integrados sin esfuerzo en la [página de Dashboard List][1].
Vea y administre sus dashboards:
- [Utilice la tabla {{< ui >}}All Dashboards{{< /ui >}} para ordenar, buscar y agrupar sus listas.](#view-all-dashboards)
- [Organice sus vistas de dashboard a través de listas.](#lists)

## Visualizar todos los dashboards {#view-all-dashboards}

La {{< ui >}}All Dashboards{{< /ui >}} tabla enumera los dashboards en su organización de Datadog, ya sean creados de forma personalizada o disponibles como dashboard predefinido. Seleccione varios dashboards en la tabla para realizar acciones masivas, como asociar [Teams](#teams) a dashboards o agregar dashboards a [listas](#lists).

Puede ordenar por los encabezados de columna {{< ui >}}Name{{< /ui >}}, {{< ui >}}Modified{{< /ui >}} y {{< ui >}}Popularity{{< /ui >}}.

| Columna     | Descripción                                                                              |
|------------|------------------------------------------------------------------------------------------|
| Destacado       | Todos los dashboards destacados por el usuario actual.                                              |
| Nombre       | El nombre del dashboard personalizado o preestablecido.                                              |
| Autor     | El icono de perfil del creador del dashboard.                                             |
| Teams      | [Teams][2] asignados al dashboard.                                                    |
| Modificado   | La fecha de última modificación de un dashboard personalizado.                                            |
| Popularidad | La [popularidad](#popularity) relativa del dashboard para su organización.           |
| Icono       | Un icono que indica el tipo de dashboard (Timeboard o panel visual).                     |


### Popularidad {#popularity}

El dashboard más popular de una organización muestra cinco barras de popularidad. Todos los demás dashboards son relativos a este dashboard. La popularidad se basa en la cantidad de tráfico que recibe un dashboard. La popularidad se actualiza diariamente; los dashboards nuevos tienen cero barras de popularidad durante un máximo de 24 horas.

**Nota**: El tráfico a las URL de dashboards públicos se ignora para la popularidad.

## Teams {#teams}

Use el [team filter][3] para mostrar solo los dashboards que pertenecen a los Teams que seleccione. Para volver a ver todos los dashboards, borre su selección.

Para editar los equipos asociados con uno o más dashboards, siga estos pasos:
1. Seleccione la casilla de verificación junto a cada Dashboard que desee modificar.
1. Abra el menú desplegable {{< ui >}}Edit Teams{{< /ui >}} en la parte superior derecha.
1. Use las casillas de verificación para seleccionar los equipos apropiados para los dashboards.
1. Haga clic en {{< ui >}}Apply Changes{{< /ui >}}.

## Listas {#lists}

Las listas de dashboards agrupan los dashboards para que usted y su equipo puedan cambiar entre dashboards dentro del mismo contexto. Puede agregar dashboards a [listas preestablecidas](#preset-lists) o a una lista personalizada.

1. Para crear una lista de dashboards, haga clic en {{< ui >}}\+ New List{{< /ui >}} en la parte superior derecha.
1. Haga clic en el icono de lápiz para cambiar el título de una lista. El título de la lista se establece automáticamente con el primer nombre del usuario. Por ejemplo, `John's list`.
1. Agregar dashboards a una lista. En la [{{< ui >}}All Dashboards{{< /ui >}}](#view-all-dashboards) tabla, marque las casillas de verificación junto al título del dashboard. Luego, haga clic en el {{< ui >}}Add to{{< /ui >}} menú desplegable en la esquina superior derecha de la lista de dashboards y seleccione la lista.

La barra lateral izquierda muestra todas las listas, las cuales puede filtrar por Teams o mediante términos de búsqueda. Active {{< ui >}}Hide Controls{{< /ui >}} para ocultar esta barra lateral.

### Listas favoritas {#favorite-lists}

Las listas favoritas son listas de dashboards marcadas como favoritas por el usuario que ha iniciado sesión actualmente. **Nota**: Si no tiene listas marcadas como favoritas, la categoría {{< ui >}}Favorite Lists{{< /ui >}} estará oculta.

### Listas preestablecidas {#preset-lists}

Las listas preestablecidas son listas de dashboards listas para usar en Datadog:

| Lista                     | Descripción                                                               |
|--------------------------|---------------------------------------------------------------------------|
| Todos los dashboards personalizados|  creados por cualquier miembro del equipo en la cuenta de su organización. |
| Todos los hosts                | Dashboards automáticos creados por Datadog cuando agrega un host.              |
| Todas las Integrations         | dashboards automáticos creados por Datadog cuando instala una Integration.  |
| Todos los compartidos               | dashboards con uso compartido de enlace autenticado o público habilitado.             |
| Creados por usted           | dashboards personalizados creados por el usuario actual.                            |
| Eliminados recientemente         | dashboards eliminados en los últimos 30 días. [Restaurar dashboards eliminados](#restore-deleted-dashboards) de esta lista.|
| Security and Compliance  | dashboards de Security preconfigurados.                                       |

### Restaurar dashboards eliminados {#restore-deleted-dashboards}

Utilice la {{< ui >}}Recently Deleted{{< /ui >}} lista para restaurar dashboards eliminados. De la lista, seleccione todos los dashboards que desee restaurar y haga clic en {{< ui >}}Restore to{{< /ui >}}. Seleccione una lista específica a la cual restaurar los dashboards, o seleccione {{< ui >}}All Custom{{< /ui >}} para restaurarlos sin una lista personalizada. Los dashboards en {{< ui >}}Recently Deleted{{< /ui >}} se eliminan permanentemente después de 30 días.

{{< img src="dashboards/list/recently_deleted_restore.png" alt="Restaurar dashboard eliminado de la lista de eliminados recientemente" style="width:100%;">}}

## Sintaxis de búsqueda {#search-syntax}

{{< callout url="#" btn_hidden="true" header="Preview" >}}
La sintaxis de búsqueda de dashboards está en vista previa.
{{< /callout >}}

Utilice la barra de búsqueda en la parte superior de la página Dashboard List para filtrar dashboards por nombre, autor, etiquetas o contenido de widgets. La búsqueda admite consultas de texto libre, filtros de clave:valor, operadores booleanos y comparaciones de rango.

### Búsqueda de texto libre {#free-text-search}

Escriba una o más palabras para buscar en títulos de dashboards, descripciones, nombres de autor, etiquetas y contenido de widgets.

- **Token único**: `redis` coincide con dashboards que contienen "redis" en el título, autor, etiquetas o widgets.
- **Múltiples tokens**: `redis postgres` es equivalente a `redis AND postgres`: ambos tokens deben aparecer.
- **Frase entre comillas**: `"web latency"` coincide con esa frase exacta.
- **Wildcard**: `elastic*` coincide con "elasticsearch", "elastic-search" y similares.

### Filtros de clave:valor {#keyvalue-filters}

Limite los resultados a un campo específico usando la sintaxis `key:value`.

| Filtro | Descripción | Ejemplo |
|--------|-------------|---------|
| `author:<value>` | dashboards cuyo identificador de autor o nombre visible coincida con | `author:jane.doe` |
| `title:<value>` | Título del dashboard | `title:elasticsearch` |
| `description:<value>` | Descripción del dashboard | `description:latency` |
| `team:<value>` | Etiqueta de equipo | `team:dashboards-backend` |
| `favorites:true` | dashboards que ha marcado como favoritos | `favorites:true` |
| `type:<value>` | Tipo de dashboard. Use `custom`, `integration` o valores concretos como `custom_timeboard`, `custom_screenboard`, `integration_timeboard`, `integration_screenboard`. | `type:integration` |
| `is_shared:true` | dashboards con uso compartido de enlaces habilitado | `is_shared:true` |
| `popularity:<range>` | Puntuación de popularidad (0 a 1) | `popularity:>=0.5` |
| `widgets.count:<range>` | Número de widgets | `widgets.count:<5` |
| `widgets.title:<value>` | Título del widget | `widgets.title:cpu` |
| `widgets.type:<value>` | Tipo de widget | `widgets.type:geomap` |
| `widgets.metrics:<value>` | Métrica utilizada en un widget | `widgets.metrics:system.cpu.user` |
| `template_variables.name:<value>` | Nombre de la variable de plantilla | `template_variables.name:service` |
| `template_variables.prefix:<value>` | Prefijo de variable de plantilla | `template_variables.prefix:env` |
| `template_variables.defaults:<value>` | Valor predeterminado de variable de plantilla | `template_variables.defaults:prod` |
| `template_variables.available_values:<value>` | Valor disponible de variable de plantilla | `template_variables.available_values:us-east` |

### Operadores booleanos {#boolean-operators}

Combina los filtros con `AND`, `OR` y `NOT` (sensible a mayúsculas y minúsculas). El prefijo `-` y el prefijo `!` son equivalentes a `NOT`.

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `AND` | Ambas condiciones deben coincidir | `type:integration AND team:platform` |
| `OR` | Cualquiera de las condiciones debe coincidir | `k8s OR kubernetes` |
| `NOT` / `-` / `!` | Excluir dashboards coincidentes | `NOT type:integration` |
| `field:(A OR B)` | Coincide con cualquiera de los valores dentro de un solo campo | `team:(backend OR frontend)` |

### Operadores de rango {#range-operators}

Use `<`, `>`, `<=` y `>=` con campos numéricos.

| Filtro | Descripción | Ejemplo |
|--------|-------------|---------|
| `widgets.count:<N` | Menos de N widgets | `widgets.count:<3` |
| `widgets.count:>=N` | N widgets o más | `widgets.count:>=10` |
| `popularity:>=N` | Popularidad igual o superior al umbral | `popularity:>=0.2` |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /es/account_management/teams/
[3]: /es/account_management/teams/#team-filter