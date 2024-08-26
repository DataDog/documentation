---
title: Facturación de la gestión de logs
---

## Precios

Al final del mes, Datadog calcula el número total de eventos de log que han sido indexados:

- Si estás por debajo del compromiso, tu factura se mantiene igual.
- Si consumes de más, se resta la cantidad comprometida y el **consumo bajo demanda** se cobra con un extra del 50 %.

### Bajo demanda

La gestión de logs de Datadog permite definir un compromiso mensual de eventos de log indexados. Sin embargo, en épocas problemáticas, el número de logs puede aumentar y es posible que superes ese compromiso. Dado que es importante mantener la visibilidad del buen estado de tu infraestructura, puedes ir más allá de  tu compromiso mensual.

Dado que los compromisos son mensuales, aunque superes los eventos de logs generados durante 1 día, puede que no excedas el límite siempre que tu consumo medio diario se aproxime al compromiso.

## Seguimiento de eventos de log

Hay varios lugares donde puedes ver el número de eventos de logs que has enviado a Datadog.

1. En la [página de uso][1] hay un informe del mes hasta la fecha y un gráfico llamado `Indexed Logs` que muestra el número de eventos de logs indexados por hora:

2. En la [página de configuración][2], haz doble clic en un índice para ver el número de eventos de logs indexados en los últimos dos días.

    {{< img src="account_management/billing/log-events02.png" alt="Eventos de logs" >}}

3. En el [Log Explorer] 3] (Explorador de Logs), cambia el periodo y consulta el recuento en la parte superior de la lista:

    {{< img src="account_management/billing/log-events03.png" alt="Eventos de logs" >}}

También puedes utilizar facetas para ver el número de logs por cualquier atributo o etiqueta definidos en tus eventos de logs. Esto te ayuda a identificar qué host, servicio, endpoint, etc., genera la mayor cantidad de datos.

## Solucionar problemas

Si tienes alguna pregunta técnica, ponte en contacto con el [equipo de asistencia de Datadog][4].

Si tienes alguna pregunta sobre facturación, ponte en contacto con tu [asesor de clientes][5].

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: https://app.datadoghq.com/logs/pipelines
[3]: https://app.datadoghq.com/logs
[4]: /es/help/
[5]: mailto:success@datadoghq.com