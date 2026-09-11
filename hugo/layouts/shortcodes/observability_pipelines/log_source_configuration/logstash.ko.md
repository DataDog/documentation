Observability Pipelines Worker에 로그를 보내도록 Logstash를 구성하려면 다음 출력 구성을 사용하세요.

```
output {
    lumberjack {
        # 이 항목들을 업데이트하여 Observability Pipelines Worker로 연결되도록 하세요
        hosts => ["127.0.0.1"]
        port => 5044
        ssl_certificate => "/path/to/certificate.crt"
    }
}
```

**참고**: Logstash를 사용하려면 SSL을 구성해야 합니다.