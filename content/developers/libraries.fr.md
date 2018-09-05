---
title: Bibliothèques
kind: documentation
aliases:
  - /fr/libraries/
disable_toc: true
---
## API et bibliothèques client DogStatsD

Le tableau suivant répertorie les API et bibliothèques clients [DogStatsD](/developers/dogstatsd) de Datadog-official et community. Quelques bibliothèques supportent à la fois l'API et DogStatsD, mais la plupart se concentrent sur l'une ou l'autre.

{{< classic-libraries-table >}}

## Bibliothèques client pour l'APM

Le tableau suivant répertorie les bibliothèques client Datadog-official et community pour les [Traces](/tracing/)

{{< tracing-libraries-table >}}

## Intégrations de la communauté

### Ansible
En plus de l'intégration officielle d'Ansible, la [section de monitoring][46] du repository [ansible-modules-extras][47] contient des modules qui interagissent avec Datadog.

### Aptible
Enclave livre vos métriques à un compte Datadog. [Consultez le centre d'aide Aptible dédié pour savoir comment][111].

### Auth0
[Cette extension][110] prends vos logs Auth0 et les envoie à Datadog.
### Consul
Publiez les comptes du service consul dans Datadog via [DogStatsD](/developers/dogstatsd) avec [cette bibliothèque][96].

### Dogscaler
Scale up les groupes auto-scale en fonction des résultats d'une requête Datadog avec [Dogscaler][97].

### Dynatrace
Ce [plugin][101] envoie n'importe quelle mesure Dynatrace depuis un graphique à Datadog.

### FreeSwitch
C'est pour une application [FreeSwitch ESL][48] afin d'exporter des statistiques vers Datadog en utilisant l'API DogStatsD et est écrit par [WiMacTel][49].

### Google Analytics
Vous pouvez obtenir des données de Google Analytics dans Datadog en utilisant notre API avec [cette bibliothèque][105] de [Bithaus][106] ou [cette bibliothèque][50].

### Logstash Output
  * [Output Logstash pour Datadog][73]
  * [Logstash Output pour DogStatsD][88]

### Moogsoft
Un Moogsoft [listener][102] qui ingère des notifications Datadog.

### NGINX LUA
  * Emetter des [métriques customs][112] directement à partir des configurations NGINX en utilisant le module [nginx_lua_datadog][72] dans vos scripts LUA.
  * [lua-resty-dogstatsd][79] est une extension développée par [mediba inc][80], qui permet l'émission de métriques, d'événements et de check de service au protocole [DogStatsD](/developers/dogstatsd) . lua-resty-dogstatsd est publié en tant que GPLv3 et repose sur l'API nginx cosocket.

### OpenVPN
  * Envoyer votre [bande passante OpenVPN][107] et le nombre de connexions actives à Datadog.
  * Envoyez les [informations de licence OpenVPN][108] à Datadog.

### Phusion Passenger
Envoyer les mesures de santé du serveur de passagers de Phusion en utilisant le [passager-datadog-monitor][77] écrit par [Stevenson Jean-Pierre][78]

### Pid-stats
Cette [bibliothèque][51] vous permet de générer des informations des processus à partir de StatsD, en fonction des fichiers pid. Il a été créé par [GitterHQ][52].

### Saltstack
  * [Datadog Saltstack Formula][43]
  * [Datadog Saltstack][44] écrit par [Luca Cipriani][45].

### Sensu
Utilisez ces [handlers][103] Sensu pour envoyer automatiquement les métriques et les événements à Datadog.

### StackStorm

Ce [pack d'intégration StadStorm Datadog][109] fournit l'intégration d'action pour Datadog.

### Winston
Un [transport Winston Datadog][104].

## Community Agent Ports

### FreeBSD
  * [FreeBSD dd-agent port][99]

### NixOS
  * [dd-agent nixpkg][100]

Si vous avez écrit une bibliothèque pour Datadog et que vous souhaitez l'ajouter à cette page, écrivez-nous à [code@datadoghq.com][9].

   [1]: https://github.com/DataDog/datadogpy
   [3]: https://github.com/DataDog/dogapi-rb
   [4]: https://github.com/DataDog/dogstatsd-ruby
   [5]: https://github.com/DataDog/php-datadogstatsd
   [6]: https://github.com/DataDog/dogstatsd-csharp-client
   [7]: https://github.com/datadog/java-dogstatsd-client
   [8]: http://www.indeed.com/
   [9]: https://github.com/coursera/metrics-datadog
   [10]: https://www.coursera.org/
   [11]: https://github.com/bazaarvoice/metrics-datadog
   [12]: http://www.bazaarvoice.com/
   [13]: https://github.com/bazaarvoice/lassie
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
   [99]: https://github.com/urosgruber/dd-agent-FreeBSD
   [100]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
   [101]: https://github.com/Dynatrace/Dynatrace-AppMon-Datadog-Plugin
   [102]: https://docs.moogsoft.com/display/060102/Datadog+Solution+Pak
   [103]: https://github.com/sensu-plugins/sensu-plugins-datadog
   [104]: https://github.com/sparkida/winston-datadog
   [105]: https://github.com/bithauschile/datadog-ga
   [106]: https://blog.bithaus.cl/2016/04/20/realtime-google-analytics-metrics-in-datadog/
   [107]: https://github.com/byronwolfman/dd-openvpn
   [108]: https://github.com/denniswebb/datadog-openvpn
   [109]: https://github.com/StackStorm-Exchange/stackstorm-datadog
   [110]: https://github.com/BetaProjectWave/auth0-logs-to-datadog
   [111]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
   [112]: /developers/metrics/custom_metrics 
