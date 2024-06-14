---
aliases:
- /ko/logs/faq/log-parsing-best-practice
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 배우기
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: 로그 파싱 문제를 탐색하는 방법
kind: 가이드
title: 로그 파싱 - 모범 사례
---

Datadog을 사용하면 로그에서 모든 관련 정보를 추출하는 파서를 정의할 수 있습니다. 파싱 언어 및 가능성에 대한 자세한 내용은 [해당 문서][1]에서 확인할 수 있습니다.

이 문서에서는 Datadog Agent의 컬렉터 로그에서 로그를 파싱하는 방법을 안내합니다.

```text
2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
```

1. **작업 중인 샘플 로그를 항상 규칙에 주석으로 추가하세요**:
    {{< img src="logs/faq/parsing_best_practice_1.png" alt="파싱 모범 사례 1" >}}
   샘플 로그에서 파싱 규칙을 테스트할 수 있습니다. 처음으로 규칙을 작성하거나 파서 문제를 조사하거나 새 로그 형식을 지원하는 경우 유용합니다.

2. **별표를 사용하여 속성을 하나씩 파싱합니다**:
   첫 번째 초안에서는 전체 로그에 대한 파싱 규칙을 작성할 필요가 없습니다. 규칙 끝에 있는 `.*`를 사용하여 한 번에 하나의 규칙 속성을 확인할 수 있습니다. 이는 규칙의 끝에 오는 모든 항목과 일치합니다.
   예를 들어, 다음 내용에 관계없이 먼저 로그 날짜를 파싱한다고 가정해 보겠습니다. 다음 규칙을 만듭니다.
    {{< img src="logs/faq/parsing_best_practice_2.png" alt="파싱 모범 사례 2" >}}
   날짜가 올바르게 파싱되었음을 알 수 있습니다. 이제 다음 속성인 심각도로 이동할 수 있습니다.
   먼저 파이프를 이스케이프 처리하고(특수 문자는 이스케이프해야 함) 단어를 일치시켜야 합니다.
    {{< img src="logs/faq/parsing_best_practice_3.png" alt="파싱 모범 사례 3" >}}
   그런 다음 이 로그에서 원하는 속성을 모두 추출할 때까지 계속할 수 있습니다.

3. **올바른 매처 사용**:
   간단할수록 좋습니다. 예를 들어, 기본 `notSpace`가 작업을 수행하면 대부분의 경우 특정 패턴에 맞추어 복잡한 정규 표현을 정의할 필요는 없습니다. 
   파싱 규칙을 작성할 때 다음 매처를 염두에 두세요.

    * notSpace: 다음 공간까지 모든 것이 일치
    * data: 모든 것이 일치 (.*와 동일)
    * word: 모든 영숫자 문자와 일치
    * integer: 10진수 정수와 일치하고 이를 정수로 파싱

    대부분의 규칙은 이 네 가지 매처를 사용하여 작성할 수 있습니다. [파싱 문서][2]에서 사용 가능한 매처의 전체 목록을 확인하세요.

4. **KeyValue**:
   모든 속성을 자동으로 추출할 수 있는 키-값 필터가 있습니다.
   [일부 예시][3]를 통해 자세히 알아보세요.

5. **속성으로 추출하면 안 되는 로그 메시지의 일부 부분을 건너뛰는 방법**:
   예제를 다시 사용하세요.
    ```
    2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
    ```
   `dd.collector`의 정보는 가치가 없으며, 이를 속성으로 추출하지 않으려는 상황이라고 가정해 봅시다.
   이렇게 하려면 규칙의 추출 섹션을 제거하세요.
    {{< img src="logs/faq/parsing_best_practice_4.png" alt="파싱 모범 사례 4" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/parsing
[2]: /ko/logs/log_configuration/parsing/#matcher-and-filter
[3]: /ko/logs/log_configuration/parsing/#key-value-or-logfmt