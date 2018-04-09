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
## Sécurité réseau

1. **Le trafic est toujours initié par l'Agent vers Datadog. Aucune session n'est jamais initiée depuis Datadog vers l'Agent.**
2. Tout le traffic est envoyé en SSL
3. La destination de toutes les données d'agent est
    1. **Agents < 5.2.0** `app.datadoghq.com`
    1. **Agents >= 5.2.0** `<version>-app.agent.datadoghq.com`

Cette décision a été prise après le problème POODLE, les endpoints versionnés commencent avec l'agent 5.2.0, c'est-à-dire que chaque version de l'agent à un endpoint différent basé sur la version du *forwarder* utilisé.

* i.e. Agent 5.2.0 envoie à  `5-2-0-app.agent.datadoghq.com`  

En conséquence whitelistez `* .agent.datadoghq.com` dans vos firewalls.

Ces domaines sont des **CNAME** pointant vers un ensemble d'adresses IP statiques, ces adresses peuvent être trouvées à:

* [https://ip-ranges.datadoghq.com][1]

Les informations sont structurées en JSON suivant ce schéma:

```
{
    "version": 1,                       // <-- we increment this every time the information is changed
    "modified": "YYYY-MM-DD-HH-MM-SS",  // <-- the timestamp of the last modification
    "agents": {                         // <-- in this section the IPs used for the agent traffic intake
        "prefixes_ipv4": [              // <-- a list of IPv4 CIDR blocks
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [              // <-- a list of IPv6 CIDR blocks
            ...
        ]
    },
    "webhooks": {                       // <-- same structure as "agents" but this section is not relevant
        ...                             //     for agent traffic (webhooks delivered by Datadog to the internet)
    }
}
```

## Port ouverts

### Agent v6

  * **`8125/udp`**: dogstatsd

  Sauf si `dogstatsd_non_local_traffic` est défini sur true. Ce port est disponible sur le localhost:

  * `127.0.0.1`
  * `::1` 
  * `fe80::1`

### Agent v4 et v5 

  * **`17123/tcp`**: forwarder de l'Agent, utilisé pour bufferiser le trafic si le réseau est
  partagé entre l'agent et Datadog
  * **`17124/tcp`**: adaptateur graphite optionnel
  * **`8125/udp`**: dogstatsd

  Sauf si `non_local_traffic` est défini sur true. Ces ports sont disponibles sur le localhost:

  * `127.0.0.1`
  * `::1` 
  * `fe80::1`

## Utiliser des proxies

Pour un guide de configuration détaillé sur la configuration du proxy, rendez-vous sur la page [Configuration du proxy][2].

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com
[2]: /agent/proxy
