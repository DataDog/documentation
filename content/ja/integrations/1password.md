---
"app_id": "onepassword"
"app_uuid": "ccfcdbb7-f4b2-43b4-a176-a1f0d7b08bba"
"assets":
  "dashboards":
    "1Password-Overview": assets/dashboards/1password_overview.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10351"
    "source_type_name": 1password
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- event management
- issue tracking
- security
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "1password"
"integration_id": "onepassword"
"integration_title": "1Password"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "1password"
"public_title": "1Password"
"short_description": "Get events for your 1Password account."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Event Management"
  - "Category::Issue Tracking"
  - "Category::Security"
  - "Submitted Data Type::Logs"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": Get events for your 1Password account.
  "media":
  - "caption": 1Password Dashboard Overview
    "image_url": images/onepassword-dashboard.png
    "media_type": image
  - "caption": 1Password Dashboard Map
    "image_url": images/onepassword-map.png
    "media_type": image
  - "caption": 1Password Detection Rule
    "image_url": images/onepassword-detection-rules.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Troubleshooting"
  "title": 1Password
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

With [1Password Business][1], you can send your account events to Datadog Cloud SIEM using the 1Password Events API. In addition, you can:

- Control your 1Password data retention.
- Build custom widgets and dashboards.
- Set up detection rules that trigger specific actions.
- Cross-reference 1Password events with the data from other services.

Datadog’s integration with 1Password collects logs using [1Password Events API][2], which generates three types of logs:

- **Sign-in attempts**: These logs include the name and IP address of the user who attempted to sign in to the account, when the attempt was made, and for failed attempts, the cause of the failure, such as an incorrect password, key, or second factor.
- **Item usage**: This type of log contains actions that describe how an item—for example, a password or other credential—was used. Possible values for action include fill, enter-item-edit-mode, export, share, secure-copy, reveal, select-sso-provider, server-create, server-update, and server-fetch.
- **Audit events**: These logs include actions performed by team members in a 1Password account, such as changes made to the account, vaults, groups, users, and more.

After parsing your 1Password logs, Datadog then populates the [out-of-the-box 1Password overview dashboard][3] with insights into security-related events from your 1Password values, items, and users. Widgets include toplists showing the most frequent and infrequent events, and a geolocation map that shows you the country of origin of sign-in attempts.

## Setup

**Step 1: Generate an Access Token in 1Password**

To get started, [sign in][4] to your 1Password account, click **Integrations** in the sidebar, and choose **Datadog**.

Next, add the integration to your 1Password account and create a bearer JSON web token:

1. Enter a **Name** for the integration, then click **Add Integration**.
2. Enter a **Name** for the bearer token and choose when the token will expire.
3. Select the event types your token will have access to:
    a. Sign-in attempts
    b. Item usage events
    c. Audit events
4. Click **Issue Token** to generate the access token key. For additional information on issuing or revoking 1Password bearer tokens, see [1Password's documentation][5].
5. Click **Save in 1Password** and choose which vault to save your token to.
6. Click **View Integration Details** to view the token.

You will need this token in the next step.

**Step 2: Connect your 1Password account to Datadog**

To get started, copy the access token key from the previous step.

1. Enter a **Name** for the account.
2. Paste the **access token key** from your 1Password account into the **Access Token** field.
3. Under host type, select the **region & plan of your 1Password account**.
4. Optionally, you can define **tags** for these logs.
5. Click **Save**.

### Validation

Search your Datadog logs with `source:1password`. If you installed the integration correctly, you should be able to see 1Password events.

## Data Collected

### Metrics

The 1Password integration does not include any metrics.

### Service Checks

The 1Password integration does not include any service checks.

### Events

The 1Password integration does not include any events.

## Troubleshooting

Need help from Datadog? Contact [Datadog support][6]. Alternatively, if you need help from 1Password, contact [1Password support][7].

[1]: https://support.1password.com/explore/business/
[2]: https://developer.1password.com/docs/events-api/
[3]: http://app.datadoghq.com/dash/integration/1Password-Overview
[4]: https://start.1password.com/signin
[5]: https://support.1password.com/events-reporting/#appendix-issue-or-revoke-bearer-tokens
[6]: https://docs.datadoghq.com/help/
[7]: https://support.1password.com/contact/?o=https%3a%2f%2fsupport.1password.com%2fevents-reporting%2f

