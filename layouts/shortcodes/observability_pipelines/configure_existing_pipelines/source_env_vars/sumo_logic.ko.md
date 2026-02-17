- Sumo Logic 주소:
    - Observability Pipelines Worker가 Sumo Logic HTTP Source에 대해 원래 의도된 로그를 수신하는 바인드 주소입니다. 예: `0.0.0.0:80`
    **참고***: `/receiver/v1/http/` 경로가 자동으로 엔드포인트에 추가됩니다.
    - 환경 변수 `DD_OP_SOURCE_SUMO_LOGIC_ADDRESS`에 저장되었습니다.