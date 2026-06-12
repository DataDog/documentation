---
aliases:
- /es/integrations/awsroute53/
app_id: amazon_route53
categories:
- aws
- cloud
- log collection
- network
- notifications
custom_kind: integración
description: Rastrea métricas de Route 53 y monitorización de checks de estado.
title: Amazon Route 53
---
{{< img src="integrations/amazon_route53/route53_graph.png" alt="Gráfico de route53" popup="true">}}

## Información general

Amazon Route 53 proporciona una gestión de tráfico y de DNS junto con una monitorización de la disponibilidad y del rendimiento mediante checks de estado. Para obtener un contexto sobre otras métricas y eventos en tus entornos, puedes visualizar la información de los checks de estado en Datadog. El siguiente es un ejemplo de dashboard del gráfico del check de estado de Route 53:

Para obtener información sobre el resto de servicios de AWS, consulta el [cuadro de AWS](https://docs.datadoghq.com/integrations/amazon_web_services/)

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Route53` está habilitado en la pestaña `Metric Collection`.

1. Añade estos permisos a tu [política de Datadog IAM](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para recopilar métricas de Amazon Route 53:

   - `route53:listHealthChecks`: Enumera los checks de estado disponibles.
   - `route53:listTagsForResources`: Añade etiquetas (tags) personalizadas sobre métricas CloudWatch Route 53.

   Para más información, consulta las [Políticas de Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/auth-and-access-control.html) en el sitio web de AWS.

1. Instala la [integración de Datadog y Amazon Route53](https://app.datadoghq.com/integrations/amazon-route53).

**Nota**: Para obtener las métricas de Amazon Route 53 mediante CloudWatch, debes seleccionar US East (N. Virginia) como región. Las métricas de Amazon Route 53 no están disponibles si seleccionas cualquier otra región. Consulta [Monitorización del estado de las comprobaciones de estado y obtención de notificaciones](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-monitor-view-status.html#monitoring-health-checks) para obtener más información.

### Recopilación de logs

Configura Amazon Route 53 para registrar información sobre las consultas que recibe Route 53, como por ejemplo:

- Dominio o subdominio solicitado
- Fecha y hora de la solicitud
- Tipo de registro DNS (como A o AAAA)
- Localización Edge de Route 53 que respondió a la consulta DNS
- Código de respuesta DNS, como NoError o ServFail
- Logs de consultas de resolvers para tu VPC

#### Habilitar el registro de consultas DNS de Route 53

1. Ve a tu consola de Route 53 en AWS y haz clic en **Hosted zones** (Zonas alojadas).
1. Haz clic en el botón de opción de la zona alojada para la que quieres configurar logs.
1. Haz clic en **View Details** (Ver detalles).
1. Haz clic en **Configure query logging** (Configurar el registro de consultas).
1. Selecciona el grupo de logs CloudWatch o crea uno nuevo al que enviar logs. Asegúrate de incluir "route53" en el nombre del grupo de logs.

#### Habilitar el registro de consultas de resolvers Route 53

1. En el panel de configuración de Route 53 de la izquierda, selecciona **Registro de consultas** en Resolver.
1. Haz clic en **Configure Query Logging** (Configurar registro de consultas).
1. Introduce un nombre para la consulta del Resolver.
1. Selecciona el grupo de logs CloudWatch al que quieras que el resolver envíe logs de consultas. Asegúrate de incluir "route53" en el nombre del grupo de logs.
1. Añade las VPC para las que deseas registrar consultas del Resolver.
1. Si lo deseas, añade etiquetas (tags).
1. Haz clic en **Configure query logging** (Configurar el registro de consultas).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/) en tu cuenta de AWS.
1. Una vez configurada, ve a la función de Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
1. Selecciona el activador **CloudWatch Logs** para la configuración del activador.
1. Selecciona el grupo de logs de CloudWatch que contiene los logs de Route 53.
1. Introduce un nombre para el filtro.
1. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Log Explorer](https://app.datadoghq.com/logs) para empezar a explorar tus logs.

Para obtener más información sobre la recopilación de logs de servicios de AWS, consulta [Enviar logs de servicios de AWS con la función Lambda de Datadog](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.route53.child_health_check_healthy_count** <br>(gauge) | Para una comprobación de estado calculada, el número de comprobaciones de estado que están en buen estado entre las comprobaciones de estado que monitoriza Amazon Route 53.|
| **aws.route53.connection_time** <br>(gauge) | El tiempo medio que tardaron los comprobadores de estado de Amazon Route 53 en establecer un conexión TCP con el endpoint.<br>_Se muestra en milisegundos_ |
| **aws.route53.dnsqueries** <br>(count) | El número de consultas DNS a las que Route53 responde para todos los registros de una zona alojada.<br>_Se muestra como consulta_ |
| **aws.route53.health_check_percentage_healthy** <br>(gauge) | Porcentaje de comprobadores de estado de Amazon Route 53 que consideran que el endpoint seleccionado está en buen estado.<br>_Se muestra como porcentaje_ |
| **aws.route53.health_check_status** <br>(gauge) | El estado del endpoint de comprobación de estado que CloudWatch está comprobando. 1 indica que está en buen estado y 0 indica que no lo está.|
| **aws.route53.sslhandshake_time** <br>(gauge) | El tiempo medio que tardaron los comprobadores de estado de Amazon Route 53 en completar el handshake SSL.|
| **aws.route53.time_to_first_byte** <br>(gauge) | El tiempo medio que tardaron los comprobadores de estado de Amazon Route 53 en recibir el primer byte de la respuesta a una solicitud HTTP o HTTPS.<br>_Se muestra en milisegundos_ |
| **aws.route53resolver.endpoint_healthy_enicount** <br>(gauge) | El número de interfaces de red elásticas en estado OPERATIONAL.<br>_Se muestra como unidad_ |
| **aws.route53resolver.endpoint_unhealthy_enicount** <br>(gauge) | El número de interfaces de red elásticas en estado AUTO_RECOVERING.<br>_Se muestra como unidad_ |
| **aws.route53resolver.firewall_rule_group_query_volume** <br>(count) | El número de consultas de DNS Firewall que coinciden con un grupo de reglas de firewall (especificado por FirewallRuleGroupId).<br>_Se muestra como consulta_ |
| **aws.route53resolver.firewall_rule_group_vpc_query_volume** <br>(count) | El número de consultas de firewall DNS de una VPC (especificada por VpcId) que coinciden con un grupo de reglas de firewall (especificado por FirewallRuleGroupId).<br>_Se muestra como consulta_ |
| **aws.route53resolver.firewall_rule_query_volume** <br>(count) | El número de consultas de firewall DNS que coinciden con una lista de dominios de firewall (especificada por FirewallDomainListId) dentro de un grupo de reglas de firewall (especificado por FirewallRuleGroupId).<br>_Se muestra como consulta_ |
| **aws.route53resolver.inbound_query_volume** <br>(count) | El número de consultas DNS reenviadas desde tu red a tus VPCs a través del endpoint especificado por EndpointId.<br>_Se muestra como consulta_ |
| **aws.route53resolver.outbound_query_aggregate_volume** <br>(count) | El número de consultas DNS reenviadas desde tus VPCs a tu red a través del endpoint especificado por EndpointId.<br>_Se muestra como consulta_ |
| **aws.route53resolver.outbound_query_volume** <br>(count) | El número de consultas DNS reenviadas desde tus VPCs a tu red a través del endpoint especificado por EndpointId.<br>_Se muestra como consulta_ |
| **aws.route53resolver.vpc_firewall_query_volume** <br>(count) | Número de consultas DNS Firewall desde una VPC (especificada por VpcId).<br>_Se muestra como consulta_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración Amazon Route 53 no incluye eventos.

### Checks de servicio

La integración de Amazon Route 53 no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).