---
"app_id": "ngrok"
"app_uuid": "3b096ceb-d7a5-4bb5-bf0a-3a07d308d56a"
"assets":
  "dashboards":
    "ngrok_http_events": assets/dashboards/ngrok_http_events.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10397"
    "source_type_name": ngrok
"author":
  "homepage": "https://ngrok.com"
  "name": ngrok
  "sales_email": sales@ngrok.com
  "support_email": support@ngrok.com
"categories":
- developer tools
- cloud
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/ngrok/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ngrok"
"integration_id": "ngrok"
"integration_title": "ngrok"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "ngrok"
"public_title": "ngrok"
"short_description": "Visualize valuable application insights with ngrok HTTP events"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Developer Tools"
  - "Category::Cloud"
  - "Submitted Data Type::Logs"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Queried Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Visualize valuable application insights with ngrok HTTP events
  "media":
  - "caption": ngrok HTTP request events overview dashboard
    "image_url": images/dashboard.png
    "media_type": image
  - "caption": ngrok services platform
    "image_url": images/diag1.png
    "media_type": image
  - "caption": ngrok + datadog
    "image_url": images/diag2.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": other
    "url": "https://ngrok.com/solutions"
  "support": "README.md#Support"
  "title": ngrok
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

ngrok delivers instant ingress to your applications in any cloud, private network, or devices with authentication, load balancing, and other critical controls using our global points of presence.

The ngrok platform includes a Datadog event destination integration. With ngrok HTTP events, you can visualize valuable application insights using Datadog Log Management including HTTP status code breakdown, top client IPs and most requested resources. You can use the Datadog HTTPS logging endpoint to set up the integration on the [ngrok dashboard UI][1].



## Setup

To forward ngrok events for consumption into Datadog, you need to make two configurations.

- ngrok Event Subscription: Contains which events to be forwarded
- ngrok Event Destination: The configuration for where the events defined in the Event Subscription are forwarded to.

The following example demonstrates how to configure an Event Subscription with a Datadog Event Destination for HTTP request events. For step-by-step instructions, see the [ngrok Datadog Event Destination documentation][2].

**Step 1: Create a ngrok Event Subscription**

1. In the ngrok Dashboard Console, navigate to Events page.
2. Select "New Subscription".
3. Provide a Description for Subscription and select "Add Source".
4. From the list, select "http_request_complete.v0" and select Add Event Source.



**Step 2: Configure Event Destination properties**

The steps are performed within the previously created Event Subscription configuration:

1. Navigate to the "Event Destination" tab and select "Add Destination".
2. From the dropdown menu, select Datadog and input the correct information:
    a. Select the correct [Datadog site][3] for your data.\
    b. Navigate to Datadog and [create an API key][4] within the organization settings.\
    c. Copy the API key and paste into the API Key field.\
    d. Optionally, define a Service Name, this be added as a key to the event data as **service:value**.\
    e. Optionally, define DD Tags, these are `key:value` pairs to be added as Datadog tags to the event data.\
    f. Optional, define a description, this is locally significant and helps identify the Datadog Event Destination.
3. Select "Send Test Event".
4. If presented with a Success message, select "Done".  If an error is presented, validate that the Datadog site and API key are correct.


**Step 3: Create Datadog Log Facets**
Once logs begin to arrive, create [log facets][5] for data analysis and dashboard visualization. For more information about creating log facets, see the [Log Facets documentation][6]. 

Create facets for the following fields:

- event_type
- object.conn.server_name
- object.conn.client_ip
- object.http.response.status_code
- object.http.request.method
- object.http.request.url.path

## Troubleshooting

Need help? Contact [ngrok Support][7] or reference the [ngrok documentation][8].

## Further Reading

Learn more about [ngrok][9].

[1]: https://dashboard.ngrok.com
[2]: https://ngrok.com/docs/integrations/datadog/event-destination/
[3]: https://docs.datadoghq.com/getting_started/site/
[4]: https://docs.datadoghq.com/account_management/api-app-keys/
[5]: https://docs.datadoghq.com/logs/explorer/facets/
[6]: https://docs.datadoghq.com/logs/explorer/facets/#create-facets
[7]: mailto:support@ngrok.com
[8]: https://ngrok.com/docs/integrations/datadog/
[9]: https://ngrok.com/solutions

