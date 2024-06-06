---
title: Log Search Syntax
kind: documentation
description: "Search through all of your logs."
aliases:
    - /logs/search-syntax
    - /logs/search_syntax/
further_reading:
- link: "/logs/explorer/#visualize"
  tag: "Documentation"
  text: "Learn how to visualize logs"
- link: "/logs/explorer/#patterns"
  tag: "Documentation"
  text: "Detect patterns inside your logs"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/explorer/saved_views/"
  tag: "Documentation"
  text: "Learn about Saved Views"
---

## Overview

A query filter is composed of terms and operators.

There are two types of terms:

* A **single term** is a single word such as `test` or `hello`.

* A **sequence** is a group of words surrounded by double quotes, such as `"hello dolly"`.

To combine multiple terms into a complex query, you can use any of the following case sensitive Boolean operators:

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **Operator** | **Description**                                                                                        | **Example**                  |
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure   |
| `OR`         | **Union**: either term is contained in the selected events                                             | authentication OR password   |
| `-`          | **Exclusion**: the following term is NOT in the event (apply to each individual raw text search)                                                  | authentication AND -password |

## Full-text search 

<div class="alert alert-warning">The full-text search feature is only available in Log Management and works in monitor, dashboard, and notebook queries. The full-text search syntax cannot be used to define index filters, archive filters, log pipeline filters, or in Live Tail. </div>

Use the syntax `*:search_term` to perform a full-text search across all log attributes, including the log message.

### Single term example

| Search syntax | Search type | Description                                           |
| ------------- | ----------- | ----------------------------------------------------- |
| `*:hello` | Full-text   | Searches all log attributes for the term `hello`.     |
| `hello`       | Free text   | Searches only the log message for the term `hello`.   |

### Search term with wildcard example

| Search syntax | Search type | Description                                                                                  |
| ------------- | ----------- | -------------------------------------------------------------------------------------------- |
| `*:hello` | Full-text   | Searches all log attributes for the exact string `hello`.                                    |
| `*:hello*`| Full-text   | Searches all log attributes for strings that starts with `hello`. For example, `hello_world`.|

### Multiple terms with exact match example

| Search syntax       | Search type | Description                                            |
| ------------------- | ----------- |------------------------------------------------------- |
| `*:"hello world"` | Full-text   | Searches all log attributes for the term `hello world`. |
| `hello world`       | Free text   | Searches only the log message for the term `hello`.     |

### Multiple terms without exact match example

The full-text search syntax `*:hello world` is equivalent to `*:hello *:world`. It searches all log attributes for the terms `hello` and `world`.

### Multiple terms with a white space example

The full-text search syntax `*:"hello world" "i am here"` is equivalent to `*:"hello world" *:"i am here"`. It searches all log attributes for the terms `hello world` and `i am here`.

## Escape special characters and spaces

The following characters, which are considered special: `+` `-` `=` `&&` `||` `>` `<` `!` `(` `)` `{` `}` `[` `]` `^` `"` `“` `”` `~` `*` `?` `:` `\` `#`, and spaces require escaping with the `\` character. 
`/` is not considered a special character and doesn't need to be escaped.

You cannot search for special characters in a log message. You can search for special characters when they are inside of an attribute.

To search for special characters, parse them into an attribute with the [Grok Parser][1], and search for logs that contain that attribute.


## Attributes search

To search on a specific attribute, add `@` to specify you are searching on an attribute.

For instance, if your attribute name is **url** and you want to filter on the **url** value `www.datadoghq.com`, enter:

```
@url:www.datadoghq.com
```


**Notes**:

1. It is **not** required to define a facet to search on attributes and tags.

2. Attributes searches are case sensitive. Use [full-text search](#full-text-search) to get case insensitive results. Another option is to use the `lowercase` filter with your Grok parser while parsing to get case insensitive results during search.

3. Searching for an attribute value that contains special characters requires escaping or double quotes.
    - For example, for an attribute `my_attribute` with the value `hello:world`, search using: `@my_attribute:hello\:world` or `@my_attribute:"hello:world"`.
    - To match a single special character or space, use the `?` wildcard. For example, for an attribute `my_attribute` with the value `hello world`, search using: `@my_attribute:hello?world`.

Examples:

| Search query                                                         | Description                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | Searches all logs matching `/api/v1/test` in the attribute `http.url_details.path`.                                                                               |
| `@http.url:/api\-v1/*`                                             | Searches all logs containing a value in `http.url` attribute that start with `/api-v1/`                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:/api\-v1/*` | Searches all logs containing a `http.status_code` value between 200 and 299, and containing a value in `http.url_details.path` attribute that start with `/api-v1/` |
| `-@http.status_code:*`                                                | Searches all logs not containing the `http.status_code` attribute |

### Search using CIDR notation
Classless Inter Domain Routing (CIDR) is a notation that allows users to define a range of IP addresses (also called CIDR blocks) succinctly. CIDR is most commonly used to define a network (such as a VPC) or a subnetwork (such as public/private subnet within a VPC).

Users can use the `CIDR()` function to query attributes in logs using CIDR notation. The `CIDR()` function needs to be passed in a log attribute as a parameter to filter against, followed by one or multiple CIDR blocks. 

#### Examples
- `CIDR(@network.client.ip,13.0.0.0/8)` matches and filters logs that have IP addresses in the field `network.client.ip` that fall under the 13.0.0.0/8 CIDR block.
- `CIDR(@network.ip.list,13.0.0.0/8, 15.0.0.0/8)` matches and filters logs that have any IP addresses in an array attribute `network.ip.list` that fall under the 13.0.0.0/8 or 15.0.0.0/8 CIDR blocks.
- `source:pan.firewall evt.name:reject CIDR(@network.client.ip, 13.0.0.0/8)` would match and filter reject events from palo alto firewall that originate in the 13.0.0.0/8 subnet
- `source:vpc NOT(CIDR(@network.client.ip, 13.0.0.0/8)) CIDR(@network.destination.ip, 15.0.0.0/8)` will show all VPC logs that do not originate in subnet 13.0.0.0/8 but are designated for destination subnet 15.0.0.0/8 because you want to analyze network traffic in your environments between subnets

The `CIDR()` function supports both IPv4 and IPv6 CIDR notations and works in Log Explorer, Live Tail, log widgets in Dashboards, log monitors, and log configurations.

## Wildcards

You can use wildcards with free text search. However, it only searches for terms in the log message, the text in the `content` column in Log Explorer. See [Full-text search](#full-text-search) if you want to search for a value in a log attribute.

### Multi-character wildcard

To perform a multi-character wildcard search in the log message (the `content` column in Log Explorer), use the `*` symbol as follows:

* `service:web*` matches every log message that has a service starting with `web`.
* `web*` matches all log messages starting with `web`.
* `*web` matches all log messages that end with `web`.

**Note**: Wildcards only work as wildcards outside of double quotes. For example, `"*test*"` matches a log which has the string `*test*` in its message. `*test*` matches a log which has the string test anywhere in its message.

Wildcard searches work within tags and attributes (faceted or not) with this syntax. This query returns all the services that end with the string `mongo`:
<p> </p>
<p></p>

```
service:*mongo
```

Wildcard searches can also be used to search in the plain text of a log that is not part of a log attribute. For example, this query returns all logs with content (message) that contain the string `NETWORK`:

```
*NETWORK*
```

However, this search term does not return logs that contain the string `NETWORK` if it is in a log attribute and not part of the log message.

### Search wildcard

When searching for an attribute or tag value that contains special characters or requires escaping or double quotes, use the `?` wildcard to match a single special character or space. For example, to search for an attribute `my_attribute` with the value `hello world`: `@my_attribute:hello?world`.
<p> </p>

## Numerical values

In order to search on a numerical attribute, first [add it as a facet][2]. You can then use numerical operators (`<`,`>`, `<=`, or `>=`) to perform a search on numerical facets.
For instance, retrieve all logs that have a response time over 100ms with:
<p> </p>

```
@http.response_time:>100
```

You can search for numerical attribute within a specific range. For instance, retrieve all your 4xx errors with:

```
@http.status_code:[400 TO 499]
```

## Tags

Your logs inherit tags from [hosts][3] and [integrations][4] that generate them. They can be used in the search and as facets as well:

* `test` is searching for the string "test".
* `env:(prod OR test)` matches all logs with the tag `env:prod` or the tag `env:test`
* `(env:prod AND -version:beta)` matches all logs that contain tag `env:prod` and that do not contain tag `version:beta`

If your tags don't follow [tags best practices][5] and don't use the `key:value` syntax, use this search query:

* `tags:<MY_TAG>`

## Arrays

In the below example, clicking on the `Peter` value in the facet returns all the logs that contains a `users.names` attribute, whose value is either `Peter` or an array that contains `Peter`:

{{< img src="logs/explorer/search/array_search.png" alt="Array and Facets" style="width:80%;">}}

**Note**: Search can also be used on non-faceted array attributes using an equivalent syntax.

In the following example, CloudWatch logs for Windows contain an array of JSON objects under `@Event.EventData.Data`. You cannot create a facet on array of JSON objects, but you can search using the following syntax.

* `@Event.EventData.Data.Name:ObjectServer` matches all logs with the key `Name` and value `ObjectServer`.

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="Facetless query on array of JSON objects" style="width:80%;">}}
<p> </p>

## Saved searches

[Saved Views][6] contain your search query, columns, time horizon, and facet.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/parsing
[2]: /logs/explorer/facets/
[3]: /infrastructure/
[4]: /integrations/#cat-log-collection
[5]: /getting_started/tagging/#tags-best-practices
[6]: /logs/explorer/saved_views/
[7]: /logs/explorer/facets/#facet-panel
