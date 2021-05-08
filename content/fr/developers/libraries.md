---
title: Bibliothèques
kind: documentation
aliases:
  - /fr/libraries/
  - /fr/developers/faq/monitoring-akka/
---
## Bibliothèques client pour DogstatsD et les API

Le tableau suivant répertorie les bibliothèques client pour [DogStatsD][1] et l'API de Datadog et sa communauté. Certaines bibliothèques prennent en charge l'API et DogStatsD, mais la grande majorité se concentre sur l'un ou l'autre.

{{< classic-libraries-table >}}

## Bibliothèques client pour le tracing distribué et l'APM

Le tableau suivant répertorie les bibliothèques client pour les [traces][2] de Datadog et sa communauté.

{{< tracing-libraries-table >}}

## Bibliothèques client sans serveur

Le tableau suivant répertorie les bibliothèques client [sans serveur][3] de Datadog et sa communauté.

{{< serverless-libraries-table >}}

## Bibliothèques client pour la gestion des logs

Le tableau suivant répertorie les bibliothèques client de gestion de logs de Datadog et sa communauté.

{{< log-libraries-table >}}

## Bibliothèques client de la communauté Datadog

### Sauvegarde de dashboards

Grâce aux [API][4] de Datadog, vous pouvez rédiger un script pour sauvegarder les définitions de votre dashboard sous forme de code. Consultez les projets suivants pour obtenir des exemples de réalisation de ces sauvegardes :

| Langage   | Bibliothèque          | Author          |
|------------|------------------|-----------------|
| JavaScript | [dog-watcher][5] | [Brightcove][6] |
| Ruby       | [doggy][7]       | [Shopify][8]    |
| Ruby       | [kennel][9]      | [Zendesk][10]    |

### Gestion de monitors

Plusieurs projets de notre communauté sont consacrés à la maintenance, à la gestion ou à la sauvegarde des monitors via l'[API][4] Datadog :

| Langage   | Bibliothèque                | Author               |
|-----------|-----------------------------|----------------------|
| Python    | [DogPush][11]               | [TrueAccord][12]     |
| Ruby      | [barkdog][13]               | [codenize-tools][14] |
| Ruby      | [interferon][15]            | [Airbnb][16]         |
| Ruby      | [dogwatch][17]              | [Rapid7][18]         |
| Terraform | [Terraform][19]             | [Terraform][20]      |
| Terraform | [datadog-to-terraform][21]  | [Intercom][22]       |
| AWS CDK   | [cdk-datadog-resources][23] | [NomadBlacky][24]    |

## Intégrations de la communauté

### Ansible

En plus de l'intégration officielle Ansible, la [section relative à la surveillance][25] du référentiel [ansible-modules-extras][26] comprend des modules qui interagissent avec Datadog.

### Aptible

Enclave envoie vos métriques vers un compte Datadog. [Consultez le centre d'aide Aptible dédié pour en savoir plus][27].

### Auth0

[Cette extension][28] récupère les logs Auth0 et les transmet à Datadog.

### Gestion de l'interface de ligne de commande

Un [ensemble d'outils][29] pour sauvegarder et restaurer les dashboards et les monitors, mais également pour configurer des utilisateurs via une interface de ligne de commande.

### Consul

Publiez les totaux de services Consul dans Datadog via [DogStatsD][1] grâce à [cette bibliothèque][30].

### Dogscaler

Effectuez automatiquement une mise à l'échelle croissante des groupes en fonction des résultats d'une requête Datadog avec [Dogscaler][31].

### Dynatrace

Ce [plug-in][32] envoie des mesures Dynatrace depuis un graphique vers Datadog.

### FreeSwitch

Il s'agit d'une application [ESL de FreeSwitch][33] (rédigée par [WiMacTel][34]) permettant d'exporter des statistiques vers Datadog à l'aide de l'API DogStatsD.

### Google Analytics

Vous pouvez importer des données dans Datadog depuis Google Analytics via l'API Datadog avec [cette bibliothèque][35] de [Bithaus][36].

### Heroku

Heroku émet des métriques dyno par l'intermédiaire de logs. Pour convertir ces logs en métriques et les envoyer à Datadog, utilisez l'un des drains de log suivants. Pour envoyer vos logs Heroku à Datadog, consultez [la documentation dédiée][37].

* [Drain de logs Heroku pour Datadog][38] écrit en NodeJS par [Oz][39].
* [Drain de logs Heroku pour Datadog][40] écrit en Go par [Apiary][41].

### Jira

Un [outil][42] qui permet de récupérer des données à partir de Jira et de les importer en tant que métriques dans Datadog.

### K6

Cet outil de test de régression de charge et de performance a été développé par Load Impact. Il permet d'envoyer les résultats des tests à Datadog via [DogStatsD][1]. Pour activer cette fonctionnalité, consultez [le tutoriel][43] (en anglais).

### LaunchDarkly

Un gestionnaire de webhooks [LaunchDarkly][44] qui enregistre les changements sous la forme d'événements Datadog.

### Sortie Logstash

* [Sortie Logstash pour Datadog][45]
* [Sortie Logstash pour DogStatsD][46]

### Moogsoft

Un [écouteur][47] Moogsoft qui ingère des notifications Datadog.

### LUA NGINX

* Générez des [métriques custom][48] directement à partir des configurations NGINX à l'aide du module [nginx_lua_datadog][49] dans vos scripts LUA.
* [lua-resty-dogstatsd][50] est une extension développée par [mediba inc][51] (et désormais forkée par [Dailymotion][52]). Elle permet de générer des métriques, des événements et des checks de service via le protocole [DogStatsD][1]. `lua-resty-dogstatsd` est fourni en tant que GPLv3 et repose sur l'API cosocket Nginx.

### OpenVPN

* Envoyez des informations sur [l'utilisation de la bande passante][53] OpenVPN et le nombre de connexions actives à Datadog.
* Envoyez des [informations sur les licences][54] OpenVPN à Datadog.

### Phusion Passenger

Envoyez des métriques de santé depuis le serveur Phusion Passenger à l'aide de [passenger-datadog-monitor][55], rédigé par [Stevenson Jean-Pierre][56].

### Pid-stats

Cette [bibliothèque][57] vous permet de générer des informations sur les processus depuis des fichiers pid StatsD donnés. Elle a été créée par [GitterHQ][58].

### Saltstack

* [Formule Saltstack pour Datadog][59]
* [Saltstack Datadog][60] rédigé par [Luca Cipriani][61].

### Sensu

Utilisez ces [gestionnaires][62] Sensu pour envoyer automatiquement des métriques et des événements à Datadog.

### StackStorm

Ce [pack d'intégrations][63] StackStorm Datadog permet d'utiliser des actions dans Datadog.

### Winston

Un [transport][64] Winston/Datadog.

## Ports de la communauté pour l'Agent

### FreeBSD

[FreeBSD dd-agent port][65]

### NixOS

[dd-agent nixpkg][66]

Si vous avez rédigé une bibliothèque Datadog et que vous souhaitez l'ajouter à cette page, contactez-nous par e-mail à l'adresse [opensource@datadoghq.com][67].

[1]: /fr/developers/metrics/dogstatsd_metrics_submission/
[2]: /fr/tracing/
[3]: /fr/serverless/
[4]: /fr/api/
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
[37]: /fr/logs/guide/collect-heroku-logs/
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
[48]: /fr/developers/metrics/custom_metrics/
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
