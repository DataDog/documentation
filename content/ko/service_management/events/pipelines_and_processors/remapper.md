---
kind: 설명서
title: 리매퍼
---

## 개요

리매퍼 프로세서는 모든 소스 속성 또는 태그를 다른 대상 속성 또는 태그로 다시 매핑합니다. 예를 들어 Events Explorer에서 `firstname`을 기준으로 `user`를 다시 매핑하여 로그를 타겟팅하도록 합니다.

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="다시 매핑 후 속성" style="width:60%;">}}

`:` 또는 `,` 등의 추가 제약 조건은 대상 태그/속성 이름에 허용되지 않습니다.

리매퍼의 대상이 속성인 경우 리매퍼는 값을 새 유형(`String`, `Integer`, `Double`)으로 캐스팅하려고 시도할 수도 있습니다. 캐스팅이 불가능하면 원래 유형이 유지됩니다.

**참고**: `Double`에 대한 소수점 구분 기호는 `.`이어야 합니다.


[**Pipelines** 페이지][1]에서 리매퍼 프로세서를 정의합니다. 예를 들어 `user`를 `user.firstname`로 다시 매핑합니다.

{{< img src="logs/log_configuration/processor/remapper.png" alt="속성 리매퍼 프로세서" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines