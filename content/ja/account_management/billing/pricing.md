---
title: Pricing
further_reading:
- link: "https://www.datadoghq.com/pricing"
  tag: Pricing
  text: Datadog Pricing
---

Datadog では、ニーズに合わせてさまざまな料金プランをご用意しています。詳細については[料金][1]ページをご確認ください。注文書に特に記載のない限り、Datadog の料金は、カレンダー月ごとの製品の使用状況に基づいて計算されます。最も一般的な価格単位を以下に記載しました。

## インフラストラクチャーの監視

* **ホスト**は、物理または仮想のオペレーティングシステムインスタンスです。Datadog では、お客様がインフラストラクチャーサービスで監視しているホストのユニーク数を 1 時間ごとに記録します。
  * Datadog の最高水準プラン (HWMP) では、月末にこの 1 時間ごとの測定結果が最高から最低まで順序付けられ、そのうち 9 番目に高い測定値に基づいて課金されます。2 月は例外で、Datadog は 8 番目に高い測定値に基づいて課金します。
  * 月単位/時間単位混合プラン (MHP) では、月単位の最低契約量に対して課金され、ホスト数がその契約量を超えた時間については、時間単位の料金が課金されます。
* **コンテナ**は、アプリケーションソフトウェアと限定的なオペレーティングシステムライブラリおよび設定からなる自己完結型のオペレーティング環境です。5 分ごとに 1 回、Datadog は、お客様が Datadog インフラストラクチャーサービスで監視している一意のコンテナ数を記録します。監視されたコンテナの時間数 (端数を含む) に基づいて月単位で課金されます。
* [**カスタムメトリクス**][2]とは、メトリクス名、ホスト ID、任意のタグからなる単一かつ一意の組み合わせです。1 時間に Datadog インフラストラクチャーサービスに送信されたユニークカスタムメトリクス数の月平均に基づいて課金されます。
* **デバイス**は、1 フレーム内の 1 つ以上のシングルボードコンピューターで構成される物理センサーです。お客様が Datadog インフラストラクチャーサービスで同時に監視しているデバイス数およびホスト数を記録し、それに対して課金されます。
* AWS **Fargate タスク**は、AWS の ECS コンテナオーケストレーションプラットフォームを通じてセットアップされたコンテナのコレクションです。Datadog は、お客様が Datadog インフラストラクチャー (または APM) サービスで監視しているタスクインスタンス数を 5 分間隔で記録します。月末にこの間隔に基づく測定値を集計し、アプリケーションが実行されて監視された合計時間数に基づいて課金されます。

## APM

* ホスト ([インフラストラクチャーモニタリング](#infrastructure-monitoring)で定義) 上で動作するアプリケーションがトレースを生成して Datadog SaaS アプリケーションに送信すると、Datadog はそのホストを 1 つの **APM ホスト**とカウントします。
  * On a high watermark plan (HWMP), the hourly measurements are ordered from highest to lowest at the end of the month, and Datadog charges based on the ninth highest measurement. The month of February is an exception and Datadog charges based on the ninth highest measurement.
  * 月単位/時間単位混合プラン (MHP) では、月単位の最低契約量に対して課金され、ホスト数がその契約量を超えた時間については、時間単位の料金が課金されます。
* **Indexed Span** は、スタック内の個々のサービスに対する個別のリクエストです。Datadog APM 内の[保持フィルター][3]によりインデックス化されたスパンの合計数に基づき課金されます。
* **Ingested Span** は、スタック内の個々のサービスに対する個別のリクエストです。Datadog APM に取り込まれたスパンのギガバイトの総数に基づき課金されます。

Indexed Span のボリュームと Ingested Span のボリュームの両方にコントロールを配置できます。詳細については、[トレースの取り込み][4]と[保持][5]のドキュメントを参照してください。

## Database Monitoring

* Datadog は、お客様が Datadog データベースモニタリングで監視しているデータベースのユニークホスト数を 1 時間ごとに記録します。
  * Datadog の最高水準プラン (HWMP) では、月末にこの 1 時間ごとの測定結果が最高から最低まで順序付けられ、そのうち 9 番目に高い測定値に基づいて課金されます。2 月は例外で、Datadog は 8 番目に高い測定値に基づいて課金します。
  * 月単位/時間単位混合プラン (MHP) では、月単位の最低契約量に対して課金され、ホスト数がその契約量を超えた時間については、時間単位の料金が課金されます。
* Datadog は、任意の時点で追跡されている構成された[正規化クエリ][6]の総数に基づいて課金します。

## ログ管理

* **ログ**は、オペレーティングシステム、アプリケーション、または他のソースによって生成されたテキストベースのアクティビティの記録です。Datadog ログサービスに送信されたギガバイトの合計数に基づいて、収集されたログに対して課金されます。
* **ログイベント**は、Datadog ログサービスによってインデックス化された 1 つのログです。お客様が選択した保持ポリシーに指定されている料金で、インデックス化のために送信されたログイベントの 100 万個ごとに課金されます。

## Cloud SIEM

* **分析ログ**は、オペレーティングシステム、アプリケーション、または潜在的なセキュリティの脅威を検出するために分析された他のソースによって生成されたアクティビティのテキストベースの記録です。Datadog Cloud SIEM サービスによって取り込みおよび分析されたギガバイトの合計数に基づいて、分析ログに課金されます。

## Synthetic モニタリング

* **API テスト**は、1 つの URL に対する 1 回の HTTP または HTTPS リクエストです。Datadog Synthetic モニタリングサービスに対して実行された API テストランの 1 万回ごとに課金されます。
* **ブラウザテスト**は、仮想ウェブブラウザを使用してウェブベースアプリケーションでスクリプトを使用して実行する連続したユーザーアクションのシミュレーションです。Datadog Synthetic モニタリングサービスに対して実行されたブラウザテスト 1,000 回ごとに
 課金されます。

## ネットワークパフォーマンス監視

* Datadog は、お客様が Datadog NPM サービスで同時に監視している**ネットワークパフォーマンスモニタリング** (NPM) ホストのユニーク数を 1 時間ごとに記録します。
  * These hourly measurements are ordered from highest to lowest at the end of the month, and Datadog charges based on the ninth highest measurement. The month of February is an exception and Datadog charges based on the eighth highest measurement.
* さらに、Datadog は、すべての NPM ホストによって使用されるフローの合計数を月ごとに測定します。**フロー**とは、 送信元 (IP:Port) と送信先 (IP:Port) の間で送受信されるトラフィックを5 分間にわたり測定した記録です。

## Real User Monitoring

* **セッション**とは、ウェブアプリケーションでユーザーが行う操作 (カスタマージャーニー) です。15 分間操作が行われない、または 4 時間以上継続して操作が行われるとセッションは無効になります。

* Datadog は、エンドユーザーが訪問したすべてのページを、読み込みリソース (XHR、イメージ、CSS ファイル、JS スクリプト等)、フロントエンドエラー、長時間のタスクなど、重要なテレメトリーと一緒に収集します。これらはすべてユーザーセッションに含まれるデータです。Datadog リアルユーザーモニタリング (RUM) サービスで収集されたセッション 1,000 件ごとに課金されます。

## Continuous Profiler

* Datadog は、お客様が Datadog Continuous Profiler サービスで同時に監視している一意の Continuous Profiler ホストの数を 1 時間に一度記録します。
  * These hourly measurements are ordered from highest to lowest at the end of the month, and Datadog charges based on the ninth highest measurement. The month of February is an exception and Datadog charges based on the eighth highest measurement.
  * 各ホストには、最大 4 つのプロファイルコンテナが無料で許可されます。これを超えるコンテナの価格は、コンテナあたり 2 ドルになります。
    **注**: この割り当てはすべてのホストで集計されるため、すべてのホストのコンテナが平均して 4 つになる場合、ホストごとに追加があるとして課金されることはありません。
* Datadog はプロファイリングされているコンテナの総数を測定します。コンテナは、アプリケーションソフトウェアと限定的なオペレーティングシステムライブラリおよび設定からなる自己完結型のオペレーティング環境です。5 分ごとに 1 回、Datadog は、Datadog Continuous Profiler サービスで監視している一意のコンテナの数を記録します。Datadog は、監視対象のコンテナの端数時間に基づいて毎月課金します。Continuous Profiler では、Datadog は、Continuous Profiler サービスを実行しているコンテナのみをカウントして、監視対象のコンテナの総数を求めます。

## Incident Management

* Datadog は、インシデントの管理と対応に参加する月間アクティブユーザーの数を追跡します。
 * インシデントにコメントやシグナル（グラフ、リンクなど）を送信して貢献したユーザーのみが **アクティブユーザー** としてカウントされます。インシデントを開く/閉じる、または表示しただけのユーザーはカウントされません。また、名前は必要ないため、アクセス権のあるユーザーを特定する必要はありません。

## CI Visibility

* Datadog は、CI Visibility サービスにテストとパイプラインのデータを送信する一意のコミッターの数を追跡します。
* **コミッター**とは、アクティブな git コミッターのことで、git 作成者のメールアドレスで識別されます。コミッターは、ある月に少なくとも 3 回コミットすれば課金対象としてカウントされます。
  * パイプラインが git リポジトリに関連付けられていない場合や、git メタデータが利用できない場合、パイプライン実行のトリガーとなった人のユーザー名が請求可能なコミッターとして使用されます。
* Pipeline Visibilityでは、すべてのパイプライン、パイプラインステージ、パイプラインジョブが**パイプラインスパン**としてカウントされます。Testing Visibilityでは、個々のテスト実行が 1 つの**テストスパン**としてカウントされます。

## トラブルシューティング

技術的な質問については、[Datadog サポートチーム][7]にお問い合わせください。

アカウントの 1 時間ごとの料金または請求については、[セールス][8]または[カスタマーサクセス][9]マネージャーにお問い合わせください。

[1]: https://www.datadoghq.com/pricing
[2]: /metrics/custom_metrics/
[3]: /tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /tracing/trace_pipeline/ingestion_controls/
[5]: /tracing/trace_pipeline/trace_retention/
[6]: /database_monitoring/data_collected/#normalized-queries
[7]: /help/
[8]: mailto:sales@datadoghq.com
[9]: mailto:success@datadoghq.com
