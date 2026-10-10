---
title: Use Persistent Email Addresses in Browser Tests
description: Create a test account once and reuse a Datadog-managed email address to test email workflows, such as OTP login, in browser tests.
further_reading:
- link: "/synthetics/platform/settings/#global-variables"
  tag: "Documentation"
  text: "Create and manage global variables"
- link: "/synthetics/guide/otp-email-synthetics-test/"
  tag: "Guide"
  text: "Extract a one-time passcode from an email body in a browser test"
- link: "/synthetics/guide/email-validation/"
  tag: "Documentation"
  text: "Validate emails in browser tests"
---

## Overview

A persistent email variable provides a Datadog-managed email address that stays the same across test runs. Create a user account in your application with that address once. Reuse the account in browser tests for email workflows, such as order confirmations, password resets, and login with an emailed one-time passcode (OTP).

Each run triggers an email from your application, then checks its content, extracts a value, or follows a link. For example, an OTP login test requests a fresh code, extracts it from the email, and uses it to log in. The address persists; your application generates the OTP for each authentication attempt.

<div class="alert alert-info">Email address variables and email steps are supported in browser tests. Mobile app tests do not support temporary or persistent email variables.</div>

Reusing the account lets you:

- Test login, re-authentication, and journeys after login without repeating account registration on every run.
- Keep the test account's roles, permissions, and application data between runs.
- Reuse the same email global variable across tests and manage access to it in one place.
- Receive and extract email content without maintaining a separate mailbox service or writing an integration with an email provider.

## Choose an email variable type

| Behavior | Temporary email | Persistent email |
| --- | --- | --- |
| Address | A new address for each test execution. | The same address across executions. |
| Configuration | An email variable defined in the test recorder. | An email global variable created in Synthetic Monitoring settings and selected in the recorder. |
| Typical use | Sign-up and verification flows that register a different account each run. | Login and re-authentication with an account created once. |
| Reuse | Each run has its own mailbox. | Multiple tests can use the same address and account. |
| Concurrent runs | Separate mailboxes avoid email conflicts between test runs. | Runs share a mailbox, so broad matching criteria can select another test's email. |

Both types support email assertions, extracting values from an email body, and following links in received emails. Use a persistent address when the account must already exist before the test starts.

An [MFA token variable][1] serves a different authentication method: it generates a time-based one-time password (TOTP) from an authenticator secret. An email variable receives the code sent by your application and tests the email delivery path as part of authentication.

## Create a persistent email variable

You need [access to global variables][2] to create and select persistent email variables.

1. Open [Synthetic Monitoring & Continuous Testing > Settings > Global Variables][3] and click {{< ui >}}+ New Global Variable{{< /ui >}}.
2. Under {{< ui >}}Choose variable type{{< /ui >}}, select {{< ui >}}Email address{{< /ui >}}.
3. Enter a variable name, such as `LOGIN_EMAIL`. Optionally, add a description and tags.
4. In the permissions section, configure who can view and use the variable and who can edit it. See [Restrict access][4].

   {{< img src="synthetics/settings/persistent_email_variable.png" alt="Create an email global variable with Email Address selected and configure its name, tags, and access permissions" style="width:80%;" >}}

5. Save the variable. Datadog generates its email address when the variable is created.
6. Open the saved variable and click the copy icon next to {{< ui >}}Email address{{< /ui >}}. The address shown before creation is an example.

   {{< img src="synthetics/settings/saved_persistent_email_variable.png" alt="Saved email global variable showing its read-only generated email address and the copy button" style="width:80%;" >}}

The generated address is read-only. You can edit the variable's metadata, but cannot replace its address with your own mailbox. You also cannot convert an existing text global variable into an email variable. Create a separate email global variable when you need another address.

## Register the application account once

Create a dedicated test account in your application using the generated address. Configure any roles, permissions, or application data needed by the journeys you want to monitor. If the application requires email verification during registration, use the recorder's email steps to complete that setup.

Keep this account for subsequent runs. Record the recurring test from the login page and omit the account creation steps. For example, provision a user with access to an order history page once. Have each run log in with an emailed OTP and assert that the order history loads.

If you are updating an existing sign-up test, create the persistent variable and register its address first. Remove the temporary email variable, select the persistent variable, update references to the email variable in the test, and replace registration steps with login steps. Keep a separate temporary email test if you also want to monitor sign-up.

## Example: record an OTP login flow

This video shows how to select a persistent email variable, insert its address into an email field, and request an OTP during recording.

{{< img src="synthetics/guide/email-validation/adding-persistent-email-variable.mp4" alt="Select a persistent email variable in the browser recorder and use it to request an OTP" video="true" width="100%" >}}

1. Open a browser test in the recorder.
2. Under {{< ui >}}Variables{{< /ui >}}, add a variable and select {{< ui >}}Email Address{{< /ui >}}.
3. Select {{< ui >}}Persistent{{< /ui >}}, choose `LOGIN_EMAIL`, and click {{< ui >}}Done{{< /ui >}}. The list contains email global variables you have access to. If you created the variable while the recorder was open, refresh the list.

   {{< img src="synthetics/guide/email-validation/persistent-email-variable-picker.png" alt="Browser recorder with Persistent selected, an email global variable chosen, and the Done button" style="width:100%;" >}}

4. Inject `{{ LOGIN_EMAIL }}` into the application's email field and record the action that requests an OTP. If the application also requires a password, store it in a separate obfuscated variable.
5. Add an email assertion if you want to check the email's subject or body.
6. Add a variable extracted from the email body, name it `LOGIN_OTP`, and configure a regular expression or XPath that matches the code. For example, `\b[0-9]{6}\b` matches a six-digit code. Use a more specific pattern if the message contains other numbers.
7. Use `{{ LOGIN_OTP }}` in the step that enters the code, then submit the login form.
8. Add an assertion that confirms successful authentication and record the remaining journey.

During recording, request a fresh OTP before configuring and trying the email extraction step. Save variable references in the test instead of the literal address or code shown during recording.

For extraction and input examples, see [Extract a one-time passcode from an email body][5]. For email assertions and navigation steps, see [Use email validation in browser tests][6].

## Reuse and run the test

Scheduled, on-demand, and CI-triggered executions reuse the saved address. The application account also remains available between runs as long as your application retains it. Trigger the expected email during each execution. For example, an OTP login test must request a fresh authentication code before extracting it.

Select the same global variable in other tests that use the same account. Changes to the account's application data persist between those tests, so reset any data that a journey needs in a known state.

## Limitations

### Shared inbox and email matching

All tests that use the same persistent email address share its inbox. Emails are not isolated by test or execution.

Email body extraction searches available emails received since the test started. It returns the first value that matches the extraction step's regular expression or XPath. If no email yields a match, the extraction step fails. A matching value does not guarantee that the email was triggered by the current test.

Each email step applies its own criteria. An email assertion on the subject or body does not restrict which email a later extraction step reads.

### Concurrent executions

Tests running in parallel with the same persistent inbox can interfere with each other if their matching criteria are too broad. An assertion can pass on another test's email, or an extraction step can return a value intended for another test.

Persistent email does not coordinate concurrent tests or associate a received email with the execution that triggered it. For example, a login test using `\b[0-9]{6}\b` can extract another test's six-digit OTP and then fail to authenticate. The application might also invalidate an earlier OTP or session when another login starts.

To avoid interference:

- Use temporary email addresses when the workflow can use a different address for each execution.
- Use different persistent email variables and application accounts for tests that need existing accounts and run in parallel.
- Make each step's matching criteria specific to the expected email. Broad criteria can match another test's message when several tests send similar emails to the same inbox.

### Email selection and limits

- A test can use one email address variable, either temporary or persistent.
- During execution, persistent email steps look for messages received after the run starts. Trigger the expected email within the test instead of relying on a message sent before execution.
- Persistent email retrieval considers up to 25 of the most recent eligible messages. Keep the account's inbox focused on test traffic.
- The address is provisioned by Datadog. An ordinary text variable containing an external email address does not enable access to that mailbox.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| The variable is missing from the recorder's list. | Save it as an **Email address** global variable, check its access permissions, and refresh the list. |
| The application says the account does not exist. | Register the generated address in your application before running the login test. Creating the Datadog variable does not create an application account. |
| No OTP is found. | Check that the test requests a new email, sends it to the selected address, and uses a parser that matches the message body. |
| The code is expired or invalid. | Check whether a broad extraction pattern matched another test's email in the shared inbox. Use temporary addresses or separate persistent inboxes for parallel tests. Also check additional OTP requests and application-specific expiration rules. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/guide/browser-tests-totp/
[2]: /synthetics/platform/settings/#global-variables
[3]: https://app.datadoghq.com/synthetics/settings/variables
[4]: /synthetics/platform/settings/#restrict-access
[5]: /synthetics/guide/otp-email-synthetics-test/
[6]: /synthetics/guide/email-validation/
