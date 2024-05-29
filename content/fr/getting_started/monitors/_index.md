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

Pour créer un monitor, accédez à **[Monitors > New Monitor > Metric][5]**.

## Configurer un monitor

La configuration d'un monitor vous permet de définir ce qui suit :
- **Méthode de détection** : comment sont mesurées les données sous-jacentes aux alertes ? Souhaitez-vous être informé lorsqu'une valeur de métrique dépasse un seuil, lorsque l'évolution de sa valeur dépasse un seuil ou encore lorsqu'une valeur anormale est détectée ?
- **Définition de la métrique** : quelle est la valeur surveillée pour les alertes ? S'agit-il de l'espace disque disponible de votre système, ou encore du nombre d'erreurs de connexion détectées ?
- **Conditions d'alerte** : sur quels critères faut-il prévenir un ingénieur ?
- **Notification** : quelles sont les informations qui doivent être incluses dans l'alerte ?

### Choisir la méthode de détection

Lorsque vous créez un monitor de métrique, la méthode de détection **Threshold Alert** est sélectionnée par défaut. Une alerte de seuil compare les valeurs d'une métrique aux seuils que vous avez définis. Ce monitor a pour objectif d'envoyer une alerte en fonction d'un seuil statique : aucune modification n'est donc nécessaire.

### Définir la métrique

Pour recevoir une alerte en cas d'espace disque faible, utilisez la métrique `system.disk.in_use` de l'[intégration Disk][6] et calculez la moyenne par `host` et par `device` :

{{< img src="getting_started/monitors/define_the_metric.png" alt="Définir la métrique pour system.disk.in_use avec l'agrégation avg en fonction du host et de l'appareil" >}}

### Définir des conditions d'alerte

Selon la [documentation relative à l'intégration Disk][6], `system.disk.in_use` correspond à *la quantité proportionnelle d'espace disque utilisé par rapport au total*. Ainsi, lorsque la métrique envoie une valeur de `0.7`, l'appareil occupe 70 % de l'espace disque.

Pour recevoir une alerte en cas d'espace disque faible, le monitor doit se déclencher lorsque la valeur de la métrique est `above` (supérieure à) la valeur seuil. Vous êtes libre de définir la valeur seuil que vous souhaitez. Pour cette métrique, les valeurs comprises entre `0` et `1` sont appropriées :

Définissez les seuils suivants :
```
Alert threshold: > 0.9
Warning threshold: > 0.8
```

Pour cet exemple, laissez tels quels les autres paramètres de cette section. Pour en savoir plus, consultez la documentation relative aux [monitors de métrique][7].

### Notification

Lorsque ce monitor déclenche une alerte, un message de notification est envoyé. Ce message peut contenir des valeurs conditionnelles, des instructions de résolution ou un résumé de l'alerte. Une notification doit impérativement comporter un titre et un message.

#### Titre

Le titre doit être unique pour chaque monitor. Étant donné qu'il s'agit d'un monitor à alertes multiples, vous pouvez utiliser des template variables de message pour ajouter le nom de l'élément de chaque groupe (`host` et `device`) :
```text
Disk space is low on {{device.name}} / {{host.name}}
```

#### Message

Le message permet d'indiquer à votre équipe comment résoudre le problème. Exemple :
```text
Étapes à suivre pour libérer de l'espace disque :
1. Supprimer les packages non utilisés
2. Vider le cache APT
3. Désinstaller les applications superflues
4. Supprimer les fichiers en double
```

Pour ajouter des messages conditionnels reposant sur les seuils d'alerte et d'avertissement, consultez les [variables de notification][8] qui peuvent être incluses dans votre message.

#### Prévenir vos services et membres d'équipe

Envoyez des notifications à votre équipe par e-mail, via Slack, par l'intermédiaire de PagerDuty, etc. La liste déroulante vous permet de rechercher des membres d'équipe et des comptes connectés. Lorsqu'une `@notification` est ajoutée dans cette zone, celle-ci est automatiquement ajoutée au message :

{{< img src="getting_started/monitors/message_notify.png" alt="Messages avec des variables conditionnelles et une @notification" style="width:90%;" >}}

Si la `@notification` est supprimée de l'une de ces deux sections, elle est également supprimée de l'autre section.

Ne modifiez pas les autres sections. Pour en savoir plus sur l'utilité de chaque option de configuration, consultez la section [Configurer des monitors][9].

### Autorisations

{{< img src="getting_started/monitors/monitor_rbac_restricted.jpg" alt="Monitor avec restriction RBAC" style="width:90%;" >}}

Utilisez cette option pour faire en sorte que seuls le créateur de votre monitor ainsi que certains rôles spécifiques puissent le modifier. Pour en savoir plus sur les rôles, consultez la section [Contrôle d'accès à base de rôles (RBAC)][10].

## Visualiser les monitors et les alertes de triage sur mobile

Vous pouvez accéder à vos vues enregistrées de monitors et consulter ou désactiver des monitors avec l'[application mobile Datadog][11], disponible sur l'[App Store d'Apple][12] et le [Google Play Store][13]. Vous pourrez ainsi procéder au triage des alertes même lorsque vous n'avez pas accès à votre ordinateur.

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