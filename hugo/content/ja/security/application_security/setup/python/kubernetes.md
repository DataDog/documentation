---
code_lang: kubernetes
code_lang_weight: 20
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
title: Kubernetes で Python 向けの App and API Protection をセットアップしてください。
type: multi-code-lang
---
{{% app_and_api_protection_python_setup_options platform="kubernetes" %}}

{{% app_and_api_protection_python_overview %}}

## 前提条件{#prerequisites}

- Kubernetes クラスター
- Docker でコンテナ化された Python アプリケーション
- クラスターにアクセスするように構成された kubectl
- Helm (Datadog Agent のインストールに推奨)
- Datadog API キー
- Datadog Python SDK ([バージョン要件][1]を参照)

## 1. Datadog Agent をインストールしてください {#1-installing-the-datadog-agent}

[Kubernetes のセットアップ手順](/agent/?tab=cloud_and_container)に従って Datadog Agent をインストールしてください。

## 2. App and API Protection モニタリングを有効にしてください {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_python_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### App and API Protection モニタリングを手動で有効にしてください {#manually-enabling-app-and-api-protection-monitoring}

init コンテナを使用するか、アプリケーションの Dockerfile 内で Datadog Python SDK をインストールしてください。

```dockerfile
RUN pip install ddtrace
```

Datadog を使用してサービスを構成し、実行してください。

{{% collapse-content title="APM トレーシングが有効" level="h4" %}}

環境変数を使用して App and API Protection を有効にした状態で Python アプリケーションを開始してください。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-python-app
spec:
  template:
    spec:
      containers:
      - name: your-python-app
        image: your-python-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

{{% collapse-content title="APM トレーシングが無効" level="h4" %}}
App and API Protection を有効にしたまま APM トレーシングを無効にするには、APM トレーシング変数を false に設定してください。

環境変数を使用して App and API Protection を有効にした状態で Python アプリケーションを開始してください。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-python-app
spec:
  template:
    spec:
      containers:
      - name: your-python-app
        image: your-python-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_APM_TRACING_ENABLED
          value: "false"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["ddtrace-run", "python", "app.py"]
```

{{% /collapse-content %}}

## 3. アプリケーションを実行してください {#3-run-your-application}

更新したデプロイメントを適用してください。

```bash
kubectl apply -f your-deployment.yaml
```

{{% aap/aap_and_api_protection_verify_setup %}}

## トラブルシューティング {#troubleshooting}

Python アプリケーションの App and API Protection をセットアップ中に問題が発生した場合は、[Python App and API Protection トラブルシューティングガイド][2]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup/compatibility/python
[2]: /ja/security/application_security/setup/python/troubleshooting