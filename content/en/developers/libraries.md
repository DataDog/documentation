---
title: Libraries
kind: documentation
aliases:
   - /libraries/
   - /developers/faq/monitoring-akka/
---

## API and DogStatsD client libraries

The following table lists Datadog-official and community contributed API and [DogStatsD][1] client libraries. A few libraries support both the API and DogStatsD, but most focus on one or the other.

{{< classic-libraries-table >}}

## APM & Distributed Tracing client libraries

The following table lists Datadog-official and community contributed [trace][2] client libraries.

{{< tracing-libraries-table >}}

## Serverless client libraries

The following table lists Datadog-official and community contributed [serverless][3] client libraries.

{{< serverless-libraries-table >}}

## Log management client libraries

The following table lists Datadog-official and community contributed log management client libraries.

{{< log-libraries-table >}}

## Datadog client community libraries

### Dashboards backup

Using Datadog [APIs][4], it's possible to write a script to backup your Dashboard definitions as code. See the following projects as examples of how these backups can be accomplished:

| Language   | Library          | Author          |
|------------|------------------|-----------------|
| JavaScript | [dog-watcher][5] | [Brightcove][6] |
| Ruby       | [doggy][7]       | [Shopify][8]    |
| Ruby       | [kennel][9]      | [Zendesk][10]    |

### Managing monitors

There are multiple community projects available to maintain, manage, or backup monitors using the Datadog [API][4]:

| Language  | Library                     | Author               |
|-----------|-----------------------------|----------------------|
| Python    | [DogPush][11]               | [TrueAccord][12]     |
| Ruby      | [barkdog][13]               | [codenize-tools][14] |
| Ruby      | [interferon][15]            | [Airbnb][16]         |
| Ruby      | [dogwatch][17]              | [Rapid7][18]         |
| Terraform | [Terraform][19]             | [Terraform][20]      |
| Terraform | [datadog-to-terraform][21]  | [Intercom][22]       |
| AWS CDK   | [cdk-datadog-resources][23] | [NomadBlacky][24]    |

## Community integrations

### Ansible

In addition to the official Ansible integration, the [monitoring section][25] of the [ansible-modules-extras][26] repository contains modules that interact with Datadog.

### Aptible

Enclave delivers your metrics to a Datadog account. [Consult the dedicated Aptible help center to learn how][27].

### Auth0

[This extension][28] takes your Auth0 logs and ships them to Datadog.

### CLI management

A [set of tools][29] to backup/restore dashboards and monitors, and configure users via a command line interface.

### Consul

Publish consul service counts into Datadog via [DogStatsD][1] with [this library][30].

### Dogscaler

Scale up auto-scale groups based on the results of a Datadog query with [Dogscaler][31].

### Dynatrace

This [plugin][32] sends any Dynatrace measure from a chart to Datadog.

### FreeSwitch

This is for a [FreeSwitch ESL][33] application to export statistics to Datadog using the DogStatsD API and is written by [WiMacTel][34].

### Google Analytics

You can get data into Datadog from Google Analytics via the Datadog API with [this library][35] from [Bithaus][36].

### Heroku

Heroku emits dyno metrics via logs. To convert these logs into metrics and send them to Datadog, use one of the following log drains. To send your Heroku logs to Datadog, see [the documentation][37].

* [Heroku Datadog Log Drain][38] written in Nodejs by [Oz][39].
* [Heroku Datadog Log Drain][40] written in Go by [Apiary][41].

### Jira

A [tool][42] to poll data from Jira and upload it as metrics to Datadog.

### K6

K6, a load and performance regression testing tool developed by Load Impact, can send test results to Datadog using [DogStatsD][1]. To enable this feature, see [the tutorial][43].

### LaunchDarkly

A [LaunchDarkly][44] webhook handler that records changes as Datadog events.

### Logstash output

* [Logstash output for Datadog][45]
* [Logstash output for DogStatsD][46]

### Moogsoft

A Moogsoft [listener][47] that ingests Datadog notifications.

### NGINX LUA

* Emit [custom metrics][48] directly from NGINX configurations using the [nginx_lua_datadog][49] module in your LUA scripts.
* [lua-resty-dogstatsd][50] is an extension developed by [mediba inc][51] (now forked by [Dailymotion][52]). It enables emitting metrics, events, and service checks through the [DogStatsD][1] protocol. `lua-resty-dogstatsd` is released as GPLv3 and relies on the Nginx cosocket API.

### OpenVPN

* Send OpenVPN [bandwidth usage][53] and the count of active connections to Datadog.
* Send OpenVPN [licensing information][54] to Datadog.

### Phusion Passenger

Send health metrics from Phusion's Passenger server using the [passenger-datadog-monitor][55] written by [Stevenson Jean-Pierre][56]

### Pid-stats

This [library][57] allows you to generate process information from StatsD, given pid files. It was created by [GitterHQ][58].

### Saltstack

* [Datadog Saltstack Formula][59]
* [Datadog Saltstack][60] written by [Luca Cipriani][61].

### Sensu

Use these Sensu [handlers][62] to automatically send both metrics and events to Datadog.

### StackStorm

This StackStorm Datadog [integration pack][63] supplies action integration for Datadog.

### Winston

A Winston Datadog [transport][64].

## Community Agent ports

### FreeBSD

[FreeBSD dd-agent port][65]

### NixOS

[dd-agent nixpkg][66]

If you've written a Datadog library and would like to add it to this page, send an email to [opensource@datadoghq.com][67].

[1]: /developers/metrics/dogstatsd_metrics_submission/
[2]: /tracing/
[3]: /serverless/
[4]: /api/
[5]: https://github.com/brightcove/dog-watcher
[6]: https://www.brightcove.com
[7]: https://github.com/Shopify/doggy
[8]: https://www.shopify.com
[9]: https://github.com/grosser/kennel
[10]: https://www.zendesk.com
[11]: https://github.com/trueaccord/DogPush
[12]: https://github.com/trueaccord
[13]: https://github.com/codenize-tools/barkdog
[14]: https://github.com/codenize-tools
[15]: https://github.com/airbnb/interferon
[16]: https://github.com/airbnb
[17]: https://github.com/rapid7/dogwatch
[18]: https://github.com/rapid7
[19]: https://www.terraform.io/docs/providers/datadog/r/monitor.html
[20]: https://www.terraform.io
[21]: https://github.com/intercom/datadog-to-terraform
[22]: https://github.com/intercom
[23]: https://github.com/NomadBlacky/cdk-datadog-resources
[24]: https://github.com/NomadBlacky
[25]: https://docs.ansible.com/ansible/2.9/modules/list_of_monitoring_modules.html
[26]: https://github.com/ansible/ansible-modules-extras
[27]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
[28]: https://github.com/BetaProjectWave/auth0-logs-to-datadog
[29]: https://github.com/keirans/datadog-management
[30]: https://github.com/zendesk/consul2dogstats
[31]: https://github.com/cvent/dogscaler
[32]: https://github.com/Dynatrace/Dynatrace-AppMon-Datadog-Plugin
[33]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[34]: https://github.com/wimactel
[35]: https://github.com/bithauschile/datadog-ga
[36]: https://blog.bithaus.cl/2016/04/20/realtime-google-analytics-metrics-in-datadog
[37]: /logs/guide/collect-heroku-logs/
[38]: https://github.com/ozinc/heroku-datadog-drain
[39]: https://web.oz.com/
[40]: https://github.com/apiaryio/heroku-datadog-drain-golang
[41]: https://apiary.io
[42]: https://github.com/evernote/jiradog
[43]: https://blog.loadimpact.com/how-to-send-k6-metrics-to-datadog
[44]: https://github.com/meetup/launch-dogly
[45]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[46]: https://github.com/brigade/logstash-output-dogstatsd
[47]: https://docs.moogsoft.com/AIOps.6.2.0/Datadog-Solution-Pak_13737047.html
[48]: /developers/metrics/custom_metrics/
[49]: https://github.com/simplifi/ngx_lua_datadog
[50]: https://github.com/dailymotion/lua-resty-dogstatsd
[51]: http://www.mediba.jp
[52]: https://www.dailymotion.com/us
[53]: https://github.com/byronwolfman/dd-openvpn
[54]: https://github.com/denniswebb/datadog-openvpn
[55]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[56]: https://github.com/Sjeanpierre
[57]: https://github.com/gitterHQ/pid-stats
[58]: https://github.com/gitterHQ
[59]: https://github.com/DataDog/datadog-formula
[60]: https://gist.github.com/mastrolinux/6175280
[61]: https://gist.github.com/mastrolinux
[62]: https://github.com/sensu-plugins/sensu-plugins-datadog
[63]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[64]: https://github.com/sparkida/winston-datadog
[65]: https://github.com/urosgruber/dd-agent-FreeBSD
[66]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[67]: mailto:opensource@datadoghq.com
