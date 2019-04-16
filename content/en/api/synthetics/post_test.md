---
title: Create a test
type: apicontent
order: 24.1
external_redirect: /api/#create-tests
---

## Create a test

Create a Synthetics test to initiate and configure the tests you want Datadog to send to your API endpoints or to your browser app. You can configure the endpoints being tested, the number of tests, and where they are coming from.

##### Arguments

*   **`assertions`** - _required_ - The function where you define when you want Datadog to alert you. Assertions are defined by: `operator`, `property`, `type` and `target`.
*   **`operator`** - _required_ - The action that you want tested. Valid operators depend on the property `type` being tested.
<table>
  <tr>
    <th>`type`</th>
    <th>Valid `operator`</th>
    <th>Value type</th>
  </tr>
  <tr>
    <td>Status Code</td>
    <td>`is`, `is not`</td>
    <td>Integer</td>
  </tr>
  <tr>
    <td>Response time</td>
    <td>`less than`</td>
    <td>Integer</td>
  </tr>
  <tr>
    <td>Headers</td>
    <td>`contains`, `does not contain`, `is`, `is not`, `matches`, `does not match`</td>
    <td>for `contains`/`does not contain`/`is`/`is not`: String &lt;br&gt; for `matches`/`does not match`: [RegexStrings][1]</td>
  </tr>
  <tr>
    <td>Body</td>
    <td>`contains`, `does not contain`, `is`, `is not`, `matches`, `does not match`</td>
    <td>for `contains`/`does not contain`/`is`/`is not`: String &lt;br&gt; for `matches`/`does not match`: [RegexStrings][1]</td>
  </tr>
</table>
*   **`type`** - _required_ - The API parameter that you want to be alerted on. Types of properties are `header`, `body`, `responseTime`, and `statusCode`. When you define a header, you must specify the header parameter key in the `property` parameter, and the header parameter value with the `target` parameter. For all other types, use the `target` to specify the body, the response time, and the error messages, for example, a `"type":"statusCode"` might have a `"target":403`.
*   **`property`** - _optional_ - When you are setting up a `header` `type`, this is required to define the headers parameter key. Valid values are any header keys, like `Content-Type`, or `Authorization`.
*   **`target`** - _required_ - The value of the parameter you want to test. For `header`, valid values are any of the valid values for the header key that you define in `property`. For `statusCode`, valid values are valid status codes. For `responseTime`, valid values are response times.
*   **`request`** - _required_ - the array where you define your API that you want Datadog to test. Make sure to include any required authentication information.
*   **`method`** - _required_ - The method of the API to test. Valid values are `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
*   **`url`** - _required_ - The endpoint for the API Datadog is testing
*   **`timeout`** - _optional_ - When the API request will timeout.
*   **`headers`** - _optional_ - Headers in the API request. [Is there a max nuber of headers?]
*   **`body`** - _optional_ The JSON body for the API request. [do we just support JSON, or do we support things like multipart/form data?]
*   **`locations`** - _optional_ - A list of the locations that you want the tests to be sent from. Valid values are `aws:` followed by any valid AWS region, for example, `aws:ap-south-1`. For a full list of valid AWS regions, see [the AWS documentation][2]. [do we really support all of them?]
*   **`message`** - _required_ - A description of the test.
*   **`name`** - _required_ - A unique name for the test.
*   **`options`** - _optional_ - Use advanced options to specify custom request headers, authentication credentials, body content, cookies, or to have the test follow redirects. Valid objects are ``, ``,  
*   **`tags`** - _optional_ - Tags you want to use to filter your test when you are viewing it in Datadog. For more info on custom tags, see [Using tags][1].
*   **`type`** - _required_ - the type of test. Valid values are `api` and `browser`.

[1]: /tagging/using_tags
[2]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html
