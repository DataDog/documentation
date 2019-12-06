---
title: RUM Explorer
kind: documentation
description: ""
further_reading:
- link: "/real_user_monitoring/rum_analytics"
  tag: "Documentation"
  text: "Build analytics upon your events."
---

The Real User Monitoring (RUM) Explorer allow you to explore all your views collected from your different applications.

## Context

Build up a context to explore your views in your RUM Explorer page first by selecting the proper [time range](#time-range) then by using the [search bar](#search-syntax) to filter your views and analytics.

### Time Range

It appears directly under the search bar as a timeline. The time range feature allows you to display view in the view steam or analytics within a given time period.

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

| **Operator** | **Description**                                                                                       |
|--------------|-------------------------------------------------------------------------------------------------------|
| `AND`        | **Intersection**: both terms are in the selected views (if nothing is added, AND is taken by default) |
| `OR`         | **Union**: either term is contained in the selected views                                             |
| `-`          | **Exclusion**: the following term is NOT in the view                                                  |

#### Facets search

To search on a specific attribute, first [add it as a facet](#facets-measures) and then add `@` to specify you are searching on a facet.

For instance, if your facet name is **url** and you want to filter on the **url** value *www.datadoghq.com*, enter:

`@url:www.datadoghq.com`

##### Escaping of special characters

Searching on a facet value that contains special characters requires escaping or double quotes. The following characters are considered special: `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, and `\` require escaping with the `\` character.

The same logic is applied to spaces within views facet names. Views facets should not contain spaces, but if they do, spaces must be escaped. If a facet is named `user.first name`, perform a facet search by escaping the space: `@user.first\ name:myvalue`.

##### Wildcards

To perform a multi-character wildcard search, use the `*` symbol. For instance, `@http.url:https:\/\/*` matches every views that has an url starting with `https://`.

##### Numerical values

Use `<`,`>`, `<=`, or `>=` to perform a search on numerical attributes. For instance, retrieve all views that have a duration over 100ns with:

`@duration:>100`

You can search for numerical attribute within a specific range. For instance, retrieve all your views with a duration between 100ns and 300ns:

`@duration:[100 TO 300]`

##### Autocomplete

Use the search bar's autocomplete feature to complete your query using existing values:

{{< img src="real_user_monitoring/rum_explorer/search_bar_autocomplete.png" alt="search bar autocomplete " responsive="true" style="width:60%;">}}

#### Examples

| Search query                                                 | Description                                                                                                                                         |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                      | Searches all views containing `/api/v1/test` in the attribute `http.url_details.path`.                                                              |
| `@http.url:\/api\/v1\/*`                                     | Searches all views containing a value in `http.url` attribute that start with `/api/v1/`                                                            |
| `@duration:[100 TO 300] @http.url_details.path:\/api\/v1\/*` | Searches all views with a `duration` between 100 and 300 ns, and containing a value in `http.url_details.path` attribute that start with `/api/v1/` |

## Vizualisation

Click on any view to open the views panel and see more details (Resources, Traces, Errors, User Action, Long task, Logs, or Attributes) about it:

{{< img src="real_user_monitoring/rum_explorer/rum_views.png" alt="Rum View" responsive="true" style="width:80%;">}}

## Facets & Measures

After [being collected][1], your views attributes can be indexed as facets or measures in order to be accessible for your [context](#context) creation and [analytics][2].

Note: To leverage the most out of your RUM Explorer page, make sure your views attributes follow [Datadog attribute naming convention][3].

{{< tabs >}}
{{% tab "Facets" %}}

A facet displays all the distinct members of an attribute or a tag and provides some basic analytics, such as the number of views represented. Facets allow you to pivot or filter your datasets based on a given attribute. To filter, select the values that you want to see.

{{< img src="real_user_monitoring/rum_explorer/rum_facet.png" alt="Facets demo" responsive="true" style="width:80%;">}}

**Create a Facet**:

To start using an attribute as a facet or in the search, click on it and add it as a facet in the:

{{< img src="real_user_monitoring/rum_explorer/create_facet.png" style="width:50%;" alt="Create Facet" responsive="true" style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new views** and can be used in [the search bar](#search), the facets panel, and in the [RUM Analytics query][1].

[1]: /real_user_monitoring/rum_analytics
{{% /tab %}}
{{% tab "Measures" %}}

A measure is an attribute with a numerical value contained in your views.

**Create a Measure**:

To start using an attribute as a measure, click on a numerical attribute of your views:

{{< img src="real_user_monitoring/rum_explorer/create_measure.png" alt="Create a measure" responsive="true" style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new views** and can be used in [the search bar](#search), the facets panel, and in the [RUM Analytics query][1].

**Select the Measure Unit**:

Each measure has its own unit that is then used for display in the RUM Explorer columns and RUM Analytics.

{{< img src="real_user_monitoring/rum_explorer/edit_measure.png" alt="Edit a measure" responsive="true" style="width:50%;">}}

[1]: /real_user_monitoring/rum_analytics
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/setup
[2]: /real_user_monitoring/rum_analytics
[3]: /logs/processing/attributes_naming_convention
