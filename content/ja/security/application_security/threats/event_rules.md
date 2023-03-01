---
aliases:
- /ja/security_platform/application_security/event_rules
- /ja/security/application_security/event_rules
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog Application Security Management で脅威から守る
- link: /security/application_security/custom_rules/
  tag: ドキュメント
  text: カスタム検出ルールの作成
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Datadog Application Security Management の一般的な問題のトラブルシューティング
kind: documentation
title: イベントルール
---

## 概要

Application Security Management (ASM) を有効にすると、Datadog のトレーシングライブラリは、すべての Web サービスや API リクエストを積極的に監視し、疑わしいセキュリティアクティビティがないかどうかを確認します。

_イベントルール_は、受信するリクエストの条件を指定し、ライブラリが何を疑わしいとみなすかを定義します。Datadog トレーシングライブラリは、何百ものすぐに使える ASM イベントルールを含んでおり、それらはトレースエクスプローラーやデフォルトシグナルルールで疑わしいリクエストを表示するために使用されます。

トレーシングライブラリをアップグレードすることなく、イベントルールに追加することができます。

## ASM イベントルールの構造

イベントルールは、カテゴリー、名前、タグ、条件からなる JSON オブジェクトです。不審なリクエストを検出すると、ルールのタグが不審なリクエストに伝搬され、[検出ルール][1]を構築するのに利用されます。

### 条件
条件は、ルールが受信リクエストにタグ付けするタイミングを定義します。条件は、_入力_と_演算子_で構成されます。

#### 入力
入力は、リクエストのどの部分に演算子が適用されるかを表します。イベントルールでは、以下の入力が使用されます。

| 名前 | 説明 | 例 |
|------|-------------|---------|
| `server.request.uri.raw` | アプリケーションサービスが受信した完全なリクエスト URI | `https://my.api.com/users/1234/roles?clientId=234` |
| `server.request.path_params` | パースされたパスパラメーター (キー/値マップ) | `userId => 1234` |
| `server.request.query` | パースされたクエリパラメーター (キー/値マップ) | `clientId => 234` |
| `server.request.headers.no_cookies` | Cookie ヘッダー (キー/値マップ) を除いた、受信する http リクエストのヘッダー | `user-agent => Zgrab, referer => google.com` |
| `grpc.server.request.message` | パースされた gRPC メッセージ (キー/値マップ) | `data.items[0] => value0, data.items[1] => value1` |
| `server.request.body` | パースされた HTTP 本文 (キー/値マップ) | `data.items[0] => value0, data.items[1] => value1` |
| `server.response.status` | http ステータスコード | `200` |

#### 演算子

| name | 説明 |
|------|-------------|
| `match_regex` | 入力に対して正規表現によるマッチングを実行する |
| `phrase_match` | キーワードリストマッチングを高速に実行する |
| `is_xss` | クロスサイトスクリプティング (XSS) ペイロードをチェックするための特別な演算子 |
| `is_sqli` | SQL インジェクション (SQLI) ペイロードをチェックするための特別な演算子 |

## サービスに ASM イベントルールを構成する

1. Datadog で、[ASM 構成のイベントルール][2]ページに移動します。

2. 右上の **Download Configuration** をクリックすると、コンフィギュレーションファイル `appsec-rules.json` がローカルマシンにダウンロードされます。

3. 上記の仕様に従って、新しいルールの JSON 定義を含むようにファイルを更新します。例:

   {{< code-block lang="json" collapsible="true" >}}
    {
        "id": "id-123",
        "name": "My event rule",
        "tags": {
            "category": "attack_attempt",
            "crs_id": "920260",
            "type": "http_protocol_violation"
        },
        "conditions": [
            {
                "operator": "match_regex",
                "parameters": {
                    "inputs": [
                        {
                            "address": "server.request.uri.raw"
                        }
                    ],
                    "options": {
                        "case_sensitive": true,
                        "min_length": 6
                    },
                    "regex": "\\%u[fF]{2}[0-9a-fA-F]{2}"
                }
            }
        ],
        "transformers": []
    },
   {{< /code-block >}}

4. SCP や FTP などのユーティリティを使用して、`appsec-rules.json` ファイルを `/home/asm/appsec-rules.json` などのアプリケーションサーバーにコピーします。

5. [ASM の概要][3]にある、環境にアプリケーション変数を追加する方法に従って、`DD_APPSEC_RULES` 環境変数をファイルにフルパスでサービスに追加します。
   ```
   DD_APPSEC_RULES=/home/asm/appsec-rules.json
   ```

6. サービスを再起動します。

## 次にやるべきこと

次に、作成したイベントルールで定義された疑わしいリクエストに基づいて、[セキュリティシグナルを生成するための検出ルールを構成][1]します。ASM の検出ルールは、すぐに利用可能なものを変更したり、新しいものを作成したりすることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/custom_rules/
[2]: https://app.datadoghq.com/security/appsec/event-rules
[3]: /ja/security/application_security/getting_started/