---
description: datadog/cloudprem Helm チャートにバンドルされている BYOC Logs バイナリのバージョンごとの変更点。
disable_toc: false
further_reading:
- link: /byoc-logs/operate/updates/
  tag: ドキュメント
  text: BYOC Logs のアップデートを計画する
- link: /byoc-logs/install/
  tag: ドキュメント
  text: BYOC Logs をインストールする
- link: /byoc-logs/operate/troubleshooting/
  tag: ドキュメント
  text: BYOC Logs のトラブルシューティング
title: BYOC Logs リリースノート
---
## 概要{#overview}

このページでは、Docker イメージとして配布され、`datadog/cloudprem` Helm チャートにバンドルされている **BYOC (Bring Your Own Cloud) Logs バイナリ**のリリース情報を追跡します。新機能や修正はバイナリで提供され、チャートはそれらをデプロイ用にパッケージ化します。

### インストールされているバイナリのバージョンをチェックする{#check-your-installed-binary-version}

BYOC Logs Pod の [`image`] フィールドを確認してください。

```shell
kubectl get pods -n <BYOC_LOGS_NAMESPACE> \
  -o jsonpath='{range .items[*]}{.spec.containers[*].image}{"\n"}{end}' \
  | sort -u
```

イメージタグ (例: `:v0.1.26`) がバイナリのバージョンです。Helm チャートにどのバイナリバージョンがバンドルされているかを確認するには、以下を実行します。

```shell
helm show chart datadog/cloudprem --version <CHART_VERSION> | grep appVersion
```

### アップグレード{#upgrade}

バイナリのアップグレードは Helm チャートを通じて提供されます。お使いのプラットフォームのチャートアップグレードコマンドについては、「[BYOC Logs をインストールする](/byoc-logs/install/)」を参照してください。

## リリース{#releases}

### v0.1.33 — 2026-08-18{#v0133-2026-08-18}

*チャート `0.5.2` にバンドル。*
*Observability Pipelines Worker `2.20.x` で検証済み。*

#### 変更点{#changed}
- 類似したログをグループ化し、ストレージフットプリントを 10% ～ 20% 削減するドキュメントクラスタリング機能を追加しました。ドキュメントクラスタリングを無効にするには、`QW_DISABLE_DOCS_CLUSTERING=true` を設定してください。
- フラットな属性による group-by クエリのサポートを追加しました。
- システムリソース使用状況、廃止、S3 PUT の失敗、WAL 使用状況、メタストア容量、およびスプリット検索結果に関する運用メトリクスを追加しました。

#### Helm チャートの変更点{#helm-chart-changes}
- **破壊的変更**: Pod サイズの `medium` を廃止しました。`indexer.podSize` および`searcher.podSize` は、`large`、`xlarge`、`2xlarge`、`4xlarge`、`6xlarge`、および`8xlarge` が指定可能です。
- ノードの予約リソースやアドオンを考慮し、Pod サイズの CPU およびメモリの要求量と上限値を調整しました。これに伴い、キャッシュ、インジェストキュー、および同時実行スプリット検索も再スケーリングされます。
- `config.docs_clustering` によるドキュメントクラスタリング機能をデフォルトで有効化しました。
- インデクサーおよびスタンドアロンコンパクターの停止タイムアウトを、各ワークロードの `terminationGracePeriodSeconds` の 90% に設定しました。
- デフォルトのメタストア `PodDisruptionBudget` およびグローバル DNS `ndots: 1` 設定を追加しました。
- インデクサーの HPA の CPU ターゲット値を 70% に引き下げ、スケールアップ安定化ウィンドウ設定を削除しました。これにより、負荷がかかった際にインデクサーがスケールアウトするようになります。

### v0.1.32 — 2026-07-21{#v0132-2026-07-21}

*チャート `0.4.6` にバンドル。*
*Observability Pipelines Worker `2.20.0` で検証済み (`datadog/observability-pipelines-worker` Helm チャート `2.20.0`)。*

#### 変更点{#changed-1}
- 検索および分析の読み取りパス向けに、オプトインの PostgreSQL メタストア読み取りレプリカサポートを追加しました。
- インデクサーノード外でマージ作業を実行するための、オプトインのスタンドアロンコンパクターサービスを追加しました。
- S3 クライアントの DNS 解決をキャッシュすることで、S3 の DNS ルックアップの頻度を低減しました。
- アクターの再起動やメタストアの過負荷時の応答後における、コントロールプレーンの安定性を向上させました。

#### Helm チャートの変更点{#helm-chart-changes-1}
- 書き込み処理とは独立してメタストアの読み取りをスケールさせるため、読み取り専用メタストアレプリカプールをデプロイする `metastore_ro` 値を追加しました。
- インデクサーノードではなく専用ワーカーでコンパクションを実行するための `enableStandaloneCompactors` を追加しました。
- `QW_DISABLE_INGEST_V1=true` により、Ingest v1 をデフォルトで無効化しました。`environment` で上書きしてください。
- `datadog.byocTelemetry.enabled` が有効な場合、BYOC サービストレースを Datadog テレメトリインテークにルーティングするようにしました。
- Liveness プローブおよび Startup プローブに、専用の `health` ポートを使用するようにしました。

### v0.1.31 — 2026-07-08{#v0131-2026-07-08}

*チャート `0.4.5` にバンドル。*

#### 変更点{#changed-2}
- raw フィールドに対する単一トークンのフレーズプレフィックスクエリを修正しました。これにより、`match_phrase_prefix` 検索が`max_expansions` によって制限されるのではなく、一致するすべてのプレフィックス用語が返されるようになります。
- 時間範囲を指定した選択的用語クエリの交差処理が最大 3 倍高速化されました。

#### Helm チャートの変更点{#helm-chart-changes-2}
- インデクサーおよびサーチャーの永続ボリューム用に Kubernetes `VolumeAttributesClass` リソースをプロビジョニングするための `indexer.volumeAttributesClass` 値および `searcher.volumeAttributesClass` 値を追加しました。これらの値を使用して、IOPS やスループットなどのボリューム属性を調整できます。この機能はデフォルトで無効になっており、Kubernetes 1.31 以降が必要で、有効にするには `driverName` の指定が必要です。
- Kubernetes のアドバタイズアドレスの設定を修正しました。Pod 名ではなく Pod IP から`KUBERNETES_POD_IP` を設定するように変更しています。
- Kubernetes API アクセスを必要としない Pod でのトークン露出を減らすため、`serviceAccount.automountServiceAccountToken` をデフォルトで無効にしました。
- 防御を強化するため、ワークロード全体で `securityContext.readOnlyRootFilesystem` をデフォルトで有効にしました。

### v0.1.30 — 2026-06-30{#v0130-2026-06-30}

*チャート `0.4.3` にバンドル。*

#### 変更点{#changed-3}
- ネストされた日付ヒストグラムクエリの検索 CPU 時間を最大 20% 削減しました。7 日間のウィンドウ設定で最大の効果が得られます。
- CloudPrem コンポーネントの稼働状況および準備状況を確認するための専用ヘルスチェックリスナーをポート `7284` に追加しました。

#### Helm チャートの変更点{#helm-chart-changes-3}
- すべての CloudPrem コンポーネントに適用され、既存のコンポーネントごとの `extraVolumes` および `extraVolumeMounts` とマージされるグローバルな `volumes` および `volumeMounts` 値を追加しました。
- CloudPrem ワークロード Pod をトポロジードメイン全体に分散させるための、コンポーネントごとの制約とマージされるグローバルな `topologySpreadConstraints` サポートを追加しました。
- CloudPrem サービスおよび AWS ALB 内部イングレスのヘルスチェックが、専用のヘルスエンドポイントを使用するように更新されました。

### v0.1.29 — 2026-06-05{#v0129-2026-06-05}

*チャート `0.4.2` にバンドル。*

#### 変更点{#changed-4}
- 一般的なログ分析クエリの実行速度が向上しました。範囲クエリは 2 倍、カーディナリティ集計は 1.6 倍、範囲クエリとの交差は最大 6 倍高速化されます。
- `field:*` フィルターを存在確認クエリとして扱うように変更し、パーセンタイル集計によるソートの問題を修正しました。
- Google Cloud Storage へのアップロード時のメモリ使用量を削減し、インデックス作成の安定性を向上させました。

#### Helm チャートの変更点{#helm-chart-changes-4}
- `datadog.byocTelemetry.enabled` により、デフォルトで BYOC サービステレメトリが有効になります。これにより、顧客が取り込んだログ、メトリクス、トレースではなく、BYOC サービスのログとメトリクスのみがエクスポートされます。
- `cloudprem.index.retention` を非推奨として無視するように変更し、`CP_RETENTION_PERIOD` を設定しないようにしました。

### v0.1.26 — 2026-05-05{#v0126-2026-05-05}

*チャート `0.4.0` にバンドル。*

#### 変更点{#changed-5}
- サブ集計による並べ替えを使用したターム集計が最大 4 倍高速化され、カーディナリティ集計が最大 1.5 倍高速化されました。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}