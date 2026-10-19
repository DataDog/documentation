---
description: 호스트에서 여러 Pipelines 실행, 버퍼링 및 배압, Observability Pipelines Workers 확장을
  위한 모범 사례와 같은 주제에 대한 문서 링크를 찾으십시오.
disable_toc: false
title: 확장 및 성능
---
다양한 사용 사례를 포괄하도록 Observability Pipelines 아키텍처를 확장할 때:

- 서로 다른 소스에서 데이터를 보낼 수 있도록 호스트에서 여러 Pipelines 실행하려면 [호스트에서 여러 Pipelines 실행][1]의 지침을 따르십시오.
- Observability Pipelines는 시스템이 이벤트를 수신 즉시 처리할 수 없는 상황을 처리하기 위해 배압 신호와 버퍼링을 사용합니다. 자세한 내용은 [버퍼링 및 배압][2]을 참조하십시오.
- Observability Pipelines Workers를 확장할 때 각 Worker는 독립적으로 작동합니다. 권장되는 애그리게이터 아키텍처는 [Pipelines 확장을 위한 모범 사례][3]를 참조하십시오.

[1]: /ko/observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
[2]: /ko/observability_pipelines/scaling_and_performance/buffering_and_backpressure/
[3]: /ko/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/