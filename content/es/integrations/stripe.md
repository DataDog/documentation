---
app_id: stripe
app_uuid: ad2b7df2-b230-4a7d-b1d0-a964443a6534
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 624
    source_type_name: Stripe
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: stripe
integration_id: stripe
integration_title: Stripe
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: stripe
public_title: Stripe
short_description: Recibe logs sobre cambios en eventos en tu cuenta de Stripe.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recibe logs sobre cambios en eventos en tu cuenta de Stripe.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Stripe
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Stripe es un conjunto de API que potencian el procesamiento de pagos en línea y las soluciones comerciales para empresas de Internet de todos los tamaños. Conéctate a Datadog con tu cuenta de Stripe para recibir logs sobre cambios en eventos de tu cuenta.

## Configuración

### Configuración

#### Logs

1. Copia la URL generada en la pestaña **Configuración** del [cuadro de la integración Stripe][1] de Datadog.
2. Ve a la página [Webhooks][2] de tu cuenta de Stripe.
3. Haz clic en **Add Endpoint** (Añadir endpoint).
4. Pega la URL generada en el paso 1 en la **URL del endpoint**.
5. Añade una descripción opcional en **Descripción**.
6. Selecciona los eventos que quieres escuchar.
7. Haz clic en **Add Endpoint** (Añadir endpoint).


## Datos recopilados

### Métricas

La integración Stripe no incluye métricas.

### Logs

Los eventos de Stripe aparecen como en la fuente `stripe`.

### Eventos

La integración Stripe no incluye eventos.

### Checks de servicio

La integración Stripe no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://app.datadoghq.com/integrations/stripe
[2]: https://dashboard.stripe.com/webhooks
[3]: https://docs.datadoghq.com/es/help