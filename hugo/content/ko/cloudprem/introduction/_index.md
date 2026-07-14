---
description: CloudPrem 아키텍처, 구성 요소, 지원 기능 알아보기
title: CloudPrem 소개
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 Preview에서 만나보세요" >}}
  CloudPrem Preview에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

CloudPrem은 Datadog BYOC 로그 관리 솔루션입니다. 자체 인프라에서 실행되며, 로그를 인덱싱하고 객체 스토리지에 저장하고, 검색 및 분석 쿼리를 실행하며, Datadog UI에 연결하여 Datadog 제품과 완벽하게 통합된 환경을 제공합니다. CloudPrem은 다음과 같은 특정 요구 사항을 가진 조직을 위해 설계되었습니다.
- 데이터 거주지, 개인정보 보호 및 규제 요건
- 고볼륨 요구 사항

다음은 CloudPrem이 어떻게 작동하는지에 관한 개요입니다.

{{< img src="/cloudprem/overview_diagram_cloudprem.png" alt="CloudPrem 아키텍처 개요는 로그가 소스에서 CloudPrem을 거쳐 Datadog 플랫폼으로 흐르는 방식을 보여줍니다." style="width:100%;" >}}

이 다이어그램은 CloudPrem 하이브리드 아키텍처를 보여주며, 인프라 내에서 데이터가 처리되고 저장되는 방식을 강조합니다.

*   **수집**: Datadog Agents 및 기타 소스에서 표준 프로토콜을 사용하여 로그를 수집합니다.
*   **사용자 인프라**: CloudPrem 플랫폼은 완전히 사용자 인프라 내에서 실행됩니다. 로그를 처리하고 사용자 자체 스토리지(S3, Azure Blob, MinIO)에 저장합니다.
*   **Datadog SaaS**: Datadog 플랫폼은  CloudPrem's Control Plane이며, Datadog UI를 호스팅하고 보안 연결을 통해 CloudPrem과 통신하여 로그 쿼리를 전송하고 결과를 수신합니다.

{{< whatsnext desc="CloudPrem 아키텍쳐 및 기능을 살펴보세요:">}}
  {{< nextlink href="/cloudprem/introduction/architecture/" >}}아키텍처 - CloudPrem 구성 요소들이 어떻게 함께 작동하는지 알아보기{{< /nextlink >}}
  {{< nextlink href="/cloudprem/introduction/network/" >}}네트워크 - CloudPrem이 Datadog과 어떻게 통신하는지 알아보기{{< /nextlink >}}
  {{< nextlink href="/cloudprem/introduction/features/" >}}지원 기능 - CloudPrem에서 사용할 수 있는 Log Explorer 기능 확인하기{{< /nextlink >}}
{{< /whatsnext >}}

## 시작하기

{{< whatsnext desc="CloudPrem를 배포할 준비가 되었나요? 다음 가이드를 살펴보세요:">}}
  {{< nextlink href="/cloudprem/quickstart/" >}}빠른 시작 - CloudPrem을 5분 안에 로컬에서 실행하기{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/" >}}설치 - AWS, Azure, 커스텀 Kubernetes에서 CloudPrem 배포하기 {{< /nextlink >}}
  {{< nextlink href="/cloudprem/ingest/agent/" >}}로그 수집 - CloudPrem에 로그를 전송하도록 Datadog Agent 구성하기{{< /nextlink >}}
{{< /whatsnext >}}