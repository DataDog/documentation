---
categories:
- nube
- aws
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Amazon ECR.
doc_link: https://docs.datadoghq.com/integrations/amazon_ecr/
draft: false
git_integration_title: amazon_ecr
has_logo: true
integration_id: ''
integration_title: Amazon ECR
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_ecr
public_title: Integración de Datadog y Amazon ECR
short_description: Rastrea las métricas clave de Amazon ECR.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon Elastic Container Registry (Amazon ECR) es un registro de contenedores de Docker totalmente gestionado que facilita a los desarrolladores el almacenamiento, la administración y el despliegue de imágenes de contenedor de Docker.

Activa esta integración para ver todas tus métricas de ECR en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `ECR` está habilitado
   en la pestaña de recopilación de métricas.
2. Instala la [integración de Datadog y ECR][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_ecr" >}}


### Eventos

La integración de ECR no incluye ningún evento.

### Checks de servicio

La integración de ECR no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-ecr
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecr/amazon_ecr_metadata.csv
[5]: https://docs.datadoghq.com/es/help/