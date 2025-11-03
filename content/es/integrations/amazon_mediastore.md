---
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de AWS Elemental MediaStore.
doc_link: https://docs.datadoghq.com/integrations/amazon_mediastore/
draft: false
git_integration_title: amazon_mediastore
has_logo: true
integration_id: ''
integration_title: AWS Elemental MediaStore
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_mediastore
public_title: Integración de Datadog y AWS Elemental MediaStore
short_description: Rastrea las métricas clave de AWS Elemental MediaStore.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

AWS Elemental MediaStore es un servicio de almacenamiento de AWS optimizado para medios de comunicación.

Habilita esta integración para ver todas tus métricas de AWS Elemental MediaStore en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En el [cuadro de la integración de AWS][2], asegúrate de que `MediaStore` está habilitado
   en la pestaña de recopilación de métricas.
2. Instala la [integración de Datadog y AWS Elemental MediaStore][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_mediastore" >}}


### Eventos

La integración de AWS Elemental MediaStore no incluye ningún evento.

### Checks de servicio

La integración de AWS Elemental MediaStore no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediastore
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediastore/amazon_mediastore_metadata.csv
[5]: https://docs.datadoghq.com/es/help/
