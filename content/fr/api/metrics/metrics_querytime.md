---
title: Interroger les points de séries temporelles
type: apicontent
order: 25.3
external_redirect: '/api/#interroger-les-points-de-series-temporelles'
---
## Interroger les points de séries temporelles
Cet endpoint vous permet d'interroger des métriques sur la période de votre choix. Utilisez la syntaxe de requête décrite dans la section [De la requête au graphique][1].

*Remarque :* en Python, `from` est un mot réservé. À la place, l'API Python utilise les paramètres `start` et `end` dans l'appel de la fonction.

**ARGUMENTS**:

* **`from`** [*obligatoire, sauf en Python*] :
  secondes depuis l'epoch unix.
* **`to`** [*obligatoire, sauf en Python*] :
  secondes depuis l'epoch unix.
* **`start`** [*obligatoire en Python*, *défaut*=**None**] :
  secondes depuis l'epoch unix.
* **`end`** [*obligatoire en Python*, *défaut*=**None**] :
  secondes depuis l'epoch unix.
* **`query`** [*obligatoire*] :
  la chaîne de requête.

[1]: /fr/graphing/functions