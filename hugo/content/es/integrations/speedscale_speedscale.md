---
algolia:
  subcategory: Integraciones del Marketplace
app_id: speedscale-speedscale
app_uuid: beb5efb1-63d5-4030-840d-7dbf6a92a4d6
assets: {}
author:
  homepage: https://speedscale.com
  name: Speedscale
  sales_email: datadog-sales@speedscale.com
  support_email: support@speedscale.com
  vendor_id: speedscale
categories:
- contenedores
- Kubernetes
- marketplace
- tests
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: speedscale_speedscale
integration_id: speedscale-speedscale
integration_title: Speedscale
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: speedscale_speedscale
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: licencia de software
  short_description: Cuota mensual para acceder a Speedscale Pro, hasta 100 repeticiones
    y 10 GB de tráfico
  unit_price: 999
public_title: Speedscale
short_description: 'Plataforma de reproducción del tráfico para tests de carga Kubernetes '
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Contenedores
  - Categoría::Kubernetes
  - Categoría::Marketplace
  - Categoría::Tests
  - Oferta::Licencia de software
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Plataforma de reproducción del tráfico para tests de carga Kubernetes
  media:
  - caption: Captura del tráfico de Speedscale
    image_url: images/spd-1-traffic-capture.png
    media_type: imagen
  - caption: Informe de repetición de Speedscale
    image_url: images/spd-2-report.png
    media_type: imagen
  - caption: Integración Speedscale con el dashboard de Datadog
    image_url: images/spd-3-datadog-dashboard.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/stress-test-kubernetes-with-speedscale/
  - resource_type: Documentación
    url: https://docs.speedscale.com/
  support: README.md#Soporte
  title: Speedscale
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
Muchas empresas tienen dificultades para detectar los problemas en sus servicios de nube antes de que afecten a los clientes. Para los desarrolladores, la escritura de tests es manual y requiere mucho tiempo. Speedscale ayuda a los equipos de ingeniería y DevOps de Kubernetes a confiar en el rendimiento del nuevo código en situaciones reales. Speedscale puede recopilar y reproducir el tráfico de la API, simular la carga o el caos y medir la latencia, el rendimiento, la saturación y los errores antes de lanzar el código. La repetición del tráfico de Speedscale es una alternativa a los métodos de prueba legacy, que tardan días o semanas en ejecutarse y no se adaptan bien a las arquitecturas modernas.

Para publicar los resultados de las repeticiones de tráfico de Speedscale en Datadog, instala la [integración Speedscale][1]. Esta integración te permite combinar tus datos de observabilidad de Datadog con los resultados de una repetición particular de Speedscale para investigar la causa de origen del bajo rendimiento.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Speedscale a través de los siguientes canales:

- Correo electrónico: [support@speedscale.com][5]
- Slack: [Comunidad][4]

### Leer más

Más enlaces, artículos y documentación útiles:

- [Realiza un test bajo estrés de tu aplicación Kubernetes con la oferta Speedscale del Marketplace Datadog][6].
- [Documentación de Speedscale][3]

[1]: https://app.datadoghq.com/integrations/speedscale
[3]: https://docs.speedscale.com/
[4]: https://slack.speedscale.com/
[5]: mailto:support@speedscale.com
[6]: https://www.datadoghq.com/blog/stress-test-kubernetes-with-speedscale/
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/speedscale-speedscale" target="_blank">adquiere esta aplicación en el Marketplace</a>.