---
aliases:
- /ja/service_management/workflows/private_actions/use_private_actions
- /ja/service_management/app_builder/private_actions/use_private_actions
- /ja/actions/private_actions/use_private_actions/
- /ja/actions/private_actions/update_private_action_runner/
description: Datadog Agent 内で実行されるプライベートアクションランナーをインストール、登録、管理、更新します。
disable_toc: false
further_reading:
- link: actions/private_actions/
  tag: ドキュメント
  text: Private Actions
- link: actions/private_actions/enroll_runner
  tag: ドキュメント
  text: 登録と所有権
- link: actions/private_actions/execution_policies
  tag: ドキュメント
  text: 実行ポリシー
- link: actions/private_actions/set_up_standalone
  tag: ドキュメント
  text: スタンドアロンのプライベートアクションランナーをセットアップする
title: Datadog Agent でプライベートアクションランナーをセットアップする
---
## 概要 {#overview}

Datadog Agent でプライベートアクションランナーを実行することは、新規デプロイメントにおいて推奨される方法です。すでに Datadog Agent を実行している場合は、単一の構成フラグでランナーを有効にし、Agent のライフサイクルを通じて管理できます。

ランナーのセットアップは 3 つのステップで行います。

1. [**インストール**](#install-the-runner): 環境に適したデプロイメントオプションを使用してランナーをインストールします。
1. [**登録**](#enroll-the-runner): ランナーの所有権と使用する認証モデルを設定します。
1. [**更新**](#update-the-runner): Agent のアップグレードの一環としてランナーを更新します。

ランナーを別のバイナリとしてデプロイする場合は、[スタンドアロンのプライベートアクションランナーをセットアップする][1] を参照してください。

## 前提条件 {#prerequisites}

- **Datadog Agent 7.81.0 以降**がインストールされた Linux または Windows ホスト、あるいは **Datadog Operator v1.28.0 以降**または **Datadog Helm chart 3.231.6 以降**がインストールされた Kubernetes クラスター。
- [Remote Configuration][2] が組織で有効になっていること。
- Datadog へのネットワークアクセス (`https://{{< region-param key=dd_site >}}`)。

## ランナーをインストールする {#install-the-runner}

Datadog Agent 内のランナーには、ランナーがどこで動作する必要があるかに応じて、3 つのデプロイメントオプションがあります。

| デプロイメントオプション | 実行方法 | デプロイ方法 | 最適用途 |
|---|---|---|---|
| **ホスト** | Linux または Windows ホスト上の Datadog Agent とは別のプロセスとして実行。| ホストインストール | 特定のホストをターゲットとするアクション。|
| **Kubernetes ノード Agent** | ホストプロセスと同じランナーバイナリを使用する、ノード Agent 内のコンテナ。| Helm、Operator | Kubernetes クラスター内のノードローカルアクション。|
| **Kubernetes クラスター Agent** | クラスター Agent 内のインプロセスで、個別のバイナリはありません。1 つのランナーがクラスター全体を処理します。| Helm、Operator | クラスター全体の Kubernetes アクション。|

ランナーを所有者付きとして登録する UI 主導のフローである **Fleet Automation**、または登録タイプを自分で選択する**手動インストール**のいずれかでインストールするオプションがあります。

### Fleet Automation の使用 (推奨) {#using-fleet-automation-recommended}

Fleet Automation のインストールフローは、すべてのプラットフォームで共通です。

1. [Fleet Automation インストールページ][3] に移動し、プラットフォームを選択します。Kubernetes の場合は、[手動インストール](#manual-installation)タブの手順に従うため、インストール方法として **Helm Chart** または **Datadog Operator** も選択してください。
1. **Agent カバレッジのカスタマイズ**で、**最適化と修復**セクションに移動し、**Agent によるアクションの実行を有効にする**をオンにします。これにより、`on_prem_runner_write` スコープを持つアプリケーションキーが作成され、[コネクション][4] で認証された**所有者付き**としてランナーが登録されます。代わりに [実行ポリシー][5] で認証された所有者なしのランナーを登録するには、[手動インストール](#manual-installation)を使用してください。
1. インストールパネルの残りの指示に従って API キーを追加し、インストールを完了します。
1. インストール後、[プライベートアクションランナー][6] に移動し、ランナーがリストにあることを確認します。

### 手動インストール {#manual-installation}

{{< tabs >}}
{{% tab "Linux" %}}
Agent のインストール時または実行時に、以下の環境変数を設定します。ホスト上では、プライベートアクションランナーの設定に `DD_PRIVATE_ACTION_RUNNER_*` プレフィックスを使用します。

```bash
DD_API_KEY=<API_KEY> \
DD_APP_KEY=<APP_KEY> \
DD_SITE="{{< region-param key=dd_site >}}" \
DD_PRIVATE_ACTION_RUNNER_ENABLED=true \
DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST=com.datadoghq.kubernetes.*,com.datadoghq.remoteaction.* \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

`DD_APP_KEY` は、Fleet Automation と同様、ランナーを所有者付きとして登録します。アプリケーションキーには `on_prem_runner_write` スコープが必要です。`DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST` はカンマ区切りのリストを受け取ります。バンドルのワイルドカードを使用して、Datadog Agent のランナーが実行できるアクションを許可します。`com.datadoghq.kubernetes.*` および `com.datadoghq.remoteaction.*`。代わりにランナーの組み込みデフォルトアクション (読み取り専用の Remote Action アクションと、Cluster Agent 上の読み取り専用 Kubernetes アクションのセット) に依存する場合は、許可リストを未設定のままにします。

インストール後、[プライベートアクションランナー][1] に移動し、ランナーがリストにあることを確認します。

[1]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Windows" %}}

Datadog Agent 7.81.0 以降をインストールまたはアップグレードし、`C:\ProgramData\Datadog\datadog.yaml` を編集します。

```yaml
app_key: <YOUR_APP_KEY>

private_action_runner:
  enabled: true
  self_enroll: true
  actions_allowlist:
    - "com.datadoghq.kubernetes.*"
    - "com.datadoghq.remoteaction.*"
```

`app_key` は、上記の Fleet Automation と同様、ランナーを所有者付きとして登録します。アプリケーションキーには `on_prem_runner_write` スコープが必要です。

Agent を再起動して、構成を適用します。

```powershell
Restart-Service -Force datadogagent
```

Agent の再起動後、[プライベートアクションランナー][1] に移動して、ランナーがリストにあることを確認します。

ホストプロセスは**ノード Agent** ランナーを実行します。Cluster Agent でランナーを実行するには、Kubernetes (Helm) または Kubernetes (Operator) タブを使用します。

[1]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

Datadog Helm チャートでは、以下の 2 か所でランナーを有効にできます。

- サイドカーコンテナとしての**ノード Agent** ランナー。ノード Agent ランナーは **Linux 専用**です。
- プロセス内での **Cluster Agent** ランナー。Cluster Agent ランナーは Helm または Operator を通じてのみ利用可能であり (スタンドアロンバイナリはありません)、Cluster Agent レプリカ間で ID が調整されるようにリーダー選出が必要です。

[組織の設定][1] でプライベートアクションランナー機能を持つ API キーを作成し、チャートが `apiKeyExistingSecret` を通じて読み取る Kubernetes シークレットに保存します。

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

この例では、ランナーを**所有者なし** (`apiKeyOnlyEnrollment: true`、API キーのみを使用) として登録します。これにより、実行ポリシーで認証されます。その他の登録オプションや所有権の仕組みについては、[登録と所有権][2] を参照してください。

Helm 設定では、`privateActionRunner.*` キーを camelCase で使用します。`values.yaml` を作成します。

```yaml
datadog:
  apiKeyExistingSecret: datadog-secret
  site: {{< region-param key=dd_site >}}
  clusterName: <YOUR_CLUSTER_NAME>
  remoteConfiguration:
    enabled: true
  privateActionRunner:
    enabled: true
    apiKeyOnlyEnrollment: true
    actionsAllowlist:
      - "com.datadoghq.remoteaction.*"
      - "com.datadoghq.script.*"
clusterAgent:
  enabled: true
  privateActionRunner:
    enabled: true
    apiKeyOnlyEnrollment: true
    actionsAllowlist:
      - "com.datadoghq.kubernetes.*"
      - "com.datadoghq.script.*"
```

利用可能なすべてのランナーコンフィギュレーションオプションについては、Helm チャートの [`datadog.privateActionRunner`][3] および [`clusterAgent.privateActionRunner`][4] を参照してください。チャートのインストール:

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-agent datadog/datadog -f values.yaml
```

インストール後、[プライベートアクションランナー][5] に移動して、ランナーがリストにあることを確認します。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/actions/private_actions/enroll_runner/
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L523
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L1842
[5]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

Datadog Operator は、`DatadogAgent` リソースのアノテーションを通じてランナーを有効にします。`-configdata` アノテーション内のランナー構成では、snake_case の `private_action_runner.*` キーを使用します。Operator は、ノード Agent ランナーとインプロセス Cluster Agent ランナーの両方を有効にできます。

[組織の設定][1] でプライベートアクションランナー機能を持つ API キーを作成し、`DatadogAgent` リソースがその `credentials` を通じて読み取る Kubernetes シークレットに保存します。

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

この例では、ランナーを**所有者なし** (`api_key_only_enrollment: true`、API キーのみを使用) として登録します。これにより、実行ポリシーで認証されます。その他の登録オプションや所有権の仕組みについては、[登録と所有権][2] を参照してください。

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

Helm と同様、Cluster Agent ランナーにはリーダー選出が必要であり、ノード Agent ランナーは Linux 専用です。マニフェストを適用した後、[プライベートアクションランナー][3] に移動して、ランナーがリストにあることを確認します。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/actions/private_actions/enroll_runner/
[3]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{< /tabs >}}

### 構成フィールド名 {#configuration-field-names}

ランナーの設定は、各インストール方法の標準的な Datadog Agent 構成規則に従います。
- ホスト上の環境変数。
- Helm の `privateActionRunner` の下の CamelCase キー。
- Operator の `private_action_runner` の下の Snake_case キー。

3 つのすべてのインストール方法にわたるフィールド名の対応表、および構成キーとデフォルト値の完全なリストについては、[プライベートアクションランナーリファレンス][7] を参照してください。

## ランナーを登録する {#enroll-the-runner}

登録により、ランナーが Datadog 組織に登録され、その**所有権**が設定されます。これにより、認可モデルが決定されます。プライベートアクションランナー機能を持つ API キーで登録された所有者のいないランナーは、[実行ポリシー][5] を使用します。アプリケーションキーで登録された所有者ありランナーは、[コネクション][4] を使用します。モデルは登録時に固定されるため、デプロイする前にどちらを使用するかを決定してください。

プロセスの詳細については、[登録と所有権][8] を参照してください。

## ランナーを管理する {#manage-the-runner}

### 許可リストを変更する {#change-the-allowlist}

Datadog Agent のランナーの許可リストを編集するには、以下の手順を実行します。

{{< tabs >}}
{{% tab "Linux" %}}
1. `/etc/datadog-agent/datadog.yaml` の `private_action_runner.actions_allowlist` セクションを編集します。
1. Agent を再起動します: `sudo systemctl restart datadog-agent`。
{{% /tab %}}
{{% tab "Windows" %}}
1. `C:\ProgramData\Datadog\datadog.yaml` の `private_action_runner.actions_allowlist` セクションを編集します。
1. Agent を再起動します: `Restart-Service -Force datadogagent`。
{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}
1. 両方の `DatadogAgent` マニフェストアノテーションの `actions_allowlist` を更新します。`agent.datadoghq.com/private-action-runner-configdata` および `cluster-agent.datadoghq.com/private-action-runner-configdata`。
1. 更新されたマニフェストを適用します。`kubectl apply -f datadog-agent.yaml`。
{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}
1. `values.yaml` で `privateActionRunner.actionsAllowlist` (ノード Agent) または `clusterAgent.privateActionRunner.actionsAllowlist` (Cluster Agent) を更新します。
1. 更新されたチャートを適用します。`helm upgrade datadog-agent datadog/datadog -f values.yaml`。
{{% /tab %}}
{{< /tabs >}}

### 非アクティブなランナーの自動削除 {#automatic-deletion-of-inactive-runners}

未使用のリソースを解放するため、Datadog は API キーのみ (所有者なし) の構成を使用するノード Agent ベースのプライベートアクションランナーを、35 日間非アクティブな状態が続くと自動的に削除します。この自動クリーンアップは、所有者がいるランナーや Cluster Agent ランナーには適用されません。

非アクティブが原因でランナーが削除された場合、再起動するとエラーが発生します。インストール手順を繰り返して、ランナーを再登録する必要があります。

## ログを使用したデバッグ {#debugging-with-logs}

{{< tabs >}}
{{% tab "Linux" %}}

```bash
cat /var/log/datadog/private-action-runner.log
```

{{% /tab %}}
{{% tab "Windows" %}}

```powershell
Get-Content C:\ProgramData\Datadog\logs\private-action-runner.log
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=1000 | grep private
```

{{% /tab %}}
{{< /tabs >}}

## ランナーを更新する {#update-the-runner}

Agent のアップグレードに合わせて常に最新の状態に保つため、Datadog Agent のランナーを更新します。

{{< tabs >}}
{{% tab "Linux" %}}

Datadog Agent を最新バージョンにアップグレードします。ランナーは Agent にバンドルされています。

```bash
sudo apt-get update && sudo apt-get install datadog-agent
```

または RHEL/CentOS の場合:

```bash
sudo yum update datadog-agent
```

アップグレード後に Agent を再起動します。

```bash
sudo systemctl restart datadog-agent
```

詳細なアップグレード手順については、[Agent v7 へのアップグレード][1] を参照してください。

[1]: /ja/agent/versions/upgrade_to_agent_v7/

{{% /tab %}}
{{% tab "Windows" %}}

[Datadog Agent ダウンロードページ][1] から最新の Agent MSI インストーラーをダウンロードして実行するか、PowerShell を使用します。

```powershell
# Download the latest installer
Invoke-WebRequest -Uri "https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi" -OutFile ddagent-cli-latest.msi

# Run the installer
Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i ddagent-cli-latest.msi'
```

アップグレード後に Agent を再起動します。

```powershell
Restart-Service -Force datadogagent
```

[1]: https://app.datadoghq.com/account/settings#agent/windows

{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

`DatadogAgent` マニフェスト内の Datadog Operator および Agent イメージバージョンを更新します。

1. Datadog Operator を更新します。

   ```bash
   helm repo update
   helm upgrade datadog-operator datadog/datadog-operator \
       --set image.repository=registry.datadoghq.com/operator \
       --set image.tag=latest
   ```

   特定のバージョンを固定できます。利用可能なタグを参照するには、[Docker Hub][1] を使用します。

1. `datadog-agent.yaml`マニフェスト内の Agent イメージバージョンを更新します。

   ```yaml
   override:
     nodeAgent:
       image:
         name: registry.datadoghq.com/agent:<NEW_AGENT_VERSION>
     clusterAgent:
       image:
         name: registry.datadoghq.com/cluster-agent:<NEW_AGENT_VERSION>
   ```

1. 更新されたマニフェストを適用します。`kubectl apply -f datadog-agent.yaml`。
1. 更新を確認します。

   ```bash
   kubectl get pods
   kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=100 | grep private
   ```

Cluster Agent ランナーは、共有 Kubernetes シークレットに ID を保存するため、更新後もその ID を保持します。ノード Agent ランナーは ID をファイルに保存します。そのパスが永続ボリュームによってバックアップされていない場合、更新によって ID が消去され、ランナーが再登録を強制される可能性があります。[Kubernetes 上の ID ストレージ][2] を参照してください。

[1]: https://hub.docker.com/r/datadog/operator/tags
[2]: /ja/actions/private_actions/enroll_runner/#identity-storage-on-kubernetes

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

ランナーの更新は、標準の Datadog Agent Helm チャートアップグレードプロセスの一部です。

```bash
helm repo update
helm upgrade datadog-agent datadog/datadog -f values.yaml
```

詳細なアップグレード手順については、[Datadog Helm のアップグレード][1] を参照してください。

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading

{{% /tab %}}
{{% tab "Terraform (Operator)" %}}

Terraform 構成内のバージョン変数を更新します。

```hcl
locals {
  helm_operator_version = "<NEW_OPERATOR_VERSION>"
  agent_version         = "<NEW_AGENT_VERSION>"
  # ...
}
```

変更を適用します。

```bash
terraform plan
terraform apply -var="datadog_api_key=<YOUR_API_KEY>" -var="datadog_app_key=<YOUR_APP_KEY>"
```

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/private_actions/set_up_standalone/
[2]: /ja/remote_configuration
[3]: https://app.datadoghq.com/fleet/install-agent/latest
[4]: /ja/actions/connections/
[5]: /ja/actions/private_actions/execution_policies/
[6]: https://app.datadoghq.com/actions/action-catalog
[7]: /ja/actions/private_actions/reference/
[8]: /ja/actions/private_actions/enroll_runner/