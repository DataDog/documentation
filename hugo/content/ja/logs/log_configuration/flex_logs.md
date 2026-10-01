---
aliases:
- /ja/logs/log_configuration/flex_log/
description: ログの長期保存に対応したコスト効率の高いライブクエリ機能
further_reading:
- link: https://www.datadoghq.com/blog/flex-logging
  tag: ブログ
  text: Flex Logs で大量のログを効率的に保存して分析する
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: ブログ
  text: ネットワークとセキュリティ分析のために DNS ログを監視する
- link: https://www.datadoghq.com/blog/cloud-siem-flex-logs/
  tag: ブログ
  text: 'Cloud SIEM と Flex Logs: クラウド向けの強化されたセキュリティインサイト'
- link: /logs/guide/flex_compute
  tag: ドキュメント
  text: Flex Compute の使用状況を監視する
- link: /logs/log_configuration/indexes
  tag: ドキュメント
  text: ログインデックス
- link: /logs/log_configuration/archives
  tag: ドキュメント
  text: ログアーカイブ
- link: /logs/guide/reduce_data_transfer_fees
  tag: ドキュメント
  text: データ転送料金を削減しながら Datadog にログを送信する方法
- link: https://www.datadoghq.com/blog/optimize-high-volume-logs/
  tag: ブログ
  text: 可視性を損なうことなく大容量のログデータを最適化する方法
- link: https://www.datadoghq.com/blog/monitor-flex-compute-usage/
  tag: ブログ
  text: Flex Logs のコンピューティング使用状況を監視および最適化する
- link: https://www.datadoghq.com/blog/flex-logs/
  tag: ブログ
  text: Flex Logs で大量のログを効率的に保存して分析する
- link: https://learn.datadoghq.com/courses/log-indexes
  tag: ラーニングセンター
  text: インデックス化されたログのボリュームを管理および監視する
title: Flex Logs
---
## 概要 {#overview}

組織の規模が拡大するにつれて、インフラストラクチャーやアプリケーションから収集されるログの量も増加します。ログのユースケースも同様に複雑化していきます。例えば、インフラストラクチャー、アプリケーション、セキュリティツール、ネットワークなどからログを収集している場合があります。これらのユースケースにはすべて、それぞれ異なる保持期間とクエリのニーズがあります。

Flex Logs を使用すると、チームは、緊急を要するインシデント対応、セキュリティ調査、コンプライアンス監査など、各ユースケースの要件に合わせて必要なクエリ処理能力を決定できます。Flex Logs は、ストレージとコンピューティングのコストを切り離すことで、ログの長期保存を費用対効果の高い方法で実現します。

Flex ストレージの主なユースケースには、以下のようなものがあります。

- 長期監査のためのログの保持
- コンプライアンスや法規制への対応を目的としたログ保存
- セキュリティ調査のためにすべてのログが必要な場合
- 長期間にわたるカーディナリティの高いデータのレポートや分析のためのログクエリ実行

## Flex Logs を使用するタイミング {#when-to-use-flex-logs}

Datadog Log Management は、以下のソリューションを提供します。

- アプリケーションログなど、頻繁にクエリする必要があり、短期間保持するログのための Standard Indexing
- セキュリティ、トランザクション、ネットワークログなど、長期的な保持が必要でありながら、緊急時にクエリを実行する必要があるログのための Flex Logs
- 監査ログや構成ログなど、クエリの頻度は低いものの、長期保存が必要なログのための Archiving

以下の画像に示されているログタイプのスペクトルを使用して、Flex Logs ティアを使用するタイミングを判断してください。データ量が膨大、アクセス頻度が低い、あるいは長期保存が必要なログソースは、Flex Logs の利用に適しています。また、最初は Standard Indexing でログを保持し、その後 Flex Logs を使用して保持期間を延長することも可能です。これは、より長期間の保持が必要なアプリケーションログに最適なソリューションです。詳細については、「[Flex Logs ティアに直接送信できる潜在的なソース](#potential-sources-for-sending-directly-to-flex-logs)」を参照してください。

{{< img src="logs/log_configuration/flex_logging/logs-spectrum.png" alt="ログのインデックス作成とアクセス頻度のスペクトルグラフ" style="width:100%;" >}}

**注**:
- Flex Logs でモニターはサポートされていません。
- Flex Logs で Watchdog はサポートされていません。
- Flex Logs でダッシュボードはサポートされていますが、コンピュートサイズを選択する際は、これらのダッシュボードで使用されるクエリを考慮する必要があります。

## コンピュートサイズ {#compute-sizes}

コンピュートとは、Flex Logs クエリを実行するための処理能力を指します。これは、Flex Logs ティア内のログに対してクエリを実行する際に使用されます。データの取り込み時や、Standard Indexing のログのみを検索する場合には使用されません。利用可能なコンピュートティアは以下の通りです。

<div class="alert alert-danger">US3、US5、AP1、AP2、US1-FED、および US2-FED で利用可能なコンピュートサイズは、Starter、XS、および S です。</div>

- Starter
- Extra small (XS)
- Extra small plus (XS+)
- Small (S)
- Medium (M)
- Large (L)

各コンピュートティアは、その 1 つ下のティアと比較して、クエリパフォーマンスと容量が約 2 倍になります。コンピュートサイズは、同時実行クエリ数および 1 回のクエリでスキャン可能なログ数の上限によって制限されます。

### 必要なコンピュートサイズを決定する{#determine-the-compute-size-that-you-need}

コンピュートティアのクエリパフォーマンスは、いくつかの要因に依存します。

- ボリューム: Flex ティアに保存されているデータ量。
- 時間枠: クエリの時間空間。例えば、ログの 15 分間のウィンドウと 1 か月間のウィンドウの比較などです。
- 複雑さ: 実行するクエリの種類。例えば、複数レベルの集計を実行しているか、複数のフィルターを使用しているかなどです。
- 同時実行数: Flex Logs を同時にクエリしているユーザー数。

コンピュートティアを決定する際は、以下の要因を考慮してください。

- 1 日のログボリュームと、Flex ティアに保存されているログの数。
- Flex ティアのログを定期的にクエリするユーザー数。
- 実行するクエリの頻度と種類。例えば、ログをクエリする際に通常使用する時間枠などです。

Flex ティアに保存されているログの数は、データを効率的にクエリするために必要なサイズに最も大きな影響を与えます。Datadog では、ログボリュームに基づいて以下のコンピュートサイズを推奨しています。
| サイズ                                      | ボリューム(累積保存イベント数)   |
| ----------------------------------------- | ------------------------ |
| Starter                                   | 100 億未満             |
| Extra Small (XS)                          | 100 億 ～ 500 億          |
| Extra Small Plus (XS+)                    | 500 億 ～ 1000 億          |
| Small (S)                                 | 1000 億 ～ 2000 億         |
| Medium (M)                                | 2000 億 ～ 5000 億        |
| Large (L)                                 | 5000 億 ～ 1 兆 |
| [カスタマーサクセスマネージャー][7]にお問い合わせください。| 1 兆以上                      |

スケーラブルなコンピュートティア (XS、XS+、S、M、L) は、定額制で課金されます。Flex Logs Starter は、ストレージとコンピュートを組み合わせた料金体系で課金されます。詳細については、「[料金ページ][6]」を参照してください。

## Flex Logs を有効化または無効化する{#enable-and-disable-flex-logs}

Flex Logs は、組織レベルで有効化または無効化できます。これを行うには、[`flex_logs_config_write`][8] 権限が必要です。

契約に Flex Logs が含まれている場合、利用可能なコンピュートオプションが UI に表示されます。

契約に Flex Logs が含まれていない場合は、セルフサービスでのオンボーディングオプションを通じて Flex Logs Starter を有効化できます。

Flex Logs を有効にするには:
1. [Flex Logs Control][5] ページに移動します。
1. [{{< ui >}}Compute Type{{< /ui >}}] を選択します。
    - Datadog は、保存ログ数が 100 億未満の組織に対して、[{{< ui >}}Starter{{< /ui >}}] コンピュートサイズを推奨しています。
    - Datadog は、保存ログ数が 100 億 (または月間 20 億 〜 30 億) を超える組織に対して、スケーラブルなコンピュートオプション (XS、XS+、S、M、L など) を推奨しています。
1. 希望するコンピュートサイズを選択します。詳細については、「[必要なコンピュートサイズを決定する](#determine-the-compute-size-that-you-need)」を参照してください。
1. [{{< ui >}}Enable Flex Logs{{< /ui >}}] をクリックします。

### セルフサービス Flex Logs からのオフボード{#offboard-from-self-serve-flex-logs}

Flex Logs を無効にするには:

1. Flex Logs が有効になっている各インデックスから Flex Storage を削除します。
1. [Flex Logs Control][5] ページに戻ります。
1. 歯車アイコンをクリックして [{{< ui >}}Disable Flex Logs{{< /ui >}}] を選択します。

## Flex Logs コンピュートをアップグレードまたはダウングレードする{#upgrade-and-downgrade-flex-logs-compute}

Flex Logs のスケーラブルなコンピュートオプション (例: XS、XS+、S、M、または L) を選択している場合、[Flex Logs Control][5] ページでコンピュートサイズをアップグレードまたはダウングレードできます。

**注**:
- 契約に含まれるコンピュートオプションのみが利用可能です。Flex Starter からスケーラブルなコンピュートオプションにアップグレードする場合、変更は自動的には適用されません。新しいサイズを有効にするには、[Flex Logs Controls][5] ページに移動し、希望するコンピュートオプションを選択してから [{{< ui >}}Save{{< /ui >}}] をクリックします。
- コンピュートインスタンスはいつでもアップグレードできます。
- コンピュートインスタンスのダウングレードは、15 日間に 1 回可能です。

## ストレージティアを構成する{#configure-storage-tiers}

Flex Logs はログインデックス構成内で設定されます。そのインデックスに適用される[インデックスフィルター][1]は、Flex Logs にも適用されます。Flex Logs Starter では、ログを 3、6、12、または 15 か月間保存できます。スケーラブルなコンピュートオプションを使用する場合、ログを 30 ～ 450 日間保存可能です。

[Flex Logs Controls][5] ページで Flex Tier を構成します。

1. [インデックス構成][2]をクリックします。
2. Flex Logs を有効にするインデックスを編集するか、新しいインデックスを作成します。
3. [{{< ui >}}Flex Tier{{< /ui >}}] を選択し、{{< ui >}}Configure Storage Tier and Retention{{< /ui >}} の下で保持期間を設定します。

{{< img src="logs/log_configuration/flex_logging/flex_configuration.png" alt="インデックス構成内の Flex ティアストレージのオプション" style="width:100%;" >}}

**注**: 両方のティアが選択されている場合、ログは設定された保持期間が終了するまで Standard Tier に保存され、その後 Flex Tier に保存されます。例えば、保持期間 3 日の Standard Tier と保持期間 90 日の Flex Tier を選択した場合、そのインデックス内のログはまず Standard Tier に 3 日間保存され、その後残りの 87 日間は Flex Tier に保存されます。

次のテーブルは、インデックスに異なるストレージティアを追加または削除した場合の影響を説明しています。

<table>
  <tr align="center">
    <td colspan="2"><strong>既存のインデックス構成</strong></td>
    <td rowspan="2"><strong>アクション</strong></td>
    <td rowspan="2"><strong>結果</strong></td>
  </tr>
<tr align="center">
  <td><strong>Standard Tier</strong></td>
  <td><strong>Flex Tier</strong></td>
</tr>
<tr>
  <td align="center">有効</td>
  <td align="center">無効</td>
  <td>Flex Tier を有効にする。</td>
  <td>既存のログと新しいログの両方の保持期間が延長されます。</td>
</tr>
<tr>
  <td align="center">無効</td>
  <td align="center">有効</td>
  <td>Standard Tier を有効にする。</td>
  <td>Flex Tier 内の既存のログは変更されません。新しいログは Standard Tier および Flex Tier に保持されます。</td>
</tr>
<tr>
  <td align="center">有効</td>
  <td align="center">無効</td>
  <td>Flex Tier を有効にし、Standard Tier を削除する。</td>
  <td>モニターや Watchdog Insights でログのクエリを実行できなくなります。</td>
</tr>
</table>

## Flex Logs ティアを検索する{#search-flex-logs-tier}

{{< img src="logs/log_configuration/flex_logging/flex_toggle_explorer.png" alt="Log Explorer ページでオプションを切り替えて Flex Logging を有効にする" style="width:100%;" >}}

Log Explorer で {{< ui >}}Include Flex Logs{{< /ui >}} オプションを切り替えると、検索クエリの結果に Flex Tier のログが含まれるようになります。このオプションは、時間ピッカーの横にあります。

[検索][3]は、検索バーにクエリを入力するか、ファセットパネルで該当するファセットを選択することで行います。

Flex Logs クエリをダッシュボードに追加することはできますが、コンピュートサイズを選択する際には、これらのダッシュボードクエリを考慮するようにしてください。

**注**: モニタークエリは Flex Logs ではサポートされていません。

## 追加情報 {#additional-information}

### Flex Logs に直接送信できる潜在的なソース{#potential-sources-for-sending-directly-to-flex-logs}

以下のリストは、Standard Indexing を経由せずに、Flex Tier へ直接ログを送信するのに適したログソースの例です。これは網羅的なリストではなく、この構成に適したログの種類の目安を示すことを目的としています。ほかのログソース (アプリケーションログなど) であっても、リアルタイムのトラブルシューティング、アラート通知、デバッグといったユースケースのために、まず Standard Indexing を経由させてから Flex Tier へ送信することも可能です。これらのソースのユースケースはさまざまであるため、Standard Indexing をスキップするかどうかを決定する際には、その点を考慮することが重要です。

**注**: これらの例は、各カテゴリのサンプルです。Flex Tier へ直接送信するカテゴリ、サービス、ツール、テクノロジーはほかにも多数存在します。

| テクノロジー            | 例                                                                                   |
|-----------------------|--------------------------------------------------------------------------------------------|
| アーティファクト管理   | JFrog Artifactory、Archiva, Sonatype Nexus                                                 |
| 監査ログ            | Amazon Cloudtrail、Kubernetes 監査ログ, Microsoft 365 監査                              |
| CDN サービス          | Akamai、Cloudflare、Fastly, CloudFront                                                     |
| CI/CD サービス        | GitLab、GitHub Actions、Argo CD、Jenkins、CircleCI、TeamCity                                |
| DNS サービス          | Route53、Cloudflare、Akamai (Edge)、NS1                                                    |
| アイデンティティサービス     | Cisco ISE、Okta、OneLogin、Workday ユーザーアクティビティログ                                      |
| ロードバランサー         | AWS ELB、ALB、NLB (GCP および Azure フレーバー)、F5、NGINX                                       |
| ネットワークアプライアンス    | Cisco、Meraki、Juniper、Aruba、HPE、Palo Alto、Barracuda                                   |
| ネットワークサービス      | WAF、Amazon VPC Flow Logs、AWS ELB、pfSense、Tailscale                                     |
| サービスメッシュ        | Anthos、Istio、proxyv2、consul、Linkerd、Kong                                              |

### 複数組織アカウント向けの Flex Logs {#flex-logs-for-multiple-organization-accounts}

<div class="alert alert-danger">各組織は、一度に 1 つのコンピュートサイズのみを使用できます。コンピュートサイズを組織間で共有することはできません。また、Flex Starter とスケーラブルなコンピュートオプションを同じ組織内で同時に使用することはできません。</div>

Flex Logs を使用する各組織では、コンピュートサイズを有効にする必要があります。Datadog では、ログボリュームが大きい組織に対して、Flex Logs のスケーラブルなコンピュートサイズ (XS、XS+、S、M、L) を推奨しています。マルチ組織構成では、ログボリュームが少ない組織が多く存在することが多いため、そのような組織に対しては、Datadog は Flex Logs の Starter コンピュートサイズを推奨しています。

### コンピュート制限に達した場合 {#when-the-compute-limit-is-reached}

組織が同時クエリ数に関するコンピュート制限に達すると、クエリの実行速度が低下する可能性があります。これは、処理能力に空きができるまでクエリの再試行が続くためです。クエリが何度も再試行されると、実行に失敗することがあります。このような状況では、Flex Logs のコンピュート容量が不足している旨のエラーメッセージが表示され、管理者に連絡するよう促されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/indexes/#indexes-filters
[2]: https://app.datadoghq.com/logs/pipelines/indexes
[3]: https://app.datadoghq.com/logs
[4]: https://jfrog.com/help/r/jfrog-platform-administration-documentation/monitoring-and-logging
[5]: https://app.datadoghq.com/logs/pipelines/flex-logs-controls
[6]: https://www.datadoghq.com/pricing/?product=log-management#products
[7]: mailto:success@datadoghq.com
[8]: https://docs.datadoghq.com/ja/account_management/rbac/permissions/#log-management