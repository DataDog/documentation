---
aliases:
- /ko/cloudprem/introduction/
description: BYOC Logs 아키텍처, 구성 요소 및 지원되는 기능에 대해 알아보기
title: BYOC Logs 소개
---
## 개요 {#overview}

BYOC Logs (BYOC: Bring Your Own Cloud)는 사용자의 자체 인프라에서 실행되는 Datadog의 로그 관리 솔루션입니다. 이 솔루션은 사용자의 객체 스토리지에 로그를 인덱싱 및 저장하고, 검색 및 분석 쿼리를 실행하며, Datadog UI에 연결하여 완전히 통합된 환경을 제공합니다. BYOC Logs는 다음과 같은 특정 요구 사항이 있는 조직을 위해 설계되었습니다.
- 데이터 레지던시, 개인정보 보호 및 규제 요구 사항
- 대용량 처리 요구 사항

BYOC Logs의 작동 방식에 대한 개요는 다음과 같습니다.

{{< img src="/cloudprem/overview_diagram_byoc.png" alt="로그가 소스에서 BYOC Logs를 거쳐 Datadog 플랫폼으로 전달되는 방식을 보여주는 BYOC Logs 아키텍처 개요" style="width:100%;" >}}

이 다이어그램은 BYOC Logs의 하이브리드 아키텍처와 사용자의 인프라 내 데이터 처리 및 저장 방식을 보여줍니다.

*   **수집**: 표준 프로토콜을 사용하여 Datadog Agent 및 기타 소스에서 로그를 수집합니다.
*   **사용자 인프라**: BYOC Logs 플랫폼은 전적으로 사용자의 인프라 내부에서 실행됩니다. 사용자의 자체 객체 스토리지(Amazon S3, Google Cloud Storage 또는 Azure Blob Storage)에서 로그를 처리하고 저장합니다.
*   **Datadog SaaS**: Datadog 플랫폼은 BYOC Logs의 Control Plane입니다. Datadog UI를 호스팅하며 보안 연결을 통해 BYOC Logs와 통신하여 로그 쿼리를 전송하고 결과를 수신합니다.

{{< whatsnext desc="BYOC Logs의 아키텍처와 기능을 살펴보세요.">}}
  {{< nextlink href="/byoc-logs/introduction/architecture/" >}}아키텍처 - BYOC Logs 구성 요소가 어떻게 함께 작동하는지 알아보세요.{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/introduction/network/" >}}네트워크 - BYOC Logs가 Datadog과 어떻게 통신하는지 알아보세요.{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/introduction/features/" >}}지원되는 기능 - BYOC Logs에서 사용할 수 있는 Log Explorer 기능을 확인하세요.{{< /nextlink >}}
{{< /whatsnext >}}

## 시작하기 {#get-started}

{{< whatsnext desc="BYOC Logs를 배포할 준비가 되셨나요? 다음 가이드를 따르세요.">}}
  {{< nextlink href="/byoc-logs/quickstart/" >}}빠른 시작 - 5분 안에 로컬 환경에서 BYOC Logs를 실행합니다.{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/install/" >}}설치 - AWS, GCP 또는 Azure에 BYOC Logs를 배포합니다.{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/ingest/agent/" >}}로그 수집 - Datadog Agent를 구성하여 BYOC Logs로 로그를 전송합니다.{{< /nextlink >}}
{{< /whatsnext >}}