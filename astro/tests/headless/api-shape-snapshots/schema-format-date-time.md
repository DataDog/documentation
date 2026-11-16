<!-- schema-format-date-time: /api/latest/dashboards/get-all-dashboards/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
Dashboard summary response.

| Parent field | Field         | Type      | Description                                                                                                                                                                                                                                                                                                             |
| ------------ | ------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|              | dashboards    | [object]  | List of dashboard definitions.                                                                                                                                                                                                                                                                                          |
| dashboards   | author_handle | string    | Identifier of the dashboard author.                                                                                                                                                                                                                                                                                     |
| dashboards   | created_at    | date-time | Creation date of the dashboard.                                                                                                                                                                                                                                                                                         |
| dashboards   | description   | string    | Description of the dashboard.                                                                                                                                                                                                                                                                                           |
| dashboards   | id            | string    | Dashboard identifier.                                                                                                                                                                                                                                                                                                   |
| dashboards   | is_read_only  | boolean   | **DEPRECATED**: Whether this dashboard is read-only. If True, only the author and admins can make changes to it. This property is deprecated; please use the [Restriction Policies API](https://docs.datadoghq.com/api/latest/restriction-policies.md) instead to manage write authorization for individual dashboards. |
| dashboards   | layout_type   | enum      | Layout type of the dashboard. Allowed enum values: `ordered`, `free`.                                                                                                                                                                                                                                                   |
| dashboards   | modified_at   | date-time | Modification date of the dashboard.                                                                                                                                                                                                                                                                                     |
| dashboards   | title         | string    | Title of the dashboard.                                                                                                                                                                                                                                                                                                 |
| dashboards   | url           | string    | URL of the dashboard.                                                                                                                                                                                                                                                                                                   |
{% /tab %}

{% tab label="Example" %}
```json
{
  "dashboards": [
    {
      "author_handle": "string",
      "created_at": "2019-09-19T10:00:00.000Z",
      "description": "string",
      "id": "string",
      "is_read_only": false,
      "layout_type": "ordered",
      "modified_at": "2019-09-19T10:00:00.000Z",
      "title": "string",
      "url": "string"
    }
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="403" %}
Authentication Error

{% tabs %}
{% tab label="Model" %}
Error response object.

| Field               | Type     | Description                          |
| ------------------- | -------- | ------------------------------------ |
| errors [*required*] | [string] | Array of errors returned by the API. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="429" %}
Too many requests

{% tabs %}
{% tab label="Model" %}
Error response object.

| Field               | Type     | Description                          |
| ------------------- | -------- | ------------------------------------ |
| errors [*required*] | [string] | Array of errors returned by the API. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
