---
aliases:
- /fr/monitors/monitor_types/metric
- /fr/monitors/faq/what-is-the-do-not-require-a-full-window-of-data-for-evaluation-monitor-parameter
- /fr/monitors/create/types/metric
description: Comparer les valeurs d'une métrique avec un seuil défini par un utilisateur
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/status/
  tag: Documentation
  text: Consulter le statut de votre monitor
- link: /monitors/types/change-alert
  tag: Documentation
  text: Dépanner les moniteurs d'alerte de changement
title: Monitor de métrique
---
## Aperçu : {#overview}

Les moniteurs de métriques sont utiles pour un flux continu de données. Toute métrique envoyée à Datadog peut être alertée si elle dépasse un seuil sur une période donnée.

Pour créer un moniteur de métriques dans Datadog, accédez à [**Moniteurs > Nouveau Moniteur**][1] et sélectionnez le type de moniteur **Métrique**.

## Choisissez la méthode de détection {#choose-the-detection-method}

{{< tabs >}}
{{% tab "Seuil" %}}

Une alerte de seuil compare les valeurs de la métrique à un seuil fixe.

À chaque évaluation d'alerte, Datadog calcule la moyenne, le minimum, le maximum ou la somme sur la période sélectionnée et vérifie si elle est supérieure, inférieure, égale ou différente du seuil. Ceci est pour les cas d'alerte standard où vous connaissez les valeurs attendues. Le [type de métrique de distribution][1] offre l'option de seuil supplémentaire de calculer des percentiles sur la période sélectionnée.

Pour plus d'informations, consultez la section [Définir les conditions d'alerte](#set-alert-conditions).

[1]: /fr/metrics/distributions/
{{% /tab %}}
{{% tab "Changement" %}}

Une alerte de changement compare le changement absolu ou relatif (%) de valeur entre `N` minutes auparavant et maintenant par rapport à un seuil donné. Les points de données comparés ne sont pas des points uniques mais sont calculés en utilisant les paramètres de la section *définir la métrique*.

À chaque évaluation d'alerte, Datadog calcule la différence brute (une valeur positive ou négative) entre la série actuelle et `N` minutes auparavant, puis calcule la moyenne/le minimum/le maximum/la somme sur la période sélectionnée. Une alerte est déclenchée lorsque cette série calculée dépasse le seuil.

Ce type d'alerte est utile pour suivre les pics, les baisses, ou les changements progressifs d'une métrique lorsque vous ne disposez pas d'un seuil pour un comportement « inattendu ».

Pour plus d'informations, consultez le guide [Moniteurs d'alerte de changement][1].

[1]: /fr/monitors/types/change-alert/
{{% /tab %}}
{{% tab "Anomalies" %}}

Une alerte de détection d'anomalie utilise le comportement passé pour détecter lorsqu'une métrique a un comportement anormal.

Les alertes d'anomalie calculent une plage de valeurs attendues pour une série basée sur le passé. Certains des algorithmes d'anomalie utilisent l'heure de la journée et le jour de la semaine pour déterminer la plage attendue, capturant ainsi des anomalies qui ne pourraient pas être détectées par une simple alerte de seuil. Par exemple, la série est anormalement élevée à 5h du matin alors qu'elle serait considérée comme normale à 10h du matin.

À chaque évaluation d'alerte, Datadog calcule le pourcentage de la série qui se situe au-dessus, en dessous et en dehors de la plage attendue. Une alerte est déclenchée lorsque ce pourcentage dépasse le seuil configuré.

Pour plus d'informations, consultez la page [Anomaly Monitor][1].

[1]: /fr/monitors/types/anomaly/
{{% /tab %}}
{{% tab "Singularités" %}}

Les monitors de singularité détectent lorsqu'un membre d'un groupe (hosts, zones de disponibilité, partitions, etc.) a un comportement anormal par rapport au reste.

Lors de chaque évaluation d'alerte, Datadog vérifie si tous les groupes sont regroupés et présentent le même comportement ou non. Une alerte est déclenchée lorsqu'un ou plusieurs groupes divergent du reste des groupes.

Pour plus d'informations, consultez la page [Outlier Monitor][1].

[1]: /fr/monitors/types/outlier/
{{% /tab %}}
{{% tab "Prévision" %}}

Une alerte de prévision prédit le comportement futur d'une métrique et le compare à un seuil statique. Elle est bien adaptée aux métriques présentant des tendances fortes ou des motifs récurrents.

Lors de chaque évaluation d'alerte, une alerte de prévision prédit les valeurs futures de la métrique ainsi que les limites de déviation attendues. Une alerte est déclenchée lorsque n'importe quelle partie des limites franchit le seuil configuré.

Pour plus d'informations, consultez la page [Forecast Monitor][1].

[1]: /fr/monitors/types/forecasts/
{{% /tab %}}
{{< /tabs >}}

## Définissez la métrique {#define-the-metric}

Toute métrique rapportée à Datadog est disponible pour les moniteurs. Utilisez l'éditeur et les étapes ci-dessous pour définir la métrique. Les paramètres de requête varient légèrement en fonction de la méthode de détection choisie.

{{< tabs >}}
{{% tab "Seuil" %}}

{{< img src="monitors/monitor_types/metric/metric_threshold_config.png" alt="définissez la métrique pour le moniteur de détection de seuil" style="width:100%;">}}

| Étape                              | Requis | Par défaut        | Exemple           |
|-----------------------------------|----------|----------------|-------------------|
| Sélectionner une métrique                   | Oui      | Aucun           | `system.cpu.user` |
| Définir le `from`                 | Non       | Partout     | `env:prod`        |
| Spécifier l'agrégation de métrique        | Oui      | `avg by`       | `sum by`          |
| Grouper par                          | Non       | Tout     | `host`            |
| Spécifier l'agrégation de requête de moniteur | Non       | `average`      | `sum`             |
| Fenêtre d'évaluation                 | Non       | `5 minutes`    | `1 day`           |

**Définitions**

| Option           | Description                                                                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| moyenne          | La série est moyennée pour produire une valeur unique qui est vérifiée par rapport au seuil. Elle ajoute la fonction `avg()` à votre requête de surveillance.                                   |
| max              | Si une seule valeur dans la série générée dépasse le seuil, alors une alerte est déclenchée. Elle ajoute la fonction max() à votre requête de surveillance. Consultez la section Notes pour un comportement supplémentaire du seuil. |
| min              | Si tous les points dans la fenêtre d'évaluation pour votre requête dépassent le seuil, alors une alerte est déclenchée. Elle ajoute la fonction min() à votre requête de surveillance. Consultez la section Notes pour un comportement supplémentaire du seuil.|
| somme             | Si la somme de chaque point dans la série dépasse le seuil, une alerte est déclenchée. Elle ajoute la fonction `sum()` à votre requête de surveillance.                               |
| percentile(pXX)  | Si pXX pourcentage des points dans la fenêtre d'évaluation pour votre requête dépassent le seuil, alors une alerte est déclenchée. Cette option ajoute une fonction `percentile` à votre requête de surveillance. Disponible uniquement pour le type de métrique de distribution.
| Fenêtre d'évaluation| La période de temps que le moniteur évalue. Utilisez des fenêtres de temps prédéfinies comme `5 minutes`, `15 minutes`, `1 hour`, ou `custom` pour définir une valeur entre 1 minute et 730 heures (1 mois). |

{{% /tab %}}
{{% tab "Changement" %}}

{{< img src="monitors/monitor_types/metric/metric_change_alert_config.png" alt="définissez la métrique pour le moniteur de détection de changement" style="width:100%;">}}

| Étape                              | Requis | Par défaut        | Exemple           |
|-----------------------------------|----------|----------------|-------------------|
| Sélectionner une métrique                   | Oui      | Aucun           | `system.cpu.user` |
| Définir le `from`                 | Non       | Partout     | `env:prod`        |
| Spécifier l'agrégation de métrique        | Non       | `avg by`       | `sum by`          |
| Grouper par                          | Non       | Tout     | `host`            |
| Spécifier l'agrégation de requête de moniteur | Non       | `average`      | `sum`             |
| Sélectionnez un type de changement              | Non       | `change `      | `% change`        |
| Fenêtre d'évaluation                 | Non       | `5 minutes`    | `1 day`           |
| Fenêtre de comparaison                 | Non       | `5 minutes`    | `1 month`         |

**Définitions**

| Option           | Description                                                                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| changement           | Le changement absolu de la valeur.                                                                                                                                             |
| %&nbsp;changement    | Le changement en pourcentage de la valeur par rapport à sa valeur précédente. Par exemple, le changement en pourcentage pour une valeur précédente de 2 avec une valeur actuelle de 4 est de 100%.            |
| moyenne          | La série est moyennée pour produire une seule valeur qui est vérifiée par rapport au seuil. Elle ajoute la `avg()` fonction à votre requête de surveillance.                                   |
| max              | Si une seule valeur dans la série générée dépasse le seuil, alors une alerte est déclenchée. Elle ajoute la fonction max() à votre requête de surveillance. Consultez la section Notes pour un comportement supplémentaire du seuil. |
| min              | Si tous les points dans la fenêtre d'évaluation pour votre requête dépassent le seuil, alors une alerte est déclenchée. Elle ajoute la fonction min() à votre requête de surveillance. Consultez la section Notes pour un comportement supplémentaire du seuil. |
| somme              | Si la somme de chaque point dans la série dépasse le seuil, une alerte est déclenchée. Elle ajoute la `sum()` fonction à votre requête de surveillance.                               |
| percentile(pXX)  | Si pXX pourcentage de points dans la fenêtre d'évaluation pour votre requête dépassent le seuil, alors une alerte est déclenchée. Cette option ajoute une `percentile` fonction à votre requête de surveillance. Disponible uniquement pour le type de métrique de distribution.
| Fenêtre d'évaluation| La période de temps que le moniteur évalue. Utilisez des fenêtres de temps prédéfinies comme `5 minutes`, `15 minutes`, `1 hour`, ou `custom` pour définir une valeur entre 1 minute et 730 heures (1 mois). |

{{% /tab %}}
{{< /tabs >}}

**Notes:**
  - Si vous utilisez une métrique de distribution avec un agrégateur de percentile, un seuil de percentile correspondant est automatiquement spécifié. Les métriques avec des agrégateurs de percentile ne génèrent pas de graphique instantané dans le message de notification.
  - **max/min** : Ces descriptions de max et min supposent que le moniteur alerte lorsque la métrique dépasse le seuil. Pour les moniteurs qui alertent lorsque le seuil est en dessous, le comportement max et min est inversé.
  - Définir des métriques pour les moniteurs est similaire à définir des métriques pour les graphiques. Pour des détails sur l'utilisation de l'option `Advanced...`, voir [Graphisme avancé][2].
  - Il existe différents comportements lors de l'utilisation de `as_count()`. Voir [as_count() dans les évaluations de moniteur][3] pour plus de détails.
  - `N/A` Les groupes ne sont pas inclus dans les moniteurs, donc les clés de balise doivent avoir une valeur. 

## Définissez les conditions d'alerte {#set-alert-conditions}

Déclenchez lorsque la métrique est l'une des suivantes :
- `above`
- `above or equal to`
- `below`
- `below or equal to`
- `equal to`
- `not equal to`

Si la valeur est comprise entre zéro et un, un zéro initial est requis. Par exemple, `0.3`.

### Conditions d'alerte avancées {#advanced-alert-conditions}

#### Fenêtre de données {#data-window}

`Require` ou `Do not require` une fenêtre complète de données pour l'évaluation.

Ce paramètre vous permet de choisir à quel moment un monitor doit être évalué par le moteur d'alertes.

**Ne pas exiger** (Par défaut) : Un moniteur est évalué dès qu'il est reconnu. Envisagez d'utiliser cette valeur si vos points de données sont peu nombreux. Avec cette configuration, le moniteur évalue même s'il n'y a qu'un seul point de données dans la période d'évaluation.

**Exiger** : Un moniteur n'est pas évalué tant que la fenêtre d'évaluation n'est pas considérée comme `filled` avec des données. Pour être notifié s'il y a des données sur l'ensemble de la période d'évaluation, utilisez cette option.

Pour définir si la période d'évaluation est `filled` avec des données, la période est divisée en plus petits intervalles.

La taille des compartiments repose sur la logique suivante :

* Période d'évaluation en minutes : la taille de l'intervalle est de 1 minute
* Période d'évaluation en heures : la taille de l'intervalle est de 10 minutes
* Période d'évaluation en jours : la taille de l'intervalle est de 1 heure
* Période d'évaluation en mois : la taille de l'intervalle est de 4 heures

Pour que l'intervalle soit considéré comme complet, les conditions suivantes doivent être respectées :

1. Au moins un point de données dans le premier intervalle. Le premier intervalle est chronologiquement le plus ancien dans la fenêtre.
2. Pas plus de trois intervalles au total sans points de données.

Si les conditions sont remplies, le moniteur est évalué. Sinon, l'évaluation est annulée et l'état du moniteur reste inchangé.

Par exemple, un moniteur qui évalue sur les `2h` derniers est divisé en 12 intervalles de 10 minutes. Le moniteur est considéré comme complet si le premier intervalle a des données et qu'au maximum trois intervalles au total sont vides.

| données   | B0 | B1 | B2 | B3 | B4 | B5 | B6 | B7 | B8 | B9 | B10 | B11 | Fenêtre complète ?|
|--------|----|----|----|----|----|----|----|----|----|----|-----|-----|-------------|
| cas 1 | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | Oui         |
| cas 2 | x  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | Non          |
| cas 3 | 1  | 1  | x  | x  | x  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | Oui         |
| cas 4 | 1  | x  | x  | x  | 1  | 1  | 1  | 1  | x  | x  | 1   | 1   | Non          |

Pour plus d'informations sur la fenêtre d'évaluation, consultez la page [Configuration du moniteur][5].

#### Autres options {#other-options}

Pour des instructions sur les options d'alerte avancées (pas de données, résolution automatique), consultez la page [Configuration du moniteur][6].

## Notifications {#notifications}

Pour des instructions sur la section **Configurer les notifications et les automatisations**, consultez les pages [Notifications][7] et [Configuration du moniteur][8].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: /fr/dashboards/querying/#advanced-graphing
[3]: /fr/monitors/guide/as-count-in-monitor-evaluations/
[5]: /fr/monitors/configuration/?tab=thresholdalert#evaluation-window
[6]: /fr/monitors/configuration/#advanced-alert-conditions
[7]: /fr/monitors/notify/
[8]: /fr/monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations