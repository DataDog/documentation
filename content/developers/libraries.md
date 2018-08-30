---
title: Libraries
kind: documentation
aliases:
   - /libraries/
disable_toc: true
---

## API and DogStatsD Client Libraries

The following table lists Datadog-official and community contributed API and [DogStatsD](/developers/dogstatsd) client libraries. A few libraries support both the API and DogStatsD, but most focus on one or the other.

{{< classic-libraries-table >}}

## APM (Tracing) Client Libraries

The following table lists Datadog-official and community contributed [Trace][33] client libraries.

{{< tracing-libraries-table >}}

## Community Integrations

### Ansible
In addition to the official Ansible integration, the [monitoring section][4] of the [ansible-modules-extras][5] repository contains modules that interact with Datadog.

### Aptible
Enclave delivers your metrics to a Datadog account. [Consult the dedicated Aptible help center to learn how][31].

### Auth0
[This extension][30] takes your Auth0 logs and ships them to Datadog.

### CLI Management
A [set of tools][34] to backup/restore dashboards and monitors, and configure users via a command line interface.

### Consul
Publish consul service counts into Datadog via [DogStatsD](/developers/dogstatsd) with [this library][17].

### Dogscaler
Scale up auto-scale groups based on the results of a Datadog query with [Dogscaler][18].

### Dynatrace
This [plugin][21] sends any Dynatrace measure from a chart to Datadog.

### FreeSwitch
This is for a [FreeSwitch ESL][6] application to export statistics to Datadog using the DogStatsD API and is written by [WiMacTel][7].

### Google Analytics
You can get data into Datadog from Google Analytics using our API with [this library][25] from [Bithaus][26].

### Logstash Output
  * [Logstash Output for Datadog][11]
  * [Logstash Output for DogStatsD][16]

### Moogsoft
A Moogsoft [listener][22] that ingests Datadog notifications.

### NGINX LUA
  * Emit [custom metrics](/developers/metrics/custom_metrics/) directly from NGINX configurations using the [nginx_lua_datadog][10] module in your LUA scripts.
  * [lua-resty-dogstatsd][14] is an extension developed by  [mediba inc][15], which enables emiting metrics, events, and service checks to [DogStatsD](/developers/dogstatsd) protocol. lua-resty-dogstatsd is released as GPLv3 and relies on the nginx cosocket API.

### OpenVPN
  * Send OpenVPN [bandwidth usage][27] and the count of active connections to Datadog.
  * Send OpenVPN [licensing information][28] to Datadog.

### Phusion Passenger
Send health metrics from Phusion's Passenger server using the [passenger-datadog-monitor][12] written by [Stevenson Jean-Pierre][13]

### Pid-stats
This [library][8] allows you to generate process information from StatsD, given pid files. It was created by [GitterHQ][9].

### Saltstack
  * [Datadog Saltstack Formula][1]
  * [Datadog Saltstack][2] written by [Luca Cipriani][3].

### Sensu
Use these Sensu [handlers][23] to automatically send both metrics and events to Datadog.

### StackStorm

This StackStorm Datadog [integration pack][29] supplies action integration for Datadog.

### Winston
A Winston Datadog [transport][24].

## Community Agent Ports

### FreeBSD
  * [FreeBSD dd-agent port][19]

### NixOS
  * [dd-agent nixpkg][20]

If you've written a Datadog library and would like to add it to this page, write us at [code@datadoghq.com][32].


   [1]: https://github.com/DataDog/datadog-formula
   [2]: https://gist.github.com/mastrolinux/6175280
   [3]: https://gist.github.com/mastrolinux
   [4]: https://docs.ansible.com/ansible/list_of_monitoring_modules.html
   [5]: https://github.com/ansible/ansible-modules-extras
   [6]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
   [7]: https://github.com/wimactel
   [8]: https://github.com/gitterHQ/pid-stats
   [9]: https://github.com/gitterHQ
   [10]: https://github.com/simplifi/ngx_lua_datadog/
   [11]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
   [12]: https://github.com/Sjeanpierre/passenger-datadog-monitor
   [13]: https://github.com/Sjeanpierre
   [14]: https://github.com/mediba-system/lua-resty-dogstatsd
   [15]: http://www.mediba.jp/
   [16]: https://github.com/brigade/logstash-output-dogstatsd
   [17]: https://github.com/zendesk/consul2dogstats
   [18]: https://github.com/cvent/dogscaler
   [19]: https://github.com/urosgruber/dd-agent-FreeBSD
   [20]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
   [21]: https://github.com/Dynatrace/Dynatrace-AppMon-Datadog-Plugin
   [22]: https://docs.moogsoft.com/display/060102/Datadog+Solution+Pak
   [23]: https://github.com/sensu-plugins/sensu-plugins-datadog
   [24]: https://github.com/sparkida/winston-datadog
   [25]: https://github.com/bithauschile/datadog-ga
   [26]: https://blog.bithaus.cl/2016/04/20/realtime-google-analytics-metrics-in-datadog/
   [27]: https://github.com/byronwolfman/dd-openvpn
   [28]: https://github.com/denniswebb/datadog-openvpn
   [29]: https://github.com/StackStorm-Exchange/stackstorm-datadog
   [30]: https://github.com/BetaProjectWave/auth0-logs-to-datadog
   [31]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
   [32]: mailto:code@datadoghq.com
   [33]: /tracing/
   [34]: https://github.com/keirans/datadog-management
