---
aliases:
- /fr/agent/security/
description: Mesures de sécurité de l'Agent Datadog
further_reading:
- link: /data_security/
  tag: Documentation
  text: Consulter les principales catégories de données envoyées à Datadog
title: Sécurité des données de l'Agent
---

<div class="alert alert-info">Cette page est consacrée à la sécurité des données transmises à Datadog. Si vous cherchez des fonctionnalités et solutions relatives à la sécurité des applications et du cloud, consultez la section <a href="/security/" target="_blank">Sécurité</a>.</div>

Vous pouvez envoyer des données au service de Datadog à l'aide d'un [Agent][1] installé localement ou via notre [API HTTP][2]. Bien qu'il ne soit pas obligatoire d'utiliser l'Agent Datadog, la grande majorité des utilisateurs Datadog en tire profit. Cet article décrit les principales fonctionnalités en matière de sécurité proposées afin de garantir la sécurité de votre environnement.

## Distribution de l'Agent

Les référentiels et packages binaires officiels de l'Agent sont signés. Vérifiez la chaîne de distribution en comparant la signature à l'une des clés publiques suivantes :

- Packages DEB Linux et métadonnées du référentiel :
  - [D18886567EABAD8B2D2526900D826EB906462314][18]
  - [5F1E256061D813B125E156E8E6266D4AC0962C7D][15]
  - [D75CEA17048B9ACBF186794B32637D44F14F620E][4]
  - [A2923DFF56EDA6E76E55E492D3A80E30382E94DE][3]
- Packages RPM Linux et métadonnées du référentiel :
  - [2416A37757B1BB0268B3634B52AFC5994F09D16B][17]
  - [7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3][16]
  - [C6559B690CA882F023BDF3F63F4D1729FD4BF915][5]
  - [A4C0B90D7443CF6E4E8AA341F1068E14E09422B3][6]
- PKG macOS :
  - Empreinte digitale du certificat Apple `FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA`

Sous Debian et Ubuntu, le package `datadog-agent` présente une dépendance souple au package `datadog-signing-keys`. Ainsi, APT fait confiance aux clés ci-dessus. Maintenez ce package à jour pour vous assurer que les dernières clés de signature sont présentes sur votre système.

### MSI Windows

Pour valider la signature d'un fichier d'installation de l'Agent Datadog sous Windows, redirigez la sortie de `Get-AuthenticodeSignature` via `FormatList` (`fl`) et vérifiez que :
- le statut est valide ;
- le certificat est signé par `Datadog, Inc` ;
- l'émetteur est `DigiCert`.

Par exemple, pour vérifier un fichier .msi `ddagent-cli-7.49.1.msi`, utilisez la commande suivante :
{{< code-block lang="powershell" >}}
Get-AuthenticodeSignature ddagent-cli-7.49.1.msi | fl
{{< /code-block >}}

Si la commande génère la sortie `A certificate chain could not be built to a trusted root authority`, vous devez peut-être mettre à jour l'autorité de certification racine DigiCert de la machine.

## Sécurité des données

Par défaut, l'Agent Datadog transmet les données à Datadog via une connexion TCP avec chiffrement TLS. Depuis la version 6, vous pouvez configurer l'Agent afin d'imposer une version TLS minimale lors de la connexion à Datadog. Si vous avez besoin d'appliquer des critères de cryptographie renforcés, par exemple pour répondre aux exigences de la norme PCI, vous devez utiliser l'Agent v6 ou v7 et définir le paramètre `min_tls_version: 'tlsv1.2'`, ou `force_tls_12: true` pour une version de l'Agent antérieure à la v6.39.0 ou v7.39.0, dans le fichier de configuration de l'Agent.

## Mise en réseau et proxy

Datadog est un produit SaaS : vous devez donc établir une connexion sortante depuis votre réseau vers l'Internet public pour envoyer vos données de surveillance. Par défaut, le trafic est toujours initié par l'Agent vers Datadog via une connexion TCP avec chiffrement TLS. Les sessions ne sont jamais initiées par Datadog vers l'Agent. Consultez la page relative au [trafic réseau][7] de l'Agent pour obtenir plus d'informations sur la configuration des pare-feu afin d'autoriser les domaines et ports Datadog requis. En outre, si vous souhaitez surveiller des hosts sans connexion directe à l'Internet public ou avec un trafic sortant limité, songez à envoyer les données de surveillance via un [proxy][8].

## Obfuscation des logs de l'Agent

L'Agent Datadog génère des logs locaux afin de faciliter [son dépannage][9], si nécessaire. Par mesure de sécurité, ces logs locaux sont filtrés afin que certains mots-clés et patterns évitent de contenir des informations d'identification (par exemple., une clé d'API, un mot de passe ou encore les mots-clés de tokens). Ils sont ainsi obfusqués avant d'être écrits sur le disque.

## Serveur HTTPS local

L'Agent v6 et v7 expose une API HTTPS locale pour faciliter les communications entre un Agent en cours d'exécution et ses outils (par exemple, les commandes `datadog-agent`). Le serveur d'API n'est accessible qu'à partir de l'interface de réseau local (`localhost/127.0.0.1`), et l'authentification nécessite un token qui est seulement lisible par l'utilisateur avec lequel l'Agent s'exécute. Les communications vers l'API HTTPS sont chiffrées pendant l'envoi afin d'éviter les écoutes clandestines sur `localhost`.

## Interface graphique de l'Agent

L'Agent v6 et v7 est fourni avec une interface graphique par défaut, qui se lance dans votre navigateur Web configuré par défaut. L'interface graphique n'apparaît que si l'utilisateur qui l'exécute dispose des bonnes autorisations utilisateur. Il doit notamment pouvoir ouvrir le fichier de configuration de l'Agent. L'interface graphique n'est accessible qu'à partir de l'interface de réseau local (`localhost/127.0.0.1`). Enfin, les cookies de l'utilisateur doivent être activés, car l'interface graphique génère et enregistre un token utilisé pour l'authentification de toutes les communications avec le serveur de l'interface graphique, ainsi que pour la protection contre la falsification de requête intersites. L'interface graphique peut également être désactivée, si besoin.

## Analyses de la sécurité de l'Agent

Le programme de gestion de la vulnérabilité de Datadog comprend des évaluations régulières des composants de l'application et de l'infrastructure sous-jacente, et notamment des analyses actives des principaux services de soutien. Les équipes de sécurité Datadog effectuent des analyses régulières pour identifier les vulnérabilités de logiciel et de configuration et surveiller les mesures de correction qui en découlent, conformément à la politique de gestion de la vulnérabilité de Datadog.

Concernant son Agent de conteneur en particulier, Datadog effectue des analyses statiques régulières des vulnérabilités sur ses versions en disponibilité générale (GA) et en release candidate (RC). L'Agent de conteneur Datadog est disponible dans des référentiels publics comme indiqué dans [Agent Docker][10] ; de plus, le code source de l'Agent Datadog est open source. Cela permet aux clients d'effectuer des analyses de vulnérabilités avec leurs outils préférés selon une cadence adaptée à leurs besoins. Cela fournit la visibilité nécessaire aux clients souhaitant surveiller l'Agent Datadog pour détecter d'éventuelles vulnérabilités.

Si vous pensez avoir découvert un bug dans la sécurité de Datadog, consultez la section [Signaler un problème][11]. 
Pour vérifier le statut d'une CVE spécifique, consultez la [page Public Artifact Vulnerabilities][19]. Pour obtenir des informations complémentaires, contactez l'[assistance Datadog][12] via votre processus d'assistance standard. Lorsque vous soumettez un ticket d'assistance via le site web Datadog, définissez le champ `Product type` sur `Vulnerability Inquiry on Datadog Product`.

## Exécution en tant qu'utilisateur sans privilèges

Par défaut, l'Agent s'exécute en tant qu'utilisateur `dd-agent` sous Linux et en tant que compte `ddagentuser` sous [Windows][16], sauf pour les exceptions suivantes :

- Le `system-probe` s'exécute en tant que `root` sous Linux et en tant que `LOCAL_SYSTEM` sous Windows.
- Le `process-agent` s'exécute en tant que `LOCAL_SYSTEM` sous Windows.
- Le `security-agent` s'exécute en tant que `root` sous Linux.

## Gestion des secrets

Si vous n'êtes pas en mesure de stocker des secrets en texte brut dans les fichiers de configuration de l'Agent, vous pouvez vous servir du package de [gestion des secrets][14]. Il permet à l'Agent d'appeler un exécutable fourni par l'utilisateur pour gérer la récupération ou le déchiffrement des secrets, qui sont ensuite chargés en mémoire par l'Agent. Vous pouvez concevoir votre exécutable en fonction du service de gestion de clés, de la méthode d'authentification et du workflow d'intégration continu de votre choix.

Pour en savoir plus, consultez la documentation relative à la [gestion des secrets][14].

## Collecte de données de télémétrie

{{< site-region region="gov" >}}

L'Agent sur les sites non gouvernementaux collecte des informations environnementales, de performance et d'utilisation des fonctionnalités concernant l'Agent Datadog. Lorsque l'Agent détecte un site gouvernemental ou que le [proxy FIPS de l'Agent Datadog][1] est utilisé, l'Agent désactive automatiquement cette collecte de données de télémétrie. Lorsque cette détection est impossible (par exemple, si un proxy est utilisé), les données de télémétrie de l'Agent sont émises, mais immédiatement abandonnées au niveau de l'intake de Datadog.

Pour éviter que ces données ne soient émises en premier lieu, Datadog recommande de désactiver explicitement les données de télémétrie de l'Agent en mettant à jour le paramètre `agent_telemetry` dans le fichier de configuration de l'Agent, comme illustré dans l'exemple ci-dessous.

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
agent_telemetry:
  enabled: false
```
{{% /tab %}}
{{% tab "Environment variables" %}}

```bash
DD_AGENT_TELEMETRY_ENABLED=false
```
{{% /tab %}}
{{< /tabs >}}
[1]: https://docs.datadoghq.com/fr/agent/configuration/fips-compliance?tab=hostorvm&site=gov
{{< /site-region >}}
{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Datadog peut collecter des informations environnementales, de performance et d'utilisation des fonctionnalités concernant l'Agent Datadog. Cela peut inclure des logs de diagnostic et des rapports de plantage de l'Agent Datadog avec des stack traces obscurcies pour prendre en charge et améliorer l'Agent Datadog.

Vous pouvez désactiver cette collecte de données de télémétrie en mettant à jour le paramètre `agent_telemetry` dans le fichier de configuration de l'Agent, comme illustré dans l'exemple ci-dessous.
{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
agent_telemetry:
  enabled: false
```
{{% /tab %}}
{{% tab "Environment variables" %}}

```bash
DD_AGENT_TELEMETRY_ENABLED=false
```
{{% /tab %}}
{{< /tabs >}}

**Contenu des données de télémétrie :**

Pour afficher le contenu des données de télémétrie le plus récent, exécutez la commande suivante :
```bash
agent diagnose show-metadata agent-telemetry
```

| Métadonnées ([source][1]) |
| ---------------------- |
| ID de la machine              |
| Nom de la machine           |
| Système d'exploitation                     |
| Version du système d'exploitation             |
| Version de l'Agent          |

| Métriques ([source][2])                       | Rôle                                                                                                            |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Checks**                                  |                                                                                                                        |
| checks.execution_time                       | Temps d'exécution du check en millisecondes                                                                                 |
| pymem.inuse                                 | Nombre d'octets alloués par l'interpréteur Python                                                                    |
| **Logs et métriques**                        |                                                                                                                        |
| dogstatsd.udp_packets_bytes                 | Octets des paquets UDP DogStatsD                                                                                            |
| dogstatsd.uds_packets_bytes                 | Octets des paquets UDS DogStatsD                                                                                            |
| logs.auto_multi_line_aggregator_flush       | Nombre de logs multilignes agrégés par l'Agent                                                                       |
| logs.bytes_missed                           | Nombre total d'octets perdus avant de pouvoir être consommés par l'Agent, par exemple après une rotation de log                 |
| logs.bytes_sent                             | Nombre total d'octets envoyés avant encodage, le cas échéant                                                              |
| logs.decoded                                | Nombre total de logs décodés                                                                                           |
| logs.dropped                                | Nombre total de logs supprimés                                                                                           |
| logs.encoded_bytes_sent                     | Nombre total d'octets envoyés après encodage, le cas échéant                                                               |
| logs.sender_latency                         | Latence de l'expéditeur HTTP en millisecondes                                                                                    |
| logs.truncated                              | Nombre total de logs tronqués par l'Agent                                                                            |
| point.dropped                               | Nombre total de métriques supprimées                                                                                        |
| point.sent                                  | Nombre total de métriques envoyées                                                                                           |
| transactions.input_count                    | Nombre de transactions entrantes                                                                                             |
| transactions.requeued                       | Nombre de remises en file d'attente de transactions                                                                                              |
| transactions.retries                        | Nombre de nouvelles tentatives de transactions                                                                                                |
| **Base de données**                                |                                                                                                                        |
| oracle.activity_samples_count               | Nombre de lignes récupérées lors de la mesure de l'activité des requêtes (nombre d'échantillons d'activité collectés)                              |
| oracle.activity_latency                     | Temps de récupération de l'activité des requêtes en millisecondes                                                                        |
| oracle.statement_metrics                    | Temps de récupération des métriques de base de données en millisecondes                                                                      |
| oracle.statement_plan_errors                | Nombre d'erreurs lors de la récupération des plans d'exécution                                                                         |
| postgres.collect_activity_snapshot_ms       | Temps d'obtention d'un instantané d'activité en millisecondes                                                                          |
| postgres.collect_relations_autodiscovery_ms | Temps de collecte des relations de découverte automatique en millisecondes                                                               |
| postgres.collect_statement_samples_ms       | Temps d'obtention des échantillons d'instructions en millisecondes                                                                          |
| postgres.collect_statement_samples_count    | Nombre total de lignes récupérées pour collecter les échantillons d'instructions                                                                        |
| postgres.collect_stat_autodiscovery_ms      | Temps de collecte des statistiques de découverte automatique en millisecondes                                                                    |
| postgres.get_new_pg_stat_activity_ms        | Temps d'obtention de `pg_stat_activity` en millisecondes                                                                         |
| postgres.get_new_pg_stat_activity_count     | Nombre total de lignes récupérées pour collecter `pg_stat_activity`                                                                       |
| postgres.get_active_connections_ms          | Temps d'obtention des connexions actives en millisecondes                                                                         |
| postgres.get_active_connections_count       | Nombre total de lignes récupérées pour obtenir les connexions actives                                                                           |
| postgres.schema_tables_elapsed_ms           | Temps de collecte des tables dans le schéma Postgres                                                                              |
| postgres.schema_tables_count                | Nombre total de tables dans le schéma Postgres                                                                                        |
| **API**                                     |                                                                                                                        |
| api_server.request_duration_seconds         | Performances d'exécution des commandes CLI (si exécutées)                                                                       |
| **Événements**                                  |                                                                                                                        |
| agent_bsod                                  | Données d'écran bleu de la mort (BSOD) liées à l'Agent, incluant le code BugCheck, quatre arguments associés et la pile d'appels de plantage non symbolisée |
| **Découverte de services**                       |                                                                                                                        |
| service_discovery.discovered_services       | Nombre de services détectés par la fonctionnalité de découverte de services de l'Agent                                                   |
| **Surveillance GPU**                          |                                                                                                                        |
| gpu.device_total                            | Nombre total de GPU dans le système                                                                                     |
| **APM**                                     |                                                                                                                        |
| trace.enabled                               | Indique si le processus trace-agent est en cours d'exécution                                                                            |
| trace.working                               | Indique si le processus trace-agent reçoit et envoie des traces                                                       |

Seules les métriques applicables sont émises. Par exemple, si DBM n'est pas activé, aucune des métriques liées aux bases de données n'est émise.


[1]: https://github.com/DataDog/datadog-agent/blob/4dc6ed6eb069bdea7e93f2d267ac5086a98c968c/comp/core/agenttelemetry/impl/sender.go#L218-L221
[2]: https://github.com/DataDog/datadog-agent/blob/4dc6ed6eb069bdea7e93f2d267ac5086a98c968c/comp/core/agenttelemetry/impl/config.go#L156

{{< /site-region >}}

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/api/
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[7]: /fr/agent/faq/network/
[8]: /fr/agent/configuration/proxy/
[9]: /fr/agent/troubleshooting/
[10]: /fr/containers/docker/?tab=standard
[11]: https://www.datadoghq.com/security/?tab=contact
[12]: https://www.datadoghq.com/support/
[13]: /fr/agent/faq/windows-agent-ddagent-user/
[14]: /fr/agent/configuration/secrets-management/
[15]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[16]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
[17]: https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
[18]: https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public
[19]: /data_security/guide/public_artifact_vulnerabilities/
