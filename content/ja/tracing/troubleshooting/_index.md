---
aliases:
- /ja/tracing/faq/my-trace-agent-log-renders-empty-service-error/
further_reading:
- link: /tracing/troubleshooting/connection_errors
  tag: Documentation
  text: 接続エラー
- link: /tracing/troubleshooting/tracer_startup_logs/
  tag: Documentation
  text: Datadog トレーサー起動ログ
- link: /tracing/troubleshooting/tracer_debug_logs/
  tag: Documentation
  text: Datadog トレーサーデバッグログ
- link: /tracing/troubleshooting/agent_apm_metrics/
  tag: ドキュメント
  text: Datadog Agent によって送信された APM メトリクス
kind: documentation
title: APM トラブルシューティング
---

Datadog APM で予期しない動作が発生した場合に、ご自分で確認できるよくある問題を本ガイドでいくつかご紹介します。問題が解決しない場合は、[Datadog サポート][1] にお問い合わせください。また、各リリースには改善と修正が含まれているため、使用する Datadog トレースライブラリの最新バージョンに定期的に更新することをお勧めします。

## トラブルシューティングパイプライン

APM データを Datadog に送信する際には、以下のコンポーネントが関与します。

{{< img src="tracing/troubleshooting/troubleshooting_pipeline_info_1.png" alt="APM トラブルシューティングパイプライン">}}

トレース (JSON データタイプ) と [Tracing Application Metrics][2] はアプリケーションから生成され、バックエンドに移動する前に Datadog Agent に送信されます。パイプラインの各セクションで、異なるトラブルシューティング情報を収集することができます。重要なのは、Tracer のデバッグログは、アプリケーションのログに書き込まれますが、これは Datadog Agent のフレアとは別のコンポーネントであることです。これらの項目についての詳細は、以下の [Datadog サポートから要求されたデータのトラブルシューティング](#troubleshooting-data-requested-by-datadog-support)で確認することができます。

## APM のセットアップと APM ステータスの確認

起動時、Datadog トレースライブラリは、JSON オブジェクトに適用された設定を反映するログおよび発生したエラーを出力します。それには、対応する言語で Agent に到達できるかも含まれます。一部の言語では、この起動ログが環境変数 `DD_TRACE_STARTUP_LOGS=true` で有効化されている必要があります。起動ログについて、詳しくはトラブルシューティング[関連ページ][3]を参照してください。

## 接続エラー

トラブルの一般的な原因は、インスツルメントされたアプリケーションが Datadog Agent と通信できないことです。こうした問題を見つけて修正する方法については、[接続エラー][4]を参照してください。

## トレーサーのデバッグログ

Datadog トレーサーの詳細をすべて取得するには、`DD_TRACE_DEBUG` 環境変数を使いトレーサーのデバッグモードを有効にします。独自の調査のために有効にしたり、Datadog サポートもトリアージ目的で推奨していることを理由に、有効にしたりできます。ただし、ログのオーバーヘッドが発生するため、デバッグモードを有効のままにはしないでください。

これらのログは、インスツルメンテーションエラーやインテグレーション固有のエラーを明らかにすることができます。デバッグログの有効化と取得に関する詳細は、[デバッグモードのトラブルシューティングページ][5]を参照してください。

## データボリュームガイドライン

インスツルメント済みのアプリケーションは、現時点から最大過去18時間および未来2時間までのタイムスタンプのスパンを送信できます。

Datadog では、以下の文字列が指定された文字数を超えた場合、切り捨てられます。

| 名前         | 文字 |
|--------------|------------|
| [サービス][6]    |  100       |
| オペレーション    |  100       |
| type         |  100       |
| [リソース][7]   |  5000      |
| [タグキー][8]    |  200       |
| [タグの値][8]  |  5000      |

また、スパンに存在する[スパンタグ][8]の数が、1024 以上にならないようにしてください。

指定された 40 分間に、Datadog では以下の組み合わせが許容されます。より大きなボリュームに対応するには、特定のユースケースについて[サポート][1]までお問い合わせください。

- 5000 件の一意な環境とサービスの組み合わせ
- 環境ごとに 30 個のユニークな[第 2プライマリタグ][16]値
- 環境およびサービス当たり100件の一意の操作名
- 環境、サービス、操作名当たり1000件の一意のリソース
- 環境およびサービス当たり30件の一意のバージョン

## APM レート制限

Datadog Agent ログで、レート制限や 1 秒あたりの最大イベント数に関するエラーメッセージが表示される場合、[以下の手順][9]に従い制限を変更します。ご不明な点は、Datadog [サポートチーム][1]までお問い合わせください。

## APM リソース使用量

トレースコレクションの CPU 使用率の検出と Agent の適切なリソース制限の計算については、[Agent のリソース使用量][10]を参照してください。

## スパンの修正、破棄、難読化

Datadog Agent またはトレースクライアント (一部の言語のみ) 内で構成可能なヘルスチェック、またその他不要なトラフィックに関連する機密データのスクラブやトレースの破棄に関しては数々のコンフィギュレーションオプションが用意されています。利用可能なオプションについては、[セキュリティと Agent のカスタマイズ][11]を参照してください。本文では代表的な例をご紹介していますが、これらのオプションをお使いの環境に適用する際にサポートが必要な場合は、[Datadog サポート][1]までお問い合わせください。

## サービスの命名規則に関する問題

サービス数が[データ量ガイドライン](#data-volume-guidelines)で指定されている数を超える場合は、サービスの命名規則について以下のベストプラクティスを試してみてください。

### サービス名から環境タグの値を除外する

デフォルトでは、環境 (`env`) は [Datadog APM][17] のプライマリタグになります。

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-3.png" alt="Environment はデフォルトのプライマリタグです" style="width:100%;" >}}

サービスは通常、`prod`、`staging`、`dev` などの複数の環境にデプロイされます。リクエスト数、レイテンシー、エラー率などのパフォーマンスメトリクスは、さまざまな環境間で異なっています。サービスカタログの環境ドロップダウンを使用すると、**Performance** タブのデータを特定の環境にスコープすることができます。

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-2.png" alt="サービスカタログの `env` ドロップダウンを使って、特定の環境を選択します" style="width:100%;" >}}

サービスの数が増えすぎて問題になりがちなのが、サービス名に環境値を含めるパターンです。例えば、`prod-web-store` と `dev-web-store` のように 2 つの環境で動作しているため、1 つではなく 2 つのユニークなサービスがある場合です。

Datadog では、サービス名を変更することでインスツルメンテーションを調整することを推奨しています。

トレースメトリクスはアンサンプリングされるため、インスツルメンテーションされたアプリケーションでは、部分的なデータではなく、すべてのデータが表示されます。また、[ボリュームガイドライン](#data-volume-guidelines)も適用されます。

### メトリクスパーティションを置いたり、変数をサービス名にグループ化する代わりに、第 2 プライマリタグを使用する

第 2 のプライマリタグは、トレースメトリクスのグループ化および集計に使用できる追加タグです。ドロップダウンを使用して、指定されたクラスター名またはデータセンターの値にパフォーマンスデータをスコープすることができます。

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-1.png" alt="ドロップダウンメニューを使用して、特定のクラスターまたはデータセンターの値を選択します" style="width:100%;" >}}

第 2 のプライマリタグを適用せず、サービス名にメトリクスパーティションやグループ化変数を含めると、アカウント内のユニークなサービス数が不必要に増加し、遅延やデータ損失の可能性があります。

例えば、`web-store` というサービスの代わりに、`web-store-us-1`、`web-store-eu-1`、`web-store-eu-2` という異なるインスタンスの名前を付けて、これらのパーティションのパフォーマンスメトリクスを並べて表示することができます。Datadog では、第 2 プライマリタグとして、**region value** (`us-1`、`eu-1`、`eu-2`) を実装することを推奨しています。

## Datadog サポートが収集するトラブルシューティングのデータ

[サポートチケット][1]を作成する際、下記のような情報が必要となる場合がございます。

1. **問題を確認することはできますか？たとえば、トレース (推奨) やスクリーンショットへのリンクを提供し、何が起こるかサポートまでお聞かせください。**

   これにより、サポートチームはエラーを確認し、Datadog のテスト環境で問題の再現を試みることができます。

2. **[トレーサー起動ログ](#confirm-apm-setup-and-agent-status)**

    起動ログにより、トレーサーの設定ミスやトレーサーがDatadog Agent と通信できていないことが分かります。トレーサーが参照するコンフィギュレーションとアプリケーションやコンテナ内の設定を比べることで、サポートは設定が正しく適用されていない箇所を特定できます。

3. **[トレーサーデバッグログ](#tracer-debug-logs)**

    トレーサーのデバッグログは起動ログよりさらに深く掘り下げ、トラフィックがアプリケーションを通過するまでチェックしがたい方法でインテグレーションが正しくインスツルメントされているか判断するのに役立ちます。デバッグログはトレーサーが作成するスパンの内容を確認したり、スパンを Agent に送信する際に接続に問題がある場合エラーを表面化させることもできます。トレーサーのデバッグログは、トレーサーの微妙な動作を確認するのに最も有益で信頼性の高いツールです。

4. **これらのログで探している情報に応じて、[デバッグまたはトレースモード][13]中にトレースが Datadog Agent に送信された期間の代表的なログサンプルをキャプチャする [Datadog Agent フレア][12] (ログおよび構成のスナップショット)**

   Datadog Agent フレアにより Datadog Agent 内で起きていること (例えば、トレースが拒否または不正な形式にされているか) を確認できます。これはトレースが Datadog Agent に到達していない場合は役に立ちませんが、問題の原因やメトリクスの不一致を特定することはできます。

    ログのレベルを `debug` または `trace` モードに調節する場合は、この操作によりログの量が劇的に増加し、システムリソースの消費量 (主に長期的なストレージスペースの増加) が見込まれることを考慮してください。Datadog は、この操作は一時的なトラブルシューティング目的のみで行い、完了後はレベルを `info` に戻すことを推奨します。 

    **注**: Datadog Agent v7.19+ および Datadog Helm チャートの[最新版][9]、または Datadog Agent とトレース Agent が別コンテナにある状況で DaemonSet をご利用の場合は、トレース Agent からフレアを取得するために `datadog.yaml` に `log_level: DEBUG` または `log_level: TRACE` を設定した状態で以下のコマンドを実行する必要があります。

    {{< code-block lang="shell" filename="trace-agent.sh" >}}
kubectl exec -it <agent-pod-name> -c trace-agent -- agent flare <case-id> --local
    {{< /code-block >}}

5. **環境の詳細**

    アプリケーションのデプロイ方法を知ることで、サポートチームはトレーサーと Agent 間の通信の問題や設定ミスにおけるありがちな問題を特定することができます。問題が複雑な場合は、Kubernetes マニフェストや ECS タスク定義などを参照していただく場合もあります。

6. **トレーサーコンフィギュレーション、[カスタムインスツルメンテーション][14]、スパンタグの追加など、トレーシングライブラリを使用して書かれたカスタムコード**

   カスタムインスツルメンテーションは強力なツールですが、Datadog 内のトレース可視化に意図しない副作用を与える可能性があります。

   さらに、自動インスツルメンテーションとコンフィギュレーションを尋ねることで、Datadog はトレーサのスタートアップとデバッグログの両方に表示されているものと一致するかどうかを確認することができます。

7. **次のバージョン:**
   * **インスツルメントされたアプリケーションの構築に使用されるプログラミング言語、フレームワーク、依存関係**
   * **Datadog トレーサー**
   * **Datadog Agent**

    使用するバージョンを知ることで、インテグレーションが [互換性要件][15]でサポートされていることを確認したり、既知の問題をチェックしたり、トレーサーや言語のバージョンに問題がある場合はその更新をお勧めすることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/tracing/metrics/metrics_namespace/
[3]: /ja/tracing/troubleshooting/tracer_startup_logs/
[4]: /ja/tracing/troubleshooting/connection_errors/
[5]: /ja/tracing/troubleshooting/tracer_debug_logs/
[6]: /ja/tracing/glossary/#services
[7]: /ja/tracing/glossary/#resources
[8]: /ja/glossary/#span-tag
[9]: /ja/tracing/troubleshooting/agent_rate_limits
[10]: /ja/tracing/troubleshooting/agent_apm_resource_usage/
[11]: /ja/tracing/custom_instrumentation/agent_customization
[12]: /ja/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[13]: /ja/agent/troubleshooting/debug_mode/?tab=agentv6v7
[14]: /ja/tracing/custom_instrumentation/
[15]: /ja/tracing/compatibility_requirements/
[16]: /ja/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[17]: /ja/tracing/guide/setting_primary_tags_to_scope/