---
code_lang: docker
code_lang_weight: 10
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
title: Docker で Python 用の App and API Protection をセットアップする
type: multi-code-lang
---
{{% app_and_api_protection_python_setup_options platform="docker" %}}

{{% app_and_api_protection_python_overview %}}

## 前提条件 {#prerequisites}

- ホストに Docker がインストールされている
- Docker でコンテナ化された Python アプリケーション
- Datadog API キー
- Datadog Python SDK ([バージョン要件][1] を参照)

## 1. Datadog Agent をインストールする {#1-installing-the-datadog-agent}

[Docker のセットアップ手順](/agent/?tab=cloud_and_container)に従って Datadog Agent をインストールします。

## 2. App and API Protection モニタリングを有効化する {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_python_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### App and API Protection モニタリングを手動で有効化する {#manually-enabling-app-and-api-protection-monitoring}

{{% collapse-content title="APM トレースを有効にする場合" level="h4" %}}

Dockerfile に次の環境変数を追加します。

```dockerfile
# Install the Datadog Python SDK
RUN pip install ddtrace

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Use ddtrace-run to start your application
CMD ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

{{% collapse-content title="APM トレースを無効にする場合" level="h4" %}}
App and API Protection を有効にしたまま APM トレースを無効にするには、APM トレース変数を false に設定する必要があります。

Dockerfile に次の環境変数を追加します。

```dockerfile
# Install the Datadog Python SDK
RUN pip install ddtrace

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Use ddtrace-run to start your application
CMD ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

## 3. アプリケーションを実行する{#3-run-your-application}
イメージをビルドしてから、コンテナを実行します。

コンテナを実行する際は、必ず次の操作を行ってください。
1. コンテナを Datadog Agent と同じ Docker ネットワークに接続します。
2. 必要な環境変数を設定します。

```bash
docker run -d \
  --name your-python-app \
  your-python-app-image
```

{{% aap/aap_and_api_protection_verify_setup %}}

## トラブルシューティング {#troubleshooting}

Python アプリケーションの App and API Protection のセットアップ中に問題が発生した場合は、「[Python App and API Protection トラブルシューティングガイド][2]」を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup/compatibility/python
[2]: /ja/security/application_security/setup/python/troubleshooting