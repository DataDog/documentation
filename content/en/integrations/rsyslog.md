---
title: Rsyslog
name: rsyslog
custom_kind: integration
description: 'Configure Rsyslog to gather logs from your host, containers, & services.'
short_description: 'Configure Rsyslog to gather logs from your host, containers, & services.'
categories:
    - log collection
doc_link: /integrations/rsyslog/
aliases:
    - /logs/log_collection/rsyslog
has_logo: true
integration_title: rsyslog
is_public: true
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/rsyslog.md']
public_title: Datadog-Rsyslog Integration
supported_os:
    - linux
integration_id: "rsyslog"
further_reading:
- link: "https://www.datadoghq.com/architecture/using-rsyslog-to-send-logs-to-datadog/"
  tag: "Architecture Center"
  text: "Using Rsyslog to send logs to Datadog"
- link: "/logs/log_collection/?tab=host#logging-endpoints"
  tag: "Documentation"
  text: "Log Collection and Integrations"
- link: "https://docs.datadoghq.com/data_security/logs/"
  tag: "Documentation"
  text: "Log Management Data Security"

---

## Overview

Configure Rsyslog to gather logs from your host, containers, and services.

## Setup

### Log collection

<div class="alert alert-info"> From <a href="https://www.rsyslog.com/doc/configuration/modules/imfile.html#mode">version 8.1.5</a> Rsyslog recommends <code>inotify</code> mode. Traditionally, <code>imfile</code> used polling mode, which is much more resource-intense (and slower) than <code>inotify</code> mode. </div>

1. Activate the `imfile` module to monitor specific log files. To add the `imfile` module, add the following to your `rsyslog.conf`:

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. Create an `/etc/rsyslog.d/datadog.conf` file.

3. In `/etc/rsyslog.d/datadog.conf`, add the following configuration. Replace `<site_url>` with **{{< region-param key="dd_site" >}}** and `<API_KEY>` with your Datadog API key. You must include a separate `input` line for each log file you want to monitor:

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<TAGS>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   template(name="test_template" type="list") { constant(value="{") property(name="msg" outname="message" format="jsonfr") constant(value="}")}

   # include the omhttp module
   module(load="omhttp")

   ruleset(name="infiles") {
      action(type="omhttp" server="http-intake.logs.<site_url>" serverport="443" restpath="api/v2/logs" template="test_template" httpheaders=["DD-API-KEY: <API_KEY>", "Content-Type: application/json"])
   }
   ```

4. Restart Rsyslog. Your new logs are forwarded directly to your Datadog account.
   ```shell
   sudo systemctl restart rsyslog
   ```

5. Associate your logs with the host metrics and tags.

   To make sure that your logs are associated with the metrics and tags from the same host in your Datadog account, set the `HOSTNAME` in your `rsyslog.conf` to match the hostname of your Datadog metrics.
   - If you specified a hostname in `datadog.conf` or `datadog.yaml`, replace the `%HOSTNAME%` value in `rsyslog.conf` to match your hostname.
   - If you did not specify a hostname in `datadog.conf` or `datadog.yaml`, you do not need to change anything.

6. To get the best use out of your logs in Datadog, set a source for the logs.
   - If you [forward your logs to the Datadog Agent][1], you can set the source in the Agent configuration file.
   - If you're not forwarding your logs to the Datadog Agent, create a distinct configuration file for each source in `/etc/rsyslog.d/`.

     To set the source, use the following format (if you have several sources, change the name of the format in each file):

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     You can add custom tags with the `ddtags` attribute:

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (Optional) Datadog cuts inactive connections after a period of inactivity. Some versions of Rsyslog are not able to reconnect when necessary. To mitigate this issue, use time markers so the connection never stops:

   1. Add the following lines to your Rsyslog configuration file:

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Restart the Rsyslog service:

      ```shell
      sudo systemctl restart rsyslog
      ```

## Troubleshooting

Need help? Contact [Datadog support][1].

[1]: /help/
