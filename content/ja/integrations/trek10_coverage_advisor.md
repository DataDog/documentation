---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "trek10-coverage-advisor"
"app_uuid": "2faacd70-a192-4a28-8b36-e55298d7b3b4"
"assets":
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": trek10.coverage.aws_metric_count
      "metadata_path": metadata.csv
      "prefix": trek10.coverage
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10114"
    "source_type_name": Trek10 AWS Coverage Advisor
  "monitors":
    "Trek10 AWS Coverage Advisor - New Unmonited Metric Available": assets/monitors/monitor_new.json
    "Trek10 AWS Coverage Advisor - New Unmonitored Metric Discovered": assets/monitors/monitor_existing.json
"author":
  "homepage": "https://www.trek10.com"
  "name": Trek10
  "sales_email": signup-trek10-coverage-advisor@trek10.com
  "support_email": trek10-coverage-advisor@trek10.com
  "vendor_id": trek10
"categories":
- marketplace
- aws
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "trek10_coverage_advisor"
"integration_id": "trek10-coverage-advisor"
"integration_title": "Trek10 AWS Coverage Advisor"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "trek10_coverage_advisor"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": coverage-advisor
  "short_description": Flat fee for Trek10 AWS Coverage Advisor
  "unit_price": !!int "100"
"public_title": "Trek10 AWS Coverage Advisor"
"short_description": "Checks over 120 AWS metrics for coverage gaps"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Marketplace"
  - "Category::AWS"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Events"
  "configuration": "README.md#Setup"
  "description": Checks over 120 AWS metrics for coverage gaps
  "media":
  - "caption": Trek10 Dashboard
    "image_url": images/1600px-900px_maindashview_trek10_DDG_image.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Trek10 AWS Coverage Advisor
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
Coverage Advisor monitors critical AWS CloudWatch metrics in your Datadog account. It is built on Trek10’s continuously updated database of monitoring recommendations, based on our years of experience running cloud native operations with Datadog and AWS. With a coverage report, dashboard, and alerts for new recommendations, you are able to keep monitors up to date with your AWS infrastructure as it evolves.

After signup, this integration copies a dashboard into your Datadog account and exposes two event monitors on the Datadog recommended monitors page.

The dashboard shows a view of your Datadog's account monitoring status and lets you generate a report for monitored and unmonitored metrics. The first event monitor alerts you when Trek10 discovers new important AWS CloudWatch metrics without corresponding monitors. The second event monitor informs you of new CloudWatch metrics added to our recommendations list that matches AWS services you use.



*Have a specific request for this Datadog tool, looking for 24/7 managed services for AWS with a platform built on Datadog, or need expertise on AWS or Datadog? Reach out to our sales team [sales team](https://trek10.com/contact) and let us explore how we can help you*

### Metrics
* Trek10 will push a metric nightly, trek10.coverage.aws_metric_count, that can be used to see how many metrics are currently being ingested into your Datadog account that don't have monitors for them. The metric will have the tag `metric_type` that can be filtered down to the values `all_metrics`, `metrics_monitored`, and `monitoring_recommendations`. 


### Events
* Trek10 also pushes events when we find unmonitored services. The event will link you back to the primary dashboard so you can see recent recommendations as well generate a report.


### Monitors
* Trek10 provides two monitors to alert you when you have unmonitored services.

### Dashboards
* Trek10 provides a centralized, high level, dashboard that allows you to see a count of unmonitored metrics, see recent recommendations, generate a PDF report of all recommendations, and control whether the integration checks your account nightly for new recommendations.

### Usage
The main use of this integration is to allow you to quickly see which AWS metrics you have in your account that you don't have corresponding monitors for. You can check in on the dashboard weekly and generate a report, or you can set up monitors to alert you daily if you would rather be notified that way. 

### Vendor Information
* Trek10 
* Bio: We are technical gurus and builders at heart. Long time users of AWS and Datadog we have helped numerous companies in their adoptions of both with professional service and training engagements. We primarily use Datadog as a tool in our managed services for AWS. We took an internal tool that lets us know when we need to add monitors to one of our client's accounts and modified it for your use.
* website: trek10.com

## Support
* We will clone over the dashboard & monitor into your account on setup. We will use the API key provided at setup - if you rotate the API key given please reach out to us at trek10-coverage-advisor@trek10.com. Similarly, if you experience any issues or questions about the integration please open a ticket by emailing trek10-coverage-advisor@trek10.com (and following emailed instructions).
* We are also happy to help answer any questions regarding AWS operations, monitoring, and development - just reach us at:
    * email (support): trek10-coverage-advisor@trek10.com
    * email (other questions): info@trek10.com
    * website: https://www.trek10.com/contact








---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/trek10-coverage-advisor" target="_blank">Click Here</a> to purchase this application.
