---
description: MySQL 데이터베이스에서 데이터베이스 모니터링 설정
disable_sidebar: true
kind: documentation
title: MySQL 설정
---

{{< site-region region="gov" >}}
해당 사이트에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}

### 지원되는 MySQL 버전 

|  | 자체 호스팅 | Amazon RDS | Amazon Aurora | 26GB 이상의 RAM을 갖춘 Google Cloud SQL | Azure |
|--|------------|---------|------------|------------------|---------|
| MySQL 5.6 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| MySQL 5.7 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| MySQL 8.0 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

설정 지침을 보려면 호스팅 유형을 선택하세요.

{{< partial name="dbm/dbm-setup-mysql" >}}

<br>

### Agent 통합 오버헤드

Agent 통합 오버헤드 테스트는 Amazon EC2 머신 `c5.xlarge` 인스턴스(vCPU 4개, 8GB RAM)에서 실행되었습니다. 테스트에 사용된 데이터베이스는 Amazon RDS `db.m5.large` 인스턴스(vCPU 2개, 8GB RAM)에서 실행되는 MySQL 8.0 인스턴스였습니다. 데이터베이스는 20개의 웨어하우스가 있는 TPC-C 워크로드를 실행하고 있었습니다.

| 설정                              | 수집 간격 |
| ------------------------------------ | ------------------- |
| 최소 수집 간격 점검하기        | 15s                 |
| 쿼리 메트릭 수집 간격    | 10s                 |
| 쿼리 활동 수집 간격 | 10s                 |
| 쿼리 샘플 수집 간격    | 1s                  |
| 수집 간격 설정         | 600s                |

* 에이전트 테스트 버전: `7.50.2`
* CPU: 평균적으로 사용되는 CPU의 ~2%
* 메모리: ~300 MiB의 RAM 사용 (RSS 메모리)
* 네트워크 대역폭: ~40 KB/s ▼ | 30 KB/s ▲
* 데이터베이스의 에이전트 쿼리 오버헤드:  ~1% CPU 시간