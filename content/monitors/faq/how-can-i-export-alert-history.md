---
title: How do I export Monitors Alerts?
kind: faq
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: Learn how to create a monitor
---

Customers sometimes require an audit trail of all Monitor Alerts that have triggered during a specific period of time. If you are an Administrator, you can easily generate a CSV of the past half year (182 days) by accessing this link: https://app.datadoghq.com/report/hourly_data/monitor

If you need a more specific timeframe, adjust the URL to add in the from and to arguments represented in epoch time, for example: https://app.datadoghq.com/report/hourly_data/monitor?from=XXXX&to=YYYY

You can generate the relevant epoch times by leveraging an online epoch converter like [epochconverter][1]-or you can navigate to our [Events stream][2], set the desired timeframes, and then note the values from the resulting URL's from_ts and to_ts arguments referencing this [example][3].

You can also fetch this CSV using curl:

```shell
api_key=<API_KEY>
app_key = <APP_KEY>
monitor_from=<TIME_IN_EPOCH>
monitor_to=<TIME_IN_EPOCH>

curl -G \
    "https://app.datadoghq.com/report/hourly_data/monitor" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "from=${monitor_from}" \
    -d "to=${monitor_to}"
```

The resulting response follows this format:

```
org_id,hour,source_type_name,alert_type,priority,event_object,host_name,device_name,alert_name,user,cnt
<org_id_integer>, 2018-06-07 17,monitor alert,error,1,<event_object_string>,test.example.com,,"Host name: {{host.name}} Name name: {{name.name}}",<user_email>,1
```
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.epochconverter.com/
[2]: /graphing/event_stream
[3]: https://cl.ly/343a0L1N2A3i
