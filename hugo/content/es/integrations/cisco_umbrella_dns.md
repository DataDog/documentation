---
app_id: cisco-umbrella-dns
app_uuid: 9f98de10-9c98-4601-ae36-cbe25c4be018
assets:
  dashboards:
    Cisco Umbrella DNS - DNS Traffic: assets/dashboards/cisco_umbrella_dns_dns_traffic.json
    Cisco Umbrella DNS - Proxied Traffic: assets/dashboards/cisco_umbrella_dns_proxied_traffic.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10441
    source_type_name: cisco_umbrella_dns
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: ayuda@datadoghq.com
categories:
- recopilación de logs
- la red
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_umbrella_dns/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_umbrella_dns
integration_id: cisco-umbrella-dns
integration_title: Cisco Umbrella DNS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_umbrella_dns
public_title: Cisco Umbrella DNS
short_description: Visualiza el tráfico DNS y proxy de Cisco Umbrella DNS. Conéctate
  a Cloud SIEM.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Red
  - Categoría::Seguridad
  - Tipo de datos enviados::Logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Visualiza el tráfico DNS y proxy de Cisco Umbrella DNS. Conéctate a
    Cloud SIEM.
  media:
  - caption: Cisco Umbrella DNS - Tráfico DNS
    image_url: images/cisco_umbrella_dns_dns_traffic.png
    media_type: imagen
  - caption: Cisco Umbrella DNS - Tráfico proxy
    image_url: images/cisco_umbrella_dns_proxied_traffic.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Cisco Umbrella DNS
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[Cisco Umbrella][1] es la plataforma líder para la monitorización de la seguridad DNS de red. La seguridad de la capa DNS de Umbrella ofrece una forma rápida y sencilla de mejorar la seguridad, proporcionando mayor visibilidad y protección a los usuarios dentro y fuera de la red. Al evitar las amenazas a través de cualquier puerto o protocolo antes de que lleguen a la red o a los endpoints, la seguridad de la capa DNS de Umbrella intenta ofrecer la experiencia de Internet más segura, fiable y rápida a más de 100 millones de usuarios.

La integración Cisco Umbrella DNS recopila logs DNS y proxy, y los envía a Datadog. Utilizando el pipeline de logs predefinido, los logs se analizan y enriquecen para facilitar la búsqueda y el análisis. Esta integración incluye varios dashboards que visualizan el total de solicitudes DNS, dominios permitidos/bloqueados, principales categorías bloqueadas, tráfico proxy a lo largo del tiempo y mucho más. Si tienes Datadog Cloud SIEM, los logs DNS de Umbrella serán analizados por la inteligencia contra amenazas en busca de coincidencias con los destinos comunes de los atacantes. Los logs DNS también son útiles para la caza de amenazas y durante las investigaciones, para complementar logs de otras fuentes.

## Configuración

### Configuración

#### Configuración de Cisco Umbrella DNS

1. Inicia sesión en [**Umbrella**][2] con tus credenciales.
2. En el panel izquierdo, selecciona **Administrar**.
3. Selecciona **Claves de API**.
4. Crea una nueva clave de API.
5. Aplica los contextos de clave `reports.aggregations:read` y `reports.granularEvents:read` a la clave de API.
6. Copia la clave y el secreto de clave API, que se utilizarán en los siguientes pasos de configuración.

#### Configuración de la integración Cisco Umbrella DNS-Datadog

Configura el endpoint Datadog para reenviar eventos de Cisco Umbrella DNS como logs a Datadog.

1. Ve a `Cisco Umbrella DNS`.
2. Añade tus credentiales Cisco Umbrella DNS.

| Parámetros de Cisco Umbrella DNS | Descripción                                                                |
| ----------------------------- | -------------------------------------------------------------------------- |
| Clave de API                       | La clave de API de Cisco Umbrella.                                           |
| Clave secreta                    | El secreto de clave de Cisco Umbrella.                                        |

## Datos recopilados

### Logs

La integración recopila y reenvía logs Cisco Umbrella DNS y proxy a Datadog.

### Métricas

La integración Cisco Umbrella DNS no incluye métricas.

### Eventos

La integración Cisco Umbrella DNS no incluye eventos.

## Compatibilidad

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://umbrella.cisco.com/
[2]: https://login.umbrella.com/
[3]: https://docs.datadoghq.com/es/help/