---
description: Datadog CD Visibility を使用して、Argo CD のデプロイメントを監視する方法をご紹介します。
further_reading:
- link: /continuous_delivery/deployments
  tag: ドキュメント
  text: Deployment Visibility について
- link: /continuous_delivery/explorer
  tag: ドキュメント
  text: デプロイメント実行に対するクエリの発行と可視化の方法をご紹介します。
is_beta: true
title: Argo CD デプロイメントの監視
---
{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="プレビューに参加しましょう。" >}}
CD Visibility for Argo CD はプレビュー版です。この機能に関心がある場合は、フォームに記入してアクセスをリクエストしてください。
{{< /callout >}}

## 概要 {#overview}

[Argo CD][1] は、Kubernetes の宣言型 GitOps 継続的デリバリー (CD) ツールです。Git リポジトリを使用してアプリケーションの目的の状態を定義することにより、GitOps パターンに従い、指定されたターゲット環境へのアプリケーションのデプロイメントを自動化します。

Datadog CD Visibility は、[Argo CD 通知][2]を使用して Argo CD と統合します。Argo CD 通知は、以下の 2 つの主なコンポーネントで構成されています。
1. [トリガー][3]: 通知を送信する_タイミング_を定義します。
2. [テンプレート][4]: 通知で_何を_送信するかを定義します。

## 最小限のセットアップ{#minimal-setup}

以下のセットアップでは、Argo CD の [Webhook 通知サービス][5]を使用して Datadog に通知を送信します。

まず、`dd-api-key` キーを使用して `argocd-notifications-secret` シークレットに [Datadog API キー][11]を追加します。`argocd-notifications-secret` の変更に関する詳細は、[Argo CD ガイド][2]を参照してください。

Argo CD のインストール方法に基づいて、以下のセットアップ方法から 1 つを選択してください。

- **標準的なセットアップ (kubectl apply)**: `kubectl apply` を使用した標準的な Argo CD インストールの場合。
- **Helm**: Helm ベースの Argo CD デプロイメントの場合。

### 標準的なセットアップ (kubectl apply) {#regular-setup-kubectl-apply}

`argocd-notifications-cm` ConfigMap を変更して、Datadog に通知を送信するための通知サービス、テンプレート、およびトリガーを作成します。

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
  trigger.cd-visibility-trigger: |
    - when: app.status.operationState.phase in ['Succeeded', 'Failed', 'Error'] and app.status.health.status in ['Healthy', 'Degraded']
      send: [cd-visibility-template]
    - when: app.status.operationState.phase == 'Running' and app.status.health.status in ['Healthy', 'Degraded']
      send: [cd-visibility-template]
```

### Helm セットアップ {#helm-setup}

Helm を使用して Argo CD をインストールした場合は、以下の設定を `values.yaml` に追加します。

```yaml
notifications:
  notifiers:
    service.webhook.cd-visibility-webhook: |
      url: https://webhook-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/webhook
      headers:
        - name: "DD-CD-PROVIDER-ARGOCD"
          value: "true"
        - name: "Content-Type"
          value: "application/json"
        - name: "DD-API-KEY"
          value: $dd-api-key
  templates:
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
  triggers:
    trigger.cd-visibility-trigger: |
      - when: app.status.operationState.phase in ['Succeeded', 'Failed', 'Error'] and app.status.health.status in ['Healthy', 'Degraded']
        send: [cd-visibility-template]
      - when: app.status.operationState.phase == 'Running' and app.status.health.status in ['Healthy', 'Degraded']
        send: [cd-visibility-template]
```

### 構成の概要 {#configuration-summary}

以下のリソースが追加されました。
1. `cd-visibility-webhook` サービスは Datadog インテークをターゲットとし、リクエストの正しいヘッダーを設定します。`DD-API-KEY` ヘッダーは、`argocd-notifications-secret` に以前追加された `dd-api-key` エントリーを参照します。
2. `cd-visibility-template` は、`cd-visibility-webhook` サービスのリクエストで何を送信するかを定義します。
3. `cd-visibility-trigger` は通知を送信するタイミングを定義し、`cd-visibility-template` を参照します。

`commit_metadata` フィールドはオプションであり、Git 情報を使用してデプロイメントを強化するために使用できます。以下の場合には、(前の行のカンマと一緒に) 削除する必要があります。
- リポジトリ情報を Datadog にすでに同期している場合 (「[リポジトリのメタデータを Datadog と同期][20]」を参照してください)。
- Argo CD アプリケーションのソースにコミット SHA が定義されていない場合 (Helm リポジトリを使用している場合など)。

通知サービス、トリガー、およびテンプレートを設定マップに追加した後、任意の Argo CD アプリケーションをこの統合にサブスクライブできます。
Argo CD UI を使用するか、または以下のアノテーションを用いてアプリケーション定義を変更し、Argo CD アプリケーションのアノテーションを修正します。

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_service: <YOUR_SERVICE>
    dd_customtags: "region:us1-east, team:backend"
```

上記のスニペットの説明:
1. notifications アノテーションは、上記で作成した通知セットアップに Argo CD アプリケーションをサブスクライブします。アプリケーションのサブスクリプションの詳細については、[Argo CD 公式ガイド][12]を参照してください。
2. `dd_env` アノテーションを使用して、アプリケーションの環境を設定できます。上記の `YOUR_ENV` を、
   このアプリケーションがデプロイされている環境に置き換えます (例: `staging` または `prod`)。このアノテーションを設定しない場合、
   環境はデフォルトで `none` になります。
3. `dd_service` アノテーションを使用して、アプリケーションのサービスを設定できます。上記の `YOUR_SERVICE` を、
   Argo CD アプリケーションがデプロイされているサービスに置き換えます (例: `transaction-service`)。このアノテーションを使用すると、サービス名が、
   アプリケーションから生成されるすべてのデプロイメント実行に追加されます。さらに、サービスが
   [カタログ][13]に登録されている場合、チーム名もすべてのデプロイメント実行に追加されます。Argo CD
   アプリケーションが複数のサービスをデプロイするように構成されている場合は、「[複数のサービスをデプロイする Argo CD アプリケーションのタグ付け](#tag-an-argo-cd-application-deploying-multiple-services)」を参照してください。
4. `dd_customtags` アノテーションを使用して、この Argo CD アプリケーションで生成されるデプロイメント実行にタグを追加することもできます。
   値は、`key:value` ペアとして構成されたカンマ区切りのタグリストに設定する必要があります。

上記のアノテーションを追加して Argo CD アプリケーションをサブスクライブすると、アプリケーションの新しいデプロイメントが Datadog に表示され始めます。

以下の「[推奨セットアップ](#recommended-setup)」セクションには、CD Visibility で報告される監視を改善するための推奨アクションが記載されています。

## 推奨セットアップ {#recommended-setup}

### リソースの健全性を待機する期間の変更 {#change-duration-to-wait-for-resources-health}
デプロイメントイベントで報告される期間は、Argo CD の同期期間と一致します。ただし、同期期間は一般的に、Argo CD が Git リポジトリの状態と Kubernetes クラスターの状態を同期するために費やした時間を表します。
つまり、同期後に発生したこと (例: Kubernetes リソースが起動するまでに費やされた時間) は、その期間には含まれません。

設定されたリソースが起動して健全な状態になるまで待機するように報告される期間を変更するには、[PostSync Hook][19] アノテーションを使用して、Argo CD アプリケーションによって監視される新しい no-op リソースを追加します。
PostSync Hook はすべてのリソースが健全な状態に達した後に実行され、Argo CD の同期は PostSync Hook の結果を待ってからアプリケーションのステータスを健全として更新します。

以下は、単純な `echo` コマンドを実行する PostSync Hook ジョブの例です。

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: cdvisibility-postsync-job # Ensures that the Argo CD sync duration waits for resources health
  annotations:
    argocd.argoproj.io/hook: PostSync
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
spec:
  template:
    spec:
      containers:
        - name: noop-echo
          image: alpine:latest
          command: ["echo", "all the sync resources have reached a healthy state"]
      restartPolicy: Never
  backoffLimit: 0
```

### デプロイメントと CI パイプラインの関連付け {#correlate-deployments-with-ci-pipelines}

デフォルトでは、デプロイメントイベントで報告される Git メタデータは、Argo CD が監視するリポジトリに関連付けられます。ただし、一般的なセットアップは次のとおりです。
- ソースコードを保存するアプリケーションリポジトリと、Kubernetes マニフェストを保存する構成リポジトリを持ちます。そして、[Argo CD ベストプラクティスページ][17]で概説されているように、構成リポジトリを監視するように Argo CD を構成します。
- アプリケーションリポジトリで変更が発生したときに、構成リポジトリを更新する自動コミットを実行します (例: Kubernetes リソースの現在のイメージを変更する)。

次の図は、この種のセットアップの例を示しています。

{{< img src="ci/diagram_argo-cd-deployment_240910.png" alt="git を使用した Argo CD デプロイメントのトリガー" style="width:100%;">}}

<div class="alert alert-info">イメージの関連付けには、Argo CD v3.1.0 以降が必要です。</div>

[`datadog-ci deployment correlate-image` コマンド][14] を使用して、イメージをアプリケーションリポジトリのコミットに関連付けることができます。Argo CD のデプロイメントが発生すると、デプロイメントイベント内の構成コミット情報は、デプロイされたイメージ (存在する場合) を確認して取得された、関連するアプリケーションリポジトリのコミットに置き換えられます。

この関連付けを有効にするには、アプリケーションがデプロイされる Kubernetes クラスター名を指定して、`dd_k8s_cluster` アノテーションを Argo CD アプリケーションに追加する必要もあります。名前は、[Datadog Kubernetes 製品][16]で報告されている名前と一致している必要があります。イメージ名には、関連するサービス名も含まれている必要があります。これは、デプロイメント時に無関係なイメージを除外するのに役立ちます。

以下は、Argo CD によって後でデプロイされるイメージを生成する際に、コマンドを実行する方法の例です。

```yaml
 steps:
    - name: Correlate image with Datadog
      shell: bash
      run: |
        echo "Correlating image: ${{ inputs.image-name }} with Datadog"
        datadog-ci deployment correlate-image --image ${{ inputs.image-name }} --repository-url ${{ inputs.repository-url }} --commit-sha ${{ inputs.commit-sha }}
        echo "Successfully correlated ${{ inputs.image-name }} with Datadog"
```


このコマンドは、デプロイメントリソースからのイメージを関連付けます。Datadog がデプロイメントを受信した際、複数のイメージが存在し、そのうちの複数のイメージが関連付けられている場合、Datadog はサービス名を含むイメージを採用します。この関連付けは、デプロイメントリソースに対してのみ機能します。



#### 検証 {#validation}

コマンドが正しく実行された場合、デプロイメントには構成リポジトリではなくアプリケーションリポジトリの Git メタデータが含まれます。また、デプロイメント実行ビューには、関連する CI パイプラインのトレースを表す新しい {{< ui >}}Pipeline{{< /ui >}} タブが含まれるようになりました。

## 複数のサービスをデプロイする Argo CD アプリケーションのタグ付け {#tag-an-argo-cd-application-deploying-multiple-services}

Argo CD アプリケーションが複数のサービスをデプロイする場合、Datadog はアプリケーションの同期からデプロイされたサービスを自動的に推測できます。Datadog は、変更された Kubernetes リソースに基づいてサービスを推測します。

<div class="alert alert-danger">
<a href="https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#server-side-apply">Server-Side Apply</a> が使用されている場合、自動サービス検出はサポートされていません。
</div>

サービスの自動タグ付けを有効にするには、[Datadog Agent を使って Kubernetes インフラストラクチャーを監視][15]する必要があります。また、Kubernetes リソースには次のラベルが必要です。
- `tags.datadoghq.com/service` (必須): このリソースの Datadog サービスを指定します。詳しくは、[統合サービスタグ付け][18]を参照してください。
- `team`(オプション): このリソースの Datadog チームを指定します。このラベルが省略された場合、チームはサービスラベルに基づいて [Catalog][13] から自動的に取得されます。

以下の種類の Kubernetes リソースのみが対象となります: `Deployment`、`Rollout`、`ReplicaSet`、`StatefulSet`、`Service`、`DaemonSet`、`Pod`、`Job`、および `CronJob`。

Argo CD アプリケーションに以下のアノテーションを追加します。
- `dd_multiservice`: `true`.このアノテーションは、Datadog が、変更された Kubernetes リソースに基づいて、同期でデプロイされたサービスを自動的に推測するかどうかを指定します。
- `dd_k8s_cluster`: Argo CD アプリケーションがデプロイする先の Kubernetes クラスターの名前に設定します。名前は、[Datadog Kubernetes 製品][16]で報告されている名前と一致している必要があります。

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

## Datadog でのデプロイメントの表示 {#visualize-deployments-in-datadog}

[[**Deployments**][6]] ページおよび [[**Executions**][7]] ページには、デプロイメント完了後にデータが反映されます。詳細については、「[CD Visibility のデプロイを確認する][10]」を参照してください。

## トラブルシューティング {#troubleshooting}

通知が送信されない場合は、`argocd-notification-controller` Pod のログを確認してください。コントローラーがログを記録するのは、通知を送信する場合 (例: `Sending notification ...`) および受信者への通知に失敗した場合
(例: `Failed to notify recipient ...`) です。その他のトラブルシューティングシナリオについては、[公式の Argo CD ドキュメント][8]を参照してください。

### Argo CD と Datadog 間のステータスの不一致 {#status-discrepancies-between-argo-cd-and-datadog}

Argo CD では成功と報告されているのに Datadog ではエラーとして表示されるなど、デプロイメントのステータス報告に不一致が生じることがあります。主な違いは、各プラットフォームがデプロイメントの成功をどのように評価するかという点にあります。
- **Argo CD** は、リソースの実行時の状態にかかわらず、Kubernetes マニフェストに変更を適用できれば同期は成功したとみなします。
- **Datadog CD Visibility** は、デプロイメントの結果をより包括的に評価します。同期中に変更されたリソースのいずれかが (不正なイメージや構成の問題などが原因で) 劣化した状態になった場合、Argo CD が成功と報告していても、Datadog ではデプロイメントは失敗または劣化としてマークされます。

## 参考資料{#further-reading}

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
[13]: /ja/internal_developer_portal/catalog/
[14]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[15]: /ja/containers/kubernetes
[16]: https://app.datadoghq.com/orchestration/explorer
[17]: https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/#separating-config-vs-source-code-repositories
[18]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[19]: https://argo-cd.readthedocs.io/en/stable/user-guide/resource_hooks/#resource-hooks
[20]: /ja/continuous_delivery/features/code_changes_detection#synchronize-repository-metadata-to-datadog