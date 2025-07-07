---
categories:
- aws
- nube
- configuración y despliegue
- recopilación de logs
- suministro
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de AWS Certificate Manager.
doc_link: https://docs.datadoghq.com/integrations/amazon_certificate_manager/
draft: false
git_integration_title: amazon_certificate_manager
has_logo: true
integration_id: ''
integration_title: AWS Certificate Manager
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_certificate_manager
public_title: Integración de Datadog y AWS Certificate Manager
short_description: Rastrea métricas clave de AWS Certificate Manager.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

AWS Certificate Manager te permite aprovisionar, gestionar y desplegar certificados SSL/TLS para su uso con servicios de AWS y recursos internos conectados.

Activa esta integración para ver todas tus métricas de Certificate Manager en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de integración de AWS][2], asegúrate de que `CertificateManager` está activada en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y AWS Certificate Manager][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-certificate-manager" >}}


### Eventos

La integración de AWS Certificate Manager admite la caducidad de certificados y los eventos de cambio de estado de EventBridge.

### Checks de servicio

La integración de AWS Certificate Manager no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-certificate-manager
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_certificate_manager/amazon_certificate_manager_metadata.csv
[5]: https://docs.datadoghq.com/es/help/