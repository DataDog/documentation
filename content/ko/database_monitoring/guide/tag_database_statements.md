---

title: SQL 구문 태깅
---
{{< site-region region="gov" >}}
해당 지역에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}

이 가이드에서는 [데이터베이스 모니터링][1] 설정을 완료하였다고 가정합니다.

[Datadog 데이터베이스 모니터링(DBM)][1]을 통해 데이터베이스 호스트에서 실행하는 쿼리 샘플과 실행 계획을 확인할 수 있습니다. 이 가이드에서는 SQL 코멘트로 태그를 데이터베이스 쿼리에 추가하여 DBM에서 표시하고 활용하는 방법을 안내합니다.

## 시작 전 참고 사항

지원되는 데이터베이스
: postgres, mysql, sqlserver

지원되는 에이전트 버전
: 7.36.1+

지원되는 태깅 형식
: [sqlcommenter][2], [marginalia][3]


## 수동 태그 삽입
SQL 구문 실행을 지원하는 데이터베이스 API를 사용해 봅니다. [sqlcommenter][2] 또는 [marginalia][3] 형식으로 설정된 태그를 사용해 구문에 코멘트를 추가합니다.

```sql
/*key='val'*/ SELECT * from FOO
```

전체 예시:
```go
import (
    "database/sql"      
)

func main() {   
    db, err := sql.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }

    // Tag SQL statement with key:val
    rows, err := db.Query("/*key='val'*/ SELECT * from FOO")
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()
}
```

## DBM에서 태그 탐색

[**DBM > 샘플**][4] 페이지에서 커스텀 태그로 **실행 계획** 및 **쿼리 샘플** 보기를 필터링합니다.

{{< img src="database_monitoring/dbm_filter_explain_plans_by_custom_tag.png" alt="Filter explain plans by custom tag.">}}

또한 태그별로 필터링된 실행 계획 비용 시계열을 볼 수 있습니다.

{{< img src="database_monitoring/dbm_timeseries_by_custom_tag.png" alt="Explain plan cost by custom tag.">}}

쿼리를 선택하면 커스텀 태그가 전파된 태그 아래의 **샘플 상세 정보** 페이지에 표시됩니다.

{{< img src="database_monitoring/dbm_explain_plan_with_custom_tags.png" alt="View custom tags on explain plans.">}}

[1]: /ko/database_monitoring/#getting-started
[2]: https://google.github.io/sqlcommenter
[3]: https://github.com/basecamp/marginalia
[4]: /ko/database_monitoring/query_samples/