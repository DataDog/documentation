---
title: Bibliothèques
kind: documentation
aliases:
  - /fr/libraries/
  - /fr/developers/faq/monitoring-akka/
disable_toc: true
---
## Bibliothèques de client pour l'API et DogStatsD

Le tableau suivant répertorie les bibliothèques de client pour [DogStatsD][1] et l'API officielles et entretenues par la communauté. Certaines bibliothèques prennent en charge l'API et DogStatsD, mais la grande majorité se concentre sur l'un ou l'autre.

{{< classic-libraries-table >}}

## Bibliothèques de client pour le tracing distribué et l'APM

Le tableau suivant répertorie les bibliothèques de client pour les [traces][2] officielles et entretenues par la communauté.

{{< tracing-libraries-table >}}

## Bibliothèques de client du Log Management

Le tableau suivant répertorie les bibliothèques de client du Log Management officielles et entretenues par la communauté.

{{< log-libraries-table >}}

## Bibliothèques de client de la communauté Datadog

### Sauvegarde des dashboards

Grâce aux [API][3] de Datadog, vous pouvez rédiger un script pour sauvegarder les définitions de votre dashboard sous forme de code. Consultez les projets suivants pour obtenir des exemples de réalisation de ces sauvegardes :

| Langage   | Bibliothèque          | Auteur          |
| ---        | ---              | ---             |
| JavaScript | [dog-watcher][4] | [Brightcove][5] |
| Ruby       | [doggy][6]       | [Shopify][7]    |
| Ruby       | [kennel][8]      | [Zendesk][9]    |


### Gestion des monitors

Plusieurs projets de notre communauté sont consacrés à la maintenance, à la gestion ou à la sauvegarde des monitors via l'[API][3] Datadog :

| Langage  | Bibliothèque          | Auteur               |
| ---       | ---              | ---                  |
| Python    | [DogPush][10]    | [TrueAccord][11]     |
| Ruby      | [barkdog][12]    | [codenize-tools][13] |
| Ruby      | [interferon][14] | [Airbnb][15]         |
| Ruby      | [dogwatch][16]   | [Rapid7][17]         |
| Terraform | [Terraform][18]  | [Terraform][19]      |

## Intégrations de la communauté

### Ansible
En plus de l'intégration officielle Ansible, la [section de surveillance][20] du référentiel [ansible-modules-extras][21] comprend des modules qui interagissent avec Datadog.

### Aptible
Enclave envoie vos métriques vers un compte Datadog. [Consultez le centre d'aide Aptible dédié pour en savoir plus][22].

### Auth0
[Cette extension][23] récupère les logs Auth0 et les transmet à Datadog.

### Gestion de l'interface de ligne de commande
Un [ensemble d'outils][24] pour sauvegarder et restaurer les dashboards et les monitors, mais également pour configurer des utilisateurs via une interface de ligne de commande.

### Consul
Publiez les totaux de service consul dans Datadog via [DogStatsD][1] grâce à [cette bibliothèque][25].

### Dogscaler
Effectuez automatiquement une mise à l'échelle croissante des groupes en fonction des résultats de la requête Datadog avec [Dogscaler][26].

### Dynatrace
Ce [plug-in][27] envoie des mesures Dynatrace depuis un graphique vers Datadog.

### FreeSwitch
Il s'agit d'une application [ESL de FreeSwitch][28] afin d'exporter les statistiques vers Datadog à l'aide de l'API DogStatsD (rédigée par [WiMacTel][29]).

### Google Analytics
Vous pouvez importer des données dans Datadog depuis Google Analytics via l'API Datadog avec [cette bibliothèque][30] de [Bithaus][31].

### Heroku
Heroku émet des métriques dyno par l'intermédiaire de logs. Pour convertir ces logs en métriques et les envoyer à Datadog, utilisez l'un des drains de log suivants. Pour envoyer vos logs Heroku à Datadog, consultez [la documentation dédiée][32].

  * [Drain de logs Heroku pour Datadog][33] écrit en NodeJS par [Oz][34].
  * [Drain de logs Heroku pour Datadog][35] écrit en Go par [Apiary][36].


### Jira
Un [outil][37] qui permet de récupérer des données à partir de Jira et de les importer en tant que métriques dans Datadog.

### K6

K6, un outil de test de régression de charge et de performance développé par Load Impact, peut envoyer des résultats de test à Datadog à l'aide de [DogStatsD][1]. Pour activer cette fonctionnalité, consultez [le tutoriel][38].

### LaunchDarkly
Un gestionnaire de webhooks [LaunchDarkly][39] qui enregistre les changements sous la forme d'événements Datadog.

### Sortie Logstash
  * [Sortie Logstash pour Datadog][40]
  * [Sortie Logstash pour DogStatsD][41]

### Moogsoft
Un [écouteur][42] Moogsoft qui ingère les notifications Datadog.

### LUA NGINX
  * Envoyez des [métriques custom][43] directement à partir des configurations NGINX à l'aide du module [nginx_lua_datadog][44] dans vos scripts LUA.
  * [lua-resty-dogstatsd][45] est une extension développée [mediba inc][46]. Elle permet de transmettre des métriques, des événements et des checks de service au protocole [DogStatsD][1]. lua-resty-dogstatsd est fourni en tant que GPLv3 et repose sur l'API cosocket nginx.

### OpenVPN
  * Envoyez des informations sur [l'utilisation de la bande passante][47] OpenVPN et le nombre de connexions actives à Datadog.
  * Envoyez des [informations de licence][48] OpenVPN à Datadog.

### Phusion Passenger
Envoyez des métriques de santé depuis le serveur Passenger de Phusion à l'aide de [passenger-datadog-monitor][49] rédigé par [Stevenson Jean-Pierre][50].

### Pid-stats
Cette [bibliothèque][51] vous permet de générer des informations sur les processus depuis des fichiers pid donnés de StatsD. Elle a été créée par [GitterHQ][52].

### Saltstack
  * [Formules Saltstack pour Datadog][53]
  * [Datadog Saltstack][54] rédigé par [Luca Cipriani][55].

### Sensu
Utilisez ces [gestionnaires][56] Sensu pour envoyer automatiquement des métriques et des événements à Datadog.

### StackStorm

Ce [pack d'intégration][57] StackStorm Datadog fournit une intégration d'action pour Datadog.

### Winston
Un [transport][58] Winston-Datadog.

## Ports de la communauté pour l'Agent

### FreeBSD
  * [Port dd-agent FreeBSD][59]

### NixOS
  * [dd-agent nixpkg][60]

Si vous rédigez une bibliothèque Datadog et que vous souhaitez l'ajouter à cette page, envoyez un e-mail à [code@datadoghq.com][61].

[1]: /fr/developers/dogstatsd
[2]: /fr/tracing
[3]: /fr/api
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
[20]: https://docs.ansible.com/ansible/list_of_monitoring_modules.html
[21]: https://github.com/ansible/ansible-modules-extras
[22]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
[23]: https://github.com/BetaProjectWave/auth0-logs-to-datadog
[24]: https://github.com/keirans/datadog-management
[25]: https://github.com/zendesk/consul2dogstats
[26]: https://github.com/cvent/dogscaler
[27]: https://github.com/Dynatrace/Dynatrace-AppMon-Datadog-Plugin
[28]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[29]: https://github.com/wimactel
[30]: https://github.com/bithauschile/datadog-ga
[31]: https://blog.bithaus.cl/2016/04/20/realtime-google-analytics-metrics-in-datadog
[32]: /fr/logs/guide/collect-heroku-logs
[33]: https://github.com/ozinc/heroku-datadog-drain
[34]: https://corp.oz.com
[35]: https://github.com/apiaryio/heroku-datadog-drain-golang
[36]: https://apiary.io
[37]: https://github.com/evernote/jiradog
[38]: https://blog.loadimpact.com/how-to-send-k6-metrics-to-datadog
[39]: https://github.com/meetup/launch-dogly
[40]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[41]: https://github.com/brigade/logstash-output-dogstatsd
[42]: https://docs.moogsoft.com/display/060102/Datadog+Solution+Pak
[43]: /fr/developers/metrics/custom_metrics
[44]: https://github.com/simplifi/ngx_lua_datadog
[45]: https://github.com/mediba-system/lua-resty-dogstatsd
[46]: http://www.mediba.jp
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
[61]: mailto:code@datadoghq.com