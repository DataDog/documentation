---
aliases:
- /ja/security/application_security/policies/inapp_waf_rules/
- /ja/security_platform/application_security/event_rules
- /ja/security/application_security/event_rules
- /ja/security/application_security/threats/inapp_waf_rules
title: アプリ内 WAF ルール
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

## 概要 {#overview}

App and API Protection (AAP) を有効にすると、Datadog SDK はすべての Web サービスおよび API リクエストを監視し、不審なセキュリティアクティビティを検出します。

_アプリ内 WAF ルール_は、受信リクエストに対する条件を指定し、ライブラリが何を不審と見なすかを定義します。Datadog SDK には、すぐに使用できる AAP アプリ内 WAF ルールが多数含まれており、トレースエクスプローラーやデフォルトのシグナルルールでセキュリティトレースを表示するために使用されます。

SDK をアップグレードすることなく、アプリ内 WAF ルールを追加することができます。

## AAP アプリ内 WAF ルールの構造 {#structure-of-an-aap-in-app-waf-rule}

アプリ内 WAF ルールは、カテゴリ、名前、タグ、条件で構成される JSON オブジェクトです。セキュリティトレースが検出されると、ルールからのタグがセキュリティトレースに伝播され、[検出ルール][1]の構築に使用できます。

### 条件 {#conditions}
条件は、ルールが受信リクエストにタグを付けるタイミングを定義します。条件は、_入力_と_演算子_で構成されます。

#### 入力 {#inputs}
入力は、演算子がリクエストのどの部分に適用されるかを表します。アプリ内 WAF ルールでは、以下の入力が使用されます。

| 名前 | 説明 | 例 |
|------|-------------|---------|
| `server.request.uri.raw` | アプリケーションサービスが受信した完全なリクエスト URI | `https://my.api.com/users/1234/roles?clientId=234` |
| `server.request.path_params` | パースされたパスパラメーター (キー/値マップ) | `userId => 1234` |
| `server.request.query` | パースされたクエリパラメーター (キー/値マップ) | `clientId => 234` |
| `server.request.headers.no_cookies` | Cookie ヘッダーを除いた受信 http リクエストヘッダー (キー/値マップ)| `user-agent => Zgrab, referer => google.com` |
| `grpc.server.request.message` | パースされた gRPC メッセージ (キー/値マップ) | `data.items[0] => value0, data.items[1] => value1` |
| `server.request.body` | パースされた HTTP 本文 (キー/値マップ) | `data.items[0] => value0, data.items[1] => value1` |
| `server.response.status` | http ステータスコード | `200` |

#### 演算子 {#operators}

| 名前 | 説明 |
|------|-------------|
| `match_regex` | 入力に対して正規表現によるマッチングを実行する |
| `phrase_match` | 高速なキーワードリストマッチングを実行する|
| `is_xss` | クロスサイトスクリプティング (XSS) ペイロードをチェックする特別な演算子 |
| `is_sqli` | SQL インジェクション (SQLI) ペイロードをチェックする特別な演算子 |

## カスタムアプリ内 WAF ルール {#custom-in-app-waf-rules}

カスタムアプリ内 WAF ルールを使用すると、ユーザーはアプリケーションに対する特定のタイプのリクエストをログに記録したりブロックしたりできます。たとえば、カスタムルールを使用してログインの成功や失敗を監視することができます。開始するには、[{{< ui >}}Security{{< /ui >}}] (セキュリティ) > [{{< ui >}}App & API Protection{{< /ui >}}] > [{{< ui >}}Policies{{< /ui >}}] (ポリシー) > [{{< ui >}}In-App WAF{{< /ui >}}] (アプリ内 WAF) > [[{{< ui >}}Custom Rules{{< /ui >}}] (カスタムルール)][4] に移動します。

**注:** アプリ内 WAF のデフォルトルールは読み取り専用です。アプリ内 WAF の動作を調整するには、アプリ内 WAF ルールを変更します。デフォルトルールは変更できませんが、デフォルトルールのいずれかに基づいてカスタムルールを作成し、ニーズに合わせてマッチ条件を変更することができます。同じリクエストを評価する類似のルールが重複しないよう、必ずデフォルトルールを無効にしてください。

## 推奨ルール {#suggested-rules}

Datadog の App and API Protection [推奨ルール][5]機能は、アプリケーションのトラフィックを自動的に分析し、ログインフローや API フローの監視と保護に役立つルールを提案します。ルールは、不審なログイン動作を検出するための最も重要なシグナルである `users.login.success` や `users.login.failure` といった一般的な認証パターンに基づいて事前に構築されています。

推奨ルールの利点は以下のとおりです。

- 認証エンドポイントのベースラインカバレッジを提供することで手動構成を削減します。
- ブルートフォース、クレデンシャルスタッフィング、自動化されたログイン不正利用などの一般的な攻撃ベクトルからの保護をサービスや環境全体にデプロイする速度を向上させます。
- ログイン試行に関する高精度のテレメトリを提供して、ログイン失敗の急増、同じ IP からの繰り返し試行、異常な地域からのログインアクティビティなどの異常なパターンに関連付けられるようにします。
- [アカウント乗っ取り (ATO) 保護][6]の可視性を提供します。ATO キャンペーンのほとんどは、異常な認証アクティビティを通じて最初に表面化します。
- アカウントが侵害される前にクレデンシャルの不正利用を検出して対応します。

推奨ルールの使用例は次のとおりです。

  * ブルートフォース、クレデンシャルスタッフィング、ボットによるログイン不正利用に対する保護を迅速にデプロイする。
  * ログイン試行の成功と失敗を追跡して条件 (例: POST メソッドと 401/403 エラー) を調整することで、推奨ルールを ATO 保護のベースラインとして使用する。
  * サービス全体で一貫した検出ロジックを適用して、監視の行き届いていない環境での防御の回避を困難にする。
  * 異常なログインアクティビティ (失敗の急増、失敗が繰り返された後の異常なログイン成功率など) を監視することで、**アカウント乗っ取りの試み**の兆候を検出する。

推奨ルールを使用するには、次のいずれかの操作を行います。
- 推奨ルールからカスタムルールを作成する:
  1. [[Suggested Rules] (推奨ルール)][5] で、1つ以上のルールを選択し、[{{< ui >}}Create Selected Suggested Rules{{< /ui >}}] (選択した推奨ルールを作成) をクリックします。
  2. [{{< ui >}}Create suggested custom In-App WAF rules{{< /ui >}}] (推奨カスタムアプリ内 WAF ルールを作成) で、[{{< ui >}}Create rules{{< /ui >}}] (ルールを作成) をクリックします。これにより、選択したルールのセキュリティアクティビティを監視するカスタムアプリ内 WAF ルールが作成されます。
- 推奨ルールを変更してカスタムルールを作成する:
  1. [[Suggested Rules]][5] で、使用するルールを特定し、[{{< ui >}}View suggested rule{{< /ui >}}] (推奨ルールを表示) をクリックします。
  2. [{{< ui >}}Add a new Business Logic{{< /ui >}}] (新しいビジネスロジックを追加) で、必要に応じてルールを編集します。
  3. [{{< ui >}}Continue in In-App WAF{{< /ui >}}] (アプリ内 WAF で続行) をクリックします。
  4. [{{< ui >}}Define your custom rule{{< /ui >}}] (カスタムルールを定義) で、さらに変更を加えます。
  5. [{{< ui >}}Save Rule{{< /ui >}}] (ルールを保存) をクリックします。


## AAP アプリ内 WAF ルールの構成 {#configure-an-aap-in-app-waf-rule}

サービスのブロックは、ポリシールールで定義します。アプリ内 WAF には、*Datadog Recommended*、攻撃の監視のみを行う *Datadog Monitoring-only*、攻撃ツールのブロックとその他のすべての攻撃の監視を行う *Datadog Block Attack tools* の 3 つの Datadog デフォルトポリシーが含まれています。

ポリシーが適用されているサービスは、ポリシー管理ページで直接確認できます。

1. Datadog で [[{{< ui >}}Security{{< /ui >}}] > [{{< ui >}}App & API Protection{{< /ui >}}] > [{{< ui >}}Policies{{< /ui >}}] > [{{< ui >}}In-App WAF{{< /ui >}}]][2] の順に移動します。

   {{< img src="security/application_security/threats/waf/in-app-waf.png" alt="2 つのデフォルトポリシーが表示されているアプリ内 WAF 構成ページ。" style="width:100%;" >}}

2. いずれかのポリシーの右側にある 3 つのドットをクリックして [{{< ui >}}Download Configuration of this Policy{{< /ui >}}] (このポリシーの構成をダウンロード) を選択し、構成ファイルをローカルマシンにダウンロードします。
3. 必要に応じて [{{< ui >}}Apply this Policy to Services{{< /ui >}}] (このポリシーをサービスに適用) を選択し、保護が有効な 1 つ以上の AAP サービスにデフォルトポリシーを適用します。

   **注:** ポリシーは複数のサービスに適用できますが、1 つのサービスには 1 つの_ポリシー_しか含めることができません。

3. 上記の仕様に従って、新しいルールの JSON 定義を含むようにファイルを更新します。たとえば、次のようになります。

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

4. SCP や FTP などのユーティリティを使用して、`appsec-rules.json` ファイルをアプリケーションサーバー (例: `/home/asm/appsec-rules.json`) にコピーします。

5. [AAP の有効化][3]にある、環境にアプリケーション変数を追加する方法に従って、`DD_APPSEC_RULES` 環境変数をサービスに追加します (ファイルへのフルパスを使用)。
   ```
   DD_APPSEC_RULES=/home/asm/appsec-rules.json
   ```

6. サービスを再起動します。

## 次にやるべきこと {#what-to-do-next}

次に、作成したアプリ内 WAF ルールで定義されたセキュリティトレースに基づいて、[セキュリティシグナルを生成するための検出ルールを構成][1]します。提供されている標準の AAP 検出ルールを変更することも、新しいルールを作成することもできます。

[1]: /ja/security/application_security/threat_protection/policies/custom_rules/
[2]: https://app.datadoghq.com/security/appsec/in-app-waf
[3]: /ja/security/application_security/setup/
[4]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules
[5]: https://app.datadoghq.com/security/appsec/policies/in-app-waf?config_by=suggested-rules
[6]: /ja/security/application_security/threat_protection/account_takeover_protection/