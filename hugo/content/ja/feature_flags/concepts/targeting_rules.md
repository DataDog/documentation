---
description: ターゲティングルール、フィルター、およびロールアウトタイプによって、アプリケーションで提供するバリアントをどのように制御するかを学びます。
further_reading:
- link: /feature_flags/concepts/evaluation_tester
  tag: ドキュメント
  text: 評価テスター
- link: /feature_flags/concepts/targeting_attributes
  tag: ドキュメント
  text: ターゲティング属性
- link: /feature_flags/concepts/scheduled_rollouts
  tag: ドキュメント
  text: スケジュールされたロールアウト
- link: /feature_flags/concepts/saved_filters
  tag: ドキュメント
  text: 保存済みフィルター
- link: /feature_flags/concepts/traffic_splitting
  tag: ドキュメント
  text: トラフィックスプリッティングとランダム化
- link: /feature_flags/concepts/experiments
  tag: ドキュメント
  text: Feature Flags と実験
- link: /feature_flags/concepts/evaluation_context
  tag: ドキュメント
  text: 評価コンテキスト
- link: /feature_flags/concepts/environments
  tag: ドキュメント
  text: 環境
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアント側の SDK
title: ターゲティングルールおよびフィルター
---
## 概要 {#overview}

**ターゲティングルール**は、どの対象にどのバリアントを提供するかを定義します。各ルールには、**フィルター**、1 つ以上のバリアント、およびオプションのパーセンテージロールアウトを含めることができます。ルールは、一致するものが見つかるまで順番に評価されます。

## ターゲティングルールのタイプ {#targeting-rule-types}

Datadog は、ロールアウト戦略に応じて異なるターゲティングルールのタイプをサポートしています。

| タイプ | 説明 |
|------|-------------|
| **フィーチャーゲート** | フィルターに一致する対象の一定割合に対して (ランダム化の有無にかかわらず)、即時または [スケジュールされた開始時刻](/feature_flags/concepts/scheduled_rollouts/) |にロールアウトします。
| **プログレッシブロールアウト** | 複数のステップを含むスケジュールに沿ってランダム化されたロールアウトを行い、手動または [スケジュールされた開始時刻](/feature_flags/concepts/scheduled_rollouts/) |に開始します。
| **実験** | [実験][5] に関連付けられたランダム化された割り当て|

## ターゲティングルールの設定 {#configure-targeting-rules}

フラグのターゲティングルールを設定するには、

1. **Feature Flags** に移動し、フラグを選択します。
2. ルールを変更する環境を選択します。
3. **Add Targeting Rule** をクリックします (または、変更するターゲティングルールをクリックします)。

{{< img src="feature_flags/concepts/ff-targeting-rules-and-rollouts-2.png" alt="Feature Flags の [Targeting Rules and Rollouts] セクション。" style="width:100%;" >}}

各ターゲティングルールについて、以下を設定します。

- **ターゲティングルールに名前を付ける**: ターゲティングルールが対象とするグループを示す名前を付けます。
- **フィルターを定義する** (オプション): フィルターを定義しない場合、そのルールは環境内のすべての対象に一致します。複数のフラグで同じ条件を再利用するには、各フラグで条件を再定義する代わりに、[保存済みフィルター][1] を追加します。
- **バリアントを選択**: 一致する対象に提供するバリアントを選択します。**Split Traffic**をクリックして、複数のバリアント間でランダム化します ([トラフィックスプリッティングとランダム化](/feature_flags/concepts/traffic_splitting/)を参照)。
- **トラフィックの露出を設定** (オプション): 一致する対象の一定割合にバリアントを提供します ([トラフィックスプリッティングとランダム化](/feature_flags/concepts/traffic_splitting/)を参照)。
- **開始時間をスケジュールする** (オプション): ルールを即時ではなく、将来の日時に自動的に有効化します ([スケジュールされたロールアウト](/feature_flags/concepts/scheduled_rollouts/)を参照)。

{{< img src="feature_flags/concepts/configure-targeting-rule-3.png" alt="機能フラグの Targeting Rule エディターのサイドパネル。" style="width:70%;" >}}

ターゲティングルールを設定した後、**Save** をクリックし、環境でフラグを有効にすると、SDK がターゲティングルールを評価できるようになります。[評価テスター][2] を使用して、本番データに影響を与えることなく、特定のターゲティングキーと属性に対してルールがどのように評価されるかをシミュレートすることもできます。

<div class="alert alert-info">
環境でフラグが <b>disabled</b> になっているか、<b>overridden</b> されている場合、SDK はターゲティングルールを評価しません。フラグが固定バリアントで上書きされている場合、SDK はそのバリアントを返します。フラグが無効になっている場合、SDK はコード化されたデフォルトのバリアントを返します。
</div>

## フィルターと評価コンテキスト{#filters-and-evaluation-context}

フィルターは、SDK の [評価コンテキスト][4] の属性を使用します。フラグを評価する前に評価コンテキストを設定する際、属性を定義します。属性はフラットなプリミティブ値 (文字列、数値、ブール値) である必要があります。ネストされたオブジェクトや配列はサポートされていません。

フィルターを作成する際、属性フィールドには、組織がすでに定義している属性や、SDK が最近送信した属性が候補として表示されます。データ型を指定して再利用可能な属性を定義するには、[ターゲット属性][3] を参照してください。データ型によって、その属性で使用可能な演算子も決まります。

`country`、`tier`、`user_role`、`account_age_days`の属性を持つ評価コンテキストがある場合、等価性、**is one of**、**is not**、または数値比較など、さまざまな演算子を使用してフィルターを作成できます。

- `country` **is one of** `US`、`CA`
- `tier` **equals** `premium`
- `user_role` **is not** `guest`
- `account_age_days` **greater than** `90`

## ルール階層 {#rule-hierarchy}

ターゲティングルールは、**上から順に**評価されます。

1. SDK は最初のルールを評価します。対象がフィルターに一致する場合 (またはフィルターが定義されていない場合)、そのルールによってバリアントが提供される可能性があります。
2. 対象が一致しない場合、評価は次のルールに引き継がれます。
3. 一致するルールがない場合、SDK はその環境の**デフォルトバリアント**を提供します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/feature_flags/concepts/saved_filters/
[2]: /ja/feature_flags/concepts/evaluation_tester/
[3]: /ja/feature_flags/concepts/targeting_attributes/
[4]: /ja/feature_flags/concepts/evaluation_context/
[5]: /ja/feature_flags/concepts/experiments/