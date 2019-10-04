---
aliases:
  - /ja/integrations/httpcheck
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - network
creates_events: false
ddtype: チェック
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/http_check/README.md'
display_name: HTTP
git_integration_title: http_check
guid: eb133a1f-697c-4143-bad3-10e72541fa9c
integration_id: ネットワーク
integration_title: HTTP チェック
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ネットワーク。
metric_to_check: network.http.response_time
name: http_check
public_title: Datadog-HTTP チェックの統合
short_description: 'レスポンス状況が悪い HTTP サービスや SSL の期限切れが近い HTTP サービスをモニターします certs, and more.'
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

HTTP チェックは [Datadog Agent][1] パッケージに含まれているので、HTTP サイトを調査するサーバーに追加で何かをインストールする必要はありません。メトリクス指向チェックの多くは、監視対象のサービスと同じホストで実行するのが最適ですが、このステータス指向チェックは、監視対象のサイトを実行していないホストから実行することが望ましい場合があります。

### コンフィグレーション

[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `http_check.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル http_check.d/conf.yaml][3] を参照してください。

```
init_config:

instances:
  - name: Example website
    url: https://example.com/
    # disable_ssl_validation: false      # デフォルトは true なので、SSL 検証をチェックするために false に設定します
    # ca_certs: /path/to/ca/file         # 例: /etc/ssl/certs/ca-certificates.crt
    # check_certificate_expiration: true # デフォルトは true
    # days_warning: 28                   # デフォルトは 14
    # days_critical: 14                  # デフォルトは 7
    # timeout: 3                         # 単位は秒。デフォルトは 10 です。
  - name: Example website (staging)
    url: http://staging.example.com/
```

HTTP チェックには一般的なチェックよりも多くの構成オプションがあり、上に示されているものはその一部です。多くのオプションはオプトインなので、必要なオプションを構成しない限り、Agent は SSL の有効性をチェックしません。ただし、期限切れが近い SSL 証明書のチェックはデフォルトで**実行されます**。

このチェックは、Agent コレクターを実行するたびに実行されます。デフォルトでは 15 秒ごとです。このチェックのカスタム実行頻度を設定するには、カスタムチェックドキュメントの[コレクション間隔][4]セクションを参照してください。

使用可能なオプションのすべてのリストと説明については、[サンプル http_check.d/conf.yaml][3] を参照してください。以下にそのリストを示します。

| 設定                          | 説明                                                                                                                                                                                                                                                                                                                 |
| ---                              | ---                                                                                                                                                                                                                                                                                                                         |
| `name`                           | このインスタンス/URL に関連付けられている名前。サービスチェックのタグとして提示されます。注: この名前タグでは、すべてのスペースまたはダッシュはアンダースコアに変換されます。                                                                                                                                                 |
| `url`                            | テストする URL。                                                                                                                                                                                                                                                                                                            |
| `timeout`                        | レスポンスに許可する秒数。                                                                                                                                                                                                                                                                                |
| `method`                         | HTTP メソッド。この設定はデフォルトで GET に設定されますが、POST や PUT など、その他の多くの HTTP メソッドがサポートされています。                                                                                                                                                                                                        |
| `data`                           | data オプションは、POST メソッドが使用される場合にのみ使用されます。データはキーと値のペアとして表され、リクエストの本文で送信されます。                                                                                                                                                                       |
| `content_match`                  | 文字列または Python 正規表現。HTTP チェックは、応答でこの値を検索し、文字列または表現が見つからない場合は DOWN として報告します。                                                                                                                                                          |
| `reverse_content_match`          | true の場合は、`content_match` オプションの動作を反転させます。つまり、`content_match` に文字列または式が検出された場合に HTTP チェックは DOWN として報告します。(デフォルトは false)                                                                                                                                         |
| `username` と `password`          | サービスが基本的な認証を使用している場合は、ここでユーザー名とパスワードを指定できます。                                                                                                                                                                                                                                  |
| `http_response_status_code`      | HTTP ステータスコードの文字列または Python 正規表現。このチェックは、一致しないステータスコードに対して DOWN を報告します。デフォルトで 1xx、2xx、3xx の HTTP ステータスコードになります。例: `401` または `4\d\d`。                                                                                                     |
| `include_content`                | `true` に設定されている場合、チェックは HTTP 応答本文の最初の 200 文字を通知に含めます。デフォルト値は `false` です。                                                                                                                                                                               |
| `collect_response_time`          | デフォルトでは、チェックは応答時間 (秒単位) をメトリクス `network.http.response_time` として収集します。無効にするには、この値を `false` に設定します。                                                                                                                                                                        |
| `disable_ssl_validation`         | この設定は SSL 証明書の検証を省略します。デフォルトでは有効です。SSL 証明書の検証が必要な場合は、これを `false` に設定します。このオプションは、指定されたエンドポイントから応答時間/状態を収集するためのみに使用されます。この設定は、`check_certificate_expiration` オプションには適用されません。 |
| `ignore_ssl_warning`             | SSL 証明書の検証が有効な場合 (上記の設定を参照)、この設定によってセキュリティ警告を無効にできます。                                                                                                                                                                                                   |
| `ca_certs`                       | この設定では、`init_config` で指定されているデフォルトの証明書パスを上書きします。                                                                                                                                                                                                                          |
| `check_certificate_expiration`   | `check_certificate_expiration` が有効な場合、サービスチェックは、SSL 証明書の有効期限をチェックします。これにより、`disable_ssl_validation` 設定の値に関係なく SSL 証明書が検証されます。                                                                    |
| `days_warning` と `days_critical` | `check_certificate_expiration` を有効にすると、指定された日数内に SSL 証明書の有効期限が存在する場合に、これらの設定によって警告または重要なアラートが発生します。                                                                                                                                      |
| `check_hostname`                 | `check_certificate_expiration` を有効にすると、SSL 証明書のホスト名が特定の URL と一致しない場合、この設定によって警告が発生します。                                                                                                                                                          |
| `ssl_server_name`                | `check_certificate_expiration` を有効にすると、この設定により、接続するサービスのホスト名が指定され、check_hostname が有効になっていると一致するホストが上書きされます。                                                                                                                                 |
| `headers`                        | このパラメーターを使用すると、リクエストで追加ヘッダーを送信できます。詳細な情報と注意については、[YAML ファイルのサンプル][5]を参照してください。                                                     |
| `skip_proxy`                     | 設定すると、チェックはプロキシ設定を迂回してチェック URL への直接アクセスを試みます。デフォルトでは `false` です。                                                                                                                                                                                                         |
| `allow_redirects`                | この設定を使用すると、サービスチェックは HTTP リダイレクトに従います。デフォルトは `true` です。                                                                                                                                                                                                                                      |
| `tags`                           | チェックと関連付けられる任意のタグのリスト。タグの詳細については、[タグのガイド][6]とブログ投稿「[タグ付けされたメトリクスの力][7]」を参照してください。                                                                                                                                      |


`http_check.d/conf.yaml` の構成を完了したら、[Agent を再起動][8]し、HTTP サービスチェックと応答時間の Datadog への送信を開始します。

### 検証

[Agent の `status` サブコマンドを実行][9]し、Checks セクションの `http_check` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "http_check" >}}


### イベント

HTTP チェックにはイベントは含まれません。

### サービスのチェック

Datadog でこれらのサービスチェックのアラート条件を作成するには、[Create Monitor][11] ページで 'Integration' ではなく 'Network' を選択します。

**`http.can_connect`**:

次のいずれかが発生したら `DOWN` を返します。

* `uri` へのリクエストがタイムアウトした
* 応答コードが 4xx/5xx または `http_response_status_code` で指定されているパターンコードと一致しない
* 応答本文が `content_match` のパターンと一致*しない*
* `reverse_content_match` が true で、応答本文が `content_match` のパターンを*含む*
* `uri` に `https` が含まれ、`disable_ssl_validation` が false であり、SSL 接続を検証できない

これら以外の場合は `UP` を返します。

**`http.ssl_cert`**:

チェックは次の内容を返します。

* `uri` の証明書が既に期限切れの場合は `DOWN`
* `uri` の証明書が `days_critical` 日未満に期限切れになる場合は `CRITICAL`
* `uri` の証明書が `days_warning` 日未満に期限切れになる場合は `WARNING`

これら以外の場合は `UP` を返します。

このチェックを無効にするには、`check_certificate_expiration` を false に設定します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/developers/write_agent_check/?tab=agentv6#collection-interval
[5]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/getting_started/tagging
[7]: https://www.datadoghq.com/blog/the-power-of-tagged-metrics
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/http_check/metadata.csv
[11]: https://app.datadoghq.com/monitors#/create
[12]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}