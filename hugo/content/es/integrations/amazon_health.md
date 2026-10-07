---
app_id: amazon_health
categories:
- aws
- nube
- recopilación de logs
- notificaciones
custom_kind: integración
description: Monitoriza el estado del servicio de AWS.
title: AWS Health
---
## Información general

AWS Health ofrece una visibilidad continua del estado de tus recursos, servicios y cuentas de AWS. Activa esta integración para ver tus eventos de servicio de AWS Health en Datadog:

{{< img src="integrations/amazon_health/awshealthevent.png" alt="Evento de AWS Health" popup="true">}}

**Nota**: Esta integración solo funciona para clientes de AWS con un plan de soporte Business o Enterprise.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. Añade los siguientes permisos a tu [política de IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para poder recopilar datos de AWS Health. Para más información, consulta las [políticas de Health](https://docs.aws.amazon.com/health/latest/ug/controlling-access.html) en el sitio web de AWS.

   | Permiso de AWS                    | Descripción                                      |
   | --------------------------------- | ------------------------------------------------ |
   | `health:DescribeEvents` | Se utiliza para enumerar todos los eventos de estado |
   | `health:DescribeEventDetails` | Obtiene información detallada sobre eventos de estado |
   | `health:DescribeAffectedEntities` | Obtiene las entidades afectadas de AWS para eventos de estado |

1. Instala la [integración de Datadog y AWS Health](https://app.datadoghq.com/integrations/amazon-health).

## Datos recopilados

### Métricas

La integración de AWS Health no incluye ninguna métrica.

### Eventos

La integración de AWS Health incluye eventos que se encuentran en el dashboard de AWS Personal Health. Algunos ejemplos son los problemas pendientes, los mantenimientos programados y las notificaciones de cuenta.

### Checks de servicio

La integración de AWS Heath no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).