---
aliases:
- /es/monitors/faq/how-can-i-export-alert-history
title: Exportar alertas de monitor a CSV
---

Descarga un historial de las alertas de monitor a través de [datos de monitor por hora][1], que generan un CSV de los últimos 6 meses (182 días). Este CSV **no** está activo; se actualiza una vez a la semana, el lunes a las 11:59 AM UTC.

**Notas**:

- Esta función solo es compatible con el sitio de EE. UU. de Datadog.
- Debes ser administrador de tu organización para acceder al archivo CSV.

{{< site-region region="us" >}}

Para obtener el CSV mediante curl, utiliza lo siguiente:

```shell
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl -G \
    "https://app.datadoghq.com/report/hourly_data/monitor" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
```

Ejemplo de respuesta:

```text
hour,host_name,alert_name,user,cnt

2022-10-23 20,example_host_name,"Host name: {{host.name}} Name name: {{name.name}}",<user_email>,67
```
{{< /site-region >}}

{{< site-region region="eu,gov,us3,us5,ap1" >}}

Esta función no es compatible.

{{< /site-region >}}

[1]: https://app.datadoghq.com/report/hourly_data/monitor