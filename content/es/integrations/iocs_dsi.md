---
algolia:
  subcategory: Integraciones de Marketplace
app_id: iocs-dsi
app_uuid: fa54c361-9ffe-4f43-8636-7e6104da2dcd
assets:
  dashboards:
    'Stripe® Execs: Account & Application Management': assets/dashboards/Stripe_AccountApplicationManagement.json
    'Stripe® Execs: Customer Engagement Interaction': assets/dashboards/Stripe_CustomerEngagementInteraction.json
    'Stripe® Execs: Payment Lifecycle': assets/dashboards/Stripe_PaymentLifecycle.json
    'Stripe® Execs: Subscription Billing and Management': assets/dashboards/Stripe_SubscriptionBillingandManagement.json
    'Stripe® Execs: Transactions and Revenue': assets/dashboards/Stripe_Execs_TransactionsandRevenue.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ioconnect.stripe.agent
      metadata_path: metadata.csv
      prefix: ioconnect.stripe
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21692159
    source_type_name: iocs_dsi
  monitors:
    Stripe® High Transaction Volume Monitor: assets/monitors/StripeHighTransactionVolumeMonitor.json
    Stripe® Revenue Drop Monitor: assets/monitors/StripeRevenueDropMonitor.json
    Stripe® Transaction Failure Rate Monitor: assets/monitors/StripeTransactionFailureRateMonitor.json
author:
  homepage: https://www.novacloud.io/
  name: Nova
  sales_email: products.sales@novacloud.io
  support_email: support_ddp@novacloud.io
  vendor_id: ioconnect
categories:
- marketplace
- nube
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: iocs_dsi
integration_id: iocs-dsi
integration_title: Stripe®
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: iocs_dsi
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: dsi
  short_description: Tarifa plana mensual
  unit_price: 5
public_title: Stripe®
short_description: Monitoriza métricas de ingresos y transacciones de Stripe.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Marketplace
  - Category::Cloud
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitoriza métricas de ingresos y transacciones de Stripe.
  media:
  - caption: 'Stripe® Execs: Gestión de cuentas y aplicaciones'
    image_url: images/StripeAccountAndApplicationManagement.png
    media_type: imagen
  - caption: 'Stripe® Execs: Interacción con el compromiso del cliente'
    image_url: images/StripeCustomerEngagementInteraction.png
    media_type: imagen
  - caption: 'Stripe® Execs: Transacciones e ingresos'
    image_url: images/StripeExecsTransactionsAndRevenuesDashboard.png
    media_type: imagen
  - caption: 'Stripe® Execs: Ciclo de vida del pago'
    image_url: images/StripePaymentLifeCycle.png
    media_type: imagen
  - caption: 'Stripe® Execs: Facturación y gestión de suscripciones'
    image_url: images/StripeSubscriptionBillingAndManagement.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Stripe®
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Obtén información valiosa de tus eventos de Stripe® con nuestra integración continua de Datadog **basada en el Agent**. Stripe® es una plataforma líder en el procesamiento de pagos en línea que permite a las empresas aceptar pagos, gestionar suscripciones y dirigir una variedad de operaciones financieras en todo el mundo. Esta integración ayuda a las empresas a monitorizar y visualizar más de 200 métricas de sus transacciones de Stripe® sin ningún esfuerzo, lo que permite una monitorización y un análisis exhaustivos. [Más información sobre Stripe][8].

Esta solución proporciona información general completa de eventos de pago, seguimiento de ingresos y monitorización de errores, lo que te ayuda a tomar decisiones informadas para optimizar tus operaciones financieras.

Características principales:

- Monitorización: Realiza un seguimiento y analiza las transacciones de pagos, las suscripciones y la actividad de los clientes para obtener una visibilidad instantánea de tus datos de Stripe®.
- Amplia cobertura de métricas: Admite más de 200 eventos clave de Stripe®, ofreciendo información detallada sobre tendencias de pago, frecuencias de error y rendimiento financiero.
- Monitor y dashboard preconfigurados: Despliega al instante un dashboard totalmente personalizable y configura un monitor para detectar anomalías. Esto te permitirá anticiparte a posibles problemas antes de que afecten a tu empresa.
- Manejo continuo de datos: Captura eventos de Stripe® a través de un webhook, procesos los datos de forma eficiente y los envía directamente a Datadog, reduciendo la latencia y proporcionando una experiencia de monitorización fiable.
- Escalable y fiable: Creado para manejar grandes volúmenes de eventos de Stripe®, asegurando que incluso las empresas en crecimiento puedan confiar en esta integración para obtener informes de datos precisos y oportunos seleccionando qué eventos escuchar de Stripe® en diferentes webhooks.

Con esta integración, puedes transformar sin ningún esfuerzo datos de eventos de Stripe® en información práctica, lo que permitirá a tu empresa tomar decisiones basadas en datos con confianza.

**Nota de seguridad importante:**
Esta integración no almacena ni procesa ninguna información de pago confidencial (como información de tarjetas de crédito o datos personales de clientes). Solo captura eventos como métricas de recuento y cantidad de transacciones de intento de pago como métricas gauge, garantizando que tus datos financieros permanezcan seguros a la vez que se respeta el pleno cumplimiento de las normativas del sector, como PCI-DSS.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "iocs_dsi" >}}


### Eventos

La integración Stripe Datadog no incluye eventos.

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con el servicio de asistencia de Nova a través de los siguientes canales:

- Correo electrónico: [support_ddp@novacloud.io][2]

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: mailto:support_ddp@novacloud.io
[3]: https://docs.datadoghq.com/es/agent/autodiscovery/integrations
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://docs.stripe.com/webhooks#register-webhook
[8]: https://www.stripe.com/
[9]: https://github.com/DataDog/integrations-core/blob/master/iocs_dsi/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/iocs_dsi/service_checks.json

---
Esta aplicación está disponible a través del Marketplace de Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizar esta aplicación, <a href="https://app.datadoghq.com/marketplace/app/iocs-dsi" target="_blank">adquiérela en el Marketplace</a>.