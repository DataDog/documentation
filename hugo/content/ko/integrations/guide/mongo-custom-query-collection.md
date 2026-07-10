---
further_reading:
- link: /integrations/mongo/
  tag: 설명서
  text: MongoDB 통합에 대해 알아보기
title: MongoDB 커스텀 메트릭 수집
---

## 개요

[MongoDB 통합][8]을 통해 커스텀 메트릭을 수집하려면 [Agent의 설정 디렉터리][1] 루트에서 `conf.d/mongo.d/conf.yaml` 파일의 `custom_queries` 옵션을 사용합니다. 자세한 내용은 샘플 [mongo.d/conf.yaml][2]을 참조하세요.

## 구성

`custom_queries`에는 다음과 같은 옵션이 있습니다:

* **`metric_prefix`**: 각 메트릭은 선택한 접두사로 시작됩니다.
* **`query`**: JSON 객체로 실행하기 위한 [Mongo runCommand][3] 쿼리입니다. **참고**: Agent는 `count`, `find`, `aggregates` 쿼리만 지원합니다.
* **`database`**: 메트릭을 수집할 MongoDB 데이터베이스입니다.
* **`fields`**: `count` 쿼리에서는 무시됩니다. 특정 순서 없이 각 필드를 나타내는 목록입니다. 지정되지 않은 필드와 누락된 필드를 무시합니다. 각 `fields`에는 세 가지 필수 데이터가 있습니다.
  * `field_name`: 데이터를 가져올 필드의 이름
  * `name`: 이는 전체 메트릭 이름을 구성하기 위해 metric_prefix에 추가되는 접미사입니다. `type`이 `tag`인 경우 이 열은 태그로 처리되며 이 특정 쿼리로 수집된 모든 메트릭에 적용됩니다.
  * `type`: 제출 방법(`gauge`, `count`, `rate` 등)입니다. 이 열에 있는 항목의 이름과 값으로 행의 각 메트릭에 태그를 지정하기 위해 `tag`로 설정할 수도 있습니다. `count` 유형을 사용하면 태그가 동일하거나 없는 여러 행을 반환하는 쿼리에 대해 집계를 수행할 수 있습니다.
* **`tags`**: (위에 지정된 대로) 각 메트릭에 적용할 태그 목록
* **`count_type`**: `count` 쿼리의 경우에만 해당하는 집계 결과 제출 방법(`gauge`, `count`, `rate` 등)입니다. count가 아닌 쿼리의 경우 무시됩니다.

## 예시

아래 예에서는 다음 Mongo 컬렉션 `user_collection`이 사용됩니다.

```text
{ name: "foo", id: 12345, active: true, age:45, is_admin: true}
{ name: "bar", id: 67890, active: false, age:25, is_admin: true}
{ name: "foobar", id: 16273, active: true, age:35, is_admin: false}
```

예시를 보려는 쿼리 유형을 선택하세요.

{{< tabs >}}
{{% tab "Count" %}}

특정 시간에 활성 상태인 사용자 수를 모니터링하기 위한 [Mongo count 명령][1]은 다음과 같습니다.

```text
db.runCommand( {count: user_collection, query: {active:true}})
```

`mongo.d/conf.yaml` 파일 내부의 다음 `custom_queries` YAML 구성에 해당합니다.

```yaml
custom_queries:
  - metric_prefix: mongo.users
    query: {"count": "user_collection", "query": {"active":"true"}}
    count_type: gauge
    tags:
      - user:active
```

그러면 하나의 태그 `user:active`가 포함된 하나의 `gauge` 메트릭 `mongo.users`가 방출됩니다.

**참고**: 정의된 [메트릭 유형][2]은 `gauge`입니다.

[1]: https://docs.mongodb.com/manual/reference/command/count/#dbcmd.count
[2]: /ko/metrics/types/
{{% /tab %}}
{{% tab "Find" %}}

사용자별 연령을 모니터링하기 위한 [Mongo find 명령][1]은 다음과 같습니다.

```text
db.runCommand( {find: user_collection, filter: {active:true} )
```

`mongo.d/conf.yaml` 파일 내부의 다음 `custom_queries` YAML 구성에 해당합니다.

```yaml
custom_queries:
  - metric_prefix: mongo.example2
    query: {"find": "user_collection", "filter": {"active":"true"}}
    fields:
      - field_name: name
        name: name
        type: tag
      - field_name: age
        name: user.age
        type: gauge

```

그러면 두개의 태그 `name:foo`, `name:foobar`가 포함된 하나의 `gauge` 메트릭 `mongo.example2.user.age`가 방출됩니다.

**참고**: 정의된 [메트릭 유형][2]은 `gauge`입니다.

[1]: https://docs.mongodb.com/manual/reference/command/find/#dbcmd.find
[2]: /ko/metrics/types/
{{% /tab %}}
{{% tab "Aggregate" %}}

관리자와 관리자가 아닌 사용자의 평균 연령을 모니터링하기 위한 [Mongo aggregate 명령][1]은 다음과 같습니다.

```text
db.runCommand(
              {
                'aggregate': "user_collection",
                'pipeline': [
                  {"$match": {"active": "true"}},
                  {"$group": {"_id": "$is_admin", "age_avg": {"$avg": "$age"}}}
                ],
                'cursor': {}
              }
            )
```

`mongo.d/conf.yaml` 파일 내부의 다음 `custom_queries` YAML 구성에 해당합니다.

```yaml
custom_queries:
  - metric_prefix: mongo.example3
    query: {"aggregate": "user_collection","pipeline": [{"$match": {"active": "true"}},{"$group": {"_id": "$is_admin", "age_avg": {"$avg": "$age"}}}],"cursor": {}}
    fields:
      - field_name: age_avg
        name: user.age
        type: gauge
      - field_name: _id
        name: is_admin
        type: tag
    tags:
      - test:mongodb
```

각 태그에 대한 사용자의 평균 연령을 나타내는 두 개의 태그 `is_admin:true` 및 `is_admin:false`를 사용하여 하나의 `gauge` 메트릭 `mongo.example3.user.age`를 방출합니다.

[1]: https://docs.mongodb.com/manual/reference/command/aggregate/#dbcmd.aggregate
{{% /tab %}}
{{< /tabs >}}

**참고**: Mongo YAML 파일을 업데이트한 후 [Datadog Agent를 다시 시작][4]하세요.

### 검증

결과를 확인하려면 [Metrics Explorer][5]를 사용하여 메트릭을 검색하세요.

### 디버깅

[Agent의 상태 하위 명령을 실행][6]하고 Checks 섹션에서 `mongo`를 찾으세요. 또한 [Agent의 로그][7]에서 유용한 정보를 얻을 수도 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: https://docs.mongodb.com/manual/reference/command
[4]: /ko/agent/guide/agent-commands/#restart-the-agent
[5]: /ko/metrics/explorer/
[6]: /ko/agent/guide/agent-commands/#agent-status-and-information
[7]: /ko/agent/guide/agent-log-files/
[8]: /ko/integrations/mongodb