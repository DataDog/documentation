---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon Athena.
doc_link: https://docs.datadoghq.com/integrations/amazon_athena/
draft: false
git_integration_title: amazon_athena
has_logo: true
integration_id: ''
integration_title: Amazon Athena
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_athena
public_title: Integración de Datadog y Amazon Atenea
short_description: Rastrea métricas clave de Amazon Athena.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon Athena es un servicio de consulta interactivo que facilita el análisis de datos directamente en Amazon Simple Storage Service (Amazon S3) mediante SQL estándar.

Activa esta integración para ver todas tus métricas de Athena en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de integración de AWS][2], asegúrate de que `Athena` está activada en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon Athena][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-athena" >}}


### Eventos

La integración de Amazon Athena no incluye ningún evento.

### Checks de servicio

La integración de Amazon Athena no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-athena
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_athena/amazon_athena_metadata.csv
[5]: https://docs.datadoghq.com/es/help/