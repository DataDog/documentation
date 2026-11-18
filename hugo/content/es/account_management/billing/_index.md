---
description: Comprenda los ciclos de facturación, los métodos de pago, los cálculos
  de uso y el conteo de servidores con información detallada de precios para los productos
  de Datadog.
title: Facturación
---
## Descripción general {#overview}

El ciclo de facturación comienza el primero del mes (UTC) independientemente de cuándo se registre. Su primer mes se prorratea según su fecha real de registro.

Datadog mide cada hora el número de servidores y de Custom Metrics. La cantidad facturable de servidores se calcula al final del mes utilizando la cantidad máxima (marca de agua alta) del 99 por ciento inferior de uso para esas horas. Datadog excluye el 1 por ciento superior para reducir el impacto de los picos de uso en su factura. El conteo facturable de Custom Metrics se basa en el número promedio de horas de Custom Metrics durante el mes. Consulte su [Usage][1] en Datadog. Las páginas de facturación solo son accesibles para usuarios con el rol de Datadog Admin.

### Hosts {#hosts}

Un servidor es cualquier instancia física o virtual de un sistema operativo que usted monitorea con Datadog. Podría ser un servidor, una VM, un nodo (en el caso de Kubernetes), una instancia de App Service Plan (en el caso de Azure App Service) o un dyno de Heroku (en el caso de la plataforma Heroku). Los servidores pueden ser instancias con el Datadog Agent instalado, además de instancias de Amazon EC2 o VM de Google Cloud, Azure o vSphere monitoreadas mediante Integrations de Datadog. Cualquier instancia de EC2 o VM con el Agent instalado cuenta como una sola instancia (sin doble facturación).

Los servidores que no reportan (estado `INACTIVE` en su [Infrastructure list][2]) no cuentan para la facturación. Estos servidores pueden tardar hasta 2 horas en desaparecer de la [Infrastructure List][2]. Datadog conserva los datos históricos de estos servidores (cuentas pagas). Las métricas se pueden graficar en un tablero conociendo el nombre específico del servidor o las etiquetas.

### Containers {#containers}

Se recomienda monitorear los contenedores con un solo Agent en un contenedor por servidor. Este Agent recopila métricas tanto del contenedor como del servidor. Si elige instalar el Agent directamente en cada contenedor, cada contenedor se cuenta como un servidor a efectos de facturación. Puede encontrar más detalles en la documentación de [instalación del Agent][3].

### Serverless {#serverless}

Datadog factura en función del número promedio de funciones por hora a lo largo del mes para sus cuentas. Cada hora, Datadog registra el número de funciones que se ejecutaron una o más veces y que fueron monitoreadas por su cuenta de Datadog. Al final del mes, Datadog realiza el cobro calculando el promedio del número de funciones registradas por hora. Los planes Pro y Enterprise incluyen cinco Custom Metrics por función facturable.

La facturación de APM de Serverless se basa en la suma de las invocaciones de AWS Lambda conectadas a los spans ingeridos por APM en un mes determinado. También se le facturará por el número total de [spans indexados][4] enviados al servicio Datadog APM que excedan la cantidad incluida al final del mes. No hay [hosts de APM][4] facturables cuando se utiliza Serverless.

Para obtener más información, consulte la [página de facturación de Serverless][5] y la [página de precios de Datadog][6].

### IoT {#iot}

Datadog mide el recuento de dispositivos IoT cada hora. El recuento facturable de dispositivos IoT se calcula al final del mes utilizando el recuento máximo (marca de nivel alto) del 99 por ciento inferior de uso para esas horas, excluyendo el 1 por ciento superior para reducir el impacto de los picos de uso en su factura.

Para obtener más información sobre la facturación de IoT, consulte la [página de precios de Datadog][7].

## Detalles del plan {#plan-details}

Para administrar su {{< ui >}}Payment Method{{< /ui >}} y ver {{< ui >}}Subscription Details{{< /ui >}}, debe ser un usuario Datadog Admin.

Alternativamente, los roles con los [permisos][8] Billing Read (`billing_read`) y Contract Read (`contract_read`) pueden ver estos datos. Para administrar su método de pago también se requiere el permiso Billing Edit (`billing_edit`).

### Administración de su método de pago {#managing-your-payment-method}

La sección [**Payment Method**][9] contiene detalles sobre sus opciones de pago. 

{{< img src="account_management/billing/PaymentMethodOverview.png" alt="Método de pago en la página Plan" style="width:90%;" >}}

{{< ui >}}Edit Payment{{< /ui >}} proporciona opciones para administrar los métodos de pago. Puede editar o eliminar tarjetas, y solicitar el cambio de su método de pago de tarjeta a factura y viceversa. 

{{< img src="account_management/billing/PaymentSettingsDetails.png" alt="Configuración de pago en la página Plan" style="width:90%;" >}}

### Administración de sus datos de contacto de facturación {#managing-your-billing-contact-details}

Puede ver sus datos de contacto de facturación en la sección [**Billing Contact Details**][9]. 

{{< img src="account_management/billing/BillingContactDetailsOverview.png" alt="Datos de contacto de facturación en la página Plan" style="width:90%;" >}}

{{< ui >}}Edit Details{{< /ui >}} para agregar, editar o eliminar su dirección de facturación. También puede especificar las direcciones de correo electrónico a las que se deben enviar las facturas.

{{< img src="account_management/billing/BillingContactDetailsEdit.png" alt="Edición de los datos de contacto de facturación en la página Plan" style="width:90%;" >}}

**Nota**: La dirección de correo electrónico no tiene que pertenecer a un miembro del equipo de Datadog. Por ejemplo, podría usar `invoices@example.com`.

### Consulte los detalles de su suscripción {#view-your-subscription-details}

La sección [Subscription Details][9] incluye la cantidad, el precio del contrato y el precio bajo demanda de todos los productos contratados.

{{< img src="/account_management/billing/subscription_details.png" alt="Página Account Plan & Usage que resalta la sección Subscription Details" style="width:90%;" >}}

**Nota**: Si su facturación se gestiona directamente a través de un socio de Datadog, Subscription Details no está disponible.

## Pago {#payment}

Existen dos opciones para el método de pago:
- Tarjeta de crédito
- Facturación (ACH, transferencia bancaria o cheque)

### Tarjeta de crédito {#credit-card}

Si paga con tarjeta de crédito, los recibos de los meses anteriores están disponibles para los [Administrators][10] en [Billing History][11]. Para obtener copias de su factura, envíe un correo electrónico a [Datadog billing][13].

Consulte [Facturación con tarjeta de crédito][12] para obtener más detalles.

### Facturación {#invoicing}

Si paga con cheque, ACH o transferencia bancaria, las facturas se envían por correo electrónico a las direcciones de facturación alrededor del décimo día hábil de cada mes. Para solicitar una copia adicional, envíe un correo electrónico a [Datadog billing][13]. Los detalles sobre dónde realizar el pago se pueden encontrar en la factura.

## Contáctenos {#contact}

| Pregunta o inquietud                                                                                                                                                                               | Contacto                      |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| Disputa y solicitud de crédito<br>Uso<br>Cambio de método de pago<br>Problema con el pago<br>Problemas generales de la cuenta<br>Actualizar contactos<br>Estado de cuenta<br>Actualizar información de facturación y envío | success@datadoghq.com        |
| Copias de facturas<br>Solicitudes de cargos urgentes<br>Desglose de facturación<br>Invitación al portal                                                                                                        | billing@datadoghq.com        |
| Remisión de pago                                                                                                                                                                                | remittances@datadoghq.com    |
| Copias de órdenes de compra                                                                                                                                                                             | purchaseorders@datadoghq.com |

## Lecturas adicionales {#further-reading}

{{< whatsnext desc="Temas específicos de facturación:">}}
    {{< nextlink href="account_management/billing/pricing/" >}}Precios{{< /nextlink >}}
    {{< nextlink href="account_management/plan_and_usage/usage_details/" >}}Detalles de uso{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}Métricas de uso{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}Tarjeta de crédito{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}Custom Metrics{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}Containers{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}Gestión de registros{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM (rastreo distribuido y Continuous Profiler){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}Real User Monitoring{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ci_visibility/" >}}CI Visibility{{< /nextlink >}}
    {{< nextlink href="account_management/billing/aws/" >}}Integración de AWS{{< /nextlink >}}
    {{< nextlink href="account_management/billing/azure/" >}}Integración de Azure{{< /nextlink >}}
    {{< nextlink href="account_management/billing/alibaba/" >}}Integración de Alibaba{{< /nextlink >}}
    {{< nextlink href="account_management/billing/google_cloud/" >}}Integración de Google Cloud{{< /nextlink >}}
    {{< nextlink href="account_management/billing/vsphere/" >}}Integración de vSphere{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_attribution/" >}}Atribución de uso{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ai_credits/" >}}AI Credits{{< /nextlink >}}
    {{< nextlink href="account_management/billing/ai_credit_limits/" >}}Límites de crédito de IA{{< /nextlink >}}
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