---
description: 데이터베이스 모니터링 설정 트러블슈팅
title: 데이터베이스 모니터링 트러블슈팅
---
{{< site-region region="gov" >}}
해당 지역에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}

이 페이지는 데이터베이스 모니터링을 설정하고 사용하는 방법과 관련된 일반적인 데이터베이스 외 문제와 해결 방법을 상세히 보여줍니다. 에이전트 버전 릴리스에 따라 변경될 수 있으므로 Datadog는 안정적인 최신 에이전트 버전을 사용하고 최신 [설정 설명서][1]를 참조할 것을 권장합니다.

구체적인 데이터베이스 설정 트러블슈팅의 경우 해당하는 트러블슈팅 페이지를 사용하세요.

* [트러블슈팅 MySQL 설정][2]
* [Postgres 설정 트러블슈팅][3]
* [SQL 서버 설정 트러블슈팅][4]

## 일반적인 문제 진단
### 쿼리 바인드 파라미터는 볼 수 없습니다.

현재 원본 쿼리 바인드 파라미터는 쿼리 샘플과 실행 계획에서 난독화되며 `?` 문자로 대체됩니다. 향후 릴리스에서 비난독화된 쿼리 바인드 파라미터 노출 설정이 포함될 예정입니다.


### DBM 호스트 제한

모니터링되는 데이터베이스의 복잡성에 따라 한 에이전트에 너무 많은 DBM 호스트가 있으면 에이전트가 오버로드되고 데이터 수집이 지연될 수 있습니다. 에이전트가 오버로드되면 `Job loop stopping due to check inactivity in the Agent logs`와 같은 경고가 나타날 수 있습니다.

최대 10개의 DBM 호스트에서 단일 Datadog 에이전트 모니터를 포함할 것을 권장합니다. 10개 이상의 DBM 호스트가 있는 경우 여러 Datadog 에이전트에 분산하는 것을 고려해 보시기 바랍니다.


### Datadog에서 DBM 데이터 표시 안 됨: 연결 문제?

설정이 올바르지만 DBM 페이지에서 데이터가 보이지 않는 경우, 에이전트가 Datadog 데이터 수집 엔드포인트에 데이터를 전송할 수 없을 수 있습니다. 연결 문제를 진단하려면 에이전트가 실행되는 위치에서 다음 연결 트러블슈팅 단계를 수행합니다.

1. DBM 수집 엔드포인트에서 TCP 연결성 테스트:

```
telnet dbm-metrics-intake.datadoghq.com 443
telnet dbquery-intake.datadoghq.com 443
```

2. 양 DBM 엔드포인트에서 잘못된 API 키를 사용해 빈 페이로드 게시를 테스트해 보세요.
이러한 명령은 HTTP 코드 `403: Forbidden`를 사용하면 실패합니다.

```
curl -vvv -X POST "https://dbm-metrics-intake.datadoghq.com/api/v2/databasequery" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: NONE" \
-d "[{}]"

curl -vvv -X POST "https://dbquery-intake.datadoghq.com/api/v2/databasequery" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: NONE" \
-d "[{}]"
```

요청이 전송되고 응답이 수신된 경우 응답은  `{"status":"error","code":403,"errors":["Forbidden"],...}`을 포함해야 합니다. 

연결 실패의 일반적인 원인에는 [프록시 설정][7] 및 방화벽이 포함되며, Datadog 엔드포인트로 아웃바운드 트래픽을 보내는 경우가 이에 해당합니다. 프록시 또는 방화벽이 있는 경우 DMB 엔드포인트의 IP 주소가 허용되었는지 확인하세요. 이 주소는 `https://ip-ranges.`({{< region-param key="dd_site" code="true" >}})에서 APM 블록에서 찾을 수 있습니다.

## 더 많은 지원이 필요하세요?

여전히 문제가 있다면 [Datadog 지원][5]에 문의하여 도움을 받으세요.


[1]: /ko/database_monitoring/#getting-started
[2]: /ko/database_monitoring/setup_mysql/troubleshooting/
[3]: /ko/database_monitoring/setup_postgres/troubleshooting/
[4]: /ko/database_monitoring/setup_sql_server/troubleshooting/
[5]: /ko/help/
[7]: /ko/agent/proxy/?tab=linux