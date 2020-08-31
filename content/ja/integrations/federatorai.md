---
assets:
  dashboards:
    ProphetStor Federator.ai Kafka Overview: assets/dashboards/overview.json
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - コンテナ
  - orchestration
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/federatorai/README.md'
display_name: Federator.ai
git_integration_title: federatorai
guid: ec0fd93a-ee4c-4652-9996-cc68cb5a4d45
integration_id: federatorai
integration_title: Federator.ai
is_public: true
kind: インテグレーション
maintainer: support@prophetstor.com
manifest_version: 1.0.0
metric_prefix: federatorai.
metric_to_check: federatorai.integration.status
name: federatorai
public_title: Datadog-Federator.ai インテグレーション
short_description: ProphetStor Federator.ai とのインテグレーションでアプリケーションのパフォーマンスを最適化します
support: contrib
supported_os:
  - linux
---
## 概要

[ProphetStor Federator.ai][1] は AI ベースのソリューションで、企業が Kubernetes 上のアプリケーションのリソースを管理、最適化、オートスケールする手助けをします。Federator.ai は高度な機械学習アルゴリズムでアプリケーションのワークロードを予測することで、ベストなタイミングで適切な量のリソースをスケーリングし、アプリケーションのパフォーマンスを最適化します。

* Kafka などのアプリケーションに対応する AI ベースのワークロード予測
* ワークロード予測、アプリケーション、Kubernetes などの関連するメトリクスに基づくリソースの提案
* [Datadog Watermark Pod Autoscaler (WPA)][2] によるアプリケーションコンテナの自動スケーリング

ProphetStor Federator.ai のインテグレーションにより、ユーザーは Federator.ai ダッシュボードから Kafka メッセージの生成率/消費率、およびメッセージ生成率の予測を簡単に追跡できます。Federator.ai は、予測またはメッセージ生成率に基づいて、Kafka コンシューマーレプリカを自動的にスケーリングして、ワークロードを処理します。これを視覚化できる Federator.ai ダッシュボードには、推奨されるコンシューマーレプリカと現在のコンシューマーレプリカの数が表示さます。さらにダッシュボードには、全体的なコンシューマーラグと、メッセージがコンシューマーによって受信されるまでの平均レイテンシーも表示され、パフォーマンスを監視しやすくなっています。

* **Federator.ai ダッシュボードの概要**

![dashboard_overview][3]

* **推奨レプリカと現在/必要なレプリカ**
   - この時系列グラフは、Federator.ai からの推奨レプリカと、システム内の必要なレプリカと現在のレプリカを示しています。

![dashboard_recommended_replicas][4]

* **生成と消費と生成予測**
   - この時系列グラフは、Kafka メッセージの生成率と消費率、および Federated.ai によって予測された生成率を示しています。

![dashboard_production_consumption][5]

* **Kafka コンシューマーラグ**
   - この時系列グラフは、すべてのパーティションからのコンシューマーラグの合計を示しています。

![dashboard_consumer_lag][6]

* **コンシューマーキューレイテンシー (ミリ秒)**
   - この時系列グラフは、コンシューマーが受信するまでのメッセージキュー内のメッセージの平均レイテンシーを示しています。

![dashboard_queue_latency][7]

* **デプロイメモリ使用量**
   - この時系列グラフは、コンシューマーのメモリ使用量を示しています。

![dashboard_memory_usage][8]

* **デプロイ CPU 使用量**
   - この時系列グラフは、コンシューマーの CPU 使用量を示しています。

![dashboard_cpu_usage][9]


## セットアップ

### インストール

1. OpenShift/Kubernetes クラスターにログインします
2. 次のコマンドで OpenShift/Kubernetes 用の Federator.ai をインストールします

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/federatorai-operator/datadog/deploy/install.sh |bash
   ```

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/federatorai-operator/datadog/deploy/install.sh |bash
   Checking environment version...
   ...Passed
   Please input Federator.ai Operator tag: datadog
   Enter the namespace you want to install Federator.ai [default: federatorai]:
   .........
   (snipped)
   .........
   You can now access GUI through https://federatorai-dashboard-frontend-federatorai.apps.jc-ocp4.172-31-17-84.nip.io
   Default login credential is admin/admin

   Also, you can start to apply alamedascaler CR for the namespace you would like to monitor.
   Review administration guide for further details.
   ========================================
   .........
   (snipped)
   .........
   Install Alameda successfully

   Downloaded YAML files are located under /tmp/install-op
   ```

3. Federator.ai ポッドが正しく実行されていることを確認します

   ```shell
   $ kubectl get pod -n federatorai
   ```
4. Federator.ai GUI にログインします。URL とログイン資格情報は、ステップ 2 の出力で確認できます。


### コンフィギュレーション

1. Datadog に接続して使用するには、Datadog アカウントが必要です。アカウントをお持ちでない場合は、[Datadog Web サイト][10]にアクセスして、無料のトライアルアカウントにサインアップしてください。

2. お使いのアカウントで Datadog にログインし、Datadog API を使用するための [API キーとアプリケーションキー][11]を取得します。

3. Federator.ai Data-Adapter を構成します。
   - Github から Data-Adapter コンフィギュレーションスクリプトをダウンロードします。

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/federatorai-operator/datadog/deploy/federatorai-setup-for-datadog.sh -O
   ```

   - 実行権限を変更します。

   ```shell
   $ chomd +x federatorai-setup-for-datadog.sh
   ```

   - .kubeconfig (sh -c "export KUBECONFIG=.kubeconfig; oc login <K8s_LOGIN_URL>") を準備するか、既存のものを使用します。例:

   ```shell
   $ sh -c "export KUBECONFIG=.kubeconfig; oc login https://api.ocp4.example.com:6443"
   ```

   - コンフィギュレーションスクリプトを実行し、手順に従ってコンフィギュレーションパラメーターを入力します。

   ```shell
   $ ./federatorai-setup-for-datadog.sh -k .kubeconfig
   ```

   ```shell
   $ ./federatorai-setup-for-datadog.sh -k .kubeconfig
   You are connecting to cluster: https://api.jc-ocp4.172-31-17-84.nip.io:6443

   Getting Datadog info...
   Input a Datadog API Key []:xxxxx9273dxxcbc155xx3a7331xxxxx
   Input a Datadog Application Key []:xxxxx7220db1478xxxxxcb5c323fcb02a11xxxxx

   Getting the Kafka info... No.1
   Input Kafka consumer deployment name []: consumer
   Input Kafka consumer deeployment namespace []: myproject
   Input Kafka consumer minimum replica number []: 1
   Input Kafka consumer maximum replica number []: 30
   Input Kafka consumer group name []: group0001
   Input Kafka consumer group namespace []: myproject
   Input Kafka consumer topic name []: topic0001
   Input Kafka consumer topic namespace []: myproject

   Do you want to input another set? [default: n]:
   Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply
   secret/federatorai-data-adapter-secret configured
   Warning: kubectl apply should be used on resource created by either kubectl create --save-config or kubectl apply
   configmap/federatorai-data-adapter-config configured

   Setup Federator.ai for datadog successfully
   ```

4. 詳細については、[Federator.ai と Datadog のインテグレーション - インストールおよびコンフィギュレーションガイド][12]を参照してください。


## 収集データ

### メトリクス
{{< get-metrics-from-git "federatorai" >}}



### サービスのチェック

Federator.ai には、サービスのチェック機能は含まれません。

### イベント

Federator.ai には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[ProphetStor Federator.ai ドキュメント][14]をご覧いただくか、[Datadog サポート][15]までお問い合わせください。

[1]: https://www.prophetstor.com/federator-ai-for-aiops/federator-ai-datadog-integration/
[2]: https://github.com/DataDog/watermarkpodautoscaler
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_overview.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_recommended_replicas.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_production_consumption.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_consumer_lag.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_queue_latency.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_memory_usage.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_cpu_usage.png
[10]: https://www.datadoghq.com/
[11]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[12]: http://www.prophetstor.com/wp-content/uploads/2020/05/Federator.ai%20for%20Datadog%20-%20Installation%20and%20Configuration%20Guide.pdf
[13]: https://github.com/DataDog/integrations-extras/blob/master/federatorai/metadata.csv
[14]: https://github.com/containers-ai/federatorai-operator
[15]: https://docs.datadoghq.com/ja/help/