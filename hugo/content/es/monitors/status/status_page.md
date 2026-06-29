---
aliases:
- /es/monitors/monitor_status/
- /es/monitors/manage/status
code_lang: página_de_estado
description: Ver una descripción general del estado de tu monitor a lo largo del tiempo
further_reading:
- link: /monitors/status/graphs/
  tag: Documentación
  text: Más información sobre gráficas de monitor
- link: /monitors/status/events/
  tag: Documentación
  text: Más información sobre detalles de eventos
- link: https://www.datadoghq.com/blog/monitor-status-page/
  tag: Blog
  text: Obtén rápidamente un contexto rico y procesable para las alertas con la nueva
    página de estado del monitor de Datadog.
title: Página de estado del monitor
type: lenguaje de código múltiple
weight: 1
---

## Información general

Cuando un monitor genera una alerta, el primer lugar para comenzar tu investigación es la página de estado del monitor. Esta página cuenta con gráficas y eventos para mostrarte por qué tu monitor se encuentra en estado de alerta, para que puedas comprender lo que está sucediendo con esa alerta de monitor. Además, puedes acceder a acciones rápidas para ayudarte a avanzar en la resolución de la investigación. Utiliza la página de estado del monitor para:

- Revisar todo el contexto necesario para iniciar una investigación
- Investigar la posible causa de una alerta
- Tomar medidas para ampliar, mantener o resolver tu investigación

## Encabezado

{{< img src="/monitors/status/status_page_header_banner.png" alt="Cabecera de la página de estado del monitor" style="width:100%;" >}}

La cabecera contiene metadatos del monitor, incluyendo:
- Estado del monitor
- Tipo de monitor
- Fecha de creación
- Autor
- Equipos asociados (si están disponibles)
- Servicios asociados (si están disponibles)
- Etiquetas

A la derecha, encontrarás los botones **Edit**, **Clone**, **Export**, **Permissions**, **Delete** (Editar, Clonar, Exportar, Permisos, Eliminar).

Es posible resolver el monitor desde la cabecera. Al resolverlo desde la cabecera, se resuelven todos los grupos de la alerta y se cambia el estado del monitor a `OK` (todos los grupos). La función `resolve` cambia temporalmente el estado del monitor a `OK` hasta su próxima evaluación, pero la próxima evaluación procede normalmente basándose en los datos actuales. Para resolverlo a partir de los detalles del evento, consulta [Eventos de estado][1].

{{< img src="/monitors/status/header_downtimes.png" alt="El monitor no está silenciado, pero puedes hacer clic en Not Muted (Sin silenciar) para ver opciones de creación de tiempos de inactividad para ese monitor" style="width:100%;" >}}

Además, visualiza y gestiona los tiempos de inactividad que afectan a este monitor y crea otros nuevos para silenciar notificaciones.

## Visualizar evaluaciones del monitor mediante gráficas

 {{< img src="/monitors/status/evaluated_data_graph_1.png" alt="Gráfica de evaluación del monitor de ejemplo" style="width:100%;" >}}

Puedes solucionar alertas de monitor visualizando tus datos a través de gráficas. Alterna entre las gráficas **Datos evaluados**, **Datos de origen** y **Transiciones** para investigar qué grupos están causando la alerta. El componente de creación de gráficas también contiene detalles sobre la consulta de monitor, la evaluación del monitor configurada y la información de notificación. Para obtener más información sobre cada gráfica, consulte la documentación [Gráficas de estado del monitor][2].

Utiliza variables de plantilla para delimitar la página del monitor a grupos específicos, selecciona los atributos por los que quieras filtrar.

## Ver detalles de eventos de monitor

{{< img src="/monitors/status/status_page_event_details.png" alt="Ejemplo de detalles del evento de estado del monitor" style="width:100%;" >}}

Puedes explorar diferentes áreas de productos manteniendo el mismo contexto de alerta, para asegurarte de ver el mismo periodo de tiempo y los mismos parámetros de servicio de la página de estado de tu monitor. Utiliza detalles de eventos para corregir el monitor si emite alertas debido a cambios de configuración recientes. Puedes llevar la consulta a otras áreas de productos para solucionar problemas y hacer referencias cruzadas sin perder el contexto.

Para obtener más información, consulta la documentación [Eventos de estado del monitor][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/status/events/#resolve
[2]: /es/monitors/status/graphs
[3]: /es/monitors/status/events