---
app_id: "vns3"
app_uuid: "f6ffc9ae-a65d-41e4-8abd-c7194fc39a9a"
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: "vns3.peering"
      metadata_path: "metadata.csv"
      prefix: "vns3."
    service_checks:
      metadata_path: "assets/service_checks.json"
    source_type_id: !!int "10005"
    source_type_name: "VNS3"
author:
  homepage: "https://github.com/DataDog/integrations-extras"
  name: "Redes cohesivas"
  sales_email: "help@datadoghq.com"
  support_email: "help@datadoghq.com"
categories:
- "cloud"
- "network"
- "security"
custom_kind: "integración"
dependencies:
- "https://github.com/DataDog/integrations-extras/blob/master/vns3/README.md"
display_on_public_website: true
draft: false
git_integration_title: "vns3"
integration_id: "vns3"
integration_title: "VNS3"
integration_version: ""
is_public: true
manifest_version: "2.0.0"
name: "vns3"
public_title: "VNS3"
short_description: "Dispositivo de red en la nube para la conectividad y seguridad de aplicaciones."
supported_os:
- "linux"
- "windows"
- "macos"
tile:
  changelog: "CHANGELOG.md"
  classifier_tags:
  - "Category::Cloud"
  - "Category::Network"
  - "Category::Security"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integration"
  configuration: "README.md#Setup"
  description: "Dispositivo de red en la nube para la conectividad y seguridad de aplicaciones."
  media: []
  overview: "README.md#Overview"
  support: "README.md#Support"
  title: "VNS3"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Obtén información de estado sobre los endpoints/túneles IPSec de tu topología VNS3, interconexión VNS3 y clientes overlay.

- Check de estado de enlaces de interconexión:

  ![interconexión][1]

- Check de estado de clientes overlay:

  ![clientes][2]

- Check de estado de los túneles IPSec:

  ![ipsec][3]

## Configuración

### Configuración

Para capturar métricas, despliega un contenedor de Datadog de redes cohesivas, configura el cortafuegos VNS3 y configura el contenedor. Para obtener más detalles, consulta la [Guía de redes cohesivas][4] o ve el [vídeo][5].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "vns3" >}}


### Eventos

El check de VNS3 no incluye ningún evento.

### Checks de servicio

El check de VNS3 no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/peering.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/clients.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/ipsec.png
[4]: https://docs.cohesive.net/docs/network-edge-plugins/datadog/
[5]: https://youtu.be/sTCgCG3m4vk
[6]: https://github.com/DataDog/integrations-extras/blob/master/vns3/metadata.csv
[7]: https://docs.datadoghq.com/help/

