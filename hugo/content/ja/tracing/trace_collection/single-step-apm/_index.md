---
aliases:
- /ja/tracing/trace_collection/admission_controller/
- /ja/tracing/trace_collection/library_injection_local/
- /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: ドキュメント
  text: ランタイムメトリクスを有効にする
- link: /tracing/guide/injectors
  tag: ドキュメント
  text: シングルステップインスツルメンテーションによるインジェクターの動作について
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting/
  tag: ドキュメント
  text: シングルステップ APM のトラブルシューティング
- link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
  tag: ラーニングセンター
  text: ホスト上の APM インスツルメンテーションのトラブルシューティング
- link: /tracing/guide/local_sdk_injection
  tag: ドキュメント
  text: ローカル SDK 注入を使用してアプリケーションをインスツルメントする
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: ブログ
  text: Datadog の CSI ドライバーにより、高パフォーマンスの監視可能性を提供して Kubernetes 環境のセキュリティを確保する
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: ブログ
  text: 1 つのコマンドで、Java アプリケーションのエンドツーエンドの可視性を有効化
title: シングルステップ APM インスツルメンテーション
---
## 概要 {#overview}

シングルステップインスツルメンテーション (SSI) は、追加の構成を必要とせずに Datadog SDK を自動的にインストールして、オンボーディング時間を数日から数分に短縮します。

その仕組みの詳細については、[シングルステップインスツルメンテーションのインジェクターガイド][8]を参照してください。

## 前提条件 {#prerequisites}

1. アプリケーションからカスタムインスツルメンテーションコードを削除し、アプリケーションを再起動します。SSI は、カスタムインスツルメンテーションが検出されると自動的に無効になります。
1. サポートされている言語、オペレーティングシステム、およびアーキテクチャを [SSI 互換性ガイド][18]で調べて、環境の互換性を確認します。

## アプリケーション全体で SDK をインスツルメントする {#instrument-sdks-across-applications}

**APM インスツルメンテーション**を有効にして [Datadog Agent をインストールまたは更新する][1]と、Agent は、サポートされているプロセスに Datadog SDK を読み込んでアプリケーションをインスツルメントします。これにより、コードの変更を必要とせずに、サービスからトレースデータがキャプチャされて送信され、分散型トレーシングが実現されます。

インスツルメンテーション後に必要に応じて以下の操作を行うことも可能です。
- [統合サービスタグ (UST) を構成する][14]
- SDK に依存するその他の製品や機能を有効にする (Continuous Profiler、アプリケーションセキュリティモニタリングなど)

以下のタイルのいずれかをクリックして、目的のデプロイメントタイプに対応する SSI の設定方法を確認してください。

{{< card-grid card_width="170px" image_width="200" >}}
  {{< image-card href="linux/" src="integrations_logos/linux.png" alt="linux" >}}
  {{< image-card href="docker/" src="integrations_logos/docker.png" alt="docker" >}}
  {{< image-card href="kubernetes/" src="integrations_logos/kubernetes.png" alt="kubernetes" >}}
  {{< image-card href="windows/" src="integrations_logos/windows.png" alt="windows" >}}
{{< /card-grid >}}

<br>

## トラブルシューティング {#troubleshooting}

SSI で APM を有効にする際に問題が発生した場合は、[SSI トラブルシューティングガイド][15]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/tracing/metrics/runtime_metrics/
[3]: /ja/internal_developer_portal/catalog/
[4]: /ja/tracing/glossary/#instrumentation
[5]: /ja/containers/cluster_agent/admission_controller/
[6]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility
[7]: /ja/tracing/trace_collection/custom_instrumentation/
[8]: /ja/tracing/guide/injectors
[9]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=installingwithdatadogoperator#configure-instrumentation-for-namespaces-and-pods
[10]: /ja/tracing/trace_collection/library_config/
[11]: /ja/tracing/metrics/runtime_metrics/
[12]: /ja/internal_developer_portal/catalog/
[13]: /ja/tracing/glossary/#instrumentation
[14]: /ja/getting_started/tagging/unified_service_tagging
[15]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[16]: /ja/tracing/trace_collection/custom_instrumentation/
[17]: /ja/tracing/trace_collection/library_config/application_monitoring_yaml/
[18]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/