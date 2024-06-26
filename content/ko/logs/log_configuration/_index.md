---
aliases:
- /ko/logs/processing
description: 로그 설정 페이지에서 로그를 처리, 보완, 제어 및 관리합니다.
further_reading:
- link: /data_security/pci_compliance/
  tag: 설명서
  text: PCI 준수 Datadog 조직 설정하기
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: 블로그
  text: 제한없는 로그 수집*에 대해 자세히 알아보세요.
- link: https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/
  tag: 블로그
  text: Datadog 로그 파이프라인 스캐너로 로그 프로세싱 조사하기
- link: /logs/guide/
  tag: 지침
  text: Datadog을 활용한 로그 수집 추가 지침
kind: 설명서
title: 로그 설정
---

## 개요

제한 없는 Datadog 로깅*은 로그 수집과 인덱싱을 분리합니다. [**로그 > 파이프라인**][1]의 로그 설정 페이지에서 최상위 수준에서 색인을 생성하고 보존하거나 보관하고 설정 및 제어를 관리할 로그를 선택합니다.

**참고**: PCI 준수 Datadog 조직을 설정하는 방법에 대한 자세한 내용을 확인하려면 [PCI DSS 준수][2]를 참조하세요.

## 설정 옵션

- [파이프라인][3]과 [프로세서][4]로 로그 처리 방식을 관리합니다.
- [속성 및 앨리어싱][5]을 설정하여 로그 환경을 통일합니다.
- 비용 효율적인 방식으로 [수집한 로그를 사용해 메트릭을 생성][6]하여 수집한 전체 스트림에서 로그 데이터를 요약합니다.
- [로그 인덱스][7]를 활용하여 로그 관리 예산을 세심하게 관리하세요.
- 수집한 로그를 자체 클라우드 호스팅 스토리지 버킷으로 전달하여 향후 트러블슈팅 또는 규정 준수 감사용으로 [아카이브][8]로써 보관합니다.
- [아카이브 리하이드레이트][9]로 오래되었거나 인덱싱에서 제외한 로그 이벤트를 분석 또는 조사합니다.
- 제한 쿼리로 [로그 데이터 액세스][10]를 제한합니다.

## 로그 탐색기

설정을 완료한 후 [로그 탐색기][11]에 로그 조사 및 트러블슈팅을 시작합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*제한없는 로그 수집(Logging without Limits)은 Datadog, Inc.의 상표입니다.

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /ko/data_security/pci_compliance/
[3]: /ko/logs/log_configuration/pipelines
[4]: /ko/logs/log_configuration/processors
[5]: /ko/logs/log_configuration/attributes_naming_convention/
[6]: /ko/logs/log_configuration/logs_to_metrics/
[7]: /ko/logs/log_configuration/indexes
[8]: /ko/logs/log_configuration/archives/
[9]: /ko/logs/log_configuration/rehydrating
[10]: /ko/logs/guide/logs-rbac/
[11]: /ko/logs/explorer/