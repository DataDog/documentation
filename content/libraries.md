---
title: Libraries
kind: documentation
sidebar:
  nav:
    - header: Official Libraries
    - text: Python
      href: "#python"
    - text: Ruby
      href: "#ruby"
    - text: C#
      href: "#c-sharp"
    - header: Community Libraries
    - text: Java
      href: "#community-java"
    - text: Node.js
      href: "#community-node"
    - text: Perl
      href: "#community-perl"
    - text: Ruby
      href: "#community-ruby"
    - text: PHP
      href: "#community-php"
    - text: Go
      href: "#community-go"
    - text: Python
      href: "#community-python"
    - text: Scala
      href: "#community-scala"
    - text: Elixir
      href: "#community-elixir"
    - text: C#
      href: "#community-c-sharp"
    - text: R
      href: "#community-r"
    - header: Community Integration Libraries
    - text: Saltstack
      href: "#community-integration-saltstack"
    - text: Ansible
      href: "#community-integration-ansible"
    - text: FreeSwitch
      href: "#community-integration-freeswitch"
    - text: Google Analytics
      href: "#community-integration-google-analytics"
    - text: Pid-stats
      href: "#community-integration-pid-stats"


---

There are many libraries available to help you interact with the Datadog API.

#### Python

  * [datadogpy][1] - A Python Datadog API wrapper and DogStatsD client.
  * [dogstatsd-python][2] - A Python DogStatsD client.

#### Ruby

  * [DogApi][3] - A Ruby Datadog API wrapper.
  * [dogstatsd-ruby][4] - A Ruby DogStatsD client.

#### C\#
{: #c-sharp}

  * [dogstatsd-csharp-client][6] - A C# DogStatsD client.

### Community Libraries

Some great folks have written their own libraries to help interact with Datadog. Check them out: 

#### Java
{: #community-java}

  * [java-dogstatsd-client][7] - a DogStatsD Client for Java written by [Indeed][8]. 
  * [metrics-datadog][9] - a backend to yammers's [metrics][9] library written by [Coursera][10]. 
  * [metrics-datadog][11] - a backend to codahale's [metrics][11] library extended by [Bazaarvoice][12]. 
  * [Lassie][13] - a Java screenboard API client by [Bazaarvoice][12]. 
  * [java-dogstatsd-client] [59] - DogStatsD Client for Java to submit both Events and Metrics written by [arnabk] [60].

#### Node.js
{: #community-node}

  * [node-datadog][14] - a Node.js API client, contributed by [HashGo][15]. 
  * [node-dogstatsd][16] - a Node.js DogStatsD client, contributed by [Young Han Lee][17]. 
  * [node-dogapi][18] - a Node.js API client, contributed by [Brett Langdon][19]. 
  * [datadog-metrics][57] - Node.js API client, contributed by [Daniel Bader][58].

#### Perl
{: #community-perl}

  * [webservice-datadog][20] - a Perl API client, contributed by [Jennifer Pinkham][21]. 
  * [dogstatsd-perl][22] - a Perl DogStatsD client, contributed by [Stefan Goethals][23]. 

#### Ruby
{: #community-ruby}

  * [metricks-dogstatsd][24] - a backend for the popular [Metriks][25] gem, written by [Mavenlink][26]. 
  * [hotdog][61] - A command-line interface contributed by [Yuu Yamashita][62].

#### PHP
{: #community-php}

  * [php-datadogstatsd][5] - An extremely simple PHP DogStatsD client written by Alex Corley
  * [plesk_metrics_datadog][27] - a PHP script to collect metrics from [Plesk][28] by [Israel Viana][29]. 

#### Go
{: #community-go}

  * [go-datadog-api][30] - a Go wrapper for our API by [Mark Smith][31]. 
  * [go-dogstatsd][32] - a dogstatsd client written in Go by [Ooyala][33]. 
  * [godspeed][63] - a dogstatsd client written in Go by [PagerDuty][64]

#### Python
{: #community-python}

  * [scales_datadog][34] - a Datadog backend for the [Scales][35] library, written by [Tommaso Barbugli][36]. 

#### Scala
{: #community-scala}

  * [datadgog-scala][37] - a Scala API client, written by [Cory Watson][38]. 

#### Elixir
{: #community-elixir}

  * [ExStatsD][39] - an Elixir DogStatsD library by [CargoSense][40]. 
  * [dogstatsd-elixir][41] - a dogstatsd client in Elixir by [Adam Kittelson][42]. 
  * [mtx][65] - an Elixir Datadog client by [synrc][66].
  
#### C\#
{: #community-c-sharp}

  * [metrics.net-datadog][67] - a .NET translation of the metrics-to-datadog java adapter

#### R
{: #community-r}

  * [rdog][68] - an R package to analyze Datadog metrics into R

### Community Integration Libraries

#### Saltstack
{: #community-integration-saltstack}

  * [Datadog Saltstack Formula][43]
  * [Datadog Saltstack][44] written by [Luca Cipriani][45]. 

#### Ansible
{: #community-integration-ansible}

  * In addition to our official integration, the [monitoring section][46] of the [ansible-modules-extras][47] repository contains modules that interact with Datadog.

#### FreeSwitch
{: #community-integration-freeswitch}

  * This is for a [FreeSwitch ESL ][48] application to export statistics to DataDog using the dogstatsd API and is written by [WiMacTel][49]. 

#### Google Analytics
{: #community-integration-google-analytics}

  * You can get data into Datadog from Google Analytics using our API with [this library][50]. 

#### Pid-stats
{: #community-integration-pid-stats}

  * This [library][51] will allow you to generate process information from StatsD, given pid files. It was created by [GitterHQ][52]. 


#### Reverse Color Scheme

  * To get a darker background than default, you can use [this CSS library][55] to flip the colors. 
  


If you've written a Datadog library, write us at [code@datadoghq.com][56] and we'll be happy to add it to the list. 

   [1]: https://github.com/DataDog/datadogpy
   [2]: https://github.com/DataDog/dogstatsd-python
   [3]: https://github.com/DataDog/dogapi-rb
   [4]: https://github.com/DataDog/dogstatsd-ruby
   [5]: https://github.com/DataDog/php-datadogstatsd
   [6]: https://github.com/DataDog/dogstatsd-csharp-client
   [7]: https://github.com/indeedeng/java-dogstatsd-client
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
   [22]: https://github.com/zipkid/dogstatsd-perl
   [23]: https://github.com/zipkid
   [24]: https://github.com/mavenlink/metriks-dogstatsd
   [25]: https://github.com/eric/metriks
   [26]: https://www.mavenlink.com/
   [27]: https://github.com/isra00/plesk_datadog_metrics
   [28]: http://www.parallels.com/products/plesk/
   [29]: https://github.com/isra00
   [30]: https://github.com/xb95/go-datadog-api
   [31]: https://github.com/xb95
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
   [55]: http://stylebot.me/styles/4320
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
