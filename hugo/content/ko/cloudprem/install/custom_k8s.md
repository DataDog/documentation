---
description: PostgreSQL과 MinIO를 객체 스토리지로 사용하여 모든 Kubernetes 클러스터에 CloudPrem을 설치하고
  구성하는 방법을 알아보세요.
further_reading:
- link: /cloudprem/configure/ingress/
  tag: 설명서
  text: CloudPrem 수신 구성하기
- link: /cloudprem/ingest/
  tag: 설명서
  text: 로그 수집 구성
- link: /cloudprem/operate/troubleshooting
  tag: 설명서
  text: CloudPrem 트러블슈팅
title: PostgreSQL 및 MinIO를 사용하여 Kubernetes에 CloudPrem 설치
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem를 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

이 문서에서는 메타데이터 스토리지로 PostgreSQL을, S3 호환 객체 스토리지로 MinIO를 사용하여 모든 Kubernetes 클러스터에 CloudPrem을 설치하는 과정을 안내합니다.

이 구성은 자체 인프라를 관리하거나 주요 클라우드 제공업체의 관리형 서비스를 사용하지 않는 환경에 이상적입니다.

## 사전 필수 조건

시작하기 전에 다음 사항을 확인하세요.

- Kubernetes 클러스터에 접근할 수 있도록 **kubectl**이 설치 및 구성됨
  ```shell
  kubectl version --client
  ```

- **Helm 3.x** 설치됨
  ```shell
  helm version
  ```

- 실행 중인 **Kubernetes 클러스터**(버전 1.25 이상)
  ```shell
  kubectl get nodes
  ```

- CloudPrem 기능이 활성화된 **Datadog 계정**

- **[Datadog API 키][1]**

- Kubernetes 클러스터에서 접근 가능한 **PostgreSQL 데이터베이스**(버전 13 이상). 다음 연결 정보를 참고하세요.
  - 호스트
  - 포트(default: `5432`)
  - 데이터베이스 이름
  - 사용자 이름
  - 비밀번호

- Kubernetes 클러스터에서 접근 가능한 **MinIO 인스턴스**는 다음과 같은 기능을 제공합니다.
  - CloudPrem 데이터용으로 생성된 버킷(예: `cloudprem`)
  - 버킷에 대한 읽기/쓰기 권한이 있는 액세스 키와 시크릿 키
  - MinIO 엔드포인트 URL(예: `http://minio.minio.svc.cluster.local:9000`)

### 연결 확인

진행하기 전에 Kubernetes 클러스터가 PostgreSQL 및 MinIO에 모두 액세스할 수 있는지 확인합니다.

**PostgreSQL**:
```shell
kubectl run psql-client \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- psql "host=<HOST> port=<PORT> dbname=<DATABASE> user=<USERNAME> password=<PASSWORD>"
```

성공하면 `psql` 프롬프트가 표시됩니다.

**MinIO**:
```shell
kubectl run minio-client \
  --rm -it \
  --image=minio/mc:latest \
  --command -- bash -c "mc alias set myminio <MINIO_ENDPOINT> <ACCESS_KEY> <SECRET_KEY> && mc ls myminio/<BUCKET_NAME>"
```

명령이 성공적으로 실행되면 MinIO 버킷 목록이 표시됩니다.

## 설치 단계

1. [CloudPrem Helm 차트를 설치합니다](#install-the-cloudprem-helm-chart)
2. [설치를 인증합니다](#verification)

## CloudPrem Helm 차트 설치

1. Datadog Helm 리포지토리를 추가하고 업데이트합니다.
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. 차트용 Kubernetes 네임스페이스를 생성합니다.
   ```shell
   kubectl create namespace <NAMESPACE_NAME>
   ```

   예를 들어 `cloudprem` 네임스페이스를 생성하려면:
   ```shell
   kubectl create namespace cloudprem
   ```

   **참고**: 현재 컨텍스트에 대한 기본 네임스페이스를 설정하면 모든 명령마다 `-n <NAMESPACE_NAME>`을 입력하는 번거로움을 피할 수 있습니다.
   ```shell
   kubectl config set-context --current --namespace=cloudprem
   ```

1. Datadog API 키를 Kubernetes 시크릿으로 저장합니다.

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

1. PostgreSQL 데이터베이스 연결 문자열을 Kubernetes 시크릿으로 저장합니다.

   <div class="alert alert-danger">비밀번호에 특수 문자가 포함된 경우 먼저 URL 인코딩하세요. 예: <code>/</code> → <code>%2F</code>, <code>+</code> → <code>%2B</code>, <code>=</code> → <code>%3D</code>.</div>

   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI="postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>"
   ```

1. MinIO 자격 증명을 Kubernetes 시크릿으로 저장합니다.

   ```shell
   kubectl create secret generic cloudprem-minio-credentials \
   -n <NAMESPACE_NAME> \
   --from-literal AWS_ACCESS_KEY_ID="<MINIO_ACCESS_KEY>" \
   --from-literal AWS_SECRET_ACCESS_KEY="<MINIO_SECRET_KEY>"
   ```

1. Helm 차트를 사용자 지정합니다.

   기본값을 사용자 지정 구성으로 재정의할 `datadog-values.yaml` 파일을 생성합니다. 이 파일에서 서비스 계정, 수신 설정, 리소스 요청, 제한 등 환경별 설정을 정의할 수 있습니다.

   명시적으로 `datadog-values.yaml`에 재정의되지 않은 모든 파라미터는 차트 `values.yaml`에 정의된 기본값으로 되돌아갑니다.

   ```shell
   # Show default values
   helm show values datadog/cloudprem
   ```

   다음은 MinIO를 사용하는 기본 Kubernetes 환경에 대한 재정의 예제 `datadog-values.yaml` 파일입니다.

   {{< code-block lang="yaml" filename="datadog-values.yaml">}}
# Datadog 구성
datadog:
  # 연결할 Datadog 사이트(https://docs.datadoghq.com/getting_started/site/). 기본값은 `datadoghq.com`.
  # site: datadoghq.com
  # Datadog API 키가 포함된 기존 Secret의 이름. Secret 키 이름은 반드시 `api-key`여야 함.
  apiKeyExistingSecret: datadog-secret

# 환경 변수
# MinIO 자격 증명은 Kubernetes 시크릿에서 마운트됩니다.
# 여기에 정의된 환경 변수는 배포 내의 모든 포드에서 사용할 수 있습니다.
environment:
  AWS_REGION: us-east-1

# 서비스 계정 구성
serviceAccount:
  create: true
  name: cloudprem

# CloudPrem 노드 구성
config:
  # 인덱스 데이터가 저장되는 루트 URI. 이 경로는 MinIO 버킷을 가리키는 S3 호환 경로여야 합니다.
  # CloudPrem에서 생성된 모든 인덱스는 이 위치에 저장됩니다.
  default_index_root_uri: s3://<BUCKET_NAME>/indexes
  storage:
    s3:
      endpoint: <MINIO_ENDPOINT>
      # MinIO의 경우 force_path_style_access가 true여야 합니다.
      force_path_style_access: true

# 메타스토어 구성
# 메타스토어는 인덱스 메타데이터를 저장하고 관리하는 역할을 합니다.
# 이를 위해 Kubernetes 시크릿은 PostgreSQL 데이터베이스 연결 문자열을 제공해야 합니다.
# 시크릿은 `QW_METASTORE_URI`라는 키를 다음 형식의 값과 포함해야 합니다.
# postgresql://<username>:<password>@<host>:<port>/<database>
#
# 메타스토어 연결 문자열은 extraEnvFrom을 사용하여 시크릿을 참조하도록 포드에 마운트됩니다.
metastore:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-metastore-uri
    - secretRef:
        name: cloudprem-minio-credentials

# 인덱서 구성
# 인덱서는 다양한 소스(예: Datadog Agents, 로그 수집기)에서 들어오는 데이터를 처리하고 인덱싱합니다.
# 그리고 수집한 데이터를 MinIO에 저장된 "splits"라는 
# 검색 가능한 파일로 변환합니다.
#
# 인덱서는 수평 확장이 가능하므로 인덱싱 처리량을 높이기 위해 `replicaCount`를 늘릴 수 있습니다.
# `podSize` 파라미터는 vCPU, 메모리 및 구성 요소별 설정을 자동으로 지정합니다.
# 사용 가능한 티어 및 구성에 대한 자세한 내용은 사이즈 가이드를 참고하세요.
indexer:
  replicaCount: 2
  podSize: xlarge
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# 검색기 구성
# 검색기는 MinIO에 저장된 인덱싱된 데이터에 대해 검색 쿼리를 실행합니다.
# Datadog의 쿼리 서비스로부터의 검색 요청을 처리하고 일치하는 결과를 반환합니다.
#
# 검색기는 수평 확장이 가능하므로 동시 검색을 더 많이 처리할 수 있도록 `replicaCount`를 늘릴 수 있습니다.
# 검색기에 필요한 리소스는 작업량에 따라 크게 달라지므로 경험적으로 결정해야 합니다.
# 검색기 성능에 영향을 미치는 주요 요인은 다음과 같습니다.
# - 쿼리 복잡성(예: 검색어 개수, 와일드카드 또는 정규 표현식 사용 여부)
# - 쿼리 동시성(동시 검색 횟수)
# - 쿼리당 스캔된 데이터 양
# - 데이터 접근 패턴(캐시 적중률)
#
# 검색기는 자주 접근하는 인덱스 데이터를 메모리에 캐시하기 때문에, 메모리가 특히 중요합니다.
searcher:
  replicaCount: 2
  podSize: xlarge
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# 컨트롤 플레인 설정
controlPlane:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials

# Janitor 구성
janitor:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-minio-credentials
{{< /code-block >}}

   다음 플레이스홀더를 실제 값으로 바꿉니다.
   - `<BUCKET_NAME>`: MinIO 버킷 이름(예: `cloudprem`)
   - `<MINIO_ENDPOINT>`: MinIO 엔드포인트 URL(예: `http://minio.minio.svc.cluster.local:9000`)

1. Helm 차트를 설치하거나 업그레이드합니다.

   ```shell
   helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
   -n <NAMESPACE_NAME> \
   -f datadog-values.yaml
   ```

## 확인

### 배포 상태 확인

모든 CloudPrem 구성 요소가 실행 중인지 확인합니다.

```shell
kubectl get pods -n <NAMESPACE_NAME>
kubectl get ingress -n <NAMESPACE_NAME>
kubectl get services -n <NAMESPACE_NAME>
```

모든 포드는 `Running` 상태여야 합니다.
```
NAME                                   READY   STATUS    RESTARTS   AGE
cloudprem-control-plane-xxx            1/1     Running   0          5m
cloudprem-indexer-0                    1/1     Running   0          5m
cloudprem-indexer-1                    1/1     Running   0          5m
cloudprem-janitor-xxx                  1/1     Running   0          5m
cloudprem-metastore-xxx                1/1     Running   0          5m
cloudprem-metastore-yyy                1/1     Running   0          5m
cloudprem-searcher-0                   1/1     Running   0          5m
cloudprem-searcher-1                   1/1     Running   0          5m
```

### 메타스토어 연결 확인

로그를 확인하여 메타스토어가 PostgreSQL에 제대로 연결되는지 확인합니다.
```shell
kubectl logs -n <NAMESPACE_NAME> -l app.kubernetes.io/component=metastore --tail=50
```

클러스터 참여 및 분할 작업이 성공적으로 완료되었음을 나타내는 로그 항목이 표시되어야 하며, 연결 오류는 없어야 합니다.

### 스토리지 연결 확인

인덱서 로그를 확인하여 인덱서가 MinIO에 쓰기 작업을 할 수 있는지 확인합니다.
```shell
kubectl logs -n <NAMESPACE_NAME> -l app.kubernetes.io/component=indexer --tail=50
```

## 설치 제거

CloudPrem을 제거하려면 다음 단계를 따르세요.

```shell
helm uninstall <RELEASE_NAME> -n <NAMESPACE_NAME>
```

추가적으로 네임스페이스와 관련 시크릿을 제거하려면 다음 단계를 따르세요.

```shell
kubectl delete namespace <NAMESPACE_NAME>
```

## 다음 단계

**[Datadog Agent를 사용하여 로그 수집 설정][2]** - Datadog Agent가 CloudPrem으로 로그를 전송하도록 구성합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/cloudprem/ingest/agent/