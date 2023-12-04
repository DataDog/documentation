---
description: DogStatsD의 매핑 규칙을 사용하여 통계 메트릭 이름의 일부를 태그로 변환합니다.
further_reading:
- link: developers/dogstatsd
  tag: 설명서
  text: DogStatsD 소개
- link: developers/libraries
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
kind: 설명서
title: DogStatsD Mapper
---

에이전트 v7.17 이상에서는 DogStatsD Mapper 기능을 통해 와일드카드 및 정규식 패턴이 포함된 매핑 규칙을 사용하여 DogStatsD에 제출된 메트릭 이름의 일부를 태그로 변환할 수 있습니다. 예를 들어 다음 메트릭을:

- `airflow.job.duration.<JOB_TYPE>.<JOB_NAME>`

`airflow.job.duration` 메트릭으로 다음 두 개의 연결된 태그와 함께  변환합니다:

- `job_type:<JOB_TYPE>`
- `job_name:<JOB_NAME>`.

매핑 규칙을 생성하려면:

1. [`datadog.yaml` 파일을 엽니다][1].
2. `dogstatsd_mapper_profiles` 매개 변수 아래에 [매핑 규칙 설정 블록](#mapping-rule-configuration)을 추가합니다.

## 매핑 규칙 설정

매핑 규칙 블록의 레이아웃은 다음과 같습니다:

```yaml
dogstatsd_mapper_profiles:
    - name: '<PROFILE_NAME>'
      prefix: '<PROFILE_PREFIX>'
      mappings:
          - match: '<METRIC_TO_MATCH>'
            match_type: '<MATCH_TYPE>'
            name: '<MAPPED_METRIC_NAME>'
            tags:
                '<TAG_KEY>': '<TAG_VALUE_TO_EXPAND>'
```

다음 플레이스홀더 사용:

| 플레이스홀더             |  Definition                                                                                                                               | 필수                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
|  `<PROFILE_NAME>`       | 매핑 규칙 프로필에 지정할 이름입니다.                                                                                              | 네                     |
| `<PROFILE_PREFIX>`      | 이 프로필에 연결된 메트릭 이름 접두사입니다.                                                                                        | 네                     |
| `<METRIC_TO_MATCH>`     | [와일드카드](#wildcard-match-pattern) 또는 [정규식](#regex-match-pattern) 일치 로직으로 그룹을 추출할 메트릭 이름입니다.         | 네                     |
| `<MATCH_TYPE>`          | `<METRIC_TO_MATCH>`에 적용할 일치 유형은 [`wildcard`](#wildcard-match-pattern) 또는 [`regex`](#regex-match-pattern) 중 하나입니다.    | 아니요, 기본값: `wildcard`입니다. |
| `<MAPPED_METRIC_NAME>`  | 동일한 그룹에 정의된 태그와 함께 Datadog에 보낼 새 메트릭 이름입니다.                                                           | 네                     |
| `<TAG_KEY>`             | 수집된 태그에 연결할 태그 키입니다.                                                                                           | 아니요                      |
| `<TAG_VALUE_TO_EXPAND>` | 즉시 처리하기 위해 `<MATCH_TYPE>`에서 수집된 태그입니다.                                                                                     | 아니요                      |

## 와일드카드 패턴 일치

와일드카드 패턴 일치는 점으로 구분된 메트릭 이름을 일치시킬 때 `*`를 와일드카드로 사용합니다. 이 패턴이 작동하려면 메트릭 이름이 영숫자, `.`, `_` 문자로만 구성되어야 합니다. 그런 다음 추출된 그룹은 다음 중 하나를 사용하여 확장될 수 있습니다:

- `$n` 형식: `$1`, `$2`, `$3` 등
- `${n}` 형식: `${1}`, `${2}`, `${3}` 등

예를 들어, 다음과 같은 매핑 그룹 설정의 `custom_metric.process.value_1.value_2` 메트릭이 있는 경우:

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric.process.*.*'
            match_type: wildcard
            name: custom_metric.process
            tags:
                tag_key_1: '$1'
                tag_key_2: '$2'
```

`tag_key_1:value_1` 및 `tag_key_2:value_2` 태그와 `custom_metric.process` 메트릭을 Datadog에 전송합니다.

## 정규식 패턴 일치

정규식 패턴 일치는 정규식 패턴을 사용하여 메트릭 이름을 일치시킵니다. 와일드카드 패턴 일치와 비교했을 때, 이 패턴은 `.`을 포함하는 캡처된 그룹을 정의할 수 있습니다. 그런 다음 추출된 그룹은 다음 중 하나를 사용하여 확장됩니다:

- `$n` 형식: `$1`, `$2`, `$3` 등
- `${n}` 형식: `${1}`, `${2}`, `${3}` 등

예를 들어, 다음 매핑 그룹 설정과 함께 `custom_metric.process.value_1.value.with.dots._2` 메트릭이 있는 경우:

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric\.process\.([\w_]+)\.(.+)'
            match_type: regex
            name: custom_metric.process
            tags:
                tag_key_1: '$1'
                tag_key_2: '$2'
```

`tag_key_1:value_1` 및 `tag_key_2:value.with.dots._2` 태그와 함께 `custom_metric.process` 메트릭을 Datadog에 전송합니다.

## 메트릭 이름에서 그룹 확장

`regex` 및 `wildcard` 일치 유형의 경우 수집된 그룹은 위와 같이 연결된 태그 키가 있는 태그 값으로 확장될 수 있지만 메트릭 `name` 매개 변수에도 사용할 수 있습니다. 예를 들어, 다음과 같은 매핑 그룹 설정을 가진 `custom_metric.process.value_1.value_2` 메트릭이 있는 경우:

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric.process.*.*'
            match_type: wildcard
            name: 'custom_metric.process.prod.$1.live'
            tags:
                tag_key_2: '$2'
```

`tag_key_2:value_2` 태그와 함께 `custom_metric.process.prod.value_1.live` 메트릭을 Datadog에 전송합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/guide/agent-configuration-files/#agent-main-configuration-file