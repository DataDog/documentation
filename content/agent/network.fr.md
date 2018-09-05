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

Cette décision a été prise après la faille de sécurité POODLE, les endpoints versionnés commencent avec l'agent 5.2.0, c'est-à-dire que chaque version de l'Agent a un endpoint différent basé sur la version du *forwarder* utilisé.

* i.e. Agent 5.2.0 envoie à  `5-2-0-app.agent.datadoghq.com`  

En conséquence whitelistez `* .agent.datadoghq.com` dans vos firewalls.

Ces domaines sont des **CNAME** pointant vers un ensemble d'adresses IP statiques, ces adresses peuvent être trouvées à l'adresse suivante:

* **[https://ip-ranges.datadoghq.com][4]**

Les informations sont structurées en JSON suivant ce schéma:

```
{
    "version": 1,                       // <-- la version est incrémentée lors de modifications
    "modified": "YYYY-MM-DD-HH-MM-SS",  // <-- le timestamp de la dernière modification
    "agents": {                         // <-- dans cette section, les IPs utilisées par l'agent pour envoyer des métriques
        "prefixes_ipv4": [              // <-- une liste d'IPv4 CIDR blocks
            "a.b.c.d/x",
            ...
        ],
        "prefixes_ipv6": [              // <-- une liste d'IPv6 CIDR blocks
            ...
        ]
    },
    "apm": {...},                       // <-- même structure que "agents" mais pour envoyer les données de l'agent APM
    "logs": {...},                      // <-- idem, pour les logs
    "process": {...},                   // <-- idem, pour les données des processus
    "api": {...},                       // <-- ne s'applique pas à l'agent (envoi de données sur api.datadoghq.com)
    "webhooks": {...}                   // <-- ne s'applique pas à l'agent (IPs source pour l'envoi sur des webhooks)
}
```

Si une seule de ces sections vous intéresse, pour chacune des sections il existe une URL dédiée suivant le format `https://ip-ranges.datadoghq.com/<section>.json`. Par exemple:

* [https://ip-ranges.datadoghq.com/logs.json][10] pour les IPs utilisées pour le traffic des logs
* [https://ip-ranges.datadoghq.com/apm.json][11] pour les IPs utilisées pour le traffic APM

### Note

Vous devriez autoriser *toutes* ces IPs pour identifier le trafic provenant/à destination de Datadog. Ces IPs ne sont pas toujours toutes actives, à tout moment leur état peut changer entre actif/inactif sans avertissement (pour une opération de maintenance de Datadog ou de nos fournisseurs d'hébergement).

## Ports ouverts

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
[10]: https://ip-ranges.datadoghq.com/logs.json
[11]: https://ip-ranges.datadoghq.com/apm.json
