---
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
- link: /logs/explorer/search_syntax/
  tag: Documentation
  text: Syntaxe de recherche de logs et filtre de requête
- link: /dashboards/functions/exclusion/
  tag: Documentation
  text: Fonctions d'exclusion
title: Filtrage avancé
---

## Présentation

Lorsque vous utilisez des monitors, des dashboards ou le Metrics Explorer pour interroger les données de vos métriques, vous pouvez filtrer les données afin d'affiner le contexte des séries temporelles renvoyées. Il est possible de filtrer toutes les métriques en fonction d'un ou de plusieurs tags. Pour ce faire, utilisez le champ **from** situé à droite de la métrique.

Vous pouvez également appliquer un filtrage avancé à l'aide de filtres de valeur de tag basés sur des booléens ou des wildcards. Pour les requêtes qui ne s'appliquent pas aux données de métriques, telles que les requêtes de logs, de traces, Network Monitoring, Real User Monitoring, Synthetics ou Security, consultez la documentation dédiée à la [syntaxe de recherche de logs][1].

## Requêtes avec des filtres basés sur des booléens

Vous pouvez utiliser la syntaxe suivante pour générer des requêtes de métrique avec des filtres basés sur des booléens :

- `!`
- `,`
- `NOT`, `not`
- `AND`, `and`
- `OR`, `or`
- `IN`, `in`
- `NOT IN`, `not in`

Lorsque vous souhaitez inclure ou exclure plusieurs tags :
* la fonction Include utilise la logique `AND` ;
* la fonction Exclude utilise la logique `OR`.

Pour en savoir plus sur les tags, consultez le guide [Débuter avec les tags][2].

**Remarque :** il n'est pas possible de combiner des symboles booléens (`!`, `,`) avec des opérateurs fonctionnels (`NOT`, `AND`, `OR`, `IN`, `NOT IN`). La requête suivante est considérée comme _non valide_ : 
`avg:mymetric{env:prod AND !region:us-east}`

### Exemples de requête avec un filtre basé sur des booléens

Pour utiliser les exemples ci-dessous, cliquez sur l'icône de code `</>` pour afficher l'éditeur de requête dans l'interface utilisateur, puis copiez et collez l'exemple de requête dans l'éditeur de requête.

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/graph_editor_code_option.mp4" alt="Cliquez sur l'icône de code pour visualiser la requête brute" video=true >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/boolean_and_in.png" alt="Exemple de booléen AND IN" style="width:100%;" >}}
```
avg:system.cpu.user{env:prod AND location NOT IN (atlanta,seattle,las-vegas)}
```

{{< img src="metrics/advanced-filtering/boolean_not_in.png" alt="Exemple de booléen NOT IN" style="width:100%;" >}}

## Requêtes avec des filtres basés sur des wildcards

Vous pouvez utiliser un wildcard afin d'inclure plusieurs valeurs de préfixe et de suffixe pour vos tags :
-  `pod_name: web-*` 
-  `cluster:*-trace`

**Remarque** : il n'est pas possible d'utiliser un wildcard afin d'inclure plusieurs valeurs de préfixe et de suffixe.

### Exemple de requêtes avec un filtre basé sur un wildcard

```
avg:system.disk.in_use{!device:/dev/loop*} by {device}
```

{{< img src="metrics/advanced-filtering/wildcard_suffix.png" alt="Wildcard utilisé comme suffixe" style="width:100%;" >}}
```
sum:kubernetes.pods.running{service:*-canary} by {service}
```

{{< img src="metrics/advanced-filtering/wildcard_prefix.png" alt="Wildcard utilisé comme préfixe" style="width:100%;" >}}

## Fonctions d'exclusion

Ajoutez une [fonction d'exclusion][3] à votre requête pour :
- Exclure les valeurs N/A (sans objet).
- Appliquer une valeur minimale ou maximale aux métriques qui atteignent le seuil.
- Exclure les valeurs supérieures ou inférieures aux valeurs seuils.

Les fonctions suppriment les points de données de vos visualisations, mais pas de Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search_syntax/
[2]: /fr/getting_started/tagging/using_tags/
[3]: /fr/dashboards/functions/exclusion/