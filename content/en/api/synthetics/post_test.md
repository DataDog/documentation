---
title: Create a test
type: apicontent
order: 24.1
external_redirect: /api/#create-tests
---

## Create a test

Create a Synthetics test to initiate and configure the tests you want Datadog to send to your API endpoints or to your browser app. You can configure the endpoints being tested, the number of tests, and where they are coming from.

##### Arguments

*   **`assertions`** - _required_ - The function where you define when you want Datadog to alert you. Assertions are defined by: `operator`, `property`, `type`, and `target`.
*   **`operator`** - _required_ - The action that you want tested. Valid operators depend on the property `type` being tested.

<table>
  <tr>
    <th><code>type</code></th>
    <th>Valid <code>operator</code></th>
    <th>Value type</th>
  </tr>
  <tr>
    <td>Status Code</td>
    <td><code>is</code>, <code>is not</code></td>
    <td>Integer</td>
  </tr>
  <tr>
    <td>Response time</td>
    <td><code>less than</code></td>
    <td>Integer</td>
  </tr>
  <tr>
    <td>Headers</td>
    <td><code>contains</code>, <code>does not contain</code>, <code>is</code>, <code>is not</code>, <code>matches</code>, <code>does not match</code></td>
    <td>for <code>contains</code>/<code>does not contain</code>/<code>is</code>/<code>is not</code>: String for <code>matches</code>/<code>does not match</code>: [RegexStrings][1]</td>
  </tr>
  <tr>
    <td>Body</td>
    <td><code>contains</code>, <code>does not contain</code>, <code>is</code>, <code>is not</code>, <code>matches</code>, <code>does not match</code></td>
    <td>for <code>contains</code>/<code>does not contain/<code>is</code>/<code>is not</code>: String for <code>matches</code>/<code>does not match</code>: [RegexStrings][1]</td>
  </tr>
</table>

*   **`type`** - _required_ - The API parameter that you want to be alerted on. Types of properties are `header`, `body`, `responseTime`, and `statusCode`. When you define a header, you must specify the header parameter key in the `property` parameter, and the header parameter value with the `target` parameter. For all other types, use the `target` to specify the body, the response time, and the error messages. For example, a `"type":"statusCode"` might have a `"target":403`.
*   **`property`** - _optional_ - When you are setting up a `header` `type`, this is required to define the headers parameter key. Valid values are any header keys, like `Content-Type` or `Authorization`.
*   **`target`** - _required_ - The value of the parameter you want to test. For `header`, valid values are any of the valid values for the header key that you define in `property`. For `statusCode`, valid values are valid status codes. For `responseTime`, valid values are response times.
*   **`request`** - _required_ - the array where you define your API that you want Datadog to test. Make sure to include any required authentication information.
*   **`method`** - _required_ - The method of the API to test. Valid values are `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
*   **`url`** - _required_ - The endpoint for the API Datadog is testing.
*   **`timeout`** - _optional_ - When the API request will timeout.
*   **`headers`** - _optional_ - Headers in the API request.
*   **`body`** - _optional_ The JSON body for the API request.
*   **`locations`** - _required_ - A list of the locations that you want the tests to be sent from. At least one value is required, and you can use all locations. For a list of valid locations, use the `GET available locations` method. At least one value is required, and you can use all locations.
*   **`message`** - _required_ - A description of the test.
*   **`name`** - _required_ - A unique name for the test.
*   **`options`** - _required_ - Use advanced options to specify custom request headers, authentication credentials, body content, cookies, or to have the test follow redirects. All optional parameters take their default value if you don't specify a value. Valid values in the request object are:
    *  ** `tick_every`:** - _required_ -  How often the test should run (in seconds - current possible values are 60, 300, 900, 1800, 3600, 21600, 43200, 86400, 604800).
    *  **`min_failure_duration`** - _optional_ - How long the test should be in failure before alerting (integer, number of seconds, max 7200). Default is 0.
    *  **`min_location_failed`** - _optional_ - The minimum number of locations that must have been in failure at the same time during at least one moment in the `min_failure_duration` period (min_location_failed and min_failure_duration are part of the advanced alerting rules  - integer, >= 1. Default is 1.
    *  **`follow_redirects`** - _optional_ - boolean - whether to follow redirects or not (max ten redirects can be followed before triggering a "Too many redirects" error). Valid values are `true` or `false`. Default value is `false`.
*   **`tags`** - _optional_ - Tags you want to use to filter your test when you are viewing it in Datadog. For more info on custom tags, see [Using tags][1].
*   **`type`** - _required_ - The type of test. Valid values are `api` and `browser`.

[1]: /tagging/using_tags
