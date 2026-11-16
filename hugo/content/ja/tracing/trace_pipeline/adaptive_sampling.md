---
aliases:
- /ja/tracing/guide/adaptive_sampling
description: サービスエンドポイントの可視性を維持しながら、特定の予算に合わせてサンプリングレートを自動的に調整します。
disable_toc: false
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: ドキュメント
  text: 取り込みのメカニズム
- link: /tracing/trace_pipeline/ingestion_controls
  tag: ドキュメント
  text: 取り込みのコントロール
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Architecture Center
  text: '分散型トレーシングの最適化: 予算内に収め、重要なトレースをキャプチャするためのベストプラクティス'
site_support_id: adaptive_sampling
title: アダプティブサンプリング
---
## 概要 {#overview}

Datadog **アダプティブサンプリング**では、特定の予算 (取り込まれるギガバイト数) に近い状態を維持しながら、より関連性の高いトレースをキャプチャできるようになります。

サンプリング戦略としてアダプティブサンプリングを選択する場合は、1 つまたは複数のサービスのトレース取り込みに対する月間ターゲット量を設定します。これにより、これらのサービスの消費量が月末にターゲット量と一致し、同時にエンドポイントの可視性も維持されます。

アダプティブサンプリングは、[リモート構成][3] と既存の [サンプリングルール][7] メカニズムを使用して、環境、サービス、リソースの組み合わせごとにサンプリングレートを動的に調整します。これにより、以下のことが可能になります。
- 指定した月間予算に合わせる。
- サービス、リソース、環境の組み合わせごとに、少なくとも 5 分に 1 回のトレースを取得して、トラフィックの少ないサービスやエンドポイントの可視性を確保する。

サービスでアダプティブサンプリングを使用するように構成するには、以下の手順に従います。

## 要件 {#requirements}

- Datadog Agent [7.53.0][2] 以上。
- [Remote Configuration][3] が Agent で有効になっていること
- `APM Remote Configuration Write`[権限][4]。 
   **注**: この権限がない場合は、Datadog の管理者に組織の設定から権限を更新してもらうよう依頼してください。

### トレーシングライブラリのバージョン {#tracing-library-versions}

次の表に、アダプティブサンプリングに必要な最小 SDK バージョンを示します。

| 言語    | 必要な最小バージョン |
|-------------|--------------------------|
| Java        | [v1.34.0][5]             |
| Go          | [v1.68.0][6]             |
| Python      | [v3.14.2][10]             |
| Ruby        | [v2.0.0][11]             |
| Node.js     | [v5.16.0][12]            |
| .NET        | [v2.54.0][13]            |
| C++/Proxies | [v0.2.2][14]             |
| PHP         | [v1.4.0][17]             |
| Rust        | [v0.4.0][20]             |

## 制限事項 {#limitations}

サンプリング構成に応じて、サービスと環境の組み合わせに制限が適用されます。

#### アダプティブサンプリング {#adaptive-sampling}

- アダプティブサンプリングにオンボードされる `service/env` の組み合わせの最大数は 800 です。
- アダプティブサンプリング用に構成された一意の `service/env` ペアは、この制限の対象としてカウントされます。

#### リモートサンプリング構成 {#remote-sampling-configuration}

- リモートサンプリング構成を使用する `service/env` の組み合わせの最大数は **1000** です。
- この制限は、各サービスに対して定義されているサンプリングルールの数に関係なく適用されます。
- 一意の `service/env` ペアは、リモートサンプリングが有効になっている場合、この制限に対して 1 回としてカウントされます。

#### アダプティブサンプリングとリモートサンプリングの両方を使用するサービス {#services-using-both-adaptive-and-remote-sampling}

- `service/env` の組み合わせがアダプティブサンプリングとリモートサンプリング構成の両方を使用する場合、それぞれの制限に対して 1 回としてカウントされます (アダプティブサンプリングの 800 の制限に対して 1 回、リモートサンプリングの 1000 の制限に対して 1 回)。
- いずれかの制限内で 2 回カウントされることは**ありません**。

## アダプティブサンプリングターゲットの構成 {#configure-the-adaptive-sampling-target}

アダプティブサンプリングを開始するには、まずターゲット戦略の設定を選択する必要があります。

- {{< ui >}}Set Budget by Number of APM Hosts{{< /ui >}} (APM 数で予算を設定): 割り当てとオンボードされたサービス数に比例した予算を構成します (例: APM ホスト数に基づく)。
- {{< ui >}}Set Budget by Data Volume{{< /ui >}} (データ量で予算を設定): ギガバイト/月単位で固定ターゲットを構成します。


|          | APM ホスト数に基づく予算                                                                                                              | データ量に基づく予算                                                                 |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| **メリット** | APM ホストの数およびオンボードされたサービスの数に応じてスケールします。一度設定するだけで済みます。                                                 | 予算を超過しないことが保証されます。                                                      |
| **デメリット** | Datadog に APM データを報告するホストの数に応じて変動する可能性があるため、特定のデータ量以下に抑えたい場合には適していません。| 新しいサービスをアダプティブサンプリングにオンボードするたびに予算を編集する必要があります。|

アダプティブサンプリングの月間ターゲットを設定するには、次のようにします。
1. [Ingestion Control][18] ページに移動します。
2. [{{< ui >}}Manage Adaptive Sampling Target{{< /ui >}}] (アダプティブサンプリングターゲットを管理) をクリックします。
  {{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_target_cta.png" alt="アダプティブサンプリングターゲットを設定するためのアクションの呼び出し" style="width:100%;">}}
3. サンプリングのターゲット戦略を選択します。
   - [APM ホスト数で予算を設定する](#set-budget-by-number-of-apm-hosts-recommended)
   - [データ量で予算を設定する](#set-budget-by-data-volume)
4. [{{< ui >}}Apply{{< /ui >}}] (適用) をクリックします。

### APM ホスト数で予算を設定する (推奨) {#set-budget-by-number-of-apm-hosts-recommended}

{{< img src="/tracing/guide/adaptive_sampling/percentage_based_target_setting.png" alt="パーセンテージに基づくターゲット設定" style="width:100%;">}}

月間ターゲットを割り当てのパーセンテージに設定します。ページの下部には、そのパーセンテージから月間ターゲット量への換算に関する詳細な説明があります。これは以下の積です。

- {{< ui >}}global allotment{{< /ui >}} (グローバル割り当て): `150GB * number_of_APM_hosts + 50GB * number_of_traced_serverless_invocations (if applicable) + 10GB * number_of_fargate_tasks (if applicable)`
- 上記で構成された {{< ui >}}percentage of allotment{{< /ui >}} (割り当てのパーセンテージ)
- 割り当てに対する {{< ui >}}contribution of onboarded services{{< /ui >}} (オンボードサービスの寄与度)。たとえば、アダプティブサンプリングにオンボードされたサービスが、総取り込み量の 10% を占める場合、Datadog はグローバル割り当て量の 10% をターゲットにします。この数値は、オンボードされたサービスの数に応じて増加します。

{{< img src="/tracing/guide/adaptive_sampling/percentage_based_target_computation.png" alt="パーセンテージに基づくターゲットの計算" style="width:100%;">}}

その月間ターゲット量は 30 分ごとに再計算されます。

### データ量で予算を設定する {#set-budget-by-data-volume}

{{< img src="/tracing/guide/adaptive_sampling/volume_based_target_setting.png" alt="量に基づくターゲット設定" style="width:100%;">}}

アダプティブサンプリングに最初のサービスを構成する場合は、取り込み量のターゲットが `>0` であることを確認してください。後続のサービスについては、新しいサービスがオンボードされた後、新しい量を考慮して割り当てられた予算を増やす必要があります。 
  <div class="alert alert-info">構成された予算は、アダプティブサンプリングに登録されたサービスにのみ割り当てられます。これには、アダプティブサンプリングに登録されていないサービス、ローカルサンプリングルール、または Agent や SDK でローカルに構成されたその他の<a href="/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent">サンプリングメカニズム</a>からの取り込み量は含まれません。</div>

## サービスのアダプティブサンプリングの構成 {#configure-adaptive-sampling-for-a-service}

### サービスのリソースごとのサンプリングレートの表示 {#view-sampling-rates-by-resource-for-a-service}

サービスのアダプティブサンプリングを構成する前に、そのサービスの現在の取り込み構成を表示できます。

構成されているサンプリングレートを確認するには、次のようにします。

1. [Ingestion Control][18] ページに移動します。
2. サービスをクリックして [{{< ui >}}Service Ingestion Summary{{< /ui >}}] (サービス取り込みの概要) を表示します。
3. サービスのリソース別に適用されたサンプリングレートを一覧表示するテーブルを確認します。

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="リソース別のサンプリングレートテーブル" style="width:100%;">}}

このテーブルには以下が含まれます。
- {{< ui >}}Ingested bytes{{< /ui >}}: サービスとリソースのスパンから取り込まれたバイト数。
- {{< ui >}}Downstream bytes{{< /ui >}}: ダウンストリームサービスを含め、そのサービスとリソースからサンプリングの決定が開始されたスパンから取り込まれたバイト数。
- {{< ui >}}Configuration{{< /ui >}}: リソースサンプリングレートのソース:
  - `AUTOMATIC`: Agent からの [デフォルトのヘッドベースサンプリングメカニズム][8]。
  - `CONFIGURED LOCAL`: SDK 内でローカルに設定された [サンプリングルール][7]。
  - `CONFIGURED REMOTE`: Datadog UI から設定されたリモートサンプリングルール。
  - `ADAPTIVE REMOTE`: Datadog によって設定されたアダプティブサンプリングルール。

サービスがアダプティブサンプリングにオンボードされると、サンプリングレートは 10 分ごとに調整および再計算されます。

### アダプティブサンプリングへのサービスのオンボード {#onboard-a-service-to-adaptive-sampling}

サービスをアダプティブサンプリングにオンボードするには、次のようにします。

1. [Ingestion Control][18] ページに移動します。
2. サービスをクリックして [{{< ui >}}Service Ingestion Summary{{< /ui >}}] (サービス取り込みの概要) を表示します。
3. [{{< ui >}}Manage Ingestion Rate{{< /ui >}}] (取り込みレートを管理) をクリックします。
4. サービスのサンプリング戦略として [{{< ui >}}Datadog adaptive sampling rates{{< /ui >}}] (Datadog アダプティブサンプリング) を選択します。
5. (オプション) 特定のリソースに対して明示的な [サンプリングレート][15] を構成します。これにより、より多くのデータ (例: `GET /checkout` エンドポイントの 100%) またはより少ないデータ (例: `/health` リクエストの 0.1%) をキャプチャできます。
6. [{{< ui >}}Apply{{< /ui >}}] (適用) をクリックします。

<div class="alert alert-info">この構成を<strong>リモート</strong>で適用することが無効になっている場合は、<a href="#requirements">Remote Configuration の要件</a> が満たされていることを確認してください。</div>

{{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_setting_modal.png" alt="アダプティブサンプリング設定モーダル" style="width:70%;">}}

構成は 5～6 分で有効になります。これは、Datadog がサービスのトラフィックパターンを観測し、計算を行い、サンプリングレートを適用するまでにかかる時間です。リモートで構成されたリソースは、[{{< ui >}}Configuration{{< /ui >}}] (構成) 列に [`Configured Remote`] (構成済みのリモート) として表示されます。

## 権限{#permissions}

デフォルトでは、`Datadog Admin` ロールを持つユーザーのみが、アダプティブサンプリング構成の変更やアダプティブサンプリングへのサービスのオンボードを行うことができます。

オーガニゼーションでカスタムロールを使用している場合は、`APM Remote Configuration Write` および `APM Service Ingest Write` [権限][4] を含むカスタムロールをユーザーに割り当ててください。

### アクセス制限 {#restrict-access}
[きめ細かなアクセス制御][19] を使用して、サービスのアダプティブサンプリング構成を変更できるユーザーを管理します。ロール、チーム、または個々のユーザーに基づいてアクセスを制限できます。

{{< img src="/tracing/guide/adaptive_sampling/add_restriction.png" alt="アクセス制限モーダル" style="width:60%;">}}

アクセスを制限するには、次のようにします。

{{< img src="/tracing/guide/adaptive_sampling/restrict_service_ingestion_permissions.png" alt="きめ細かなアクセス制御モーダルを開きます。" style="width:100%;">}}

**注**: `remote_config_write` 権限を持つユーザーのみが、個々のサービスのアダプティブサンプリング構成へのアクセスを制限できます。

1. サービスの Ingestion Control サイドパネルで [{{< ui >}}Permissions{{< /ui >}}] (権限) セクションを開きます。

2. [{{< ui >}}Restrict access{{< /ui >}}] (アクセスを制限) をクリックします。

3. アクセス権を付与するチーム、ロール、またはユーザーを選択します。

4. [{{< ui >}}Add{{< /ui >}}] (追加) をクリックします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.53.0
[3]: /ja/agent/remote_config
[4]: /ja/account_management/rbac/permissions/
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.68.0
[7]: /ja/tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /ja/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /ja/tracing/trace_explorer/#live-search-for-15-minutes
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v3.14.2
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.54.0
[14]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2
[15]: /ja/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rates-by-resource
[16]: /ja/tracing/trace_pipeline/ingestion_controls
[17]: https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0
[18]: https://app.datadoghq.com/apm/traces/ingestion-control
[19]: /ja/account_management/rbac/granular_access/
[20]: https://github.com/DataDog/dd-trace-rs/releases/tag/datadog-opentelemetry-v0.4.0