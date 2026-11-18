---
description: Kubernetes Cluster Autoscaling を使用して、クラスターを自動的にスケーリングします。
site_support_id: containers_autoscaling_cluster
title: Kubernetes Cluster Autoscaling
---
<div class="alert alert-warning">Limited Availability の期間中は、Datadog Kubernetes Cluster Autoscaling を<strong>非本番環境でのみ使用</strong>することを Datadog は推奨しています。詳細およびサポートについては、<a href="mailto:kubernetes-beta@datadoghq.com">kubernetes-beta@datadoghq.com</a> までメールでお問い合わせください。</div>

## 要件 {#requirements}
- Datadog Agent v7.75 以上
- Datadog Operator v1.23.0 以上**または** Datadog Helm chart v3.155.1 以上
- [Remote Configuration][1] は、組織レベルとターゲットクラスター内の Agent の両方で有効にする必要があります。設定手順については、「[Remote Configuration を有効にする][2]」を参照してください。
- Datadog ユーザー権限:
  - Org Management
  - API Keys Write
  - Autoscaling Manage

  デフォルトでは、すべての Datadog 管理者ユーザーに Autoscaling Manage 権限が付与されており、すべての Datadog ユーザーには推奨事項やレポートを表示するための読み取りアクセス権が付与されています。

  Autoscaling Manage を追加の標準ロールまたはカスタムロールのユーザーに付与するには、「[Datadog ロールのアクセス許可][3]」で手順を確認してください。

## セットアップ {#setup}

1. Cluster Autoscaling を有効にします。

   {{< tabs >}}
{{% tab "Datadog Operator" %}}

`DatadogAgent` 仕様内の `features.autoscaling.cluster.enabled` を `true` に設定します。

```yaml
spec:
  features:
    autoscaling:
      cluster:
        enabled: true
```
{{% /tab %}}

{{% tab "Helm" %}}

`datadog-values.yaml` ファイル内の `datadog.autoscaling.cluster.enabled` を `true` に設定します。

```yaml
datadog:
  autoscaling:
    cluster:
      enabled: true
```

次に、`helm upgrade` を実行します。
{{% /tab %}}
{{< /tabs >}}
2. Karpenter をインストールしていない場合は、[Datadog `kubectl` プラグイン][4]をインストールします。このプラグインは、Karpenter のインストールや既存の Karpenter 構成への接続を支援します。
   ```shell
   kubectl krew install datadog
   ```
3. `kubectl` プラグインを実行し、クラスターが実行されている AWS プロジェクトの AWS 資格情報を渡します。
   ```shell
   AWS_PROFILE=<foo> AWS_REGION=<bar> kubectl datadog autoscaling cluster install
   ```

   このコマンドでは、以下が作成されます。
   - `dd-karpenter-$CLUSTER_NAME` という名前の 2 つの CloudFormation スタック
   - Kubernetes 名前空間 `dd-karpenter` 内の `karpenter` という名前の Helm リリース
   - Karpenter の `EC2NodeClass` および `NodePool` オブジェクト

   より詳細なコマンドオプションについては、[`kubectl datadog autoscaling cluster install --help`][4] を実行してください。

## クラスターのオートスケール {#autoscale-a-cluster}

Datadog で [Kubernetes Autoscaling][5] に移動します。オートスケーリングが可能なすべてのクラスターは、[[Autoscaling Settings][7]] ページで確認できます。選択したクラスターの {{< ui >}}Enabled{{< /ui >}} 列を切り替えます。

{{< img src="containers/autoscaling/settings.png" alt=" [Enable Clusters for Autoscaling] セクションが表示されている [Autoscaling Settings] ページ。クラスター名、ノード、CPU 容量、メモリ容量、バーで示した CPU 使用率、バーで示したメモリ使用率、オートスケーリングされたワークロード数、クラスターのスケーリング可用性、ワークロードのスケーリング可用性、有効化のトグルスイッチの列がある、フィルタリング可能な Kubernetes クラスターのテーブルを表示します。右側のトグルスイッチは、どのクラスターでオートスケーリングが有効になっているかを示します。" style="width:100%;" >}}

[[Cluster Scaling][6]] ページを使用してクラスターを選択し、その推奨事項を確認します。最適化を開始するクラスターを特定します。Limited Availability の期間中は、**非本番環境のクラスター**を選択することを Datadog では推奨しています。

{{< img src="containers/autoscaling/cluster-view.png" alt="クラスター dev-eks-shopist-a-us-east-1 の [Cluster Scaling] 詳細ページです。[Cost Summary] セクションには、クラスターコスト $140.7k (前月比 -$3.1k)、アイドルコスト $93.66k (-$2.29k の変化)、CPU 使用量とリクエスト量の比率 27.24%、メモリ使用量とリクエスト量の比率 35.15% の 4 つのメトリクスが表示されます。[Scaling Events] セクションには、過去 1 か月にわたる CPU とメモリのメトリクスを追跡し、使用パターンの変動を示す 2 つの時系列グラフと、Pod や DatadogPodAutoscaler のアクティビティを含む最近のスケーリングイベントのタイムラインが表示されます。[Scaling Recommendations] セクションには、アイドル状態の CPU とメモリを持つワークロードのテーブルが表示され、オートスケーリングが 8.7% 有効になっていることが示されています。" style="width:100%;" >}}

{{< ui >}}Start Autoscaling{{< /ui >}} をクリックして、推奨事項を適用します。

[1]: /ja/agent/remote_config
[2]: /ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: /ja/account_management/rbac/permissions/#overview
[4]: /ja/containers/kubernetes/kubectl_plugin/
[5]: https://app.datadoghq.com/orchestration/scaling/summary
[6]: https://app.datadoghq.com/orchestration/scaling/cluster
[7]: https://app.datadoghq.com/orchestration/scaling/settings