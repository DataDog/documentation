---
further_reading:
- link: service_management/events/correlation/
  tag: Documentación
  text: Más información sobre la correlación de eventos
title: Triaje y notificación
---

{{< img src="service_management/events/correlation/triage/triage.png" alt="Página de detalles de del caso con un panel lateral del evento. Investigar eventos correlacionados a partir de un caso y analizar métricas relacionadas" style="width:100%;" >}}

La gestión de eventos correlaciona los eventos relacionados y los consolida automáticamente en un único caso. Reúna todo el contexto de los logs, métricas y monitores de alerta relacionados para clasificar y solucionar los problemas en un solo lugar.

En la página [Correlation][1] (Correlación), busca el patrón que deseas analizar y haz clic en **Triage Cases** (Clasificar casos) al final de la misma fila. También puedes hacer clic en **Case Management** (Gestión de casos) en la parte superior de la página para ver todos los casos con eventos correlacionados en [Case Management][2] (Gestión de casos). Datadog extrae los datos relacionados de métricas y logs para que puedas solucionar los problemas con todos los datos relacionados en un solo lugar.

## Caso de gestión de eventos

{{< img src="service_management/events/correlation/triage/event_management_case_detail.png" alt="Página de detalles de casos: información general" style="width:100%;" >}}


| Función | Descripción | 
| ------  | ----------- | 
| Prioridad | máxima prioridad de las alertas correlacionadas |
| Atributo | etiquetas de eventos correlacionados. las actualizaciones del usuario no serán anuladas por el motor |
| Estado | gestionados automáticamente por el sistema, las actualizaciones del usuario serán anuladas por el sistema. Los casos se resolverán automáticamente cuando se recuperen todas las alertas subrayadas y se reabrirán automáticamente cuando se vuelva a activar cualquier alerta durante el tiempo máximo de vida. |
| Eliminación | selecciona la casilla de verificación de la alerta para eliminar las alertas irrelevantes, las alertas eliminadas no se correlacionarán de nuevo |
| Alertas enriquecidas | algunos casos se enriquecerán automáticamente con alertas inteligentes que Datadog considere relacionadas en función de tu infraestructura. Las alertas enriquecidas no afectan a los atributos, prioridad y estado de los casos. |


Para más información sobre las operaciones de Gestión de casos, consulta la [documentación de Gestión de casos][5].

### Investigación
1. En la vista general del caso, haz clic en **Investigation** (Investigación).
1. En la sección *Correlations* (Correlaciones), puedes ver una lista de alertas y eventos
1. Haz clic en cualquiera de las alertas o eventos para ver todas las métricas y logs relacionados en el contexto de la alerta
1. (Opcional) Selecciona las alertas o eventos que desees eliminar que no estén relacionados con el caso
1. En la sección *Related Metrics* (Métricas), compara todas las métricas relacionadas o agrupa por etiquetas


## Crear una notificación o un tique

Con eventos correlacionados, puedes configurar una notificación para un grupo. Así, en lugar de tener 20 notificaciones y 20 problemas potenciales que investigar, tienes un solo caso y una notificación. Combina todas tus alertas en la página Proyectos de gestión de casos. Hay varias formas de agrupar notificaciones en Gestión de casos:

### Creación de tiques

En la página Project Settings (Configuración del proyecto), configura las integraciones que deseas que tus proyectos envíen notificaciones. Datadog admite las siguientes integraciones con creación de tiques manual y automática, y sincronización bidireccional:
- ServiceNow
- Jira

Para obtener instrucciones de configuración, consulta la documentación [Configuración de la gestión de casos][3].

## Notificaciones

En la gestión de casos, _views_ (vistas) agrupa casos basados en una consulta configurada. Puedes configurar una notificación cuando se cree un caso que coincida con esta consulta. Datadog admite **Pagerduty**, **Email**, **Webhook**, **Microsoft Teams** y **Slack**. Para saber cómo crear una vista, consulta la documentación [Vistas de gestión de casos][4].

**Nota**: Es necesario reconfigurar monitores subyacentes para eliminar varias notificaciones. La agrupación de eventos de monitor no silencia las notificaciones individuales.


[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/cases?query=status%3AOPEN%20creation_source%3AEVENT_MANAGEMENT&page=1&page-size=25&sort=created_at
[3]: /es/service_management/case_management/settings#set-up-integrations
[4]: /es/service_management/case_management/view_and_manage#create-a-view
[5]: /es/service_management/case_management/view_and_manage