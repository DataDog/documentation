---
aliases:
- /es/tracing/api_catalog/explore_and_catalog_apis/
- /es/api_catalog/explore_and_catalog_apis/
- /es/tracing/api_catalog/explore_apis/
- /es/api_catalog/explore_apis/
- /es/service_catalog/endpoints/explore_endpoints/
further_reading:
- link: /rastreo/catálogo_software/
  tag: Documentación
  text: Catálogo de software Datadog
title: Exploring Endpoints
---

{{< img src="tracing/software_catalog/endpoints-list.png" alt="Lista de endpoints en el Catálogo de software, que muestra información de rendimiento de cada endpoint" style="width:100%;" >}}

## Información general

La [lista de endpoints][1] proporciona visibilidad de todos los endpoints HTTP de los entornos de tu organización Datadog. Cada endpoint muestra su método HTTP (por ejemplo, `GET`), la ruta URL (por ejemplo, `/payment/{shop_id}/purchase`) y el nombre de servicio asociado (por ejemplo, `Payments`).

<div class="alert alert-info">La lista de <strong>endpoints</strong> sólo admite endpoints HTTP.</div>

## Exploración del rendimiento de endpoints

La lista de endpoints muestra los datos de rendimiento correspondientes al entorno y periodo de tiempo seleccionados:

- **Clasificación de columnas**: Haz clic en los encabezados de columna para ordenar por métricas. Por ejemplo, haz clic en **P95** para ver endpoints con el percentil 95 para la latencia.
- **Seguimiento de la propiedad**: Observa la propiedad de los equipos en la columna **EQUIPO**. Esta información se hereda de la definición del servicio asociado en el [Catálogo de software][2]. El propietario del servicio es propietario de todos los endpoints conectados al servicio.
- **Filtrado y búsqueda**: Busca por servicio, ruta, o cualquier etiqueta (tag) primaria, o filtra utilizando facetas como **Servicio** y **Equipo**.
- **Contexto**: Especifica el entorno, las etiquetas primarias adicionales (por ejemplo, `cluster_name`) y el periodo de tiempo.

{{< img src="tracing/software_catalog/scope-data.png" alt="Al cambiar los parámetros del contexto se cambian los datos que se muestran en la lista de endpoints" >}}

## Visualizar detalles del endpoint

Utiliza la página de detalles del endpoint para detectar las API de bajo rendimiento e identificar oportunidades de optimización.

Para acceder a la página de detalles del endpoint:

1. Utiliza las opciones de filtrado, clasificación y búsqueda en la lista de endpoints para encontrar endpoints de interés.
1. Haz clic en un endpoint para ver su página de detalles.

La página de detalles del endpoint te muestra metadatos, métricas de rendimiento, errores, dependencias y telemetría correlacionada de otras áreas de Datadog.

{{< img src="tracing/software_catalog/endpoint-details.png" alt="Haz clic en un endpoint para abrir la página con sus detalles y ver información como errores y dependencias." >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[2]: /es/tracing/software_catalog/