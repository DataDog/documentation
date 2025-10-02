---
app_id: gigamon
app_uuid: 041cf2fe-f391-4d8b-930c-b700c648c683
assets:
  dashboards:
    Gigamon Dashboard: assets/dashboards/gigamon_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17453472
    source_type_name: gigamon
author:
  homepage: https://gigamon.com
  name: Gigamon
  sales_email: sales@gigamon.com
  support_email: alliances@gigamon.com
categories:
- aws
- azure
- la red
- seguridad
- kubernetes
- rastreo
- google cloud
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gigamon/README.md
display_on_public_website: true
draft: false
git_integration_title: gigamon
integration_id: gigamon
integration_title: Gigamon
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: gigamon
public_title: Gigamon
short_description: Observabilidad profunda de todo el tráfico de aplicaciones en infraestructura
  en la nube, virtual y física
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Category::Azure
  - Category::Network
  - Category::Security
  - Categoría::Kubernetes
  - Categoría::Contenedores
  - Category::Google Cloud
  - Supported OS::Linux
  - Supported OS::Windows
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Observabilidad profunda de todo el tráfico de aplicaciones en infraestructura
    en la nube, virtual y física
  media:
  - caption: Dashboard de Gigamon para Datadog
    image_url: images/gd1.png
    media_type: imagen
  - caption: Dashboard de Gigamon para Datadog
    image_url: images/gd2.png
    media_type: imagen
  - caption: Dashboard de Gigamon para Datadog
    image_url: images/gd3.png
    media_type: imagen
  - caption: Dashboard de Gigamon para Datadog
    image_url: images/gigamondashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Gigamon
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general
[Gigamon][1] Application Metadata Intelligence (AMI) potencia tus herramientas de Observability, Security Information y Event Management (SIEM) y Network Performance Monitoring con atributos de metadatos críticos a través de miles de aplicaciones empresariales, de consumo y de TI y servicios. Obtén una visibilidad profunda de las aplicaciones para localizar rápidamente los cuellos de botella en el rendimiento, los problemas de calidad y los posibles riesgos de seguridad en la red. AMI de Gigamon te ayuda a monitorizar y gestionar aplicaciones digitales complejas para tus iniciativas de transformación digital. Esto se puede conseguir a través de la solución Gigamon, enviando los metadatos de la AMI a Datadog. Algunos beneficios a destacar son información valiosa accionable, impulso de la postura de seguridad, etc.

## Configuración
Gigamon envía metadatos de AMI [AMX][2] a la API de Datadog utilizando HTTP `POST`. 

### Instalación

GigaVUE V Series Node es una máquina virtual que se ejecuta en infraestructura del cliente que procesa y distribuye el tráfico de red. Gigamon Application Metadata Exporter (AMX) convierte la salida de la AMI en formato CEF a JSON y la envía a Datadog. La aplicación AMX sólo puede desplegarse en un Serie V Node y puede conectarse a la AMI que se ejecuta en un nodo físico o en una máquina virtual. La aplicación AMX y la AMI son gestionadas por GigaVUE-FM. 

1. Después de instalar AMX en tu entorno, crea una sesión de monitorización en [FM][3]. 
2. Edita el exportador y proporciona los siguientes campos obligatorios:
    a. Alias: nombre del exportador (cadena).
    b. Ingestor: especifica el puerto como "514" y el tipo como "ami".
    c. Exportación de herramientas en la nube: crea una nueva herramienta exportadora seleccionando '+' y añade detalles como se muestra en el siguiente diagrama:
    ![Exportador de AMI][4]
    ![Exportador de herramientas en la nube][5]


## Datos recopilados

### Atributos de los metadatos
La inspección profunda de paquetes de Gigamon extrae más de 7500 atributos de metadatos de aplicaciones y los reenvía a Datadog. Gigamon Application Metadata Protobook proporciona una lista completa de los protocolos compatibles y sus atributos. Estos protocolos también se pueden ver agrupados por etiquetas (tags), familia y método de clasificación. 

Gigamon AMX convierte la salida de la AMI en formato CEF a JSON y la envía a Datadog.

Puedes acceder a Application Metadata Protobook desde [GigaVUE FM][6].

## Solucionar problemas
¿Necesitas ayuda? Ponte en contacto con el [soporte de Gigamon][7].


[1]: http://gigamon.com
[2]: https://docs.gigamon.com/doclib66/Content/GV-Cloud-V-Series-Applications/AMX_intro.html
[3]: https://docs.gigamon.com/doclib66/Content/GigaVUE_Cloud_Suites.html?tocpath=GigaVUE%20Cloud%20Suite%7C_____0
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gigamon/images/gigamon1.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gigamon/images/gigamon2.png
[6]: https://docs.gigamon.com/doclib66/Content/GV-GigaSMART/Application%20Protocol%20Bundle.html
[7]: https://www.gigamon.com/support/support-and-services/contact-support.html