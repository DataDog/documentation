---
description: Datadog Operator を使用して Datadog Agent 内にプライベートアクションランナーをデプロイし、Datadog
  のデフォルトの実行ポリシーを使用して最初のアクションを実行します。
further_reading:
- link: actions/private_actions
  tag: ドキュメント
  text: Private Actions の概要
- link: actions/private_actions/reference
  tag: ドキュメント
  text: Private Actions ランナーリファレンス
title: Private Actions の使用を開始する
---
## 概要 {#overview}

このガイドに従うと、Datadog Operator を使用して Datadog Agent 内にプライベートアクションランナーをデプロイし、Datadog が自動的に承認する読み取り専用アクションを実行できます。

これは、使用を開始するための推奨される方法です。次の構成を使用します。

スタンドアロンのホストプロセスとしてではなく、- **Datadog Agent 内でランナーを実行**します。
Kubernetes 上で - **Datadog Operator を使用してインストール**します。
ランナーが実行ポリシーで承認されるように、- **API キーで登録**します。
- **Datadog のデフォルトの実行ポリシーに依存**します。これは Datadog が提供するもので、すべてのランナーで読み取り専用の Kubernetes アクションおよび Remote Action アクションをセットアップなしで承認します。

このガイドを完了すると、ランナーを登録して、読み取り専用アクションを実行できるようになります。

## 前提条件 {#prerequisites}

- Datadog Agent 7.81.0 以降を実行している、[Datadog Operator][1] v1.28.0 以降で管理される Kubernetes クラスター。
- [Remote Configuration][2] が組織で有効になっていること。
- [組織設定][3]で API キーを作成する権限。
- Datadog へのネットワークアクセス (`https://{{< region-param key=dd_site >}}`)。

## ステップ 1: プライベートアクションランナー機能を持つ API キーを作成する {#step-1-create-an-api-key-with-the-private-action-runner-capability}

所有者のいないランナーは、プライベートアクションランナー機能を持つ API キーで登録されます。アプリケーションキーは必要ありません。

1. Datadog で、**[[Organization Settings] (組織設定) > [API Keys] (API キー)][3]** に移動し、API キーを作成または選択します。
1. キーの [**PAR**] (プライベートアクションランナー機能) の横にある [**Enable**] (有効化) をクリックします。
   {{< img src="actions/private_actions/getting_started/api_key_par_capability.png" alt="リモート構成設定の下で PAR 機能が有効になっている API キーの詳細パネル" style="width:60%;" >}}
1. キーの値を、Agent が読み取る Kubernetes シークレットに保存します。
   ```bash
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```

## ステップ 2: Datadog Operator を使用してランナーをデプロイする {#step-2-deploy-the-runner-with-the-datadog-operator}

Operator アノテーションを使用して、`DatadogAgent` リソースでランナーを有効にします。以下の例では、ノード Agent と Cluster Agent の両方でランナーを有効にして、API キーで所有者なしとして登録し、少数の読み取り専用アクションを許可しています。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/private-action-runner-enabled: "true"
    agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.remoteaction.*"
          - "com.datadoghq.script.*"
    cluster-agent.datadoghq.com/private-action-runner-enabled: "true"
    cluster-agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.kubernetes.*"
          - "com.datadoghq.script.*"
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    site: {{< region-param key=dd_site >}}
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
```

マニフェストを適用します。

```bash
kubectl apply -f datadog-agent.yaml
```

`api_key_only_enrollment` が設定されており、API キーのみを提供しているため、各ランナーは起動時に**所有者なし**として自動登録されます。これは、実行ポリシーによって承認されることを意味します。このマニフェストは、このガイドのための最小限の Operator 設定です。ランナーの完全な構成、その他のインストール方法 (ホスト、Windows、Helm)、および完全なフィールドリファレンスについては、[Datadog Agent でプライベートアクションランナーをセットアップする][4]を参照してください。登録の詳細については、[登録と所有権][5]を参照してください。

この例の `actions_allowlist` エントリは、このガイドで使用するアクションを許可するためにバンドルのワイルドカードを使用しています。代わりにランナーの組み込みの読み取り専用アクションを使用するには、`actions_allowlist` を空のままにします。その場合、ランナーはデフォルトのアクションセットを有効にします。これには、読み取り専用の Remote Action ネットワークおよびシェルアクションと、Cluster Agent 上の読み取り専用 Kubernetes アクションのセットが含まれます。

## ステップ 3: ランナーが登録されていることを確認する{#step-3-confirm-the-runner-is-enrolled}

Datadog で、[[Private Action Runners] (プライベートアクションランナー)][6] に移動します。新しいランナーが一覧に表示されていることを確認します。

Cluster Agent のログで、ランナーが起動したことを確認することもできます。

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=1000 | grep private
```

ノード Agent のログやその他のプラットフォームについては、[ログを使用したデバッグ][12]を参照してください。

Datadog は、組織内に**デフォルトの実行ポリシー**をプロビジョニングします。これらのポリシーはターゲットセレクターに `*` を使用するため、プライベートアクションランナーを実行するすべての Agent (ここでデプロイしたものを含む) を自動的にカバーします。これにより、独自の実行ポリシーを設定することなく、読み取り専用アクションが承認されます。[Datadog のデフォルトの実行ポリシー][7]を参照してください。

## ステップ 4: 最初のアクションを実行する{#step-4-run-your-first-action}

新しいランナーに対して読み取り専用の Kubernetes アクションを Action Catalog から実行します。Action Catalog は、ワークフローのステップと同じ方法でアクションを実行します (ターゲット Agent を選択し、入力を提供して、アクションを実行します)。

1. Datadog Action Catalog で、[[List Pods] (Pod を一覧表示)][8] (`com.datadoghq.kubernetes.core.listPod`) を開きます。
1. [**Configure connection**] (コネクションを構成) で、[**Connection**] (コネクション) タブではなく [**Target**] (ターゲット) タブを選択します。
1. [**Orch Cluster ID**] (オーケストレーションクラスター ID) に、ランナーを実行しているクラスターのオーケストレーションクラスター ID を設定します。オーケストレーションクラスター ID は、[Fleet Automation のフリートビュー][11]でクラスターのタグから確認できます。
1. [**Configure inputs**] (入力を構成) で、Pod を一覧表示する [**Namespace**] (名前空間) を入力します。[**Field selector**] (フィールドセレクター)、[**Label selector**] (ラベルセレクター)、または [**Limit**] (上限) を設定することもできます。
1. [**Run**] (実行) をクリックします。結果がパネルに表示されます。
  {{< img src="actions/private_actions/getting_started/run_action_action_catalog.png" alt="Action Catalog の List Pods アクション。コネクションが [Target] に設定され、[Orch Cluster ID] が入力されています。" style="width:80%;" >}}

アクションがランナーで実行され、その結果が返されます。同じアクションをワークフローから実行するには、Workflow Automation でプライベートアクションステップを追加して、コネクションピッカーで [**Target**] を選択します。[ワークフローで実行ポリシーを使用する][9]を参照してください。

## 次のステップ {#next-steps}

このガイドでは、読み取り専用アクションのみを許可する Datadog のデフォルトの実行ポリシーを使用しています。書き込み可能なアクションを実行する場合や、特定のチームや環境にアクセスを限定する場合は、独自の実行ポリシーを作成してください。[実行ポリシー][10]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/containers/datadog_operator/
[2]: /ja/remote_configuration
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ja/actions/private_actions/set_up_agent_based/
[5]: /ja/actions/private_actions/enroll_runner/
[6]: https://app.datadoghq.com/actions/private-action-runners
[7]: /ja/actions/private_actions/execution_policies/#default-execution-policies
[8]: https://app.datadoghq.com/actions/action-catalog#com.datadoghq.kubernetes/com.datadoghq.kubernetes.core/com.datadoghq.kubernetes.core.listPod
[9]: /ja/actions/private_actions/execution_policies/#use-an-execution-policy-in-a-workflow
[10]: /ja/actions/private_actions/execution_policies/
[11]: https://app.datadoghq.com/fleet?view_by=clusters
[12]: /ja/actions/private_actions/set_up_agent_based/#debugging-with-logs