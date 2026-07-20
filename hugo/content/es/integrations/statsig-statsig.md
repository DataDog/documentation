---
algolia:
  subcategory: Integraciones de Marketplace
app_id: statsig-statsig
app_uuid: 289b74cb-ad37-4a0e-98f5-4d5c6f3e3d19
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: statsig.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10188
    source_type_name: Licencia Statsig
author:
  homepage: https://www.statsig.com
  name: Statsig
  sales_email: serviceadmin@statsig.com
  support_email: support@statsig.com
  vendor_id: statsig
categories:
- configuración y despliegue
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: statsig-statsig
integration_id: statsig-statsig
integration_title: Statsig
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: statsig-statsig
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.statsig.log
  product_id: statsig
  short_description: Precio unitario por mil eventos de logs de Statsig
  tag: evento
  unit_label: Mil eventos de logs de Statsig
  unit_price: 0.1
public_title: Statsig
short_description: Crear, medir y distribuir más rápidamente las funciones que más
  gustan a los clientes
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Configuración y despliegue
  - Category::Marketplace
  - Oferta::Licencia de software
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Crear, medir y distribuir más rápidamente las funciones que más gustan
    a los clientes
  media:
  - caption: Desplegar y orientar de forma segura nuevas funciones mediante Feature
      Gates
    image_url: images/tile_gates.png
    media_type: imagen
  - caption: Observar el impacto de tus funciones en tus métricas topline a partir
      de los resultados de Pulse generados automáticamente para cualquier Feature
      Gate
    image_url: images/tile_pulse.png
    media_type: imagen
  - caption: Identificar las funciones que afectan positiva o negativamente a tus
      métricas mediante Ultrasound
    image_url: images/tile_ultrasound.png
    media_type: imagen
  - caption: Identificar cómo los despliegues de funciones afectan al resto de tu
      pila de stack tecnológico de producción en Datadog
    image_url: images/tile_datadog_dashboard.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/
  support: README.md#Soporte
  title: Statsig
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

[Statsig][1] ayuda a las empresas a realizar tests A/B de características en producción antes de desplegarlas, evitando debates sobre el producto y costosos errores de envío. Pero lo que hace único a Statsig es que, sólo registrando eventos, los experimentos se ejecutan automáticamente, para mostrarte el impacto de todas las nuevas funciones, sin necesidad de una configuración adicional. Otras plataformas dificultan la tarea de saber cómo está funcionando una característica, lo que te obliga a crear métricas, a calcular el tamaño de las muestras y a segmentar a los usuarios para cada experimento que quieres realizar. Statsig es diferente: automatizamos el trabajo pesado para que los tests A/B se ejecuten siempre, de forma automática, y así siempre sabrás cómo están funcionando tus características.

Como equipo de antiguos ingenieros de Facebook, creamos Statsig para ofrecer a todo el mundo la misma infraestructura que permite a cientos de equipos lanzar miles de funciones con precisión.

Esta oferta del Marketplace de Datadog proporciona acceso a la plataforma de Statsig. Si ya eres cliente de Statsig, puedes conectar tu cuenta a Datadog mediante la [integración Statsig en Datadog][2] para configurar la integración.

{{< img src="marketplace/statsig-statsig/images/statsig_pulse.png" alt="Pulse Statsig" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_gates.png" alt="Gates Statsig" >}}

{{< img src="marketplace/statsig-statsig/images/statsig_metrics.png" alt="Métricas Statsig" >}}

## Datos recopilados

### Métricas

Para ver la lista de métricas proporcionadas por esta integración, consulta [metadata.csv][3].

### Eventos

La integración Statsig envía eventos de cambio de configuración en Statsig a Datadog. Por ejemplo, feature gates nuevas o actualizadas o nuevas integraciones habilitadas.

## Soporte

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con el servicio de asistencia de Statsig a través de los siguientes canales:

- Correo electrónico: [support@statsig.com][4] 
- Asistencia: [Statsig][5]

### Leer más

Más enlaces, artículos y documentación útiles:

- [Monitorización de versiones de funciones con la oferta de Statsig en el Marketplace de Datadog][6]

[1]: https://www.statsig.com
[2]: https://app.datadoghq.com/integrations/statsig
[3]: https://console.statsig.com/sign_up
[4]: mailto:support@statsig.com
[5]: https://www.statsig.com/contact
[6]: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/

---
Esta aplicación está disponible a través del Marketplace de Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/statsig-statsig" target="_blank">adquiere esta aplicación en el Marketplace</a>.