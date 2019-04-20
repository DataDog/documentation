---
title: Libraries
kind: documentation
aliases:
   - /libraries/
   - /developers/faq/monitoring-akka/
disable_toc: true
---

## API and DogStatsD Client Libraries

The following table lists Datadog-official and community contributed API and [DogStatsD][1] client libraries. A few libraries support both the API and DogStatsD, but most focus on one or the other.

{{< classic-libraries-table >}}

## APM (Tracing) Client Libraries

The following table lists Datadog-official and community contributed [Trace][2] client libraries.

{{< tracing-libraries-table >}}

## Community Integrations

### Ansible
In addition to the official Ansible integration, the [monitoring section][3] of the [ansible-modules-extras][4] repository contains modules that interact with Datadog.

### Aptible
Enclave delivers your metrics to a Datadog account. [Consult the dedicated Aptible help center to learn how][5].

### Auth0
[This extension][6] takes your Auth0 logs and ships them to Datadog.

### CLI Management
A [set of tools][7] to backup/restore dashboards and monitors, and configure users via a command line interface.

### Consul
Publish consul service counts into Datadog via [DogStatsD][1] with [this library][8].

### Dogscaler
Scale up auto-scale groups based on the results of a Datadog query with [Dogscaler][9].

### Dynatrace
This [plugin][10] sends any Dynatrace measure from a chart to Datadog.

### FreeSwitch
This is for a [FreeSwitch ESL][11] application to export statistics to Datadog using the DogStatsD API and is written by [WiMacTel][12].

### Google Analytics
You can get data into Datadog from Google Analytics via the Datadog API with [this library][13] from [Bithaus][14].

### Heroku
Heroku emits dyno metrics via logs. To convert these logs into metrics and send them to Datadog, use one of the following log drains. To send your Heroku logs to Datadog, see [the documentation][15].

  * [Heroku Datadog Log Drain][16] written in Nodejs by [Oz][17].
  * [Heroku Datadog Log Drain][18] written in Go by [Apiary][19].


### Jira
A [tool][20] to poll data from Jira and upload it as metrics to Datadog.

### Logstash Output
  * [Logstash Output for Datadog][21]
  * [Logstash Output for DogStatsD][22]

### Moogsoft
A Moogsoft [listener][23] that ingests Datadog notifications.

### NGINX LUA
  * Emit [custom metrics][24] directly from NGINX configurations using the [nginx_lua_datadog][25] module in your LUA scripts.
  * [lua-resty-dogstatsd][26] is an extension developed by  [mediba inc][27], which enables emiting metrics, events, and service checks to [DogStatsD][1] protocol. lua-resty-dogstatsd is released as GPLv3 and relies on the nginx cosocket API.

### OpenVPN
  * Send OpenVPN [bandwidth usage][28] and the count of active connections to Datadog.
  * Send OpenVPN [licensing information][29] to Datadog.

### Phusion Passenger
Send health metrics from Phusion's Passenger server using the [passenger-datadog-monitor][30] written by [Stevenson Jean-Pierre][31]

### Pid-stats
This [library][32] allows you to generate process information from StatsD, given pid files. It was created by [GitterHQ][33].

### Saltstack
  * [Datadog Saltstack Formula][34]
  * [Datadog Saltstack][35] written by [Luca Cipriani][36].

### Sensu
Use these Sensu [handlers][37] to automatically send both metrics and events to Datadog.

### StackStorm

This StackStorm Datadog [integration pack][38] supplies action integration for Datadog.

### Winston
A Winston Datadog [transport][39].

## Community Agent Ports

### FreeBSD
  * [FreeBSD dd-agent port][40]

### NixOS
  * [dd-agent nixpkg][41]

If you've written a Datadog library and would like to add it to this page, send an email to [code@datadoghq.com][42].

[1]: /developers/dogstatsd
[2]: /tracing
[3]: https://docs.ansible.com/ansible/list_of_monitoring_modules.html
[4]: https://github.com/ansible/ansible-modules-extras
[5]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
[6]: https://github.com/BetaProjectWave/auth0-logs-to-datadog
[7]: https://github.com/keirans/datadog-management
[8]: https://github.com/zendesk/consul2dogstats
[9]: https://github.com/cvent/dogscaler
[10]: https://github.com/Dynatrace/Dynatrace-AppMon-Datadog-Plugin
[11]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[12]: https://github.com/wimactel
[13]: https://github.com/bithauschile/datadog-ga
[14]: https://blog.bithaus.cl/2016/04/20/realtime-google-analytics-metrics-in-datadog
[15]: /logs/guide/collect-heroku-logs
[16]: https://github.com/ozinc/heroku-datadog-drain
[17]: https://corp.oz.com
[18]: https://github.com/apiaryio/heroku-datadog-drain-golang
[19]: https://apiary.io
[20]: https://github.com/evernote/jiradog
[21]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[22]: https://github.com/brigade/logstash-output-dogstatsd
[23]: https://docs.moogsoft.com/display/060102/Datadog+Solution+Pak
[24]: /developers/metrics/custom_metrics
[25]: https://github.com/simplifi/ngx_lua_datadog
[26]: https://github.com/mediba-system/lua-resty-dogstatsd
[27]: http://www.mediba.jp
[28]: https://github.com/byronwolfman/dd-openvpn
[29]: https://github.com/denniswebb/datadog-openvpn
[30]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[31]: https://github.com/Sjeanpierre
[32]: https://github.com/gitterHQ/pid-stats
[33]: https://github.com/gitterHQ
[34]: https://github.com/DataDog/datadog-formula
[35]: https://gist.github.com/mastrolinux/6175280
[36]: https://gist.github.com/mastrolinux
[37]: https://github.com/sensu-plugins/sensu-plugins-datadog
[38]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[39]: https://github.com/sparkida/winston-datadog
[40]: https://github.com/urosgruber/dd-agent-FreeBSD
[41]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[42]: mailto:code@datadoghq.com
