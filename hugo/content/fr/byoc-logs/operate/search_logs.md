---
aliases:
- /fr/cloudprem/operate/search_logs/
description: Apprenez à interroger et à analyser vos données BYOC Logs dans Datadog
further_reading:
- link: /byoc-logs/ingest/
  tag: Documentation
  text: Ingérer des logs dans BYOC Logs
- link: /byoc-logs/operate/troubleshooting/
  tag: Documentation
  text: Dépannage de BYOC Logs
- link: /logs/explorer/search_syntax/
  tag: Documentation
  text: Syntaxe de recherche de logs
title: Rechercher dans BYOC Logs
---
## Explorer BYOC Logs dans le Logs Explorer {#explore-byoc-logs-in-the-logs-explorer}

1. Accédez au [Datadog Log Explorer][1].
2. Dans le panneau des facettes à gauche, sous {{< ui >}}BYOC INDEXES{{< /ui >}}, sélectionnez un ou plusieurs index pour effectuer une recherche.

Vous pouvez sélectionner un index spécifique pour affiner votre recherche, ou sélectionner tous les index d'un cluster pour effectuer une recherche parmi eux.

Les noms d'index BYOC (Bring Your Own Cloud) Logs suivent ce format :

```
byoc--<CLUSTER_NAME>--<INDEX_NAME>
```

## Effectuer une recherche sur plusieurs clusters BYOC Logs {#search-across-byoc-logs-clusters}

Utilisez le Log Explorer ou l'API Logs publique pour effectuer une recherche sur plusieurs clusters BYOC Logs avec une seule requête. Les résultats des clusters sélectionnés sont combinés.

### Utilisez le Log Explorer {#use-log-explorer}

Dans la barre de recherche du [Log Explorer][1], faites précéder chaque nom de cluster par `byoc--`. Groupez les noms entre parenthèses après `index:`, séparés par `OR`. Par exemple :

```text
index:(byoc--cluster-1 OR byoc--cluster-2)
```

Remplacez `cluster-1` et `cluster-2` par les noms de vos clusters BYOC Logs.

### Utilisez l'API Logs {#use-the-logs-api}

Envoyez une requête au [endpoint de recherche de logs][2] (`POST /api/v2/logs/events/search`). Définissez `filter.query` sur une requête qui spécifie plusieurs clusters BYOC Logs. Par exemple :

```json
{
  "filter": {
    "from": "now-15m",
    "to": "now",
    "query": "index:(byoc--cluster-1 OR byoc--cluster-2)"
  }
}
```

## Limitations de recherche {#search-limitations}

Vous ne pouvez pas interroger les index de BYOC Logs avec d'autres index de logs Datadog. De plus, Flex Logs n'est pas pris en charge avec BYOC Logs.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /fr/api/latest/logs/#search-logs