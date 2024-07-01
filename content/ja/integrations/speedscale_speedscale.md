---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "speedscale-speedscale"
"app_uuid": "beb5efb1-63d5-4030-840d-7dbf6a92a4d6"
"assets": {}
"author":
  "homepage": "https://speedscale.com"
  "name": Speedscale
  "sales_email": datadog-sales@speedscale.com
  "support_email": support@speedscale.com
  "vendor_id": speedscale
"categories":
- containers
- kubernetes
- marketplace
- testing
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "speedscale_speedscale"
"integration_id": "speedscale-speedscale"
"integration_title": "Speedscale"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "speedscale_speedscale"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": software-license
  "short_description": Monthly fee for access to Speedscale Pro, up to 100 replays and 10GB traffic
  "unit_price": !!int "999"
"public_title": "Speedscale"
"short_description": "Traffic Replay Platform for Kubernetes Load Testing"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Marketplace"
  - "Category::Testing"
  - "Offering::Software License"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Traffic Replay Platform for Kubernetes Load Testing
  "media":
  - "caption": Speedscale traffic capture
    "image_url": images/spd-1-traffic-capture.png
    "media_type": image
  - "caption": Speedscale replay report
    "image_url": images/spd-2-report.png
    "media_type": image
  - "caption": Speedscale integration with Datadog dashboard
    "image_url": images/spd-3-datadog-dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/stress-test-kubernetes-with-speedscale/"
  - "resource_type": documentation
    "url": "https://docs.speedscale.com/"
  "support": "README.md#Support"
  "title": Speedscale
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
Many businesses struggle to discover problems with their cloud services before they impact customers. For developers, writing tests is manual and time-intensive. Speedscale helps Kubernetes engineering and DevOps teams gain confidence in how new code will perform in real-world scenarios. Speedscale can collect and replay API traffic, simulate load or chaos, and measure latency, throughput, saturation, and errors before the code is released. Speedscale Traffic Replay is an alternative to legacy testing approaches which take days or weeks to run and do not scale well for modern architectures.

To publish traffic replay results from Speedscale into Datadog, install the [Speedscale Integration][1]. This integration lets you combine your observability data from Datadog with the results of a particular Speedscale replay to investigate the root cause of poor performance.

## Support

For support or feature requests, contact Speedscale through the following channels:

- Email: [support@speedscale.com][5]
- Slack: [Community][4]

### Further Reading

Additional helpful documentation, links, and articles:

- [Stress test your Kubernetes application with Speedscale’s offering in the Datadog Marketplace][6]
- [Speedscale Documentation][3]

[1]: /integrations/speedscale
[3]: https://docs.speedscale.com/
[4]: https://slack.speedscale.com/
[5]: mailto:support@speedscale.com
[6]: https://www.datadoghq.com/blog/stress-test-kubernetes-with-speedscale/
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/speedscale-speedscale" target="_blank">Click Here</a> to purchase this application.
