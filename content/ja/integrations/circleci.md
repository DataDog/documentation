---
"app_id": "circleci"
"app_uuid": "042c421c-c655-4034-9b2f-c2c09faf0800"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - circleci.finished_builds.count
      "metadata_path": metadata.csv
      "prefix": circleci
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "213"
    "source_type_name": CircleCI
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- metrics
- configuration & deployment
- automation
- developer tools
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "circleci"
"integration_id": "circleci"
"integration_title": "CircleCI"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "circleci"
"public_title": "CircleCI"
"short_description": "CircleCI's platform makes it easy to rapidly build and release quality software."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Metrics"
  - "Category::Configuration & Deployment"
  - "Category::Automation"
  - "Category::Developer Tools"
  "configuration": "README.md#Setup"
  "description": CircleCI's platform makes it easy to rapidly build and release quality software.
  "media":
  - "caption": Synthetics
    "image_url": images/circleci_synthetics.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/circleci-monitoring-datadog/"
  "support": "README.md#Support"
  "title": CircleCI
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Connect to CircleCI to:

- Visualize key CircleCI metrics such as the number of finished builds or the average build time.
- Analyze data (such as splitting builds by job name or repository) using Datadog's tag system.
- View orb workflow data in Synthetics
- Collect and ingest CircleCI job logs into DataDog

## Setup

### Installation

You can install the CircleCI integration with its [integration tile][1].

### Configuration

1. In your CircleCI settings, go to Personal API Tokens and enter the generated key in the form. The name does not need to be the same as the CircleCI label, but it has to be unique.
2. Filter the repositories using an expression such as "Organization/repo*name", "Organization/repo*\*" or "Organization/\*". **The filtering is made on the list of tracked projects, which must be set up on the CircleCI side.**
3. Specify the appropriate version control system and reference the appropriate API key.
4. If you enable log collection for a repo, you must make sure that its pipelines are being sent to DataDog CI Visibility.
   Follow the instructions in [Set up Tracing on a CircleCI Workflow][2].

Multiple API tokens can be set, and multiple projects can be tracked for one given token. Users must be set as contributors for a particular repo in order to see that repo's information in Datadog.

## Data Collected

### Metrics
{{< get-metrics-from-git "circleci" >}}


### Events

The CircleCI integration does not include any events.

### Service Checks

The CircleCI integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][4].

## Further reading

- [Monitor your CircleCI environment with Datadog][5]

[1]: https://app.datadoghq.com/integrations/circleci
[2]: https://docs.datadoghq.com/continuous_integration/pipelines/circleci/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/circleci/circleci_metadata.csv
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/circleci-monitoring-datadog/

