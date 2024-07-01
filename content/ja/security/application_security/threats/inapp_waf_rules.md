---
title: In-App WAF Rules
aliases:
  - /security_platform/application_security/event_rules
  - /security/application_security/event_rules
  - /security/application_security/threats/event_rules
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Protect against threats with Datadog Application Security Management
- link: /security/application_security/custom_rules/
  tag: Documentation
  text: Writing custom detection rules
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Troubleshoot common Datadog Application Security Management issues
---

## Overview

With Application Security Management (ASM) enabled, the Datadog tracing library actively monitors all web services and API requests for suspicious security activity.

An _In-App WAF rule_ specifies conditions on the incoming request to define what the library considers suspicious. The Datadog tracing library includes hundreds of out-of-the-box ASM In-App WAF rules, which are used to display security traces in the trace explorer and in the default signal rules. 

You can add to the In-App WAF rules without upgrading the tracing library. 

## Structure of an ASM In-App WAF rule

An In-App WAF rule is a JSON object composed of a category, a name, tags, and conditions. When a security trace is detected, tags from the rules are propagated onto the security trace, and can be used to build [detection rules][1].

### Conditions
Conditions define when the rule tags an incoming request. The conditions are composed of _inputs_ and _operators_.

#### Inputs
An input represents which part of the request the operator is applied to. The following inputs are used in the In-App WAF rules:

| Name | Description | Example |
|------|-------------|---------|
| `server.request.uri.raw` | The full request URI received by the application service | `https://my.api.com/users/1234/roles?clientId=234` |
| `server.request.path_params` | The parsed path parameters (key/value map) | `userId => 1234` |
| `server.request.query` | The parsed query parameters (key/value map) | `clientId => 234` |
| `server.request.headers.no_cookies` | The incoming http requests headers, excluding the cookie header (key/value map) | `user-agent => Zgrab, referer => google.com` |
| `grpc.server.request.message` | The parsed gRPC message (key/value map) | `data.items[0] => value0, data.items[1] => value1` |
| `server.request.body` | The parsed HTTP body (key/value map) | `data.items[0] => value0, data.items[1] => value1` |
| `server.response.status` | The http status code | `200` |

#### Operators 

| name | Description |
|------|-------------|
| `match_regex` | Perform regular expression match on the inputs |
| `phrase_match` | Perform a fast keyword list matching |
| `is_xss` | Special operator to check for cross-site scripting (XSS) payloads |
| `is_sqli` | Special operator to check for SQL injection (SQLI) payloads |

## Custom in-app WAF rules

   <div class="alert alert-info">Custom in-app WAF rules is in beta.</div>

Custom in-app WAF rules enable users to log or block specific types of requests to their applications. For example, you can use custom rules to monitor login success or failure. To get started, navigate to **Security** -> **Application Security** -> **Protection** -> **In-App WAF** -> [**Custom Rules**][4].

**Note:** Default rules in in-app WAF are read-only. To refine your in-app WAF behavior, modify the in-app WAF rules. Default rules cannot be modified, however, you can create a custom rule based on one of the default rules, and modify the match conditions to your needs. Be sure to disable the default rule so that you don't have two similar rules evaluating the same requests. 

## Configure an ASM In-App WAF rule

Blocking on a service is defined through the policy rules. Three Datadog default policies are included in the in-app WAF: *Datadog Recommended*, *Datadog Monitoring-only*, which monitors attacks only, and *Datadog Block Attack tools*, which blocks attack tools and monitors all other attacks.

Services using a policy are visible directly in the policy management page.

1. In Datadog, navigate to [Security > Application Security > Protection > In-App WAF][2].

   {{< img src="security/application_security/threats/waf/in-app-waf.png" alt="In-App WAF configuration page, showing two default policies." style="width:100%;" >}}

2. Click on the three dots to the right of one of the policies, and select **Download Configuration of this Policy** to download the configuration file to your local machine.
3. Optionally, select **Apply this Policy to Services** to apply a default policy to one or more of your protection enabled ASM services.

   **Note:** A policy can be applied to one or more services, but a service can only contain one _policy_.

3. Update the file to include the JSON definition of your new rule, following the specification above. For example:

   {{< code-block lang="json" collapsible="true" >}}
    {
        "id": "id-123",
        "name": "My In-App WAF rule",
        "tags": {
            "category": "attack_attempt",
            "crs_id": "920260",
            "type": "http_protocol_violation"
        },
        "conditions": [
            {
                "operator": "match_regex",
                "parameters": {
                    "inputs": [
                        {
                            "address": "server.request.uri.raw"
                        }
                    ],
                    "options": {
                        "case_sensitive": true,
                        "min_length": 6
                    },
                    "regex": "\\%u[fF]{2}[0-9a-fA-F]{2}"
                }
            }
        ],
        "transformers": []
    },
   {{< /code-block >}}

4. Using a utility such as SCP or FTP, copy the `appsec-rules.json` file to your application server, for example, `/home/asm/appsec-rules.json`.

5. Following the instructions in [Enabling ASM][3] for adding application variables in your environment, add the `DD_APPSEC_RULES` environment variable to your service with the full path to the file: 
   ```
   DD_APPSEC_RULES=/home/asm/appsec-rules.json
   ```

6. Restart your service.

## What to do next

Next, [configure detection rules to create security signals][1] based on those security traces defined by the In-App WAF rules you created. You can modify the provided out-of-the-box ASM detection rules or create new ones. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/custom_rules/
[2]: https://app.datadoghq.com/security/appsec/in-app-waf
[3]: /security/application_security/enabling/
[4]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules
