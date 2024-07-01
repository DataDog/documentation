---
"app_id": "convox"
"app_uuid": "4476973b-6e79-4861-a321-7e24e581873b"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": "metadata.csv"
      "prefix": "convox."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10006"
    "source_type_name": "Convox"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Convox"
  "sales_email": "help@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "configuration & deployment"
- "containers"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/convox/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "convox"
"integration_id": "convox"
"integration_title": "Convox"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "convox"
"public_title": "Convox"
"short_description": "Convox is an open-source PaaS designed for total privacy and zero upkeep."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Configuration & Deployment"
  - "Category::Containers"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Convox is an open-source PaaS designed for total privacy and zero upkeep."
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitor-aws-ecs-convox-integration/"
  "support": "README.md#Support"
  "title": "Convox"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from Convox in real time to visualize your containers' performance.

![Convox integration dashboard widget][1]

## Setup

See the [Convox documentation][2] to set up the Datadog integration.

### Deploy the Datadog Agent

You can deploy the Datadog Agent as a Convox app by using a `docker-compose.yml` manifest. Use a `count` that matches the `InstanceCount` parameter of your Rack.

```shell
# check out the repo
$ git clone https://github.com/convox-examples/datadog.git
$ cd dd-agent

# deploy the agent app and secret
$ convox apps create
$ convox env set DD_API_KEY=<your api key>
$ convox deploy
$ convox scale agent --count=3 --cpu=10 --memory=128
```

Run `convox deploy` to deploy Datadog Agent into ECS.

### Auto scaling

If autoscaling is enabled on your Rack, you need to dynamically scale the Datadog Agent count to match the Rack instance count.

For more information, see the [Listening for ECS CloudWatch Events][3] tutorial.

## Data Collected

### Metrics

The Convox integration does not include any metrics.

### Events

The Convox integration does not include any events.

### Service Checks

The Convox integration does not include any service checks.

## Troubleshooting

When configuring environment variables in the `convox.yml` file, the `environment` parameter must be defined on the same level as the `services` parameter.

![The Environment and Services parameters defined on the same level][4]

Need help? Contact [Datadog support][5].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor your AWS ECS platform with Convox and Datadog][6]

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/convox/images/snapshot.png
[2]: https://docs.convox.com/integrations/monitoring/datadog
[3]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_cwet.html
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/convox/images/setting_environment_variables.png
[5]: https://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/monitor-aws-ecs-convox-integration/

