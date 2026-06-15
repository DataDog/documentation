---
title: Collecter plusieurs logs avec Pagination

further_reading:
  - link: /logs/log_configuration/processors
    tag: Documentation
    text: Découvrir comment traiter vos logs
  - link: /logs/log_configuration/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: /logs/live_tail/
    tag: Documentation
    text: Fonctionnalité Live Tail de Datadog
  - link: /logs/explorer/
    tag: Documentation
    text: Découvrir comment explorer vos logs
  - link: /logs/logging_without_limits/
    tag: Documentation
    text: Logging without Limits*
---
## Présentation

Pour récupérer une liste de logs contenant plus de 1 000 logs (soit la limite maximale) avec l'[API Logs][1], vous devez utiliser la fonctionnalité Pagination.

{{< tabs >}}

{{% tab "API V1" %}}

Commencez par créer une requête afin de récupérer les logs correspondant à un contexte donné, tel qu'une requête donnée dans un intervalle défini :

```bash
curl -X POST https://api.datadoghq.com/api/v1/logs-queries/list \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${CLÉ_API_CLIENT_DD}" \
-H "DD-APPLICATION-KEY: ${CLÉ_APP_CLIENT_DD}" \
-d '{
        "limit": 50,
        "query": "*",
        "sort": "desc",
        "time": {
            "from": "2019-08-06T00:00:00Z",
            "to": "2019-08-07T00:00:00Z"
        }
    }'
```

Exemple de résultat :

```json
{
  "logs": ["(...)"],
  "nextLogId": "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBCCCCCCCCCCDDDDDDDDDD",
  "status": "done",
  "requestId": "cDdWYB0tAm1TYHFsQVZ2R05QWm9nQXx5cFM4aExkLVFPNlhZS21RTGxTUGZ3"
}
```

Le paramètre `logs` est un tableau d'objets Log qui peut contenir autant de logs que la limite définie via le paramètre `limit` dans votre requête. Cette limite est définie sur `50` par défaut, mais il est possible de la rehausser jusqu'à `1000`. Si la quantité de logs correspondant à votre requête est supérieure au paramètre `limit`, le paramètre `nextLogId` n'est pas égal à `null`.

**Lorsque le paramètre `nextLogId` renvoie autre chose que `null`, cela signifie que le nombre de logs correspondant à votre requête est supérieur au nombre de logs renvoyés**.

Pour récupérer la page de logs suivante, renvoyez votre requête, mais cette fois avec le paramètre `startAt`. Celui-ci prend la valeur `nextLogId` de l'appel précédent :

```bash
curl -X POST https://api.datadoghq.com/api/v1/logs-queries/list \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${CLÉ_API_CLIENT_DD}" \
-H "DD-APPLICATION-KEY: ${CLÉ_APP_CLIENT_DD}" \
-d '{
        "limit": 1000,
        "query": "*",
        "startAt": "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBCCCCCCCCCCDDDDDDDDDD",
        "sort": "desc",
        "time": {
            "from": "2019-08-06T00:00:00Z",
            "to": "2019-08-07T00:00:00Z"
        }
    }'
```

On obtient alors ces résultats :

```json
{
  "logs": ["(...)"],
  "nextLogId": "EEEEEEEEEEEEEEEEFFFFFFFFFFFFFFGGGGGGGGGGHHHHHHHHHH",
  "status": "done",
  "requestId": "YVhETk5jQy1TQkDFSFjqU3fhQMh5QXx6M2pSUlA1ODhXNk5PT2NOSUVndThR"
}
```

Pour voir toutes vos pages de logs, continuez à renvoyer votre requête avec le paramètre `startAt` défini sur la valeur `nextLogId` de l'appel précédent. Lorsque `nextLogId` renvoie `null`, cela signifie que vous avez renvoyé toutes les pages de logs associées à votre requête.

**Remarque** : pour mieux contrôler les résultats de pagination, utilisez un paramètre `time` absolu. N'utilisez pas le mot-clé `now`.

{{% /tab %}}

{{% tab "API V2" %}}
Commencez par créer une requête afin de récupérer les logs correspondant à un contexte donné, tel qu'une requête donnée dans un intervalle défini :

```bash
curl -X POST https://api.datadoghq.com/api/v2/logs/events/search \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${CLÉ_API_CLIENT_DD}" \
-H "DD-APPLICATION-KEY: ${CLÉ_APP_CLIENT_DD}" \
-d '{
      "filter": 
              {
                "from": "2019-08-06T00:00:00Z",
                "to": "2019-08-07T00:00:00Z",
                "query": "@datacenter:us @role:db"
               },
      "page":  
              {
                  "limit":50   
        }
}'
```
Exemple de résultat :

```json
{
  "meta": {
    "page": {
      "after": "eyJhZnRlciI6IkFRQUFBWE4tV0ZVbzZFRGRnZ0FBQUFCQldFNHRWMFpwVG1jelgwRTJURjlaVjBGQlFRIn0"
    }
  },
  "data": [
    {
      "attributes": {"..."},
      "id": "AQAAAXN-WFUo6EDdggAAAABBWE4tV0ZpTmczX0E2TF9ZV0FBQQ",
      "type": "log"
    }
  ],
  "links": {
    "next": "https://api.datadoghq.com/api/v2/logs/events?filter%5Bto%5D=1595552587369&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWE4tV0ZVbzZFRGRnZ0FBQUFCQldFNHRWMFpwVG1jelgwRTJURjlaVjBGQlFRIn0&page%5Blimit%5D=1&filter%5Bfrom%5D=1595552579929"
  }
}
```
Le paramètre `data` est un tableau d'objets Log qui peut contenir autant de logs que la limite définie via le paramètre `limit` dans votre requête. Cette limite est définie sur `50` par défaut, mais il est possible de la rehausser jusqu'à `1000`. 

Pour voir la page suivante de vos logs, continuez à renvoyer votre requête avec le paramètre `cursor` défini sur la valeur `after` de l'appel précédent. Lorsque `data` renvoie `null`, cela signifie que vous avez renvoyé toutes les pages de logs associées à votre requête.

```bash
curl -X POST https://api.datadoghq.com/api/v2/logs/events/search \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${CLÉ_API_CLIENT_DD}" \
-H "DD-APPLICATION-KEY: ${CLÉ_APP_CLIENT_DD}" \
-d '{
      "filter": 
              {
                "from": "2019-08-06T00:00:00Z",
                "to": "2019-08-07T00:00:00Z",
                "query": "@datacenter:us @role:db"
               },
      "page":  
              {
                  "cursor": "eyJhZnRlciI6IkFRQUFBWE4tV0ZVbzZFRGRnZ0FBQUFCQldFNHRWMFpwVG1jelgwRTJURjlaVjBGQlFRIn0",
                  "limit": 50   
        }
}'
```
On obtient alors ces résultats :

```json
{
  "meta": {
    "page": {
      "after": "eyJhZnRlciI6IkFRQUFBWE4tV0VsdzZFRGRnUUFBQUFCQldFNHRWMFV5UzJjelgwRTJURjlaY1d0QlFRIn0"
    }
  },
  "data": [
    {
      "attributes": {"..."},
      "id": "AQAAAXN-WElw6EDdgQAAAABBWE4tV0UyS2czX0E2TF9ZcWtBQQ",
      "type": "log"
    }
  ],
  "links": {
    "next": "https://api.datadoghq.com/api/v2/logs/events?filter%5Bto%5D=1595552587369&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWE4tV0VsdzZFRGRnUUFBQUFCQldFNHRWMFV5UzJjelgwRTJURjlaY1d0QlFRIn0&page%5Blimit%5D=10&filter%5Bfrom%5D=1595552579929"
  }
}
```

{{% /tab %}}

{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/api/v1/logs/#get-a-list-of-logs