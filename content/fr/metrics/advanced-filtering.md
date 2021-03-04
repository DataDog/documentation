---
title: Filtrage avancé
kind: documentation
description: Filtrez vos données afin de restreindre le contexte des métriques renvoyées.
further_reading:
  - link: /metrics/explorer/
    tag: Documentation
    text: Metrics Explorer
  - link: /metrics/summary/
    tag: Documentation
    text: Metrics Summary
  - link: /metrics/distributions/
    tag: Documentation
    text: Distributions de métriques
---

## Présentation

Que vous utilisiez des monitors, des dashboards, des notebooks ou le Metrics Explorer pour interroger les données de vos métriques, vous pouvez filtrer les données afin d'affiner le contexte des séries temporelles renvoyées. Il est possible de filtrer n'importe quelle métrique en fonction d'un ou de plusieurs tags. Pour ce faire, utilisez le **menu déroulant** situé à droite de la métrique.

{{< img src="metrics/advanced-filtering/tags.png" alt="Filtrer avec des tags"  style="width:80%;" >}}

Vous pouvez également appliquer un filtrage avancé à l'aide de filtres de valeur de tag basés sur des booléens ou des wildcards.

### Requêtes avec des filtres basés sur des booléens

Vous pouvez utiliser la syntaxe suivante pour générer des requêtes de métrique avec des filtres basés sur des booléens :

- `!`
- `,`
- `NOT`, `not`
- `AND`, `and`
- `OR`, `or`
- `IN`, `in`
- `NOT IN`, `not in`

#### Exemples de requête avec un filtre basé sur des booléens

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/ex1.png" alt="Exemple 1"  style="width:80%;" >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/ex2.gif" alt="Exemple 2"  style="width:80%;" >}}


### Requêtes avec des filtres basés sur des wildcards

Vous pouvez utiliser un wildcard afin d'inclure plusieurs valeurs de préfixe et de suffixe pour vos tags :
-  `pod_name: web-*` 
-  `cluster:*-trace`.

#### Exemple de requêtes avec un filtre basé sur un wildcard

```
avg:system.disk.in_use{!device:/dev/loop*} by {device}
```

{{< img src="metrics/advanced-filtering/wildcards1.gif" alt="Exemple 1"  style="width:80%;" >}}

```
sum:kubernetes.pods.running{service:*-canary} by {service}
```

{{< img src="metrics/advanced-filtering/wildcards2.png" alt="Exemple 2"  style="width:80%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
