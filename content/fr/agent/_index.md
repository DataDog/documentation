---
aliases:
- /fr/agent/faq/agent-check-directory-structure
- /fr/agent/faq/install-core-extra
- /fr/logs/faq/can-the-datadog-agent-be-used-to-send-only-logs
- /fr/agent/faq/the-datadog-agent-for-logs-or-traces-only
- /fr/agent/basic_agent_usage/
- /fr/guides/basic_agent_usage/
- /fr/agent/faq/where-is-the-configuration-file-for-the-agent/
- /fr/agent/faq/log-location
cascade:
- _target:
    lang: en
    path: /agent/basic_agent_usage/chef
  tags:
  - uninstall
- _target:
    lang: en
    path: /infrastructure/**/*
  algolia:
    rank: 80
    tags:
    - agent
description: Installer et configurer l'Agent pour recueillir des données
further_reading:
- link: /logs/
  tag: Documentation
  text: Recueillir vos logs
- link: /infrastructure/process/
  tag: Documentation
  text: Recueillir vos processus
- link: /tracing/
  tag: Documentation
  text: Recueillir vos traces
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentation
  text: Pourquoi installer l'Agent sur des instances cloud ?
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: Blog
  text: N'ayez pas peur de l'Agent
title: Agent
---
<div class="alert alert-info">
L'Agent v7 est disponible. <a href="/agent/versions/upgrade_to_agent_v7">Mettez à niveau vers la version la plus récente</a> pour bénéficier de toutes les nouvelles fonctionnalités.
</div>

## Aperçu

L'Agent Datadog est un logiciel qui s'exécute sur vos hôtes. Il collecte des événements et des métriques à partir des hôtes et les envoie à Datadog, où vous pouvez analyser vos données de surveillance et de performance. L'Agent Datadog est open source et son code source est disponible sur GitHub à [DataDog/datadog-agent][1].

<br>

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog recommande de mettre à jour l'Agent Datadog à chaque version mineure et de correctif, ou, au minimum, mensuellement. </p>
<p>
La mise à niveau vers une version majeure de l'Agent Datadog et le maintien de sa mise à jour est le seul moyen pris en charge d'obtenir les dernières fonctionnalités et corrections de l'Agent.</p>
<p> <em>Il est recommandé d'installer complètement l'Agent.</em> Cependant, un package DogStatsD autonome est disponible pour Amazon Linux, CentOS, Debian, Fedora, Red Hat, SUSE et Ubuntu. Ce package est utilisé dans des environnements conteneurisés où DogStatsD fonctionne comme un sidecar ou dans des environnements exécutant un serveur DogStatsD sans la fonctionnalité complète de l'Agent.</p>
</div>

## Gestion de l'Agent

### Gestion de l'Agent avec l'Automatisation de Flotte (recommandé)
[L'Automatisation de Flotte][15] est le flux de travail principal dans l'application pour installer, mettre à niveau, configurer et dépanner l'Agent Datadog à grande échelle.

{{< img src="/agent/basic_agent_usage/basic_agent_2_july_25.png" alt="La vue d'Automatisation de Flotte qui vous permet de gérer vos Agents Datadog de manière centralisée en un seul endroit." style="width:100%;">}}


- **Voir la configuration & l'historique** : Voir chaque Agent de votre flotte, sa version, les produits activés, les fichiers de configuration et les modifications historiques depuis une seule page.
- **[Mettre à niveau les Agents obsolètes][13]** : Déclencher des mises à niveau à distance pour vos Agents afin de garder votre flotte à jour en quelques clics.
- **[Envoyer un signal de détresse pour obtenir de l'aide][14]** : Depuis l'onglet Support d'un hôte, générez un signal de détresse et attachez-le à un cas de Support existant ou nouveau sans avoir à utiliser la ligne de commande.
- **Auditer l'utilisation de la clé API** : Identifier quels Agents utilisent une clé API spécifique et faire pivoter les clés en toute sécurité.


### Interface graphique Datadog Agent Manager

<div class="alert alert-info">L'interface graphique de l'Agent n'est pas prise en charge sur les plateformes Windows 32 bits.</div>

L'interface graphique Datadog Agent Manager vous permet d'accomplir ce qui suit :
- Voir les informations de statut pour votre Agent
- Voir tous les contrôles en cours d'exécution
- Voir le journal de l'Agent
- Modifier le fichier de configuration de l'Agent (`datadog.yaml`)
- Ajouter ou modifier les contrôles de l'Agent
- Envoyer des signaux de détresse

L'interface graphique du gestionnaire d'Agent Datadog est activée par défaut sur Windows et macOS, et fonctionne sur le port `5002`. Utilisez la commande `datadog-agent launch-gui` pour ouvrir l'interface graphique dans votre navigateur web par défaut.

Vous pouvez changer le port par défaut de l'interface graphique dans votre fichier de configuration `datadog.yaml`. Pour désactiver l'interface graphique, définissez la valeur du port sur `-1`. Sur Linux, l'interface graphique est désactivée par défaut.

Prérequis de l'interface graphique :
- Les cookies doivent être activés dans votre navigateur. L'interface graphique génère et enregistre un jeton dans votre navigateur, qui est utilisé pour authentifier toutes les communications avec le serveur de l'interface graphique.
- Pour démarrer l'interface graphique, l'utilisateur doit avoir les autorisations requises. Si vous pouvez ouvrir `datadog.yaml`, vous pouvez utiliser l'interface graphique.
- Pour des raisons de sécurité, l'interface graphique ne peut **être** accessible que depuis l'interface réseau locale (`localhost`/`127.0.0.1`), vous devez donc être sur l'hôte où l'Agent est en cours d'exécution. Vous ne pouvez pas exécuter l'Agent sur une VM ou un conteneur et y accéder depuis la machine hôte.

### Interface de ligne de commande

À partir de l'Agent 6 et plus tard, l'interface de ligne de commande de l'Agent est basée sur des sous-commandes. Pour une liste complète des sous-commandes de l'Agent, voir [Commandes de l'Agent][2].

## En apprendre plus avec l'Agent Datadog

### Mettre à jour l'Agent

Pour mettre à jour manuellement les composants principaux de l'Agent Datadog depuis et vers une version mineure sur un host donné, exécutez la [commande d'installation correspondant à votre plateforme][7].

**Remarque** : Si vous souhaitez mettre à jour manuellement une intégration spécifique de l'Agent, consultez le [guide de gestion des intégrations][8].

### Fichiers de configuration

Consultez la [documentation relative aux fichiers de configuration de l'Agent][9].

### Site de Datadog

Modifiez le [fichier de configuration principal de l'Agent][10], `datadog.yaml`, pour définir le paramètre `site` (par défaut `datadoghq.com`).

```yaml
site: {{< region-param key="dd_site" >}}
```

**Remarque** : Consultez la [documentation de démarrage avec les sites Datadog][11] pour plus de détails sur le paramètre `site`.

### Emplacement des logs

Consultez la section [Fichiers de log de l'Agent][12].

## Traitement de l'Agent

Un exemple de la consommation de ressources de l'Agent Datadog est ci-dessous. Des tests ont été effectués sur une instance de machine Amazon EC2 `c5.xlarge` (4 VCPU/ 8 Go de RAM) et des performances comparables ont été observées pour les instances basées sur ARM64 avec des ressources similaires. Le `datadog-agent` standard fonctionnait avec un contrôle de processus pour surveiller l'Agent lui-même. L'activation de plus d'intégrations peut augmenter la consommation de ressources de l'Agent.
L'activation des vérifications JMX oblige l'Agent à utiliser plus de mémoire en fonction du nombre de beans exposés par les JVM surveillées. L'activation des Agents de trace et de processus augmente également la consommation de ressources.

* Version de l'Agent testé : 7.34.0
* CPU : ~ 0,08 % du CPU utilisé en moyenne
* Mémoire : ~ 130 Mo de RAM utilisés (mémoire RSS)
* Bande passante réseau : ~ 140 B/s ▼ | 800 B/s ▲
* Disque :
  * Linux 830 Mo à 880 Mo selon la distribution
  * Windows : 870 Mo

**Collecte de journaux** :

Les résultats ci-dessous proviennent d'une collecte de *110 Ko de journaux par seconde* à partir d'un fichier avec le [transmetteur HTTP][6] activé. Il montre l'évolution de l'utilisation des ressources pour les différents niveaux de compression disponibles.

{{< tabs >}}
{{% tab "Niveau de compression HTTP 6" %}}

* Version de test de l'agent : 6.15.0
* CPU : ~ 1,5 % du CPU utilisé en moyenne
* Mémoire : ~ 95 Mo de RAM utilisés.
* Bande passante réseau : ~ 14 KB/s ▲

{{% /tab %}}
{{% tab "Niveau de compression HTTP 1" %}}

* Version de test de l'agent : 6.15.0
* CPU : ~ 1 % du CPU utilisé en moyenne
* Mémoire : ~ 95 Mo de RAM utilisés.
* Bande passante réseau : ~ 20 KB/s ▲

{{% /tab %}}
{{% tab "HTTP non compressé" %}}

* Version de test de l'agent : 6.15.0
* CPU : ~ 0,7 % du CPU utilisé en moyenne
* Mémoire : ~ 90 Mo de RAM utilisés (mémoire RSS)
* Bande passante réseau : ~ 200 Ko/s ▲
 
{{% /tab %}}
{{< /tabs >}}


## Ressources supplémentaires
{{< whatsnext desc="Cette section comprend les sujets suivants :">}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u> : Installer et configurer l'agent Datadog sur Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u>Agent de cluster</u> : Installer et configurer l'agent de cluster pour Kubernetes, une version de l'agent Datadog conçue pour collecter efficacement des données de surveillance à partir d'un cluster orchestré.{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}<u>Amazon ECS</u> : Installer et configurer l'agent Datadog sur Amazon ECS.{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u> : Installer et configurer l'agent Datadog avec Amazon ECS sur AWS Fargate{{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u>IoT</u> : Installer et configurer l'agent IoT Datadog, une version de l'agent Datadog optimisée pour la surveillance des appareils IoT et des applications embarquées.{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>Collecte de journaux</u> : Activer et configurer la collecte de journaux dans l'agent Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/configuration/proxy">}}<u>Proxy</u> : Si votre configuration réseau restreint le trafic sortant, utilisez un proxy pour le trafic de l'agent.{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u>Versions</u> : L'Agent 7 est la dernière version majeure de l'Agent Datadog. Découvrez les changements entre les versions majeures de l'Agent et comment effectuer une mise à niveau.{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>Dépannage</u> : Trouvez des informations de dépannage pour l'Agent Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>Guides</u> : Ce sont des tutoriels approfondis et étape par étape pour utiliser l'Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>Sécurité</u> : Informations sur les principales capacités et fonctionnalités de sécurité disponibles pour les clients afin d'assurer la sécurité de leur environnement.{{< /nextlink >}}
  {{< nextlink href="/getting_started/observability_pipelines">}}<u>Configurer les Pipelines d'Observabilité et Datadog</u> : Déployez le Worker des Pipelines d'Observabilité en tant qu'agrégateur pour collecter, transformer et acheminer tous vos journaux et métriques vers n'importe quelle destination.{{< /nextlink >}}
{{< /whatsnext >}}

##Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: /fr/agent/configuration/agent-commands/
[6]: /fr/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /fr/agent/guide/integration-management/
[9]: /fr/agent/configuration/agent-configuration-files/
[10]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /fr/getting_started/site/
[12]: /fr/agent/configuration/agent-log-files/
[13]: /fr/agent/fleet_automation/remote_management/#remotely-upgrade-your-agents
[14]: /fr/agent/troubleshooting/send_a_flare/?tab=agent#send-a-flare-from-the-datadog-site
[15]: /fr/agent/fleet_automation