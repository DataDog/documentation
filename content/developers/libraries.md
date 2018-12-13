---
title: Libraries
kind: documentation
aliases:
   - /libraries/
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

### Logstash Output
  * [Logstash Output for Datadog][15]
  * [Logstash Output for DogStatsD][16]

### Moogsoft
A Moogsoft [listener][17] that ingests Datadog notifications.

### NGINX LUA
  * Emit [custom metrics][18] directly from NGINX configurations using the [nginx_lua_datadog][19] module in your LUA scripts.
  * [lua-resty-dogstatsd][20] is an extension developed by  [mediba inc][21], which enables emiting metrics, events, and service checks to [DogStatsD][1] protocol. lua-resty-dogstatsd is released as GPLv3 and relies on the nginx cosocket API.

### OpenVPN
  * Send OpenVPN [bandwidth usage][22] and the count of active connections to Datadog.
  * Send OpenVPN [licensing information][23] to Datadog.

### Phusion Passenger
Send health metrics from Phusion's Passenger server using the [passenger-datadog-monitor][24] written by [Stevenson Jean-Pierre][25]

### Pid-stats
This [library][26] allows you to generate process information from StatsD, given pid files. It was created by [GitterHQ][27].

### Saltstack
  * [Datadog Saltstack Formula][28]
  * [Datadog Saltstack][29] written by [Luca Cipriani][30].

### Sensu
Use these Sensu [handlers][31] to automatically send both metrics and events to Datadog.

### StackStorm

This StackStorm Datadog [integration pack][32] supplies action integration for Datadog.

### Winston
A Winston Datadog [transport][33].

## Community Agent Ports

### FreeBSD
  * [FreeBSD dd-agent port][34]

### NixOS
  * [dd-agent nixpkg][35]

If you've written a Datadog library and would like to add it to this page, send an email to [code@datadoghq.com][36].

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
[15]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[16]: https://github.com/brigade/logstash-output-dogstatsd
[17]: https://docs.moogsoft.com/display/060102/Datadog+Solution+Pak
[18]: /developers/metrics/custom_metrics
[19]: https://github.com/simplifi/ngx_lua_datadog
[20]: https://github.com/mediba-system/lua-resty-dogstatsd
[21]: http://www.mediba.jp
[22]: https://github.com/byronwolfman/dd-openvpn
[23]: https://github.com/denniswebb/datadog-openvpn
[24]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[25]: https://github.com/Sjeanpierre
[26]: https://github.com/gitterHQ/pid-stats
[27]: https://github.com/gitterHQ
[28]: https://github.com/DataDog/datadog-formula
[29]: https://gist.github.com/mastrolinux/6175280
[30]: https://gist.github.com/mastrolinux
[31]: https://github.com/sensu-plugins/sensu-plugins-datadog
[32]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[33]: https://github.com/sparkida/winston-datadog
[34]: https://github.com/urosgruber/dd-agent-FreeBSD
[35]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[36]: mailto:code@datadoghq.com
