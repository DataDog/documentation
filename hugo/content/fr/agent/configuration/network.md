---
algolia:
  tags:
  - network traffic
  - destinations
  - ports
  - data buffering
  - static IP addresses
aliases:
- /fr/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
- /fr/account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
- /fr/agent/network
- /fr/agent/faq/network
- /fr/agent/guide/network
further_reading:
- link: /getting_started/site
  tag: Documentation
  text: En savoir plus sur le site Datadog
- link: /logs/
  tag: Documentation
  text: Recueillir vos logs
- link: /infrastructure/process
  tag: Documentation
  text: Recueillir vos processus
- link: tracing
  tag: Documentation
  text: Recueillir vos traces
title: Trafic réseau
---
## Présentation {#overview}

<div class="alert alert-danger">
Le trafic est toujours initié par l'Agent vers Datadog. Aucune session n'est initiée de Datadog vers l'Agent.
</div>

Tout le trafic de l'Agent est envoyé via SSL. La destination dépend du service et du site Datadog. Pour voir les destinations basées sur votre [Datadog site][11], cliquez sur le sélecteur {{< ui >}}DATADOG SITE{{< /ui >}} à droite.

## Installation {#installation}

Ajoutez les domaines suivants à votre liste d'inclusion pour autoriser l'installation de l'Agent :

- `install.datadoghq.com`
- `yum.datadoghq.com`
- `keys.datadoghq.com`
- `apt.datadoghq.com`
- `windows-agent.datadoghq.com`

## Destinations {#destinations}
<div class="alert alert-warning">
À partir de la version 7.67.0, l'Agent convertit les sites Datadog en noms de domaine pleinement qualifiés (en ajoutant un point à la fin du domaine) pour réduire le nombre de requêtes DNS.
Par exemple, il envoie des APM payloads vers <code>trace.agent.datadoghq.com.</code>.<br>
Ce comportement peut être désactivé dans la version 7.72.0 et ultérieure en définissant <code>convert_dd_site_fqdn.enabled</code> par <code>false</code> dans la configuration, ou avec la variable d'environnement <code>DD_CONVERT_DD_SITE_FQDN_ENABLED=false</code>.
</div>

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}<br>
`instrumentation-telemetry-intake.`{{< region-param key="dd_site" code="true" >}}

[LLM Observabilty][23]
: `llmobs-intake.`{{< region-param key="dd_site" code="true" >}}

[Container Images][13]
: `contimage-intake.`{{< region-param key="dd_site" code="true" >}}

[Live Containers][3], [Live Process][4], [Cloud Network Monitoring][24], [Universal Service Monitoring][25]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Network Device Monitoring][10]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`snmp-traps-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`ndmflow-intake.`{{< region-param key="dd_site" code="true" >}}

[Network Path][14]
: `netpath-intake.`{{< region-param key="dd_site" code="true" >}}<br>
Dans l'Agent v7.75+, Network Path contacte des services externes via HTTPS pour résoudre l'adresse IP publique du host source. Ceci est facultatif et Network Path fonctionne sans cela, mais si votre réseau restreint le trafic sortant et que vous souhaitez une résolution de l'adresse IP publique source, ajoutez ce qui suit à votre liste d'inclusion : `icanhazip.com`, `ipinfo.io`, `checkip.amazonaws.com`, `api.ipify.org`, `whatismyip.akamai.com`. Voir [Network Path Setup][33] pour plus de détails.

[Orchestrator][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}<br>
`contlcycle-intake.`{{< region-param key="dd_site" code="true" >}}

[Profiling][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring (RUM)][6]
: {{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Cloud Security Vulnerabilities][29]
: `sbom-intake.`{{< region-param key="dd_site" code="true" >}}

[Synthetic Monitoring Private Locations][8]
: Synthetics Worker v1.5.0 ou version ultérieure : `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} est le seul endpoint que vous devez configurer.<br>
Résultats des tests API pour Synthetics Worker > v0.1.6 : `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Résultats des tests de navigateur pour Synthetics Worker > v0.2.0 : `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Résultats des tests API pour Synthetics Worker < v0.1.5 : `api.`{{< region-param key="dd_site" code="true" >}}

{{% site-region region="us,eu,us3,us5,ap1,ap2,uk1" %}}

[Remote Configuration][101]
: `config.`{{< region-param key="dd_site" code="true" >}}

[Database Monitoring][102]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[End User Device Monitoring][103]
: `softinv-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`eudm-intake.`{{< region-param key="dd_site" code="true" >}}

[101]: /fr/remote_configuration
[102]: /fr/database_monitoring/
[103]: /fr/infrastructure/end_user_device_monitoring/

{{% /site-region %}}

{{% logs-tcp-disclaimer %}}

[Logs][30] & [HIPAA logs][31]
: (Obsolète) TCP : {{< region-param key=tcp_endpoint code="true" >}}<br>
HTTP : {{< region-param key=agent_http_endpoint code="true" >}}<br>
Autre : Voir [logs endpoints][32]

[Journaux HIPAA hérités][31] (Obsolète, TCP non pris en charge)
: {{< region-param key=hipaa_logs_legacy code="true" >}}

[Metrics][26], [Service Checks][27], [Events][28] et autres métadonnées de l'Agent
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
Par exemple, l'Agent v7.31.0 envoie des rapports à `7-31-0-app.agent.`{{< region-param key="dd_site" code="true" >}}. Vous devez ajouter `*.agent.`{{< region-param key="dd_site" code="true" >}} à votre liste d'inclusion dans votre/vos pare-feu.<br>
Depuis la v6.1.0, l'Agent interroge également l'API de Datadog pour fournir des fonctionnalités non critiques (par exemple, afficher la validité de la clé d'API configurée) :<br>
Agent v7.18.0 ou 6.18.0 et versions ultérieures : `api.`{{< region-param key="dd_site" code="true" >}}<br>
Agent < v7.18.0 ou 6.18.0 : `app.`{{< region-param key="dd_site" code="true" >}}

[Agent flare][12]
: `<VERSION>-flare.agent.`{{< region-param key="dd_site" code="true" >}}<br>
Par exemple, l'Agent v7.31.0 envoie des flare data à `7-31-0-flare.agent.`{{< region-param key="dd_site" code="true" >}}. Vous devez ajouter `*.agent.`{{< region-param key="dd_site" code="true" >}} à votre liste d'inclusion dans votre/vos pare-feu.<br>

### Adresses IP statiques {#static-ip-addresses}

Tous ces domaines sont des enregistrements **CNAME** pointant vers un ensemble d'adresses IP statiques. Ces adresses se trouvent sur `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

Les informations sont structurées au format JSON selon le schéma suivant :

{{< code-block lang="text" disable_copy="true" >}}
{
    "version": 1,                          // <-- incremented every time this information is changed
    "modified": "YYYY-MM-DD-HH-MM-SS",     // <-- timestamp of the last modification
    "agents": {                            // <-- the IPs used by the Agent to submit metrics to Datadog
        "prefixes_ipv4": [                 // <-- list of IPv4 CIDR blocks
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [                 // <-- list of IPv6 CIDR blocks
            ...
        ]
    },
    "api": {...},                          // <-- the IPs used by the Agent for non-critical functionality (querying information from API)
    "apm": {...},                          // <-- the IPs used by the Agent to submit APM data to Datadog
    "logs": {...},                         // <-- the IPs used by the Agent to submit logs to Datadog
    "process": {...},                      // <-- the IPs used by the Agent to submit process data to Datadog
    "orchestrator": {...},                 // <-- the IPs used by the Agent to submit container data to Datadog
    "remote-configuration": {...},         // <-- the IPs used by the Agent to retrieve its dynamic configuration
    "synthetics": {...},                   // <-- the source IPs used by Synthetic workers (not used by the Agent)
    "synthetics-private-locations": {...}, // <-- the IPs used by Synthetics Private Locations workers to submit data to Datadog (not used by the Agent)
    "webhooks": {...}                      // <-- the source IPs used by Datadog to connect to 3rd party infrastructure over HTTP (not used by the Agent)
}
{{< /code-block >}}

Chaque section possède un endpoint dédié sur, par exemple :

- `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json` pour les adresses IP utilisées pour recevoir les logs via TCP.
- `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json` pour les adresses IP utilisées pour recevoir les données APM.

### Inclusion {#inclusion}

Ajoutez tous les `ip-ranges` à votre liste d'inclusion. Bien qu'un sous-ensemble seulement soit actif à un moment donné, l'ensemble complet subit des variations au fil du temps en raison du fonctionnement normal du réseau et de la maintenance.

## Ports ouverts {#open-ports}

<div class="alert alert-danger">
Tout le trafic sortant est envoyé via SSL par TCP ou UDP.
<br><br>
Assurez-vous que l'Agent est uniquement accessible par vos applications ou par des sources réseau de confiance à l'aide d'une règle de pare-feu ou d'une restriction réseau similaire. Un accès non autorisé peut permettre à des acteurs malveillants d'effectuer plusieurs actions intrusives, notamment, mais sans s'y limiter, la transmission de traces et de métriques à votre compte Datadog, ou l'obtention d'informations sur votre configuration et vos services.
</div>

Ouvrez les ports suivants pour bénéficier de toutes les fonctionnalités de l'**Agent** :

#### Sortant {#outbound}

{{% site-region region="us,eu" %}}

| Produit/Fonctionnalité                                                                                                                                                    | Port                                           | Protocole         | Description                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent<br>APM<br>Containers<br>Live Processes<br>Métriques<br>Cloud Network Monitoring<br>Universal Service Monitoring                                                      | 443                                            | TCP              | La plupart des données de l'Agent utilisent le port 443.                                                                                                                                                              |
| [Mise à l'échelle automatique personnalisée de l'Agent][22]                                                                                                            | 8443                                           | TCP              |                                                                                                                                                                                             |
| Collecte de logs                                                                                                                                                           | {{< region-param key=web_integrations_port >}} | (Obsolète) TCP | Journalisation via TCP. <br>**Remarque** : la collecte de logs TCP **n'est pas prise en charge**. Datadog **n'offre aucune garantie de livraison ou de fiabilité** lors de l'utilisation de TCP, et les données de logs peuvent être perdues sans préavis. Pour une ingestion fiable, utilisez plutôt l'endpoint d'ingestion HTTP, un Datadog Agent officiel ou une intégration de transfert. Pour les autres types de connexion, consultez les [logs endpoints][21]. |
| NTP                                                                                                                                                                      | 123                                            | UDP              | Network Time Protocol (NTP). Consultez [default NTP targets][20].<br>Pour plus d'informations sur le dépannage NTP, consultez [NTP issues][19].                                                                |
| Test de connectivité | 8042 | TCP | Test de connectivité de configuration à distance.<br>**Remarque** : il s'agit d'un endpoint de télémétrie ne contenant aucune donnée client pour le développement de protocoles, et il n'est utilisé que lorsque [Remote Config][101] est activé.

[19]: /fr/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /fr/integrations/ntp/#overview
[21]: /fr/logs/log_collection/#logging-endpoints
[22]: /fr/containers/guide/cluster_agent_autoscaling_metrics

{{% /site-region %}}

{{% site-region region="us3,us5,gov,gov2,ap1,ap2,uk1" %}}

| Produit/Fonctionnalité | Port | Protocole | Description |
| ------------------------------------------------------------------------------------------------------------------- | ---- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Agent<br>APM<br>Containers<br>Live Processes<br>Metrics<br>Cloud Network Monitoring<br>Universal Service Monitoring | 443 | TCP | La plupart des données de l'Agent utilisent le port 443. |
| NTP                                                                                                                 | 123  | UDP      | Network Time Protocol (NTP). Consultez [default NTP targets][20].<br>Pour plus d'informations sur le dépannage NTP, consultez [NTP issues][19]. |

[19]: /fr/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /fr/integrations/ntp/#overview

{{% /site-region %}}

#### Entrant {#inbound}

Ports utilisés pour les services de l'Agent qui communiquent entre eux en local au sein du host uniquement

| Produit/Fonctionnalité        | Port | Protocole | Description                                                                                                                    |
| ---------------------------- | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Agent browser GUI][16] | 5002 | TCP |                                                                                                                                |
| APM receiver | 8126 | TCP | Inclut Tracing et Profiler.                                                                                             |
| [DogStatsD][18]              | 8125 | UDP      | Port pour DogStatsD sauf si `dogstatsd_non_local_traffic` est défini sur true. Ce port est disponible sur IPv4 localhost : `127.0.0.1`. |
| go_expvar server (APM) | 5012 | TCP | Pour plus d'informations, consultez [the go_expvar integration documentation][15].                                                        |
| go_expvar integration server | 5000 | TCP | Pour plus d'informations, consultez [the go_expvar integration documentation][15].                                                        |
| API IPC                      | 5001 | TCP      | Port utilisé pour la communication inter-processus (IPC).                                                                               |
| Process Agent debug          | 6062 | TCP      | Endpoints de debug pour le Process Agent.                                                                                         |
| Process Agent runtime        | 6162 | TCP      | Paramètres de configuration du runtime pour le Process Agent.                                                                          |

## Configurer les ports {#configure-ports}

Si vous devez modifier un port entrant parce que le port par défaut est déjà utilisé par un service existant sur votre réseau, modifiez le `datadog.yaml` fichier de configuration. Vous pouvez trouver la plupart des ports dans la section **Configuration avancée** du fichier :

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param expvar_port - integer - optional - default: 5000
## @env DD_EXPVAR_PORT - integer - optional - default: 5000
## The port for the go_expvar server.
#
# expvar_port: 5000

## @param cmd_port - integer - optional - default: 5001
## @env DD_CMD_PORT - integer - optional - default: 5001
## The port on which the IPC api listens.
#
# cmd_port: 5001

## @param GUI_port - integer - optional
## @env DD_GUI_PORT - integer - optional
## The port for the browser GUI to be served.
## Setting 'GUI_port: -1' turns off the GUI completely
## Default is:
##  * Windows & macOS : `5002`
##  * Linux: `-1`
##
#
# GUI_port: <GUI_PORT>

{{< /code-block >}}

Le récepteur APM et les ports DogStatsD sont situés respectivement dans les sections **Trace Collection Configuration** et **DogStatsD Configuration** du fichier de configuration `datadog.yaml` :

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="true" >}}
## @param dogstatsd_port - integer - optional - default: 8125
## @env DD_DOGSTATSD_PORT - integer - optional - default: 8125
## Override the Agent DogStatsD port.
## Note: Make sure your client is sending to the same UDP port.
#
# dogstatsd_port: 8125

[...]

## @param receiver_port - integer - optional - default: 8126
## @env DD_APM_RECEIVER_PORT - integer - optional - default: 8126
## The port that the trace receiver should listen on.
## Set to 0 to disable the HTTP receiver.
#
# receiver_port: 8126
{{< /code-block >}}

<div class="alert alert-danger">Si vous modifiez la valeur du port DogStatsD ou du port du récepteur APM ici, vous devez également modifier la configuration du SDK Datadog pour le port correspondant. Consultez les informations sur la configuration des ports dans la <a href="/tracing/trace_collection/library_config/">documentation de configuration de la bibliothèque pour votre langage</a>.</div>

## Utilisation de proxies {#using-proxies}

Pour obtenir des instructions détaillées sur la configuration d'un proxy, consultez la section [Configuration de l'Agent pour un proxy][9].

## Mise en mémoire tampon des données {#data-buffering}

Si le réseau devient indisponible, l'Agent stocke les métriques en mémoire.
L'utilisation maximale de la mémoire pour le stockage des métriques est définie par le `forwarder_retry_queue_payloads_max_size` paramètre de configuration. Lorsque cette limite est atteinte, les métriques sont supprimées.

L'Agent v7.27.0 ou version ultérieure stocke les métriques sur le disque lorsque la limite de mémoire est atteinte. Activez cette fonctionnalité en définissant `forwarder_storage_max_size_in_bytes` sur une valeur positive indiquant la quantité maximale d'espace de stockage, en octets, que l'Agent peut utiliser pour stocker les métriques sur le disque.

Les métriques sont stockées dans le dossier défini par le paramètre `forwarder_storage_path`, qui est par défaut `/opt/datadog-agent/run/transactions_to_retry` sur les systèmes Unix, et `C:\ProgramData\Datadog\run\transactions_to_retry` sur Windows.

Pour éviter de manquer d'espace de stockage, l'Agent stocke les métriques sur le disque uniquement si l'espace de stockage total utilisé est inférieur à 80 pour cent. Cette limite est définie par le `forwarder_storage_max_disk_ratio` paramètre.

## Installation du Datadog Operator {#installing-the-datadog-operator}

Si vous installez le Datadog Operator dans un environnement Kubernetes avec une connectivité limitée, vous devez ajouter les endpoints suivants à votre liste d'autorisation pour le port TCP 443, en fonction de votre registre :

- `registry.datadoghq.com` (Datadog Container Registry)
  - `us-docker.pkg.dev/datadog-prod/public-images` (peut recevoir des redirections depuis `registry.datadoghq.com`)
- `gcr.io/datadoghq` (GCR US)
- `eu.gcr.io/datadoghq` (GCR Europe)
- `asia.gcr.io/datadoghq` (GCR Asie)
- `datadoghq.azurecr.io` (Azure)
- `public.ecr.aws/datadog` (AWS)
- `docker.io/datadog` (DockerHub)


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/
[2]: /fr/database_monitoring/
[3]: /fr/infrastructure/livecontainers/
[4]: /fr/infrastructure/process/
[5]: /fr/infrastructure/containers/#kubernetes-orchestrator-explorer
[6]: /fr/real_user_monitoring/
[7]: /fr/profiler/
[8]: /fr/synthetics/private_locations
[9]: /fr/agent/configuration/proxy/
[10]: /fr/network_monitoring/devices
[11]: /fr/getting_started/site/
[12]: /fr/agent/troubleshooting/send_a_flare
[13]: /fr/infrastructure/containers/container_images
[14]: /fr/network_monitoring/network_path/
[15]: /fr/integrations/go_expvar/
[16]: /fr/agent/basic_agent_usage/#gui
[17]: /fr/tracing/
[18]: /fr/extend/dogstatsd/
[19]: /fr/agent/faq/network-time-protocol-ntp-offset-issues/
[20]: /fr/integrations/ntp/#overview
[21]: /fr/logs/log_collection/#logging-endpoints
[22]: /fr/containers/guide/cluster_agent_autoscaling_metrics
[23]: /fr/llm_observability/
[24]: /fr/network_monitoring/cloud_network_monitoring/
[25]: /fr/universal_service_monitoring/
[26]: /fr/metrics/
[27]: /fr/extend/service_checks/
[28]: /fr/events/
[29]: /fr/security/cloud_security_management/vulnerabilities/
[30]: /fr/logs/
[31]: /fr/data_security/logs/#hipaa-enabled-customers
[32]: /fr/logs/log_collection/#logging-endpoints
[33]: /fr/network_monitoring/network_path/setup/#source-public-ip-resolution