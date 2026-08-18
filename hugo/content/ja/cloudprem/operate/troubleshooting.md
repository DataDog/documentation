---
aliases:
- /ja/cloudprem/troubleshooting/
further_reading:
- link: /cloudprem/architecture/
  tag: ドキュメント
  text: CloudPrem アーキテクチャ
title: トラブルシューティング
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

このページでは、Datadog CloudPrem のデプロイや運用時によく発生する問題に対するトラブルシューティング情報をまとめています。代表的なエラー メッセージ、診断手順、アクセス権限、ストレージ設定、コンポーネントの健全性に関する問題を解決するためのヒントを掲載しています。問題の切り分けをすばやく進めたいときや、[Datadog サポート][1] に問い合わせる前に状況を整理したいときに活用してください。


## コンポーネントの健全性

### Pod が起動しない

**Pod のイベントを確認する:**
```bash
kubectl describe pod -n datadog-cloudprem <pod-name>
```

**よくある原因:**
- リソース不足: `kubectl describe nodes` でノードの空き容量を確認します
- イメージ取得エラー: ネットワーク接続とイメージが取得可能かどうかを確認します
- Secret が見つからない: `kubectl get secrets -n datadog-cloudprem` で Secret の存在を確認します

## アクセス権限

もっとも多いエラーは、オブジェクト ストレージまたは metastore へのアクセス権限に起因するものです。原因を調べるときは `kubectl` を使い、CloudPrem の各コンポーネント、つまり indexer Pod、metastore Pod、searcher Pod のログを確認してください。

## Metastore のエラー

### Metastore が PostgreSQL に接続できない

**エラー**: `failed to connect to metastore: connection error: pool timed out` 

**対処方法**: クラスターから PostgreSQL に到達できることを確認します:
```shell
kubectl run psql-client \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- psql "host=<HOST> port=<PORT> dbname=<DATABASE> user=<USERNAME> password=<PASSWORD>"
```

よくある原因:
- PostgreSQL にクラスター ネットワークから到達できない
- Firewall ルールによって接続が遮断されている
- `cloudprem-metastore-uri` Secret の host、port、または認証情報が誤っている

**エラー**: `failed to connect to metastore: invalid port number` 

**対処方法**: metastore URI 内のパスワードが URL エンコードされていることを確認します。特殊文字はエスケープする必要があります:
```
# 正しい形式
postgresql://user:abc%2Fdef%2Bghi%3D@host:5432/cloudprem

# 誤った形式 (失敗する)
postgresql://user:abc/def+ghi=@host:5432/cloudprem
```

### Cloud SQL の接続問題 (GKE)

**エラー**: `failed to connect to metastore: connection error: pool timed out` 

**対処方法**: Cloud SQL の authorized networks に GKE ノードの IP が含まれていることを確認します:
```bash
gcloud sql instances describe cloudprem-postgres \
  --format="value(settings.ipConfiguration.authorizedNetworks)"
```

必要に応じて authorized networks を更新します:
```bash
export NODE_IPS=$(kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}' | tr ' ' ',')
gcloud sql instances patch cloudprem-postgres \
  --authorized-networks=${NODE_IPS} \
  --quiet
```

**エラー**: `failed to connect to metastore: invalid port number` 

**対処方法**: metastore URI 内のパスワードが URL エンコードされていることを確認します。特殊文字はエスケープする必要があります:
```
# 正しい形式
postgresql://postgres:abc%2Fdef%2Bghi%3D@IP:5432/cloudprem

# 誤った形式 (失敗する)
postgresql://postgres:abc/def+ghi=@IP:5432/cloudprem
```

## ストレージ関連のエラー

AWS 認証情報が誤っている場合は、indexer のログに `Unauthorized` を含む次のようなエラーが表示されます:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Unauthorized, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

リージョン設定が誤っている場合は、次のようなエラーが表示されます:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Internal, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

### GCS ストレージへのアクセス問題 (GKE)

**エラー**: `failed to write to GCS bucket` 

**対処方法**: サービス アカウントに正しい権限が付与されていることを確認します:
```bash
gsutil iam get gs://${BUCKET_NAME}
```

不足している場合は権限を付与します:
```bash
gsutil iam ch \
  serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:objectAdmin \
  gs://${BUCKET_NAME}
```

### MinIO ストレージへのアクセス問題

**エラー**: `failed to put object` または `NoSuchBucket` 

**対処方法**: MinIO への接続性と認証情報を確認します:
```shell
kubectl run minio-client \
  --rm -it \
  --image=minio/mc:latest \
  --command -- bash -c "mc alias set myminio <MINIO_ENDPOINT> <ACCESS_KEY> <SECRET_KEY> && mc ls myminio/<BUCKET_NAME>"
```

よくある原因:
- MinIO エンドポイントにクラスターから到達できない
- access key または secret key が誤っている
- バケットが存在しない
- ストレージ設定で `force_path_style_access` が `true` に設定されていない

## Workload Identity の問題 (GKE)

**エラー**: `could not generate access token` 

**対処方法**: Workload Identity のバインド設定を確認します:
```bash
# Check service account annotation
kubectl get serviceaccount cloudprem-ksa -n datadog-cloudprem -o yaml | grep iam.gke.io

# Verify IAM binding
gcloud iam service-accounts get-iam-policy \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

必要に応じてバインドを再作成します:
```bash
gcloud iam service-accounts add-iam-policy-binding \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --role=roles/iam.workloadIdentityUser \
  --member="serviceAccount:${PROJECT_ID}.svc.id.goog[datadog-cloudprem/cloudprem-ksa]"
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/