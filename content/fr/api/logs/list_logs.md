---
title: Récupérer la liste des logs
type: apicontent
order: 23.2
external_redirect: '/api/#liste-des-logs'
---
## Récupérer la liste des logs

Le endpoint List renvoie les logs qui correspondent à une requête de recherche de log. [Les résultats sont paginés][1].

**Si vous songez à archiver des logs pour votre organisation, nous vous conseillons d'utiliser les fonctionnalités d'archivage de Datadog plutôt que l'API Log List. Consultez la [documentation sur l'archivage de logs Datadog][2].**

**ARGUMENTS**:

* **`query`** [*obligatoire*] :
    requête de recherche respectant la [syntaxe de recherche de log][3].
* **`time.from`** [*obligatoire*] :
    timestamp minimal pour les logs demandés. Sa valeur peut correspondre à l'un des formats suivants :
    - Une chaîne ISO-8601
    - Un timestamp unix (un nombre représentant le nombre de millisecondes écoulées depuis epoch)
    - Une heure relative (`now -10m`, `now - 1h`, `now - 1d`)
* **`time.to`** [*obligatoire*] :
    timestamp maximal pour les logs demandés. Sa valeur peut correspondre à l'un des formats suivants :
    - Une chaîne ISO-8601 à la minute, seconde ou milliseconde près
    - Un timestamp unix (un nombre représentant le nombre de millisecondes écoulées depuis epoch)
    - Une heure relative (`now`, `now -10m`, `now - 1h`, `now - 1d`)
* **`time.timezone`** [*facultatif*, *défaut*=**None**] :
   peut être spécifié sous la forme d'un décalage (p. ex., « UTC+03:00 ») ou d'un indicatif régional (p. ex., « Europe/Paris »).
* **`time.offset`** [*facultatif*, *défaut*=**None**] :
   correspond à `time.timezone`, mais avec une valeur en secondes.
   Si vous spécifiez à la fois un fuseau horaire et un décalage, le fuseau horaire est ignoré.
* **`startAt`** [*facultatif*, *défaut*=**None**] :
   l'identificateur de hachage du premier log à renvoyer dans la liste, disponible dans l'attribut `id` du log. Ce paramètre est utilisé pour la [fonctionnalité de pagination][1].
   **Remarque** : ce paramètre est ignoré lorsque le log correspondant n'est pas inclus dans l'intervalle spécifié.
* **`sort`** [*facultatif*, *défaut*=**desc**] :
    résultats dans l'ordre chronologique croissant (`asc`) ou décroissant (`desc`).
* **`limit`** [*facultatif*, *défaut*=**10**] :
    nombre de logs renvoyés dans la réponse (maximum : 1 000).
* **`index`** [*facultatif*, *défaut*=**main**] :
    pour les organisations avec plusieurs index, l'index de log sur lequel la requête porte.

[1]: /fr/logs/guide/collect-multiple-logs-with-pagination
[2]: /fr/logs/archives
[3]: /fr/logs/explorer/search/#search-syntax