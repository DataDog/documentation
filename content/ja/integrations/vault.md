---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Vault - Overview: assets/dashboards/vault_overview.json
  logs:
    source: vault
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    service_name_overview: assets/saved_views/service_name_overview.json
    vault_patern: assets/saved_views/vault_patern.json
  service_checks: assets/service_checks.json
categories:
  - security
  - 構成 & デプロイ
  - ログの収集
  - オートディスカバリー
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/vault/README.md'
display_name: Vault
draft: false
git_integration_title: vault
guid: d65af827-c818-44ce-9ec3-cd7ead3ac4ce
integration_id: vault
integration_title: Vault
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: vault.
metric_to_check: vault.is_leader
name: vault
public_title: Datadog-Vault インテグレーション
short_description: Vault は機密情報管理サービスアプリケーション
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、[Vault][1] クラスターの健全性とリーダーの変更を監視します。

## セットアップ

### インストール

Vault チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

#### 前提条件

1. [Vault コンフィギュレーションで Prometheus メトリクス][3]が有効になっていることを確認します。

2. Vault チェックが正しく機能するには、Vault メトリクスへの未認証アクセスを有効にするか、Vault クライアントトークンを指定する必要があります。

   **未認証アクセスを有効にするには**、Vault の [`unauthenticated_metrics_access`][4] コンフィギュレーションを `true` に設定します。これにより、`/v1/sys/metrics` エンドポイントへの未認証アクセスが許可されます。

     **注**: `/sys/metrics` エンドポイントでメトリクスを収集するには Vault v1.1.0 以降が必要です。

    **Vault クライアントトークンを使用するには**、以下の例を参照してください。JWT 認証方法を使用した例ですが、他の[認証方法][5]を使用することもできます。

Vault インテグレーションには以下の機能が必要です。

     `metrics_policy.hcl` のコンテンツ:
   ```text
   path "sys/metrics*" {
     capabilities = ["read", "list"]
   }
   ```

      セットアップポリシーとロール:

   ```text
   $ vault policy write metrics /path/to/metrics_policy.hcl
   $ vault auth enable jwt
   $ vault write auth/jwt/config jwt_supported_algs=RS256 jwt_validation_pubkeys=@<PATH_TO_PUBLIC_PEM>
   $ vault write auth/jwt/role/datadog role_type=jwt bound_audiences=<AUDIENCE> user_claim=name token_policies=metrics
   $ vault agent -config=/path/to/agent_config.hcl
   ```

   `agent_config.hcl` のコンテンツ:
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

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. vault のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `vault.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル vault.d/conf.yaml][2] を参照してください。

   トークンなしでインテグレーションを実行するためのコンフィギュレーション (vault コンフィギュレーション `unauthenticated_metrics_access` が true に設定されている場合):

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
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                    |
| -------------------- | ---------------------------------------- |
| `<インテグレーション名>` | `vault`                                  |
| `<初期コンフィギュレーション>`      | 空白または `{}`                            |
| `<インスタンスコンフィギュレーション>`  | `{"api_url": "http://%%host%%:8200/v1"}` |

Vault の認証コンフィギュレーションに応じて、`INSTANCE_CONFIG` をカスタマイズする必要があります。上記のホストセクションの例を参照してください。

#### ログの収集

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

[Agent の status サブコマンドを実行][6]し、Checks セクションで `vault` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "vault" >}}


### イベント

`vault.leader_change`:
このイベントは、クラスターリーダーが変更されると発生します。

### サービスのチェック

**vault.can_connect**:<br>
Agent が Vault に接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**vault.unsealed**:<br>
Vault がシールされている場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**vault.initialized**:<br>
Vault がまだ初期化されていない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**vault.prometheus.health**:<br>
チェックがメトリクスのエンドポイントにアクセスできない場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した HashiCorp Vault の監視][8]


[1]: https://www.vaultproject.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://www.vaultproject.io/docs/configuration/telemetry#prometheus
[4]: https://www.vaultproject.io/docs/configuration/listener/tcp#unauthenticated_metrics_access
[5]: https://www.vaultproject.io/docs/auth
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://www.datadoghq.com/blog/monitor-hashicorp-vault-with-datadog