---
aliases:
- /fr/libraries/
- /fr/developers/faq/monitoring-akka/
- /fr/developers/libraries/
title: Bibliothèques
---

## Bibliothèques client pour DogstatsD et les API

Le tableau suivant répertorie les bibliothèques client pour [DogStatsD][1] et l'API de Datadog et sa communauté. Certaines bibliothèques prennent en charge l'API et DogStatsD, mais la grande majorité se concentre sur l'un ou l'autre.

{{< classic-libraries-table >}}

## Bibliothèques client pour l'APM et le profileur en continu

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

### Gestion de l'interface de ligne de commande

Un [ensemble d'outils][27] pour sauvegarder et restaurer les dashboards et les monitors, mais également pour configurer des utilisateurs via une interface de ligne de commande.

### Consul

Publiez des counts de service Consul dans Datadog via [DogStatsD][1] grâce à la [bibliothèque Consul][28].

### Dogscaler

Effectuez automatiquement une mise à l'échelle croissante des groupes en fonction des résultats d'une requête Datadog avec [Dogscaler][29].

### FreeSwitch

Il s'agit d'une application [ESL de FreeSwitch][30] (rédigée par [WiMacTel][31) permettant d'exporter des statistiques vers Datadog à l'aide de l'API DogStatsD.

### Heroku

Heroku émet des métriques dyno par l'intermédiaire de logs. Pour convertir ces logs en métriques et les envoyer à Datadog, utilisez l'un des drains de log suivants. Pour envoyer vos logs Heroku à Datadog, consultez la section [Recueillir des logs Heroku][34].

* [Drain de logs Heroku pour Datadog][35] écrit en NodeJS par [Oz][36].
* [Drain de logs Heroku pour Datadog][37] écrit en Go par [Apiary][38].

Pour utiliser le profileur ou traceur PHP dans Heroku, servez-vous du buildpack suivant.

* [Buildpack pour le profileur et traceur PHP Datadog Heroku][65] maintenu par [SpeedCurve][66]

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
* [lua-resty-dogstatsd][47] est une extension développée par [mediba inc][48] (et forkée par [Dailymotion][49]). Elle permet de générer des métriques, des événements et des checks de service via le protocole [DogStatsD][1]. `lua-resty-dogstatsd` est fourni en tant que GPLv3 et repose sur l'API cosocket Nginx.

### OpenVPN

* Envoyez des informations sur [l'utilisation de la bande passante][50] OpenVPN et le nombre de connexions actives à Datadog.
* Envoyez des [informations sur les licences][51] OpenVPN à Datadog.

### Phusion Passenger

Envoyez des métriques de santé depuis le serveur Phusion Passenger à l'aide de [passenger-datadog-monitor][52], rédigé par [Stevenson Jean-Pierre][53].

### Pid-stats

Cette [bibliothèque][54] vous permet de générer des informations sur les processus depuis des fichiers pid StatsD donnés. Elle a été créée par [GitterHQ][55].

### Pulumi
Le [fournisseur de ressources][67] Datadog pour Pulumi vous permet de configurer des ressources Datadog.

### SaltStack

* [Formule SaltStack pour Datadog][56]
* [SaltStack Datadog][57] rédigé par [Luca Cipriani][58]

### Sensu

Utilisez ces [gestionnaires][59] Sensu pour envoyer automatiquement des métriques et des événements à Datadog.

### StackStorm

Ce [pack d'intégrations][60] StackStorm Datadog permet d'utiliser des actions dans Datadog.

### Winston

Un [transport][61] Winston/Datadog

## Ports de la communauté pour l'Agent

### FreeBSD

[Port dd-agent FreeBSD][62]

### NixOS

[dd-agent nixpkg][63]

Si vous avez rédigé une bibliothèque Datadog et que vous souhaitez l'ajouter à cette page, contactez-nous par e-mail à l'adresse [opensource@datadoghq.com][65].

[1]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
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
[27]: https://github.com/keirans/datadog-management
[28]: https://github.com/zendesk/consul2dogstats
[29]: https://github.com/cvent/dogscaler
[30]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[31]: https://github.com/wimactel
[34]: /fr/logs/guide/collect-heroku-logs/
[35]: https://github.com/ozinc/heroku-datadog-drain
[36]: https://oz.com/
[37]: https://github.com/apiaryio/heroku-datadog-drain-golang
[38]: https://apiary.io
[39]: https://bitbucket.org/atlassian/jiradog/src/master/
[40]: https://blog.loadimpact.com/how-to-send-k6-metrics-to-datadog
[41]: https://github.com/meetup/launch-dogly
[42]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[43]: https://github.com/brigade/logstash-output-dogstatsd
[44]: https://docs.moogsoft.com/AIOps.6.2.0/Datadog-Solution-Pak_13737047.html
[45]: /fr/metrics/custom_metrics/
[46]: https://github.com/simplifi/ngx_lua_datadog
[47]: https://github.com/dailymotion/lua-resty-dogstatsd
[48]: http://www.mediba.jp
[49]: https://www.dailymotion.com/us
[50]: https://github.com/byronwolfman/dd-openvpn
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