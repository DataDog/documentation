---
description: Filtrez vos données afin de restreindre le contexte des métriques renvoyées.
further_reading:
- link: /getting_started/search/
  tag: Documentation
  text: Commencer avec la recherche dans Datadog
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
## Aperçu {#overview}

Lorsque vous utilisez l'Explorateur de métriques, les moniteurs ou les tableaux de bord pour interroger les données de métriques, vous pouvez filtrer les données pour restreindre la portée des séries temporelles retournées. Toute métrique peut être filtrée par tag(s) en utilisant le champ **from** à droite de la métrique. 

Vous pouvez également appliquer un filtrage avancé à l'aide de filtres de valeur de tag basés sur des booléens ou des wildcards. Pour les requêtes en dehors des données de métriques telles que les journaux, les traces, la surveillance du réseau, la surveillance des utilisateurs réels, les synthétiques ou la sécurité, consultez la documentation sur la [Syntaxe de recherche de journaux][1] pour la configuration.

## Requêtes filtrées booléennes {#boolean-filtered-queries}

Vous pouvez utiliser la syntaxe suivante pour générer des requêtes de métrique avec des filtres basés sur des booléens : 

- `!`
- `,`
- `NOT`, `not`
- `AND`, `and`
- `OR`, `or`
- `IN`, `in`
- `NOT IN`, `not in`

Lorsque vous souhaitez inclure ou exclure plusieurs tags :
* Include uses `AND` logic
* Exclude uses `OR` logic

Pour en savoir plus sur les tags, consultez le guide [Débuter avec les tags][2].

**Remarque :** La syntaxe booléenne symbolique (`!`, `,`) ne peut pas être utilisée avec les opérateurs de syntaxe fonctionnelle (`NOT`, `AND`, `OR`, `IN`, `NOT IN`). La requête suivante est considérée comme _invalide_ : 
`avg:mymetric{env:prod AND !region:us-east}`

### Exemples de requêtes filtrées booléennes {#boolean-filtered-query-examples}

Pour utiliser les exemples ci-dessous, cliquez sur l'icône de code `</>` pour voir l'éditeur de requêtes dans l'interface utilisateur, puis copiez et collez l'exemple de requête dans l'éditeur de requêtes.

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/graph_editor_code_option.mp4" alt="Cliquez sur l'icône de code pour voir la requête brute" video=true >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/boolean_and_in.png" alt="Exemple booléen ET DANS" style="width:100%;" >}}

```
avg:system.cpu.user{env:prod AND location NOT IN (atlanta,seattle,las-vegas)}
```

{{< img src="metrics/advanced-filtering/boolean_not_in.png" alt="Exemple booléen PAS DANS" style="width:100%;" >}}

## Requêtes filtrées par caractères génériques {#wildcard-filtered-queries}

Les tags peuvent être filtrés en utilisant un wildcard comme préfixe, suffixe ou sous-chaîne : 
-  `pod_name: web-*` 
-  `cluster:*-trace`
-  `node:*-prod-*`

### Exemples de requêtes filtrées par caractères génériques {#wildcard-filtered-query-examples}

```
avg:system.disk.in_use{!device:/dev/loop*} by {device}
```

{{< img src="metrics/advanced-filtering/wildcard_suffix_example.png" alt="Caractère générique utilisé comme suffixe" style="width:100%;" >}}

```
sum:kubernetes.pods.running{service:*-canary} by {service}
```

{{< img src="metrics/advanced-filtering/wildcard_prefix_example.png" alt="Caractère générique utilisé comme préfixe" style="width:100%;" >}}

```
avg:system.disk.utilized{region:*east*} by {region}
```

{{< img src="metrics/advanced-filtering/wildcard_infix.png" alt="Caractère générique utilisé comme infixe" style="width:100%;" >}}

## Fonctions d'exclusion {#exclusion-functions}

Ajoutez une [fonction d'exclusion][3] à votre requête pour : 
- Exclude N/A values.
- Appliquer une valeur minimale ou maximale aux métriques qui atteignent le seuil.
- Exclude values that are above or below threshold values.

Les fonctions suppriment les points de données de vos visualisations, mais pas de Datadog.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search_syntax/
[2]: /fr/getting_started/tagging/using_tags/
[3]: /fr/dashboards/functions/exclusion/