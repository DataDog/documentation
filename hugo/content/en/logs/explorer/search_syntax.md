---
title: Log Search Syntax
description: "Search through all of your logs."
aliases:
    - /logs/search-syntax
    - /logs/search_syntax/
further_reading:
- link: "/getting_started/search/"
  tag: "Documentation"
  text: "Getting Started with Search in Datadog"
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
- link: "/logs/explorer/calculated_fields/formulas"
  tag: "Documentation"
  text: "Learn more about Calculated Fields Formulas"
- link: "https://learn.datadoghq.com/courses/log-explorer"
  tag: "Learning Center"
  text: "Getting Started with Log Explorer"

---

## Overview

A query filter is composed of terms and operators.

There are two types of terms:

* A **single term** is a single word such as `test` or `hello`.

* A **sequence** is a group of words surrounded by double quotes, such as `"hello world"`.

**Note**: Use straight double quotes (`"`) for sequences. Search ignores curly quotation marks (`“ ”`), which some text editors and chat apps insert automatically. For example, `“hello world”` matches logs that contain `hello` and `world` in any order.

To combine multiple terms into a complex query, use any of the following case-sensitive Boolean operators:

| Operator | Description                                                                                                  | Example                        |
|----------|--------------------------------------------------------------------------------------------------------------|--------------------------------|
| `AND`    | **Intersection**: Both terms are in the selected events. If no operator is specified, `AND` is the default.  | `authentication AND failure`   |
| `OR`     | **Union**: Either term is in the selected events.                                                            | `authentication OR password`   |
| `-`      | **Exclusion**: The following term isn't in the event. Applies to each individual raw text search.            | `authentication AND -password` |

## Full-text search

<div class="alert alert-danger">The full-text search feature is only available in Log Management and works in monitor, dashboard, and notebook queries. The full-text search syntax cannot be used to define index filters, archive filters, log pipeline filters, rehydration filters, log-based metric filters, or in Live Tail. </div>

Use the syntax `*:search_term` to perform a full-text search across all log attributes, including the log message.

### Single term example

| Search syntax | Search type | Description                                               |
| ------------- | ----------- | --------------------------------------------------------- |
| `*:hello`     | Full-text   | Searches all log attributes for the exact string `hello`. |
| `hello`       | Free text   | Searches only the `message`, `@title`, `@error.message`, and `@error.stack` attributes for the exact string `hello`.       |

### Search term with wildcard example

| Search syntax | Search type | Description                                                                                 |
| ------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `*:hello`     | Full-text   | Searches all log attributes for the exact string `hello`.                                   |
| `*:hello*`    | Full-text   | Searches all log attributes for strings starting with `hello`. For example, `hello_world`.  |

### Multiple terms with exact match example

| Search syntax       | Search type | Description                                                                                        |
| ------------------- | ----------- |--------------------------------------------------------------------------------------------------- |
| `*:"hello world"`   | Full-text   | Searches all log attributes for the exact string `hello world`.                                    |
| `hello world`       | Free text   | Searches only the log message for `hello` and `world` words. For example `hello beautiful world`.  |

## Escape special characters and spaces

The following characters are considered special and require escaping with the `\` character: `-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `\` `#`, and spaces.
- `/` is not considered a special character and doesn't need to be escaped.
- `@` cannot be used in search queries within Logs Explorer because it is reserved for [Attribute Search](#attributes-search).

Special characters in a log message aren't searchable. To search for them, parse them into an attribute with the [Grok Parser][1], then search on that attribute.

## Attributes search

To search on a specific attribute, add `@` to specify you are searching on an attribute.

For instance, if your attribute name is **url** and you want to filter on the **url** value `www.datadoghq.com`, enter:

```
@url:www.datadoghq.com
```

### Reserved attributes

[Reserved attributes][8] such as `host`, `source`, `status`, `service`, `trace_id`, and `message` do not require the `@` prefix. You can search these attributes directly:

```
service:web-app
status:error
host:i-1234567890abcdef0
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
- `source:vpc NOT(CIDR(@network.client.ip, 13.0.0.0/8)) CIDR(@network.destination.ip, 15.0.0.0/8)` shows all VPC logs that do not originate in subnet 13.0.0.0/8 but are designated for destination subnet 15.0.0.0/8 because you want to analyze network traffic in your environments between subnets

The `CIDR()` function supports both IPv4 and IPv6 CIDR notations and works in Log Explorer, Live Tail, log widgets in Dashboards, log monitors, and log configurations.

## Wildcards

Wildcards work in free-text search, which searches the log message (the `content` column in Log Explorer). To search log attributes with wildcards, use full-text search as described in the [Full-text search](#full-text-search) section.

### Multi-character wildcard

Use the `*` symbol to match any number of characters, including zero. In the log message, `*` matches characters within a single word. For example:

* `web*` matches log messages that contain a word starting with `web`, such as `web` or `webserver`.
* `*web` matches log messages that contain a word ending with `web`, such as `myweb`.
* `*web*` matches log messages that contain a word with `web` anywhere in it, such as `mywebserver`.

For how search defines a word, see the [How free-text search splits words](#how-free-text-search-splits-words) section.

A single `*` doesn't match across words. For example, `waiting*time` doesn't match the log message `waiting until next renew time`. To match across words, use one of the following:

* **Double wildcard (`**`)**: Matches any characters, including spaces and punctuation between words. For example, `waiting**time` matches `waiting until next renew time`.
* **Escaped space (`\ `)**: Matches consecutive words, and each word can contain wildcards. For example, `waiting\ un*` matches `waiting until next renew time`.

Wildcards take effect only outside double quotes. Inside double quotes, `*` is treated like other punctuation and ignored, so `"*test*"` searches for the word `test`.

**Tip**: Single-word searches without wildcards or double quotes are the fastest. Wildcard and quoted searches take longer, especially across a large volume of logs. To speed these searches up, combine them with selective filters such as `service` or `host`.

Wildcard searches work within tags and attributes (faceted or not) with this syntax. For example, this query returns all the services that end with the string `mongo`:

```
service:*mongo
```

Without an attribute prefix, a wildcard search such as `*NETWORK*` searches only the log message, not log attributes.

### Search wildcard

When searching for an attribute or tag value that contains special characters or requires escaping or double quotes, use the `?` wildcard to match a single special character or space. For example, to search for an attribute `my_attribute` with the value `hello world`: `@my_attribute:hello?world`.

## How free-text search splits words

Free-text search matches whole words. Datadog splits both the log message and your query into words according to the [Unicode word boundary rules][9]. Spaces and most punctuation separate words, and the separators themselves aren't searchable. For example, `hello` matches `Hello, world!`, and `"hello world"` matches `hello-world`. The same rules apply to full-text searches that use `*:`.

Some punctuation separates words only in certain contexts. The following table shows how periods, colons, commas, apostrophes, underscores, and hyphens split text:

| Pattern                    | Example       | Resulting words        |
|----------------------------|---------------|------------------------|
| Letter, period, letter     | `my.friend`   | `my.friend`            |
| Period, space              | `my. friend`  | `my`, `friend`         |
| Letter, period, number     | `version.2`   | `version`, `2`         |
| Number, period, letter     | `5.star`      | `5`, `star`            |
| Number, period, number     | `192.168.1.1` | `192.168.1.1`          |
| Number, comma, number      | `3,456`       | `3,456`                |
| Letter, colon, letter      | `metric:cpu`  | `metric:cpu`           |
| Letter, colon, number      | `RequestId:5` | `RequestId`, `5`       |
| Letter, apostrophe, letter | `don't`       | `don't`                |
| Letter, underscore, letter | `hello_world` | `hello_world`          |
| Letter, hyphen, letter     | `hello-world` | `hello`, `world`       |

Because Datadog treats `my.friend` as a single word, the query `friend` doesn't match it. To match part of a word, use a wildcard as described in the [Multi-character wildcard](#multi-character-wildcard) section. For example, `*friend` matches `my.friend`.

Straight (`'`) and curly (`‘` or `’`) apostrophes are different characters, so `don't` doesn't match `don’t`. To match both, use a wildcard such as `don*`.

## Numerical values

To search on a numerical attribute, first [add it as a facet][2]. You can then use numerical operators (`<`,`>`, `<=`, or `>=`) to perform a search on numerical facets.

For example, retrieve all logs that have a response time over 100 ms with:

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

In the following example, clicking on the `Peter` value in the facet returns all the logs that contains a `users.names` attribute, whose value is either `Peter` or an array that contains `Peter`:

{{< img src="logs/explorer/search/array_search.png" alt="Array and Facets" style="width:80%;">}}

**Note**: Search can also be used on non-faceted array attributes using an equivalent syntax.

In the following example, CloudWatch logs for Windows contain an array of JSON objects under `@Event.EventData.Data`. You cannot create a facet on array of JSON objects, but you can search using the following syntax.

* `@Event.EventData.Data.Name:ObjectServer` matches all logs with the key `Name` and value `ObjectServer`.

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="Facetless query on array of JSON objects" style="width:80%;">}}

### Nested array search

To search a nested field in an array attribute, use the `@` prefix with the full attribute path. Log Explorer matches any item in the array:

* `@network.ip.attributes.ip:2a02\:1810*` matches all logs where at least one item in the `network.ip.attributes` array has an `ip` field starting with `2a02:1810`.

To match logs where an array contains multiple specific values, list the values in parentheses:

* `@user_perms:(4 6)` matches all logs where the `user_perms` array contains both `4` and `6`.

To match logs where an array contains any value within a range, use a range query:

* `@user_perms:[2 TO 6]` matches all logs where the `user_perms` array contains at least one value between `2` and `6`.

## Calculated fields

Calculated fields function like log attributes and can be used for search, aggregation, visualization, and defining other calculated fields. Use the `#` prefix to reference calculated field names.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="A calculated field called request_duration used to filter results in the Log Explorer" style="width:100%;" >}}

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
[8]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
[9]: https://www.unicode.org/reports/tr29/#Word_Boundaries
