---
kind: 설명서
title: 카테고리 프로세서
---

카테고리 프로세서를 사용하여 제공된 검색 쿼리와 일치하는 이벤트에 새 속성(새 속성 이름에 공백이나 특수 문자 없이)을 추가합니다. 그런 다음 카테고리를 사용하여 분석 보기에 대한 그룹(예: URL 그룹, 머신 그룹, 환경 및 응답 시간 버킷)을 만듭니다.

**참고**:

* 쿼리 구문은 Event Explorer 검색 표시줄에 있는 구문입니다. 이 쿼리는 패싯인지 여부에 관계없이 모든 이벤트 속성 또는 태그에 대해 수행될 수 있습니다. 쿼리 내에서 와일드카드를 사용할 수도 있습니다.
* 이벤트가 프로세서 쿼리 중 하나와 일치하면 중지됩니다. 이벤트가 여러 쿼리와 일치할 수 있는 경우를 대비하여 순서가 올바르게 지정되었는지 확인하세요.
* 카테고리 이름은 고유해야 합니다.
* 카테고리 프로세서에 정의된 후에는 상태 리매퍼를 사용하여 카테고리를 상태에 매핑할 수 있습니다.

상태 코드 범위 값(`"OK" for a response code between 200 and 299, "Notice" for a response code between 300 and 399, ...`)을 기준으로 웹 액세스 이벤트를 분류하는 예제 카테고리 프로세서는 다음 프로세서를 추가합니다.

{{< img src="logs/log_configuration/processor/category_processor.png" alt="카테고리 프로세서" style="width:80%;" >}}

이 프로세서는 다음과 같은 결과를 생성합니다.

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="카테고리 프로세서 결과" style="width:80%;" >}}