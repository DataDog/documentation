---
aliases:
- /es/service_management/case_management/view_and_manage/
- /es/incident_response/case_management/view_and_manage/
further_reading:
- link: incident_response/work_management/settings
  tag: Documentación
  text: Configuración de gestión de trabajo
- link: https://www.datadoghq.com/blog/datadog-risk-management
  tag: Blog
  text: Cómo centralizamos y remediamos riesgos con Datadog Case Management
- link: https://www.datadoghq.com/blog/work-management/
  tag: Blog
  text: Centralice el trabajo humano y de agentes con Datadog Work Management
title: Visualizar y administrar elementos de trabajo
---
## Descripción general {#overview}

En la [página de gestión de trabajo][1], los elementos de trabajo se pueden ordenar por fecha de creación, estado o prioridad. De forma predeterminada, los elementos de trabajo se ordenan por fecha de creación. Alterne entre la vista de **lista** y la vista de **tablero**: La vista de lista proporciona una tabla detallada y la vista de tablero ofrece un tablero Kanban con funcionalidad de arrastrar y soltar.

Para realizar ediciones masivas en elementos de trabajo dentro de un proyecto, utilice las casillas de verificación para seleccionar uno o más elementos de trabajo. Luego, utilice los menús desplegables para realizar acciones de forma masiva, como la gestión de estados, la asignación y el archivado. Cuando los elementos de trabajo se mueven a un proyecto diferente, se les asigna un nuevo ID de elemento de trabajo. La URL del elemento de trabajo antiguo no redirige al nuevo elemento de trabajo.

## Atajos de teclado {#keyboard-shortcuts}
Utilice los siguientes atajos de teclado para una navegación rápida:

| Acción                   | Atajo       |
| ------------------       | ----------     |
| Mover hacia arriba                  | `↑` o `K`     |
| Mover hacia abajo                | `↓` o `J`     |
| Seleccionar elemento de trabajo         | `X`            |
| Ver elemento de trabajo seleccionado  | `Enter` o `O` |
| Crear un elemento de trabajo       | `C`            |
| Establecer estado               | `S`            |
| Asignar a usuario           | `A`            |
| Establecer prioridad             | `P`            |
| Mover al proyecto          | `V`            |
| Archivar / desarchivar      | `E`            |

## Buscar elementos de trabajo {#search-work-items}

Dentro de un proyecto, puede buscar elementos de trabajo por:
- **pares clave-valor de atributos**: Por ejemplo, para encontrar todos los elementos de trabajo creados a partir de patrones de Correlación de eventos, busque `creation_source:Event Management`. Para elementos de trabajo creados a partir de eventos individuales, busque `creation_source:Event`.
- **título**: Encierre su término de búsqueda entre comillas dobles. Por ejemplo, para encontrar todos sus elementos de trabajo que contengan el término "kubernetes pods" en el título, busque `"kubernetes pods."`

Para redactar una consulta más compleja, puede usar los siguientes operadores booleanos que distinguen entre mayúsculas y minúsculas: `AND`, `OR` y `-` (exclusión). Por ejemplo, `priority:(P2 OR P3)` devuelve elementos de trabajo de prioridad `P2` o `P3`.

Además, puede buscar elementos de trabajo en todos los proyectos usando la barra de búsqueda en la esquina superior izquierda.

## Crear una vista {#create-a-view}

Una **vista** es un filtro de consulta guardado que le permite limitar una lista de elementos de trabajo a lo que es más relevante para usted. Los proyectos tienen vistas predeterminadas para cada uno de los estados: abierto, en progreso, cerrado y archivado. Además, hay vistas predeterminadas para los elementos de trabajo asignados a usted y creados por usted.

Para crear una vista personalizada:
1. Seleccione **Agregar vista** dentro de un proyecto.
1. Asigne un nombre a la vista.
1. En el cuadro de búsqueda, ingrese una consulta. La vista previa se actualiza para mostrarle los elementos de trabajo que coinciden con la consulta de búsqueda actual.
1. (Opcional) Envíe una notificación con herramientas de terceros como Slack, Microsoft Teams, PagerDuty o Webhooks. Haga clic en **+ Agregar tipo de destinatario** y seleccione entre los canales o destinatarios preconfigurados. Consulte [Crear notificaciones y tickets ][2] para obtener más información sobre las herramientas y opciones disponibles.
1. Haga clic en **Guardar vista**.

## Detalles del elemento de trabajo {#work-item-details}

La página de Detalles del elemento de trabajo actúa como la única fuente de verdad sobre lo que ocurre en la investigación. Cada elemento de trabajo tiene las siguientes propiedades:

Estado
: Todos los elementos de trabajo se abren de forma predeterminada al crearlos. A medida que avanza en el elemento de trabajo, puede cambiarlo a en progreso y cerrado. Escriba `S` para cambiar el estado de un elemento de trabajo.

Prioridad
: De forma predeterminada, no se define una prioridad. Puede establecer la prioridad del elemento de trabajo en P1 - Crítica, P2 - Alta, P3 - Media, P4 - Baja, P5 - Información. Escriba `P` para establecer la prioridad de un elemento de trabajo.

Asignado a
: Sin asignar de forma predeterminada. Para asignarlo a un usuario, escriba `A`. Para asignárselo a usted mismo, escriba `I`.

Atributos
: Agregar atributos permite la organización y el filtrado. De forma predeterminada, todos los elementos de trabajo tienen los siguientes atributos: equipo, centros de datos, servicios, entornos y versiones.

Archivado
: Archivar un elemento de trabajo lo elimina de las búsquedas. Escriba `E` para archivar un elemento de trabajo.

Línea de tiempo de actividad
: Cada elemento de trabajo crea automáticamente una línea de tiempo de actividad para capturar actualizaciones en tiempo real sobre el estado, el responsable, la prioridad, las señales y cualquier comentario agregado. Si se le etiqueta en un comentario, recibirá un correo electrónico. Escriba `M` para agregar un comentario y `Cmd + Enter` para enviarlo.

## Tomar acción {#take-action}

Utilice Work Management para recopilar información, contexto y recursos para determinar la acción adecuada a tomar. Esto incluye una investigación más profunda, escalar a un incidente o cerrar un elemento de trabajo.

Desde un elemento de trabajo individual:
- [Crear un notebook de investigación][3]: recopile información de investigación y colabore con los miembros de su equipo.
- [Declarar un incidente][4]: escale un elemento de trabajo a un incidente e inicie su proceso de respuesta a incidentes.
- Crear manualmente un issue de Jira: utilice `Shift + J` para crear un issue de Jira. Para obtener más información sobre cómo configurar la creación automática de issues de Jira y la sincronización bidireccional, consulte la documentación de [Configuración][5].
- Crear manualmente un incidente de ServiceNow: utilice `Shift + N` para crear un incidente de ServiceNow.
- Cerrar el elemento de trabajo: informe al equipo que no se necesita ninguna acción adicional. Actualice el estado del elemento de trabajo a cerrado.
- [Solicitar aprobación][7]: solicite la autorización de uno o más miembros del equipo antes de tomar acción en un elemento de trabajo.

## Análisis de gestión de trabajo {#work-management-analytics}

Análisis de gestión de trabajo es una fuente de datos consultable para estadísticas agregadas de elementos de trabajo. Puede consultar estos análisis en una variedad de widgets de gráficos tanto en [Dashboards][8] como en [Notebooks][3] para analizar la productividad del equipo e identificar patrones en los problemas.

Los siguientes widgets admiten Análisis de gestión de trabajo: series temporales, lista principal, valor de consulta, tabla, mapa de árbol, gráfico circular, cambio y lista.

## Exportar {#export}

Puede exportar elementos de trabajo directamente desde una página de detalles de elementos de trabajo:
1. Desde un elemento de trabajo individual, haga clic en el icono **Más opciones** en la parte superior derecha de una página de detalles de elementos de trabajo.
1. Seleccione **Exportar a PDF**.
1. En el cuadro de diálogo de impresión que aparece, elija **Guardar como PDF** como su destino.
1. Haga clic en **Guardar** para completar la exportación.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work
[2]: /es/incident_response/work_management/notifications_integrations
[3]: /es/notebooks/
[4]: /es/incident_response/incident_management/#describing-the-incident
[5]: /es/incident_response/work_management/settings/#jira
[7]: /es/incident_response/work_management/approvals
[8]: https://docs.datadoghq.com/es/dashboards/