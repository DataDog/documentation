---
aliases:
- /ko/llm_observability/evaluations/quality_evaluations
- /ko/llm_observability/configure/evaluations/quality_evaluations
- /ko/llm_observability/evaluations/managed_evaluations/quality_evaluations
- /ko/llm_observability/configure/evaluations/managed_evaluations/quality_evaluations
- /ko/llm_observability/evaluations/managed_evaluations/language_mismatch/
- /ko/llm_observability/configure/evaluations/language_mismatch/
description: Datadog의 언어 불일치(Language Mismatch) 평가자에 대해 알아보십시오.
further_reading:
- link: /llm_observability/quickstart/terms/
  tag: 문서
  text: Agent Observability 용어 및 개념에 대해 알아보기
- link: /llm_observability/setup
  tag: 문서
  text: Agent Observability 설정 방법 알아보기
title: 언어 불일치
---
이 검사는 LLM이 사용자가 사용하는 언어나 방언과 다른 언어로 응답을 생성하는 경우를 식별하며, 이는 혼란이나 의사소통 오류를 초래할 수 있습니다. 이 검사는 LLM의 응답이 사용자의 언어적 선호도와 요구 사항에 맞게 명확하고 관련성이 있으며 적절한지 확인합니다.

언어 불일치는 자연어 프롬프트에 대해서만 지원됩니다. JSON, 코드 조각 또는 특수 문자와 같은 구조화된 데이터로 주로 구성된 입력 및 출력 쌍은 언어 불일치로 표시되지 않습니다.

{{% collapse-content title="지원되는 언어" level="h5" %}}
아프리칸스어, 알바니아어, 아랍어, 아르메니아어, 아제르바이잔어, 벨라루스어, 벵골어, 노르웨이어(보크몰), 보스니아어, 불가리아어, 중국어, 크로아티아어, 체코어, 덴마크어, 네덜란드어, 영어, 에스토니아어, 핀란드어, 프랑스어, 조지아어, 독일어, 그리스어, 구자라트어, 히브리어, 힌디어, 헝가리어, 아이슬란드어, 인도네시아어, 아일랜드어, 이탈리아어, 일본어, 카자흐어, 한국어, 라트비아어, 리투아니아어, 마케도니아어, 말레이어, 마라티어, 몽골어, 노르웨이어(뉘노르스크), 페르시아어, 폴란드어, 포르투갈어, 펀자브어, 루마니아어, 러시아어, 세르비아어, 슬로바키아어, 슬로베니아어, 스페인어, 스와힐리어, 스웨덴어, 타밀어, 텔루구어, 태국어, 터키어, 우크라이나어, 우르두어, 베트남어, 요루바어, 줄루어
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/language_mismatch_4.png" alt="Agent Observability에서 오픈 소스 모델에 의해 감지된 언어 불일치 평가" style="width:100%;" >}}

| 평가 단계 | 평가 방법 | 평가 정의 |
|---|---|---|
| 입력 및 출력에 대해 평가됨 | 오픈 소스 모델을 사용하여 평가됨 | 언어 불일치는 각 프롬프트-응답 쌍이 LLM 애플리케이션이 사용자의 질문에 사용자가 사용한 언어와 동일한 언어로 답변했는지 여부를 표시합니다. |