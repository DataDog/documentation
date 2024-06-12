---
title: Troubleshooting Database Monitoring
description: Troubleshoot Database Monitoring setup

---

This page details database agnostic common issues with setting up and using Database Monitoring, and how to resolve them. Datadog recommends staying on the latest stable Agent version and adhering to the latest [setup documentation][1], as it can change with agent version releases.

For specific database setup troubleshooting, use the corresponding troubleshooting page:

* [Troubleshooting MySQL Setup][2]
* [Troubleshooting Oracle Setup][8]
* [Troubleshooting Postgres Setup][3]
* [Troubleshooting SQL Server Setup][4]

## Diagnosing common problems
### Query bind parameters cannot be viewed

At this time, the raw query bind parameters are obfuscated for Query Samples and Explain Plans, and are replaced with a `?` character. In a future release, settings to expose the un-obfuscated query bind parameters are planned.


### DBM host limit

Depending on how complex the databases being monitored are, too many DBM hosts on one Agent could overload the Agent and cause data collection to be delayed. If the Agent is overloaded, you may see warnings like `Job loop stopping due to check inactivity in the Agent logs`.

It is recommended to have a single Datadog Agent monitor at most 10 DBM hosts. If you have more than 10 DBM hosts then you should consider spreading them over multiple Datadog Agents.


### No DBM data visible in Datadog: Connection Issues?

If you think that your setup is correct, but you're not seeing data in your DBM pages, it's possible that your Agent is not able to send data to Datadog's data collection endpoints. To diagnose connection issues, perform the following connection troubleshooting steps from the location where the Agent is running.

1. Test TCP connectivity on DBM collection endpoints:

```
telnet dbm-metrics-intake.datadoghq.com 443
telnet dbquery-intake.datadoghq.com 443
```

2. Test posting an empty payload with an invalid API key on both DBM endpoints. 
These commands should fail with HTTP code `403: Forbidden`. 

```
curl -vvv -X POST "https://dbm-metrics-intake.datadoghq.com/api/v2/databasequery" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: NONE" \
-d "[{}]"

curl -vvv -X POST "https://dbquery-intake.datadoghq.com/api/v2/databasequery" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: NONE" \
-d "[{}]"
```

The responses should contain `{"status":"error","code":403,"errors":["Forbidden"],...}` if requests were successfully sent and a response was received.

Some common causes of connection failure include [proxy setups][7] and firewalls, which outbound traffic to Datadog's endpoints. If you have a proxy or firewall, make sure the IP addresses for the DBM endpoints are allowed. These addresses can be found in the APM block at `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

## Need more help?

If you are still experiencing problems, contact [Datadog Support][5] for help.


[1]: /database_monitoring/#getting-started
[2]: /database_monitoring/setup_mysql/troubleshooting/
[3]: /database_monitoring/setup_postgres/troubleshooting/
[4]: /database_monitoring/setup_sql_server/troubleshooting/
[5]: /help/
[7]: /agent/configuration/proxy/?tab=linux
[8]: /database_monitoring/setup_oracle/troubleshooting/
