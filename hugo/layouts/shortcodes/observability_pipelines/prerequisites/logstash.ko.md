Observability Pipelines의 Logstash 소스를 사용하려면 다음 정보가 필요합니다.

- Logstash 주소(예: `0.0.0.0:8088`). Observability Pipelines Worker는 이 바인드 주소를 통해 애플리케이션 로그를 수신합니다. 나중에 애플리케이션에서 이 주소로 로그를 전송하도록 구성합니다.
- 포워더가 SSL을 사용하도록 전역적으로 구성된 경우, 개인 키를 생성할 때 사용한 적절한 TLS 인증서 및 비밀번호.