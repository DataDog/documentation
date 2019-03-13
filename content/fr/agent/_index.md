---
title: Agent
kind: documentation
description: Installer et configurer l'Agent pour recueillir des données
further_reading:
  - link: logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Recueillir vos processus
  - link: tracing/
    tag: Documentation
    text: Recueillir vos traces
  - link: agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
    tag: Documentation
    text: "Pourquoi installer l'Agent sur des instances AWS\_?"
  - link: 'https://www.datadoghq.com/blog/dont-fear-the-agent/'
    tag: Blog
    text: Tout ce que vous devez savoir sur l'Agent
aliases:
  - /fr/agent/faq/agent-check-directory-structure
  - /fr/agent/faq/install-core-extra/
---
<div class="alert alert-info">
L'Agent v6 est disponible. <a href="/agent/faq/upgrade-to-agent-v6">Passez à la dernière version</a> pour profiter des nouvelles fonctionnalités.
</div>

## En quoi consiste l'Agent ?

L'Agent Datadog est un logiciel qui s'exécute sur vos hosts. Il recueille les événements et les métriques des hosts et les envoie à la plateforme Datadog, à partir de laquelle vous pouvez analyser vos données de surveillance et de performance. L'Agent Datadog est open source et son code source est disponible sur GitHub dans [DataDog/datadog-agent][1].

{{< partial name="platforms/platforms.html" >}}

## Architecture de l'Agent

{{< tabs >}}
{{% tab "Agent v6" %}}

L'Agent v6 est une toute nouvelle version rédigée en Go de l'Agent v5. La version 6 offre de meilleures performances, une empreinte moins conséquente et des fonctionnalités exclusives. Il s'agit de l'Agent Datadog par défaut (la version 5 n'est plus en développement actif).

L'Agent v6 est composé d'un processus principal responsable de la collecte des logs et des métriques d'infrastructure, ainsi que de la réception des métriques DogStatsD. Les composants principaux de ce processus sont les suivants :

* Le collecteur s'occupe d'exécuter les checks et de recueillir les métriques.
* Le redirecteur envoie des charges utiles à Datadog.

Deux processus facultatifs sont appliqués par l'Agent s'ils sont activés dans le fichier de configuration `datadog.yaml` :

* L'Agent APM est un processus qui permet de recueillir des traces (activé par défaut).
* L'Agent de processus permet de recueillir les informations de processus en direct. Par défaut, il recueille uniquement les conteneurs disponibles. Si ce n'est pas le cas, il est désactivé.

Sur Windows, les services sont énumérés comme suit :

| Service               | Description             |
|-----------------------|-------------------------|
| DatadogAgent          | "Agent Datadog"         |
| datadog-trace-agent   | "Agent de trace Datadog"   |
| datadog-process-agent | "Agent de processus Datadog" |

Par défaut, l'Agent lie 3 ports sur Linux et 4 sur Windows et OSX :

| Port | Description                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Expose les métriques d'exécution à propos de l'Agent.                                                    |
| 5001 | Utilisé par l'interface de ligne de commande et l'interface graphique de l'Agent pour envoyer des commandes et récupérer des informations à partir de l'Agent actif. |
| 5002 | Sert le serveur de l'interface graphique sur Windows et OSX.                                                   |
| 8125 | Utilisé pour le serveur DogStatsD afin de recevoir des métriques externes.                                  |

### Le collecteur
Le collecteur regroupe toutes les métriques standard toutes les 15 secondes. L'Agent v6 intègre un interpréteur Python 2.7 pour exécuter les intégrations et les [checks custom][1].

### Le redirecteur

Le redirecteur de l'Agent envoie à Datadog des métriques au format HTTPS. La mise en mémoire tampon empêche les divisions de réseau d'avoir un impact sur la transmission de métriques. Elles sont mises en mémoire tampon jusqu'à atteindre une certaine limite de taille ou de nombre de demandes en attente à envoyer. Les métriques les plus anciennes sont alors supprimées pour que l'empreinte de la mémoire du redirecteur reste gérable. Les logs sont envoyés à Datadog par connexion TCP avec un chiffrement SSL.

### DogStatsD
Dans la version 6, DogStatsD est une implémentation Golang du daemon d'agrégation des métriques [StatsD d'Etsy][2]. Il est utilisé pour recevoir et déployer des métriques arbitraires via le protocole UDP ou sur un socket Unix, ce qui permet d'instrumenter du code personnalisé sans que l'ensemble du code souffre de latence. En savoir plus sur [DogStatsD][3].


[1]: /fr/developers/write_agent_check/?tab=agentv6
[2]: https://github.com/etsy/statsd
[3]: /fr/developers/dogstatsd
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/agent5architecture.jpg" alt="Architecture de l'Agent v5" responsive="true">}}

L'Agent v5 est composé de quatre éléments majeurs, chacun rédigé en Python et exécuté en tant que processus distinct :

* **Collecteur** (`agent.py`) : le collecteur exécute des checks sur la machine actuelle pour les [intégrations][1] configurées, et enregistre les métriques du système, portant par exemple sur la mémoire et le processeur.
* **DogStatsD** (`dogstatsd.py`) : il s'agit d'un serveur backend compatible avec StatsD auquel vous pouvez envoyer des [métriques custom][2] à partir de vos applications.
* **Redirecteur** (`ddagent.py`) : le redirecteur récupère les données de DogStatsD et du collecteur, les met en attente et les envoie à Datadog.
* **SupervisorD** : toute la solution est contrôlée par un unique processus de supervision. Celui-ci est séparé afin de limiter le traitement de chaque application si vous n'exécutez pas tous les éléments (peu conseillé).

**Remarque** : pour les utilisateurs de Windows, les quatre processus de l'Agent apparaissent sous forme d'instances de `ddagent.exe`, avec la description `DevOps’ best friend`.

### Supervision, privilèges et ports réseau
Un processus principal SupervisorD s'exécute en tant qu'utilisateur `dd-agent`, tout comme l'ensemble des sous-processus dupliqués. Cela s'applique également à n'importe quel appel de système (`iostat`/`netstat`) initié par l'Agent Datadog. La configuration de l'Agent est définie dans `/etc/dd-agent/datadog.conf` et `/etc/dd-agent/conf.d`. Toutes les configurations doivent être lisibles par `dd-agent`. Les autorisations recommandées sont 0600, car les fichiers de configuration contiennent votre clé d'API et d'autres identifiants nécessaires pour accéder aux métriques.

Les ports suivants acceptent les opérations :

| Port      | Description                         |
|-----------|-------------------------------------|
| tcp/17123 | Le redirecteur pour les opérations normales |
| tcp/17124 | Le redirecteur pour la prise en charge de Graphite  |
| udp/8125  | DogStatsD                           |

Tous les processus d'écoute sont par défaut liés à `127.0.0.1` et/ou à `::1` pour la version 3.4.1 et les versions ultérieures de l'Agent. Dans les versions antérieures, ils étaient liés à `0.0.0.0` (toutes les interfaces). Pour en savoir plus sur l'exécution de l'Agent via un proxy, consultez la section [Configuration de l'Agent pour un proxy][3]. Pour en savoir plus sur les plages d'IP à autoriser, consultez la section [Trafic réseau][4]. 

Il est recommandé de prévoir 1 024 descripteurs de fichiers ouverts. Vous pouvez consulter cette valeur avec la commande `ulimit -a`. Si une limite stricte est inférieure à la valeur recommandée est stricte, par exemple Shell Fork Bomb Protection, vous pouvez ajouter le code suivant dans `superisord.conf` :

```
[supervisord]
minfds = 100  # Votre limite stricte
```

### Le collecteur
Le collecteur recueille la totalité des métriques standard toutes les 15 secondes. Il prend également en charge l'exécution de checks basés sur Python, fournis par l'utilisateur et stockés dans `/etc/dd-agent/checks.d`. Les checks fournis par l'utilisateur doivent hériter de la classe abstraite AgentCheck définie dans `checks/init.py`. Consultez la section [Écrire un check custom d'Agent][5] pour en savoir plus.

### Le redirecteur
Le redirecteur de l'Agent écoute les requêtes entrantes via HTTP pour envoyer à Datadog des métriques au format HTTPS. La mise en mémoire tampon empêche les divisions de réseau d'avoir un impact sur la transmission de métriques. Elles sont mises en mémoire tampon jusqu'à atteindre une certaine limite de taille ou de nombre de demandes en attente à envoyer. Les métriques les plus anciennes sont alors supprimées pour que l'empreinte de la mémoire du redirecteur reste gérable.

### DogStatsD
DogStatsD est une implémentation Python du daemon d'agrégation des métriques [StatsD d'Etsy][6]. Il est utilisé pour recevoir et déployer des métriques arbitraires via le protocole UDP, ce qui permet d'instrumenter du code personnalisé sans que l'ensemble du code souffre de latence. En savoir plus sur [DogStatsD][7].


[1]: /fr/integrations
[2]: /fr/developers/metrics/custom_metrics
[3]: /fr/agent/proxy/?tab=agentv5
[4]: /fr/agent/faq/network
[5]: /fr/developers/write_agent_check/?tab=agentv5
[6]: https://github.com/etsy/statsd
[7]: /fr/developers/dogstatsd
{{% /tab %}}
{{< /tabs >}}

## Interface de ligne de commande

La nouvelle interface de ligne de commande pour l'Agent v6 est basée sur un système de sous-commandes :

| Commandes           | Remarques                                                                      |
|-------------------|----------------------------------------------------------------------------|
| `check`           | Exécute le check spécifié                                                    |
| `configcheck`     | Affiche toutes les configurations chargées et résolues d'un Agent en cours d'exécution              |
| `diagnose`        | Exécute un diagnostic de connectivité sur votre système                         |
| `flare`           | Recueille et envoie un flare à Datadog                                     |
| `health`          | Affiche la santé actuelle de l'Agent                                             |
| `help`            | Aide pour toutes les commandes                                                     |
| `hostname`        | Affiche le hostname utilisé par l'Agent                                       |
| `import`          | Importe et convertit des fichiers de configuration à partir des versions précédentes de l'Agent |
| `installservice`  | Installe l'Agent dans le gestionnaire de contrôle de service                      |
| `launch-gui`      | Démarre l'interface graphique de l'Agent Datadog                                               |
| `regimport`       | Importe les paramètres de registre dans datadog.yaml                             |
| `remove-service`  | Supprime l'Agent du gestionnaire de contrôle de service                         |
| `restart-service` | Redémarre l'Agent dans le gestionnaire de contrôle de service                      |
| `start`           | Démarre l'Agent                                                            |
| `start-service`   | Démarre l'Agent dans le gestionnaire de contrôle de service                        |
| `status`          | Affiche le statut actuel                                                   |
| `stopservice`     | Arrête l'Agent dans le gestionnaire de contrôle de service                         |
| `version`         | Affiche des informations sur la version                                                     |


Pour exécuter une sous-commande, commencez par invoquer le binaire de l'Agent :
```
<chemin_vers_emplacement_agent> <sous_commande> <options>
```

Certaines options disposent de leur propre ensemble de flags et d'options détaillés dans un message d'aide. Par exemple, pour découvrir comment utiliser la sous-commande `check`, exécutez :
```
<agent_binaire> check --help
```

## L'interface graphique

Vous pouvez configurer le port sur lequel l'interface graphique exécute le fichier `datadog.yaml`. Pour désactiver l'interface graphique, définissez la valeur du port sur `-1`.
Pour Windows et macOS, l'interface graphique est activée par défaut et s'exécute sur le port `5002`. Pour Linux, l'interface graphique est désactivée par défaut.

Lorsque l'Agent est en cours d'exécution, utilisez la commande `datadog-agent launch-gui` pour ouvrir l'interface graphique dans votre navigateur web par défaut.

**Remarque** : l'interface graphique de l'Agent n'est pas prise en charge par les plateformes Windows 32 bits.

### Exigences

1. Les cookies doivent être activés dans votre navigateur. L'interface graphique génère et enregistre un token dans votre navigateur, qui est utilisé pour authentifier toutes les communications effectuées avec le serveur de l'interface graphique.

2. Pour lancer l'interface graphique, l'utilisateur doit disposer des autorisations nécessaires. Si vous pouvez ouvrir `datadog.yaml`, vous pouvez utiliser l'interface graphique.

3. Pour des raisons de sécurité, l'interface graphique est **uniquement** accessible à partir de l'interface de réseau locale (```localhost```/```127.0.0.1```). Vous devez donc utiliser le même host que celui exécuté par l'Agent. Ainsi, vous ne pouvez pas exécuter l'Agent sur une machine virtuelle ou un conteneur et y accéder à partir de la machine du host.

## Versions des systèmes d'exploitation prises en charge

{{< tabs >}}
{{% tab "Agent v6" %}}

| Système d'exploitation                                | Versions prises en charge                                                         |
|-----------------------------------|----------------------------------------------------------------------------|
| [Amazon][1]                       | Amazon Linux 2                                                             |
| [Debian x86_64][2]                | Debian 7 (wheezy) et versions ultérieures (nous prenons en charge SysVinit avec l'Agent 6.6.0 et versions ultérieures) |
| [Ubuntu x86_64][3]                | Ubuntu 14.04 et versions ultérieures                                                     |
| [RedHat/CentOS x86_64][4]         | RedHat/CentOS 6 et versions ultérieures                                                  |
| [Docker][5]                       | 1.12 et versions ultérieures                                                    |
| [Kubernetes][6]                   | 1.3 et versions ultérieures                                                     |
| [SUSE Enterprise Linux x86_64][7] | SUSE 11 SP4 et versions ultérieures (nous ne prenons pas en charge SysVinit)                         |
| [Fedora x86_64][8]                | Fedora 26 et versions ultérieures                                                        |
| [macOS][9]                        | macOS 10.12 et versions ultérieures                                                      |
| [Windows server 64 bits][10]       | Windows Server 2008r2 et versions ultérieures                                             |
| [Windows 64 bits][10]              | Windows 7 et versions ultérieures                                                         |

**Remarque** : l'installation de la [source][11] peut fonctionner sur des systèmes d'exploitation non mentionnés et est prise en charge dans la mesure du possible.

[1]: /fr/agent/basic_agent_usage/amazonlinux/?tab=agentv6
[2]: /fr/agent/basic_agent_usage/deb
[3]: /fr/agent/basic_agent_usage/ubuntu
[4]: /fr/agent/basic_agent_usage/redhat
[5]: /fr/agent/docker
[6]: /fr/agent/basic_agent_usage/kubernetes
[7]: /fr/agent/basic_agent_usage/suse
[8]: /fr/agent/basic_agent_usage/fedora
[9]: /fr/agent/basic_agent_usage/osx
[10]: /fr/agent/basic_agent_usage/windows
[11]: /fr/agent/basic_agent_usage/source
{{% /tab %}}
{{% tab "Agent v5" %}}

| Système d'exploitation                                | Versions prises en charge             |
|-----------------------------------|--------------------------------|
| [Amazon][1]                       | Amazon Linux 2                 |
| [Debian x86_64][2]                | Debian 7 (wheezy) et versions ultérieures    |
| [Ubuntu x86_64][3]                | Ubuntu 12.04 et versions ultérieures         |
| [RedHat/CentOS x86_64][4]         | RedHat/CentOS 5 et versions ultérieures      |
| [Docker][5]                       | 1.12 et versions ultérieures        |
| [Kubernetes][6]                   | 1.3 et versions ultérieures         |
| [SUSE Enterprise Linux x86_64][7] | SUSE 11 SP4 et versions ultérieures          |
| [Fedora x86_64][8]                | Fedora 26 et versions ultérieures            |
| [MacOS][9]                        | macOS 10.10 et versions ultérieures          |
| [Windows server 64 bits][10]       | Windows Server 2008r2 et versions ultérieures |
| [Windows 64 bits][10]              | Windows 7 et versions ultérieures             |

**Remarque** : l'installation de la [source][11] peut fonctionner sur des systèmes d'exploitation non mentionnés et est prise en charge dans la mesure du possible.


[1]: /fr/agent/basic_agent_usage/amazonlinux/?tab=agentv5
[2]: /fr/agent/basic_agent_usage/deb
[3]: /fr/agent/basic_agent_usage/ubuntu
[4]: /fr/agent/basic_agent_usage/redhat
[5]: /fr/agent/docker
[6]: /fr/agent/basic_agent_usage/kubernetes
[7]: /fr/agent/basic_agent_usage/suse
[8]: /fr/agent/basic_agent_usage/fedora
[9]: /fr/agent/basic_agent_usage/osx
[10]: /fr/agent/basic_agent_usage/windows
[11]: /fr/agent/basic_agent_usage/source
{{% /tab %}}
{{< /tabs >}}

## Traitement de l'Agent

Vous trouverez ci-dessous un exemple de la consommation en ressources de l'Agent Datadog. Des tests ont été effectués sur une instance `c5.xlarge` de machine EC2 AWS (4 VCPU/8 Go de RAM). Le `datadog-agent` de base s'exécutait avec un check de processus pour surveiller l'Agent. La consommation de ressources de l'Agent peut augmenter avec davantage d'intégrations.
L'activation des checks JMX force l'Agent à utiliser plus de mémoire selon le nombre de beans exposés par les JVM surveillés. L'activation des Agents de trace et de processus augmente également la consommation de ressources.

{{< tabs >}}
{{% tab "Agent v6" %}}

* Version test de l'Agent : 6.7.0
* Processeur : ~ 0,12 % du processeur utilisé en moyenne
* Mémoire : ~ 60 Mo de RAM utilisés (mémoire RSS)
* Débit du réseau : ~ 86 B/s ▼ | 260 B/s ▲
* Disque :
  * Linux 350 Mo à 400 Mo selon la distribution
  * Windows : 260 Mo

{{% /tab %}}
{{% tab "Agent v5" %}}

* Version test de l'Agent : 5.24.0
* Processeur : ~ 0,35 % du processeur utilisé en moyenne
* Mémoire : ~ 115 Mo de RAM utilisés.
* Débit du réseau : ~ 1 900 B/s ▼ | 800 B/s ▲
* Disque :
  * Linux 312 Mo
  * Windows : 295 Mo

**Remarque** : depuis la v5.15 de l'Agent de conteneur, nous vous recommandons de définir les ressources du conteneur sur 256 Mo minimum suite à l'ajout de cache en mémoire. L'augmentation de la limite n'a pas pour but de revoir à la hausse l'utilisation habituelle, mais plutôt de s'adapter aux pics temporaires. La version 6 de l'Agent dispose d'une empreinte mémoire beaucoup plus limitée.

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent