---
app_id: godaddy
app_uuid: 6e01b4b9-7604-4628-9203-c1f042f941aa
assets:
  dashboards:
    GoDaddy Overview: assets/dashboards/godaddy_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: godaddy.certificate.total_certificates
      metadata_path: metadata.csv
      prefix: godaddy.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21264130
    source_type_name: GoDaddy
  monitors:
    Domain Dropped from Request: assets/monitors/godaddy_domain_dropped_from_request.json
    Domain Fraud Detected: assets/monitors/godaddy_domain_fraud_detected.json
    Domain Verification Failed: assets/monitors/godaddy_domain_verification_failed.json
    SSL Certificate Denied: assets/monitors/godaddy_certificate_denied.json
    SSL Certificate Expiration Alert: assets/monitors/godaddy_days_remaining_for_expiration_of_certificate.json
    SSL Certificate Expired: assets/monitors/godaddy_certificate_expired.json
    SSL Certificate Revoked: assets/monitors/godaddy_certificate_revoked.json
    SSL Certificate in an Error State: assets/monitors/godaddy_certificate_in_an_error_state.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/godaddy/README.md
display_on_public_website: true
draft: false
git_integration_title: godaddy
integration_id: godaddy
integration_title: GoDaddy
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: godaddy
public_title: GoDaddy
short_description: Obtén información y monitoriza los certificados SSL de GoDaddy.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Métricas
  - Tipo de datos enviados::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Obtén información y monitoriza los certificados SSL de GoDaddy.
  media:
  - caption: Información general de GoDaddy
    image_url: images/godaddy_1.png
    media_type: imagen
  - caption: Información general de GoDaddy
    image_url: images/godaddy_2.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: GoDaddy
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general
[GoDaddy][1] es una empresa de alojamiento web y registro de dominios que ayuda a particulares y empresas a establecer su presencia en Internet. Una de sus principales ofertas son los servicios de certificado SSL. GoDaddy ofrece varios tipos de certificados SSL, como SSL estándar para proteger un sitio, SSL comodín para proteger varios subdominios y soluciones avanzadas para sitios de comercio electrónico que requieren mayor seguridad.

La integración de GoDaddy recopila métricas de los certificados SSL y sus dominios, dirigiéndolos a Datadog para su análisis. Esta integración proporciona puntos de datos como el número total de certificados, certificados emitidos, certificados caducados, certificados revocados y dominios asociados a cada certificado. También incluye métricas específicas para los certificados próximos a caducar. Se puede acceder a todas estas métricas a través de dashboards y monitores.

## Configuración

### Generar credenciales de API en GoDaddy

1. Ve al [Portal de desarrolladores de GoDaddy][2].
2. Inicia sesión con tu cuenta de GoDaddy.
3. Selecciona "API Keys" (Claves de API).
4. Selecciona "Create New API Key" (Crear nueva clave de API).
5. Proporciona un nombre para tu API.
6. Selecciona "Production" (Producción) en Environment (Entorno).
7. Haz clic en "Next" (Siguiente). Tu clave de API ya está creada.
8. Haz clic en "Got It" (Entendido).

### Encuentra tu número de cliente de GoDaddy

1. Ve a tu [página Inicio de sesión y PIN][3] de GoDaddy. Puede que se te pida que inicies sesión.
2. En **Login Info** (Información de inicio de sesión), encuentra tu **Customer number** (Número de cliente) (también conocido como tu **ID de comprador**).

### Conecta tu cuenta de GoDaddy a Datadog

1. Añade tu clave de API, clave secreta y número de cliente

| Parámetros                               | Descripción                                                  |
| ---------------------------------------- | ------------------------------------------------------------ |
| Clave de API de GoDaddy                          | La clave de API de tu cuenta de GoDaddy                          |
| Clave secreta de GoDaddy                       | El secreto de API de tu cuenta de GoDaddy                       |
| Número de cliente de GoDaddy (o ID de comprador)  | El número de cliente (ID de comprador) de tu cuenta de GoDaddy      |

2. Haz clic en el botón Save (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

La integración de GoDaddy no incluye ningún log.

### Métricas

La integración de GoDaddy recopila y reenvía los certificados y sus métricas de dominios a Datadog.

{{< get-metrics-from-git "godaddy" >}}

### Eventos

La integración de GoDaddy no incluye ningún evento.

## Asistencia

Para obtener más ayuda, ponte en contacto con el [soporte de Datadog][4].

[1]: https://www.godaddy.com/en-in
[2]: https://developer.godaddy.com/
[3]: https://sso.godaddy.com/security
[4]: https://docs.datadoghq.com/es/help/