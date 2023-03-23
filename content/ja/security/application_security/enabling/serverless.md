---
aliases:
- /ja/security/application_security/getting_started/serverless
code_lang: サーバーレス
code_lang_weight: 90
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: アプリケーションセキュリティの仕組み
- link: /security/default_rules/#cat-application-security
  tag: Documentation
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Application Security Management のトラブルシューティング
- link: /security/application_security/threats/
  tag: Documentation
  text: Application Threat Monitoring and Protection
is_beta: true
kind: documentation
title: AWS Lambda の ASM を有効にする
type: multi-code-lang
---

<div class="alert alert-info">AWS Lambda の ASM サポートはベータ版です。脅威の検出は Lambda の拡張機能を利用することで行われます。</div>

AWS Lambda で実行する関数を Datadog Application Security Management (ASM) で監視することができます。サーバーレス関数でサポートされる ASM の機能については、[セットアップと構成][4]を参照してください。

一般的に AWS Lambda に ASM を設定する場合、以下のような内容になります。

1. ASM の恩恵を最も受けられる脆弱な関数や攻撃を受けている関数を特定する。[サービスカタログの Security タブ][1]で検索してください。
2. [Datadog Serverless Framework プラグイン][6]を使用するか、手動で各レイヤーを設定することにより、ASM インスツルメンテーションを設定する。
3. アプリケーションでセキュリティシグナルをトリガーし、その結果の情報を Datadog がどのように表示するかを確認する。

## 前提条件

- [サーバーレス APM][2] は、Lambda 関数上でトレースを Datadog に直接送信するよう構成されています。APM にトレースデータを送るための X-Ray インテグレーションは、ASM が関数を監視するために必要なデータをサポートしていません。

## 詳細はこちら

{{< tabs >}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Framework プラグイン][1]は、[Datadog Lambda 拡張機能][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を自動的に構成します。

Datadog Serverless Framework プラグインをインストールして構成するには

1. Datadog Serverless Framework プラグインをインストールします。
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```
2. `serverless.yml` (または関数に環境変数を設定する方法) を更新して、ASM を有効にします。
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```
   **Go 関数のみ**の場合は、さらに以下を追加します。
   ```yaml
   environment:
     DD_UNIVERSAL_INSTRUMENTATION: true
   ```
   **NodeJS または Python の関数**の場合は、さらに以下を追加します。
   ```yaml
   environment:
     DD_EXPERIMENTAL_ENABLE_PROXY: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```
3. 関数を再デプロイして呼び出します。数分後、[ASM ビュー][3]に表示されます。

[1]: /ja/serverless/serverless_integrations/plugin
[2]: /ja/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}

{{% tab "Custom" %}}

1. Datadog トレーサーをインストールします。
   - **Java**: Lambda がデプロイされている場所に応じて、以下のいずれかの形式の ARN を使用して Lambda 関数の[レイヤーを構成します][1]。`<AWS_REGION>` は `us-east-1` などの有効な AWS リージョンに置き換えてください。
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:8
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:8
     ```
   - **Go**: Go トレーサーはレイヤーに依存せず、通常の Go モジュールとして使用できます。以下で最新バージョンにアップグレードできます。
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET**: Lambda がデプロイされている場所に応じて、以下のいずれかの形式の ARN を使用して Lambda 関数の[レイヤーを構成します][1]。`<AWS_REGION>` は `us-east-1` などの有効な AWS リージョンに置き換えてください。
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:6
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet-ARM:6
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:6
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:6
     ```
2. 以下のいずれかの関数で ARN を使用して Lambda 関数のレイヤーを構成し、Datadog Lambda 拡張機能をインストールします。`<AWS_REGION>` は、`us-east-1` など有効な AWS リージョンに置き換えてください。
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:36
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:36
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:36
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:36
   ```

3. 関数のデプロイ時に以下の環境変数を追加して、ASM を有効にします。
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```
   **Go 関数のみ**の場合は、さらに以下を追加します。
   ```yaml
   environment:
     DD_UNIVERSAL_INSTRUMENTATION: true
   ```
   **NodeJS または Python の関数**の場合は、さらに以下を追加します。
   ```yaml
   environment:
     DD_EXPERIMENTAL_ENABLE_PROXY: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```
4. 関数を再デプロイして呼び出します。数分後、[ASM ビュー][3]に表示されます。

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

アプリケーションセキュリティ管理の脅威検出のアクションを見るには、既知の攻撃パターンをアプリケーションに送信します。例えば、`acunetix-product` という値を持つ HTTP ヘッダーを送信すると、[セキュリティスキャナー攻撃][5]の試行がトリガーされます。
   ```sh
   curl -H 'My-ASM-Test-Header: acunetix-product' https://your-function-url/existing-route
   ```
アプリケーションを有効にして実行すると、数分後に[アプリケーションシグナルエクスプローラー][3]に脅威情報が表示されます。

{{< img src="/security/application_security/application-security-signal.png" alt="Security Signal 詳細ページでは、タグ、メトリクス、次のステップの提案、脅威と関連する攻撃者の IP アドレスが表示されます。" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?env=prod&hostGroup=%2A&lens=Security
[2]: /ja/serverless/distributed_tracing/?tab=python
[3]: https://app.datadoghq.com/security/appsec
[4]: /ja/security/application_security/threats/setup_and_configure/?code-lang=serverless
[5]: /ja/security/default_rules/security-scan-detected/
[6]: /ja/serverless/libraries_integrations/plugin/