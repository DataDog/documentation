---
title: Access your log data programmatically using Logs Search API.
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
* [Pagination](#pagination)

## Prerequisites

Since this guide describes usage of the API, you will need an API key and an application key from an admin user. These are available in your [Datadog account API key page][2].

Throughout this article, you will need to replace all occurrences of `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and your Datadog application key, respectively.

This guide also assumes that you have a terminal with `CURL`. 

**Note:** If you are in the Datadog EU site, use https://api.datadoghq.eu/api/  as the endpoint.

## Examples

### Basic search

In our sample data, we have some log events data which includes the number of `page views` for each `user`. 

With the following API call, retrieve all log events within a specific time period. The `from` indicates the `start time` and the `to` indicates the `end time` for the log data. The `query` indicates the search query that must be executed. It follows the [Search Syntax][3].

**API call:**

```bash

curl -L -X POST "https://api.datadoghq.com/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  }
}'

```

**Response:**

The result dataset comprises the `data` object as shown in the following sample response.

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
                    "source:postman"
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
                    "source:postman"
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
                    "source:postman"
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

{{< tabs >}}
{{% tab "Facet" %}}

With the following API call, sort your retrieved log events by some facet such as `pageViews` in ascending order. Make sure to include `@` for the facet. Use a `-` hyphen in front of the facet name such as `-@pageViews` to sort in descending order.

**API call:**

```bash

curl -L -X POST "https://api.datadoghq.com/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  },
  "sort":"@pageViews"
}'

```

**Response:**

The log events are retrieved in ascending order of the `pageViews` facet values as showing in the following response. User `chris` has 450, `bob` has 500, and `steve` has 700 page views.

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
                    "source:postman"
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
                    "source:postman"
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
                    "source:postman"
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

{{% /tab %}}
{{% tab "Timestamp" %}}

With the following API call, sort your retrieved log events by `timestamp` in ascending order. Use a `-` hyphen such as `-timestamp` to sort in descending order.

**API call:**

```bash

curl -L -X POST "https://api.datadoghq.com/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  },
  "sort":"timestamp"
}'

```

**Response:**

The log events are retrieved in ascending order based on their `timestamp` values as showing in the following response.

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
                    "source:postman"
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
                    "source:postman"
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
                    "source:postman"
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
{{% /tab %}}
{{< /tabs >}}

### Limit the number of results retrieved

With the following API call, limit the number of log events retrieved. The `limit` indicates the maximum number of log events returned in the response.

```bash

curl -L -X POST "https://api.datadoghq.com/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
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
                    "source:postman"
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
                    "source:postman"
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

### Pagination

To retrieve a log list longer than the maximum 1000 logs limit, you must use the Pagination feature.

The `data` parameter is an array of Log objects and at maximum it contains as many logs as defined with the `limit` parameter in your query. This parameter equals `50` by default, but can be set up to `1000`. 

To see next page of your logs, continue to resend your query but include the `cursor` parameter where it takes the `after` value from the previous call. 

From the above JSON example, use the `after` value `eyJhZnRlciI6IkFRQUFBWFVBWFZOU3Z1TXZXd0FBQUFCQldGVkJXRlpPVTJJMlpXY3hYM2MyTFZWQlFRIiwidmFsdWVzIjpbIjUwMCJdfQ` to get the next two results.

```bash

curl -L -X POST "https://api.datadoghq.com/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
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

```json

In the response, the next two results, (for example, `joe` with 500 `pageviews` and `chris` with 450 `pageviews`) are retrieved. When you see `data` returns `null`, you have returned all pages of logs associated with your query.

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
                    "source:postman"
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
                    "source:postman"
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

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/v2/logs/
[2]: https://docs.datadoghq.com/api/v1/authentication/
[3]: https://docs.datadoghq.com/logs/search_syntax/
