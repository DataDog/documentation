---
aliases:
- /ja/observability_pipelines/guide/upgrade_worker_2_7/
description: Worker バージョン 2.7 から 2.21 までの新機能、機能強化、修正について説明します。
disable_toc: false
title: Worker のアップグレードガイド
---
## 概要{#overview}

<div class="alert alert-info">
Datadog では、マイナーリリースおよびパッチリリースごとに Observability Pipelines Worker (OPW) を更新すること、または最低でも月に一度は更新することを推奨しています。<br><br> OPW の最新のメジャーバージョンにアップグレードして最新の状態に保つことが、新しい OPW 機能、修正、およびセキュリティアップデートを利用するためにサポートされている唯一の方法です。
</div>

このガイドでは、特定の Worker バージョンへのアップグレード方法と、そのバージョンの更新情報について説明します。

## Worker バージョン 2.21.0 {#worker-version-2210}

Worker バージョン 2.21.0 にアップグレードするには、以下の手順に従います。

- Docker: [2.21.0 イメージ][54] に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.21.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.21.0` を実行します。

Worker バージョン 2.21.0 では、以下を利用できます。

#### 新機能 {#new-features}

- Datadog Archives の送信先 (Amazon S3、Google Cloud Storage、および Azure Blob Storage) で、構成可能な `compression` オプション (`gzip` または `zstd`) がサポートされました。
- Remap to OCSF プロセッサーに以下の機能が含まれました。
    - AWS Config Rules OCSF マッピング。
    - 複数のソースフィールドまたは定数値の文字列表現を結合する OCSF マッピング関数 `concat_strings`。
- Splunk HEC 送信先で、イベントの送信先となる Splunk HEC エンドポイントを決定するための `endpoint_target` オプション (`event` または `raw`) がサポートされました。

#### 機能強化 {#enhancements}

- Splunk TCP ソースで、TCP キープアライブと接続数の制限の構成がサポートされました。
- Worker の内部ログとトレースがパイプライン名 (`op_worker.pipeline_name:<pipeline_name>`) でエンリッチされるようになりました。これにより、メトリクスにすでに存在するタグと一致します。
- 正常なシャットダウン時の Worker のロギングが向上しました。
- 送信先エンドポイントの検証が向上し、不完全な URL や空の URL がチェックされるようになりました。
- カスタムプロセッサーの `parse_aws_vpc_flow_log` 関数は、Amazon VPC Flow Logs バージョン 7 ～ 11 で導入されたすべてのフィールドを認識するようになりました。このフィールドには以下のものがあります。
    - バージョン 7: ECS メタデータフィールド
    - バージョン 8: `reject_reason`
    - バージョン 9: `resource_id`
    - バージョン 10: `encryption_status`
    - バージョン 11: タグ、インターフェイス、およびネクストホップフィールド
- Enrichment Table プロセッサーは、以下の動作を行うようになりました。
    - ルックアップで一致が見つかったかどうかにかかわらず、行を約 30 分間キャッシュに保持する。
    - このプロセッサーが生成するイベントを、ソースの送信元のバッチサイズに基づいてバッチに分割する。

#### 修正 {#fixes}

- UTF-8 テキストを含む検索クエリでの大文字と小文字を区別しないグロブマッチングを修正しました。この問題は、非 ASCII 入力でパニックが発生したり、誤った結果が返されたりする状況を引き起こしていました。
- アカウントキーの接続文字列を使用するときの Azure Blob Storage への 4 MiB を超えるアップロードを修正しました。
- レコードがバッファの最大レコードサイズを超えた場合に発生していた回復不能な Worker エラーを修正しました。このエラーはログに記録され、`buffer_discarded_events_total` および `buffer_discarded_bytes_total` 健全性メトリクス (`intentional="false"` を含む) に反映されるようになりました。

## Worker バージョン 2.20.4 {#worker-version-2204}

Worker バージョン 2.20.4 にアップグレードするには、以下の手順に従います。

- Docker: [2.20.4 イメージ][53]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.20.4` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.20.4` を実行します。

Worker バージョン 2.20.4 では、以下を利用できます。

#### 修正 {#fixes-1}

- Splunk TCP ソースでは、以前はハードコードされた最大フレーム長として 10,000 バイトが適用されていました。Worker はこれよりも大きなイベントを拒否し、警告をログに記録していました。このソースでは、デフォルトでフレーム長が制限されなくなりました。無制限なメモリ消費の増加を防ぐには、`DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH` 環境変数を使用して最大フレーム長を設定します。




## Worker バージョン 2.20.3 {#worker-version-2203}

Worker バージョン 2.20.3 にアップグレードするには、以下の手順に従います。

- Docker: [2.20.3 イメージ][52]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.20.3` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.20.3` を実行します。

Worker バージョン 2.20.3 では、以下を利用できます。

#### 修正 {#fixes-2}

- OpenTelemetry ソースの gRPC リスナーが修正され、TLS が有効な場合に ALPN 経由で`h2`をアドバタイズするようになりました。以前は、TLS 経由で接続する gRPC クライアントが接続を確立できないことがありました。

## Worker バージョン 2.20.2 {#worker-version-2202}

Worker バージョン 2.20.2 にアップグレードするには、以下の手順に従います。

- Docker: [2.20.2 イメージ][51]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.20.2` を実行します。
- RPM: コマンド`sudo yum install observability-pipelines-worker-2.20.2` を実行します。

Worker バージョン 2.20.2 では、以下を利用できます。

#### 修正 {#fixes-3}

- 非有限 (NaN または Infinity) のゲージ値、カウンターデルタ値、ヒストグラムデルタサム値、およびゼロカウントヒストグラムが、不正な形式の OTLP メトリクスペイロードにシリアル化される可能性がある問題を修正しました。これらの値は、OTLP エンコーディングの前に破棄されるようになりました。




## Worker バージョン 2.20.0 {#worker-version-2200}

Worker バージョン 2.20.0 にアップグレードするには、以下の手順に従います。

- Docker: [2.20.0 イメージ][50]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.20.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.20.0` を実行します。

Worker バージョン 2.20.0 では、以下を利用できます。

#### 新機能 {#new-features-1}

- OpenTelemetry ソースおよび Splunk HEC ソースが TLS 証明書のホットリロードをサポートしました。これにより、Worker を再起動することなく証明書のローテーションが適用されます。

#### 機能強化 {#enhancements-1}

- Split Array プロセッサーのパフォーマンスが向上しました。
- 認証トークンの構成時に、HTTP/S Server ソースにおいてヘッダー名フィールドで大文字と小文字を区別しない一致が使用されるようになりました。
- Splunk HEC ソースは、オプションでイベントの認証に使用するトークンのリストを受け入れるようになりました。

#### 修正 {#fixes-4}

- Add Fields プロセッサーは、イベントの更新に失敗したときに `component_errors_total` メトリクスをインクリメントするようになりました。
- サーバー名が構成されている送信先での TLS 証明書のホスト名検証の問題が修正され、サーバー名が検証に使用されるようにしました。

## Worker バージョン 2.19.0 {#worker-version-2190}

Worker バージョン 2.19.0 にアップグレードするには、以下の手順に従います。

- Docker: [2.19.0 イメージ][49]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.19.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.19.0` を実行します。

Worker バージョン 2.19.0 では、以下を利用できます。

#### 機能強化 {#enhancements-2}

- BYOC Logs、HTTP クライアント、Socket、Syslog の各送信先、および HTTP クライアントソースに TLS オプション `server_name` が追加されました。これは、TLS ハンドシェイクに使用される SNI および証明書のホスト名を上書きするもので、ダイヤル先アドレスが証明書の Common Name または Subject Alternative Name と一致しない場合に適用されます。
- Splunk TCP ソースが TLS 証明書のホットリロードをサポートしました。これにより、Worker を再起動せずに証明書のローテーションが適用されるようになりました。
- BYOC Logs 送信先が mTLS ファイルのホットリロードをサポートしました。
- Worker で正常なシャットダウンの制限値を構成できるようになりました。
- Amazon S3 送信先で `server_side_encryption` および `ssekms_key_id`オプションを使用した SSE-KMS 暗号化がサポートされました。

#### 修正 {#fixes-5}

- Reduce プロセッサーにおいて、パス内で引用符が必要なタイムスタンプフィールド (例: `"created.at"` または `"event-time"`) の `_end` コンパニオンフィールドが、削減されたイベントから警告なしに削除される問題を修正しました。コンパニオンフィールドが、ベースフィールドの隣に正しく配置されるようになりました。
- 構成のリロードに関する問題が修正されました。リロードによってコンポーネントの名前を変えずにタイプを変更した場合 (例: `X` という名前のソースを `X` という名前のプロセッサーに置き換えた場合など)、`X` から読み取っていたダウンストリームのプロセッサーや送信先は、新しいコンポーネントに再接続されます。
- Syslog ソース (TCPモード) が修正され、複数の読み取りに分割される長さプレフィックス付きの長すぎるメッセージを処理できるようになりました。
- Logstash ソースが修正され、部分的な確認応答ではなく、バッチのすべてのイベントを受信したときにのみ確認応答を送信するようになりました。
- Logstash ソースは、現在のバッチ内のすべてのイベントを受信する前に到着したイベントのバッチを拒否し、処理を続行せずに致命的なデコードエラーで接続を閉じるようになりました。
- Syslog コーデックが短縮形の重大度キーワード (`crit`、`emerg`、`err`、`info`、`warn`) を暗黙に無視し、デフォルトの `informational` に設定していた問題が修正されました。重大度名の短縮形と完全形の両方が受け入れられるようになりました。
- 65,535 バイト以上の行を含む入力を持つカスタムプロセッサー関数 `parse_key_value`、`parse_cef`、`decode_mime_q`、および `parse_ruby_hash` で発生していた問題が修正されました。

## Worker バージョン 2.18.0 {#worker-version-2180}

Worker バージョン 2.18.0 にアップグレードするには、以下の手順に従います。

- Docker: [2.18.0 イメージ][48]に対して`docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.18.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.18.0` を実行します。

Worker バージョン 2.18.0 では、以下を利用できます。

#### 新機能 {#new-features-2}

- `run` コマンドは、Worker 自体の `stdout` ログと `stderr` ログの形式を選択するための `--log-format` フラグをサポートしています。このフラグは `DD_OP_LOG_FORMAT` 環境変数を使用して構成することもできます。デフォルトの `text` では既存の人間が判読できる出力が維持され、`json` では、追加のパースルールなしで直接テールおよびパースできる構造化 JSON ログが出力されます。
- Tag Cardinality Limit プロセッサーが `tracking_mode` オプションをサポートしています。`exact_fingerprint` は 64 ビットのフィンガープリントを使用してタグの値を正確に追跡するため、生の値を保存する従来の方法よりもメモリ使用量が削減されます。`probabilistic` は、時折発生する誤検知と引き換えに、ブルームフィルターを使用してメモリ使用量をさらに削減します。確率的モードは `false_positive_rate` フィールドを受け入れます。このフィールドのデフォルトは `0.001` (0.1% ) です。
- WebSocket ソースは、WebSocket エンドポイントからログを取り込むために利用可能であり、`none`、`basic`、`bearer`、および`custom` 認証戦略と TLS をサポートしています。
- 新しい `generate_metrics` プロセッサーは、サポートされている任意のメトリクス送信先にメトリクスをルーティングします。Datadog は既存の `generate_datadog_metrics` プロセッサーよりもこのプロッサ―を使用することを推奨していますが、既存のプロセッサーも引き続き使用できます。

#### 機能強化 {#enhancements-3}

- BYOC Logs 送信先に mTLS サポートが追加されました。
- `measure_cpu_usage` オプションが有効になり、ログプロセッサー (カスタムプロセッサー、Sensitive Data Scanner、Grok Parser、Parse JSON、Parse XML、OCSF Mapper、Enrichment Table、Reduce、Dedupe、Split Array、Throttle) とメトリクスプロセッサー (Aggregate および Tag Cardinality Limit) に対し常に `pipelines.component_cpu_usage_ns_total` が出力されるようになりました。
- パイプライン構成エラーに、エラーの原因となったコンポーネントの ID が含まれるようになりました。これにより、修正が必要なソース、プロセッサー、または送信先を特定しやすくなりました。カスタムプロセッサー、Generate Metrics、OCSF Mapper など、複数のブロックで構成されるプロセッサーの場合、エラーは失敗した個々のブロックとその位置も特定し、ブロックに名前がある場合はその名前も示します。
- パイプラインメトリクスに `pipeline_name:<NORMALIZED_PIPELINE_NAME>` を使用してパイプライン名がタグ付けされるようになりました。

#### 修正 {#fixes-6}

- ログ専用パイプライン (従来の検索構文を使用) が、新しいパーサーで処理できなかった検索クエリを実行したときに発生する問題が修正されました。パーサーは警告を出力し、無効なクエリを実行しません。
- エスケープ文字で始まるクエリに影響する問題が修正されました (新しい検索構文を使用するパイプラインのみ)。
- バックグラウンドタスクから出力される内部テレメトリ (メトリクスおよびログ) が、所有コンポーネントのタグ (`component_id`、`component_kind`、`component_type` ) を正しく継承するようになりました。以前は、複数のコンポーネントがタグを伝播せずにバックグラウンドタスクを生成していたため、それらのタスクからの内部イベントの一部でコンポーネントタグが欠落していました。影響を受ける出力は以下のとおりです。
  - Datadog アーカイブソース: listing-error、download-error、send-error、event-acknowledged、event-errored、event-rejected、および listing coordinator タスク、per-file downloader タスク、acknowledgment-handler タスクからのステータスメトリクス
  - Microsoft Sentinel 送信先: Azure OAuth トークン再生成タスク
  - Splunk TCP ソース: サーバータスク。

---

## Worker バージョン 2.17.0 {#worker-version-2170}

Worker バージョン 2.17.0 にアップグレードするには、以下の手順に従います。

- Docker: [2.17.0 イメージ][46]に対して`docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.17.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.17.0` を実行します。

<div class="alert alert-warning"><strong>破壊的変更:</strong>Generate Metrics プロセッサーは、生のフィールド名をタグキーとして出力するようになりました。対象となるのは <code>group_by</code> エントリのタグキーです。これらのエントリには <code>[a-zA-Z0-9_@]</code>の範囲外の文字 ( <code>http.status_code</code> や <code>kube-cronjob</code>など) が含まれています。以前は、プロセッサーはこれらの文字を含むタグキーの末尾にアンダースコア (<code>_</code>) を追加していました。たとえば、タグキー <code>http.status_code</code> は <code>http.status_code_</code> になります。これは、キーにピリオド (<code>.</code>) が含まれているためです。<br><br>Worker 2.17 にアップグレードした後、末尾にアンダースコアが付いているタグキーを使用しているダッシュボード、モニター、アラート、またはノートブックをすべて更新し、アンダースコアなしのタグキーを使用するようにしてください。過去のデータポイントは、古いタグキーで引き続きクエリ可能です。パイプラインのうち、その <code>group_by</code> エントリが <code>[a-zA-Z0-9_@]+</code> に一致する名前のみを使用するパイプラインは影響を受けません。</div>

Worker バージョン 2.17.0 では、以下を利用できます。

#### 新機能 {#new-features-3}

- カスタムプロセッサー:
    - VRL 文字列リテラルで `\u{HEX}`Unicode エスケープシーケンスがサポートされました。有効な Unicode スカラー値 (`"hello\u{1F30E}world"` など) はすべて表現可能です。空の括弧、16 進数以外の数字、サロゲートコードポイント、U+10FFFF を超える値などの無効なシーケンスは、コンパイル時のエラーとして報告されます。
    - `parse_regex` 関数が、`parse_regex_all` と同様に動的な正規表現パターン (変数およびランタイム式) を受け入れるようになりました。パターンがリテラルの場合、名前付きキャプチャグループに基づいて戻り値の型情報が正確に保持されます。

#### 機能強化 {#enhancements-4}

- Generate Metrics プロセッサーのパフォーマンスが向上し、`group_by` タグラベル使用時の CPU オーバーヘッドが削減されました。
- カスタムプロセッサーでは、呼び出し間でコンパイル済み正規表現を再利用することで、`parse_regex_all`のパフォーマンスが向上しました。

#### 修正 {#fixes-7}

- Quota プロセッサーのバックグラウンド同期によって出力される HTTP メトリクスに、正しいコンポーネントタグ (`component_kind:transform`、`component_type:quota`、`component_id:quota_global_state`) が付与されるようになりました。
- Reference Table を使用する Enrichment Table プロセッサーが、空のイベントバッチの送信をスキップするようになりました。これにより、ディスクバッファでの致命的なエラーが防止されます。
- Generate Metrics プロセッサーが静的コンポーネント ID を使用するようになりました。これにより、関連するメトリクスが Worker 間や再起動後も同じ `component_id` を共有できるようになりました。
- 括弧内に空白を含むフィルタークエリ (`service:( web OR api )`など ) のパースに関する問題が修正されました。
- OpenTelemetry ソースなど、複数の名前付き出力ポートを持つソースに対して、Live Capture が正しく動作するようになりました。
- ソースまたはプロセッサーが次のコンポーネントに空のイベントバッチを送信した場合に Worker がクラッシュする可能性がある問題が修正されました。
- カスタムプロセッサー:
    - エラーメッセージおよび未使用変数の診断が修正されました。プロセッサーは、1 回のコンパイルで未処理のすべてのエラーを報告するようになりました。
    - `SCREAMING_SNAKE` ケースを `pascalcase` や `camelcase` などの関数で使用できるようになりました。
    - `encode_proto` および `parse_proto` 関数は、文字列の他に、キーが整数またはブール値である proto マップもサポートしています。

---

## Worker バージョン 2.16.1 {#worker-version-2161}

Worker バージョン 2.16.1 にアップグレードするには、以下の手順に従います。

- Docker: [2.16.1 イメージ][45]に対して`docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.16.1` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.16.1` を実行します。

Worker バージョン 2.16.1 では、以下を利用できます。

#### 修正 {#fixes-8}

- US1 以外のデータセンターで構成を取得するときに Worker が失敗することがなくなりました。

---

## Worker バージョン 2.16.0 {#worker-version-2160}

Worker バージョン 2.16.0 にアップグレードするには、以下の手順に従います。

- Docker: [2.16.0 イメージ][44]に対して`docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.16.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.16.0` を実行します。

Worker バージョン 2.16.0 では、以下を利用できます。

#### 新機能 {#new-features-4}

- [Databricks Zerobus][47] 送信先: Zerobus 取り込みサービスを使用して、Databricks Unity Catalog テーブルにログデータを送信します。Databricks 送信先は、OAuth 2.0 認証、Unity Catalog からの自動スキーマ取得、および protobuf バッチエンコーディングをサポートしています。
- Splunk HEC ソースは、VRL デコーダーを使用した受信ログイベントのエンリッチメントをサポートしています。
- Amazon S3 送信先は、柔軟なスキーマ定義と構成可能な圧縮 (Snappy、ZSTD、GZIP、LZ4、またはなし) を備えた Apache Parquet バッチエンコーディングをサポートしています。
- カスタムプロセッサー:
    - `encode_proto` 関数が `allow_lossy_string_coercion` 引数を受け入れるようになりました。
    - Protobuf エンコーディングでは、互換性のあるスカラー型がターゲットのフィールド型に強制的に変換されるようになり、`bool` フィールドには整数と文字列、`float` または `double` フィールドには整数を指定できるようになりました。

#### 機能強化{#enhancements-5}

- Fluent、Logstash、OpenTelemetry (ログおよびメトリクス)、Splunk HEC、Splunk TCP、HTTP/S Server、Socket、および Syslog の各ソースに mTLS サポートが追加されました。
- Live Capture イベントに、イベントを送信した Worker の UUID が含まれるようになりました。
- Reference Tables プロセッサーのバッファが、非推奨となった `buffer_events` および `buffer_byte_size`メトリクスに代わり、`buffer_size_events` および `buffer_size_bytes` ゲージメトリクスを出力するようになりました。非推奨のメトリクスは、後方互換性のために引き続き送信されます。
- Datadog Logs 送信先が、ブートストラップ `logs-sites` フィールドまたは `DD_OP_LOGS_<SITE>` 環境変数 (`DD_OP_LOGS_US1` など) を使用して、サイトごとのログエンドポイントをオーバーライドできるようになりました。環境変数はブートストラップファイルよりも優先されます。
- ソースが以下のディストリビューションメトリクスを記録するようになりました。
    - `source_send_latency_seconds`: ソースがイベントのチャンクを次のコンポーネントに送信するまでにかかる時間。
    - `source_send_batch_latency_seconds`: ソースがバッチ (複数のイベントチャンクを含む場合がある) を次のコンポーネントに送信するのにかかる時間。

#### 修正{#fixes-9}

- Reference Tables プロセッサーの競合状態が修正され、Worker のシャットダウン中にバッファリングされたイベントが破棄されないようになりました。
- Live Capture が更新され、突発的なトラフィックおよび Generate Metrics プロセッサーからのメトリクスの処理が改善されました。
- Worker は、埋め込みの Remote Config 信頼済みルートメタデータの更新後に、起動時に `Root metadata expired` または `potential freeze attack` をログに記録しなくなりました。
- Splunk HEC ソースは、欠落している認証ヘッダーまたは無効な認証ヘッダーが原因で認証が失敗した場合に、エラーログとメトリクスに `error_type` として`authentication_failed` を出力するようになりました。
- Datadog Logs 配信先のヘルスチェックエンドポイントの計算が修正され、インテイクエンドポイントから API URL を導出する際に `us3.`、`us5.`、`ap1.` などのサイトプレフィックスが保持されるようになりました。
- ディスクバッファが構成されている送信先が、正常にリロードされる前に `batch.timeout_sec` の間停止する問題が修正されました。この修正により、パイプラインの停止中に Worker が SIGINT を無視していた状況も解決されます。
- カスタムプロセッサーが修正されました。この修正により、`if` ブロックの閉じ波括弧 (`}`) の後で改行して `else` または `else if` キーワードを配置できるようになりました。

---

## Worker バージョン 2.15.1{#worker-version-2151}

Worker バージョン 2.15.1 にアップグレードするには、以下の手順に従います。

- Docker: [2.15.1 イメージ][43]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.15.1` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.15.1` を実行します。

Worker バージョン 2.15.1 では、以下を利用できます。

#### 新機能{#new-features-5}

- カスタムプロセッサーで、オブジェクトとキー値ペアの配列 (jq スタイル) 間で変換を行うための `to_entries` 関数と `from_entries` 関数がサポートされました。

#### 機能強化{#enhancements-6}

- Datadog Metrics 送信先が Datadog API v2 および sketches エンドポイントに zstd 圧縮を使用するようになりました。これにより、CPU、メモリ、帯域幅の使用量が削減されます。
- カスタムプロセッサーの `flatten` 関数で、フラット化から特定のキーを除外するためのオプション引数 `except` を指定できるようになりました。

#### 修正{#fixes-10}

- バッファメトリクストラッキングにおけるパフォーマンスの低下が修正されました。
- Datadog Agent ソースが修正され、Datadog API v2 リソースからの`device`タグが保持されるようになりました。

---

## Worker バージョン 2.15.0{#worker-version-2150}

Worker バージョン 2.15.0 にアップグレードするには、以下の手順に従います。

- Docker: [2.15.0 イメージ][40]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.15.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.15.0` を実行します。

Worker バージョン 2.15.0 では、以下を利用できます。

#### 新機能{#new-features-6}

- 以下のログタイプに対して新しい OCSF マッピングが追加されました。
    - AWS GuardDuty: `AWS GuardDuty` という名前の単一マッピングにおけるすべての検出結果タイプ (EKS Audit、EC2、Lambda、IAM、DNS など) を対象
    - Infoblox NIOS: DNS Activity、DHCP Activity、audit (Authentication および API Activity)、および port と syslog Base Event (Infoblox DNS Query、Infoblox DHCP、Infoblox Audit Authentication、Infoblox Audit API、Infoblox Port)。
    - `datetime` および `host` プロファイルを含む OCSF スキーマバージョン1.3.0 (Authentication、クラス 3002) に対する Zscaler ZPA App Connector Status ログ。
    - `datetime`、`host`、`network_proxy`、および`security_control`プロファイルを含む OCSF スキーマバージョン 1.3.0 (Network Activity、クラス 4001) に対する Zscaler ZPA User Activity ログ。
    - AWS WAF Web ACL ログ。WAF ログイベントを、`cloud`および`security_control`プロファイルを含む OCSF HTTP Activity (クラス 4002) に変換します。
    - `datetime` および `host` プロファイルを含む OCSF スキーマバージョン 1.3.0 (Authentication、クラス 3002) に対する Zscaler ZPA User Status ログ。
- OpenTelemetry ソースがメトリクスパイプラインをサポートするようになりました。
- Elasticsearch 送信先がメトリクスパイプラインで利用可能になりました。
- `parse_yaml` 関数がカスタムプロセッサーで利用可能になりました。この関数は、[YAML 1.1 仕様][41]に従って YAML をパースします。
- Enrichment Table ファイルオプションで、ルックアップキーソースとしてイベントフィールドパスまたはメタデータシークレットを受け入れる `field` オプションがサポートされました。下位互換性のためにプレーンテキストがサポートされています。
    - 明示的なイベントパスの例:
        - Observability Pipelines の簡略化された構文: `field: {event: "message"}`
        - カスタムプロセッサーの VRL 構文: `field: {vrl: ".message"}`
    - メタデータシークレット参照の例: `field: {secret: "splunk_hec_token"}`
    - プレーン文字列 (下位互換性のため):
        - Observability Pipelines の簡略化された構文: `field: "message"`
        - カスタムプロセッサーの VRL 構文: `field: ".message"`

#### 機能強化 {#enhancements-7}

- Amazon S3 ソースが圧縮データを受け入れるようになりました。
- Elasticsearch 送信先が更新され、新しいオプション `auto_routing`、`compression`、`id_key`、`pipeline`、`request_retry_partial`、`sync_fields`、および `tls` が追加されました。
- オブジェクト配列のソースフィールドを、OCSF のオブジェクト配列である送信先にマッピングできるようになりました。
- Datadog Metrics 送信先は、デフォルトで Datadog シリーズ v2 エンドポイント (`/api/v2/series`) を使用するようになりました。
- Enrichment Table プロセッサーの GeoIP オプションに、ルックアップ結果に関連付けられた CIDR ネットワークを含むネットワークフィールドが含まれるようになりました。ネットワークフィールドは、すべてのデータベースタイプ (City、ISP/ASN、Connection-Type、Anonymous-IP) で利用可能です。
- カスタムプロセッサーに、値の配列を CSV 形式の文字列にエンコードする `encode_csv` 関数が追加されました。これは `parse_csv` 関数とは逆に機能し、オプションの 1 バイトの区切り文字 (デフォルトは`,`) をサポートしています。
- フィールド名で `.` がサポートされました (例: `foo."bar.baz"`)。

#### 修正 {#fixes-11}

- バッファ使用率メトリクスの追跡精度が向上しました。
- カスタムプロセッサーで `floor`、`md5`、`parse_key_value`、`precision`、`seahash` の誤ったパラメーター型が修正されました。

---

## Worker バージョン 2.14.1 {#worker-version-2141}

Worker バージョン 2.14.1 にアップグレードするには、以下の手順に従います。

- Docker: [2.14.1 イメージ][42]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.14.1` を実行します。
- RPM: `sudo yum install observability-pipelines-worker-2.14.1` コマンドを実行します。

Worker バージョン 2.14.1 では、以下を利用できます。

#### 修正 {#fixes-12}

- プロセッサーフィールドの空のパスの処理方法が修正されました。たとえば、Parse JSON プロセッサーが、値が `.` の `Field to parse JSON on` を処理する方法などです。

---

## Worker バージョン 2.14.0 {#worker-version-2140}

Worker バージョン 2.14.0 にアップグレードするには、以下の手順に従います。

- Docker: [2.14.0 イメージ][38]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.14.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.14.0` を実行します。

Worker バージョン 2.14.0 では、以下を利用できます。

#### 新機能 {#new-features-7}

- Palo Alto Networks Threat イベントの OCSF マッピングが追加されました。
- Database ソースが更新され、タイムアウト関連の変更が行われました。
- `component_latency_seconds` ヒストグラムおよび `component_latency_mean_seconds` ゲージの内部メトリクスが追加されました。これらのメトリクスは、プロセッサーバッファ内を含め、イベントが単一プロセッサー内で費やす時間に基づいています。

#### 機能強化 {#enhancements-8}

- Enrichment Table のエラー報告で Reference Tables メトリクスが使用されるようになり、類似ログの数が削減されました。
- Splunk HEC 送信先でイベントからのインデックスフィールドの抽出がサポートされました。
- OCSF マッパーに、一致しないフィールドを保持するオプションが追加されました。
- Enrichment Table プロセッサーにおいて、Reference Table で見つからないエントリのローカルキャッシュ保持時間が延長されました。保持時間は従来の 10 分から 30 分に変更されました。
- Database Source SQL 検証チェックが向上しました。
- Sensitive Data Scanner ライブラリに、PII、資格情報、財務データ向けのすぐに使える新しいスキャンルールが追加されました。軽微なバグも修正されました。
- `observability-pipelines-worker top` コマンドに、スクロール、並べ替え、フィルタリングのための新しいキーバインドが追加されました。
- Datadog Logs 送信先が更新され、デフォルトが圧縮なしから `zstd` 圧縮に変更されました。
- Datadog Agent ソースのアドレスを指定する環境変数が構成可能になりました。

#### 修正 {#fixes-13}

- Remote Configuration のポーリングが成功した時点でエラー状態が解除されないバグが修正されました。
- バッファ使用率メトリクスが修正され、実際の使用レベルを適切に記録するようになりました。
- メモリバッファのクローズと進行中の送信操作の間で発生し、イベント損失を引き起こす可能性があったワーカーシャットダウン時の競合状態が修正されました。
- Generate Metrics プロセッサーは、集計されたヒストグラムメトリクスと集計されたサマリーメトリクスを正しく処理するようになりました。
- Live Capture が Split Array プロセッサー内の子イベントをサポートしています。
- メモリ不足 (OOM) エラーとレート制限エラーを回避するため、Reference Tables のバッファサイズとリクエスト頻度が削減されました。
- Reference Tables プロセッサーが空または空白のルックアップキーを拒否するようになり、また整数キーをサポートしました。

---

## Worker バージョン 2.13.2 {#worker-version-2132}

Worker バージョン 2.13.2 にアップグレードするには、以下の手順に従います。

- Docker: [2.13.2 イメージ][39]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.13.2` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.13.2` を実行します。

Worker バージョン 2.13.2 では、以下を利用できます。

#### 修正 {#fixes-14}

- オブジェクトと一致するように `exists` および `missing` クエリが修正されました。

---

## Worker バージョン 2.13.1 {#worker-version-2131}

Worker バージョン 2.13.1 にアップグレードするには、以下の手順に従います。

- Docker: [2.13.1 イメージ][22]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.13.1` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.13.1` を実行します。

Worker バージョン 2.13.1 では、以下を利用できます。

#### 修正 {#fixes-15}

- すべてのプロセッサーが更新され、誤ったフィルタークエリ構文を適切に処理できるようになりました。

---

## Worker バージョン 2.13.0 {#worker-version-2130}

Worker バージョン 2.13.0 にアップグレードするには、以下の手順に従います。

- Docker: [2.13.0 イメージ][23]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.13.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.13.0` を実行します。

Worker バージョン 2.13.0 では、以下を利用できます。

#### 新機能 {#new-features-8}

- メトリクスの[カスタムプロセッサー][24]: VRL を使用してメトリクスイベントを変換します。
- [Secrets Management][31]: Observability Pipelines は、Datadog Secrets Management を使用してシークレットを取得できます。
- [Live Capture][25] はメトリクスパイプラインで利用できます。
- [Enrichment Tables][28]プロセッサーは、Reference Tables 内のデータセットを使用できます。

#### 機能強化 {#enhancements-9}

- [ディスクバッファ][18]が更新され、バッファがいっぱいになったときにログを破棄するようになりました。
- Dedupe プロセッサーが更新され、キャッシュサイズを構成できるようになりました。
- Datadog Agent ソースが更新され、リクエストタイムアウトを構成できるようになりました。
- ソースバッファが更新され、以下のメトリクスでバッファの使用率レベルを記録できるようになりました:
    - `source_buffer_max_byte_size`
    - `source_buffer_max_event_size`
    - `source_buffer_utilization`
    - `source_buffer_utilization_level`
- プロセッサバッファが更新され、以下のメトリクスでバッファの使用率レベルを記録できるようになりました:
    - `transform_buffer_max_byte_size`
    - `transform_buffer_max_event_size`
    - `transform_buffer_utilization`
    - `transform_buffer_utilization_level`
- TLS 実装が更新され、認証情報を FIPS 準拠の PEM 形式で保存するようになりました。

#### 修正 {#fixes-16}

- Live Capture が更新され、バグが修正されました。
- ハイフンで区切られたセグメントの処理に関する検索構文のバグが修正されました。
- UDP モードの syslog ソースは、TCP モードと同様に標準の `component_received` メトリクスを出力します。
    - `component_received_events_total`
    - `component_received_event_bytes_total`
    - `component_received_bytes_total`

---

## Worker バージョン 2.12.0 {#worker-version-2120}

Worker バージョン 2.12.0 にアップグレードするには:

- Docker: [2.12.0 イメージ][27]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.12.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.12.0`を実行します。

Worker バージョン 2.12.0 では、以下を利用できます。

#### 新機能 {#new-features-9}

- メトリクスパイプラインの [HTTP 送信先][29]: メトリクスを HTTP クライアントエンドポイントにルーティングします。
- [MySQL ソース][30]: MySQL データベースから Observability Pipelines にログを送信します。

#### 機能強化 {#enhancements-10}

- HTTP クライアントのソースと送信先が更新され、カスタム認証戦略を設定できるようになりました。
- メトリクスフィルタープロセッサーが更新され、`kind` および `value` でメトリクスをフィルタリングできるようになりました。
- ターゲットイベントのみをルーティングおよび処理するプロセッサーグループが更新され、処理オーバーヘッドが削減されました。
- Datadog Agent ソースが更新されました。これにより、タイムアウトがサポートされ、`component_timed_out_events_total` および `component_timed_out_requests_total` メトリクスが増加するようになりました。

#### 修正 {#fixes-17}

- Amazon S3 送信先が更新され、`message` フィールドが常に文字列となり、必要に応じて JSON エンコードされるようになりました。
- Worker のバグが修正され、Worker のログが正しく報告されるようになりました。
- Datadog Archives へのログの送信時に、`hostname` という名前が `host` に変更されます。
- メトリクスソースについて Worker が更新され、古いキーの使用を防ぐために、Datadog Agent から送信されたキーを無視し、認証に独自の Datadog キーのコピーを使用するようになりました。
- Worker は、Live Capture にイベントを公開する際、環境変数 (例: `DD_PROXY_HTTPS` 環境変数) またはブートストラップファイルで構成されたプロキシ設定を使用します。

---

## Worker バージョン 2.11.0 {#worker-version-2110}

Worker バージョン 2.11.0 にアップグレードするには、以下の手順に従います。

- Docker: [2.11.0 イメージ][1]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.11.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.11.0` を実行します。

<div class="alert alert-info">Worker 2.10 以前を実行しているパイプラインの場合:<br>- Worker 2.11 にアップグレードした後も、プロセッサーのフィルタークエリは引き続き従来の検索構文で実行されます。<br>- フィルタークエリを新しい検索構文に手動で更新する必要があります。<br>- その後、UI で [<b>New Search Syntax</b>] (新しい検索構文) トグルを有効にするか、API または Terraform を使用して <code>use_legacy_search_syntax</code> を <code>false</code> に設定します。<br><br>詳細については、<a href="https://docs.datadoghq.com/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/">フィルタークエリを新しい検索構文にアップグレードする</a>を参照してください。</a></div>

バーョン 2.11.0 では、以下を利用できます。

#### 新機能 {#new-features-10}

- Sensitive Data Scanner プロセッサーのすぐに使えるルールが 100 個以上追加されました。これらのルールにより、個人を特定できる情報 (PII) とアクセスキー情報がリダクションされます。
- 更新された[検索構文][3]により、以下の操作が可能になります。
    - 配列を逆参照する
    - ログメッセージ内で大文字と小文字を区別せずに検索する
    - `@` 記号を使用せずにログ属性を決定論的にターゲットにする

---

## Worker バージョン 2.10.0 {#worker-version-2100}

Worker バージョン 2.10.0 にアップグレードするには、以下の手順に従います。

- Docker: [2.10.0 イメージ][4]に対して `docker pull` コマンドを実行します。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.10.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.10.0` を実行します。

Worker バージョン 2.10.0 では、以下を利用できます。

#### 新機能 {#new-features-11}

- [Kafka 送信先][5]: Observability Pipelines から Kafka トピックにログを送信します。
- 新規および更新された[カスタムプロセッサー関数][6]:
    - `pop` 関数は、配列から最後のアイテムを削除します。
    - IP アドレス暗号化のための暗号化関数 `encrypt_ip` および`decrypt_ip`。
        - これらの関数は IPCrypt 仕様を使用しており、2 つの暗号化モードで IPv4 および IPv6 アドレスの両方をサポートしています。
            - aes128 (IPCrypt 決定論的、16 バイトキー)
            - pfx (IPCryptPfx、32 バイトキー)。
            - どちらのアルゴリズムも形式を保持し (出力は有効な IP アドレス )、決定論的です。
    - `xxhash` 関数は、`xxh32`、`xxh64`、`xxh3_64`、および `xxh3_128` ハッシュアルゴリズムを実装しています。
    - `parse_aws_alb_log` 関数が更新され、オプションの`strict_mode`パラメーターが追加されました。
        - `strict_mode` が `false` に設定されている場合、パーサーは失敗する代わりに、AWS ALB ログに新しく追加されたフィールドや、ログの末尾にあるフィールドを無視します。
        - 現在の動作を維持するため、デフォルトは `true` です。
    - [メトリクスパイプライン][32]:
        - [Datadog Agent ソース][33]: Datadog Agent から Observability Pipelines に処理のためにメトリクスを送信します。
        - [Filter プロセッサー][35]: 処理するメトリクスをフィルタリングします。
        - [Tag プロセッサー][36]: メトリクスに特定のタグを含めるか、除外します。
        - [Datadog Metrics 送信先][34]: 処理されたメトリクスを Datadog に送信します。

#### 機能強化 {#enhancements-11}

- カスタムプロセッサーのパフォーマンスが向上しました。
- Worker が更新され、古いキーの使用を防ぐために、Datadog Agent から送信されたキーを無視し、認証に独自の Datadog キーのコピーを使用するようになりました。
- `validate_json_schema` 関数を使用するカスタム関数で JSON スキーマを検証する際のエラー報告が改善されました。

#### 修正 {#fixes-18}

- グループレベルのフィルタリングロジックが修正され、該当するログが除外されるようになりました。

---

## Worker バージョン 2.9.1 {#worker-version-291}

Worker バージョン 2.9.1 にアップグレードするには、以下の手順に従います。

- Docker: `docker pull`コマンドを実行して、[2.9.1 イメージ][7]をプルします。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.9.1`を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.9.1` を実行します。

Worker バージョン 2.9.1 では、以下を利用できます。

#### 修正 {#fixes-19}

- Microsoft Sentinel 送信先では、Azure Logs Ingestion API を使用してログを読み取るときのバッチサイズが 1 MB に制限されました。この制限サイズは、[Azure のドキュメント][8]に基づいて決定されました。

---

## Worker バージョン 2.9.0 {#worker-version-290}

Worker バージョン 2.9.0 にアップグレードするには、以下の手順に従います。

- Docker: `docker pull`コマンドを実行して、[2.9.0 イメージ][9]をプルします。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.9.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.9.0` を実行します。

Worker バージョン 2.9.0 では、以下を利用できます。

#### 新機能 {#new-features-12}

- [OpenTelemetry Collector ソース][10]: OpenTelemetry Collector から Observability Pipelines にログを取り込みます。
- [Datadog BYOC Logs 送信先][11]: ログを Datadog BYOC Logs 送信先にルーティングします。
- [Google Pub/Sub 送信先][12]: Observability Pipelines から Google Pub/Sub メッセージングシステムにログを送信します。
- Haversine で距離と方位を計算する `haversine` カスタム関数。

#### 機能強化 {#enhancements-12}

- Observability Pipelines Worker の内部ログが更新され、Datadog API キーの最初の 28 文字のみをリダクションできるようになりました。これは API キーに関連する問題を調査する際に役立ちます。
- Remote Configuration の配信にかかる時間のパフォーマンスが向上しました。
- カスタム関数 `parse_cef` と `parse_syslog` のパース機能が強化されました。

---

## Worker バージョン 2.8.1 {#worker-version-281}

Worker バージョン 2.8.1 にアップグレードするには、以下の手順に従います。

- Docker: `docker pull` コマンドを実行して [2.8.1 イメージ][13] をプルします。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.8.1` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.8.1` を実行します。

Worker バージョン 2.8.1 では、以下を利用できます。

#### 修正 {#fixes-20}

- HTTP クライアントソースの認証戦略が修正されました。

---

## Worker バージョン 2.8.0 {#worker-version-280}

Worker バージョン 2.8.0 にアップグレードするには、以下の手順に従います。

- Docker: `docker pull`コマンドを実行して、[2.8.0 イメージ][14]をプルします。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.8.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.8.0` を実行します。

Worker バージョン 2.8.0 では、以下を利用できます。

#### 新機能 {#new-features-13}

- すべてのソースと送信先が更新され、カスタム環境変数をサポートするようになりました。

#### 機能強化 {#enhancements-13}

- Elasticsearch 送信先の[インデックス戦略][21]が更新され、データストリームが含まれるようになりました。
- HTTP クライアント送信先でテンプレート構文がサポートされました。

#### 修正 {#fixes-21}

- HTTP Server ソースの TLS 有効化が修正されました。
- Worker のヘルスメトリクスが修正されました。
- OpenSearch の基本認証が修正されました。

---

## Worker バージョン 2.7.0 {#worker-version-270}

Worker バージョン 2.7.0 にアップグレードするには、以下の手順に従います。

- Docker: `docker pull`コマンドを実行して、[2.7.0 イメージ][15]をプルします。
- Kubernetes: [Helm チャート][2] および [Worker のアップグレード][37]を参照してください。
- APT: コマンド `apt-get install observability-pipelines-worker=2.7.0` を実行します。
- RPM: コマンド `sudo yum install observability-pipelines-worker-2.7.0` を実行します。

Worker バージョン 2.7.0 では、以下を利用できます。

#### 新機能 {#new-features-14}

- [HTTP クライアント送信先][16]: ログをロギングプラットフォームや SIEM などの HTTP クライアントに送信します。
- [プロセッサーグループ][17]: プロセッサーを論理グループに整理して、管理しやすくします。
- 送信先に[ディスクおよびメモリ][18]のバッファリングオプションを使用できます。

#### 機能強化 {#enhancements-14}

- カスタム関数 `decode_lz4` が更新され、`lz4` フレームデータの解凍がサポートされました。
- Azure Blob Storage および Google Cloud Storage アーカイブ送信先のプレフィックスフィールドでテンプレート構文がサポートされています。
- Splunk HEC 送信先にはカスタム環境変数があります。
- Sample プロセッサーにはオプションの[`group_by`パラメーター][20]があります。

#### 修正 {#fixes-22}

- Datadog Logs 送信先のデフォルトの圧縮が `zstd` に更新されました。これは Datadog Agent のデフォルト圧縮と一致しています。
- Amazon S3、Google Cloud Storage、および Azure Blob Storage の各送信先が修正され、ログのタイムスタンプが正しく解決されるようになりました。
- カスタム OCSF マッパーのパフォーマンスが向上しました。
- フィルタープロセッサーでは、イベントを次のプロセッサーに渡すためにフラグロジックが有効になっています。

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.11
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/observability-pipelines-worker#observability-pipelines-worker
[3]: /ja/observability_pipelines/search_syntax/logs/
[4]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.10
[5]: /ja/observability_pipelines/destinations/kafka/
[6]: /ja/observability_pipelines/processors/custom_processor/#custom-functions
[7]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.9.1
[8]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api
[9]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.9.0
[10]: /ja/observability_pipelines/sources/opentelemetry/
[11]: /ja/observability_pipelines/destinations/datadog_byoc_logs/
[12]: /ja/observability_pipelines/destinations/google_pubsub/
[13]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.8.1
[14]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.8.0
[15]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.7.0
[16]: /ja/observability_pipelines/destinations/http_client/
[17]: /ja/observability_pipelines/processors/#processor-groups
[18]: /ja/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#destination-buffers
[20]: /ja/observability_pipelines/processors/sample/#group-by-example
[21]: /ja/observability_pipelines/destinations/elasticsearch/#set-up-the-destination
[22]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.1
[23]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.0
[24]: /ja/observability_pipelines/processors/custom_processor
[25]: /ja/observability_pipelines/configuration/live_capture/
[27]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.12.0
[28]: /ja/observability_pipelines/processors/enrichment_table/
[29]: /ja/observability_pipelines/destinations/http_client/
[30]: /ja/observability_pipelines/sources/mysql/
[31]: /ja/observability_pipelines/configuration/secrets_management
[32]: /ja/observability_pipelines/configuration/set_up_pipelines/?tab=metrics#set-up-a-pipeline-in-the-ui
[33]: /ja/observability_pipelines/sources/datadog_agent/?tab=metrics
[34]: /ja/observability_pipelines/destinations/datadog_metrics/?tab=secretsmanagement
[35]: /ja/observability_pipelines/processors/filter/?tab=metrics
[36]: /ja/observability_pipelines/processors/tag_allow_block_list/
[37]: /ja/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management#upgrade-the-worker-4
[38]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.14.0
[39]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.2
[40]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.15.0
[41]: https://yaml.org/spec/1.1/
[42]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.14.1
[43]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.15.1
[44]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.16.0
[45]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.16.1
[46]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.17.0
[47]: /ja/observability_pipelines/destinations/databricks/
[48]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.18.0
[49]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.19.0
[50]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.0
[51]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.2
[52]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.3
[53]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.4
[54]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.21.0