---
description: Mettre à niveau et configurer vos Agents à distance
further_reading:
- link: /agent/fleet_automation/
  tag: Documentation
  text: Fleet Automation
- link: /remote_configuration
  tag: Documentation
  text: Configuration à distance
title: Gestion d'Agents à distance
---

## Section Overview

La gestion d'Agents à distance simplifie le processus de mise à niveau de votre parc d'Agents en réduisant le besoin de coordination avec plusieurs outils de déploiement ou de gestion de configuration. La gestion d'Agents à distance vous donne accès à :
* **Gestion centralisée** - Mettez à niveau les Agents dans tous les environnements avec un seul outil, garantissant la cohérence avec les dernières fonctionnalités et correctifs de sécurité.
* **Visibilité et surveillance** - Suivez l'état des mises à niveau en temps réel, permettant une vérification rapide du succès du déploiement.
* **Efficacité opérationnelle** - Rationalisez le processus de mise à niveau en éliminant la coordination entre équipes et en unifiant le déploiement sur différentes plateformes.

## Prérequis

### Plateformes prises en charge

- VM Linux installées à l'aide du script d'installation ou du rôle Ansible Datadog
- VM Windows

La mise à niveau à distance d'Agents dans des environnements conteneurisés n'est pas prise en charge.

### Autorisations 
Les utilisateurs doivent disposer de l'autorisation [Agent Upgrade][2] dans Fleet Automation pour les mises à niveau, et de l'autorisation [Fleet Policies Write][2] pour configurer les Agents à distance. L'autorisation est activée par défaut sur le rôle Datadog Admin.

## Activer la gestion d'Agents à distance
1. Vérifiez que [Remote Configuration est activé pour votre organisation][15].
2. Confirmez que la version de votre Agent est 7.69 ou ultérieure (pour les hosts Windows, utilisez la version 7.71.1 ou ultérieure).
3. Assurez-vous que votre configuration de l'Agent Datadog (`datadog.yaml`) inclut `remote_updates: true`, ou définissez alternativement la variable d'environnement `DD_REMOTE_UPDATES=true`. L'activation de l'une ou l'autre option active la gestion d'Agents à distance pour l'Agent.

## Mettre à niveau les Agents à distance

### Prérequis
* **Espace disque** : Datadog suggère au moins 2 Go pour l'installation initiale de l'Agent et 2 Go supplémentaires pour la mise à niveau de l'Agent depuis Fleet Automation. Plus précisément, la mise à niveau nécessite 1,3 Go dans le répertoire `/opt/datadog-packages` sur Linux, ou `C:\ProgramData\Datadog\Installer\packages` sur Windows. L'espace supplémentaire garantit qu'il y a suffisamment de place pour maintenir temporairement deux installations d'Agent pendant le processus de mise à niveau en cas de besoin de restauration.

### Comment mettre à niveau les Agents à distance
Pour mettre à niveau vos Agents à distance :
1. [Activez la gestion d'Agents à distance](#activer-la-gestion-d-agents-a-distance).
1. Depuis l'[onglet **Upgrade Agents**][4], cliquez sur **Start Agents Upgrade**.

   {{< img src="/agent/fleet_automation/upgrade-screen.png" alt="Sélectionnez les Agents que vous souhaitez mettre à niveau." style="width:100%;" >}}
1. Sélectionnez les Agents que vous souhaitez mettre à niveau. Vous pouvez cibler un groupe d'Agents en filtrant sur les informations de host ou les tags.

   {{< img src="/agent/fleet_automation/start-agent-upgrade.png" alt="Sélectionnez les Agents que vous souhaitez mettre à niveau." style="width:100%;" >}}

1. Examinez le plan de déploiement et cliquez sur **Upgrade Agents** pour lancer la mise à niveau.

   {{< img src="/agent/fleet_automation/agent-upgrades-staged.png" alt="Examinez le plan de déploiement de mise à niveau" style="width:100%;" >}}

1. Utilisez le dashboard [Deployments][10] pour suivre le processus de mise à niveau. Cliquer sur un Agent dans le tableau des déploiements vous donne plus d'informations sur la mise à niveau, notamment la durée, la progression et l'utilisateur qui a lancé la mise à niveau.
   {{< img src="/agent/fleet_automation/deployments.png" alt="Sélectionnez les Agents que vous souhaitez mettre à niveau." style="width:100%;" >}}

### Processus de mise à niveau

Comme pour une mise à niveau manuelle, attendez-vous à un temps d'arrêt de 5 à 30 secondes pendant le redémarrage de l'Agent. Le processus de mise à niveau complet prend environ 5 minutes. Environ 2 minutes de ce temps sont utilisées pour le processus de mise à niveau. Le reste du temps est consacré à la surveillance de la mise à niveau pour garantir la stabilité et déterminer si une restauration est nécessaire. Si la mise à niveau échoue et qu'une restauration est nécessaire, l'Agent revient automatiquement à la version précédemment exécutée de l'Agent.

Le processus de mise à niveau ajoute principalement des fichiers aux répertoires suivants :

Linux :
* `/opt/datadog-packages`
* `/etc/datadog-agent`
* `/etc/systemd/system`

Windows :
* `C:\ProgramData\Datadog\Installer\packages`
* `C:\Program Files\Datadog\Datadog Agent`

L'Agent garantit que les autorisations appropriées sont définies pour ces fichiers. Aucun fichier de configuration n'est modifié pendant le processus d'installation.

### Priorité de mise à niveau

Pour une expérience de mise à niveau la plus cohérente, Datadog recommande de gérer les mises à niveau à partir d'une seule source à la fois. Utilisez Fleet Automation ou un outil de gestion de configuration. Si vous exécutez un outil de gestion de configuration sur un Agent qui a déjà été mis à niveau à l'aide de Fleet Automation, la mise à niveau ramène l'Agent à la version [`DD_AGENT_MINOR_VERSION`][9] spécifiée dans votre configuration. Si aucune `DD_AGENT_MINOR_VERSION` n'est définie, l'Agent est mis à niveau vers la dernière version disponible.


## Configurer les Agents
{{< callout url="https://www.datadoghq.com/product-preview/manage-agent-configurations-from-fleet-automation/" >}} 
La gestion des configurations d'Agent dans Fleet Automation est en <strong>version préliminaire</strong>. Pour y accéder, remplissez le formulaire d'inscription à la version préliminaire. 
{{< /callout >}}

1. Dans Fleet Automation, ouvrez l'onglet [Configure Agents][16] et cliquez sur Create Configuration.
1. Sélectionnez et configurez les produits (par exemple, APM, Logs, NDM) que vous souhaitez que les Agents cibles exécutent.

   {{< img src="/agent/fleet_automation/fa_create_agent_configuration2.png" alt="Sélectionnez le produit à activer." style="width:100%;" >}}

1. Examinez et nommez votre configuration finale et commencez à définir le périmètre de déploiement vers vos Agents. Alternativement, vous pouvez enregistrer la configuration pour la modifier ou la déployer sur vos Agents ultérieurement depuis la page Configure Agents.
1. Définissez le périmètre des Agents sur lesquels déployer la configuration (par exemple via des tags tels que les noms de hosts, le site ou l'environnement).
1. Examinez le plan de déploiement pour confirmer les Agents ciblés et les paramètres de déploiement, tels que la simultanéité du déploiement.
1. Lancez le déploiement et suivez la progression depuis la page Deployments.

### Priorité de configuration

Lorsqu'un fichier de configuration sur le host entre en conflit avec une configuration Fleet Automation, Fleet Automation a la priorité, garantissant une source unique de vérité. Consultez la section [Ordre de priorité de configuration][17].

### Modifier, déployer ou restaurer des configurations
À partir de votre liste de configurations dans l'onglet [Configure Agents][16], vous pouvez :
   - Déployer la configuration non utilisée sur vos Agents
   - Modifier la configuration, enregistrer une nouvelle version et redéployer la configuration mise à jour.
   - Restaurer la configuration vers une version précédente et la redéployer.


### Miroirs et proxies
Vous pouvez utiliser la gestion d'Agents à distance avec un proxy ou des référentiels miroirs.

Pour obtenir des instructions sur la configuration de votre Agent pour utiliser un proxy, consultez la section [Configuration du proxy de l'Agent][6]. Après avoir configuré le proxy, redémarrez l'Agent pour appliquer les paramètres.

Pour obtenir des instructions sur l'utilisation de référentiels miroirs ou isolés, consultez :
- [Synchroniser les images Datadog avec un registre de conteneurs privé][7]
- [Installer l'Agent sur un serveur avec une connectivité Internet limitée][8]

## Rétrograder les Agents

Si vous devez rétrograder un Agent, suivez les étapes de [Mettre à niveau vos Agents](#mettre-a-niveau-les-agents-a-distance) et spécifiez la version vers laquelle vous souhaitez rétrograder. Datadog recommande d'utiliser la dernière version de l'Agent et de mettre à niveau vos Agents régulièrement pour vous assurer d'avoir accès aux dernières fonctionnalités.

## Dépannage

### Programme d'installation Datadog incompatible avec l'Agent (pré-7.66)

Si vous étiez un client de la version préliminaire et avez configuré la gestion d'Agents à distance avant la version 7.66 de l'Agent, votre programme d'installation Datadog pourrait être incompatible avec l'Agent.

Pour prendre en charge la disponibilité générale des mises à niveau d'Agents à distance, le composant d'installation a été intégré à l'Agent à partir de la version 7.66. Cette modification garantit que les deux composants restent à jour ensemble, empêchant les incompatibilités de version et les problèmes de compatibilité associés. Les versions antérieures de l'Agent n'incluaient pas ces composants, entraînant une possible incompatibilité de version qui pourrait empêcher les mises à jour automatiques et la fonctionnalité de gestion d'Agents à distance.

Pour diagnostiquer et résoudre le problème :
1. Utilisez la [requête suivante dans Fleet Automation][13] pour identifier les hosts affectés :
   ```txt
   support_remote_upgrade:datadog-installer
   ```
1. Si votre configuration est impactée, [réexécutez le script d'installation][14] sur chaque Agent affecté pour les mettre à niveau manuellement vers la version 7.66 ou ultérieure de l'Agent. Cela garantit la pleine compatibilité avec les fonctionnalités de gestion d'Agents à distance.

Les mises à niveau manuelles de l'Agent ne sont pas nécessaires après avoir effectué la mise à jour vers la version 7.66 ou ultérieure. Les mises à niveau futures sont gérées automatiquement sans nécessiter d'intervention manuelle.

Si vous ne mettez pas à niveau une version antérieure de l'Agent vers la version 7.66 ou ultérieure, il n'y a aucun impact sur votre Agent existant. Cependant, les mises à niveau à distance restent indisponibles jusqu'à ce que vous mettiez à jour l'Agent.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/remote-config
[2]: /fr/account_management/rbac/permissions#fleet-automation
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/fleet/agent-upgrades
[5]: https://app.datadoghq.com/fleet/deployments
[6]: /fr/agent/configuration/proxy/
[7]: /fr/containers/guide/sync_container_images/
[8]: https://docs.datadoghq.com/fr/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
[9]: https://github.com/DataDog/agent-linux-install-script?tab=readme-ov-file#install-script-configuration-options
[10]: https://app.datadoghq.com/fleet/deployments
[13]: https://app.datadoghq.com/fleet?query=support_remote_upgrade%3Adatadog-installer
[14]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[15]: /fr/agent/guide/setup_remote_config
[16]: https://app.datadoghq.com/fleet/agent-management
[17]: https://docs.datadoghq.com/fr/agent/remote_config/?tab=configurationyamlfile#configuration-order-precedence