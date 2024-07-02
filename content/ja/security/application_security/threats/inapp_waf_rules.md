---
title: In-App WAF Rules
aliases:
  - /security_platform/application_security/event_rules
  - /security/application_security/event_rules
  - /security/application_security/threats/event_rules
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Protect against threats with Datadog Application Security Management
- link: /security/application_security/custom_rules/
  tag: Documentation
  text: Writing custom detection rules
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Troubleshoot common Datadog Application Security Management issues
---

## 概要

Application Security Management (ASM) を有効にすると、Datadog のトレーシングライブラリは、すべての Web サービスや API リクエストを積極的に監視し、疑わしいセキュリティアクティビティがないかどうかを確認します。

An _In-App WAF rule_ specifies conditions on the incoming request to define what the library considers suspicious. The Datadog tracing library includes hundreds of out-of-the-box ASM In-App WAF rules, which are used to display security traces in the trace explorer and in the default signal rules. 

トレーシングライブラリをアップグレードすることなく、アプリ内 WAF ルールに追加することができます。

## ASM アプリ内 WAF ルールの構造

An In-App WAF rule is a JSON object composed of a category, a name, tags, and conditions. When a security trace is detected, tags from the rules are propagated onto the security trace, and can be used to build [detection rules][1].

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

   <div class="alert alert-info">Custom in-app WAF rules is in beta.</div>

カスタムアプリ内 WAF ルールにより、ユーザーはアプリケーションへの特定のタイプのリクエストを記録したり、ブロックしたりすることができます。例えば、カスタムルールを使用して、ログインの成功または失敗を監視することができます。開始するには、**Security** -> **Application Security** -> **Protection** -> **In-App WAF** -> [**Custom Rules**][4] へ移動します。

**Note:** Default rules in in-app WAF are read-only. To refine your in-app WAF behavior, modify the in-app WAF rules. Default rules cannot be modified, however, you can create a custom rule based on one of the default rules, and modify the match conditions to your needs. Be sure to disable the default rule so that you don't have two similar rules evaluating the same requests. 

## ASM アプリ内 WAF ルールの構成

サービスのブロックは、ポリシールールで定義します。アプリ内 WAF には、*Datadog Recommended*、攻撃のみを監視する *Datadog Monitoring-only*、攻撃ツールをブロックし、その他のすべての攻撃を監視する *Datadog Block Attack tools* の 3 つの Datadog デフォルトポリシーが含まれています。

Services using a policy are visible directly in the policy management page.

1. Datadog で、[Security > Application Security > Protection > In-App WAF][2] に移動します。

   {{< img src="security/application_security/threats/waf/in-app-waf.png" alt="In-App WAF configuration page, showing two default policies." style="width:100%;" >}}

2. Click on the three dots to the right of one of the policies, and select **Download Configuration of this Policy** to download the configuration file to your local machine.
3. Optionally, select **Apply this Policy to Services** to apply a default policy to one or more of your protection enabled ASM services.

   **Note:** A policy can be applied to one or more services, but a service can only contain one _policy_.

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

Next, [configure detection rules to create security signals][1] based on those security traces defined by the In-App WAF rules you created. You can modify the provided out-of-the-box ASM detection rules or create new ones. 

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/custom_rules/
[2]: https://app.datadoghq.com/security/appsec/in-app-waf
[3]: /security/application_security/enabling/
[4]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-rules
