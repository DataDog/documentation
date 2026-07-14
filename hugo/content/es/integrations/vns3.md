---
app_id: vns3
app_uuid: f6ffc9ae-a65d-41e4-8abd-c7194fc39a9a
assets:
  dashboards:
    Cohesive: assets/dashboards/VNS3ExampleDashboard-20240923.json
  integration:
    auto_install: verdadero
    configuration: {}
    events:
      creates_events: falso
    metrics:
      check:
      - vns3.peering
      - vns3.overlay.clients
      - vns3.overlay.links
      - vns3.ipsec
      - vns3.interfaces
      - vns3.sys_admin.remote_support
      metadata_path: metadata.csv
      prefix: vns3.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10005
    source_type_name: VNS3
author:
  homepage: https://cohesive.net/
  name: Redes cohesivas
  sales_email: sales@cohesive.net
  support_email: support@cohesive.net
categories:
- cloud
- network
- security
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vns3/README.md
display_on_public_website: true
draft: false
git_integration_title: vns3
integration_id: vns3
integration_title: VNS3
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: vns3
public_title: VNS3
short_description: Dispositivo de red en la nube para la conectividad y seguridad
  de las aplicaciones.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Network
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Dispositivo de red en la nube para la conectividad y seguridad de las
    aplicaciones.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: VNS3
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Obtén información del estado del sistema y de red desde el controlador Cohesive Networks VNS3.

- Check de estado de enlaces de interconexión:

  ![interconexión][1]

- Check de estado de clientes overlay:

  ![clientes][2]

- Check de estado de los túneles IPSec:

  ![ipsec][3]

- Check de estado del enlace superpuesto:

  ![enlaces][4]

- Check de estado del soporte remoto:

  ![remote_support][5]

- Check de estado de la interfaz:

  ![interface_status][6]

## Configuración

### Configuración

Despliega y configura el complemento de Cohesive Networks Datadog de acuerdo con la documentación [Detalles del complemento del Datadog Agent][7].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "vns3" >}}


También se admite flujo de red, informe de logs y encuesta de SNMP.

### Eventos

La integración de VNS3 no incluye ningún evento.

### Checks de servicio

La integración de VNS3 no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][9] o [el soporte de Cohesive Networks][10].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/peering.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/clients.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/ipsec.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/links.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/remotesupport.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/interfaces.png
[7]: https://docs.cohesive.net/docs/network-edge-plugins/datadog/
[8]: https://github.com/DataDog/integrations-extras/blob/master/vns3/metadata.csv
[9]: https://docs.datadoghq.com/es/help/
[10]: https://support.cohesive.net/