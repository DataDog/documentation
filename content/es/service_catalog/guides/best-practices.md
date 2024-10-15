---
further_reading:
- link: /tracing/service_catalog/
  tag: Documentación
  text: Catálogo de servicios de Datadog
title: Prácticas recomendadas del Catálogo de servicios
---

En esta página, se describen las prácticas recomendadas para trabajar con el Catálogo de servicios.

## Vinculación de telemetrías de infraestructura

La etiqueta `service` es la clave principal para las entradas del Catálogo de servicios. También es la unidad común de análisis más pequeña para las telemetrías de Datadog con el [etiquetado de servicios unificado][1]. Establece la etiqueta `service` directamente en las [etiquetas (labels) de pod de Kubernetes][4]. Al establecer la etiqueta `service` dentro de la etiqueta (label) `tags.datadoghq.com/service`, toda la telemetría del pod, como métricas y logs, recibe la etiqueta de servicios en Datadog. Se trata de la etiqueta (label) de servicio recomendado de Kubernetes.

En comparación, fijar la etiqueta (label) en un servicio de Kubernetes solo afecta al etiquetado de métricas, no a otra telemetría. Aplicar [etiquetas (labels) de contenedor adicionales][2] es esencial para el correcto etiquetado de logs y trazas (traces), por lo que este enfoque no es recomendado.

## Utilización del campo de aplicación en el esquema de metadatos v2.1+

En el caso de los microservicios, un servicio suele coincidir con un despliegue de Kubernetes porque se trata de una unidad autónoma de funcionalidad con una propiedad bien definida y otros metadatos. Por lo tanto, otros componentes en un microservicio pueden ser nombrados automáticamente durante el proceso de instrumentación. Añade un campo **application** (aplicación) a todos los componentes detectados automáticamente para agruparlos con el servicio núcleo.

Para servicios monolíticos, definir múltiples servicios puede ser útil. Como mínimo, deberías elegir un servicio para representar el monolito en su conjunto. A continuación, asocia los metadatos pertinentes, como la documentación o el código fuente, y la telemetría pertinente, como métricas de pod. A veces, es útil definir otros servicios que representen otras unidades funcionales dentro del monolito si tienen propiedades de propiedad separadas, como manuales de operación y documentación. En los casos en los que hay una jerarquía claramente definida entre el monolito y otras unidades dentro de él, es recomendado utilizar el campo **application** (aplicación) en [el esquema de metadatos v2.1+][3]. Establece el valor **application** (aplicación) como el nombre de servicio para el propio monolito, y añade este campo de aplicación a todos los subservicios que pertenezcan al monolito.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: /es/containers/docker/tag/
[3]: /es/service_catalog/adding_metadata#service-definition-schema-v21
[4]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes#full-configuration