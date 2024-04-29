---
kind: faq
title: jmx.yaml 오류, Include 섹션
---

`jmx.yaml` 파일 설정 시 다음과 같은 오류 메시지가 표시될 수 있습니다.

```text
initialize check class [ERROR]: "Each configuration must have an 'include' section. See https://docs.datadoghq.com/integrations/java/ for more information"
```

이 경우 yaml 파일의 잘못된 들여쓰기로 오류가 발생합니다. 예를 들어, 아래 스크린샷에서 'include' 뒤에 'domain'의 들여쓰기가 없는 것을 확인할 수 있습니다. 이로 인해 해당 오류가 발생합니다.

{{< img src="integrations/faq/incorrect_jmx_include.png" alt="incorrect_jmx_include" >}}

위의 코드를 [온라인 YAML 파서][1]에 삽입하면 오른쪽 창에 JSON 객체가 표시되며, "include" 값이 'null'로 출력되는 것을 확인할 수 있습니다.

이를 수정하려면 하단의 그림과 같이 'include' 아래 줄을 오른쪽으로 두 칸 들여쓰기합니다. 이렇게 하면 'include'가 'null'로 등록되지 않습니다.
{{< img src="integrations/faq/correct_jmx_include.png" alt="correct_jmx_include" >}}

[1]: http://yaml-online-parser.appspot.com