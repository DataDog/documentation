---
algolia:
  subcategory: Integraciones de Marketplace
app_id: iocs-dp2i
app_uuid: 30256b66-a6d2-4a19-a952-0c0473e4532d
assets:
  dashboards:
    'PayPal® Billing Plan & Subscription: Activity Overview': assets/dashboards/PayPalBillingPlanSubscription_ActivityOverview.json
    'PayPal® Execs: Transactions and Revenue': assets/dashboards/PayPalExecs_TransactionsandRevenue.json
    'PayPal® Merchant: Integration and Migration': assets/dashboards/PayPalMerchant_IntegrationandMigration.json
    'PayPal® Payment and Checkout: Activity Overview': assets/dashboards/PayPalPaymentandCheckout_ActivityOverview.json
    'PayPal® Payouts: Activity Overview': assets/dashboards/PayPalPayouts_ActivityOverview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ioconnect.paypal.agent
      metadata_path: metadata.csv
      prefix: ioconnect.paypal
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26186824
    source_type_name: iocs_dp2i
  monitors:
    PayPal® High Transaction Volume Monitor: assets/monitors/PayPalHighTransactionVolumeMonitor.json
    PayPal® Revenue Drop Monitor: assets/monitors/PayPalRevenueDropMonitor.json
    PayPal® Transaction Failure Rate Monitor: assets/monitors/PayPalTransactionFailureRateMonitor.json
author:
  homepage: https://www.novacloud.io/
  name: Nova
  sales_email: products.sales@novacloud.io
  support_email: support_ddp@novacloud.io
  vendor_id: ioconnect
categories:
- marketplace
- gestión de costes
- nube
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: iocs_dp2i
integration_id: iocs-dp2i
integration_title: Paypal®
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: iocs_dp2i
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: dp2i
  short_description: Tarifa plana mensual
  unit_price: 5.0
public_title: Paypal®
short_description: Recopilar métricas de Paypal® en Datadog.
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Category::Marketplace
  - Categoría::Gestión de costes
  - Categoría::Nube
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Recopilar métricas de Paypal® en Datadog.
  media:
  - caption: 'Ejecutivos de PayPal®: dashboard de transacciones e ingresos'
    image_url: images/PayPalExecsTransactionsAndRevenueDashboard.png
    media_type: imagen
  - caption: 'Plan de facturación y suscripción de PayPal®: resumen de actividades'
    image_url: images/PayPalBillingPlanSubscriptionActivityOverview.png
    media_type: imagen
  - caption: 'Vendedor de PayPal®: integración y migración'
    image_url: images/PayPalMerchant_IntegrationandMigration.png
    media_type: imagen
  - caption: 'Pago y proceso de pago de PayPal®: resumen de actividades'
    image_url: images/PayPalPaymentandCheckout_ActivityOverview.png
    media_type: imagen
  - caption: 'Pagos de PayPal®: resumen de actividades'
    image_url: images/PayPalPayoutsActivityOverview.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Paypal®
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

Obtén información valiosa de tus eventos de PayPal® con la integración de Datadog **basada en el Agent**. PayPal® es una plataforma líder de pagos en línea que permite a las empresas procesar pagos, gestionar transacciones y manejar diversas operaciones financieras a nivel mundial. Esta integración permite a las empresas monitorizar y visualizar más de 100 métricas de sus transacciones de PayPal®, proporcionando análisis completos y monitorización. [Más información sobre PayPal®][6].

Características principales:

- **Monitorización**: realiza un seguimiento y analiza las transacciones de pago, los reintegros, las autorizaciones y la actividad de los clientes, para obtener una visibilidad instantánea de tus datos de PayPal®.
- **Cobertura completa de métricas**: accede a más de 100 eventos clave de PayPal®, para obtener información sobre tendencias de pago, índices de error y rendimiento financiero.
- **Dashboard y monitor preconfigurados**: implementa un dashboard totalmente personalizable y configura monitores para detectar anomalías y abordar problemas potenciales antes de que afecten a tu empresa.
- **Manejo de datos sin fisuras**: captura eventos de PayPal® a través de un webhook, procesa los datos utilizando un Message Broker (ActiveMQ), y envía los datos a Datadog para reducir la latencia y garantizar una monitorización fiable.
- **Escalable y fiable**: gestiona grandes volúmenes de eventos de PayPal®, lo que permite a las empresas en crecimiento confiar en informes de datos precisos y puntuales seleccionando eventos específicos de los webhooks de PayPal®.

Aprovecha esta integración para transformar los datos de evento de PayPal® en información práctica y permitir que tu empresa tome decisiones seguras basadas en datos.

**Nota de seguridad**:
Esta integración no almacena ni procesa ninguna información de pago confidencial (como detalles de tarjetas de crédito o datos personales de clientes). Solo captura tipos de eventos como métricas count e importes de transacciones de intención de pago como métricas gauge. Tus datos financieros permanecen seguros y mantienes el pleno cumplimiento de las normativas del sector, como PCI-DSS.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "iocs-dp2i" >}}

### Eventos

La integración de Datadog y Paypal no incluye ningún evento.

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con el servicio de asistencia de Nova a través de los siguientes canales:

- [support_ddp@novacloud.io][2]

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: mailto:support_ddp@novacloud.io
[3]: https://docs.datadoghq.com/es/agent/autodiscovery/integrations
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://developer.paypal.com/home/
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: https://github.com/DataDog/integrations-core/blob/master/iocs_dpi/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/iocs_dpi/service_checks.json
[10]: https://www.paypal.com/signin

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/iocs-dp2i" target="_blank">adquiere esta aplicación en el Marketplace</a>.
