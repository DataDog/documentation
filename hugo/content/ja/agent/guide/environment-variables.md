---
description: datadog.yaml の代わりに環境変数を使用して、Datadog Agent の命名規則や systemd の使用法などの設定を行うことができます。
further_reading:
- link: /agent/docker/#environment-variables
  tag: ドキュメント
  text: Docker Agent の環境変数
- link: /agent/docker/apm/#docker-apm-agent-environment-variables
  tag: ドキュメント
  text: APM Agent の環境変数
- link: /logs/log_collection/#container-log-collection
  tag: ドキュメント
  text: コンテナのログ収集
- link: /agent/configuration/proxy/#environment-variables
  tag: ドキュメント
  text: プロキシの環境変数
title: Agent の環境変数
---
<div class="alert alert-danger">
Agent v5 については、<a href="https://github.com/DataDog/docker-dd-agent#environment-variables">Docker Agent GitHub リポジトリ</a>を参照してください。
</div>

## 概要{#overview}

Agent v6 の場合、[Agent のメイン設定ファイル][1] (`datadog.yaml`) にある設定オプションのほとんどは、環境変数を使用して設定できます。利用可能なすべての `datadog.yaml` 設定に関する詳しいコメント付きのリファレンスについては、Datadog Agent GitHub リポジトリにある [設定ファイルの例][15] を参照してください。

## 推奨事項{#recommendations}

ベストプラクティスとして、Datadog ではタグを割り当てる際に unified service tagging を使用することを推奨しています。unified service tagging は、`env`、`service`、`version`という 3 つの標準タグを使用して Datadog のテレメトリを関連付けます。unified service tagging を使用して環境を設定する方法については、[unified service tagging のドキュメント][2] を参照してください。

## 一般的な使用方法{#general-use}

概して以下のルールに従ってください。

* オプション名は `DD_` プレフィックス付きの大文字にします。例: `hostname` -> `DD_HOSTNAME`

* リスト値はスペースで区切ります (インクルードルールは正規表現をサポートしており、カンマ区切りの文字列リストとして定義されます)。例:
   ```yaml
      container_include:
        - "image:cp-kafka"
        - "image:k8szk"
      # DD_CONTAINER_INCLUDE="image:cp-kafka image:k8szk"
   ```

* キーが**事前定義**されている設定オプションをネストする場合は、各オプションをアンダースコアで区切ります。例:
   ```yaml
      cluster_agent:
        cmd_port: 5005
      # DD_CLUSTER_AGENT_CMD_PORT=5005
   ```

* **ユーザー定義**キーを使用する設定オプションをネストする場合は、JSON 形式にします。例:
   ```yaml
      container_env_as_tags:
        ENVVAR_NAME: tag_name
      # DD_CONTAINER_ENV_AS_TAGS='{"ENVVAR_NAME": "tag_name"}'
   ```

### プロパティ定義の優先順位 {#property-definition-priority}

- プロパティがグローバル設定ファイル (`datadog.yaml`) と環境変数の両方で定義されている場合は、環境変数が優先されます。
- 環境変数を使用するオプションをネストして指定すると、その設定オプションの内側にネストして指定された_すべて_のオプションが上書きされます。このルールの例外は、`proxy` 設定オプションです。詳細については、[Agent プロキシドキュメント][3] を参照してください。

### 例外 {#exceptions}

- `datadog.yaml` のすべてのオプションで環境変数を使用できるわけではありません。Datadog Agent GitHub リポジトリにある [core_schema.yaml][4] 設定スキーマを参照してください。スキーマ内で `no-env` のタグが付いている設定は、環境変数をサポートしていません。

  以前の Agent バージョンでは、設定ソースの場所が次のように変更されています。

  | Agent バージョン       | 設定ソース                                                          |
  | -------------------- | ------------------------------------------------------------------------------ |
  | 7.51 〜 7.83    | `*_settings.go`[7.83.x ブランチにある pkg/config/setup 内のファイル][13]        |
  | 7.50 以前     | [7.50.x ブランチにある config.go][9]                                            |

- [core_schema.yaml][4] に記載されていないコンポーネント固有の環境変数もサポートされていることがあります。

  | コンポーネント              | 設定ソース                        | Agent 7.51 ～ 7.83                                                | Agent 7.50 以前                              |
  | ----------------------- | -------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------- |
  | APM Trace Agent          | [apm_config.yaml][6]、[Docker APM Agent 環境変数][5] | `apm_settings.go` [7.83.x ブランチの pkg/config/setup][13] | `apm.go` [7.50.x ブランチの pkg/config][14]   |
  | Live Process Agent       | [process_config.yaml][7]                     | `process_settings.go` [7.83.x ブランチの pkg/config/setup][13] | `process.go` [7.50.x ブランチの pkg/config][14] |
  | OTLP Ingest              | [core_schema.yaml (otlp_config)][4]          | `otlp_settings.go` [7.83.x ブランチの pkg/config/setup][13] 内 | `otlp.go` [7.50.x ブランチの pkg/config][14] 内   |
  | System Probe             | [system-probe_schema.yaml][10]               | `system_probe_settings.go` [7.83.x ブランチの pkg/config/setup][13] | `system_probe.go` [7.50.x ブランチの pkg/config][14] |
  | Private Action Runner    | [private_action_runner.yaml][11]             | `privateactionrunner_settings.go` [7.83.x ブランチの pkg/config/setup][13] | 利用不可                                       |
  | Multi-Region Failover    | [multi_region_failover.yaml][12]             | `multi_region_failover_settings.go` [7.83.x ブランチの pkg/config/setup][13] | 利用不可                                       |

  APM Trace Agent の例:

  ```yaml
     apm_config:
         enabled: true
         env: dev
     # DD_APM_ENABLED=true
     # DD_APM_ENV=dev
  ```

  Live Process Agent の例:

  ```yaml
     process_config:
         process_collection:
             enabled: true
         process_dd_url: https://process.datadoghq.com
     # DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED=true
     # DD_PROCESS_AGENT_URL=https://process.datadoghq.com
  ```

## systemd ユニットでの環境変数の使用 {#using-environment-variables-in-systemd-units}

systemd を使用してサービスを管理するオペレーティングシステムでは、環境変数 (グローバル (`/etc/environment` など) やセッションベース (`export VAR=value` など) が設定されていない限り、通常はサービスで利用できません。詳細については、[systemd Exec のマニュアルページ][8] を参照してください。

Datadog Agent 7.45 以降、Datadog Agent サービス (`datadog-agent.service` ユニット) は、オプションでファイル (`<ETC_DIR>/environment`) から環境変数の割り当てを読み込むことができます。

1. `/etc/datadog-agent/environment` が存在しない場合は作成します。
2. 環境変数の割り当てを改行で区切って定義します。例:
  ```
  GODEBUG=x509ignoreCN=0,x509sha1=1
  DD_HOSTNAME=myhost.local
  DD_TAGS=env:dev service:foo
  ```
3. 変更を反映させるためにサービスを再起動します。

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/agent/configuration/proxy/#environment-variables
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/core_schema.yaml
[5]: https://docs.datadoghq.com/ja/agent/docker/apm/#docker-apm-agent-environment-variables
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/apm_config.yaml
[7]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/process_config.yaml
[8]: https://www.freedesktop.org/software/systemd/man/systemd.exec.html#Environment
[9]: https://github.com/DataDog/datadog-agent/blob/7.50.x/pkg/config/config.go
[10]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/system-probe_schema.yaml
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/private_action_runner.yaml
[12]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/multi_region_failover.yaml
[13]: https://github.com/DataDog/datadog-agent/tree/7.83.x/pkg/config/setup
[14]: https://github.com/DataDog/datadog-agent/tree/7.50.x/pkg/config
[15]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example