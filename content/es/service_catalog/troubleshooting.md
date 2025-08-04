---
aliases:
- /es/tracing/service_catalog/troubleshooting
- /es/service_catalog/guides/troubleshooting
- /es/api_catalog/troubleshoot/
further_reading:
- link: /tracing/service_catalog/setup/
  tag: Documentación
  text: Configuración del Catálogo de servicios
title: Solucionar problemas del Catálogo de servicios
---

Si ocurre un comportamiento inesperado con Datadog Service Catalog, esta guía puede ayudarte a resolver el problema. Si sigues teniendo problemas, ponte en contacto con el [Soporte técnico de Datadog][4] para obtener más ayuda.

## Servicios

### No aparecen servicios instrumentados por APM

Si servicios que sabes que están instrumentados para APM no aparecen en la lista de Catálogo de servicios, es probable que se deba a que no han estado emitiendo datos de rendimiento en la última hora para los valores `env` seleccionados (o cualquier valor de Etiqueta primaria de tu elección) o [etiqueta primaria secundaria][1]. Para confirmarlo, en la pestaña **Performance** (Rendimiento), pasa el ratón por encima de las columnas en las que esperas que aparezcan las métricas de rendimiento y ve la información sobre en qué entornos están activos los servicios.

{{< img src="tracing/service_catalog/svc_cat_troubleshooting_1.png" alt="Mensaje emergente que indica que no se han informado datos de rendimiento en la última hora" >}}

### SLOs no listados en la sección Guía de configuración

El recuento en la sección Service Catalog Setup Guidance (Guía de configuración del Catálogo de servicios) refleja el número de SLOs con etiquetas `service`. Si tus SLOs no aparecen en la lista, verifica que tengan valores de etiqueta `service` especificados y que coincidan con los nombres de servicio en otros productos como APM y USM.

### La telemetría adicional está disponible para un servicio, pero no está en la lista

Service Catalog se basa en la etiqueta `DD_SERVICE` en todos los tipos de telemetría (métricas de infraestructura, logs, Cloud Network Monitoring) para recopilar información sobre un servicio dado. Si no ves un tipo de telemetría que esperas en el Service Catalog, asegúrate de haber configurado la etiqueta `DD_SERVICE` de acuerdo con las instrucciones de [etiquetado de servicios unificado][2].

### No se pueden añadir metadatos para servicios de RUM

No es posible añadir metadatos para servicios de RUM.

### Varios servicios comparten los mismos metadatos

Si tienes muchos servicios que comparten los mismos metadatos, no necesitas archivos `service.datadog.yaml` separados para cada uno. Puedes definir varios servicios en un único archivo `service.datadog.yaml` separando cada servicio con un separador `---`. Copia y pega los metadatos compartidos para las entidades dd-servicio pertinentes.

### Los monitores asociados no aparecen en la sección Guía de configuración

Service Catalog asocia monitores a servicios cuando están etiquetados, clasificados o agrupados con servicio o [etiquetas primarias de APM][3]. 

El recuento total de monitores que aparece en la pestaña **Setup Guidance** (Guía de Configuración) para un único servicio no incluye los monitores silenciados ni los grupos.

## Endpoints

### Endpoints faltantes

La lista de Endpoints se basa en el rastreo de APM, así que asegúrate de que tus [servicios están instrumentados][7].

### La definición coincide con demasiados servicios

Por defecto, la lista de Endpoints asigna una definición a todas las instancias que se ajustan a la ruta definida.
Puedes limitar la definición a un servicio específico añadiendo el [parámetro de servicio][6] a la definición de la API.

### No hay datos telemétricos para el archivo de OpenAPI

La lista de endpoints se derivan del rastreo de APM, por lo que la información de tráfico sólo se muestra si hay trazas disponibles para el endpoint. Después de cargar un archivo de OpenAPI, los datos de despliegue se hacen visibles después de que Datadog ingiera un tramo para el endpoint.

### No hay datos para nuevos monitores

La lista de endpoints se basa en el rastreo de APM, por lo que la información de tráfico sólo se muestra cuando hay trazas disponibles para el endpoint. Si no aparecen datos en el gráfico del monitor, puede darse una de las siguientes situaciones:
- No se ha accedido al endpoint desde que se registró y se cargó a través de OpenAPI.
- Las trazas se muestrean en el lado del Agent. Para más detalles, consulta [Controles de ingesta][5].


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/tracing/guide/setting_primary_tags_to_scope
[4]: /es/help/
[5]: /es/tracing/trace_pipeline/ingestion_controls/
[6]: /es/api_catalog/add_metadata/
[7]: /es/tracing/trace_collection/