---
title: Search Syntax
description: Learn the new filter query search syntax for your Observability Pipelines processors.
disable_toc: false
---
## Overview

When you add a processor to a pipeline, you can filter logs to process only a defined subset. This document goes over the following information:

- [Free text search](#free-text-search): to search the `message` field
- [Attribute search](#attribute-search): to search attribute keys and values
- [Arrays](#arrays): to search within an array of nested values
- [Boolean operators](#boolean-operators)
- [Special characters and spaces that must be escaped](#escape-special-characters-and-spaces)
- [Wildcards](#wildcards)

**Note**: Worker version 2.11 and newer uses an upgraded search syntax. After you upgrade the Worker to version 2.11, you might need to update your filter queries to match the new syntax. See [Upgrade Your Filter Queries to the New Search Syntax][1] for more information.

## Search syntax

There are two types of filter queries you can use:

- [Free text](#free-text-search)
- [Attribute](#attribute-search)

### Free text search

Free text search only searches the `message` field and is case insensitive. It is composed of terms and operators. There are two types of terms:

- A single term is a single word such as `test` or `hello`.
- A sequence is a group of words surrounded by double quotes, such as `"hello dolly"`.

The following are free text search examples:

`hello`
: Searches for the exact string `hello`. For example, `{"message": "hello world"}` is a matching log.

`Hello world`
: Searches for `hello` and `world`. For example, `"hello beautiful world"` is a match.
: This query can also be written as `Hello AND world`.
: **Note**: The message must contain both `hello` and `world` to match.

`"hello world"`
: Searches for a sequence of words. For example, `"hello world"`, `"hello-world"`, and `"Hello, world"` are all matches.

### Attribute search

You can search attribute keys and values. For example, if your attribute key is `url` and you want to filter on the `url` value `www.datadoghq.com`, enter: `url:www.datadoghq.com`.

To filter for events that have a specific attribute key, use the `_exists_` syntax. For example, if you use the query `_exists_:service`, the event `{"service": "postgres"}` matches the query, but the event `{"env": "prod"}` does not match.

**Note**: Attribute searches are case sensitive.

Here are some attribute search syntax examples and logs that match the syntax:

`status:ok service:flask-web-app`
: Matches logs with the status `ok` from your `flask-web-app` service.
: This query can also be written as: `status:ok AND service:flask-web-app`.

`user.status:inactive`
: Matches logs with the status `inactive` nested under the `user` attribute.

`http.url:/api-v1/*`
: Matches logs containing a value in the `http.url` attribute that starts with `/api-v1/`.

`http.status:[200 TO 299]`
: Matches logs containing an `http.status` value that is greater than or equal to `200` and less than or equal to `299`.
: **Notes**:<br>- `[..]` Square brackets mean the ranges are inclusive.<br>- Ranges can be used across any attribute.

`http.status:{200 TO 299}`
: Matches logs containing an `http.status` value that is greater than `200` or less than `299`.
: **Notes**:<br>- `{..}` Curly brackets mean the ranges are exclusive.<br>- Ranges can be used across any attribute.

`http.status_code:[200 TO 299] http.url_details.path:/api-v1/*`
: Matches logs containing both:<br>- An `http.status_code` value that is greater than or equal to `200` and less than or equal to `299`<br>- A value in the `http.url_details.path` attribute that start with `/api-v1/`.

`"service.status":disabled`
: Matches logs with `"service.status": "disabled"`. This filter syntax searches for a literal `.` in the attribute key.
: See [Path notation](#path-notation) for more information.

`_exists_:service`
: Matches logs with the attribute key `service`. For example, the query matches `{"service": "postgres"}`, but does not match `{"env": "prod"}`.

#### Path notation

To understand path notation, let's look at the following log structure:

```json
{
    "outer_key": {
        "inner_key": "inner_value",
        "a": {
            "double_inner_key": "double_inner_value",
            "b": "b value"
        },
        "c": "c value"
    },
    "d": "d value"
}
```
In this example, use the following reference rules:
- Use `outer_key.inner_key` to reference the key with the value `inner_value`.
- Use `outer_key.inner_key.double_inner_key` to reference the key with the value `double_inner_value`.

If you want to search for a literal `.` in the attribute key, wrap the key in escaped quotes in the search query. For example, the search query `"service.status":disabled` matches the event `{"service.status": "disabled"}`.

### Arrays

In the following example, CloudWatch logs for Windows contain an array of JSON objects under `Event.EventData.Data`.

```
Event
{
EventData {
    Data [
        {"Name":"SubjectUserID1", "value":"12345"},
        {"Name":"SubjectUserID2", "value":"Admin"},
        {"Name":"ObjectServer", "value":"Security"}
	]
    }
}
```

If you use the filter query `Event.EventData.Data.Name:ObjectServer`, the above log event is matched because it contains a nested object with the attribute key `Name` and the value `ObjectServer`.

### Boolean operators

You can use the following case sensitive Boolean operators to combine multiple terms in a search query.

| Operator     | Description                                            |
|--------------|--------------------------------------------------------|
| `AND`        | Intersection: both terms are in the event.             |
| `OR`         | Union: either term is contained in the event.          |
| `-` or `NOT` | Exclusion: the following term is **not** in the event. |

The follow are example queries that use Boolean operators:

`NOT (status:debug)`
: Matches logs that do not have the status `DEBUG`.

`host:COMP-A9JNGYK OR host:COMP-J58KAS`
: Only matches logs from those specific hosts.

`Hello AND World`
: Searches for `hello` and `world`. For example, `"hello beautiful world"` is a match.
: This query can also be written as: `Hello world`.
: **Note**: The message must contain both `hello` and `world` to match.

`hello AND status:info`
: Matches logs with a message field that contains `hello` and with `status:info`.

`-http.status_code:200`
: Matches logs where http.status_code is not equal to 200

`service:(postgres OR datadog_agent)`
: Matches logs with the values `postgres` or `datadog_agent` for the `service` attribute. This query can also be written as: `service:postgres OR service:datadog_agent`

## Escape special characters and spaces

The following characters are considered special and must be escaped with a backslash (`\`): 

`-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `#`, and spaces.

**Notes**:

- `/` is not considered a special character and doesn't need to be escaped.
- You can search for special characters inside of an attribute. See [Search an attribute that contains special characters](#search-an-attribute-that-contains-special-characters).
- If you want to match logs that contain the special character `!` in the `message` field, use the attribute search syntax: `message:*!*`.
    - **Note**: You cannot use free text search queries to filter for log messages with special characters.

### Search an attribute that contains special characters

Searching for an attribute value that contains special characters requires escaping or double quotes. For example, to search for an attribute `my_app` with the value `hello:world`, use the syntax: `my_app:hello\:world` or `my_app:"hello:world"`.

### Match a single special character or space

To match a single special character or space, use the `?` wildcard. For example, to search for an attribute `my_app` with the value `hello world again`, use the syntax: `my_app:hello?world?again`.

### Examples

To learn how to escape special characters and spaces in a search, let's look at a log example:

```
{
    "service": "postgres",
    "status": "INFO",
    "tags": [
        "env:prod",
        "namespace:something",
        "reader:logs",
        "my_app:hello world again"
    ]
}
```

The following are search syntax examples that escape special characters and spaces in the log example:

`tags:env*`
: Matches logs with a `tag` attribute value of `env`.

`tags:(env\:prod OR env\:test)`
: Matches logs with the tag `env:prod` or `env:test` in the `tags` array.
: This query can also be written as `tags:("env:prod" OR "env:test")`.

`tags:env\:prod AND -tags:version\:beta`
: Matches logs that have `env:prod` and does not have `version:beta` in the `tag` array.
: This query can also be written as `tags:"env:prod" AND -tags:"version:beta"`.

`my_app:hello\:world`
: Matches logs that contain `my_app:hello:world`.
: This query can also be written as `my_app:"hello:world"`.

`my_app:hello?world?again`
: Matches logs that contain `"my_app":"hello world again"`.

## Wildcards

​​You can use `*` for wildcard searches. The following are wildcard search examples:

`*network*`
: Matches logs with a `message` field value that contains `network`.

`web*`
: Matches logs with a `message` field value that starts with `web`.

`*web`
: Matches logs with a `message` field value that ends with `web`.

`service:*mongo`
: Matches logs with `service` attribute values that ends with `mongo`.

`service:web*`
: Matches logs that have a `service` attribute value that starts with `web`.

**Notes**:
- You cannot use wildcards to search attribute keys, such as `*:app` or `service*:app`.
- Wildcards only work as wildcards outside of double quotes.
    - For example, `"*test*"` matches a log which has the string `*test*` in its `message` field, while `*test*` matches a log which has the string `test` anywhere in the `message` field.

#### Search for special characters or escaped characters

When searching for an attribute that contains special characters or requires escaping or double quotes, use the `?` wildcard to match a single special character or space. For example, to search for an attribute `my_attribute` with the value `hello world`, use the syntax: `my_attribute:hello?world`.

[1]: /observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/