---
title: Programmation de l'accès aux données de log à l'aide de l'API Logs Search
kind: guide
further_reading:
  - link: /logs/explorer/
    tag: Documentation
    text: "En savoir plus sur la vue Log\_Explorer"
  - link: /logs/explorer/
    tag: Documentation
    text: En savoir plus sur la syntaxe de recherche
  - link: /logs/search_syntax/
    tag: Documentation
    text: En savoir plus sur la syntaxe de l'API Logs Search
---
## Présentation

Utilisez l'[API Logs Search][1] pour programmer l'accès à vos données de log et l'exécution de vos requêtes. 

Les scénarios suivants sont abordés dans ce guide :

* [Recherche de base](#basic-search)
* [Tri par facette ou timestamp](#sort-by-facet-or-timestamp)
* [Restriction du nombre de résultats récupérés](#limit-the-number-of-results-retrieved)
* [Réglages de l'intervalle](#time-settings)
* [Pagination](#pagination)

## Prérequis

- Vous devez disposer d'une clé d'API ainsi qu'une clé d'application provenant d'un administrateur. Ces informations sont disponibles sur la [page dédiée du compte Datadog][2]. Remplacez `<CLÉ_API_DATADOG>` et `<CLÉ_APP_DATADOG>` par votre clé d'API Datadog et votre clé d'application Datadog.

- Ce guide inclut des exemples `curl`. Si vous ne l'avez pas déjà fait, installez [curl][3]. Vous pouvez également consulter [dans la documentation sur l'API][1] des exemples dans d'autres langages pour cet endpoint d'API.

**Remarque :** par défaut, tous les utilisateurs disposant du rôle Admin, Standard ou Read-Only ont accès aux données de log. Toutefois, les résultats des recherches peuvent être limités en fonction des autorisations de l'utilisateur qui a fourni la `<CLÉ_APP_DATADOG>`.

## Scénarios

### Recherche de base

Pour récupérer tous les événements de log d'un intervalle donné, utilisez la [syntaxe de recherche][5] suivante afin d'effectuer l'appel d'API.

Le paramètre `from` indique l'`heure de début`, tandis que le paramètre `to` indique l'`heure de fin`. Ils permettent de définir l'intervalle des données de log. Le paramètre `query` précise la requête de recherche à exécuter.

**Appel d'API :**

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APP_DATADOG>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  }
}'

```

**Réponse :**

L'ensemble de données renvoyé comprend l'objet `data`, comme illustré par l'exemple de réponse suivant :

```json

{
    "meta": {
        "page": {
            "after": "eyJhZnRlciI6IkFRQUFBWFVBWFJZVkpHeHZEUUFBQUFCQldGVkJXRkpaVm1kMlpsa3RiVWRVWmpSQlFRIn0"
        }
    },
    "data": [
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:02:33.461Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "450",
                    "user": "chris",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXd91M9wyTgAAAABBWFVBWGQ5MVZrQmFzdEZ2TG9BQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:57.586Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "500",
                    "user": "bob",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXVNSvuMvWwAAAABBWFVBWFZOU2I2ZWcxX3c2LVVBQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:41.909Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "700",
                    "user": "steve",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXRYVJGxvDQAAAABBWFVBWFJZVmd2ZlktbUdUZjRBQQ"
        }
    ],
    "links": {
        "next": "https://api.datadoghq.com/api/v2/logs/events?filter%5Bquery%5D=%2A&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWFVBWFJZVkpHeHZEUUFBQUFCQldGVkJXRkpaVm1kMlpsa3RiVWRVWmpSQlFRIn0&page%5Blimit%5D=3&filter%5Bfrom%5D=2020-10-07T00%3A00%3A00%2B00%3A00&filter%5Bto%5D=2020-10-07T00%3A15%3A00%2B00%3A00"
    }
}

```

### Tri par facette ou timestamp

#### Facette

L'appel d'API suivant trie les événements de log récupérés selon une facette, par exemple `pageViews`, dans l'ordre croissant. Ajoutez le caractère `@` pour la facette. Utilisez un trait d'union `-` devant le nom de la facette (p. ex., `-@pageViews`) pour trier les données dans l'ordre décroissant. Par défaut, les données sont triées par ordre décroissant des timestamps.

**Appel d'API :**

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APP_DATADOG>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  },
  "sort":"@pageViews"
}'

```

**Réponse :**

Dans l'exemple de réponse suivant, les événements de log récupérés sont triés par ordre croissant des valeurs de la facette `pageViews`. L'utilisateur `chris` possède 450 vues de page, l'utilisateur `bob` 500 et l'utilisateur `steve` 700.

```json

{
    "meta": {
        "page": {
            "after": "eyJhZnRlciI6IkFRQUFBWFVBWFJZVkpHeHZEUUFBQUFCQldGVkJXRkpaVm1kMlpsa3RiVWRVWmpSQlFRIiwidmFsdWVzIjpbIjcwMCJdfQ"
        }
    },
    "data": [
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:02:33.461Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "450",
                    "user": "chris",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXd91M9wyTgAAAABBWFVBWGQ5MVZrQmFzdEZ2TG9BQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:57.586Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "500",
                    "user": "bob",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXVNSvuMvWwAAAABBWFVBWFZOU2I2ZWcxX3c2LVVBQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:41.909Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "700",
                    "user": "steve",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXRYVJGxvDQAAAABBWFVBWFJZVmd2ZlktbUdUZjRBQQ"
        }
    ],
    "links": {
        "next": "https://api.datadoghq.com/api/v2/logs/events?sort=%40pageViews&filter%5Bquery%5D=%2A&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWFVBWFJZVkpHeHZEUUFBQUFCQldGVkJXRkpaVm1kMlpsa3RiVWRVWmpSQlFRIiwidmFsdWVzIjpbIjcwMCJdfQ&filter%5Bfrom%5D=2020-10-07T00%3A00%3A00%2B00%3A00&filter%5Bto%5D=2020-10-07T00%3A15%3A00%2B00%3A00"
    }
}

```

#### Timestamp

L'appel d'API suivant trie les événements de log récupérés dans l'ordre croissant de leur `timestamp`. Par défaut, les valeurs sont triées par ordre décroissant.

**Appel d'API :**

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APP_DATADOG>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  },
  "sort":"timestamp"
}'

```

**Réponse :**

Dans la réponse suivante, les événements de log sont récupérés dans l'ordre croissant de leur `timestamp`.

```json

{
    "meta": {
        "page": {
            "after": "eyJhZnRlciI6IkFRQUFBWFVBWGQ5MU05d3lUZ0FBQUFCQldGVkJXR1E1TVZaclFtRnpkRVoyVEc5QlFRIn0"
        }
    },
    "data": [
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:41.909Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "700",
                    "user": "steve",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXRYVJGxvDQAAAABBWFVBWFJZVmd2ZlktbUdUZjRBQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:57.586Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "500",
                    "user": "bob",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXVNSvuMvWwAAAABBWFVBWFZOU2I2ZWcxX3c2LVVBQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:02:33.461Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "450",
                    "user": "chris",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXd91M9wyTgAAAABBWFVBWGQ5MVZrQmFzdEZ2TG9BQQ"
        }
    ],
    "links": {
        "next": "https://api.datadoghq.com/api/v2/logs/events?sort=timestamp&filter%5Bquery%5D=%2A&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWFVBWGQ5MU05d3lUZ0FBQUFCQldGVkJXR1E1TVZaclFtRnpkRVoyVEc5QlFRIn0&filter%5Bfrom%5D=2020-10-07T00%3A00%3A00%2B00%3A00&filter%5Bto%5D=2020-10-07T00%3A15%3A00%2B00%3A00"
    }
}

```

### Restriction du nombre de résultats récupérés

L'appel d'API suivant limite le nombre d'événements de log récupérés. Le paramètre `limit` définit le nombre maximum d'événements de log renvoyés dans la réponse. La valeur maximale de la limite est `1000`.

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APP_DATADOG>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  },
   "page": {
    "limit":2
  },
  "sort":"-@pageViews"
}'

```

**Réponse :**

```json

{
    "meta": {
        "page": {
            "after": "eyJhZnRlciI6IkFRQUFBWFVBWFZOU3Z1TXZXd0FBQUFCQldGVkJXRlpPVTJJMlpXY3hYM2MyTFZWQlFRIiwidmFsdWVzIjpbIjUwMCJdfQ"
        }
    },
    "data": [
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:41.909Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "700",
                    "user": "steve",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXRYVJGxvDQAAAABBWFVBWFJZVmd2ZlktbUdUZjRBQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:57.586Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "500",
                    "user": "bob",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXVNSvuMvWwAAAABBWFVBWFZOU2I2ZWcxX3c2LVVBQQ"
        }
    ],
    "links": {
        "next": "https://api.datadoghq.com/api/v2/logs/events?sort=-%40pageViews&filter%5Bto%5D=2020-10-07T00%3A15%3A00%2B00%3A00&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWFVBWFZOU3Z1TXZXd0FBQUFCQldGVkJXRlpPVTJJMlpXY3hYM2MyTFZWQlFRIiwidmFsdWVzIjpbIjUwMCJdfQ&filter%5Bfrom%5D=2020-10-07T00%3A00%3A00%2B00%3A00&filter%5Bquery%5D=%2A&page%5Blimit%5D=2"
    }
}

```

### Réglages de l'intervalle

Les paramètres `from` and `to` peuvent être définis sur les valeurs suivantes :
- Une chaîne ISO-8601
- Un timestamp unix (un nombre représentant le nombre de millisecondes écoulées depuis epoch)
- Une chaîne de date mathématique, comme `+1h` pour ajouter une heure ou `-2d` pour soustraire deux jours. Les unités disponibles sont `s` pour seconde, `m` pour minute, `h` pour heure et `d` pour jour. Il est également possible d'utiliser la valeur `now` pour indiquer l'heure actuelle.

```javascript
{
  "filter": {
    "from": "now",
    "to": "now-1h"
  }
}
```

Le fuseau horaire peut être défini en précisant un décalage (p. ex., UTC +3) ou une zone régionale (p. ex., Europe/Paris). Si vous précisez à la fois un décalage et une zone, le décalage est prioritaire. Il doit être exprimé en secondes.

```javascript
{
  "options": {
    "timeOffset": -1000,
    "timezone": "Europe/Paris"
  }
}
```


### Pagination

Pour récupérer une liste de logs comportant plus de `1000` logs (soit la [limite maximale](#restriction-du-nombre-de-resultats-recuperes)), utilisez la fonctionnalité de pagination.

Le paramètre `data` est un tableau d'objets de log qui peut contenir autant de logs que le nombre défini par le paramètre `limit` de votre requête. Par défaut, ce paramètre est défini sur `50`, mais sa valeur maximale est de `1000`.

Pour consulter la prochaine page de vos logs, renvoyez la requête avec le paramètre `cursor` défini sur la valeur `after` de l'appel précédent.

Pour l'exemple JSON ci-dessus, utilisez la valeur `after` `eyJhZnRlciI6IkFRQUFBWFVBWFZOU3Z1TXZXd0FBQUFCQldGVkJXRlpPVTJJMlpXY3hYM2MyTFZWQlFRIiwidmFsdWVzIjpbIjUwMCJdfQ` pour récupérer les deux prochains résultats.

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <CLÉ_API_DATADOG>" -H "DD-APPLICATION-KEY: <CLÉ_APP_DATADOG>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  },
   "page": {
     "cursor": "eyJhZnRlciI6IkFRQUFBWFVBWFZOU3Z1TXZXd0FBQUFCQldGVkJXRlpPVTJJMlpXY3hYM2MyTFZWQlFRIiwidmFsdWVzIjpbIjUwMCJdfQ",
    "limit":2
  },
  "sort":"-@pageViews"
}'

```
**Réponse :**

La réponse renvoie les deux prochains résultats, à savoir l'utilisateur `joe` et ses 500 `pageviews`, et l'utilisateur `chris` et ses 450 `pageviews`. Si le paramètre `data` renvoie `null`, vous avez récupéré toutes les pages de logs associées à votre requête.

```json
{
    "meta": {
        "page": {
            "after": "eyJhZnRlciI6IkFRQUFBWFVBWGQ5MU05d3lUZ0FBQUFCQldGVkJXR1E1TVZaclFtRnpkRVoyVEc5QlFRIiwidmFsdWVzIjpbIjQ1MCJdfQ"
        }
    },
    "data": [
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:00:59.733Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "500",
                    "user": "joe",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXHFV1KuyTgAAAABBWFVBWEhGVlZrQmFzdEZ2X2dBQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:02:33.461Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "450",
                    "user": "chris",
                    "service": "pageViewService"
                },
                "message": "Exemple de message"
            },
            "type": "log",
            "id": "AQAAAXUAXd91M9wyTgAAAABBWFVBWGQ5MVZrQmFzdEZ2TG9BQQ"
        }
    ],
    "links": {
        "next": "https://api.datadoghq.com/api/v2/logs/events?sort=-%40pageViews&filter%5Bto%5D=2020-10-07T00%3A15%3A00%2B00%3A00&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWFVBWGQ5MU05d3lUZ0FBQUFCQldGVkJXR1E1TVZaclFtRnpkRVoyVEc5QlFRIiwidmFsdWVzIjpbIjQ1MCJdfQ&filter%5Bfrom%5D=2020-10-07T00%3A00%3A00%2B00%3A00&filter%5Bquery%5D=%2A&page%5Blimit%5D=2"
    }
}

```

**Remarque :** lorsque vous utilisez la pagination, évitez de définir des plages temporelles relatives. Vous pourriez perdre des résultats de recherche.

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v2/logs/
[2]: /fr/api/v1/authentication/
[3]: https://curl.haxx.se/download.html
[4]: /fr/logs/search_syntax/
[5]: /fr/account_management/rbac/permissions/?tab=ui#log-data-access
[6]: /fr/logs/explorer/facets/#overview