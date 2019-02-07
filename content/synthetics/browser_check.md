---
title: Browser Check
kind: documentation
beta: true
description: Simulate and monitor user journeys from specific locations.
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/uptime_check"
  tag: "Documentation"
  text: "Configure an Uptime Check"
---

<div class="alert alert-warning">Synthetics is in beta for the Datadog US Site. Request access via the <a href="https://app.datadoghq.com/synthetics/beta">Datadog Synthetics request form</a>.</div>

## Overview

Browser Checks are scenarios executed by Datadog on your web applications. They run at configurable periodic intervals from multiple locations around the world, and from multiple devices. These checks verify both that your applications are up and responding to requests, and that any conditions defined in your scenarios are met.

## Configuration

### Test details

Define the configuration of your Browser Check.

{{< img src="synthetics/browser_check/browser_check_configuration.png" alt="Browser Check make request" responsive="true" style="width:80%;">}}

1. Give your Browser Check a name. 
2. Enter the Start URL. This is the URL from which your Browser Check starts the scenario.
3. Define Tags with the `<KEY>:<VALUE>` format to filter on a `<VALUE>` for a given `<KEY>` in the Synthetics page.
4. Define on which device to run your check. Available devices are: `Laptop Large`, `Tablet`, and `Mobile Small`.
5. Pick-up locations to run the test from. Available locations are:
    * Frankfurt (Request made from an AWS Datacenter)
    * Tokyo (Request made from an AWS Datacenter)
6. Choose a Check frequency between "1 run per 5 minute interval" to "1 run per week":

    {{< img src="synthetics/browser_check/check_frequency.png" alt="Check frequency" responsive="true" style="width:80%;">}}

### Notifications

A notification is sent if at least one step of the Browser Check scenario fails. To configure your notifications:

{{< img src="synthetics/browser_check/browser_check_notification.png" alt="Browser check notification" responsive="true" style="width:80%;">}}

1. Select users and/or [services][1] to send the notifications to.
2. Enter a **message** for the Browser Check. This field allows standard [Markdown formatting][2]. Notification messages include the **message** defined in this section and information about which assertion failed and why.
3. Click **Save Details and Record Test** to save your Browser Check.
4. Start to record your test.

## Record test

**Tests can be only recorded from [Google Chrome][3]. To record your test, download the [Datadog Record Test extension for Google Chrome][4].**

{{< img src="synthetics/browser_check/browser_check_record_test.png" alt="Browser check record test" responsive="true" >}}

1. Optionally, select **Open in a pop-up** at the upper right of the page to open your test recording in a separate pop-up window in order to avoid sizing issues in the displayed window within Datadog's interface.
2. Click on **Start recording** to begin recording your Browser Check.
3. Your actions are recorded and used to create steps within your Browser Check Scenario.
4. Use the actions available in the upper left corner to enrich your scenario:
    {{< img src="synthetics/browser_check/browser_check_assertions.png" alt="Browser Check assertions" responsive="true" style="width:80%;">}}

    **Note**: **Your last browser check step must be an Assertion**, otherwise there is nothing to check.
5. Once you have finished your Scenario, click on **Save and Launch Test**.

### Actions
#### Assertion

{{< img src="synthetics/browser_check/assertions_browser_check.png" alt="Assertion browser check" responsive="true" style="width:40%;">}}

Assertions allow you to check if an element, a content, or some text is available in the current page:

| Assertion                                               | Description                                                                                                                      |
| ----                                                    | ----                                                                                                                             |
| `Assert that an element is present on the page`         | Asserts that an element (such as a specific `span`, `div`, `h`, `a`, etc.) is present on the current page.                       |
| `Check an element's content`                            | Makes sure that a specific element is located or not on the current page.                                                        |
| `Assert that some text is present anywhere on the page` | Asserts that some specific text is present on the current page.                                                                  |
| `Assert that some text is nowhere on the page`          | Asserts that some specific text is **NOT** present on the current page.                                                          |
| `Check main page URL's content`                         | This takes the URL of the current page, and asserts whether a specific value (`string`, `number`, `regex`) is present within it. |

#### Navigation

The navigation action allow you to: 

* Refresh the current page of the scenario.
* Follow a specific link.

#### Hover

This browser check step isn’t added through an actual hovering mechanism (otherwise each element you are hovering would be added as a step) but using a dedicated action with a click.

After selecting the Hover action, the hovering is blocked, and the step can be added by clicking on the element that you want to choose. 

#### Variable

##### Define a variable

{{< img src="synthetics/browser_check/setup_variable.png" alt="Setup Variable" responsive="true" style="width:40%;">}}

To define a variable, enter a capitalized name then choose its type between:

* `Select an element content`: this type allows you to create a variable out of a `span`, `div`, etc. content by extracting the text of this element.
* `From pattern`:

| Pattern                 | Description                                         |
| ----                    | ---                                                 |
| `{{ numeric(n) }}`      | Generates a numeric string with n digits.           |
| `{{ alphabetic(n) }}`   | Generates an alphabetic string with n letters.      |
| `{{ alphanumeric(n) }}` | Generates an alphanumeric string with n characters. |

##### Use the variable

Once created, use your variable to set an input text on a form or search bar. Use the little hand on your variable box to create an input step: 

{{< img src="synthetics/browser_check/variable_input.gif" alt="Variable Input" responsive="true" style="width:80%;">}}

You can also use your variables in some assertions, including:

* Check an element’s content
* Assert text is present on the page
* Assert the page does not contain text
* Check main page URL's content

To use your variables in one of your assertions, hit *Use Variable* and select the variable you want to use:

{{< img src="synthetics/browser_check/use_variable_in_assertion.png" alt="Use variable in assertion" responsive="true" style="width:40%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/#cat-notification
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: https://www.google.com/chrome
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder-sta/bfgpghinhlklmedgkkpnhphfgdliceel
