---
aliases:
- /fr/cloudprem/guides/query_logs_with_mcp/
description: Apprenez à interroger les logs stockés dans les index BYOC Logs à l'aide
  du Datadog MCP Server
further_reading:
- link: /ide_plugins/vscode/?tab=cursor#installation
  tag: Documentation
  text: Datadog Extension for VS Code & Cursor
- link: /byoc-logs/operate/search_logs/
  tag: Documentation
  text: Rechercher des logs dans BYOC Logs
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Présentation du Datadog MCP Server
- link: https://www.datadoghq.com/blog/byoc-cross-cluster-queries/
  tag: Blog
  text: Unifiez les données sur Datadog BYOC avec des requêtes inter-clusters pour
    les équipes et les agents IA
title: Interrogez BYOC Logs avec le Datadog MCP Server
---
## Présentation {#overview}

Utilisez l'outil `search_datadog_logs` sur le [Datadog MCP (Model Context Protocol) Server][1] pour interroger les logs stockés dans les index BYOC (Bring Your Own Cloud) Logs. Vous pouvez accéder à l'outil via des outils et des intégrations basés sur l'IA.

**Remarque** : les index BYOC Logs sont uniquement pris en charge par `search_datadog_logs`. L'outil `analyze_datadog_logs` et le skill `datadog/querying-patterns` ne prennent pas en charge les index BYOC Logs.

## Prérequis {#prerequisites}

- Un déploiement BYOC Logs en cours d'exécution avec des logs ingérés.
- Accès au [Datadog MCP Server][1].
- Le nom de votre index BYOC Logs (visible dans [Datadog Log Explorer][2] sous {{< ui >}}BYOC INDEXES{{< /ui >}}).

## Interrogation de BYOC Logs {#querying-byoc-logs}

Pour interroger les logs stockés dans les index BYOC Logs, utilisez `search_datadog_logs` et spécifiez le nom de votre index BYOC Logs en plus de votre requête de recherche de logs habituelle.

Pour obtenir de meilleurs résultats, votre prompt **devrait également inclure** :
- (Recommandé) Plage temporelle (par exemple, « au cours de la dernière heure », « au cours des dernières 24 heures »).
- (Recommandé) Filtres de requête (service, statut, contenu des logs).

### Paramètres de requête {#query-parameters}
Le tableau suivant décrit les paramètres clés utilisés avec `search_datadog_logs` :

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| `query` | Requête de recherche de logs utilisant la syntaxe de requête Datadog | `"*"` (tous les logs), `"service:web"`, `"status:error"` |
| `indexes` | Tableau des noms d'index BYOC Logs à rechercher | `["byoc--dev--main"]` |
| `from` | Heure de début de la requête | `"now-1h"`, `"now-24h"`, `"2024-01-15T00:00:00Z"` |
| `to` | Heure de fin de la requête | `"now"`, `"2024-01-15T23:59:59Z"` |
| `sort` | Ordre de tri des résultats | `"-timestamp"` (décroissant), `"timestamp"` (croissant) |

Pour des exemples de requêtes paramétrées et en langage naturel, consultez [Exemples de requêtes avancées](#advanced-query-examples).

### Trouver le nom de votre index BYOC Logs {#finding-your-byoc-logs-index-name}

Pour trouver le nom de votre index BYOC Logs :

1. Accédez à [Datadog Log Explorer][2].
2. Recherchez la section {{< ui >}}BYOC INDEXES{{< /ui >}} dans le panneau des facettes à gauche.
3. Vos index BYOC Logs y sont répertoriés, au format `byoc--<cluster_name>--<index_name>`.

Vous pouvez également trouver les noms de vos index dans la [console BYOC Logs][3] en sélectionnant un cluster et en cliquant sur {{< ui >}}View Indexes{{< /ui >}}.

## Exemples de requêtes avancées {#advanced-query-examples}

Lorsque vous utilisez des outils basés sur l'IA avec `search_datadog_logs`, vous pouvez poser des questions en langage naturel. L'outil les traduit en requêtes BYOC Logs correctement formatées.

### Logs d'erreur d'un service spécifique {#error-logs-from-a-specific-service}
**Prompt** :
« Montrez-moi les logs d'erreur du service nginx dans l'index byoc--dev--main au cours de la dernière heure. »

**Se traduit par** :

```json
{
  "query": "service:nginx status:error",
  "indexes": ["byoc--dev--main"],
  "from": "now-1h",
  "to": "now"
}
```

### Rechercher un contenu spécifique dans les logs {#search-for-specific-log-content}
**Prompt** :
« Trouvez les logs contenant 'connection timeout' provenant du service API dans l'index byoc--prod--main au cours des 24 dernières heures. »

**Se traduit par** :

```json
{
  "query": "service:api \"connection timeout\"",
  "indexes": ["byoc--prod--main"],
  "from": "now-24h",
  "to": "now"
}
```

### Filtrer par code d'état HTTP {#filter-by-http-status-code}
**Prompt** :
« Trouvez tous les logs associés au code d'état 500 dans l'index byoc--prod--main au cours des dernières 24 heures. »

**Se traduit par** :

```json
{
  "query": "status:500",
  "indexes": ["byoc--prod--main"],
  "from": "now-1d",
  "to": "now"
}
```

## Remarques importantes {#important-notes}

- Le paramètre `indexes` doit contenir des noms d'index BYOC Logs valides (au format `byoc--<cluster_name>--<index_name>`).
- Lorsque vous utilisez des requêtes en langage naturel, mentionnez explicitement le nom de votre index BYOC Logs dans votre prompt.
- Les données BYOC Logs peuvent être interrogées en temps réel dès qu'elles sont indexées.
- La syntaxe de requête suit la [syntaxe de recherche de logs Datadog][4] standard.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/mcp_server/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/byoc-logs
[4]: /fr/logs/explorer/search_syntax/