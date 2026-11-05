---
description: Mettez à niveau les Agents Datadog à distance à l'aide de Fleet Automation.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentation
  text: Fleet Automation
- link: /api/latest/fleet-automation/
  tag: Documentation
  text: API Fleet Automation
site_support_id: fleet-automation-standard-features
title: Mettre à niveau les agents
---
Fleet Automation vous permet de mettre à niveau à distance les Agents Datadog sur l'ensemble de votre parc sans accès direct aux hosts individuels. Vous pouvez déclencher les mises à niveau immédiatement, les planifier pendant les fenêtres de maintenance ou les automatiser via l'API.

## Prérequis {#prerequisites}

- [Remote Configuration][7] activée pour votre organisation et la clé d'API de l'Agent
- [Remote updates][8] activées sur chaque Agent de VM cible (`remote_updates: true`)
- Agent version 7.71.1 ou ultérieure pour Windows et 7.69.0 ou ultérieure pour Linux
- Des VM Linux ou des VM Windows
- Au moins 2 GB d'espace disque pour l'installation initiale de l'Agent, plus 2 GB supplémentaires pour les mises à niveau. (La mise à niveau nécessite 1.3 GB dans `/opt/datadog-packages` sur Linux ou `C:\ProgramData\Datadog\Installer\packages` sur Windows. L'espace supplémentaire permet de conserver temporairement deux installations de l'Agent pendant la mise à niveau au cas où un retour à la version précédente serait nécessaire.)

<div class="alert alert-info">
La mise à niveau à distance des Agents dans les charges de travail conteneurisées n'est pas prise en charge.
</div>

## Mettre à niveau les Agents immédiatement {#upgrade-agents-immediately}

1. Depuis l'onglet [{{< ui >}}Upgrades{{< /ui >}}][1], cliquez sur {{< ui >}}Upgrade Now{{< /ui >}}.

   {{< img src="/agent/fleet_automation/upgrade-screen2.png" alt="L'onglet Upgrades avec le bouton Upgrade Now." style="width:100%;" >}}
1. Sélectionnez les Agents à mettre à niveau. Filtrez par informations du host ou par tags pour cibler un groupe spécifique.

   {{< img src="/agent/fleet_automation/start-agent-upgrade.png" alt="Écran de sélection des Agents avec des options de filtrage pour restreindre la liste des Agents à mettre à niveau." style="width:100%;" >}}

1. Examinez le plan de déploiement et cliquez sur {{< ui >}}Upgrade Agents{{< /ui >}} pour lancer la mise à niveau.

   {{< img src="/agent/fleet_automation/agent-upgrades-staged.png" alt="Vue du plan de déploiement affichant la liste des Agents prêts pour la mise à niveau." style="width:100%;" >}}

1. Suivez la progression sur le dashboard [Deployments][2]. Cliquez sur un Agent dans le tableau des déploiements pour afficher la durée, la progression et l'utilisateur qui a lancé la mise à niveau.
   {{< img src="/agent/fleet_automation/deployments.png" alt="Dashboard Deployments affichant la progression et les détails de la mise à niveau pour chaque Agent." style="width:100%;" >}}

## Planifier les mises à niveau des Agents {#schedule-agent-upgrades}

1. Depuis [l'onglet {{< ui >}}Upgrades{{< /ui >}}][1], cliquez sur {{< ui >}}\+ Create Schedule{{< /ui >}}.

1. Sur la page Upgrade Schedule, ajoutez un {{< ui >}}Schedule name{{< /ui >}}.

1. Sélectionnez la version de l'Agent. Vous pouvez effectuer une mise à niveau vers la dernière version, la version précédente ou celle d'avant. 

   {{< img src="/agent/fleet_automation/agent_upgrade_select_version1.png" alt="Consultez la liste des mises à niveau des Agents planifiées." style="width:100%;" >}}

1. Spécifiez les Agents à mettre à niveau. Filtrez par informations du host ou par tags pour cibler un groupe spécifique.
   
   {{< img src="/agent/fleet_automation/agent_upgrade_select_agents.png" alt="Consultez la liste des Agents à mettre à niveau." style="width:100%;" >}}

1. Définissez la fenêtre de déploiement pour ces mises à niveau. Vous pouvez sélectionner les jours, la plage horaire et le fuseau horaire pour la mise à niveau.

   {{< img src="/agent/fleet_automation/agent_upgrade_set_window.png" alt="Sélectionnez la plage horaire pour les mises à niveau de vos Agents." style="width:100%;" >}}

1. Configurez les notifications pour les mises à jour du statut de déploiement. Informez votre équipe via des services connectés à Datadog, tels que Slack, Teams ou PagerDuty.

   {{< img src="/agent/fleet_automation/agent_upgrade_set_notification.png" alt="Sélectionnez les personnes ou les canaux à notifier concernant la progression de la mise à niveau." style="width:100%;" >}}

1. Cliquez sur {{< ui >}}Create Schedule{{< /ui >}} pour enregistrer le planning. 

1. Consultez la liste de vos mises à niveau planifiées dans [l'onglet {{< ui >}}Upgrades{{< /ui >}}][1], dans la section {{< ui >}}Upgrade Schedules{{< /ui >}}. 

   {{< img src="/agent/fleet_automation/agent_upgrade_schedule_list3.png" alt="Consultez la liste des mises à niveau planifiées pour vos Agents." style="width:100%;" >}}

## Mettre à niveau les Agents avec l'API {#upgrade-agents-with-the-api}

Fleet Automation fournit une API pour déclencher les mises à niveau des Agents par programmation ou selon un planning récurrent. Lancez les mises à niveau pour tout ensemble de hosts avec des requêtes de filtrage, ou créez des plannings qui s'exécutent pendant des fenêtres de maintenance définies avec une version d'Agent spécifiée. Pour plus de détails, consultez l'[API Fleet Automation][3].

## Processus de mise à niveau {#upgrade-process}

Comme lors d'une mise à niveau manuelle, attendez-vous à un downtime de 5-30 secondes pendant le redémarrage de l'Agent. Le processus complet de mise à niveau prend environ 5 minutes : environ 2 minutes pour la mise à niveau elle-même, le temps restant étant consacré à la surveillance de la stabilité. Si la mise à niveau échoue, l'Agent revient automatiquement à la version précédente.

Le processus de mise à niveau ajoute principalement des fichiers aux répertoires suivants :

Linux :
- `/opt/datadog-packages`
- `/etc/datadog-agent`
- `/etc/systemd/system`

Windows :
- `C:\ProgramData\Datadog\Installer\packages`
- `C:\Program Files\Datadog\Datadog Agent`

L'Agent définit les autorisations appropriées pour ces fichiers. Aucun fichier de configuration n'est modifié pendant la mise à niveau.

## Priorité de mise à niveau {#upgrade-precedence}

Datadog recommande de gérer les mises à niveau à partir d'une seule source à la fois. Utilisez soit Fleet Automation, soit un outil de gestion de configuration, mais pas les deux. Si vous exécutez un outil de gestion de configuration sur un Agent qui a été mis à niveau via Fleet Automation, l'outil rétablit l'Agent à la version [`DD_AGENT_MINOR_VERSION`][4] définie dans votre configuration. Si `DD_AGENT_MINOR_VERSION` n'est pas défini, l'Agent est mis à niveau vers la dernière version disponible.

## Dépannage {#troubleshooting}

### Remote Agent Management n'est pas activé {#remote-agent-management-is-not-enabled}

Si le panneau latéral de l'Agent indique **Remote Agent Management: NOT ENABLED**, suivez [Activer Remote Agent Management][8] pour activer `remote_updates` sur le host et redémarrer l'Agent. Remote Configuration peut être connectée alors que Remote updates est désactivée.

Si l'Agent est toujours indisponible pour les mises à niveau, vérifiez les [prérequis](#prerequisites), la connectivité de Remote Configuration et si Datadog Installer est en cours d'exécution.

### La version de l'Agent nouvellement publiée n'est pas encore disponible pour la mise à niveau {#newly-released-agent-version-is-not-yet-available-for-upgrade}

Après la publication d'une nouvelle version de l'Agent, il peut s'écouler jusqu'à 24 heures avant qu'elle n'apparaisse comme cible de mise à niveau dans Fleet Automation. Si une version récemment publiée est absente du sélecteur de mise à niveau, attendez jusqu'à 24 heures et réessayez.

### Datadog Installer incompatible avec l'Agent (antérieur à 7.66) {#datadog-installer-incompatible-with-agent-pre-766}

Si vous étiez client pendant la phase Preview et que vous avez configuré Remote Agent Management avant la version 7.66 de l'Agent, votre Datadog Installer pourrait être incompatible avec l'Agent.

À partir de la version 7.66, le composant d'installation est fourni avec l'Agent. Cela permet de maintenir les deux composants synchronisés et d'éviter les incompatibilités de version qui peuvent bloquer la gestion à distance. Les versions précédentes de l'Agent n'incluaient pas Datadog Installer, ce qui peut entraîner des problèmes de compatibilité.

Pour diagnostiquer et résoudre le problème :

1. Utilisez la [requête suivante dans Fleet Automation][5] pour identifier les hosts concernés :
   ```txt
   support_remote_upgrade:datadog-installer
   ```
1. Si votre configuration est impactée, [réexécutez le script d'installation][6] sur chaque Agent concerné pour effectuer la mise à niveau vers une version de l'Agent qui répond aux [prérequis](#prerequisites).

Après la mise à jour, [activez Remote Agent Management][8] pour utiliser Fleet Automation lors des futures mises à niveau. Si vous n'effectuez pas la mise à niveau, l'Agent existant continue de fonctionner, mais les mises à niveau à distance restent indisponibles.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-upgrades
[2]: https://app.datadoghq.com/fleet/deployments
[3]: /fr/api/latest/fleet-automation/
[4]: https://github.com/DataDog/agent-linux-install-script?tab=readme-ov-file#install-script-configuration-options
[5]: https://app.datadoghq.com/fleet?query=support_remote_upgrade%3Adatadog-installer
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[7]: /fr/agent/guide/setup_remote_config
[8]: /fr/agent/guide/setup_remote_config/#enable-remote-agent-management