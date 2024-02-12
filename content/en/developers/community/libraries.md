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

A [set of tools][27] to backup/restore dashboards and monitors, and configure users through a command line interface.

### Consul

Publish Consul service counts into Datadog from [DogStatsD][1] with the [Consul library][28].

### Dogscaler

Scale up auto-scale groups based on the results of a Datadog query with [Dogscaler][29].

### FreeSwitch

This is for a [FreeSwitch ESL][30] application to export statistics to Datadog using the DogStatsD API and is written by [WiMacTel][31].

### Heroku

Heroku emits dyno metrics through logs. To convert these logs into metrics and send them to Datadog, use one of the following log drains. To send your Heroku logs to Datadog, see [Collect Heroku logs][34].

* [Heroku Datadog Log Drain][35] written in Nodejs by [Oz][36].
* [Heroku Datadog Log Drain][37] written in Go by [Apiary][38].

To use the PHP tracer or profiler on Heroku, use the following buildpack.

* [Heroku Datadog PHP Tracer and Profiler Buildpack][65] maintained by [SpeedCurve][66].

### K6

K6, a load and performance regression testing tool developed by Load Impact, can send test results to Datadog using [DogStatsD][1]. To enable this feature, see [the tutorial][40].

### LaunchDarkly

A [LaunchDarkly][41] webhook handler that records changes as Datadog events.

### Logstash output

* [Logstash output for Datadog][42]
* [Logstash output for DogStatsD][43]

### Moogsoft

A Moogsoft [listener][44] that ingests Datadog notifications.

### NGINX LUA

* Emit [custom metrics][45] directly from NGINX configurations using the [nginx_lua_datadog][46] module in your LUA scripts.
* [lua-resty-dogstatsd][47] is an extension developed by [mediba inc][48] (forked by [Dailymotion][49]). It enables emitting metrics, events, and service checks through the [DogStatsD][1] protocol. `lua-resty-dogstatsd` is released as GPLv3 and relies on the Nginx cosocket API.

### OpenVPN

* Send OpenVPN [licensing information][51] to Datadog.

### Phusion Passenger

Send health metrics from Phusion's Passenger server using the [passenger-datadog-monitor][52] written by [Stevenson Jean-Pierre][53]

### Pid-stats

This [library][54] allows you to generate process information from StatsD, given pid files. It was created by [GitterHQ][55].

### Pulumi
The Datadog [resource provider][67] for Pulumi lets you configure Datadog resources.

### SaltStack

* [Datadog SaltStack Formula][56]
* [Datadog SaltStack][57] written by [Luca Cipriani][58].

### Sensu

Use these Sensu [handlers][59] to automatically send both metrics and events to Datadog.

### StackStorm

This StackStorm Datadog [integration pack][60] supplies action integration for Datadog.

### Winston

A Winston Datadog [transport][61].

## Community Agent ports

### FreeBSD

[FreeBSD dd-agent port][62]

### NixOS

[dd-agent nixpkg][63]

If you've written a Datadog library and would like to add it to this page, send an email to [opensource@datadoghq.com][64].

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
[27]: https://github.com/keirans/datadog-management
[28]: https://github.com/zendesk/consul2dogstats
[29]: https://github.com/cvent/dogscaler
[30]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[31]: https://github.com/wimactel
[34]: /logs/guide/collect-heroku-logs/
[35]: https://github.com/ozinc/heroku-datadog-drain
[36]: https://oz.com/
[37]: https://github.com/apiaryio/heroku-datadog-drain-golang
[38]: https://apiary.io
[40]: https://grafana.com/docs/k6/latest/results-output/real-time/datadog/
[41]: https://github.com/meetup/launch-dogly
[42]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[43]: https://github.com/brigade/logstash-output-dogstatsd
[44]: https://docs.moogsoft.com/AIOps.6.2.0/Datadog-Solution-Pak_13737047.html
[45]: /metrics/custom_metrics/
[46]: https://github.com/simplifi/ngx_lua_datadog
[47]: https://github.com/dailymotion/lua-resty-dogstatsd
[48]: http://www.mediba.jp
[49]: https://www.dailymotion.com/us
[51]: https://github.com/denniswebb/datadog-openvpn
[52]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[53]: https://github.com/Sjeanpierre
[54]: https://github.com/gitterHQ/pid-stats
[55]: https://github.com/gitterHQ
[56]: https://github.com/DataDog/datadog-formula
[57]: https://gist.github.com/mastrolinux/6175280
[58]: https://gist.github.com/mastrolinux
[59]: https://github.com/sensu-plugins/sensu-plugins-datadog
[60]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[61]: https://github.com/sparkida/winston-datadog
[62]: https://github.com/urosgruber/dd-agent-FreeBSD
[63]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[64]: mailto:opensource@datadoghq.com
[65]: https://github.com/SpeedCurve-Metrics/heroku-buildpack-php-ddtrace
[66]: https://www.speedcurve.com/
[67]: https://github.com/pulumi/pulumi-datadog
