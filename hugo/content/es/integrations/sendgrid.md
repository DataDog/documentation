---
app_id: sendgrid
app_uuid: 828968b6-254c-4c82-8736-998004d6e607
assets:
  dashboards:
    Sendgrid-Overview: assets/dashboards/Sendgrid-Overview_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: sendgrid.emails.requests
      metadata_path: metadata.csv
      prefix: sendgrid.emails.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 620
    source_type_name: SendGrid
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- Métricas
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sendgrid
integration_id: sendgrid
integration_title: SendGrid
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sendgrid
public_title: SendGrid
short_description: Recopila métricas para Sendgrid.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Metrics
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopila métricas para Sendgrid.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/email-performance-integrations/
  support: README.md#Support
  title: SendGrid
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
![El dashboard de Sendgrid en Datadog][1]

## Información general

Twilio SendGrid es una plataforma de correo electrónico que las empresas utilizan para enviar correos electrónicos transaccionales y de marketing. Utiliza esta integración para recopilar tus métricas y logs de entrega de correo electrónico y compromiso de SendGrid.

## Configuración

### Generar clave de API de SendGrid

1. Inicia sesión en tu [cuenta de SendGrid][2].
2. Abre el menú desplegable **Settings** (Configuración).
3. Haz clic en **API Keys** (Claves de API).
4. Haz clic en **Create API Key** (Crear clave API) en la parte superior derecha.
5. Rellena el campo _API Key Name_ (Nombre de la clave de API). Selecciona **Full Access** (Acceso total) o, para acceso restringido, **Stats** - **Global Stats**, **Stats** - **Stats Overview** (Estadísticas - Estadísticas globales, Estadísticas - Resumen de estadísticas) y **User Account** - **Timezone** (Cuenta de usuario - Zona horaria).
6. Copia la clave de API en un lugar seguro. La clave de API será necesaria cuando configures la integración de SendGrid en la interfaz de usuario de Datadog.

### Configuración

#### Enviar métricas

1. Navega hasta la pestaña de configuración dentro del [cuadro de integración de SendGrid][3] de Datadog.
2. Introduce un nombre identificativo único para la cuenta de SendGrid en Datadog.
3. Introduce la clave de API generada en los pasos anteriores.
4. Opcionalmente, añade etiquetas personalizadas para asociar etiquetas con todas las métricas recopiladas para esta integración.

#### Enviar logs

1. Copia la URL generada dentro del [cuadro de integración de SendGrid][3].
2. Ve a tu [cuenta de SendGrid][2].
3. Abre el menú desplegable **Settings** (Configuración).
4. Haz clic en **Mail Settings** (Configuración de correo).
5. Haz clic en **Edit** (Editar) en la configuración **Event Webhook** (Webhook del evento).
6. Pega la URL generada en el paso 1 en **HTTP Post URL** (URL de publicación HTTP).
7. Deja **Authorization Method** (Método de autorización) en _None_ (Ninguno).
8. Selecciona qué eventos de entrega y compromiso deseas recibir.
9. Habilita el **Event Webhook Status** (Estado del webhook de evento).
10. Haz clic en **Save** (Guardar).

## Datos recopilados

### Métricas
{{< get-metrics-from-git "sendgrid" >}}


### Logs

Los eventos de entrega y compromiso de Sendgrid aparecerán como logs en la fuente `sendgrid`.

### Eventos

La integración de SendGrid no incluye ningún evento.

### Checks de servicio

La integración de SendGrid no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: images/sendgrid_dashboard_overview.png
[2]: https://app.sendgrid.com/
[3]: https://app.datadoghq.com/account/settings#integrations/sendgrid
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/sendgrid/metadata.csv
[5]: https://docs.datadoghq.com/es/help