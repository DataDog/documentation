---
title: Libraries
kind: documentation
---

### API and DogStatsD Client Libraries

The following table lists Datadog-official and community contributed API and DogStatsD client libraries. A few libraries support both the API and DogStatsD, but most focus on one or the other.

<%= print_classic_library_table %>

### Tracing (APM) Client Libraries

The following table lists Datadog-official and community contributed [Trace](/tracing/) client libraries.

<%= print_tracing_library_table %>

### Community Projects

#### Ansible
{: #community-integration-ansible}

In addition to the official Ansible integration, the [monitoring section][46] of the [ansible-modules-extras][47] repository contains modules that interact with Datadog.

#### Consul
{: #community-integration-consul}

Publish consul service counts into Datadog via dogstatsd with [this library][96].

#### Dogscaler
{: #community-integration-dogscaler}

Scale up auto-scale groups based on the results of a datadog query with [Dogscaler][97].

#### FreeSwitch
{: #community-integration-freeswitch}

This is for a [FreeSwitch ESL ][48] application to export statistics to DataDog using the dogstatsd API and is written by [WiMacTel][49].

#### Google Analytics
{: #community-integration-google-analytics}

You can get data into Datadog from Google Analytics using our API with [this library][50].

#### Logstash Output
{: #community-integration-logstash}

  * [Logstash Output for Datadog][73]
  * [Logstash Output for Dogstatsd][88]

#### NGINX LUA
{: #community-integration-nginx-lua}
  * Emit custom metrics directly from NGINX configurations using the [nginx_lua_datadog][72] module in your LUA scripts.
  * [lua-resty-dogstatsd][79] is an extension developed by  [mediba inc][80], which enables emiting metrics, events, and service checks to DogStatsD protocol. lua-resty-dogstatsd is released as GPLv3 and relies on the nginx cosocket API.

#### Phusion Passenger
{: #community-integration-passenger}

Send health metrics from Phusion's Passenger server using the [passenger-datadog-monitor][77] written by [Stevenson Jean-Pierre][78]

#### Pid-stats
{: #community-integration-pid-stats}

This [library][51] will allow you to generate process information from StatsD, given pid files. It was created by [GitterHQ][52].

#### Saltstack
{: #community-integration-saltstack}

  * [Datadog Saltstack Formula][43]
  * [Datadog Saltstack][44] written by [Luca Cipriani][45].

If you've written a Datadog library and would like to add it to this page, write us at [code@datadoghq.com][9].

   [1]: https://github.com/DataDog/datadogpy
   [3]: https://github.com/DataDog/dogapi-rb
   [4]: https://github.com/DataDog/dogstatsd-ruby
   [5]: https://github.com/DataDog/php-datadogstatsd
   [6]: https://github.com/DataDog/dogstatsd-csharp-client
   [7]: https://github.com/DataDog/java-dogstatsd-client
   [8]: http://www.indeed.com/
   [9]: https://github.com/coursera/metrics-datadog
   [10]: https://www.coursera.org/
   [11]: https://github.com/bazaarvoice/metrics-datadog
   [12]: http://www.bazaarvoice.com/
   [13]: https://github.com/bazaarvoice/lassie
   [14]: https://github.com/HashGo/node-datadog
   [15]: https://github.com/HashGo
   [16]: https://github.com/joybro/node-dogstatsd
   [17]: https://github.com/joybro
   [18]: https://github.com/brettlangdon/node-dogapi
   [19]: https://github.com/brettlangdon
   [20]: https://github.com/jpinkham/webservice-datadog
   [21]: https://github.com/jpinkham
   [22]: https://github.com/binary-com/dogstatsd-perl
   [23]: https://github.com/zipkid
   [24]: https://github.com/mavenlink/metriks-dogstatsd
   [25]: https://github.com/eric/metriks
   [26]: https://www.mavenlink.com/
   [27]: https://github.com/isra00/plesk_datadog_metrics
   [28]: http://www.parallels.com/products/plesk/
   [29]: https://github.com/isra00
   [30]: https://github.com/zorkian/go-datadog-api
   [31]: https://github.com/zorkian
   [32]: https://github.com/ooyala/go-dogstatsd/
   [33]: https://github.com/ooyala
   [34]: https://github.com/tbarbugli/scales_datadog
   [35]: https://github.com/Cue/scales
   [36]: https://github.com/tbarbugli
   [37]: https://github.com/gphat/datadog-scala
   [38]: https://github.com/gphat
   [39]: https://github.com/CargoSense/ex_statsd
   [40]: https://github.com/CargoSense
   [41]: https://github.com/adamkittelson/dogstatsd-elixir
   [42]: https://github.com/adamkittelson
   [43]: https://github.com/DataDog/datadog-formula
   [44]: https://gist.github.com/mastrolinux/6175280
   [45]: https://gist.github.com/mastrolinux
   [46]: https://docs.ansible.com/ansible/list_of_monitoring_modules.html
   [47]: https://github.com/ansible/ansible-modules-extras
   [48]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
   [49]: https://github.com/wimactel
   [50]: https://github.com/adamdunkley/casperjs-google-analytics-realtime-scrape
   [51]: https://github.com/gitterHQ/pid-stats
   [52]: https://github.com/gitterHQ
   [53]: https://gist.github.com/conorbranagan/c001078d148d2cab38a0
   [54]: https://gist.github.com/conorbranagan/
   [56]: mailto:code@datadoghq.com
   [57]: https://www.npmjs.com/package/datadog-metrics
   [58]: https://twitter.com/dbader_org
   [59]: https://github.com/arnabk/java-dogstatsd-client
   [60]: https://github.com/arnabk
   [61]: https://github.com/yyuu/hotdog
   [62]: https://github.com/yyuu
   [63]: https://github.com/PagerDuty/godspeed
   [64]: http://www.pagerduty.com/
   [65]: https://github.com/synrc/mtx
   [66]: https://synrc.com/
   [67]: https://github.com/Guaranteed-Rate/App.Lib.MetricsDotNetDatadogPlugin
   [68]: https://github.com/alq666/rdog
   [69]: https://github.com/rs/xstats
   [70]: https://github.com/rs
   [71]: https://github.com/DataDog/datadog-go
   [72]: https://github.com/simplifi/ngx_lua_datadog/
   [73]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
   [74]: https://github.com/remind101/ecsdog
   [75]: http://ejholmes.io/
   [76]: https://github.com/brightcove/hot-shots
   [77]: https://github.com/Sjeanpierre/passenger-datadog-monitor
   [78]: https://github.com/Sjeanpierre
   [79]: https://github.com/mediba-system/lua-resty-dogstatsd
   [80]: http://www.mediba.jp/
   [81]: https://www.dropbox.com/
   [82]: https://github.com/graze/dog-statsd
   [83]: https://github.com/thephpleague/statsd
   [84]: http://tech.graze.com/
   [85]: https://github.com/rfrezino/datadog-delphi
   [86]: https://github.com/miketheman/statsd.cr
   [87]: https://github.com/miketheman
   [88]: https://github.com/brigade/logstash-output-dogstatsd
   [89]: https://github.com/neuecc/DatadogSharp
   [90]: https://github.com/albert-io/spandex
   [91]: https://github.com/chonton/apm-client
   [92]: https://github.com/rochdev/datadog-tracer-js
   [93]: https://github.com/gchaincl/dd-go-opentracing
   [94]: https://github.com/jcchavezs/dd-trace-php/tree/master/src/DdTrace
   [95]: https://github.com/flachnetz/dd-zipkin-proxy
   [96]: https://github.com/zendesk/consul2dogstats
   [97]: https://github.com/cvent/dogscaler
   [98]: https://cran.r-project.org/package=datadogr