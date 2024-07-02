---
app_id: ネットワーク
app_uuid: 3773283a-494f-497a-98cc-804520634a7a
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: network.http.response_time
      metadata_path: metadata.csv
      prefix: network.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: HTTP
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/http_check/README.md
display_on_public_website: true
draft: false
git_integration_title: http_check
integration_id: ネットワーク
integration_title: HTTP チェック
integration_version: 9.5.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: http_check
public_title: HTTP チェック
short_description: レスポンス状況が悪い HTTP サービスや、SSL 証明書の期限切れが近い HTTP サービスを監視します
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::ネットワーク
  configuration: README.md#Setup
  description: レスポンス状況が悪い HTTP サービスや、SSL 証明書の期限切れが近い HTTP サービスを監視します
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: HTTP チェック
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

ローカルまたはリモート HTTP エンドポイントの上・下ステータスを監視します。HTTP チェックでは、レスポンス」がないことを示すコード (404 など) の検出、期限切れが近い SSL 証明書の特定、特定のテキストの応答の検索など、さまざまなことができます。また、HTTP 応答時間をメトリクスとして送信します。

## セットアップ

### インストール

HTTP チェックは、[Datadog Agent][1] のパッケージに含まれています。サーバーに追加でインストールする必要はありません。多くのメトリクス指向のチェックは、監視するサービスと同じホストで実行するのが最適ですが、このステータス指向のチェックは、監視するサイトを実行していないホストから実行したい場合があります。

### 構成

[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `http_check.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[http_check.d/conf.yaml のサンプル][3]を参照してください。

```yaml
init_config:

instances:
  - name: Example website
    url: https://example.com/

  - name: Example website (staging)
    url: http://staging.example.com/
```

HTTP チェックには一般的なチェックよりも多くの構成オプションがあります。多くのオプションはオプトインで、例えば、必要なオプションを構成しない限り、Agent は SSL の有効性をチェックしません。ただし、期限切れが近い SSL 証明書のチェックはデフォルトで実行されます。

このチェックは、Agent コレクターを実行するたびに実行され、デフォルトでは 15 秒ごとです。このチェックのカスタム実行頻度を設定するには、カスタムチェックドキュメントの[コレクション間隔][4]セクションを参照してください。

使用可能なオプションのすべてのリストと説明については、[http_check.d/conf.yaml のサンプル][3]を参照してください。以下にそのリストを示します。

| 設定                          | 説明                                                                                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                           | HTTP チェックインスタンスの名前。サービスチェックのタグとして提示されます。                                                                                                                                                              |
| `url`                            | テストする URL。                                                                                                                                                                                                                                 |
| `timeout`                        | レスポンスに許可する秒数。                                                                                                                                                                                                     |
| `method`                         | チェックに使用されるHTTP メソッド。                                                                                                                                                                                                            |
| `data`                           | このパラメーターは、POST、PUT、DELETE、PATCH メソッドを使用したリクエストの本文を指定するために使用します。POST メソッドを使用し、データパラメーターとして XML 文字列を指定すれば、SOAP リクエストがサポートされます。                                             |
| `headers`                        | このパラメーターを使用すると、リクエストで追加ヘッダーを送信できます。詳細な情報と注意については、[YAML ファイルのサンプル][3]を参照してください。                                                                                                    |
| `content_match`                  | 文字列または Python 正規表現。HTTP チェックは、応答でこの値を検索し、文字列または表現が見つからない場合は DOWN として報告します。                                                                                      |
| `reverse_content_match`          | `true` の場合は、`content_match` オプションの動作を反転させます。つまり、`content_match` に文字列または式が検出された場合に HTTP チェックは DOWN として報告します。(デフォルトは false)                                                              |
| `username` と `password`          | サービスが基本的な認証を使用している場合は、ここでユーザー名とパスワードを指定できます。                                                                                                                                                       |
| `http_response_status_code`      | HTTP ステータスコードの文字列または Python 正規表現。このチェックは、一致しないステータスコードに対して DOWN を報告します。デフォルトで 1xx、2xx、3xx の HTTP ステータスコードになります。例: `401` または `4\d\d`。                              |
| `include_content`                | `true` に設定されている場合、チェックは HTTP 応答本文の最初の 500 文字を通知に含めます。デフォルト値は `false` です。                                                                                                        |
| `collect_response_time`          | デフォルトでは、チェックは応答時間 (秒単位) をメトリクス `network.http.response_time` として収集します。無効にするには、この値を `false` に設定します。                                                                                                 |
| `tls_verify`                     | `url` に到達した時に、サービスの TLS 証明書を検証するように指示します。                                                                                                                                                          |
| `tls_ignore_warning`             | `tls_verify` を `true` に設定すると、SSL 接続からのすべてのセキュリティ警告が無効になります。                                                                                                                                                     |
| `tls_ca_cert`                    | この設定を使用すると、`init_config` で指定されているデフォルトの証明書パスを上書きできます。                                                                                                                                                   |
| `check_certificate_expiration`   | `check_certificate_expiration` が有効な場合、サービスチェックは、SSL 証明書の有効期限をチェックします。**注**: これにより、`tls_verify` 設定の値に関係なく SSL 証明書が検証されます。 |
| `tls_retrieve_non_validated_cert`| `tls_verify` が `false` で `check_certificate_expiration` が `true` の場合、これを `true` に設定すると、証明書に有効期限があるかどうかを調べることができます。                                                                          |
| `days_warning` と `days_critical` | `check_certificate_expiration` を有効にすると、指定された日数内に SSL 証明書の有効期限が存在する場合に、これらの設定によって警告または重要なアラートが発生します。                                                                |
| `ssl_server_name`                | `check_certificate_expiration` を有効にすると、この設定により、接続するサービスのホスト名が指定され、check_hostname が有効になっていると一致するホストが上書きされます。                                                      |
| `check_hostname`                 | `true` に設定すると、チェックした `url` ホスト名が SSL 証明書のホスト名と異なる場合に、警告をログに記録します。                                                                                                                           |
| `skip_proxy`                     | 設定すると、チェックはプロキシ設定を迂回してチェック URL への直接アクセスを試みます。デフォルトでは `false` です。このインテグレーションのプロキシ設定は、設定されていない場合 `datadog.yaml` コンフィギュレーションファイルで定義されたデフォルトのプロキシ設定になります。 |
| `allow_redirects`                | この設定を使用すると、サービスチェックは HTTP リダイレクトに従います。デフォルトは `true` です。                                                                                                                                                           |
| `tags`                           | チェックと関連付けられる任意のタグのリスト。タグの詳細については、[タグのガイド][5]とブログ投稿[タグ付けされたメトリクスの力][6]を参照してください。                                                                  |

`http_check.d/conf.yaml` の構成を完了したら、[Agent を再起動][7]し、HTTP サービスチェックと応答時間の Datadog への送信を開始します。

### 検証

[Agent の `status` サブコマンドを実行][8]し、Checks セクションの `http_check` を探します。

## データ収集

### メトリクス
{{< get-metrics-from-git "http_check" >}}


### イベント

HTTP チェックにはイベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "http_check" >}}


`http.ssl_cert` を無効にするには、`check_certificate_expiration` を false に設定します。

**注:** これらのサービスチェックにアラートを設定するには、[ネットワークモニター][11]を作成します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/developers/write_agent_check/#collection-interval
[5]: https://docs.datadoghq.com/ja/getting_started/tagging/
[6]: https://www.datadoghq.com/blog/the-power-of-tagged-metrics
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/http_check/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/http_check/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/monitors/monitor_types/network/?tab=checkalert
[12]: https://docs.datadoghq.com/ja/help/