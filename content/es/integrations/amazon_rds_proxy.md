---
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon RDS Proxy.
doc_link: https://docs.datadoghq.com/integrations/amazon_rds_proxy/
draft: false
git_integration_title: amazon_rds_proxy
has_logo: true
integration_id: ''
integration_title: Amazon RDS Proxy
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_rds_proxy
public_title: Integración de Datadog y Amazon RDS Proxy
short_description: Rastrea métricas clave de Amazon RDS Proxy.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon RDS Proxy es un proxy de base de datos totalmente gestionado de alta disponibilidad para Amazon Relational Database Service (RDS) que hace que las aplicaciones sean más escalables, más resistentes a los fallos de la base de datos y más seguras.

Habilita esta integración para ver todas tus métricas de RDS Proxy en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [la integración de Amazon Web Services][1].
También es necesario habilitar la [integración de Amazon RDS][2].

### Recopilación de métricas

1. En la [página de la integración de AWS][3], asegúrate de que `RDS Proxy` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon RDS Proxy][4].

### Recopilación de logs

#### Activar logging

Al crear un RDS Proxy, se puede habilitar el registro en la configuración avanzada. Sigue las instrucciones en [Empezando con RDS Proxy][5] para empezar a enviar tus logs de RDS Proxy a CloudWatch.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función AWS Lambda de recopilación de logs de Datadog][6].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el grupo de logs de CloudWatch que contenga tus logs de RDS Proxy. Selecciona el grupo de logs de CloudWatch correspondiente, añade un nombre de filtro (opcional) y añade el activador.

Una vez hecho esto, ve al [Datadog Log Explorer][7] para analizar tus logs.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_rds_proxy" >}}


### Eventos

La integración de Amazon RDS Proxy no incluye ningún evento.

### Checks de servicios

La integración de Amazon RDS Proxy no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/es/integrations/amazon_rds/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-rds-proxy
[5]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-setup.html#rds-proxy-creating
[6]: https://docs.datadoghq.com/es/integrations/amazon_web_services/?tab=roledelegation#log-collection
[7]: https://app.datadoghq.com/logs
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rds_proxy/amazon_rds_proxy_metadata.csv
[9]: https://docs.datadoghq.com/es/help/
