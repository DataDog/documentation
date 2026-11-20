---
further_reading:
- link: /getting_started/tagging/
  tag: Documentación
  text: Buenas prácticas de etiquetado
- link: /agent/configuration/agent-configuration-files/
  tag: Documentación
  text: Archivos de configuración del Agent
- link: /agent/docker/tag/
  tag: Documentación
  text: Etiquetado de contenedores
title: Etiquetas de logs del Agent
---

## Información general

Datadog Agent añade automáticamente ciertas etiquetas a todos los logs que recopila antes de enviarlos a Datadog. Estas etiquetas se añaden **antes de la ingesta**, y se incluyen en la carga útil que se entrega a Datadog.

## Procesamiento previo a la ingesta

Como estas etiquetas se añaden antes de la ingesta, sucede lo siguiente:

* Se incluyen en todos los datos de log entregados a Datadog
* Aumenta el tamaño total de tus datos de log 
* Están disponibles para filtrarse, buscarse y agregarse en el Log Explorer
* Pueden utilizarse en métricas y consultas basadas en log

## Etiquetas de Agent añadidas automáticamente a logs

Las siguientes etiquetas son añadidas automáticamente a logs por el Datadog Agent:

| Etiqueta (tag) | Descripción | Condiciones |
|-----|-------------|-------------|
| `source` | La fuente del log (ruta del archivo, nombre de la integración, etc.) | Siempre que esté disponible |
| `service` | El nombre del servicio si está configurado en la recopilación de logs | Siempre que esté disponible |
| `env` | La etiqueta de entorno si está configurada globalmente | Siempre que esté disponible |
| `version` | La versión del Agent  | Siempre que esté disponible |
| `filename` | Nombre base del archivo en cola | Solo fuentes basadas en archivos |
| `dirname` | Directorio que contiene el archivo en cola | Solo fuentes basadas en archivos |
| `source_host` | Dirección IP del host de fuente del socket | Solo fuentes de socket (TCP/UDP) |
| `event_type` | Tipo del evento de Windows | Solo eventos de Windows |
| `event_source` | Fuente del evento de Windows  | Solo eventos de Windows |
| `event_id` | ID del evento de Windows | Solo eventos de Windows, si `tag_event_id: true` |
| `sid` | Identificador de seguridad de Windows | Solo eventos de Windows, si `tag_sid: true` |
| `truncated` | Fuente de truncamiento | Si `logs_config.tag_truncated_logs: true` |
| `multiline` | Fuente de agregación multilínea | Si `logs_config.tag_multi_line_logs: true` |
| `aggregated_json` | Indica que el log se ha agregado a partir de varias entradas de log JSON | Si `logs_config.auto_multi_line.tag_aggregated_json: true` |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}