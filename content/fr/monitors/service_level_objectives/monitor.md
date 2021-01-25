---
title: SLO basé sur des monitors
kind: documentation
description: Définir un Service Level Objective à partir de monitors
further_reading:
  - link: /monitors/
    tag: Documentation
    text: Plus d'informations sur les monitors
---
## Présentation

Sélectionnez une source de monitors pour définir votre SLO en fonction de monitors Datadog. Vous pouvez sélectionner des monitors existants ou en créer d'autres directement. Pour en savoir plus sur les monitors, consultez la [documentation dédiée][1]. Les SLO basés sur des monitors sont particulièrement utiles pour identifier les comportements positifs et négatifs à partir d'un flux de données temporelles. Il est possible de diviser la durée cumulée des comportements positifs par la durée totale pour obtenir un Service Level Indicator (ou SLI).

{{< img src="monitors/service_level_objectives/grouped_monitor_based_slo.png" alt="exemple de SLO basé sur des monitors"  >}}

## Configuration

Sur la [page de statut des SLO][2], sélectionnez **New SLO +**, puis [**Monitor**][3].

### Définir les requêtes

Pour commencer, vous devez avoir configuré des monitors Datadog. Pour configurer un nouveau monitor, accédez à la [page de création d'un monitor][4] et sélectionnez l'un des types de monitors pris en charge par les SLO (voir la liste ci-dessous). Recherchez un nom de monitor et cliquez sur un monitor pour l'ajouter à la liste de sources.

Par exemple, si votre monitor de métrique est configuré pour lancer une alerte lorsque la latence de requête utilisateur est supérieure à 250 ms, vous pourriez configurer un SLO pour ce monitor. Partons du principe que vous choisissez une cible de SLO de 99 % sur les 30 derniers jours. Cela signifie que la latence des requêtes utilisateur doit être inférieure à 250 ms 99 % du temps sur les 30 derniers jours. Pour appliquer cette configuration, vous devez :

1. Sélectionner un seul monitor, ou
2. Sélectionner plusieurs monitors (jusqu'à 20), ou
3. Sélectionner un [monitor à alertes multiples][5] et sélectionner des groupes de monitors spécifiques (jusqu'à 20) à inclure dans le calcul du SLO en utilisant le bouton **Calculate on selected groups**.

**Types de monitors pris en charge** :

- Types de monitors de métrique (métrique, intégration, APM, anomalie, prévisions, outlier)
- Synthetic
- Checks de service (fonctionnalité en bêta ouverte)

**Exemple :** vous surveillez l'uptime d'un appareil physique. Vous avez déjà configuré un monitor de métrique pour `host:foo` à l'aide d'une métrique custom. Ce monitor prévient également l'équipe d'intervention si le host n'est plus disponible. Pour éviter que l'équipe ne soit trop sollicitée, vous souhaitez surveiller la fréquence de survenue d'un downtime pour ce host.

### Définir les cibles de votre SLO

Une cible de SLO est composée du pourcentage cible et de l'intervalle de temps. Lorsque vous définissez une cible pour un SLO basé sur des monitors, le pourcentage cible indique la portion de l'intervalle de temps durant laquelle le ou les monitors sous-jacents du SLO doivent présenter un statut OK, tandis que l'intervalle de temps indique la période glissante pendant laquelle la cible doit être suivie.

Exemple : 99 % du temps, les requêtes doivent présenter une latence inférieure à 300 ms sur les 7 derniers jours.

Tant que le SLO reste au-dessus du pourcentage cible, le statut du SLO s'affiche en vert. En cas de violation du pourcentage cible, le statut du SLO s'affiche en rouge. Vous pouvez également spécifier une valeur d'avertissement supérieure à la valeur cible afin de savoir lorsque le SLO est sur le point de ne plus être satisfait. En cas de violation du pourcentage d'avertissement (mais pas du pourcentage cible), le statut du SLO s'affiche en jaune.

### Identifier cet indicateur

Cette section vous permet d'ajouter des informations contextuelles sur l'intérêt de votre SLO. Vous pouvez notamment spécifier une description, les ressources connexes, ainsi que les tags à associer au SLO.

## Calcul du statut global

{{< img src="monitors/service_level_objectives/overall_uptime_calculation.png" alt="calcul de la disponibilité globale" >}}

Le statut global peut être considéré comme le pourcentage de temps durant lequel **tous** les monitors ou **tous** les groupes calculés d'un monitor à alertes multiples affichaient un statut `OK`. Il ne s'agit pas de la moyenne pour les monitors agrégés ou les groupes agrégés, respectivement.

Prenons l'exemple suivant pour 3 monitors (cela vaut également pour un SLO basé sur un monitor unique à alertes multiples) :

| Monitor            | t1 | t2 | t3    | t4 | t5    | t6 | t7 | t8 | t9    | t10 | Status |
|--------------------|----|----|-------|----|-------|----|----|----|-------|-----|--------|
| Monitor 1          | OK | OK | OK    | OK | ALERT | OK | OK | OK | OK    | OK  | 90 %    |
| Monitor 2          | OK | OK | OK    | OK | OK    | OK | OK | OK | ALERT | OK  | 90 %    |
| Monitor 3          | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK    | OK  | 80 %    |
| **Statut global** | OK | OK | ALERT | OK | ALERT | OK | OK | OK | ALERT | OK  | 70 %    |

On constate que le statut global peut être inférieur à la moyenne des statuts de chaque monitor.

### Exceptions pour les tests Synthetic
Dans certains cas, le statut des SLO basés sur des monitors utilisant un seul test Synthetic groupé est calculé différemment. Les tests Synthetic permettent de définir des conditions d'alerte spéciales qui modifient les circonstances dans lesquelles le test affiche un ALERT, ce qui affecte ensuite l'uptime global :

- Attendre que les groupes échouent depuis un certain nombre de minutes (valeur par défaut : 0)
- Attendre qu'un certain nombre de groupes échouent (valeur par défaut : 1)
- Réessayer un certain nombre de fois avant que le test d'un emplacement soit considéré comme un échec (valeur par défaut : 0)

Si vous modifiez la valeur par défaut de l'une de ces conditions, il se peut que le statut global d'un SLO basé sur des monitors utilisant uniquement ce test Synthetic soit meilleur que l'ensemble des statuts agrégés de chaque groupe du test Synthetic.

Pour en savoir plus sur les conditions d'alerte des tests Synthetic, consultez la [documentation][6] sur la surveillance Synthetic.

## Monitor sous-jacent et historiques de SLO

Les SLO basés sur les types de monitors de métrique disposent d'une fonctionnalité appelée SLO Replay, qui récupère les précédents statuts des SLO avec des données historiques issues des métriques et des requêtes des monitors sous-jacents. Cela signifie que si vous créez un monitor de métrique et configurez un SLO sur ce nouveau monitor, plutôt que d'attendre 7, 30 ou 90 jours entiers pour que le statut du LSO soit calculé, la fonctionnalité SLO Replay se déclenche et examine la métrique sous-jacente ainsi que la requête du monitor afin d'obtenir le statut sans attendre. La fonctionnalité SLO Replay se déclenche également lorsque la requête du monitor de métrique sous-jacent est modifiée (par exemple, en cas de modification du seuil) afin de corriger le statut en fonction de la nouvelle configuration du monitor. L'historique du statut d'un SLO étant recalculé par la fonctionnalité SLO Replay, il est possible que l'historique du statut du monitor et l'historique du statut du SLO ne correspondent pas après une mise à jour du monitor.

**Remarque** : la fonctionnalité SLO Replay n'est pas prise en charge pour les SLO basés sur des tests Synthetic ou des checks de service.

Nous vous recommandons de ne pas utiliser les monitors caractérisés par un `Alert Recovery Threshold` ou un `Warning Recovery Threshold`. En effet, ils peuvent avoir une incidence sur les calculs de votre SLO et vous empêchent de distinguer clairement les bons comportements des mauvais comportements d'un SLI.

Les calculs SLO ne tiennent pas compte des résolutions manuelles d'un monitor ni des résolutions découlant du paramètre **_After x hours automatically resolve this monitor from a triggered state_**. Si ces processus occupent une place importante dans votre workflow, vous pouvez dupliquer votre monitor, supprimer les paramètres de résolution automatique et les notifications « @  », puis utiliser le monitor dupliqué pour votre SLO.

Vérifiez que vous utilisez bien le type de SLI conseillé pour votre scénario. Datadog prend en charge des SLI basés sur des monitors ainsi que des SLI basés sur des métriques. Pour en savoir plus, consultez la [documentation relative aux SLO basés sur des métriques][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/
[2]: https://app.datadoghq.com/slo
[3]: https://app.datadoghq.com/slo/new/monitor
[4]: https://app.datadoghq.com/monitors#create
[5]: /fr/monitors/monitor_types/metric/?tab=threshold#alert-grouping
[6]: /fr/synthetics/api_tests/?tab=httptest#alert-conditions
[7]: /fr/monitors/service_level_objectives/metric/