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

## Bibliothèques client pour la gestion des logs

Le tableau suivant répertorie les bibliothèques client de gestion de logs de Datadog et sa communauté.

{{< log-libraries-table >}}

## Bibliothèques client de la communauté Datadog

### Sauvegarde de dashboards

Grâce aux [API][3] de Datadog, vous pouvez rédiger un script pour sauvegarder les définitions de votre dashboard sous forme de code. Consultez les projets suivants pour obtenir des exemples de réalisation de ces sauvegardes :

| Langage   | Bibliothèque          | Auteur          |
|------------|------------------|-----------------|
| JavaScript | [dog-watcher][4] | [Brightcove][5] |
| Ruby       | [doggy][6]       | [Shopify][7]    |
| Ruby       | [kennel][8]      | [Zendesk][9]    |

### Gestion de monitors

Plusieurs projets de notre communauté sont consacrés à la maintenance, à la gestion ou à la sauvegarde des monitors via l'[API][3] Datadog :

| Langage  | Bibliothèque          | Auteur               |
|-----------|------------------|----------------------|
| Python    | [DogPush][10]              | [TrueAccord][11]     |
| Ruby      | [barkdog][12]              | [codenize-tools][13] |
| Ruby      | [interferon][14]           | [Airbnb][15]         |
| Ruby      | [dogwatch][16]             | [Rapid7][17]         |
| Terraform | [Terraform][18]            | [Terraform][19]      |
| Terraform | [datadog-to-terraform][20] | [Intercom][21]       |

## Intégrations de la communauté

### Ansible

En plus de l'intégration officielle Ansible, la [section relative à la surveillance][22] du référentiel [ansible-modules-extras][23] comprend des modules qui interagissent avec Datadog.

### Aptible

Enclave envoie vos métriques vers un compte Datadog. [Consultez le centre d'aide Aptible dédié pour en savoir plus][24].

### Auth0

[Cette extension][25] récupère les logs Auth0 et les transmet à Datadog.

### Gestion de l'interface de ligne de commande

Un [ensemble d'outils][26] pour sauvegarder et restaurer les dashboards et les monitors, mais également pour configurer des utilisateurs via une interface de ligne de commande.

### Consul

Publiez les totaux des services consul dans Datadog via [DogStatsD][1] grâce à [cette bibliothèque][27].

### Dogscaler

Effectuez automatiquement une mise à l'échelle croissante des groupes en fonction des résultats d'une requête Datadog avec [Dogscaler][28].

### Dynatrace

Ce [plug-in][29] envoie des mesures Dynatrace depuis un graphique vers Datadog.

### FreeSwitch

Il s'agit d'une application [ESL de FreeSwitch][30] (rédigée par [WiMacTel][31) permettant d'exporter des statistiques vers Datadog à l'aide de l'API DogStatsD.

### Google Analytics

Vous pouvez importer des données dans Datadog depuis Google Analytics via l'API Datadog avec [cette bibliothèque][32] de [Bithaus][33].

### Heroku

Heroku émet des métriques dyno par l'intermédiaire de logs. Pour convertir ces logs en métriques et les envoyer à Datadog, utilisez l'un des drains de log suivants. Pour envoyer vos logs Heroku à Datadog, consultez [la documentation dédiée][34].

* [Drain de logs Heroku pour Datadog][35] écrit en NodeJS par [Oz][36].
* [Drain de logs Heroku pour Datadog][37] écrit en Go par [Apiary][38].

### Jira

Un [outil][39] qui permet de récupérer des données à partir de Jira et de les importer en tant que métriques dans Datadog.

### K6

Cet outil de test de régression de charge et de performance a été développé par Load Impact. Il permet d'envoyer les résultats des tests à Datadog via [DogStatsD][1]. Pour activer cette fonctionnalité, consultez [le tutoriel][40] (en anglais).

### LaunchDarkly

Un gestionnaire de webhooks [LaunchDarkly][41] qui enregistre les changements sous la forme d'événements Datadog.

### Sortie Logstash

* [Sortie Logstash pour Datadog][42]
* [Sortie Logstash pour DogStatsD][43]

### Moogsoft

Un [écouteur][44] Moogsoft qui ingère des notifications Datadog.

### LUA NGINX

* Générez des [métriques custom][45] directement à partir des configurations NGINX à l'aide du module [nginx_lua_datadog][46] dans vos scripts LUA.
* [lua-resty-dogstatsd][47] est une extension développée par [mediba inc][48]. Elle permet de transmettre des métriques, des événements et des checks de service au protocole [DogStatsD][1]. lua-resty-dogstatsd est fourni en tant que GPLv3 et repose sur l'API cosocket nginx.

### OpenVPN

* Envoyez des informations OpenVPN sur [l'utilisation de la bande passante][49] et le nombre de connexions actives à Datadog.
* Envoyez des [informations sur les licences][50] OpenVPN à Datadog.

### Phusion Passenger

Envoyez des métriques de santé depuis le serveur Phusion Passenger à l'aide de [passenger-datadog-monitor][51], rédigé par [Stevenson Jean-Pierre][52].

### Pid-stats

Cette [bibliothèque][53] vous permet de générer des informations sur les processus depuis des fichiers pid donnés de StatsD. Elle a été créée par [GitterHQ][54].

### Saltstack

* [Formule Saltstack pour Datadog][55]
* [Saltstack Datadog][56] rédigé par [Luca Cipriani][57].

### Sensu

Utilisez ces [gestionnaires][58] Sensu pour envoyer automatiquement des métriques et des événements à Datadog.

### StackStorm

Ce [pack d'intégration][59] StackStorm Datadog permet d'utiliser des actions dans Datadog.

### Winston

Un [transport][60] Winston/Datadog.

## Ports de la communauté pour l'Agent

### FreeBSD

[Port dd-agent FreeBSD][61]

### NixOS

[dd-agent nixpkg][62]

Si vous avez rédigé une bibliothèque Datadog et que vous souhaitez l'ajouter à cette page, contactez-nous par e-mail à l'adresse [code@datadoghq.com][63].

[1]: /fr/developers/metrics/dogstatsd_metrics_submission/
[2]: /fr/tracing/
[3]: /fr/api/
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
[20]: https://github.com/intercom/datadog-to-terraform
[21]: https://github.com/intercom
[22]: https://docs.ansible.com/ansible/2.9/modules/list_of_monitoring_modules.html
[23]: https://github.com/ansible/ansible-modules-extras
[24]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
[25]: https://github.com/BetaProjectWave/auth0-logs-to-datadog
[26]: https://github.com/keirans/datadog-management
[27]: https://github.com/zendesk/consul2dogstats
[28]: https://github.com/cvent/dogscaler
[29]: https://github.com/Dynatrace/Dynatrace-AppMon-Datadog-Plugin
[30]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[31]: https://github.com/wimactel
[32]: https://github.com/bithauschile/datadog-ga
[33]: https://blog.bithaus.cl/2016/04/20/realtime-google-analytics-metrics-in-datadog
[34]: /fr/logs/guide/collect-heroku-logs/
[35]: https://github.com/ozinc/heroku-datadog-drain
[36]: https://web.oz.com/
[37]: https://github.com/apiaryio/heroku-datadog-drain-golang
[38]: https://apiary.io
[39]: https://github.com/evernote/jiradog
[40]: https://blog.loadimpact.com/how-to-send-k6-metrics-to-datadog
[41]: https://github.com/meetup/launch-dogly
[42]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[43]: https://github.com/brigade/logstash-output-dogstatsd
[44]: https://docs.moogsoft.com/AIOps.6.2.0/Datadog-Solution-Pak_13737047.html
[45]: /fr/developers/metrics/custom_metrics/
[46]: https://github.com/simplifi/ngx_lua_datadog
[47]: https://github.com/dailymotion/lua-resty-dogstatsd
[48]: http://www.mediba.jp
[49]: https://github.com/byronwolfman/dd-openvpn
[50]: https://github.com/denniswebb/datadog-openvpn
[51]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[52]: https://github.com/Sjeanpierre
[53]: https://github.com/gitterHQ/pid-stats
[54]: https://github.com/gitterHQ
[55]: https://github.com/DataDog/datadog-formula
[56]: https://gist.github.com/mastrolinux/6175280
[57]: https://gist.github.com/mastrolinux
[58]: https://github.com/sensu-plugins/sensu-plugins-datadog
[59]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[60]: https://github.com/sparkida/winston-datadog
[61]: https://github.com/urosgruber/dd-agent-FreeBSD
[62]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[63]: mailto:code@datadoghq.com
[64]: https://www.dailymotion.com/us