---
title: Export Monitor Alerts to CSV
aliases:
- /monitors/faq/how-can-i-export-alert-history
---

Download a history of Monitor Alerts through the [hourly monitor data][1], which generates a CSV for the past 6 months (182 days). This CSV is **not** live; it is updated once a week on Monday at 11:59AM UTC.

**Notes**:

- This feature is only supported for the Datadog US site.
- You need to be an administrator of your organization to access the CSV file.

{{< site-region region="us" >}}

To fetch the CSV using curl, use the following:

```shell
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl -G \
    "https://app.datadoghq.com/report/hourly_data/monitor" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
```

Example response:

```text
hour,host_name,alert_name,user,cnt

2022-10-23 20,example_host_name,"Host name: {{host.name}} Name name: {{name.name}}",<user_email>,67
```
{{< /site-region >}}

{{< site-region region="eu,gov,us3,us5,ap1" >}}

This feature is not supported.

{{< /site-region >}}

[1]: https://app.datadoghq.com/report/hourly_data/monitor
