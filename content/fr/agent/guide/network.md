---
aliases:
- /fr/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
- /fr/account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
- /fr/agent/network
- /fr/agent/faq/network
further_reading:
- link: logs/
  tag: Documentation
  text: Recueillir vos logs
- link: /infrastructure/process
  tag: Documentation
  text: Recueillir vos processus
- link: tracing
  tag: Documentation
  text: Recueillir vos traces
kind: guide
title: Trafic réseau
---

<div class="alert alert-warning">
Le trafic est toujours généré par l'Agent et envoyé à Datadog. Aucune session n'est jamais initiée par Datadog et transmise à l'Agent.
</div>

## Présentation

L'intégralité du trafic de l'Agent est envoyé via SSL. La destination dépend du service et du site Datadog. Pour consulter les destinations disponibles en fonction de votre site, utilisez le sélecteur `SITE` sur la droite.

## Destinations

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}

[Live Containers][3] & [Live Process][4]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Network Device Monitoring][10]
: `ndm-intake.`{{< region-param key="dd_site" code="true" >}}
: `snmp-traps-intake.`{{< region-param key="dd_site" code="true" >}}


[Orchestrator][5]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}

[Profiling][7]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring (RUM)][6]
: `rum.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}}<br>
`session-replay.`{{< region-param key="browser_sdk_endpoint_domain" code="true" >}}

[Emplacement privé Synthetic][8]
: Worker v>=1.5.0 : `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} est le seul endpoint à configurer.<br>
Résultats des tests API pour worker v>0.1.6 : `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Résultats des tests Browser pour worker v>0.2.0 : `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Résultats des tests API pour worker v<0.1.5 : `api.`{{< region-param key="dd_site" code="true" >}}

{{< site-region region="us,eu,us3" >}}
[Database Monitoring][2]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[2]: /fr/database_monitoring/
{{< /site-region >}}

{{< site-region region="us" >}}

[Logs][1] et [logs HIPAA][2]
: TCP : `agent-intake.logs.datadoghq.com`<br>
HTTP : `agent-http-intake.logs.datadoghq.com`<br>
Autre : voir les [endpoints pour les logs][3]

[Logs HIPAA (obsolète)][2]
: `tcp-encrypted-intake.logs.datadoghq.com`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.com`<br>
`gcp-encrypted-intake.logs.datadoghq.com`<br>
`http-encrypted-intake.logs.datadoghq.com`

[1]: /fr/logs/
[2]: /fr/security/logs/#hipaa-enabled-customers
[3]: /fr/logs/log_collection/#logging-endpoints

{{< /site-region >}}

{{< site-region region="eu" >}}

[Logs][1] et [logs HIPAA][2]
: TCP : `agent-intake.logs.datadoghq.eu`<br>
HTTP : `agent-http-intake.logs.datadoghq.eu`<br>
Autre : voir les [endpoints pour les logs][3]

[Logs HIPAA (obsolète)][2]
: `tcp-encrypted-intake.logs.datadoghq.eu`<br>
`lambda-tcp-encrypted-intake.logs.datadoghq.eu`<br>
`gcp-encrypted-intake.logs.datadoghq.eu`<br>
`http-encrypted-intake.logs.datadoghq.eu`

[1]: /fr/logs/
[2]: /fr/security/logs/#hipaa-enabled-customers
[3]: /fr/logs/log_collection/#logging-endpoints

{{< /site-region >}}

{{< site-region region="us3" >}}

[Logs][1] et [logs HIPAA][2]
: HTTP : `agent-http-intake.logs.us3.datadoghq.com`<br>
Autre : voir les [endpoints pour les logs][3]

[Logs HIPAA (obsolète)][2]
: `lambda-tcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us3.datadoghq.com`<br>
`http-encrypted-intake.logs.us3.datadoghq.com`

[1]: /fr/logs/
[2]: /fr/security/logs/#hipaa-enabled-customers
[3]: /fr/logs/log_collection/#logging-endpoints

{{< /site-region >}}

{{< site-region region="us5" >}}

[Logs][1] et [logs HIPAA][2]
: HTTP : `agent-http-intake.logs.us5.datadoghq.com`<br>
Autre : voir les [endpoints pour les logs][3]

[Logs HIPAA (obsolète)][2]
: `lambda-tcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`gcp-encrypted-intake.logs.us5.datadoghq.com`<br>
`http-encrypted-intake.logs.us5.datadoghq.com`

[1]: /fr/logs/
[2]: /fr/security/logs/#hipaa-enabled-customers
[3]: /fr/logs/log_collection/#logging-endpoints

{{< /site-region >}}

{{< site-region region="gov" >}}

[Logs][1] et [logs HIPAA][2]
: HTTP : `agent-http-intake.logs.ddog-gov.com`<br>
Autre : voir les [endpoints pour les logs][3]

[Logs HIPAA (obsolète)][2]
: `lambda-tcp-encrypted-intake.logs.ddog-gov.com`<br>
`gcp-encrypted-intake.logs.ddog-gov.com`<br>
`http-encrypted-intake.logs.ddog-gov.com`

[1]: /fr/logs/
[2]: /fr/security/logs/#hipaa-enabled-customers
[3]: /fr/logs/log_collection/#logging-endpoints

{{< /site-region >}}

Toutes les autres données de l'Agent
: `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}<br>
Par exemple, l'Agent v7.31.0 envoie ses données à `7-31-0-app.agent.`{{< region-param key="dd_site" code="true" >}}. Vous devez donc ajouter `*.agent.`{{< region-param key="dd_site" code="true" >}} dans les listes d'inclusion de vos pare-feu.<br>
À partir de la v6.1.0, l'Agent interroge également l'API Datadog pour certaines fonctionnalités non essentielles (par exemple, pour indiquer la validité d'une clé d'API configurée) :<br>
**Agent >= 7.18.0/6.18.0** `api.`{{< region-param key="dd_site" code="true" >}}<br>
**Agent < 7.18.0/6.18.0** `app.`{{< region-param key="dd_site" code="true" >}}

Tous ces domaines sont des entrées **CNAME** qui pointent vers un ensemble d'adresses IP statiques. Vous pouvez trouver ces adresses sur la page `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

Les informations sont structurées au format JSON selon le schéma suivant :

{{< code-block lang="text" disable_copy="true" >}}
{
    "version": 1,                          // <-- valeur incrémentée chaque fois que cette information est modifiée
    "modified": "YYYY-MM-DD-HH-MM-SS",     // <-- timestamp de la dernière modification
    "agents": {                            // <-- adresses IP utilisées par l'Agent pour envoyer des métriques à Datadog
        "prefixes_ipv4": [                 // <-- liste des blocs CIDR IPv4
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [                 // <-- liste des blocs CIDR IPv6
            ...
        ]
    },
    "api": {...},                          // <-- même chose, mais pour une fonctionnalité non essentielle de l'Agent (demande d'informations à partir de l'API)
    "apm": {...},                          // <-- même structure que « agents », mais il s'agit des adresses IP utilisées pour les données de l'Agent APM
    "logs": {...},                         // <-- même chose, mais pour les données de l'Agent de log
    "process": {...},                      // <-- même chose, mais pour les données de l'Agent de processus
    "orchestrator": {...},                 // <-- même chose, mais pour les données de l'Orchestrator
    "synthetics": {...},                   // <-- non utilisé pour le trafic de l'Agent (adresses IP sources de Datadog pour les bots utilisés pour les tests Synthetic)
    "synthetics-private-locations": {...}, // <--  non utilisé pour le trafic de l'Agent (adresses IP d'admission des emplacements privés Synthetics)
    "webhooks": {...}                      // <-- non utilisé pour le trafic de l'Agent (adresses IP Datadog transmettant les webhooks)
}
{{< /code-block >}}

Chaque section possède un endpoint dédié, par exemple :

- `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json` pour les adresses IP utilisées pour recevoir les données des logs via TCP ;
- `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json` pour les adresses IP utilisées pour recevoir les données d'APM.

### Inclusion

Toutes les `ip-ranges` doivent être ajoutées à votre liste d'inclusion. Bien qu'elles ne soient pas toutes actives en même temps, les adresses utilisées sont amenées à changer en raison des opérations de gestion et de maintenance réseau effectuées régulièrement.

## Ports ouverts

<div class="alert alert-warning">
L'intégralité du trafic sortant est protégé par SSL et envoyé via TCP/UDP.
</div>

Ouvrez les ports suivants pour profiter de toutes les fonctionnalités de l'**Agent** :

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

#### Trafic sortant

{{< site-region region="us" >}}

443/tcp
: Port utilisé pour la plupart des données de l'Agent (métriques, APM, live processes/containers)

123/udp
: Port utilisé pour le NTP ([en savoir plus sur l'importance du NTP][1])<br>
Voir les [cibles NTP par défaut][2]

10516/tcp
: Port utilisé pour la collecte de logs via TCP<br>
Consultez les [endpoints pour les logs][3] pour découvrir d'autres types de connexions.

10255/tcp
: Port utilisé pour le [kubelet HTTP Kubernetes][4]

10250/tcp
: Port utilisé pour le [kubelet HTTPS Kubernetes][4]

[1]: /fr/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /fr/integrations/ntp/#overview
[3]: /fr/logs/log_collection/#logging-endpoints
[4]: /fr/agent/basic_agent_usage/kubernetes/

{{< /site-region >}}

{{< site-region region="eu" >}}

443/tcp
: Port utilisé pour la plupart des données de l'Agent (métriques, APM, live processes/containers)

123/udp
: Port utilisé pour le NTP ([en savoir plus sur l'importance du NTP][1])<br>
Voir les [cibles NTP par défaut][2]

443/tcp
: Port utilisé pour la collecte de logs via TCP<br>
Consultez les [endpoints pour les logs][3] pour découvrir d'autres types de connexions.

10255/tcp
: Port utilisé pour le [kubelet HTTP Kubernetes][4]

10250/tcp
: Port utilisé pour le [kubelet HTTPS Kubernetes][4]

[1]: /fr/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /fr/integrations/ntp/#overview
[3]: /fr/logs/log_collection/#logging-endpoints
[4]: /fr/agent/basic_agent_usage/kubernetes/

{{< /site-region >}}

{{< site-region region="us3,us5,gov" >}}

443/tcp
: Port utilisé pour la plupart des données de l'Agent (métriques, APM, live processes/containers)

123/udp
: Port utilisé pour le NTP ([en savoir plus sur l'importance du NTP][1])<br>
Voir les [cibles NTP par défaut][2]

10255/tcp
: Port utilisé pour le [kubelet HTTP Kubernetes][4]

10250/tcp
: Port utilisé pour le [kubelet HTTPS Kubernetes][4]

[1]: /fr/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /fr/integrations/ntp/#overview
[3]: /fr/logs/log_collection/#logging-endpoints
[4]: /fr/agent/basic_agent_usage/kubernetes/

{{< /site-region >}}

#### Trafic entrant

Ports utilisés pour les services de l'Agent qui communiquent entre eux en local au sein du host uniquement

5000/tcp
: Port utilisé pour le [serveur go_expvar][1]

5001/tcp
: Port sur lequel l'API IPC écoute le trafic

5002/tcp
: Port utilisé pour [accéder à l'interface graphique de l'Agent depuis le navigateur][2]

6062/tcp
: Port utilisé pour les endpoints de debugging de l'Agent de processus

6162/tcp
: Port utilisé pour la configuration des paramètres de runtime de l'Agent de processus

8125/udp
: Port utilisé pour DogStatsD, sauf si `dogstatsd_non_local_traffic` est défini sur true. Ce port est disponible sur localhost : `127.0.0.1`, `::1`, `fe80::1`.

8126/tcp
: Port utilisé pour le [récepteur APM][3]

[1]: /fr/integrations/go_expvar/
[2]: /fr/agent/basic_agent_usage/#gui
[3]: /fr/tracing/
{{% /tab %}}
{{% tab "Agent v5 et v4" %}}

#### Trafic sortant

443/tcp
: Port utilisé pour la plupart des données de l'Agent (métriques, APM, live processes/containers)

123/udp
: Port utilisé pour le NTP ([en savoir plus sur l'importance du NTP][1]).<br>
Voir les [cibles NTP par défaut][2].

#### Trafic entrant

6062/tcp
: Port utilisé pour les endpoints de debugging de l'Agent de processus

6162/tcp
: Port utilisé pour la configuration des paramètres de runtime de l'Agent de processus

8125/udp
: Port utilisé pour DogStatsD, sauf si `dogstatsd_non_local_traffic` est défini sur true. Ce port est disponible sur localhost : `127.0.0.1`, `::1`, `fe80::1`.

8126/tcp
: Port utilisé pour le [récepteur de l'APM][3]

17123/tcp
: Forwarder de l'Agent, utilisé pour la mise en mémoire tampon du trafic en cas de perte de communication entre l'Agent et Datadog

17124/tcp
: Redirecteur pour la prise en charge de Graphite (facultatif)

[1]: /fr/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /fr/integrations/ntp/#overview
[3]: /fr/tracing/
{{% /tab %}}
{{< /tabs >}}

## Utilisation d'un proxy

Pour obtenir des instructions détaillées sur la configuration d'un proxy, consultez la section [Configuration de l'Agent pour un proxy][9].

## Mise en mémoire tampon des données

Si votre réseau n'est plus disponible, l'Agent stocke les métriques en mémoire.
L'utilisation maximale de la mémoire pour le stockage des métriques est définie par le paramètre `forwarder_retry_queue_payloads_max_size`. Lorsque cette limite est atteinte, les métriques sont ignorées.

À partir de la v7.27.0, l'Agent stocke les métriques sur disque une fois la limite de mémoire atteinte. Pour activer cette fonctionnalité, définissez le paramètre `forwarder_storage_max_size_in_bytes` sur une valeur positive correspondant au volume d'espace de stockage maximal, en octets, que l'Agent peut utiliser pour stocker les métriques sur disque.

Les métriques sont stockées dans le dossier défini par le paramètre `forwarder_storage_path`, qui prend par défaut la valeur `/opt/datadog-agent/run/transactions_to_retry` pour les systèmes Unix et `C:\ProgramData\Datadog\run\transactions_to_retry` sous Windows.

Pour veiller à ne pas utiliser tout l'espace de stockage, l'Agent stocke les métriques sur disque uniquement si le total d'espace de stockage utilisé est inférieur à 95 %. La valeur de cette limite est définie par le paramètre `forwarder_storage_max_disk_ratio`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/
[2]: /fr/database_monitoring/
[3]: /fr/infrastructure/livecontainers/
[4]: /fr/infrastructure/process/
[5]: /fr/infrastructure/livecontainers/#kubernetes-resources-1
[6]: /fr/real_user_monitoring/
[7]: /fr/profiler/
[8]: /fr/synthetics/private_locations
[9]: /fr/agent/proxy/
[10]: /fr/network_monitoring/devices