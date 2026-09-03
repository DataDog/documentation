---
aliases:
- /fr/agent/security/
description: Mesures de sécurité du Datadog Agent
further_reading:
- link: /data_security/
  tag: Documentation
  text: Consulter les principales catégories de données envoyées à Datadog
title: Sécurité des données de l'Agent
---
<div class="alert alert-info">Cette page concerne la sécurité des données envoyées à Datadog. Si vous recherchez des produits et fonctionnalités de sécurité cloud et applicative, consultez la section <a href="/security/" target="_blank">Sécurité</a>.</div>

Vous pouvez envoyer des données au service Datadog en utilisant un [Agent][1] installé localement ou via notre [HTTP API][2]. Bien que l'utilisation de Datadog ne nécessite pas strictement l'utilisation du Datadog Agent, la grande majorité des clients utilisent l'Agent. Cet article décrit les principales capacités et fonctionnalités de sécurité disponibles pour garantir la sécurité de votre environnement.

## Distribution de l'Agent {#agent-distribution}

Les dépôts officiels et les paquets binaires de l'Agent sont signés. Vérifiez le canal de distribution en comparant la signature avec l'une des clés publiques suivantes :

- Paquets DEB Linux et métadonnées de dépôt :
  - [D18886567EABAD8B2D2526900D826EB906462314][18]
  - [5F1E256061D813B125E156E8E6266D4AC0962C7D][15]
  - [D75CEA17048B9ACBF186794B32637D44F14F620E][4]
  - [A2923DFF56EDA6E76E55E492D3A80E30382E94DE][3]
- Paquets RPM Linux et métadonnées de dépôt :
  - [2416A37757B1BB0268B3634B52AFC5994F09D16B][17]
  - [7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3][16]
  - [C6559B690CA882F023BDF3F63F4D1729FD4BF915][5]
  - [A4C0B90D7443CF6E4E8AA341F1068E14E09422B3][6]
- PKG MacOS :
  - Empreinte du certificat Apple `FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA`

Sur Debian et Ubuntu, le paquet `datadog-agent` a une dépendance logicielle sur le paquet `datadog-signing-keys`, ce qui rend les clés ci-dessus approuvées par APT. Maintenir le paquet à jour garantit que les dernières clés de signature sont présentes sur votre système.

### Windows MSI {#windows-msi}

Pour vérifier la signature d'un fichier d'installation du Datadog Agent sur Windows, redirigez la sortie de `Get-AuthenticodeSignature` via `FormatList` (`fl`) et assurez-vous que :
- le statut est valide
- le certificat est signé par `Datadog, Inc`
- l'émetteur est `DigiCert`

Par exemple, pour vérifier un fichier .msi nommé `ddagent-cli-7.49.1.msi` :
{{< code-block lang="powershell" >}}
Get-AuthenticodeSignature ddagent-cli-7.49.1.msi | fl
{{< /code-block >}}

Si la sortie de la commande est `A certificate chain could not be built to a trusted root authority`, la machine peut avoir besoin d'une mise à jour de l'autorité de certification racine DigiCert.

## Sécurité de l'information {#information-security}

Le Datadog Agent soumet des données à Datadog via une connexion TCP chiffrée TLS par défaut. À partir de la version 6, l'Agent peut être configuré pour imposer une version TLS minimale lors de la connexion à Datadog. Si vous avez besoin d'utiliser une cryptographie forte, par exemple pour répondre aux exigences PCI, vous devez utiliser l'Agent v6/7 et définir le paramètre `min_tls_version: 'tlsv1.2'`, ou `force_tls_12: true` pour l'Agent < 6.39.0/7.39.0, dans le fichier de configuration de l'Agent.

## Réseautage et proxy {#networking-and-proxying}

Datadog est un produit SaaS : vous devez établir une connexion sortante depuis votre réseau vers l'internet public afin de soumettre des données de surveillance. Le trafic est toujours initié par l'Agent vers Datadog via une connexion TCP chiffrée TLS par défaut. Aucune session n'est initiée de Datadog vers l'Agent. Consultez la page [Réseau][7] de l'Agent pour plus d'informations sur la configuration des pare-feu afin d'ajouter aux listes d'autorisation les domaines et ports requis par Datadog. De plus, si vous souhaitez surveiller des hosts sans connexion directe à l'internet public, ou avec un trafic sortant restreint, envisagez de soumettre les données de surveillance depuis un [proxy][8].

## Obfuscation des journaux de l'Agent {#agent-logs-obfuscation}

Le Datadog Agent génère des journaux locaux pour faciliter le [dépannage de l'Agent][9]. Par mesure de sécurité, ces journaux locaux sont filtrés pour certains mots-clés et modèles spécifiques qui pourraient indiquer une information d'identification potentielle (par exemple, les mots-clés de clé d'API, de mot de passe et de jeton), qui sont ensuite obfusqués avant d'être écrits sur le disque.

## Serveur HTTPS local {#local-https-server}

L'Agent v6/7 expose une API HTTPS locale pour faciliter la communication entre un Agent en cours d'exécution et les outils de l'Agent (par exemple, les commandes `datadog-agent`). Le serveur d'API n'est accessible que depuis l'interface réseau locale (`localhost/127.0.0.1`), et l'authentification est appliquée via un jeton qui n'est lisible que par l'utilisateur sous lequel l'Agent s'exécute. La communication avec l'API HTTPS locale est chiffrée en transit pour protéger contre l'écoute clandestine sur `localhost`.

## Interface graphique de l'Agent {#agent-gui}

L'Agent v6/7 est fourni par défaut avec une interface utilisateur graphique (GUI), qui se lance dans votre navigateur web par défaut. L'interface graphique n'est lancée que si l'utilisateur qui la lance dispose des autorisations utilisateur appropriées, y compris la possibilité d'ouvrir le fichier de configuration de l'Agent. L'interface graphique n'est accessible que depuis l'interface réseau locale (`localhost/127.0.0.1`). Enfin, les cookies de l'utilisateur doivent être activés, car l'interface graphique génère et enregistre un jeton utilisé pour authentifier toutes les communications avec le serveur de l'interface graphique ainsi que pour se protéger contre les attaques de falsification de requête intersite (CSRF). L'interface graphique peut également être désactivée si nécessaire.

## Analyses de sécurité de l'Agent {#agent-security-scans}

Le programme Vulnerability Management de Datadog inclut des évaluations régulières de l'infrastructure de support et des composants d'application, y compris des analyses actives des services de support principaux. Les équipes Datadog Security effectuent des analyses régulières pour identifier les vulnérabilités de configuration et de logiciel, et suivent la remédiation des résultats conformément à la politique Vulnerability Management de Datadog.

Concernant spécifiquement son Agent de conteneur, Datadog effectue régulièrement une analyse statique des vulnérabilités sur ses versions en disponibilité générale (GA) et ses versions candidates (RC). L'Agent de conteneur Datadog peut être trouvé dans des registres publics comme mentionné dans [Docker Agent][10], et de plus, le code source du Datadog Agent est open source. Cela permet aux clients d'effectuer des analyses de vulnérabilité avec leurs outils préférés selon une cadence qui répond à leurs besoins spécifiques. Cela fournit la visibilité requise aux clients souhaitant surveiller le Datadog Agent pour détecter d'éventuelles vulnérabilités.

Si vous pensez avoir découvert une faille dans la sécurité de Datadog, consultez [Signaler un problème][11]. 
Pour vérifier le statut d'une CVE spécifique, consultez la [page des vulnérabilités des artefacts publics][19]. Pour plus d'informations, contactez le [support Datadog][12] via votre processus de support standard. Lorsque vous soumettez un ticket de support via le site Web de Datadog, définissez le champ {{< ui >}}Product type{{< /ui >}} sur {{< ui >}}Vulnerability Inquiry on Datadog Product{{< /ui >}}.

## Exécution en tant qu'utilisateur non privilégié {#running-as-an-unprivileged-user}

Par défaut, l'Agent s'exécute en tant qu'utilisateur `dd-agent` sur Linux et en tant que compte `ddagentuser` sur [Windows][13]. Les exceptions sont les suivantes :

- Le `system-probe` s'exécute en tant que `root` sur Linux et en tant que `LOCAL_SYSTEM` sur Windows.
- Le `process-agent` s'exécute en tant que `LOCAL_SYSTEM` sur Windows.
- Le `security-agent` s'exécute en tant que `root` sur Linux.

## Gestion des secrets {#secrets-management}

Si vous avez besoin d'éviter de stocker des secrets en texte clair dans les fichiers de configuration de l'Agent, vous pouvez tirer parti du package de [gestion des secrets][14]. Ce package permet à l'Agent d'appeler un exécutable fourni par l'utilisateur pour gérer la récupération ou le déchiffrement des secrets, qui sont ensuite chargés en mémoire par l'Agent. Vous pouvez concevoir votre exécutable en fonction de votre service de gestion de clés, de votre méthode d'authentification et de votre workflow d'intégration continue préférés.

Pour en savoir plus, consultez la documentation sur la [Gestion des secrets][14].

## Collecte de télémétrie {#telemetry-collection}

{{< site-region region="gov,gov2" >}}

L'Agent sur les sites non gouvernementaux collecte des informations sur l'environnement, les performances et l'utilisation des fonctionnalités du Datadog Agent. Lorsque l'Agent détecte un site gouvernemental, ou que le [Datadog Agent FIPS Proxy][1] est utilisé, l'Agent désactive automatiquement cette collecte de télémétrie. Lorsqu'une telle détection est impossible (par exemple, si un proxy est utilisé), la télémétrie de l'Agent est émise, mais immédiatement supprimée au niveau de l'ingestion de Datadog.

Pour éviter que ces données ne soient émises en premier lieu, Datadog recommande de désactiver explicitement la télémétrie de l'Agent en mettant à jour le paramètre `agent_telemetry` dans le fichier de configuration de l'Agent, comme indiqué dans l'exemple ci-dessous.

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
agent_telemetry:
  enabled: false
```
{{% /tab %}}
{{% tab "Avec des variables d'environnement" %}}

```bash
DD_AGENT_TELEMETRY_ENABLED=false
```
{{% /tab %}}
{{< /tabs >}}
[1]: https://docs.datadoghq.com/fr/agent/configuration/fips-compliance?tab=hostorvm&site=gov
{{< /site-region >}}
{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Datadog peut collecter des informations sur l'environnement, les performances et l'utilisation des fonctionnalités du Datadog Agent. Cela peut inclure des journaux de diagnostic ainsi que des crash dumps du Datadog Agent, accompagnés de traces de pile obfusquées pour soutenir et améliorer davantage le Datadog Agent.

Vous pouvez désactiver cette collecte de télémétrie en mettant à jour le paramètre `agent_telemetry` dans le fichier de configuration de l'Agent, comme indiqué dans l'exemple ci-dessous.
{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
agent_telemetry:
  enabled: false
```
{{% /tab %}}
{{% tab "Avec des variables d'environnement" %}}

```bash
DD_AGENT_TELEMETRY_ENABLED=false
```
{{% /tab %}}
{{< /tabs >}}

**Contenu de la télémétrie :**

Pour afficher le contenu de télémétrie le plus récent, exécutez la commande suivante :

```bash
agent diagnose show-metadata agent-telemetry
```

| Métadonnées ([source][1]) |
| ---------------------- |
| ID de la machine             |
| Nom de la machine           |
| OS                     |
| Version de l'OS             |
| Version de l'Agent          |

| Métriques ([source][2])                       | Description                                                                                                            |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Vérifications**                                  |                                                                                                                        |
| checks.execution_time                       | Temps d'exécution de la vérification en millisecondes                                                                                 |
| pymem.inuse                                 | Nombre d'octets alloués par l'interpréteur Python                                                                    |
| **Journaux et métriques**                        |                                                                                                                        |
| dogstatsd.udp_packets_bytes                 | Octets des paquets UDP DogStatsD                                                                                            |
| dogstatsd.uds_packets_bytes                 | Octets des paquets UDS DogStatsD                                                                                            |
| dogstatsd_client.bytes_sent                 | Nombre total d'octets envoyés par les clients DogStatsD                                                                                  |
| dogstatsd_client.bytes_dropped              | Nombre total d'octets abandonnés par les clients DogStatsD                                                                               |
| dogstatsd_client.bytes_dropped_queue        | Nombre total d'octets abandonnés car la file d'attente de l'expéditeur du client DogStatsD est pleine                                                    |
| dogstatsd_client.bytes_dropped_writer       | Nombre total d'octets abandonnés car le processus d'écriture du client DogStatsD ne peut pas les envoyer                                                 |
| logs.auto_multi_line_aggregator_flush       | Nombre de journaux multilignes agrégés par l'Agent                                                                       |
| logs.auto_multi_line_default_total_lines    | Nombre total de lignes de journal traitées par l'agrégateur de détection pour les sources reposant sur la détection multiligne automatique par défaut           |
| logs.auto_multi_line_default_would_combine  | Nombre de lignes qui seraient combinées si la détection multi-lignes automatique était activée par défaut                              |
| logs.auto_multi_line_default_would_truncate | Nombre de lignes dans les groupes qui seraient tronquées si la détection multi-lignes automatique était activée par défaut                   |
| logs.bytes_missed                           | Nombre total d'octets perdus avant qu'ils ne puissent être consommés par l'Agent, par exemple, après une rotation de logs                 |
| logs.bytes_sent                             | Nombre total d'octets envoyés avant encodage, le cas échéant                                                              |
| logs.decoded                                | Nombre total de logs décodés                                                                                           |
| logs.dropped                                | Nombre total de logs abandonnés                                                                                           |
| logs.encoded_bytes_sent                     | Nombre total d'octets envoyés après encodage, le cas échéant                                                               |
| logs.http_connectivity_check                | Nombre de vérifications de connectivité HTTP, marquées par statut (succès ou échec)                                               |
| logs.http_connectivity_failure              | Nombre d'échecs de check de connectivité HTTP, marqués par cause racine (dns, tls, timeout, connexion, http_status, autre)    |
| logs.http_connectivity_retry_attempt        | Nombre de tentatives de réessai de connectivité HTTP, marquées par statut (succès ou échec)                                       |
| logs.restart_attempt                        | Nombre de tentatives de redémarrage de l'agent de logs, marquées par statut et transport cible                                             |
| logs.sender_latency                         | Latence de l'expéditeur HTTP en millisecondes                                                                                    |
| logs.truncated                              | Nombre total de logs tronqués par l'Agent                                                                            |
| logs_destination.destination_workers        | Nombre maximal de connexions HTTP actives par destination de log                                                          |
| point.dropped                               | Nombre total de métriques abandonnées                                                                                        |
| point.sent                                  | Nombre total de métriques envoyées                                                                                        |
| transactions.input_count                    | Nombre de transactions entrantes                                                                                        |
| transactions.input_bytes                    | Taille de la charge utile des transactions entrantes en octets                                                                                        |
| transactions.success                        | Nombre de transactions réussies                                                                                        |
| transactions.success_bytes                  | Taille de la charge utile des transactions réussies en octets                                                                                        |
| transactions.requeued                       | Nombre de transactions remises en file d'attente                                                                                        |
| transactions.retries                        | Nombre de tentatives de transaction                                                                                        |
| **Base de données**                                |                                                                                                                        |
| oracle.activity_samples_count               | Nombre de lignes récupérées lors de la mesure de l'activité des requêtes (Nombre d'échantillons d'activité collectés)                                                                                        |
| oracle.activity_latency                     | Temps nécessaire pour récupérer l'activité des requêtes en millisecondes                                                                                        |
| oracle.statement_metrics                    | Temps nécessaire pour récupérer les métriques de la base de données en millisecondes                                                                                        |
| oracle.statement_plan_errors                | Nombre d'erreurs lors de la récupération des plans d'exécution                                                                                        |
| postgres.collect_activity_snapshot_ms       | Temps nécessaire pour obtenir l'instantané d'activité en millisecondes                                                                                        |
| postgres.collect_relations_autodiscovery_ms | Temps nécessaire pour collecter les relations Autodiscovery en millisecondes                                                                                        |
| postgres.collect_statement_samples_ms       | Temps nécessaire pour obtenir les échantillons d'instructions en millisecondes                                                                                        |
| postgres.collect_statement_samples_count    | Nombre total de lignes récupérées pour collecter les échantillons d'instructions                                                                                        |
| postgres.collect_stat_autodiscovery_ms      | Temps nécessaire pour collecter les statistiques Autodiscovery en millisecondes                                                                                        |
| postgres.get_new_pg_stat_activity_ms        | Temps nécessaire pour obtenir `pg_stat_activity` en millisecondes                                                                                        |
| postgres.get_new_pg_stat_activity_count     | Nombre total de lignes récupérées pour collecter `pg_stat_activity`                                                                       |
| postgres.get_active_connections_ms          | Temps nécessaire pour obtenir les connexions actives en millisecondes                                                                                        |
| postgres.get_active_connections_count       | Nombre total de lignes récupérées pour obtenir les connexions actives                                                                                        |
| postgres.schema_tables_elapsed_ms           | Temps nécessaire pour collecter les tables dans le schéma Postgres                                                                                        |
| postgres.schema_tables_count                | Nombre total de tables dans le schéma Postgres                                                                                        |
| **API**                                     |                                                                                                                        |
| api_server.request_duration_seconds         | Performance d'exécution des commandes CLI (si exécutées)                                                                       |
| **Événements**                                  |                                                                                                                        |
| agent_bsod                                  | Données relatives à l'écran bleu de la mort (BSOD) de l'Agent, incluant le code BugCheck, quatre arguments associés et la pile d'appels de plantage non symbolisée |
| **Service Discovery**                       |                                                                                                                        |
| service_discovery.discovered_services       | Nombre de services détectés par la fonctionnalité Service Discovery de l'Agent                                                   |
| **Autodiscovery**                          |                                                                                                                        |
| autodiscovery.discovery_queue_depth         | Nombre de services actuellement dans la file d'attente de découverte d'intégration de l'Agent                                                |
| autodiscovery.discovery_results             | Nombre de tentatives de découverte d'intégration de l'Agent, marquées par résultat (succès ou échec)                             |
| **Surveillance GPU**                          |                                                                                                                        |
| gpu.device_total                            | Nombre total de GPU dans le système                                                                                     |
| **APM**                                     |                                                                                                                        |
| trace.enabled                               | Indique si le processus trace-agent est en cours d'exécution.                                                                            |
| trace.working                               | Indique si le processus trace-agent reçoit et envoie des traces.                                                       |
| **Synthetic Monitoring**                              |                                                                                                                        |
| synthetics_agent.checks_received            | Nombre de tests reçus                                                                                               |
| synthetics_agent.checks_processed           | Nombre de tests exécutés                                                                                               |
| synthetics_agent.error_test_config          | Nombre d'erreurs de configuration de test                                                                                           |
| synthetics_agent.traceroute_error           | Nombre d'erreurs de traceroute                                                                                            |
| synthetics_agent.evp_send_result_failure    | Nombre d'erreurs lors de l'envoi des résultats                                                                                  |
| **Cluster Agent**                           |                                                                                                                        |
| admission_webhooks.mutation_attempts        | Nombre de tentatives de mutation de webhook d'admission                                                                          |
| admission_webhooks.library_injection_attempts | Nombre de tentatives d'injection de library |
| admission_webhooks.library_injection_errors | Nombre d'erreurs d'injection de library |
| admission_webhooks.patcher_errors           | Nombre d'erreurs du patcher de webhook d'admission                                                                             |
| admission_webhooks.rc_provider_configs      | Nombre de configurations de remote configuration provider      |
| admission_webhooks.rc_provider_configs_invalid | Nombre de configurations invalides de remote configuration provider |
| admission_webhooks.image_resolution_attempts | Nombre de tentatives de résolution d'image                                                                                   |
| autodiscovery.errors                        | Nombre d'erreurs d'Autodiscovery                                                                                         |
| autodiscovery.watched_resources             | Nombre de ressources surveillées par Autodiscovery                                                                              |
| cluster_checks.configs_dispatched           | Nombre de configurations de cluster checks distribuées      |
| cluster_checks.configs_dangling             | Nombre de configurations de cluster checks orphelines      |
| cluster_checks.configs_info                 | Noms des cluster checks distribués      |
| cluster_checks.unscheduled_check            | Nombre de cluster checks non planifiés      |
| instrumentation_controller.resources        | Nombre de `DatadogInstrumentation` ressources suivies par le contrôleur                                                 |
| instrumentation_controller.reconciliations  | Nombre de `DatadogInstrumentation` tentatives de réconciliation de section, marquées par section et statut                       |
| language_detection_patcher.patches          | Nombre de patches du language_detection_patcher      |
| tagger.stored_entities                      | Nombre d'entités stockées dans le Tagger                                                                                |
| workloadmeta.stored_entities                | Nombre d'entités stockées dans WorkloadMeta                                                                              |
| workloadmeta.pull_errors                    | Nombre d'erreurs de pull de WorkloadMeta      |
| appsec_injector.watched_changes             | Nombre de changements détectés par l'injecteur AppSec pour les ressources surveillées                                                |
| appsec_injector.sidecar_mutations           | Nombre de résultats d'admission sidecar de l'injecteur AppSec (mutation et suppression de pod)                                       |
| agent_performance.containers_restarts       | Nombre de redémarrages de conteneurs pour les pods Cluster Agent et Cluster Checks Runner                                      |
| agent_performance.containers_terminated     | Nombre de terminaisons de conteneurs pour les pods Cluster Agent et Cluster Checks Runner, marquées par motif                |
| agent_performance.memory_usage              | Utilisation totale de la mémoire d'exécution des conteneurs, en octets, pour les pods Cluster Agent et Cluster Checks Runner                   |
| agent_performance.memory_limit              | Limites totales de la mémoire d'exécution des conteneurs, en octets, pour les pods Cluster Agent et Cluster Checks Runner                  |
| agent_performance.cpu_usage                 | Utilisation totale du processeur d'exécution des conteneurs, en cœurs CPU, pour les pods Cluster Agent et Cluster Checks Runner                  |
| **eBPF**                                    |                                                                                                                        |
| ebpf.core_load_success                      | Nombre de chargements réussis d'un programme eBPF CO-RE                                                                    |
| ebpf.core_load_error                        | Nombre d'erreurs lors du chargement d'un programme eBPF CO-RE                                                                         |
| ebpf.core_remoteconfig_success              | Nombre de téléchargements réussis de données BTF (BPF Type Format) depuis la configuration distante                                 |
| ebpf.core_remoteconfig_error                | Nombre d'erreurs lors du téléchargement des données BTF depuis la configuration distante                                                        |

Seules les métriques applicables sont émises. Par exemple, si DBM n'est pas activé, aucune des métriques liées à la base de données n'est émise.


[1]: https://github.com/DataDog/datadog-agent/blob/4dc6ed6eb069bdea7e93f2d267ac5086a98c968c/comp/core/agenttelemetry/impl/sender.go#L218-L221
[2]: https://github.com/search?q=repo%3ADataDog%2Fdatadog-agent+content%3A%2Fvar+defaultProfiles%2F+path%3Acomp%2Fcore%2Fagenttelemetry%2Fimpl%2Fconfig.go+content%3A%2Fprofiles%3A%2F+content%3A%2F-+name%3A+checks%2F+content%3A%2Fmetric%3A%2F+content%3A%2Fexclude%3A%2F&type=code

{{< /site-region >}}

### Pour aller plus loin {#further-reading}

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
[19]: /fr/data_security/guide/public_artifact_vulnerabilities/