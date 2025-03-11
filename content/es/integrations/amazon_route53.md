---
aliases:
- /es/integrations/awsroute53/
categories:
- aws
- cloud
- log collection
- network
- notifications
custom_kind: integration
dependencies: []
description: Seguimiento de métricas Route 53 y monitorización de checks de estado.
doc_link: https://docs.datadoghq.com/integrations/amazon_route53/
draft: false
git_integration_title: amazon_route53
has_logo: true
integration_id: ''
integration_title: Amazon Route 53
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_route53
public_title: Integración de Amazon Route 53 en Datadog
short_description: Seguimiento de métricas Route 53 y monitorización de checks de
  estado.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_route53/route53_graph.png" alt="Gráfico de Route 53" popup="true">}}

## Información general

Amazon Route 53 proporciona una gestión de tráfico y de DNS junto con una monitorización de la disponibilidad y del rendimiento mediante checks de estado. Para obtener un contexto sobre otras métricas y eventos en tus entornos, puedes visualizar la información de los checks de estado en Datadog. El siguiente es un ejemplo de dashboard del gráfico del check de estado de Route 53:

Para obtener más información sobre otros servicios AWS, consulta el [cuadro de AWS][1].

## Configuración

### Instalación

Si todavía no lo has hecho, configura la [integración de Amazon Web Services primero][1].

### Recopilación de métricas

1. En la [página de la integración AWS][2], asegúrate de que `Route53` está habilitado en la pestaña `Metric Collection`.
2. Añade estos permisos a tu [política IAM de Datadog][3] para recopilar métricas Amazon Route 53:

    - `route53:listHealthchecks`: Enumera los checks de estado disponibles.
    - `route53:listTagsForResources`: Añade etiquetas (tags) personalizadas sobre métricas CloudWatch Route 53.

    Para obtener más información, consulta las [políticas de Route 53][4] en el sitio web AWS.

3. Instala la [integración Amazon Route 53 en Datadog][5].

**Nota**: Para obtener métricas Amazon Route 53 utilizando CloudWatch, debes elegir la región US East (Virginia del Norte). Las métricas Amazon Route 53 no estarán disponibles si seleccionas otra región. Para obtener más información, consulta [Monitorización de checks de estado y obtención de notificaciones][6].

### Recopilación de logs

Configura Amazon Route 53 para registrar información sobre las consultas que recibe Route 53, como por ejemplo:

- Dominio o subdominio solicitado
- Fecha y hora de la solicitud
- Tipo de registro DNS (como A o AAAA)
- Localización Edge de Route 53 que respondió a la consulta DNS
- Código de respuesta DNS, como NoError o ServFail
- Logs de consultas de resolvers para tu VPC

#### Habilitar el registro de consultas DNS de Route 53

1. Ve a tu consola de AWS Route 53 y haz clic en **Hosted zones* (Zonas alojadas).
2. Haz clic en el botón de opción de la zona alojada para la que quieres configurar logs.
3. Haz clic en **View Details** (Ver detalles).
4. Haz clic en **Configure query logging** (Configurar el registro de consultas).
5. Selecciona el grupo de logs CloudWatch o crea uno nuevo al que enviar logs. Asegúrate de incluir "route53" en el nombre del grupo de logs.

#### Habilitar el registro de consultas de resolvers Route 53

1. En el panel de configuración de Route 53 de la izquierda, selecciona **Registro de consultas** en Resolver.
2. Haz clic en **Configure query logging** (Configurar el registro de consultas).
3. Introduce un nombre para la consulta del resolver. 
4. Selecciona el grupo de logs CloudWatch al que quieras que el resolver envíe logs de consultas. Asegúrate de incluir "route53" en el nombre del grupo de logs.
5. Añade las VPC para las que quieres registrar consultas de resolver.
6. Si quieres, puedes añadir etiquetas. 
7. Haz clic en **Configure query logging** (Configurar el registro de consultas).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder[7] en tu cuenta AWS.
2. Una vez configurada, ve a la función Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
3. Para configurar un activador, selecciona el activador **CloudWatch Logs**.
4. Selecciona el grupo de logs de CloudWatch que contiene los logs de Route 53.
5. Introduce un nombre para el filtro.
6. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Explorador de logs][8] para empezar a explorar tus logs.

Para obtener más información sobre la recopilación de logs de servicios AWS, consulta [Enviar logs de servicios AWS con la función Lambda en Datadog][9].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_route53" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración Amazon Route 53 no incluye eventos.

### Checks de los servicios

La integración de Amazon Route 53 no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Contacta con [equipo de asistencia de Datadog][11].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/auth-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-route53
[6]: http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-monitor-view-status.html#monitoring-health-checks
[7]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[8]: https://app.datadoghq.com/logs
[9]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_route53/amazon_route53_metadata.csv
[11]: https://docs.datadoghq.com/es/help/