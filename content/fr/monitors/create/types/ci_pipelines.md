---
aliases:
- /fr/monitors/monitor_types/ci_pipelines
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/notify/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Vérifier le statut de votre monitor
kind: documentation
title: Monitor de pipeline CI
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Les monitors de pipeline CI sont disponibles en version alpha.
</div>

## Présentation

Une fois la fonctionnalité [CI Visibility][1] activée pour votre organisation, vous pouvez créer un monitor de pipeline CI afin de recevoir une alerte lorsqu'un type d'événement de pipeline CI dépasse un seuil défini par l'utilisateur sur une période donnée.

## Création d'un monitor

Pour créer un [monitor de pipeline CI][2] dans Datadog, utilisez la navigation principale : **Monitors --> New Monitor --> CI Pipelines**.

<div class="alert alert-info"><strong>Remarque</strong> : par défaut, chaque compte est limité à 1 000 monitors de pipeline CI. <a href="/help/">Contactez l'assistance</a> afin d'augmenter cette limite pour votre compte.</div>

### Définir la requête de recherche

1. Créez votre requête de recherche en utilisant la même logique que pour une recherche dans l'explorateur de pipeline CI.
2. Choisissez l'un des niveaux suivants pour les événements de pipeline CI :
    * **`Pipeline`** : si vous sélectionnez le niveau `Pipeline`, le monitor évaluera uniquement les événements de pipeline. Ces événements représentent l'exécution d'un pipeline entier, qui est généralement composé d'une ou de plusieurs tâches.
    * **`Stage`** : si vous sélectionnez le niveau `Stage`, le monitor évaluera uniquement les événements d'étape. Ces événements représentent l'exécution d'un groupe composé d'une ou de plusieurs tâches (pour les fournisseurs CI qui prennent en charge les étapes).
    * **`Job`** : si vous sélectionnez le niveau `Job`, le monitor évaluera uniquement les événements de tâche. Ces événements représentent l'exécution d'un groupe de commandes.
    * **`Command`** : si vous sélectionnez le niveau `Command`, le monitor évaluera uniquement les événements de [commande personnalisée][5] instrumentée manuellement. Ces événements représentent des commandes individuelles exécutées dans le cadre d'une tâche.
    * **`All`** : si vous sélectionnez le niveau `All`, le monitor évaluera tous les types d'événements.

3. Choisissez de surveiller un nombre d'événements de pipeline CI, une facette ou une mesure :
    * **Surveiller un nombre d'événements de pipeline CI** : utilisez la barre de recherche (facultatif) et ne sélectionnez **pas** de facette ni de mesure. Datadog évalue le nombre d'événements de pipeline CI sur une période sélectionnée, puis le compare aux conditions de seuil.
    * **Surveiller une dimension** : si vous sélectionnez une dimension (une facette qualitative), le monitor envoie une alerte en fonction du `Unique value count` (nombre de valeurs uniques) de la facette.
    * **Surveiller une mesure** : si vous sélectionnez une mesure (une facette quantitative), le monitor envoie une alerte en fonction de la valeur numérique de la facette de pipeline CI (comme le ferait un monitor de métrique). Vous devez simplement sélectionner l'agrégation (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` ou `max`).
4. Regroupez les événements de pipeline CI en fonction de plusieurs dimensions (facultatif) :
   Tous les événements de pipeline CI correspondant à la requête sont agrégés au sein de groupes basés sur la valeur d'un maximum de quatre facettes.
5. Configurez la stratégie de regroupement pour les alertes (facultatif) :
   * Si la requête inclut des critères `group by`, les alertes multiples appliquent l'alerte à chaque source en fonction des paramètres de votre groupe. Un événement d'alerte est créé pour chaque groupe qui répond aux conditions définies. Par exemple, vous pouvez regrouper une requête par `@ci.pipeline.name` pour recevoir une alerte distincte pour chaque nom de pipeline CI lorsque le nombre d'erreurs est élevé.

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query.png" alt="Une requête pour le statut CI Status:Error définie avec un regroupement en fonction du nom du pipeline" style="width:80%;" >}}

#### Utiliser des formules et des fonctions

Vous pouvez créer des monitors de pipeline CI à l'aide de formules et de fonctions, par exemple pour surveiller un **taux** de fréquence d'événement, comme le taux d'échec d'un pipeline (taux d'erreur).

Dans l'exemple ci-dessous, un monitor de taux d'erreur de pipeline est créé à l'aide d'une formule calculant le taux suivant : Nombre d'événements de pipeline ayant échoué (`ci.status=error`) / Nombre total d'événements de pipeline (aucun filtre). Le monitor est regroupé en fonction de `ci.pipeline.name`, afin d'envoyer une seule alerte par pipeline.

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query-fnf.png" alt="Définition d'un monitor avec 3 étapes : les étapes a et b correspondent aux requêtes, tandis que l'étape c calcule le taux à partir des deux requêtes." style="width:80%;" >}}

<div class="alert alert-info"><strong>Remarque</strong> : vous pouvez utiliser au maximum deux requêtes par monitor pour créer la formule d'évaluation.</div>

### Définir vos conditions d'alerte

* Envoyer une alerte lorsque la métrique est `above`, `above or equal to`, `below` ou `below or equal to` (supérieure, supérieure ou égale à, inférieure ou égale à) :
* au seuil sur un intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou sur un intervalle `custom` (entre `1 minute` et `2 days`) ;
* au seuil d'alerte `<NOMBRE>` ;
* au seuil d'avertissement `<NOMBRE>`.

#### Conditions d'alerte avancées

Pour obtenir des instructions détaillées concernant les options d'alerte avancées (notamment sur le délai d'évaluation), consultez la documentation relative à la [configuration des monitors][3].

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][4].

#### Envoi de notifications en l'absence de données

En l'absence de données, lorsque la requête d'évaluation d'un monitor est basée sur un nombre d'événements, ou sur une formule, ce monitor se rétablit après la période d'évaluation définie et déclenche l'envoi d'une notification. Par exemple, si un monitor utilise une formule pour envoyer une alerte sur le taux d'erreur d'un pipeline avec une période d'évaluation de cinq minutes, il se rétablit automatiquement si aucune donnée n'est reçue pendant cinq minutes.

Les données de pipeline CI sont généralement creuses, et peuvent ne pas être transmises pendant de longues périodes. Ainsi, il est possible que les monitors de pipeline CI envoient des notifications de rétablissement intempestives.

Si c'est le cas, Datadog vous conseille de configurer votre monitor de façon à ce qu'il déclenche uniquement des notifications en cas d'alerte. Pour ce faire, ajoutez les directives `{{#is_alert}}` et `{{/is_alert}}` respectivement au début et à la fin du message.

```text
{{#is_alert}}
Cette notification sera uniquement envoyée pour les alertes du monitor !
{{/is_alert}}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/
[2]: https://app.datadoghq.com/monitors/create/ci-pipelines
[3]: /fr/monitors/create/configuration/#advanced-alert-conditions
[4]: /fr/monitors/notify/
[5]: /fr/continuous_integration/setup_pipelines/custom_commands/