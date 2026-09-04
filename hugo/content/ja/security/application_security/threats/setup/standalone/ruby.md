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
  text: トレースにユーザー情報を追加する
- link: https://github.com/DataDog/dd-trace-rb
  tag: ソース コード
  text: Ruby Datadog ライブラリのソース コード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App & API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App & API Protection のトラブルシューティング
title: Ruby 向け Application & API Protection の有効化
type: multi-code-lang
---

Docker、Kubernetes、Amazon ECS、AWS Fargate 上で実行されている Ruby アプリのアプリケーション セキュリティを監視できます。

{{% appsec-getstarted-standalone %}}

## Application & API Protection の有効化
### はじめに

1. **Gemfile を更新して Datadog ライブラリを追加します**:

   ```ruby
   gem 'datadog', '~> 2.0' # Use 'ddtrace' if you're using v1.x
   ```

   Application & API Protection 機能でサービスの言語とフレームワークのバージョンがサポートされているか確認するには、[互換性][1] を参照してください。

   `dd-trace` 1.x から v2 へのアップグレードの詳細は、[Ruby トレーサーのアップグレード ガイド][2] を参照してください。

2. **APM トレーサーを有効化して Application & API Protection を有効にします**。以下のオプションは、最も一般的なケースをカバーするクイック セットアップです。詳細は [Ruby トレーサーのドキュメント][3] を参照してください。

   Application & API Protection は、コード内で有効化できます:

   {{< tabs >}}

{{% tab "Rails" %}}
   アプリケーション コードに initializer を追加して APM トレーサーを有効化します:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # APM トレーサーを有効化しつつ、トレース処理は無効化する (セキュリティ用途のみ)
     c.tracing.instrument :rails
     c.tracing.enabled = false

     # Application & API Protection を有効化する
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

   または、Gemfile を更新して自動インスツルメンテーションで APM トレーサーを有効化します:

   ```ruby
   gem 'datadog', '~> 2.0', require: 'datadog/auto_instrument'
   ```

   さらに `appsec` を有効にし、トレーシングを無効化します:

   ```ruby
   # config/initializers/datadog.rb

   require 'datadog/appsec'

   Datadog.configure do |c|
     # APM トレーサーは自動インスツルメンテーションによって有効化されます
     c.tracing.enabled = false

     # Application & API Protection を有効化する
     c.appsec.enabled = true
     c.appsec.instrument :rails
   end
   ```

{{% /tab %}}

{{% tab "Sinatra" %}}
   アプリケーションの起動時に次を追加して APM トレーサーを有効化します:

   ```ruby
   require 'sinatra'
   require 'datadog'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # APM トレーサーを有効化しつつ、トレース処理は無効化する (セキュリティ用途のみ)
     c.tracing.instrument :sinatra
     c.tracing.enabled = false

     # Sinatra 向けに Application & API Protection を有効化する
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```

   または、自動インスツルメンテーションで APM トレーサーを有効化します:

   ```ruby
   require 'sinatra'
   require 'datadog/auto_instrument'

   Datadog.configure do |c|
     # APM トレーサーは自動インスツルメンテーションによって有効化されます
     c.tracing.enabled = false

     # Sinatra 向けに Application & API Protection を有効化する
     c.appsec.enabled = true
     c.appsec.instrument :sinatra
   end
   ```
{{% /tab %}}

{{% tab "Rack" %}}
   `config.ru` ファイルに次を追加して APM トレーサーを有効化します:

   ```ruby
   require 'datadog'
   require 'datadog/appsec'

   Datadog.configure do |c|
     # APM トレーサーを有効化しつつ、トレース処理は無効化する (セキュリティ用途のみ)
     c.tracing.instrument :rack
     c.tracing.enabled = false

     # Rack 向けに Application & API Protection を有効化する
     c.appsec.enabled = true
     c.appsec.instrument :rack
   end

   use Datadog::Tracing::Contrib::Rack::TraceMiddleware
   use Datadog::AppSec::Contrib::Rack::RequestMiddleware
   ```
{{% /tab %}}

{{< /tabs >}}

   または、アプリケーションの実行環境に応じて次のいずれかの方法を使用します:

   {{< tabs >}}
{{% tab "Docker CLI" %}}

APM 用の構成として、`docker run` コマンドに以下の引数を追加します:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true -e DD_APM_TRACING_ENABLED=false [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

コンテナの Dockerfile に以下の環境変数を追加します:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM 用に、構成 YAML ファイルでコンテナの設定を更新し、環境変数を追加します:

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
            - name: DD_APM_TRACING_ENABLED
              value: "false"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

ECS のタスク定義 JSON ファイルの environment セクションに次を追加します:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  },
  {
    "name": "DD_APM_TRACING_ENABLED",
    "value": "false"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

コード内で Application & API Protection を初期化するか、サービス起動時に環境変数を設定します:
```shell
env DD_APPSEC_ENABLED=true DD_APM_TRACING_ENABLED=false rails server
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Signals Explorer と詳細、Vulnerabilities Explorer と詳細を示す動画。" video="true" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup/compatibility/ruby/
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide2.md
[3]: /ja/tracing/trace_collection/dd_libraries/ruby/