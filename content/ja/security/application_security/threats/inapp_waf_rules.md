---
aliases:
- /ja/security_platform/application_security/event_rules
- /ja/security/application_security/event_rules
- /ja/security/application_security/threats/event_rules
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Datadog Application Security Management で脅威から守る
- link: /security/application_security/custom_rules/
  tag: Documentation
  text: カスタム検出ルールの作成
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Datadog Application Security Management の一般的な問題のトラブルシューティング
title: アプリ内 WAF ルール
---

## 概要

Application Security Management (ASM) を有効にすると、Datadog のトレーシングライブラリは、すべての Web サービスや API リクエストを積極的に監視し、疑わしいセキュリティアクティビティがないかどうかを確認します。

_アプリ内 WAF ルール_は、受信するリクエストの条件を指定し、ライブラリが何を疑わしいとみなすかを定義します。Datadog トレーシングライブラリは、何百ものすぐに使える ASM アプリ内 WAF ルールを含んでおり、それらはトレースエクスプローラーやデフォルトシグナルルールでセキュリティトレースを表示するために使用されます。

トレーシングライブラリをアップグレードすることなく、アプリ内 WAF ルールに追加することができます。

## ASM アプリ内 WAF ルールの構造

アプリ内 WAF ルールは、カテゴリー、名前、タグ、条件からなる JSON オブジェクトです。セキュリティトレースを検出すると、ルールのタグがセキュリティトレースに伝搬され、[検出ルール][1]を構築するのに利用されます。

### 条件
条件は、ルールが受信リクエストにタグ付けするタイミングを定義します。条件は、_入力_と_演算子_で構成されます。

#### 入力
入力は、リクエストのどの部分に演算子が適用されるかを表します。アプリ内 WAF ルールでは、以下の入力が使用されます。

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

## カスタムアプリ内 WAF ルール

<div class="alert alert-info">カスタムアプリ内 WAF ルールはベータ版です。</div>

カスタムアプリ内 WAF ルールにより、ユーザーはアプリケーションへの特定のタイプのリクエストを記録したり、ブロックしたりすることができます。例えば、カスタムルールを使用して、ログインの成功または失敗を監視することができます。開始するには、**Security** -> **Application Security** -> **Protection** -> **In-App WAF** -> [**Custom Rules**][4] へ移動します。

**注:** アプリ内 WAF のデフォルトのルールは読み取り専用です。アプリ内 WAF の動作を精緻化するには、アプリ内 WAF ルールを修正します。デフォルトのルールを変更することはできませんが、デフォルトのルールの 1 つに基づいてカスタムルールを作成し、必要に応じて一致条件を変更することができます。同じリクエストを評価する 2 つの似たルールが存在することにならないように、デフォルトのルールは必ず無効にしてください。

## ASM アプリ内 WAF ルールの構成

サービスのブロックは、ポリシールールで定義します。アプリ内 WAF には、*Datadog Recommended*、攻撃のみを監視する *Datadog Monitoring-only*、攻撃ツールをブロックし、その他のすべての攻撃を監視する *Datadog Block Attack tools* の 3 つの Datadog デフォルトポリシーが含まれています。

ポリシーを使用しているサービスは、ポリシー管理ページに直接表示されます。

1. Datadog で、[Security > Application Security > Protection > In-App WAF][2] に移動します。

   {{< img src="security/application_security/threats/waf/in-app-waf.png" alt="2 つのデフォルトポリシーを示すアプリ内 WAF 構成ページ。" style="width:100%;" >}}

2. ポリシーの右側にある 3 つの点をクリックし、**Download Configuration of this Policy** を選択すると、コンフィギュレーションファイルがローカルマシンにダウンロードされます。
3. オプションで、**Apply this Policy to Services** を選択すると、保護が有効な 1 つまたは複数の ASM サービスにデフォルトポリシーが適用されます。

   **注:** ポリシーは 1 つ以上のサービスに適用できますが、1 つのサービスには 1 つの_ポリシー_しか含めることができません。

3. 上記の仕様に従って、新しいルールの JSON 定義を含むようにファイルを更新します。例:

   {{< code-block lang="json" collapsible="true" >}}
    {
        "id": "id-123",
        "name": "My In-App WAF rule",
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

5. [ASM の有効化][3]にある、環境にアプリケーション変数を追加する方法に従って、`DD_APPSEC_RULES` 環境変数をファイルにフルパスでサービスに追加します。
   ```
   DD_APPSEC_RULES=/home/asm/appsec-rules.json
   ```

6. サービスを再起動します。

## 次にやるべきこと

次に、作成したアプリ内 WAF ルールで定義されたセキュリティトレースに基づいて、[セキュリティシグナルを生成するための検出ルールを構成][1]します。ASM の検出ルールは、すぐに利用可能なものを変更したり、新しいものを作成したりすることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/custom_rules/
[2]: https://app.datadoghq.com/security/appsec/in-app-waf
[3]: /ja/security/application_security/enabling/
[4]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules