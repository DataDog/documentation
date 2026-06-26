---
title: 룩업 프로세서
---

Lookup 프로세서를 사용하여 이벤트 속성 및 [참조 테이블][1]이나 프로세서 매핑 테이블에 저장된 읽기 가능한 값 간 매핑을 정의합니다.

예를 들어 Lookup 프로세서를 사용하여 CMDB 정보를 통해 이벤트를 강화할 수 있습니다. 또는 방금 프로덕션 환경 에 연결을 시도한 MAC 주소가 도난당한 컴퓨터의 목록에 속하는 경우 이를 사용하여 점검할 수 있습니다.

Lookup 프로세서는 다음 작업을 수행합니다.

* 현재 이벤트에 소스 속성이 포함되어 있는지 확인합니다.
* 소스 속성 값이 매핑 테이블에 존재하는지 확인합니다.
* 그렇다면 테이블에 해당 값으로 대상 속성을 생성합니다.
* 또는, 매핑 테이블에서 값을 찾을 수 없는 경우 `fallbackValue` 필드에 설정된 기본 대체 값을 사용하여 대상 속성을 생성합니다. `source_key,target_value` 쌍의 목록을 수동으로 입력하거나 **수동 매핑** 탭 에서 CSV 파일을 업로드할 수 있습니다. 


**수동 매핑**
    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="Lookup processor" style="width:80%;">}}


**참조 테이블**
    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="Lookup processor" style="width:80%;" >}}


 매핑 테이블의 크기 제한은 100Kb입니다. 이 제한은 플랫폼의 모든 Lookup 프로세서에 적용됩니다. 그러나 참조 테이블은 더 큰 파일 크기를 지원합니다.



[1]: /ko/integrations/guide/reference-tables/