---
app_id: amazon_ec2_spot
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea las métricas clave de Amazon EC2 Spot.
title: Amazon EC2 Spot
---
## Información general

Las instancias de Amazon EC2 Spot te permiten aprovechar la capacidad de EC2 no utilizada en la nube de AWS.

Activa esta integración para ver todas tus métricas de EC2 Spot [Fleet] (https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet-cloudwatch-metrics.html) en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `EC2 Spot` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración Datadog - Amazon EC2 Spot](https://app.datadoghq.com/integrations/amazon-ec2-spot).

### Recopilación de logs

Utiliza el [Datadog Agent](https://docs.datadoghq.com/agent/logs/) u otro enviador de logs como [Rsyslog](https://docs.datadoghq.com/integrations/rsyslog/) para enviar tus logs a Datadog.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.ec2spot.available_instance_pools_count** <br>(count) | Grupos de Spot Instance especificados en la solicitud de Spot Fleet.<br>_Se muestra como instancia_ |
| **aws.ec2spot.bids_submitted_for_capacity** <br>(count) | Capacidad para la que Amazon EC2 ha enviado ofertas.<br>_Se muestra como instancia_ |
| **aws.ec2spot.eligible_instance_pool_count** <br>(count) | Grupos de Spot Instance especificados en la solicitud de Spot Fleet, donde Amazon EC2 puede cumplir con las ofertas.<br>_Se muestra como instancia_ |
| **aws.ec2spot.fulfilled_capacity** <br>(count) | Capacidad que Amazon EC2 ha cumplido.<br>_Se muestra como instancia_ |
| **aws.ec2spot.max_percent_capacity_allocation** <br>(gauge) | Valor máximo de PercentCapacityAllocation en todos los grupos de Spot Instance especificados en la solicitud de Spot Fleet.<br>_Se muestra como porcentaje_ |
| **aws.ec2spot.pending_capacity** <br>(count) | Diferencia entre TargetCapacity y FulfilledCapacity.<br>_Se muestra como instancia_ |
| **aws.ec2spot.percent_capacity_allocation** <br>(gauge) | Capacidad asignada al grupo de Spot Instance para las dimensiones especificadas.<br>_Se muestra como porcentaje_ |
| **aws.ec2spot.target_capacity** <br>(count) | Capacidad objetivo de la solicitud de Spot Fleet.<br>_Se muestra como instancia_ |
| **aws.ec2spot.terminating_capacity** <br>(count) | Capacidad que se está cerrando debido a que la capacidad provisionada es mayor que la capacidad objetivo.<br>_Se muestra como instancia_ |

### Eventos

La integración de Amazon EC2 Spot no incluye ningún evento.

### Checks de servicio

La integración de Amazon EC2 Spot no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).