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

## Datadog Client Community Libraries

### Dashboards Backup

Using Datadog [APIs][3] it's possible to write a script to backup your Dashboard definitions as code. See the following projects as examples of how these backups can be accomplished:

* https://github.com/brightcove/dog-watcher
* https://github.com/Shopify/doggy
* https://github.com/grosser/kennel

Special thanks to [Brightcove][4], [Shopify][5], and [Zendesk][6] for sharing these projects!

## Community Integrations

### Ansible
In addition to the official Ansible integration, the [monitoring section][7] of the [ansible-modules-extras][8] repository contains modules that interact with Datadog.

### Aptible
Enclave delivers your metrics to a Datadog account. [Consult the dedicated Aptible help center to learn how][9].

### Auth0
[This extension][10] takes your Auth0 logs and ships them to Datadog.

### CLI Management
A [set of tools][11] to backup/restore dashboards and monitors, and configure users via a command line interface.

### Consul
Publish consul service counts into Datadog via [DogStatsD][1] with [this library][12].

### Dogscaler
Scale up auto-scale groups based on the results of a Datadog query with [Dogscaler][13].

### Dynatrace
This [plugin][14] sends any Dynatrace measure from a chart to Datadog.

### FreeSwitch
This is for a [FreeSwitch ESL][15] application to export statistics to Datadog using the DogStatsD API and is written by [WiMacTel][16].

### Google Analytics
You can get data into Datadog from Google Analytics via the Datadog API with [this library][17] from [Bithaus][18].

### Heroku
Heroku emits dyno metrics via logs. To convert these logs into metrics and send them to Datadog, use one of the following log drains. To send your Heroku logs to Datadog, see [the documentation][19].

  * [Heroku Datadog Log Drain][20] written in Nodejs by [Oz][21].
  * [Heroku Datadog Log Drain][22] written in Go by [Apiary][23].


### Jira
A [tool][24] to poll data from Jira and upload it as metrics to Datadog.

### Logstash Output
  * [Logstash Output for Datadog][25]
  * [Logstash Output for DogStatsD][26]

### Moogsoft
A Moogsoft [listener][27] that ingests Datadog notifications.

### NGINX LUA
  * Emit [custom metrics][28] directly from NGINX configurations using the [nginx_lua_datadog][29] module in your LUA scripts.
  * [lua-resty-dogstatsd][30] is an extension developed by  [mediba inc][31], which enables emiting metrics, events, and service checks to [DogStatsD][1] protocol. lua-resty-dogstatsd is released as GPLv3 and relies on the nginx cosocket API.

### OpenVPN
  * Send OpenVPN [bandwidth usage][32] and the count of active connections to Datadog.
  * Send OpenVPN [licensing information][33] to Datadog.

### Phusion Passenger
Send health metrics from Phusion's Passenger server using the [passenger-datadog-monitor][34] written by [Stevenson Jean-Pierre][35]

### Pid-stats
This [library][36] allows you to generate process information from StatsD, given pid files. It was created by [GitterHQ][37].

### Saltstack
  * [Datadog Saltstack Formula][38]
  * [Datadog Saltstack][39] written by [Luca Cipriani][40].

### Sensu
Use these Sensu [handlers][41] to automatically send both metrics and events to Datadog.

### StackStorm

This StackStorm Datadog [integration pack][42] supplies action integration for Datadog.

### Winston
A Winston Datadog [transport][43].

## Community Agent Ports

### FreeBSD
  * [FreeBSD dd-agent port][44]

### NixOS
  * [dd-agent nixpkg][45]

If you've written a Datadog library and would like to add it to this page, send an email to [code@datadoghq.com][46].

[1]: /developers/dogstatsd
[2]: /tracing
[3]: /api
[4]: https://www.brightcove.com
[5]: https://www.shopify.com
[6]: https://www.zendesk.com
[7]: https://docs.ansible.com/ansible/list_of_monitoring_modules.html
[8]: https://github.com/ansible/ansible-modules-extras
[9]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
[10]: https://github.com/BetaProjectWave/auth0-logs-to-datadog
[11]: https://github.com/keirans/datadog-management
[12]: https://github.com/zendesk/consul2dogstats
[13]: https://github.com/cvent/dogscaler
[14]: https://github.com/Dynatrace/Dynatrace-AppMon-Datadog-Plugin
[15]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[16]: https://github.com/wimactel
[17]: https://github.com/bithauschile/datadog-ga
[18]: https://blog.bithaus.cl/2016/04/20/realtime-google-analytics-metrics-in-datadog
[19]: /logs/guide/collect-heroku-logs
[20]: https://github.com/ozinc/heroku-datadog-drain
[21]: https://corp.oz.com
[22]: https://github.com/apiaryio/heroku-datadog-drain-golang
[23]: https://apiary.io
[24]: https://github.com/evernote/jiradog
[25]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[26]: https://github.com/brigade/logstash-output-dogstatsd
[27]: https://docs.moogsoft.com/display/060102/Datadog+Solution+Pak
[28]: /developers/metrics/custom_metrics
[29]: https://github.com/simplifi/ngx_lua_datadog
[30]: https://github.com/mediba-system/lua-resty-dogstatsd
[31]: http://www.mediba.jp
[32]: https://github.com/byronwolfman/dd-openvpn
[33]: https://github.com/denniswebb/datadog-openvpn
[34]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[35]: https://github.com/Sjeanpierre
[36]: https://github.com/gitterHQ/pid-stats
[37]: https://github.com/gitterHQ
[38]: https://github.com/DataDog/datadog-formula
[39]: https://gist.github.com/mastrolinux/6175280
[40]: https://gist.github.com/mastrolinux
[41]: https://github.com/sensu-plugins/sensu-plugins-datadog
[42]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[43]: https://github.com/sparkida/winston-datadog
[44]: https://github.com/urosgruber/dd-agent-FreeBSD
[45]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[46]: mailto:code@datadoghq.com
