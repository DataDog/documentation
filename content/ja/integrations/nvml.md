---
app_id: nvml
app_uuid: 2c7a8b1e-9343-4b4a-bada-5091e37c4806
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: nvml.device_count
      metadata_path: metadata.csv
      prefix: nvml.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: nvml
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os system
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nvml/README.md
display_on_public_website: true
draft: false
git_integration_title: nvml
integration_id: nvml
integration_title: Nvidia NVML
integration_version: 1.0.5
is_public: true
kind: integration
manifest_version: 2.0.0
name: nvml
oauth: {}
public_title: Nvidia NVML
short_description: k8s で Nvidia GPU メトリクスをサポート
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::OS System
  configuration: README.md#Setup
  description: k8s で Nvidia GPU メトリクスをサポート
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nvidia NVML
---



## 概要

このチェックは、Datadog Agent を通じて [NVIDIA Management Library (NVML)][1] 公開メトリクスを監視し、[公開された Kubernetes デバイス][2]と関連付けることができます。

## セットアップ

NVML チェックは [Datadog Agent][3] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い NVML チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][4]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-nvml==<INTEGRATION_VERSION>
   # You may also need to install dependencies since those aren't packaged into the wheel
   sudo -u dd-agent -H /opt/datadog-agent/embedded/bin/pip3 install grpcio pynvml
   ```

2. コアの[インテグレーション][5]と同様にインテグレーションを構成します。

Docker を使用している場合、NVML リポジトリに [Dockerfile の例][6]があります。

   ```shell
   docker build --build-arg=DD_AGENT_VERSION=7.18.0 .
   ```

Docker と Kubernetes を使用している場合は、環境変数 `NVIDIA_VISIBLE_DEVICES` と `NVIDIA_DRIVER_CAPABILITIES` を公開する必要があります。例については、付属の Dockerfile を参照してください。

予約済みの Kubernetes NVIDIA デバイスを、そのデバイスを使用する Kubernetes ポッドと関連付けるには、Unix ドメインソケット `/var/lib/kubelet/pod-resources/kubelet.sock` を Agent のコンフィギュレーションにマウントします。このソケットの詳細については、[Kubernetes のウェブサイト][2]を参照してください。このデバイスはバージョン 1.15 のベータサポートであることに注意してください。

### コンフィギュレーション

1. NVML のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `nvml.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル nvml.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `nvml` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "nvml" >}}
  信頼できるメトリクスのドキュメントは、[NVIDIA ウェブサイト][11]にあります。

可能な場合、メトリクス名を NVIDIA の [Data Center GPU Manager (DCGM) エクスポーター][14]と一致させる試みがあります。

### イベント

NVML には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "nvml" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。


[14]:https://github.com/NVIDIA/gpu-monitoring-tools/blob/master/exporters/prometheus-dcgm/dcgm-exporter/dcgm-exporter
[1]: https://pypi.org/project/pynvml/
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/#monitoring-device-plugin-resources
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/nvml/tests/Dockerfile
[7]: https://github.com/DataDog/integrations-extras/blob/master/nvml/datadog_checks/nvml/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/nvml/metadata.csv
[11]: https://docs.nvidia.com/deploy/nvml-api/group__nvmlDeviceQueries.html
[12]: https://github.com/DataDog/integrations-extras/blob/master/nvml/assets/service_checks.json
[13]: https://docs.datadoghq.com/ja/help