---
aliases:
- /es/integrations/google_cloud_application_load_balancer
app_id: google-cloud-application-load-balancer
categories:
- nube
- google cloud
- seguridad
custom_kind: integración
description: Protege tus Google Cloud Application Load Balancers con Datadog App &
  API Protection.
further_reading:
- link: https://docs.datadoghq.com/security/application_security/setup/gcp/service-extensions/?source=gcp-alb-tile-deepdive
  tag: documentación
  text: Activación de App and API Protection para las extensiones de servicio de GCP
- link: https://www.datadoghq.com/blog/datadog-application-security-management/
  tag: blog
  text: Blog de Google Cloud Application Load Balancer
- link: https://cloud.google.com/service-extensions/docs/overview
  tag: otros
  text: Información general de las extensiones de servicio  |  Google Cloud
integration_version: 1.0.0
media:
- caption: Datadog App & API Protection proporciona seguridad de defensa en profundidad
    mediante la monitorización tanto del Google Cloud Application Load Balancer como
    de los servicios de backend, detectando y alertando sobre exploits y ataques reales.
  image_url: images/image1.png
  media_type: imagen
- caption: App & API Protection proporciona señales de seguridad detalladas que muestran
    los detalles de los ataques, los tramos de traza correlacionados y las acciones
    de respuesta, como el bloqueo de IP en el nivel del equilibrador de carga.
  image_url: images/image2.png
  media_type: imagen
- caption: Datadog App & API Protection proporciona visibilidad a nivel de borde de
    los intentos de ataque, mostrando cómo se detectan y bloquean las solicitudes
    maliciosas en el Google Cloud Application Load Balancer antes de que puedan llegar
    a tus servicios de backend.
  image_url: images/image3.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Google Cloud Application Load Balancer
---
## Información general

Datadog App and API Protection extiende la visibilidad y la mitigación de amenazas en línea a tus Google Cloud Application Load Balancers utilizando las [extensiones de servicio de Google Cloud](https://cloud.google.com/service-extensions/docs/overview).

Con esta integración, puedes detectar y bloquear ataques, como el abuso de API, la explotación de la lógica de negocio y las amenazas a la capa de código, justo en el borde de tu infraestructura de nube.

Esta integración proporciona:

- Detección y bloqueo de amenazas en línea en el equilibrador de carga de aplicaciones mediante Datadog Security Signals
- Información en tiempo real sobre los ataques a la capa de aplicación
- Refuerzo de borde contra amenazas de API OWASP, relleno de credenciales, ataques de inyección, etc.

## Configuración

### Instalación

Consulta [Habilitar App and API Protection para extensiones de servicio de GCP](https://docs.datadoghq.com/security/application_security/setup/gcp/service-extensions/?source=gcp-alb-tile-setup) para obtener instrucciones de instalación.

### Validación

Para validar la instalación de esta integración, envía patrones de ataque conocidos a tu equilibrador de carga de aplicaciones. Por ejemplo, puedes activar la regla Security Scanner Detected ejecutando el siguiente script curl:

```sh
for ((i=1;i<=250;i++)); 
do
    # Target existing service's routes
    curl https://your-load-balancer-url/existing-route -A dd-test-scanner-log;

    # Target non-existing service's routes
    curl https://your-load-balancer-url/non-existing-route -A dd-test-scanner-log;
done
```

Unos minutos después de activar la extensión del servicio y enviar los patrones de ataque conocidos, la información sobre amenazas aparece en Application Signals Explorer.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).