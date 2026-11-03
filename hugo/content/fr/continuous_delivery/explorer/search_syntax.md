---
description: Recherchez toutes vos exécutions de déploiement.
further_reading:
- link: /getting_started/search/
  tag: Documentation
  text: Bien démarrer avec la recherche en texte intégral dans Datadog
- link: /continuous_delivery/explorer/facets
  tag: Documentation
  text: En savoir plus sur les facettes
title: Syntaxe de recherche dans CD Visibility Explorer
---
{{< callout btn_hidden="true" header="faux" >}}
CD Visibility est en préversion. L'accès est limité aux organisations déjà inscrites.
{{< /callout >}}

## Présentation {#overview}

Une requête de filtre est composée de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot seul tel que `test` ou `hello`.

* Une **séquence** est un groupe de mots entourés de guillemets doubles, tel que `"hello dolly"`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants (sensibles à la casse) :

| **Opérateur** | **Description**                                                                                        | **Exemple**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersection** : les deux termes sont présents dans les événements sélectionnés (si rien n'est ajouté, AND est pris par défaut) | authentication AND failure   |
| `OR`         | **Union** : l'un ou l'autre terme est contenu dans les événements sélectionnés                                             | authentication OR password   |
| `-`          | **Exclusion** : le terme suivant ne figure PAS dans l’événement (s’applique à chaque recherche individuelle dans le texte brut)       | authentication AND -password |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}