---
further_reading:
- link: logs/explorer/search_syntax
  tag: Documentation
  text: Syntaxe de recherche de logs
title: Syntaxe de recherche
---

## Présentation

La recherche d'événements repose sur la [syntaxe de recherche de logs][1]. Tout comme pour les logs, la recherche d'événements accepte :

- Les opérateurs `AND`, `OR` et `-`
- Les wildcards
- Les caractères d'échappement
- La recherche de tags et facettes au format `key:value`
- La recherche dans des attributs avec le préfixe `@`

## Exemples de requête

`source:(github OR chef)`
: Affiche les événements provenant de GitHub OU de Chef.

`host:(i-0ade23e6 AND db.myapp.com)`
: Affiche les événements provenant de `i-0ade23e6` ET de `db.myapp.com`.

`service:kafka`
: Affiche les événements provenant du service `kafka`.

`status:error`
: Affiche les événements avec un statut `error` (valeurs autorisées : `error`, `warning`, `info` et `ok`).

`availability-zone:us-east-1a`
: Affiche les événements de la zone d'accessibilité AWS `us-east-1a`.

`container_id:foo*`
: Affiche les événements provenant de tous les conteneurs dont l'ID commence par `foo`.

`@evt.name:foo`
: Affiche les événements dont l'attribut `evt.name` a pour valeur `foo`.

Consultez la [syntaxe de recherche des logs][1] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search_syntax/