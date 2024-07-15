---
aliases:
- /es/tracing/service_catalog/troubleshooting
- /es/service_catalog/troubleshooting
further_reading:
- link: /tracing/service_catalog/setup/
  tag: Documentación
  text: Configuración del Catálogo de servicios
kind: documentación
title: Solucionar problemas del Catálogo de servicios
---

## No aparecen servicios instrumentados por APM

Si servicios que sabes que están instrumentados para APM no aparecen en la lista de Catálogo de servicios, es probable que se deba a que no han estado emitiendo datos de rendimiento en la última hora para los valores `env` seleccionados (o cualquier valor de Etiqueta primaria de tu elección) o [etiqueta primaria secundaria][1]. Para confirmarlo, en la pestaña **Performance** (Rendimiento), pasa el ratón por encima de las columnas en las que esperas que aparezcan las métricas de rendimiento y ve la información sobre en qué entornos están activos los servicios.

{{< img src="tracing/service_catalog/svc_cat_troubleshooting_1.png" alt="Mensaje emergente que indica que no se han informado datos de rendimiento en la última hora" >}}

## SLOs no listados en la sección Guía de configuración

El recuento en la sección Service Catalog Setup Guidance (Guía de configuración del Catálogo de servicios) refleja el número de SLOs con etiquetas `service`. Si tus SLOs no aparecen en la lista, verifica que tengan valores de etiqueta `service` especificados y que coincidan con los nombres de servicio en otros productos como APM y USM.

## La telemetría adicional está disponible para un servicio, pero no está en la lista

El Catálogo de servicios se basa en la etiqueta `DD_SERVICE` en todos los tipos de telemetría (métricas de infraestructura, logs, monitorización de rendimiento de red) para recopilar información sobre un servicio dado. Si no ves un tipo de telemetría que esperas en el Catálogo de servicios, asegúrate de haber configurado la etiqueta `DD_SERVICE` de acuerdo con las instrucciones de [etiquetado de servicios unificado][2].

## No se pueden añadir metadatos para servicios de RUM

No es posible añadir metadatos para servicios de RUM.



## Varios servicios comparten los mismos metadatos

Si tienes muchos servicios que comparten los mismos metadatos, no necesitas archivos `service.datadog.yaml` separados para cada uno. Puedes definir varios servicios en un único archivo `service.datadog.yaml` separando cada servicio con un separador `---`. Copia y pega los metadatos compartidos para las entidades dd-servicio pertinentes.

## Los monitores asociados no aparecen en la sección Guía de configuración

El Catálogo de servicios asocia monitores a servicios cuando etiquetas el monitor con `service` y [etiquetas primarias de APM][3].

El recuento total de monitores que aparece en la pestaña **Setup Guidance** (Guía de Configuración) para un único servicio no incluye los monitores silenciados ni los grupos.


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/tracing/guide/setting_primary_tags_to_scope