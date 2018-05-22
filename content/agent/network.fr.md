---
title: Trafic réseau
kind: documentation
aliases:
  - /fr/agent/proxy
  - >-
    /fr/account_management/faq/what-are-the-required-ip-s-and-ports-i-need-open-to-connect-to-the-datadog-service
  - >-
    /fr/account_management/faq/can-i-whitelist-the-ip-addresses-for-data-coming-from-datadog-via-webhook-and-integrations
further_reading:
  - link: logs/
    tag: Documentation
    text: Collectez vos logs
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Collectez vos processus
  - link: tracing
    tag: Documentation
    text: Collectez vos traces
---
**Le trafic est toujours initié par l'Agent vers Datadog. Aucune session n'est jamais initiée depuis Datadog vers l'Agent.**

* Tout le traffic est envoyé en SSL
* La destination de toutes les données d'[APM][1] est `trace.agent.datadoghq.com`
* La destination de toutes les données de [Live Containers][2] est `process.datadoghq.com`
* La destination de tous les [Logs][3] est `intake.logs.datadoghq.com`
* La destination de toutes les autres données d'Agent est
  * **Agents < 5.2.0** `app.datadoghq.com`
  *  **Agents >= 5.2.0** `<version>-app.agent.datadoghq.com`

Cette décision a été prise après le problème POODLE, les endpoints versionnés commencent avec l'agent 5.2.0, c'est-à-dire que chaque version de l'Agent à un endpoint différent basé sur la version du *forwarder* utilisé.

* i.e. Agent 5.2.0 envoie à  `5-2-0-app.agent.datadoghq.com`  

En conséquence whitelistez `* .agent.datadoghq.com` dans vos firewalls.

Ces domaines sont des **CNAME** pointant vers un ensemble d'adresses IP statiques, ces adresses peuvent être trouvées à:

* **[https://ip-ranges.datadoghq.com][4]**

Les informations sont structurées en JSON suivant ce schéma:

```
{
    "version": 1,                       // <-- we increment this every time the information is changed
    "modified": "YYYY-MM-DD-HH-MM-SS",  // <-- the timestamp of the last modification
    "agents": {                         // <-- in this section the IPs used for the Agent traffic intake
        "prefixes_ipv4": [              // <-- a list of IPv4 CIDR blocks
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [              // <-- a list of IPv6 CIDR blocks
            ...
        ]
    },
    "webhooks": {                       // <-- same structure as "agents" but this section is not relevant
        ...                             //     for Agent traffic (webhooks delivered by Datadog to the internet)
    }
}
```

## Port ouverts

**Tout le traffic sortant est envoyé en TCP SSL sur le port 443.**

Ouvrez les ports suivant afin de bénéficier de toutes les fonctionnalités de l'Agent:

### Agent v6

* `123/UDP`: NTP - [Plus d'information sur l'importance de NTP][5].
* `5000/tcp`: port pour le [serveur go_expvar][6]
* `5001/tcp`: port sur lequel l'API de IPC écoute
* `5002/tcp`: port pour [L'interface graphique de l'Agent dans le navigateur][7]
* `8125/udp`: dogstatsd

    Sauf si `dogstatsd_non_local_traffic` est défini sur true. Ce port est disponible sur le localhost:

    * `127.0.0.1`
    * `::1` 
    * `fe80::1`
* `8126/tcp`: port pour le [récepteur de traces APM][1]
* `10516/tcp`: port pour la [collecte de log][3]
* `10255/tcp`: port pour le [Kubelet http de Kubernetes][8]
* `10250/tcp`: port pour le [Kubelet https de Kubernetes][8]

### Agent v4 et v5 

* `123/UDP`: NTP - [Plus d'information sur l'importance de NTP][5].
* **`8125/udp`**: dogstatsd

  Sauf si `non_local_traffic` est défini sur true. Ces ports sont disponibles sur le localhost:

  * `127.0.0.1`
  * `::1` 
  * `fe80::1`

* `8126/tcp`: port pour le [récepteur de traces APM][1]
* **`17123/tcp`**: forwarder de l'Agent, utilisé pour bufferiser le trafic si le réseau est
* **`17124/tcp`**: adaptateur graphite optionnel

## Utiliser des proxies

Pour un guide de configuration détaillé sur la configuration du proxy, rendez-vous sur la page [Configuration du proxy][9].

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing
[2]: /graphing/infrastructure/livecontainers
[3]: /logs
[4]: https://ip-ranges.datadoghq.com
[5]: /agent/faq/network-time-protocol-ntp-offset-issues/
[6]: /integrations/go_expvar/
[7]: /agent/#using-the-gui
[8]: /agent/basic_agent_usage/kubernetes/
[9]: /agent/proxy