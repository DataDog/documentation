---
aliases:
- /ko/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/
- /ko/tracing/troubleshooting/correlating-logs-not-showing-up-in-the-trace-id-panel/
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/
  tag: 설명서
  text: 트레이스와 로그 상호 연결하기
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 설명서
  text: 제품 간 상호 연결을 활용한 쉬운 트러블슈팅
title: 상호 연결된 로그가 트레이스 ID 패널에 표시되지 않는 경우
---

## 개요

[트레이스][1] 패널에는 트레이스, 호스트, 관련 로그 정보가 포함되어 있습니다. 

{{< img src="tracing/troubleshooting/tracing_no_logs_in_trace.png" alt="빈 로그 섹션이 표시된 트레이스 페이지" style="width:90%;">}}

다음은 [트레이스][1]에 표시되는 로그의 네 가지 유형입니다.

- `trace_id`: 해당 트레이스 ID가 있는 로그를 표시합니다.
- `host`: 트레이스의 타임프레임 내의 트레이스 호스트 로그를 표시합니다.
- `container_id`: 트레이스의 타임프레임 내의 트레이스 컨테이너 로그를 표시합니다.
- `pod_name`: 트레이스의 타임프레임 내의 트레이스 포트 로그를 표시합니다.

{{< img src="tracing/troubleshooting/tracing_logs_display_option.png" alt="트레이스 ID 및 호스트 옵션을 표시하는 트레이스의 로그 드롭다운 메뉴" style="width:80%;">}}

경우에 따라 트레이스 패널의 **로그** 섹션이 비어 있는 것처럼 보일 수도 있습니다. 본 지침에서는 이 문제를 해결하는 방법을 알아봅니다.

## 인프라스트럭처 옵션

`host`, `container_id` 또는 `pod_name` 옵션의 **로그** 섹션이 비어 있으면, [로그 탐색기][2]로 이동하여 다음 조건을 확인합니다.

1. 트레이스를 내보내는 호스트/컨테이너/포드에서 로그가 전송되고 있는지 확인합니다.
2. 트레이스의 타임프레임 내 호스트용 로그가 있는지 확인합니다.
3. 로그 타임스탬프가 올바르게 설정되었는지 확인합니다. 자세한 내용을 확인하려면 [예상 타임스탬프가 표시되지 않는 로그][3] 항목을 참조하세요.

## 트레이스 ID 옵션

**로그** 섹션의 `trace_id` 옵션이 비어 있는 경우, 로그에 표준 `trace_id` 속성이 있는지 확인하세요. 로그에 `trace_id`가 포함되지 않은 경우 [트레이스 및 로그][4]를 상호 연결하여 다음 작업을 수행합니다.

1. 로그 속성에서 트레이스 ID를 추출합니다.
2. 해당 속성을 예약된 `trace_id` 속성으로 다시 매핑합니다.

   {{< tabs >}}
   {{% tab "JSON logs" %}}

   JSON 로그의 경우 1단계 및 2단계는 자동 수행됩니다. 트레이서는 [트레이스][1] 및 [스팬(span)][2] ID를 로그에 추가하며, 이를 [예약된 속성 리매퍼][3]가 자동으로 리매핑합니다.

   프로세스가 예상대로 작동하지 않는 경우, 트레이스 ID가 포함된 로그 속성 이름이 `dd.trace_id` 인지 확인합니다. 아울러, [예약된 속성][4]의 트레이스 ID 섹션에서 속성이 정확하게 설정되었는지 확인하세요.

{{< img src="tracing/troubleshooting/trace_id_reserved_attribute_mapping.png" alt="트레이스 ID 섹션이 하이라이트 표시된 JSON 로그 전처리 페이지" >}}

[1]: /ko/tracing/glossary/#trace
[2]: /ko/tracing/glossary/#spans
[3]: /ko/logs/log_configuration/processors/#remapper
[4]: https://app.datadoghq.com/logs/pipelines/remapping
   {{% /tab %}}
   {{% tab "With Log integration" %}}

   원시 로그(특정 언어용 [로그 통합][1] 기능을 사용하여 로그를 수집할 시)의 경우, `java`, `python`, `ruby` 등과 같은 언어에 `source` 속성을 설정합니다. 통합은 트레이스와 로그를 자동으로 상호 연결시킵니다.

   다음은 자바(Java) 통합 파이프라인을 설명하는 예시입니다.

{{< img src="tracing/troubleshooting/tracing_java_traceid_remapping.png" alt="강조 표시된 트레이스 ID 리매퍼와 자바 로그 파이프라인" style="width:90%;">}}

   로그 형식이 통합 파이프라인에서 인식되지 않을 수도 있습니다. 이러한 경우 파이프라인을 복제하고 [파싱 트러블슈팅 지침][2]에 따라 파이프라인이 해당 로그 형식을 허용하는지 확인합니다.

[1]: /ko/logs/log_collection/?tab=application#setup
[2]: /ko/logs/faq/how-to-investigate-a-log-parsing-issue/
   {{% /tab %}}
   {{% tab "Custom" %}}

   통합을 사용하지 않는 원시 로그의 경우 다음에 따릅니다.

   1. 커스텀 파싱 규칙이 다음 예제와 같이 [트레이스][1] 및 [스팬(span)][2] ID를 문자열로 추출하는지 확인합니다.

      {{< img src="tracing/troubleshooting/tracing_custom_parsing.png" alt="샘플 로그, 파싱 규칙, 추출 섹션에서 트레이스 ID가 강조 표시되어 있는 커스텀 파서" style="width:90%;">}}

   2. 그 다음 추출한 특성에 [트레이스 리매퍼][3]를 정의하여 공식 로그 트레이스 ID로 리매핑합니다.

[1]: /ko/tracing/glossary/#trace
[2]: /ko/tracing/glossary/#spans
[3]: /ko/logs/log_configuration/processors/#trace-remapper
   {{% /tab %}}
   {{< /tabs >}}

ID가 정확하게 삽입되고 로그에 리매핑되면 트레이스 패널에서 해당 트레이스에 연결된 로그를 확인할 수 있습니다.

{{< img src="tracing/troubleshooting/trace_id_injection.png" alt="상호 연결된 로그가 있는 로그 섹션을 표시하는 트레이스 페이지" style="width:90%;">}}

**참고**: 트레이스 ID 및 스팬(span) ID는 UI의 로그 또는 로그 속성에 표시되지 않습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/glossary/#trace
[2]: https://app.datadoghq.com/logs
[3]: /ko/logs/guide/logs-not-showing-expected-timestamp/
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/