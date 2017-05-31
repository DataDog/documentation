---
title: Libraries
kind: documentation
---

There are many libraries available to help you interact with the Datadog API.

#### C\#
{: #c-sharp}

  * [dogstatsd-csharp-client][6] - A C# DogStatsD client.

#### Go

  * [datadog-go][71] - A Go DogStatsD client.

#### JAVA
  * [java-dogstatsd-client][7] - a DogStatsD Client for Java written by [Indeed][8] and Datadog.

#### Python

  * [datadogpy][1] - A Python Datadog API wrapper and DogStatsD client.

#### Ruby

  * [DogApi][3] - A Ruby Datadog API wrapper.
  * [dogstatsd-ruby][4] - A Ruby DogStatsD client.

#### PHP

  * [php-datadogstatsd][5] - An extremely simple PHP DogStatsD client written by Alex Corley.

### Community Libraries

Some great folks have written their own libraries to help interact with Datadog. Check them out:

#### C\#
{: #community-c-sharp}

  * [metrics.net-datadog][67] - a .NET translation of the metrics-to-datadog java adapter

#### Crystal
{: #community-crystal}

  * [statsd.cr][86] - A statsd client library implemented in Crystal by [Mike Fiedler][87]

#### Delphi
{: #community-delphi}

* [datadog-delphi][85] - A statsd client library implemented in Delphi.

#### Elixir
{: #community-elixir}

  * [ExStatsD][39] - an Elixir DogStatsD library by [CargoSense][40].
  * [dogstatsd-elixir][41] - a dogstatsd client in Elixir by [Adam Kittelson][42].
  * [mtx][65] - an Elixir Datadog client by [synrc][66].

#### Go
{: #community-go}

  * [ecsdog][74] - a standalone Go application that scrapes metrics and events from ECS, and sends them to statsd by [ejholmes][75]
  * [godspeed][63] - a feature-rich dogstatsd client written in Go by [PagerDuty][64].
  * [go-datadog-api][30] - a Go wrapper for our API by [Mark Smith][31] from [Dropbox][81].
  * [go-dogstatsd][32] - a dogstatsd client written in Go by [Ooyala][33].
  * [xstats][69] - a generic client for service instrumentation using dogstatsd in Go by [Olivier Poitrey][70].


#### Java
{: #community-java}

  * [metrics-datadog][9] - a backend to yammers's metrics library written by [Coursera][10].
  * [Lassie][13] - a Java screenboard API client by [Bazaarvoice][12].
  * [java-dogstatsd-client] [59] - DogStatsD Client for Java to submit both Events and Metrics written by [arnabk] [60].

#### Node.js
{: #community-node}
  * [hotshots][76] - a Node.js client for statsd, DogStatsD, and Telegraf written by Brightcove.
  * [node-datadog][14] - a Node.js API client, contributed by [HashGo][15].
  * [node-dogstatsd][16] - a Node.js DogStatsD client, contributed by [Young Han Lee][17].
  * [node-dogapi][18] - a Node.js API client, contributed by [Brett Langdon][19].
  * [datadog-metrics][57] - Node.js API client, contributed by [Daniel Bader][58].

#### Perl
{: #community-perl}

  * [webservice-datadog][20] - a Perl API client, contributed by [Jennifer Pinkham][21].
  * [dogstatsd-perl][22] - a Perl DogStatsD client, contributed by [Stefan Goethals][23].

#### PHP
{: #community-php}

  * [dog-statsd][82] - A fork of [thephpleague/statsd][83] with additional Datadog features by [Graze][84].
  * [plesk_metrics_datadog][27] - a PHP script to collect metrics from [Plesk][28] by [Israel Viana][29].

#### Python
{: #community-python}

  * [scales_datadog][34] - a Datadog backend for the [Scales][35] library, written by [Tommaso Barbugli][36].

#### Ruby
{: #community-ruby}

  * [metricks-dogstatsd][24] - a backend for the popular [Metriks][25] gem, written by [Mavenlink][26].
  * [hotdog][61] - A command-line interface contributed by [Yuu Yamashita][62].

#### R
{: #community-r}

  * [datadogr][98] - a simple R package to query for metrics.
  * [rdog][68] - an R package to analyze Datadog metrics into R.

#### Scala
{: #community-scala}

  * [datadog-scala][37] - a Scala API client, written by [Cory Watson][38].

### Community Tracing (APM) Libraries

#### C\#
{: #community-tracing-csharp}

  * [DatadogSharp][89] - A C# Datadog client that supports DogStatsD and APM.

#### Elixir
{: #community-tracing-elixir}

  * [spandex][90] - A Datadog APM reporting library.

#### Java
{: #community-tracing-java}

  * [apm-client][91] - A Java client for Datadog APM.

#### OpenTracing
{: #community-tracing-opentracing}

  * [datadog-tracer-js][92] - OpenTracing tracer implementation for Datadog in JavaScript.

  * [dd-go-opentracing][93] - OpenTracing tracer implementation for Datadog in Go.

#### PHP
{: #community-tracing-php}

  * [dd-trace-php][94] - A PHP tracing implementation for Datadog.

#### Zipkin
{: #community-tracing-zipkin}

  * [dd-zipkin-proxy][95] - A simple Zipkin-to-Datadog proxy.

### Community Integration Libraries

#### Ansible
{: #community-integration-ansible}

  * In addition to our official integration, the [monitoring section][46] of the [ansible-modules-extras][47] repository contains modules that interact with Datadog.

#### Consul
{: #community-integration-consul}

  * Publish consul service counts into Datadog via dogstatsd with [this library][96].

#### Dogscaler
{: #community-integration-dogscaler}

  * Scale up auto-scale groups based on the results of a datadog query with [Dogscaler][97].

#### FreeSwitch
{: #community-integration-freeswitch}

  * This is for a [FreeSwitch ESL ][48] application to export statistics to DataDog using the dogstatsd API and is written by [WiMacTel][49].

#### Google Analytics
{: #community-integration-google-analytics}

  * You can get data into Datadog from Google Analytics using our API with [this library][50].

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

  * Send health metrics from Phusion's Passenger server using the [passenger-datadog-monitor][77] written by [Stevenson Jean-Pierre][78]

#### Pid-stats
{: #community-integration-pid-stats}

  * This [library][51] will allow you to generate process information from StatsD, given pid files. It was created by [GitterHQ][52].

#### Saltstack
{: #community-integration-saltstack}

  * [Datadog Saltstack Formula][43]
  * [Datadog Saltstack][44] written by [Luca Cipriani][45].


If you've written a Datadog library, write us at [code@datadoghq.com][56] and we'll be happy to add it to the list.

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
   [74]:https://github.com/remind101/ecsdog
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
