---
app_id: adyen
app_uuid: fbf81df6-a556-4ee7-9c50-764bf129b0ec
assets:
  dashboards:
    Adyen Disputes: assets/dashboards/adyen_disputes.json
    Adyen Payouts: assets/dashboards/adyen_payouts.json
    Adyen Transactions: assets/dashboards/adyen_transactions.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 27052339
    source_type_name: Adyen
  logs:
    source: adyen
  monitors:
    Expired payout detected: assets/monitors/expired_payout_detected.json
    Failed capture detected due to a rejection by the card scheme: assets/monitors/failed_capture_detected_due_to_a_rejection_by_the_card_scheme.json
    Failed refund detected due to a rejection by the card scheme: assets/monitors/failed_refund_detected_due_to_a_rejection_by_the_card_scheme.json
    High number of declined payouts detected: assets/monitors/high_number_of_declined_payouts_detected.json
    High number of failed captures detected: assets/monitors/high_number_of_failed_captures_detected.json
    High number of failed payout requests detected: assets/monitors/high_number_of_failed_payout_requests_detected.json
    High number of failed refunds detected: assets/monitors/high_number_of_failed_refunds_detected.json
    Notification of Chargeback: assets/monitors/notification_of_chargeback.json
    Notification of Fraud: assets/monitors/notification_of_fraud.json
    Second Chargeback detected: assets/monitors/second_chargeback_detected.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/adyen/README.md
display_on_public_website: true
draft: false
git_integration_title: adyen
integration_id: adyen
integration_title: Adyen
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: adyen
public_title: Adyen
short_description: Obtén información sobre los datos de Transactions, Disputes y Payouts
  (Transacciones, litigios y pagos) de Adyen
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Configuración
  description: Obtén información sobre los datos de Transactions, Disputes y Payouts
    (Transacciones, litigios y pagos) de Adyen
  media:
  - caption: Transacciones de Adyen
    image_url: images/adyen_transaction_1.png
    media_type: imagen
  - caption: Transacciones de Adyen
    image_url: images/adyen_transaction_2.png
    media_type: imagen
  - caption: Pagos de Adyen
    image_url: images/adyen_payouts.png
    media_type: imagen
  - caption: Litigios de Adyen
    image_url: images/adyen_disputes.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Adyen
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[Adyen][1] es una plataforma de pago global que ofrece un conjunto completo de soluciones de pago para empresas. Permite a las empresas aceptar pagos en línea, por móvil y en la tienda. Adyen admite una amplia gama de métodos de pago, como tarjetas de crédito, billeteras móviles y opciones de pago locales, y ofrece servicios como prevención del fraude y gestión de riesgos.

La integración de Adyen recopila datos de transacciones, litigios y pagos utilizando la capacidad de webhook de Adyen y los introduce en Datadog para un análisis exhaustivo.

## Configuración

Sigue las instrucciones a continuación para configurar esta integración para tu cuenta de Adyen.

### Configuración

#### Configuración de webhook

Configura el endpoint de Datadog para reenviar eventos de Adyen como logs a Datadog. Para más detalles, consulta [Información general de webhook de Adyen][2].

1. Copia la URL generada dentro de la pestaña **Configuration** (Configuración) en el [cuadro de integración de Adyen][3] en Datadog.
2. Accede a tu cuenta de [Adyen][1] con un usuario que tenga el rol **Merchant technical integrator** (Integrador técnico de comercio) junto con los roles por defecto, y tenga acceso a **Company account and all associated merchant accounts** (Cuenta de empresa y todas las cuentas de comercio asociadas).
3. En la sección **Developers** (Desarrolladores), haz clic en **Webhooks**.
4. Haz clic en **Create new webhook** (Crear nuevo webhook).
5. En la sección Webhooks recomendados, selecciona la opción **Add** (Añadir) situada junto al **Webhook estándar**.
6. En **General**, configura lo siguiente:
   |Ajustes|Configuración|
   |------------------------------|-----------------------------|
   |Versión|Seleccionar versión 1 del webhook|
   |Description|Añadir una descripción al webhook|
   |Selecciona si deseas conservar todas las cuentas comerciales o seleccionar cuentas específicas cuyos datos deban introducirse en Datadog|

7. En **Server configuration** (Configuración del servidor), configura lo siguiente:
   |Ajustes|Configuración|
   |------------------------------|-----------------------------|
   |URL|Introduce la URL del endpoint que generaste en el paso 1 de [Configuración del webhook](#webhook-configuration).|
   |Método|JSON|
   |Protocolo de cifradol|TLSv1.3l
8. En **Events** (Eventos), mantén los eventos seleccionado por defecto según el **Webhook estándar**.
9. Haz clic en **Save configuration** (Guardar configuración).

## Datos recopilados

### Logs

La integración de Adyen recopila y envía los logs de transacciones, litigios y pagos a Datadog.

### Métricas

La integración de Adyen no incluye ninguna métrica.

### Eventos

La integración de Adyen no incluye ningún evento.

### Checks de servicios

La integración de Adyen no incluye ningún check de servicio.

## Asistencia

Para obtener más ayuda, ponte en contacto con el [soporte de Datadog][4].

[1]: https://www.adyen.com/
[2]: https://docs.adyen.com/development-resources/webhooks/
[3]: https://app.datadoghq.com/integrations/adyen
[4]: https://docs.datadoghq.com/es/help/