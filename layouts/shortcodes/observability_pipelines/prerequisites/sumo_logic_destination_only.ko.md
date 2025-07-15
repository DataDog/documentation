관찰 가능성 파이프라인의 Sumo Logic 대상을 사용하려면 HTTP 로그 소스가 있는 호스팅된 Sumo Logic(컬렉터(Collector))과 다음 정보를 사용할 수 있어야 합니다.
- 관측 가능성 파이프라인 Worker가 수신 대기할 바인딩 주소 로그입니다. 예: `0.0.0.0:80`
- Worker가 처리된 로그을 전송할 Sumo Logic HTTP 로그 소스의 URL입니다. 이 URL은 호스팅된 컬렉터(Collector) 을 설정하고 HTTP 로그 및 메트릭 소스를 설정하면 Sumo Logic에서 제공합니다.

자세한 내용은 [Sumo Logic에서 HTTP 로그 소스 구성][101]을 참조하세요.

[101]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/