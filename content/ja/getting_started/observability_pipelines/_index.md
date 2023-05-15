---
aliases:
- /ja/agent/vector_aggregation/
- /ja/integrations/observability_pipelines/integrate_vector_with_datadog/
- /ja/observability_pipelines/integrate_vector_with_datadog/
- /ja/observability_pipelines/integrations/integrate_vector_with_datadog/
- /ja/observability_pipelines/production_deployment_overview/integrate_datadog_and_the_observability_pipelines_worker/
further_reading:
- link: /observability_pipelines/production_deployment_overview/
  tag: Documentation
  text: 観測可能性パイプラインワーカーの本番デプロイの概要
- link: https://dtdg.co/d22op
  tag: ラーニングセンター
  text: 観測可能性パイプラインによる安心・安全なローカル処理
kind: Documentation
title: 観測可能性パイプラインの概要
---

## 概要

[観測可能性パイプラインワーカー][1]は、ログやメトリクスをあらゆるソースからあらゆる宛先に収集、処理、ルーティングすることができます。Datadog を使用することで、観測可能性パイプラインワーカーデプロイのすべてをスケールアップして構築・管理することができます。

このガイドでは、共通ツールクラスターにワーカーをデプロイし、Datadog Agent がワーカーにログとメトリクスを送信するように構成する方法を説明します。

{{< img src="getting_started/observability_pipelines/opw-dd-pipeline.png" alt="観測可能性パイプラインアグリゲーターを通してデータを送信するいくつかのワークロードクラスターの図。" >}}

## 前提条件
* すでに Datadog を使用していて、観測可能性パイプラインを使用したい。
* サービスは、Amazon Elastic Kubernetes Service (EKS)、Azure Kubernetes Service (AKS)、または Google Kubernetes Engine (GKE) の Kubernetes クラスターにデプロイされている。
* 観測可能性パイプラインワーカーがデプロイされるクラスターや、集計されるワークロードへの管理アクセス権がある。
* 環境に他のすべてのクラスタに接続する共通のツールまたはセキュリティクラスターを用意している。

## 前提条件
インストールする前に、以下があることを確認してください。

* 有効な [Datadog API キー][2]。
* 観測可能性パイプラインの構成 ID。

[観測可能性パイプライン][3]で、この 2 つを生成することができます。

Kubernetes ノードでワーカーを実行するには、1 つの CPU と 512MB RAM が利用可能なノードが最低 2 台必要です。Datadog は、ワーカー用に別のノードプールを作成することを推奨しており、これは本番デプロイのための推奨構成でもあります。

### プロバイダー固有の要件
{{< tabs >}}
{{% tab "AWS EKS" %}}
* [AWS ロードバランサーコントローラー][1]が必要です。インストールされているかどうかは、以下のコマンドを実行し、リストの中に `aws-load-balancer-controller` があるかどうかで確認することができます。

  ```shell
  helm list -A
  ```
* Datadog では、Amazon EKS >= 1.16 を使用することを推奨しています。

[1]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
{{% /tab %}}
{{% tab "Azure AKS" %}}
Azure AKS については、特に条件はありません。
{{% /tab %}}
{{% tab "Google GKE" %}}
Google GKE については、特に条件はありません。
{{% /tab %}}
{{< /tabs >}}

## 観測可能性パイプラインワーカーのインストール
### Helm チャートのダウンロード

{{< tabs >}}
{{% tab "AWS EKS" %}}
AWS EKS 用の [Helm チャート][1]をダウンロードします。

Helm チャートで、`datadog.apiKey` と `datadog.configKey` の値をパイプラインに合わせて置き換えます。その後、以下のコマンドでクラスターにインストールします。

```shell
helm repo add datadog https://helm.datadoghq.com
```
```shell
helm repo update
```
```shell
helm update --install \
    opw datadog/observability-pipelines-worker \
    -f aws_eks.yaml
```

[1]: /resources/yaml/observability_pipelines/quickstart/aws_eks.yaml
{{% /tab %}}
{{% tab "Azure AKS" %}}
Azure AKS 用の [Helm チャート][1]をダウンロードします。

Helm チャートで、`datadog.apiKey` と `datadog.configKey` の値をパイプラインに合わせて置き換えます。その後、以下のコマンドでクラスターにインストールします。

```shell
helm repo add datadog https://helm.datadoghq.com
```
```shell
helm repo update
```
```shell
helm update --install \
  opw datadog/observability-pipelines-worker \
  -f azure_aks.yaml
```

[1]: /resources/yaml/observability_pipelines/quickstart/azure_aks.yaml
{{% /tab %}}
{{% tab "Google GKE" %}}
Google GKE 用の [Helm チャート][1]をダウンロードします。

Helm チャートで、`datadog.apiKey` と `datadog.configKey` の値をパイプラインに合わせて置き換えます。その後、以下のコマンドでクラスターにインストールします。

```shell
helm repo add datadog https://helm.datadoghq.com
```
```shell
helm repo update
```
```shell
helm update --install \
  opw datadog/observability-pipelines-worker \
  -f google_gke.yaml
```

[1]: /resources/yaml/observability_pipelines/quickstart/google_gke.yaml
{{% /tab %}}
{{< /tabs >}}

### ロードバランシング
クラウドプロバイダーが提供するロードバランサーを使用します。
これらは、デフォルトの Helm セットアップで構成されているオートスケーリングイベントに基づいて調整されます。ロードバランサーは内部向けなので、ネットワーク内にしかアクセスできません。

Datadog Agent の構成時に Helm から渡されたロードバランサーの URL を使用します。

#### クロスアベイラビリティゾーンロードバランシング
提供されている Helm の構成は、ロードバランシングを簡素化しようとしていますが、クロス AZ トラフィックの潜在的な価格的影響を考慮する必要があります。可能な限り、サンプルは複数のクロス AZ ホップが起こりうる状況を作らないようにしています。

{{< tabs >}}
{{% tab "AWS EKS" %}}
[AWS ロードバランサーコントローラー][1]でプロビジョニングされた NLB を使用します。

サンプルの構成では、このコントローラーで利用可能なクロスゾーンのロードバランシング機能は有効になっていません。これを有効にするには、`service` ブロックに以下のアノテーションを追加します。

```
service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

詳しくは [AWS ロードバランサーコントローラー][2]をご覧ください。

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/
[2]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes
{{% /tab %}}
{{% tab "Azure AKS" %}}
Azure AKS については、特に条件はありません。
{{% /tab %}}
{{% tab "Google GKE" %}}
グローバルアクセスは、共有ツールクラスターで使用するために必要であると考えられるため、デフォルトで有効になっています。
{{% /tab %}}
{{< /tabs >}}


### バッファリング
観測可能性パイプラインには複数のバッファリング戦略があり、ダウンストリーム障害に対するクラスターの耐性を高めることができます。提供されているサンプル構成では、ディスクバッファを使用していますが、その容量は、観測可能性パイプラインのデプロイにおいて、10Mbps/コアで約 10 分のデータ容量に対応するように評価されています。これは、一過性の問題が解決するまでの時間や、インシデント対応担当者が観測可能性データに対して何をすべきかを判断するのに十分な時間であることが多いでしょう。

{{< tabs >}}
{{% tab "AWS EKS" %}}
AWS の場合、Datadog は `io2` EBS ドライブファミリーの使用を推奨しています。また、`gp3` ドライブを使用することも可能です。
{{% /tab %}}
{{% tab "Azure AKS" %}}
Azure AKS の場合、Datadog は `default` (`managed-csi` とも呼ばれる) ディスクの使用を推奨しています。
{{% /tab %}}
{{% tab "Google GKE" %}}
Google GKE では、Datadog は SSD でバックアップされた `premium-rwo` ドライブクラスの使用を推奨しています。HDD でバックアップされたクラスである `standard-rwo` は、バッファが有用であるために十分な書き込み性能を提供しない可能性があります。
{{% /tab %}}
{{< /tabs >}}

## Agent とワーカーを接続する
Datadog Agent のログとメトリクスを観測可能性パイプラインワーカーに送信するには、以下のように Agent の構成を更新してください。

```yaml
vector:
  logs.enabled: true
  # 観測可能性パイプラインワーカーで TLS/SSL が有効になっている場合、プロトコルを https に調整します
  logs.url: "http://<OPW_HOST>:8282"
  metrics.enabled: true
  # 観測可能性パイプラインワーカーで TLS/SSL が有効になっている場合、プロトコルを https に調整します
  metrics.url: "http://<OPW_HOST>:8282"

```


`OPW_HOST` は、先ほど設定したロードバランサーの `EXTERNAL-IP` です。以下のコマンドを実行することで取得することができます。

```shell
kubectl get svc opw-observability-pipelines-worker
```

この時点で、観測可能性データはワーカーに送られ、データ処理に利用できるようになっているはずです。次のセクションでは、デフォルトで含まれている処理と、利用可能な追加オプションについて説明します。

## データを活用する
提供される [Helm チャート](#download-the-helm-chart)には、観測可能性パイプラインツールを示す処理手順の例があり、Datadog に送られるデータが正しいフォーマットであることを保証します。

### ログの処理
提供されるログパイプラインは、次のような動作をします。

- **観測可能性パイプラインワーカーを経由してくるログにタグを付ける。**これは、クラスターを更新する際に、どのトラフィックがまだワーカーに移行する必要があるかを判断するのに役立ちます。これらのタグはまた、不均衡がある場合に備えて、ログがロードバランサーを介してルーティングされている方法を示しています。
- **ワーカーを経由するログのステータスを修正する。**Datadog Agent がコンテナからログを収集する方法のため、提供される `.status` 属性はメッセージの実際のレベルを適切に反映しません。これは、ワーカーからログを受信するバックエンドでのパースルールの問題を防ぐために削除されます。

構成例では、次の 2 つが重要なコンポーネントとなっています。
- `logs_parse_ddtags`: 文字列に格納されているタグを構造化データにパースします。
- `logs_finish_ddtags`: Datadog Agent が送信するような形式になるようにタグを再エンコードします。

内部的には、Datadog Agent はログタグを 1 つの文字列の CSV として表現します。これらのタグを効果的に操作するには、取り込みエンドポイントに送信する前に、パース、修正、そして再エンコードする必要があります。これらのステップは、これらのアクションを自動的に実行するように書かれています。パイプラインに加える修正、特にタグの操作は、この 2 つのステップの間に行う必要があります。

### メトリクスの処理
提供されるメトリクスパイプラインは、追加のパースおよび再エンコード手順を必要としません。ログパイプラインと同様に、トラフィックアカウンティングの目的で、受信したメトリクスにタグを付けます。カーディナリティが追加されるため、カスタムメトリクスではコストに影響することがあります。

この時点で、環境は、データが流れる観測可能性パイプライン用に構成されています。特定のユースケースにはさらなる構成が必要になる可能性がありますが、提供されているツールはその出発点となります。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/observability_pipelines/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /ja/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create