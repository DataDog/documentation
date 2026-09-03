- Splunk HEC 주소:
    - 관측 가능성 파이프라인 Worker가 로그를 수신하기 위해 수신 대기하는 바인딩 주소는 원래 Splunk 인덱서용입니다. 예: `0.0.0.0:8088` 
    **참고**: `/services/collector/event`는 엔드포인트에 자동으로 추가됩니다.
    - 환경 변수 `DD_OP_SOURCE_SPLUNK_HEC_ADDRESS`에 저장됩니다.