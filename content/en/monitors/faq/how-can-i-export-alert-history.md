---
title: How do I export Monitor Alerts?
kind: faq
disable_toc: true
---

To gather an audit trail of all Monitor Alerts that have triggered during a specific period of time, reach out on the [Datadog monitor report page][1]. This generates a CSV for the past half year (182 days). This report is *not* live; it is updated once a week.

**Note**: You need to be an Administrator of your organization to access this page.

You can also fetch this CSV using curl:

{{< tabs >}}
{{% tab "US" %}}

```shell
api_key=<API_KEY>
app_key = <APP_KEY>

curl -G \
    "https://app.datadoghq.com/report/hourly_data/monitor" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
```

The resulting response follows this format:

```text
org_id,hour,source_type_name,alert_type,priority,event_object,host_name,device_name,alert_name,user,cnt
<org_id_integer>, 2018-06-07 17,monitor alert,error,1,<event_object_string>,test.example.com,"Host name: {{host.name}} Name name: {{name.name}}",<user_email>,1
```

{{% /tab %}}
{{% tab "EU" %}}

```shell
api_key=<API_KEY>
app_key = <APP_KEY>

curl -G \
    "https://app.datadoghq.eu/report/hourly_data/monitor" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
```

The resulting response follows this format:

```text
org_id,hour,source_type_name,alert_type,priority,event_object,host_name,device_name,alert_name,user,cnt
<org_id_integer>, 2018-06-07 17,monitor alert,error,1,<event_object_string>,test.example.eu,"Host name: {{host.name}} Name name: {{name.name}}",<user_email>,1
```

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/report/hourly_data/monitor
