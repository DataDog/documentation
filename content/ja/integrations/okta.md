---
"app_id": "okta"
"app_uuid": "1bbd0367-66bf-41c9-be58-8f3313afd0e5"
"assets":
  "dashboards":
    "Okta-Overview": assets/dashboards/Okta-Overview_dashboard.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "236"
    "source_type_name": Okta
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- security
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "okta"
"integration_id": "okta"
"integration_title": "Okta"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "okta"
"public_title": "Okta"
"short_description": "Integrate your Okta security event logs into Datadog."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Security"
  "configuration": "README.md#Setup"
  "description": Integrate your Okta security event logs into Datadog.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Okta
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Connect Okta to integrate your Okta system event logs into Datadog Log Management.

These logs give you greater visibility into access and lifecycle events from all of your applications, users, and more. The Datadog Okta integration enables you to detect threats to your applications, track user activity, debug authentication and authorization issues, and create an audit trail for regulatory compliance.

See the [Okta Event Types API][1] for all the Okta events that Datadog can track.

## SSO with SAML

For single sign-on, see [Configuring Okta as a SAML IdP][2].

## Setup

### Configuration

There are two methods to enable the Datadog Okta integration: through OAuth using credentials from the Datadog app on the Okta Integration Network or through an API key.

Both methods require the following fields:

| Parameter            | Description                                                                                                                                                      |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Account name         | Identifies your Okta account in Datadog. The account name can only contain alphanumeric characters and underscores.                                              |
| Domain               | The unique account domain used to request logs from your Okta account. The URL must be valid and start with `https://<your_domain>.okta.com`.                    |
| Authorization method | Specifies a method to receive authorization from Okta. The two methods are: account API key or credentials from the Datadog app on the Okta Integration Network. |


To enable the integration using OAuth:

1. In Okta, navigate to **Applications** > **API Services Integration** > **Add Integration** > **Datadog**.
2. Upon installation, you will be provided a set of client ID and client secret credentials. Copy these credentials.
3. In Datadog, open the [Okta integration tile][3].
4. Under the **Configure** tab, click **Add Account** and enter the following information:

    | Parameter            | Description                                                                                                                                                      |
    |----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Client ID            | The client ID provided by Okta.                                                                                                                                  |
    | Client Secret        | The client secret provided by Okta.                                                                                                                              |

5. Click **Save**.


To enable the integration using an API key:

1. In Okta, navigate to **Security** > **API** > **Tokens** and add a new API token.
2. In Datadog, open the [Okta integration tile][3].
3. Under the **Configure** tab, click **Add Account** and enter the following information:

    | Parameter | Description                           |
    |-----------|---------------------------------------|
    | API key   | The API token from your Okta account. |

4. Click **Save**.

## Data Collected

### Metrics

The Okta integration does not include any metrics.

### Events

The Okta integration does not include any events.

### Service Checks

The Okta integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][4].

[1]: https://developer.okta.com/docs/reference/api/event-types/
[2]: https://docs.datadoghq.com/account_management/saml/okta/
[3]: https://app.datadoghq.com/account/settings#integrations/okta
[4]: https://docs.datadoghq.com/help/

