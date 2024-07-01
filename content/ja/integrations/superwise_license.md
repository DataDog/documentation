---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "superwise-license"
"app_uuid": "f15082a6-d0ed-4f6f-a315-f7cbcaae6823"
"assets": {}
"author":
  "homepage": "https://www.superwise.ai"
  "name": Superwise
  "sales_email": sales@superwise.ai
  "support_email": support@superwise.ai
  "vendor_id": superwise
"categories":
- incidents
- marketplace
- notifications
- ai/ml
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "superwise_license"
"integration_id": "superwise-license"
"integration_title": "Superwise Model Observability"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "superwise_license"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.superwise
  "product_id": license
  "short_description": Priced per model per month and decreases as you scale
  "tag": models
  "unit_label": Model monitored
  "unit_price": !!float "199.0"
"public_title": "Superwise Model Observability"
"short_description": "Self-service ML observability and monitoring SaaS platform."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Incidents"
  - "Category::Marketplace"
  - "Category::Notifications"
  - "Category::AI/ML"
  - "Offering::Software License"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Self-service ML observability and monitoring SaaS platform.
  "media":
  - "caption": Superwise helps ML engineering teams monitor model health in production and shortens the time to detect and resolve.
    "image_url": images/1_4.png
    "media_type": image
  - "caption": Superwise model observability dashboard gives you out-of-the-box visibility into model activity, drift, and open incidents. 
    "image_url": images/2_4.png
    "media_type": image
  - "caption": Superwise incidents let you drill into monitoring policy violations and identify root causes quickly.
    "image_url": images/3_4.png
    "media_type": image
  - "caption": With the monitoring policy builder, it is easy to configure policies across metrics, features, and subpopulations and send them to Datadog.
    "image_url": images/4_4.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/superwise-datadog-marketplace/"
  - "resource_type": documentation
    "url": "https://docs.superwise.ai"
  "support": "README.md#Support"
  "title": Superwise Model Observability
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
Superwise helps businesses monitor Machine Learning (ML) model health in production to quickly detect issues with model performance and integrity across the inference stream. Superwise auto-calibrates model metrics, analyzes events, and correlates anomalies so ML engineering teams and practitioners can easily see where, when, and why models are misbehaving and accelerate time to resolution before issues impact business outcomes.


The Superwise model observability platform lets you monitor your production ML at any scale. When you purchase a subscription to Superwise through the Datadog Marketplace, you'll receive a 14 day free trial for an unlimited amount of models. After the trial expires, your first 3 models are free forever, and you can scale your monitoring up or down with Superwise's usage-based pricing at any time. For more information, contact [sales@superwise.ai][1].

On this tile, you can purchase a subscription to Superwise. If you already have a Superwise account, click on the [Superwise Integration tile][2] to set up the Superwise Datadog integration.    

With the Superwise integration, Datadog users are able to monitor their ML models holistically within their existing Datadog workflow and enrich their observability to include Superwise metrics and incidents for more investigations of model issues. Superwise users can configure any custom metric that is important to the business to monitor within Superwise and send the information to Datadog to extend their observability for any use case. 

## Support

For support or feature requests, reach out to Superwise through the following channel:

- Email: [support@superwise.ai][3]

### Further Reading

- [Monitor model performance with Superwise’s offering in the Datadog Marketplace][4]
- [Superwise Documentation][5]

[1]: mailto:sales@superwise.ai
[2]: https://app.datadoghq.com/integrations/superwise
[3]: mailto:support@superwise.ai
[4]: https://www.datadoghq.com/blog/superwise-datadog-marketplace/
[5]: https://docs.superwise.ai
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/superwise-license" target="_blank">Click Here</a> to purchase this application.
