---
aliases:
- /ko/cloudprem/troubleshooting/
further_reading:
- link: /cloudprem/architecture/
  tag: 설명서
  text: CloudPrem 아키텍처
title: 트러블슈팅
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

이 페이지는 Datadog CloudPrem을 배포하거나 운영할 때 발생할 수 있는 일반적인 문제 해결 지침을 제공합니다. 여기에는 일반적인 오류 메시지, 진단 단계 뿐 아니라 액세스 권한, 스토리지 구성, 구성 요소 상태와 관련된 문제 해결 팁이 포함되어 있습니다. 이 가이드를 활용해 문제를 빠르게 진단하거나 [Datadog 지원팀][1]에 문의하기 전에 필요한 컨텍스트를 미리 파악하세요.


## 구성요소 상태

### 포드가 시작되지 않음

**포드 이벤트 확인:**
```bash
kubectl describe pod -n datadog-cloudprem <pod-name>
```

**일반적인 이슈:**
- 리소스 부족: `kubectl describe nodes` 명령으로 노드 용량을 확인하세요.
- 이미지 풀 오류: 네트워크 연결 상태 및 이미지 가용성을 확인하세요.
- Secret not found: Verify secrets exist with `kubectl get secrets -n datadog-cloudprem`

## 액세스 권한

가장 흔한 오류는 객체 스토리지 또는 메타스토어에 대한 액세스 권한 문제에서 발생합니다. 문제를 해결하려면 `kubectl`을 사용하고 CloudPrem 구성 요소(인덱서 포드, 메타스토어 포드, 검색 포드)의 로그를 확인하세요.

## 메타스토어 오류

### 메타스토어를 PostgreSQL에 연결할 수 없음

**오류**: `failed to connect to metastore: connection error: pool timed out`

**솔루션**: 클러스터에서 PostgreSQL에 접근할 수 있는지 확인하세요.
```shell
kubectl run psql-client \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- psql "host=<HOST> port=<PORT> dbname=<DATABASE> user=<USERNAME> password=<PASSWORD>"
```

일반적인 원인:
- 클러스터 네트워크에서 PostgreSQL에 접근할 수 없습니다.
- 방화벽 규칙으로 인해 연결이 차단되었습니다.
- `cloudprem-metastore-uri` 시크릿에 설정된 호스트, 포트 또는 자격 증명이 올바르지 않습니다.

**오류**: `failed to connect to metastore: invalid port number`

**솔루션**: 메타스토어 URI의 비밀번호가 URL 인코딩되어 있는지 확인하세요. 특수 문자는 이스케이프 처리해야 합니다.
```
# 올바른 형식
postgresql://user:abc%2Fdef%2Bghi%3D@host:5432/cloudprem

# 잘못된 형식 (실패)
postgresql://user:abc/def+ghi=@host:5432/cloudprem
```

### Cloud SQL 연결 이슈(GKE)

**오류**: `failed to connect to metastore: connection error: pool timed out`

**솔루션**: Cloud SQL 인증 네트워크에 GKE 노드 IP가 포함되어 있는지 확인하세요.
```bash
gcloud sql instances describe cloudprem-postgres \
  --format="value(settings.ipConfiguration.authorizedNetworks)"
```

필요시 승인된 네트워크를 업데이트하세요.
```bash
export NODE_IPS=$(kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}' | tr ' ' ',')
gcloud sql instances patch cloudprem-postgres \
  --authorized-networks=${NODE_IPS} \
  --quiet
```

**오류**: `failed to connect to metastore: invalid port number`

**솔루션**: 메타스토어 URI의 비밀번호가 URL 인코딩되어 있는지 확인하세요. 특수 문자는 이스케이프 처리해야 합니다.
```
# 올바른 형식
postgresql://postgres:abc%2Fdef%2Bghi%3D@IP:5432/cloudprem

# 잘못된 형식(실패)
postgresql://postgres:abc/def+ghi=@IP:5432/cloudprem
```

## 스토리지 오류

AWS 자격 증명을 잘못 설정하면 인덱서 로그에 `Unauthorized`가 포함된 오류 메시지가 표시됩니다.

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Unauthorized, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

지역을 잘못 설정하면 다음 오류 메시지가 표시됩니다.

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Internal, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

### GCS 스토리지 액세스 이슈 (GKE)

**오류**: `failed to write to GCS bucket`

**솔루션**: 서비스 계정에 올바른 권한이 있는지 확인하세요.
```bash
gsutil iam get gs://${BUCKET_NAME}
```

누락된 경우 권한을 부여하세요.
```bash
gsutil iam ch \
  serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:objectAdmin \
  gs://${BUCKET_NAME}
```

### MinIO 스토리지 액세스 이슈

**오류**: `failed to put object` 또는 `NoSuchBucket`

**솔루션**: MinIO 연결 및 자격 증명을 확인하세요.
```shell
kubectl run minio-client \
  --rm -it \
  --image=minio/mc:latest \
  --command -- bash -c "mc alias set myminio <MINIO_ENDPOINT> <ACCESS_KEY> <SECRET_KEY> && mc ls myminio/<BUCKET_NAME>"
```

일반적인 원인:
- 클러스터에서 MinIO 엔드포인트에 접근할 수 없습니다.
- 액세스 키 또는 시크릿 키가 잘못되었습니다.
- 해당 버킷이 존재하지 않습니다.
- 스토리지 구성에서 `force_path_style_access`이 `true`로 설정되어 있지 않습니다.

## Workload Identity 이슈(GKE)

**오류**: `could not generate access token`

**솔루션**: Workload Identity 바인딩을 확인합니다.
```bash
# 서비스 계정 주석을 확인하세요
kubectl get serviceaccount cloudprem-ksa -n datadog-cloudprem -o yaml | grep iam.gke.io

# Verify IAM 바인딩을 확인하세요
gcloud iam service-accounts get-iam-policy \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

필요시 바인딩을 다시 생성하세요.
```bash
gcloud iam service-accounts add-iam-policy-binding \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --role=roles/iam.workloadIdentityUser \
  --member="serviceAccount:${PROJECT_ID}.svc.id.goog[datadog-cloudprem/cloudprem-ksa]"
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/