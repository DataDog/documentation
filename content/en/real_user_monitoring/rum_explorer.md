---
title: RUM Explorer
kind: documentation
description: ""
further_reading:
- link: "/real_user_monitoring/rum_analytics"
  tag: "Documentation"
  text: "Build analytics upon your events."
---

The RUM Explorer allow you to explore all your events collected from your different applications.

## Context

Build up a context to explore your events in your RUM explorer page first by selecting the proper [time range](#time-range) then by using the [search bar](#search-syntax) to filter your events and Analytics.

### Time Range

The time range feature allows you to display view in the view steam or Analytics within a given time period.

Quickly change the time range by selecting a preset range from the dropdown:

{{< img src="real_user_monitoring/rum_explorer/rum_time_selector.png" alt="Rum time selector" responsive="true" style="width:40%;">}}

All of the search parameters are contained within the URL. You can share your view by sharing the URL.

### Search
#### Search syntax

A query is composed of terms and operators.

There are two types of terms:

* A **single term** is a single word such as `test` or `hello`.

* A **sequence** is a group of words surrounded by double quotes, such as `"hello dolly"`.

To combine multiple terms into a complex query, you can use any of the following Boolean operators:

| **Operator** | **Description**                                                                                        |
|--------------|--------------------------------------------------------------------------------------------------------|
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) |
| `OR`         | **Union**: either term is contained in the selected events                                             |
| `-`          | **Exclusion**: the following term is NOT in the view                                                   |

#### Facets search

To search on a specific attribute, first [add it as a facet](#facets--measures) and then add `@` to specify you are searching on a facet.

For instance, if your facet name is **url** and you want to filter on the **url** value *www.datadoghq.com*, enter:

`@url:www.datadoghq.com`

##### Escaping of special characters

Searching on a facet value that contains special characters requires escaping or double quotes. The following characters are considered special: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, and `\` require escaping with the `\` character.

The same logic is applied to spaces within events facet names. Events facets should not contain spaces, but if they do, spaces must be escaped. If a facet is named `user.first name`, perform a facet search by escaping the space: `@user.first\ name:myvalue`.

##### Wildcards

To perform a multi-character wildcard search, use the `*` symbol. For instance, `@http.url:https:\/\/*` matches every events that has an url starting with `https://`.

##### Numerical values

Use `<`,`>`, `<=`, or `>=` to perform a search on numerical attributes. For instance, retrieve all events that have a duration over 100ms with:

`@duration:>100`

You can search for numerical attribute within a specific range. For instance, retrieve all your events with a duration between 100ms and 300ms:

`@duration:[100 TO 300]`

##### Autocomplete

Use the search bar's autocomplete feature to complete your query using existing values:

{{< img src="real_user_monitoring/rum_explorer/search_bar_autocomplete.png" alt="search bar autocomplete " responsive="true" style="width:60%;">}}

#### Examples

| Search query                                                 | Description                                                                                                                                          |
|--------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                      | Searches all events containing `/api/v1/test` in the attribute `http.url_details.path`.                                                              |
| `@http.url:\/api\/v1\/*`                                     | Searches all events containing a value in `http.url` attribute that start with `/api/v1/`                                                            |
| `@duration:[100 TO 300] @http.url_details.path:\/api\/v1\/*` | Searches all events with a `duration` between 100 and 300 ms, and containing a value in `http.url_details.path` attribute that start with `/api/v1/` |

## Vizualisation

Click on any event to open the event panel and see more details about it: Resources, Traces, Errors, User Action, Long task, Logs, and Attributes:

{{< img src="real_user_monitoring/rum_explorer/rum_views.png" alt="Rum View" responsive="true" style="width:80%;">}}

## Facets & Measures

After [being collected][1], your events attributes can be indexed as facets or measures in order to be accessible for your [context](#context) creation and [Analytics][2].

Note: To leverage the most out of your RUM explorer page, make sure your events attributes follow [Datadog attribute naming convention][3].

{{< tabs >}}
{{% tab "Facets" %}}

A facet displays all the distinct members of an attribute or a tag and provides some basic analytics, such as the number of events represented. Facets allow you to pivot or filter your datasets based on a given attribute. To filter, select the values that you want to see.

{{< img src="real_user_monitoring/rum_explorer/rum_facet.png" alt="Facets demo" responsive="true" style="width:80%;">}}

**Create a Facet**:

To start using an attribute as a facet or in the search, click on it and add it as a facet in the:

{{< img src="real_user_monitoring/rum_explorer/create_facet.png" style="width:50%;" alt="Create Facet" responsive="true" style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new events** and can be used in [the search bar](#search), the Facet Panel, and in the [RUM Analytics query][1].

[1]: /real_user_monitoring/rum_analyics
{{% /tab %}}
{{% tab "Measures" %}}

A measure is a attribute with a numerical value contained in your events.

**Create a Measure**:

To start using an attribute as a measure, click on a numerical attribute of your events:

{{< img src="real_user_monitoring/rum_explorer/create_measure.png" alt="Create a measure" responsive="true" style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new events** and can be used in [the search bar](#search), the Facet Panel, and in the [RUM Analytics query][1].

**Select the Measure Unit**:

Each measure has its own unit that is then used for display in the RUM explorer columns and RUM Analytics.

{{< img src="real_user_monitoring/rum_explorer/edit_measure.png" alt="Edit a measure" responsive="true" style="width:50%;">}}

[1]: /real_user_monitoring/rum_analyics
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/setup
[2]: /real_user_monitoring/rum_analytics
[3]: /logs/processing/attributes_naming_convention
