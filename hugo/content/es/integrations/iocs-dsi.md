---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/iocs_dsi
app_id: iocs-dsi
categories:
- marketplace
- nube
custom_kind: integración
description: Monitoriza métricas de ingresos y transacciones de Stripe.
integration_version: 1.0.2
media:
- caption: 'Stripe® Execs: Gestión de cuentas y aplicaciones'
  image_url: images/StripeAccountAndApplicationManagement.png
  media_type: imagen
- caption: 'Stripe® Execs: Interacción con el cliente'
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
supported_os:
- linux
title: Stripe®
---
## Información general

Obtén información valiosa de tus eventos de Stripe® con nuestra integración continua de Datadog **basada en el Agent**. Stripe® es una plataforma líder en el procesamiento de pagos en línea que permite a las empresas aceptar pagos, gestionar suscripciones y dirigir una variedad de operaciones financieras en todo el mundo. Esta integración ayuda a las empresas a monitorizar y visualizar más de 200 métricas de sus transacciones de Stripe® sin ningún esfuerzo, lo que permite una monitorización y un análisis exhaustivos. [Más información sobre Stripe](https://www.stripe.com/).

Esta solución proporciona información general completa de eventos de pago, seguimiento de ingresos y monitorización de errores, lo que te ayuda a tomar decisiones informadas para optimizar tus operaciones financieras.

Características principales:

- Monitorización: Realiza un seguimiento y analiza las transacciones de pagos, las suscripciones y la actividad de los clientes para obtener una visibilidad instantánea de tus datos de Stripe®.
- Amplia cobertura de métricas: Admite más de 200 eventos clave de Stripe®, ofreciendo información detallada sobre tendencias de pago, frecuencias de error y rendimiento financiero.
- Monitor y dashboard preconfigurados: Despliega al instante un dashboard totalmente personalizable y configura un monitor para detectar anomalías. Esto te permitirá anticiparte a posibles problemas antes de que afecten a tu empresa.
- Manejo continuo de datos: Captura eventos de Stripe® a través de un webhook, procesa los datos de forma eficiente y los envía directamente a Datadog, reduciendo la latencia y proporcionando una experiencia de monitorización fiable.
- Escalable y fiable: Creado para manejar grandes volúmenes de eventos de Stripe®, asegurando que incluso las empresas en crecimiento puedan confiar en esta integración para obtener informes de datos precisos y oportunos seleccionando qué eventos escuchar de Stripe® en diferentes webhooks.

Con esta integración, puedes transformar sin ningún esfuerzo datos de eventos de Stripe® en información práctica, lo que permitirá a tu empresa tomar decisiones basadas en datos con confianza.

**Nota de seguridad importante:**
Esta integración no almacena ni procesa ninguna información de pago confidencial (como información de tarjetas de crédito o datos personales de clientes). Solo captura eventos como métricas de recuento y cantidad de transacciones de intento de pago como métricas gauge, garantizando que tus datos financieros permanezcan seguros a la vez que se respeta el pleno cumplimiento de las normativas del sector, como PCI-DSS.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **ioconnect.stripe.agent** <br>(gauge) | Mostrar agentes de la integración de Datadog con Stripe en línea<br>_Se muestra como unidad_ |
| **ioconnect.stripe.account.application.authorized** <br>(count) | El usuario autoriza una aplicación. Enviado solo a la aplicación relacionada.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.account.application.deauthorized** <br>(count) | El usuario desautoriza una aplicación. Enviado solo a la aplicación relacionada.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.account.external_account.created** <br>(count) | Se crea la cuenta externa.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.account.external_account.deleted** <br>(count) | Se borra la cuenta externa.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.account.external_account.updated** <br>(count) | Se actualiza la cuenta externa.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.account.updated** <br>(count) | El estado de la cuenta o la propiedad han cambiado.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.application_fee.created** <br>(count) | La tarifa de la aplicación se crea en un cargo.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.application_fee.refund.updated** <br>(count) | Se actualiza el reembolso de la tarifa de la aplicación.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.application_fee.refunded** <br>(count) | Se reembolsa la tarifa de la aplicación, ya sea por reembolso de un cargo o reembolso directo de la tarifa de la aplicación. Esto incluye reembolsos parciales.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.balance.available** <br>(count) | El saldo de Stripe se ha actualizado (por ejemplo, el cargo está disponible para ser abonado). Por defecto, Stripe transfiere automáticamente los fondos de tu saldo a tu cuenta bancaria diariamente. Este evento no se activa para transacciones negativas.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.billing.alert.triggered** <br>(count) | Se alcanza el umbral de alerta personalizado.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.billing_portal.configuration.created** <br>(count) | Se crea la configuración del portal.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.billing_portal.configuration.updated** <br>(count) | Se actualiza la configuración del portal.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.billing_portal.session.created** <br>(count) | Se crea la sesión del portal.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.capability.updated** <br>(count) | La capacidad tiene nuevos requisitos o un nuevo estado.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.cash_balance.funds_available** <br>(count) | Saldo de caja restante positivo después de que Stripe concilie automáticamente nuevos fondos en el saldo de caja. Si has activado la conciliación manual, este webhook se activará siempre que haya nuevos fondos en el saldo de caja.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.captured** <br>(count) | El cargo no capturado previamente es capturado.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.dispute.closed** <br>(count) | La disputa se cierra y su estado cambia a perdida, advertencia_cerrada o ganada.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.dispute.created** <br>(count) | El cliente disputa un cargo con su banco.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.dispute.funds_reinstated** <br>(count) | Los fondos se reintegran en tu cuenta después de cerrar una disputa. Esto incluye los pagos parcialmente reembolsados.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.dispute.funds_withdrawn** <br>(count) | Los fondos se retiran de tu cuenta debido a una disputa.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.dispute.updated** <br>(count) | Se actualiza la disputa (normalmente con pruebas).<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.expired** <br>(count) | El cargo no capturado expira.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.failed** <br>(count) | Intento de cargo fallido.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.pending** <br>(count) | Se crea el cargo pendiente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.refund.updated** <br>(count) | Se actualiza el reembolso en los métodos de pago seleccionados.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.refunded** <br>(count) | Se reembolsa el cargo, incluidos los reembolsos parciales.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.succeeded** <br>(count) | El cargo se ha realizado correctamente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.charge.updated** <br>(count) | Se actualiza la descripción del cargo o los metadatos, o en una captura asíncrona.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.checkout.session.async_payment_failed** <br>(count) | El intento de pago utilizando un método de pago diferido falla.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.checkout.session.async_payment_succeeded** <br>(count) | El intento de pago utilizando un método de pago diferido finalmente se realiza correctamente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.checkout.session.completed** <br>(count) | La sesión de pago ha finalizado correctamente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.checkout.session.expired** <br>(count) | La sesión de pago ha expirado.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.climate.order.canceled** <br>(count) | Se cancela el pedido del clima.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.climate.order.created** <br>(count) | Se crea el pedido del clima.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.climate.order.delayed** <br>(count) | Se retrasa el pedido del clima.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.climate.order.delivered** <br>(count) | Se entrega el pedido del clima.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.climate.product.created** <br>(count) | Se crea el producto del clima.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.climate.order.product_substituted** <br>(count) | El producto del pedido del clima se sustituye por otro.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.climate.product.pricing_updated** <br>(count) | Se actualiza el producto del clima.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.coupon.created** <br>(count) | Se crea el cupón.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.coupon.deleted** <br>(count) | Se elimina el cupón.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.coupon.updated** <br>(count) | Se actualiza el cupón.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.credit_note.created** <br>(count) | Se crea la nota de crédito.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.credit_note.updated** <br>(count) | Se actualiza la nota de crédito.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.credit_note.voided** <br>(count) | Se elimina el crédito.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer_cash_balance_transaction.created** <br>(count) | Se crea una nueva transacción de saldo de caja del cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.created** <br>(count) | Se crea un nuevo cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.deleted** <br>(count) | Se elimina el cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.discount.created** <br>(count) | El cupón está vinculado a un cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.discount.deleted** <br>(count) | El cupón se retira de un cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.discount.updated** <br>(count) | El cliente pasa de un cupón a otro.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.source.created** <br>(count) | Se crea una nueva fuente para un cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.source.deleted** <br>(count) | Se elimina una fuente de un cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.source.expiring** <br>(count) | La tarjeta o la fuente expirarán al final del mes. Este evento solo funciona con integraciones legacy que utilizan los objetos tarjeta o fuente. Si utilizas la API de PaymentMethod, este evento no se producirá.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.source.updated** <br>(count) | Se cambia la información de la fuente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.subscription.created** <br>(count) | El cliente se ha suscrito a un nuevo plan.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.subscription.deleted** <br>(count) | Finaliza la suscripción del cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.subscription.paused** <br>(count) | La suscripción del cliente está en pausa. Solo se aplica cuando las suscripciones entran en estado pausado, no cuando se pausa el cobro del pago.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.subscription.pending_update_applied** <br>(count) | Se aplica la actualización pendiente de la suscripción del cliente y se actualiza la suscripción.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.subscription.pending_update_expired** <br>(count) | La actualización pendiente de la suscripción del cliente expira antes de que se pague la factura relacionada.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.subscription.resumed** <br>(count) | La suscripción del cliente ya no está en pausa. Solo se aplica con estado pausado cuando se reanuda la suscripción, no cuando se reanuda el cobro del pago.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.subscription.trial_will_end** <br>(count) | Se produce tres días antes de que finalice el periodo de prueba de una suscripción, o la prueba finaliza inmediatamente (utilizando trial_end=now).<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.subscription.updated** <br>(count) | Cambios en la suscripción (por ejemplo, pasar de un plan a otro o cambiar el estado de prueba a activo).<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.tax_id.created** <br>(count) | Se crea un número de identificación fiscal para un cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.tax_id.deleted** <br>(count) | Se elimina el número de identificación fiscal de un cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.tax_id.updated** <br>(count) | Se actualiza el número de identificación fiscal del cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.customer.updated** <br>(count) | Cambia la propiedad de un cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.entitlements.active_entitlement_summary.updated** <br>(count) | Cambian los derechos del cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.file.created** <br>(count) | El nuevo archivo generado por Stripe está disponible para tu cuenta.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.financial_connections.account.created** <br>(count) | Se crea una nueva cuenta de Financial Connections.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.financial_connections.account.deactivated** <br>(count) | El estado de la cuenta de Financial Connections se actualiza de activo a inactivo.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.financial_connections.account.disconnected** <br>(count) | La cuenta de Financial Connections está desconectada.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.financial_connections.account.reactivated** <br>(count) | El estado de la cuenta de Financial Connections se actualiza de inactiva a activa.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.financial_connections.account.refreshed_balance** <br>(count) | El estado de actualización del saldo de la cuenta cambia de pendiente a correcto o fallido.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.financial_connections.account.refreshed_ownership** <br>(count) | El estado de actualización de la propiedad de la cuenta cambia de pendiente a correcto o fallido.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.financial_connections.account.refreshed_transactions** <br>(count) | El estado de actualización de las transacciones de la cuenta cambia de pendiente a correcto o fallido.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.identity.verification_session.canceled** <br>(count) | Se cancela VerificationSession.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.identity.verification_session.created** <br>(count) | Se crea VerificationSession.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.identity.verification_session.processing** <br>(count) | VerificationSession cambia a procesamiento.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.identity.verification_session.redacted** <br>(count) | Se redacta VerificationSession.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.identity.verification_session.requires_input** <br>(count) | VerificationSession cambia para requerir la entrada del usuario.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.identity.verification_session.verified** <br>(count) | VerificationSession cambia a verificado.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.created** <br>(count) | Se crea una nueva factura. Para saber cómo se pueden utilizar los webhooks con este evento y cómo pueden afectarlo, consulta Uso de webhooks con suscripciones.<br>_Se muestra como unidad_. |
| **ioconnect.stripe.invoice.deleted** <br>(count) | Se elimina el borrador de la factura. Nota: Este evento no se envía para las vistas previas de facturas.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.finalization_failed** <br>(count) | El borrador de la factura no se puede finalizar. Consulta el último error de finalización de la factura para obtener más detalles.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.finalized** <br>(count) | El borrador de la factura se finaliza y se actualiza para ser una factura abierta.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.marked_uncollectible** <br>(count) | La factura se marca como incobrable.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.overdue** <br>(count) | Se produce X días después del vencimiento de una factura, donde X es determinado por Automations.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.paid** <br>(count) | El intento de pago de la factura se realiza correctamente o una factura se marca como pagada fuera de banda.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.payment_action_required** <br>(count) | El intento de pago de la factura requiere otra acción del usuario para finalizar.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.payment_failed** <br>(count) | El intento de pago de la factura falla, debido a un pago rechazado o a la falta de un método de pago almacenado.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.payment_succeeded** <br>(count) | El intento de pago de la factura se realiza correctamente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.sent** <br>(count) | Se envía la factura por correo electrónico.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.upcoming** <br>(count) | Se produce X días antes de que una suscripción cree una factura que se carga automáticamente, donde X es determinado por la configuración de tus suscripciones. Nota: El objeto Factura recibido no tendrá un ID de factura.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.updated** <br>(count) | Cambios en la factura (por ejemplo, el importe de la factura).<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.voided** <br>(count) | Se anula la factura.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoice.will_be_due** <br>(count) | Se produce X días antes del vencimiento de una factura, donde X es determinado por Automations).<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoiceitem.created** <br>(count) | Se crea el artículo de la factura.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.invoiceitem.deleted** <br>(count) | Se elimina el elemento de la factura.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_authorization.created** <br>(count) | Se crea la autorización.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_authorization.request** <br>(count) | Representa una solicitud síncrona de autorización. Consulta Uso de la integración para gestionar solicitudes de autorización.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_authorization.updated** <br>(count) | Se actualiza la autorización.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_card.created** <br>(count) | Se crea la tarjeta.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_card.updated** <br>(count) | Se actualiza la tarjeta.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_cardholder.created** <br>(count) | Se crea el titular de la tarjeta.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_cardholder.updated** <br>(count) | Se actualiza el titular de la tarjeta.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_dispute.closed** <br>(count) | Se gana, se pierde o caduca la disputa.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_dispute.created** <br>(count) | Se crea la disputa.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_dispute.funds_reinstated** <br>(count) | Los fondos se reintegran en tu cuenta por una disputa de emisión.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_dispute.funds_rescinded** <br>(count) | Los fondos se deducen de tu cuenta por una disputa de emisión.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_dispute.submitted** <br>(count) | Se envía la disputa.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_dispute.updated** <br>(count) | Se actualiza la disputa.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_personalization_design.activated** <br>(count) | El diseño de personalización se activa tras la activación del paquete físico al que pertenece.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_personalization_design.deactivated** <br>(count) | El diseño de personalización se desactiva tras la desactivación del paquete físico al que pertenece.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_personalization_design.rejected** <br>(count) | El diseño de personalización es rechazado por la revisión de diseño.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_personalization_design.updated** <br>(count) | Se actualiza el diseño de la personalización.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_token.created** <br>(count) | Se crea el token del monedero digital emisor.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_token.updated** <br>(count) | Se actualiza el token del monedero digital emisor.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_transaction.created** <br>(count) | Se crea la transacción de emisión.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.issuing_transaction.updated** <br>(count) | Se actualiza la transacción de emisión.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.mandate.updated** <br>(count) | Se actualiza el mandato.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.amount_capturable_updated** <br>(count) | PaymentIntent tiene fondos para colectar. Comprueba la propiedad monto_capturable de PaymentIntent para determinar el importe que puede colectarse. Puedes capturar PaymentIntent con un valor de monto_por_colectar hasta el importe especificado. Más información sobre la captura de PaymentIntents.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.amount_capturable_updated_amount** <br>(gauge) | PaymentIntent tiene fondos para colectar. Comprueba la propiedad monto_capturable de PaymentIntent para determinar el importe que puede colectarse. Puedes capturar PaymentIntent con un valor de monto_por_colectar hasta el importe especificado. Más información sobre la captura de PaymentIntents.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.canceled** <br>(count) | Se cancela PaymentIntent.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.canceled_amount** <br>(gauge) | Se cancela PaymentIntent.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.created** <br>(count) | Se crea un nuevo PaymentIntent.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.created_amount** <br>(gauge) | Se crea un nuevo PaymentIntent.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.partially_funded** <br>(count) | Los fondos se aplican a un PaymentIntent de saldo_de_cliente y el 'importe_restante' cambia.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.partially_funded_amount** <br>(gauge) | Los fondos se aplican a un PaymentIntent de saldo_de_cliente y el 'importe_restante' cambia.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.payment_failed** <br>(count) | PaymentIntent ha fallado el intento de crear un método de pago o un pago.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.payment_failed_amount** <br>(gauge) | PaymentIntent ha fallado el intento de crear un método de pago o un pago.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.processing** <br>(count) | PaymentIntent ha comenzado a procesar.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.processing_amount** <br>(gauge) | PaymentIntent ha comenzado a procesar.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.requires_action** <br>(count) | PaymentIntent cambia al estado requiere_acción.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.requires_action_amount** <br>(gauge) | PaymentIntent cambia al estado requiere_acción.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.succeeded** <br>(count) | PaymentIntent ha finalizado el pago correctamente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_intent.succeeded_amount** <br>(gauge) | PaymentIntent ha finalizado el pago correctamente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_link.created** <br>(count) | Se crea el enlace de pago.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_link.updated** <br>(count) | Se actualiza el enlace de pago.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_method.attached** <br>(count) | Se adjunta un nuevo método de pago a un cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_method.automatically_updated** <br>(count) | Los datos del método de pago son actualizados automáticamente por la red.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_method.detached** <br>(count) | El método de pago se desasocia de un cliente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payment_method.updated** <br>(count) | El método de pago se actualiza a través de la API de actualización PaymentMethod.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payout.canceled** <br>(count) | Se cancela el pago.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payout.created** <br>(count) | Se crea el pago.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payout.failed** <br>(count) | Intento de pago fallido.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payout.paid** <br>(count) | Se espera que el pago esté disponible en la cuenta de destino. Si el pago falla, también se envía una notificación payout.failed, en un momento posterior.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.payout.reconciliation_completed** <br>(count) | Se pueden consultar las transacciones de saldo pagadas en un pago automático.<br>_Se muestra como unidad_. |
| **ioconnect.stripe.payout.updated** <br>(count) | Se actualiza el pago.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.person.created** <br>(count) | Se crea la persona asociada a una cuenta.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.person.deleted** <br>(count) | Se elimina la persona asociada a una cuenta.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.person.updated** <br>(count) | Se actualiza la persona asociada a una cuenta.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.plan.created** <br>(count) | Se crea el plan.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.plan.deleted** <br>(count) | Se elimina el plan.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.plan.updated** <br>(count) | Se actualiza el plan.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.price.created** <br>(count) | Se crea el precio.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.price.deleted** <br>(count) | Se elimina el precio.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.price.updated** <br>(count) | Se actualiza el precio.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.product.created** <br>(count) | Se crea el producto.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.product.deleted** <br>(count) | Se elimina el producto.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.product.updated** <br>(count) | Se actualiza el producto.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.promotion_code.created** <br>(count) | Se crea el código de promoción.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.promotion_code.updated** <br>(count) | Se actualiza el código de promoción.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.quote.accepted** <br>(count) | Se acepta el presupuesto.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.quote.canceled** <br>(count) | Se cancela el presupuesto.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.quote.created** <br>(count) | Se crea el presupuesto.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.quote.finalized** <br>(count) | Se finaliza el presupuesto.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.radar.early_fraud_warning.created** <br>(count) | <br>_Se muestra como unidad_ |
| **ioconnect.stripe.radar.early_fraud_warning.updated** <br>(count) | <br>_Se muestra como unidad_ |
| **ioconnect.stripe.refund.created** <br>(count) | Se crea una alerta temprana de fraude.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.refund.updated** <br>(count) | Se actualiza la alerta temprana de fraude.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.reporting.report_run.failed** <br>(count) | No se ha podido completar el informe solicitado.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.reporting.report_run.succeeded** <br>(count) | ReportRun solicitado ha finalizado correctamente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.reporting.report_type.updated** <br>(count) | Se actualiza ReportType (normalmente para indicar que los datos de un nuevo día están disponibles).<br>_Se muestra como unidad_ |
| **ioconnect.stripe.review.closed** <br>(count) | Se cierra la revisión. El campo de motivo de la revisión indica por qué: aprobada, en disputa, reembolsada o reembolsada_como_fraude.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.review.opened** <br>(count) | Se abre la revisión.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.setup_intent.canceled** <br>(count) | Se cancela SetupIntent.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.setup_intent.created** <br>(count) | Se crea un nuevo SetupIntent.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.setup_intent.requires_action** <br>(count) | SetupIntent está en estado requiere_acción.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.setup_intent.setup_failed** <br>(count) | SetupIntent ha fallado en el intento de configurar un método de pago.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.setup_intent.succeeded** <br>(count) | SetupIntent ha configurado un método de pago correctamente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.sigma.scheduled_query_run.created** <br>(count) | Finaliza la ejecución de la consulta programada Sigma.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.source.canceled** <br>(count) | Se cancela la fuente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.source.chargeable** <br>(count) | La fuente cambia a cobrable.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.source.failed** <br>(count) | Falla la fuente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.source.mandate_notification** <br>(count) | El método de notificación del mandato de fuente está configurado como manual.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.source.refund_attributes_required** <br>(count) | Los atributos de reembolso son necesarios en un receptor fuente para procesar un reembolso o un pago erróneo.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.source.transaction.created** <br>(count) | Se crea la transacción de la fuente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.source.transaction.updated** <br>(count) | Se actualiza la transacción de la fuente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.subscription_schedule.aborted** <br>(count) | El cronograma de la suscripción se cancela debido a que la suscripción subyacente se cancela por morosidad.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.subscription_schedule.canceled** <br>(count) | Se cancela el cronograma de la la suscripción.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.subscription_schedule.completed** <br>(count) | Finaliza el cronograma de la nueva suscripción.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.subscription_schedule.created** <br>(count) | Se crea el cronograma de la nueva suscripción.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.subscription_schedule.expiring** <br>(count) | Se produce siete días antes de que expire el cronograma de una suscripción.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.subscription_schedule.released** <br>(count) | Se publica el cronograma de la nueva suscripción.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.subscription_schedule.updated** <br>(count) | Se actualiza el cronograma de la la suscripción.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.tax_rate.created** <br>(count) | Se crea una nueva tasa impositiva.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.tax.settings.updated** <br>(count) | Se actualiza la configuración de impuestos.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.tax_rate.updated** <br>(count) | Se actualiza la tasa impositiva.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.terminal.reader.action_failed** <br>(count) | La acción de envío a un lector final ha fallado.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.terminal.reader.action_succeeded** <br>(count) | La acción de envío a un lector final se ha realizado correctamente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.test_helpers.test_clock.advancing** <br>(count) | El reloj de test empieza a avanzar.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.test_helpers.test_clock.created** <br>(count) | Se crea el reloj de test.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.test_helpers.test_clock.deleted** <br>(count) | Se elimina el reloj de test.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.test_helpers.test_clock.internal_failure** <br>(count) | El reloj de test falla al no avanzar su tiempo congelado.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.test_helpers.test_clock.ready** <br>(count) | El reloj de test cambia a un estado listo.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.topup.canceled** <br>(count) | Se cancela la recarga.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.topup.created** <br>(count) | Se crea la recarga.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.topup.failed** <br>(count) | Falla la recarga.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.topup.reversed** <br>(count) | Se invierte la recarga.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.topup.succeeded** <br>(count) | La recarga se realiza correctamente.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.transfer.created** <br>(count) | Se crea la transferencia.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.transfer.reversed** <br>(count) | La transferencia se revierte, incluidas las reversiones parciales.<br>_Se muestra como unidad_ |
| **ioconnect.stripe.transfer.updated** <br>(count) | Se actualiza la descripción o los metadatos de la transferencia.<br>_Se muestra como unidad_ |

### Checks de servicio

**ioconnect.stripe.service_check**

Devuelve CRITICAL si el proceso Java no se está ejecutando o si hay errores al iniciar el JAR. Devuelve OK si el proceso Java se está ejecutando sin problemas.

_Estados: ok, crítico_

### Eventos

La integración de Datadog y Stripe no incluye eventos.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con el servicio de asistencia de Nova a través de los siguientes canales:

- Correo electrónico: [support_ddp@novacloud.io](mailto:support_ddp@novacloud.io)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/iocs-dsi" target="_blank">Haz clic aquí</a> para adquirirla.