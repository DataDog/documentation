---
app_id: ping-federate
app_uuid: 1deb5e7c-e9a9-4566-8d78-12c92d1baff9
assets:
  dashboards:
    PingFederate - Admin: assets/dashboards/ping_federate_admin.json
    PingFederate - Audit: assets/dashboards/ping_federate_audit.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20005886
    source_type_name: PingFederate
  logs:
    source: ping-federate
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ping_federate/README.md
display_on_public_website: true
draft: false
git_integration_title: ping_federate
integration_id: ping-federate
integration_title: PingFederate
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: ping_federate
public_title: PingFederate
short_description: PingFederate ログを可視化して洞察を得る
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: PingFederate ログを可視化して洞察を得る
  media:
  - caption: PingFederate - Audit
    image_url: images/ping_federate_audit.png
    media_type: image
  - caption: PingFederate - Admin
    image_url: images/ping_federate_admin.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: PingFederate
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[PingFederate][1] は企業向けのアイデンティティ フェデレーション サーバーで、安全なシングル サインオン (SSO) とマルチ ファクタ認証 (MFA) に加え、フェデレーション型のアイデンティティ管理を提供します。さまざまなアプリケーションやサービスにまたがって、安全に連携できます。


このインテグレーションは、admin と audit のログをエンリッチし、可視化します。あらかじめ用意されたダッシュボードを使って、admin と audit のログ分析をすぐに始められ、より詳細なインサイトを把握できます。

## セットアップ

### インストール

PingFederate インテグレーションをインストールするには、次の Agent インストール コマンドを実行し、続けて以下の手順を行ってください。詳細は [Integration Management][2] ドキュメントを参照してください。

**注**: Agent バージョンが 7.57.0 以上の場合、この手順は不要です。

Linux コマンド
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-ping_federate==1.0.0
  ```


### 構成

### ログ収集

1. Datadog Agent でのログ収集は、デフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. `ping_federate.d/conf.yaml` ファイルに次の設定ブロックを追加すると、PingFederate ログの収集を開始できます。

    ```yaml
      logs:
        - type: file
          path:  <pf_install>/pingfederate/log/admin.log
          source: ping-federate
          service: admin

        - type: file
          path:  <pf_install>/pingfederate/log/audit.log
          source: ping-federate
          service: audit
    ```

    **注**: 以下の点を必ず確認してください。

    1. `<pf_install>` は、PingFederate のインストール先に置き換えてください。

    2. PingFederate の出力先のデフォルト パスは `/pingfederate/log` で、`filenames` は `admin.log` と `audit.log` です。デフォルトのパスやファイル名を変更している場合は、`conf.yaml` の `path` パラメータもそれに合わせて更新してください。


3. [Agent を再起動します][3]。
### 検証

[Agent の status サブ コマンドを実行][4] し、Checks セクションに `ping-federate` が表示されることを確認します。

## 収集データ

### Logs

PingFederate インテグレーションでは、次の種類のログを収集します。

| 形式     | イベントタイプ    |
| ---------  | -------------- |
| CEF | admin, audit|

### 対応ログ フォーマット

#### 管理者
デフォルトのログ フォーマットは次のとおりです。

```
<pattern>%d | %X{user} | %X{roles} | %X{ip} | %X{component} | %X{event} | %X{eventdetailid} | %m%n</pattern>
```

#### 監査 
デフォルトのログ フォーマットは次のとおりです。

```
<pattern>%d| %X{trackingid}| %X{event}| %X{subject}| %X{ip} | %X{app}| %X{connectionid}| %X{protocol}| %X{host}| %X{role}| %X{status}| %X{adapterid}| %X{description}| %X{responsetime} %n</pattern>
```

追加フィールドのログ フォーマットは次のとおりです。

```
<pattern>%d| %X{trackingid}| %X{event}| %X{subject}| %X{ip} | %X{app}| %X{connectionid}| %X{protocol}| %X{host}| %X{role}| %X{status}| %X{adapterid}| %X{description}| %X{responsetime}| %X{attrackingid}| %X{attributes}| %X{granttype}| %X{initiator}| %X{inmessagetype}| %X{inresponseto}| %X{localuserid}| %X{requestid}| %X{requeststarttime}| %X{responseid}| %X{stspluginid}| %X{targetsessionid}| %X{authenticationsourceid}| %X{validatorid}| %X{virtualserverid}| %X{connectionname}| %X{httprequestid}%n</pattern>
```


**注**: 追加フィールドは、上記の順序で設定されている場合にのみサポートされます。また、いずれかのフィールドが設定されていない場合、このインテグレーションでは追加フィールドをサポートしません。

### メトリクス

PingFederate には、メトリクスは含まれません。

### イベント

PingFederate インテグレーションには、イベントは含まれません。

### サービスチェック

PingFederate インテグレーションには、サービス チェックは含まれません。

## トラブルシューティング

ログファイルを監視している際に **Permission denied** エラーが表示される場合は、`dd-agent` ユーザーに対してファイルの読み取り権限を付与してください。

  ```shell
  sudo chown -R dd-agent:dd-agent <pf_install>/pingfederate/log/admin.log
  sudo chown -R dd-agent:dd-agent <pf_install>/pingfederate/log/audit.log
  ```
## サポート

さらなるサポートが必要な場合は、[Datadog サポート][5] までお問い合わせください。

[1]: https://docs.pingidentity.com/r/en-us/pingfederate-112/pf_pingfederate_landing_page
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/