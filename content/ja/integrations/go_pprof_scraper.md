---
"app_id": "go-pprof-scraper"
"app_uuid": "2b13f6b1-d3ba-4254-93c0-2ceaf783cd85"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10309"
    "source_type_name": go_pprof_scraper
"author":
  "homepage": "https://www.datadoghq.com"
  "name": コミュニティ
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories": []
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "go_pprof_scraper"
"integration_id": "go-pprof-scraper"
"integration_title": "Go pprof scraper"
"integration_version": "1.0.4"
"is_public": true
"manifest_version": "2.0.0"
"name": "go_pprof_scraper"
"public_title": "Go pprof scraper"
"short_description": "Collect profiles from Go programs via the /debug/pprof endpoint"
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
  "configuration": "README.md#Setup"
  "description": Collect profiles from Go programs via the /debug/pprof endpoint
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Go pprof scraper
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check collects profiles from Go applications which expose the [`/debug/pprof`][1] endpoint.

**NOTE**: Prefer instrumenting services with the [dd-trace-go][2] profiling client library. The client library
offers better integration with other Datadog services, such as through [code hotspots and endpoint filtering][3].
Use this integration for services for which you do not control the source code.

**NOTE**: Using this integration results in billing for hosts under Datadog's [Continuous Profiler][4] service.
For more on Continuous Profiler billing, consult our [billing documentation][5].

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][6] for guidance on applying these instructions.

### インストール

If you are using an Agent version >= 7.21/6.21, follow the instructions below to install the `go_pprof_scraper` check on your host. See the dedicated Agent guide for [installing community integrations][7] to install checks with an [Agent version < v7.21/v6.21][8] or the [Docker Agent][9]:

1. [Download and launch the Datadog Agent][10].
2. Run the following command to install the integrations wheel with the Agent:

   ```shell
   datadog-agent integration install -t datadog-go-pprof-scraper==<INTEGRATION_VERSION>
   ```
  You can find the latest version on the [Datadog Integrations Release Page][11]

   **Note**: If necessary, prepend `sudo -u dd-agent` to the install command.

### 構成

1. Edit the `go_pprof_scraper.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Go performance data. See the [sample go_pprof_scraper.d/conf.yaml][12] for all available configuration options.

2. [Restart the Agent][13].

### Validation

[Run the Agent's status subcommand][14] and look for `go_pprof_scraper` under the Checks section.

## 収集データ

### メトリクス

The Go-pprof-scraper integration does not create any metrics.

### イベント

The Go-pprof-scraper integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "go_pprof_scraper" >}}


## トラブルシューティング

Need help? Contact [Datadog support][16].


[1]: https://pkg.go.dev/net/http/pprof
[2]: https://docs.datadoghq.com/profiler/enabling/go/
[3]: https://docs.datadoghq.com/profiler/connect_traces_and_profiles/
[4]: https://docs.datadoghq.com/profiler/
[5]: https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/
[6]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=agentv721v621
[8]: https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=agentearlierversions
[9]: https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=docker
[10]: https://app.datadoghq.com/account/settings/agent/latest
[11]: https://github.com/DataDog/integrations-extras/tags
[12]: https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/datadog_checks/go_pprof_scraper/data/conf.yaml.example
[13]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[14]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[15]: https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/assets/service_checks.json
[16]: https://docs.datadoghq.com/help/

