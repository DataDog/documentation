---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cacti/README.md'
display_name: Cacti
git_integration_title: cacti
guid: 566466b0-1422-44ef-b14f-493a64e7b58a
integration_id: cacti
integration_title: Cacti
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cacti.
metric_to_check: cacti.rrd.count
name: cacti
public_title: Datadog-Cacti インテグレーション
short_description: Cacti RRD を Datadog に転送して豊富なアラート機能や美しいグラフを活用 graphing.
support: コア
supported_os:
  - linux
---
## 概要

cacti サービスからメトリクスをリアルタイムに取得すると、以下のことができます。

* cacti の状態を視覚化および監視できます。
* cacti のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

Cacti チェックは [Datadog Agent][2] パッケージに含まれています。メトリクスの収集を開始するには、次の手順に従います。
- librrd ヘッダーおよびライブラリをインストールします。
- rrdtool の python バインディングをインストールします。

#### librrd ヘッダーおよびライブラリ

Debian/Ubuntu の場合
```shell
sudo apt-get install librrd-dev
```

RHEL/CentOS の場合
```shell
sudo yum install rrdtool-devel
```

#### Python バインディング

次に、以下のコマンドを使用して、`rrdtool` Python パッケージを Agent に追加します。
```shell
sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install rrdtool
```

### コンフィグレーション

Cacti データベースへの読み取り専用権限を持つ Datadog ユーザーを作成します。

```shell
sudo mysql -e "create user 'datadog'@'localhost' identified by '<password>';"
sudo mysql -e "grant select on cacti.* to 'datadog'@'localhost';"
```

ユーザーと権限をチェックします。

```shell
mysql -u datadog --password=<password> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"

mysql -u datadog --password=<password> -D cacti -e "select * from data_template_data limit 1" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing SELECT grant\033[0m"
```

Agent が MySQL に接続するように構成し、`cacti.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル cacti.d/conf.yaml][3] を参照してください。

```yaml
init_config:

instances:
    -   mysql_host: localhost
        mysql_user: datadog
        mysql_password: hx3beOpMFcvxn9gXcs0MU3jX
        rrd_path: /path/to/cacti/rra
        #field_names:
        #    - ifName
        #    - dskDevice
        #    - ifIndex
        #rrd_whitelist: /path/to/rrd_whitelist.txt
```

Datadog Agent ユーザーに RRD ファイルへのアクセス権を付与します。

```shell
sudo gpasswd -a dd-agent www-data
sudo chmod -R g+rx /var/lib/cacti/rra/
sudo su - datadog-agent -c 'if [ -r /var/lib/cacti/rra/ ];
then echo -e "\033[0;31mdatadog-agent can read the RRD files\033[0m";
else echo -e "\033[0;31mdatadog-agent can not read the RRD files\033[0m";
fi'
```

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `cacti` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "cacti" >}}


### イベント
Cacti チェックには、イベントは含まれません。

### サービスのチェック
Cacti チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
### 既知の問題
このインテグレーションが使用する Python ライブラリは、状況によってはメモリリークが発生することがあります。これが発生する場合は、1 つの回避策として、rrdtool の代わりに [python-rrdtool][6] パッケージをインストールしてください。この古いパッケージはメンテナンスされておらず、このインテグレーションでは公式にサポートされていませんが、メモリに関する問題の解決に利用できます。

このメモリリークの問題を追跡する [Github イシュー][7]がオープンされています。

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/cacti/datadog_checks/cacti/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/cacti/metadata.csv
[6]: https://github.com/pbanaszkiewicz/python-rrdtool
[7]: https://github.com/commx/python-rrdtool/issues/25
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}