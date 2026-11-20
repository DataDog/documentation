---
app_id: akamai-zero-trust
app_uuid: d5f7fcaf-fab5-4944-af31-6df7f2efccb9
assets:
  dashboards:
    akamai-zero-trust-overview: assets/dashboards/akamai_zero_trust_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - akamai.eaa.active_dialout_count
      metadata_path: metadata.csv
      prefix: akamai.eaa.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10423
    source_type_name: Akamai Zero Trust
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: akamai_zero_trust
integration_id: akamai-zero-trust
integration_title: Akamai Zero Trust
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akamai_zero_trust
public_title: Akamai Zero Trust
short_description: Integración con los productos SIA y EAA de Akamai
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Integración con los productos SIA y EAA de Akamai
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Akamai Zero Trust
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Akamai Zero Trust incluye tanto Enterprise Application Access como Secure Internet Access.

Akamai Enterprise Application Access es una solución de acceso a redes de confianza cero que ofrece un acceso preciso a aplicaciones privadas basado en la identidad y el contexto. Utiliza políticas basadas en la identidad y datos en tiempo real como la localización del usuario, la hora y la seguridad del dispositivo para asegurar que los usuarios sólo tengan acceso a las aplicaciones que necesitan y eliminar el acceso a nivel de red. Funciona a la perfección con Akamai MFA para una autenticación de usuario sólida.

Secure Internet Access Enterprise es una solución de protección frente a amenazas específicas basada en la nube. Protege a tu organización frente a las amenazas basadas en DNS y en la Web, aplica políticas de autenticación y uso aceptable y audita el acceso a Internet de los usuarios.

Akamai Zero Trust recopila logs tanto para Secure Internet Access (SIA) como para Enterprise Application Access (EAA). También es capaz de recopilar métricas del recopilador para SIA.

## Configuración

### Configuración

1. Accede a tu [Cuenta de Akamai][1]
2. Busca **Identity and Access Management** (Gestión de identidades y acceso)
3. Haz clic en **Create API Client** (Crear cliente de API)
4. En **Select APIs** (Seleccionar APIs), busca **SIA and EAA** (SIA y EAA) y proporciona acceso **READ-ONLY**.
5. Después de crear el cliente de API, haa clic en **Create Credential** (Crear credencial) para generar tu conjunto de credenciales.
6. Copia el **token de acceso, el token de cliente, el host y el secreto de cliente** de las credenciales generadas.
7. Si deseas recopilar métricas y logs de EAA, proporciona el **Identificador de contrato** de la cuenta.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "akamai-zero-trust" >}}


### Logs

Los eventos SIA y EAA de Akamai aparecerán como logs en la fuente `akamai_zero_trust`.

### Checks de servicio

Akamai Zero Trust no incluye ningún check de servicio.

### Eventos

Akamai Zero Trust no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitoriza Akamai Zero Trust y Application Security con Datadog Cloud SIEM][4]

[1]: https://control.akamai.com/apps/auth/#/login
[2]: https://github.com/DataDog/integrations-internal-core/blob/main/akamai_zero_trust/metadata.csv
[3]: https://docs.datadoghq.com/es/help/
[4]: https://www.datadoghq.com/blog/akamai-zero-trust-application-security/