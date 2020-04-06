---
title: SLO basé sur des événements
kind: documentation
description: "Utiliser des métriques pour définir un Service Level Objective"
further_reading:
- link: metrics
  tag: Documentation
  text: Plus d'informations sur les métriques
---

## Présentation

Les SLO basés sur des événements sont particulièrement utiles lorsque vous disposez d'un flux de données avec des totaux vous permettant de distinguer les événements positifs des événements négatifs.
Il existe un seul type de SLO basés des événements : les SLO de requêtes de métrique. Une requête de métrique utilise la somme des événements positifs divisée par le nombre total d'événements pour calculer un Service Level Indicator (SLI).

## Implémentation

Sur la [page de statut des SLO][1], sélectionnez **New SLO +**, puis [**Event**][2].

### Configuration

#### Définir les requêtes

Vous devez spécifier deux requêtes. La première définit la somme des événements positifs, tandis que la deuxième définit le nombre total d'événements.

Nous vous recommandons d'utiliser l'agrégateur `sum by` et d'ajouter tous les événements.

**Exemple :** si vous surveillez des codes de retour HTTP, et si votre métrique comprend un tag similaire à `code:2xx`, `code:3xx` ou `code:4xx`, la somme des événements positifs est `sum:httpservice.hits{code:2xx} + sum:httpservice.hits{code:4xx}`, tandis que le `total` d'événements est `sum:httpservice.hits{!code:3xx}`.

Pourquoi exclure `HTTP 3xx` ? Ces codes correspondent généralement à des redirections, qui ne doivent pas être prises en compte pour le calcul du SLI. Seuls les autres codes servent pour le calcul. Pour le `total`, nous souhaitons donc tenir compte de toutes les erreurs, sauf des erreurs `HTTP 3xx`. Le `numérateur` doit donc uniquement comprendre les codes de statut `OK`.

#### Définir vos cibles

La cible d'un SLO est la valeur utilisée pour déterminer si l'objectif d'uptime est satisfait.

Commencez par sélectionner votre valeur cible. Exemple : `95 % des requêtes HTTP doivent avoir satisfait l'objectif de latence au cours des 7 derniers jours`.

Vous pouvez également spécifier une valeur d'avertissement supérieure à la valeur cible afin de savoir lorsque le SLO est sur le point de ne plus être satisfait.

#### Identifier l'indicateur

Cette section vous permet d'ajouter des informations contextuelles sur l'intérêt de votre SLO. Vous pouvez notamment spécifier une description ainsi que les tags à associer au SLO.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: https://app.datadoghq.com/slo/new/event
