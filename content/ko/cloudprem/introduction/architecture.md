---
aliases:
- /ko/cloudprem/architecture/
further_reading:
- link: /cloudprem/install/
  tag: 설명서
  text: CloudPrem 설치 사전 조건
title: 아키텍처
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem Preview 신청" >}}
  CloudPrem Preview에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

{{< img src="/cloudprem/overview_architecture.png" alt="CloudPrem 아키텍처는 Indexers, Searchers, Metastore, Control Plane 구성 요소가 객체 스토리지와 상호 작용하는 방식을 보여줍니다." style="width:100%;" >}}

CloudPrem은 컴퓨팅(인덱싱 및 검색)과 데이터를 객체 스토리지에 분리하는 디커플링 아키텍처를 사용합니다. 이를 통해 워크로드 요구에 따라 클러스터의 각 구성 요소를 독립적으로 확장하고 최적화할 수 있습니다.

## 구성 요소

일반적으로 Kubernetes(EKS)에 배포되는 CloudPrem 클러스터는 다음과 같은 여러 구성 요소로 이루어져 있습니다.

**Indexers**
: Datadog Agents로부터 로그를 수신하는 역할을 담당합니다. 인덱서는 로그를 처리하고, 인덱싱하고, _splits_라는 인덱스 파일에 저장하여 객체 스토리지(예: Amazon S3)에 저장합니다.

**Searchers**
: Datadog UI에서 검색 쿼리를 처리하고, Metastore에서 메타데이터를 읽고, 객체 스토리지에서 데이터를 가져옵니다.

**Metastore**
: 인덱스에 대한 메타데이터(객체 스토리지의 분할 위치 포함)를 저장합니다. CloudPrem은 이를 위해 PostgreSQL을 사용합니다.

**Control Plane**
: 인덱서에서 _indexing pipelines_라고 하는 인덱싱 작업을 예약합니다.

**Janitor**
: 유지 관리 작업을 하며, 보존 정책을 적용하고, 만료된 분할 데이터를 수집하고, 삭제 쿼리 작업을 실행합니다.


## Datadog UI에 연결

Datadog UI를 CloudPrem에 연결하는 방법은 두 가지가 있습니다.
- [**Reverse connection**][1]: CloudPrem이 Datadog에 양방향 gRPC 요청을 시작하도록 합니다.
- [**Datadog으로부터 외부 요청 수신**][2]: Datadog에 gRPC 요청에 대한 DNS 엔드포인트를 제공하고 해당 요청을 수락하도록 공개 Ingress를 구성합니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloudprem/introduction/network/
[2]: /ko/cloudprem/configure/ingress/