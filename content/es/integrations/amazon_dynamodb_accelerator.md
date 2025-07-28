---
categories:
- aws
- almacenamiento en caché
- nube
- recopilación de logs
custom_kind: integración
dependencies: []
description: Realiza un seguimiento de las métricas clave de Amazon DynamoDB Accelerator
  (DAX).
doc_link: https://docs.datadoghq.com/integrations/amazon_dynamodb_accelerator/
draft: false
git_integration_title: amazon_dynamodb_accelerator
has_logo: true
integration_id: ''
integration_title: Amazon DynamoDB Accelerator (DAX)
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_dynamodb_accelerator
public_title: Integración de Datadog y Amazon DynamoDB Accelerator (DAX)
short_description: Realiza un seguimiento de las métricas clave de Amazon DynamoDB
  Accelerator (DAX).
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon DynamoDB Accelerator (DAX) es un servicio de almacenamiento en caché compatible con DynamoDB que te permite sacar provecho de un rápido rendimiento en memoria para aplicaciones exigentes.

Habilita esta integración para ver todas tus métricas de Amazon DynamoDB Accelerator (DAX) en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `DynamoDBAccelerator` está habilitado
   en la pestaña de recopilación de métricas.
2. Instala la [integración de Datadog y Amazon DynamoDB Accelerator (DAX)][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_dynamodb_accelerator" >}}


### Eventos

La integración de Amazon DynamoDB Accelerator (DAX) no incluye ningún evento.

### Checks de servicio

La integración de Amazon DynamoDB Accelerator (DAX) no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-DynamoDB-accelerator
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_DynamoDB_accelerator/amazon_DynamoDB_accelerator_metadata.csv
[5]: https://docs.datadoghq.com/es/help/
