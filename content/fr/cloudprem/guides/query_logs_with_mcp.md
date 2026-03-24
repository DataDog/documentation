---
description: Apprenez à interroger les journaux stockés dans les index CloudPrem en
  utilisant le serveur Datadog MCP.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Présentation du serveur Datadog MCP.
- link: /ide_plugins/vscode/?tab=cursor#installation
  tag: Documentation
  text: Extension Datadog pour VS Code et Cursor.
- link: /cloudprem/operate/search_logs/
  tag: Documentation
  text: Rechercher des journaux dans CloudPrem.
title: Interroger les journaux CloudPrem avec le serveur Datadog MCP.
---
{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en préversion." >}}
  Rejoignez la préversion CloudPrem pour accéder à de nouvelles fonctionnalités de gestion des journaux auto-hébergées.
{{< /callout >}}

## Aperçu

Le [serveur Datadog MCP (Model Context Protocol)][1] vous permet d'interroger vos journaux Datadog, y compris les journaux stockés dans les index CloudPrem, directement via des outils et intégrations alimentés par l'IA. Interroger les journaux CloudPrem avec le serveur Datadog MCP débloque plusieurs capacités précieuses, notamment :

- **Dépannage Unifié et Contextuel** : Interrogez et corrélez les journaux, les métriques et les traces de n'importe quel environnement en un seul endroit, et pivotez entre les types de télémétrie pour identifier plus rapidement les causes profondes.
- **Interaction en Langage Naturel** : Posez des questions en langage courant, et laissez l'IA générer les requêtes de journaux appropriées sans avoir besoin de se souvenir de la syntaxe.

## Conditions préalables

- Un déploiement CloudPrem opérationnel avec des journaux ingérés.
- Accès au [serveur Datadog MCP][1].
- Le nom de votre index CloudPrem (visible dans le [Datadog Log Explorer][2] sous **CLOUDPREM INDEXES**).

## Interrogation des journaux CloudPrem

Pour interroger les journaux stockés dans les index CloudPrem, vous **devez** spécifier deux paramètres critiques en plus de votre requête de journal standard :

- (Obligatoire) **`indexes`** : Le(s) nom(s) de votre/vos index CloudPrem.
- (Obligatoire) **`storage_tier`** : Doit être défini sur `"cloudprem"`.

Sans les deux paramètres, les requêtes par défaut rechercheront dans les index de journaux Datadog standard au lieu de CloudPrem.

Pour de meilleurs résultats, votre invite **devrait également inclure** :
- (Recommandé) Plage horaire (par exemple, "dans la dernière heure", "au cours des dernières 24 heures").
- (Recommandé) Filtres de requête (service, statut, contenu du journal).

### Paramètres de requête
Le tableau suivant décrit les paramètres clés utilisés lors de l'interrogation des journaux avec le serveur MCP :

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| `query` | Requête de recherche de journal utilisant la syntaxe de requête Datadog | `"*"` (tous les journaux), `"service:web"`, `"status:error"` |
| `indexes` | Tableau des noms d'index CloudPrem à rechercher | `["cloudprem-dev"]` |
| `storage_tier` | Niveau de stockage à interroger (doit être `"cloudprem"` pour les journaux CloudPrem) | `"cloudprem"` |
| `from` | Heure de début de la requête | `"now-1h"`, `"now-24h"`, `"2024-01-15T00:00:00Z"` |
| `to` | Heure de fin de la requête | `"now"`, `"2024-01-15T23:59:59Z"` |
| `sort` | Ordre de tri pour les résultats | `"-timestamp"` (décroissant), `"timestamp"` (croissant) |

Pour des exemples de requêtes par paramètres et en langage naturel, voir [Exemples avancés de requêtes](#advanced-query-examples).

### Trouver le nom de votre index CloudPrem

Pour trouver le nom de votre index CloudPrem :

1. Accédez à l'[Explorateur de journaux Datadog][2].
2. Recherchez la section **CLOUDPREM INDEXES** dans le panneau de facettes à gauche.
3. Vos index CloudPrem y sont affichés, généralement au format `cloudprem-<cluster_id>`.

Vous pouvez également trouver le nom de votre index dans la [console CloudPrem][3], où l'ID de votre cluster est affiché.

## Exemples avancés de requêtes

Lorsque vous utilisez des outils alimentés par l'IA avec le serveur MCP de Datadog, vous pouvez poser des questions en langage naturel. Le serveur MCP traduira automatiquement celles-ci en requêtes CloudPrem correctement formatées.

### Journaux d'erreurs d'un service spécifique
**Invite** :
"Montrez-moi les journaux d'erreurs du service nginx dans l'index cloudprem-dev au cours de la dernière heure."

**Se traduit par** :

```json
{
  "query": "service:nginx status:error",
  "indexes": ["cloudprem-dev"],
  "storage_tier": "cloudprem",
  "from": "now-1h",
  "to": "now"
}
```

### Recherchez un contenu de journal spécifique
**Invite** :
"Trouvez les journaux contenant 'délai de connexion' du service API dans cloudprem-prod des dernières 24 heures."

**Se traduit par** :

```json
{
  "query": "service:api \"connection timeout\"",
  "indexes": ["cloudprem-prod"],
  "storage_tier": "cloudprem",
  "from": "now-24h",
  "to": "now"
}
```

### Filtrer par code de statut HTTP
**Invite** :
"Obtenez tous les journaux avec le code de statut 500 de l'index cloudprem-prod au cours de la dernière journée."

**Se traduit par** :

```json
{
  "query": "status:500",
  "indexes": ["cloudprem-prod"],
  "storage_tier": "cloudprem",
  "from": "now-1d",
  "to": "now"
}
```

## Remarques importantes

- **À la fois `storage_tier` et `indexes` sont requis** lors de l'interrogation des journaux CloudPrem. Sans ces paramètres, les requêtes rechercheront dans les index Datadog standard à la place.
- `storage_tier` doit toujours être défini sur `"cloudprem"`.
- Le paramètre `indexes` doit contenir des noms d'index CloudPrem valides (généralement au format `cloudprem-<cluster_id>`).
- Lors de l'utilisation de requêtes en langage naturel, mentionnez explicitement le nom de votre index CloudPrem dans votre invite.
- Les journaux CloudPrem sont interrogeables en temps réel dès qu'ils sont indexés.
- La syntaxe de requête suit la syntaxe standard [de recherche de journaux Datadog][4].

## Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/mcp_server/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/cloudprem
[4]: /fr/logs/explorer/search_syntax/