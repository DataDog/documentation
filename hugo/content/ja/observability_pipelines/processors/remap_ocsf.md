---
description: Remap to OCSF プロセッサを使用して、ログを Open Cybersecurity Schema Framework (OCSF)
  イベントにマッピングする方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Remap to OCSF プロセッサ
---
{{< product-availability >}}

## 概要 {#overview}

このプロセッサを使用して、ログを Open Cybersecurity Schema Framework (OCSF) イベントに再マッピングします。OCSF スキーマイベントクラスは、特定のログソースとタイプに対して設定されます。1 つのプロセッサに複数のマッピングを追加できます。**注**: Datadog では、他のすべてのプロセッサによるログの処理後に再マッピングが行われるよう、OCSF プロセッサをパイプラインの最後に配置することを推奨しています。

## セットアップ {#setup}

このプロセッサを設定するには、

{{< ui >}}Manage mappings{{< /ui >}} をクリックします。モーダルが開きます。

- すでにマッピングを追加している場合は、リスト内のマッピングをクリックして編集または削除します。検索バーを使用して、名前でマッピングを検索できます。別のマッピングを追加する場合は、{{< ui >}}Add Mapping{{< /ui >}} をクリックします。{{< ui >}}Library Mapping{{< /ui >}} または {{< ui >}}Custom Mapping{{< /ui >}} を選択し、{{< ui >}}Continue{{< /ui >}} をクリックします。
- まだマッピングを追加していない場合は、{{< ui >}}Library Mapping{{< /ui >}} または {{< ui >}}Custom Mapping{{< /ui >}} を選択します。{{< ui >}}Continue{{< /ui >}} をクリックします。

{{% collapse-content title="ライブラリマッピング" level="h3" expanded=false id="library_mapping" %}}

### マッピングを追加 {#add-a-mapping}

1. ドロップダウンメニューでログタイプを選択します。
1. フィルタークエリを定義します。指定したフィルタークエリに一致するログのみが再マッピングされます。フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。詳細については、[検索構文][1]を参照してください。
1. サンプルのソースログと結果の OCSF 出力を確認します。
1. {{< ui >}}Save Mapping{{< /ui >}} をクリックします。

### ライブラリマッピング {#library-mappings}

利用可能なライブラリマッピングは以下のとおりです。

| ログソース             | ログタイプ                                      | OCSF カテゴリ                 | サポートされている OCSF バージョン|
|------------------------|-----------------------------------------------|-------------------------------| -----------------------|
| AWS CloudTrail         | タイプ: Management<br>イベント名: ChangePassword | アカウント変更 (3001)         | 1.3.0<br>1.1.0         |
| AWS GuardDuty          | すべての検出タイプ                             | 検出結果 (2004)      | 1.3.0                  |
| AWS WAF                | WebACL                                        | HTTP アクティビティ (4002)          | 1.3.0                  |
| GitHub                 | ユーザー作成                                   | アカウント変更 (3001)         | 1.1.0                  |
| Google Cloud Audit     | CreateBucket                                  | アカウント変更 (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | CreateSink                                    | アカウント変更 (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | SetIamPolicy                                  | アカウント変更 (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | UpdateSync                                    | アカウント変更 (3001)         | 1.3.0<br>1.1.0         |
| Google Workspace Admin | addPrivilege                                  | ユーザーアカウント管理 (3005)| 1.1.0                  |
| Infoblox               | Audit API                                     | API アクティビティ (6003)           | 1.3.0                  |
| Infoblox               | 監査認証                          | 認証 (3002)         | 1.3.0                  |
| Infoblox               | DHCP                                          | DHCP アクティビティ (4004)          | 1.3.0                  |
| Infoblox               | DNS クエリ                                     | DNS アクティビティ (4003)           | 1.3.0                  |
| Infoblox               | ポート                                          | ベースイベント (0)                | 1.3.0                  |
| Microsoft 365 Defender | インシデント                                      | インシデントの検出 (2005)        | 1.3.0<br>1.1.0 |
| Okta                   | ユーザーセッション開始                            | 認証 (3002)         | 1.1.0                  |
| Palo Alto Networks     | 脅威                                        | ネットワークアクティビティ (4001)       | 1.3.0                  |
| Palo Alto Networks     | トラフィック                                       | ネットワークアクティビティ (4001)       | 1.1.0                  |
| Zscaler ZPA            | ユーザーアクティビティ                                 | ネットワークアクティビティ (4001)       | 1.3.0                  |
| Zscaler ZPA            | ユーザーのステータス                                   | 認証 (3002)         | 1.3.0                  |

{{% /collapse-content %}}

{{% collapse-content title="カスタムマッピング" level="h3" expanded=false id="custom_mapping" %}}

カスタムマッピングを設定する際に、モーダルを閉じたり終了したりしようとすると、マッピングをエクスポートするよう求められます。Datadog では、これまでに設定した内容を保存するため、マッピングをエクスポートすることを推奨しています。エクスポートされたマッピングは、JSON ファイルとして保存されます。

カスタムマッピングを設定するには、

1. 必要に応じて、マッピングに名前を追加します。デフォルト名は `Custom Authentication` です。
1. {{< ui >}}filter query{{< /ui >}} を定義します。詳細については、[ログ検索構文][1]を参照してください。
   - フィルターに一致するログのみが再マッピングされます。
   - フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。
1. ドロップダウンメニューから OCSF イベントカテゴリを選択します。
1. ドロップダウンメニューから OCSF イベントクラスを選択します。
1. フィールドを追加する際に参照できるよう、ログサンプルを入力します。
1. {{< ui >}}Continue{{< /ui >}} をクリックします。
1. 追加する OCSF プロファイルを選択します。詳細については、[OCSF スキーマブラウザ][1]を参照してください。
1. すべての必須フィールドが表示されます。それらに必要な {{< ui >}}Source Logs Fields{{< /ui >}} と {{< ui >}}Fallback Values{{< /ui >}} を入力します。手動でその他のフィールドを追加する場合は、{{< ui >}}+ Field{{< /ui >}} をクリックします。ゴミ箱アイコンをクリックして、フィールドを削除します。**注**: 必須フィールドは削除できません。
    - ログにソースログフィールドが存在しない場合、OCSF フィールドにはフォールバック値が使用されます。
    - {{< ui >}}Source Log Fields{{< /ui >}} に対して複数のフィールドを追加できます。たとえば、Okta の `user.system.start` ログには、`eventType` または `legacyEventType` フィールドのいずれかが含まれています。両方のフィールドを同じ OCSF フィールドにマッピングできます。
    - 独自の OCSF マッピングを JSON 形式で持っている場合、または以前に保存したマッピングを使用する場合は、{{< ui >}}Import Configuration File{{< /ui >}} をクリックします。
1. {{< ui >}}Continue{{< /ui >}} をクリックします。
1. 一部のログソース値は、OCSF 値にマッピングする必要があります。たとえば、OCSF の `severity_id` フィールドにマッピングされるソースログの重大度フィールドの値は、OCSF `severity_id` の値にマッピングする必要があります。OCSF 値の一覧については、[認証][2]の `severity_id` を参照してください。重要度値のマッピング例:
    | ログソース値 | OCSF 値      |
    | ---------------- | --------------- |
    | `INFO`           | `Informational` |
    | `WARN`           | `Medium`        |
    | `ERROR`          | `High`          |
1. OCSF 値へのマッピングが必要なすべての値が一覧表示されます。追加の値をマッピングする場合は、{{< ui >}}+ Add Row{{< /ui >}} をクリックしてください。
1. {{< ui >}}Save Mapping{{< /ui >}} をクリックします。

[1]: https://schema.ocsf.io/
[2]: https://schema.ocsf.io/1.4.0/classes/authentication?extensions=

{{% /collapse-content %}}

## Health メトリクス {#health-metrics}

すべてのプロセッサから出力される[コンポーネントメトリクス][3]および[プロセッサバッファメトリクス][4]については、[Pipelines 使用量メトリクス][5]ドキュメントを参照してください。OCSF マッパープロセッサのメトリクスでフィルタリングまたはグループ化するには、タグ `component_type:ocsf_mapper` を使用します。

[1]: /ja/observability_pipelines/search_syntax/logs/
[3]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/