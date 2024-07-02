---
"app_id": "system"
"app_uuid": "b30c1062-d2cd-4fb7-be84-c144913b8266"
"assets":
  "integration":
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "system.disk.directory.file.bytes"
      "metadata_path": "metadata.csv"
      "prefix": "system."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_name": "Directory"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "os & system"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/directory/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "directory"
"integration_id": "システム"
"integration_title": "Directory"
"integration_version": "2.1.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "directory"
"public_title": "Directory"
"short_description": "The Directory integration reports metrics on files for a provided directory"
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
  - "Category::OS & System"
  "configuration": "README.md#Setup"
  "description": "The Directory integration reports metrics on files for a provided directory"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Directory"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Capture metrics from directories and files of your choosing. The Agent collects:

- Number of files
- File size
- Age of the last modification
- Age of the creation

## セットアップ

### インストール

The Directory check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your server.

### 構成

1. Edit the `directory.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][2] to start collecting Directory performance data. See the [sample directory.d/conf.yaml][3] for all available configuration options.

   ```yaml
   init_config:

   instances:
     ## @param directory - string - required
     ## The directory to monitor. On windows, please make sure you escape back-slashes otherwise the YAML
     ## parser fails (eg. - directory: "C:\\Users\\foo\\Downloads").
     #
     - directory: "<DIRECTORY_PATH>"
   ```

    Ensure that the user running the Agent process (usually `datadog-agent`) has read access to the directories, subdirectories, and files you configure.

    **Note**: On Windows when you add your directory, use double-backslashes `C:\\path\\to\\directory` instead of single-backslashes `C:\path\to\directory` for the check to run. Otherwise, the directory check fails with traceback ending in the error: `found unknown escape character in "<string>"`.

2. [Restart the Agent][4].

### Validation

[Run the Agent's status subcommand][5] and look for `directory` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "directory" >}}


### イベント

The Directory check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "directory" >}}


## トラブルシューティング

When running the check against very large directories and recursion is set to true, be aware that is an intensive operation on the I/O and CPU. The default check frequency, every 15 seconds, may need to be adjusted. 

For example, if there is a directory with 15,000 files and sub-directories, and the check runs 30-40 seconds with high CPU usage, if you do not set up less frequent check frequency, the check with high CPU runs effectively and continuously.

Need help? Contact [Datadog support][8].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/directory/datadog_checks/directory/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/directory/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/directory/assets/service_checks.json
[8]: https://docs.datadoghq.com/help/

