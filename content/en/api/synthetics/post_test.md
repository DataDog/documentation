---
title: Create a test
type: apicontent
order: 29.1
external_redirect: /api/#create-tests
---

## Create a test

Create a Synthetics test to initiate and configure the tests you want Datadog to send to your API endpoints or to your browser app. You can configure the endpoints being tested, the number of tests, and where they are coming from. The parameters required are different for API and browser tests and they are marked accordingly—if a parameter is marked as _required_, it is required for both types of tests. Once you create a test, it shows up in the UI in your [Synthetics list][1]

A browser test is treated like a GET API test. This method gives you the ability to create the browser test, but you have to use the UI to [record your test][2].

### Arguments

The main arguments for your test are:

*   **`name`** - _required_ - A unique name for the test.
*   **`type`** - _required_ - The type of test. Valid values are `api` and `browser`.
*   **`subtype`** - _required for SSL test_ - If you are editing a SSL API test, you need to specify by passing `ssl` as value. Otherwise you should omit this argument.
*   **`request`** - _required_ - The request associated to your API and SSL test, refer to the Request section below to learn more.
*   **`options`** - _required_ - List of options to customise you test, refer to the Options section below to learn more.
*   **`message`** - _required_ - A description of the test.
*   **`assertions`** - _required for API and SSL test_ - The assertions associated with your test, refer to the assertions section below to learn more.
*   **`locations`** - _required_ - A list of the locations that you want the tests to be sent from. At least one value is required, and you can use all locations. For a list of valid locations, use the `GET available locations` method. At least one value is required, and you can use all locations.
*   **`tags`** - _optional_ - Tags you want to use to filter your test when you are viewing it in Datadog. For more info on custom tags, see [Using tags][3].

Find below the available configuration options depending on the test you want to create.

#### Request

The **`request`**  object argument is required for the browser, API, and SSL tests. It's an object containing all the necessary information to perform the request to your endpoint. Its arguments are:

*   **`method`** - required API and browser test_ - The method of the API to test. Valid values are `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`. Use `GET` for a browser test.
*   **`url`** - _required API and browser test_ - The endpoint for the API Datadog is testing. For a browser test, the URL for the website Datadog is testing.
*   **`host`** - _required SSL test_ - If creating a SSL test, specify the host to connect to.
*   **`port`** - _required SSL test_ - If creating a SSL test, specify the port to connect to.
*   **`basicAuth`** - _optional_ - If your endpoint is behind basic Auth, use this parameter to define your username and password with the following value: `{"username": "<USERNAME>", "password": "<PASSWORD>"}`.
*   **`timeout`** - _optional_ - When the request should timeout.
*   **`headers`** - _optional API test_ - Headers in the API request.
*   **`body`** - _optional API test_ - The body for the API request. Accepts text strings (including a JSON as a text string). Specify the type using `Content-Type` `property` parameter andthe type (like `application/json` or `text/plain` in the `headers` paramater.
*   **`cookies`** - _optional API test_ - Cookies to send along with your API test request.

#### Options

The **`options`** object argument is required for the browser, API and SSL tests. Use it to  specify custom request headers, authentication credentials, body content, cookies, or to have the test follow redirects. All optional parameters take their default value if you don't specify a value. Its arguments are:

*  **`tick_every`:** - _required_ -  How often the test should run (in seconds - current possible values are 60, 300, 900, 1800, 3600, 21600, 43200, 86400, 604800).
*  **`min_failure_duration`** - _optional_ - How long the test should be in failure before alerting (integer, number of seconds, max 7200). Default is 0.
*  **`min_location_failed`** - _optional_ - The minimum number of locations that must have been in failure at the same time during at least one moment in the `min_failure_duration` period (min_location_failed and min_failure_duration are part of the advanced alerting rules  - integer, >= 1. Default is 1.
*  **`follow_redirects`** - _optional_ - boolean - whether to follow redirects or not (max ten redirects can be followed before triggering a "Too many redirects" error). Valid values are `true` or `false`. Default value is `false`.
*  **`device_ids`** - _required browser test_ - The type of device you want to use to test. To get a list of available devices, use the `GET devices for browser checkes` method and use the `id` from the response. At least one device is required.

#### Assertions

The **`assertions`**  argument is required for the API and SSL tests. It allows you to define exactly what should happen for a test to be considered passed. **It's an array of JSON objects** which arguments are:

*   **`type`** - _required_ - The part of the response that you want to assess. Possible types are:

  * `header`: When you define a header, you must specify the header parameter key in the `property` parameter, and the header parameter value with the `target` parameter.
  * `body`: Use the `target` attribute to specify the expected value for `body`.
  * `responseTime`: Use the `target` attribute to specify the expected value for `responseTime`. For example: `"target":180000`.
  * `statusCode`: Use the `target` attribute to specify the expected value for `statusCode`. For example: `"target":403`.
  * `certificate`:  For SSL test only, use the `target` attribute to specify the expected value for `certificate`. `"target":1` is a valid certificate, `"target":0` is a non-valid certificate.
  * `property`: For SSL test only, when you define a certificate `property`, you must specify the certificate property key in the `property` parameter, and the certificate property value with the `target`parameter.

*   **`target`** - _required_ - The expected value for the assertion.
*   **`operator`** - _required_ - Defines how to compare the target and the actual value from the response. Valid operators depend on the `type` of assertions. This is the list of valid operators per type:
*   **`property`** - _optional_ - When you are setting up a `header` for the `type` parameter, this is required to define the headers parameter key. Valid values are any header keys, like `Content-Type` or `Authorization`.

| `type`        | Valid `operator`                                                            | Value type                                                                                                                                           |
| ---           | ---                                                                         | ---                                                                                                                                                  |
| `header`       | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | For `contains`/`does not contain`/`is`/`is not`: String for `matches`/`does not match`: [RegexString][4] |
| `body`          | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | For `contains`/`does not contain`/`is`/`is not`: String for `matches`/`does not match`: [RegexString][4] |
| `responseTime` | `lessThan`                                                                  | Integer                                                                                                                                              |
| `statusCode`   | `is`, `is not`                                                              | Integer                                                                                                                                              |
| `certificate` | `isInMoreThan` | Integer |
| `property` | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | For `contains`/`does not contain`/`is`/`is not`: String for `matches`/`does not match`: [RegexString][4] |


[1]: https://app.datadoghq.com/synthetics/list
[2]: /synthetics/browser_tests/#record-test
[3]: /tagging/using_tags
[4]: https://en.wikipedia.org/wiki/Regular_expression
