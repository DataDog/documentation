---
aliases:
- /ja/security_platform/cloud_siem/signal_correlation_rules
further_reading:
- link: /cloud_siem/explorer/
  tag: ドキュメント
  text: セキュリティシグナルエクスプローラーについて学ぶ
- link: /security/notifications/variables/
  tag: ドキュメント
  text: セキュリティ通知変数について
title: シグナル相関ルール
type: documentation
---

## 概要

シグナル相関ルールは、複数のシグナルを組み合わせて新しいシグナルを生成するため、より複雑なユースケースに対してアラートを発し、アラート疲れを軽減することができます。例えば、イベントやシグナルを相関させて特定の問題を特定したり、特定の重大度 `low` シグナルが特定の重大度 `high` シグナルと組み合わさった場合にのみアラートを生成したりすることができます。

別の例として、この 2 つのルールを組み合わせてシグナルを作成することができます。

1. 期限切れのアカウントからアクセスしようとした場合の検出
2. ホストやリソースへの認証の試みがあったかどうかの検出

そして、`expired account ID` 属性を使用して、2 つのルールを関連付けます。

ログ検出ルールや、ログ検出ルールと Cloud Security Management Threats や Application Security Management のルールを相関させることができます。

## シグナル相関ルールの作成

[Detection Rules][1] に移動し、**+New Rule** をクリックします。*Select a rule type* セクションで、**Signal Correlation** をクリックします。

### ルールを設定する

1. **Rule a** のルールを選択します。鉛筆のアイコンをクリックして、ルールの名前を変更します。相関する属性を定義するには、**correlated by** ドロップダウンを使用します。選択したルールを相関させるために、複数の属性を選択できます (最大 3 つまで)。スライディングウィンドウの詳細については、[タイムウィンドウ](#time-windows)を参照してください。

2. 2 つ目のルールエディタのドロップダウンで、**Rule b** のルールを選択します。鉛筆のアイコンをクリックして、ルールの名前を変更します。属性とスライディングウィンドウのタイムフレームは、**Rule a** で選択されたものに設定されています。

### ルールケースを設定する

#### トリガー

{{< img src="security/security_monitoring/detection_rules/define_rule_case.png" alt="トリガー、重大度、通知のフィールドが表示されたルールケースのセットセクション" >}}

ルールのケースは case ステートメントとして評価されます。したがって、最初にマッチしたケースがシグナルを発生させます。ルールケースの例としては、`a > 3` があり、`a` はルール名です。ルールケースをクリックしてドラッグすると、その順序を操作することができます。

ルールケースには、過去に定義されたクエリのイベント数に基づいてシグナルを生成すべきかを判断するための論理演算 (`>、>=、&&、||`) が含まれます。ここで ASCII 小文字の[ルール名](#set-rules)が参照されます。

**注**: クエリラベルは演算子に先行しなければなりません。たとえば、`a > 3` は使用できますが、`3 < a` は許容されません。

各ルールケースにつき、「ケース 1」のような**名前**を付与します。シグナルの生成時には、この名前がルールの名称に追加されます。

#### 重大度および通知

{{% security-rule-severity-notification %}}

#### タイムウィンドウ

{{% security-rule-time-windows %}}

ケースを追加する場合は、**Add Case** をクリックします。

**注**: この `evaluation window` は、`keep alive` および `maximum signal duration` 以下でなければなりません。

### Say what's happening

{{% security-rule-say-whats-happening %}}

シグナルにタグを追加するには、**Tag resulting signals** ドロップダウンメニューを使用します。例えば、`security:attack` や `technique:T1110-brute-force` のようになります。

**注**: `security` タグはセキュリティシグナルの分類に用いられる特殊なタグです。`attack`、`threat-intel`、`compliance`、`anomaly`、`data-leak` など他のタグの使用を推奨します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/rules?product=siem