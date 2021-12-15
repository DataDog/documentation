---
assets:
  dashboards:
    ProphetStor Federator.ai Application Overview: assets/dashboards/application-overview.json
    ProphetStor Federator.ai Cluster Overview: assets/dashboards/cluster-overview.json
    ProphetStor Federator.ai Cost Analysis Overview: assets/dashboards/cost-analysis-overview.json
    ProphetStor Federator.ai Kafka Overview: assets/dashboards/overview.json
  metrics_metadata: metadata.csv
  monitors:
    Node CPU Load Prediction in Next 24 Hours is High: assets/recommended_monitors/federatorai_node_cpu_prediction.json
    Node Memory Usage Prediction in Next 24 Hours is High: assets/recommended_monitors/federatorai_node_mem_prediction.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - コンテナ
  - orchestration
creates_events: false
ddtype: crawler
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/federatorai/README.md
display_name: Federator.ai
draft: false
git_integration_title: federatorai
guid: ec0fd93a-ee4c-4652-9996-cc68cb5a4d45
integration_id: federatorai
integration_title: Federator.ai
integration_version: ''
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


[ProphetStor Federator.ai][1] は、Kubernetes および VMware クラスター内の仮想マシン (VM) アプリケーションのリソース管理と最適化をサポートする AI ベースの企業向けソリューションです。

高度な機械学習アルゴリズムを使用して、アプリケーションのワークロードを予測します。Federator.ai の主な機能は次の通りです。
* Kubernetes クラスター内のコンテナ化アプリケーション、 VMware クラスター内の VM、および Amazon Web Services (AWS) Elastic Compute Cloud (EC2) 向けの AI ベースのワークロード予測
* ワークロード予測、アプリケーション、Kubernetes などの関連するメトリクスに基づくリソースの提案
* 一般的な Kubernetes アプリケーションのコントローラー / ネームスペース向け CPU / メモリーの自動プロビジョニング
* Kubernetes アプリケーションコンテナ、Kafka Consumer Group、NGINX Ingress アップストリームサービスのオートスケーリング
* Kubernetes クラスターと VM クラスターのワークロード予測に基づくマルチクラウドコスト分析と推奨
* クラスター、Kubernetes アプリケーション、VM、Kubernetes ネームスペースの提案に基づく実際のコストと潜在的な節約

ProphetStor Federator.ai を統合することで、Kubernetes コンテナ、ネームスペース、クラスターノードのリソース使用量を追跡および予測し、コストのかかるオーバープロビジョニングやパフォーマンスに影響を与えるアンダープロビジョニングを防ぐための適切な提案を作成できます。Federator.ai はCI/CD パイプラインと簡単に統合でき、Kubernetes クラスターのデプロイ時にコンテナを継続的に最適化します。Federator.ai はアプリケーションのワークロード予測を利用して適切なタイミングでアプリケーションコンテナを自動スケーリングし、Kubernetes HPA または [Datadog Watermark Pod Autoscaling (WPA)][2] を介して適切な数のコンテナレプリカでパフォーマンスを最適化します。

Federator.ai について詳しくは、[ProphetStor Federator.ai 機能デモ][3]および [Datadog 向け ProphetStor Federator.ai][4]のビデオをご覧ください。


**ProphetStor Federator.ai クラスターの概要**

![ProphetStor Federator.ai クラスターの概要][5]

* クラスターのリソース使用量予測と推奨
   - この表は、クラスターのリソース計画のための、CPU メモリの負荷予測の最大値、最小値、平均値、および Federator.ai からの CPU メモリリソースの推奨使用量を示しています。

* クラスターノードのリソース使用量予測と推奨
   - この表は、ノードのリソース計画のための、CPU メモリの負荷予測の最大値、最小値、平均値、および Federator.ai からの CPU メモリリソースの推奨使用量を示しています。

* ノードの現在/予測メモリ使用量 (日次)
   - このグラフは、Federator.ai からの予測メモリ使用量とノードのメモリ使用量（日次）を示しています。

* ノードの現在/予測メモリ使用量 (週次)
   - このグラフは、Federator.ai からの予測メモリ使用量とノードのメモリ使用量（週次）を示しています。

* ノードの現在/予測メモリ使用量 (月次)
   - このグラフは、Federator.ai からの予測メモリ使用量とノードのメモリ使用量（月次）を示しています。

* ノードの現在/予測 CPU 使用量 (日次)
   - このグラフは、Federator.ai からの予測 CPU 使用量とノードの CPU 使用量（日次）を示しています。

* ノードの現在/予測 CPU 使用量 (週次)
   - このグラフは、Federator.ai からの予測 CPU 使用量とノードの CPU 使用量（週次）を示しています。

* ノードの現在/予測 CPU 使用量 (月次)
   - このグラフは、Federator.ai からの予測 CPU 使用量とノードの CPU 使用量（月次）を示しています。


**ProphetStor Federator.ai アプリケーションの概要**

![アプリケーション概要ダッシュボード][6]

* 今後 24 時間の負荷予測
   - この表は、コントローラーのリソース計画のための、今後 24 時間の CPU メモリの負荷予測の最大値、最小値、平均値、および Federator.ai からの CPU メモリリソースの推奨使用量を示しています。

* 今後 7 日間の負荷予測
   - この表は、コントローラーのリソース計画のための、今後 7 日の CPU メモリの負荷予測の最大値、最小値、平均値、および Federator.ai からの CPU メモリリソースの推奨使用量を示しています。

* 今後 30 日間の負荷予測
   - この表は、コントローラーのリソース計画のための、今後 30 日の CPU メモリの負荷予測の最大値、最小値、平均値、および Federator.ai からの CPU メモリリソースの推奨使用量を示しています。

* 現在/予測 CPU 使用量 (日次)
   - このグラフは、Federator.ai からの予測 CPU 使用量とコントローラーの CPU 使用量（日次）を示しています。

* 現在/予測 CPU 使用量 (週次)
   - このグラフは、Federator.ai からの予測 CPU 使用量とコントローラーの CPU 使用量（週次）を示しています。

* 現在/予測 CPU 使用量 (月次)
   - このグラフは、Federator.ai からの予測 CPU 使用量とコントローラーの CPU 使用量（月次）を示しています。

* 現在/予測メモリ使用量 (日次)
   - このグラフは、Federator.ai からの予測メモリ使用量とコントローラーのメモリ使用量（日次）を示しています。

* 現在/予測メモリ使用量 (週次)
   - このグラフは、Federator.ai からの予測メモリ使用量とコントローラーのメモリ使用量（週次）を示しています。

* 現在/予測メモリ使用量 (月次)
   - このグラフは、Federator.ai からの予測メモリ使用量とコントローラーのメモリ使用量（月次）を示しています。

* 現在/理想/推奨のレプリカ
   - このグラフは、Federator.ai からの推奨レプリカと、コントローラーの理想的なレプリカおよび現在のレプリカを示しています。

* メモリの使用量/リクエスト/上限 vs 推奨メモリ上限
   - このグラフは、Federator.ai からの推奨メモリ上限と、コントローラーの現在のメモリ使用量、要求された使用量、および制限された使用量を示しています。

* CPU 使用量/リクエスト/上限 vs 推奨 CPU 上限
   - このグラフは、Federator.ai からの推奨 CPU 上限と、コントローラーの現在の CPU 使用量、要求された使用量、および制限された使用量を示しています。

* CPU 使用量/使用率上限
   - このグラフは、コントローラーの CPU 使用率と、CPU 使用率が上限を上回っている/下回っていることを視覚的にを示しています。


**ProphetStor Federator.ai Kafka の概要**

![ダッシュボード概要][7]

* 推奨レプリカと現在/理想的なレプリカ
   - この時系列グラフは、Federator.ai からの推奨レプリカと、システム内の必要なレプリカと現在のレプリカを示しています。

* 生成と消費と生成予測
   - この時系列グラフは、Kafka メッセージの生成率と消費率、および Federated.ai によって予測された生成率を示しています。

* Kafka コンシューマーラグ
   - この時系列グラフは、すべてのパーティションからのコンシューマーラグの合計を示しています。

* コンシューマーキューレイテンシー (ミリ秒)
   - この時系列グラフは、コンシューマーが受信するまでのメッセージキュー内のメッセージの平均レイテンシーを示しています。

* デプロイメモリ使用量
   - この時系列グラフは、コンシューマーのメモリ使用量を示しています。

* デプロイ CPU 使用量
   - この時系列グラフは、コンシューマーの CPU 使用量を示しています。


**ProphetStor Federator.ai コスト分析の概要**

![コスト分析の概要][8]

* 現在のクラスターコストおよび現在のクラスターコンフィギュレーション
   - この表は、クラスターの現在のコストと環境コンフィギュレーションを示しています。

* 推奨クラスター - AWS および推奨クラスターコンフィギュレーション - AWS
   - この表は、Federator.ai からの推奨 AWS インスタンスコンフィギュレーションと、推奨 AWS インスタンスのコストを示しています。

* 推奨クラスター - Azure および推奨クラスターコンフィギュレーション - Azure
   - この表は、Federator.ai からの推奨 Azure インスタンスコンフィギュレーションと、推奨 Azure インスタンスのコストを示しています。

* 推奨クラスター - GCP および推奨クラスターコンフィギュレーション - GCP
   - この表は、Federator.ai からの推奨 GCP インスタンスコンフィギュレーションと、推奨 GCP インスタンスのコストを示しています。

* 最高コストのネームスペース ($/日)
   - このグラフは、現在のクラスターのネームスペースの最高コスト（日次）を示しています。

* 最高予測コストのネームスペース ($/月)
   - このグラフは、現在のクラスターのネームスペースの最高予測コスト（月次）を示しています。


## セットアップ

* 以下の手順に従って、Federator.ai をダウンロードおよび設定してください。

### インストール

1. OpenShift/Kubernetes クラスターにログインします
2. 次のコマンドで OpenShift/Kubernetes 用の Federator.ai をインストールします

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/prophetstor/master/deploy/federatorai-launcher.sh | bash
   ```

   ```shell
   $ curl https://raw.githubusercontent.com/containers-ai/prophetstor/master/deploy/federatorai-launcher.sh | bash
   ...
   Please enter Federator.ai version tag [default: latest]:latest
   Please enter the path of Federator.ai directory [default: /opt]:

   Downloading v4.5.1-b1562 tgz file ...
   Done
   Do you want to use a private repository URL? [default: n]:
   Do you want to launch Federator.ai installation script? [default: y]:

   Executing install.sh ...
   Checking environment version...
   ...Passed
   Enter the namespace you want to install Federator.ai [default: federatorai]:
   .........
   Downloading Federator.ai alamedascaler sample files ...
   Done
   ========================================
   Which storage type you would like to use? ephemeral or persistent?
   [default: persistent]:
   Specify log storage size [e.g., 2 for 2GB, default: 2]:
   Specify AI engine storage size [e.g., 10 for 10GB, default: 10]:
   Specify InfluxDB storage size [e.g., 100 for 100GB, default: 100]:
   Specify storage class name: managed-nfs-storage
   Do you want to expose dashboard and REST API services for external access? [default: y]:

   ----------------------------------------
   install_namespace = federatorai
   storage_type = persistent
   log storage size = 2 GB
   AI engine storage size = 10 GB
   InfluxDB storage size = 100 GB
   storage class name = managed-nfs-storage
   expose service = y
   ----------------------------------------
   Is the above information correct [default: y]:
   Processing...

   (snipped)
   .........
   All federatorai pods are ready.

   ========================================
   You can now access GUI through https://<YOUR IP>:31012
   Default login credential is admin/admin

   Also, you can start to apply alamedascaler CR for the target you would like to monitor.
   Review administration guide for further details. 
   ========================================
   ========================================
   You can now access Federatorai REST API through https://<YOUR IP>:31011
   The default login credential is admin/admin
   The REST API online document can be found in https://<YOUR IP>:31011/apis/v1/swagger/index.html
   ========================================

   Install Federator.ai v4.5.1-b1562 successfully

   Downloaded YAML files are located under /opt/federatorai/installation

   Downloaded files are located under /opt/federatorai/repo/v4.5.1-b1562
   ```

3. Federator.ai ポッドが正しく実行されていることを確認します。

   ```shell
   $ kubectl get pod -n federatorai
   ```
4. Federator.ai GUI にログインします。URL とログイン資格情報は、ステップ 2 の出力で確認できます。


### コンフィギュレーション

1. お使いのアカウントで Datadog にログインし、Datadog API を使用するための [API キーとアプリケーションキー][9]を取得します。

2. クラスターごとのメメトリクスデータソース用に Federator.ai を構成します。
    - Federator.ai GUI を起動 -> Configuration -> Clusters -> "Add Cluster" をクリックします
    - API キーとアプリケーションキーを入力します

    ![クラスターウィンドウを追加する][10] 

3. 詳細については、[Federator.ai - インストールおよびコンフィギュレーションガイド][11]および[ユーザーガイド][12]を参照してください。


## 収集データ

### メトリクス
{{< get-metrics-from-git "federatorai" >}}



### サービスのチェック

Federator.ai には、サービスのチェック機能は含まれません。

### イベント

Federator.ai には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Federator.ai - インストールおよびコンフィギュレーションガイド][11]をご覧いただくか、[Datadog サポート][14]までお問い合わせください。

[1]: https://prophetstor.com/federator_ai/
[2]: https://github.com/DataDog/watermarkpodautoscaler
[3]: https://youtu.be/IooFJnB8bb8
[4]: https://youtu.be/qX_HF_zZ4BA
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cluster_overview_dashboard.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/application_overview_dashboard.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/dashboard_overview.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/cost_analysis_overview.png
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/federatorai/images/add_cluster_window.png
[11]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf
[12]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf
[13]: https://github.com/DataDog/integrations-extras/blob/master/federatorai/metadata.csv
[14]: https://docs.datadoghq.com/ja/help/