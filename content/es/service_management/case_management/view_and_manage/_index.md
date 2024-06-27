---
further_reading:
- link: service_management/case_management/settings
  tag: Documentación
  text: Configuración del caso
kind: Documentación
title: Ver y gestionar casos
---

## Información general

{{< img src="/service_management/case_management/view_and_manage/view_and_manage_overview_cropped.png" alt="Página de Case Management que muestra una vista de todos los casos, la opción de seleccionar el estado y ver los miembros asignados" style="width:100%;" >}}

En la [página de Case Management][1], los casos se pueden ordenar por fecha de creación, estado o prioridad. De manera predeterminada, los casos se ordenan por fecha de creación. 

Para realizar ediciones masivas de casos en un proyecto, utiliza las casillas de verificación a fin de seleccionar uno o más casos. Luego, utiliza los menús desplegables para realizar acciones en bloque, como la gestión del estado, la asignación y el archivado. Cuando los casos se mueven a un proyecto diferente, se les asigna un ID de caso nuevo. La URL del caso antiguo no redirige al caso nuevo. 

## Atajos de teclado
Utiliza los siguientes atajos de teclado para una navegación rápida:

| Acción              | Atajo       |
| ------------------  | ----------     |
| Subir             | `↑` o `K`     |
| Bajar           | `↓` o `J`     |
| Seleccionar un caso         | `X`            |
| Ver el caso seleccionado  | `Enter` o `O` |
| Crear un caso       | `C`            |
| Establecer estado          | `S`            |
| Asignar al usuario      | `A`            |
| Establecer prioridad        | `P`            |
| Mover a proyecto     | `V`            |
| Archivar/desarchivar | `E`            |

## Buscar casos

En un proyecto, puedes realizar una búsqueda de casos por:
- **pares clave-valor de atributo**: por ejemplo, para encontrar todos los casos creados a partir de patrones de correlación de eventos, busca `creation_source:Event Management`. Para los casos creados a partir de eventos individuales, busca `creation_source:Event`.
- **título**: rodea el término de búsqueda entre comillas dobles. Por ejemplo, para encontrar todos los casos que contengan el término "kubernetes pods" en el título, busca `"kubernetes pods."`

Para componer una consulta más compleja, puedes utilizar los siguientes operadores booleanos que distinguen entre mayúsculas y minúsculas: `AND`, `OR` y `-` (exclusión). Por ejemplo, `priority:(P2 OR P3)` devuelve casos de prioridad `P2` o `P3`. 

Además, puedes buscar los casos en todos los proyectos con la barra de búsqueda general en la esquina superior izquierda.

## Crear una vista

Una **vista** es un filtro de consulta guardado que te permite limitar una lista de casos a lo que te resulta más relevante. Los proyectos tienen vistas predeterminadas para cada uno de los estados: abierto, en curso, cerrado y archivado. Además, hay vistas predeterminadas para los casos que se te han asignado y los que has creado. 

Para crear una vista personalizada:
1. Selecciona **Add View** (Añadir vista) desde un proyecto.
1. Asigna un nombre a la vista.
1. En el cuadro de búsqueda, ingresa una consulta. La vista previa se actualiza para mostrarte los casos que coinciden con la consulta de búsqueda actual.
1. (Opcional) Envía una notificación con herramientas de terceros como Slack, Microsoft Teams, PagerDuty o Webhooks. Haz clic en **+ Add Recipient Type** (+ Añadir tipo de destinatario) y selecciona uno de los canales o destinatarios preconfigurados. Se envía una notificación cada vez que se crea un caso que coincide con la consulta.
    | Integración     | Configuración    |
    | --------------- | ---------------- |
    | Slack           | Selecciona un espacio de trabajo y canal de Slack. |
    | Microsoft Teams | Si has conectado inquilinos de Microsoft Teams a Datadog, selecciona un inquilino, equipo y canal. De lo contrario, selecciona un conector.|
    | PagerDuty       | Selecciona un servicio. |
    | Webhooks        | Selecciona el nombre de un webhook. |
1. Haz clic en **Save view** (Guardar vista).

## Detalles del caso

{{< img src="/service_management/case_management/view_and_manage/case_details_overview.png" alt="Vista de detalles del caso de un ejemplo que se ha escalado" style="width:100%;" >}}

La página de Detalles del caso actúa como la única fuente de información sobre lo que ocurre con la investigación. Cada caso tiene las siguientes propiedades: 

Estado
: De manera predeterminada, todos los casos se abren al momento de crearse. A medida que avanzas en el caso, puedes cambiarlo a en curso y cerrado. Escribe `S` para cambiar el estado de un caso. 

Prioridad
: De manera predeterminada, no se define una prioridad. Puedes establecer la prioridad del caso en P1: crítico, P2: alto, P3: medio, P4: bajo, P5: información. Escribe `P` para establecer la prioridad de un caso. 

Asignado
: Se encuentra no asignado de manera predeterminada. Para asignarlo a un usuario, escribe `A`. Para asignártelo, escribe `I`. 

Atributos
: Añadir atributos permite organizar y filtrar. De manera predeterminada, todos los casos tienen los siguientes atributos: equipo, centros de datos, servicios, entornos y versiones. 

Archivado
: Archivar un caso lo elimina de las búsquedas. Escribe `E` para archivar un caso.

Cronología de la actividad
: Cada caso crea de manera automática una cronología de la actividad para capturar actualizaciones en tiempo real del estado, el asignado, la prioridad, las señales y cualquier comentario añadido. Si te etiquetan en un comentario, recibirás un correo electrónico. Escribe `M` para añadir un comentario y `Cmd + Enter` para enviarlo.

## Tomar acciones

Utiliza Case Management para recopilar información, contexto y recursos con el fin de determinar la acción adecuada. Esto incluye seguir investigando, escalar a un incidente o cerrar un caso.

De un caso individual:
- [Crear un notebook de investigación][2]: recopila información sobre la investigación y colabora con los miembros de tu equipo.
- [Declarar un incidente][3]: escala un caso a incidente e inicia tu proceso de respuesta a incidentes.
- Crear una incidencia de Jira de manera manual: utiliza `Shift + J` para crear una incidencia de Jira. Para obtener más información sobre cómo configurar la creación automática de incidencias de Jira y la sincronización bidireccional, consulta la documentación de [configuración][4]. 
- Crear un incidente de ServiceNow de manera manual: utiliza `Shift + N` para crear un incidente de ServiceNow. 
- [Reunirse en CoScreen][5]: comparte pantallas para la depuración colaborativa. 
- Cerrar el caso: informa al equipo que ya no es necesario realizar una acción. Actualiza el estado del caso a cerrado.

## Análisis de casos

{{< img src="/service_management/case_management/view_and_manage/view_and_manage_case_analytics.png" alt="Editor de gráficos que muestra las opciones de casos seleccionados como fuente de datos." style="width:100%;" >}}

El análisis de casos es una fuente de datos consultable para estadísticas de casos agregadas. Puedes consultar estos análisis en una variedad de widgets de gráficos tanto en [Dashboards][6] como en [Notebooks][2] para analizar la productividad del equipo e identificar patrones en los problemas. 

Los siguientes widgets son compatibles con el análisis de casos: serie temporal, lista principal, valor de consulta, tabla, mapa de árbol, gráfico circular, cambio y lista.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /es/notebooks/
[3]: /es/service_management/incident_management/#describing-the-incident
[4]: /es/service_management/case_management/settings/#jira
[5]: /es/coscreen/
[6]: https://docs.datadoghq.com/es/dashboards/