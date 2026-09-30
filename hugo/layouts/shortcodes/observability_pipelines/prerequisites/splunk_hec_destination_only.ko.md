Observability Pipelines의 Splunk HEC 대상을 사용하려면, HTTP 이벤트 컬렉터(Collector) (HEC) 입력으로 구성된 Splunk Enterprise 또는 Cloud 인스턴스가 있어야 합니다. 또한 다음 정보를 사용할 수 있습니다:

- Splunk HEC 토큰.
- Observability Pipelines Worker가 애플리케이션으로부터 로그를 수신하기 위해 수신 대기할 바인딩 주소입니다. 예를 들어 `0.0.0.0:8080`입니다. 나중에 [애플리케이션](#send-logs-to-the-observability-pipelines-worker-over-splunk-hec)을 설정하여 로그를 이 주소로 전송합니다.
- Worker가 처리된 로그를 전송할 Splunk 인스턴스의 기본 URL입니다. 이 URL에는 Splunk 인스턴스에서 Splunk HTTP 이벤트 수집기에 대해 전역적으로 설정된 포트가 포함되어야 합니다. 예를 들어, Splunk Cloud의 경우: `https://prd-p-0mupp.splunkcloud.com:8088`입니다.
- HEC가 SSL을 활성화하도록 전역적으로 구성된 경우 개인 키 파일을 생성하는 데 사용한 적절한 [TLS 인증서][3001] 및 비밀번호도 필요합니다.

Splunk HEC 설정에 대한 자세한 내용은 [Splunk Web에서 HTTP 이벤트 컬렉터 구성][3002]을 참조하세요.

**참고**: Observability Pipeline은 HEC Indexe 승인을 지원하지 않습니다.

[3001]: https://docs.splunk.com/Documentation/Splunk/9.2.0/Security/StepstosecuringSplunkwithTLS#2._Obtain_the_certificates_that_you_need_to_secure_your_Splunk_platform_deployment
[3002]: https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/UsetheHTTPEventCollector