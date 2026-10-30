---
code_lang: linux
code_lang_weight: 30
further_reading:
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: App and API Protection の仕組み
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
title: Linux で Java 用の App and API Protection をセットアップする
type: multi-code-lang
---
{{% app_and_api_protection_java_setup_options platform="linux" %}}

{{% app_and_api_protection_java_overview %}}

## 前提条件{#prerequisites}

- Linux オペレーティングシステム
- Java アプリケーション
- root 権限または sudo 権限
- Systemd (サービス管理用)
- Datadog API キー
- Datadog Java SDK (バージョン要件は[こちら][1]を参照してください)

## 1. Datadog Agent をインストールする {#1-installing-the-datadog-agent}

[Linux ホストのセットアップ手順][3]に従って Datadog Agent をインストールします。

## 2. App and API Protection モニタリングを有効にする{#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### App and API Protection モニタリングを手動で有効にする{#manually-enabling-app-and-api-protection-monitoring}

Datadog Java ライブラリの最新版をダウンロードします。

```bash
wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
```

{{% collapse-content title="APM トレースが有効" level="h4" %}}
{{< tabs >}}
{{% tab "システムプロパティの使用" %}}

システムプロパティを使用して、Datadog Agent と App and API Protection を有効にした状態で Java アプリケーションを起動します。

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```

{{% /tab %}}
{{% tab "環境変数の使用" %}}

必要な環境変数を設定し、Java アプリケーションを起動します。

```bash
export DD_APPSEC_ENABLED=true
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>

java -javaagent:/path/to/dd-java-agent.jar -jar path/to/app.jar
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="APM トレースが無効" level="h4" %}}
App and API Protection を有効にしたまま APM トレースを無効にするには、APM トレース変数を [false] に設定する必要があります。
{{< tabs >}}
{{% tab "システムプロパティの使用" %}}

システムプロパティを使用して、Datadog Agent と App and API Protection を有効にした状態で Java アプリケーションを起動します。

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.apm.tracing.enabled=false -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```

{{% /tab %}}
{{% tab "環境変数の使用" %}}

必要な環境変数を設定し、Java アプリケーションを起動します。

```bash
export DD_APPSEC_ENABLED=true
export DD_APM_TRACING_ENABLED=false
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>

java -javaagent:/path/to/dd-java-agent.jar -jar path/to/app.jar
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. アプリケーションを実行する{#3-run-your-application}

上記の設定で Java アプリケーションを起動します。

{{% aap/aap_and_api_protection_verify_setup %}}

## トラブルシューティング{#troubleshooting}

Java アプリケーションの App and API Protection の設定中に問題が発生した場合は、「[Java App and API Protection トラブルシューティングガイド][2]」を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup/compatibility/java
[2]: /ja/security/application_security/setup/java/troubleshooting
[3]: /ja/agent/?tab=Linux