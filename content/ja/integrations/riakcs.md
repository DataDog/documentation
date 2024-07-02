---
"app_id": "riak-cs"
"app_uuid": "29e6a2b4-7f3a-4243-8e10-d065147c3da0"
"assets":
  "dashboards":
    "riakcs": "assets/dashboards/riakcs_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "riakcs.bucket_list_pool.workers"
      "metadata_path": "metadata.csv"
      "prefix": "riakcs."
    "process_signatures":
    - "riak-cs start"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "110"
    "source_type_name": "RiakCS"
  "saved_views":
    "riak-cs_processes": "assets/saved_views/riak-cs_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "data stores"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/riakcs/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "riakcs"
"integration_id": "riak-cs"
"integration_title": "Riak CS"
"integration_version": "2.11.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "riakcs"
"public_title": "Riak CS"
"short_description": "Track the rate and mean latency of GETs, PUTs, DELETEs, and other operations."
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  "configuration": "README.md#Setup"
  "description": "Track the rate and mean latency of GETs, PUTs, DELETEs, and other operations."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Riak CS"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![RiakCS Dashboard][1]

## Overview

Capture RiakCS metrics in Datadog to:

- Visualize key RiakCS metrics.
- Correlate RiakCS performance with the rest of your applications.

## セットアップ

### インストール

The RiakCS check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your RiakCS nodes.

### 構成

1. Edit the `riakcs.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][3]. See the [sample riakcs.d/conf.yaml][4] for all available configuration options:

   ```yaml
   init_config:

   instances:
     ## @param access_id - string - required
     ## Enter you RiakCS access key.
     #
     - access_id: "<ACCESS_KEY>"

       ## @param access_secret - string - required
       ## Enter the corresponding RiakCS access secret.
       #
       access_secret: "<ACCESS_SECRET>"
   ```

2. [Restart the Agent][5].

### Validation

[Run the Agent's `status` subcommand][6] and look for `riakcs` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "riakcs" >}}
 includes most S3 API metrics as well as memory stats. Some have been excluded:

- bucket*acl*(get|put)
- object*acl*(get|put)
- bucket*policy*(get|put|delete)
- _in_(one|total)
- _time_error_\*
- \_time_100

Any of the excluded metrics or additional metrics (1000+) can be added to the `riakcs.d/conf.yaml` configuration file with the `metrics` key in the `instance_config`. The value should be a list of metric names.

See the [complete list of available metrics][8].

### イベント

The RiakCS check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "riakcs" >}}


## トラブルシューティング

Need help? Contact [Datadog support][10].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor Riak CS performance and availability][11]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/riakcs/images/riakcs_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/riakcs/datadog_checks/riakcs/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/riakcs/metadata.csv
[8]: https://github.com/basho/riak_cs/wiki/Riak-cs-and-stanchion-metrics
[9]: https://github.com/DataDog/integrations-core/blob/master/riakcs/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/
[11]: https://www.datadoghq.com/blog/monitor-riak-cs-performance-and-availability

