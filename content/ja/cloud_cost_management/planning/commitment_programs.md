---
description: クラウドの割引プログラムのパフォーマンスとステータスを管理する方法を学びます。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
title: コミットメント プログラム
---

<div class="alert alert-info">CCM Commitment Programs は Amazon RDS Reserved Instances と Amazon EC2 Reserved Instances をサポートしています。</div>

## 概要

クラウド プロバイダーは、予測しやすい利用に対してコストを抑えるため、{{< tooltip text="Reserved Instance (RI)" tooltip="特定のインスタンス構成を 1 年または 3 年の期間利用することを約束することで受けられる課金割引。" >}} や {{< tooltip text="Savings Plans" tooltip="一定期間にわたり、一定の利用量($/hour で測定)を継続することを約束する代わりに、単価が下がる柔軟なクラウド割引プログラム。" >}} といったコミットメント型の割引プログラムを提供しています。Datadog の Commitment Programs 機能を使うと、クラウド環境全体でこれらの割引をモニタリングし、最適化し、価値を最大限に引き出せます。

Commitment Programs でできること:
- 未使用または使用率の低いコミットメントを把握し、対処する
- 追加のコミットメントで、高額な {{< tooltip text="on-demand" tooltip="コミットメントや割引プログラムを使わず、標準料金で課金されるクラウド リソース。" >}} 支出を削減できる領域を狙う
- 有効期限を監視し、適切なタイミングで更新を計画する

{{< img src="cloud_cost/planning/planning-commitments-overview.png" alt="フィルター、KPI (Effective Savings Rate、Absolute Savings、Coverage、Utilization)、期間別コストの棒グラフ、リージョン、インスタンス ファミリー、データベース エンジン別の on-demand hot-spots テーブルを表示するダッシュボード。" style="width:100%;" >}}


## はじめに

Commitment Programs を使うと、クラウドのコミットメントを把握し、最適化できます。

1. Cloud Cost Management で [**Cloud Cost > Planning > Commitment Programs**][1] に移動します。
2. フィルターを使って、特定のアカウント、リージョン、またはサービスに絞り込みます。
3. KPI、コミットメントにかかるコスト、更新の推奨事項を把握します:
   - [Commitments Overview](#commitments-overview) セクションで KPI を確認します。
   - [Costs Overview](#costs-overview) で Utilization と Coverage を分析します。
   - [Commitments Explorer](#commitments-explorer) で、有効期限と更新の推奨事項を確認します。
4. 得られたインサイトをもとに、次のアクションを取ります:
   - ワークロードを調整してコミットメントの活用度を高め、余分な on-demand 料金の発生を避ける
   - 利用データに基づき、コミットメントを購入または変更して見直す
   - 期限切れ前に、更新計画を立てるかコミットメントを廃止する
   - Datadog の推奨事項を活用して支出を最適化し、節約を増やしつつ無駄を減らす

## Commitments overview

クラウド プロバイダーとサービス別に、次の Key Performance Indicators (KPI) を確認します:

{{< img src="cloud_cost/planning/commitments-overview.png" alt="クラウドのコミットメント関連 KPI を要約したダッシュボード。節約パフォーマンスを素早く把握でき、注意が必要な領域をハイライトします。" style="width:100%;" >}}

- **Effective Savings Rate (ESR):** 割引プログラムによる節約効果を on-demand 価格と比較した割合。利用されているコミットメントだけでなく、使い切れていないコミットメントも加味します。
  - _例: RI は 62% の割引でも、ESR が 45% しかない場合、未活用のコミットメントが実際の節約額を押し下げています。_
- **Absolute Savings:** コミットメント プログラムを使うことで、on-demand 料金と比べて削減できた金額($)の合計。
  - _例: 先月のクラウド サービス費用が $10,000 で、on-demand 料金なら $14,000 だった場合、Absolute Savings は $4,000 です。_
- **Coverage:** 割引プログラム (Reserved Instances、Savings Plans、{{< tooltip text="Committed Use Contracts" tooltip="一定期間にわたり、割引料金で所定量のリソースを利用することをクラウド プロバイダーと取り決める契約。" >}} など) で保護されている利用量の割合。
  - _例: EC2 compute の Coverage が 50% の場合、利用の半分は on-demand です。Coverage を 80% に増やせば、請求額を抑えられる可能性があります。_
- **Utilization:** 購入したコミットメントが、実際にどの程度使われているか。
  - _例: 1 年の GCP Committed Use Contract の Utilization が 70% しかない場合、30% は未使用のままで、調整が必要になることがあります。_

## Costs overview

Costs Overview は、コミットメント プログラムに関する支出を要約し、クラウド コストがどこに流れているか、そしてコミットメントが全体の支出にどう影響しているかを把握できるようにします。このセクションでは次のことができます:

{{< img src="cloud_cost/planning/commitments-rds-costs-overview.png" alt="3 月 1 日から 3 月 31 日までの RDS コストの棒グラフ。コスト タイプ、リージョン、インスタンス ファミリーでグループ化され、合計 $20.55k が強調表示されています。" style="width:100%;" >}}

- **Show RI fee:** RI 料金の表示を切り替え、on-demand とコミットメント ベースの支出を区別しやすくします。
- **Group By options:** コスト タイプ、リージョン、インスタンス ファミリー、またはデータベース エンジンでコストを整理して分析します。支出を押し上げているリージョンやサービスを特定し、比較し、追加コミットメントや戦略見直しが必要な箇所を見つけられます。
- **Total commitment spend:** 予約容量と on-demand のどちらにどれだけ支出しているかを把握し、コミットメント戦略の有効性を評価できます。
- **Savings breakdown:** コミットメント プログラムによって得られた節約額を、on-demand 料金と比較して確認できます。
- **Service-level details:** サービス、リージョン、アカウント単位でコストを分析し、コミットメント プログラムが最も価値を生んでいる箇所と、さらなる最適化の余地がある箇所を特定します。

このセクションを活用して、コミットメントの購入、更新、調整について根拠のある判断を行い、節約を最大化しつつ無駄を最小化してください。

## On-demand hot-spots

On-demand hot-spots は on-demand コストが高い領域を可視化し、追加のコミットメントを購入できる余地を示します。

{{< img src="cloud_cost/planning/commitments-on-demand.png" alt="AWS RDS の on-demand hot-spots を示すテーブル。Coverage が 0% のリージョン、インスタンス ファミリー、データベース エンジンと、それに紐づく高額な on-demand コストが一覧表示されています。" style="width:100%;" >}}

- **Identify high on-demand usage:** on-demand 支出が大きいサービス、リージョン、またはアカウントを素早く見つけます。
- **Estimate potential savings:** on-demand 利用をコミットメント ベースの料金に切り替えた場合に、どれだけ節約できるかを見積もれます。
- **Take action:** ワークロードを調整するか、新しいコミットメントを購入して、将来の on-demand コストを削減します。

## Commitments Explorer

Commitments Explorer は、データベース Reserved Instances など、クラウドのコミットメント契約をすべて一覧できる詳細なインタラクティブ テーブルを提供します。主要属性でコミットメントを閲覧、検索、フィルター、並べ替えでき、保有状況の把握、有効期限の監視、利用と節約の最適化機会の発見に役立ちます。

{{< img src="cloud_cost/planning/commitments-explorer-3.png" alt="AWS RDS Reserved Instance のコミットメントを一覧表示するテーブル。'Columns' ボタン、期限切れのコミットメント、期限が近いコミットメントが強調されています。" style="width:100%;" >}}

- 列の表示/非表示を切り替えて、重要な情報にフォーカスできるようテーブル表示をカスタマイズします。
- テーブルでは、直近で期限切れになったコミットメントや、まもなく期限切れになるコミットメントがハイライトされ、更新計画を立てやすくし、on-demand 価格で支払う事態を避けるのに役立ちます。

Commitments Explorer に表示される列は、プロダクト (例: Amazon RDS、EC2) や、対象のコミットメント プログラムによって異なります。利用できる列は次のとおりです:

| 列 | 説明  | 製品 |
|---|---|---|
| Reservation ARN | Reserved Instance のコミットメントを識別する一意の Amazon Resource Name (ARN)。 | All |
| Payment Model | Reserved Instance の支払い方法 (例: No Upfront、Partial Upfront、All Upfront)。 | All |
| Term | Reserved Instance の契約期間 (例: 1 Year、3 Years)。 | All |
| Region | Reserved Instance が適用される AWS リージョン。 | All |
| Instance Type | コミットメントの対象となるインスタンスのタイプとサイズ (例: RDS は `db.r6g.large`、EC2 は `m5.large`)。 | All |
| Start Date | Reserved Instance の契約開始日。 | All |
| End Date | Reserved Instance の契約終了日。 | All |
| Instance # | Reserved Instance の対象となるインスタンス数。 | All |
| NFU # | 対象となる Normalization Factor Units (NFU) の数。インスタンス サイズを標準化して比較できるようにします。 | All |
| Utilization | 選択した期間における Reserved Instance の利用率。 | All |
| DB Engine | インスタンスで使用されるデータベース エンジン (例: PostgreSQL、MySQL、SQL Server)。 | Amazon RDS |
| Multi-AZ | Reserved Instance が複数の Availability Zone へのデプロイをカバーしているか (Yes/No)。 | Amazon RDS |
| OS | インスタンスのオペレーティング システム (例: Linux、Windows)。 | Amazon EC2 |
| Offering Class | Reserved Instance のクラス (Standard または Convertible)。 | Amazon EC2 |
| AZ | Reserved Instance が存在する Availability Zone。 | Amazon EC2 |

## ユース ケース例

### 使用率の低いコミットメントを見つける

**シナリオ**: Coverage は高いのに、Effective Savings Rate (ESR) が想定より低い。

**Commitment Programs の使い方**:
1. **Commitments Overview** で Utilization の KPI を確認します。
2. アカウント、リージョン、またはインスタンス ファミリーでフィルターし、どのコミットメントが十分に使われていないかを特定します。
3. ワークロードを再配置してこれらのコミットメントをより効果的に使うか、クラウド プロバイダーが許可している場合は未使用コミットメントの変更や売却も検討します。

### 期限切れが近いコミットメントに備える

**シナリオ**: 複数の Reserved Instances が来月期限切れになり、想定外の on-demand 請求を避けたい。

**Commitment Programs の使い方**:
1. **Commitments Explorer** でコミットメント一覧と有効期限を確認します。
2. フィルターを使って、まもなく期限切れになるコミットメントに絞り込みます。
3. Coverage を維持しつつ節約を最大化できるよう、更新や置き換えを前もって計画します。

### on-demand 支出が大きい領域を狙い撃ちする

**シナリオ**: 特定のサービスやリージョンで、on-demand の利用が継続的に高いことがクラウド請求から分かる。

**Commitment Programs の使い方**:
1. **On-demand Hot-Spots** で、on-demand コストが大きく、かつ一定しているサービス、リージョン、またはアカウントを特定します。
2. 利用パターンを分析して、予測可能な利用であることを確認します。
3. 継続的な利用をコミットメントでカバーするよう新規コミットメントを購入し、コストを削減します。

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/commitment-programs