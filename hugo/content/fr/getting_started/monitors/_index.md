---
aliases:
- /fr/getting_started/application/monitors
description: Créez des monitors de métriques avec des alertes de seuil et des notifications
  personnalisées pour surveiller de manière proactive l'état du système et les problèmes
  de performances.
further_reading:
- link: /monitors/types/metric/
  tag: Documentation
  text: Monitors de métrique
- link: /monitors/notify/
  tag: Documentation
  text: Notifications de monitor
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: Centre d'apprentissage
  text: Introduction à l'observabilité
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Rejoignez une session interactive sur la création de monitors efficaces
- link: https://www.datadoghq.com/blog/how-to-audit-and-clean-up-monitors/
  tag: Blog
  text: Comment auditer et nettoyer efficacement les monitors
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: Blog
  text: 'Monitoring 101 : déclencher des alertes sur les éléments importants'
title: Débuter avec les monitors
---
## Présentation {#overview}

Avec les alertes Datadog, vous avez la possibilité de créer des monitors qui vérifient activement les métriques, la disponibilité des intégrations, les endpoints réseau, et plus encore. Utilisez des monitors pour attirer l'attention sur les systèmes qui nécessitent une observation, une inspection et une intervention.

Cette page est une introduction aux monitors et présente les instructions pour configurer un monitor de métriques. Un [monitor de métriques][1] fournit des alertes et des notifications si une métrique spécifique est supérieure ou inférieure à un certain seuil. Par exemple, un monitor de métriques peut vous alerter lorsque l'espace disque est faible.

Ce guide couvre les étapes suivantes :
- Création et configuration de monitors
- Configuration des alertes de monitor
- Personnalisation des messages de notification
- Autorisations des monitors

## Prérequis {#prerequisites}

Avant de commencer, vous devez disposer d'un compte Datadog lié à un host sur lequel le Datadog Agent est installé. Pour en savoir plus sur l'Agent, consultez le [guide de démarrage de l'Agent][2], ou accédez à [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Agent{{< /ui >}}][3] pour voir les instructions d'installation.

Pour vérifier que le Datadog Agent fonctionne correctement, assurez-vous que votre [liste d'infrastructure][4] dans Datadog est bien renseignée.

## Surveillance instantanée pour les nouvelles organisations {#instant-monitoring-for-new-organizations}

<div class="alert alert-info">Les monitors automatiques sont disponibles pour les <strong>nouvelles</strong> organisations et s'activent une fois le Datadog Agent installé.</div>

Lorsque vous installez le Datadog Agent, Datadog détecte automatiquement votre pile et crée un ensemble personnalisé de **monitors de référence**. Cela vous offre une couverture instantanée sans aucune configuration.

Les monitors automatiques peuvent inclure :
- Monitors au niveau du host (utilisation du processeur et de la mémoire)
- Monitors Kubernetes (redémarrages de pods, état des nœuds)
- Monitors APM (taux d'erreur ou latence par service)

Vous pouvez consulter ces monitors immédiatement sur la page Datadog [{{< ui >}}Monitors{{< /ui >}}][17].
À partir de là, vous pouvez les modifier, les cloner ou les désactiver comme n'importe quel autre monitor.

## Créer un monitor {#create-a-monitor}

Pour créer un monitor, accédez à [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][5] et sélectionnez {{< ui >}}Metric{{< /ui >}}.

## Configurez {#configure}

Les éléments principaux de la configuration d'un monitor sont les suivants :

- **Choisissez la méthode de détection** : comment mesurez-vous ce qui déclenchera l'alerte ? Êtes-vous préoccupé par le dépassement d'un seuil par une valeur de métrique, par le dépassement d'un seuil par un changement de valeur, par une valeur anormale ou par autre chose ?
- **Définissez la métrique** : quelle valeur surveillez-vous pour déclencher l'alerte ? L'espace disque de votre système ? Le nombre d'erreurs rencontrées lors des connexions ?
- **Définissez les conditions d'alerte** : quand un ingénieur doit-il être réveillé ?
- **Configurez les notifications et les automatisations** : quelles informations doivent figurer dans l'alerte ?
- **Définissez les autorisations et les notifications d'audit** : qui a accès à ces alertes et qui doit être averti si l'alerte est modifiée ?

### Choisissez la méthode de détection {#choose-the-detection-method}

Lorsque vous créez un monitor de métriques, {{< ui >}}Threshold Alert{{< /ui >}} est automatiquement sélectionné comme méthode de détection. Une alerte de seuil compare les valeurs de métrique à des seuils définis par l'utilisateur. L'objectif de ce monitor est d'alerter sur un seuil statique, donc aucun changement n'est nécessaire.

### Définissez la métrique {#define-the-metric}

Pour recevoir une alerte en cas d'espace disque faible, utilisez la métrique `system.disk.in_use` de l'[intégration Disk][6] et calculez la moyenne de la métrique sur `host` et `device` :

{{< img src="getting_started/monitors/monitor_query.png" alt="Définissez la métrique pour system.disk.in_use avg par host et par périphérique" style="width:100%" >}}

### Définir les conditions d'alerte {#set-alert-conditions}

Selon la [documentation de l'intégration Disk][6], `system.disk.in_use` est *la quantité d'espace disque utilisée sous forme de fraction du total*. Ainsi, lorsque cette métrique indique une valeur de `0.7`, le périphérique est plein à 70 %.

Pour générer une alerte en cas de faible espace disque, le monitor doit se déclencher lorsque la métrique est `above` le seuil. Les valeurs de seuil sont basées sur vos préférences. Pour cette métrique, des valeurs comprises entre `0` et `1` sont appropriées :

Définissez les seuils suivants :

```
Alert threshold: > 0.9
Warning threshold: > 0.8
```

Pour cet exemple, laissez les autres paramètres de cette section sur leurs valeurs par défaut. Pour plus de détails, consultez la documentation sur les [Monitors de métriques][7].

{{< img src="getting_started/monitors/monitor_alerting_conditions.png" alt="Définissez les seuils d'alerte et d'avertissement pour que le monitor déclenche des alertes" style="width:80%" >}}

### Notifications et automatisations {#notifications-and-automations}

Lorsqu'une alerte est déclenchée par ce monitor, une notification est envoyée. Dans cette notification, vous pouvez inclure des valeurs conditionnelles, des instructions de résolution ou un résumé de l'alerte. Au minimum, une notification doit comporter un titre et un message.

#### Titre de la notification {#notification-title}

Le titre doit être unique pour chaque monitor. Comme il s'agit d'un monitor multi-alertes, des noms sont disponibles pour chaque élément de groupe (`host` et `device`) avec des variables de modèle de message :

```text
Disk space is low on {{device.name}} / {{host.name}}
```

#### Message de notification {#notification-message}

Utilisez le message pour indiquer à votre équipe comment résoudre le problème, par exemple :

```text
Steps to free up disk space:
1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files
```

Pour ajouter des messages conditionnels basés sur les seuils d'alerte et d'avertissement, consultez les [variables de notification][8] disponibles que vous pouvez inclure dans votre message.

#### Informez vos services et les membres de votre équipe {#notify-your-services-and-your-team-members}

Envoyez des notifications à votre équipe par e-mail, Slack, PagerDuty, et plus encore. Vous pouvez rechercher les membres de votre équipe et les comptes connectés à l'aide de la liste déroulante.

{{< img src="getting_started/monitors/monitor_notification.png" alt="Ajoutez un message de monitor et des automatisations à votre notification d'alerte." style="width:100%;" >}}

Pour ajouter un workflow depuis [Workflow Automation][14] ou un élément de travail depuis [Work Management][15] à la notification d'alerte, cliquez sur {{< ui >}}Add Workflow{{< /ui >}} ou {{< ui >}}Add Work Item{{< /ui >}}. Vous pouvez également taguer des membres de [Datadog Team][16] en utilisant l'identifiant `@team`.

Laissez les autres sections telles quelles. Pour plus d'informations sur la fonction de chaque option de configuration, consultez la documentation [Configuration du monitor][9].

### Autorisations{#permissions}

Cliquez sur {{< ui >}}Edit Access{{< /ui >}} pour restreindre la modification de votre monitor à son créateur, aux équipes, aux utilisateurs, aux groupes ou à des rôles spécifiques au sein de votre organisation. En option, sélectionnez {{< ui >}}Notify{{< /ui >}} pour être alerté lorsque le monitor est modifié.

{{< img src="getting_started/monitors/monitor_permissions.png" alt="Définissez les autorisations d'accès pour un monitor et les options pour les notifications d'audit." style="width:80%;" >}}

Pour plus d'informations, consultez la page sur le [contrôle d'accès granulaire][10].

## Afficher les monitors et trier les alertes sur mobile {#view-monitors-and-triage-alerts-on-mobile}

Vous pouvez consulter Monitor Saved Views depuis votre écran d'accueil mobile ou afficher et désactiver les monitors en téléchargeant l'[application mobile Datadog][11], disponible sur l'[Apple App Store][12] et le [Google Play Store][13]. Cela facilite le tri lorsque vous êtes loin de votre ordinateur portable ou de bureau.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Incidents sur l'application mobile">}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/metric/
[2]: /fr/getting_started/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors/create/metric
[6]: /fr/integrations/disk/
[7]: /fr/monitors/types/metric/?tab=threshold#set-alert-conditions
[8]: /fr/monitors/notify/variables/
[9]: /fr/monitors/configuration/?tab=thresholdalert#alert-grouping
[10]: /fr/account_management/rbac/granular_access/
[11]: /fr/mobile/
[12]: https://apps.apple.com/app/datadog/id1391380318
[13]: https://play.google.com/store/apps/details?id=com.datadog.app
[14]: /fr/actions/workflows/
[15]: /fr/incident_response/work_management/
[16]: /fr/account_management/teams/
[17]: https://app.datadoghq.com/monitors/manage