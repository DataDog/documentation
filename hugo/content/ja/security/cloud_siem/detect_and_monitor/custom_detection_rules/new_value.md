---
description: 新しい値の検出方法の仕組みについて学習します。
title: New Value
---
## 概要 {#overview}

新しい値の検出方法は、新しいユーザー、アカウント、API キー、オブジェクト ID など、これまでに見られなかった属性値がログに出現したときにアラートを発します。

新しい値ルールの構成方法については、[ルールを作成][1]を参照してください。

## 新しい値の検出方法の仕組み {#how-the-new-value-detection-method-works}

新しい値の検出ルール:

- 選択したフィールドの値 (`@userIdentity.arn` など) を学習します。
- 学習期間中に値を記録して学習するか、学習期間を必要としないしきい値メソッドを使用します。詳細については、[学習期間 ](#learning-duration)を参照してください。
- 現在のスコープ内で観測されていない値が出現したときにシグナルをトリガーします。
- [Forget value](#forget-value) オプションで設定された日数の間、値が観測されなかった場合、学習した値を忘却します。値が忘却された場合、その値が再出現したときにルールがアラートを発します。

### 構成オプション {#configuration-options}

#### 新しい値を検出 {#detect-new-values}

{{< img src="security/security_monitoring/detection_rules/new_value/detect_new_value.png" alt="新しい値のルールのクエリ (新しい値の検出設定が強調表示されています)" style="width:100%;" >}}

{{< ui >}}Detect new value{{< /ui >}} フィールドは、学習する値を含む属性を定義します。最大 5 つまで属性を追加できます。

#### グループ化フィールド {#group-by-fields}

{{< img src="security/security_monitoring/detection_rules/new_value/group_by.png" alt="新しい値のルールのクエリのグループ化フィールドが強調表示されています" style="width:100%;" >}}

`group by` フィールドは、アカウントごとなど、新しい値が評価されるスコープを定義します。

#### 学習期間 {#learning-duration}

{{< img src="security/security_monitoring/detection_rules/new_value/learning_duration.png" alt="学習期間設定が強調表示された新しい値ルールのクエリ" style="width:100%;" >}}

学習期間には、以下のオプションがあります。
- {{< ui >}}for all new values{{< /ui >}}: ルールは、新しい値に対してトリガーされます。
- {{< ui >}}after the first seen value{{< /ui >}}: ルールは、値が一度観測された後の新しい値に対してトリガーされます。
- {{< ui >}}after{{< /ui >}}: 選択したフィールドに対してルールが値を学習する期間を定義します。たとえば、{{< ui >}}after 7 days{{< /ui >}} を選択した場合、ルールは最初の 7 日間値を学習し、7 日経過後の新しい値に対してトリガーされます。学習期間の最大値は 30 日です。

#### 値の忘却 {#forget-value}

{{< img src="security/security_monitoring/detection_rules/new_value/forget_after.png" alt="「値の忘却」オプションが表示されている新しい値ルールのその他のパラメータセクション" style="width:40%;" >}}

[値の忘却][2]オプションは、ルールが値を既知として保持する期間を決定します。この期間が経過すると、値は忘却され、ルールはその値に対して再度アラートを発します。{{< ui >}}Forget value{{< /ui >}} の最大日数は 30 日です。

[1]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=new_value
[2]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=new_value&cloud_siem_detection_rule_type=real_time_rule#forget-value-rt-new-value