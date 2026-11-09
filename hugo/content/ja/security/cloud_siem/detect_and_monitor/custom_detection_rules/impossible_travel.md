---
disable_toc: false
title: 不可能移動
---
## 概要{#overview}

不可能移動メソッドは、2 つのアクセスイベントの間に人間が移動できる距離よりも大きい距離の異なる場所からのアクセスを検出します。

不可能移動ルールの作成方法について詳しくは、[ルールの作成][1] を参照してください。

## 不可能移動メソッドの仕組み {#how-the-impossible-travel-method-works}

### ベースラインユーザーの位置{#baseline-user-locations}

{{< img src="security/security_monitoring/detection_rules/impossible_travel_baseline_location.png" alt="不可能移動ルールのクエリでベースラインの位置オプションが強調表示されているところ" style="width:100%;" >}}

ルールによるシグナル作成の開始前に Datadog が各ユーザーのための共通の場所を学習できるようにするには、不可能移動ルールのクエリを設定する際に、{{< ui >}}Baseline User Locations{{< /ui >}} を有効にすることができます。

#### ベースラインユーザーの位置が無効 {#baseline-user-locations-disabled}

{{< ui >}}Baseline User Locations{{< /ui >}}が無効な場合 (デフォルト)、次のようになります。

- 各ログに、すでに検出された場所からは移動不可能な場所が含まれているかどうかが評価されます。

- 2 つの場所の間の移動速度が 1000 km/h を超えており、かつ距離が 500km を超える場合、その移動は不可能とみなされます。

#### ベースラインユーザーの位置が有効 {#baseline-user-locations-enabled}

{{< ui >}}Baseline User Locations{{< /ui >}}が有効な場合、次のようになります。

- 各ユーザーに対して 24 時間の学習期間があります。この期間中 Datadog は、各ユーザーの共通の場所 (都市および国) を学習します。シグナルは作成されません。
- 検出された場所は、再度検出されるのでない限り、30 日後に忘れられます。
- 新しい場所が検出された場合、Datadog は次のことを実行します。
    - その場所が共通の場所の 1 つでかどうかを確認します。共通の場所の 1 つである場合、Datadog はその次のログまたはイベントに進みます。
    - 不可能移動の状況かどうかを確認します。
        - 不可能移動の状況でない場合、Datadog は、次のログまたはイベントに進みます。
        - 不可能移動の状況である場合、Datadog は、IP 遷移パターンが存在するかどうかを確認します.たとえば、ユーザーが場所 A から場所 B へ移動した場合、その移動パターンが過去にもあったなら、シグナルはトリガーされません。

[1]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=impossible_travel