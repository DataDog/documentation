---
description: Recherchez toutes vos exécutions de déploiement.
further_reading:
- link: /getting_started/search/
  tag: Documentation
  text: Premiers pas avec la recherche dans Datadog
- link: /continuous_delivery/explorer/facets
  tag: Documentation
  text: En savoir plus sur les facettes
title: Syntaxe de recherche du CD Visibility Explorer
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Rejoignez la version Preview !" >}}
CD Visibility est en version Preview. Si cette fonctionnalité vous intéresse, remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation

Un filtre de requête est composé de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot unique comme `test` ou `hello`.

* Une **séquence** est un groupe de mots entre guillemets, comme `hello dolly`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants (sensibles à la casse) :

| **Opérateur** | **Description**                                                                                        | **Exemple**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersection** : les deux termes figurent dans les événements sélectionnés (si aucun opérateur n'est ajouté, AND est utilisé par défaut). | authentication AND failure   |
| `OR`         | **Union** : un des deux termes figure dans les événements sélectionnés.                                             | authentication OR password   |
| `-`          | **Exclusion** : le terme suivant l'opérateur ne figure PAS dans l'événement (s'applique à chaque recherche de texte brute).       | authentication AND -password |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}