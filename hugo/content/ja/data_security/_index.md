---
cascade:
  algolia:
    rank: 70
further_reading:
- link: /data_security/logs/
  tag: ドキュメント
  text: Logs のデータセキュリティ
- link: /data_security/agent/
  tag: ドキュメント
  text: Agent のデータセキュリティ
- link: /data_security/synthetics/
  tag: ドキュメント
  text: Synthetic モニタリングのデータセキュリティ
- link: /tracing/configure_data_security/
  tag: ドキュメント
  text: トレースのデータセキュリティ
- link: /data_security/real_user_monitoring/
  tag: ドキュメント
  text: RUM のデータセキュリティ
- link: /session_replay/privacy_options?platform=browser
  tag: ドキュメント
  text: セッションリプレイのプライバシーオプション
- link: /security/sensitive_data_scanner/
  tag: ドキュメント
  text: Sensitive Data Scanner
title: データ関連リスクの低減
---
<div class="alert alert-info">このページでは、Datadog に送信されるデータを保護するためのツールとセキュリティについて説明します。クラウドおよびアプリケーションの Security 製品や機能をお探しの場合は、<a href="/security/" target="_blank">Security</a> セクションを参照してください。</div>

Datadog を意図したとおりに通常利用する過程で、お客様は Datadog にデータを送信します。Datadog は、お客様が送信するデータを適切に制限するためのツールを提供し、送信中および送信後のデータを保護することで、データリスクの低減にお客様とともに取り組みます。

また、[Datadog セキュリティ][1]で公開されている情報、および当社の[プライバシーポリシー][2]の条件もご確認ください。

## お客様から Datadog へのデータの流れ {#how-data-gets-from-you-to-datadog}

Datadog では、Agent、[DogStatsD][3]、パブリック API、インテグレーションなど、複数の方法で Datadog にデータを送信できます。さらに、Real User Monitoring SDK および APM SDK は、お客様のアプリケーションやサービスのコードに基づいてデータを生成し、Datadog に送信します。

Datadog が提供するツールを介して転送されるデータは、TLS および HSTS で保護されています。Datadog によって保存されるデータは、暗号化、アクセス制御、および認証によって保護されています。詳細については、[Datadog Security][1] を参照してください。

### Datadog Agent {#the-datadog-agent}

Agent は、お客様のシステムから Datadog にデータを送信するための主要なチャネルです。[Agent におけるデータセキュリティ対策の詳細については、こちらをご覧ください][4]。

Agent のコンフィギュレーションファイルに平文でシークレットを保存しない方法については、[シークレット管理][5]を参照してください。

### サードパーティサービスとのインテグレーション {#third-party-services-integrations}

一部のサードパーティサービスとのインテグレーションは Datadog 上で直接構成されます。Datadog がお客様に代わってサービスに接続できるようにするため、認証情報の提供が必要になる場合があります。提供された認証情報は暗号化され、Datadog の安全な認証情報データストアに保存されます。

これらのインテグレーションを介したすべてのデータは、Datadog のシステム内で保存されている間も、転送中も暗号化されます。安全な認証情報データストアへのアクセスは制御および監査されており、サードパーティサービス内の特定のサービスやアクションへのアクセスは、必要なもののみに制限されています。異常な動作を検知するツールが、不正アクセスを継続的に監視しています。メンテナンス目的での Datadog 従業員のアクセスは、選定された一部のエンジニアのみに制限されています。

### クラウドインテグレーション {#cloud-integrations}

機密性を考慮し、クラウドプロバイダーとのインテグレーションでは、アクセス許可を限定した Datadog 専用の資格情報を使用するなど、可能な限り追加のセキュリティ対策が実施されます。例:

* [Amazon Web Services][6] とのインテグレーションでは、[AWS IAM ベストプラクティスガイド][7]に従い、AWS IAM を使用してロール委任を構成し、AWS ポリシーを使用して特定のアクセス許可を付与する必要があります。
* [Microsoft Azure][8] とのインテグレーションでは、Datadog のテナントを定義し、特定のアプリケーションへのアクセスには、監視するサブスクリプションに対して "reader" ロールのみを付与します。
* [Google Cloud Platform][9] とのインテグレーションでは、Datadog のサービスアカウントを定義し、"Compute Viewer" および "Monitoring Viewer" ロールのみを付与します。

## データリスクを低減するために実施できる対策 {#measures-you-can-implement-to-reduce-your-data-risk}

Datadog の目的は、インフラストラクチャーやサービス周辺のさまざまなソースから監視可能性情報を収集し、分析や調査のために 1 か所にまとめることです。これには、お客様がさまざまな種類のデータコンテンツを Datadog のサーバーに送信することが含まれます。Datadog 製品を本来の用途で使用するために収集されるデータのほとんどには、プライベートデータや個人データが含まれる可能性はほとんどありません。不要なプライベートデータや個人データが含まれる可能性のあるデータについては、Datadog と共有するデータからそれらを除去、難読化するなどして、プライベートデータや個人データの含有を減らせるよう、手順、ツール、推奨事項を提供しています。

### Sensitive Data Scanner {#sensitive-data-scanner}

Sensitive Data Scanner は、機密データを識別、タグ付けし、必要に応じてマスクまたはハッシュ化するために使用できる、ストリームベースのパターンマッチングサービスです。これを導入することで、セキュリティチームやコンプライアンスチームは、機密データが組織外に漏洩するのを防ぐための防衛線を構築できます。スキャナーの詳細および設定方法については、[Sensitive Data Scanner][10] を参照してください。

### Log Management {#logs-management}

ログは、システムやサービス、およびその内部で発生するアクティビティによって生成される記録です。ログデータのフィルタリングや難読化の方法など、Log Management のデータセキュリティに関する考慮事項については、[Log Management Data Security][11] を参照してください。

ログデータの制御について詳しくは、[機密ログデータへのアクセス管理][12]ガイドと[ログのための Agent の高度な構成][13]を参照してください。

ログデータのセキュリティに関するリスクを低減するための重要なアプローチは、アクセス制御です。Datadog でこれを行う方法については、[ログの RBAC を設定する方法][14]および[ログの RBAC 権限][15]を参照してください。

### ライブプロセスとコンテナ {#live-processes-and-containers}

ライブプロセスやライブコンテナを監視する際に機密データが漏洩するのを防ぐため、Datadog はプロセス引数および Helm チャート内の機密キーワードのスクラブをデフォルトで提供しています。[`custom_sensitive_words`設定][16]を使用してプロセスコマンドや引数内の追加の機密シーケンスを難読化したり、[`DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS`環境変数][17]を使用してコンテナのスクラブワードリストに追加したりできます。

### APM およびその他の SDK ベースの製品 {#apm-and-other-sdk-based-products}

Datadog SDK は、アプリケーション、サービス、テスト、パイプラインをインスツルメントし、Agent を介してパフォーマンスデータを Datadog に送信するために使用されます。トレースおよびスパンデータ (その他多数のデータを含む) は、以下の製品で使用するために生成されます。

- Application Performance Monitoring (APM)
- Continuous Profiler
- CI Visibility
- App and API Protection

トレーシングライブラリのソースデータの管理方法、デフォルトの基本的なセキュリティ設定、トレース関連要素のカスタム難読化、スクラビング、除外、および変更についての詳細情報は、[トレースデータのセキュリティのための Agent とトレーサーの構成][18]を参照してください。

### サーバーレス分散型トレーシング {#serverless-distributed-tracing}

Datadog を使用して、AWS Lambda 関数の JSON リクエストおよびレスポンスペイロードを収集し、可視化できます。リクエストやレスポンスの JSON オブジェクト内の機密データ (アカウント ID やアドレスなど) が Datadog に送信されないようにするには、特定のパラメーターをスクラブして Datadog に送信されないようにできます。詳細については、[AWS Lambda ペイロードコンテンツの難読化][19]を参照してください。

### Synthetic Monitoring {#synthetic-monitoring}

Synthetic テストは、世界中のテスト拠点からリクエストやビジネストランザクションをシミュレートします。構成、アセット、結果、資格情報の暗号化に関する考慮事項、およびテストのプライバシーオプションの使用方法については、[Synthetic Monitoring Data Security][20] を参照してください。

### RUM & Session Replay {#rum-session-replay}

個人を特定できる情報を保護し、収集する RUM データをサンプリングするために、ブラウザで Real User Monitoring が収集するデータを変更できます。詳しくは、[RUM データとコンテキストの変更][21]を参照してください。
 
Session Replay のプライバシーオプションは、デフォルトでエンドユーザーのプライバシーを保護し、重要な組織情報が収集されるのを防ぐように設定されています。Session Replay での要素のマスキング、オーバーライド、非表示については、[Session Replay Privacy Options][22] を参照してください。Session Replay のマスキングは永続的です: マスクされた値はデバイスから送信されることはなく、後でマスクを解除することもできません。これは、取り込み時に一致する値を難読化し、`Data Scanner Unmask` 権限を持つユーザーが元の値を表示できる [Sensitive Data Scanner Mask アクション][26] とは異なります。

### Database Monitoring {#database-monitoring}

Database Monitoring Agent は、Datadog インテークに送信されるすべてのクエリバインドパラメーターを難読化します。そのため、データベースに保存されているパスワード、PII (個人を特定できる情報)、およびその他の潜在的に機密性の高い情報は、クエリメトリクス、クエリサンプル、または実行計画では表示されません。データベースパフォーマンスモニタリングに関与するその他の種類のデータのリスク軽減については、[Database Monitoring Data Collected][23] を参照してください。

## その他の潜在的な機密データのソース {#other-sources-of-potentially-sensitive-data}

自動的にスクラブ、難読化、またはその他の方法で収集を回避できる機密データに加えて、Datadog が収集するデータの多くは、物事の名前や説明です。送信するテキストにプライベート情報や個人情報を含めないことを推奨します。製品を意図した用途で使用する際に Datadog に送信するテキストデータの、以下の (網羅的ではない) リストを確認してください。

メタデータとタグ
: メタデータは主に `key:value` 形式の[タグ][24]で構成されます (例: `env:prod`)。メタデータは、Datadog がデータをフィルタリングおよびグループ化して、有意義な情報を導き出すために使用されます。

ダッシュボード、ノートブック、アラート、モニター、アラート、インシデント、SLO
: Datadog で作成するものに付けるテキストの説明、タイトル、名前はデータです。

メトリクス
: メトリクスには、インフラストラクチャーメトリクス、インテグレーションから生成されたメトリクス、およびログ、トレース、RUM、Synthetic テストなどのその他の取り込みデータが含まれ、グラフへの入力に使用される時系列です。通常、関連するタグが付いています。

APM データ
: APM データには、サービス、リソース、プロファイル、トレース、スパン、および関連するタグが含まれます。それぞれの説明については、[APM 用語集][25]を参照してください。

データベースクエリのシグネチャ
: データベース監視データは、メトリクスとサンプル、およびそれらに関連付けられたタグで構成されており、Agent によって収集され、正規化されたクエリの過去のパフォーマンスを追跡するために使用されます。このデータの粒度は、正規化されたクエリシグネチャと一意のホスト識別子によって定義されます。すべてのクエリパラメーターは、Datadog に送信される前に、収集されたサンプルから難読化され、破棄されます。

プロセス情報
: プロセスは、メトリクスと `proc` ファイルシステムからのデータで構成されており、これはカーネル内のデータ構造へのインターフェースとして機能します。プロセスデータには、プロセスコマンド (パスと引数を含む)、関連付けられたユーザー名、プロセスとその親の ID、プロセス状態、および作業ディレクトリが含まれる場合があります。プロセスデータには、通常、関連付けられたタグのメタデータも含まれます。

イベントとコメント
: イベントデータは、トリガーされたモニター、インテグレーションによって送信されたイベント、アプリケーション自体によって送信されたイベント、ユーザーまたは API を通じて送信されたコメントなど、複数のソースから集約され、統合されたビューにまとめられます。イベントとコメントには、通常、関連するタグのメタデータがあります。

Continuous Integration パイプラインとテスト
: ブランチ、パイプライン、テスト、テストスイートの名前はすべて、Datadog に送信されるデータです。

### 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/security/
[2]: https://www.datadoghq.com/legal/privacy/
[3]: /ja/extend/dogstatsd/
[4]: /ja/data_security/agent/
[5]: /ja/agent/configuration/secrets-management/
[6]: /ja/integrations/amazon_web_services/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[8]: /ja/integrations/azure/
[9]: /ja/integrations/google_cloud_platform/
[10]: /ja/security/sensitive_data_scanner/
[11]: /ja/data_security/logs/
[12]: /ja/logs/guide/manage-sensitive-logs-data-access/
[13]: /ja/agent/logs/advanced_log_collection
[14]: /ja/logs/guide/logs-rbac
[15]: /ja/logs/guide/logs-rbac-permissions
[16]: /ja/infrastructure/process/#process-arguments-scrubbing
[17]: /ja/infrastructure/livecontainers/configuration/#scrubbing-sensitive-information
[18]: /ja/tracing/configure_data_security/
[19]: /ja/serverless/distributed_tracing/collect_lambda_payloads#obfuscating-payload-contents
[20]: /ja/data_security/synthetics/
[21]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/
[22]: /ja/session_replay/privacy_options?platform=browser
[23]: /ja/database_monitoring/data_collected/#sensitive-information
[24]: /ja/getting_started/tagging/
[25]: /ja/tracing/glossary/
[26]: /ja/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action