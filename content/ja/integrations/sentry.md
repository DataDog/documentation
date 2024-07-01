---
"app_id": "sentry"
"app_uuid": "c5e6ea68-6042-405f-abda-1e4fced494ee"
"assets":
  "integration":
    "auto_install": true
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "56"
    "source_type_name": "Sentry"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "collaboration"
- "issue tracking"
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "sentry"
"integration_id": "sentry"
"integration_title": "Sentry"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "sentry"
"public_title": "Sentry"
"short_description": "See Sentry exceptions in your Datadog event stream."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Collaboration"
  - "Category::Issue Tracking"
  "configuration": "README.md#Setup"
  "description": "See Sentry exceptions in your Datadog event stream."
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/datadog-sentry-integration-collaborative-bug-fixing/"
  "support": "README.md#Troubleshooting"
  "title": "Sentry"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/sentry/sentry.png" alt="sentry event" popup="true">}}

## Overview

Sentry provides self-hosted and cloud-based application performance monitoring and error tracking that helps software teams see clearer, solve quicker, and learn continuously. 

The Datadog Sentry integration automatically forwards Sentry events to the Datadog event stream, allowing you to search and comment on errors and bug fixes and correlate Sentry errors with metrics and data from your other systems.

## Setup

### Installation

Setting up Sentry integration:

1. Log into Sentry.
2. Navigate to **Settings > Projects** and select the appropriate project.
3. On the left side, select **Legacy Integrations**.
4. Scroll down to the **Webhooks integration**, click the slider toggle to enable it, and then click **Configure Plugin**.
5. Under **Callback URLs'**, enter the callback URL copied from the integration tile.
6. Click **Save changes**.
7. Enable the integration if necessary by clicking **Enable Plugin**.

By default, Sentry pings the Webhook with event data every time there is a new exception (as opposed to a new instance of an already-logged exception). If you want different (or additional) triggers, you can configure them in the Alerts section of your project settings.

### Add a host name to errors (optional)

Occasionally, the server name which Sentry reports may not match the host name recognized by Datadog. To overcome this, set a custom value for the `server_name` tag, which is attached to each event.

To use a different host name while preserving Sentry's default `server_name` value, set a `hostname` tag on your events. See Sentry's documentation on [Customizing Tags][1] for your specific language.

## Troubleshooting

### Sentry errors missing in Datadog

If Sentry errors are missing from Datadog, your Sentry Webhook probably isn't triggering. This could be due to the following scenarios:

**Alerts are only sent when a rule is triggered**:<br>
For example, if the rule condition is when "an event is first seen", an alert is not dispatched until a new issue is created. Depending on how many unique issues your project is receiving, this can take some time.

**The notification integration is disabled**:<br>
Ensure that the notification integration is enabled under the rule actions, either as the specific service, or covered under "all enabled services".

## Further reading

- [Collaborative Bug Fixing with Datadog's Sentry Integration][2]

[1]: https://docs.sentry.io/platforms/java/enriching-events/tags/
[2]: https://www.datadoghq.com/blog/datadog-sentry-integration-collaborative-bug-fixing/

