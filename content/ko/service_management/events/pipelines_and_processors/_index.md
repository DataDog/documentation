---
title: 파이프라인 및 프로세서
---

## 개요

이벤트 관리는 파이프라인 및 프로세서를 사용하여 이벤트에 추가 처리를 추가하는 기능을 제공합니다.


### 일반 사용 사례
- CMDB의 추가 정보로 이벤트 강화
- 이벤트의 태그 표준화
- 이벤트 내의 콘텐츠에서 새 태그 생성


### 시작하기

시작하려면 먼저 관심 있는 이벤트(예: 소스 또는 태그)로 필터링할 수 있는 파이프라인을 생성해야 합니다. 파이프라인을 생성한 후에는 프로세서를 추가할 수 있습니다. 사용 가능한 프로세서는 다음과 같습니다.

- [Arithmetic Processor][1]
- [Date Remapper][2]
- [Category Processor][3]
- [Grok Parser][4]
- [Lookup Processor][5]
- [Remapper][6]
- [Service Remapper][7]
- [Status Remapper][8]
- [String Builder Processor][9]




[1]: /ko/service_management/events/pipelines_and_processors/arithmetic_processor
[2]: /ko/service_management/events/pipelines_and_processors/date_remapper
[3]: /ko/service_management/events/pipelines_and_processors/category_processor
[4]: /ko/service_management/events/pipelines_and_processors/grok_parser
[5]: /ko/service_management/events/pipelines_and_processors/lookup_processor
[6]: /ko/service_management/events/pipelines_and_processors/remapper
[7]: /ko/service_management/events/pipelines_and_processors/service_remapper
[8]: /ko/service_management/events/pipelines_and_processors/status_remapper
[9]: /ko/service_management/events/pipelines_and_processors/string_builder_processor