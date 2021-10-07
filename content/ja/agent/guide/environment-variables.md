---
title: Agent 環境変数
kind: ガイド
further_reading:
  - link: '/agent/docker/#environment-variables'
    tag: ドキュメント
    text: Docker Agent 環境変数
  - link: '/agent/docker/apm/#docker-apm-agent-environment-variables'
    tag: ドキュメント
    text: APM Agent 環境変数
  - link: '/logs/log_collection/#container-log-collection'
    tag: ドキュメント
    text: コンテナログの収集
  - link: '/agent/proxy/#environment-variables'
    tag: ドキュメント
    text: プロキシ環境変数
---
<div class="alert alert-warning">
Agent v5 の場合は、<a href="https://github.com/DataDog/docker-dd-agent#environment-variables">Docker Agent GitHub リポジトリ</a>を参照してください。
</div>

## 概要

Agent v6 の場合、[Agent のメイン構成ファイル][1]（`datadog.yaml`）の構成オプションのほとんどは、環境変数を介して設定できます。

## 推奨事項

Datadog では、タグを付ける際のベストプラクティスとして、統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][2]ドキュメントをご参照ください。

## 一般的な使用

一般に、次のルールを使用します。

* オプション名は、大文字で `DD_` プレフィックスを付ける必要があります: `hostname` -> `DD_HOSTNAME`

* リストの値はスペース区切りにします（包含ルールは正規表現をサポートし、カンマ区切り文字列のリストとして定義されます）。
   ```yaml
      container_include:
        - "image:cp-kafka"
        - "image:k8szk"
      # DD_CONTAINER_INCLUDE="image:cp-kafka image:k8szk"
   ```

* **事前定義**キーを使用した構成オプションのネストは、アンダースコアで区切る必要があります。
   ```yaml
      cluster_agent:
        cmd_port: 5005
      # DD_CLUSTER_AGENT_CMD_PORT=5005
   ```

* **ユーザー定義**キーを使用した構成オプションのネストは、JSON 形式である必要があります。
   ```yaml
      docker_env_as_tags:
        ENVVAR_NAME: tag_name
      # DD_DOCKER_ENV_AS_TAGS='{"ENVVAR_NAME": "tag_name"}'
   ```

**注**: 環境変数を使用してネストされたオプションを指定すると、構成オプションで指定されたネストされたオプションが _すべて_ 上書きされます。このルールの例外は `proxy` 構成オプションです。詳細については、[Agent プロキシのドキュメント][3]を参照してください。

### 例外

- すべての `datadog.yaml` オプションが環境変数で使用できるわけではありません。Datadog Agent GitHub リポジトリの [config.go][4] を参照してください。環境変数を持つオプションは、`config.BindEnv*` で始まります。

- [config.go][4] にリストアップされていない、コンポーネント固有の環境変数もサポートされる場合があります。

  - **APM Trace Agent**

      - [Docker APM Agent の環境変数][5]
      - [trace-agent env.go][6]
      - 例

          ```yaml
             apm_config:
                 enabled: true
                 env: dev
             # DD_APM_ENABLED=true
             # DD_APM_ENV=dev
          ```

  - **ライブプロセスエージェント**

      - [process-agent config.go][7]
      - 例

          ```yaml
             process_config:
                 enabled: true
                 process_dd_url: https://process.datadoghq.com
             # DD_PROCESS_AGENT_ENABLED=true
             # DD_PROCESS_AGENT_URL=https://process.datadoghq.com
          ```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/agent/proxy/#environment-variables
[4]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config.go
[5]: https://docs.datadoghq.com/ja/agent/docker/apm/#docker-apm-agent-environment-variables
[6]: https://github.com/DataDog/datadog-agent/blob/master/pkg/trace/config/env_test.go
[7]: https://github.com/DataDog/datadog-agent/blob/master/pkg/process/config/config.go