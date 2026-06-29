---
title: Facturación de la gestión de logs
---

## Precios

Al final de cada mes, Datadog calcula el número total de eventos de logs que se han indexado:

- Si tu consumo está por debajo de la cantidad acordada, tu factura se mantiene igual.
- Si te excedes en el consumo, se resta la cantidad acordada y el **consumo bajo demanda** se cobra con una prima del 50%.

### Bajo demanda

Con Datadog Log Management, tú determinas una cantidad mensual de eventos de logs indexados. Sin embargo, en épocas difíciles, el número de logs puede aumentar y es posible que superes la cantidad acordada. Dado que es importante conservar una visibilidad del estado de tu infraestructura, no se te limitará a tu cantidad mensual acordada.

Dado que las cantidades acordadas son mensuales, si un día generas un mayor número de eventos de logs, es posible que esto no provoque un uso excesivo si tu consumo medio diario de logs se aproxima a las expectativas de tu cantidad acordada.

## Seguimiento de eventos de log

Hay varios sitios donde puedes ver el número de eventos de logs que has enviado a Datadog.

1. En la [página del uso][1], hay un recuento del mes hasta la fecha y un gráfico denominado `Indexed Logs` que muestra el número de eventos de logs indexados por hora:

2. En la [página de configuración][2], haz doble clic en un índice para ver el número de eventos de logs que se han indexado en los últimos días.

    {{< img src="account_management/billing/log-events02.png" alt="Eventos de logs" >}}

3. En el [Explorador de logs][3], cambia el intervalo y comprueba el recuento en la parte superior de la lista:

    {{< img src="account_management/billing/log-events03.png" alt="Eventos de logs" >}}

También puedes utilizar facetas para ver el recuento de logs según cualquier atributo o etiqueta (tag) definidos por tus eventos de logs. Esto ayuda a identificar qué host, servicio, endpoint, etc., generan más datos.

## Solucionar problemas

Si tienes preguntas técnicas, ponte en contacto con el [servicio de asistencia de Datadog][4].

Si tienes preguntas sobre facturación, ponte en contacto con tu [asesor de clientes][5].

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: https://app.datadoghq.com/logs/pipelines
[3]: https://app.datadoghq.com/logs
[4]: /es/help/
[5]: mailto:success@datadoghq.com