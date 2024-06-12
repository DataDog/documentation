---
app_id: federatorai
app_uuid: c9192d7c-101d-44b2-8ddf-c5fcbe5c5306
assets:
  dashboards:
    ProphetStor Federator.ai Application Overview: assets/dashboards/application-overview.json
    ProphetStor Federator.ai Cluster Overview: assets/dashboards/cluster-overview.json
    ProphetStor Federator.ai Cost Analysis Overview: assets/dashboards/cost-analysis-overview.json
    ProphetStor Federator.ai Cost Management - Cluster: assets/dashboards/cost-management-cluster-overview.json
    ProphetStor Federator.ai Cost Management - Namespace: assets/dashboards/cost-management-namespace-overview.json
    ProphetStor Federator.ai Cost Management - Node: assets/dashboards/cost-management-node-overview.json
    ProphetStor Federator.ai Kafka Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: federatorai.integration.status
      metadata_path: metadata.csv
      prefix: federatorai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10104
    source_type_name: Federator.ai
  monitors:
    Node CPU Load Prediction in Next 24 Hours is High: assets/monitors/federatorai_node_cpu_prediction.json
    Node Memory Usage Prediction in Next 24 Hours is High: assets/monitors/federatorai_node_mem_prediction.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: ProphetStor
  sales_email: support@prophetstor.com
  support_email: support@prophetstor.com
categories:
- コンテナ
- kubernetes
- ai/ml
- オーケストレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/federatorai/README.md
display_on_public_website: true
draft: false
git_integration_title: federatorai
integration_id: federatorai
integration_title: Federator.ai
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: federatorai
public_title: Federator.ai
short_description: ProphetStor Federator.ai とのインテグレーションでアプリケーションのパフォーマンスを最適化します
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::AI/ML
  - Category::Orchestration
  - Supported OS::Linux
  configuration: README.md#Setup
  description: ProphetStor Federator.ai とのインテグレーションでアプリケーションのパフォーマンスを最適化します
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Federator.ai
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要


[ProphetStor Federator.ai][1] は、Kubernetes と仮想マシン (VM) クラスターの計算リソース管理を強化するために設計された AI ベースのソリューションです。IT 運用の全体的な可観測性、特にマルチテナントの大規模言語モデル (LLM) のトレーニングを含むことで、ミッションクリティカルなアプリケーションのリソース、ネームスペース、ノード、クラスターを効率的に割り当て、最小限のリソース消費で KPI を効果的に達成できます。

高度な機械学習アルゴリズムを使用して、アプリケーションのワークロードを予測します。Federator.ai の主な機能は次の通りです。
* Kubernetes クラスター内のコンテナ化されたアプリケーション、ならびに VMware クラスター、Amazon Web Services (AWS) Elastic Compute Cloud (EC2)、Azure Virtual Machine、Google Compute Engine 内の VM における AI ベースのワークロード予測
* ワークロード予測、アプリケーション、Kubernetes などの関連するメトリクスに基づくリソースの提案
* 一般的な Kubernetes アプリケーションのコントローラー / ネームスペース向け CPU / メモリーの自動プロビジョニング
* Kubernetes アプリケーションコンテナ、Kafka Consumer Group、NGINX Ingress アップストリームサービスのオートスケーリング
* Kubernetes クラスターと VM クラスターのワークロード予測に基づくマルチクラウドコスト分析と推奨
* クラスター、Kubernetes アプリケーション、VM、Kubernetes ネームスペースの提案に基づく実際のコストと潜在的な節約
* パフォーマンスの妥協なしに行えるマルチテナント LLM トレーニングの可観測性と実行可能なリソース最適化

[ProphetStor Federator.ai][1] は、Datadog Agent と統合された API を通じて、LLM トレーニングを含むアプリケーションレベルのワークロードからクラスターレベルのリソース消費までのフルスタックの可観測性を提供します。このインテグレーションにより、リアルタイムモニタリングと予測分析の間のダイナミックなループが促進され、リソース管理を継続的に改善し、コストを最適化し、アプリケーションの効率的な運用を保証します。Kubernetes のコンテナ、ネームスペース、クラスターノードのリソース使用状況を容易に追跡・予測し、コストがかかる過剰プロビジョニングやパフォーマンスに影響を与える過小プロビジョニングを防ぐための正しい推奨を行うことができます。CI/CD パイプラインへの簡単なインテグレーションにより、Federator.ai は Kubernetes クラスターにデプロイされた際のコンテナの継続的な最適化を可能にします。アプリケーションワークロードの予測を使用して、Federator.ai は適切なタイミングでアプリケーションコンテナを自動的にスケーリングし、Kubernetes HPA や [Datadog Watermark Pod Autoscaling (WPA)][2] を介して、適切な数のコンテナレプリカでパフォーマンスを最適化します。

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


**ProphetStor Federator.ai マルチクラウドコスト分析の概要**

![マルチクラウドコスト分析の概要][8]

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


## 計画と使用

* 以下の手順に従って、Federator.ai をダウンロードおよび設定してください。

### インフラストラクチャーリスト

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


### ブラウザトラブルシューティング

1. お使いのアカウントで Datadog にログインし、Datadog API を使用するための [API キーとアプリケーションキー][9]を取得します。

2. クラスターごとのメメトリクスデータソース用に Federator.ai を構成します。
    - Federator.ai GUI を起動 -> Configuration -> Clusters -> "Add Cluster" をクリックします
    - API キーとアプリケーションキーを入力します

    ![クラスターウィンドウを追加する][10] 

3. 詳細については、[Federator.ai - インストールおよびコンフィギュレーションガイド][11]および[ユーザーガイド][12]を参照してください。


## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "federatorai" >}}



### ヘルプ

Federator.ai には、サービスのチェック機能は含まれません。

### ヘルプ

Federator.ai には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Federator.ai - インストールおよびコンフィギュレーションガイド][11]をご覧いただくか、[Datadog サポート][14]までお問い合わせください。

[1]: https://prophetstor.com/federator_ai/
[2]: https://github.com/DataDog/watermarkpodautoscaler
[3]: https://youtu.be/AeSH8yGGA3Q
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