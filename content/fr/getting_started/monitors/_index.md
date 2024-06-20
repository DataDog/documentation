---
aliases:
- /fr/getting_started/application/monitors
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: Blog
  text: 'Monitoring 101 : définir des alertes pertinentes'
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: Centre d'apprentissage
  text: Présentation de l'observabilité
- link: /monitors/types/metric/
  tag: Documentation
  text: Monitors de métrique
- link: /monitors/notify/
  tag: Documentation
  text: Notifications de monitor
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive sur la création de monitors efficaces
kind: documentation
title: Débuter avec les monitors
---

## Présentation

Les alertes Datadog vous permettent de créer des monitors capables de surveiller activement des métriques, la disponibilité d'intégrations, des endpoints réseau, etc. Tirez profit des monitors pour vous focaliser sur les systèmes qui nécessitent une surveillance, une enquête approfondie ou une intervention.

Cette page présente le fonctionnement des monitors et décrit les instructions à suivre pour configurer un [monitor de métrique][1]. Ce type de monitor envoie des alertes et des notifications lorsqu'une métrique dépasse un certain seuil. Par exemple, un monitor de métrique peut vous envoyer une alerte lorsque votre espace disque disponible devient faible.

Ce guide aborde les sujets suivants :
- Création et configuration de monitor
- Configuration d'alertes de monitor
- Personnalisation de messages de notification
- Autorisations des monitors

## Prérequis

Avant de commencer, vous devez disposer d'un compte Datadog associé à un host sur lequel l'Agent Datadog est installé. Pour en savoir plus sur l'Agent, consultez le guide [Débuter avec l'Agent][2] ou accéder à **[Integrations > Agent][3]** pour accéder aux instructions d'installation.

Pour vérifier que l'Agent Datadog est en cours d'exécution, vérifiez que la [liste d'infrastructures][4] affiche des données dans Datadog.

## Créer un monitor

Pour créer un monitor, accédez à **[Monitors > New Monitor][5]** et sélectionnez **Metric**.

## Configurer un monitor

La configuration d'un monitor vous permet de définir ce qui suit :

- **Choisir la méthode de détection** : comment mesurez-vous ce qui fera l'objet d'une alerte ? Vous préoccupez-vous du fait que la valeur dʼune métrique lui fasse franchir un seuil ? Que le changement dʼune valeur entraîne le franchissement dʼun seuil ? De la présence dʼune valeur anormale, ou d'autre chose ?
- **Définition de la métrique** : quelle est la valeur surveillée pour les alertes ? S'agit-il de l'espace disque disponible de votre système, ou encore du nombre d'erreurs de connexion détectées ?
- **Définir les conditions d'alerte** : quʼest-ce qui justifie de réveiller un ingénieur ? 
- **Configurer les notifications et les automatisations** : quelles informations doivent figurer dans l'alerte ?
- **Définir les permissions et les notifications dʼaudit** : qui a accès à ces alertes, et qui doit être notifié si l'alerte est modifiée ?

### Choisir la méthode de détection

Lorsque vous créez un monitor de métrique, la méthode de détection **Threshold Alert** est sélectionnée par défaut. Une alerte de seuil compare les valeurs d'une métrique avec les seuils que vous avez définis. Ce monitor a pour objectif d'envoyer une alerte en fonction d'un seuil statique : aucune modification n'est donc nécessaire.

### Définir la métrique

Pour recevoir une alerte en cas d'espace disque faible, utilisez la métrique `system.disk.in_use` de l'[intégration Disk][6] et calculez la moyenne par `host` et par `device` :

{{< img src="getting_started/monitors/monitor_query.png" alt="Définir la métrique pour system.disk.in_use avg par hôte et par appareil" style="width:100%" >}}

### Définir vos conditions d'alerte

Selon la [documentation relative à l'intégration Disk][6], `system.disk.in_use` est *la quantité d'espace disque utilisé sous forme de pourcentage du total*. De ce fait, lorsque la métrique envoie une valeur de `0.7`, l'appareil est plein à 70 %.

Pour recevoir une alerte en cas d'espace disque faible, le monitor doit se déclencher lorsque la valeur de la métrique est `above` (supérieure à) la valeur seuil. Vous êtes libre de définir la valeur seuil que vous souhaitez. Pour cette métrique, les valeurs comprises entre `0` et `1` sont appropriées :

Définissez les seuils suivants :
```
Alert threshold: > 0.9
Warning threshold: > 0.8
```

Pour cet exemple, laissez les autres paramètres par défaut tels quels. Pour en savoir plus, consultez la documentation relative aux [monitors de métrique][7].

{{< img src="getting_started/monitors/monitor_alerting_conditions.png" alt="Définir les seuils dʼalerte et dʼavertissement pour que le monitor déclenche des alertes" style="width:80%" >}}

### Notifications et automatisations

Lorsque ce monitor déclenche une alerte, un message de notification est envoyé. Dans ce message, vous pouvez inclure des valeurs conditionnelles, des instructions pour la résolution ou un résumé de l'alerte. Un message de notification doit comporter au moins un titre et un message.

#### Titre

Le titre doit être unique pour chaque monitor. Étant donné qu'il s'agit d'un monitor à alertes multiples, vous pouvez utiliser des template variables de message pour ajouter le nom de l'élément de chaque groupe (`host` et `device`) :
```text
Disk space is low on {{device.name}} / {{host.name}}
```

#### Message

Utilisez le message pour indiquer à votre équipe comment résoudre le problème, par exemple :
```text
Étapes à suivre pour libérer de l'espace disque :
1. Supprimer les paquets non utilisés
2. Vider le cache APT
3. Désinstaller les applications superflues
4. Supprimer les fichiers en double
```

Pour ajouter des messages conditionnels basés sur des seuils d'alerte ou d'avertissement, consultez les [variables de notification][8] disponibles que vous pouvez inclure dans votre message.

#### Informer vos services et les membres de votre équipe

Envoyez des notifications à votre équipe par e-mail, Slack, PagerDuty, etc. Vous pouvez rechercher des membres de l'équipe et des comptes connectés à l'aide de la liste déroulante. 

{{< img src="getting_started/monitors/monitor_notification.png" alt="Ajouter un message et des automatisations de monitor à la notification de votre alerte" style="width:100%;" >}}

Pour ajouter un workflow à partir de [Workflow Automation][14] ou ajouter un cas de [Case Management][15] à la notification de l'alerte, cliquez sur **Add Workflow** ou **Add Case**. Vous pouvez également tagger [lʼéquipe Datadog][16] en utilisant l'identifiant `@team`.

Laissez les autres sections telles quelles. Pour plus d'informations sur le rôle de chaque option de configuration, consultez la documentation relative à la [configuration de monitors][9].

### Autorisations

Cliquez sur **Edit Acces** pour que seul le créateur du monitor et des rôles spécifiques de votre organisation puissent bénéficier dʼun accès en édition. Vous pouvez aussi choisir de sélectionner `Notify` pour recevoir une alerte lorsque le monitor est modifié.

{{< img src="getting_started/monitors/monitor_permissions.png" alt="Définir des autorisations dʼaccès pour un monitor et des options pour les notifications dʼaudit" style="width:80%;" >}}

Pour en savoir plus sur les rôles, consultez la section [Contrôle d'accès à base de rôles][10].

## Visualiser les monitors et les alertes de triage sur mobile

Vous pouvez consulter vos vues enregistrées de monitors et consulter ou désactiver des monitors avec l'[application mobile Datadog][11], disponible sur l'[App Store d'Apple][12] et le [Google Play Store][13]. Vous pourrez ainsi procéder au triage des alertes même lorsque vous n'avez pas accès à votre ordinateur.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Incidents sur l'application mobile">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/metric/
[2]: /fr/getting_started/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors#create/metric
[6]: /fr/integrations/disk/
[7]: /fr/monitors/types/metric/?tab=threshold#set-alert-conditions
[8]: /fr/monitors/notify/variables/
[9]: /fr/monitors/configuration/?tab=thresholdalert#alert-grouping
[10]: /fr/account_management/rbac/
[11]: /fr/service_management/mobile/
[12]: https://apps.apple.com/app/datadog/id1391380318
[13]: https://play.google.com/store/apps/details?id=com.datadog.app
[14]: /fr/service_management/workflows/
[15]: /fr/service_management/case_management/
[16]: /fr/account_management/teams/