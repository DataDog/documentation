---
title: Search
kind: documentation
description: "Search through all of your logs."
aliases:
    - /logs/search
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/explorer/patterns"
  tag: "Documentation"
  text: "Detect patterns inside your logs"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/explorer/saved_views"
  tag: "Documentation"
  text: "Automatically configure your Log Explorer"
---

With log management, while you are free to run raw text searches on your logs, you will gain a better search and analytics experience if you have your logs processed well upon intake via the [processing pipelines][6] thus leveraging the full potential of facet search.

#### Main benefits of facet search

1. Empower more users: easier to query important content effectively for anyone in your team, just select the values from the facet list.

2. Save time: get the result instantaneously as the processing is done up front.

3. Find a needle in the haystack: powerful query operators enable users to easily spot hard to find corner-cases.

4. Focus on what matters: facets leverage Role Based Access Control (RBAC), therefore each team can have a predefined set of facets on the attributes they are concerned.

{{< img src="logs/explorer/search_your_logs.mp4" alt="Search your logs" video="true" responsive="true" >}}

## Search syntax

A query is composed of terms and operators.

There are two types of terms:

* A **single term** is a single word such as `test` or `hello`.

* A **sequence** is a group of words surrounded by double quotes, such as `"hello dolly"`.

A search term can target a:

* [facet](#facets-search)
* [word in the raw log content](#log-content-search).

To combine multiple terms into a complex query, you can use any of the following Boolean operators:

| **Operator** | **Description**                                                                                        | **Example**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | `authentication AND failure`   |
| `OR`         | **Union**: either term is contained in the selected events                                             | `authentication OR password`   |
| `-`          | **Exclusion**: the following term is NOT in the event                                                  | `authentication AND -password` |

It is allowed to combine search terms on facets and on log content.

## Facets search

The source of a facet can be:

* standard attribute
* custom-defined
* reserved attribute
* tag

**Important notes**:

* The search is case insensitive.

* The following characters are considered special: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, and `\` require escaping with the `\` character unless enclosed within double quotes `"`.

* Log facets should not contain spaces, but if they do, spaces must be escaped. For example if a facet is named `user.first name`, perform a facet search by escaping the space: `@user.first\ name:myvalue`.

### Standard attribute & custom-defined facet search

To search on a specific attribute, first [add it as a facet][1] and then add `@` to specify you are searching on a facet or a [standard attribute][7].

For instance, if your facet name is **url** and you want to filter on the **url** value *www.datadoghq.com*, enter:

`@url:www.datadoghq.com`

### Reserved attributes & tags search

Your logs inherit tags from [hosts][2] and [integrations][3] that generate them. Some tags may be [Reserved attributes][8], that are reserved for use by Datadog.

They can be used in the search and as facets as well:

* `env:prod` returns all logs holding tag `env` with value `prod`.
* `-source:java` returns all logs holding reserved attribute `source` that is not `java`.

If your tags don't follow [tags best practices][4] and don't use the `key:value` syntax, use this search query:

`tags:<MY_TAG>`

To search on [reserved attributes][8] and tags you don't need to specify the `@`.

### Autocomplete

Use the search bar's autocomplete feature to complete your query using existing facet and tag values:

{{< img src="logs/explorer/search/search_bar_autocomplete.png" alt="search bar autocomplete " responsive="true" style="width:80%;">}}

### Arrays

You can add facets on arrays of strings or numbers. All values included in the array become listed in the facet and can be used to search the logs.

In the below example, clicking on the `Peter` value in the facet returns all the logs that contains a `users.names` attribute, whose value is either `Peter` or an array that contains `Peter`:

{{< img src="logs/explorer/search/array_search.png" alt="Array and Facets" responsive="true" style="width:80%;">}}

### Numerical values

Use `<`,`>`, `<=`, or `>=` to perform a search on numerical facets. For instance, retrieve all logs that have a response time over 100ms with:

`@http.response_time:>100`

You can search for numerical attribute within a specific range. For instance, retrieve all your 4xx errors with:

`@http.status_code:[400 TO 499]`

### Additional examples

| Search query                                                         | Description                                         |
| -----                                                                | -----                                               |
| `@http.url_details.path:"/api/v1/test"` (equal to `@http.url_details.path:\/api\/v1\/test`) | Returns all logs containing `/api/v1/test` in the standard attribute `http.url_details.path`. |
| `service:nginx @http.status_code:[200 TO 299]`                       | Returns all logs with with value `nginx` for reserved attribute `service` and with value between 200 and 299 for standard attribute `http.status_code`. |
| `@controller:ShoppingCartController OR @http.response_time:>1000`    | Returns all logs with value `ShoppingCartController` for custom-defined facet `controller` or with custom-defined facet `http.response_time` greater than 1000. |
| `(team:eng OR team:dev)` (equal to `(team:(eng OR dev))`)                    | Returns all logs containing tags `team:eng` or `team:dev`. |
| `env:prod AND -source:java`                                          | Returns all logs containing tag `env:prod` and that do not contain reserved attribute `source:java` . |

## Log Content search

Although [facet search](#main-benefits-of-facet-search) provides many benefits, there are some cases where the only solution is to perform a Free Text Search on the content of the raw log message.

In addition to the raw log message, Free Text Search is also available on the following JSON attributes:
* `title`
* `error.message`
* `error.stack`

Examples:

| Search target             | Search purpose                          | Search query string         | Alternate query string|
|---------------------------|-----------------------------------------|-----------------------------|-----------------------|
| `user=JaneDoe`            | `user` immediately followed by `JaneDoe`| `"user JaneDoe"` (Quoted)   | `"user\=JaneDoe"`     |
| `user connected: JaneDoe` | Log message contains `user` AND `JaneDoe`| `user JaneDoe` (No quotes)  | `user AND JaneDoe`    |

## Wildcards

To perform a multi-character wildcard search, use the `*` symbol as follows:

**On facets**:

* `service:*web` matches all logs with reserved attribute `service` ending with `web`
* `tags:engineering*` matches all logs with a tag starting with `engineering`
* `@http.url:*\/v1\/*` matches all logs with facet `http.url` containing `/v1/`

**On log content**:

* `web*` matches all logs with a word starting with `web` (i.e. matches `Called webservice ID 123` but not `Called Prodwebservice 123`)
* `*web` matches all logs with a word ending with `web` (i.e. matches `Called Prodweb ID 123` but not `Called Prodwebservice 123`)
* `*web*` matches all logs with a word containing `web` (i.e. matches `Called Prodwebservice ID 123`)

**On both**:

* `*web* OR service:*web*` matches all logs with content or with reserved attribute `service` containing `web`.

## Saved Searches

[Saved Views][5] contain your search query, columns, time horizon, and facet.

**Note**: All of the search parameters are contained within the URL. You can share your view by sharing the URL.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/?tab=facets#setup
[2]: /graphing/infrastructure
[3]: /integrations/#cat-log-collection
[4]: /tagging/#tags-best-practices
[5]: /logs/explorer/saved_views
[6]: /logs/processing/
[7]: /logs/processing/attributes_naming_convention/
[8]: /logs/processing/#reserved-attributes
