---
aliases:
- /es/tracing/servicemap
- /es/tracing/visualization/services_map/
description: El Mapa de servicios visualiza los datos que está recopilando Datadog
  APM.
further_reading:
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprender a configurar el rastreo de APM con tu aplicación
- link: https://www.datadoghq.com/blog/service-map/
  tag: Blog
  text: Introducción al Mapa de servicios en Datadog
- link: https://www.datadoghq.com/videos/dash-keynote-creating-context-with-service-maps/
  tag: Blog
  text: Creación de contexto con mapas de servicios (Datadog + Airbnb)
title: Mapa de servicios
---

El Mapa de servicios descompone tu aplicación en todos sus [servicios][1] componentes y extrae las dependencias observadas entre estos servicios en tiempo real, para que puedas identificar los cuellos de botella y comprender cómo fluyen los datos a través de tu arquitectura.

{{< img src="tracing/visualization/services_map/service_map_overview_3.png" alt="Información general del Mapa de servicios" >}}

## Configuración

El Mapa de servicios visualiza los datos recopilados por Datadog APM y RUM. No es necesario configurarlo para ver [servicios][1].

## Formas de utilizarlo

El Mapa de servicios ofrece una descripción general de tus servicios y su estado. De este modo se elimina el ruido y se aíslan las zonas problemáticas. Además, puedes acceder a otros datos de telemetría recopilados por Datadog directamente desde esta vista.

## Identificación de las dependencias de servicio

El Mapa de servicios proporciona una imagen completa de las dependencias de un servicio, incluidas las de diferentes entornos. Por ejemplo, aunque tu servicio solo esté desplegado en un entorno `prod`, el mapa revela sus conexiones con servicios en `staging` (y otros entornos).

## Agrupación por equipos o aplicaciones

El Mapa de servicios puede agruparse por equipo o aplicación para crear una imagen clara de la propiedad del servicio y las dependencias de aplicación. Esto resulta especialmente útil, ya que te permite visualizar la compleja arquitectura de microservicios a un nivel más detallado para que las organizaciones lleguen rápidamente a la información que necesitan. 

## Filtrado frente a cambio de contextos

El Mapa de servicios puede filtrarse utilizando facetas o una coincidencia de cadena difusa en los nombres de servicio. Las facetas son etiquetas que Datadog aplica automáticamente a los datos de servicio, e incluyen tipo de servicio (por ejemplo, servidor web, base de datos, caché), última hora de despliegue o estado del monitor. El filtrado es especialmente útil en un entorno de microservicio con cientos o miles de nodos. Los servicios también se pueden filtrar por estado de la incidencia para identificar los implicados en una incidencia en curso o resuelta y extraer información clave de la Página de servicios asociada, incluidos datos de la incidencia, recursos e información de los equipos de Datadog. Además, puedes limitar el Mapa de servicios a un intervalo de tiempo específico, lo que ayuda a realizar un seguimiento de tu arquitectura en evolución.

Los servicios también están delimitados por `env` y, opcionalmente, por una [segunda etiqueta primaria][3]. Si utilizas menús desplegables para seleccionar un contexto diferente, se obtiene un mapa completamente distinto formado por los servicios dentro de ese contexto. Estos servicios no pueden llamar ni ser llamados por servicios en otros entornos.

## Inspección

Al pasar el ratón por encima de servicio, se resalta y se muestra el tráfico de solicitudes en forma de líneas animadas para resaltar mejor la direccionalidad.

{{< img src="tracing/visualization/services_map/servicemap-anim.mp4" alt="Mapa de servicios" video="true" width="90%" >}}

Al hacer clic en un servicio se te ofrece la opción de inspeccionar ese servicio. Esto aísla el servicio, muestra el origen de las solicitudes de otros servicios, y las solicitudes de datos enviadas por este servicio a otros servicios. Generalmente, los servicios de la izquierda están más cerca de tus clientes, y los de la derecha son más probablemente causas raíz.

En la página de inspección, se puede inspeccionar cada nodo, lo que te permite moverte por el Mapa de servicios una dependencia a la vez.

{{< img src="tracing/visualization/services_map/servicemap.png" alt="Mapa de servicios" style="width:90%;">}}

Un nodo está colapsado cuando hay dos servicios en el filtro (aplicado a través de la barra de búsqueda o facetas) que están conectados por uno o más servicios que no están en el filtro.

{{< img src="tracing/visualization/services_map/service_map_collapsed.png" alt="Nodo colapsado del Mapa de servicios" style="width:50%;">}}

## La etiqueta "service" (servicio)

Al hacer clic en un servicio, aparecen otras opciones de filtrado:

{{< img src="tracing/visualization/services_map/service_map_inspect_menu_2.png" alt="Etiqueta de Mapa de servicios" style="width:40%;">}}

La etiqueta service (servicio) tiene un significado especial en Datadog, y se utiliza tanto para identificar servicios de APM como para vincularlos a otras partes del producto.

La siguiente captura de pantalla muestra una consulta de `service:fse-auto-process` a un dashboard. Se etiqueta automáticamente con APM.

{{< img src="tracing/visualization/services_map/servicedash.png" alt="Dashboard de Mapa de servicios" style="width:90%;">}}

El uso de esta etiqueta en tu Mapa de host o logs con la misma clave permite a Datadog unir aplicaciones a logs, infraestructura, o métricas de negocio personalizadas. En el menú de visualización que se muestra arriba, cada opción cambia a la vista apropiada de los datos recopilados en el contexto de tu `service`.

{{< img src="tracing/visualization/services_map/servicemaptags.png" alt="Etiquetas del Mapa de servicios" style="width:80%;">}}

Además, los monitores pueden ser etiquetados por servicio en la sección **Say what's happening** (Di lo que está pasando). Esto te permite asociar monitores para cualquier métrica, incluidas las métricas de negocio personalizadas, con tus servicios. El estado de los monitores se ve directamente en el Mapa de servicios.

{{< img src="tracing/visualization/services_map/servicemon.png" alt="Monitor del Mapa de servicios" style="width:90%;">}}

## Actualidad y significado de los datos

### Nodos y aristas

Los nodos representan servicios exactamente como se instrumentaron en APM y coinciden con los de tu [Catálogo de servicios][4]. Las aristas representan llamadas agregadas de un servicio a otro. Estas interacciones se muestran en la gráfica de llamas para cada [traza][5] individual.

Los nuevos servicios o conexiones aparecen al cabo de unos instantes de ser instrumentados y vencen si no se observa ninguna traza correspondiente durante 30 días. Esto tiene en cuenta servicios que funcionan con poca frecuencia, pero son una parte importante de un sistema en funcionamiento.

{{< img src="tracing/visualization/services_map/servicenodes.mp4" alt="Nodos del Mapa de servicios" video="true" width="90%">}}

### Color

Si activas un monitor para un servicio, la circunferencia tiene un borde ponderado de color verde, amarillo, rojo o gris, en función del estado de ese monitor. Si se definen varios monitores, se utiliza el estatus del monitor en el estado más grave.

Los monitores no se limitan a monitores de APM. La etiqueta del servicio, descrita anteriormente, puede utilizarse para asociar cualquier tipo de monitor a un servicio.

### Disponibilidad

El Mapa de servicios se renderiza según las trazas completas que incluyen tramos raíz. Cuando faltan algunos tramos durante el intervalo de consulta especificado, la vista del mapa puede no estar disponible durante ese periodo. Esto puede ocurrir cuando se producen [Errores de conexión de APM][6] y se descartan tramos.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#services
[3]: /es/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[4]: https://app.datadoghq.com/services
[5]: /es/tracing/glossary/#trace
[6]: /es/tracing/troubleshooting/connection_errors