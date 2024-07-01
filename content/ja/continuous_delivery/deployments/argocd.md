---
description: Datadog CD Visibility で Argo CD のデプロイメントを監視する方法をご紹介します。
further_reading:
- link: /continuous_delivery/deployments
  tag: ドキュメント
  text: Deployment Visibility について
- link: /continuous_delivery/explorer
  tag: ドキュメント
  text: デプロイメント実行をクエリして視覚化する方法
is_beta: true
kind: ドキュメント
title: Argo CD デプロイメントの監視
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">現在、選択されたサイト ({{< region-param key="dd_site_name" >}}) では CD Visibility は利用できません。</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
Argo CD 向けの CD Visibility は現在非公開ベータ版です。アクセスをリクエストするには、フォームに記入してください。
{{< /callout >}}

## 概要

[Argo CD][1] は、Kubernetes 向けの宣言型 GitOps 継続的デリバリー (CD) ツールです。Git リポジトリを使って希望するアプリケーションの状態を定義することで GitOps パターンに従い、指定したターゲット環境へのアプリケーションのデプロイメントを自動化します。

Datadog CD Visibility は、[Argo CD Notifications][2] を使用して Argo CD とインテグレーションします。
Argo CD Notifications は、主に 2 つのコンポーネントで構成されています。
1. _いつ_通知を送信するかを定義する[トリガー][3]。
2. 通知で_何_を送るかを定義する[テンプレート][4]。

## セットアップ

Webhook を使用した Argo CD 通知のセットアップ方法の詳細については、[公式 Argo CD ガイド][5]を参照してください。

最初のステップは、Datadog インテーク URL と Datadog API キーを含むサービスを作成することです。
1. [Datadog API キー][11]を `dd-api-key` キーと一緒に `argocd-notifications-secret` シークレットに追加します。`argocd-notifications-secret` の変更については [Argo CD ガイド][2]を参照してください。
1. 以下のフォーマットで `argocd-notifications-cm` 構成マップにサービスを追加します。

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  service.webhook.cd-visibility-webhook: |
    url: https://webhook-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/webhook
    headers:
    - name: "DD-CD-PROVIDER-ARGOCD"
      value: "true"
    - name: "DD-API-KEY"
      value: $dd-api-key
    - name: "Content-Type"
      value: "application/json"
```

`cd-visibility-webhook` はサービス名で、`$dd-api-key` は `argocd-notifications-secret` シークレットに格納されている API キーへのリファレンスです。

2 つ目のステップは、同じ `argocd-notifications-cm` 構成マップにテンプレートを追加することです。

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  template.cd-visibility-template: |
    webhook:
      cd-visibility-webhook:
        method: POST
        body: |
            {
              "app": {{toJson .app}},
              "context": {{toJson .context}},
              "service_type": {{toJson .serviceType}},
              "recipient": {{toJson .recipient}},
              "commit_metadata": {{toJson (call .repo.GetCommitMetadata .app.status.operationState.syncResult.revision)}}
            }
```

<div class="alert alert-warning">
<code>commit_metadata</code> フィールドを入力するための呼び出しは必須ではありません。このフィールドは、ペイロードを Git の情報でリッチ化するために使われます。
Argo CD アプリケーションのソースに Helm リポジトリを使用している場合、この行を削除し、前の行のカンマも削除して本文を調整してください。
</div>

`cd-visibility-template` はテンプレート名で、`cd-visibility-webhook`は上記で作成したサービスへのリファレンスです。

3 番目のステップは、再び同じ `argocd-notifications-cm` 構成マップにトリガーを追加することです。

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  trigger.cd-visibility-trigger: |
    - when: app.status.operationState.phase in ['Succeeded', 'Failed', 'Error', 'Running'] and app.status.health.status in ['Healthy', 'Degraded']
      send: [cd-visibility-template]
```

`cd-visibility-template` はトリガー名で、`cd-visibility-trigger`は上記で作成したテンプレートへのリファレンスです。

サービス、トリガー、およびテンプレートが構成マップに追加されたら、インテグレーションに Argo CD アプリケーションをサブスクライブできます。
Argo CD UI を使用するか、以下のアノテーションでアプリケーション定義を変更することで、Argo CD アプリケーションのアノテーションを変更します。

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_service: <YOUR_SERVICE>
```

アノテーションは 3 つあります。
1. notifications アノテーションは、上記で作成した通知セットアップに Argo CD アプリケーションをサブスクライブします。
2. `dd_env` アノテーションはアプリケーションの環境を構成します。上記の `YOUR_ENV` を、
   このアプリケーションがデプロイする環境 (例: `staging` または `prod`) に置き換えてください。このアノテーションを設定しないと、
   デフォルトの環境は `none` になります。
3. `dd_service` アノテーションはアプリケーションのサービスを構成します。上記の `YOUR_SERVICE` を、
   Argo CD アプリケーションがデプロイしているサービス (例えば `transaction-service`) に置き換えます。このアノテーションを使用すると、
   アプリケーションから生成されるすべてのデプロイメント実行にサービス名が追加されます。さらに、サービスが
   [サービスカタログ][13]に登録されている場合、チーム名もすべてのデプロイメント実行に追加されます。Argo CD アプリケーションが
   複数のサービスをデプロイするように構成されている場合は、このアノテーションを省略します。

アプリケーションサブスクリプションの詳細については、[公式 Argo CD ガイド][12]を参照してください。

この最終ステップが完了したら、Datadog で Argo CD デプロイメントの監視を開始できます。

## デプロイメント実行にカスタムタグを追加する

Argo CD アプリケーションのデプロイメントから生成されたデプロイメント実行には、オプションでカスタムタグを追加できます。これらのタグは、Datadog でデプロイメント実行をフィルタリング、グループ化、集計するために使用できます。
カスタムタグを追加するには、`dd_customtags` アノテーションを Argo CD アプリケーションのアノテーションに追加し、`key:value` ペアとして構造化されたタグのカンマ区切りリストを値に設定します。例:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_customtags: "region:us1-east, team:backend"
```

## Datadog でデプロイメントを視覚化する

[**Deployments**][6] と [**Deployment Executions**][7] ページには、デプロイメントが実行された後にデータが入力されます。詳細については、[検索と管理][9]と [CD Visibility Explorer][10] を参照してください。

## ヘルプ

通知が送信されない場合は、`argocd-notification-controller` ポッドのログを調べてください。コントローラーは通知を送信しているとき (例: `Sending notification ...`) と、受信者への通知に失敗したとき (例: `Failed to notify recipient ...`) にログを記録します。その他のトラブルシューティングシナリオについては、[公式 Argo CD ドキュメント][8] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://argo-cd.readthedocs.io/en/stable/
[2]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/
[3]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/triggers/
[4]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/templates/
[5]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/services/webhook/
[6]: https://app.datadoghq.com/ci/deployments
[7]: https://app.datadoghq.com/ci/deployments/executions
[8]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/troubleshooting/
[9]: /ja/continuous_delivery/search
[10]: /ja/continuous_delivery/explorer
[11]: https://app.datadoghq.com/organization-settings/api-keys
[12]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/subscriptions/
[13]: /ja/tracing/service_catalog