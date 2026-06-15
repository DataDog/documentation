---
app_id: oci-media-streams
app_uuid: 69a676e9-750f-42bf-81a7-a1a2fdbf235d
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.mediastreams.egress_bytes
      - oci.mediastreams.request_count
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 42264479
    source_type_name: OCI Media Streams
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ネットワーク
- クラウド
- oracle
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_media_streams
integration_id: oci-media-streams
integration_title: OCI Media Streams
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_media_streams
public_title: OCI Media Streams
short_description: OCI Media Streams は、低遅延でリアルタイムのビデオストリーミングを可能にし、ライブおよびオンデマンドのコンテンツ配信をサポートします。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI Media Streams は、低遅延でリアルタイムのビデオストリーミングを可能にし、ライブおよびオンデマンドのコンテンツ配信をサポートします。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Media Streams
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

OCI Media Streams は、HTTP Live Streaming (HLS) などのフォーマットでデジタルビデオコンテンツを視聴者に配信できるフルマネージド型のサービスです。ライブストリーミングとオンデマンドストリーミングの両方をサポートし、コンテンツ配信ネットワークとのシームレスな統合によるスケーラブルな配信が可能です。 


このインテグレーションでは、 [oci_mediastreams][1] ネームスペースからメトリクスとタグを収集し、メディアストリーミングのパフォーマンスを監視できます。

## セットアップ

### インストール

Once you set up the [Oracle Cloud Infrastructure][2] integration, ensure that any namespaces mentioned above are included in your [Connector Hub][3].


## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_media_streams" >}}



### サービスチェック

OCI Media Streams にはサービスチェックは含まれません。

### イベント

OCI Media Streams にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.oracle.com/en-us/iaas/Content/dms-mediastream/mediastreams_metrics.htm?
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_media_streams/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/