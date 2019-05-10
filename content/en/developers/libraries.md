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

| Language   | Library          | Author          |
| ---        | ---              | ---             |
| JavaScript | [dog-watcher][4] | [Brightcove][5] |
| Ruby       | [doggy][6]       | [Shopify][7]    |
| Ruby       | [kennel][8]      | [Zendesk][9]    |


### Managing Monitors

There are multiple community projects available to maintain, manage, or backup monitors by using the Datadog [API][3]:

| Language  | Library          | Author               |
| ---       | ---              | ---                  |
| Python    | [DogPush][10]    | [TrueAccord][11]     |
| Ruby      | [barkdog][12]    | [codenize-tools][13] |
| Ruby      | [interferon][14] | [Airnb][15]          |
| Ruby      | [dogwatch][16]   | [Rapid7][17]         |
| Terraform | [Terraform][18]  | [Terraform][19]      |

## Community Integrations

### Ansible
In addition to the official Ansible integration, the [monitoring section][20] of the [ansible-modules-extras][21] repository contains modules that interact with Datadog.

### Aptible
Enclave delivers your metrics to a Datadog account. [Consult the dedicated Aptible help center to learn how][22].

### Auth0
[This extension][23] takes your Auth0 logs and ships them to Datadog.

### CLI Management
A [set of tools][24] to backup/restore dashboards and monitors, and configure users via a command line interface.

### Consul
Publish consul service counts into Datadog via [DogStatsD][1] with [this library][25].

### Dogscaler
Scale up auto-scale groups based on the results of a Datadog query with [Dogscaler][26].

### Dynatrace
This [plugin][27] sends any Dynatrace measure from a chart to Datadog.

### FreeSwitch
This is for a [FreeSwitch ESL][28] application to export statistics to Datadog using the DogStatsD API and is written by [WiMacTel][29].

### Google Analytics
You can get data into Datadog from Google Analytics via the Datadog API with [this library][30] from [Bithaus][31].

### Heroku
Heroku emits dyno metrics via logs. To convert these logs into metrics and send them to Datadog, use one of the following log drains. To send your Heroku logs to Datadog, see [the documentation][32].

  * [Heroku Datadog Log Drain][33] written in Nodejs by [Oz][34].
  * [Heroku Datadog Log Drain][35] written in Go by [Apiary][36].


### Jira
A [tool][37] to poll data from Jira and upload it as metrics to Datadog.

### Logstash Output
  * [Logstash Output for Datadog][38]
  * [Logstash Output for DogStatsD][39]

### Moogsoft
A Moogsoft [listener][40] that ingests Datadog notifications.

### NGINX LUA
  * Emit [custom metrics][41] directly from NGINX configurations using the [nginx_lua_datadog][42] module in your LUA scripts.
  * [lua-resty-dogstatsd][43] is an extension developed by  [mediba inc][44], which enables emiting metrics, events, and service checks to [DogStatsD][1] protocol. lua-resty-dogstatsd is released as GPLv3 and relies on the nginx cosocket API.

### OpenVPN
  * Send OpenVPN [bandwidth usage][45] and the count of active connections to Datadog.
  * Send OpenVPN [licensing information][46] to Datadog.

### Phusion Passenger
Send health metrics from Phusion's Passenger server using the [passenger-datadog-monitor][47] written by [Stevenson Jean-Pierre][48]

### Pid-stats
This [library][49] allows you to generate process information from StatsD, given pid files. It was created by [GitterHQ][50].

### Saltstack
  * [Datadog Saltstack Formula][51]
  * [Datadog Saltstack][52] written by [Luca Cipriani][53].

### Sensu
Use these Sensu [handlers][54] to automatically send both metrics and events to Datadog.

### StackStorm

This StackStorm Datadog [integration pack][55] supplies action integration for Datadog.

### Winston
A Winston Datadog [transport][56].

## Community Agent Ports

### FreeBSD
  * [FreeBSD dd-agent port][57]

### NixOS
  * [dd-agent nixpkg][58]

If you've written a Datadog library and would like to add it to this page, send an email to [code@datadoghq.com][59].

[1]: /developers/dogstatsd
[2]: /tracing
[3]: /api
[4]: https://github.com/brightcove/dog-watcher
[5]: https://www.brightcove.com
[6]: https://github.com/Shopify/doggy
[7]: https://www.shopify.com
[8]: https://github.com/grosser/kennel
[9]: https://www.zendesk.com
[10]: https://github.com/trueaccord/DogPush
[11]: https://github.com/trueaccord
[12]: https://github.com/codenize-tools/barkdog
[13]: https://github.com/codenize-tools
[14]: https://github.com/airbnb/interferon
[15]: https://github.com/airbnb
[16]: https://github.com/rapid7/dogwatch
[17]: https://github.com/rapid7
[18]: https://www.terraform.io/docs/providers/datadog/r/monitor.html
[19]: https://www.terraform.io
[20]: https://docs.ansible.com/ansible/list_of_monitoring_modules.html
[21]: https://github.com/ansible/ansible-modules-extras
[22]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
[23]: https://github.com/BetaProjectWave/auth0-logs-to-datadog
[24]: https://github.com/keirans/datadog-management
[25]: https://github.com/zendesk/consul2dogstats
[26]: https://github.com/cvent/dogscaler
[27]: https://github.com/Dynatrace/Dynatrace-AppMon-Datadog-Plugin
[28]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[29]: https://github.com/wimactel
[30]: https://github.com/bithauschile/datadog-ga
[31]: https://blog.bithaus.cl/2016/04/20/realtime-google-analytics-metrics-in-datadog
[32]: /logs/guide/collect-heroku-logs
[33]: https://github.com/ozinc/heroku-datadog-drain
[34]: https://corp.oz.com
[35]: https://github.com/apiaryio/heroku-datadog-drain-golang
[36]: https://apiary.io
[37]: https://github.com/evernote/jiradog
[38]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[39]: https://github.com/brigade/logstash-output-dogstatsd
[40]: https://docs.moogsoft.com/display/060102/Datadog+Solution+Pak
[41]: /developers/metrics/custom_metrics
[42]: https://github.com/simplifi/ngx_lua_datadog
[43]: https://github.com/mediba-system/lua-resty-dogstatsd
[44]: http://www.mediba.jp
[45]: https://github.com/byronwolfman/dd-openvpn
[46]: https://github.com/denniswebb/datadog-openvpn
[47]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[48]: https://github.com/Sjeanpierre
[49]: https://github.com/gitterHQ/pid-stats
[50]: https://github.com/gitterHQ
[51]: https://github.com/DataDog/datadog-formula
[52]: https://gist.github.com/mastrolinux/6175280
[53]: https://gist.github.com/mastrolinux
[54]: https://github.com/sensu-plugins/sensu-plugins-datadog
[55]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[56]: https://github.com/sparkida/winston-datadog
[57]: https://github.com/urosgruber/dd-agent-FreeBSD
[58]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[59]: mailto:code@datadoghq.com
