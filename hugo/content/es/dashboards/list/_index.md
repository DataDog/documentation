---
description: Organizar y gestionar dashboards con listas
disable_toc: false
further_reading:
- link: dashboards/
  tag: Documentación
  text: Información general sobre los dashboards
- link: dashboards/guide/maintain-relevant-dashboards
  tag: Guía
  text: Prácticas recomendadas para mantener los dashboards relevantes
title: Lista de dashboards
---

## Información general

Organiza y optimiza tu creciente colección de dashboards con las características de la lista de dashboards. Agrupa dashboards en listas, asígnalos a equipos específicos y marca los más importantes como favoritos para acceder a las visualizaciones clave con rapidez. Gestiona aún más la organización de dashboards mediante funcionalidades como el filtrado mediante Teams, la realización de acciones masivas para una gestión eficaz y la asignación de Teams a varios dashboards. Explora, crea y gestiona sin esfuerzo dashboards personalizados o integrados en la [página de Lista de dashboards][1].
Visualiza y gestiona tus dashboards:
- [Utiliza la tabla de *Todos los dashboards* para ordenar, buscar y agrupar tus listas.](#view-all-dashboards)
- [Organiza las vistas de tu dashboard mediante listas.](#lists)

## Ver todos los dashboards

En la tabla de **Todos los dashboards** se enumeran los dashboards de tu organización de Datadog, ya sean creados de manera personalizada o disponibles como dashboards listos para utilizar. Selecciona varios dashboards en la tabla para realizar acciones masivas, como asociar [Teams](#teams) con dashboards o añadir dashboards a [listas](#lists).

Puedes ordenar por los encabezados de columna de *Nombre*, *Modificado* y *Popularidad*.

| Columna     | Descripción                                                                              |
|------------|------------------------------------------------------------------------------------------|
| Estrella       | Todos los dashboards marcados con una estrella por el usuario actual.                                              |
| Nombre       | El nombre del dashboard personalizado o predefinido.                                              |
| Autor     | Icono de perfil del creador del dashboard.                                             |
| Python      | [Teams][2] asignado al dashboard.                                                    |
| Modificado   | La última fecha de modificación de un dashboard personalizado.                                            |
| Popularidad | La [popularidad](#popularidad) relativa del dashboard de tu organización.           |
| Icono       | Icono que indica el tipo de dashboard (timeboard o screenboard).                     |


### Popularidad

El dashboard más popular de una organización muestra cinco barras de popularidad. Todos los demás dashboards están relacionados con este dashboard. La popularidad se basa en la cantidad de tráfico que recibe un dashboard. La popularidad se actualiza diariamente. Los dashboards nuevos no tienen ninguna barra de popularidad durante 24 horas.

**Nota**: El tráfico a las URL de dashboards públicos no se tiene en cuenta para determinar su popularidad.

## Python

Utiliza el botón **My Teams** (Mis equipos) para alternar entre ver todos los dashboards y solo los dashboards propiedad de tus [equipos][2].

Para editar los equipos asociados a uno o varios dashboards, sigue estos pasos:
1. Selecciona la casilla situada junto a cada dashboard que desees modificar.
1. Abre el menú desplegable **Edit Teams** (Editar equipos) en la parte superior derecha.
1. Utiliza las casillas de verificación para seleccionar los equipos adecuados para los dashboards.
1. Haz clic en **Apply Changes** (Aplicar cambios).

## Listas

El dashboard enumera los dashboards de los grupos para que tú y tu equipo puedan alternar entre dashboards dentro del mismo contexto. Puedes añadir dashboards a [listas preestablecidas](#preset-lists) o a una lista personalizada.

1. Para crear una lista de dashboards, haz clic en **+ New List** (+ Lista nueva) en la parte superior derecha.
1. Haz clic en el icono de lápiz para cambiar el título de la lista. El título de la lista se establece de manera automática con el nombre del usuario. Por ejemplo, `John's list`. 
1. Añade dashboards a una lista. En la tabla de **[Todos los dashboards](#view-all-dashboards)**, marca las casillas de verificación junto al título del dashboard. Luego, haz clic en el menú desplegable **Add to** (Añadir a) en la esquina superior derecha de la lista de dashboards y selecciona la lista.

En la barra lateral izquierda se muestran todas las listas, que puedes filtrar por equipo o mediante términos de búsqueda. Activa **Hide Controls** (Ocultar controles) para ocultar esta barra lateral.

### Listas de favoritos

Las listas de favoritos son las listas del dashboard marcadas por el usuario que ha iniciado la sesión. **Nota**: Si no tienes ninguna lista marcada, la categoría *Favorite lists* (Listas de favoritos) estará oculta.

### Listas predefinidas

Las listas preestablecidas son listas de dashboards que se encuentran listas para utilizar en Datadog:

| Lista                     | Descripción                                                               |
|--------------------------|---------------------------------------------------------------------------|
| All Custom (Todos los personalizados)               | Dashboards personalizados creados por cualquier miembro del equipo en la cuenta de tu organización. |
| All Hosts (Todos los hosts)                | Dashboards automáticos creados por Datadog al añadir un host.              |
| All Integrations (Todas las integraciones)         | Dashboards automáticos creados por Datadog al instalar una integración.  |
| All Shared (Todos los compartidos)               | Dashboards con la opción de compartir enlaces autenticados o públicos activada.             |
| Created By You (Creado por ti)           | Dashboards personalizados creados por el usuario actual.                            |
| Frequently Viewed By You (Vistos con frecuencia) | Todos los dashboards vistos con frecuencia por el usuario actual.                     |
| Recently Deleted (Eliminados recientemente)         | Los dashboards eliminados en los últimos 30 días. [Restaura los dashboards eliminados](#restore-deleted-dashboards) de esta lista.|
| Seguridad y cumplimiento  | Dashboards de seguridad listos para utilizar.                                       |

### Guías

Utiliza la lista predefinida **Recently Deleted** (Eliminados recientemente) para restablecer los dashboards eliminados. En la lista, selecciona todos los dashboards que deseas restablecer y haz clic en **Restore to** (Restablecer a). Selecciona una lista específica para restablecer los dashboards, o selecciona **All Custom** (Personalizados) para restablecerlos sin una lista personalizada. Los dashboards en la lista **Recently Deleted** se borran de manera definitiva a los 30 días.

{{< img src="dashboards/list/recently_deleted_restore.png" alt="Restaurar el dashboard eliminado en la lista de Eliminado recientemente" style="width:100%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /es/account_management/teams/