---
aliases:
- /ja/cloudprem/operate/autoscaling/
description: BYOC Logs インデクサーおよびコンパクターのワークロード向けに Horizontal Pod Autoscaler を構成します。
further_reading:
- link: /byoc-logs/operate/sizing/
  tag: ドキュメント
  text: クラスターサイジング
- link: /byoc-logs/operate/monitoring/
  tag: ドキュメント
  text: BYOC Logs を監視する
- link: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/values.yaml
  tag: ソース
  text: CloudPrem Helm チャートのデフォルト値
title: インデクサーとコンパクターのオートスケーリング
---
## 概要 {#overview}

`datadog/cloudprem` Helm チャートを有効にすると、BYOC (Bring Your Own Cloud) Logs インデクサーおよびスタンドアロンコンパクター向けの Horizontal Pod Autoscaler (HPA) が作成されます。HPA はデフォルトで無効になっており、各コンポーネントは個別に構成されます。

## はじめに {#before-you-begin}

オートスケーリングを有効にする前に、以下が必要です。

- `datadog/cloudprem` Helm チャートでインストールされた BYOC Logs デプロイメント。
- スタンドアロンコンパクターのオートスケーリングには、チャートバージョン `0.4.6` 以降が必要です。
- Kubernetes Metrics Server、またはその他のメトリクス API 実装がクラスターにインストールされていること。
- インデクサーおよびコンパクター Pod の最大数に対応できる十分なノード容量があること。
- オートスケーリング対象のワークロードに対して CPU リクエストが構成されていること。

CPU ベースの HPA 計算では、Pod の CPU リクエストが使用されます。インデクサーは `indexer.podSize` または `indexer.resources.requests.cpu` から CPU リクエストを取得します。スタンドアロンコンパクターの場合は、`compactor.resources.requests.cpu` を構成してください。

## インデクサーのオートスケーリングを有効にする {#enable-indexer-autoscaling}

インデクサーの HPA を有効にするには、`indexer.autoscaling.enabled` を `true` に設定します。

```yaml
indexer:
  autoscaling:
    enabled: true
```

インデクサーのオートスケーリングを有効にすると、HPA がインデクサーの Pod の数を制御し、`indexer.replicaCount` は無視します。

デフォルトのインデクサー HPA 設定:

| 設定 | デフォルト | 説明 |
|---|---:|---|
| `indexer.autoscaling.minReplicas` | `2` | インデクサーの Pod の最小数 |
| `indexer.autoscaling.maxReplicas` | `10` | インデクサーの Pod の最大数 |
| CPU ターゲット | `70%` | インデクサーの Pod における平均 CPU 使用率ターゲット |

## コンパクターのオートスケーリングを有効にする {#enable-compactor-autoscaling}

コンパクター HPA を有効にするには、スタンドアロンコンパクターを有効にし、`compactor.autoscaling.enabled` を `true` に設定してください。

```yaml
enableStandaloneCompactors: true

compactor:
  autoscaling:
    enabled: true
```

チャートは、`enableStandaloneCompactors` および `compactor.autoscaling.enabled` の両方を `true` に設定した場合にのみ、コンパクター HPA を作成します。コンパクターのオートスケーリングを有効にすると、HPA がコンパクターの Pod の数を制御し、`compactor.replicaCount` は無視します。

デフォルトのコンパクター HPA 設定:

| 設定 | デフォルト | 説明 |
|---|---:|---|
| `compactor.autoscaling.minReplicas` | `1` | コンパクターの Pod の最小数 |
| `compactor.autoscaling.maxReplicas` | `10` | コンパクターの Pod の最大数 |
| CPU ターゲット | `80%` | コンパクターの Pod における平均 CPU 使用率ターゲット |

## デフォルトを上書きする {#override-the-defaults}

ワークロードのスケーリング範囲を設定するには、`enabled` とともに `minReplicas` および `maxReplicas` を設定します。ノード容量がサポートする最大値を選択するには、[クラスターサイジング][1] ガイドを使用してください。

```yaml
indexer:
  autoscaling:
    enabled: true
    minReplicas: 4
    maxReplicas: 20
```

## 構成を適用する {#apply-the-configuration}

BYOC Logs の値ファイルにオートスケーリング値を追加し、リリースをアップグレードします。

```shell
helm upgrade <RELEASE_NAME> datadog/cloudprem \
  --namespace <NAMESPACE_NAME> \
  --values datadog-values.yaml
```

## HPA を確認する {#verify-the-hpas}

BYOC Logs ネームスペースの HPA を一覧表示します。

```shell
kubectl get hpa -n <NAMESPACE_NAME>
```

HPA について説明し、メトリクスと最近のスケーリングイベントをチェックします。

```shell
kubectl describe hpa <RELEASE_NAME>-indexer -n <NAMESPACE_NAME>
kubectl describe hpa <RELEASE_NAME>-compactor -n <NAMESPACE_NAME>
```

`<RELEASE_NAME>-indexer` と `<RELEASE_NAME>-compactor` は、チャートによって作成されるデフォルトの HPA 名です。`nameOverride` または `fullnameOverride` を設定した場合は、代わりに結果として得られる名前を使用してください。

`kubectl get hpa` の `TARGETS` 列に `<unknown>` と表示されている場合、HPA は CPU メトリクスを読み取ることができません。メトリクス API が実行されていること、およびターゲットの Pod に CPU リクエストがあることをチェックしてください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/byoc-logs/operate/sizing/