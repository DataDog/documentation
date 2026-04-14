---
description: CloudPrem에서 지원되는 Datadog Log Explorer 기능
title: 지원되는 기능
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 Preview에서 만나보세요" >}}
  CloudPrem Preview에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}
## 개요

Datadog CloudPrem은 Log Explorer의 핵심 기능을 자체 호스팅 환경으로 확장해 줍니다. 이 페이지에서는 제공되는 기능, SaaS 플랫폼과의 차이점, 로그 워크플로우 계획 수립에 도움이 되는 정보를 제공합니다.

## 지원 기능

다음과 같은 로그 기능을 이미 지원하고 있습니다.
- 로그 속성에 관한 전체 텍스트 검색
- 목록, 시계열, 상위 목록, 표, 트리 맵, 원형 차트, 산점도 시각화
- 필드 및 패턴별로 그룹화(월별 시간 이동 제외)
- Dashboards
- 로그 모니터
- [Log Restriction Queries][1]를 통한 RBAC
- CSV 다운로드
- 로그와 Datadog SaaS로 전송되는 메트릭 간의 상관관계 분석(역방향은 아직 지원되지 않음)
- 로그와 Datadog SaaS로 전송된 트레이스 간의 상관관계 분석(역방향은 아직 지원되지 않음)

## 미지원 기능

기능 지원은 지속적으로 발전하고 있으나 현재 다음 기능은 지원되지 않습니다.
- Bits AI SRE
- 다양한 보존 기간 및 세분화 요구 사항에 대한 인덱스 관리
- Notebooks
- 통합 검색
- LiveTail
- Watchdogs

[1]: /ko/api/latest/logs-restriction-queries/