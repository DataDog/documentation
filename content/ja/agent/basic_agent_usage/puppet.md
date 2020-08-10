---
dependencies:
- "https://github.com/DataDog/puppet-datadog-agent/blob/master/README.md"
kind: documentation
title: Puppet
---


このモジュールは、Datadog Agent をインストールし、Puppet レポートを Datadog に送信します。

## セットアップ

### 要件

Datadog Puppet モジュールは Linux および Windows をサポートし、Puppet >= 4.6.x または Puppet Enterprise バージョン >= 2016.4 と互換性があります。互換性の詳細については、[Puppet Forge のモジュールページ][1]を確認してください。

### インストール

[datadog_agent][1] Puppet モジュールを Puppet マスターのモジュールパスにインストールします。

```shell
puppet module install datadog-datadog_agent
```

**注**: CentOS/RHEL バージョン <7.0 と Ubuntu < 15.04 の場合は、サービスプロバイダーを `upstart` と指定します。

```conf
class{ 'datadog_agent':
    service_provider => 'upstart'
  }
```

#### アップグレード

- デフォルトでは、Datadog Agent v7.x がインストールされます。以前のバージョンの Agent を使用するには、設定 `agent_major_version` を変更します。
- `agent5_enable` は `agent_major_version` に置き換えられたため使用されなくなりました。
- `agent6_extra_options` は、Agent v6 と v7 の両方に適用されるようになったため、`agent_extra_options` に名前が変更されました。
- `agent6_log_file` は、Agent v6 と v7 の両方に適用されるようになったため、`agent_log_file` に名前が変更されました。
- `agent5_repo_uri` と `agent6_repo_uri` は、すべての Agent バージョンで `agent_repo_uri` になります。
- `conf_dir` と `conf6_dir` はすべての Agent バージョンで `conf_dir` になります。
- Linux で作成されたリポジトリファイルの名前は、すべての Agent バージョンで `datadog5`/`datadog6` ではなく `datadog` になりました。

### コンフィギュレーション

`datadog_agent` モジュールが `puppetserver`/`puppetmaster`（またはマスターレスホスト）にインストールされたら、次の構成手順に従います。

1. [Datadog API キー][2]を取得します。
2. ノードに Datadog Agent をインストールするモジュールを指定します。

   ```conf
   include datadog_agent
   ```

   または、Puppet スタイルの Parameterized クラスを使用してこのモジュールを割り当てます。

   ```conf
   class { 'datadog_agent':
       api_key => "<YOUR_DD_API_KEY>",
   }
   ```

3. `puppetserver` でレポートを有効にします。

   ```conf
   class { 'datadog_agent':
       api_key            => "<YOUR_DD_API_KEY>",
       puppet_run_reports => true,
   }
   ```

    - レポートをサポートするには、Puppet マスターに [dogapi][3] gem がインストールされている必要があります。この構成でマスター上で Puppet Agent を実行するか、`gem` を使用して手動でインストールします。`dogapi` gem をインストールした後、`puppetserver` サービスを再起動する必要がある場合があります。
    - `puppetserver_gem` はモジュールの依存関係として定義されます。モジュールのインストール時に自動的にインストールされます。

4. (オプション) レポートとファクトのタグ付けを有効にする
   Datadog にイベントとして送られたレポートにタグを追加することができます。これらのタグの源泉は、レポートが関連付けられている任意のノードについての Puppet ファクトです。必ず 1:1 の関係であるものとし、可読性を確保するために構造化ファクト (ハッシュ、配列など) を含むことは禁止されています。タグ付けを有効にするには、パラメーター `datadog_agent::reports::report_fact_tags` をファクトの配列値に設定します。たとえば、 `["virtual","trusted.extensions.pp_role","operatingsystem"]` は 3 つの個別のタグを各レポートイベントに追加する際の例です。

   例: これらの設定を変更するには、pe-puppetserver (または puppetserver) を再起動してレポートのプロセッサを再読み込みする必要があります。サービスを再起動する前に、変更がデプロイされていることをご確認ください。

   ヒント: 
    - ドットインデックスを使用してターゲットファクトを指定します。これを行わない場合、ファクトデータセット全体がひとつの文字列の値として扱われます (あまり有用とは言えません) 。
    - ホスト名、アップタイム、メモリーなど、モニタリングの汎用データを複製しないでください。
    - ロール、所有者、テンプレート、データセンターなどのコアファクトを調整します。これらはメトリクスから取得した同じタグに意義ある相関関係を構築するのに役立ちます。


5. （オプション）Agent で使用するインテグレーションを含めます。次に例を示します。

   ```conf
   include 'datadog_agent::integrations::mongo'
   ```

   インテグレーションに[専用クラスのマニフェスト][6]がない場合でも、その構成を追加できます。以下は `ntp` チェックの例です。

   ```conf
   class { 'datadog_agent':
       api_key      => "<YOUR_DD_API_KEY>",
       integrations => {
           "ntp" => {
               init_config => {},
               instances => [{
                   offset_threshold => 30,
               }],
           },
       },
   }
   ```

#### インテグレーションバージョン

特定のインテグレーションバージョンをインストールして固定するには、`datadog_agent::install_integration` を使用してインテグレーションとバージョン番号を指定します。これは、`datadog-agent integration` コマンドを使用して、特定のインテグレーションが確実にインストールまたはアンインストールされるようにします。次に例を示します。

```conf
datadog_agent::install_integration { "mongo-1.9":
    ensure => present,
    integration_name => 'datadog-mongo',
    version => '1.9.0',
    third_party => false,
}
```

`ensure` には 2 つのオプションがあります。

- `present`（デフォルト）
- `absent`（以前に固定されたバージョンのインテグレーションを削除します）

サードパーティインテグレーションをインストールするには、`third_party` パラメーターを `true` に設定します。

### レポート

[dogapi][3] gem がシステムで使用できることを確認します。

Datadog タイムラインへの変更のレポートを有効にするには、Puppet マスターのレポートプロセッサとクライアントのレポートを有効にします。クライアントは、各チェックイン後に実行レポートをマスターに送り返します。

マスターのノード構成マニフェストで `puppet_run_reports` オプションを true に設定します。

```ruby
class { "datadog-agent":
    api_key => "<DD_API_キー>",
    puppet_run_reports => true
    # ...
}
```

Puppet 構成ファイルは `/etc/puppetlabs/puppet/puppet.conf` にあります。


これらの構成オプションを適切な場所に追加します。

```ini
[main]
# このセクションを変更する必要はありません
# ...

[master]
# Datadog へのレポートを有効にします
reports=datadog_reports
# 他のレポートを使用する場合は、datadog_reports を末尾に追加します。
# 例: reports=store,log,datadog_reports
# ...

[agent]
# ...
pluginsync=true
report=true
```

すべての Puppet クライアントノードで、同じ場所に以下を追加します。

```ini
[agent]
# ...
report=true
```

#### トラブルシューティング

次のエラーが表示される場合は、`[main]` ではなく `[master]` で `reports=datadog_reports` が定義されていることを確認してください。

```text
err: Could not send report:
Error 400 on SERVER: Could not autoload datadog_reports:
Class Datadog_reports is already defined in Puppet::Reports
```

### 手順

これは、始めるための最小限の変更です。

1. `/etc/puppetlabs/puppet/puppet.conf` を編集して Puppet Agent を追加します。

    ```ini
    [master]
    report = true
    reports = datadog_reports
    pluginsync = true

    [agent]
    report = true
    pluginsync = true
    ```


2. `/etc/puppetlabs/code/environments/production/manifests/10_nodes.pp` を編集して Agent を構成します。

    ```conf
    node "default" {
        class { "datadog_agent":
            api_key => "<YOUR_DD_API_KEY>",
        }
    }
    node "puppetmaster" {
        class { "datadog_agent":
            api_key            => "<YOUR_DD_API_KEY>",
            puppet_run_reports => true
        }
    }
    ```

   **注**: 古いバージョンの Puppet 場合は、`/etc/puppet/manifests/nodes.pp` を編集します。

3. Puppet Agent を実行します。

    ```shell
    sudo systemctl restart puppetserver
    sudo puppet agent --onetime --no-daemonize --no-splay --verbose
    ```

   応答例

    ```text
    info: Retrieving plugin
    info: Caching catalog for alq-linux.dev.datadoghq.com
    info: Applying configuration version '1333470114'
    notice: Finished catalog run in 0.81 seconds
    ```

4. [Event Stream][5] で `sources:puppet` を検索して、Puppet データが Datadog にあることを確認します。

## マスターレス Puppet

1. Datadog モジュールとその依存関係は、マスターレスで実行しているすべてのノードにインストールする必要があります。
2. これを各ノードの `site.pp` ファイルに追加します。
    ```conf
    class { "datadog_agent":
        api_key            => "<YOUR_DD_API_KEY>",
        puppet_run_reports => true
    }
   ```

3. `puppet.conf` の `[main]` セクションでレポートを構成します。
    ```conf
    [main]
    reports=datadog_reports
    ```
4. マスターレス構成で Puppet を実行します。
    ```shell
    puppet apply --modulepath <path_to_modules> <path_to_site.pp>
    ```

## クライアント設定

### クライアントノードのタグ付け

Datadog Agent 構成ファイルは、Puppet を実行するたびにテンプレートから再作成されます。ノードにタグを付ける必要がある場合は、Hiera に配列エントリを追加します。

```conf
datadog_agent::tags:
- 'keyname:value'
- 'anotherkey:%{factname}'
```
カスタムファクトからタグを生成するには、Puppet Enterprise コンソールまたは Hiera を介して、ノードを Puppet ファクトで配列として ```facts_to_tags``` パラメーターに分類します。次に例を示します。

```conf
class { "datadog_agent":
  api_key            => "<YOUR_DD_API_KEY>",
  facts_to_tags      => ["osfamily","networking.domain","my_custom_fact"],
}
```
ヒント: 
1. 構造化ファクトの場合、特定のファクト値にインデックスを付けます。こうしないと配列全体が文字列として渡され、最終的に使用するのが難しくなります。
2. CPU 使用率やアップタイムなど、実行ごとに変化が予想される動的ファクトは、タグ付けには理想的ではありません。ノードの存続期間中存続すると予想される静的ファクトが、タグ付けの最適な候補です。

### 構成変数

これらの変数は、`datadog_agent` クラスで設定して、Agent の設定を制御できます。

| 変数名                           | 説明                                                                                                                                                                                      |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent_major_version`                   | インストールする Agent のバージョン: 5、6、または 7（デフォルト: 7）。                                                                                                                              |
| `agent_version`                         | インストールする Agent の特定のマイナーバージョンを固定できます（例: `1:7.16.0-1`）。空のままにすると、最新バージョンがインストールされます。                                                             |
| `collect_ec2_tags`                      | `true` を使用することで、インスタンスのカスタム EC2 タグを Agent タグとして収集します。                                                                                                                             |
| `collect_instance_metadata`             | `true` を使用することで、インスタンスの EC2 メタデータを Agent タグとして収集します。                                                                                                                                |
| `datadog_site`                          | レポート先の Datadog サイト。デフォルトは `datadoghq.com` で、EU サイトにレポートするには `datadoghq.eu` に設定します（Agent v6 および v7 のみ）。                                                               |
| `dd_url`                                | Datadog インテークサーバーの URL。これを変更する必要はほとんどありません。`datadog_site` をオーバーライドします                                                                                                 |
| `host`                                  | ノードのホスト名をオーバーライドします。                                                                                                                                                                  |
| `local_tags`                            | ノードのタグとして設定される `<キー:値>` 文字列の配列。                                                                                                                             |
| `non_local_traffic`                     | 他のノードがこのノードを介してトラフィックをリレーできるようにします。                                                                                                                                      |
| `apm_enabled`                           | APM Agent を有効にするブール値（デフォルトは false）。                                                                                                                                           |
| `apm_analyzed_spans`                    | トレース検索および分析用の APM イベントを追加するためのハッシュ（デフォルトは undef）。例:<br>`{ 'app\|rails.request' => 1, 'service-name\|operation-name' => 0.8 }`                                |
| `process_enabled`                       | プロセス Agent を有効にするブール値（デフォルトは false）。                                                                                                                                       |
| `scrub_args`                            | プロセスのコマンドラインスクラビングを有効にするブール値（デフォルトは true）。                                                                                                                            |
| `custom_sensitive_words`                | スクラビング機能で使用されるデフォルトのものを超える単語を追加するための配列（デフォルトは `[]`）。                                                                                             |
| `logs_enabled`                          | ログ Agent を有効にするブール値（デフォルトは false）。                                                                                                                                          |
| `container_collect_all`                 | すべてのコンテナのログ収集を有効にするブール値。                                                                                                                                          |
| `agent_extra_options`<sup>1</sup>       | 追加の構成オプションを提供するハッシュ（Agent v6 および v7 のみ）。                                                                                                                       |
| `hostname_extraction_regex`<sup>2</sup> | Puppet ノード名をレポートする代わりに、ホスト名キャプチャグループを抽出して Datadog での実行を報告するために使用される正規表現。例:<br>`'^(?<hostname>.*\.datadoghq\.com)(\.i-\w{8}\..*)?$'` |

(1) `agent_extra_options` は、追加の Agent v6/v7 構成オプションを細かく制御するために使用されます。`datadog_agent` クラスパラメーターで提供されるオプションをオーバーライドする可能性のあるディープマージが実行されます。

(2) `hostname_extraction_regex` は、Puppet モジュールと Datadog Agent がインフラストラクチャーリスト内の同じホストに対して異なるホスト名をレポートしている場合に役立ちます。

[1]: https://forge.puppet.com/datadog/datadog_agent
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://github.com/DataDog/dogapi-rb
[4]: https://app.datadoghq.com/account/settings#integrations
[5]: https://app.datadoghq.com/event/stream
[6]: https://github.com/DataDog/puppet-datadog-agent/tree/master/manifests/integrations
