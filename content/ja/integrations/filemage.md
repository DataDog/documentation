---
"app_id": "filemage"
"app_uuid": "e8ffcc16-9430-4d73-8e01-4e135a872384"
"assets":
  "dashboards":
    "Filemage Overview Dashboard": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": filemage.ftp.get
      "metadata_path": metadata.csv
      "prefix": filemage.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10319"
    "source_type_name": filemage
  "logs":
    "source": filemage
"author":
  "homepage": "https://dopensource.com/"
  "name": Community
  "sales_email": info@dopensource.com
  "support_email": tmoore@dopensource.com
"categories":
- cloud
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/filemage/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "filemage"
"integration_id": "filemage"
"integration_title": "FileMage"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "filemage"
"public_title": "FileMage"
"short_description": "Monitoring Agent for FileMage services"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitoring Agent for FileMage services
  "media":
  - "caption": Carousel Logo
    "image_url": images/carousel-logo.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": FileMage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [FileMage][1].

## セットアップ

### Installing the package

For the Datadog Agent v7.21 or v6.21 and later, follow these instructions to install the Filemage integration on your host.  
See [Use Community Integrations][2] to install it with the Docker Agent or earlier versions of the Datadog Agent.  

1. Run the following command to install the Agent integration:

```shell
datadog-agent integration install -t datadog-filemage==1.0.0
```

2. Configure your integration similar to an Agent-based [integration][3].

### 構成

1. Edit the `filemage.d/conf.yaml.example` file in the `conf.d/` folder at the root of your [Agent Configuration Directory][4] to start collecting your FileMage [metrics](#metrics).  
   Once complete, save the modified file as `filemage.d/conf.yaml`.  
   See the [sample filemage conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

Run the [Agent's `status` subcommand][7] and look for `filemage` under the Running Checks section.


```text
...

  Running Checks
  ==============

    ...

    filemage (1.0.0)
    ----------------
      Instance ID: filemage:ac55127bf7bd70b9 [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/filemage.d/conf.yaml
      Total Runs: 1,298
      Metric Samples: Last Run: 0, Total: 0
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 2, Total: 2,594
      Average Execution Time : 41ms
      Last Execution Date : 2022-11-23 15:59:22 EST / 2022-11-23 20:59:22 UTC (1669237162000)
      Last Successful Execution Date : 2022-11-23 15:59:22 EST / 2022-11-23 20:59:22 UTC (1669237162000)
```


## 収集データ

This integration tracks the number of times each FTP command is run.

### メトリクス
{{< get-metrics-from-git "filemage" >}}


### イベント

The FileMage integration does not include any events.

## トラブルシューティング

Need help? Contact [dOpenSource][10].


[1]: https://www.filemage.io/
[2]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/getting_started/integrations/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/filemage/datadog_checks/filemage/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/filemage/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/filemage/assets/service_checks.json
[10]: https://dopensource.com/

