---
aliases:
- /ko/observability_pipelines/processors/tail_based_sampling/
description: Observability Pipelines에서 로그, 메트릭 및 트레이스를 구문 분석, 구조화 및 보강하는 데 사용할 수 있는
  프로세서에 대해 알아보세요.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
  tag: 블로그
  text: Observability Pipelines를 사용하여 모든 SIEM 또는 로깅 공급업체에서 아카이브된 로그를 리하이드레이션하기
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: 블로그
  text: Datadog Observability Pipelines를 사용하여 로그를 변환하고 강화하세요.
title: 프로세서
---
## 개요 {#overview}

<div class="alert alert-info">이 설명서에서 설명하는 프로세서는 온프레미스 로깅 환경에만 적용됩니다. 클라우드 기반 로그를 구문 분석, 구조화 및 보강하려면 <a href="https://docs.datadoghq.com/logs/log_configuration/logs_to_metrics">Log Management</a> 설명서를 참조하세요.</div>

Observability Pipelines의 프로세서를 사용하여 로그와 메트릭을 구문 분석, 구조화 및 보강하세요. UI에서 파이프라인을 생성할 때 선택한 템플릿에 따라 미리 선택된 프로세서가 프로세서 그룹에 추가됩니다. 처리 요구 사항에 따라 프로세서를 추가하거나 기존 프로세서를 삭제할 수 있습니다.

프로세서 그룹은 위에서 아래로 실행됩니다. 각 프로세서는 이벤트를 검사하지만 해당 프로세서의 필터와 일치하는 이벤트만 처리하므로 프로세서의 순서가 중요합니다. 프로세서의 순서를 변경하려면 이동할 프로세서의 왼쪽 상단에 있는 드래그 핸들을 사용하세요.

**참고**: 파이프라인 캔버스의 경우, 프로세서 그룹 25개, 총 프로세서 수 150개의 한도가 있습니다.

## 프로세서 {#processors}

사용 가능한 프로세서는 다음과 같습니다.

{{< tabs >}}
{{% tab "로그" %}}

- [환경 변수 추가 프로세서][1]
- [호스트 이름 추가 프로세서][2]
- [사용자 지정 프로세서][3]
- [중복 제거 프로세서][4]
- [필드 편집 프로세서][5]
- [보강 표 프로세서][6]
- [필터 프로세서][7]
- [메트릭 생성 프로세서][8]
- [Grok 파서 프로세서][9]
- [JSON 구문 분석 프로세서][10]
- [XML 구문 분석 프로세서][11]
- [할당량 프로세서][12]
- [리듀스 프로세서][13]
- [OCSF 재매핑 프로세서][14]
- [샘플 프로세서][15]
- [Sensitive Data Scanner 프로세서][16]
- [배열 분할][17]
- [태그][18]
- [스로틀][19]

[1]: /ko/observability_pipelines/processors/add_environment_variables/
[2]: /ko/observability_pipelines/processors/add_hostname/
[3]: /ko/observability_pipelines/processors/custom_processor/
[4]: /ko/observability_pipelines/processors/dedupe/
[5]: /ko/observability_pipelines/processors/edit_fields/
[6]: /ko/observability_pipelines/processors/enrichment_table/
[7]: /ko/observability_pipelines/processors/filter/
[8]: /ko/observability_pipelines/processors/generate_metrics/
[9]: /ko/observability_pipelines/processors/grok_parser/
[10]: /ko/observability_pipelines/processors/parse_json/
[11]: /ko/observability_pipelines/processors/parse_xml/
[12]: /ko/observability_pipelines/processors/quota/
[13]: /ko/observability_pipelines/processors/reduce/
[14]: /ko/observability_pipelines/processors/remap_ocsf/
[15]: /ko/observability_pipelines/processors/sample/
[16]: /ko/observability_pipelines/processors/sensitive_data_scanner/
[17]: /ko/observability_pipelines/processors/split_array/
[18]: /ko/observability_pipelines/processors/tags/
[19]: /ko/observability_pipelines/processors/throttle/

{{% /tab %}}
{{% tab "메트릭" %}}

- [집계][1]
- [태그 편집][2]
- [필터][3]
- [태그 허용/차단 목록][4]
- [태그 카디널리티 제어][5]

[1]: /ko/observability_pipelines/processors/aggregate/
[2]: /ko/observability_pipelines/processors/edit_tags/
[3]: /ko/observability_pipelines/processors/filter/
[4]: /ko/observability_pipelines/processors/tag_allow_block_list/
[5]: /ko/observability_pipelines/processors/tag_cardinality_control/

{{% /tab %}}
{{< /tabs >}}

## 프로세서 그룹 {#processor-groups}

<div class="alert alert-info">프로세서 그룹을 사용한 파이프라인 구성은 Worker 2.7 이상 버전에서만 지원됩니다.</div>

{{< img src="observability_pipelines/processors/processor_groups.png" alt="Splunk HEC 소스에서 로그를 세 개의 프로세서 그룹으로 전송하는 파이프라인입니다. 각 그룹에는 자체 필터와 프로세서가 있으며 처리된 로그는 Microsoft Sentinel 및 Splunk HEC 대상으로 전송됩니다." style="width:100%;" >}}

프로세서를 논리적인 그룹으로 구성하면 더 쉽게 관리할 수 있습니다. 각 프로세서 그룹에는 그룹 필터가 있어 해당 프로세서가 특정 이벤트에만 적용됩니다. 예를 들어 그룹에 속한 프로세서가 `vpc`에서 전송된 이벤트만 처리하도록 하려면 그룹 필터 `source:vpc`를 사용하세요. 각 개별 프로세서에 대한 필터를 추가할 수도 있습니다.

프로세서 그룹과 각 그룹 내의 프로세서는 위에서 아래로 실행됩니다. 각 프로세서는 이벤트를 검사하지만 해당 프로세서의 필터와 일치하는 이벤트만 처리하므로 프로세서의 순서가 중요합니다. 프로세서의 순서를 변경하려면 이동할 프로세서의 왼쪽 상단에 있는 드래그 핸들을 사용하세요.

**참고**: 파이프라인 캔버스당 최대 25개의 프로세서 그룹을 사용할 수 있습니다. 예를 들어 대상이 두 개인 듀얼 전송(dual-ship) 파이프라인에서는 두 대상의 프로세서 그룹 수를 합쳐 25개를 초과할 수 없습니다. 한 대상에 15개, 다른 대상에 10개를 배치하는 등 프로세서 그룹은 원하는 조합으로 구성할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}