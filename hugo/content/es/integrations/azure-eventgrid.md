---
aliases:
- /es/integrations/azure_event_grid
app_id: azure-eventgrid
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas principales de Azure Event Grid.
media: []
title: Azure Event Grid
---
## Información general

Azure Event Grid es un servicio de enrutamiento de eventos inteligente y totalmente gestionado que permite un consumo uniforme de eventos utilizando un modelo de publicación y suscripción.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Event Grid.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.eventgrid_domains.advanced_filter_evaluation_count** <br>(count) | El total de filtros avanzados evaluados a través de suscripciones a eventos para este tema.<br>_Se muestra como operación_ |
| **azure.eventgrid_domains.dead_lettered_count** <br>(count) | El total de eventos no entregados que coinciden con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_domains.delivery_attempt_fail_count** <br>(count) | El total de eventos no entregados a esta suscripción de eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_domains.delivery_success_count** <br>(count) | El total de eventos entregados a esta suscripción de eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_domains.destination_processing_duration_in_ms** <br>(gauge) | La duración del procesamiento de destino en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.eventgrid_domains.dropped_event_count** <br>(count) | El total de eventos descartados que coinciden con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_domains.matched_event_count** <br>(count) | El total de eventos coincidentes con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_domains.publish_fail_count** <br>(count) | El total de eventos fallidos para publicar en este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_domains.publish_success_count** <br>(count) | El total de eventos publicados en este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_domains.publish_success_latency_in_ms** <br>(gauge) | La latencia de éxito de publicación en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.eventgrid_eventsubscriptions.dead_lettered_count** <br>(count) | El total de eventos no entregados que coinciden con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_eventsubscriptions.delivery_attempt_fail_count** <br>(count) | El total de eventos no entregados a esta suscripción de eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_eventsubscriptions.delivery_success_count** <br>(count) | El total de eventos entregados a esta suscripción de eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_eventsubscriptions.destination_processing_duration_in_ms** <br>(gauge) | La duración del procesamiento de destino en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.eventgrid_eventsubscriptions.dropped_event_count** <br>(count) | El total de eventos descartados que coinciden con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_eventsubscriptions.matched_event_count** <br>(count) | El total de eventos coincidentes con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_extensiontopics.publish_fail_count** <br>(count) | El total de eventos fallidos para publicar en este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_extensiontopics.publish_success_count** <br>(count) | El total de eventos publicados en este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_extensiontopics.publish_success_latency_in_ms** <br>(gauge) | La latencia de éxito de publicación en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.eventgrid_extensiontopics.unmatched_event_count** <br>(count) | El total de eventos que no coinciden con ninguna de las suscripciones a eventos para este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_partnernamespaces.dead_lettered_count** <br>(count) | El total de eventos no entregados que coinciden con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_partnernamespaces.delivery_attempt_fail_count** <br>(count) | El total de eventos no entregados a esta suscripción de eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_partnernamespaces.delivery_success_count** <br>(count) | El total de eventos entregados a esta suscripción de eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_partnernamespaces.destination_processing_duration_in_ms** <br>(gauge) | La duración del procesamiento de destino en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.eventgrid_partnernamespaces.dropped_event_count** <br>(count) | El total de eventos descartados que coinciden con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_partnernamespaces.matched_event_count** <br>(count) | El total de eventos coincidentes con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_partnernamespaces.publish_fail_count** <br>(count) | El total de eventos fallidos para publicar en este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_partnernamespaces.publish_success_count** <br>(count) | El total de eventos publicados en este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_partnernamespaces.publish_success_latency_in_ms** <br>(gauge) | La latencia de éxito de publicación en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.eventgrid_partnernamespaces.unmatched_event_count** <br>(count) | El total de eventos que no coinciden con ninguna de las suscripciones a eventos para este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_partnertopics.advanced_filter_evaluation_count** <br>(count) | El total de filtros avanzados evaluados a través de suscripciones a eventos para este tema.<br>_Se muestra como operación_ |
| **azure.eventgrid_partnertopics.dead_lettered_count** <br>(count) | El total de eventos no entregados que coinciden con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_partnertopics.delivery_attempt_fail_count** <br>(count) | El total de eventos no entregados a esta suscripción de eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_partnertopics.delivery_success_count** <br>(count) | El total de eventos entregados a esta suscripción de eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_partnertopics.destination_processing_duration_in_ms** <br>(gauge) | La duración del procesamiento de destino en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.eventgrid_partnertopics.dropped_event_count** <br>(count) | El total de eventos descartados que coinciden con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_partnertopics.matched_event_count** <br>(count) | El total de eventos coincidentes con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_partnertopics.publish_fail_count** <br>(count) | El total de eventos fallidos para publicar en este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_partnertopics.publish_success_count** <br>(count) | El total de eventos publicados en este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_partnertopics.unmatched_event_count** <br>(count) | El total de eventos que no coinciden con ninguna de las suscripciones a eventos para este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_systemtopics.advanced_filter_evaluation_count** <br>(count) | El total de filtros avanzados evaluados a través de suscripciones a eventos para este tema.<br>_Se muestra como operación_ |
| **azure.eventgrid_systemtopics.dead_lettered_count** <br>(count) | El total de eventos no entregados que coinciden con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_systemtopics.delivery_attempt_fail_count** <br>(count) | El total de eventos no entregados a esta suscripción de eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_systemtopics.delivery_success_count** <br>(count) | El total de eventos entregados a esta suscripción de eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_systemtopics.destination_processing_duration_in_ms** <br>(gauge) | La duración del procesamiento de destino en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.eventgrid_systemtopics.dropped_event_count** <br>(count) | El total de eventos descartados que coinciden con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_systemtopics.matched_event_count** <br>(count) | El total de eventos coincidentes con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_systemtopics.publish_fail_count** <br>(count) | El total de eventos fallidos para publicar en este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_systemtopics.publish_success_count** <br>(count) | El total de eventos publicados en este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_systemtopics.publish_success_latency_in_ms** <br>(gauge) | La latencia de éxito de publicación en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.eventgrid_systemtopics.unmatched_event_count** <br>(count) | El total de eventos que no coinciden con ninguna de las suscripciones a eventos para este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_topics.advanced_filter_evaluation_count** <br>(count) | El total de filtros avanzados evaluados a través de suscripciones a eventos para este tema.<br>_Se muestra como operación_ |
| **azure.eventgrid_topics.dead_lettered_count** <br>(count) | El total de eventos no entregados que coinciden con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_topics.delivery_attempt_fail_count** <br>(count) | El total de eventos no entregados a esta suscripción de eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_topics.delivery_success_count** <br>(count) | El total de eventos entregados a esta suscripción de eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_topics.destination_processing_duration_in_ms** <br>(gauge) | La duración del procesamiento de destino en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.eventgrid_topics.dropped_event_count** <br>(count) | El total de eventos descartados que coinciden con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_topics.matched_event_count** <br>(count) | El total de eventos coincidentes con esta suscripción a eventos<br>_Se muestra como evento_ |
| **azure.eventgrid_topics.publish_fail_count** <br>(count) | El total de eventos fallidos para publicar en este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_topics.publish_success_count** <br>(count) | El total de eventos publicados en este tema<br>_Se muestra como evento_ |
| **azure.eventgrid_topics.publish_success_latency_in_ms** <br>(gauge) | La latencia de éxito de publicación en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.eventgrid_topics.unmatched_event_count** <br>(count) | El total de eventos que no coinciden con ninguna de las suscripciones a eventos para este tema<br>_Se muestra como evento_ |

### Eventos

La integración Azure Event Grid no incluye eventos.

### Checks de servicio

La integración Azure Event Grid no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).