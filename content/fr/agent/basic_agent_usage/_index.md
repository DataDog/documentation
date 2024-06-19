---
aliases:
- /fr/guides/basic_agent_usage/
- /fr/agent/faq/where-is-the-configuration-file-for-the-agent/
- /fr/agent/faq/log-location
further_reading:
- link: /agent/faq/how-datadog-agent-determines-the-hostname/
  tag: FAQ
  text: Comment Datadog détermine-t-il le hostname de l'Agent ?
- link: /agent/configuration/agent-commands/
  tag: FAQ
  text: Liste de toutes les commandes de l'Agent
- link: /agent/configuration/agent-configuration-files/
  tag: FAQ
  text: Emplacement de l'ensemble des fichiers de configuration de l'Agent
- link: https://www.datadoghq.com/blog/engineering/performance-improvements-in-the-datadog-agent-metrics-pipeline/
  tag: Blog
  text: Amélioration des performances dans le pipeline des métriques de l'Agent Datadog
title: Utilisation de base de l'Agent
---

{{< partial name="platforms/platforms.html" links="platforms" >}}

## Gérer l'Agent

Vous pouvez gérer votre installation de l'Agent à l'aide de l'interface graphique Datadog Agent Manager ou depuis l'interface de ligne de commande.

### Interface graphique Datadog Agent Manager

<div class="alert alert-info">L'interface graphique de l'Agent n'est pas prise en charge par les plateformes Windows 32 bits.</div>

L'interface graphique Datadog Agent Manager vous permet d'accomplir ce qui suit :
- Visualiser les informations de statut de votre Agent
- Consulter les checks en cours d'exécution
- Passer en revue le log de l'Agent
- Modifier le fichier de configuration de l'Agent (`datadog.yaml`)
- Ajouter ou modifier des checks d'Agent
- Envoyer des flares

L'interface graphique Datadog Agent Manager est activée par défaut sous Windows et macOS. Elle s'exécute sur le port `5052`. La commande `datadog-agent launch-gui` vous permet d'ouvrir l'interface graphique dans votre navigateur Web par défaut.

Vous pouvez modifier le port par défaut de l'interface graphique depuis le fichier de configuration `datadog.yaml`. Pour désactiver l'interface graphique, définissez la valeur du port sur `-1`. Sous Linux, l'interface graphique est désactivée par défaut.

Prérequis de l'interface graphique :
- Les cookies doivent être activés dans votre navigateur. L'interface graphique génère et enregistre un token dans votre navigateur, qui est utilisé pour authentifier toutes les communications effectuées avec le serveur de l'interface graphique.
- Pour lancer l'interface graphique, l'utilisateur doit disposer des autorisations nécessaires. Si vous pouvez ouvrir `datadog.yaml`, vous pouvez utiliser l'interface graphique.
- Pour des raisons de sécurité, l'interface graphique est **uniquement** accessible à partir de l'interface réseau locale (`localhost`/`127.0.0.1`). Vous devez donc utiliser le même host que celui sur lequel l'Agent est exécuté. Vous ne pouvez pas exécuter l'Agent sur une machine virtuelle ou un conteneur et y accéder à partir de la machine du host.

### Interface de ligne de commande

Depuis la version 6 de l'Agent, l'interface de ligne de commande de l'Agent repose sur des sous-commandes. Pour obtenir la liste complète des sous-commandes, consultez la section [Commandes de l'Agent][2].

## Concepts avancés de l'Agent Datadog

### Mise à jour de l'Agent

Pour mettre à jour manuellement les composants principaux de l'Agent Datadog depuis et vers une version mineure sur un host donné, exécutez la [commande d'installation correspondant à votre plateforme][7].

**Remarque** : si vous souhaitez mettre à jour manuellement une intégration d'Agent spécifique, consultez le [guide de gestion des intégrations][8].

### Fichiers de configuration

Consultez la [documentation relative aux fichiers de configuration de l'Agent][9].

### Site Datadog

Modifiez le [fichier de configuration principal de l'Agent][10] `datadog.yaml` pour définir le paramètre `site` (valeur par défaut : `datadoghq.com`).

```yaml
site: {{< region-param key="dd_site" >}}
```

**Remarque** : consultez la section [Débuter avec les sites Datadog][11] pour en savoir plus sur le paramètre `site`.

### Emplacement des logs

Consultez la section [Fichiers de log de l'Agent][12].

## Charge de l'Agent

Vous trouverez ci-dessous un exemple de la consommation en ressources de l'Agent Datadog. Les tests ont été effectués sur une instance `c5.xlarge` de machine Amazon EC2 (4 VCPU/8 Go de RAM). Des performances similaires ont été obtenues avec des instances basées sur ARM64 dotées de ressources similaires. Le `datadog-agent` de base était exécuté avec un check de processus pour surveiller l'Agent. La consommation en ressources de l'Agent peut augmenter avec davantage d'intégrations. L'activation des checks JMX force l'Agent à utiliser plus de mémoire selon le nombre de beans exposés par les JVM surveillées. L'activation des Agents de trace et de processus augmente également la consommation en ressources.

* Version de l'Agent testé : 7.34.0
* Processeur : ~ 0,08 % du processeur utilisé en moyenne
* Mémoire : ~ 130 Mo de RAM utilisés (mémoire RSS)
* Bande passante réseau : ~ 140 B/s ▼ | 800 B/s ▲
* Disque :
  * Linux : 830 Mo à 880 Mo selon la distribution
  * Windows : 870 Mo

**Collecte de logs** :

Les mesures ci-dessous reflètent la collecte de *110 Ko de logs par seconde* à partir d'un fichier, avec le [redirecteur HTTP][6] activé. Elles montrent l'évolution de l'utilisation des ressources pour les différents niveaux de compression disponibles.

{{< tabs >}}
{{% tab "Compression HTTP niveau 6" %}}

* Version de l'Agent testé : 6.15.0
* Processeur : ~ 1,5 % du processeur utilisé en moyenne
* Mémoire : ~ 95 Mo de RAM utilisés
* Bande passante réseau : ~ 14 KB/s ▲

{{% /tab %}}
{{% tab "Compression HTTP niveau 1" %}}

* Version de l'Agent testé : 6.15.0
* Processeur : ~ 1 % du processeur utilisé en moyenne
* Mémoire : ~ 95 Mo de RAM utilisés
* Bande passante réseau : ~ 20 KB/s ▲

{{% /tab %}}
{{% tab "Pas de compression HTTP" %}}

* Version de l'Agent testé : 6.15.0
* Processeur : ~ 0,7 % du processeur utilisé en moyenne
* Mémoire : ~ 90 Mo de RAM utilisés (mémoire RSS)
* Bande passante réseau : ~ 200 KB/s ▲

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/troubleshooting/send_a_flare/
[2]: /fr/agent/configuration/agent-commands/
[6]: /fr/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /fr/agent/guide/integration-management/
[9]: /fr/agent/configuration/agent-configuration-files/
[10]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /fr/getting_started/site/
[12]: /fr/agent/configuration/agent-log-files/