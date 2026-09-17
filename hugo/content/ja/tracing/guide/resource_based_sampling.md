---
description: コスト最適化のために、特定のリソースやエンドポイントに基づいてトレースの取り込みを制御する、リソースベースのサンプリングの設定方法を学びます。
disable_toc: false
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: ドキュメント
  text: 取り込みのメカニズム
- link: /tracing/trace_pipeline/ingestion_controls
  tag: ドキュメント
  text: Ingestion Control ページ
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Architecture Center
  text: '分散型トレーシングの最適化: 予算内に収め、重要なトレースをキャプチャするためのベストプラクティス'
site_support_id: resource_based_sampling
title: リソースベースサンプリング
---
## 概要 {#overview}

Remote Configuration を使用すると、サービスを再デプロイすることなく、Datadog UI から [サービス名とリソース名ごとの取り込みサンプリングレート][7] を動的に設定できます。

## 要件 {#requirements}

- Datadog Agent [7.41.1][2] 以上。
- [Remote Configuration][3] が Agent で有効になっていること。
- `APM Remote Configuration Write`[権限][4]。これらの権限がない場合は、Datadog の管理者に依頼して、組織の設定から権限を更新してもらってください。

### トレーシングライブラリのバージョン {#tracing-library-version}

機能に必要な最小 SDK バージョンは次のとおりです。

言語  | 必要な最小バージョン
----------|--------------------------
Java      | [v1.34.0][5]
Go        | [v1.64.0][6]
Python    | [v.2.9.0][10]
Ruby      | [v2.4.0][11]
Node.js   | [v5.16.0][12]
PHP       | [v1.4.0][15]
.NET      | [v.2.53.2][13]
C++       | [v0.2.2][14]

## Ingestion Control ページでリソースごとのサンプリングレートを確認する {#see-sampling-rates-by-resource-in-the-ingestion-control-page}

リソースごとに構成されたサンプリングレートを確認するには、Ingestion Control の [[Service Ingestion summary][1]] (サービスの取り込み概要) に移動します。このテーブルは、サービスのリソースごとに適用されているサンプリングレートを一覧表示します。

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="リソース別のサンプリングレートテーブル" style="width:100%;">}}

- `Ingested bytes` 列は、サービスとリソースのスパンから取り込まれたバイト数を示します。`Downstream bytes` 列は、そのサービスとリソースを起点としてサンプリングの判断が行われたスパンから取り込まれたバイト数を示します (呼び出しチェーン内の下流サービスからのバイト数も含まれます)。
- `Configuration` 列は、リソースのサンプリングレートがどこから適用されているかを示します。
  - `Automatic`: [デフォルトのヘッドベースサンプリングメカニズム][8] が Agent から適用されている場合。
  - `Local Configured`: SDK で [サンプリングルール][7] がローカルに設定されている場合。
  - `Remote Configured`: Datadog UI からリモートサンプリングルールが設定されている場合。Ingestion Control ページからサンプリングルールを構成する方法については、[サンプリングルールのリモートでの構成](#remotely-configure-sampling-rules-for-the-service)のセクションを参照してください。

## サービスのサンプリングルールをリモートで構成する{#remotely-configure-sampling-rules-for-the-service}

リソース名ごとにサービスのサンプリングレートを構成するには、次のようにします。
1. [{{< ui >}}Manage Ingestion rate{{< /ui >}}] (取り込みレートを管理) をクリックします。Remote Configuration オプションが無効になっている場合は、リストされている[要件](#compatibility-requirements)がすべて満たされていることを確認してください。
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_modal.png" alt="構成モーダル" style="width:100%;">}}
1. [{{< ui >}}Add new rule{{< /ui >}}] (新しいルールを追加) をクリックして、一部のリソースのサンプリングレートを設定します。サンプリングルールは glob パターンによるマッチングを使用するため、ワイルドカード (`*`) を使用して複数のリソースに同時にマッチさせることができます。
1. [{{< ui >}}Apply{{< /ui >}}] (適用) をクリックして構成を保存します。

構成は 1 分以内に有効になります。構成の変更は [Live Search Explorer][9] で確認できます。

[{{< ui >}}Service Ingestion Summary{{< /ui >}}] (サービスの取り込み概要) では、サンプリングレートがリモートで適用されているリソースが、[{{< ui >}}Configuration{{< /ui >}}] (構成) 列に `Remote Configured` として表示されます。



## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.41.1
[3]: /ja/tracing/guide/remote_config/
[4]: /ja/account_management/rbac/permissions/
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.63.1
[7]: /ja/tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /ja/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /ja/tracing/trace_explorer/#live-search-for-15-minutes
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.4.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.53.2
[14]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2
[15]: https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0