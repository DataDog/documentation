---
description: CloudPrem용 Azure 구성 방법
further_reading:
- link: /cloudprem/install/azure_aks/
  tag: 설명서
  text: Azure AKS에 CloudPrem 설치
- link: /cloudprem/ingest_logs/
  tag: 설명서
  text: 로그 수집 구성
title: Azure 구성
---

## 개요

Azure에 CloudPrem을 설치하기 전에 지원 인프라 리소스를 설정해야 합니다. 이러한 구성 요소는 CloudPrem이 의존하는 기본 컴퓨팅, 스토리지, 데이터베이스, 네트워킹 서비스를 제공합니다. 이 문서에서는 [Azure AKS 설치 가이드][1]에 설명된 설치 단계로 진행하기 전에 Azure 계정에 설정해야 하는 모든 리소스를 설명합니다.

### 인프라 요구 사항
다음은 프로비저닝해야 하는 구성 요소입니다.

- [**Azure Kubernetes Service (AKS)**](#azure-kubernetes-service-aks): 예상되는 CloudPrem 워크로드에 맞춰 구성된 실행 중인 AKS 클러스터.
- [**PostgreSQL Flexible Server**](#azure-postgresql-flexible-server): CloudPrem이 메타데이터를 저장하는 데 사용할 Azure Database for PostgreSQL 인스턴스.
- [**Blob Storage container**](#blob-storage-container): CloudPrem 로그를 저장할 Azure Storage 컨테이너.
- [**클라이언트 ID 및 권한**](#client-identity-and-permissions): 스토리지 컨테이너에 대한 읽기/쓰기 액세스 권한이 있는 Azure AD 애플리케이션.
- [**NGINX Ingress Controller**](#nginx-ingress-controller): AKS 클러스터에 설치되어 외부 트래픽을 CloudPrem 서비스로 라우팅.
- **Datadog Agent**: AKS 클러스터에 배포되어 로그를 수집하고 CloudPrem으로 전송.

## Azure Kubernetes Service (AKS)

CloudPrem은 Kubernetes에서 완전히 실행됩니다. 워크로드에 필요한 CPU, 메모리, 디스크 공간이 충분히 구성된 AKS 클러스터가 필요합니다. 자세한 내용은 Kubernetes 클러스터 크기 조정 권장 사항을 참고하세요.

### AKS 클러스터 배포

- [Azure CLI를 사용하여 AKS 클러스터 배포][2]
- [Terraform을 사용하여 AKS 클러스터 배포][3]

### 클러스터 연결 상태 및 작동 여부 확인
클러스터에 접근 가능하고 노드가 `Ready` 상태인지 확인하려면 다음 명령을 실행하세요.
```shell
kubectl get nodes -o wide
```

## Azure PostgreSQL Flexible Server

CloudPrem은 메타데이터와 구성을 PostgreSQL 데이터베이스에 저장합니다. Datadog은 Azure Database for PostgreSQL Flexible Server를 권장합니다. 이 데이터베이스는 AKS 클러스터에서 접근 가능해야 하며, 가급적 프라이빗 네트워크가 활성화되어 있어야 합니다. 자세한 내용은 PostgreSQL 크기 조정 권장 사항을 참고하세요.

### PostgreSQL 데이터베이스 생성

- [Azure CLI를 사용하여 Azure Database for PostgreSQL Flexible Server 생성][4]
- [Terraform을 사용하여 Azure Database for PostgreSQL Flexible Server 생성][5]

### 데이터베이스 연결 확인

<div class="alert alert-info">보안을 위해 CloudPrem 전용 데이터베이스와 사용자를 생성하고, 해당 사용자에게 클러스터 전체가 아닌 해당 데이터베이스에 대한 권한만 부여하세요.</div>

PostgreSQL 클라이언트 `psql`를 사용하여 AKS 네트워크 내에서 PostgreSQL 데이터베이스에 연결하세요. 먼저 `psql`을 포함하는 이미지를 사용하여 Kubernetes 클러스터에서 대화형 포드를 시작합니다.
```shell
kubectl run psql-client \
  -n <NAMESPACE_NAME> \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- bash
```

다음으로, 플레이스홀더 값을 실제 값으로 바꿔서 셸에서 다음 명령어를 직접 실행합니다.

```shell
psql "host=<HOST> \
      port=<PORT> \
      dbname=<DATABASE> \
      user=<USERNAME> \
      password=<PASSWORD>"
```

성공하면 다음과 유사한 메시지가 표시됩니다.
```shell
psql (15.2)
SSL connection (protocol: TLS...)
Type "help" for help.

<DATABASE>=>
```

## Blob Storage 컨테이너

CloudPrem은 Azure Blob Storage를 사용하여 로그를 저장합니다. 이를 위해 전용 컨테이너를 생성하세요.

### Blob Storage 컨테이너 생성
환경별로 전용 컨테이너를 사용하고(예: `cloudprem-prod`, `cloudprem-staging`), 스토리지 계정 범위가 아닌 컨테이너 수준에서 최소 권한 RBAC 역할을 할당합니다.

- [Azure CLI를 사용하여 Blob Storage 컨테이너 생성][6]
- [Terraform을 사용하여 Blob Storage 컨테이너 생성][7]

## 클라이언트 ID 및 권한

Azure AD 애플리케이션에는 Blob Storage 컨테이너에 대한 읽기/쓰기 액세스 권한이 부여되어야 합니다. CloudPrem 전용 애플리케이션을 등록하고 해당 서비스 주체에 위에서 생성한 Blob Storage 컨테이너용 `Contributor` 역할을 할당합니다.

### 애플리케이션 등록
[Microsoft Entra ID에 애플리케이션 등록][8]

### Contributor 역할 할당
[Blob 데이터 접근을 위한 Azure 역할 할당][9]

## NGINX Ingress Controller

### 퍼블릭 NGINX Ingress Controller

퍼블릭 수신은 Datadog의 컨트롤 플레인 및 쿼리 서비스가 공용 인터넷을 통해 CloudPrem 클러스터를 관리하고 쿼리하는데 반드시 필요합니다. 다음 메커니즘을 통해 CloudPrem gRPC API에 대한 안전한 액세스를 제공합니다.
- Datadog 서비스에서 발생하는 트래픽을 수락하는 인터넷 연결 Azure Load Balancer를 생성합니다.
- 수신 컨트롤러 레벨에서 종료되는 TLS 암호화를 구현합니다.
- Datadog과 CloudPrem 클러스터 간 통신에는 HTTP/2(gRPC)를 사용합니다.
- Datadog 서비스는 유효한 클라이언트 인증서를 제시하는 상호 TLS(mTLS) 인증이 필요합니다.
- 컨트롤러를 TLS 패스스루 모드로 구성하여 클라이언트 인증서를 `ssl-client-cert` 헤더와 함께 CloudPrem 포드로 전달합니다.
- 유효한 클라이언트 인증서 또는 인증서 헤더가 누락된 요청을 거부합니다.

퍼블릭 NGINX Ingress Controller를 생성하려면 다음 `nginx-public.yaml` Helm 값 파일을 사용하세요.

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

다음으로, 다음 명령어와 함께 Helm으로 컨트롤러를 설치하세요.

```shell
helm upgrade --install nginx-public ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-public \
  --create-namespace \
  -f nginx-public.yaml
```

컨트롤러 포드가 실행 중인지 확인하세요.
```shell
kubectl get pods -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

서비스가 외부 IP 주소를 노출하는지 확인합니다.
```shell
kubectl get svc -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

### 내부 NGINX Ingress Controller

내부 수신을 사용하면 Datadog Agents 및 해당 환경 내의 다른 로그 수집기에서 HTTP를 통해 로그를 수집할 수 있습니다. 다음 `nginx-internal.yaml` Helm 값 파일을 사용하여 공개 NGINX Ingress Controller를 생성하세요.

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

다음으로, 다음 명령어와 함께 Helm으로 컨트롤러를 설치하세요.

```shell
helm upgrade --install nginx-internal ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-internal \
  --create-namespace \
  -f nginx-internal.yaml
```

컨트롤러 포드가 실행 중인지 확인하세요.
```shell
kubectl get pods -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

서비스가 외부 IP 주소를 노출하는지 확인합니다.
```shell
kubectl get svc -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

## DNS

필요시 퍼블릭 로드 밸런서의 IP 주소를 가리키는 DNS 항목을 추가할 수 있으므로 향후 IP 주소가 변경되더라도 Datadog 측의 구성을 업데이트할 필요가 없습니다.

## 다음 단계

Azure 구성을 완료한 후

1. **Azure AKS에 CloudPrem 설치 ** - [Azure AKS 설치 가이드][1]를 따라 CloudPrem을 배포하세요.
2. **로그 수집 설정** - CloudPrem으로 로그 전송을 시작하도록 [로그 수집][10]을 구성하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloudprem/install/azure_aks
[2]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
[3]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli
[4]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources
[5]: https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli
[6]: https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container
[7]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container
[8]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
[9]: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal
[10]: /ko/cloudprem/ingest_logs/