---
app_id: vault
app_uuid: 450e17a2-3ca0-4dc5-800c-99c5db736073
assets:
  dashboards:
    Vault - Overview: assets/dashboards/vault_overview_legacy.json
    Vault - Overview (OpenMetricsV2): assets/dashboards/vault_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: vault.is_leader
      metadata_path: metadata.csv
      prefix: vault.
    process_signatures:
    - vault server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10059
    source_type_name: Vault
  logs:
    source: vault
  monitors:
    '[Vault] S3 time to access secrets is high': assets/monitors/vault_S3_time_high.json
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    service_name_overview: assets/saved_views/service_name_overview.json
    vault_patern: assets/saved_views/vault_patern.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/vault/README.md
display_on_public_website: true
draft: false
git_integration_title: vault
integration_id: vault
integration_title: Vault
integration_version: 4.1.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: vault
public_title: Vault
short_description: Vault は機密情報管理サービスアプリケーション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Vault は機密情報管理サービスアプリケーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Vault
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、[Vault][1] クラスターの健全性とリーダーの変更を監視します。

## 計画と使用

### インフラストラクチャーリスト

Vault チェックは [Datadog Agent][2] パッケージに含まれています。


バージョン 3.4.0 以降、この OpenMetrics ベースのインテグレーションには、*最新*モード (`use_openmetrics`: true) と*レガシー*モード (`use_openmetrics`: false) があります。すべての最新機能を利用するために、Datadog は最新モードを有効にすることを推奨します。*最新*モードには Python 3 が必要です。詳しくは、[OpenMetrics ベースのインテグレーションにおける最新バージョニングとレガシーバージョニング][3]を参照してください。

1. [Vault 構成で Prometheus メトリクス][4]が有効になっていることを確認します。


2. Vault チェックが正しく機能するには、Vault メトリクスへの未認証アクセスを有効にする (Vault バージョン 1.3.0 以降を使用) か、Vault クライアントトークンを提供する必要があります。

   * 未認証アクセスを有効にするには、Vault の [`unauthenticated_metrics_access`][5] 構成を `true` に設定します。これにより、`/v1/sys/metrics` エンドポイントへの未認証アクセスが許可されます。

     **注**: `/sys/metrics` エンドポイントでメトリクスを収集するには Vault v1.1.0 以降が必要です。

   * Vault クライアントトークンを使用するには、以下の例を参照してください。JWT 認証方法を使用した例ですが、追加の[認証方法][6]を使用することもできます。

Vault インテグレーションには以下の機能が必要です。

* `metrics_policy.hcl` のコンテンツ:

  ```text
  path "sys/metrics*" {
    capabilities = ["read", "list"]
  }
  ```

* セットアップポリシーとロール:

  ```text
  $ vault policy write metrics /path/to/metrics_policy.hcl
  $ vault auth enable jwt
  $ vault write auth/jwt/config jwt_supported_algs=RS256 jwt_validation_pubkeys=@<PATH_TO_PUBLIC_PEM>
  $ vault write auth/jwt/role/datadog role_type=jwt bound_audiences=<AUDIENCE> user_claim=name token_policies=metrics
  $ vault agent -config=/path/to/agent_config.hcl
  ```

* `agent_config.hcl` のコンテンツ:

  ```
  exit_after_auth = true
  pid_file = "/tmp/agent_pid"

  auto_auth {
    method "jwt" {
      config = {
        path = "<JWT_CLAIM_PATH>"
        role = "datadog"
      }
    }

    sink "file" {
      config = {
        path = "<CLIENT_TOKEN_PATH>"
      }
    }
  }

  vault {
    address = "http://0.0.0.0:8200"
  }
  ```

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

1. vault のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `vault.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル vault.d/conf.yaml][2] を参照してください。

   トークンなしでインテグレーションを実行するための構成 (Vault 構成 `unauthenticated_metrics_access` が true に設定されている場合):

    ```yaml
    init_config:

    instances:
        ## @param api_url - string - required
        ## URL of the Vault to query.
        #
      - api_url: http://localhost:8200/v1

        ## @param no_token - boolean - optional - default: false
        ## Attempt metric collection without a token.
        #
        no_token: true
    ```

   クライアントトークンとのインテグレーションを実行するためのコンフィギュレーション:

    ```yaml
    init_config:

    instances:
        ## @param api_url - string - required
        ## URL of the Vault to query.
        #
      - api_url: http://localhost:8200/v1

        ## @param client_token - string - optional
        ## Client token necessary to collect metrics.
        #
        client_token: <CLIENT_TOKEN>

        ## @param client_token_path - string - optional
        ## Path to a file containing the client token. Overrides `client_token`.
        ## The token will be re-read after every authorization error.
        #
        # client_token_path: <CLIENT_TOKEN_PATH>
    ```

2. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/vault/datadog_checks/vault/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                    |
| -------------------- | ---------------------------------------- |
| `<INTEGRATION_NAME>` | `vault`                                  |
| `<INIT_CONFIG>`      | 空白または `{}`                            |
| `<INSTANCE_CONFIG>`  | `{"api_url": "http://%%host%%:8200/v1"}` |

Vault の認証コンフィギュレーションに応じて、`INSTANCE_CONFIG` をカスタマイズする必要があります。上記のホストセクションの例を参照してください。

#### 収集データ

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Vault を構成し、監査とサーバーログを有効にします。

   - 監査ログは、適切なポリシーを持つ特権ユーザーが有効にする必要があります。詳細は、[監査デバイスの有効化][2]を参照してください。

     ```shell
     vault audit enable file file_path=/vault/vault-audit.log
     ```

   - [サーバーログ][3]がファイルに必ず書き込まれるようにしてください。[Vault systemd 起動スクリプト][4]で静的サーバーログを構成することができます。
     以下のスクリプトは、`/var/log/vault.log`へログを出力します。

     ```text
     ...
     [Service]
     ...
     ExecStart=/bin/sh -c '/home/vagrant/bin/vault server -config=/home/vagrant/vault_nano/config/vault -log-level="trace" > /var/log/vault.log
     ...
     ```

3. 次の構成ブロックを `vault.d/conf.yaml` ファイルに追加し、Vault ログの収集を始めます。

   ```yaml
   logs:
     - type: file
       path: /vault/vault-audit.log
       source: vault
       service: "<SERVICE_NAME>"
     - type: file
       path: /var/log/vault.log
       source: vault
       service: "<SERVICE_NAME>"
   ```

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://learn.hashicorp.com/vault/operations/troubleshooting-vault#enabling-audit-devices
[3]: https://learn.hashicorp.com/vault/operations/troubleshooting-vault#vault-server-logs
[4]: https://learn.hashicorp.com/vault/operations/troubleshooting-vault#not-finding-the-server-logs
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションで `vault` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "vault" >}}



[`vault.replication.fetchRemoteKeys`、`vault.replication.merkleDiff`、`vault.replication.merkleSync` で始まるメトリクス]は、レプリケーションが不健全状態でなければ報告されません。

### ヘルプ

`vault.leader_change`:
このイベントは、クラスターリーダーが変更されると発生します。

### ヘルプ
{{< get-service-checks-from-git "vault" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した HashiCorp Vault の監視][9]
- [HashiCorp Vault のメトリクスおよびログの監視][10]
- [HashiCorp Vault 監視用ツール][11]
- [Datadog を使用した HashiCorp Vault の監視方法][12]


[1]: https://www.vaultproject.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/integrations/guide/versions-for-openmetrics-based-integrations
[4]: https://www.vaultproject.io/docs/configuration/telemetry#prometheus
[5]: https://www.vaultproject.io/docs/configuration/listener/tcp#unauthenticated_metrics_access
[6]: https://www.vaultproject.io/docs/auth
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://www.datadoghq.com/blog/monitor-hashicorp-vault-with-datadog
[10]: https://www.datadoghq.com/blog/monitor-vault-metrics-and-logs/
[11]: https://www.datadoghq.com/blog/vault-monitoring-tools
[12]: https://www.datadoghq.com/blog/vault-monitoring-with-datadog