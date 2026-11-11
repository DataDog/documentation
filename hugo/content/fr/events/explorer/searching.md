---
aliases:
- /fr/service_management/events/explorer/searching/
further_reading:
- link: /getting_started/search/
  tag: Documentation
  text: Bien démarrer avec la recherche en texte intégral dans Datadog
- link: logs/explorer/search_syntax
  tag: Documentation
  text: Syntaxe de recherche de logs
title: Recherche de syntaxe
---
## Présentation {#overview}

La recherche d'événements est basée sur la [syntaxe de recherche de logs][1]. Tout comme les logs, la recherche d'événements prend en charge ce qui suit :

Opérateurs - `AND`, `OR` et `-`
- Caractères génériques
- Caractères d'échappement
- Recherche de balises et de facettes avec `key:value`
- Recherche dans les attributs avec le préfixe `@`

## Exemples de requêtes {#example-queries}

`source:(github OR chef)`
: Afficher les événements de GitHub OU Chef.

`host:(i-0ade23e6 AND db.myapp.com)`
: Afficher les événements de `i-0ade23e6` ET `db.myapp.com`.

`service:kafka`
: Afficher les événements du service `kafka`.

`status:error`
: Afficher les événements avec un statut `error` (prend en charge : `emergency`, `alert`, `critical`, `error`, `warn`, `notice`, `info`, `debug`, `ok`).

`availability-zone:us-east-1a`
: Afficher les événements dans la zone de disponibilité AWS `us-east-1a` (AZ).

`container_id:foo*`
: Afficher les événements de tous les conteneurs dont l'ID commence par `foo`.

`@evt.name:foo`
: Afficher les événements dont l'attribut `evt.name` est égal à `foo`.

Consultez la [syntaxe de recherche des logs][1] pour en savoir plus.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search_syntax/