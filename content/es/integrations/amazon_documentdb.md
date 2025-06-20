---
categories:
- nube
- almacenes de datos
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Monitoriza métricas y logs de Amazon DocumentDB.
doc_link: https://docs.datadoghq.com/integrations/amazon_documentdb/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-documentdb-with-datadog/
  tag: Blog
  text: Recopila métricas y logs de Amazon DocumentDB con Datadog
git_integration_title: amazon_documentdb
has_logo: true
integration_id: ''
integration_title: Amazon DocumentDB
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_documentdb
public_title: Integración de Datadog y Amazon DocumentDB
short_description: Monitoriza métricas y logs de Amazon DocumentDB.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon DocumentDB es un servicio de base de datos de documentos rápida, escalable, de alta disponibilidad y totalmente gestionada que admite cargas de trabajo de MongoDB.

## Configurar

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `DocumentDB` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon DocumentDB][3].

### Recopilación de logs

#### Activar logging

Configura Amazon DocumentDB para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_documentdb` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon DocumentDB en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_documentdb" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparece en la consola de AWS, incluyendo dbinstanceidentifier, dbclusteridentifier, entre otras.

### Eventos

La integración de Amazon DocumentDB no incluye ningún evento.

### Checks de servicio

La integración de Amazon DocumentDB no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-documentdb
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_documentdb/amazon_documentdb_metadata.csv
[8]: https://docs.datadoghq.com/es/help/