---
title: Monitor de métrique
kind: documentation
description: Comparer les valeurs d'une métrique avec un seuil défini par un utilisateur
further_reading:
  - link: /monitors/notifications/
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: /monitors/downtimes/
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: /monitors/monitor_status/
    tag: Documentation
    text: Consulter le statut de votre monitor
---
## Présentation

Les monitors de métrique sont particulièrement adaptés aux flux de données continus. Il est possible de déclencher une alerte lorsqu'une métrique envoyée à Datadog dépasse un certain seuil sur un intervalle donné.

## Création d'un monitor

Pour créer un [monitor de métrique][1] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Metric*.

### Choisir la méthode de détection

{{< tabs >}}
{{% tab "Seuil" %}}

Une alerte de seuil compare les valeurs de la métrique à un seuil fixe.

À chaque évaluation de l'alerte, Datadog calcule la moyenne, le minimum, le maximum et la somme sur l'intervalle sélectionné et vérifie si la valeur est supérieure ou inférieure au seuil. Ce type d'alerte est utilisé dans les cas standards, lorsque vous connaissez les valeurs attendues.

{{% /tab %}}
{{% tab "Changement" %}}

Une alerte de changement compare l'écart absolu (%) entre les valeurs actuelles et les valeurs mesurées `N` minutes plus tôt par rapport à un seuil donné. Les points de données comparés ne sont pas des points uniques : ils sont calculés en fonction des *conditions d'alerte* définies.

À chaque évaluation de l'alerte, Datadog calcule l'écart brut (valeur positive ou négative) entre les séries actuelles et celles mesurées `N` minutes plus tôt, puis calcule la moyenne, le minimum, le maximum et la somme sur l'intervalle sélectionné. Une alerte se déclenche lorsque la série calculée dépasse le seuil.

Ce type d'alerte est idéal pour être informé des pics, des chutes ou des évolutions progressives d'une métrique lorsque vous ne connaissez pas le seuil de valeurs inattendues.

{{% /tab %}}
{{% tab "Anomalie" %}}

Une alerte d'anomalie analyse le comportement passé d'une métrique pour détecter les comportements anormaux.

Les alertes d'anomalie calculent la plage de valeurs attendues pour une série en fonction des données historiques. Certains algorithmes de détection d'anomalie utilisent l'heure de la journée ou le jour de la semaine pour déterminer la plage de valeurs attendues et ainsi identifier les anomalies qui n'auraient pas pu être détectées avec une simple alerte de seuil. Par exemple, une série peut être anormalement élevée pour 5 h du matin alors qu'elle serait considérée comme normale à 10 h du matin.

À chaque évaluation de l'alerte, Datadog calcule le pourcentage de la série qui se situe au-dessous, en dessous et en dehors de la plage attendue. Une alerte se déclenche lorsque ce pourcentage dépasse le seuil configuré.

Pour en savoir plus, consultez la page [Monitor d'anomalies][1].

[1]: /fr/monitors/monitor_types/anomaly/
{{% /tab %}}
{{% tab "Singularités" %}}

Les monitors de singularité envoient une alerte lorsqu'un membre d'un groupe (hosts, zones de disponibilité, partitions, etc.) affiche un comportement anormal par rapport aux autres membres.

À chaque évaluation de l'alerte, Datadog vérifie si tous les groupes font partie d'un cluster et affichent le même comportement. Une alerte se déclenche lorsqu'un ou plusieurs groupes diffèrent des autres groupes.

Pour en savoir plus, consultez la page [Monitor de singularité][1].

[1]: /fr/monitors/monitor_types/outlier/
{{% /tab %}}
{{% tab "Prévision" %}}

Une alerte de prévision prédit le comportement futur d'une métrique et le compare à un seuil fixe. Ce type d'alerte est particulièrement utile pour les métriques qui affichent des tendances marquées ou des patterns récurrents.

À chaque évaluation de l'alerte, Datadog prédit les valeurs futures de la métrique ainsi que les limites de l'écart-type attendu. Une alerte se déclenche lorsque l'une de ces limites dépasse le seuil configuré.

Pour en savoir plus, consultez la page [Monitor de prévisions][1].

[1]: /fr/monitors/monitor_types/forecasts/
{{% /tab %}}
{{< /tabs >}}

### Définir la métrique

Toute métrique envoyant des informations à Datadog peut être évaluée par un monitor. Utilisez l'éditeur et les étapes ci-dessous pour définir la métrique :
{{< img src="monitors/monitor_types/metric/metric_scope.png" alt="contexte de la métrique" >}}

| Étape                | Obligatoire | Paramètre par défaut    | Exemple           |
|---------------------|----------|------------|-------------------|
| Sélectionner une métrique     | Oui      | Aucune       | `system.cpu.user` |
| Définir l'origine     | Non       | Everywhere | `env:prod`        |
| Exclure des [tags][2]        | Non       | Aucune       | `role:testing`    |
| Spécifier l'agrégation | Oui      | `avg by`   | `sum by`          |
| Regrouper par            | Non       | Everything | `host`            |

**Remarque** : la définition de métriques pour les monitors se fait de la même façon que pour les graphiques. Pour en savoir plus sur l'utilisation de l'option `Advanced...`, consultez la section [Créer des graphiques avancés][3].

#### Groupe d'alertes

Les alertes sont automatiquement regroupées en fonction de l'option choisie dans le champ `Group by` lors de la définition de votre métrique. Si aucun groupe n'est spécifié, le paramètre de regroupement par défaut est `Simple Alert`. Si des groupes sont sélectionnés, le paramètre de regroupement par défaut est `Multi Alert`.

Les alertes simples agrègent vos données pour toutes les sources de transmission. Vous recevez une alerte lorsque la valeur agrégée répond aux conditions définies. Ces alertes sont particulièrement utiles pour surveiller une métrique issue d'un seul host ou une métrique agrégée à partir de nombreux hosts.

Les alertes multiples appliquent l'alerte à chaque source en fonction des paramètres de votre groupe. Vous recevez une alerte pour chaque groupe qui répond aux conditions définies. Par exemple, vous pouvez regrouper `system.disk.in_use` par `host` et `device` pour recevoir une alerte distincte pour chaque appareil de host qui manque d'espace disque.

### Définir vos conditions d'alerte

Les conditions d'alerte varient légèrement en fonction de la méthode de détection choisie.

{{< tabs >}}
{{% tab "Seuil" %}}

* Envoyer une alerte lorsque la métrique est `above`, `above or equal to`, `below` ou `below or equal to` (supérieure, supérieure ou égale à, inférieure ou égale à)
* la valeur seuil `on average`, `at least once`, `at all times` ou `in total` (en moyenne, au moins une fois, en permanence ou au total)
* sur un intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou encore lors d'une période `custom` (comprise entre 1 minute et 48 heures).

**Définitions** :

| Option                  | Description                                                                                                                                                                                                                   |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| on&nbsp;average         | La moyenne de la série est calculée afin de générer une valeur unique, qui est ensuite comparée au seuil. Cette option ajoute la fonction `avg()` à la requête de votre monitor.                                                                                   |
| at&nbsp;least&nbsp;once | Si une valeur dans la série générée dépasse le seuil, une alerte se déclenche alors. Cette option ajoute une fonction à la requête de votre monitor en fonction de votre sélection : `min()` pour des valeurs inférieures ou `max()` pour des valeurs supérieures.              |
| at&nbsp;all&nbsp;times  | Si chaque point compris dans l'intervalle d'évaluation de votre requête dépasse le seuil, une alerte se déclenche alors. Cette option ajoute une fonction à la requête de votre monitor en fonction de votre sélection : `min()` pour des valeurs supérieures ou `max()` pour des valeurs inférieures. |
| in&nbsp;total           | Si la somme de tous les points de la série dépasse le seuil, une alerte se déclenche alors. Cette option ajoute la fonction `sum()` à la requête de votre monitor.                                                                        |

**Remarque** : trois comportements différents peuvent être appliqués lorsque vous utilisez `as_count()`. Consultez [as_count() dans les évaluations de monitors][1] pour en savoir plus.

[1]: /fr/monitors/guide/as-count-in-monitor-evaluations/
{{% /tab %}}
{{% tab "Changement" %}}

* La valeur `average`, `maximum`, `minimum` ou `in total` (moyenne, maximale, minimale ou totale)
* du `change` ou `% change` (changement ou changement relatif)
* sur un intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou encore lors d'une période `custom` (comprise entre 1 minute et 48 heures).
* par rapport aux valeurs d'une intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou encore à celles d'une période `custom` (comprise entre 1 minute et 48 heures auparavant).
* est `above`, `above or equal to`, `below` ou `below or equal to` (supérieure, supérieure ou égale à, inférieure, inférieure ou égale à) la valeur seuil.

**Définitions** :

| Option        | Description                                                                                                                                                        |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| change        | Le changement exprimé en valeur absolue.                                                                                                                                  |
| %&nbsp;change | Le changement exprimé en pourcentage par rapport à la valeur précédente. Par exemple, si la valeur actuelle est de 4 et que la valeur précédente est de 2, cela correspond à un changement de 100 %. |

{{% /tab %}}
{{< /tabs >}}

#### Seuils

Utilisez les seuils pour définir la valeur numérique à partir de laquelle une alerte doit se déclencher. En fonction de la métrique choisie, l'éditeur affiche l'unité utilisée (`byte`, `kibibyte`, `gibibyte`, etc).

Datadog peut envoyer des notifications d'alerte et des notifications d'avertissement. Les monitors sont rétablis automatiquement en fonction du seuil d'alerte ou d'avertissement, mais des conditions supplémentaires peuvent être spécifiées. Pour en savoir plus sur les seuils de rétablissement, consultez la section [Qu'est-ce qu'un seuil de rétablissement ?][4].

| Option                     | Description                                                                     |
|----------------------------|---------------------------------------------------------------------------------|
| Alert threshold            | La valeur utilisée pour déclencher une notification d'alerte.                                |
| Warning threshold          | La valeur utilisée pour déclencher une notification d'avertissement.                               |
| Alert recovery threshold   | Un seuil facultatif pour indiquer une condition supplémentaire de rétablissement d'alerte.   |
| Warning recovery threshold | Un seuil facultatif pour indiquer une condition supplémentaire de rétablissement d'avertissement. |

Lorsque vous modifiez un seuil, l'aperçu du graphique dans l'éditeur affiche un indicateur symbolisant la limite.

**Remarque** : lorsque vous saisissez des valeurs décimales pour des seuils, si votre valeur est `<1`, ajoutez un `0` au début du nombre. Par exemple, utilisez `0.5` et non `,5`.

#### Data window

Utilisez les options `Require` et `Do not require` pour définir si l'intervalle de mesure entier doit être comblé avant d'évaluer le monitor.

Ce paramètre vous permet de choisir à quel moment un monitor doit être évalué par le moteur d'alertes.

**Require** (par défaut) : le monitor n'est pas évalué tant que des données ne sont pas disponibles pour l'ensemble de l'intervalle de mesure. Par exemple, lorsqu'un nouveau host est mis en place, sa charge processeur peut augmenter pendant une ou deux minutes. L'envoi d'une alerte n'est pas nécessaire si la charge processeur revient rapidement à la normale.

**Do not require** : le monitor est évalué dès qu'il est reconnu. Choisissez cette option si vos points de données sont très éloignés. Sinon, le monitor risque de ne pas être évalué car l'intervalle de mesure ne sera jamais considéré comme « comblé ».

#### No data

Utilisez l'option `Do not notify` pour ne pas être notifié en cas d'absence de données ou `Notify` pour être  notifié en cas d'absence de données pendant plus de `N` minutes.

Les notifications d'absence de données sont particulièrement utiles si une métrique est supposée envoyer des données en permanence. Par exemple, si un host sur lequel l'Agent est installé doit être disponible en continu, la métrique `system.cpu.idle` doit toujours envoyer des données. Dans ce cas, nous vous conseillons d'activer ces notifications.

**Remarque** : l'intervalle d'absence de données doit être au moins deux fois supérieur à l'intervalle d'évaluation.

En revanche, si vous surveillez une métrique pour un groupe de hosts avec mise à l'échelle automatique où les hosts s'arrêtent et démarrent automatiquement, vous risqueriez de recevoir un trop grand nombre de notifications. Dans ce cas, nous vous conseillons de ne pas les activer. Cette option ne fonctionne pas si vous l'activez alors qu'aucune donnée n'a été transmise pendant une longue période.

##### Groupes

Lorsqu'un monitor n'envoie pas de notifications d'absence de données et qu'un groupe n'envoie pas de données, le monitor n'effectue aucune évaluation et finit par mettre de côté le groupe. Pendant cette période, la barre sur la page des résultats reste verte. Lorsque les groupes recommencent à envoyer des données, la barre verte affiche un statut OK et se remplit comme si aucune interruption n'avait eu lieu.

#### Rétablissement automatique

Utilisez les options `[Never]`, `After 1 hour`, `After 2 hours`, etc. pour choisir si et au bout de combien de temps un monitor doit être automatiquement rétabli après s'être déclenché.

Lorsqu'une métrique n'envoie des données qu'à certains moments, il est logique de résoudre automatiquement une alerte après un certain temps. Par exemple, si un counter envoie uniquement des informations lorsqu'une erreur est détectée, l'alerte n'est jamais résolue car la métrique ne renvoie jamais un nombre d'erreurs égal à `0`. Dans ce cas, il est préférable de résoudre l'alerte lorsque la métrique est inactive depuis un certain temps. **Remarque** : si un monitor est automatiquement rétabli et que la valeur de la requête ne satisfait pas le seuil de rétablissement lors de l'évaluation suivante, le monitor déclenche une nouvelle alerte.

Ce paramètre n'est pas utile dans la plupart des cas : il est préférable de résoudre une alerte uniquement lorsqu'elle a été traitée. Il convient donc généralement de le laisser sur `[Never]`. Les alertes sont alors uniquement résolues lorsque la métrique est supérieure ou inférieure au seuil défini.

#### Evaluation delay

Choisissez de retarder l'évaluation de `N` secondes.

La durée (en secondes) correspondant au délai avant l'évaluation. La valeur doit être un nombre entier non négatif. Par exemple, si le délai est défini sur 900 secondes (15 min), que l'intervalle est défini sur les dernières `5 minutes` et qu'il est 7 h, le monitor évalue les données mesurées entre 6 h 40 et 6 h 45.

**Remarque** : un délai de 15 minutes est conseillé pour les métriques cloud renvoyées par les fournisseurs de service. De plus, lorsque vous utilisez une formule de division, un délai de 60 secondes est utile pour veiller à ce que votre monitor évalue des valeurs complètes.

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/metric
[2]: /fr/getting_started/tagging/using_tags/?tab=assignment
[3]: /fr/dashboards/querying/#advanced-graphing
[4]: /fr/monitors/faq/what-are-recovery-thresholds/
[5]: /fr/monitors/notifications/