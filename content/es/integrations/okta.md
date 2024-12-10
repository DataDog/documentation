---
app_id: okta
app_uuid: 1bbd0367-66bf-41c9-be58-8f3313afd0e5
assets:
  dashboards:
    Okta-Overview: assets/dashboards/Okta-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 236
    source_type_name: Okta
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: okta
integration_id: okta
integration_title: Okta
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: okta
public_title: Okta
short_description: Integra tus logs de evento de seguridad de Okta en Datadog.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Integra tus logs de evento de seguridad de Okta en Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Okta
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Conecta Okta para integrar tus logs de evento de sistema de Okta en Datadog Log Management.

Estos logs te ofrecen una mayor visibilidad de los eventos de acceso y ciclo de vida de todas tus aplicaciones, usuarios y mucho más. La integración de Datadog y Okta te permite detectar amenazas para tus aplicaciones, realizar un seguimiento de la actividad de los usuarios, depurar problemas de autenticación y autorización, y crear un registro de auditoría para el cumplimiento normativo.

Consulta la [API de tipos de evento de Okta][1] para conocer todos los tipos de eventos de Okta que Datadog puede rastrear.

## SSO con SAML

Para el inicio de sesión único, consulta [Configuración de Okta como IdP SAML][2].

## Configuración

### Configuración

Hay dos métodos para habilitar la integración de Datadog y Okta: a través de OAuth utilizando credentiales de la aplicación de Datadog en la red de integración de Okta o a través de una clave de API.

Ambos métodos requieren los siguientes campos:

| Parámetro            | Descripción                                                                                                                                                      |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Nombre de la cuenta         | Identifica tu cuenta de Okta en Datadog. El nombre de la cuenta solo puede contener caracteres alfanuméricos y guiones bajos.                                              |
| Dominio               | El dominio de cuenta único utilizado para solicitar logs desde tu cuenta de Okta. La URL debe ser válida y empezar por `https://<your_domain>.okta.com`.                    |
| Método de autorización | Especifica un método para recibir autorización de Okta. Los dos métodos son: clave de API de la cuenta o credentiales de la aplicación de Datadog en la red de integración de Okta. |


Para habilitar la integración mediante OAuth:

1. En Okta, ve a **Applications** > **API Services Integration** > **Add Integration** > **Datadog** (Aplicaciones > API de integración de servicios > Añadir integración > Datadog).
2. Tras la instalación, se te proporcionará un conjunto de credenciales de identificación de cliente y de secreto de cliente. Copia estas credenciales.
3. En Datadog, abre el [cuadro de integración de Okta][3].
4. En la pestaña **Configure** (Configurar), haz clic en **Add Account** (Añadir cuenta) e introduce la siguiente información:

    | Parámetro           | Descripción                                                                                                                                                      |
    |----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | ID de cliente | El ID de cliente proporcionado por Okta.                                                                                                                                  |
    | Secreto de cliente | El secreto de cliente proporcionado por Okta.                                                                                                                              |

5. Haz clic en **Save** (Guardar).


Para activar la integración utilizando una clave de API:

1. En Okta, ve a **Security** > **API** > **Tokens** (Seguridad > API >Tokens) y añade un nuevo token de API.
2. En Datadog, abre el [cuadro de integración de Okta][3].
3. En la pestaña **Configure** (Configurar), haz clic en **Add Account** (Añadir cuenta) e introduce la siguiente información:

    | Parámetro | Descripción |
    |-----------|---------------------------------------|
    | Clave de API  |  El token de API de tu cuenta de Okta. El permiso mínimo requerido es el de administrador de solo lectura. |

4. Haz clic en **Save** (Guardar).

## Datos recopilados

### Métricas

La integración de Okta no incluye ninguna métrica.

### Eventos

La integración de Okta no incluye eventos.

### Checks de servicio

La integración de Okta no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

[1]: https://developer.okta.com/docs/reference/api/event-types/
[2]: https://docs.datadoghq.com/es/account_management/saml/okta/
[3]: https://app.datadoghq.com/account/settings#integrations/okta
[4]: https://docs.datadoghq.com/es/help/