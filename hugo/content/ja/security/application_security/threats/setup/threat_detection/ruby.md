---
aliases:
- /ja/security_platform/application_security/getting_started/ruby
- /ja/security/application_security/getting_started/ruby
- /ja/security/application_security/enabling/tracing_libraries/threat_detection/ruby/
code_lang: ruby
code_lang_weight: 30
further_reading:
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-rb
  tag: ソースコード
  text: Ruby Datadog ライブラリソースコード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection Rules
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Troubleshooting App and API Protection
title: Ruby 向けに AAP を有効化する
type: multi-code-lang
---

You can monitor application security for Ruby apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted %}}

## Enabling threat detection
### 詳細はこちら

1. **Gemfile を更新して Datadog ライブラリを含めます**:

   ```ruby
   gem 'datadog', '~> 2.0' # Use 'ddtrace' if you're using v1.x
   ```

   サービスで使用している言語とフレームワークのバージョンが AAP の機能に対応しているか確認するには、[互換性][1] を参照してください。

   For more information about upgrading to v2 from a `dd-trace` 1.x version, see [the Ruby tracer upgrade guide][2].

2. **AAP を有効化**するには、APM トレーサーを有効にします。以下のオプションは、よくあるケースを想定したクイック セットアップです。詳細は [Ruby トレーサー ドキュメント][3] を参照してください。

   AAP は次のようにコードで有効化できます:

   {{< tabs >}}

{{% tab "Rails" %}}
   アプリケーションコードにイニシャライザーを追加して、APM トレーサーを有効にします。

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # APM トレーサーを有効化
     c.tracing.instrument :rails

     # AAP を有効化
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

または、自動インスツルメントするために Gemfile を更新して、自動インスツルメンテーションを通じて APM トレーサーを有効にします。

   ```ruby
   gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
   ```

また、`appsec` を有効にします。

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # APM トレーサーは自動インスツルメンテーションで有効化されています

     # AAP を有効化
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

{{% /tab %}}

{{% tab "Sinatra" %}}
   アプリケーションのスタートアップに以下を追加して、APM トレーサーを有効にします。

   ```ruby
   require 'sinatra'
   require 'datadog'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # APM トレーサーを有効化
     c.tracing.instrument :sinatra

     # Sinatra 向けに AAP を有効化
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```

または自動インスツルメンテーションで APM トレーサーを有効にします。

   ```ruby
   require 'sinatra'
   require 'datadog/auto_instrument'

   Datadog.configure do |c|
     # APM トレーサーは自動インスツルメンテーションで有効化されています

     # Sinatra 向けに AAP を有効化
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```
{{% /tab %}}

{{% tab "Rack" %}}
   `config.ru` ファイルに以下を追加して、APM トレーサーを有効にします。

   ```ruby
   require 'datadog'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # APM トレーサーを有効化
     c.tracing.instrument :rack

     # Rack 向けに AAP を有効化
     c.appsec.enabled = true
     c.appsec.instrument :rack
   end

   use Datadog::Tracing::Contrib::Rack::TraceMiddleware
   use Datadog::AppSec::Contrib::Rack::RequestMiddleware
   ```
{{% /tab %}}

{{< /tabs >}}

   Or one of the following methods, depending on where your application runs:

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

AAP の初期化はコードで行うか、サービス起動時に `DD_APPSEC_ENABLED` 環境変数を true に設定してください。
```shell
env DD_APPSEC_ENABLED=true rails server
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup/compatibility/ruby/
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide2.md
[3]: /ja/tracing/trace_collection/dd_libraries/ruby/