---
disable_toc: false
further_reading:
- link: /logs/log_collection/
  tag: ドキュメント
  text: ログ収集とインテグレーション
- link: data_security/logs/
  tag: ドキュメント
  text: Log Management データのセキュリティ
- link: /sensitive_data_scanner/
  tag: ドキュメント
  text: Sensitive Data Scanner
- link: /agent/configuration/dual-shipping/#yaml-configuration
  tag: ドキュメント
  text: Observability Pipelines を用いたデュアルシッピング
- link: https://www.datadoghq.com/blog/observability-pipelines-sensitive-data-redaction/
  tag: blog
  text: Observability Pipelines を使用して、オンプレミスのログから機密データをマスキング
- link: https://www.datadoghq.com/blog/observability-pipelines-dual-ship-logs/
  tag: blog
  text: Datadog Observability Pipelines によるログのデュアルシッピング
- link: https://www.datadoghq.com/blog/observability-pipelines-log-volume-control/
  tag: blog
  text: Datadog Observability Pipelines でログボリュームを制御
- link: https://www.datadoghq.com/blog/observability-pipelines-archiving/
  tag: blog
  text: Observability Pipelines でログをアーカイブし、Datadog への移行をシンプルかつ低コストで実現
- link: https://www.datadoghq.com/blog/observability-pipelines/
  tag: blog
  text: Datadog Observability Pipelines でログを簡単に集計、処理、ルーティング
title: Observability Pipelines（観測データの制御）
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines は、US1-FED Datadog サイトでは使用できません。</div>
{{< /site-region >}}

<div class="alert alert-info">
Datadog は、Observability Pipelines Worker (OPW) を、すべてのマイナーリリースおよびパッチリリースごと、または最低でも月次で更新することを推奨しています。<br><br>OPW の最新の機能、修正、およびセキュリティアップデートを入手するための唯一のサポートされている方法は、OPW をメジャーバージョンにアップグレードし、常に最新の状態に保つことです。
</div>

## 概要

{{< img src="observability_pipelines/op_marketecture_04182024.png" alt="左側のさまざまなデータソースが、transform、reduce、route という 3 つの六角形に流れ込み、変更されたデータのさまざまな宛先を矢印で示すグラフィック" style="width:100%;" >}}

Observability Pipelines を使用すると、独自のインフラストラクチャーでログを収集、処理、ルーティングできます。すぐに使える[テンプレート](#start-building-pipelines-with-out-of-the-box-templates)が提供されているため、簡単にパイプラインを構築してデプロイできます。

Observability Pipelines Worker は、インフラストラクチャー上で動作するソフトウェアで、ユースケースに基づいてログを一元的に集計、処理、ルーティングします。これにより、ログが環境を離れる前に機密データのマスキングやログの前処理を行ったり、ログの宛先を決定したりすることができます。

Observability Pipelines UI は、Observability Pipelines Worker を管理するためのコントロールプレーンを提供し、パイプラインの構築や編集、パイプラインの変更の Worker へのデプロイが可能です。また、すぐに使えるモニターを有効にして、パイプラインの健全性を評価することもできます。

## 詳細はこちら

パイプラインをセットアップするには

1. [Observability Pipelines][1] に移動します。
1. テンプレートを選択します。
    - [ログボリュームコントロール][2］
    - [ログのデュアルシッピング][3]
    - [ログの分割][4］
    - [Datadog アーカイブにログをアーカイブ][5]
    - [機密データのマスキング][6］
    - [ログエンリッチメント][7］
1. Select and set up your [source][10].
1. Select and set up your [destinations][11].
1. Set up you [processors][12].
1. Observability Pipelines Worker をインストールします。
1. パイプラインのモニターを有効にします。

詳細については、[パイプラインのセットアップ][8]を参照してください。

ブートストラップオプションや Kubernetes での Worker のセットアップの詳細については、[高度な構成][9]を参照してください。

## Observability Pipelines の探索

### すぐに使えるテンプレートでパイプラインを構築

{{< img src="observability_pipelines/templates.png" alt="6 つのテンプレートを表示する Observability Pipelines UI" style="width:100%;" >}}

[テンプレート](#out-of-the-box-templates)は以下のユースケースを想定して作られています。

#### ログボリューム制御

生ログはノイズが多く、調査時の検索や分析に有用なものは限られています。 Log Volume Control テンプレートを使用して、SIEM やログ管理ソリューションなどのインデックス化ソリューションに送信するログを決定することで、インデックス化されたログの価値を高め、予算内に収めることができます。

#### デュアルシップログ

組織が成長するにつれて、セキュリティ、アーカイブ、ログ管理など、さまざまなユースケースに対する可観測性のニーズも変化します。これにより、異なるアーカイブ、SIEM、ログ管理ソリューションを試す必要が生じるかもしれません。しかし、異なるソリューションへのログパイプラインの管理は複雑になる可能性があります。Dual Ship Logs テンプレートを使用すれば、ログを一元的に集計、処理し、異なる宛先へコピーを送信することで、この管理を簡素化できます。

#### アーカイブログ

Archive Logs テンプレートを使用して、ログをクラウドストレージソリューション (Amazon S3、Google Cloud Storage、または Azure Storage) に保存します。アーカイブされたログは Datadog で再利用可能な形式で保存されるため、必要に応じて Datadog で再利用できます。これは、以下の場合に有用です。

- 大量のノイズを含むログがあっても、調査のために随時 Datadog Log Management でインデックス化が必要な場合
- Datadog Log Management への移行中で、移行完了後に履歴ログを保持したい場合
- コンプライアンス要件を満たすために保持ポリシーがあるが、それらのログを必ずしもインデックス化する必要がない場合

#### ログの分割

異なるサービスやアプリケーションから生成されたログを、クエリ、分析、アラートのために異なるダウンストリームサービスに送信する必要がある場合。例えば、セキュリティログを SIEM ソリューションに、DevOps ログを Datadog に送信したい場合です。Split Logs テンプレートを使用して、ログを宛先ごとに個別に前処理してから送信します。

#### 機密データのマスキング

Sensitive Data Redaction テンプレートを使用して、オンプレミスで機密情報を検出しマスキングします。Observability Pipelines の機密データスキャナプロセッサは、70 のすぐに使えるスキャンルールを提供しますが、正規表現を使用して独自のカスタムスキャンルールを作成することも可能です。すぐに使えるルールは、クレジットカード番号、メールアドレス、IP アドレス、API キー、SSH キー、アクセストークンなどの標準的なパターンを認識します。

#### ログエンリッチメント

組織内のさまざまなサービス、システム、アプリケーションは、多層の情報を含むログを異なる形式で生成します。これにより、調査時に必要なデータを検索・分析する際に、データの抽出が難しくなることがあります。 Log Enrichment テンプレートを使用して、ログを標準化し、リファレンステーブルなどの情報で充実化します。

### Observability Pipelines UI でパイプラインを構築する

{{% observability_pipelines/use_case_images/log_volume_control %}}

Observability Pipelines UI でパイプラインを構築します。すぐに使えるテンプレートを選択すると、オンボーディングワークフローがソース、プロセッサ、宛先のセットアップをガイドします。インストールページでは、Docker、Kubernetes、Linux、または CloudFormation を用いた環境での Worker のインストール方法が説明されています。

### パイプラインコンポーネントのすぐに使えるモニターを有効にする

パイプライン作成後、すぐに使えるモニターを有効にして、次の場合にアラートを受け取れるようにします、

- コンポーネントのエラー率が増加している場合。これは、予期しない形式のデータ処理が原因で発生することがあります。
- Observability Pipelines Worker の CPU 使用率やメモリ使用率が高い場合。
- コンポーネントによってデータが急激にドロップされている場合。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/log_volume_control/
[3]: /ja/observability_pipelines/dual_ship_logs/
[4]: /ja/observability_pipelines/split_logs/
[5]: /ja/observability_pipelines/archive_logs/
[6]: /ja/observability_pipelines/sensitive_data_redaction/
[7]: /ja/observability_pipelines/log_enrichment/
[8]: /ja/observability_pipelines/set_up_pipelines/
[9]: /ja/observability_pipelines/advanced_configurations/
[10]: /ja/observability_pipelines/sources/
[11]: /ja/observability_pipelines/destinations/
[12]: /ja/observability_pipelines/processors/