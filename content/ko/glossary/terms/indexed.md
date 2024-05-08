---
core_product:
- log management
- apm
title: 인덱싱됨
---
인덱싱된 로그는 분석, 알림 및 트러블슈팅을 위해 수집, 처리 및 보관된 [로그][1]입니다.

인덱싱된 스팬은 15일 동안 Datadog에 저장된 [보존 필터][3]로 인덱싱된 [스팬][2]을 나타냅니다. 이는 [검색 스팬][4]에서 스팬에 포함된 [태그][5]로 검색, 쿼리 및 모니터링하는 데 사용할 수 있습니다.

<div class="alert alert-info">
수집 후 <a href="/tracing/trace_pipeline/trace_retention/">태그 기반 보존 필터</a>를 생성하면 서비스당 인덱싱되는 스팬 수를 정확하게 제어하고 시각화할 수 있습니다.
</div>

{{< img src="tracing/visualization/span_tag.png" alt="스팬 태그" style="width:80%" >}}

이 예시에서는 요청(`merchant.store_name` 및 `merchant.tier`)이 스팬에 태그로 추가되었습니다.

애플리케이션의 스팬에 태그를 지정하려면 [스팬 태그 추가][6] 가이드를 참조하세요.

스팬에 태그를 추가한 후 태그를 클릭해 [패싯][7]으로 추가하여 Analytics에서 해당 태그를 검색하고 쿼리합니다. 이 작업이 완료되면 이 태그의 값은 모든 새로운 트레이스에 대해 저장되며 검색 창, 패싯 패널 및 트레이스 그래프 쿼리에서 사용할 수 있습니다.

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="패싯 생성" style="width:50%;">}}

[1]: /ko/logs/
[2]: /ko/glossary/#span
[3]: /ko/glossary/#retention-filter
[4]: /ko/tracing/trace_explorer/search
[5]: /ko/getting_started/tagging
[6]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[7]: /ko/glossary/#facet