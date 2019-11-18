---
title: Surveiller des SLO
kind: documentation
description: Définir un Service Level Objective à partir de monitors
further_reading:
  - link: monitors
    tag: Documentation
    text: Plus d'informations sur les monitors
---
## Présentation

Sélectionnez une source de monitors pour définir votre SLO en fonction de monitors Datadog. Vous pouvez sélectionner des monitors existants ou en créer d'autres directement. Pour en savoir plus sur les monitors, consultez la [documentation dédiée][1]. Les SLO basés sur des monitors sont particulièrement utiles pour identifier les comportements positifs et négatifs dans le temps à partir d'un flux de données. 
Il est possible de diviser la durée cumulée des comportements positifs par la durée totale pour obtenir un Service Level Indicator (ou SLI).

## Implémentation

Sur la [page des SLO][2], sélectionnez **New SLO +** puis **Monitor**.

### Configuration

#### Définir les requêtes

Pour commencer, vous devez avoir configuré des monitors Datadog. Pour configurer un nouveau monitor de SLO, accédez à la [page Monitors][3]. Recherchez un nom de monitor et cliquez sur celui-ci pour l'ajouter à la liste de sources. Par exemple, il est possible de définir un SLO basé sur un monitor qui est satisfait lorsque la latence de toutes les requêtes utilisateur est inférieure à 250 ms 99 % du temps sur une période de 30 jours. Pour ce faire, vous pouvez :

1. Sélectionner un seul monitor, ou
2. Sélectionner plusieurs monitors (jusqu'à 20), ou
3. Sélectionner un monitor à alertes multiples et sélectionner des groupes de monitors spécifiques (jusqu'à 20) à inclure dans le calcul du SLO.

**Types de monitors pris en charge** :

- Les différents types de monitor (monitors de métrique, d'anomalie, d'APM, de prévision, outlier et de métrique d'intégration)
- Les checks de service
- Synthetics

**Exemple :** vous surveillez l'uptime d'un appareil physique. Vous avez déjà configuré un monitor de métrique pour `host:foo` à l'aide d'une métrique custom. Ce monitor prévient également l'équipe d'intervention si le host n'est plus disponible. Pour éviter que l'équipe ne soit trop sollicitée, vous souhaitez surveiller la fréquence de survenue d'un downtime pour ce host.

#### Définir vos cibles

La cible d'un SLO est la valeur utilisée pour déterminer si l'objectif d'uptime est satisfait.

Commencez par sélectionner votre valeur cible. Exemple : `95 % des requêtes HTTP doivent avoir satisfait l'objectif de latence au cours des 7 derniers jours`.

Vous pouvez également spécifier une valeur d'avertissement supérieure à la valeur cible afin de savoir lorsque le SLO est sur le point de ne plus être satisfait.

#### Identifier cet indicateur

Cette section vous permet d'ajouter des informations contextuelles sur l'intérêt de votre SLO. Vous pouvez notamment spécifier une description ainsi que les tags à associer au SLO.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors
[2]: https://app.datadoghq.com/slo/new/monitor
[3]: https://app.datadoghq.com/monitors#create/metric