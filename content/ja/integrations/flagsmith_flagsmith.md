---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "flagsmith-platform"
"app_uuid": "ad6a3059-12b6-4a11-a72c-336d732add15"
"assets": {}
"author":
  "homepage": "https://flagsmith.com/"
  "name": Flagsmith
  "sales_email": support@flagsmith.com
  "support_email": support@flagsmith.com
  "vendor_id": flagsmith
"categories":
- configuration & deployment
- marketplace
- testing
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "flagsmith_flagsmith"
"integration_id": "flagsmith-platform"
"integration_title": "Flagsmith"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "flagsmith_flagsmith"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.flagsmith.seat
  "product_id": flagsmith-license
  "short_description": Priced at $75 per seat per month.
  "tag": seat
  "unit_label": Seat
  "unit_price": !!int "75"
"public_title": "Flagsmith"
"short_description": "Flagsmith is an open source Feature Flag and Remote Config service"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Category::Marketplace"
  - "Category::Testing"
  - "Offering::Software License"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Flagsmith is an open source Feature Flag and Remote Config service
  "media":
  - "caption": Manage features and remote config. Decouple deploy and release.
    "image_url": images/dashboard_home.png
    "media_type": image
  - "caption": Drive A/B and Multivariate tests using Flagsmith.
    "image_url": images/dashboard_mv_flags.png
    "media_type": image
  - "caption": Integrate and control Flagsmith flags and audit logs directly from your Datadog dashboards.
    "image_url": images/dashboard_widget.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/flagsmith-datadog-marketplace/"
  "support": "README.md#Support"
  "title": Flagsmith
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

[Flagsmith][1] helps you release features with confidence and manages feature flags across web, mobile, and server-side applications. Use the Flagsmith-hosted API, deploy to your own private cloud, or run on-premise.

Flagsmith provides an all-in-one platform for developing, implementing, and managing your feature flags. Whether you are moving off an in-house solution or using toggles for the first time, Flagsmith will provide both power and efficiency.

### Manage Flags across multiple platforms

Flagsmith makes it easy to create and manage feature toggles across web, mobile, and server-side applications. Wrap a section of code with a flag, and then use Flagsmith to manage that feature.

### Powerful Segmenting rules

Manage feature flags by development environment and by user group—including individual users, a segment of users, or a percentage. This allows you to implement practices like canary deployments.

### Drive A/B and Multivariate Tests

Multivariate flags allow you to use a percentage split across two or more variations for precise A/B/n testing and experimentation.

### Dashboards

View and control Flagsmith flags directly from your existing Datadog dashboards.

### Events

Send flag change events from Flagsmith into your Datadog event stream with the [Datadog Flagsmith integration][2].

## Support

For support or feature requests, contact Flagsmith through the following channel:

- [Flagsmith Support][4]

### Further Reading

Additional helpful documentation, links, and articles:

- [Release features faster and track their impact with Flagsmith's integration and Datadog Marketplace offering][5]

[1]: https://flagsmith.com/
[2]: https://app.datadoghq.com/integrations/flagsmith
[3]: https://docs.flagsmith.com/integrations/datadog
[4]: https://flagsmith.com/contact-us/
[5]: https://www.datadoghq.com/blog/flagsmith-datadog-marketplace/
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/flagsmith-platform" target="_blank">Click Here</a> to purchase this application.
