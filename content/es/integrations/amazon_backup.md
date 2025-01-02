---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de AWS Backup.
doc_link: https://docs.datadoghq.com/integrations/amazon_backup/
draft: false
git_integration_title: amazon_backup
has_logo: true
integration_id: ''
integration_title: AWS Backup
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_backup
public_title: Integración de Datadog y AWS Backup
short_description: Rastrea métricas clave de AWS Backup.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

AWS Backup te permite centralizar y automatizar la protección de datos entre servicios de AWS
y cargas de trabajo híbridas.

Activa esa integración para ver tus métricas de Backup en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura [la integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `Backup` está activada en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y AWS Backup][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_backup" >}}


### Eventos

La integración de AWS Backup no incluye ningún evento.

### Checks de servicio

La integración de AWS Backup no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-backup
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_backup/amazon_backup_metadata.csv
[5]: https://docs.datadoghq.com/es/help/