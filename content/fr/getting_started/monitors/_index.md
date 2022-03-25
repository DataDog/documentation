---
title: Débuter avec les monitors
kind: documentation
aliases:
  - /fr/getting_started/application/monitors
further_reading:
  - link: https://www.datadoghq.com/blog/monitoring-101-alerting/
    tag: Blog
    text: "Monitoring 101\_: définir des alertes pertinentes"
  - link: /monitors/create/types/metric/
    tag: Documentation
    text: Monitors de métrique
  - link: /monitors/notify/
    tag: Documentation
    text: Notifications de monitor
---
## Présentation

Les [monitors de métrique][1] vous permettent de définir des alertes et de recevoir des notifications lorsqu'une métrique spécifique passe au-dessus ou en dessous d'un certain seuil. Cette page décrit la marche à suivre pour configurer un monitor de métrique chargé de vous alerter en cas d'espace disque faible.

## Prérequis

Avant de commencer, vous avez besoin d'un [compte Datadog][2] associé à un host sur lequel l'[Agent Datadog][3] est installé. Pour vérifier cela, consultez votre [liste d'infrastructures][4] dans Datadog.

## Configuration

Pour créer un [monitor de métrique][5] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Metric*.

### Choisir la méthode de détection

Lorsque vous créez un monitor de métrique, la méthode de détection **Threshold Alert** est sélectionnée par défaut. Une alerte de seuil compare les valeurs d'une métrique aux seuils que vous avez définis. Ce monitor a pour objectif d'envoyer une alerte en fonction d'un seuil statique : aucune modification n'est donc nécessaire.

### Définir la métrique

Pour recevoir une alerte en cas d'espace disque faible, utilisez la métrique `system.disk.in_use` de l'[intégration Disk][6] et calculez la moyenne par `host` et par `device` :

{{< img src="getting_started/application/metric_query.png" alt="Configuration d'alerte" >}}

Une fois cette configuration effectuée, le monitor passe automatiquement en mode `Multi Alert` afin de déclencher une alerte distincte pour chaque `host`, `device` qui envoie votre métrique.

### Définir vos conditions d'alerte

Selon la [documentation relative à l'intégration Disk][6], `system.disk.in_use` correspond à *la quantité proportionnelle d'espace disque utilisé par rapport au total*. Ainsi, lorsque la métrique envoie une valeur de `0.7`, l'appareil est plein à 70 %.

Pour recevoir une alerte en cas d'espace disque faible, le monitor doit se déclencher lorsque la valeur de la métrique est `above` (supérieure à) la valeur seuil. Vous êtes libre de définir la valeur seuil que vous souhaitez. Pour cette métrique, les valeurs comprises entre `0` et `1` sont appropriées :

{{< img src="getting_started/application/alert_thresholds.png" alt="Configuration d'alerte" >}}

Pour cet exemple, les autres paramètres par défaut ont été laissés tels quels. Pour en savoir plus, consultez la documentation relative aux [monitors de métrique][7].

### Say what's happening

Avant d'enregistrer votre monitor, vous devez définir un titre et un message.

#### Titre

Le titre doit être unique pour chaque monitor. Étant donné qu'il s'agit d'un monitor à alertes multiples, vous pouvez utiliser des template variables de message pour ajouter le nom de l'élément de chaque groupe (`host` et `device`) :
```text
Disk space is low on {{device.name}} / {{host.name}}
```

#### Message

Utilisez le message pour indiquer à votre équipe comment résoudre le problème. Par exemple :
```text
Étapes à suivre pour libérer de l'espace disque :
1. Supprimer les paquets non utilisés
2. Vider le cache APT
3. Désinstaller les applications superflues
4. Supprimer les fichiers en double
```

Pour définir des messages différents en fonction des seuils d'alerte et d'avertissement, consultez la documentation relative aux [notifications][8].

### Informer votre équipe

Utilisez cette section pour envoyer des notifications à votre équipe par e-mail, Slack, PagerDuty, etc. La liste déroulante vous permet de rechercher des membres d'équipe et des comptes connectés. Lorsqu'une `@notification` est ajoutée dans cette zone, celle-ci est automatiquement ajoutée au message :

{{< img src="getting_started/application/message_notify.png" alt="Message et notifications" style="width:70%;" >}}

Si la `@notification` est supprimée de l'une de ces deux sections, elle est également supprimée de l'autre section.

### Restreindre l'accès

<div class="alert alert-warning">
La fonctionnalité de restriction d'accès RBAC aux monitors est disponible en version bêta. Pour en bénéficier, contactez <a href="https://docs.datadoghq.com/help/">l'assistance Datadog</a>.</div>

Cette section vous permet de restreindre l'accès aux monitors de façon à ce qu'ils soient uniquement accessibles par tous les utilisateurs de votre organisation ayant votre rôle, les utilisateurs de certains rôles ou uniquement vous-même. Pour en savoir plus sur les rôles, consultez la documentation relative au [RBAC][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/create/types/metric/
[2]: https://www.datadoghq.com
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors#create/metric
[6]: /fr/integrations/disk/
[7]: /fr/monitors/create/types/metric/?tab=threshold#set-alert-conditions
[8]: /fr/monitors/notify/#conditional-variables
[9]: /fr/account_management/rbac/