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

## Implémentation

Sur la [page de statut des SLO][2], sélectionnez **New SLO +**, puis [**Monitor**][3].

### Définir les requêtes

Pour commencer, vous devez avoir configuré des monitors Datadog. Pour configurer un nouveau monitor, accédez à la [page de création d'un monitor][4] et sélectionnez l'un des types de monitors pris en charge par les SLO (voir la liste ci-dessous). Recherchez un nom de monitor et cliquez sur un monitor pour l'ajouter à la liste de sources. Par exemple, il est possible de définir un SLO basé sur un monitor qui est satisfait lorsque la latence de toutes les requêtes utilisateur est inférieure à 250 ms 99 % du temps sur une période de 30 jours. Pour ce faire, vous pouvez :

1. Sélectionner un seul monitor, ou
2. Sélectionner plusieurs monitors (jusqu'à 20), ou
3. Sélectionner un monitor à alertes multiples et sélectionner des groupes de monitors spécifiques (jusqu'à 20) à inclure dans le calcul du SLO.

**Exemple :** vous surveillez l'uptime d'un appareil physique. Vous avez déjà configuré un monitor de métrique pour `host:foo` à l'aide d'une métrique custom. Ce monitor prévient également l'équipe d'intervention si le host n'est plus disponible. Pour éviter que l'équipe ne soit trop sollicitée, vous souhaitez surveiller la fréquence de survenue d'un downtime pour ce host.

### Définir les cibles de votre SLO

La cible d'un SLO est la valeur utilisée pour déterminer si l'objectif d'uptime est satisfait.

Commencez par sélectionner votre valeur cible. Exemple : `95 % des requêtes HTTP doivent avoir satisfait l'objectif de latence au cours des 7 derniers jours`.

Vous pouvez également spécifier une valeur d'avertissement supérieure à la valeur cible afin de savoir lorsque le SLO est sur le point de ne plus être satisfait.

### Identifier cet indicateur

Cette section vous permet d'ajouter des informations contextuelles sur l'intérêt de votre SLO. Vous pouvez notamment spécifier une description ainsi que les tags à associer au SLO.

### Monitor sous-jacent et historiques de SLO

Lorsque vous apportez des changements au monitor utilisé par un SLO, cela recalcule l'historique du SLO. Ainsi, il est possible que l'historique du monitor et que l'historique du SLO ne correspondent pas.

Nous vous recommandons de ne pas utiliser les monitors caractérisés par un `Alert Recovery Threshold` ou un `Warning Recovery Threshold`. En effet, ils peuvent avoir une incidence sur les calculs de votre SLO et vous empêchent de distinguer clairement les bons comportements des mauvais comportements d'un SLI.

Les calculs SLO ne tiennent pas compte des résolutions manuelles d'un monitor ni des résolutions découlant du paramètre **_After x hours automatically resolve this monitor from a triggered state_**. Si ces processus occupent une place importante dans votre workflow, vous pouvez dupliquer votre monitor, supprimer les paramètres de résolution automatique et les notifications « @  », puis utiliser le monitor dupliqué pour votre SLO.

Vérifiez que vous utilisez bien le type de SLI conseillé pour votre scénario. Datadog prend en charge des SLI basés sur des monitors ainsi que des SLI basés sur des métriques. Pour en savoir plus, consultez la [documentation relative aux SLO basés sur des métriques][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/
[2]: https://app.datadoghq.com/slo
[3]: https://app.datadoghq.com/slo/new/monitor
[4]: https://app.datadoghq.com/monitors#create
[5]: /fr/monitors/service_level_objectives/metric/