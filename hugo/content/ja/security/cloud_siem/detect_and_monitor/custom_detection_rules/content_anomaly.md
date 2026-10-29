---
disable_toc: false
title: コンテンツ異常
---
{{< jqmath-vanilla >}}

## 概要 {#overview}

コンテンツ異常検知は、受信ログを分析して異常なログコンテンツを特定し、アラートを送信します。[異常検知パラメーター](#anomaly-detection-parameters)を設定すると、グループ内の過去のログと比較してログのフィールド値が大幅に逸脱した場合にシグナルをトリガーできます。大幅な逸脱とは、受信した値と過去の値との類似性が低い、またはまったく類似性がない状態を指します。詳細については、[ログが異常と判断される仕組み](#how-logs-are-determined-to-be-anomalous)を参照してください。

コンテンツ異常ルールの設定方法については、[ルールを作成する][1]を参照してください。

## コンテンツ異常検知の仕組み {#how-content-anomaly-detection-works}

### 異常検知パラメーター {#anomaly-detection-parameters}

コンテンツ異常検知メソッドを使用してルールを作成する際、以下のパラメーターを設定できます。

#### 学習期間 {#learning-duration}
{{< img src="security/security_monitoring/detection_rules/content_anomaly/query_learning_duration.png" alt="学習期間設定が強調表示されたコンテンツ異常ルールのクエリ" style="width:100%;" >}}

- **説明**: 値が学習されるタイムウィンドウ。このフェーズではシグナルは生成されません。ルールが変更されると、学習期間は再開されます。
- **デフォルト**: `7` 日
- **範囲**: `1`-`10` 日
- **設定方法**: コンテンツ異常ルールを編集する際、クエリの {{< ui >}}Learning for{{< /ui >}} ドロップダウンメニューで学習期間を設定できます。

#### 保持期間 {#forget-after}
{{< img src="security/security_monitoring/detection_rules/content_anomaly/forget_duration.png" alt="過去の日数以内ドロップダウンメニューが強調表示されたコンテンツ異常検知オプション" style="width:100%;" >}}

- **説明**: 学習された値が破棄されるまで保持される期間。
- **デフォルト**: `7` 日
- **範囲**: `1`-`10` 日
- **設定方法**: ルールの設定ページの {{< ui >}}Content anomaly detection options{{< /ui >}} セクションで、{{< ui >}}within in the last{{< /ui >}} ドロップダウンメニューから学習された値の保持期間を設定できます。

#### 類似度パーセンテージのしきい値 {#similarity-percentage-threshold}

{{< img src="security/security_monitoring/detection_rules/content_anomaly/similarity_percentage_threshold.png" alt="類似度パーセンテージドロップダウンメニューが強調表示されたコンテンツ異常検知オプション" style="width:100%;" >}}

- **説明**: ログを正常とみなすために必要な最小類似度。
- **デフォルト**: `70%`
- **範囲**: `35`-`100%`
- **設定方法**: ルールの設定ページの {{< ui >}}Content anomaly detection options{{< /ui >}} セクションで、{{< ui >}}within in the last{{< /ui >}} ドロップダウンメニューから類似度パーセンテージのしきい値を設定できます。

#### 類似アイテムのしきい値 {#similar-items-threshold}

{{< img src="security/security_monitoring/detection_rules/content_anomaly/similar_items_threshold.png" alt="類似アイテムドロップダウンメニューが強調表示されたコンテンツ異常検知オプション" style="width:100%;" >}}

- **説明**: 受信した値を正常とみなすために必要な一致する過去のログの数。
- **デフォルト**: `1`
- **範囲**: `1`-`20`
- **設定方法**: ルールの設定ページの {{< ui >}}Content anomaly detection options{{< /ui >}} セクションで、{{< ui >}}with more than{{< /ui >}} フィールドから類似アイテムのしきい値を入力できます。

#### 評価ウィンドウ {#evaluation-window}
{{< img src="security/security_monitoring/detection_rules/content_anomaly/evaluation_window.png" alt="類似アイテムドロップダウンメニューが強調表示されたコンテンツ異常検知オプション" style="width:100%;" >}}

- **説明**: 異常なログをカウントするための期間を定義します。異常がケース条件 (例: `a >= 2`) を超えた場合にシグナルがトリガーされます。
- **範囲**: `0`-`24` 時間
- **設定方法**: ルールの設定ページの {{< ui >}}Set conditions{{< /ui >}} セクションで、{{< ui >}}within a window of{{< /ui >}} ドロップダウンメニューから条件の評価ウィンドウを設定できます。

## ログが異常と判断される仕組み {#how-logs-are-determined-to-be-anomalous}

1. ログは [Unicode Text Segmentation (UTS #29)][2] を使用してトークン化されます。
1. トークンは [Jaccard 類似度][3]を使用して比較されます。
1. 効率的な比較は [MinHash][4] および[局所性鋭敏型ハッシュ (LSH)][5] によって実現されます。
1. ログは、類似度パーセンテージのしきい値と類似アイテムのしきい値の両方を満たさない場合に異常とみなされます。

### Jaccard 類似度の計算例 {#jaccard-similarity-computation-examples}

Cloud SIEM では、[Jaccard 類似度][3]を使用してログを比較します。

$$\text"J(A,B)" = {∣\text"A" ∩ \text"B"∣} / {∣\text"A" ∪ \text"B"∣}$$

単一単語フィールドを持つログと複数単語フィールドを持つログについて Jaccard 類似度がどのように計算されるかの例を以下に示します。

#### 単一単語フィールド {#single-word-fields}

単一単語フィールドを持つログの例を 2 つ示します。

```
log1={actionType:auth, resourceType:k8s, networkType:public, userType:swe}
```

```
log2={actionType:auth, resourceType:k8s, networkType:public, userType:pm}
```

2 つのログ間の Jaccard 類似度を計算するには、以下のようにします。

- `log1` と `log2` の積集合は、次の単語セットになります。`{auth, k8s, public}`。
- `log1` と `log2` の和集合は、次の単語セットになります。`{auth, k8s, public, swe, pm}`。
- Jaccard 類似度は、結果に含まれる単語数を使用して計算されます。

$$\text"J(log1,log2)" = 3 / 5 = 0.6$$

#### 複数単語フィールド {#multi-word-fields}

複数単語フィールドを持つログの例を 2 つ示します。

```
log1={actionDescription: "User connected to abc network"}
```

```
log2={actionDescription: "User got unauthorized network access"}
```

2 つのログ間の Jaccard 類似度を計算するには、以下のようにします。

- `log1` と `log2` の積集合は、次の単語セットになります。`{User, network}`。
- `log1` と `log2` の和集合は、次の単語セットになります。`{User, connected, to, abc, network, got, unauthorized, access}`。
- Jaccard 類似度は、結果に含まれる要素数を使用して計算されます。

$$\text"J(log1,log2)" = 2 / 8 = 0.25$$

## コンテンツ異常検知手法と他の検知手法の比較 {#comparing-content-anomaly-method-with-other-detection-methods}

| 機能 | 異常検知 | 新しい値の検知 | コンテンツ異常検知 |
|---------|-------------------|---------------------|---------------------------|
| 新しいフィールド値を検知 | No | Yes | Yes (設定可能) |
| レアなフィールド値を検知 | No | No | Yes |
| 類似していない値を検知 | No | No | Yes |
| ログの急増を検知 | Yes | No | No |
| 複数のクエリをサポート | No | No | Yes |
| 複数のケースをサポート | No | No | Yes |
| シグナルをトリガーするためのしきい値定義 | タイムバケットごとのログ数分布 (約 99 パーセンタイル) から学習されます。| 新しい値が最初に出現した際には必ずシグナルがトリガーされます。| ユーザー指定 (`1`-`100`) |
| 評価ウィンドウ | Yes | No | Yes |
| 保持期間 | 14 日間 | 30 日間 | 10 日間 |

[1]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=content_anomaly
[2]: https://www.unicode.org/reports/tr29/tr29-22.html
[3]: https://en.wikipedia.org/wiki/Jaccard_index
[4]: https://en.wikipedia.org/wiki/MinHash
[5]: https://en.wikipedia.org/wiki/Locality-sensitive_hashing