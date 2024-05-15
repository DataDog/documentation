---
description: SQL Server 데이터베이스에 데이터베이스 모니터링 설정
disable_sidebar: true
kind: 설명서
title: SQL Server 설정
---

{{< site-region region="gov" >}}
해당 지역에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}

### 지원되는 SQL Server 버전

|                 | 자체 호스팅 | Azure     | Amazon RDS | Google Cloud SQL | 참고 |
|-----------------|-------------|-----------|------------|------------------|------|
| SQL Server 2012 | {{< X >}}   |           |            |                  | SQL Server 2012는 2022년 7월 12일에 수명이 종료되었습니다. 데이터베이스 모니터링은 [알려진 제한 사항][1]이 있는 SQL Server 2012를 계속 지원합니다. |
| SQL Server 2014 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2016 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2017 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2019 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL 서버 2022 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |

설정 지침을 보려면 호스팅 유형을 선택하세요.

{{< partial name="dbm/dbm-setup-sql-server" >}}

<br>

### 에이전트 통합 오버헤드

에이전트 통합 오버헤드 테스트는 Amazon EC2 머신 `c5.xlarge` 인스턴스(4 vCPU, 8GB RAM)에서 진행되었습니다. 테스트에 사용된 데이터베이스는 Amazon RDS `db.m5.large` 인스턴스(2 vCPU, 8GB RAM)에서 동작하는 SQL Server 2019 Standard Edition 인스턴스입니다. 해당 데이터베이스는 웨어하우스 20개가 있는 TPC-C 워크로드를 실행하였습니다.

| 설정                              | 수집 간격 |
| ------------------------------------ | ------------------- |
| 최소 수집 간격 점검하기        | 15s                 |
| 쿼리 메트릭 수집 간격    | 60s                 |
| 쿼리 활동 수집 간격 | 10s                 |
| 수집 간격 설정         | 600s                |

* 에이전트 테스트 버전: `7.50.2`
* CPU: 평균 사용 CPU의 ~1%
* 메모리: ~300 MiB의 RAM 사용 (RSS 메모리)
* 네트워크 대역폭: ~40 KB/s ▼ | 30 KB/s ▲
* 데이터베이스의 에이전트 쿼리 오버헤드:  ~1% CPU 시간

[1]: /ko/database_monitoring/setup_sql_server/troubleshooting/#known-limitations