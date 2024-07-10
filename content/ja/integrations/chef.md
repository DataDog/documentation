---
aliases:
- /ja/guides/chef/
categories:
- automation
- configuration & deployment
- issue tracking
- log collection
- provisioning
dependencies: []
description: Chef クライアントの実行を追跡。失敗、成功、大きな変更を把握。
doc_link: https://docs.datadoghq.com/integrations/chef/
draft: false
git_integration_title: chef
has_logo: true
integration_id: chef
integration_title: Chef
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: chef
public_title: Datadog-Chef インテグレーション
short_description: Chef クライアントの実行を追跡。失敗、成功、大きな変更を把握。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/chef/chefdashboard.png" alt="Chef イベント" popup="true">}}

## 概要

Chef は、Ruby と Erlang で記述された人気の構成管理ツールです。

Chef を使用した Datadog のデプロイはとても簡単です。可能な限りシンプルな方法でインフラストラクチャー全体の監視を行うことができます。

Datadog は、Chef [Execution および Report ハンドラー][1] も提供しています。これらのハンドラーを使用して、タイミングやリソースの更新など、Chef の実行に関連するメトリクスと共に、`chef-client` のエラーをキャプチャできます。

## セットアップ

### Agent のデプロイ

Datadog Agent のインストールと構成を自動化するための [Datadog Chef クックブック][2]があります。

[Supermarket][2] から knife を使用して最新バージョンの Datadog Chef クックブックをインストールし、Chef Server にアップロードします。

```text
knife cookbook site install datadog
knife cookbook upload datadog
```

ツールの手順に従って、クックブックを Chef Server にアップロードします。

クックブックのレシピをノードの `run_list` に追加する前に、Chef 属性を使って API キーなどの Datadog アカウント資格情報を追加する必要があります。

通常、これは、`role` または `environment` ファイル、または属性を宣言する別のクックブックを使って行われます。

以下は、`base.rb` ロールファイル (通常はオーガニゼーションのすべてのホストに適用される) の例です。

```ruby
name 'base'
description 'base role, runs on every node'
run_list(
  'ntp',
  'datadog::dd-agent',
  'some_other_base_cookbook::recipe'
)
default_attributes(
  'datadog' => {
    'api_key' => "PUT_YOUR_API_KEY_HERE",
    'application_key' => "PUT_YOUR_APPLICATION_KEY_HERE"
  }
)
```

**注**: 必要なキーは 2 つです。Datadog [API キー][3]と[アプリケーションキー][4]です。

上に示されている属性に両方の値を指定します。

その後、次のようにロールファイルを Chef Server にアップロードします。

```text
knife role from file roles/base.rb
```

次回の Chef 実行時に Agent がインストールされ、構成ファイルに API キーとアプリケーションキーが設定されます。

**注:** 別のクックブックを使用してこれらの属性を定義している場合は、`default` より高いレベルの属性優先度を使用してください。

### レポートハンドラー

Datadog は Chef レポートハンドラーを提供します。このハンドラーは、Chef 実行からのメトリクスとイベントを Datadog に報告します。Report ハンドラーをインストールすると、ハンドラーは Chef 実行のタイミングとリソースの変更に関するメトリクスを送信します。Chef 実行の成功率と失敗率を追跡するイベントも作成されます。

これには、Chef 実行の出力を Datadog のイベントストリームに戻すという付加価値があります。したがって、エラーにすばやく注目し、チーム内で検討して解決することができます。

成功は「Low」優先度で表示されます。エラーは「Normal」優先度で表示されますが、同じノードが Chef 実行に成功すると、「Low」優先度に戻されます。

次のロールスニペットに示すように、ハンドラーの追加はとても簡単です。

```ruby
name 'base'
description 'base role, runs on every node'
run_list(
  'datadog::dd-handler',
  'ntp',
  'datadog::dd-agent',
  'some_other_base_cookbook::recipe'
)
default_attributes(
  'datadog' => {
    'api_key' => "<DATADOG_API_キー>",
    'application_key' => "<DATADOG_アプリケーション>"
  }
)
```

この例では、ノードの実行リストの先頭に `datadog::dd-handler` レシピが追加されました。先頭に追加することで、ハンドラーは起動後に観察したすべての詳細をキャプチャすることができます。ハンドラーが `run_list` の末尾に追加され、ハンドラーが実行される前に何らかのエラーが発生した場合は、一部の出力を受信できないことがあります。

設定されたら、Chef Server にロールをアップロードして待ちます。いくつかのホストで Chef が実行されると、新しい自動 Dashboard が作成されて、関連する Chef メトリクスが表示されます。これは[ダッシュボードリスト][5]の右側にあります。

### Datadog への Chef メトリクスの送信

1. Berkshelf を使用している場合は、クックブックを Berksfile に追加します。

    ```text
    cookbook 'datadog'
    ```

    それ以外の場合は、Knife を使用してクックブックをリポジトリにインストールします。

    ```text
    knife cookbook site install datadog
    ```

2. ロール、環境、または別のレシピのいずれかで、Datadog 固有の属性を設定します。

    ```conf
    # Make sure you replace the API and application key below
    # with the ones for your account

    node.default['datadog']['<API_KEY>'] = "<DATADOG_API_KEY>"

    # Use an existing application key or create a new one for Chef
    node.default['datadog']['<APPLICATION_KEY>] ="<DATADOG_APP_KEY>"
    ```

3. 更新されたクックブックを Chef サーバーにアップロードします。

    ```bash
    berks upload
    # or
    knife cookbook upload datadog

    knife cookbook list | grep datadog && \
    echo -e "\033[0;32mdatadog cookbook - OK\033[0m" || \
    echo -e "\033[0;31mmissing datadog cookbook - OK\033[0m"
    ```

   クックブックをノードに適用する準備が整いました。

4. クックブックをアップロードしたら、ノードの run_list またはロールに追加します。

    ```conf
    "run_list": [
      "recipe[datadog::dd-handler]"
    ]
    ```

5. スケジューリングされている次回の chef-client 実行を待ちます。

### ログの収集

ログ収集は Agent v6.0+ で利用可能です。[attributes/default.rb][6] を参照して有効にしてください。詳しくは、下記の[設定例](#customizations)を参照してください。

### 検証

[イベントストリーム][7]から、検索バーに `sources:chef` と入力します。Chef 実行が表示されるはずです。

## 収集データ

### メトリクス

{{< get-metrics-from-git >}}

## その他の参考資料

### カスタマイズ

Datadog Chef クックブックに、インテグレーション固有のレシピが掲載されています。

これらのレシピの 1 つを実行リストに含めると、そのサービスの監視に必要な Python モジュールなどの監視依存関係がインストールされると共に、正しい構成ファイルが書き出されます。

以下に、`webserver.rb` ロールファイルを拡張して、Datadog を使って Apache を自動的に監視する例を挙げます。

```ruby
name 'webserver'
description 'Webserver role, runs apache'
run_list(
  'apache2',
  'datadog::apache',
)
default_attributes(
  'apache' => {
    'ext_status' => true,
  }
  'datadog' => {
    'apache' => {
      'instances' => [
        { 'status_url' => 'http://localhost:8080/server-status/',
          'tags' => ['extra_tag', 'env:example'] }
      ],
      'logs' => [
        { 'type' => 'file',
          'path' => '/var/log/apache2/access.log',
          'source' => 'apache',
          'service' => 'myapp',
          'sourcecategory' => 'http_web_access',
          'tags' => ['extra_tag', 'env:example'] },
        { 'type' => 'file',
          'path' => '/var/log/apache2/error.log',
          'source' => 'apache',
          'service' => 'myapp',
          'sourcecategory' => 'http_web_access',
          'tags' => ['extra_tag', 'env:example'] }
      ]
    }
  }
)
```

この例では、`datadog::apache` レシピが、Datadog によって監視されるべき Apache のインスタンスを制御するいくつかの属性と共に実行リストに追加されています。

属性の `instances` 部分に渡すインテグレーション値の詳細については、各レシピファイルを参照してください。

[1]: https://docs.chef.io/handlers.html
[2]: https://supermarket.chef.io/cookbooks/datadog
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: https://app.datadoghq.com/dashboard/lists
[6]: https://github.com/DataDog/chef-datadog/blob/v2.15.0/attributes/default.rb#L383-L388
[7]: https://app.datadoghq.com/event/stream