---
app_id: bind9
app_uuid: b37533b0-6f0e-4259-9971-083f08086fac
assets:
  dashboards:
    Bind9 - Details: assets/dashboards/bind9_details.json
    Bind9 - Overview: assets/dashboards/bind9_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: bind9.nsstat_AuthQryRej
      metadata_path: metadata.csv
      prefix: bind9.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10222
    source_type_name: BIND 9
  logs:
    source: bind9
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ネットワーク
- ログの収集
- モニター
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bind9/README.md
display_on_public_website: true
draft: false
git_integration_title: bind9
integration_id: bind9
integration_title: Bind 9
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: bind9
public_title: Bind 9
short_description: bind9 のログとサーバーメトリクスを収集するための Datadog インテグレーション
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
  - Category::Network
  - Category::Log Collection
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: bind9 のログとサーバーメトリクスを収集するための Datadog インテグレーション
  media:
  - caption: Bind9 - 概要
    image_url: images/bind9_overview.png
    media_type: image
  - caption: Bind9 - 詳細
    image_url: images/bind9_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Bind 9
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

[Bind 9][1] は、完全で高い移植性を備えた Domain Name System (DNS) プロトコルの実装です。Bind 9 のネームサーバー (named) は、権威サーバー、再帰的リゾルバー、DNS フォワーダー、またはこれらすべてを同時に実行することができます。


このインテグレーションは、Query、Query Errors、Network、Lame Servers、Notify、Security といったログタイプに対してリッチな情報付加と可視化を提供します。これは、DNS リクエストパターンや DNS 通信の詳細なインサイト、適切なサーバー設定や DNS 攻撃の監視を支援し、あらかじめ用意されたダッシュボードによって堅牢で信頼性の高い DNS 環境を実現します。加えて、このインテグレーションにはあらかじめ用意された検知ルールも含まれています。また、Bind 9 の統計情報をメトリクスとして収集し、必要に応じて可視化に利用できます。


## セットアップ

### インストール

Bind 9 インテグレーションをインストールするには、以下の Agent のインストールコマンドと手順を実行してください。詳細については [Integration Management][2] ドキュメントをご覧ください。

**注**: このステップは Agent のバージョンが 7.58.0 以上の場合は不要です。

Linux コマンド
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-bind9==1.1.0
  ```

#### ログ収集

#### ファイルモニタリング

1. Bind 9 を実行しているデバイスにログインします。
2. `named.conf` ファイルを開き、logging の設定を追加します。
    ```
    logging {
     channel <example_channel> {
          file "/folder_path/file_name.log" versions <unlimited | <integer>> size <size> suffix <increment | timestamp>;
          print-time (yes | local | iso8601 | iso8601-utc);
          print-category yes;
          print-severity yes;
     };
     category <example-category> { <example_channel>; };
    }
    ```
   **注**: `print-time` の推奨値は `iso8601-utc` です。Datadog はすべてのログがデフォルトで UTC タイムゾーンであることを想定しているためです。Bind 9 のログのタイムゾーンが UTC でない場合は、[別のタイムゾーンを使用する手順][3]に必ず従ってください。また、[Bind 9 で定義されているカテゴリー][4]も参照してください。

   例: ロギングチャネル
    ```
    logging {
     channel default_log {
          file "/var/log/named/query.log" versions 3 size 10m;
          print-time iso8601-utc;
          print-category yes;
          print-severity yes;
     };
       category default { default_log; };
    }
    ```
3. ファイルを保存して終了します。
4. サービスを再起動します。
    ```
    service named restart
    ```

#### Syslog
1. Bind 9 を実行しているデバイスにログインします。
2. `named.conf` ファイルを開き、logging の設定を追加します。
    ```
    logging {
     channel <example_channel> {
          syslog <syslog_facility>;
          severity (critical | error | warning | notice | info | debug [level ] | dynamic);
          print-time (yes | local | iso8601 | iso8601-utc);
          print-category yes;
          print-severity yes;
     };
     category <example-category> { <example_channel>; };
    }
    ```
   **注**: `print-time` の推奨値は `iso8601-utc` です。Datadog はすべてのログがデフォルトで UTC タイムゾーンであることを想定しているためです。Bind 9 のログのタイムゾーンが UTC でない場合は、[別のタイムゾーンを使用する手順][3]に必ず従ってください。また、[Bind 9 で定義されているカテゴリー][4]も参照してください。

   例: ロギングチャネル
    ```
    logging {
     channel default_log {
          syslog local3;
          print-time iso8601-utc;
          print-category yes;
          print-severity yes;
     };
       category default { default_log; };
    }
    ```

3. ファイルを保存して終了します。
4. syslog/rsyslog の設定を編集し、Bind 9 で選択した facility を使用して Datadog にログを送るようにします。
    ```
    <syslog_facility>.* @@<DATADOG_AGENT_IP_ADDRESS>:<PORT>
    ```
5. 以下のサービスを再起動します。
    ```
    service syslog/rsyslog restart
    service named restart
    ```

**注**: Bind 9 アプリケーションのチャンネルで `print-category` と `print-severity` が `yes` に設定されていることを確認してください。

### 構成

#### メトリクスの収集

1. [Agent の構成ディレクトリ][5]のルートにある `conf.d/` フォルダ内の `bind9.d/conf.yaml` ファイルを編集し、Bind 9 の[メトリクス][6]を収集するように設定します。[サンプル bind9.d/conf.yaml][7] を参照し、利用可能なすべての構成オプションを確認してください。

   ```yaml
   init_config:

   instances:
     - url: "<BIND_9_STATS_URL>"
   ```

2. [Agent を再起動します][8]。

#### ログ収集

1. Datadog Agent では、ログ収集はデフォルトで無効になっています。`datadog.yaml` ファイルで有効にしてください。

   ```yaml
   logs_enabled: true
   ```

#### ファイルモニタリング

1. Bind 9 のログを収集するには、以下の構成ブロックを `bind9.d/conf.yaml` ファイルに追加します。

   利用可能な構成オプションについては、[サンプル bind9.d/conf.yaml][7] を参照してください。

   ```yaml
   logs:
     - type: file
       path: /var/log/named/*.log
       service: bind9
       source: bind9
   ```
   **注**: `conf.yaml` の `path` 変数は、Bind 9 アプリケーションのチャンネルで構成されている `file` パラメータと同じパスに変更してください。

3. [Agent を再起動します][8]。

#### Syslog
1. Bind 9 のログを収集するには、以下の設定ブロックを `bind9.d/conf.yaml` ファイルに追加します。

   利用可能な設定オプションについては、[サンプル bind9.d/conf.yaml][7] を参照してください。

   ```yaml
   logs:
     - type: tcp
       port: <PORT>
       service: bind9
       source: bind9
   ```
   **注**: `port` の値は、`syslog.conf/rsyslog.conf` で指定したポート番号と同じである必要があります。

3. [Agent を再起動します][8]。

<h4 id="timezone-steps"> UTC 以外のタイムゾーンを Bind 9 Datadog ログパイプラインで指定する</h4>

Datadog はデフォルトで、すべてのログが UTC タイムゾーンであると想定しています。Bind 9 のログのタイムゾーンが UTC でない場合は、Bind 9 の Datadog パイプラインで正しいタイムゾーンを指定してください。

Bind 9 パイプラインでタイムゾーンを変更するには

  1. Datadog の [Pipelines ページ][9]に移動します。

  2. **Filter Pipelines** の検索ボックスに「Bind 9」と入力します。

  3. Bind 9 パイプライン上にカーソルを合わせ、**clone** ボタンをクリックします。Bind 9 パイプラインが編集可能な複製として作成されます。

  4. 次の手順で Grok Parser を編集します。
      - 複製されたパイプラインで「Grok Parser: Parsing Bind 9 common log format」という名前のプロセッサーを探し、パイプラインにカーソルを合わせて `Edit` ボタンをクリックします。
      - **Define parsing rules** の下にある
        - 文字列 `UTC` を、Bind 9 サーバーのタイムゾーンに対応する [TZ 識別子][10]に変更します。例として、タイムゾーンが IST の場合は `Asia/Calcutta` に変更します。
      - **update** ボタンをクリックします。

### 検証

[Agent のステータスサブコマンド][11]を実行し、Checks セクション内に `bind9` が表示されるか確認してください。

## 互換性

このチェックは、すべての主要プラットフォームと互換性があります。

## 収集データ

### ログ

Bind 9 インテグレーションでは、以下のログタイプを収集します。

| イベントタイプ    |
| -------------- |
| Query、Query Errors、Lame Servers、Notify、Security|

### メトリクス
{{< get-metrics-from-git "bind9" >}}


### イベント

Bind 9 チェックにはイベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "bind9" >}}


## トラブルシューティング

ログファイルを監視している際に **Permission denied** エラーが表示される場合は、`dd-agent` ユーザーに対してファイルの読み取り権限を付与してください。

  ```shell
  sudo chown -R dd-agent:dd-agent /var/log/named/
  ```

追加のサポートが必要な場合は、[Datadog サポート][14]へお問い合わせください。


[1]: https://www.isc.org/bind/
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/ja/integrations/bind9/#timezone-steps
[4]: https://downloads.isc.org/isc/bind9/9.18.29/doc/arm/html/reference.html#namedconf-statement-category
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://docs.datadoghq.com/ja/integrations/bind9/#metrics
[7]: https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://app.datadoghq.com/logs/pipelines
[10]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-extras/blob/master/bind9/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/bind9/assets/service_checks.json
[14]: https://docs.datadoghq.com/ja/help/