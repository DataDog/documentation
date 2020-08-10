---
aliases:
  - /ja/integrations/httpcheck
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/http_check/README.md'
display_name: HTTP
git_integration_title: http_check
guid: eb133a1f-697c-4143-bad3-10e72541fa9c
integration_id: ネットワーク
integration_title: HTTP チェック
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: network.
metric_to_check: network.http.response_time
name: http_check
public_title: Datadog-HTTP チェックインテグレーション
short_description: レスポンス状況が悪い HTTP サービスや、SSL 証明書の期限切れが近い HTTP サービスを監視します
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

ローカルまたはリモート HTTP エンドポイントの上/下ステータスを監視します。HTTP チェックでは、レスポンス」がないことを示すコード (404) の検出、期限切れが近い SSL 証明書の特定、特定のテキストの応答の検索など、さまざまなことができます。また、HTTP 応答時間をメトリクスとして送信します。

## セットアップ

### インストール

HTTP チェックは [Datadog Agent][1] パッケージに含まれているので、HTTP サイトを調査するサーバーに追加で何かをインストールする必要はありません。メトリクス指向チェックの多くは監視対象サービスと同じホストで実行することが最適な実行方法ですが、このステータス指向チェックは、監視対象のサイトを実行していないホストから実行することが望ましい場合があります。

### コンフィギュレーション

[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `http_check.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[http_check.d/conf.yaml のサンプル][3]を参照してください。

```yaml
init_config:

instances:
  - name: Example website
    url: https://example.com/

  - name: Example website (staging)
    url: http://staging.example.com/
```

HTTP チェックには一般的なチェックよりも多くの構成オプションがあり、上に示されているものはその一部です。多くのオプションはオプトインなので、必要なオプションを構成しない限り、Agent は SSL の有効性をチェックしません。ただし、期限切れが近い SSL 証明書のチェックはデフォルトで**実行されます**。

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
| `include_content`                | `true` に設定されている場合、チェックは HTTP 応答本文の最初の 200 文字を通知に含めます。デフォルト値は `false` です。                                                                                                        |
| `collect_response_time`          | デフォルトでは、チェックは応答時間 (秒単位) をメトリクス `network.http.response_time` として収集します。無効にするには、この値を `false` に設定します。                                                                                                 |
| `tls_verify`                     | `url` に到達した時に、サービスの TLS 証明書を検証するように指示します。                                                                                                                                                          |
| `tls_ignore_warning`             | `tls_verify` を `true` に設定すると、SSL 接続からのすべてのセキュリティ警告が無効になります。                                                                                                                                                     |
| `tls_ca_cert`                    | この設定を使用すると、`init_config` で指定されているデフォルトの証明書パスを上書きできます。                                                                                                                                                   |
| `check_certificate_expiration`   | `check_certificate_expiration` が有効な場合、サービスチェックは、SSL 証明書の有効期限をチェックします。これにより、`tls_verify` 設定の値に関係なく SSL 証明書が検証されます。 |
| `days_warning` と `days_critical` | `check_certificate_expiration` を有効にすると、指定された日数内に SSL 証明書の有効期限が存在する場合に、これらの設定によって警告または重要なアラートが発生します。                                                                |
| `ssl_server_name`                | `check_certificate_expiration` を有効にすると、この設定により、接続するサービスのホスト名が指定され、check_hostname が有効になっていると一致するホストが上書きされます。                                                      |
| `check_hostname`                 | `true` に設定すると、チェックした `url` ホスト名が SSL 証明書のホスト名と異なる場合に、警告をログに記録します。                                                                                                                           |
| `skip_proxy`                     | 設定すると、チェックはプロキシ設定を迂回してチェック URL への直接アクセスを試みます。デフォルトでは `false` です。このインテグレーションのプロキシ設定は、設定されていない場合 `datadog.yaml` コンフィギュレーションファイルで定義されたデフォルトのプロキシ設定になります。 |
| `allow_redirects`                | この設定を使用すると、サービスチェックは HTTP リダイレクトに従います。デフォルトは `true` です。                                                                                                                                                           |
| `tags`                           | チェックと関連付けられる任意のタグのリスト。タグの詳細については、[タグのガイド][5]とブログ投稿[タグ付けされたメトリクスの力][6]を参照してください。                                                                  |

`http_check.d/conf.yaml` の構成を完了したら、[Agent を再起動][7]し、HTTP サービスチェックと応答時間の Datadog への送信を開始します。

### 検証

[Agent の `status` サブコマンドを実行][8]し、Checks セクションの `http_check` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "http_check" >}}


### イベント

HTTP チェックにはイベントは含まれません。

### サービスのチェック

Datadog でこれらのサービスチェックのアラート条件を作成するには、[Create Monitor][10] ページで 'Integration' ではなく 'Network' を選択します。

**`http.can_connect`**:

次のいずれかが発生したら `DOWN` を返します。

- `uri` へのリクエストがタイムアウトした
- 応答コードが 4xx/5xx または `http_response_status_code` で指定されているパターンコードと一致しない
- 応答本文が `content_match` のパターンを_含まない_
- `reverse_content_match` が true で、応答本文が `content_match` のパターンを_含む_
- `uri` に `https` が含まれ、`tls_verify` が true であり、SSL 接続を検証できない

これら以外の場合は `UP` を返します。

**`http.ssl_cert`**:

チェックは次の内容を返します。

- `uri` の証明書が既に期限切れの場合は `DOWN`
- `uri` の証明書が `days_critical` 日未満に期限切れになる場合は `CRITICAL`
- `uri` の証明書が `days_warning` 日未満に期限切れになる場合は `WARNING`

これら以外の場合は `UP` を返します。

このチェックを無効にするには、`check_certificate_expiration` を false に設定します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/developers/write_agent_check/#collection-interval
[5]: https://docs.datadoghq.com/ja/getting_started/tagging/
[6]: https://www.datadoghq.com/blog/the-power-of-tagged-metrics
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/http_check/metadata.csv
[10]: https://app.datadoghq.com/monitors#/create
[11]: https://docs.datadoghq.com/ja/help/