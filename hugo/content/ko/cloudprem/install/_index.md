---
description: 다양한 플랫폼 및 환경에 CloudPrem 배포하기
title: CloudPrem 설치
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem를 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

CloudPrem은 클라우드 관리형 Kubernetes 서비스부터 베어메탈 서버에 이르기까지 다양한 환경에 배포할 수 있습니다. 제공된 설치 지침은 **Kubernetes 배포판**에 특화되어 있습니다.

## 사전 필수 조건

<div class="alert alert-info">
Logs 메뉴에 CloudPrem 항목이 표시되지 않으면 계정에 CloudPrem이 활성화되지 않은 것입니다. <a href="https://www.datadoghq.com/product-preview/cloudprem/">CloudPrem 평가판</a>에 참여하여 계정에 CloudPrem을 활성화하세요.
</div>

### Kubernetes 클러스터 요구 사항

| 필수 요건            | 세부 정보                                                                                  |
|------------------------|------------------------------------------------------------------------------------------|
| **Kubernetes 버전** | 1.25 이상                                                                           |
| **권장 플랫폼** | - AWS EKS<br>- Google GKE<br>- Azure AKS<br>- 자체 관리형 Kubernetes(Nginx 컨트롤러) |
| **메타데이터 스토리지**   | PostgreSQL 데이터베이스                                                                      |
| **권장 PostgreSQL 옵션** | - AWS: RDS PostgreSQL<br>- GCP: Cloud SQL for PostgreSQL<br>- Azure: Azure Database for PostgreSQL<br>- 자체 호스팅: 영구 스토리지를 사용하는 PostgreSQL |

### 객체 스토리지
CloudPrem은 다음과 같은 객체 스토리지 유형을 지원합니다.
- Amazon S3
- Google Cloud Storage(GCS)
- Azure Blob Storage
- MinIO
- Ceph Object Storage
- 모든 S3 호환 스토리지

## 클라우드 관리형 Kubernetes

{{< whatsnext desc="사용 환경에 맞는 설치 가이드를 선택하세요:">}}
  {{< nextlink href="/cloudprem/install/aws_eks" >}}AWS EKS에 설치{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/azure_aks" >}}Azure AKS에 설치{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/gcp_gke" >}}GCP GKE에 설치{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/docker" >}}Docker를 사용하여 로컬에 설치하고 테스트하기{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/custom_k8s" >}}PostgreSQL 및 MinIO를 사용하여 Kubernetes에 설치 {{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://www.datadoghq.com/product-preview/cloudprem/