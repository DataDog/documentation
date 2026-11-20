---
further_reading:
- link: /cloudprem/configure/ingress/
  tag: 설명서
  text: CloudPrem Ingress 구성하기
- link: /cloudprem/ingest/
  tag: 설명서
  text: 로그 수집 구성
title: Google Kubernetes Engine(GKE)의 CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem를 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

이 설치 가이드는 Google Kubernetes Engine(GKE)에 Datadog CloudPrem을 배포하는 과정을 안내합니다.

GKE의 CloudPrem은 다음과 같은 Google Cloud 서비스를 사용합니다.
- **Google Kubernetes Engine(GKE)**: CloudPrem 구성 요소를 실행하기 위한 컨테이너 오케스트레이션 플랫폼
- **Cloud Storage(GCS)**: 텔레메트리 데이터 및 인덱스용 객체 스토리지
- **Cloud SQL for PostgreSQL**: 메타데이터 저장을 위한 관리형 PostgreSQL 데이터베이스
- **Workload Identity**: GKE 워크로드와 Google Cloud 서비스 간의 안전한 인증

## 사전 필수 조건

시작하기 전에 다음 사항을 확인하세요.

1. **Google Cloud CLI**가 설치 및 구성됨
   ```shell
   gcloud version
   ```

2. **kubectl** 설치됨
   ```shell
   kubectl version --client
   ```

3. **Helm 3.x** 설치됨
   ```shell
   helm version
   ```

4. 결제가 활성화된 **GCP Project**
   ```shell
   gcloud config set project YOUR_PROJECT_ID
   ```

5. **필수 IAM 권한**:
   - `roles/container.admin`(Kubernetes Engine Admin)
   - `roles/iam.serviceAccountAdmin`(Service Account Admin)
   - `roles/compute.admin`(Compute Admin)

6. **[API 키를 생성하거나 조회합니다][1]**.

7. **활성화된 API**:
   ```shell
   gcloud services enable container.googleapis.com \
     compute.googleapis.com \
     sqladmin.googleapis.com \
     storage.googleapis.com
   ```

## 설치 단계

### 1단계: 환경 변수 설정

다음 환경 변수를 설정하면 이후 명령 실행이 간소화되고 복사 붙여넣기 오류가 줄어듭니다.

```shell
export PROJECT_ID="your-gcp-project-id"
export REGION="us-central1"
export CLUSTER_NAME="cloudprem-cluster"
export DATADOG_SITE="datadoghq.com"  # or datadoghq.eu, us3.datadoghq.com, us5.datadoghq.com
export BUCKET_NAME="${PROJECT_ID}-cloudprem"
```

### 2단계: GKE 클러스터 생성

Workload Identity가 활성화된 GKE 클러스터를 생성합니다.

```shell
gcloud container clusters create ${CLUSTER_NAME} \
  --region ${REGION} \
  --num-nodes 1 \
  --workload-pool=${PROJECT_ID}.svc.id.goog \
  --machine-type n1-standard-4
```

{{% collapse-content title="클러스터 크기 권장 사항" level="h4" %}}
- **소규모(개발/테스트) 환경**: 노드 3개, n1-standard-4 (~100GB/일)
- **중간 규모(운영 환경)**: 5개 노드, n1-standard-8 (~500GB/일)
- 대규모(엔터프라이즈)**: 7개 이상의 노드, n1-standard-16 (~1TB+/일)
{{% /collapse-content %}}

클러스터 자격 증명을 가져옵니다.
```shell
gcloud container clusters get-credentials ${CLUSTER_NAME} --region ${REGION}
```

GKE 인증 플러그인을 설치합니다.
```shell
gcloud components install gke-gcloud-auth-plugin
export USE_GKE_GCLOUD_AUTH_PLUGIN=True
```

클러스터 액세스를 확인합니다.
```shell
kubectl cluster-info
kubectl get nodes
```

### 3단계: Cloud Storage 버킷 생성

CloudPrem 데이터 저장을 위한 GCS 버킷을 생성합니다.

```shell
export BUCKET_NAME="cloudprem-data-${PROJECT_ID}"

gcloud storage buckets create gs://${BUCKET_NAME} \
  --project=${PROJECT_ID} \
  --location=${REGION} \
  --uniform-bucket-level-access
```

### 4단계: Cloud SQL PostgreSQL 인스턴스 생성

메타데이터 저장을 위해 Cloud SQL PostgreSQL 인스턴스를 생성합니다.

```shell
# 안전한 비밀번호를 생성합니다
export DB_PASSWORD=$(openssl rand -base64 32)
echo "Database password: ${DB_PASSWORD}"
# Save this password securely - you'll need it later

# Cloud SQL 인스턴스를 생성합니다
gcloud sql instances create cloudprem-postgres \
  --database-version=POSTGRES_15 \
  --region=${REGION} \
  --root-password="${DB_PASSWORD}"
```

이 과정은 몇 분 정도 소요될 수 있습니다. 인스턴스가 준비될 때까지 기다려 주세요.

```shell
gcloud sql instances describe cloudprem-postgres \
  --format="value(state)"
# 출력 결과: RUNNABLE
```

CloudPrem 데이터베이스를 생성합니다.
```shell
gcloud sql databases create cloudprem \
  --instance=cloudprem-postgres
```

연결 세부 정보를 가져옵니다.
```shell
export DB_CONNECTION_NAME=$(gcloud sql instances describe cloudprem-postgres \
  --format="value(connectionName)")
export DB_PUBLIC_IP=$(gcloud sql instances describe cloudprem-postgres \
  --format="value(ipAddresses[0].ipAddress)")

echo "Connection Name: ${DB_CONNECTION_NAME}"
echo "Public IP: ${DB_PUBLIC_IP}"
```

GKE 노드가 Cloud SQL에 연결할 수 있도록 권한을 부여합니다.
```shell
# GKE 노드 외부 IP 주소를 가져옵니다.
export NODE_IPS=$(kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}' | tr ' ' ',')

# IP 주소를 인증합니다
gcloud sql instances patch cloudprem-postgres \
  --authorized-networks=${NODE_IPS} \
  --quiet
```

### 5단계: IAM 및 Workload Identity 구성

CloudPrem용 GCP 서비스 계정을 생성합니다.

```shell
export SERVICE_ACCOUNT_NAME="cloudprem-sa"

gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} \
  --display-name="CloudPrem Service Account" \
  --project=${PROJECT_ID}
```

필요한 IAM 역할을 부여합니다.

```shell
# Cloud SQL Client 역할
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

# GCS 버킷용 Storage Object Admin 역할
gsutil iam ch \
  serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:objectAdmin \
  gs://${BUCKET_NAME}
```

Kubernetes 네임스페이스와 서비스 계정을 생성합니다.

```shell
kubectl create namespace datadog-cloudprem

kubectl create serviceaccount cloudprem-ksa \
  --namespace datadog-cloudprem

kubectl annotate serviceaccount cloudprem-ksa \
  --namespace datadog-cloudprem \
  iam.gke.io/gcp-service-account=${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

GCP 서비스 계정을 Kubernetes 서비스 계정에 바인딩합니다.

```shell
gcloud iam service-accounts add-iam-policy-binding \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --role=roles/iam.workloadIdentityUser \
  --member="serviceAccount:${PROJECT_ID}.svc.id.goog[datadog-cloudprem/cloudprem-ksa]"
```

### 6단계: Kubernetes 시크릿 생성

Datadog API 키에 사용할 시크릿을 생성합니다.

```shell
kubectl create secret generic datadog-secret \
  --from-literal=api-key=${DD_API_KEY} \
  --namespace=datadog-cloudprem
```

PostgreSQL 연결용 시크릿을 생성합니다.

<div class="alert alert-danger">비밀번호는 URL 인코딩 형식이어야 합니다. 예: <code>/</code> → <code>%2F</code>, <code>+</code> → <code>%2B</code>, <code>=</code> → <code>%3D</code>.</div>

```shell
# 먼저 비밀번호를 URL 인코딩합니다.
# 예: 비밀번호가 "abc/def+ghi="면 "abc%2Fdef%2Bghi%3D"가 됩니다.

kubectl create secret generic cloudprem-metastore-config \
  --from-literal=QW_METASTORE_URI="postgresql://postgres:${DB_PASSWORD}@${DB_PUBLIC_IP}:5432/cloudprem" \
  --namespace=datadog-cloudprem
```

### 7단계: Helm을 사용하여 CloudPrem을 설치합니다.

Datadog Helm 리포지토리를 추가합니다.

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

`values.yaml` 파일을 생성합니다.

[Datadog 사이트][2]를 {{< region-param key="dd_site" code="true" >}}로 설정합니다.

```yaml
# Datadog 구성
datadog:
   # 연결할 Datadog 사이트. 기본값은`datadoghq.com`.
   # site: datadoghq.com
   # Datadog API 키가 포함된 기존 Secret의 이름. 시크릿 키 이름은 `api-key`여야 합니다.
   apiKeyExistingSecret: datadog-secret

# Workload Identity가 포함된 Service Account
serviceAccount:
  create: false
  name: cloudprem-ksa
  extraAnnotations:
    iam.gke.io/gcp-service-account: cloudprem-sa@${YOUR_PROJECT_ID}.iam.gserviceaccount.com

# CloudPrem 노드 구성
config:
  # 인덱스 데이터가 저장되는 루트 URI. 이 경로는 gs 경로여야 합니다.
  # CloudPrem에서 생성된 모든 인덱스는 이 위치에 저장됩니다.
  default_index_root_uri: gs://${BUCKET_NAME}/indexes

# VPC 내부 접근을 위한 내부 수신 구성
# Helm 차트는 아직 GKE 수신를 지원하지 않습니다.
#
# ALB 동작을 사용자 지정하기 위해 주석을 추가할 수 있습니다.
ingress:
  internal:
    enabled: false

# 메타스토어 구성
# 메타스토어는 인덱스 메타데이터를 저장하고 관리하는 역할을 합니다.
# PostgreSQL 데이터베이스 연결 문자열을 Kubernetes 시크릿을 통해 제공해야 합니다.
# 시크릿에는 `QW_METASTORE_URI`라는 이름의 키와 다음 형식의 값이 포함되어야 합니다.
# postgresql://<username>:<password>@<host>:<port>/<database>
#
# 메타스토어 연결 문자열은 extraEnvFrom을 사용하여 시크릿을 참조하도록 포드에 마운트됩니다.
metastore:
  extraEnvFrom:
    - secretRef:
        name: cloudprem-metastore-uri

# 인덱서 구성
# 인덱서는 다양한 소스(예: Datadog Agents, 로그 수집기)로부터 수신되는 데이터를 처리하고 인덱싱하는 역할을 담당합니다.
#그리고 이를 S3에 저장된 "splits"이라는 검색 가능한 파일로 변환합니다.
#
# 인덱서는 수평 확장이 가능합니다. 인덱싱 처리량을 높이려면 `replicaCount` 값을 늘립니다. 리소스 요청 및 제한은 인덱싱 워크로드에 따라 조정해야 합니다.
#
# `podSize` 파라미터는 vCPU, 메모리 및 구성 요소별 설정을 자동으로 지정합니다. 기본값은 인덱서 포드당 최대 20MB/s의 적당한 인덱싱 부하에 적합합니다.
# 사용 가능한 등급 및 구성에 관한 자세한 내용은 규모 가이드를 참고하세요.
indexer:
  replicaCount: 2
  podSize: xlarge

# 검색기 구성
# `podSize` 파라미터는 vCPU, 메모리 및 구성 요소별 설정을 자동으로 지정합니다.
# 쿼리 복잡성, 동시성 및 데이터 액세스 패턴에 따라 등급을 선택합니다.
searcher:
  replicaCount: 2
  podSize: xlarge
```

CloudPrem을 설치합니다.

```shell
helm install cloudprem datadog/cloudprem \
  --namespace datadog-cloudprem \
  --values values.yaml
```

### 8단계: 내부 GCE 수신 추가

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: cloudprem-internal
  namespace: datadog-cloudprem
  annotations:
    kubernetes.io/ingress.class: "gce-internal"
spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: cloudprem-indexer
            port:
              number: 7280
```

```shell
kubectl apply -f ingress-values.yaml
```

### 9단계: Datadog Agent 설치(권장)

CloudPrem 구성 요소에서 메트릭을 수집하고 Datadog으로 전송하려면 Datadog Agent를 설치합니다.

Datadog Agent용으로 별도의 네임스페이스를 생성합니다.

```shell
kubectl create namespace datadog

# API 키 시크릿을 Datadog 네임스페이스에 복사하세요.
kubectl get secret datadog-secret -n datadog-cloudprem -o yaml | \
  sed 's/namespace: datadog-cloudprem/namespace: datadog-agent/' | \
  kubectl apply -f -
```

Datadog 오퍼레이터를 설치합니다.

```yaml
# GKE Autopilot용 Datadog Agent Helm 값
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_LOGS_CONFIG_LOGS_DD_URL
        value: http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
      - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
        value: "1000000h"

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

    dogstatsd:
        port: 8125
        useHostPort: false  # Autopilot 모드에서는 false여야 함
        nonLocalTraffic: true

```

Datadog Agent를 설치합니다.

```shell
kubectl apply -f datadog-operator-values.yaml
```

Datadog Agent가 실행 중인지 확인합니다.

```shell
kubectl get pods -n datadog
```

CloudPrem이 Datadog Agent의 DogStatsD 서비스로 메트릭을 전송하도록 업데이트합니다. 다음을 `values.yaml`에 추가하세요.

```yaml
# DogStatsD 구성 - Datadog Agent로 메트릭 전송
dogstatsdServer:
  host:
    value: "datadog-agent.datadog.svc.cluster.local"
  port: 8125
```

CloudPrem을 새 구성으로 업그레이드합니다.

```shell
helm upgrade cloudprem datadog/cloudprem \
  --namespace datadog-cloudprem \
  --values values.yaml \
  --timeout 10m
```

DogStatsD 설정을 확인합니다.

```shell
kubectl get pod -n datadog-cloudprem -l app.kubernetes.io/component=metastore -o jsonpath='{.items[0].spec.containers[0].env[?(@.name=="CP_DOGSTATSD_SERVER_HOST")].value}'
# 다음을 출력해야 합니다: datadog-agent.datadog.svc.cluster.local
```

### 10단계: 배포 확인

포드 상태를 확인합니다.
```shell
kubectl get pods -n datadog-cloudprem
```

모든 포드는 `READY` 상태와 함께 `Running` 상태여야 합니다.
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

데이터베이스 연결 성공 여부를 메타스토어 로그에서 확인합니다.
```shell
kubectl logs -n datadog-cloudprem -l app.kubernetes.io/component=metastore --tail=50
```

## 설치 제거

CloudPrem을 완전히 제거하는 방법:

```shell
# Helm 릴리스 제거
helm uninstall cloudprem --namespace datadog-cloudprem

# 네임스페이스 삭제
kubectl delete namespace datadog-cloudprem

# Cloud SQL 인스턴스 삭제
gcloud sql instances delete cloudprem-postgres --quiet

# GCS 버킷 삭제
gsutil -m rm -r gs://${BUCKET_NAME}

# GCP 서비스 계정 삭제
gcloud iam service-accounts delete \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --quiet

# GKE 클러스터 삭제
gcloud container clusters delete ${CLUSTER_NAME} \
  --region ${REGION} \
  --quiet
```

## 모범 사례

- 보안 강화를 위해 서비스 계정 키 대신 *Workload Identity를 사용하세요.**
- 재해 복구를 위해 **Cloud SQL 백업을 활성화하세요.**
- 고가용성을 위해 **지역별 GKE 클러스터를 사용하세요.**
- 인덱서 노드의 **디스크 사용량을 모니터링하고** 자동 스케일링을 활성화하세요.
- Datadog에서 CloudPrem 구성 요소 상태에 대한 **알림을 설정하세요.**
- 운영 환경에서 보안을 강화하려면 **프라이빗 GKE 클러스터를 사용하세요.**
- 버그 수정 및 새로운 기능 추가를 위해 CloudPrem을 최신 버전으로 **정기적으로 업데이트하세요.**
- 운영 환경 변경 전에 스테이징 환경에서 **스케일링을 테스트하세요.**
- Secret Manager에 **데이터베이스 암호를 저장하고** External Secrets Operator(ESO) 또는 Secrets Store CSI Driver를 사용하여 메타스토어 포드에 암호를 제공하세요.

## 다음 단계

- 애플리케이션이 CloudPrem으로 텔레메트리 데이터를 전송하도록 구성
- Datadog에 대시보드를 설정하여 CloudPrem 성능 모니터링
- Datadog 계정에서 CloudPrem 로그 및 메트릭 확인
- 데이터 볼륨 기준으로 용량 계획

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/getting_started/site/