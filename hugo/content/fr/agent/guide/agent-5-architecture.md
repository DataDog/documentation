---
disable_toc: false
private: true
title: Architecture de l'Agent 5
---

Cette page couvre l'architecture de l'Agent 5. Pour en savoir plus sur l'architecture de la dernière version de l'Agent, consultez la section [Architecture de l'Agent][1].

{{< img src="agent/agent5architecture.jpg" alt="Architecture de l'Agent v5" >}}

L'Agent 5 est composé de quatre composants majeurs, chacun écrit en Python et exécuté en tant que processus séparé :

* **Collector** (`agent.py`) : le collector exécute des checks sur la machine actuelle pour les [intégrations][2] configurées et capture les métriques système, telles que la mémoire et le processeur. 
* **DogStatsD** (`dogstatsd.py`) : il s'agit d'un serveur backend compatible StatsD auquel vous pouvez envoyer des [métriques custom][3] depuis vos applications.
* **Forwarder** (`ddagent.py`) : le forwarder récupère les données de DogStatsD et du collector, les met en file d'attente pour envoi, puis les envoie à Datadog.
* **SupervisorD** : le collector, le serveur DogStatsD et le forwarder sont tous contrôlés par un seul processus superviseur. Le superviseur est maintenu séparé pour limiter la surcharge de chaque application si vous n'exécutez pas toutes les parties. Cependant, il est généralement recommandé d'exécuter toutes les parties.

**Remarque** : pour les utilisateurs de Windows, les quatre processus de l'Agent apparaissent sous forme d'instances de `ddagent.exe`, avec la description `DevOps' best friend`.

### Supervision, privilèges et ports réseau

Un processus principal SupervisorD s'exécute en tant qu'utilisateur `dd-agent`, et tous les sous-processus créés s'exécutent en tant que même utilisateur. Cela s'applique également à tout appel système (`iostat`, `netstat`) initié par l'Agent Datadog. La configuration de l'Agent se trouve dans `/etc/dd-agent/datadog.conf` et `/etc/dd-agent/conf.d`. Toute la configuration doit être lisible par `dd-agent`. Les autorisations recommandées sont `0600`, car les fichiers de configuration contiennent votre clé API et d'autres identifiants nécessaires pour accéder aux métriques.

Les [ports][4] suivants sont ouverts pour les opérations :

| Port      | Rôle                         |
|-----------|-------------------------------------|
| tcp/17123 | Utilisé par le Forwarder pour les opérations normales |
| tcp/17124 | Utilisé par le Forwarder pour la prise en charge de Graphite  |
| udp/8125  | DogStatsD                           |

Tous les processus d'écoute sont liés par défaut à `127.0.0.1` ou `::1` ou les deux, sur les versions d'Agent 3.4.1 ou ultérieures. Dans les versions antérieures, ils étaient liés à `0.0.0.0` (toutes les interfaces). Pour plus d'informations sur l'exécution de l'Agent via un proxy, consultez la section [Configuration du proxy de l'Agent][5]. Pour plus d'informations sur les plages d'adresses IP à autoriser, consultez la section [Trafic réseau][6].

Nous vous conseillons de prévoir 1024 descripteurs de fichiers ouverts. Vous pouvez consulter cette valeur avec la commande `ulimit -a`. Si vous êtes contraint d'utiliser une valeur plus faible en raison d'une limite stricte (par exemple si l'option Shell Fork Bomb Protection est activée), vous pouvez ajouter la ligne suivante dans `supervisord.conf` :

```conf
[supervisord]
minfds = 100  # Votre limite stricte
```

[1]: /fr/agent/architecture
[2]: /fr/integrations/
[3]: /fr/metrics/custom_metrics/
[4]: /fr/agent/configuration/network/?tab=agentv5v4#open-ports
[5]: /fr/agent/configuration/proxy/?tab=agentv5
[6]: /fr/agent/faq/network/