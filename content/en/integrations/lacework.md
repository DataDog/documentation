---
title: Lacework
name: lacework
kind: integration
description: "Forward your Lacework logs to Datadog."
short_description: "Forward your Lacework logs to Datadog."
categories:
- log collection
- security
doc_link: /integrations/lacework/
has_logo: true
integration_title: lacework
is_public: true
public_title: Datadog-Lacework Integration
---

## Overview

Use the Datadog Lacework integration to forward your Lacework logs to Datadog.

## Setup

Lacework pushes logs and events to Datadog, so all configuration is done on Lacework's dashboard. Datadog automatically enables the right logs processing pipeline when it detects Lacework logs.

### Configuration

1. In Lacework, go to *Settings* and select *Integrations*.
2. In the *Outgoing* section (on the left panel) select Datadog.
3. Fill in the following details:
    * **Name** : Enter a name for the integration like `Datadog-Lacework`.
    * **Datadog Type**: Select the type of logs sent to Datadog:

        | Datadog Type     | Description                                           |
        |------------------|-------------------------------------------------------|
        | `Logs Details`   | Sends Lacework detailed logs to the Datadog logs platform. |
        | `Logs Summary`   | Sends a Lacework summary to the Datadog logs platform.       |
        | `Events Summary` | Sends a Lacework summary to the Datadog Events platform.     |

    * **Datadog Site**:
        * Select `com` if you use Datadog US region.
        * Select `eu` if you use Datadog EU region.
    * **API KEY**: Enter your Datadog API key.
    * **Alert Security Level**: Select the minimum log severity level of forwarded logs.

## Troubleshooting

Need help? Contact [Datadog support][1].

[1]: /help
