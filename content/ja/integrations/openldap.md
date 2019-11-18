---
aliases: []
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - データストア
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openldap/README.md'
display_name: OpenLDAP
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

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][7]のガイドを参照してこの手順を行ってください。

### インストール

OpenLDAP インテグレーションは Agent にパッケージ化されています。OpenLDAP メトリクスの収集を開始するには、以下のようにします。

1. OpenLDAP サーバーで `cn=Monitor` バックエンドを構成します。
2. OpenLDAP サーバーに [Agent をインストール][1]します。

### コンフィグレーション

#### OpenLDAP の準備

サーバーで `cn=Monitor` バックエンドが構成されていない場合は、以下の手順に従ってください。

1. インストールでモニターが有効になっているかを確認します。

    ```
      sudo ldapsearch -Y EXTERNAL -H ldapi:/// -b cn=module{0},cn=config
    ```

    `olcModuleLoad: back_monitor.la` という行が表示される場合は、モニターは既に有効になっています。手順 3 に進んでください。

2. サーバーでモニターを有効にします。

    ```
        cat <<EOF | sudo ldapmodify -Y EXTERNAL -H ldapi:///
        dn: cn=module{0},cn=config
        changetype: modify
        add: olcModuleLoad
        olcModuleLoad: back_monitor.la
        EOF
    ```

3. `slappasswd` で暗号化パスワードを作成します。
4. 新しいユーザーを追加します。

    ```
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

    ```
        cat <<EOF | sudo ldapadd -Y EXTERNAL -H ldapi:///
        dn: olcDatabase=Monitor,cn=config
        objectClass: olcDatabaseConfig
        objectClass: olcMonitorConfig
        olcDatabase: Monitor
        olcAccess: to dn.subtree='cn=Monitor' by dn.base='<USER_DISTINGUISHED_NAME>' read by * none
        EOF
    ```

#### OpenLDAP インテグレーションの構成

[メトリクス](#metrics)の収集を開始するには、`openldap.yaml` ファイルに次の構成ブロックを追加します。

```
  init_config:

  instances:
      - url: ldaps://localhost
        port: 686
        username: <USER_DISTINGUISHED_NAME>
        password: <PASSWORD>
```

使用可能なすべての構成オプションの詳細については、[サンプル openldap.yaml][2] を参照してください。

[Agent を再起動][3]すると、Datadog への OpenLDAP メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. Openldap のログの収集を開始するには、次の構成ブロックを `openldap.d/conf.yaml` ファイルに追加します。

    ```
      logs:
        - type: file
          path: /var/log/slapd.log
          source: openldap
          service: <SERVICE_NAME>
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル openldap.d/conf.yaml][2] を参照してください。

3. [Agent を再起動します][3]。

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `openldap` を探します。

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

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/openldap/datadog_checks/openldap/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/openldap/metadata.csv
[6]: https://docs.datadoghq.com/ja/help
[7]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}