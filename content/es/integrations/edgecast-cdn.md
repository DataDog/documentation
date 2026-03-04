---
aliases:
- /es/integrations/edgecast_cdn
app_id: edgecast-cdn
categories:
- almacenamiento en caché
- métricas
custom_kind: integración
description: '[Obsoleto] Nonitorizar el tráfico de CDN de Edgecast con métricas de
  Datadog'
further_reading:
- link: https://docs.datadoghq.com/integrations/edgecast_cdn/
  tag: documentación
  text: Documentación de Edgecast
media: []
supported_os:
- linux
- windows
- macos
title: Edgecast
---
## Información general

**_Aviso crítico_**: La integración de CDN de Edgecast está obsoleta debido al cese de los servicios de Edgecast.

Edgecast (EdgeCast Networks, Inc.) ha cesado sus operaciones tras la quiebra.
Esta integración dejará de funcionar al interrumpirse los servicios subyacentes.
Se recomienda encarecidamente la migración inmediata a un proveedor de CDN alternativo.
Algunas alternativas comunes son los servicios de CDN de Cloudflare, Akamai o Fastly. El ícono se eliminará el 7 de julio de 2025.

## Configuración

### Configuración

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **edgecast.request_count** <br>(count) | El número de solicitudes que se han producido.<br>_Mostrado como solicitud_ |
| **edgecast.request_rate** <br>(gauge) | La suma de la tasa a la cual se proveyeron solicitudes a clientes de HTTP por segundo.<br>_Mostrado como solicitud_ |
| **edgecast.file_size** <br>(count) | El tamaño del archivo de la respuesta.<br>_Mostrado como byte_ |
| **edgecast.bytes_in** <br>(count) | El número de bytes cargados.<br>_Mostrado como byte_ |
| **edgecast.bytes_out** <br>(count) | El número de bytes descargados.<br>_Mostrado como byte_ |
| **edgecast.completed_downloads** <br>(count) | El número de descargas finalizadas.<br>_Mostrado como ocurrencia_ |
| **edgecast.download_attempts** <br>(count) | El número de intentos de descarga.<br>_Mostrado como intento_ |
| **edgecast.cache_hit** <br>(count) | Número de aciertos en la caché.<br>_Mostrado como acierto_ |
| **edgecast.cache_hit_percentage** <br>(gauge) | El porcentaje de aciertos en la caché.<br>_Mostrado como porcentaje_ |
| **edgecast.cache_miss** <br>(count) | El número de fallos en la caché.<br>_Mostrado como fallo_ |
| **edgecast.cache_miss_percentage** <br>(gauge) | El porcentaje de fallos en la caché.<br>_Mostrado como porcentaje_ |
| **edgecast.byte_hit** <br>(count) | El número de bytes que se han provisto desde la caché.<br>_Mostrado como byte_ |
| **edgecast.byte_hit_percentage** <br>(gauge) | El porcentaje de bytes provistos desde la caché.<br>_Mostrado como porcentaje_ |
| **edgecast.byte_miss** <br>(count) | El número de bytes que no se han provisto desde la caché.<br>_Mostrado como byte_ |
| **edgecast.byte_miss_percentage** <br>(gauge) | El porcentaje de bytes que no se han provisto desde la caché.<br>_Mostrado como porcentaje_ |
| **edgecast.status_2xx** <br>(count) | El número de solicitudes que han devuelto un código de estado HTTP 2xx.<br>_Mostrado como solicitud_ |
| **edgecast.status_2xx_percentage** <br>(gauge) | El porcentaje de solicitudes que devuelven un código de estado HTTP 2xx.<br>_Mostrado como porcentaje_ |
| **edgecast.status_3xx** <br>(count) | El número de solicitudes que han devuelto un código de estado HTTP 3xx.<br>_Mostrado como solicitud_ |
| **edgecast.status_3xx_percentage** <br>(gauge) | El porcentaje de solicitudes que devuelven un código de estado HTTP 3xx.<br>_Mostrado como porcentaje_ |
| **edgecast.status_4xx** <br>(count) | El número de solicitudes que han devuelto un código de estado HTTP 4xx.<br>_Mostrado como solicitud_ |
| **edgecast.status_4xx_percentage** <br>(gauge) | El porcentaje de solicitudes que devuelven un código de estado HTTP 4xx.<br>_Mostrado como porcentaje_ |
| **edgecast.status_5xx** <br>(count) | El número de solicitudes que han devuelto un código de estado HTTP 5xx.<br>_Mostrado como solicitud_ |
| **edgecast.status_5xx_percentage** <br>(gauge) | El porcentaje de solicitudes que devuelven un código de estado HTTP 5xx.<br>_Mostrado como porcentaje_ |
| **edgecast.total_time** <br>(calibre) | El tiempo total que han tardado todas las solicitudes en segundos.<br>_Mostrado en segundos_ |
| **edgecast.transfer_rate** <br>(gauge) | La suma de la velocidad a la que los servidores de borde entregaron contenidos a los clientes de HTTP.|
| **edgecast.config_nocache** <br>(count) | El número de solicitudes con estado de caché CONFIG_NOCACHE.<br>_Mostrado como ocurrencia_ |
| **edgecast.uncacheable** <br>(count) | El número de solicitudes con estado de caché UNCACHEABLE.<br>_Mostrado como ocurrencia_ |
| **edgecast.tcp_hit** <br>(count) | El número de solicitudes con estado de caché TCP_HIT.<br>_Mostrado como acierto_ |
| **edgecast.tcp_miss** <br>(count) | El número de solicitudes con estado de caché TCP_MISS.<br>_Mostrado como fallo_ |
| **edgecast.tcp_partial_hit** <br>(count) | El número de solicitudes con estado de caché TCP_PARTIAL_HIT.<br>_Mostrado como acierto_ |
| **edgecast.tcp_partial_miss** <br>(count) | El número de solicitudes con estado de caché TCP_PARTIAL_MISS.<br>_Mostrado como fallo_ |
| **edgecast.tcp_expired_hit** <br>(count) | El número de solicitudes con estado de caché TCP_EXPIRED_HIT.<br>_Mostrado como acierto_ |
| **edgecast.tcp_expired_miss** <br>(count) | El número de solicitudes con estado de caché TCP_EXPIRED_MISS.<br>_Mostrado como fallo_ |
| **edgecast.tcp_mem_hit** <br>(count) | El número de solicitudes con estado de caché TCP_MEM_HIT.<br>_Mostrado como acierto_ |
| **edgecast.tcp_client_refresh_miss** <br>(count) | El número de solicitudes con estado de caché TCP_CLIENT_REFRESH_MISS.<br>_Mostrado como fallo_ |

### Eventos

### Checks de servicio

## Solucionar problemas

¿Necesitas ayuda? Pontee en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}