---
aliases:
- /ko/logs/processing
description: 로그 구성 페이지에서 로그를 처리, 보완, 제어 및 관리합니다.
further_reading:
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: 학습 센터
  text: 로그 파이프라인 디버깅
- link: /data_security/pci_compliance/
  tag: 설명서
  text: PCI DSS Compliance
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: 블로그
  text: Logging without Limits*에 대해 알아보기
- link: https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/
  tag: 블로그
  text: Datadog 로그 파이프라인 스캐너로 로그 프로세싱 조사하기
- link: /logs/guide/
  tag: 가이드
  text: Datadog을 활용한 로그 수집 추가 지침
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: 아키텍처 센터
  text: Datadog을 사용한 Log Management 인덱싱 전략 가이드
title: 로그 구성
---
## 개요 {#overview}

Datadog Logging without Limits*는 로그 수집과 인덱싱을 분리합니다. [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Pipelines{{< /ui >}}][1]의 로그 구성 페이지에서 인덱싱 및 보존할 로그를 선택하거나 아카이브하고, 최상위 수준의 설정 및 제어를 관리하세요.

Datadog MCP Server에 연결된 AI Agent를 통해서도 로그 파이프라인, 인덱스 및 아카이브를 관리할 수 있습니다. `logs-configuration` 도구 세트를 활성화하여 이러한 리소스를 조회, 생성, 업데이트, 삭제 및 재정렬하세요. Agent를 연결하려면 [Datadog MCP Server 설정][13]을 참조하세요. 사용 가능한 도구 및 예시 프롬프트는 [로그 구성 도구][14]를 참조하세요.

## 구성 옵션 {#configuration-options}

- [파이프라인][3]과 [프로세서][4]로 로그 처리 방식을 관리합니다.
- [속성 및 앨리어싱][5]을 설정하여 로그 환경을 통일합니다.
- 비용 효율적인 방식으로 [수집한 로그를 사용해 메트릭을 생성][6]하여 수집한 전체 스트림에서 로그 데이터를 요약합니다.
- [로그 인덱스][7]를 활용하여 로그 관리 예산을 세심하게 관리하세요.
- 수집한 로그를 자체 클라우드 호스팅 스토리지 버킷으로 전달하여 향후 문제 해결 또는 규정 준수 감사를 위한 [아카이브][8]로 보관합니다.
- Archive Search를 사용하여 [아카이브를 검색][12]하고 스토리지에서 직접 실시간으로 로그를 쿼리합니다. 전체 플랫폼 기능에 액세스하거나 로그를 더 오래 보존해야 하는 경우 **Search & Rehydration** 모드를 사용하세요.
- 제한 쿼리로 [로그 데이터 액세스][10]를 제한합니다.

## Log Explorer {#log-explorer}

설정을 완료한 후 [Log Explorer][11]에서 로그 조사 및 문제 해결을 시작하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /ko/data_security/pci_compliance/
[3]: /ko/logs/log_configuration/pipelines
[4]: /ko/logs/log_configuration/processors
[5]: /ko/logs/log_configuration/attributes_naming_convention/
[6]: /ko/logs/log_configuration/logs_to_metrics/
[7]: /ko/logs/log_configuration/indexes
[8]: /ko/logs/log_configuration/archives/
[10]: /ko/logs/guide/logs-rbac/
[11]: /ko/logs/explorer/
[12]: /ko/logs/explorer/archive_search/
[13]: /ko/mcp_server/setup/
[14]: /ko/mcp_server/tools/#logs-configuration