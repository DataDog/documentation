---
title: Automate the Remediation of Detected Threats with Webhooks
kind: guide
further_reading:
- link: "/security_platform/explorer/"
  tag: "Documentation"
  text: "Start investigating signals in the Signals Explorer"

---

## Overview

[Security Monitoring][1] allows you to set Detection Rules that trigger auto-remediation workflows. With Datadog’s [webhook integration][2], set up webhooks to deliver payloads to the services you want to automate whenever a [Detection Rule][3] is broken. Every webhook payload contains information about the triggering event and a custom message that can be used to initiate services downstream. Automate commands for any service that has a webhook URL.

Choose a security scenario below to begin automating remediation.

## Delete misconfigured security groups

In a cloud environment, it’s important to delete a misconfigured resource as soon as it is created. In this scenario, you can configure a [webhook integration][2] to send a [webhook][2] to your cloud provider’s API management service.

{{< img src="security_platform/security_monitoring/guide/automate-the-remediation-of-detected-threats/automation-diagram.png" alt="A diagram for a webhook sent to a cloud provider's API" >}}

Once configured, if an AWS user creates a poorly configured resource (for example, an overly permissive security group, user role, etc.) within your AWS environment, Datadog Log Management will ingest the related log, which triggers a security group–based Detection Rule. This process will automatically send the webhook’s JSON payload to the designated AWS API Gateway URL, which in turn activates a AWS Lambda function that automatically deletes the offending resource.

## Ban a suspicious IP address

A sign-in from an unrecognized IP address might represent an attacker manipulating a trusted user’s credentials, with which they can then access your data and gain persistence in your environment.

To combat this type of attack, you can use the [new term detection method][4], which analyzes your account’s historical data over a chosen period of time and alerts on previously unseen values in your cloud logs.

First, set up a [new term–based Detection Rule][5].

{{< img src="security_platform/security_monitoring/guide/automate-the-remediation-of-detected-threats/new-term-rule.png" alt="A new term-based detection rule" >}}

Then, set up a [webhook][2] that will send a payload to your cloud’s identity and access management (IAM) service to ban the unknown IP when this rule is triggered.

{{< img src="security_platform/security_monitoring/guide/automate-the-remediation-of-detected-threats/webhook-ip.png" alt="A new webhook that bans an unknown IP address" >}}

The following example illustrates what the relevant webhook payload could look like when a security signal is produced by Datadog:

{{< code-block lang="json" filename="webhook-payload.json" >}}
{
  "SECURITY_RULE_NAME": "Request from unexpected IP address",
  "SECURITY_SIGNAL_ID": "abcd1234",
  "SECURITY_SIGNAL_ATTRIBUTES": {
    "network": {
      "client": {
        "ip": [
          "1.2.3.4"
        ]
      }
    }
  }
}
{{< /code-block >}}

## Application abuse and fraud

With Datadog Security Monitoring, uncover patterns of [abuse or fraud][6] across your application. For example, set up a [Detection Rule][7] that is triggered when a user repeatedly attempts to purchase something in your application with invalid credit card details. Then, set up a webhook that sends a payload with remediation instructions to a service that will disable the user's credentials.

The following example illustrates what the relevant webhook payload could look like when a security signal is produced by Datadog:

{{< code-block lang="json" filename="webhook-payload.json" >}}
{
  "SECURITY_RULE_NAME": "Fraudulent Credit Card Authorizations",
  "SECURITY_SIGNAL_ID": "efgh5678",
  "SECURITY_SIGNAL_ATTRIBUTES": {
    "usr": {
      "id": "john.doe@your_domain.com"
    },
    "evt": {
      "name": "credit_card_authorization",
      "outcome": "fail"
    },
    "network": {
      "client": {
        "ip": [
          "1.2.3.4"
        ]
      }
    }
  }
}
{{< /code-block >}}

Datadog generates the Security Signal, which details the offense as well as the suspicious user’s information, such as their IP address and user ID, and the webhook payload will send remediation instructions to a service to disable the user's credentials.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_platform/security_monitoring/
[2]: https://app.datadoghq.com/account/settings#integrations/webhooks
[3]: /security_platform/detection_rules/
[4]: https://www.datadoghq.com/blog/new-term-detection-method-datadog/
[5]: /security_platform/security_monitoring/log_detection_rules/?tab=threshold#new-term
[6]: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
[7]: /security_platform/security_monitoring/log_detection_rules/?tab=threshold#define-a-search-query
