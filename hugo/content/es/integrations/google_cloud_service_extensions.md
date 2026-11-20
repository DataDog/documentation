---
app_id: google-cloud-service-extensions
app_uuid: 6494aa02-c9a3-4ee8-ae49-b1665af16bbf
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- google cloud
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_service_extensions
integration_id: google-cloud-service-extensions
integration_title: Extensiones del servicio Google Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_service_extensions
public_title: Extensiones del servicio Google Cloud
short_description: Protege tus balanceadores de carga de Google Cloud con Datadog
  App & API Protection.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Nube
  - Categoría::Google Cloud
  - Categoría::Seguridad
  - Tipo de datos enviados::Trazas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Protege tus balanceadores de carga de Google Cloud con Datadog App
    & API Protection.
  media:
  - caption: Datadog App & API Protection ofrece la seguridad de una defensa en profundidad
      mediante la monitorización tanto del balanceador de carga de Google Cloud como
      de los servicios backend, detectando y alertando sobre exploits y ataques reales.
    image_url: images/image1.png
    media_type: imagen
  - caption: App & API Protection proporciona señales de seguridad detalladas que
      muestran detalles de los ataques, tramos (spans) de trazas (traces) correlacionados
      y acciones de respuesta, como el bloqueo de IP a nivel del balanceador de carga.
    image_url: images/image2.png
    media_type: imagen
  - caption: Datadog App & API Protection proporciona visibilidad a nivel de borde
      de los intentos de ataque, mostrando cómo se detectan y bloquean las solicitudes
      maliciosas en el balanceador de carga de Google Cloud antes de que puedan llegar
      a tus servicios backend.
    image_url: images/image3.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: documentación
    url: https://docs.datadoghq.com/security/application_security/setup/gcp/service-extensions/?source=gcp-se-tile-deepdive
  - resource_type: blog
    url: https://www.datadoghq.com/blog/datadog-application-security-management/
  - resource_type: otros
    url: https://cloud.google.com/service-extensions/docs/overview
  support: README.md#Soporte
  title: Extensiones del servicio Google Cloud
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Datadog App and API Protection amplía la visibilidad y la mitigación de amenazas en línea a tus balanceadores de carga de Google Cloud mediante [extensiones de servicio Google Cloud][1].

Con esta integración, puedes detectar y bloquear ataques, como el abuso de API, la explotación de la lógica de negocio y las amenazas a la capa del código, justo en el borde de tu infraestructura de nube.

Esta integración proporciona:
- Detección y bloqueo de amenazas en línea en el balanceador de carga mediante señales de seguridad de Datadog
- Información en tiempo real sobre los ataques a la capa de la aplicación
- Aplicación de políticas en el borde contra las amenazas a la API OWASP, el relleno de credenciales, los ataques de inyección, etc.

## Configuración

### Instalación

Consulta [Habilitar App and API Protection para extensiones de servicio de GCP][2] para obtener instrucciones de instalación.

### Validación

Para validar la instalación de esta integración, envía patrones de ataque conocidos a tu balanceador de carga. Por ejemplo, puedes activar la regla Security Scanner Detected ejecutando el siguiente script curl:

```sh
for ((i=1;i<=250;i++)); 
do
    # Target existing service's routes
    curl https://your-load-balancer-url/existing-route -A dd-test-scanner-log;

    # Target non existing service's routes
    curl https://your-load-balancer-url/non-existing-route -A dd-test-scanner-log;
done
```

Unos minutos después de activar la extensión del servicio y enviar los patrones de ataque conocidos, la información sobre amenazas aparece en el Explorador de señales de aplicaciones.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://cloud.google.com/service-extensions/docs/overview
[2]: https://docs.datadoghq.com/es/security/application_security/setup/gcp/service-extensions/?source=gcp-se-tile-setup
[3]: https://docs.datadoghq.com/es/help/