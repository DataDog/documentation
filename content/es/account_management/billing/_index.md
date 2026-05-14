---
description: Comprende los ciclos de facturación, los métodos de pago, los cálculos
  de uso y el recuento de hosts con información detallada sobre los precios de los
  productos Datadog.
title: Facturación
---

## Información general

El ciclo de facturación comienza el primer día del mes (UTC), independientemente de la fecha en la que te registres. El primer mes se prorratea en función de la fecha de alta real.

Datadog mide el recuento de hosts y métricas personalizadas cada hora. El recuento facturable de hosts se calcula al final del mes utilizando el recuento máximo (marca de pleamar) del 99 % inferior del uso durante esas horas. Datadog excluye el 1 % superior para reducir el impacto de los picos de uso en tu factura. El recuento facturable de métricas personalizadas se basa en el número medio de horas de métricas personalizadas del mes. Consulta tu [Uso][1] en Datadog. Las páginas de facturación sólo son accesibles para usuarios con el rol de administrador de Datadog.

### Hosts

Un host es cualquier instancia de sistema operativo físico o virtual que monitorizas con Datadog. Puede ser un servidor, una máquina virtual, un nodo (en el caso de Kubernetes), una instancia de un plan de App Service (en el caso de Azure App Service) o un dyno de Heroku (en el caso de la plataforma Heroku). Los hosts pueden ser instancias del Datadog Agent instalado, además de cualquier máquina virtual de Amazon EC2, Google Cloud, Azure o vSphere monitorizada con integraciones de Datadog. Cualquier EC2 o máquina virtual con el Agent instalado cuenta como una instancia única (no hay doble facturación).

Los hosts que no informan (estado `INACTIVE` en tu [lista de infraestructuras][2]) no cuentan para la facturación. Estos hosts pueden tardar hasta 2 horas en salir de [la lista de infraestructuras][2]. Datadog conserva los datos históricos de estos hosts (cuentas de pago). Las métricas se pueden graficar en un dashboard sabiendo el nombre del host específico o etiquetas (tags).

### Contenedores

Se recomienda que los contenedores se monitoricen con un único Agent contenedorizado por host. Este Agent recopila métricas tanto del contenedor como del host. Si decides instalar el Agent directamente en cada contenedor, cada contenedor se contabilizará como un host desde el punto de vista de la facturación. Para más información, consulta la documentación sobre la [instalación del Agent][3].

### Serverless

La facturación de Datadog se basa en el número medio de funciones ejecutadas por hora durante todo el mes en cada una de tus cuentas. Cada hora, Datadog registra el número de funciones que se han ejecutado una o más veces y que se han monitorizado mediante tu cuenta Datadog. Al final del mes, Datadog cobra calculando la media del número de funciones por hora registradas. Los planes Pro y Enterprise incluyen cinco métricas personalizadas por función facturable.

La facturación de APM serverless se basa en la suma de invocaciones de AWS Lambda conectadas a tramos (spans) ingeridos de APM en un mes concreto. También se te cobrará por el número total de [tramos indexados][4] enviados al servicio APM de Datadog que superen la cantidad incluida al final del mes. Cuando se utiliza serverless no se cobran los [hosts de APM][4].

Para obtener más información, consulta la [página de facturación de Serverless][5] y la [página Precios de Datadog][6].

### IoT

Datadog mide el recuento de dispositivos de IoT cada hora. El recuento facturable de dispositivos de IoT se calcula al final del mes utilizando el recuento máximo (marca de pleamar) del 99 % inferior del uso durante esas horas, excluyendo el 1 % superior para reducir el impacto de los picos de uso en tu factura.

Para obtener más información sobre la facturación de IoT, consulta la [página Precios de Datadog][7].

## Información sobre tu plan

Para gestionar tu **Método de pago** y ver los **Detalles de suscripción**, debes ser usuario administrador de Datadog.

Alternativamente, los roles con [permisos][8] de Lectura de facturación (`billing_read`) y Edición de facturación (`billing_edit`) pueden acceder a estos datos.

### Gestionar el método de pago

La sección [**Método de pago**][9] contiene detalles sobre tus opciones de pago. 

{{< img src="account_management/billing/PaymentMethodOverview.png" alt="Método de pago en la página Plan" style="width:90%;" >}}

La opción de **Editar pago** permite gestionar los métodos de pago. Puedes editar o eliminar tarjetas y solicitar el cambio del método de pago de tarjeta a transferencia o cheque y viceversa.

{{< img src="account_management/billing/PaymentSettingsDetails.png" alt="Parámetros de pago en la página Plan" style="width:90%;" >}}

### Gestionar los datos de contacto para la facturación

Puedes consultar los datos de contacto de facturación en la sección [**Datos de contacto de facturación**][9]. 

{{< img src="account_management/billing/BillingContactDetailsOverview.png" alt="Datos de contacto de facturación en la página Plan" style="width:90%;" >}}

En **Editar datos** se puede añadir, editar o eliminar la dirección de facturación. También es posible especificar las direcciones de correo electrónico a las que deben enviarse las facturas.

{{< img src="account_management/billing/BillingContactDetailsEdit.png" alt="Editar los datos de contacto de facturación en la página Plan" style="width:90%;" >}}

**Nota**: No es necesario que la dirección de correo electrónico sea de un miembro del equipo dentro de Datadog. Por ejemplo, se puede utilizar `invoices@example.com`.

### Consultar los datos de suscripción

La sección [Datos de la suscripción][9] incluye la cantidad, el precio del contrato y el precio bajo demanda de todos los productos comprometidos.

{{< img src="/account_management/billing/subscription_details.png" alt="Página Plan y uso de la cuenta en la que se destaca la sección Datos de suscripción" style="width:90%;" >}}

**Nota**: Si tu facturación se gestiona directamente a través de un servicio asociado de Datadog, los datos de suscripción no estarán disponibles.

## Pago

Puedes elegir entre dos opciones de pago diferentes:
- Tarjeta de crédito
- Otro método de pago (transferencia ACH, transferencia bancaria o cheque)

### Tarjeta de crédito

Si pagas con tarjeta de crédito, los recibos de los meses anteriores están a disposición de los [Administradores][10] en [Historial de facturación][11]. Para obtener copias de tu factura, envía un correo electrónico a [Facturación de Datadog][13].

Para más información, consulta la página [Facturación con tarjeta de crédito][9].

### Otro método de pago

Si pagas con cheque, ACH o transferencia, las facturas se envían por correo electrónico a las direcciones de facturación cerca del décimo día laborable de cada mes. Para solicitar una copia adicional, envía un correo electrónico a [Facturación de Datadog][13]. En la factura encontrarás información sobre dónde remitir el pago.

## Información de contacto

| Consulta                                                                                                                                                                               | Información de contacto                      |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| Reclamación y solicitud de crédito<br>Uso<br>Cambio de método de pago<br>Consulta sobre el pago<br>Cuestiones generales de la cuenta<br>Actualizar contactos<br>Extracto de la cuenta<br>Actualizar la información de facturación y envío | success@datadoghq.com        |
| Copias de facturas<br>Solicitudes de cobro urgentes<br>Desglose de la facturación<br>Invitación al portal                                                                                                        | billing@datadoghq.com        |
| Envío de pagos                                                                                                                                                                                | remittances@datadoghq.com    |
| Copias de órdenes de compra                                                                                                                                                                             | purchaseorders@datadoghq.com |

## Referencias adicionales

{{< whatsnext desc="Temas específicos de facturación:">}}
    {{< nextlink href="account_management/billing/pricing/" >}}Precios{{< /nextlink >}}
    {{< nextlink href="account_management/plan_and_usage/usage_details/" >}}Detalles de uso{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}Métricas de uso{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}Tarjeta de crédito{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}Métricas personalizadas{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}Contenedores{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}Administración de logs{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM (Rastreo distribuido y perfilador continuo){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}Real User Monitoring{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ci_visibility/" >}}CI Visibility{{< /nextlink >}}
    {{< nextlink href="account_management/billing/aws/" >}}Integración de AWS{{< /nextlink >}}
    {{< nextlink href="account_management/billing/azure/" >}}Integración de Azure{{< /nextlink >}}
    {{< nextlink href="account_management/billing/alibaba/" >}}Integración de Alibaba{{< /nextlink >}}
    {{< nextlink href="account_management/billing/google_cloud/" >}}Integración de Google Cloud{{< /nextlink >}}
    {{< nextlink href="account_management/billing/vsphere/" >}}Integración de vSphere{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_attribution/" >}}Atribución de uso{{< /nextlink >}}
{{< /whatsnext >}}



[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /es/infrastructure/
[3]: /es/agent/
[4]: /es/account_management/billing/pricing/#apm
[5]: /es/account_management/billing/serverless
[6]: https://www.datadoghq.com/pricing/?product=serverless#serverless
[7]: https://www.datadoghq.com/pricing/
[8]: /es/account_management/rbac/permissions/#billing-and-usage
[9]: https://app.datadoghq.com/billing/plan
[10]: /es/account_management/rbac/#datadog-default-roles
[11]: https://app.datadoghq.com/account/billing_history
[12]: /es/account_management/billing/credit_card/
[13]: mailto:billing@datadoghq.com