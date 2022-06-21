---
description: Définir un Service Level Objective à partir de monitors
further_reading:
- link: /monitors/
  tag: Documentation
  text: Plus d'informations sur les monitors
- link: https://www.datadoghq.com/blog/define-and-manage-slos/#monitor-based-slo
  tag: Blog
  text: Conseils à suivre pour gérer vos SLO avec Datadog
kind: documentation
title: SLO basé sur des monitors
---

## Présentation
Pour utiliser un SLO reposant sur des monitors Datadog nouveaux ou existants, créez un SLO basé sur des monitors.

Les ensembles de données temporelles fonctionnent généralement bien avec les SLO basés sur des monitors. Ce type de SLO vous permet de calculer un SLI (Service Level Indicator). Pour ce faire, il vous suffit de diviser la durée des bons comportements de votre système par la durée totale.

{{< img src="monitors/service_level_objectives/grouped_monitor_based_slo.png" alt="exemple de SLO basé sur des monitors"  >}}

## Prérequis

Pour créer un SLO basé sur des monitors, vous devez utiliser un monitor Datadog. Pour créer un monitor, accédez à la [page de création des monitors][1].

Les SLO Datadog basés sur des monitors prennent en charge les types de monitors suivants :
- Types de monitors de métrique (métrique, intégration, métrique APM, anomalie, prévisions, outlier)
- Synthetic
- Checks de service (fonctionnalité en bêta ouverte)

## Configuration

Sur la [page de statut SLO][2], sélectionnez **New SLO**.

Sous **Define the source**, sélectionnez **Monitor Based**.

### Définir les requêtes

Commencez à saisir dans la barre de recherche le nom d'un monitor, afin d'afficher la liste des monitors correspondants. Cliquez sur le nom d'un monitor pour l'ajouter à la liste des sources.

### Définir les cibles de votre SLO

Sélectionnez un pourcentage **cible**, un **intervalle** et un niveau d'**avertissement** (facultatif).

Le pourcentage cible définit la durée pendant laquelle le ou les monitors sous-jacents du SLO ne doivent pas posséder le statut ALERT.

L'intervalle définit la période glissante prise en compte pour le calcul du SLO.

La couleur du statut SLO dans l'interface Datadog varie selon la valeur du SLI :
- Tant que le SLI reste au-dessus de la cible, le statut du SLO est indiqué en vert.
- Si le SLI tombe en deçà de la cible, le statut du SLO est indiqué en rouge.
- Si vous avez défini un niveau d'alerte et que le SLI est inférieur à ce niveau, mais supérieur au niveau cible, le statut du SLO est indiqué en jaune.

L'intervalle sélectionné pour vos SLO basés sur des monitors modifie leur précision :
- Les intervalles de 7 et 30 jours offrent une précision au centième près (2 décimales).
- Les intervalles de 90 jours offrent une précision au millième près (3 décimales).

Dans la vue détaillée du SLO, les valeurs affichées pour les SLO sont arrondies au centième près pour les intervalles de 7 et 30 jours, et au millième près pour les intervalles de 90 jours.

Datadog limite le nombre de décimales des calculs SLO pour une très bonne raison. Une cible de 99,999 % pour un intervalle de 7 ou 30 jours entraînerait une marge d'erreur de 6 ou 26 secondes, respectivement. Or, les monitors sont évalués toutes les minutes, ce qui fait que la granularité des SLO basés sur des monitors est également d'une minute. Ainsi, une seule alerte dépasserait la marge d'erreur de 6 ou 26 secondes. Les équipes ne peuvent donc pas réalistement utiliser des marges d'erreur aussi faibles.

Si vous souhaitez bénéficier d'une granularité de moins d'une minute pour l'évaluation des monitors, utilisez plutôt des [SLO basés sur des métriques][3].

### Définir un nom et ajouter des tags

Attribuez un nom à votre SLO et saisissez une description détaillée. Sélectionnez ensuite les tags que vous souhaitez associer à votre SLO.

Sélectionnez l'option **Save & Exit** pour enregistrer votre nouveau SLO.

## Calcul des statuts

{{< img src="monitors/service_level_objectives/aggregate_slo.jpg" alt="Vue détaillée d'un SLO affichant la valeur 99,09 % en vert avec huit groupes agrégés"  >}}

Datadog calcule le statut global en se basant sur le pourcentage de temps durant lequel **tous** les monitors ou **tous** les groupes calculés d'un monitor à alertes multiples ne possédaient pas le statut `ALERT`. Le statut global ne repose pas sur la moyenne des monitors agrégés ou des groupes agrégés.

Pour les SLO basés sur des monitors, le statut `WARN` est équivalent au statut `OK`. La définition du SLO nécessite donc une distinction binaire entre les bons et les mauvais comportements. Pour les calculs de SLO, le statut `WARN` est considéré comme un bon comportement, puisqu'il n'est pas assez grave pour être classifié comme un mauvais comportement.

Prenons l'exemple suivant pour un SLO basés sur trois monitors. Sachez que le calcul serait similaire pour un SLO basés sur un monitor à alertes multiples.

| Monitor            | t1 | t2 | t3    | t4 | t5    | t6 | t7 | t8 | t9    | t10 | Statut |
|--------------------|----|----|-------|----|-------|----|----|----|-------|-----|--------|
| Monitor 1          | OK | OK | OK    | OK | ALERT | OK | OK | OK | OK    | OK  | 90 %    |
| Monitor 2          | OK | OK | OK    | OK | OK    | OK | OK | OK | ALERT | OK  | 90 %    |
| Monitor 3          | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK    | OK  | 80 %    |
| **Statut global** | OK | OK | ALERT | OK | ALERT | OK | OK | OK | ALERT | OK  | 70 %    |

Dans cet exemple, le statut global est inférieur à la moyenne de chaque statut.

### Exceptions pour les tests Synthetic
Dans certains cas, le statut des SLO basés sur des monitors utilisant un seul test Synthetic groupé est calculé différemment. Les tests Synthetic permettent de définir des conditions d'alerte spéciales qui modifient les circonstances dans lesquelles le test affiche un ALERT, ce qui affecte ensuite l'uptime global :

- Attendre que les groupes échouent depuis un certain nombre de minutes (valeur par défaut : 0)
- Attendre qu'un certain nombre de groupes échouent (valeur par défaut : 1)
- Réessayer un certain nombre de fois avant que le test d'un emplacement soit considéré comme un échec (valeur par défaut : 0)

Si vous modifiez la valeur par défaut de l'une de ces conditions, il se peut que le statut global d'un SLO basé sur des monitors et utilisant uniquement un test Synthetic soit meilleur que les statuts agrégés de chaque groupe du test Synthetic.

Pour en savoir plus sur les conditions d'alerte des tests Synthetic, consultez la section relative à la [surveillance Synthetic][4].

### Incidence des mises à jour manuelles et automatiques des monitors

En cas de résolution manuelle d'un monitor ou de résolution déclenchée par le paramètre **_After x hours automatically resolve this monitor from a triggered state_**, les calculs de SLO ne sont pas affectés. Si ces processus occupent une part importante dans votre workflow, vous pouvez dupliquer votre monitor, supprimer les paramètres de résolution automatique et les notifications `@`, puis utiliser le monitor dupliqué pour votre SLO.

Datadog vous conseille de ne pas utiliser les monitors possédant un `Alert Recovery Threshold` ou un `Warning Recovery Threshold` comme monitors sous-jacents d'un SLO. En effet, ces paramètres peuvent vous empêcher de distinguer clairement les bons comportements des mauvais comportements d'un SLI.

La désactivation des alertes d'un monitor n'a aucune incidence sur le calcul d'un SLO.

Pour exclure des intervalles du calcul d'un SLO, utilisez la fonctionnalité de [correction de statut SLO][5].

### Données manquantes
Lors de la création d'un monitor, vous choisissez si vous souhaitez ou non envoyer une alerte en l'absence de données. Ce paramètre modifie la façon dont les calculs de SLO basés sur des monitors gèrent une absence de données.

Lorsqu'un monitor est configuré de façon à ignorer des données manquantes, le SLO considère que les intervalles sans données possèdent le statut OK. À l'inverse, lorsqu'un monitor est configuré de façon à envoyer une alerte en l'absence de données, le SLO considère que les intervalles sans données possèdent le statut ALERT.

## Monitor sous-jacent et historiques de SLO

Les SLO basés sur des types de monitors de métrique bénéficient de la fonctionnalité SLO Replay. Celle-ci permet de remplir les statuts d'un SLO à partir des données historiques provenant des configurations de requête et de métrique des monitors sous-jacents. Lorsque vous créez un monitor de métrique et définissez un SLO sur ce monitor, vous n'avez pas besoin d'attendre 7, 30 ou 90 jours pour consulter le statut du SLO. En effet, la fonctionnalité SLO Replay est activée dès la création du SLO et permet de récupérer l'historique des métriques et requêtes sous-jacentes du monitor pour fournir un statut.

Cette fonctionnalité sert également à corriger le statut lorsque vous modifiez la requête d'un monitor de métrique sous-jacent. Le nouveau statut est déterminé en fonction de la nouvelle configuration du monitor. Le recalcul de l'historique de statuts d'un SLO par la fonctionnalité SLO Replay peut entraîner des écarts entre l'historique de statuts du monitor et celui du SLO.

**Remarque** : la fonctionnalité SLO Replay n'est pas disponible pour les SLO basés sur des tests Synthetic ou des checks de service.

## Considérations supplémentaires

Vérifiez que vous utilisez bien le type de SLI conseillé pour votre scénario. Datadog prend en charge les SLI basés sur des monitors ainsi que les [SLI basés sur des métriques][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create
[2]: https://app.datadoghq.com/slo
[3]: /fr/monitors/service_level_objectives/metric/
[4]: /fr/synthetics/api_tests/?tab=httptest#alert-conditions
[5]: /fr/monitors/service_level_objectives/#slo-status-corrections