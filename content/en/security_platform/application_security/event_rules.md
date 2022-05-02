---
title: Event Rules
kind: documentation
further_reading:
- link: "/security_platform/application_security/"
  tag: "Documentation"
  text: "Monitoring threats with Datadog Application Security Monitoring"
- link: "/security_platform/application_security/custom_rules/"
  tag: "Documentation"
  text: "Writing custom detection rules"
- link: "/security_platform/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshoot common Datadog Application Security Monitoring issues"
---

## Overview

With Application Security Monitoring (ASM) enabled, the Datadog tracing library actively monitors all web services and API requests for suspicious security activity.

An _event rule_ specifies conditions on the incoming request to define what the library considers suspicious. The Datadog tracing library includes hundreds of out-of-the-box ASM event rules, which are used to display suspicious requests in the trace explorer and in the default signal rules. 

You can add to the event rules without upgrading the tracing library. 

## Structure of an ASM event rule

An event rule is a JSON object composed of a category, a name, tags, and conditions. Tags from the rules are propagated onto the suspicious request when detected, and can be used to build [detection rules][1].

### Conditions
Conditions define when an incoming request is tagged by the rule. The conditions are composed of _inputs_ and _operators_.

#### Inputs
An input represents which part of the request the operator is applied to. The following inputs are used in the event rules:

| Name | Description | Example |
|------|-------------|---------|
| server.request.uri.raw | The full request URI received by the application service | https://my.api.com/users/1234/roles?clientId=234 |
| server.request.path_params | The parsed path parameters (key/value map) | E.g. userId => 1234 |
| server.request.query | The parsed query parameters (key/value map) | E.g. clientId => 234 |
| server.request.headers.no_cookies | The incoming http requests headers, excluding the cookie header (key/value map) | user-agent => Zgrab, referer => google.com |
| grpc.server.request.message | The parsed gRPC message (key/value map) | data.items[0] => value0, data.items[1] => value1 |
| server.request.body | The parsed HTTP body (key/value map) | data.items[0] => value0, data.items[1] => value1 |
| server.response.status | The http status code | 200 |

#### Operators 

| name | Description |
|------|-------------|
| match_regex | Perform regular expression match on the inputs |
| phrase_match | Perform a fast keyword list matching |
| is_xss | Special operator to check for Cross-site scripting (XSS) payloads |
| is_sqli | Special operator to check for SQL-Injection (SQLI) payloads |

### Configure an ASM event rule in your service

1. In Datadog, navigate to the [Event Rules page under ASM Configuration][2].

2. Click **Download Configuration** in the top right corner to download the configuration file, `appsec-rules.json`, to your local machine.

3. Update the file to include the JSON definition of your new rule, following the specification above. For example:

   {{< code-block lang="json" collapsible="true" >}}
    {
        "id": "id-123",
        "name": "My event rule",
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

3. Using a utility such as SCP or FTP, copy the `appsec-rules.json` file to your application server, for example `/home/asm/appsec-rules.json`.

4. Following the instructions in [the ASM Getting Started][3] for adding application variables in your environment, add the `DD_APPSEC_RULES` environment variable to your service with the full path to the file: 
   ```
   DD_APPSEC_RULES=/home/asm/appsec-rules.json
   ```

5. Restart your service.

### What to do next

Next, [configure detection rules to create security signals][1] based on those suspicious requests defined by the event rules you created. You can modify the provided out-of-the-box ASM detection rules or create new ones. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_platform/application_security/custom_rules/
[2]: ​​https://app.datadoghq.com/security/appsec/event-rules
[3]: /security_platform/application_security/getting_started/
