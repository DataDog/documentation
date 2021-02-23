---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ''
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/nvml/README.md'
display_name: nvml
draft: true
git_integration_title: nvml
guid: 5e997a76-f6a3-48e8-875f-6fbb2559f9e9
integration_id: nvml
integration_title: nvml
is_public: false
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: nvml.
metric_to_check: nvml.device_count
name: nvml
public_title: Datadog-nvml インテグレーション
short_description: k8s で nvidia GPU メトリクスをサポート
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [NVIDIA Management Library (NVML)][1] 公開メトリクスを監視し、[公開された Kubernetes デバイス][2]と関連付けることができます。

## セットアップ

このパッケージは [Datadog Agent][3] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストにチェックをインストールしてください。[バージョン 6.8 以前の Agent][5] または [Docker Agent][6] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][4]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][3]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-nvml==<INTEGRATION_VERSION>
   # You may also need to install dependencies since those aren't packaged into the wheel
   sudo -u dd-agent -H /opt/datadog-agent/embedded/bin/pip3 install grpcio pynvml
   ```

Docker を使用している場合、NVML リポジトリに Dockerfile の例があります。

   ```shell
   docker build --build-arg=DD_AGENT_VERSION=7.18.0 .
   ```

3. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

8. Docker と Kubernetes を使用している場合は、環境変数 `NVIDIA_VISIBLE_DEVICES` と `NVIDIA_DRIVER_CAPABILITIES` を公開する必要があります。例については、付属の Dockerfile を参照してください。

9. 予約済みの Kubernetes NVIDIA デバイスを、そのデバイスを使用する Kubernetes ポッドと関連付けることができるようにしたい場合は、Unix ドメインソケット `/var/lib/kubelet/pod-resources/kubelet.sock` を Agent のコンフィギュレーションにマウントします。
このソケットの詳細については、[Kubernetes のウェブサイト][2]を参照してください。このデバイスはバージョン 1.15 のベータサポートであることに注意してください。

### コンフィギュレーション

1. NVML のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `nvml.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル nvml.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `nvml` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "nvml" >}}
  信頼できるメトリクスのドキュメントは、[NVIDIA ウェブサイト][11]にあります。

可能な場合、メトリクス名を NVIDIA の [Data Center GPU Manager (DCGM) エクスポーター][14]と一致させる試みがあります。

### サービスのチェック

NVML には、サービスのチェック機能は含まれません。

### イベント

NVML には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[14]:https://github.com/NVIDIA/gpu-monitoring-tools/blob/master/exporters/prometheus-dcgm/dcgm-exporter/dcgm-exporter
[1]: https://pypi.org/project/pynvml/
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/#monitoring-device-plugin-resources
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[6]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[7]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/nvml/metadata.csv
[11]: https://docs.nvidia.com/deploy/nvml-api/group__nvmlDeviceQueries.html
[12]: https://docs.datadoghq.com/ja/help