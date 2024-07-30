---
dependencies:
- https://github.com/DataDog/chef-datadog/blob/main/README.md
title: Chef
---
Datadog Chef レシピは Datadog のコンポーネントとコンフィギュレーションを自動的にデプロイするために使用します。クックブックは次のバージョンに対応しています。

* Datadog Agent v7.x (デフォルト)
* Datadog Agent v6.x
* Datadog Agent v5.x

**注**: 本ページには、ご利用のバージョンでは使用できない機能が記載されている場合があります。ご利用のバージョンのドキュメントについては、Git タグの README または gem バージョンをご確認ください。

## セットアップ

### 要件

Datadog Chef クックブックは 12.7 以降の `chef-client` と互換性があります。12.7 以前の Chef を使用されている場合は、[クックブックのリリース 2.x][2] をご使用ください。詳細については [CHANGELOG][3] 参照してください。

#### プラットフォーム

下記のプラットフォームに対応しています。

* AlmaLinux (Chef 16 >= 16.10.8 または Chef >= 17.0.69 が必要です)
* Amazon Linux
* CentOS
* Debian
* RedHat (RHEL 8 には Chef 15 以降が必要)
* Rocky (Chef 16 >= 16.17.4 または Chef >= 17.1.35 が必要です)
* Scientific Linux
* Ubuntu
* Windows
* SUSE (Chef 13.3 以降が必要)

#### クックブック

下記の Opscode クックブックには依存性があります。

* `apt`
* `chef_handler`
* `yum`

**注**: `apt` クックブック v7.1 以降では、Agent を Debian 9 以降にインストールする必要があります。

#### Chef

**Chef 13 ユーザー**: Chef 13 と `chef_handler` 1.x を使用している場合、`dd-handler` レシピを使用できないことがあります。現在のところ、依存性のあるクックブック `chef_handler` を 2.1 以降へアップデートすることで、これを回避できます。

### インストール

1. [Berkshelf][5] または [Knife][6] を使用して、クックブックを Chef サーバーに追加します。
    ```text
    # Berksfile
    cookbook 'datadog', '~> 4.0'
    ```

    ```shell
    # Knife
    knife cookbook site install datadog
    ```

2. ロール、環境、または他のレシピに [Datadog 固有の属性](#Datadog の属性)を設定します。
    ```text
    node.default['datadog']['api_key'] = "<YOUR_DD_API_KEY>"

    node.default['datadog']['application_key'] = "<YOUR_DD_APP_KEY>"
    ```

3. 更新したクックブックを Chef サーバーにアップロードします。
    ```shell
    berks upload
    # or
    knife cookbook upload datadog
    ```

4. アップロードが完了したら、ノードの `run_list` または `role` にクックブックを追加します。
    ```text
    "run_list": [
      "recipe[datadog::dd-agent]"
    ]
    ```

5. 次に予定されている `chef-client` の実行を待つか、手動でこれをトリガーします。

#### Datadog の属性

[Datadog API キーとアプリケーションキー][4]の追加には、下記のメソッドを使用できます。

* `environment` または `role` と一緒にノード属性として追加。
* 上位の優先レベルで他のクックブックにキーを宣言することで、ノード属性として追加。
* ノード `run_state` で、`run_list` の優先する他の Datadog のレシピに `node.run_state['datadog']['api_key']` を設定することで追加。この手法では、Chef  サーバー上のプレーンテキストの認証情報は保存されません。

**注**: API キーとアプリケーションキーを保存するために実行状態を使用している場合は、これらを実行リストの `datadog::dd-handler` 以前のコンパイル時間に設定してください。

#### 追加のコンフィギュレーション

クックブックの属性として直接利用できない Agent コンフィギュレーションファイル (通常 `datadog.yaml`) に要素をさらに追加するには、`node['datadog']['extra_config']` 属性を使用します。これは、状況に応じてコンフィギュレーションファイルに配置されているハッシュ属性です。

##### 例

次のコードは、コンフィギュレーションファイル `datadog.yaml` にフィールド `secret_backend_command` を設定します。

```ruby
 default_attributes(
   'datadog' => {
     'extra_config' => {
       'secret_backend_command' => '/sbin/local-secrets'
     }
   }
 )
```

`secret_backend_command` は、下記を使用して設定することもできます。

```text
default['datadog']['extra_config']['secret_backend_command'] = '/sbin/local-secrets'
```

ネストされた属性にはオブジェクト構文を使用します。下記のコードはコンフィギュレーションファイル `datadog.yaml` にフィールド `logs_config` を設定します。

```ruby
default['datadog']['extra_config']['logs_config'] = { 'use_port_443' => true }
```

#### AWS OpsWorks Chef のデプロイメント

下記のステップに従って、Datadog Agent を Chef と一緒に AWS OpsWorks でデプロイします。

1. Chef カスタム JSON を追加します。
  ```json
  {"datadog":{"agent_major_version": 7, "api_key": "<API_KEY>", "application_key": "<APP_KEY>"}}
  ```

2. `install-lifecycle` レシピにレシピをインクルードします。
  ```ruby
  include_recipe '::dd-agent'
  ```

### ヘルプ

ロールの実行リストと属性に[レシピ](#レシピ)とコンフィギュレーションの詳細を含めることで、Agent インテグレーションを有効化します。
**注**: `datadog_monitor `リソースを使用して、レシピなしで Agent インテグレーションを有効にすることができます。

レシピを適切な `roles` に関連付けます。たとえば、`role:chef-client` に `datadog::dd-handler` が含まれ、`role:base` は Agent を `datadog::dd-agent` で開始する必要があります。下記は、`dd-handler`、`dd-agent`、`mongo` レシピを使用したロールの例です。

```ruby
name 'example'
description 'Example role using DataDog'

default_attributes(
  'datadog' => {
    'agent_major_version' => 7,
    'api_key' => '<YOUR_DD_API_KEY>',
    'application_key' => '<YOUR_DD_APP_KEY>',
    'mongo' => {
      'instances' => [
        {'host' => 'localhost', 'port' => '27017'}
      ]
    }
  }
)

run_list %w(
  recipe[datadog::dd-agent]
  recipe[datadog::dd-handler]
  recipe[datadog::mongo]
)
```

**注**: API キーを複数持ち、アプリケーションキーを 1 つしか持たない可能性は低いため、`data_bags` はこのレシピでは使用されていません。

## Agent ランタイムコンフィギュレーション

デフォルトでは、このクックブックの現在の主要バージョンは Agent v7 をインストールします。インストール済みの  Agent  バージョンを管理するには、下記の属性を利用できます。

| パラメーター              | 説明                                                                                                                                                                         |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent_major_version`  | Agent の主要バージョンを 5、6 または 7 (デフォルト) に固定する。                                                                                                                         |
| `agent_version`        | 特定の Agent バージョンに固定する (推奨)。                                                                                                                                         |
| `agent_package_action` | (Linux のみ) `'install'` をデフォルトに設定 (推奨)、Agent の自動アップデートを実施する場合は `'upgrade'` に設定 (非推奨。アップグレードするには、デフォルトを使用して、固定の `agent_version` を変更するようにしてください)。 |
| `agent_flavor` | (Linux のみ) datadog-agent をインストールするためのデフォルト `'datadog-agent'` は、IOT エージェントのインストールには `'datadog-iot-agent'` に設定できます。 |

すべての利用可能な属性については、ご利用のクックブックバージョンのサンプル [attributes/default.rb][1] を参照してください。

### アップグレード

クックブックのバージョン 3.x から 4.x にかけて、一部の属性名が変更されています。下記の参照テーブルをご確認のうえ、ご利用のコンフィギュレーションを更新してください。

| アクション                | クックブック 3.x                                          | クックブック 4.x                              |
|-----------------------|-------------------------------------------------------|-------------------------------------------|
| Agent 7.x のインストール     | サポート対象外                                         | `'agent_major_version' => 7`              |
| Agent 6.x のインストール     | `'agent6' => true`                                    | `'agent_major_version' => 6`              |
| Agent 5.x のインストール     | `'agent6' => false`                                   | `'agent_major_version' => 5`              |
| Agent のバージョンを固定     | `'agent_version'` または `'agent6_version'`               | 全バージョンで `'agent_version'`        |
| package_action の変更 | `'agent_package_action'` または `'agent6_package_action'` | 全バージョンで `'agent_package_action'` |
| APT repo URL の変更   | `'aptrepo'` または `'agent6_aptrepo'`                     | 全バージョンで `'aptrepo'`              |
| APT リポジトリディストリビューションの変更  | `'aptrepo_dist'` または `'agent6_aptrepo_dist'`   | 全バージョンで `'aptrepo_dist'`         |
| YUM repo の変更       | `'yumrepo'` または `'agent6_yumrepo'`                     | 全バージョンで `'yumrepo'`              |
| SUSE repo の変更      | `'yumrepo_suse'` または `'agent6_yumrepo_suse'`           | 全バージョンで `'yumrepo_suse'`         |

Agent v6 から v7 へアップグレードするには、下記のメソッドのいずれか 1 つを使用します。

* `agent_major_version` を `7` に設定し、`agent_package_action` を `install` に設定したのち、特定の v7 バージョンを `agent_version` として固定します (推奨)。
* `agent_major_version` を `7` に設定し、`agent_package_action` を `upgrade` に設定します。

下記の例では Agent v6 から v7 へアップグレードします。Agent v5 から v6 へアップグレードする場合も、同様に適用できます。

```ruby
default_attributes(
  'datadog' => {
    'agent_major_version' => 7,
    'agent_version' => '7.25.1',
    'agent_package_action' => 'install',
  }
)
```

### ダウングレード

Agent のバージョンをダウングレードするには、`'agent_major_version'`、`'agent_version'`、`'agent_allow_downgrade'` を設定します。

下記の例では Agent v6 にダウングレードします。Agent v5 にダウングレードする場合も、同様に適用できます。

```ruby
  default_attributes(
    'datadog' => {
      'agent_major_version' => 6,
      'agent_version' => '6.10.0',
      'agent_allow_downgrade' => true
    }
  )
```

### アンインストール

Agent をアンインストールするには、`dd-agent` レシピを削除し、属性なしで `remove-dd-agent` レシピを追加します。

### カスタム Agent リポジトリ

カスタムリポジトリから Agent を使用するには、`aptrepo` オプションを設定します。

デフォルトでは、このオプションは `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] apt.datadoghq.com` と等しくなります。カスタム値が設定されている場合、別の `signed-by` キーリングを `[signed-by=custom-repo-keyring-path] custom-repo` に設定することもできます。

以下の例では、ステージングリポジトリを使用しています。

```ruby
  default_attributes(
    'datadog' => {
      'aptrepo' => '[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] apt.datad0g.com',
    }
  }
```

## レシピ

[GitHub で Datadog Chef レシピ][7]にアクセスします。

### デフォルト

[デフォルトのレシピ][8]はプレースホルダーです。

### 高度な構成

[dd-agent レシピ][9]が、対象システムに Datadog Agent をインストールし、[Datadog API キー][4]を設定して、ローカルのシステムメトリクスに関するレポートを送信するサービスを開始します。

**注**: Windows で Agent を 5.10.1 以前のバージョン から 5.12.0 以降のバージョンにアップグレードする場合は、`windows_agent_use_exe` 属性を `true` に設定します。詳細については、[dd-agent wiki][10] を参照してください。

### ハンドラー

[dd-handler レシピ][11]が [chef-handler-datadog][12] gem をインストールし、Chef の実行が終了した時点でハンドラーを起動させ、ニュースフィードに詳細をレポートします。

### ヘルプ

DogStatsD と交信する言語固有のライブラリをインストールするには

- Ruby: [dogstatsd-ruby レシピ][13]
- Python: `poise-python` クックブックへの依存性をカスタム/ラッパークックブックに追加して、下記のリソースを使用します。詳細については、[poise-python レポジトリ][14]を参照してください。
    ```ruby
    python_package 'dogstatsd-python' # assumes python and pip are installed
    ```

### ヘルプ

アプリケーショントレーシング (APM) に言語固有のライブラリをインストールするには

- Ruby: [ddtrace-ruby レシピ][15]
- Python: `poise-python` クックブックへの依存性をカスタム/ラッパークックブックに追加して、下記のリソースを使用します。詳細については、[poise-python レポジトリ][14]を参照してください。
    ```ruby
    python_package 'ddtrace' # assumes python and pip are installed
    ```

### ヘルプ

Agent インテグレーションのコンフィギュレーションファイルと依存性のデプロイに役立つ[レシピ][7]が数多く用意されています。 

### システムプローブ

デフォルトで [system-probe recipe][17] が自動的に含まれます。これは `system-probe.yaml` ファイルを書き込みます。この動作は `node['datadog']['system_probe']['manage_config']` を false に設定することで無効化することができます。

`system-probe.yaml` で [Network Performance Monitoring][7] (NPM) を有効にするには、` node ['datadog'] ['system_probe'] ['network_enabled'] ` を true に設定します。

`system-probe.yaml` で [ユニバーサルサービスモニタリング][7] (USM) を有効にするには、`node['datadog']['system_probe']['service_monitoring_enabled']` を true に設定します。

**Windows をご利用の方へのご注意**: NPM は Agent v6.27+ と v7.27+ で Windows 上でサポートされています。NPM はオプションコンポーネントとして出荷され、Agent のインストールまたはアップグレード時に `node['datadog']['system_probe']['network_enabled']` が true に設定された場合にのみインストールされます。このため、Agent を同時にアップグレードしない限り、既存のインストールでは NPM コンポーネントをインストールするために一旦 Agent をアンインストールして再インストールする必要があるかもしれません。

## リソース

### レシピなしのインテグレーション

レシピを使用せずに Agent インテグレーションを有効化するには `datadog_monitor`  リソースを使用します。

#### アクション

- `:add`: (デフォルト) コンフィギュレーションファイルを設定し、ファイルに適切なアクセス許可を追加し、Agent を再起動して、インテグレーションを有効化します。
- `:remove`: インテグレーションを無効化します。

#### 構文

```ruby
datadog_monitor 'name' do
  init_config                       Hash # デフォルト値: {}
  instances                         Array # デフォルト値: []
  logs                              Array # デフォルト値: []
  use_integration_template          true, false # デフォルト値: false
  action                            Symbol # デフォルトに設定 :add
end
```

#### プロパティ

| プロパティ                   | 説明                                                                                                                                                                                                                                                                                    |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `'name'`                   | 構成し、有効化する Agent インテグレーションの名前。                                                                                                                                                                                                                                     |
| `instances`                | インテグレーションコンフィギュレーションファイルの `instances` セクションで値を入力するために使用されるフィールド。                                                                                                                                                                                            |
| `init_config`              | インテグレーションコンフィギュレーションファイルの `init_config` セクションで値を入力するために使用されるフィールド。                                                                                                                                                                                      |
| `logs`                     | インテグレーションコンフィギュレーションファイルの `logs` セクションで値を入力するために使用されるフィールド。                                                                                                                                                                                             |
| `use_integration_template` | `instances`、`init_config`、`logs` の値を記述するデフォルトテンプレートを使用するには、それぞれのキーの YAML で `true` (推奨) に設定します。下位互換性ではデフォルトで `false` に設定されていますが、今後のクックブックの主要バージョンではデフォルトで `true` に設定される可能性があります。 |

#### 例

この例では、`datadog_monitor` リソースを使用して ElasticSearch インテグレーションを有効化します。これにより、インスタンスコンフィギュレーション (この場合、ElasticSearch に接続する URL) を条件付け、`use_integration_template` フラグを設定してデフォルトのコンフィギュレーションテンプレートを使用します。また、Agent を再起動するよう `service[datadog-agent]` リソースに通知します。

**注**: Agent のインストールは実行リストでこのレシピより上に定義されている必要があります。

```ruby
include_recipe '::dd-agent'

datadog_monitor 'elastic' do
  instances  [{'url' => 'http://localhost:9200'}]
  use_integration_template true
  notifies :restart, 'service[datadog-agent]' if node['datadog']['agent_start']
end
```

その他の例については [Datadog インテグレーション Chef レシピ][7]を参照してください。

### インテグレーションバージョン

Datadog インテグレーションの特定のバージョンをインストールするには、`datadog_integration` リソースを使用します。

#### アクション

- `:install`: (デフォルト) 特定のバージョンのインテグレーションをインストールします。
- `:remove`: インテグレーションを削除します。

#### 構文

```ruby
datadog_integration 'name' do
  version                      String         # インストールするバージョン :install action
  action                       Symbol         # デフォルトに設定 :install
  third_party                  [true, false]  # デフォルトに設定 :false
end
```

#### プロパティ

- `'name'`: インストールする Agent インテグレーションの名前。例: `datadog-apache`。
- `version`: インストールするインテグレーションのバージョン (`:install` アクションでのみ必須)。
- `third_party`: Datadog インテグレーションをインストールする場合は false に設定し、それ以外の場合は true に設定します。Datadog Agent バージョン 6.21/7.21 以降でのみ使用できます。

#### 例

以下の例では、`datadog_integration` リソースを使用して、ElasticSearch インテグレーションのバージョン `1.11.0` をインストールします。

**注**: Agent のインストールは実行リストでこのレシピより上に定義されている必要があります。

```ruby
include_recipe '::dd-agent'

datadog_integration 'datadog-elastic' do
  version '1.11.0'
end
```

利用可能なインテグレーションバージョンを取得するには、[integrations-core レポジトリ][16]でインテグレーション固有の `CHANGELOG.md` を参照してください。

**注**: Chef Windows では、ノードで利用可能な `datadog-agent` バイナリがこのリソースによって使用されている場合、`chef-client` は `datadog.yaml` ファイルに対する読み込みアクセス権があります。

## 開発

### Docker 化された環境

キッチンテストを実行するための Docker 環境を構築するには、`docker_test_env` の下のファイルを使用します。

```
cd docker_test_env
docker build -t chef-datadog-test-env .
```

コンテナを実行するには、以下を使用します。

```
docker run -d -v /var/run/docker.sock:/var/run/docker.sock chef-datadog-test-env
```

次に、コンソールをコンテナにアタッチするか、VS Code リモートコンテナ機能を使用してコンテナ内で開発します。

コンテナ内から kitchen-docker のテストを実行するには

```
# 注: MacOS または Windows の場合は、KITCHEN_DOCKER_HOSTNAME=host.docker.internal も設定してください
# ログインシェルでこれを実行します (そうしないと `bundle` が見つかりません)
KITCHEN_LOCAL_YAML=kitchen.docker.yml bundle exec rake circle
```

[1]: https://github.com/DataDog/chef-datadog/blob/master/attributes/default.rb
[2]: https://github.com/DataDog/chef-datadog/releases/tag/v2.18.0
[3]: https://github.com/DataDog/chef-datadog/blob/master/CHANGELOG.md
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.chef.io/berkshelf/
[6]: https://docs.chef.io/knife/
[7]: https://github.com/DataDog/chef-datadog/tree/master/recipes
[8]: https://github.com/DataDog/chef-datadog/blob/master/recipes/default.rb
[9]: https://github.com/DataDog/chef-datadog/blob/master/recipes/dd-agent.rb
[10]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation
[11]: https://github.com/DataDog/chef-datadog/blob/master/recipes/dd-handler.rb
[12]: https://rubygems.org/gems/chef-handler-datadog
[13]: https://github.com/DataDog/chef-datadog/blob/master/recipes/dogstatsd-ruby.rb
[14]: https://github.com/poise/poise-python
[15]: https://github.com/DataDog/chef-datadog/blob/master/recipes/ddtrace-ruby.rb
[16]: https://github.com/DataDog/integrations-core
[17]: https://github.com/DataDog/chef-datadog/blob/master/recipes/system-probe.rb