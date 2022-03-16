---
title: Trafic réseau
kind: guide
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
---
<div class="alert alert-warning">
Le trafic est toujours généré par l'Agent et envoyé à Datadog. Aucune session n'est jamais initiée par Datadog et transmise à l'Agent.
</div>

## Présentation

L'intégralité du trafic de l'Agent est envoyé via SSL. La destination dépend du service et du site Datadog. Pour consulter les destinations disponibles en fonction de votre site, utilisez le sélecteur `SITE` sur la droite.

## Destinations

[APM][1]
: `trace.agent.`{{< region-param key="dd_site" code="true" >}}

[Database Monitoring][2]
: `dbm-metrics-intake.`{{< region-param key="dd_site" code="true" >}}<br>
`dbquery-intake.`{{< region-param key="dd_site" code="true" >}}

[Live Containers][3] & [Live Process][4]
: `process.`{{< region-param key="dd_site" code="true" >}}

[Logs][5] et [logs HIPAA][6]
: TCP: `{{< region-param key="tcp_endpoint" code="true" >}}`<br>
HTTP: `{{< region-param key="http_endpoint" code="true" >}}`<br>
Autres : Voir [endpoints de logs][7]

[Logs HIPAA (obsolète)][6]
: `tcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}<br>
`lambda-tcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}<br>
`gcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}<br>
`http-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}

[Orchestrateur][8]
: `orchestrator.`{{< region-param key="dd_site" code="true" >}}

[Real User Monitoring (RUM)][9]
: `rum-http-intake.logs.`{{< region-param key="dd_site" code="true" >}}

[Profiling][10]
: `intake.profile.`{{< region-param key="dd_site" code="true" >}}

[Emplacement privé Synthetic][11]
: Worker v>=1.5.0 `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} est le seul endpoint à configurer.<br>
Résultats des tests API pour worker v>0.1.6 `intake.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Résultats des tests Browser pour worker v>0.2.0 `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}}<br>
Résultats des tests API pour worker v<0.1.5 `api.`{{< region-param key="dd_site" code="true" >}}

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
    "version": 1,                       // <-- valeur incrémentée chaque fois que cette information est modifiée
    "modified": "YYYY-MM-DD-HH-MM-SS",  // <-- timestamp de la dernière modification
    "agents": {                         // <-- adresses IP utilisées par l'Agent pour envoyer des métriques à Datadog
        "prefixes_ipv4": [              // <-- liste des blocs CIDR IPv4
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [              // <-- liste des blocs CIDR IPv6
            ...
        ]
    },
    "api": {...},                       // <-- même chose, mais pour une fonctionnalité non essentielle de l'Agent (demande d'informations à partir de l'API)
    "apm": {...},                       // <-- même structure que « agents », mais il s'agit des adresses IP utilisées pour les données de l'Agent APM
    "logs": {...},                      // <-- même chose, mais pour les données de l'Agent de log
    "process": {...},                   // <-- même chose, mais pour les données de l'Agent de processus
    "orchestrator": {...},              // <-- même chose, mais pour les données de l'Agent de processus
    "synthetics": {...},                // <-- non utilisé pour le trafic de l'Agent (adresses IP sources de Datadog pour les bots utilisés pour les tests Synthetic)
    "webhooks": {...}                   // <-- non utilisé pour le trafic de l'Agent (adresses IP sources de Datadog pour les webhooks)
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

443/tcp
: Port utilisé pour la plupart des données de l'Agent (métriques, APM, Live Processes/Containers)

123/udp
: Port utilisé pour le NTP ([en savoir plus sur l'importance du NTP][1]).<br>
Voir les [cibles NTP par défaut][2].

{{< region-param key="tcp_endpoint_port_ssl" >}}/tcp
: Port utilisé pour la collecte de logs via TCP.<br>
Voir les [endpoints de logs][3] pour les autres types de connexion.

10255/tcp
: Port utilisé pour le [kubelet HTTP Kubernetes][4]

10250/tcp
: Port utilisé pour le [kubelet HTTPS Kubernetes][4]

#### Trafic entrant

Ports utilisés pour les services de l'Agent qui communiquent entre eux en local au sein du host uniquement.

5000/tcp
: Port utilisé pour le [serveur go_expvar][5]

5001/tcp
: Port sur lequel l'API IPC écoute le trafic

5002/tcp
: Port utilisé pour [accéder à l'interface graphique de l'Agent depuis le navigateur][6]

8125/udp
: Port utilisé pour DogStatsD, sauf si `dogstatsd_non_local_traffic` est défini sur true. Ce port est disponible sur localhost : `127.0.0.1`, `::1`, `fe80::1`.

8126/tcp
: Port utilisé pour le [récepteur de l'APM][7]

[1]: /fr/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /fr/integrations/ntp/#overview
[3]: /fr/logs/log_collection/#datadog-logs-endpoints
[4]: /fr/agent/basic_agent_usage/kubernetes/
[5]: /fr/integrations/go_expvar/
[6]: /fr/agent/basic_agent_usage/#gui
[7]: /fr/tracing/
{{% /tab %}}
{{% tab "Agent v5 et v4" %}}

#### Trafic sortant

443/tcp
: Port utilisé pour la plupart des données de l'Agent (métriques, APM, Live Processes/Containers)

123/udp
: Port utilisé pour le NTP ([en savoir plus sur l'importance du NTP][1]).<br>
Voir les [cibles NTP par défaut][2].
#### Trafic entrant

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

Pour obtenir des instructions détaillées sur la configuration d'un proxy, consultez la [section dédiée][12].

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
[5]: /fr/logs/
[6]: /fr/security/logs/#hipaa-enabled-customers
[7]: /fr/logs/log_collection/#datadog-logs-endpoints
[8]: /fr/infrastructure/livecontainers/#kubernetes-resources-1
[9]: /fr/real_user_monitoring/
[10]: /fr/tracing/profiler/
[11]: /fr/synthetics/private_locations
[12]: /fr/agent/proxy/