---
aliases:
- /ja/metrics/guide/agent-filtering-for-dogstatsd-custom-metrics/
description: Datadog Agent で未使用のカスタムメトリクスをフィルタリングして、インジェストおよびインデックス化されるメトリクスボリュームを減らします。
further_reading:
- link: /metrics/custom_metrics/
  tag: ドキュメント
  text: Custom Metrics について
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: ドキュメント
  text: Custom Metrics の課金
- link: /metrics/metrics-without-limits/
  tag: ドキュメント
  text: Metrics without Limits™
- link: /metrics/volume/
  tag: ドキュメント
  text: メトリクスボリューム管理
- link: https://www.datadoghq.com/blog/custom-metrics-governance/
  tag: ブログ
  text: エンドツーエンドのカスタムメトリクスガバナンスに関するベストプラクティス
title: Custom Metrics の Agent 側フィルタリング
---
{{< callout url="https://www.datadoghq.com/product-preview/agent-side-filtering-for-custom/" >}} Custom Metrics の Agent 側フィルタリングはプレビュー版です。この機能に関心がある場合は、こちらのフォームに記入してください。{{< /callout >}}

## 概要 {#overview}

Agent 側フィルタリングを使用すると、Datadog に送信する前に Datadog Agent で未使用または不要なカスタムメトリクスを (DogStatsD および Agent インテグレーションの両方から) 直接フィルタリングできます。これにより、インデックス化およびインジェストされるカスタムメトリクスボリュームを大幅に減らせます。

フィルタリングは Agent レベルで実行されますが、Datadog UI を通じて一元管理されるため、チームは完全な可視性と制御を維持できます。Datadog でフィルタリングポリシーを作成、更新、管理できるため、透明性を維持しながらメトリクスガバナンスを効率化できます。

フィルタリングポリシーの作成と更新には、[`metric_tags_write`][1] RBAC 権限が必要です。すべてのユーザーがフィルタリングポリシーを表示できます。

## 前提条件 {#prerequisites}

- Datadog Agent v7.67.0 以降にアップグレードします。
    - DogStatsD メトリクスをフィルタリングするには、v7.70.0 以降の使用が推奨されます。
    - Agent Integration メトリクスには、v7.74.0 以降の使用が必要です。
- [`org_management`][2] 権限を使用して、組織の [Remote Configuration][3] を有効にします。
- [`api_keys_write`][4] 権限を使用して、Agents が使用する [API キーの Remote Configuration 機能][5] を有効にします。API キーで Remote Configuration を有効にした後、変更を反映させるために Agents を再起動します。

{{<img src="agent/remote_config/RC_Key_updated.png" alt="API キープロパティと Remote Configuration 機能の Enable ボタン。" width="90%" style="center">}}

## メトリクスフィルタリングポリシーを作成する {#create-a-metric-filtering-policy}

メトリクスフィルタリングポリシーは、[Metrics Settings ページ][7] または [Metrics Summary ページ][6] から作成できます。

メトリクスフィルタリングポリシーは、Remote Configuration が有効になっているすべての Agents v7.67.0 以降 (Agent Integration メトリクスの場合は v7.74.0 以降) に適用されます。古い Agent バージョン、または Remote Configuration が無効になっている Agents には、フィルタリングポリシーは適用されません。

ポリシーの更新は 1 ～ 2 分で Agents にデプロイされます。

### Metrics Settings ページから {#from-the-metrics-settings-page}

1. {{< ui >}}\+ Create Policy{{< /ui >}} をクリックします。
2. {{< ui >}}Filter metrics{{< /ui >}} をクリックします。
3. 新しいポリシーの説明を入力します。
4. {{< ui >}}Metrics to Filter{{< /ui >}} ドロップダウンからフィルタリングするメトリクスを選択するか、{{< ui >}}Upload CSV{{< /ui >}} をクリックします。
   - CSV をアップロードする場合は、ファイルを選択して {{< ui >}}Open{{< /ui >}} をクリックします。複数の CSV を使用してポリシーを作成できます。
5. フィルタリングするメトリクスのリストに問題がなければ、{{< ui >}}Save and Filter{{< /ui >}} をクリックします。

### Metrics Summary ページから {#from-the-metrics-summary-page}

以下のいずれかの方法を使用して、Metrics Summary ページからメトリクスフィルタリングポリシーを作成します。

{{< tabs >}}
{{% tab "メトリクスクエリから" %}}

1. 検索バーにメトリクスクエリを入力します。
2. 画面の右側にある 3 つの垂直ドットボタンをクリックします。
3. {{< ui >}}Filter metrics{{< /ui >}} をクリックします。
4. {{< ui >}}Choose policy{{< /ui >}} ドロップダウンで {{< ui >}}New Policy{{< /ui >}} をクリックします。ポリシーの説明を入力します。
5. {{< ui >}}Metrics to Filter{{< /ui >}} を確認します。リストからメトリクスを削除するには行の右側にある `X` をクリックし、リストにメトリクスを追加するには {{< ui >}}\+ Include More Metrics{{< /ui >}} をクリックします。
6. {{< ui >}}Save and Filter{{< /ui >}} をクリックします。

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_from_metric_query.mp4" alt="メトリクスクエリからメトリクスフィルタリングポリシーを作成する" video="true" >}}

{{% /tab %}}
{{% tab "ポリシーエディターから" %}}

1. 画面の右側にある 3 つの垂直ドットボタンをクリックします。
2. {{< ui >}}Filter metrics{{< /ui >}} をクリックします。
3. {{< ui >}}Choose policy{{< /ui >}} ドロップダウンで {{< ui >}}New Policy{{< /ui >}} をクリックします。ポリシーの説明を入力します。
4. {{< ui >}}Metrics to Filter{{< /ui >}} フィールドにメトリクスクエリを入力するか、ドロップダウンからメトリクスを個別に選択します。リストからメトリクスを削除するには、行の右側にある `X` をクリックします。
5. {{< ui >}}Save and Filter{{< /ui >}} をクリックします。

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_with_policy_editor.mp4" alt="ポリシーエディターからメトリクスフィルタリングポリシーを作成する" video="true" >}}

{{% /tab %}}
{{% tab "CSV アップロードから" %}}

1. 画面の右側にある 3 つの垂直ドットボタンをクリックします。
2. {{< ui >}}Filter metrics{{< /ui >}} をクリックします。
3. {{< ui >}}Choose policy{{< /ui >}} ドロップダウンで {{< ui >}}New Policy{{< /ui >}} をクリックします。ポリシーの説明を入力します。
4. {{< ui >}}Metrics to Filter{{< /ui >}} フィールドの右側で {{< ui >}}Upload CSV{{< /ui >}} をクリックします。
5. CSV ファイルを選択し、{{< ui >}}Open{{< /ui >}} をクリックします。
6. リストされたメトリクスを確認します。リストからメトリクスを削除するには、行の右側にある `X` をクリックします。必要に応じて、追加の CSV ファイルをアップロードするか、{{< ui >}}Metrics to Filter{{< /ui >}} フィールドからメトリクスを追加します。
7. {{< ui >}}Save and Filter{{< /ui >}} をクリックします。

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_with_csv_upload.mp4" alt="CSV ファイルアップロードを使用してメトリクスフィルタリングポリシーを作成する" video="true" >}}

{{% /tab %}}
{{< /tabs >}}

## メトリクスフィルタリングポリシーを編集する {#edit-a-metric-filtering-policy}

メトリクスフィルタリングポリシーは、[Metrics Settings ページ][1] または [Metrics Summary ページ][2] から編集できます。

### Metrics Settings ページから {#from-the-metrics-settings-page-1}

1. 編集するポリシーをクリックします。
2. {{< ui >}}Edit{{< /ui >}} をクリックします。
3. {{< ui >}}Metrics to Filter{{< /ui >}} ドロップダウンからフィルタリングするメトリクスを選択するか、{{< ui >}}Upload CSV{{< /ui >}} をクリックします。
   - CSV をアップロードする場合は、ファイルを選択して {{< ui >}}Open{{< /ui >}} をクリックします。
4. {{< ui >}}Save and Filter{{< /ui >}} をクリックします。

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/edit_policy_from_metrics_settings.mp4" alt="Metrics Settings ページからメトリクスフィルタリングポリシーを編集する" video="true" >}}

### Metrics Summary ページから {#from-the-metrics-summary-page-1}

以下のいずれかの方法を使用して、Metrics Summary ページからメトリクスフィルタリングポリシーを編集します。

{{< tabs >}}
{{% tab "メトリクスクエリから" %}}

1. 検索バーにメトリクスクエリを入力します。
2. 画面の右側にある 3 つの垂直ドットボタンをクリックします。
3. {{< ui >}}Filter metrics{{< /ui >}} をクリックします。
4. {{< ui >}}Choose policy{{< /ui >}} ドロップダウンで、編集するポリシーを選択します。
5. {{< ui >}}Metrics to Filter{{< /ui >}} および {{< ui >}}Existing metrics in policy{{< /ui >}} のリストを確認します。リストからメトリクスを削除するには行の右側にある `X` をクリックし、リストにメトリクスを追加するには {{< ui >}}\+ Include More Metrics{{< /ui >}} をクリックします。
6. {{< ui >}}Save and Filter{{< /ui >}} をクリックします。

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/edit_policy_with_metric_query.mp4" alt="メトリクスクエリを使用してメトリクスフィルタリングポリシーを編集する" video="true" >}}

{{% /tab %}}
{{% tab "ポリシーエディターから" %}}

1. 画面の右側にある 3 つの垂直ドットボタンをクリックします。
2. {{< ui >}}Filter metrics{{< /ui >}} をクリックします。
3. {{< ui >}}Choose policy{{< /ui >}} ドロップダウンで、編集するポリシーを選択します。
4. {{< ui >}}Metrics to Filter{{< /ui >}} ドロップダウンからメトリクスを個別に選択します。リストからメトリクスを削除するには、行の右側にある `X` をクリックします。
5. {{< ui >}}Save and Filter{{< /ui >}} をクリックします。

{{% /tab %}}
{{% tab "CSV アップロードから" %}}

1. 画面の右側にある 3 つの垂直ドットボタンをクリックします。
2. {{< ui >}}Filter metrics{{< /ui >}} をクリックします。
3. {{< ui >}}Choose policy{{< /ui >}} ドロップダウンで、編集するポリシーを選択します。
4. {{< ui >}}Upload CSV{{< /ui >}} フィールドの右側で {{< ui >}}Metrics to Filter{{< /ui >}} をクリックします。
5. CSV ファイルを選択し、{{< ui >}}Open{{< /ui >}} をクリックします。
6. {{< ui >}}Metrics to Filter{{< /ui >}} および {{< ui >}}Existing metrics in policy{{< /ui >}} のリストを確認します。リストからメトリクスを削除するには行の右側にある `X` をクリックし、リストにメトリクスを追加するには {{< ui >}}\+ Include More Metrics{{< /ui >}} をクリックします。
7. {{< ui >}}Save and Filter{{< /ui >}} をクリックします。

{{% /tab %}}
{{< /tabs >}}

## すべてのポリシーとフィルタリングされたメトリクスを表示する {#view-all-policies-and-filtered-metrics}

[Metrics Settings ページ][1] から、すべてのポリシーとフィルタリングされたメトリクスを表示することができます。

[設定ボタン][1] をクリックします。

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/settings_from_summary.png" alt="メトリクスサマリーページの設定ボタン" style="width:100%;" >}}

ナビゲーションバーの {{< ui >}}Metrics{{< /ui >}} をクリックして、設定に直接移動します。

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/settings_from_nav.png" alt="Datadog の展開されたメトリクスパネルの設定オプション" style="width:100%;" >}}

### すべてのポリシーを表示する {#view-all-policies}

サイドバーから {{< ui >}}Policies{{< /ui >}} タブを選択して、すべてのポリシーのリストを表示します。サイドバーが表示されない場合は、{{< ui >}}Show Sidebar{{< /ui >}} ボタンをクリックしてください {{< img src="metrics/guide/agent_filtering_for_custom_metrics/show_sidebar.png" inline="true" width="22" >}}。

任意のメトリクスフィルタリングポリシーをクリックして詳細ビューを開き、編集または削除を行います。

### フィルタリングされたすべてのメトリクスを表示する {#view-all-filtered-metrics}

サイドバーから {{< ui >}}Filtered Metrics{{< /ui >}} タブを選択して、フィルタリング済みのすべてのリストを表示します。サイドバーが表示されない場合は、{{< ui >}}Show Sidebar{{< /ui >}} ボタンをクリックしてください {{< img src="metrics/guide/agent_filtering_for_custom_metrics/show_sidebar.png" inline="true" width="22" >}}。

{{< ui >}}ATTACHED POLICIES{{< /ui >}} 列にあるフィルタリングされたメトリクスに紐付いたポリシーをクリックして、編集または削除を行います。

## ポリシーを削除する {#delete-policies}

[Metrics Settings ページ][1] からメトリクスフィルタリングポリシーを削除できます。

1. 削除するメトリクスフィルタリングポリシーをクリックします。
2. ページ右上隅の {{< ui >}}Delete{{< /ui >}} を選択します。

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/delete_policy.png" alt="メトリクスフィルタリングポリシー詳細ビューのポリシー削除ボタン" style="width:100%;" >}}

## API を使用してメトリクスフィルタリングポリシーを管理する {#manage-metric-filtering-policies-through-the-api}

<div class="alert alert-danger">これらのエンドポイントは、カスタムメトリクスの Agent 側フィルタリングがプレビュー版である間に変更される可能性があります。</div>

これらのエンドポイントには、有効な Datadog API キーとアプリケーションキーが必要です。詳細については、API リファレンスの [はじめに][8] を参照してください。

### フィルタリングされたメトリクスポリシーを作成する {#create-a-filtered-metric-policy}

選択した [Datadog サイト][9] のベース URL は次のとおりです。{{<region-param key="dd_api" code="true">}}

以下の例の `<BASE_URL>` をベース URL に置き換えます。

**POST** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies`

#### 本文の例 {#example-body}

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metric_names": [
        "metric.name.one",
        "metric.name.two"
      ]
    }
  }
}
{{< /code-block >}}

### フィルタリングされたメトリクスポリシーを更新する (部分更新) {#update-a-filtered-metric-policy-partial-update}

選択した [Datadog サイト][9] のベース URL は次のとおりです。{{<region-param key="dd_api" code="true">}}

以下の例の `<BASE_URL>` をベース URL に置き換えます。

**PATCH** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### 本文の例 {#example-body-1}

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metrics_to_add": [
        "metric.name.three",
        "metric.name.four"
      ],
      "metrics_to_remove": [
        "metric.name.five",
        "metric.name.six"
      ]
    }
  }
}
{{< /code-block >}}

### フィルタリングされたメトリクスポリシーを更新する (完全置換) {#update-a-filtered-metric-policy-full-replace}

選択した [Datadog サイト][9] のベース URL は次のとおりです。{{<region-param key="dd_api" code="true">}}

以下の例の `<BASE_URL>` をベース URL に置き換えます。

**PUT** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### 本文の例 {#example-body-2}

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metric_names": [
        "metric.name.seven",
        "metric.name.eight"
      ]
    }
  }
}
{{< /code-block >}}

### ポリシーを削除する {#delete-a-policy}

選択した [Datadog サイト][9] のベース URL は次のとおりです。{{<region-param key="dd_api" code="true">}}

以下の例の `<BASE_URL>` をベース URL に置き換えます。

**DELETE** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

### フィルタリングされたメトリクスポリシーを取得する {#get-a-filtered-metric-policy}

選択した [Datadog サイト][9] のベース URL は次のとおりです。{{<region-param key="dd_api" code="true">}}

以下の例の `<BASE_URL>` をベース URL に置き換えます。

**GET** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### 応答例の本文 {#example-response-body}

{{< code-block lang="json" disable_copy="true" collapsible="true" >}}
{
  "data": [
    {
      "type": "filtered_metrics",
      "id": "metric.name.one",
      "attributes": {
        "updated_timestamp": 1745954352
      }
    },
    {
      "type": "filtered_metrics",
      "id": "metric.name.two"
      "attributes": {
        "updated_timestamp": 1745954389
      }
    }
    // ... up to ~10,000 entries
  ],
  "links": {
    "self": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=200&page[limit]=100",
    "next": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=300&page[limit]=100",
    "prev": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=100&page[limit]=100",
    "first": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=0&page[limit]=100",
    "last": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=9900&page[limit]=100"
  },
  "meta": {
    "agent_coverage_percent": 100,
    "agents_with_latest_policy_count": 4,
    "deployment_failure": {
        "failed_agent_count": 0,
        "failure_message": ""
    },
    "deployment_status": "Deployed to all Agents",
    "deployment_strategy": "all",
    "policy_name": "test_policy_1",
    "total": 7,
    "total_agent_count": 4,
    "updated_by": "user@datadoghq.com",
    "updated_timestamp": 1758912365
  }
}
{{< /code-block >}}

### フィルタリングされたメトリクスポリシーを表示する {#list-filtered-metric-policies}

選択した [Datadog サイト][9] のベース URL は次のとおりです。{{<region-param key="dd_api" code="true">}}

以下の例の `<BASE_URL>` をベース URL に置き換えます。

**GET** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies`

#### 応答例の本文 {#example-response-body-1}

{{< code-block lang="json" disable_copy="true" collapsible="true" >}}
{
    "data": [
        {
            "id": "06b-fab-47e",
            "type": "filtered_metrics",
            "attributes": {
                "count": 85,
                "deployment_status": "Deployed to all Agents",
                "deployment_strategy": "all",
                "policy_name": "policy one",
                "updated_by": "user@datadoghq.com",
                "updated_timestamp": 1758547485,
                "version": 4            
            }
        },
        {
            "id": "07b-201-47e",
            "type": "filtered_metrics",
            "attributes": {
                "count": 8,
                "deployment_status": "Deployed to all Agents",
                "deployment_strategy": "all",
                "policy_name": "policy two",
                "updated_by": "user@datadoghq.com",
                "updated_timestamp": 1758547212,
                "version": 1
            }
        }
    ]
}
{{< /code-block >}}

## プレビューの制限事項 {#preview-limitations}

この初期プレビューリリースには、次の制限事項があります。

- 除外できるメトリクス名は最大 10,000 個です。
- Agent でのリソース使用量の影響は、最大 10 MB のメモリ (RSS) に制限されており、CPU 使用量の増加はありません。
- DogStatsD または Agent インテグレーションから受信したカスタムメトリクスのみがサポートされています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/#metrics
[2]: /ja/account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /ja/account_management/rbac/permissions#api-and-application-keys
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/metric/summary
[7]: https://app.datadoghq.com/metric/settings/policies                                            
[8]: /ja/api/latest/#getting-started
[9]: /ja/getting_started/site/