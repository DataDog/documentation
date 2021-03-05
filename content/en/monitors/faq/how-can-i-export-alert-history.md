---
title: Export Monitor Alerts to CSV
kind: faq
---

Download a history of monitor alerts through the [hourly monitor data][1], which generates a CSV for the past 6 months (182 days). This CSV is **not** live; it is updated once a week on Monday at 11:59AM UTC. 

**Note**: You need to be an administrator of your organization to access the CSV file.

To fetch the CSV using curl, use the following:

{{< tabs >}}
{{% tab "US" %}}

```shell
api_key=<DATADOG_API_KEY>
app_key = <DATADOG_APPLICATION_KEY>

curl -G \
    "https://app.datadoghq.com/report/hourly_data/monitor" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
```

{{% /tab %}}
{{< /tabs >}}

Example response:

```text
org_id,hour,source_type_name,alert_type,priority,event_object,host_name,device_name,alert_name,user,cnt
<org_id_integer>, 2018-06-07 17,monitor alert,error,1,<event_object_string>,test.example.eu,"Host name: {{host.name}} Name name: {{name.name}}",<user_email>,1
```

[1]: https://app.datadoghq.com/report/hourly_data/monitor
