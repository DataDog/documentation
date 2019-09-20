---
title: Edit a test
type: apicontent
order: 29.3
external_redirect: /api/#edit-tests
---

## Edit a test

Use this method to update an existing Synthetics test. In order to update a test, you have to submit the same payload as creating a test.

The parameters required are different for API and browser tests and they are marked accordingly—if a parameter is marked as _required_, it is required for both types of tests.

A browser test is treated like a GET API test. This method gives you the ability to update the browser test, but you have to use the UI to [record your test][1].

In order to update a request, you have to submit a full object, but only these parameters are editable: `name`, `tags`, `config` (anything defined in the `assertions` and anything defined in the `request`), `message`, `options`, `locations`, and `status`.

### Arguments

The main arguments for your test are:

*   **`locations`** - _required_ - A list of the locations that you want the tests to be sent from. At least one value is required, and you can use all locations. For a list of valid locations, use the `GET available locations` method. At least one value is required, and you can use all locations.
*   **`message`** - _required_ - A description of the test.
*   **`name`** - _required_ - A unique name for the test.
*   **`type`** - _required_ - The type of test. Valid values are `api` and `browser`.
*   **`assertions`** - _required_ - The assertions associated with your test, refer to the assertions section below to learn more.
*   **`request`** - _required API and SSL test_ - The request associated to your API and SSL test, refer to the Request section below to learn more.
*   **`options`** - _required_ - List of options to customise you test, refer to the Options section below to learn more.
*   **`tags`** - _optional_ - Tags you want to use to filter your test when you are viewing it in Datadog. For more info on custom tags, see [Using tags][2].

Find below the available configuration options depending on the test you want to create.

#### Assertions

*  **`assertions`** - _required_ - This is where you are defining exactly what should happen for a test to be considered passed. Each assertion has a: `type`, `operator`, `target`, and possibly a `property`.
    *   **`type`** - _required API test_ - The part of the response that you want to assess. Possible types are `header`, `body`, `responseTime`, and `statusCode`. When you define a header, you must specify the header parameter key in the `property` parameter, and the header parameter value with the `target` parameter. For all other types, use the `target` to specify the body, the response time, and the error messages. For example, a `"type":"statusCode"` might have a `"target":403`.
    *   **`target`** - _required API test_ - The expected value for the assertion. For `header`, valid values are any of the valid values for the header key that you define in `property`. For `statusCode`, valid values are valid status codes. For `responseTime`, valid values are the expected response times.
   *   **`property`** - _optional_ - When you are setting up a `header` `type`, this is required to define the headers parameter key. Valid values are any header keys, like `Content-Type` or `Authorization`.
    *   **`operator`** - _required API test_ - Defines how to compare the target and the actual value from the response. Valid operators depend on the `type` of assertions. This is the list of valid operators per type:

| `type`        | Valid `operator`                                                            | Value type                                                                                                                                           |
| ---           | ---                                                                         | ---                                                                                                                                                  |
| Status Code   | `is`, `is not`                                                              | Integer                                                                                                                                              |
| Response time | `lessThan`                                                                  | Integer                                                                                                                                              |
| Headers       | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | For `contains`/`does not contain`/`is`/`is not`: String for `matches`/`does not match`: [RegexString][3] |
| Body          | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | For `contains`/`does not contain`/`is`/`is not`: String for `matches`/`does not match`: [RegexString][3] |

#### Request

*   **`request`** - _required API test_ - An object containing all the necessary information to perform the request to your endpoint.
   *   **`method`** - required API test - The method of the API to test. Valid values are `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`. Use `GET` for a browser test.
   *   **`url`** - _required API test_ - The endpoint for the API Datadog is testing. For a browser test, the URL for the website Datadog is testing.
   *   **`basicAuth`** - _optional_ - If your endpoint is behind basic Auth, use this parameter to define your username and password with the following value: `{"username": "<USERNAME>", "password": "<PASSWORD>"}`.
   *   **`timeout`** - _optional_ - When the API request should timeout.
   *   **`headers`** - _optional_ - Headers in the API request.
   *   **`body`** - _optional_ The body for the API request. Accepts text strings (including a JSON as a text string). Specify the type using `Content-Type` `property` parameter and the type (like `application/json` or `text/plain` in the `headers` paramater.

#### Options

*   **`options`** - _required_ - Use advanced options to specify custom request headers, authentication credentials, body content, cookies, or to have the test follow redirects. All optional parameters take their default value if you don't specify a value. Valid values in the request object are:
    *  **`tick_every`:** - _required_ -  How often the test should run (in seconds - current possible values are 60, 300, 900, 1800, 3600, 21600, 43200, 86400, 604800).
    *  **`min_failure_duration`** - _optional_ - How long the test should be in failure before alerting (integer, number of seconds, max 7200). Default is 0.
    *  **`min_location_failed`** - _optional_ - The minimum number of locations that must have been in failure at the same time during at least one moment in the `min_failure_duration` period (min_location_failed and min_failure_duration are part of the advanced alerting rules  - integer, >= 1. Default is 1.
    *  **`follow_redirects`** - _optional_ - boolean - whether to follow redirects or not (max ten redirects can be followed before triggering a "Too many redirects" error). Valid values are `true` or `false`. Default value is `false`.
    *  **`device_ids`** - _required browser test_ - The type of device you want to use to test. To get a list of available devices, use the `GET devices for browser checkes` method and use the `id` from the response. At least one device is required.

[1]: /synthetics/browser_tests/#record-test
[2]: /tagging/using_tags
[3]: https://docs.datadoghq.com/tagging/using_tags
