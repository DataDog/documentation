---
app_id: cacti
app_uuid: b18f92f2-2aa5-435e-b04e-84ce3538fa2d
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cacti.rrd.count
      metadata_path: metadata.csv
      prefix: cacti.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25
    source_type_name: Cacti
  logs:
    source: cacti
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- developer tools
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cacti/README.md
display_on_public_website: true
draft: false
git_integration_title: cacti
integration_id: cacti
integration_title: Cacti
integration_version: 2.1.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: cacti
public_title: Cacti
short_description: Cacti RRD を Datadog に転送して豊富なアラート機能や美しいグラフを活用。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::ログの収集
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Cacti RRD を Datadog に転送して豊富なアラート機能や美しいグラフを活用。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cacti
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Cacti からメトリクスをリアルタイムに取得すると、以下のことができます。

- Cacti の状態を視覚化および監視できます。
- Cacti のフェイルオーバーとイベントの通知を受けることができます。

## 計画と使用

### インフラストラクチャーリスト

Cacti チェックは [Datadog Agent][1] パッケージに含まれています。メトリクスの収集を開始するには、次の手順に従います。

1. `librrd` ヘッダーおよびライブラリをインストールします。
2. Python バインディングを `rrdtool` にインストールします。

#### ヘッダーおよびライブラリ

Debian/Ubuntu の場合

```shell
sudo apt-get install librrd-dev
```

RHEL/CentOS の場合

```shell
sudo yum install rrdtool-devel
```

#### Python バインディング

以下のコマンドを使用して、`rrdtool` Python パッケージを Agent に追加します。

```shell
sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install rrdtool
```

### ブラウザトラブルシューティング

#### Datadog ユーザーの作成

1. Cacti データベースへの読み取り専用権限を持つ Datadog ユーザーを作成します。

   ```shell
   sudo mysql -e "create user 'datadog'@'localhost' identified by '<MYSQL_PASSWORD>';"
   sudo mysql -e "grant select on cacti.* to 'datadog'@'localhost';"
   ```

2. ユーザーと権限をチェックします。

   ```shell
   mysql -u datadog --password=<MYSQL_PASSWORD> -e "show status" | \
   grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
   echo -e "\033[0;31mCannot connect to MySQL\033[0m"

   mysql -u datadog --password=<MYSQL_PASSWORD> -D cacti -e "select * from data_template_data limit 1" && \
   echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
   echo -e "\033[0;31mMissing SELECT grant\033[0m"
   ```

3. `datadog-agent` ユーザーに RRD ファイルへのアクセス権を付与します。

   ```shell
   sudo gpasswd -a dd-agent www-data
   sudo chmod -R g+rx /var/lib/cacti/rra/
   sudo su - datadog-agent -c 'if [ -r /var/lib/cacti/rra/ ];
   then echo -e "\033[0;31mdatadog-agent can read the RRD files\033[0m";
   else echo -e "\033[0;31mdatadog-agent can not read the RRD files\033[0m";
   fi'
   ```

#### Agent の構成

1. Agent が MySQL に接続するように構成し、`cacti.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[cacti.d/conf.yaml のサンプル][2]を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param mysql_host - string - required
     ## url of your MySQL database
     #
     - mysql_host: "localhost"

       ## @param mysql_port - integer - optional - default: 3306
       ## port of your MySQL database
       #
       # mysql_port: 3306

       ## @param mysql_user - string - required
       ## User to use to connect to MySQL in order to gather metrics
       #
       mysql_user: "datadog"

       ## @param mysql_password - string - required
       ## Password to use to connect to MySQL in order to gather metrics
       #
       mysql_password: "<MYSQL_PASSWORD>"

       ## @param rrd_path - string - required
       ## The Cacti checks requires access to the Cacti DB in MySQL and to the RRD
       ## files that contain the metrics tracked in Cacti.
       ## In almost all cases, you'll only need one instance pointing to the Cacti
       ## database.
       ## The `rrd_path` will probably be `/var/lib/cacti/rra` on Ubuntu
       ## or `/var/www/html/cacti/rra` on any other machines.
       #
       rrd_path: "<CACTI_RRA_PATH>"
   ```

2. [Agent を再起動します][3]。

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `cacti` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "cacti" >}}


### 収集データ

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. Cacti ログの収集を開始するには、次のコンフィギュレーションブロックを `cacti.d/conf.yaml` ファイルに追加します。

    ```yaml
    logs:
      - type: file
        path: /opt/cacti/log/cacti.log
        source: cacti
    ```

    `path` パラメーターの値を環境に合わせて変更します。使用可能なすべてのコンフィギュレーションオプションについては、[cacti.d/conf.yaml のサンプル][2]を参照してください。

3. [Agent を再起動します][3]。

### ヘルプ

Cacti チェックには、イベントは含まれません。

### ヘルプ

Cacti チェックには、サービスのチェック機能は含まれません。

## ヘルプ

### 既知の問題

このインテグレーションが使用する Python ライブラリは、状況によってはメモリリークが発生することがあります。これが発生する場合は、1 つの回避策として、rrdtool の代わりに [python-rrdtool][6] パッケージをインストールしてください。この古いパッケージはメンテナンスされておらず、このインテグレーションでは公式にサポートされていませんが、メモリに関する問題の解決に利用できます。

このメモリリークの問題を追跡する [Github イシュー][7]がオープンされています。

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/cacti/datadog_checks/cacti/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/cacti/metadata.csv
[6]: https://github.com/pbanaszkiewicz/python-rrdtool
[7]: https://github.com/commx/python-rrdtool/issues/25
[8]: https://docs.datadoghq.com/ja/help/