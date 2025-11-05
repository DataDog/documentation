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
title: Argo CD デプロイメントの監視
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
Argo CD 用の CD Visibility は非公開ベータ版です。アクセスをリクエストするには、フォームに記入してください。
{{< /callout >}}

## 概要

[Argo CD][1] は、Kubernetes のための宣言型 GitOps 継続的デリバリー (CD) ツールです。GitOps パターンに従い、Git リポジトリを使用して望ましいアプリケーションの状態を定義し、指定した対象環境へのアプリケーションのデプロイを自動化します。

Datadog CD Visibility は、[Argo CD Notifications][2] を使用して Argo CD と統合されます。
Argo CD Notifications は、2 つの主要コンポーネントで構成されています。
1. [トリガー][3]: 通知をいつ送信するかを定義します。
2. [テンプレート][4]: 通知で_何を_送信するかを定義します。

## セットアップ

Webhook を使って Argo CD Notifications をセットアップする方法については、 [Argo CD 公式ガイド][5]を参照してください。

最初のステップは、Datadog のインテーク URL と Datadog API キーを含むサービスを作成することです。
1. [Datadog API キー][11]を `dd-api-key` キーとして`argocd-notifications-secret` シークレットに追加します。`argocd-notifications-secret` の変更については、[Argo CD ガイド][2]を参照してください。
1. `argocd-notifications-cm` 構成マップに通知サービスを以下の形式で追加します。

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

`cd-visibility-webhook` は通知サービスの名前で、`$dd-api-key` は`argocd-notifications-secret` シークレットに格納された API キーを参照します。

2 番目のステップとして、同じ `argocd-notifications-cm` 構成マップにテンプレートを追加します。

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

<div class="alert alert-danger">
<code>commit_metadata</code> フィールドを入力するための呼び出しは必須ではありません。このフィールドは、ペイロードを Git の情報でリッチ化するために使用します。
Helm リポジトリを Argo CD アプリケーションのソースとして使用している場合は、この行と前の行のカンマを削除して本文を調整してください。
</div>

`cd-visibility-template` はテンプレート名で、`cd-visibility-webhook` は上記で作成したサービスを参照します。

3 番目のステップとして、同じ `argocd-notifications-cm` 構成マップにトリガーを追加します。

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

`cd-visibility-trigger` はトリガー名で、`cd-visibility-template` は上記で作成したテンプレートを参照します。

通知サービス、トリガー、およびテンプレートが構成マップに追加されたら、インテグレーションに Argo CD アプリケーションをサブスクライブできます。
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
   このアプリケーションがデプロイされている環境 (例: `staging` または`prod`) で置き換えます。このアノテーションを設定しない場合、
   環境はデフォルトで `none` になります。
3. `dd_service` アノテーションはアプリケーションのサービスを構成します。上記の `YOUR_SERVICE` を、
   Argo CD アプリケーションがデプロイしているサービス (例えば `transaction-service`) に置き換えます。このアノテーションを使用すると、
   アプリケーションから生成されるすべてのデプロイメント実行にサービス名が追加されます。さらに、サービスが
   [サービスカタログ][13]に登録されている場合、チーム名もすべてのデプロイメント実行に追加されます。Argo CD アプリケーションが
   複数のサービスをデプロイするように構成されている場合は、[複数のサービスをデプロイする Argo CD アプリケーションのタグ付け](#tag-an-argo-cd-application-deploying-multiple-services)を参照してください。

アプリケーションのサブスクリプションの詳細については、[Argo CD 公式ガイド][12]を参照してください。

この最終ステップが完了したら、Datadog で Argo CD デプロイのモニタリングを開始できます。

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

## 複数のサービスをデプロイする Argo CD アプリケーションのタグ付け

Argo CD アプリケーションが複数のサービスをデプロイする場合、Datadog はアプリケーションの同期からデプロイされたサービスを自動的に推測することができます。Datadog は、変更された Kubernetes リソースに基づいてサービスを推測します。

サービスの自動タグ付けを有効にするには、[Datadog Agent を使ってKubernetes インフラストラクチャーを監視][14]する必要があります。また、Kubernetes リソースには次のラベルが必要です。
- `tags.datadoghq.com/service` (必須): このリソースの Datadog サービスを指定します。詳しくは、[統合サービスタグ付け][16]を参照してください。
- `team` (任意): このリソースの Datadog チームを指定します。このラベルが省略された場合、チームはサービスラベルに基づいて[サービスカタログ][13]から自動的に取得されます。

次の種類の Kubernetes リソースのみが対象となります: `Deployment`、`ReplicaSet`、`StatefulSet`、`Service`、`DaemonSet`、`Pod`、`Job`、`CronJob`。

Argo CD アプリケーションに以下のアノテーションを追加します。
- `dd_multiservice`: `true`。このアノテーションは、Datadog が、変更された Kubernetes リソースに基づいて、同期でデプロイされたサービスを自動的に推測するかどうかを指定します。
- `dd_k8s_cluster`: Argo CD アプリケーションがデプロイする Kubernetes クラスターの名前を設定します。この名前は [Datadog Kubernetes 製品][15]で報告されている名前と一致する必要があります。

例:
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_multiservice: true
    dd_k8s_cluster: example-cluster
```

## Datadog でデプロイを視覚化する

デプロイが実行されると、[**Deployments**][6] と [**Executions**][7] のページにデータが入力されます。詳細については、[検索と管理][9]および [CD Visibility Explorer][10] を参照してください。

## トラブルシューティング

通知が送信されない場合、`argocd-notification-controller` ポッドのログを調べます。コントローラーは、通知 (例: `Sending notification ...`) の送信時と、受信者への通知に失敗した際 (例: `Failed to notify recipient ...`) に、ログに書き込みます。その他のトラブルシューティングのシナリオについては、[Argo CD の公式ドキュメント][8]を参照してください。

## 参考資料

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
[14]: /ja/containers/kubernetes
[15]: https://app.datadoghq.com/orchestration/explorer
[16]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1