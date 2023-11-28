---
description: リモート Agent 構成で Kubernetes サービスにインスツルメンテーションライブラリを挿入する
is_beta: true
kind: documentation
private: true
title: ライブラリのリモート挿入
---

{{< callout url="#" btn_hidden="true">}}
リモートインスツルメンテーションはベータ版です。<a href="http://dtdg.co/apm-onboarding">アクセスをリクエストするには、こちらのフォームをご利用ください。</a>
{{< /callout >}}

## 概要

アプリケーションのインスツルメンテーションを行うには
* **Kubernetes**: このページで説明されているように、Datadog からリモートでインスツルメンテーションライブラリを挿入する、または
* [インスツルメンテーションライブラリをローカル (Agent で) 挿入する][5]。または
* [アプリケーションでインスツルメンテーションライブラリを手動で追加する][1]。

Kubernetes デプロイでリモートインスツルメンテーションを設定するには

1. バージョン 7.43.0 以上の Agent を使用して、[リモート構成の有効化][2]の手順に従います。これには、Helm Chart に以下を追加することが含まれます。

   ```yaml
   clusterAgent:
     admissionController:
       remoteInstrumentation:
         enabled: true
   ```

2. `APM Remote Configuration Read` と `APM Remote Configuration Write` という適切な RBAC 権限を持つ Datadog Admin Role を持っていることを確認します。

3. **APM** --> **Setup & Configuration** --> **Service Setup** --> **Datadog Remote Instrumentation** に移動し、アプリ内の説明に従って、Kubernetes デプロイサービスに APM インスツルメンテーションを構成します。

   {{< img src="tracing/trace_collection/remote-instrumentation-setup-page.png" alt="リモートインスツルメンテーションの設定ページ" style="width:100%;" >}}

[1]: /ja/tracing/trace_collection/
[2]: /ja/agent/remote_config/?tab=configurationyamlfile#prerequisites
[5]: /ja/tracing/trace_collection/library_injection_local/