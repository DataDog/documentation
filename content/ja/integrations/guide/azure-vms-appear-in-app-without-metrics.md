---
aliases:
- /ja/integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
title: Azure VMs appear in the App without metrics
---

Datadog に Azure インテグレーションを適切にインストールすると、Azure VM やその他のサービスからのメトリクスが 15 分ほどで流れ始めます。

この後、インフラストラクチャーリストに Azure VM が表示されても、メトリクスが報告されない場合は、いくつかの原因が考えられます。

1. 正しいメトリクスを探しているか確認します。
   **クラシック**仮想マシンメトリクスは azure.vm ネームスペースで始まり、ARM デプロイ済み仮想マシンメトリクスは `azure.compute_virtualmachines` ネームスペースで始まります。

2. これらのネームスペースのどちらもメトリクスを返さない場合、Azure Portal 内の仮想マシンの**診断**がオンになっていることを確認します。注: ブート診断と基本メトリクスのみ必要です。
    * **クラシック** VM の場合
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/classic_vm.png" alt="ステータスがオンに設定されたクラシック仮想マシンの診断ビューを表示する azure ポータル" >}}

    * ARM でデプロイされた VM の場合
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/arm_deployed_vm.png" alt="ステータスがオンに設定された仮想マシンの診断設定ビューを表示する azure ポータル" >}}

3. 仮想マシンが起動していることを確認します。
   インテグレーションは、停止/割り当て解除されたマシンのパフォーマンスメトリクスを収集しません。しかし、`azure.vm.status metric` は、マシンが稼働している場合、または停止している場合は (インフラストラクチャーのリストに停止した VM が表示される) `1` を返します。関連するステータスタグにより、稼働しているホストと稼働していないホストを区別することができます。該当のホストが `status:running` を持ち、Azure ポータル上で稼働していることを確認します。
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/azure_vm_running.png" alt="Datadog アプリケーションに一対の時系列グラフを表示し、一方は status:running の azure.vm.status の合計を表示し、もう一方は status:not_running の azure.vm.status の合計を表示するようにしました" >}}