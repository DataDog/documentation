---
algolia:
  subcategory: Integraciones de Marketplace
app_id: trek10-coverage-advisor
app_uuid: 2faacd70-a192-4a28-8b36-e55298d7b3b4
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: trek10.coverage.aws_metric_count
      metadata_path: metadata.csv
      prefix: trek10.coverage
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10114
    source_type_name: Asesor de cobertura Trek10 AWS
  monitors:
    New unmonitored metric available: assets/monitors/monitor_new.json
    New unmonitored metric discovered: assets/monitors/monitor_existing.json
author:
  homepage: https://www.trek10.com
  name: Trek10
  sales_email: signup-trek10-coverage-advisor@trek10.com
  support_email: trek10-coverage-advisor@trek10.com
  vendor_id: trek10
categories:
- marketplace
- aws
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: asesor_cobertura_trek10
integration_id: asesor_cobertura_trek10
integration_title: Asesor de cobertura Trek10 AWS
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: asesor_cobertura_trek10
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: asesor_cobertura
  short_description: Tarifa plana para el Asesor de cobertura Trek10 AWS
  unit_price: 100
public_title: Asesor de cobertura Trek10 AWS
short_description: Comprueba más de 120 métricas de AWS para encontrar vacíos de cobertura
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Marketplace
  - Categoría::AWS
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Eventos
  configuration: README.md#Configuración
  description: Comprueba más de 120 métricas de AWS para encontrar vacíos de cobertura
  media:
  - caption: Dashboard de Trek10
    image_url: images/1600px-900px_maindashview_trek10_DDG_image.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Asesor de cobertura Trek10 AWS
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general
El Asesor de cobertura monitoriza métricas AWS CloudWatch críticas en tu cuenta de Datadog. Se integra a la base de datos de recomendaciones de monitorización de Trek10, que se actualiza continuamente. y refleja nuestros años de experiencia en operaciones nativas en la nube con Datadog y AWS. Gracias al informe de cobertura, el dashboard y las alertas de nuevas recomendaciones, podrás mantener los monitores al día con tu infraestructura AWS a medida que evoluciona.

Después de registrarte, esta integración copia un dashboard en tu cuenta de Datadog y expone dos monitores de eventos en la página de monitores Datadog recomendados.

El dashboard muestra el estado de monitorización de tu cuenta Datadog y te permite generar un informe sobre métricas monitorizadas y no monitorizadas. El primer monitor de eventos te avisa cuando Trek10 descubre nuevas métricas de AWS CloudWatch importantes, sin los monitores correspondientes. El segundo monitor de eventos te informa de las nuevas métricas de CloudWatch añadidas a nuestra lista de recomendaciones que coinciden con los servicios AWS que utilizas.



*¿Tienes un pedido específico asociado a esta herramienta de Datadog, buscas servicios gestionados 24/7 para AWS con una plataforma integrada en Datadog o necesitas lograr un dominio de AWS o Datadog? Ponte en contacto con nuestro [equipo de ventas](https://trek10.com/contact) y descubramos cómo podemos ayudarte*

### Métricas
* Trek10 envía una métrica cada noche, trek10.coverage.aws_metric_count, que se puede utilizar para ver cuántas métricas se están ingiriendo actualmente en tu cuenta de Datadog, para los que no hay monitores. La métrica tendrá la etiqueta (tag) `metric_type` que se puede filtrar por los valores `all_metrics`, `metrics_monitored` y `monitoring_recommendations`. 


### Eventos
* Trek10 también envía eventos cuando encontramos servicios no monitorizados. El evento te redirigirá al dashboard principal para que puedas ver las recomendaciones recientes y generar un informe.


### Monitores
* Trek10 proporciona dos monitores para avisarte cuando tienes servicios no monitorizados.

### Dashboards
* Trek10 proporciona un dashboard centralizado y muy claro que te permite ver un recuento de métricas no monitorizadas, ver las recomendaciones recientes, generar un informe en PDF de todas las recomendaciones y controlar si la integración comprueba tu cuenta cada noche en busca de nuevas recomendaciones.

### Uso
El principal uso de esta integración es permitirte ver rápidamente qué métricas de AWS tienes en su cuenta, para los que no tienes monitores correspondientes. Puedes comprobarlo en el dashboard semanalmente y generar un informe o puedes configurar monitores para recibir alertas diarias, si prefieres este método de notificación.

### Información de proveedores
* Trek10 
* Biografía: Somos gurús técnicos y creadores de corazón. Como usuarios de AWS y Datadog desde hace mucho tiempo, hemos ayudado a numerosas empresas a adoptar ambos con servicio profesional y compromisos de capacitación. Utilizamos principalmente Datadog como herramienta en nuestra gestión de servicios para AWS. Hemos tomado una herramienta interna que nos permite saber cuándo necesitamos añadir monitores a una de las cuentas de nuestros clientes y la hemos modificado para que pueda utilizarla.
* Sitio web: trek10.com

## Agent
* Clonaremos el dashboard y el monitor en tu cuenta en el momento de la instalación. Utilizaremos la clave de API proporcionada en el momento de la instalación. Si no puedes utilizar la clave de API proporcionada, ponte en contacto con nosotros en trek10-coverage-advisor@trek10.com. Del mismo modo, si tienes algún problema o pregunta sobre la integración, abre un ticket enviando un correo electrónico a trek10-coverage-advisor@trek10.com (y sigue las instrucciones enviadas por correo electrónico).
* También estaremos encantados de responder a cualquier pregunta sobre operaciones, monitorización y desarrollo de AWS. Sólo tienes que ponerte en contacto con nosotros:
    * correo electrónico (asistencia): trek10-coverage-advisor@trek10.com
    * correo electrónico (otras preguntas): info@trek10.com
    * página web: https://www.trek10.com/contact








---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/trek10-coverage-advisor" target="_blank">adquiere esta aplicación en el Marketplace</a>.