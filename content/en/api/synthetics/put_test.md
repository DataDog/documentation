---
title: Edit a test
type: apicontent
order: 31.3
external_redirect: /api/#edit-a-test
---

## Edit a test

Use this method to update an existing Synthetics test. In order to update a test, you have to submit the same payload as creating a test.

The parameters required are different for API and browser tests and they are marked accordingly—if a parameter is marked as _required_, it is required for both types of tests.

A browser test is treated like a GET API test. This method gives you the ability to update the browser test, but you have to use the UI to [record your test][1].

In order to update a request, you have to submit a full object, but only these parameters are editable: `name`, `tags`, `config` (anything defined in the `assertions` and anything defined in the `request`), `message`, `options`, `locations`, and `status`.

**ARGUMENTS**:

The main arguments for your test are:

* **`name`** - _required_ - A unique name for the test.
* **`type`** - _required_ - The type of test. Valid values are `api` and `browser`.
* **`subtype`** - _required for SSL test_ - For a SSL API test, specify `ssl` as the value. Otherwise, you should omit this argument.
* **`request`** - _required_ - The request associated to your API and SSL test, refer to the Request section below to learn more.
* **`options`** - _required_ - List of options to customize your test, refer to the Options section below to learn more.
* **`message`** - _required_ - A description of the test.
* **`assertions`** - _required for API and SSL test_ - The assertions associated with your test, refer to the Assertions section below to learn more.
* **`locations`** - _required_ - A list of the locations to send the tests from. At least one value is required, and you can use all locations. For a list of valid locations, use the `GET available locations` method.
* **`tags`** - _optional_ - A list of tags used to filter your test when you are viewing it in Datadog. For more info on custom tags, see [Using tags][2].

Find below the available configuration options depending on the test you want to create.

**REQUEST**:

The **`request`**  argument is required for the browser, API, and SSL tests. It's an object containing all necessary information to perform the request to your endpoint. It's a JSON object with the following attributes:

* **`method`** - _required API and browser test_ - The method of the API to test. Valid values are `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`. Use `GET` for a browser test.
* **`url`** - _required API and browser test_ - The endpoint for the API Datadog is testing. For a browser test, the URL for the website Datadog is testing.
* **`host`** - _required SSL test_ - If creating a SSL test, specify the host to connect to.
* **`port`** - _required SSL test_ - If creating a SSL test, specify the port to connect to.
* **`basicAuth`** - _optional_ - If your endpoint is behind basic Auth, use this parameter to define your username and password with the following value: `{"username": "<USERNAME>", "password": "<PASSWORD>"}`.
* **`timeout`** - _optional_ - When the request should timeout.
* **`headers`** - _optional API test_ - Headers in the API request.
* **`body`** - _optional API test_ - The body for the API request. Accepts text strings (including JSON as a text string). Specify the type using the `Content-Type` `property` parameter and type, for example `application/json` or `text/plain` in the `headers` parameter.
* **`cookies`** - _optional API test_ - Cookies to send along with your API test request.

**OPTIONS**:

The **`options`** argument is required for the browser, API, and SSL tests. Use it to specify custom request headers, authentication credentials, body content, cookies, or have the test follow redirects. All optional parameters take their default value if you don't specify a value. It's a JSON object with the following attributes available:

* **`tick_every`:** - _required_ -  How often the test should run (in seconds - current possible values are 60, 300, 900, 1800, 3600, 21600, 43200, 86400, and 604800).
* **`min_failure_duration`** - _optional_ - How long the test should be in failure before alerting (integer, number of seconds, max 7200). Default is 0.
* **`min_location_failed`** - _optional_ - The minimum number of locations in failure at the same time during at least one moment in the `min_failure_duration` period (min_location_failed and min_failure_duration are part of the advanced alerting rules  - integer, >= 1). Default is 1.
* **`follow_redirects`** - _optional_ - boolean - whether to follow redirects (a max of ten redirects can be followed before triggering a "Too many redirects" error). Valid values are `true` or `false`. Default value is `false`.
* **`device_ids`** - _required browser test_ - The type of device used to test. To get a list of available devices, use the `id` from the response of the `GET devices for browser checks` method. At least one device is required.

**ASSERTIONS**:

The **`assertions`**  argument is required for the API and SSL tests. It allows you to define exactly what should happen for a test to be considered passed. **It's an array of JSON objects** with the following attributes available:

* **`type`** - _required_ - The part of the response that you want to assess. Possible types are:

  * `header`: When you define a header, you must specify the header parameter key in the `property` parameter, and the header parameter value with the `target` parameter.
  * `body`: Use the `target` attribute to specify the expected value for the `body`.
  * `responseTime`: Use the `target` attribute to specify the expected value for `responseTime`. For example: `"target":180000`.
  * `statusCode`: Use the `target` attribute to specify the expected value for `statusCode`. For example: `"target":403`.
  * `certificate`:  For SSL tests only, use the `target` attribute to specify the expected value for `certificate`. `"target":1` is a valid certificate, `"target":0` is a non-valid certificate.
  * `property`: For SSL tests only, when you define a certificate `property`, you must specify the certificate property key in the `property` parameter, and the certificate property value with the `target`parameter.

* **`target`** - _required_ - The expected value for the assertion.
* **`property`** - _optional_ - When you are setting up a `header` for the `type` parameter, this is required to define the headers parameter key. Valid values are any header keys, like `Content-Type` or `Authorization`.
* **`operator`** - _required_ - Defines how to compare the target and the actual value from the response. Valid operators depend on the `type` of assertions. This is the list of valid operators per type:

| type           | Valid operator                                                              | Value type                                                                                                 |
|----------------|-----------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| `header`       | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | String for `contains`/`does not contain`/`is`/`is not`.  [RegexString][3] for: `matches`/`does not match`. |
| `body`         | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | String for: `contains`/`does not contain`/`is`/`is not`. [RegexString][3] for: `matches`/`does not match`. |
| `responseTime` | `lessThan`                                                                  | Integer                                                                                                    |
| `statusCode`   | `is`, `is not`                                                              | Integer                                                                                                    |
| `certificate`  | `isInMoreThan`                                                              | Integer                                                                                                    |
| `property`     | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | String for: `contains`/`does not contain`/`is`/`is not`. [RegexString][3] for: `matches`/`does not match`. |

[1]: /synthetics/browser_tests/#record-test
[2]: /tagging/using_tags
[3]: https://en.wikipedia.org/wiki/Regular_expression
