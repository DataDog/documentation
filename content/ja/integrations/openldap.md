---
aliases: []
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    OpenLDAP Overview: assets/dashboards/openldap_overview.json
  logs:
    source: openldap
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - ログの収集
  - オートディスカバリー
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openldap/README.md'
display_name: OpenLDAP
draft: false
git_integration_title: openldap
guid: ec61c06d-a870-4183-8a27-c66db1fc47cc
integration_id: openldap
integration_title: OpenLDAP
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: openldap.
metric_to_check: openldap.connections.current
name: openldap
public_title: Datadog-OpenLDAP インテグレーション
short_description: cn=monitor バックエンドを使用して OpenLDAP サーバーからメトリクスを収集
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

OpenLDAP インテグレーションを使用すると、OpenLDAP サーバーの `cn=Monitor` バックエンドからメトリクスを取得できます。

## セットアップ

### インストール

OpenLDAP インテグレーションは Agent とパッケージ化されています。OpenLDAP メトリクスの収集を開始するには、以下を実行します。

1. OpenLDAP サーバーで `cn=Monitor` バックエンドを構成します。
2. OpenLDAP サーバーに [Agent をインストール][1]します。

### コンフィギュレーション

#### OpenLDAP の準備

サーバーで `cn=Monitor` バックエンドが構成されていない場合は、以下の手順に従ってください。

1. インストールでモニターが有効化されていることを確認します。

   ```shell
    sudo ldapsearch -Y EXTERNAL -H ldapi:/// -b cn=module{0},cn=config
   ```

   `olcModuleLoad: back_monitor.la` という行が表示される場合は、モニターはすでに有効化されています。手順 3 に進んでください。

2. サーバーでモニタリングを有効にします。

   ```text
       cat <<EOF | sudo ldapmodify -Y EXTERNAL -H ldapi:///
       dn: cn=module{0},cn=config
       changetype: modify
       add: olcModuleLoad
       olcModuleLoad: back_monitor.la
       EOF
   ```

3. `slappasswd` で暗号化パスワードを作成します。
4. 新しいユーザーを追加します。

   ```text
       cat <<EOF | ldapadd -H ldapi:/// -D <YOUR BIND DN HERE> -w <YOUR PASSWORD HERE>
       dn: <USER_DISTINGUISHED_NAME>
       objectClass: simpleSecurityObject
       objectClass: organizationalRole
       cn: <COMMON_NAME_OF_THE_NEW_USER>
       description: LDAP monitor
       userPassword:<PASSWORD>
       EOF
   ```

5. モニターデータベースを構成します。

   ```text
       cat <<EOF | sudo ldapadd -Y EXTERNAL -H ldapi:///
       dn: olcDatabase=Monitor,cn=config
       objectClass: olcDatabaseConfig
       objectClass: olcMonitorConfig
       olcDatabase: Monitor
       olcAccess: to dn.subtree='cn=Monitor' by dn.base='<USER_DISTINGUISHED_NAME>' read by * none
       EOF
   ```

#### OpenLDAP インテグレーションの構成

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

###### メトリクスの収集

1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d` フォルダーの `openldap.d/conf.yaml` を編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル openldap.d/conf.yaml][1] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Full URL of your ldap server. Use `ldaps` or `ldap` as the scheme to
     ## use TLS or not, or `ldapi` to connect to a UNIX socket.
     #
     - url: ldaps://localhost:636

       ## @param username - string - optional
       ## The DN of the user that can read the monitor database.
       #
       username: "<USER_DISTINGUISHED_NAME>"

       ## @param password - string - optional
       ## Password associated with `username`
       #
       password: "<PASSWORD>"
   ```

2. [Agent を再起動します][2]。

###### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. OpenLDAP のログの収集を開始するには、次のコンフィギュレーションブロックを `openldap.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/slapd.log
       source: openldap
       service: "<SERVICE_NAME>"
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル openldap.d/conf.yaml][1] を参照してください。

3. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/openldap/datadog_checks/openldap/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

###### メトリクスの収集

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `openldap`                                                                                      |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                                   |
| `<インスタンスコンフィギュレーション>`  | `{"url":"ldaps://%%host%%:636","username":"<ユーザーの識別名>","password":"<パスワード>"}` |

###### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                                 |
| -------------- | ----------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "openldap", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][2]し、Checks セクションで `openldap` を探します。

## 互換性

このチェックは、すべての主要プラットフォームと互換性があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "openldap" >}}


### イベント

openldap チェックには、イベントは含まれません。

### サービスのチェック

**openldap.can_connect**:<br>
インテグレーションが監視対象の OpenLDAP サーバーにバインドできない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/