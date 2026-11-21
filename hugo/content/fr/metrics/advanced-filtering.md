---
description: Filtrez vos données pour restreindre le périmètre des métriques renvoyées.
further_reading:
- link: /getting_started/search/
  tag: Documentation
  text: Bien démarrer avec la recherche en texte intégral dans Datadog
- link: /metrics/explorer/
  tag: Documentation
  text: Metrics Explorer
- link: /metrics/summary/
  tag: Documentation
  text: Catalogue de métriques
- link: /metrics/distributions/
  tag: Documentation
  text: Distributions de métriques
- link: /logs/explorer/search_syntax/
  tag: Documentation
  text: Syntaxe de recherche et de filtrage des requêtes de logs
- link: /dashboards/functions/exclusion/
  tag: Documentation
  text: Fonctions d'exclusion
title: Filtrage avancé
---
## Présentation {#overview}

Lorsque vous utilisez Metrics Explorer, les moniteurs ou les dashboards pour interroger des données de métriques, vous pouvez filtrer les données pour restreindre le périmètre des séries temporelles renvoyées. Toute métrique peut être filtrée par tags à l'aide du champ {{< ui >}}from{{< /ui >}} situé à droite de la métrique. 

Vous pouvez également effectuer un filtrage avancé à l'aide de filtres booléens ou Wildcard sur les valeurs des tags. Pour les requêtes portant sur d'autres données que les métriques, telles que les logs, les traces, Network Monitoring, Real User Monitoring, Synthetics ou Security, consultez la documentation [Log Search Syntax][1] pour savoir comment les configurer.

## Requêtes filtrées à l'aide d'opérateurs booléens {#boolean-filtered-queries}

La syntaxe suivante est prise en charge pour les requêtes de métriques filtrées à l'aide d'opérateurs booléens : 

- `!`
- `,`
- `NOT`, `not`
- `AND`, `and`
- `OR`, `or`
- `IN`, `in`
- `NOT IN`, `not in`

Lorsque vous souhaitez inclure ou exclure plusieurs tags :
* Include utilise la logique `AND`
* Exclude utilise la logique `OR`

Pour plus d'informations sur les tags, consultez le guide [Getting Started With Using Tags][2].

### Exemples de requêtes filtrées à l'aide d'opérateurs booléens {#boolean-filtered-query-examples}

Pour utiliser les exemples ci-dessous, cliquez sur l'icône de code {{< ui >}}</>{{< /ui >}} pour afficher l'éditeur de requête dans l'interface utilisateur, puis copiez et collez l'exemple de requête dans l'éditeur de requête.

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/graph_editor_code_option.mp4" alt="Cliquez sur l'icône de code pour voir la requête brute" video=true >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/boolean_and_in.png" alt="Exemple booléen AND IN" style="width:100%;" >}}

```
avg:system.cpu.user{env:prod AND location NOT IN (atlanta,seattle,las-vegas)}
```

{{< img src="metrics/advanced-filtering/boolean_not_in.png" alt="Exemple booléen NOT IN" style="width:100%;" >}}

## Requêtes filtrées par Wildcard {#wildcard-filtered-queries}

Le filtrage des valeurs de tags par Wildcard en préfixe, en suffixe ou en sous-chaîne est pris en charge : 
-  `pod_name: web-*` 
-  `cluster:*-trace`
-  `node:*-prod-*`

### Exemples de requêtes filtrées par Wildcard {#wildcard-filtered-query-examples}

```
avg:system.disk.in_use{!device:/dev/loop*} by {device}
```

{{< img src="metrics/advanced-filtering/wildcard_suffix_example.png" alt="Wildcard utilisé comme suffixe" style="width:100%;" >}}

```
sum:kubernetes.pods.running{service:*-canary} by {service}
```

{{< img src="metrics/advanced-filtering/wildcard_prefix_example.png" alt="Wildcard utilisé comme préfixe" style="width:100%;" >}}

```
avg:system.disk.utilized{region:*east*} by {region}
```

{{< img src="metrics/advanced-filtering/wildcard_infix.png" alt="Wildcard utilisé comme infixe" style="width:100%;" >}}

## Fonctions d'exclusion {#exclusion-functions}

Ajoutez une [fonction d'exclusion][3] à votre requête pour : 
- Exclure les valeurs N/A.
- Appliquer une valeur minimale ou maximale aux métriques qui atteignent le seuil.
- Exclure les valeurs supérieures ou inférieures aux valeurs seuils.

Les fonctions ne suppriment pas les points de données de Datadog, mais elles les retirent de vos visualisations.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search_syntax/
[2]: /fr/getting_started/tagging/using_tags/
[3]: /fr/dashboards/functions/exclusion/