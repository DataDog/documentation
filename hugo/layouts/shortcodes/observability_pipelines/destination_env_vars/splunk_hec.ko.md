Splunk HEC 토큰과 Splunk 인스턴스의 기본 URL을 입력합니다. 자세한 내용은 [필수 구성 요소](#prerequisites)를 참조하세요.

Worker는 HEC 토큰을 Splunk 수집 엔드포인트로 전달합니다. Observability Pipelines Worker가 로그를 처리한 후 로그를 지정된 Splunk 인스턴스 URL로 전송합니다.

**참고**: Splunk HEC 대상은 대상을 설정하는지에 관계없이 모든 로그를 `/services/collector/event` 엔드포인트로 전달하여 출력을 `JSON` 또는 `raw`로 인코딩합니다.