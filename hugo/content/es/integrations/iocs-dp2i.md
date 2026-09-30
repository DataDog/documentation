---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/iocs_dp2i
app_id: iocs-dp2i
categories:
- marketplace
- gestión de costes
- nube
custom_kind: integración
description: Recopilar métricas de Paypal® en Datadog.
integration_version: 1.0.1
media:
- caption: 'Ejecutivos de PayPal®: dashboard de transacciones e ingresos'
  image_url: images/PayPalExecsTransactionsAndRevenueDashboard.png
  media_type: imagen
- caption: 'Plan de facturación y suscripción de PayPal®: resumen de actividades'
  image_url: images/PayPalBillingPlanSubscriptionActivityOverview.png
  media_type: imagen
- caption: 'Comerciante de PayPal®: integración y migración'
  image_url: images/PayPalMerchant_IntegrationandMigration.png
  media_type: imagen
- caption: 'Pago y proceso de pago de PayPal®: resumen de actividades'
  image_url: images/PayPalPaymentandCheckout_ActivityOverview.png
  media_type: imagen
- caption: 'Pagos de PayPal®: resumen de actividades'
  image_url: images/PayPalPayoutsActivityOverview.png
  media_type: imagen
supported_os:
- linux
title: Paypal®
---
## Información general

Obtén información valiosa de tus eventos de PayPal® con la integración de Datadog **basada en el Agent**. PayPal® es una plataforma líder de pagos en línea que permite a las empresas procesar pagos, gestionar transacciones y manejar diversas operaciones financieras a nivel mundial. Esta integración permite a las empresas monitorizar y visualizar más de 100 métricas de sus transacciones de PayPal®, proporcionando un completo análisis y monitorización. [Más información sobre PayPal®](https://developer.paypal.com/home/).

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

| | |
| --- | --- |
| **ioconnect.paypal.agent** <br>(gauge) | Mostrar agentes de la integración de Datadog y Paypal en línea<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.plan.activated** <br>(count) | Plan de facturación activado.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.plan.created** <br>(count) | Se crea el plan de facturación.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.plan.deactivated** <br>(count) | Se desactiva el plan de facturación.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.plan.pricing_change.activated** <br>(count) | Se activa el cambio de precio del plan.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.plan.pricing_change.inprogress** <br>(count) | Se está procesando el cambio de precio del plan de facturación.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.plan.updated** <br>(count) | Se actualiza el plan de facturación.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.subscription.activated** <br>(count) | Se activa la suscripción.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.subscription.canceled** <br>(count) | Se cancela la suscripción.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.subscription.created** <br>(count) | Se crea la suscripción.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.subscription.expired** <br>(count) | La suscripción caduca.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.subscription.payment.failed** <br>(count) | No se ha podido realizar el pago en la suscripción.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.subscription.re_activated** <br>(count) | Se reactiva el acuerdo de facturación.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.billing.subscription.suspended** <br>(count) | Se suspende el acuerdo de facturación.<br>__Se muestra como unidad_ |
| **ioconnect.paypal.billing.subscription.updated** <br>(count) | Se actualiza el acuerdo de facturación.<br>__Se muestra como unidad_ |
| **ioconnect.paypal.catalog.product.created** <br>(count) | Se crea el producto.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.catalog.product.updated** <br>(count) | Se actualiza el producto.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.checkout.checkout.buyer_approved** <br>(count) | Se crea el pago y es aprobado por el comprador.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.checkout.order.approved** <br>(count) | El comprador ha aprobado una orden de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.checkout.order.completed** <br>(count) | Se procesa la orden de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.checkout.order.declined** <br>(count) | Se rechaza la orden de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.checkout.order.saved** <br>(count) | Se guarda la orden de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.checkout.order.voided** <br>(count) | Se anula la orden de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.collection.activity.executed** <br>(count) | La actividad (notificación o colocación) se produce en morosidad<br>_Se muestra como unidad_ |
| **ioconnect.paypal.compliance.process.agent_action_initiated** <br>(count) | El estado del proceso de conformidad cambia a Revisión manual.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.compliance.process.completed** <br>(count) | El estado del proceso de conformidad es Completado.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.compliance.process.end_user_action_required** <br>(count) | El estado del proceso de conformidad es Se necesitan más datos.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.compliance.process.exempted** <br>(count) | El estado del proceso de conformidad es Exento.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.compliance.process.failed** <br>(count) | El estado del proceso de conformidad es Fallido.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.compliance.process.not_applied** <br>(count) | El estado del proceso de conformidad es No aplicable.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.compliance.process.system_action_initiated** <br>(count) | El estado del proceso de conformidad es Pendiente de procesamiento del sistema.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.dispute.created** <br>(count) | Se crea la disputa.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.dispute.resolved** <br>(count) | Se resuelve la disputa.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.dispute.updated** <br>(count) | Se actualiza la disputa.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.funds.reserve.released** <br>(count) | El importe reservado se libera para un comerciante.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.funds.reserve.withheld** <br>(count) | El fondo de comercio se reserva con el socio por un tiempo determinado.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.managed_account.account_created** <br>(count) | Se crea una cuenta gestionada.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.managed_account.account_limit_approached** <br>(count) | Se alcanza el porcentaje del límite del umbral.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.managed_account.account_status_changed** <br>(count) | Se modifican las capacidades o el estado del proceso en una cuenta gestionada.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.managed_account.account_updated** <br>(count) | Se actualiza la cuenta gestionada.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.managed_account.configurations_updated** <br>(count) | Se crean, modifican o eliminan configuraciones de cuentas no_logueables.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.managed_account.created** <br>(count) | Se crea una cuenta no_logueable.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.managed_account.risk_assessed** <br>(count) | Se evalúa el riesgo de la cuenta o se modifica la evaluación del riesgo de la cuenta.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.managed_account.updated** <br>(count) | Se actualiza la cuenta no_logueable.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_balance.changed** <br>(count) | Transacción de cobro/pago que produce un cambio en los saldos disponibles del comerciante.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_integration.capability_updated** <br>(count) | Notificación de cambio de capacidad.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_integration.product_subscription_updated** <br>(count) | Cambio de estado de la suscripción de producción.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_integration.seller_already_integrated** <br>(count) | El vendedor pasa por el flujo de ISU pero ya está totalmente integrado con el socio.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_integration.seller_consent_granted** <br>(count) | El vendedor otorga los consentimientos solicitados al socio.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_integration.seller_email_confirmed** <br>(count) | El vendedor confirma el correo electrónico.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_integration.seller_error_bad_request** <br>(count) | El flujo de solicitudes incorrectas comienza por el comerciante.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_integration.seller_error_internal_server_error** <br>(count) | El flujo de error del servidor interno comienza por el comerciante.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_integration.seller_onboarding_initiated** <br>(count) | PayPal crea una cuenta de comerciante desde el enlace de incorporación del socio.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_migration.billing_agreement_migration.accepted** <br>(count) | Se acepta la migración del acuerdo de facturación.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_migration.billing_agreement_migration.completed** <br>(count) | Se completa la solicitud de migración del acuerdo de facturación.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_migration.billing_agreement_migration.failed** <br>(count) | No se ha podido solicitar la migración del acuerdo de facturación.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.merchant_migration.billing_agreement_migration.in_progress** <br>(count) | La solicitud de migración del acuerdo de facturación está en_proceso.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.negative_balance.active** <br>(count) | Indica los últimos saldos negativos.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.negative_balance.cleared** <br>(count) | Se elimina el saldo negativo.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.negative_balance.created** <br>(count) | La cuenta pasa a negativo.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.negative_balance.recoupment_completed** <br>(count) | Se completa la transacción de recuperación para recuperar el saldo negativo.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.negative_balance.reverese_recoupment_completed** <br>(count) | Se completa la transacción de recuperación inversa.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.partner_financial_account.debited** <br>(count) | Se debita la cuenta de socio.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.paypal_account.changed** <br>(count) | Cambio (actualizar/eliminar/añadir) en uno o más atributos de una cuenta Paypal.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.profile.account_closed** <br>(count) | Se cierra la cuenta.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer.user_profile.password_changed** <br>(count) | Resultado de un cambio de contraseña.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.customer_support.chargeback.decision_responded** <br>(count) | Notificación de respuesta de una devolución de cargo.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.identity.authorization_consent.granted** <br>(count) | Se otorga el token de consentimiento del usuario.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.identity.authorization_consent.revoked** <br>(count) | Se revoca el token de consentimiento del usuario.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.invoicing.invoice.cancelled** <br>(count) | El comerciante o el cliente cancela una factura.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.invoicing.invoice.created** <br>(count) | Se crea la factura.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.invoicing.invoice.paid** <br>(count) | Se paga total o parcialmente la factura, o se realiza el pago y queda pendiente.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.invoicing.invoice.refunded** <br>(count) | Se reembolsa total o parcialmente la factura.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.invoicing.invoice.scheduled** <br>(count) | Se programa la factura.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.invoicing.invoice.updated** <br>(count) | Se actualiza la factura.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.loyalty.rewards_payout.completed** <br>(count) | Pago de recompensa de fidelidad al usuario.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.merchant.onboarding.completed** <br>(count) | El comerciante completa la configuración.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.merchant.partner_consent.revoked** <br>(count) | Se revocan los consentimientos para la configuración de una cuenta de comerciante o se cierra una cuenta.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.authorization.created** <br>(count) | Se crea la autorización de pago, se aprueba, se ejecuta o se crea una autorización de pago futura.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.authorization.created_amount** <br>(gauge) | Se crea, aprueba y ejecuta la autorización de pago, o se crea una autorización de pago futura.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.authorization.voided** <br>(count) | Se anula la autorización de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.authorization.voided_amount** <br>(gauge) | Se anula la autorización de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.capture.completed** <br>(count) | Se completa la captura del pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.capture.completed_amount** <br>(gauge) | Se completa la captura del pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.capture.declined** <br>(count) | Se rechaza la captura del pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.capture.declined_amount** <br>(gauge) | Se rechaza la captura del pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.capture.denied** <br>(count) | Se deniega la captura del pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.capture.pending** <br>(count) | La captura del pago cambia a Pendiente.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.capture.pending_amount** <br>(gauge) | La captura del pago cambia a Pendiente.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.capture.refunded** <br>(count) | El comerciante reembolsa una captura de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.capture.refunded_amount** <br>(gauge) | El comerciante reembolsa una captura de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.capture.reversed** <br>(count) | PayPal anula una captura de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.capture.reversed_amount** <br>(gauge) | PayPal anula una captura de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.instrument.replaced** <br>(count) | Instrumento sustituido por otro.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.instrument.updated** <br>(count) | Se actualizan los atributos del instrumento.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.order.cancelled** <br>(count) | Se cancela la orden de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.order.created** <br>(count) | Se crea la orden de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.payoutsbatch.denied** <br>(count) | Se deniega el pago por lotes.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.payoutsbatch.processing** <br>(count) | El pago por lotes cambia a En procesamiento.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.payoutsbatch.success** <br>(count) | Se completa con éxito el pago por lotes.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.payouts_item.blocked** <br>(count) | Se bloquea la partida de pagos.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.payouts_item.canceled** <br>(count) | Se cancela la partida de pagos.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.payouts_item.denied** <br>(count) | Se deniega la partida de pagos.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.payouts_item.failed** <br>(count) | No se ha podido procesar la partida de pagos.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.payouts_item.held** <br>(count) | Se retiene la partida de pagos.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.payouts_item.refunded** <br>(count) | Se reembolsa la partida de pagos.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.payouts_item.returned** <br>(count) | Se devuelve la partida de pagos.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.payouts_item.succeeded** <br>(count) | Se procesa con éxito la partida de pagos.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.payouts_item.unclaimed** <br>(count) | No se solicita la partida de pagos.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.refund.cancelled** <br>(count) | Se anula el reembolso.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.refund.completed** <br>(count) | El comerciante aplica un crédito sin referencia.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.refund.denied** <br>(count) | Se deniega el reembolso.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.refund.failed** <br>(count) | No se ha podido procesar el reembolso.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.refund.pending** <br>(count) | El reembolso está pendiente.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.sale.completed** <br>(count) | Se completa la venta.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.sale.denied** <br>(count) | El estado de una venta cambia de Pendiente a Denegado.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.sale.pending** <br>(count) | El estado de una venta cambia a Pendiente.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.sale.refunded** <br>(count) | Un comerciante reembolsa una venta.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment.sale.reversed** <br>(count) | PayPal anula una venta.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment_networks.instrument.linked_account_failed** <br>(count) | No se ha podido aplicar el instrumento a la cuenta.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment_networks.instrument.linked_account_updated** <br>(count) | Se añade el instrumento correctamente desde el socio bancario.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payment_networks.alternative_payment.completed** <br>(count) | Se completa el pago alternativo.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payments.customer_payouts.completed** <br>(count) | Se envía el pago reservado al banco para su liquidación.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payments.customer_payouts.created** <br>(count) | El pago lleva marca de agua y está reservado.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payments.customer_payouts.failed** <br>(count) | No se ha podido transferir el pago a la cuenta bancaria del comerciante<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payments.customer_payouts.pending** <br>(count) | El pago está en espera debido a las normas de riesgo/conformidad.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payments.customer_payouts.reversed** <br>(count) | Se devuelve el pago al saldo disponible tras 3 reintentos o la expiración del periodo de gracia de 30 días.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.payments.payment.created** <br>(count) | El comprador crea y aprueba el pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.pricing.commission_config.created** <br>(count) | Se crea una nueva configuración de tarifas Zettle.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.pricing.commission_config.provisioned** <br>(count) | PriceConfig está asignado a una organización.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.pricing.commission_config.updated** <br>(count) | Actualización de la categoría de precios existente.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.reporting.report.available** <br>(count) | El informe está disponible.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.risk.dispute.created** <br>(count) | Se crea una disputa de riesgo.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.taxes.reports.delivered** <br>(count) | Se completa la entrega del informe.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.taxes.reports.generated** <br>(count) | Se completa la generación del informe.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.vault.credit_card.created** <br>(count) | Se crea la tarjeta de crédito.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.vault.credit_card.deleted** <br>(count) | Se elimina la tarjeta de crédito.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.vault.credit_card.updated** <br>(count) | Se actualiza la tarjeta de crédito.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.vault.payment_token.created** <br>(count) | Se crea el token de pago para guardar un método de pago.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.vault.payment_token.deleted** <br>(count) | Se elimina el código de pago. La forma de pago del pagador ya no se guarda en el almacén de PayPal.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.vault.payment_token.deletion_initiated** <br>(count) | Se inicia la eliminación del código de método de pago. Actualmente se activa para los casos de uso de PayPal.<br>_Se muestra como unidad_ |
| **ioconnect.paypal.vault.payment_token.updated** <br>(count) | Actualización correcta de una fuente de pago para un ID de token de pago determinado.<br>_Se muestra como unidad_ |

### Checks de servicio

**ioconnect.paypal.service_check**

Devuelve CRITICAL si el proceso Java no se está ejecutando o si hay errores al iniciar el JAR. Devuelve Devuelve OK si el proceso Java se está ejecutando sin problemas.

_Estados: ok, crítico_

.

### Eventos

La integración de Datadog y Paypal no incluye ningún evento.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con el servicio de asistencia de Nova a través de los siguientes canales:

- [support_ddp@novacloud.io](mailto:support_ddp@novacloud.io)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/iocs-dp2i" target="_blank">Haz clic aquí</a> para adquirirla.