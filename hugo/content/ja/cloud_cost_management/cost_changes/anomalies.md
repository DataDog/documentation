---
aliases:
- /ja/cloud_cost_management/reporting/anomalies
- /ja/cloud_cost_management/anomalies
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
- link: /cloud_cost_management/cost_changes/monitors
  tag: モニター
  text: コストモニターの作成
title: Anomalies ページ
---
## 概要 {#overview}

Datadog Cloud Cost Management (CCM) は、お客様の環境を継続的に監視して予期しないコストの変化を検出し、優先順位を付けます。これにより、異常の共有、調査、解決が可能になります。コストの異常は、AWS、Azure、Google Cloud、Oracle Cloud、Datadog、Anthropic、OpenAI、Cursor、Amazon Bedrock、Vertex AI、Gemini、Databricks で利用でき、CCM のセットアップ後に追加のセットアップを行う必要はありません。

{{< img src="cloud_cost/anomalies/anomalies-overview.png" alt="サービス名、使用方法、コストへの影響を示すコストの異常リスト" style="width:80;" >}}

一般的なワークフローは以下のとおりです。

{{< ui >}}Anomalies{{< /ui >}} タブで異常を1. **表示**する
Watchdog Explains を使用して2. **調査**を行い、コストの変化の原因を把握する
詳細の確認、詳細な調査、または監視のセットアップを行うことで、アクションを実行できる3. **エンジニアリングチームと共有する**
予期されるまたは重要ではない異常を4. **解決**する

## 異常の定義方法 {#how-anomalies-are-defined}

異常とは、通常のパターンから逸脱した、重要かつ予期しない変化のことです。Datadog は、お客様固有の使用パターンに対応する機械学習技術を使用して、異常を自動的に特定します。

真の異常と予期される変動を区別するために、Datadog のアルゴリズムは以下の処理を行います。
- 毎週月曜日のコスト増加や毎月 4 日の急増など、繰り返し発生するコストの急増と急減を認識する
- エンジニアリングの使用状況に焦点を当てる (税金、クレジット、返金、リザーブドインスタンス料は除外されます)
- 影響の少ない異常を除外してノイズを低減する

## 異常検出のカスタマイズ {#customize-anomaly-detection}

デフォルトでは、Datadog は各クラウドプロバイダーのコストの異常を自動的に検出します。`cloud_cost_management_write` 権限をお持ちの場合は、Datadog がプロバイダーごとに異常を検出する方法をカスタマイズして、組織のコスト構造に合わせることができます。カスタム異常検出は、AWS、Azure、Google Cloud、Datadog、Oracle Cloud、Anthropic、OpenAI、Cursor、Amazon Bedrock、Vertex AI、Gemini で利用できます。

異常検出をカスタマイズする方法:

1. [{{< ui >}}Anomalies{{< /ui >}} タブ][1]で、{{< ui >}}Configure{{< /ui >}} をクリックします。
1. {{< ui >}}Configure Cost Anomalies{{< /ui >}} パネルで、プロバイダーを選択します。チェックマークはプロバイダーがカスタム設定を使用していることを示し、空の円は Datadog のデフォルトの設定を使用していることを示しています。
1. 選択したプロバイダーに対して、以下の設定を調整します。
   - **検出ディメンション**: Datadog が、たとえばサービスや料金の説明などに関するコストの異常を検出するディメンション。この設定は必須です。
   - **最低日次コスト**: コストの変化が異常として検出されるために達する必要のある最低日次コスト (組織の通貨で 5 以上)。低コストの変化によるノイズを減らすには、この値を上げます。
   - **内訳タグ**: 検出された異常の分類に使用される最大 5 つの追加タグ。このタグは、[Bits Chat の Cloud Cost スキル][5]が各異常の原因を特定するのに役立ちます。デフォルトのタグのセットは常に含まれており、削除することはできません。
1. [{{< ui >}}Save{{< /ui >}}] をクリックします。変更は、今後検出される異常に適用されます。

プロバイダーを Datadog のデフォルトの設定に戻すには、プロバイダーを選択し、[{{< ui >}}Revert{{< /ui >}}] をクリックしてから [{{< ui >}}Save{{< /ui >}}] をクリックします。

## コスト異常の表示 {#view-cost-anomalies}

[Datadog の Cloud Cost ページの Anomalies タブ][1]では、異常を表示およびフィルタリングすることができます。

- {{< ui >}}Active{{< /ui >}}: 直近の 1 日分のコストデータ (通常 2~3 日前) に基づく異常。
- {{< ui >}}Past{{< /ui >}}: 7 日を超えて継続した異常、または異常として検出されなくなったもの。過去の異常は報告するのに役立ちますが、緊急性や実行可能性が低い場合がほとんどです。
- {{< ui >}}Resolved{{< /ui >}}: コンテキストで解決済みとしてマークした異常。

各異常カードには以下が表示されます。
- サービス名 (例: `rds`)
- 使用タイプ
- 影響を受けるクラウドアカウント
- 予想コストと実際のコスト
- コスト傾向のグラフ (過去 1 か月)

異常は、コストへの影響度の順に並べ替えられ、最も重要な変化が上部に表示されます。

## 異常の調査 {#investigate-anomalies}

### 異常の原因を把握する {#understand-what-drives-anomalies}

CCM は、調査アシスタントの [Watchdog Explains][2] を自動的に使用して、コストの異常の原因を特定します。Watchdog Explains は、以下の特定の項目を分析および特定します。

- アカウント
- チーム
- サービス
- Kubernetes または ECS クラスター
- リージョン

異常が発生した場所を把握でき、手動での調査手順を減らします。異常のグラフにカーソルを合わせると、2 つのグラフが表示されます。1 つは Watchdog Explains によって特定されたタグを含むもの、もう 1 つは含まないものです。特定のタグを削除すると急増がどのように平坦化するかが示され、コストへの影響を確認することができます。

### 異常に対するアクションの実行 {#take-action-on-anomalies}

以下の手順に従って、異常を調査および解決してください。

1. Anomaly にカーソルを合わせると異常の原因が表示されます。あるいは、[{{< ui >}}See more{{< /ui >}}] をクリックしてサイドパネルを開きます。

   {{< img src="cloud_cost/anomalies/anomalies-watchdog.png" alt="[See More] をクリックし、異常の詳細、調査オプション、アクションボタンが表示されたサイドパネルを開きます" style="width:80;" >}}

1.  影響を受けるサービス、関与するチーム、影響を受ける環境、リソース ID、使用量と単価がどのようにコスト異常を引き起こしている可能性があるかについて、詳細を確認します。
1. **追加調査**: Cost Explorer または Datadog ノートブックで異常を表示し、追加のディメンションを使用して異常をさらに調査します。その後、Watchdog Explains によって特定されたサービス所有者またはチームに、異常、エクスプローラーリンク、またはノートブックを送信することができます。これにより、チームは異常が発生した理由とその異常が予期されるものかどうかというコンテキストとともに、異常を解決することができます。

   {{< img src="cloud_cost/anomalies/anomalies-take-action.png" alt="[Take Action] をクリックして、Cost Explorer で異常を表示するか、ノートブックに追加します" style="width:80;" >}}
1. **監視の設定**: 類似のパターンにコスト異常検知モニターを作成するか、将来の異常にアラートを構成します。
   {{< img src="cloud_cost/anomalies/anomalies-create-monitor.png" alt="コスト異常検知モニターを作成する" style="width:80;" >}}

## 異常の解決 {#resolve-anomalies}

異常を調査する過程で、重要ではない異常、実際には予期されていたコストであった異常、あるいは異常とは見なされないものが発見される場合があります。

異常の解決方法:

1. [{{< ui >}}Resolve Anomaly{{< /ui >}}] をクリックして、解決ポップアップを開きます。
1. 次のいずれかの解決策を選択してください:
   - {{< ui >}}The anomaly amount was too small{{< /ui >}}
   - {{< ui >}}This is an unexpected increase{{< /ui >}}
   - {{< ui >}}This is an expected increase{{< /ui >}}
1. 異常である理由または異常ではない理由についてコンテキストを追加します。
1. [{{< ui >}}Resolve{{< /ui >}}] をクリックして、{{< ui >}}Resolved{{< /ui >}} タブに移動します。

コスト異常を重要とマークし、それが異常である理由を説明する方法の例は以下のとおりです。

{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel_is-unexpected-1.png" alt="説明フィールド付きの、異常を予期しないものとマークするためのフォーム" style="width:80;" >}}

## トラブルシューティング {#troubleshooting}

予期される異常が表示されない場合:
- CCM が[適切にセットアップされている][3]ことを確認する
- AWS、Azure、Google Cloud、または Oracle Cloud の必要な権限があることをチェックする
- 異常表示のタイムレンジを確認する

ご不明な点は、[Datadog サポート][4]までお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/anomalies
[2]: /ja/dashboards/graph_insights/watchdog_explains
[3]: /ja/cloud_cost_management/setup/
[4]: /ja/help/
[5]: /ja/cloud_cost_management/cloud_cost_skill/