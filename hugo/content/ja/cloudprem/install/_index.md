---
description: さまざまなプラットフォームや環境に CloudPrem をデプロイする方法を説明します。
title: CloudPrem をインストールする
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

CloudPrem は、クラウド管理型 Kubernetes サービスからベア メタル サーバーまで、さまざまな環境にデプロイできます。ここで提供するインストール手順は、**Kubernetes ディストリビューション** を対象にしています。

## 前提条件

<div class="alert alert-info">
Logs メニューに CloudPrem の項目が表示されない場合は、お使いのアカウントで CloudPrem が有効になっていません。<a href="https://www.datadoghq.com/product-preview/cloudprem/">CloudPrem Preview</a> に参加して、アカウントで CloudPrem を有効化してください。
</div>

### Kubernetes クラスターの要件

| 要件            | 詳細                                                                                  |
|------------------------|------------------------------------------------------------------------------------------|
| **Kubernetes バージョン** | 1.25 以降                                                                           |
| **推奨プラットフォーム** | - AWS EKS<br>- Google GKE<br>- Azure AKS<br>- 自主管理 Kubernetes (Nginx コントローラー) |
| **メタ データ ストレージ**   | PostgreSQL データベース                                                                      |
| **推奨 PostgreSQL オプション** | - AWS: RDS PostgreSQL<br>- GCP: Cloud SQL for PostgreSQL<br>- Azure: Azure Database for PostgreSQL<br>- セルフ ホスト: 永続ストレージ付き PostgreSQL |

### オブジェクト ストレージ
CloudPrem は、次のオブジェクト ストレージをサポートしています:
- Amazon S3
- Google Cloud Storage (GCS)
- Azure Blob Storage
- MinIO
- Ceph Object Storage
- 任意の S3 互換ストレージ

## クラウド管理型 Kubernetes

{{< whatsnext desc="Select the installation guide that matches your environment:">}}
  {{< nextlink href="/cloudprem/install/aws_eks" >}}Install on AWS EKS{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/azure_aks" >}}Install on Azure AKS{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/gcp_gke" >}}Install on GCP GKE{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/docker" >}}Install locally with Docker for testing{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/custom_k8s" >}}Install on Kubernetes with PostgreSQL and MinIO{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://www.datadoghq.com/product-preview/cloudprem/