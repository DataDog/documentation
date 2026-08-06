---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-ibm-cloud
app_uuid: 4ac8d719-9aff-4b83-8bb4-8341ccc7b74e
assets:
  dashboards:
    'RapDev IBM Cloud: Auxiliary Services': assets/dashboards/rapdev_ibm_cloud_auxiliary_services.json
    'RapDev IBM Cloud: Code Engine': assets/dashboards/rapdev_ibm_cloud_code_engine.json
    'RapDev IBM Cloud: Containers API': assets/dashboards/rapdev_ibm_cloud_containers_api.json
    'RapDev IBM Cloud: VPC API': assets/dashboards/rapdev_ibm_cloud_vpc_api.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.ibm_cloud.vpc.count
      metadata_path: metadata.csv
      prefix: rapdev.ibm_cloud
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10415
    source_type_name: RapDev IBM Cloud
  logs: {}
  monitors:
    IBM Cloud Integration Unable to Run: assets/monitors/ibm_cloud_api_connection.json
author:
  contact_link: https://meetings.hubspot.com/ewilliams/rapdev-marketplace
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- nube
- rastreo
- suministro
- orquestación
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_ibm_cloud
integration_id: rapdev-ibm-cloud
integration_title: IBM Cloud
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_ibm_cloud
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.ibm_cloud
  product_id: ibm-cloud
  short_description: Precio unitario por entidad IBM Cloud facturable
  tag: entidad_facturable
  unit_label: Entidad facturable VPC, K8s o Code Engine
  unit_price: 1
public_title: IBM Cloud
short_description: Monitorizar los recursos y la actividad de tu cuenta IBM Cloud
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Marketplace
  - Categoría::Nube
  - Categoría::Contenedores
  - Categoría::Suministro
  - Categoría::Orquestación
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorizar los recursos y la actividad de tu cuenta IBM Cloud
  media:
  - caption: Dashboard de servicios auxiliares
    image_url: images/auxiliary_dash.png
    media_type: imagen
  - caption: Dashboard del motor de código
    image_url: images/code_engine_dash.png
    media_type: imagen
  - caption: Dashboard de la API de contenedores
    image_url: images/containers_api_dash.png
    media_type: imagen
  - caption: Dashboard de API VPC (pt. 1)
    image_url: images/vpc_api_dash.png
    media_type: imagen
  - caption: Dashboard de API VPC (pt. 2)
    image_url: images/vpc_api_dash_2.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: IBM Cloud
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
La integración IBM Cloud te permite monitorizar las API disponibles en tus cuentas IBM Cloud. Al extraer información de metadatos y detalles sobre diferentes auxiliares servicios, esta integración puede ayudar a diferentes equipos, como los de seguridad, conformidad, redes, control de calidad o desarrollo, a garantizar que su infraestructura de nube esté continuamente en buen estado, sea segura y respete los estándares normativos.

La integración admite las siguientes API IBM Cloud:
- API Kubernetes
- API de VPC
- Puertas de enlace de tránsito
- Motor de código
- Proveedor de enlace directo
- Gestor de secretos
- Almacenamiento de objetos en la nube
- Administración de flujos de eventos
- Registro de contenedores


## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envía una [nota](mailto:support@rapdev.io) a RapDev y la crearemos.*

[1]: https://docs.datadoghq.com/es/agent/guide/agent-v6-python-3/?tab=hostagent
[2]: https://cloud.ibm.com/login
[3]: https://cloud.ibm.com/docs/account?topic=account-userapikey&interface=ui#create_user_key
[4]: https://cloud.ibm.com/docs/key-protect?topic=key-protect-retrieve-instance-ID&interface=ui
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information 

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-ibm-cloud" target="_blank">adquiera esta aplicación en el Marketplace</a>.