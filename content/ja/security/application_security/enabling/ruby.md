---
aliases:
- /ja/security_platform/application_security/getting_started/ruby
- /ja/security/application_security/getting_started/ruby
code_lang: ruby
code_lang_weight: 30
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-rb
  tag: GitHub
  text: Ruby Datadog ライブラリソースコード
- link: /security/default_rules/#cat-application-security
  tag: Documentation
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Application Security Management のトラブルシューティング
kind: documentation
title: Ruby の ASM を有効にする
type: multi-code-lang
---

Docker、Kubernetes、Amazon ECS、および AWS Fargate で実行されている Ruby アプリケーションのセキュリティを監視することができます。

{{% appsec-getstarted %}}

## 脅威検出を有効にする
### はじめに

1. **Gemfile を更新して Datadog ライブラリを含めます**:

   ```ruby
   gem 'ddtrace', '~> 1.1'
   ```

   サービスの言語やフレームワークのバージョンが ASM 機能に対応しているかどうかは、[互換性][1]をご参照ください。

   `dd-trace` 0.x バージョンからのアップグレードの詳細については、[Ruby トレーサーアップグレードガイド][2]を参照してください。

2. APMトレーサーを有効にすることで、**ASM を有効にします**。以下のオプションは、最も一般的なケースをカバーするクイックセットアップを説明します。詳細については、[Ruby トレーサーのドキュメント][3]をお読みください。

   コード内で ASM を有効にすることができます。

   {{< tabs >}}

{{% tab "Rails" %}}
   アプリケーションコードにイニシャライザーを追加して、APM トレーサーを有効にします。

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # APM トレーサーを有効にする
     c.tracing.instrument :rails

     # ASM を有効にする
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

または、自動インスツルメントするために Gemfile を更新して、自動インスツルメンテーションを通じて APM トレーサーを有効にします。

   ```ruby
   gem 'ddtrace', '~> 1.1', require: 'ddtrace/auto_instrument'
   ```

また、`appsec` を有効にします。

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # APM トレーサーは自動インスツルメンテーションで有効になっている

     # ASM を有効にする
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

{{% /tab %}}

{{% tab "Sinatra" %}}
   アプリケーションのスタートアップに以下を追加して、APM トレーサーを有効にします。

   ```ruby
   require 'sinatra'
   require 'ddtrace'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # APM トレーサーを有効にする
     c.tracing.instrument :sinatra

     # ASM for Sinatra を有効にする
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```

または自動インスツルメンテーションで APM トレーサーを有効にします。

   ```ruby
   require 'sinatra'
   require 'ddtrace/auto_instrument'

   Datadog.configure do |c|
     # APM トレーサーは自動インスツルメンテーションで有効になっている

     # ASM for Sinatra を有効にする
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```
{{% /tab %}}

{{% tab "Rack" %}}
   `config.ru` ファイルに以下を追加して、APM トレーサーを有効にします。

   ```ruby
   require 'ddtrace'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # APM トレーサーを有効にする
     c.tracing.instrument :rack

     # ASM for Rack を有効にする
     c.appsec.enabled = true
     c.appsec.instrument :rack
   end

   use Datadog::Tracing::Contrib::Rack::TraceMiddleware
   use Datadog::AppSec::Contrib::Rack::RequestMiddleware
   ```
{{% /tab %}}

{{< /tabs >}}

または、アプリケーションの実行場所に応じて、以下の方法のいずれかを使用します。

   {{< tabs >}}
{{% tab "Docker CLI" %}}

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM 用の構成 yaml ファイルコンテナを更新し、AppSec の環境変数を追加します。

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

以下を環境セクションに追加して、ECS タスク定義 JSON ファイルを更新します。

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

コード内で ASM を初期化するか、サービスの呼び出し時に環境変数 `DD_APPSEC_ENABLED` を true に設定します。
```shell
env DD_APPSEC_ENABLED=true rails server
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/application-security-signal.png" alt="Security Signal 詳細ページでは、タグ、メトリクス、次のステップの提案、脅威と関連する攻撃者の IP アドレスが表示されます。" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/enabling/compatibility/ruby
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[3]: /ja/tracing/trace_collection/dd_libraries/ruby/