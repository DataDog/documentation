---
aliases:
- /fr/monitors/create/configuration
description: Apprenez à configurer et à personnaliser des monitors à l'aide de la
  page de création de monitor dans Datadog.
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Notifications de monitor
- link: /monitors/manage/
  tag: Documentation
  text: Gérer les monitors
- link: /monitors/status/
  tag: Documentation
  text: Status du monitor
- link: https://www.datadoghq.com/blog/manage-monitors-with-datadog-teams/
  tag: Blog
  text: Gérez vos monitors plus efficacement avec la solution Datadog Teams
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: Centre d'apprentissage
  text: Personnalisez les notifications du monitor d'alerte
title: Configurer des monitors
---
## Présentation {#overview}

Pour commencer à configurer le monitor, complétez les sections suivantes :

* {{< ui >}}Define the search query{{< /ui >}} : Construisez une requête pour compter les événements, mesurer des métriques, grouper par une ou plusieurs dimensions, et plus encore.
* {{< ui >}}Set alert conditions{{< /ui >}} : Définissez des seuils d'alerte et d'avertissement, des délais d'évaluation, et configurez des options d'alerte avancées.
* {{< ui >}}Configure notifications and automations{{< /ui >}} : Rédigez un titre et un message de notification personnalisés avec des variables. Choisissez comment les notifications sont envoyées à vos équipes (e-mail, Slack ou PagerDuty). Incluez des automatisations de workflow ou des cas dans la notification d'alerte.
* {{< ui >}}Define permissions and audit notifications{{< /ui >}} : Configurez des contrôles d'accès granulaires et désignez des rôles et des utilisateurs spécifiques pouvant modifier un monitor. Activez les notifications d'audit pour être alerté si un monitor est modifié.

## Définissez la requête de recherche {#define-the-search-query}

Pour savoir comment construire la requête de recherche, consultez les pages des [types de monitor][1] individuels.

## Prévisualisez les graphiques {#preview-graphs}

À mesure que vous créez ou modifiez votre requête, le graphique de prévisualisation en haut de la configuration se met à jour dynamiquement pour refléter les résultats en temps réel.

{{< tabs >}}
{{% tab "Données évaluées" %}}

{{< img src="/monitors/configuration/evaluated_data_preview_high_error_rate.png" alt="Graphique de prévisualisation des données évaluées" style="width:100%;" >}}

Le graphique {{< ui >}}Evaluated Data{{< /ui >}} montre comment votre monitor aurait évalué les données en utilisant votre requête et vos seuils actuels. Avec la prévisualisation de l'évaluation, vous pouvez
- Voir les transitions d'état historiques (par exemple, `OK` → `ALERT`).
- Comprendre comment votre monitor se serait comporté.
- Prévisualiser qui aurait été notifié (y compris à partir des règles de notification)
- Repérez rapidement les erreurs de configuration avant d'enregistrer.

Cette fonctionnalité est prise en charge pour les monitors Metrics, Logs, APM, RUM, Events, Audit, Database, Agent Observability et Deployment.

{{% /tab %}}

{{% tab "Données source" %}}

{{< img src="/monitors/configuration/source_data_graph_high_error_rate.png" alt="Graphique de prévisualisation des données source" style="width:100%;" >}}

Le graphique {{< ui >}}Source Data{{< /ui >}} affiche les séries temporelles brutes ou le résultat de la requête pour votre monitor, sans aucune évaluation de seuil ni logique d'alerte appliquée. Cela vous permet de :

- Visualisez les données sous-jacentes que votre monitor évalue.
- Corrélez les changements d'état d'alerte avec les tendances réelles des données.
- Identifiez les anomalies, les lacunes ou les modèles inattendus dans vos données avant de configurer les conditions d'alerte.

Utilisez le graphique {{< ui >}}Source Data{{< /ui >}} pour vous assurer que votre requête renvoie les résultats attendus et pour aider à affiner vos seuils d'alerte et vos fenêtres d'évaluation.

{{% /tab %}}
{{< /tabs >}}

## Définissez les conditions d'alerte {#set-alert-conditions}

Les conditions d'alerte varient en fonction du [type de monitor][1]. Configurez les monitors pour qu'ils se déclenchent si la valeur de la requête dépasse un seuil, ou si un certain nombre de vérifications consécutives ont échoué.

{{< tabs >}}
{{% tab "Alerte de seuil" %}}

* Déclenchez lorsque la {{< ui >}}average{{< /ui >}}, {{< ui >}}max{{< /ui >}}, {{< ui >}}min{{< /ui >}} ou {{< ui >}}sum{{< /ui >}} de la métrique est
* {{< ui >}}above{{< /ui >}}, {{< ui >}}above or equal to{{< /ui >}}, {{< ui >}}below{{< /ui >}} ou {{< ui >}}below or equal to{{< /ui >}} le seuil
* au cours des {{< ui >}}5 minutes{{< /ui >}}, {{< ui >}}15 minutes{{< /ui >}}, {{< ui >}}1 hour{{< /ui >}} ou {{< ui >}}custom{{< /ui >}} pour définir une valeur comprise entre 1 minute et 48 heures (1 mois pour les monitors de métriques)

### Méthode d'agrégation {#aggregation-method}

La requête renvoie une série de points, mais une valeur unique est nécessaire pour comparer au seuil. Le monitor doit réduire les données de la fenêtre d'évaluation à une valeur unique.

| Option                  | Description                                            |
|-------------------------|--------------------------------------------------------|
| {{< ui >}}average{{< /ui >}}         | La série est moyennée pour produire une valeur unique qui est comparée au seuil. Elle ajoute la fonction `avg()` à votre requête de monitor. |
| {{< ui >}}max{{< /ui >}} | Si une seule valeur dans la série générée dépasse le seuil, alors une alerte est déclenchée. Elle ajoute la fonction `max()` à votre requête de monitor.* |
| {{< ui >}}min{{< /ui >}}  | Si tous les points de la fenêtre d'évaluation de votre requête dépassent le seuil, alors une alerte est déclenchée. Elle ajoute la fonction `min()` à votre requête de monitor.* |
| {{< ui >}}sum{{< /ui >}} | Si la somme de chaque point de la série dépasse le seuil, alors une alerte est déclenchée. Elle ajoute la fonction `sum()` à votre requête de monitor. |

\* Ces descriptions de max et min supposent que le monitor envoie une alerte lorsque la métrique passe _au-dessus_ du seuil. Pour les monitors qui envoient une alerte lorsque la métrique passe _en dessous_ du seuil, le comportement de max et min est inversé.

<div class="alert alert-info">Pour une analyse détaillée du fonctionnement de chaque méthode d'agrégation avec des exemples, consultez le <a href="/monitors/guide/monitor_aggregators/">guide des agrégateurs de monitor</a>.</div>

**Remarque** : Il existe des comportements différents lors de l'utilisation de `as_count()`. Voir [as_count() dans les évaluations de monitor][2] pour plus de détails.

### Fenêtre d'évaluation {#evaluation-window}

Un monitor peut être évalué en utilisant des fenêtres temporelles cumulatives ou des fenêtres temporelles glissantes. Les fenêtres temporelles cumulatives sont mieux adaptées aux questions qui nécessitent un contexte historique, telles que « Quelle est la somme de toutes les données disponibles jusqu'à ce moment précis ? » Les fenêtres temporelles glissantes sont mieux adaptées pour répondre aux questions qui ne nécessitent pas ce contexte, telles que « Quelle est la moyenne des _N_ derniers points de données ? »

Le schéma ci-dessous illustre la différence entre les périodes cumulées et les périodes mobiles.

{{< img src="/monitors/create/rolling_vs_expanding.png" alt="Deux graphiques montrant les fenêtres temporelles cumulatives par rapport aux fenêtres glissantes. Les fenêtres temporelles cumulatives continuent de s'étendre au fil du temps. Les fenêtres temporelles glissantes couvrent des moments précis dans le temps." style="width:100%;">}}

#### Fenêtres temporelles glissantes {#rolling-time-windows}

Une fenêtre temporelle glissante a une taille fixe et déplace son point de départ au fil du temps. Les monitors peuvent examiner les {{< ui >}}5 minutes{{< /ui >}}, {{< ui >}}15 minutes{{< /ui >}}, {{< ui >}}1 hour{{< /ui >}} derniers, ou une fenêtre temporelle personnalisée allant jusqu'à 1 mois.

**Remarque** : Les [monitors de logs][6] ont une fenêtre temporelle glissante maximale de `2 days`.

#### Fenêtres temporelles cumulatives {#cumulative-time-windows}
Une fenêtre temporelle cumulative a un point de départ fixe et s'étend au fil du temps. Les monitors prennent en charge trois fenêtres temporelles cumulatives différentes :

- {{< ui >}}Current hour{{< /ui >}} : Une fenêtre temporelle d'une heure maximum commençant à une minute configurable de l'heure. Par exemple, surveillez le nombre d'appels qu'un endpoint HTTP reçoit en une heure commençant à la minute 0.
- {{< ui >}}Current day{{< /ui >}} : Une fenêtre temporelle de 24 heures maximum commençant à une heure et une minute configurables de la journée. Par exemple, surveillez un [quota d'index de logs quotidien][3] en utilisant la fenêtre temporelle {{< ui >}}Current day{{< /ui >}} et en la faisant commencer à 14h00 UTC.
- {{< ui >}}Current month{{< /ui >}} : Examine le mois en cours en commençant à un jour du mois, une heure et une minute configurables. Cette option représente une fenêtre temporelle du début du mois à aujourd'hui et n'est disponible que pour les monitors de métriques.

{{< img src="/monitors/create/cumulative_window_example_more_options.png" alt="Capture d'écran de la configuration d'une fenêtre cumulative dans l'interface Datadog. L'utilisateur a recherché aws.sqs.number_of_messages_received. Les options sont définies pour évaluer la SOMME de la requête sur le MOIS EN COURS." style="width:100%;">}}

Une fenêtre temporelle cumulative est réinitialisée une fois sa durée maximale atteinte. Par exemple, une fenêtre temporelle cumulative examinant le {{< ui >}}Current month{{< /ui >}} se réinitialise le premier de chaque mois à minuit UTC. Alternativement, une fenêtre temporelle cumulative de {{< ui >}}Current hour{{< /ui >}}, qui commence à la minute 30, se réinitialise toutes les heures. Par exemple, à 6h30, 7h30, 8h30.

### Fréquence d'évaluation {#evaluation-frequency}

La fréquence d'évaluation définit la fréquence à laquelle Datadog exécute la requête du monitor. Pour la plupart des configurations, la fréquence d'évaluation est de `1 minute`, ce qui signifie que chaque minute, le monitor interroge les [données sélectionnées](#define-the-search-query) sur la [fenêtre d'évaluation sélectionnée](#evaluation-window) et compare la valeur agrégée aux [seuils définis](#thresholds).

Par défaut, les fréquences d'évaluation dépendent de la [fenêtre d'évaluation](#evaluation-window) utilisée. Une fenêtre plus longue entraîne des fréquences d'évaluation plus faibles. Le tableau suivant illustre comment la fréquence d'évaluation est contrôlée par des fenêtres temporelles plus larges :

| Plages de fenêtres d'évaluation        | Fréquence d'évaluation  |
|---------------------------------|-----------------------|
| fenêtre < 24 heures               | 1 minute              |
| 24 heures <= fenêtre < 48 heures   | 10 minutes            |
| fenêtre >= 48 heures              | 30 minutes            |

La fréquence d'évaluation peut également être configurée de manière à ce que la condition d'alerte du monitor soit vérifiée sur une base quotidienne, hebdomadaire ou mensuelle. Dans cette configuration, la fréquence d'évaluation ne dépend plus de la fenêtre d'évaluation, mais du planning configuré.

Pour plus d'informations, consultez le guide sur la manière de [personnaliser la fréquence d'évaluation des monitors][4].

### Seuils {#thresholds}

Utilisez des seuils pour définir une valeur numérique permettant de déclencher une alerte. Selon la métrique choisie, l'éditeur affiche l'unité utilisée (`byte`, `kibibyte`, `gibibyte`, etc.).

Datadog propose deux types de notifications (alerte et avertissement). Les monitors se rétablissent automatiquement en fonction du seuil d'alerte ou d'avertissement, mais des conditions supplémentaires peuvent être spécifiées. Pour plus d'informations sur les seuils de rétablissement, consultez [Qu'est-ce que les seuils de rétablissement ?][5]. Par exemple, si un monitor envoie une alerte lorsque la métrique est supérieure à `3` et qu'aucun seuil de rétablissement n'est spécifié, le monitor se rétablit une fois que la valeur de la métrique repasse en dessous de `3`.

| Option                                   | Description                    |
|------------------------------------------|--------------------------------|
| {{< ui >}}Alert threshold{{< /ui >}} (requis) | La valeur utilisée pour déclencher une notification d'alerte. |
| {{< ui >}}Warning threshold{{< /ui >}}                   | La valeur utilisée pour déclencher une notification d'avertissement. |
| {{< ui >}}Alert recovery threshold{{< /ui >}}       | Un seuil facultatif pour indiquer une condition supplémentaire pour le rétablissement de l'alerte. |
| {{< ui >}}Warning recovery threshold{{< /ui >}}     | Un seuil facultatif pour indiquer une condition supplémentaire pour le rétablissement de l'avertissement. |

Lorsque vous modifiez un seuil, l'aperçu du graphique dans l'éditeur affiche un marqueur qui indique le point limite.

{{< img src="/monitors/create/preview_graph_thresholds.png" alt="Graphique de prévisualisation des seuils" style="width:100%;">}}

**Remarque** : Lors de la saisie de valeurs décimales pour les seuils, si votre valeur est `<1`, ajoutez un `0` au début du nombre. Par exemple, utilisez `0.5`, pas `.5`.


[1]: /fr/monitors/guide/monitor_aggregators/
[2]: /fr/monitors/guide/as-count-in-monitor-evaluations/
[3]: https://docs.datadoghq.com/fr/logs/log_configuration/indexes/#set-daily-quota
[4]: /fr/monitors/guide/custom_schedules
[5]: /fr/monitors/guide/recovery-thresholds/
[6]: /fr/monitors/types/log/
{{% /tab %}}
{{% tab "Vérifier l'alerte" %}}

Une alerte de check récupère les statuts consécutifs envoyés pour chaque groupe de checks et les compare à vos seuils. Configurez l'alerte de vérification pour :

1. Déclenchez l'alerte après le nombre sélectionné d'échecs consécutifs : `<NUMBER>`

    Chaque exécution de vérification soumet un statut unique de `OK`, `WARN` ou `CRITICAL`. Choisissez combien d'exécutions consécutives avec le statut `WARN` et `CRITICAL` déclenchent une notification. Par exemple, votre processus peut connaître une interruption momentanée lorsque la connexion échoue. Si vous définissez cette valeur sur `> 1`, l'interruption momentanée est ignorée, mais un problème avec plus d'un échec consécutif déclenche une notification.

    {{< img src="/monitors/create/check_thresholds_alert_warn.png" alt="Seuils de vérification Alerte/Avertissement" style="width:90%;">}}

2. Résolvez l'alerte après le nombre sélectionné de succès consécutifs : `<NUMBER>`

    Choisissez combien d'exécutions consécutives avec le statut `OK` résout l'alerte.

    {{< img src="/monitors/create/check_thresholds_recovery.png" alt="Seuils de vérification Rétablissement" style="width:90%;">}}

Consultez la documentation sur les monitors de [check de processus][1], [check d'intégration][2] et [check personnalisé][3] pour en savoir plus sur la configuration des alertes des checks.



[1]: /fr/monitors/types/process_check/
[2]: /fr/monitors/types/integration/?tab=checkalert#integration-metric
[3]: /fr/monitors/types/custom_check/
{{% /tab %}}
{{< /tabs >}}

### Conditions d'alerte avancées {#advanced-alert-conditions}

#### Aucune donnée {#no-data}

Les notifications pour les données manquantes sont utiles si vous attendez d'une métrique qu'elle rapporte toujours des données dans des circonstances normales. Par exemple, si un hôte avec l'Agent doit être opérationnel en continu, vous pouvez vous attendre à ce que la métrique `system.cpu.idle` rapporte toujours des données.

Dans ce cas, vous devez activer les notifications pour les données manquantes. Les sections ci-dessous expliquent comment accomplir cela avec chaque option.

**Remarque** : Le monitor doit être capable d'évaluer les données avant d'alerter sur des données manquantes. Par exemple, si vous créez un monitor pour `service:abc` et que les données de ce `service` ne sont pas transmises, le monitor n'envoie pas d'alertes.

Si des données sont manquantes pendant `N` minutes, sélectionnez une option dans le menu déroulant :

{{< img src="/monitors/create/on_missing_data.png" alt="Options en cas d'absence de données" style="width:70%;">}}

- {{< ui >}}Evaluate as zero{{< /ui >}} / {{< ui >}}Show last known status{{< /ui >}}
- {{< ui >}}Show NO DATA{{< /ui >}}
- {{< ui >}}Show NO DATA and notify{{< /ui >}}
- {{< ui >}}Show OK{{< /ui >}}.

Le comportement sélectionné est appliqué lorsqu'une requête de monitor ne renvoie aucune donnée. Contrairement à l'option {{< ui >}}Do not notify{{< /ui >}}, la fenêtre de données manquantes **n'est** pas configurable.

| Option                    | État du monitor et notification                                             |
|---------------------------|---------------------------------------------------------------------------|
| {{< ui >}}Evaluate as zero{{< /ui >}}        | Le résultat vide est remplacé par zéro et est comparé aux seuils d'alerte/avertissement. Par exemple, si le seuil d'alerte est défini sur `> 10`, un zéro ne déclencherait pas cette condition, et l'état du monitor est défini sur `OK`.   |
| {{< ui >}}Show last known status{{< /ui >}}  | Le dernier état connu du groupe ou du monitor est défini.                        |
| {{< ui >}}Show NO DATA{{< /ui >}}            | L'état du monitor est défini sur `NO DATA`.                                       |
| {{< ui >}}Show NO DATA and notify{{< /ui >}} | L'état du monitor est défini sur `NO DATA` et une notification est envoyée.        |
| {{< ui >}}Show OK{{< /ui >}}                 | Le monitor est résolu et l'état est défini sur `OK`.                            |

L'utilisation de default_zero() dans une requête verrouille le comportement en cas de données manquantes sur la valeur par défaut de ce type de requête et désactive les autres options :

- Pour les requêtes avec `default_zero()`, les données manquantes sont toujours évaluées à zéro, et les autres comportements en cas de données manquantes ne sont pas disponibles.
- Pour les requêtes sans `default_zero()`, les requêtes `Count` utilisent {{< ui >}}Evaluate as zero{{< /ui >}} par défaut, tandis que les autres types de requêtes utilisent {{< ui >}}Show last known status{{< /ui >}} par défaut. Tous les comportements en cas de données manquantes restent disponibles.

#### Résolution automatique {#auto-resolve}

{{< ui >}}[Never]{{< /ui >}}, {{< ui >}}After 1 hour{{< /ui >}}, {{< ui >}}After 2 hours{{< /ui >}} et ainsi de suite. résoudre automatiquement cet événement à partir d'un état déclenché.

La résolution automatique fonctionne lorsque les données ne sont plus soumises. Les monitors ne se résolvent pas automatiquement à partir d'un état ALERT ou WARN si des données sont toujours rapportées. Si des données sont toujours soumises, la fonctionnalité [renotify][2] peut être utilisée pour informer votre équipe lorsqu'un problème n'est pas résolu.

Pour certaines métriques qui sont rapportées périodiquement, il peut être judicieux que les alertes déclenchées se résolvent automatiquement après une certaine période. Par exemple, si vous avez un compteur qui ne rapporte que lorsqu'une erreur est enregistrée, l'alerte ne se résout jamais car la métrique ne rapporte jamais `0` comme nombre d'erreurs. Dans ce cas, configurez votre alerte pour qu'elle se résolve après une certaine durée d'inactivité de la métrique. **Remarque** : Si un monitor se résout automatiquement et que la valeur de la requête n'atteint pas le seuil de rétablissement lors de l'évaluation suivante, le monitor déclenche à nouveau une alerte.

Dans la plupart des cas, ce paramètre n'est pas utile car vous souhaitez qu'une alerte ne se résolve qu'une fois le problème réellement corrigé. Par conséquent, en général, il est logique de laisser ce paramètre sur {{< ui >}}[Never]{{< /ui >}} afin que les alertes ne se résolvent que lorsque la métrique est au-dessus ou en dessous du seuil défini.

#### Durée de rétention du groupe {#group-retention-time}

La rétention de groupe contrôle la durée pendant laquelle un groupe de monitors est conservé dans le statut du monitor après l'arrêt de la transmission des données. Une fois la période de rétention écoulée, le groupe expire et est supprimé du statut du monitor.

Par défaut, un groupe conserve son statut pendant 24 heures avant d'être supprimé. Les monitors d'hôtes et les vérifications de service qui notifient en cas de données manquantes conservent le statut pendant 48 heures.

Pour les types de monitors multi-alertes qui prennent en charge la rétention personnalisée, vous pouvez définir une valeur comprise entre 1 heure et 72 heures. Sélectionnez {{< ui >}}Remove the non-reporting group after N (length of time){{< /ui >}}.

{{< img src="/monitors/create/group_retention_time.png" alt="Option de durée de rétention de groupe" style="width:70%;">}}

Similaire à l'[option de résolution automatique][3], la rétention de groupe fonctionne lorsque les données ne sont plus transmises. L'heure de début de la rétention de groupe et l'option de résolution automatique sont **identiques** dès que la requête du monitor ne renvoie aucune donnée.

Voici quelques cas d'utilisation pour définir une durée de rétention de groupe personnalisée :

- Lorsque vous souhaitez supprimer le groupe immédiatement ou peu de temps après l'arrêt de la transmission des données
- Lorsque vous souhaitez conserver le groupe dans le statut pendant la durée habituelle de votre dépannage

**Remarque** : L'option de durée de rétention de groupe personnalisée nécessite un monitor multi-alertes qui prend en charge l'option [`On missing data`][4]. Ces types de monitors sont les monitors APM Trace Analytics, Audit Logs, CI Pipelines, Error Tracking, Events, Logs et RUM.

<div class="alert alert-info"><strong>Aperçu : Rétention de groupe dynamique</strong><p>La rétention de groupe dynamique est en version préliminaire et s'applique aux monitors nouvellement créés. Pour les monitors comportant un grand nombre de groupes, Datadog raccourcit automatiquement la durée de conservation d'un groupe après qu'il a cessé de transmettre des données. Plus les groupes apparaissent et disparaissent fréquemment, plus cette période devient courte, ce qui permet de maintenir la rapidité et l'efficacité du monitor. Cela n'affecte que les groupes devenus silencieux ; les groupes transmettant activement des données ne sont jamais supprimés.</p></div>

#### Délai de nouveau groupe {#new-group-delay}

Retardez le début de l'évaluation de `N` secondes pour les nouveaux groupes.

Le temps (en secondes) à attendre avant de commencer l'alerte, pour permettre aux nouveaux groupes créés de démarrer et aux applications de se lancer complètement. Il doit s'agir d'un entier non négatif.

Par exemple, si vous utilisez une architecture conteneurisée, la définition d'un délai de groupe empêche les groupes de monitors basés sur des conteneurs de se déclencher en raison d'une utilisation élevée des ressources ou d'une latence élevée lorsqu'un nouveau conteneur est créé. Le délai est appliqué à chaque nouveau groupe (qui n'a pas été vu au cours des dernières 24 heures) et est défini par défaut sur `60` secondes.

Cette option est disponible pour les monitors à alertes multiples.

#### Délai d'évaluation {#evaluation-delay}

<div class="alert alert-info"> Datadog recommande un délai de 15 minutes pour les métriques cloud, qui sont complétées a posteriori par les fournisseurs de services. De plus, lors de l'utilisation d'une formule de division, un délai de 60 secondes est utile pour garantir que votre monitor évalue des valeurs complètes. Consultez la <a href="https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/">
">Cloud Metric Delay</a> page pour connaître les délais estimés.</div>

Différer l'évaluation de `N` secondes.

Le temps (en secondes) pour différer l'évaluation. Il doit s'agir d'un entier non négatif. Ainsi, si le délai est réglé sur 900 secondes (15 minutes), que l'évaluation du monitor a lieu pendant les `5 minutes` dernières, et qu'il est 7h00, le monitor évalue les données de 6h40 à 6h45. Le délai d'évaluation configurable maximal est de 86400 secondes (24 heures).

## Configurer les notifications et les automatisations {#configure-notifications-and-automations}

Configurez vos messages de notification de façon à inclure les informations qui vous intéressent le plus. Indiquez les équipes auxquelles ces alertes doivent être envoyées, ainsi que les attributs pour lesquels les alertes doivent se déclencher.

### Message {#message}

Utilisez cette section pour configurer les notifications envoyées à votre équipe et la façon dont elles sont envoyées :

  - [Configurez votre notification avec des variables de modèle][5]
  - [Envoyez des notifications à votre équipe par e-mail, Slack ou PagerDuty][6]

Pour en savoir plus sur les options de configuration du message de notification, consultez la section [Notifications Alerting][7].

### Ajouter des métadonnées {#add-metadata}

<div class="alert alert-info">Les tags de monitor sont indépendants des tags envoyés par l'Agent ou les intégrations. Consultez la documentation <a href="/monitors/manage/">Gérer les monitors</a>.</div>

1. Utilisez le menu déroulant {{< ui >}}Tags{{< /ui >}} pour associer des [tags][8] à votre monitor.
1. Utilisez le menu déroulant {{< ui >}}Teams{{< /ui >}} pour associer des [équipes][9] à votre monitor.
1. Choisissez un {{< ui >}}Priority{{< /ui >}}.

### Définissez l'agrégation des alertes {#set-alert-aggregation}

Les alertes sont regroupées automatiquement en fonction de votre sélection de l'agrégation choisie pour votre requête (par exemple, `avg by service`). Si la requête ne comporte aucun regroupement, elle utilise {{< ui >}}Simple Alert{{< /ui >}} par défaut. Si la requête est regroupée par une dimension quelconque, le regroupement passe à {{< ui >}}Multi Alert{{< /ui >}}.

{{< img src="/monitors/create/notification-aggregation.png" alt="Options de configuration pour l'agrégation des notifications de monitor" style="width:100%;">}}

#### Alerte simple {#simple-alert}

{{< ui >}}Simple Alert{{< /ui >}}Le mode déclenche une notification en agrégeant toutes les sources de rapport. Vous recevez **une alerte** lorsque la valeur agrégée remplit les conditions définies. Par exemple, vous pourriez configurer un monitor pour vous avertir si l'utilisation moyenne du processeur de tous les serveurs dépasse un certain seuil. Si ce seuil est atteint, vous recevrez une notification unique, quel que soit le nombre de serveurs individuels ayant atteint le seuil. Cela peut être utile pour surveiller les tendances ou les comportements généraux du système.


{{< img src="/monitors/create/simple-alert.png" alt="Diagramme montrant comment les notifications de monitor sont envoyées en mode alerte simple" style="width:90%;">}}

#### Alerte multiple {#multi-alert}

Un {{< ui >}}Multi Alert{{< /ui >}} monitor déclenche des notifications individuelles pour chaque entité de votre monitor qui atteint le seuil d'alerte.

{{< img src="/monitors/create/multi-alert.png" alt="Diagramme montrant comment les notifications de monitor sont envoyées en mode alerte multiple" style="width:90%;">}}

Par exemple, lors de la configuration d'un monitor pour vous avertir si la latence P99, agrégée par service, dépasse un certain seuil, vous recevriez une alerte **distincte** pour chaque service individuel dont la latence P99 a dépassé le seuil d'alerte. Cela peut être utile pour identifier et traiter des instances spécifiques de problèmes système ou d'application. Cela vous permet de suivre les problèmes à un niveau plus granulaire.

##### Regroupement des notifications {#notification-grouping}

Lors de la surveillance d'un grand groupe d'entités, les alertes multiples peuvent entraîner des monitors bruyants. Pour atténuer cela, personnalisez les dimensions qui déclenchent les alertes. Cela réduit le bruit et vous permet de vous concentrer sur les alertes les plus importantes. Par exemple, vous surveillez l'utilisation moyenne du processeur de tous vos hôtes. Si vous regroupez votre requête par `service` et `host` mais que vous souhaitez uniquement que des alertes soient envoyées une fois pour chaque attribut `service` atteignant le seuil, supprimez l'attribut `host` de vos options d'alerte multiple et réduisez le nombre de notifications qui sont envoyées.

{{< img src="/monitors/create/multi-alert-aggregated.png" alt="Schéma de la manière dont les notifications sont envoyées lorsqu'elles sont définies sur des dimensions spécifiques dans les alertes multiples" style="width:90%;">}}

Lors de l'agrégation des notifications en mode {{< ui >}}Multi Alert{{< /ui >}}, les dimensions sur lesquelles l'agrégation n'est pas effectuée deviennent {{< ui >}}Sub Groups{{< /ui >}} dans l'interface utilisateur.

**Remarque** : Si votre métrique ne fait l'objet de rapports que par `host` sans tag `service`, elle n'est pas détectée par le monitor. Les métriques avec les tags `host` et `service` sont détectées par le monitor.

Si vous configurez des tags ou des dimensions dans votre requête, ces valeurs sont disponibles pour chaque groupe évalué dans l'alerte multiple afin de remplir dynamiquement les notifications avec un contexte utile. Consultez [Variables d'attribut et de tag][10] pour savoir comment référencer les valeurs de tag dans le message de notification.

| Regrouper par                       | Mode alerte simple | Mode alerte multiple |
|-------------------------------------|------------------------|-----------------------|
| _(tout)_                      | Un seul groupe déclenchant une notification | N/A |
| 1&nbsp;dimension&nbsp;ou&nbsp;plus | Une notification si un ou plusieurs groupes remplissent les conditions d'alerte | Une notification par groupe remplissant les conditions d'alerte |

## Autorisations {#permissions}

Tous les utilisateurs peuvent voir tous les monitors, quelle que soit l'équipe ou le rôle auquel ils sont associés. Par défaut, seuls les utilisateurs rattachés à des rôles disposant de l'[autorisation d'écriture sur les monitors][11] peuvent modifier les monitors. Les [rôles Datadog Admin et Datadog standard][12] disposent par défaut de l'autorisation d'écriture sur les monitors. Si votre organisation utilise des [rôles personnalisés][13], d'autres rôles personnalisés peuvent disposer de l'autorisation d'écriture sur les monitors. Pour plus d'informations sur la configuration du RBAC pour Monitors et la migration des Monitors du paramètre verrouillé vers l'utilisation de restrictions de rôle, consultez le guide sur [How to set up RBAC for Monitors][14].

Vous pouvez restreindre davantage votre monitor en spécifiant une liste d'[équipes][17], de [rôles][15] ou d'utilisateurs autorisés à le modifier. Le créateur du monitor dispose par défaut des droits de modification sur celui-ci. Il est notamment possible de modifier la configuration du monitor, de supprimer le monitor et de désactiver ses notifications pendant la durée souhaitée.

**Remarque** : Les limitations s'appliquent à la fois dans l'interface utilisateur et dans l'API.

### Contrôles d'accès granulaires {#granular-access-controls}

Utilisez les [contrôles d'accès granulaires][16] pour limiter les équipes, rôles ou utilisateurs autorisés à modifier un monitor :
1. Lors de la modification ou de la configuration d'un monitor, recherchez la section {{< ui >}}Define permissions and audit notifications{{< /ui >}}.
  {{< img src="monitors/configuration/define_permissions_audit_notifications.png" alt="Options de configuration du monitor pour définir les autorisations" style="width:70%;" >}}
1. Cliquez sur {{< ui >}}Edit Access{{< /ui >}}.
1. Cliquez sur {{< ui >}}Restrict Access{{< /ui >}}.
1. La boîte de dialogue se met à jour pour indiquer que les membres de votre organisation ont un accès {{< ui >}}Viewer{{< /ui >}} par défaut.
1. Utilisez le menu déroulant pour sélectionner une ou plusieurs équipes, rôles ou utilisateurs pouvant modifier le monitor.
1. Cliquez sur {{< ui >}}Add{{< /ui >}}.
1. La boîte de dialogue se met à jour pour indiquer que le rôle que vous avez sélectionné dispose de l'autorisation {{< ui >}}Editor{{< /ui >}}.
1. Cliquez sur {{< ui >}}Done{{< /ui >}}.

**Remarque :** Pour conserver votre accès en modification au monitor, le système exige que vous incluiez au moins un rôle ou une équipe dont vous êtes membre avant d'enregistrer.

Pour rétablir les autorisations globales d'un monitor restreint, procédez comme suit :
1. Lors de la consultation d'un monitor, cliquez sur le menu déroulant {{< ui >}}More{{< /ui >}}.
1. Sélectionnez {{< ui >}}Permissions{{< /ui >}}.
1. Cliquez sur {{< ui >}}Restore Full Access{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types
[2]: /fr/monitors/notify/#renotify
[3]: /fr/monitors/configuration/?tab=thresholdalert#auto-resolve
[4]: /fr/monitors/configuration/?tabs=othermonitortypes#no-data
[5]: /fr/monitors/notify/variables/
[6]: /fr/monitors/notify/#configure-notifications-and-automations
[7]: /fr/monitors/notify/
[8]: /fr/getting_started/tagging/
[9]: /fr/account_management/teams/
[10]: /fr/monitors/notify/variables/?tab=is_alert#attribute-and-tag-variables
[11]: /fr/account_management/rbac/permissions/#monitors
[12]: /fr/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[13]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles
[14]: /fr/monitors/guide/how-to-set-up-rbac-for-monitors/
[15]: /fr/account_management/rbac/
[16]: /fr/account_management/rbac/granular_access
[17]: /fr/account_management/teams/