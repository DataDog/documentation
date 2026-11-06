---
aliases:
- /ko/cloudprem/configure/azure_config/
- /ko/cloudprem/install/azure_aks/
description: Azure AKS에서 BYOC Logs 설치 및 구성 방법 알아보기
title: Azure AKS에 BYOC Logs 설치
---
## 개요 {#overview}

이 문서는 Azure 환경을 구성하고 Azure AKS에 BYOC (Bring Your Own Cloud) Logs를 설치하는 방법을 단계별로 안내합니다.

## 전제 조건 {#prerequisites}

Azure에 BYOC Logs를 설치하기 전에 필요한 지원 인프라 리소스를 설정해야 합니다. 이러한 구성 요소는 BYOC Logs에 필요한 기본 컴퓨팅, 스토리지, 데이터베이스 및 네트워킹 서비스를 제공합니다.

### 인프라 요구 사항 {#infrastructure-requirements}
다음 구성 요소를 프로비저닝해야 합니다.

- [**Azure Kubernetes Service(AKS)**](#azure-kubernetes-service-aks): 예상 BYOC Logs 워크로드를 처리할 수 있는 규모로 구성되어 실행 중인 AKS 클러스터입니다.
- [**PostgreSQL Flexible Server**](#azure-postgresql-flexible-server): BYOC Logs가 메타데이터를 저장하는 데 사용할 Azure Database for PostgreSQL 인스턴스입니다.
- [**Blob Storage 컨테이너**](#blob-storage-container): BYOC Logs 데이터를 저장하기 위한 Azure Storage 컨테이너입니다.
- [**클라이언트 ID 및 권한**](#client-identity-and-permissions): 스토리지 컨테이너에 대한 읽기/쓰기 액세스 권한이 있는 Azure AD 애플리케이션입니다.
- [**NGINX Ingress Controller**](#nginx-ingress-controller): 외부 트래픽을 BYOC Logs 서비스로 라우팅하기 위해 AKS 클러스터에 설치됩니다.
- **Datadog Agent**: 로그를 수집하여 BYOC Logs로 전송하기 위해 AKS 클러스터에 배포됩니다.

### Azure Kubernetes Service(AKS) {#azure-kubernetes-service-aks}

BYOC Logs는 Kubernetes 환경에서만 실행됩니다. 워크로드를 처리할 수 있도록 CPU, 메모리 및 디스크 공간이 충분히 확보된 AKS 클러스터가 필요합니다. Kubernetes 클러스터 규모에 관한 권장 사항을 참조하세요.

#### AKS 클러스터 배포 {#deploy-the-aks-cluster}

- [Azure CLI를 사용하여 AKS 클러스터 배포][2]
- [Terraform을 사용하여 AKS 클러스터 배포][3]

#### 클러스터 연결 및 상태 확인 {#verify-cluster-connectivity-and-health}
클러스터에 연결할 수 있고 노드가 `Ready` 상태인지 확인하려면 다음 명령을 실행합니다.

```shell
kubectl get nodes -o wide
```

### Azure PostgreSQL Flexible Server {#azure-postgresql-flexible-server}

BYOC Logs는 메타데이터와 구성을 PostgreSQL 데이터베이스에 저장합니다. Datadog은 Azure Database for PostgreSQL Flexible Server를 권장합니다. AKS 클러스터에서 해당 서버에 연결할 수 있어야 하며, 가급적 프라이빗 네트워킹을 활성화하는 것이 좋습니다. 자세한 내용은 Postgres 규모에 관한 권장 사항을 참조하세요.

#### PostgreSQL 데이터베이스 만들기 {#create-the-postgresql-database}

- [Azure CLI를 사용하여 Azure Database for PostgreSQL Flexible Server 만들기][4]
- [Terraform을 사용하여 Azure Database for PostgreSQL Flexible Server 만들기][5]

#### 데이터베이스 연결 확인 {#verify-database-connectivity}

<div class="alert alert-info">보안을 위해 BYOC Logs 전용 데이터베이스와 사용자를 생성하고, 해당 사용자에게 클러스터 전체가 아닌 전용 데이터베이스에 대해서만 권한을 부여합니다.</div>

PostgreSQL 클라이언트 `psql`을 사용하여 AKS 네트워크 내에서 PostgreSQL 데이터베이스에 연결합니다. 먼저 `psql`이 포함된 이미지를 사용하여 Kubernetes 클러스터에서 대화형 포드를 실행합니다.

```shell
kubectl run psql-client \
  -n <NAMESPACE_NAME> \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- bash
```

그런 다음 플레이스홀더를 실제 값으로 바꾸고 셸에서 다음 명령을 직접 실행합니다.

```shell
psql "host=<HOST> \
      port=<PORT> \
      dbname=<DATABASE> \
      user=<USERNAME> \
      password=<PASSWORD>"
```

연결에 성공하면 다음과 유사한 프롬프트가 표시됩니다.

```shell
psql (15.2)
SSL connection (protocol: TLS...)
Type "help" for help.

<DATABASE>=>
```

### Blob 스토리지 컨테이너 {#blob-storage-container}

BYOC Logs는 로그를 영구 저장하기 위해 Azure Blob Storage를 사용합니다. 로그 저장을 위한 전용 컨테이너를 생성합니다.

#### Blob 스토리지 컨테이너 만들기 {#create-a-blob-storage-container}
환경별로 전용 컨테이너를 사용하고(예: `byoc-logs-prod`, `byoc-logs-staging`), 스토리지 계정 범위가 아닌 컨테이너 수준에서 최소 권한 원칙에 따른 RBAC 역할을 할당합니다.

- [Azure CLI를 사용하여 Blob Storage 컨테이너 생성][6]
- [Terraform을 사용하여 Blob Storage 컨테이너 생성][7]

### 클라이언트 ID 및 권한 {#client-identity-and-permissions}

Azure AD 애플리케이션에 Blob Storage 컨테이너에 대한 읽기/쓰기 액세스 권한을 부여해야 합니다. BYOC Logs용 전용 애플리케이션을 등록하고 해당 서비스 주체에 앞서 생성한 Blob Storage 컨테이너에 대한 `Contributor` 역할을 할당합니다.

#### 애플리케이션 등록 {#register-the-application}
[Microsoft Entra ID에 애플리케이션 등록][8]

#### 기여자 역할 할당 {#assign-contributor-role}
[Azure 역할 할당을 통해 Blob 데이터에 액세스][9]

### NGINX Ingress Controller {#nginx-ingress-controller}

#### 공용 NGINX Ingress Controller {#public-nginx-ingress-controller}

공용 인그레스는 Datadog이 공용 인터넷을 통해 BYOC Logs 클러스터를 관리하고 쿼리할 수 있도록 하는 데 필수적입니다. 다음 메커니즘을 통해 BYOC Logs gRPC API에 대한 보안 액세스를 제공합니다.
- Datadog 서비스의 트래픽을 수신하는 인터넷 연결 Azure Load Balancer를 생성합니다.
- 인그레스 컨트롤러 수준에서 종료하는 방식으로 TLS 암호화를 구현합니다.
- Datadog과 BYOC Logs 클러스터 간 통신에 HTTP/2(gRPC)를 사용합니다.
- Datadog 서비스가 유효한 클라이언트 인증서를 제시해야 하는 상호 TLS(mTLS) 인증을 요구합니다.
- 컨트롤러를 TLS 패스스루 모드로 구성하여 `ssl-client-cert` 헤더와 함께 클라이언트 인증서를 BYOC Logs 포드로 전달합니다.
- 유효한 클라이언트 인증서나 인증서 헤더가 없는 요청을 거부합니다.

공용 NGINX Ingress Controller를 생성하려면 다음 `nginx-public.yaml` Helm values 파일을 사용합니다.

{{< code-block lang="yaml" filename="nginx-public.yaml" >}}
controller:
  electionID: public-ingress-controller-leader
  ingressClass: nginx-public
  ingressClassResource:
    name: nginx-public
    enabled: true
    default: false
    controllerValue: k8s.io/public-ingress-nginx
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
{{< /code-block >}}

그런 다음 아래의 명령을 실행하여 Helm으로 컨트롤러를 설치합니다.

```shell
helm upgrade --install nginx-public ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-public \
  --create-namespace \
  -f nginx-public.yaml
```

컨트롤러 포드가 실행 중인지 확인합니다.

```shell
kubectl get pods -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

서비스가 외부 IP를 노출하는지 확인합니다.

```shell
kubectl get svc -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

#### 내부 NGINX Ingress Controller {#internal-nginx-ingress-controller}

내부 인그레스를 사용하면 HTTP를 통해 환경 내의 Datadog Agent 및 기타 로그 컬렉터에서 로그를 수집할 수 있습니다. 공용 NGINX Ingress Controller를 생성하려면 다음 `nginx-internal.yaml` Helm values 파일을 사용합니다.

{{< code-block lang="yaml" filename="nginx-internal.yaml" >}}
controller:
  electionID: internal-ingress-controller-leader
  ingressClass: nginx-internal
  ingressClassResource:
    name: nginx-internal
    enabled: true
    default: false
    controllerValue: k8s.io/internal-ingress-nginx
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-internal: true
      service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
{{< /code-block >}}

그런 다음 아래의 명령을 실행하여 Helm으로 컨트롤러를 설치합니다.

```shell
helm upgrade --install nginx-internal ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-internal \
  --create-namespace \
  -f nginx-internal.yaml
```

컨트롤러 포드가 실행 중인지 확인합니다.

```shell
kubectl get pods -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

서비스가 외부 IP를 노출하는지 확인합니다.

```shell
kubectl get svc -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

### DNS {#dns}

필요시 공용 로드 밸런서의 IP 주소를 가리키는 DNS 항목을 추가하여 향후 IP 주소가 변경되더라도 Datadog 측 구성을 업데이트할 필요가 없도록 할 수 있습니다.

## 설치 단계 {#installation-steps}

1. [BYOC Logs Helm 차트 설치](#install-the-byoc-logs-helm-chart)
2. [설치 확인](#verification)

## BYOC Logs Helm 차트 설치 {#install-the-byoc-logs-helm-chart}

1. Datadog Helm 리포지토리 추가 및 업데이트:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. 차트용 Kubernetes 네임스페이스를 생성:
   ```shell
   kubectl create namespace <NAMESPACE_NAME>
   ```

   예를 들어, `byoc-logs` 네임스페이스를 생성하려면 다음 단계를 따르세요.
   ```shell
   kubectl create namespace byoc-logs
   ```

   **참고**: 현재 컨텍스트에 기본 네임스페이스를 설정하면 명령을 실행할 때마다 `-n <NAMESPACE_NAME>`을 입력하지 않아도 됩니다.
   ```shell
   kubectl config set-context --current --namespace=byoc-logs
   ```

1. Datadog API 키를 Kubernetes 시크릿으로 저장합니다.

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

1. PostgreSQL 데이터베이스 연결 문자열을 Kubernetes 시크릿으로 저장합니다.
   PostgreSQL 연결 세부 정보를 확인하려면 Azure Portal에서 {{< ui >}}All resources{{< /ui >}}로 이동한 다음 _Azure Database for PostgreSQL Flexible Server_ 인스턴스를 클릭합니다. 마지막으로 {{< ui >}}Getting started{{< /ui >}} 탭에서 {{< ui >}}Connect{{< /ui >}} 카드에 있는 {{< ui >}}View connection strings{{< /ui >}} 링크를 클릭합니다.

   ```shell
   kubectl create secret generic byoc-logs-metastore-uri \
     -n <NAMESPACE_NAME> \
     --from-literal QW_METASTORE_URI=postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
   ```

   예를 들어 `byoc-logs` 네임스페이스에 `metastore-uri` 시크릿을 저장하려면 다음 명령을 실행합니다.
   ```shell
   USERNAME=byoc-logs-prod
   PASSWORD=1234567890
   HOST=byoc-logs-prod.postgres.database.azure.com
   PORT=5432
   DATABASE=byoc_logs_prod
   kubectl create secret generic metastore-uri \
     -n byoc-logs \
     --from-literal QW_METASTORE_URI="postgres://$USERNAME:$PASSWORD@$HOST:$PORT/$DATABASE"
   ```

1. 클라이언트 시크릿 또는 스토리지 계정 액세스 키를 Kubernetes 시크릿으로 저장합니다.
   ```shell
   kubectl create secret generic <SECRET_NAME> \
     -n <NAMESPACE_NAME> \
     --from-literal <SECRET_KEY>=<SECRET_VALUE>
   ```

1. Helm 차트 사용자 지정:

   기본값을 사용자 지정 구성으로 재정의하려면 `datadog-values.yaml` 파일을 생성합니다. 이 파일에서 이미지 태그, Azure 테넌트 ID, 서비스 계정, 인그레스 설정, 리소스 요청량 및 제한값 등 환경별 설정을 정의합니다.

   `datadog-values.yaml`에서 명시적으로 재정의되지 않은 파라미터에는 차트의 `values.yaml`에 정의된 기본값이 적용됩니다.

   ```shell
    # Show default values
    helm show values datadog/cloudprem
   ```
   다음은 Azure용 재정의 설정이 포함된 `datadog-values.yaml` 파일의 예시입니다.

   {{< code-block lang="yaml" filename="datadog-values.yaml">}}
# Datadog configuration
datadog:
  # The Datadog site (https://docs.datadoghq.com/getting_started/site/) to connect to. Defaults to `datadoghq.com`.
  # site: datadoghq.com
  # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
  apiKeyExistingSecret: datadog-secret

azure:
  tenantId: <TENANT_ID> # required
  clientId: <CLIENT_ID> # required when using AD App to authenticate with Blob Storage
  clientSecretRef:
    name: <SECRET_NAME>
    key: <SECRET_KEY>
  storageAccount:
    name: <STORAGE_ACCOUNT_NAME> # required
    # If you are using a storage account access key to authenticate with Blob Storage,
    # comment out the `clientSecretRef` section above,
    # and uncomment the `storageAccount` section below:
    # accessKeySecretRef:
      # name: <SECRET_NAME>
      # key: <SECRET_KEY>

   # Service account configuration
   # If `serviceAccount.create` is set to `true`, a service account is created with the specified name.
   # Additional annotations can be added using serviceAccount.extraAnnotations.
   serviceAccount:
     create: true
     name: byoc-logs

# BYOC Logs node configuration
config:
  # The root URI where index data is stored. This should be an Azure path.
  # All indexes created in BYOC Logs are stored under this location.
  default_index_root_uri: azure://<CONTAINER_NAME>/indexes

# Internal ingress configuration
# The internal ingress NLB is created in private subnets.
#
# Additional annotations can be added to customize the ALB behavior.
ingress:
  # The internal ingress is used by Datadog Agents and other collectors running outside
  # the Kubernetes cluster to send their logs to BYOC Logs.
  internal:
    enabled: true
    ingressClassName: nginx-internal
    host: byoc-logs.acme.internal
    extraAnnotations: {}

# Metastore configuration
# The metastore is responsible for storing and managing index metadata.
# It requires a PostgreSQL database connection string to be provided by a Kubernetes secret.
# The secret should contain a key named `QW_METASTORE_URI` with a value in the format:
# postgresql://<username>:<password>@<host>:<port>/<database>
#
# The metastore connection string is mounted into the pods using extraEnvFrom to reference the secret.
metastore:
  extraEnvFrom:
    - secretRef:
        name: byoc-logs-metastore-uri

# Indexer configuration
# The indexer is responsible for processing and indexing incoming data it receives data from various sources (for example, Datadog Agents, log collectors)
# and transforms it into searchable files called "splits" stored in S3.
#
# The indexer is horizontally scalable - you can increase `replicaCount` to handle higher indexing throughput.
# The `podSize` parameter sets vCPU, memory, and component-specific settings automatically.
# See the sizing guide for available tiers and their configurations.
indexer:
  replicaCount: 2
  podSize: xlarge
  persistentVolume:
    enabled: true
    storage: 250Gi
    storageClass: managed-csi

   # Searcher configuration
   # The searcher is responsible for executing search queries against the indexed data stored in S3.
   # It handles search requests from Datadog's query service and returns matching results.
   #
   # The searcher is horizontally scalable - you can increase `replicaCount` to handle more concurrent searches.
   # Resource requirements for searchers are highly workload-dependent and should be determined empirically.
   # Key factors that impact searcher performance include:
   # - Query complexity (for example, number of terms, use of wildcards or regex)
   # - Query concurrency (number of simultaneous searches)
   # - Amount of data scanned per query
   # - Data access patterns (cache hit rates)
   #
   # Memory is particularly important for searchers as they cache frequently accessed index data in memory.
   searcher:
     replicaCount: 2
     podSize: xlarge
{{< /code-block >}}

1. Helm 차트 설치 또는 업그레이드
    ```shell
    helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
      -n <NAMESPACE_NAME> \
      -f datadog-values.yaml
    ```

## 확인 {#verification}

### 배포 상태 확인 {#check-deployment-status}

모든 BYOC Logs 구성 요소가 실행 중인지 확인합니다.

```shell
kubectl get pods -n <NAMESPACE_NAME>
kubectl get ingress -n <NAMESPACE_NAME>
kubectl get services -n <NAMESPACE_NAME>
```

## 설치 제거 {#uninstall}

BYOC Logs를 제거하려면 다음 명령을 실행합니다.

```shell
helm uninstall <RELEASE_NAME>
```

## 다음 단계 {#next-step}

**[Datadog Agent로 로그 수집 설정][10]** - Datadog Agent가 BYOC Logs로 로그를 전송하도록 구성

[2]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
[3]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli
[4]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources
[5]: https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli
[6]: https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container
[7]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container
[8]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
[9]: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal
[10]: /ko/byoc-logs/ingest/agent/