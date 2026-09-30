Jenkins や自己管理型の GitLab CI など、オンプレミスの CI プロバイダーでテストを実行している場合は、[Agent のインストール手順][101]に従って、各ワーカーノードに Datadog Agent をインストールします。
これは、テスト結果を[ログ][105]および[基盤となるホストのメトリクス][106]に自動的にリンクできるため、推奨されるオプションです。

Kubernetes エグゼキュータを使用している場合は、Datadog が [Datadog Operator][102] の使用を推奨しています。
この Operator には [Datadog Admission Controller][103] が含まれており、自動的にビルドポッドに[トレーサーライブラリを注入][104] することができます。
**注:** Datadog Operator を使用する場合、Admission Controller がトレーサーライブラリのダウンロードと注入を行うため、以下のステップを省略することができます。
ただし、Test Visibility を有効にするために必要な環境変数またはコマンドラインパラメーターをポッドで設定する必要があります。

Kubernetes を使用していない、または Datadog Admission Controller を使用できない場合で、CI プロバイダーがコンテナベースのエクゼキュータを使用している場合、トレーサーを実行するビルドコンテナの `DD_TRACE_AGENT_URL` 環境変数 (デフォルトは `http://localhost:8126`) を、そのコンテナ内からアクセス可能なエンドポイントに設定します。**注:** ビルドコンテナ内で `localhost` を使用すると、コンテナ自体を参照し、基盤となるワーカーノードや Container Agent が動作しているコンテナを参照しません。

`DD_TRACE_AGENT_URL` は、プロトコルとポート (例えば、`http://localhost:8126`) を含み、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` よりも優先され、CI Visibility のために Datadog Agent の URL を構成するために推奨される構成パラメーターです。

それでも Datadog Agent への接続に問題がある場合は、[Agentless Mode](?tab=cloudciprovideragentless#configuring-reporting-method) を使用してください。
**注**: この方法を使用する場合、テストは[ログ][105]や[インフラストラクチャーメトリクス][106]と相関しません。

[101]: /agent/
[102]: /containers/datadog_operator/
[103]: /agent/cluster_agent/admission_controller/
[104]: /tracing/trace_collection/library_injection_local/?tab=kubernetes
[105]: /tracing/other_telemetry/connect_logs_and_traces/
[106]: /infrastructure/
