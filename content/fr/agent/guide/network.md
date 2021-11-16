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
**Le trafic est toujours généré par l'Agent et envoyé vers Datadog. Aucune session n'est jamais initialisée à partir de Datadog vers l'Agent** :

- L'intégralité du trafic est envoyé via SSL
- Destinations des données :

  - Données de l'[APM][1] : `trace.agent.`{{< region-param key="dd_site" code="true" >}}.
  - Données des [live containers][2] et des [live Processes][3] : `process.`{{< region-param key="dd_site" code="true" >}}.
  - Données des [logs][4] : `agent-intake.logs.`{{< region-param key="dd_site" code="true" >}} pour le trafic TCP, `agent-http-intake.logs.`{{< region-param key="dd_site" code="true" >}} en HTTP, et plus encore. Consultez la liste complète des [endpoints de logs][5] pour en savoir plus.
  - Données des [ressources de l'orchestrateur][6] : `orchestrator.`{{< region-param key="dd_site" code="true" >}}.
  - Données de [Real User Monitoring (RUM)][7] : `rum-http-intake.logs.`{{< region-param key="dd_site" code="true" >}}.
  - Données de [profiling][8] : `intake.profile.`{{< region-param key="dd_site" code="true" >}}.
  - Données des [logs HIPAA][9] : identiques à celles de tous les [logs][4]. Toutefois, les anciens endpoints suivants sont également pris en charge :
    - `tcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}
    - `lambda-tcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}
    - `gcp-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}
    - `http-encrypted-intake.logs.`{{< region-param key="dd_site" code="true" >}}
  - Les workers des [emplacements privés Synthetic][10] se basent sur les endpoints ci-dessous pour envoyer les résultats des tests :
      - `intake.synthetics.`{{< region-param key="dd_site" code="true" >}} pour l'envoi des résultats des tests API avec des workers version 0.1.6 ou ultérieur. Pour les workers 1.5.0 ou ultérieur, c'est le seul endpoint que vous devez configurer.
      - `intake-v2.synthetics.`{{< region-param key="dd_site" code="true" >}} pour l'envoi des résultats des tests Browser avec des workers version 0.2.0 ou ultérieur.
      - `api.`{{< region-param key="dd_site" code="true" >}} pour l'envoi des résultats de test API avec des workers dont la version est antérieure à 0.1.5.

  - Toutes les autres données de l'Agent :
      - **Agents < 5.2.0** : `app.`{{< region-param key="dd_site" code="true" >}}
      - **Agents >= 5.2.0** : `<VERSION>-app.agent.`{{< region-param key="dd_site" code="true" >}}

        Cette modification a été apportée après la découverte de la vulnérabilité POODLE. Les endpoints avec contrôle des versions sont disponibles à partir de l'Agent v5.2.0. Chaque version de l'Agent appelle un endpoint différent en fonction de la version du _Forwarder_. Par exemple, l'Agent v5.2.0 appelle `5-2-0-app.agent.`{{< region-param key="dd_site" code="true" >}}. Par conséquent, vous devez ajouter `*.agent.`{{< region-param key="dd_site" code="true" >}} à la liste blanche de vos pare-feux.

À partir de la version 6.1.0, l'Agent interroge également l'API de Datadog afin de fournir une fonctionnalité non essentielle, par exemple pour afficher la validité de la clé d'API configurée :

- **Agent >= 7.18.0/6.18.0** : `api.`{{< region-param key="dd_site" code="true" >}}
- **Agent < 7.18.0/6.18.0** : `app.`{{< region-param key="dd_site" code="true" >}}


Tous ces domaines sont des entrées **CNAME** qui pointent vers un ensemble d'adresses IP statiques. Vous pouvez trouver ces adresses sur la page `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

Les informations sont structurées au format JSON selon le schéma suivant :

```text
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
    "synthetics": {...},                // <-- non utilisé pour le trafic de l'Agent (adresses IP sources de Datadog pour les bots utilisés pour les tests Synthetics)
    "webhooks": {...}                   // <-- non utilisé pour le trafic de l'Agent (adresses IP sources de Datadog pour l'envoi des webhooks)
}
```

Chaque section possède un endpoint dédié, par exemple :

- `https://ip-ranges.{{< region-param key="dd_site" >}}/logs.json` pour les adresses IP utilisées pour recevoir les données des logs via TCP ;
- `https://ip-ranges.{{< region-param key="dd_site" >}}/apm.json` pour les adresses IP utilisées pour recevoir les données d'APM.

### Remarque

Toutes ces adresses IP doivent être ajoutées à la liste blanche. Bien qu'elles ne soient pas toutes actives en même temps, les adresses utilisées sont amenées à changer en raison des opérations de gestion et de maintenance réseau effectuées régulièrement.

## Ports ouverts

**L'intégralité du trafic sortant est protégé par SSL et envoyé via TCP/UDP.**

Ouvrez les ports suivants pour profiter de toutes les fonctionnalités de l'Agent :

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

- **Ports sortants** :

  - `443/tcp` : port pour la plupart des données de l'Agent (métriques, APM, Live Processes/conteneurs)
  - `123/udp` : NTP [(En savoir plus sur l'importance de NTP)][1]
  - `10516/tcp` : port pour la [collecte de logs][2] via TCP pour le site américain de Datadog, `443/tcp` pour le site européen de Datadog
  - `10255/tcp` : port pour le [kubelet http Kubernetes][3]
  - `10250/tcp` : port pour le [kubelet https Kubernetes][3]

- **Ports entrants (utilisés pour les services de l'Agent qui communiquent entre eux en local au sein du host uniquement)** :

  - `5000/tcp` : port pour le [serveur go_expvar][4]
  - `5001/tcp` : port sur lequel l'API IPC écoute le trafic
  - `5002/tcp` : port pour [l'accès à l'interface graphique de l'Agent depuis le navigateur][5]
  - `8125/udp` : DogStatsD ; sauf si `dogstatsd_non_local_traffic` est défini sur true. Ce port est disponible sur localhost :

      - `127.0.0.1`
      - `::1`
      - `fe80::1`

  - `8126/tcp` : port pour le [récepteur de l'APM][6]

[1]: /fr/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /fr/logs/
[3]: /fr/agent/basic_agent_usage/kubernetes/
[4]: /fr/integrations/go_expvar/
[5]: /fr/agent/basic_agent_usage/#gui
[6]: /fr/tracing/
{{% /tab %}}
{{% tab "Agent v5 et v4" %}}

- **Ports sortants** :

  - `443/tcp` : port pour la plupart des données de l'Agent (métriques, APM, Live Processes/conteneurs)
  - `123/udp` : NTP [(En savoir plus sur l'importance de NTP)][1]

- **Ports entrants** :

  - `8125/udp` : DogStatsd ; sauf si `non_local_traffic` est défini sur true. Ce port est disponible sur localhost :

      - `127.0.0.1`
      - `::1`
      - `fe80::1`

  - `8126/tcp` : port pour le [récepteur de l'APM][2]
  - `17123/tcp` : Forwarder de l'Agent, utilisé pour la mise en mémoire tampon du trafic en cas de perte de communication entre l'Agent et Datadog
  - `17124/tcp` : redirecteur pour la prise en charge de Graphite (facultatif)

[1]: /fr/agent/faq/network-time-protocol-ntp-offset-issues/
[2]: /fr/tracing/
{{% /tab %}}
{{< /tabs >}}

## Utilisation d'un proxy

Pour obtenir des instructions détaillées sur la configuration d'un proxy, consultez la [section dédiée][11].

## Mise en tampon côté Agent des données sur l'indisponibilité du réseau

Si votre réseau n'est plus disponible, l'Agent stocke les métriques en mémoire.
L'utilisation maximale de la mémoire pour le stockage des métriques est définie par le paramètre `forwarder_retry_queue_payloads_max_size`. Lorsque cette limite est atteinte, les métriques sont ignorées.

L'Agent 7.27.0 et les versions ultérieures peuvent stocker les métriques sur disque une fois la limite de mémoire atteinte.
Pour activer cette fonctionnalité, définissez le paramètre `forwarder_storage_max_size_in_bytes` sur une valeur positive correspondant au volume d'espace de stockage maximal, en octets, que l'Agent peut utiliser pour stocker les métriques sur disque.

Les métriques sont stockées dans le dossier défini par le paramètre `forwarder_storage_path`, qui prend par défaut la valeur `/opt/datadog-agent/run/transactions_to_retry` pour les systèmes Unix et `C:\ProgramData\Datadog\run\transactions_to_retry` sous Windows.

Pour veiller à ne pas utiliser tout l'espace de stockage, l'Agent stocke les métriques sur disque uniquement si le total d'espace de stockage utilisé est inférieur à 95 %. La valeur de cette limite est définie par le paramètre `forwarder_storage_max_disk_ratio`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/
[2]: /fr/infrastructure/livecontainers/
[3]: /fr/infrastructure/process/
[4]: /fr/logs/
[5]: /fr/logs/log_collection/?tab=http#datadog-logs-endpoints
[6]: /fr/infrastructure/livecontainers/#kubernetes-resources-1
[7]: /fr/real_user_monitoring/
[8]: /fr/tracing/profiler/
[9]: /fr/security/logs/#hipaa-enabled-customers
[10]: /fr/synthetics/private_locations
[11]: /fr/agent/proxy/