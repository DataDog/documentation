---
title: Libraries
kind: documentation
aliases:
   - /libraries/
   - /developers/faq/monitoring-akka/
   - /developers/libraries/
---

## API and DogStatsD client libraries

The following table lists Datadog-official and community contributed API and [DogStatsD][1] client libraries. A few libraries support both the API and DogStatsD, but most focus on one or the other.

{{< classic-libraries-table >}}

## APM & Continuous Profiler client libraries

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

| Language  | Library          | Author               |
|-----------|------------------|----------------------|
| Python    | [DogPush][11]              | [TrueAccord][12]     |
| Ruby      | [barkdog][13]              | [codenize-tools][14] |
| Ruby      | [interferon][15]           | [Airbnb][16]         |
| Ruby      | [dogwatch][17]             | [Rapid7][18]         |
| Terraform | [Terraform][19]            | [Terraform][20]      |
| Terraform | [datadog-to-terraform][21] | [Intercom][22]       |

## Community integrations

### Ansible

In addition to the official Ansible integration, the [monitoring section][23] of the [ansible-modules-extras][24] repository contains modules that interact with Datadog.

### Aptible

Enclave delivers your metrics to a Datadog account. [Consult the dedicated Aptible help center to learn how][25].

### CLI management

A [set of tools][26] to backup/restore dashboards and monitors, and configure users through a command line interface.

### Consul

Publish Consul service counts into Datadog from [DogStatsD][1] with the [Consul library][27].

### Dogscaler

Scale up auto-scale groups based on the results of a Datadog query with [Dogscaler][28].

### FreeSwitch

This is for a [FreeSwitch ESL][29] application to export statistics to Datadog using the DogStatsD API and is written by [WiMacTel][30].

### Heroku

Heroku emits dyno metrics through logs. To convert these logs into metrics and send them to Datadog, use one of the following log drains. To send your Heroku logs to Datadog, see [Collect Heroku logs][31].

* [Heroku Datadog Log Drain][32] written in Nodejs by [Oz][33].
* [Heroku Datadog Log Drain][34] written in Go by [Apiary][35].

### Jira

A [tool][36] to poll data from Jira and upload it as metrics to Datadog.

### K6

K6, a load and performance regression testing tool developed by Load Impact, can send test results to Datadog using [DogStatsD][1]. To enable this feature, see [the tutorial][37].

### LaunchDarkly

A [LaunchDarkly][38] webhook handler that records changes as Datadog events.

### Logstash output

* [Logstash output for Datadog][39]
* [Logstash output for DogStatsD][40]

### Moogsoft

A Moogsoft [listener][41] that ingests Datadog notifications.

### NGINX LUA

* Emit [custom metrics][42] directly from NGINX configurations using the [nginx_lua_datadog][43] module in your LUA scripts.
* [lua-resty-dogstatsd][44] is an extension developed by [mediba inc][45] (forked by [Dailymotion][46]). It enables emitting metrics, events, and service checks through the [DogStatsD][1] protocol. `lua-resty-dogstatsd` is released as GPLv3 and relies on the Nginx cosocket API.

### OpenVPN

* Send OpenVPN [bandwidth usage][47] and the count of active connections to Datadog.
* Send OpenVPN [licensing information][48] to Datadog.

### Phusion Passenger

Send health metrics from Phusion's Passenger server using the [passenger-datadog-monitor][49] written by [Stevenson Jean-Pierre][50]

### Pid-stats

This [library][51] allows you to generate process information from StatsD, given pid files. It was created by [GitterHQ][52].

### SaltStack

* [Datadog SaltStack Formula][53]
* [Datadog SaltStack][54] written by [Luca Cipriani][55].

### Sensu

Use these Sensu [handlers][56] to automatically send both metrics and events to Datadog.

### StackStorm

This StackStorm Datadog [integration pack][57] supplies action integration for Datadog.

### Winston

A Winston Datadog [transport][58].

## Community Agent ports

### FreeBSD

[FreeBSD dd-agent port][59]

### NixOS

[dd-agent nixpkg][60]

If you've written a Datadog library and would like to add it to this page, send an email to [opensource@datadoghq.com][61].

[1]: /metrics/custom_metrics/dogstatsd_metrics_submission/
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
[23]: https://docs.ansible.com/ansible/2.9/modules/list_of_monitoring_modules.html
[24]: https://github.com/ansible/ansible-modules-extras
[25]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
[26]: https://github.com/keirans/datadog-management
[27]: https://github.com/zendesk/consul2dogstats
[28]: https://github.com/cvent/dogscaler
[29]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[30]: https://github.com/wimactel
[31]: /logs/guide/collect-heroku-logs/
[32]: https://github.com/ozinc/heroku-datadog-drain
[33]: https://web.oz.com/
[34]: https://github.com/apiaryio/heroku-datadog-drain-golang
[35]: https://apiary.io
[36]: https://github.com/evernote/jiradog
[37]: https://blog.loadimpact.com/how-to-send-k6-metrics-to-datadog
[38]: https://github.com/meetup/launch-dogly
[39]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[40]: https://github.com/brigade/logstash-output-dogstatsd
[41]: https://docs.moogsoft.com/AIOps.6.2.0/Datadog-Solution-Pak_13737047.html
[42]: /metrics/custom_metrics/
[43]: https://github.com/simplifi/ngx_lua_datadog
[44]: https://github.com/dailymotion/lua-resty-dogstatsd
[45]: http://www.mediba.jp
[46]: https://www.dailymotion.com/us
[47]: https://github.com/byronwolfman/dd-openvpn
[48]: https://github.com/denniswebb/datadog-openvpn
[49]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[50]: https://github.com/Sjeanpierre
[51]: https://github.com/gitterHQ/pid-stats
[52]: https://github.com/gitterHQ
[53]: https://github.com/DataDog/datadog-formula
[54]: https://gist.github.com/mastrolinux/6175280
[55]: https://gist.github.com/mastrolinux
[56]: https://github.com/sensu-plugins/sensu-plugins-datadog
[57]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[58]: https://github.com/sparkida/winston-datadog
[59]: https://github.com/urosgruber/dd-agent-FreeBSD
[60]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[61]: mailto:opensource@datadoghq.com
