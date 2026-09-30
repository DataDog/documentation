---
app_id: sosivio
app_uuid: d98f7912-e5a3-48bc-b63e-612d835bf6b4
assets:
  dashboards:
    sosivio_overview.json: ./assets/dashboards/sosivio_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: sosivio.healthchecks
      metadata_path: metadata.csv
      prefix: sosivio.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10285
    source_type_name: Sosivio
author:
  homepage: https://www.sosiv.io
  name: Sosivio
  sales_email: sales@sosiv.io
  support_email: support@sosiv.io
categories:
- alertas
- contenedores
- Kubernetes
- red
- notificaciones
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sosivio/README.md
display_on_public_website: true
draft: false
git_integration_title: sosivio
integration_id: sosivio
integration_title: Sosivio
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sosivio
public_title: Sosivio
short_description: Obtén respuestas. No datos. Resolución predictiva de problemas
  para Kubernetes.
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Alertas
  - Categoría::Contenedores
  - Categoría::Kubernetes
  - Categoría::Red
  - Categoría::Notificaciones
  - Categoría::Orquestación
  - Sistema operativo compatible::Linux
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Obtén respuestas. No datos. Resolución predictiva de problemas para
    Kubernetes.
  media:
  - caption: Dashboard Sosivios en Datadog
    image_url: images/datadog-sosivio-dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Sosivio
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Sosivio es una plataforma de resolución predictiva de problemas, creada específicamente para entornos y aplicaciones Kubernetes. Sosivio proporciona herramientas para la resolución predictiva de problemas, la determinación de causas raíz y la corrección instantánea de cualquier fallo en entornos Kubernetes. Empieza a observar instantáneamente todos los tipos de Kubernetes con métricas en tiempo real y checks de estado del clúster, y utiliza la IA lean para predecir y prevenir fallos críticos antes de que aparezcan.

La integración de Sosivio de Datadog permite a los usuarios ver las alertas de fallo de Sosivio directamente en dashboards Datadog y ser redirigidos instantáneamente a la interfaz de usuario de Sosivio para remediar esos fallos (con licencia Sosivio Premium). También puedes añadir contexto a las señales de Datadog con la determinación de la causa raíz de los fallos críticos de Sosivio.

## Configuración

Si no tienes una cuenta de Sosivio, [crea una cuenta][1] e inscríbete para una prueba gratuita de 4 semanas de Sosivio Premium, directamente en nuestro sitio web (no se requiere tarjeta de crédito). Al final de las 4 semanas de prueba, tu licencia se convierte en la versión Sosivio Community, que es gratuita para siempre. Una vez configurada la cuenta, ya puedes empezar a utilizar la integración Sosivio en Datadog.


Sosivio se instala en un espacio de nombres (denominado "sosivio") que crea todos los componentes necesarios para el producto. 


### Instalación

1. En la página de configuración del dashboard Sosivio, añade tu [clave de API Datadog][2] y URL Datadog (si no es el sitio predeterminado datadoghq.com). Para obtener más información, consulta los [sitios Datadog][3].
2. Haz clic en **Install* (Instalar).

Para obtener más información, consulta la [documentación de Sosivio][4].

## Compatibilidad

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5] o con [Sosivio][6].


[1]: https://www.sosiv.io/try-sosivio
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.datadoghq.com/es/getting_started/site/
[4]: https://docs.sosiv.io
[5]: https://docs.datadoghq.com/es/help/
[6]: mailto:info@sosiv.io