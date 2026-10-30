---
description: Observability Pipelines プロセッサを使用してログボリュームを削減するための、ログのサンプリングやフィルタリングといった戦略について学習します。
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines
  tag: ドキュメント
  text: パイプラインをセットアップする
- link: /observability_pipelines/processors/
  tag: ドキュメント
  text: Observability Pipelines プロセッサー
title: ログボリュームを削減するための戦略
---
## 概要{#overview}

Observability Pipelines を使用すると、オンプレミスまたはクラウド環境からデータが離れる前に、ログを収集・処理し、どこへルーティングするかを決定できます。

ログの価値は一様ではありません。例えば、ライブ運用のトラブルシューティングを行う場合、情報ログよりもエラーログの方が役立つことがよくあります。本番環境からのログは、非本番環境からのログよりも重要です。したがって、すべてのログをインデックス付きソリューションにルーティングすると、データの全体的な価値が低下し、予算を超過する原因となる可能性があります。

次のような状況でも、ログ ボリュームとコストが不必要に増加することがあります:

- アプリケーション チームが誤ってデバッグログを有効にしてしまう。
- エラー ループ条件を含む新しいビルドをリリースし、エラーが大量発生します。
- Teams が他のテレメトリ ソリューションを実装するよりも簡単だと考え、ログに可能な限り多くのパフォーマンス データやメトリクス データを追加しようとします。
- ログに使用されないフィールドや値が余計に含まれています。

本ガイドでは、Observability Pipelines のプロセッサーを活用してログ ボリュームを削減する戦略を紹介し、コストを抑えつつ保存データの価値を高める方法を説明します。

## ログボリュームを削減するための戦略 {#strategies-for-reducing-your-log-volume}

次の戦略に従ってログ ボリュームを削減しましょう:

### ログをサンプリングする {#sample-your-logs}

反復的、ノイズが多い、または価値が低いとわかっている大量のログの割合を削除することで、ログの全体的なボリュームを削減します。[sample processor][1] を使用して、フィルタークエリに基づいてログのサブセットを照合し、指定した割合のログのみを保持します。これにより、可視性と分析能力を維持しながら、大量のログストリームの代表的な表示を得ることができます。

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/sample_example.png" alt="http.status_code:200 および http.method:GET のフィルタークエリに一致するログの 50% を保持するサンプルプロセッサ" style="width:100%;" >}}

### ログをフィルタリングする {#filter-your-logs}

すべてのログが価値のあるものではなく、保存する必要があるわけでもありません。例えば、非本番環境システムのデバッグログを保持することは、組織にとって重要ではない可能性が高いです。そのため、[filter processor][2] を使用してそれらのログを削除し、ログ管理ソリューションに送信されないようにします。

### ログの属性を削除する {#drop-attributes-in-your-logs}

ログには数百もの属性が含まれることがありますが、調査や分析に使用される属性は、そのうちのわずかな数であることがよくあります。[edit fields][3] プロセッサを使用して、未使用または不要な属性を破棄することでログの全体サイズを削減し、ログの取り込みコストを抑えます。

### ログを削減する {#reduce-your-logs}

システムは、1 秒あたり数百、あるいは数千ものログを出力することがあります。連結、合計、値の配列作成など、さまざまな戦略を使用してフィールドをマージし、これらのログを単一のイベントに集約します。[reduce processor][4] を使用して、選択したマージ戦略に基づき、複数のログイベントを 1 つのイベントに集約します。これにより、送信先に送信されるイベントの総数が削減されます。

### ログを重複排除する {#deduplicate-your-logs}

ログを重複排除することで、データの正確性と一貫性を維持し、ログが誤って重複してしまうような上流でのミスを防ぐことができます。[deduplication processor][5] を使用してフィールドを比較し、内容が同一であるかどうかを確認してから重複を破棄することで、ログの総量を削減します。

### クォータを実装する {#implement-quotas}

クォータを使用して、さまざまなレベルでログを管理および制御します。たとえば、詳細なレベルでは特定のアプリケーションログ (`app:xyz`) にクォータ制限を適用したり、より高いレベルでは info ログ (`status:info`) に制限を適用したりできます。これは、予算や使用要件を満たすのに役立ちます。

[クォータ プロセッサー][6]を使用して次の設定を行います。
1. フィルターを定義する: 監視対象のログを絞り込むためのフィルターを設定します。これは環境単位の高レベル フィルターでも、チーム単位の詳細フィルターでも構いません。また、複数のログ属性を組み合わせてフィルタリングすることも可能です。
1. クォータを定義する: バイト数またはイベント数に基づいてクォータを設定します。クォータを超過したログを破棄するか、あるいは上限到達時にアラートのみを受け取り、調査・対処を行うかを選択できます。

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/quota_example.png" alt="http.status_code:200 のフィルタークエリと 1 日あたり 1 TB の制限を設定したクォータプロセッサ" style="width:100%;" >}}

### ログを直接アーカイブへルーティングする {#route-your-logs-directly-to-an-archive}

Datadog で再取り込み可能な形式で、ログを独自のクラウド ストレージ（Amazon S3、Google Cloud Storage、または Azure Storage）に直接ルーティングします。その後、必要に応じてアーカイブを Datadog に再取り込みできます。詳細については、[Archive Logs][7] を参照してください。

## ログボリューム削減戦略の有力な候補 {#strong-candidates-for-log-volume-reduction-strategies}

ユーザーは、全体的なログボリュームを削減するために上記の戦略を実装しています。次のリストは、ログ削減戦略を使用する有力な候補となるログソースの例です。

- CDN
- VPC とネットワーク フロー
- Web サーバー アクティビティ
- ロードバランサー
- CI/CD サービス
- コントロールプレーン
- サービスメッシュ
- ファイアウォール
- ネットワークアプライアンス
- DNS
- デバッグログ
- 監査ログ
- 非本番環境のログ

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/processors/sample
[2]: /ja/observability_pipelines/processors/filter
[3]: /ja/observability_pipelines/processors/edit_fields
[4]: /ja/observability_pipelines/processors/reduce
[5]: /ja/observability_pipelines/processors/dedupe
[6]: /ja/observability_pipelines/processors/quota
[7]: /ja/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs