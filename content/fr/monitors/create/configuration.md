---
description: Description de la page de création des monitors
kind: documentation
title: Configurer des monitors
---

## Présentation

Avant de configurer un monitor, choisissez d'abord son [type][1]. Vous devez remplir quatre sections avant de pouvoir enregistrer votre monitor :

* **Define the search query :** créez une requête afin de compter le nombre d'événements, de mesurer des métriques, de regrouper une ou plusieurs dimensions, etc.
* **Set alert conditions :** configurez des seuils d'alerte et d'avertissement, des intervalles d'évaluation et des options d'alerte avancées.
* **Say what's happening :** attribuez un titre personnalisé à la notification et rédigez un message contenant des variables.
* **Notify your team :** choisissez comment envoyer les notifications à vos équipes (par e-mail, via Slack ou PagerDuty, etc.).

## Définir la requête de recherche

Pour découvrir comment créer la requête de syntaxe, consultez les pages de documentation de chaque [type de monitor][1]. Le graphique d'aperçu situé au-dessus des champs de recherche s'actualise au fur et à mesure que vous modifiez la requête de recherche.

{{< img src="/monitors/create/preview_graph_monitor.mp4" alt="Graphique d'aperçu" video=true style="width:90%;">}}

### Groupe d'alertes

Les alertes sont automatiquement regroupées en fonction de l'option choisie dans le champ `group by` lors de la définition de votre requête. Si aucun groupe n'est spécifié, le paramètre de regroupement par défaut est `Simple Alert`. Si la requête est regroupée en fonction d'une dimension, le paramètre de regroupement par défaut est `Multi Alert`.

L'option `Simple Alert` agrège vos données pour toutes les sources de transmission. Vous recevez **une alerte** lorsque la valeur agrégée répond aux conditions définies.

L'option `Multi Alert` applique l'alerte à chaque source en fonction des paramètres de votre groupe. Vous recevez alors **une alerte pour chaque groupe** qui répond aux conditions définies. Par exemple, vous pouvez regrouper une requête surveillant une métrique de capacité par `host` et `device`, afin de recevoir une alerte distincte pour chaque appareil host qui manque d'espace disque.
Notez que si votre métrique transmet uniquement des données en fonction de `host` sans tag `device`, elle n'est pas détectée par un groupe de monitors configurés pour les tags `host` et `device`. Vous pouvez utiliser des [variables de tag][2] pour chaque groupe évalué dans l'alerte multiple, afin d'intégrer dynamiquement dans les notifications des informations de contexte utiles.

| Regrouper en fonction de                       | Alerte simple | Alertes multiples |
|-------------------------------------|------------------------|-----------------------|
| _(tous les éléments)_                      | Un seul groupe déclenchant une notification | S. O. |
| Une ou plusieurs dimensions | Envoi d'une notification si un ou plusieurs groupes répondent aux conditions de l'alerte | Envoi d'une notification par groupe respectant les conditions d'alerte |

## Définir vos conditions d'alerte

Les conditions d'alerte varient en fonction du [type de monitor][1]. Vous pouvez configurer vos monitors de façon à ce qu'ils se déclenchent lorsque la valeur de la requête dépasse un certain seuil, ou si un certain nombre de checks consécutifs ont échoué.

{{< tabs >}}
{{% tab "Alerte de seuil" %}}

* Envoyer une alerte lorsque la métrique est `above`, `above or equal to`, `below` ou `below or equal to` (supérieure, supérieure ou égale à, inférieure ou égale à)
* la valeur seuil `on average`, `at least once`, `at all times` ou `in total` (en moyenne, au moins une fois, en permanence ou au total)
* sur un intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou encore lors d'une période `custom` comprise entre 1 minute et 48 heures (jusqu'à 1 mois pour les monitors de métrique).

<h3>Méthode d'agrégation</h3>

La requête renvoie une série de points. Toutefois, le monitor ne doit comparer qu'une seule valeur au seuil. Les données transmises lors de la période d'évaluation doivent donc être converties en une valeur unique.

| Option                  | Description                                            |
|-------------------------|--------------------------------------------------------|
| on&nbsp;average         | La moyenne de la série est calculée afin de générer une valeur unique, qui est ensuite comparée au seuil. Cette option ajoute la fonction `avg()` à la requête de votre monitor. |
| at&nbsp;least&nbsp;once | Si une valeur dans la série générée dépasse le seuil, une alerte se déclenche alors. Cette option ajoute une fonction à la requête de votre monitor en fonction de votre sélection : `min()` pour des valeurs inférieures ou `max()` pour des valeurs supérieures. |
| at&nbsp;all&nbsp;times  | Si chaque point compris dans l'intervalle d'évaluation de votre requête dépasse le seuil, une alerte se déclenche alors. Cette option ajoute une fonction à la requête de votre monitor en fonction de votre sélection : `min()` pour des valeurs supérieures ou `max()` pour des valeurs inférieures. |
| in&nbsp;total           | Si la somme de tous les points de la série dépasse le seuil, une alerte se déclenche alors. Cette option ajoute la fonction `sum()` à la requête de votre monitor. |

**Remarque** : trois comportements différents peuvent être appliqués lorsque vous utilisez `as_count()`. Consultez [as_count() dans les évaluations de monitors][1] pour en savoir plus.

<h3>Période d'évaluation</h3>

Les monitors sont évalués à une certaine fréquence (généralement toutes les minutes) sur une période relative (comme les cinq dernières minutes ou la dernière heure).

<h3>Seuils</h3>

Utilisez les seuils pour définir la valeur numérique à partir de laquelle une alerte doit se déclencher. En fonction de la métrique choisie, l'éditeur affiche l'unité utilisée (`byte`, `kibibyte`, `gibibyte`, etc).

Datadog peut envoyer des notifications d'alerte et des notifications d'avertissement. Les monitors sont rétablis automatiquement en fonction du seuil d'alerte ou d'avertissement, mais des conditions supplémentaires peuvent être spécifiées. Pour en savoir plus sur les seuils de rétablissement, consultez la section [Qu'est-ce qu'un seuil de rétablissement ?][2] Par exemple, si un monitor envoie une alerte lorsqu'une métrique dépasse la valeur `3` et qu'aucun seuil de rétablissement n'est défini, le monitor se rétablit lorsque la valeur de la métrique redescend sous `3`.

| Option                                   | Description                    |
|------------------------------------------|--------------------------------|
| Seuil d'alerte **(obligatoire)** | La valeur utilisée pour déclencher une notification d'alerte. |
| Seuil d'avertissement                   | La valeur utilisée pour déclencher une notification d'avertissement. |
| Seuil de rétablissement de l'alerte       | Un seuil facultatif pour indiquer une condition supplémentaire de rétablissement d'alerte. |
| Seuil de rétablissement de l'avertissement     | Un seuil facultatif pour indiquer une condition supplémentaire de rétablissement d'avertissement. |

Lorsque vous modifiez un seuil, l'aperçu du graphique dans l'éditeur affiche un indicateur symbolisant la limite.

{{< img src="/monitors/create/preview_graph_thresholds.png" alt="Graphique d'aperçu des seuils" style="width:100%;">}}

**Remarque** : lorsque vous saisissez des valeurs décimales pour des seuils, si votre valeur est `<1`, ajoutez un `0` au début du nombre. Par exemple, utilisez `0.5` et non `,5`.


[1]: /fr/monitors/guide/as-count-in-monitor-evaluations/
[2]: /fr/monitors/faq/what-are-recovery-thresholds/
{{% /tab %}}
{{% tab "Alerte de check" %}}

Une alerte de check récupère les statuts consécutifs envoyés pour chaque groupe de checks et les compare à vos seuils. Configurez une alerte de check pour :

1. Déclencher l'alerte après le nombre d'échecs consécutifs sélectionné : `<NOMBRE>`

    Chaque exécution du check transmet un statut unique (`OK`, `WARN` ou `CRITICAL`). Choisissez le nombre de statuts `WARN` et `CRITICAL` consécutifs à partir duquel une notification doit être envoyée. Par exemple, il arrive que la connexion à un processus échoue pendant un bref instant seulement ; en définissant cette valeur sur `> 1`, les échecs ponctuels sont ignorés, tandis que les échecs prolongés déclenchent une notification.

    {{< img src="/monitors/create/check_thresholds_alert_warn.png" alt="Seuils d'alerte et d'avertissement d'un check" style="width:90%;">}}

2. Résoudre l'alerte après le nombre de réussites consécutives sélectionné : `<NOMBRE>`

    Choisissez le nombre de statuts `OK` consécutifs à partir duquel l'alerte doit être résolue.

    {{< img src="/monitors/create/check_thresholds_recovery.png" alt="Seuils de rétablissement d'un check" style="width:90%;">}}

Consultez la documentation sur les monitors de [check de processus][1], [check d'intégration][2] et [check custom][3] pour en savoir plus sur la configuration des alertes des checks.



[1]: /fr/monitors/create/types/process_check/
[2]: /fr/monitors/create/types/integration/?tab=checkalert#integration-status
[3]: /fr/monitors/create/types/custom_check/
{{% /tab %}}
{{< /tabs >}}

### Conditions d'alerte avancées

#### No data

Utilisez l'option `Do not notify` pour ne pas être notifié en cas d'absence de données ou `Notify` pour être  notifié en cas d'absence de données pendant plus de `N` minutes.

Les notifications d'absence de données sont particulièrement utiles si une métrique est supposée envoyer des données en permanence. Par exemple, si un host sur lequel l'Agent est installé doit être disponible en continu, la métrique `system.cpu.idle` doit toujours envoyer des données. Dans ce cas, nous vous conseillons d'activer ces notifications.

**Remarque** : l'intervalle d'absence de données doit être au moins deux fois supérieur à l'intervalle d'évaluation.

En revanche, si vous surveillez une métrique pour un groupe de hosts avec mise à l'échelle automatique où les hosts s'arrêtent et démarrent automatiquement, vous risqueriez de recevoir un trop grand nombre de notifications. Dans ce cas, nous vous conseillons de ne pas les activer. Cette option ne fonctionne pas si vous l'activez alors qu'aucune donnée n'a été transmise pendant une longue période.

##### Groupes

Lorsqu'un monitor n'envoie pas de notifications d'absence de données et qu'un groupe n'envoie pas de données, le monitor n'effectue aucune évaluation et finit par mettre de côté le groupe. Pendant cette période, la barre sur la page des résultats reste verte. Lorsque les groupes recommencent à envoyer des données, la barre verte affiche un statut OK et se remplit comme si aucune interruption n'avait eu lieu.

#### Rétablissement automatique

Utilisez les options `[Never]`, `After 1 hour`, `After 2 hours`, etc. pour choisir si et au bout de combien de temps un monitor doit être automatiquement rétabli après s'être déclenché.

Le rétablissement automatique s'applique lorsqu'aucune nouvelle donnée n'est transmise. Il n'est pas utilisé pour rétablir les monitors qui passent d'un statut ALERT à un statut WARN alors que des données continuent à être transmises. Si des données sont toujours envoyées, vous pouvez informer votre équipe que le problème n'est pas résolu grâce à la fonctionnalité de [renvoi de notifications][3].

Lorsqu'une métrique n'envoie des données qu'à certains moments, il est logique de résoudre automatiquement une alerte après un certain temps. Par exemple, si un counter envoie uniquement des informations lorsqu'une erreur est détectée, l'alerte n'est jamais résolue car la métrique ne renvoie jamais un nombre d'erreurs égal à `0`. Dans ce cas, il est préférable de résoudre l'alerte lorsque la métrique est inactive depuis un certain temps. **Remarque** : si un monitor est automatiquement rétabli et que la valeur de la requête ne satisfait pas le seuil de rétablissement lors de l'évaluation suivante, le monitor déclenche une nouvelle alerte.

Ce paramètre n'est pas utile dans la plupart des cas : il est préférable de résoudre une alerte uniquement lorsqu'elle a été traitée. Il convient donc généralement de le laisser sur `[Never]`. Les alertes sont alors uniquement résolues lorsque la métrique est supérieure ou inférieure au seuil défini.

#### Délai pour les nouveaux groupes

Retardez de `N` secondes le début de l'évaluation des nouveaux groupes.

Ce délai correspond à la durée, en secondes, après laquelle les alertes commencent à être envoyées. Il permet aux nouveaux groupes de se lancer et aux applications de terminer leur démarrage. Sa valeur doit être définie sur un nombre entier positif.

Par exemple, si votre architecture est conteneurisée, le délai pour les nouveaux groupes vous permet d'éviter de déclencher les groupes de monitors filtrés sur des conteneurs en cas d'utilisation élevée des ressources ou de latence importante au moment de la création d'un conteneur. Le délai est appliqué à tous les nouveaux groupes (qui n'ont pas été détectés lors des dernières 24 heures). Sa valeur est définie par défaut sur `60` secondes.

Cette option est disponible pour les monitors à alertes multiples.

#### Evaluation delay

Choisissez de retarder l'évaluation de `N` secondes.

La durée (en secondes) correspondant au délai avant l'évaluation. La valeur doit être un nombre entier non négatif. Par exemple, si le délai est défini sur 900 secondes (15 min), que l'intervalle est défini sur les dernières `5 minutes` et qu'il est 7 h, le monitor évalue les données mesurées entre 6 h 40 et 6 h 45.

**Remarque** : un délai de 15 minutes est conseillé pour les métriques cloud renvoyées par les fournisseurs de service. De plus, lorsque vous utilisez une formule de division, un délai de 60 secondes est utile pour veiller à ce que votre monitor évalue des valeurs complètes.


[1]: /fr/monitors/create/types
[2]: /fr/monitors/notify/variables/?tab=is_alert#tag-variables
[3]: /fr/monitors/notify/#renotify