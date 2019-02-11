---
title: API and APP Key Management
kind: faq
aliases:
    - /account_management/faq/how-do-i-reset-my-application-keys/
    - /agent/faq/how-do-i-reset-my-datadog-api-keys/
---

## API keys

API keys are unique to your organization. An API key is required by the Datadog Agent to submit metrics and events to Datadog.

## APP keys

Application keys, in conjunction with your org's API key, give you full access to Datadog's programmatic API. Application keys are associated with the user account that created them and must be named. The application key is used to log all requests made to the API.

## Add

To add a Datadog API or APP key, navigate to [Integration -> APIs][1], enter a name for your key, and click **Create API key** or **Create Application Key**.

**Note**:

* Your org must have at least one API key and at most API five keys.
* Key names must be unique across your org.
* Application key names cannot be blank.

## Remove

To remove a Datadog API or APP key, navigate to [Integration -> APIs][1] and select the **Revoke** button next to the key you want to remove:

{{< img src="account_management/faq/Application_Keys.jpg" alt="Application Keys" responsive="true" >}}

## Troubleshooting

Need help? Contact [Datadog support][2].

[1]: https://app.datadoghq.com/account/settings#api
[2]: /help
