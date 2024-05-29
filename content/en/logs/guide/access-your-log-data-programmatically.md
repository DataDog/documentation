---
title: Programmatically Access Log Data Using the Logs Search API
kind: guide
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn more about Log Explorer"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn more about Search Syntax"
- link: "/logs/search_syntax/"
  tag: "Documentation"
  text: "Learn more about syntax for Logs Search API"
---


## Overview

Use the [Logs Search API][1] to programmatically access your log data and execute queries.

The following examples are covered in this guide:

* [Basic search](#basic-search)
* [Sort by facet or timestamp](#sort-by-facet-or-timestamp)
* [Limit the number of results retrieved](#limit-the-number-of-results-retrieved)
* [Time settings](#time-settings)
* [Pagination](#pagination)

## Prerequisites

- Use of the Logs Search API requires an [API key][2] and an [application key][3]. The user who created the application key must have the appropriate permission to access the data. To use the examples below, replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and your Datadog application key, respectively.

- This guide features `curl` examples. Install [curl][4] if you do not have it installed, or reference additional language examples for this API endpoint in the [Logs API][1].

## Examples

### Basic search

To retrieve all log events within a specific time period, use the following [Search Syntax][5] to complete the API call.

`from` indicates the `start time` and `to` indicates the `end time` for the log data. `query` indicates the search query that must be executed.

**API call:**

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  }
}'

```

**Response:**

The result dataset is comprised of the `data` object, as depicted in the following example response.

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
                "message": "Sample message"
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
                "message": "Sample message"
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
                "message": "Sample message"
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

### Sort by facet or timestamp

#### Facet

With the following API call, sort your retrieved log events by a facet such as `pageViews` in ascending order. Include `@` for the facet. Use a `-` hyphen in front of the facet name such as `-@pageViews` to sort in descending order. The default sort order is descending order by timestamps.

**API call:**

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  },
  "sort":"@pageViews"
}'

```

**Response:**

Log events are retrieved in ascending order of the `pageViews` facet values as depicted in the following response. User `chris` has 450, `bob` has 500, and `steve` has 700 page views.

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
                "message": "Sample message"
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
                "message": "Sample message"
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
                "message": "Sample message"
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

With the following API call, your retrieved log events are sorted by `timestamp` in ascending order. The default is descending order.

**API call:**

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  },
  "sort":"timestamp"
}'

```

**Response:**

Log events are retrieved in ascending order based on their `timestamp` values as depicted in the following response.

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
                "message": "Sample message"
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
                "message": "Sample message"
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
                "message": "Sample message"
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

### Limit the number of results retrieved

With the following API call, limit the number of log events retrieved. The `limit` indicates the maximum number of log events returned in the response. The maximum limit is `1000`.

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
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

**Response:**

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
                "message": "Sample message"
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
                "message": "Sample message"
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

### Time settings

The `from` and `to` parameters can be:
- an ISO-8601 string
- a unix timestamp (number representing the elapsed millisec since epoch)
- a date math string such as `+1h` to add one hour, `-2d` to subtract two days, etc. The full list includes `s` for seconds, `m` for minutes, `h` for hours, and `d` for days. Optionally, use `now` to indicate current time.

```javascript
{
  "filter": {
    "from": "now-1h",
    "to": "now"
  }
}
```

The timezone can be specified both as an offset (for example, "UTC+03:00") or a regional zone (for example, "Europe/Paris"). If both offset and timezone are supplied then the offset takes precedence. The offset must be specified in seconds.

```javascript
{
  "options": {
    "timeOffset": -1000,
    "timezone": "Europe/Paris"
  }
}
```


### Pagination

To retrieve a log list longer than the `1000` [logs limit](#limit-the-number-of-results-retrieved), use the pagination feature. 

The `data` parameter is an array of Log objects and at maximum it contains as many logs as defined with the `limit` parameter in your query. This parameter is `50` by default, but can be set up to `1000`.

To see the next page of your logs, resend the query with the `cursor` parameter that takes the `after` value from the previous call.

From the above JSON example, use the `after` value `eyJhZnRlciI6IkFRQUFBWFVBWFZOU3Z1TXZXd0FBQUFCQldGVkJXRlpPVTJJMlpXY3hYM2MyTFZWQlFRIiwidmFsdWVzIjpbIjUwMCJdfQ` to get the next two results.

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
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
**Response:**

In the response, the next two results, `joe` with 500 `pageviews` and `chris` with 450 `pageviews`, are retrieved. When you see `data` returns `null`, you have returned all pages of logs associated with your query.

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
                "message": "Sample message"
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
                "message": "Sample message"
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

**Note:** Avoid the use of relative timeranges when using pagination as it may lead to missing search results.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v2/logs/
[2]: /account_management/api-app-keys/#api-keys
[3]: /account_management/api-app-keys/#application-keys
[4]: https://curl.haxx.se/download.html
[5]: /logs/explorer/search_syntax/
