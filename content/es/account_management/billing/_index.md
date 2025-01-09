---
title: Facturación
---

## Información general

El ciclo de facturación comienza el primer día del mes (UTC), independientemente de la fecha en la que te registres. El primer mes se prorratea en función de la fecha de alta real.

Datadog mide el count de hosts y métricas personalizadas por hora. El count facturable de hosts se calcula a final de mes utilizando el count máximo (marca de agua alta) del 99 % de uso inferior para esas horas. Datadog excluye el 1 % superior para reducir el impacto de los picos de uso en tu factura. El count facturable de métricas personalizadas se basa en el número medio de horas de métricas personalizadas del mes. Consulta tu [uso][1] en Datadog. Solo los usuarios con el rol de administrador de Datadog pueden acceder a las páginas de facturación.

### Hosts

Un host es cualquier tipo de instancia del SO, física o virtual, que monitorices con Datadog. Puede ser un servidor, una máquina virtual, un nodo (en el caso de Kubernetes), una instancia de un plan de App Service (en el caso de un App Service de Azure) o un dyno de Heroku (en el caso de la plataforma Heroku). Los hosts pueden ser instancias con el Datadog Agent instalado más un EC2 de AWS, Google Cloud, Azure o una máquina virtual vSphere monitorizada con integraciones de Datadog. Cualquier instancia EC2 o máquina virtual que se ejecute con el Agent instalado se considera como una única instancia (sin doble facturación).

Los hosts que no informan (estado `???` en tu [lista de infraestructura][2]) no se contabilizan en la facturación. Estos hosts pueden tardar hasta 2 horas en desaparecer de la [lista de infraestructura][2]. Datadog conserva el historial de datos de estos hosts (en las cuentas de pago). Las métricas se pueden representar gráficamente en un dashboard si se conoce el nombre específico del host o las etiquetas (tags).

### Contenedores

Se recomienda que los contenedores se monitoricen con un único Agent contenedorizado por host. Este Agent recopila métricas tanto del contenedor como del host. Si decides instalar el Agent directamente en cada contenedor, los contenedores se contabilizarán como hosts desde el punto de vista de la facturación. Para más información, consulta la documentación sobre la [instalación del Agent][3].

### Serverless

La facturación de Datadog se basa en el número medio de funciones ejecutadas por hora durante todo el mes en cada una de tus cuentas. Cada hora, Datadog registra el número de funciones que se han ejecutado una o más veces y que se han monitorizado mediante tu cuenta Datadog. Al final del mes, Datadog calcula la media del número de funciones por hora registradas y cobra en consecuencia. Los planes Pro y Enterprise incluyen cinco métricas personalizadas por función facturable.

La facturación de APM serverless se basa en la suma de invocaciones de AWS Lambda conectadas a tramos (spans) ingeridos de APM en un mes concreto. También se cobrará por el número total de [tramos indexados][4] enviados al servicio APM de Datadog que superen la cantidad incluida al final del mes. Cuando se utiliza serverless, no se cobran los [hosts de APM][4].

Para obtener más información, consulta [Facturación de serverless][5] y [Precios de Datadog][6].

### IoT

Datadog mide el count de dispositivos IoT por hora. El count facturable de dispositivos IoT se calcula a final de mes utilizando el recuento máximo (marca de agua alta) del 99 % de uso inferior durante esas horas y excluyendo el 1 % superior para reducir el impacto de los picos de uso en tu factura.

Para obtener más información sobre la facturación de IoT, consulta [Precios de Datadog][7].

## Información sobre el plan

### Gestionar el método de pago

En la sección [**Payment Method**][8] (Método de pago), encontrarás más información sobre tus opciones de pago.

{{< img src="account_management/billing/PaymentMethodOverview.png" alt="Método de pago en la página del plan" style="width:90%;" >}}

El botón **Edit Payment** (Editar pago) ofrece opciones para gestionar los métodos de pago. Puedes editar o eliminar tarjetas, y solicitar el cambio de método de pago de tarjeta a transferencia o cheque, y viceversa.

{{< img src="account_management/billing/PaymentSettingsDetails.png" alt="Parámetros de pago en la página del plan" style="width:90%;" >}}

### Gestionar la información de contacto para la facturación

En la sección [**Billing Contact Details**][8] (Información de contacto para la facturación), encontrarás tus datos de contacto para la facturación.

{{< img src="account_management/billing/BillingContactDetailsOverview.png" alt="Información de contacto para la facturación en la página del plan" style="width:90%;" >}}

Pulsa el botón **Edit Details** (Editar detalles) para añadir, editar o eliminar la dirección de facturación. También puedes especificar las direcciones de correo electrónico a las que deben enviarse las facturas.

{{< img src="account_management/billing/BillingContactDetailsEdit.png" alt="Editar la información de contacto para la facturación en la página del plan" style="width:90%;" >}}

**Nota**: No es necesario que la dirección de correo electrónico sea de un miembro de equipo de Datadog. Por ejemplo, se puede utilizar `invoices@example.com`.

### Consultar los datos de suscripción

La sección [Subscription Details][8] (Datos de suscripción) incluye la cantidad, el precio del contrato y el precio bajo demanda de todos los productos contratados.

{{< img src="/account_management/billing/subscription_details.png" alt="Página Plan & Usage de la cuenta en la que se destaca la sección Subscription Details" style="width:90%;" >}}

**Nota**: Si tu facturación se gestiona directamente a través de un servicio asociado de Datadog, los datos de suscripción no estarán disponibles.

## Pago

Puedes elegir entre dos opciones de pago diferentes:
- Tarjeta de crédito
- Transferencia (ACH, bancaria o mediante cheque)

### Tarjeta de crédito

Si se realizan los pagos con tarjeta de crédito, los recibos de los meses anteriores estarán disponibles para los usuarios con el rol de [administrador][9] en [Billing History][10] (Historial de facturación). Para obtener las copias de tus facturas, envía un correo electrónico al equipo de [facturación de Datadog][11].

Para más información, consulta [Facturación con tarjeta de crédito][12].

### Transferencia

Si realizas el pago mediante cheque, transferencia ACH o transferencia bancaria, las facturas se enviarán por correo electrónico a las direcciones de facturación en torno al décimo día laborable de cada mes. Si quieres solicitar una copia adicional, envía un correo electrónico al equipo de [facturación de Datadog][11]. Los datos para efectuar el pago figuran en la factura.

## Información de contacto

| Consulta                                                                                                                                                                               | Información de contacto                      |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| Reclamación y solicitud de crédito<br>Uso<br>Cambio de método de pago<br>Problema con el pago<br>Cuestiones generales de la cuenta<br>Actualizar contactos<br>Extracto de la cuenta<br>Actualizar la información de facturación y envío | success@datadoghq.com        |
| Copias de facturas<br>Solicitudes de cobro urgentes<br>Desglose de la facturación<br>Invitación al portal                                                                                                        | billing@datadoghq.com        |
| Envío de pagos                                                                                                                                                                                | remittances@datadoghq.com    |
| Copias de órdenes de compra                                                                                                                                                                             | purchaseorders@datadoghq.com |

## Leer más

{{< whatsnext desc="Temas de facturación específicos:">}}
    {{< nextlink href="account_management/billing/pricing/" >}}Precios{{< /nextlink >}}
    {{< nextlink href="account_management/plan_and_usage/usage_details/" >}}Detalles de uso{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_metrics/" >}}Métricas de uso{{< /nextlink >}}
    {{< nextlink href="account_management/billing/credit_card/" >}}Tarjeta de crédito{{< /nextlink >}}
    {{< nextlink href="account_management/billing/custom_metrics/" >}}Métricas personalizadas{{< /nextlink >}}
    {{< nextlink href="account_management/billing/containers/" >}}Contenedores{{< /nextlink >}}
    {{< nextlink href="account_management/billing/log_management/" >}}Gestión de logs{{< /nextlink >}}
    {{< nextlink href="account_management/billing/apm_tracing_profiler/" >}}APM (Rastreo distribuido y Continuous Profiler){{< /nextlink >}}
    {{< nextlink href="account_management/billing/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="account_management/billing/rum/" >}}Real User Monitoring (RUM){{< /nextlink >}}
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
[8]: https://app.datadoghq.com/billing/plan
[9]: /es/account_management/rbac/#datadog-default-roles
[10]: https://app.datadoghq.com/account/billing_history
[11]: mailto:billing@datadoghq.com
[12]: /es/account_management/billing/credit_card/