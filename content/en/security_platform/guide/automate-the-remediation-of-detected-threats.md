---
title: Automate the Remediation of Detected Threats with Webhooks
kind: guide
---

## Overview

With Datadog’s [webhook integration][1], set up webhook messages to deliver payloads to the services you want to automate whenever a Detection Rule is broken. Every webhook payload contains information on the triggering event and a custom message that can be used to initiate services downstream. Automate commands for any service that has a webhook URL.

Choose a security scenario below to begin configuration.

## Delete misconfigured security groups

In order to secure your cloud environment, it’s important to delete a misconfigured resource as soon as it is created. You can do this by sending a webhook to your cloud provider’s API management service.

{{< img src="security_platform/guides/automate-the-remediation-of-detected-threats/automation-diagram.png" alt="A diagram for a webhook sent to a cloud provider's API" >}}

Once configured, if an AWS user creates a poorly configured resource (for example, an overly permissive security group, user role, etc.) within your AWS environment in the future, Datadog Log Management will ingest the related log, which triggers a security group–based Detection Rule. This process will automatidally send the webhook’s JSON payload to the designated AWS API Gateway URL, which in turn activates a AWS Lambda function that automatically deletes the offending resource.

## Ban a suspicious IP address

A sign-in from an unrecognized IP address might represent an attacker manipulating a trusted user’s credentials, with which they can then access your data and gain persistence in your environment.

To combat this type of attack, use the new term detection method, which analyzes your account’s historical data over a chosen period of time and alerts on previously unseen values in your cloud logs. First, set up a new term–based Detection Rule that, when triggered, sends a webhook payload to your cloud’s identity and access management (IAM) service to ban the unknown IP.

The following example illustrates what the relevant webhook payload might look like when triggered by a new term-based detection rule from Datadog.

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

Datadog then sends the payload to your IAM service, which can ban the offending address.



[1]: https://app.datadoghq.com/account/settings#integrations/webhooks
