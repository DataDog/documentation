---
title: Utilisation de base de l'Agent
kind: documentation
aliases:
  - /fr/guides/basic_agent_usage/
  - /fr/agent/faq/where-is-the-configuration-file-for-the-agent/
  - /fr/agent/faq/log-location
further_reading:
  - link: /agent/faq/how-datadog-agent-determines-the-hostname/
    tag: FAQ
    text: "Comment Datadog détermine-t-il le hostname de l'Agent\_?"
  - link: /agent/guide/agent-commands/
    tag: FAQ
    text: Liste de toutes les commandes de l'Agent
  - link: /agent/guide/agent-configuration-files/
    tag: FAQ
    text: Emplacement de l'ensemble des fichiers de configuration de l'Agent
---
{{< partial name="platforms/platforms.html" links="platforms" >}}

## Architecture de l'Agent

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

Les Agents v6 et v7 sont composés d'un processus principal responsable de la collecte des logs et des métriques d'infrastructure, ainsi que de la réception des [métriques DogStatsD][1]. Les composants principaux de ce processus sont les suivants :

* Le Collector s'occupe d'exécuter les checks et de recueillir les métriques.
* Le Forwarder envoie des charges utiles à Datadog.

Deux processus facultatifs sont générés par l'Agent s'ils sont activés dans le fichier de configuration `datadog.yaml` :

* L'Agent APM est un processus qui permet de recueillir des [traces][2] (activé par défaut).
* L'Agent de processus permet de recueillir les informations de live processes. Par défaut, il recueille uniquement les conteneurs disponibles. Si ce n'est pas le cas, il est désactivé.

Sur Windows, les services sont énumérés comme suit :

| Service               | Description             |
|-----------------------|-------------------------|
| DatadogAgent          | "Agent Datadog"         |
| datadog-trace-agent   | "Agent de traces Datadog"   |
| datadog-process-agent | "Agent de processus Datadog" |

Par défaut, l'Agent ouvre 3 [ports][3] sur Linux et 4 sur Windows et OSX :

| Port | Description                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Expose les métriques runtime à propos de l'Agent.                                                    |
| 5001 | Utilisé par l'interface de ligne de commande et l'interface graphique de l'Agent pour envoyer des commandes et récupérer des informations à partir de l'Agent actif. |
| 5002 | Dessert le serveur graphique sur Windows et OSX.                                                   |
| 8125 | Utilisé pour le serveur DogStatsD afin de recevoir des métriques externes.                                  |

### Collector

Le Collector récupère toutes les métriques standard toutes les 15 secondes. L'Agent v6 intègre un interpréteur Python 2.7 pour exécuter les intégrations et les [checks custom][4].

### Forwarder

Le Forwarder de l'Agent envoie les métriques à Datadog via HTTPS. Une mise en mémoire tampon est effectuée afin d'assurer la bonne transmission des métriques en cas de problème de communication. Les métriques sont mises en mémoire tampon jusqu'à ce que la taille du tampon ou le nombre de requêtes en attente d'envoi atteigne un certain seuil. Les métriques les plus anciennes sont alors supprimées de façon à limiter l'empreinte mémoire du Forwarder. Les logs sont envoyés à Datadog via TCP avec chiffrement SSL.

### DogStatsD

Dans la version 6, DogStatsD est une implémentation Golang du daemon d'agrégation des métriques [StatsD d'Etsy][5]. Il est utilisé pour recueillir et rassembler des métriques arbitraires via le protocole UDP ou un socket Unix, ce qui permet d'instrumenter du code personnalisé sans augmenter la latence de votre application. En savoir plus sur [DogStatsD][6].

[1]: /fr/developers/metrics/dogstatsd_metrics_submission/#metrics
[2]: /fr/tracing/guide/terminology/
[3]: /fr/agent/guide/network/#open-ports
[4]: /fr/developers/custom_checks/write_agent_check/
[5]: https://github.com/etsy/statsd
[6]: /fr/developers/metrics/dogstatsd_metrics_submission/
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/agent5architecture.jpg" alt="Architecture de l'Agent v5" >}}

L'Agent v5 est composé de quatre éléments majeurs, chacun écrit en Python et exécuté en tant que processus distinct :

* **Collector** (`agent.py`) : le Collector exécute les checks sur la machine actuelle pour les [intégrations][1] configurées. Il enregistre également des métriques système, portant par exemple sur la mémoire et le processeur.
* **DogStatsD** (`dogstatsd.py`) : il s'agit d'un serveur backend compatible avec StatsD auquel vous pouvez envoyer des [métriques custom][2] à partir de vos applications.
* **Forwarder** (`ddagent.py`) : le Forwarder récupère les données de DogStatsD et du Collector, les met en attente et les envoie à Datadog.
* **SupervisorD** : toute la solution est contrôlée par un unique processus de supervision. Celui-ci est séparé afin de limiter la charge système de chaque application si vous n'exécutez pas tous les éléments (peu conseillé).

**Remarque** : pour les utilisateurs de Windows, les quatre processus de l'Agent apparaissent sous forme d'instances de `ddagent.exe`, avec la description `DevOps' best friend`.

### Supervision, privilèges et ports réseau

Un processus principal SupervisorD s'exécute en tant qu'utilisateur `dd-agent`, tout comme l'ensemble des sous-processus dupliqués. Cela s'applique également à n'importe quel appel de système (`iostat`/`netstat`) initié par l'Agent Datadog. La configuration de l'Agent est définie dans `/etc/dd-agent/datadog.conf` et `/etc/dd-agent/conf.d`. Toutes les configurations doivent être lisibles par `dd-agent`. Les autorisations recommandées sont 0600, car les fichiers de configuration contiennent votre clé d'API et d'autres identifiants nécessaires pour accéder aux métriques.

Les ports[3] suivants acceptent les opérations :

| Port      | Description                         |
|-----------|-------------------------------------|
| tcp/17123 | Utilisé par le Forwarder pour les opérations normales |
| tcp/17124 | Utilisé par le Forwarder pour la prise en charge de Graphite  |
| udp/8125  | DogStatsD                           |

Par défaut, tous les processus d'écoute sont liés à `127.0.0.1` et/ou `::1` pour les versions 3.4.1+ de l'Agent. Dans les versions antérieures, ils étaient liés à `0.0.0.0` (toutes les interfaces). Pour en savoir plus sur l'exécution de l'Agent via un proxy, consultez la section [Configuration de l'Agent pour un proxy][4]. Pour en savoir plus sur les plages d'IP à autoriser, consultez la section [Trafic réseau][5].

Nous vous conseillons de prévoir 1024 descripteurs de fichiers ouverts. Vous pouvez consulter cette valeur avec la commande `ulimit -a`. Si vous êtes contraint d'utiliser une valeur plus faible en raison d'une limite stricte (par exemple si l'option Shell Fork Bomb Protection est activée), vous pouvez ajouter la ligne suivante dans `superisord.conf` :

```conf
[supervisord]
minfds = 100  # Votre limite stricte
```

[1]: /fr/integrations/
[2]: /fr/developers/metrics/custom_metrics/
[3]: /fr/agent/guide/network/?tab=agentv5v4#open-ports
[4]: /fr/agent/proxy/?tab=agentv5
[5]: /fr/agent/faq/network/
{{% /tab %}}
{{< /tabs >}}

## Interface graphique

Vous pouvez configurer le port sur lequel l'interface graphique exécute le fichier `datadog.yaml`. Pour désactiver l'interface graphique, définissez la valeur du port sur `-1`. Sous Windows et macOS, l'interface graphique est activée par défaut et s'exécute sur le port `5002`. Sous Linux, l'interface graphique est désactivée par défaut.

Lorsque l'Agent est en cours d'exécution, utilisez la commande `datadog-agent launch-gui` pour ouvrir l'interface graphique dans votre navigateur web par défaut.

**Remarque** : l'interface graphique de l'Agent n'est pas prise en charge par les plateformes Windows 32 bits.

### Prérequis

1. Les cookies doivent être activés dans votre navigateur. L'interface graphique génère et enregistre un token dans votre navigateur, qui est utilisé pour authentifier toutes les communications effectuées avec le serveur de l'interface graphique.

2. Pour lancer l'interface graphique, l'utilisateur doit disposer des autorisations nécessaires. Si vous pouvez ouvrir `datadog.yaml`, vous pouvez utiliser l'interface graphique.

3. Pour des raisons de sécurité, l'interface graphique est **uniquement** accessible à partir de l'interface réseau locale (`localhost`/`127.0.0.1`). Vous devez donc utiliser le même host que celui sur lequel l'Agent est exécuté. En d'autres termes, vous ne pouvez pas exécuter l'Agent sur une machine virtuelle ou un conteneur et y accéder à partir de la machine du host.

## Plateformes prises en charge

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Plateforme                                 | Versions prises en charge                                        |
|------------------------------------------|-----------------------------------------------------------|
| [Amazon Linux][1]                        | Amazon Linux 2                                            |
| [Debian][2] avec systemd                 | Debian 7 (wheezy) et versions ultérieures                                        |
| [Debian][2] avec SysVinit                | Debian 7 (wheezy) et versions ultérieures avec l'Agent 6.6.0+                        |
| [Ubuntu][3]                              | Ubuntu 14.04 et versions ultérieures                                             |
| [RedHat/CentOS][4]                       | RedHat/CentOS 6 et versions ultérieures                                          |
| [Docker][5]                              | 1.12 et versions ultérieures                                             |
| [Kubernetes][6]                          | 1.3 et versions ultérieures                                              |
| [SUSE Enterprise Linux][7] avec systemd  | SUSE 11 SP4 et versions ultérieures                                              |
| [SUSE Enterprise Linux][7] avec SysVinit | SUSE 11 SP4 avec l'Agent 7.16.0+                              |
| [Fedora][8]                              | Fedora 26 et versions ultérieures                                                |
| [macOS][9]                               | macOS 10.12 et versions ultérieures                                              |
| [Windows Server][10]                     | Windows Server 2008 R2+ et Server Core (Nano Server non pris en charge) |
| [Windows][10]                            | Windows 7 et versions ultérieures                                                |
| [Système d'exploitation Windows Azure Stack HCI][10]         | Toutes les versions                                              |

**Remarques** : 
- Les packages en version 64 bits x86 sont disponibles pour toutes les plateformes de cette liste. Les packages Arm v8 sont disponibles pour toutes les plateformes, à l'exception de Windows et macOS.
- L'installation depuis les [sources][11] peut fonctionner sur des systèmes d'exploitation non mentionnés et est prise en charge dans la mesure du possible.
- Les versions 6 et ultérieures de l'Agent Datadog prennent en charge Windows Server 2008 R2, avec les dernières mises à jour Windows installées. Toutefois, Windows Server 2008 R2 fait état d'un [problème connu relatif à la dérive de l'horloge et à Go][12].

[1]: /fr/agent/basic_agent_usage/amazonlinux/
[2]: /fr/agent/basic_agent_usage/deb/
[3]: /fr/agent/basic_agent_usage/ubuntu/
[4]: /fr/agent/basic_agent_usage/redhat/
[5]: /fr/agent/docker/
[6]: /fr/agent/basic_agent_usage/kubernetes/
[7]: /fr/agent/basic_agent_usage/suse/
[8]: /fr/agent/basic_agent_usage/fedora/
[9]: /fr/agent/basic_agent_usage/osx/
[10]: /fr/agent/basic_agent_usage/windows/
[11]: /fr/agent/basic_agent_usage/source/
[12]: https://github.com/golang/go/issues/24489
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plateforme                   | Versions prises en charge     |
|----------------------------|------------------------|
| [Amazon Linux][1]          | Amazon Linux 2         |
| [Debian][2]                | Debian 7 (wheezy) et versions ultérieures     |
| [Ubuntu][3]                | Ubuntu 12.04 et versions ultérieures          |
| [RedHat/CentOS][4]         | RedHat/CentOS 5 et versions ultérieures       |
| [Docker][5]                | 1.12 et versions ultérieures          |
| [Kubernetes][6]            | Version 1.3 à 1.8     |
| [SUSE Enterprise Linux][7] | SUSE 11 SP4 et versions ultérieures           |
| [Fedora][8]                | Fedora 26 et versions ultérieures             |
| [macOS][9]                 | macOS 10.10 et versions ultérieures           |
| [Windows Server][10]       | Windows Server 2008r2 et versions ultérieures |
| [Windows][10]              | Windows 7 et versions ultérieures             |

**Remarques** :

- L'installation depuis les [sources][11] peut fonctionner sur des systèmes d'exploitation non mentionnés et est prise en charge dans la mesure du possible.

[1]: /fr/agent/basic_agent_usage/amazonlinux/?tab=agentv5
[2]: /fr/agent/basic_agent_usage/deb/
[3]: /fr/agent/basic_agent_usage/ubuntu/
[4]: /fr/agent/basic_agent_usage/redhat/
[5]: /fr/agent/docker/
[6]: /fr/agent/basic_agent_usage/kubernetes/
[7]: /fr/agent/basic_agent_usage/suse/
[8]: /fr/agent/basic_agent_usage/fedora/
[9]: /fr/agent/basic_agent_usage/osx/
[10]: /fr/agent/basic_agent_usage/windows/
[11]: /fr/agent/basic_agent_usage/source/
[12]: https://github.com/golang/go/issues/24489
{{% /tab %}}
{{% tab "Agent Unix" %}}

| Plateforme | Versions prises en charge                        |
|----------|-------------------------------------------|
| [AIX][1] | AIX 6.1 TL9 SP6, 7.1 TL5 SP3, 7.2 TL3 SP0 |

[1]: /fr/agent/basic_agent_usage/aix/
{{% /tab %}}
{{< /tabs >}}

## Interface de ligne de commande

L'interface de ligne de commande pour l'Agent v6 est basée sur un système de sous-commandes.

```text
<CHEMIN_BINAIRE_AGENT> <SOUS_COMMANDE> <OPTIONS>
```

| Sous-commande        | Remarques                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | Exécute le check spécifié.                                                    |
| `configcheck`     | Affiche toutes les configurations chargées et résolues d'un Agent en cours d'exécution.              |
| `diagnose`        | Exécute un diagnostic de connectivité sur votre système.                              |
| `flare`           | [Recueille et envoie un flare à Datadog][1].                                |
| `health`          | Affiche la santé actuelle de l'Agent.                                             |
| `help`            | Affiche des informations d'aide pour n'importe quelle commande.                                                     |
| `hostname`        | Affiche le hostname utilisé par l'Agent.                                       |
| `import`          | Importe et convertit les fichiers de configuration d'une version précédente de l'Agent. |
| `installservice`  | Installe l'Agent dans le gestionnaire de contrôle des services.                       |
| `launch-gui`      | Démarre l'interface graphique de l'Agent Datadog.                                                |
| `regimport`       | Importe les paramètres de registre dans `datadog.yaml`.                           |
| `remove-service`  | Supprime l'Agent du gestionnaire de contrôle des services.                          |
| `restart`         | [Redémarrez l'Agent][2].                                                     |
| `restart-service` | Redémarre l'Agent dans le gestionnaire de contrôle des services.                       |
| `start`           | [Démarre l'Agent][3].                                                       |
| `start-service`   | Démarre l'Agent dans le gestionnaire de contrôle des services.                         |
| `status`          | [Affiche le statut actuel de l'Agent][4].                                        |
| `stop`            | [Arrête l'Agent][5].                                                        |
| `stopservice`     | Arrête l'Agent dans le gestionnaire de contrôle des services.                          |
| `version`         | Affiche les informations sur la version.                                                         |

**Remarque** : certaines options disposent de leur propre ensemble de flags et d'options, que vous pouvez consulter avec la sous-commande help. Par exemple, pour découvrir comment utiliser la sous-commande `check`, exécutez :

```text
<CHEMIN_BINAIRE_AGENT> check --help
```

## Charge de l'Agent

Vous trouverez ci-dessous un exemple de la consommation en ressources de l'Agent Datadog. Les tests ont été effectués sur une instance `c5.xlarge` de machine EC2 AWS (4 VCPU/8 Go de RAM), où le `datadog-agent` de base était exécuté avec un check de processus pour surveiller l'Agent. La consommation en ressources de l'Agent peut augmenter avec davantage d'intégrations.
L'activation des checks JMX force l'Agent à utiliser plus de mémoire selon le nombre de beans exposés par les JVM surveillées. L'activation des Agents de traces et de processus augmente également la consommation en ressources.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

* Version de l'Agent testé : 6.7.0
* Processeur : ~ 0,12 % du processeur utilisé en moyenne
* Mémoire : ~ 60 Mo de RAM utilisés (mémoire RSS)
* Bande passante réseau : ~ 86 B/s ▼ | 260 B/s ▲
* Disque :
  * Linux : 350 Mo à 400 Mo selon la distribution
  * Windows : 260 Mo

{{% /tab %}}
{{% tab "Agent v5" %}}

* Version de l'Agent testé : 5.24.0
* Processeur : ~ 0,35 % du processeur utilisé en moyenne
* Mémoire : ~ 115 Mo de RAM utilisés
* Bande passante réseau : ~ 1 900 B/s ▼ | 800 B/s ▲
* Disque :
  * Linux : 312 Mo
  * Windows : 295 Mo

**Remarque** : depuis la v5.15 de l'Agent de conteneur, nous vous conseillons d'allouer au moins 256 Mo de mémoire au conteneur en raison d'un cache plus large. L'augmentation de la limite ne signifie pas que la charge normale est plus haute qu'avant : il s'agit plutôt de faire face aux pics temporaires. La version 6 de l'Agent dispose d'une empreinte mémoire beaucoup plus limitée.

{{% /tab %}}
{{< /tabs >}}

**Collecte de logs** :

Les mesures ci-dessous reflètent la collecte de *110 Ko de logs par seconde* à partir d'un fichier, avec le [redirecteur HTTP][6] activé. Elles montrent l'évolution de l'utilisation des ressources pour les différents niveaux de compression disponibles.

{{< tabs >}}
{{% tab "Compression HTTP niveau 6" %}}

* Version de l'Agent testé : 6.15.0
* Processeur : ~ 1,5 % du processeur utilisé en moyenne
* Mémoire : ~ 95 Mo de RAM utilisés
* Bande passante réseau : ~ 14 KB/s ▲
* Disque :
  * Linux : 350 Mo à 400 Mo selon la distribution
  * Windows : 260 Mo

{{% /tab %}}
{{% tab "Compression HTTP niveau 1" %}}

* Version de l'Agent testé : 6.15.0
* Processeur : ~ 1 % du processeur utilisé en moyenne
* Mémoire : ~ 95 Mo de RAM utilisés
* Bande passante réseau : ~ 20 KB/s ▲
* Disque :
  * Linux : 350 Mo à 400 Mo selon la distribution
  * Windows : 260 Mo

{{% /tab %}}
{{% tab "Pas de compression HTTP" %}}

* Version de l'Agent testé : 6.15.0
* Processeur : ~ 0,7 % du processeur utilisé en moyenne
* Mémoire : ~ 90 Mo de RAM utilisés (mémoire RSS)
* Bande passante réseau : ~ 200 KB/s ▲
* Disque :
  * Linux : 350 Mo à 400 Mo selon la distribution
  * Windows : 260 Mo

{{% /tab %}}
{{< /tabs >}}

## Concepts avancés de l'Agent Datadog

### Mise à jour de l'Agent

Pour mettre à jour manuellement les composants principaux de l'Agent Datadog depuis et vers une version mineure sur un host donné, exécutez la [commande d'installation correspondant à votre plateforme][7].

Remarque : si vous souhaitez mettre à jour manuellement une intégration spécifique, consultez le [guide de gestion des intégrations][8].

### Fichiers de configuration

[Consultez la documentation relative aux fichiers de configuration de l'Agent][9].

### Site Datadog

Modifiez le [fichier de configuration principal de l'Agent][10] `datadog.yaml` pour définir le paramètre `site` (valeur par défaut : `datadoghq.com`).

```yaml
site: {{< region-param key="dd_site" >}}
```

### Emplacement des logs

[Consultez la documentation relative aux fichiers de log de l'Agent][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/troubleshooting/send_a_flare/
[2]: /fr/agent/guide/agent-commands/#restart-the-agent
[3]: /fr/agent/guide/agent-commands/#start-the-agent
[4]: /fr/agent/guide/agent-commands/#service-status
[5]: /fr/agent/guide/agent-commands/#stop-the-agent
[6]: /fr/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings#agent
[8]: /fr/agent/guide/integration-management/
[9]: /fr/agent/guide/agent-configuration-files/
[10]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[11]: /fr/agent/guide/agent-log-files/