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

| Langage  | Bibliothèque          | Author               |
|-----------|------------------|----------------------|
| Python    | [DogPush][11]              | [TrueAccord][12]     |
| Ruby      | [barkdog][13]              | [codenize-tools][14] |
| Ruby      | [interferon][15]           | [Airbnb][16]         |
| Ruby      | [dogwatch][17]             | [Rapid7][18]         |
| Terraform | [Terraform][19]            | [Terraform][20]      |
| Terraform | [datadog-to-terraform][21] | [Intercom][22]       |

## Intégrations de la communauté

### Ansible

En plus de l'intégration officielle Ansible, la [section relative à la surveillance][23] du référentiel [ansible-modules-extras][24] comprend des modules qui interagissent avec Datadog.

### Aptible

Enclave envoie vos métriques vers un compte Datadog. [Consultez le centre d'aide Aptible dédié pour en savoir plus][25].

### Auth0

[Cette extension][26] récupère les logs Auth0 et les transmet à Datadog.

### Gestion de l'interface de ligne de commande

Un [ensemble d'outils][27] pour sauvegarder et restaurer les dashboards et les monitors, mais également pour configurer des utilisateurs via une interface de ligne de commande.

### Consul

Publiez les totaux de services Consul dans Datadog via [DogStatsD][1] grâce à [cette bibliothèque][28].

### Dogscaler

Effectuez automatiquement une mise à l'échelle croissante des groupes en fonction des résultats d'une requête Datadog avec [Dogscaler][29].

### Dynatrace

Ce [plug-in][30] envoie des mesures Dynatrace depuis un graphique vers Datadog.

### FreeSwitch

Il s'agit d'une application [ESL de FreeSwitch][31] (rédigée par [WiMacTel][32]) permettant d'exporter des statistiques vers Datadog à l'aide de l'API DogStatsD.

### Google Analytics

Vous pouvez importer des données dans Datadog depuis Google Analytics via l'API Datadog avec [cette bibliothèque][33] de [Bithaus][34].

### Heroku

Heroku émet des métriques dyno par l'intermédiaire de logs. Pour convertir ces logs en métriques et les envoyer à Datadog, utilisez l'un des drains de log suivants. Pour envoyer vos logs Heroku à Datadog, consultez [la documentation dédiée][35].

* [Drain de logs Heroku pour Datadog][36] écrit en NodeJS par [Oz][37].
* [Drain de logs Heroku pour Datadog][38] écrit en Go par [Apiary][39].

### Jira

Un [outil][40] qui permet de récupérer des données à partir de Jira et de les importer en tant que métriques dans Datadog.

### K6

Cet outil de test de régression de charge et de performance a été développé par Load Impact. Il permet d'envoyer les résultats des tests à Datadog via [DogStatsD][1]. Pour activer cette fonctionnalité, consultez [le tutoriel][41] (en anglais).

### LaunchDarkly

Un gestionnaire de webhooks [LaunchDarkly][42] qui enregistre les changements sous la forme d'événements Datadog.

### Sortie Logstash

* [Sortie Logstash pour Datadog][43]
* [Sortie Logstash pour DogStatsD][44]

### Moogsoft

Un [écouteur][45] Moogsoft qui ingère des notifications Datadog.

### LUA NGINX

* Générez des [métriques custom][46] directement à partir des configurations NGINX à l'aide du module [nginx_lua_datadog][47] dans vos scripts LUA.
* [lua-resty-dogstatsd][48] est une extension développée par [mediba inc][49] (et désormais forkée par [Dailymotion][50]). Elle permet de générer des métriques, des événements et des checks de service via le protocole [DogStatsD][1]. `lua-resty-dogstatsd` est fourni en tant que GPLv3 et repose sur l'API cosocket Nginx.

### OpenVPN

* Envoyez des informations sur [l'utilisation de la bande passante][51] OpenVPN et le nombre de connexions actives à Datadog.
* Envoyez des [informations sur les licences][52] OpenVPN à Datadog.

### Phusion Passenger

Envoyez des métriques de santé depuis le serveur Phusion Passenger à l'aide de [passenger-datadog-monitor][53], rédigé par [Stevenson Jean-Pierre][54].

### Pid-stats

Cette [bibliothèque][55] vous permet de générer des informations sur les processus depuis des fichiers pid StatsD donnés. Elle a été créée par [GitterHQ][56].

### Saltstack

* [Formule Saltstack pour Datadog][57]
* [Saltstack Datadog][58] rédigé par [Luca Cipriani][59].

### Sensu

Utilisez ces [gestionnaires][60] Sensu pour envoyer automatiquement des métriques et des événements à Datadog.

### StackStorm

Ce [pack d'intégrations][61] StackStorm Datadog permet d'utiliser des actions dans Datadog.

### Winston

Un [transport][62] Winston/Datadog.

## Ports de la communauté pour l'Agent

### FreeBSD

[FreeBSD dd-agent port][63]

### NixOS

[dd-agent nixpkg][64]

Si vous avez rédigé une bibliothèque Datadog et que vous souhaitez l'ajouter à cette page, contactez-nous par e-mail à l'adresse [opensource@datadoghq.com][65].

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
[23]: https://docs.ansible.com/ansible/2.9/modules/list_of_monitoring_modules.html
[24]: https://github.com/ansible/ansible-modules-extras
[25]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
[26]: https://github.com/BetaProjectWave/auth0-logs-to-datadog
[27]: https://github.com/keirans/datadog-management
[28]: https://github.com/zendesk/consul2dogstats
[29]: https://github.com/cvent/dogscaler
[30]: https://github.com/Dynatrace/Dynatrace-AppMon-Datadog-Plugin
[31]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[32]: https://github.com/wimactel
[33]: https://github.com/bithauschile/datadog-ga
[34]: https://blog.bithaus.cl/2016/04/20/realtime-google-analytics-metrics-in-datadog
[35]: /fr/logs/guide/collect-heroku-logs/
[36]: https://github.com/ozinc/heroku-datadog-drain
[37]: https://web.oz.com/
[38]: https://github.com/apiaryio/heroku-datadog-drain-golang
[39]: https://apiary.io
[40]: https://github.com/evernote/jiradog
[41]: https://blog.loadimpact.com/how-to-send-k6-metrics-to-datadog
[42]: https://github.com/meetup/launch-dogly
[43]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[44]: https://github.com/brigade/logstash-output-dogstatsd
[45]: https://docs.moogsoft.com/AIOps.6.2.0/Datadog-Solution-Pak_13737047.html
[46]: /fr/developers/metrics/custom_metrics/
[47]: https://github.com/simplifi/ngx_lua_datadog
[48]: https://github.com/dailymotion/lua-resty-dogstatsd
[49]: http://www.mediba.jp
[50]: https://www.dailymotion.com/us
[51]: https://github.com/byronwolfman/dd-openvpn
[52]: https://github.com/denniswebb/datadog-openvpn
[53]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[54]: https://github.com/Sjeanpierre
[55]: https://github.com/gitterHQ/pid-stats
[56]: https://github.com/gitterHQ
[57]: https://github.com/DataDog/datadog-formula
[58]: https://gist.github.com/mastrolinux/6175280
[59]: https://gist.github.com/mastrolinux
[60]: https://github.com/sensu-plugins/sensu-plugins-datadog
[61]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[62]: https://github.com/sparkida/winston-datadog
[63]: https://github.com/urosgruber/dd-agent-FreeBSD
[64]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[65]: mailto:opensource@datadoghq.com