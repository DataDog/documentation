---
categories:
- automatización
- aws
- nube
- recopilación de logs
- ia/ml
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon Textract.
doc_link: https://docs.datadoghq.com/integrations/amazon_textract/
draft: false
git_integration_title: amazon_textract
has_logo: true
integration_id: ''
integration_title: Amazon Textract
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_textract
public_title: Integración de Datadog con Amazon Textract
short_description: Rastrea métricas clave de Amazon Textract.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->

## Información general

Amazon Textract es un servicio de machine learning que extrae de manera automática texto, escritura a mano y datos de documentos escaneados.

Habilita esta integración para ver todas tus métricas de Amazon Textract en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `Textract` se encuentre habilitado en la pestaña `Metric Collection` (Recopilación de métricas).
2. Instala la [integración de Datadog con Amazon Textract][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_textract" >}}


### Eventos

La integración de Amazon Textract no incluye eventos.

### Checks de servicio

La integración de Amazon Textract no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-textract
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_textract/amazon_textract_metadata.csv
[5]: https://docs.datadoghq.com/es/help/
