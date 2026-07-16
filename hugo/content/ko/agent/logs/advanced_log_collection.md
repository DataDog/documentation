---
algolia:
  tags:
  - advanced log filter
description: Datadog Agent를 사용하여 로그를 수집하고 Datadog로 전송하기
further_reading:
- link: /logs/guide/getting-started-lwl/
  tag: 설명서
  text: Logging without Limits™ 시작하기
- link: /logs/guide/how-to-set-up-only-logs/
  tag: 설명서
  text: Datadog 에이전트를 로그 수집용으로만 사용하기
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 배우기
- link: /logs/live_tail/
  tag: 설명서
  text: Datadog 라이브 테일 기능
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 보기
- link: /glossary/#tail
  tag: 용어
  text: '"tail" 관련 용어 항목'
title: 고급 로그 수집 구성
---
[로그 수집][1]을 구성한 후에 수집 구성을 사용자 지정할 수 있습니다.
- [로그 필터링](#filter-logs)
  - [일치 시 제외](#exclude-at-match)
  - [일치 시 포함](#include-at-match)
  - [잘린 로그 제외](#exclude-truncated)
- [로그에서 민감한 데이터 스크러빙](#scrub-sensitive-data-from-your-logs)
- [여러 줄 집계](#manually-aggregate-multi-line-logs)
- [여러 줄 로그 자동 집계](#automatically-aggregate-multi-line-logs)
- [자주 사용되는 로그 처리 규칙](#commonly-used-log-processing-rules)
- [와일드카드를 사용한 디렉터리 테일링](#tail-directories-using-wildcards)
  - [수정 시간을 기준으로 테일링 파일 우선순위 지정](#prioritize-tailed-files-by-modification-time)
- [로그 파일 인코딩](#log-file-encodings)
- [전역 처리 규칙](#global-processing-rules)
- [추가 자료](#further-reading)

모든 Datadog Agent 수집 로그에 처리 규칙을 적용하려면 [전역 처리 규칙](#global-processing-rules) 섹션을 참조하세요.

**참고**:
- 여러 처리 규칙을 설정하면 규칙은 순차적으로 적용되며, 각 규칙은 이전 규칙의 결과에 대해 적용됩니다.
- 처리 규칙 패턴은 [Golang 정규식 문법][2]을 준수해야 합니다.
- `log_processing_rules` 파라미터는 통합 구성에서 로그 수집 구성을 사용자 지정하는 데 사용됩니다. 반면 Agent의 [기본 구성][5]에서는 `processing_rules` 파라미터를 사용하여 전역 처리 규칙을 정의합니다.

## 로그 필터링 {#filter-logs}

Datadog으로 특정 로그 하위 집합만 전송하려면 구성 파일에서 `log_processing_rules` 파라미터와 함께 `exclude_at_match` 또는 `include_at_match` 유형을 사용하세요.

### 일치 시 제외 {#exclude-at-match}

| 파라미터          | 설명                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | 지정한 패턴이 메시지에 포함되어 있으면 해당 로그는 제외되며 Datadog으로 전송되지 않습니다. |

예를 들어 Datadog 이메일 주소가 포함된 로그를 **필터링해서 제외**하려면 다음 `log_processing_rules`을 사용하세요.

{{< tabs >}}
{{% tab "구성 파일" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_at_match
      name: exclude_datadoghq_users
      ## Regexp can be anything
      pattern: \w+@datadoghq.com
```

{{% /tab %}}
{{% tab "Docker" %}}

<div class="alert alert-info">
Agent 구성에 대한 자세한 내용은 <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">컨테이너 검색 관리</a>를 참조하세요.
</div>

Docker 환경에서는 **필터링하려는 로그를 전송하는 컨테이너**에서`com.datadoghq.ad.logs` 레이블을 사용하여 `log_processing_rules`를 지정합니다. 예를 들면 다음과 같습니다.

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "exclude_at_match",
          "name": "exclude_datadoghq_users",
          "pattern" : "\\w+@datadoghq.com"
        }]
      }]
```

**참고**:
- 레이블을 사용할 때는 패턴 내 정규식 문자를 이스케이프 처리해야 합니다. 예를 들어 `\d`는 `\\d`가 되고, `\w`는 `\\w`가 됩니다.
- 레이블 값은 JSON 구문을 따라야 하므로 후행 쉼표나 주석을 포함해서는 안 됩니다.

{{% /tab %}}
{{% tab "Kubernetes" %}}

<div class="alert alert-info">
Agent 구성에 대한 자세한 내용은 <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">컨테이너 검색 관리</a>를 참조하세요.
</div>

Autodiscovery를 사용하여 포드 내 특정 컨테이너(이름: `CONTAINER_NAME`)에서 컨테이너 로그를 수집하도록 구성하려면 포드의 `log_processing_rules`에 다음 주석을 추가합니다.

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "exclude_at_match",
              "name": "exclude_datadoghq_users",
              "pattern" : "\\w+@datadoghq.com"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**참고**:
- 포드 주석을 사용할 때는 패턴 내 정규식 문자를 이스케이프 처리해야 합니다. 예를 들어 `\d`는 `\\d`가 되고, `\w`는 `\\w`가 됩니다.
- 주석 값은 JSON 구문을 따라야 하므로 후행 쉼표나 주석을 포함해서는 안 됩니다.

{{% /tab %}}
{{< /tabs >}}

### 일치 시 포함 {#include-at-match}

| 파라미터          | 설명                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | 지정한 패턴이 포함된 메시지를 가진 로그만 Datadog으로 전송됩니다. 여러 개의 `include_at_match` 규칙이 정의된 경우 로그가 포함되려면 모든 규칙 패턴이 일치해야 합니다. |


예를 들어 Datadog 이메일 주소가 포함된 로그를 **필터링해서 포함**시키려면 다음 `log_processing_rules` 구성을 사용하세요.

{{< tabs >}}
{{% tab "구성 파일" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      ## Regexp can be anything
      pattern: \w+@datadoghq.com
```

하나 이상의 패턴과 일치시키려면 단일 표현식 내에 패턴을 정의해야 합니다.

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      pattern: abc|123
```

패턴이 너무 길어 한 줄에 보기 좋게 작성하기 어려운 경우 여러 줄로 나누어 작성할 수 있습니다.

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      pattern: "abc\
|123\
|\\w+@datadoghq.com"
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 환경에서는 필터링하려는 로그를 전송하는 컨테이너에서 `com.datadoghq.ad.logs` 레이블을 사용하여 `log_processing_rules`를 지정합니다. 예를 들면 다음과 같습니다.

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "include_at_match",
          "name": "include_datadoghq_users",
          "pattern" : "\\w+@datadoghq.com"
        }]
      }]
```

**참고**:
- 레이블을 사용할 때는 패턴 내 정규식 문자를 이스케이프 처리해야 합니다. 예를 들어 `\d`는 `\\d`가 되고, `\w`는 `\\w`가 됩니다.
- 레이블 값은 JSON 구문을 따라야 하므로 후행 쉼표나 주석을 포함해서는 안 됩니다.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 환경에서는 포드에 `ad.datadoghq.com` 주석을 사용하여 `log_processing_rules`를 지정합니다. 예를 들면 다음과 같습니다.

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "include_at_match",
              "name": "include_datadoghq_users",
              "pattern" : "\\w+@datadoghq.com"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**참고**:
- 포드 주석을 사용할 때는 패턴 내 정규식 문자를 이스케이프 처리해야 합니다. 예를 들어 `\d`는 `\\d`가 되고, `\w`는 `\\w`가 됩니다.
- 주석 값은 JSON 구문을 따라야 하므로 후행 쉼표나 주석을 포함해서는 안 됩니다.

{{% /tab %}}
{{< /tabs >}}

### 잘린 로그 제외 {#exclude-truncated}

| 파라미터           | 설명                                                        |
|---------------------|--------------------------------------------------------------------|
| `exclude_truncated` | 설정한 경우 잘린 로그를 제외하며 Datadog으로 전송하지 않습니다. `exclude_truncated` 규칙은 Agent v7.69부터 사용할 수 있습니다. |

예를 들어 잘린 로그를 **필터해서 제외**하려면 다음을 사용합니다.

{{< tabs >}}
{{% tab "구성 파일" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_truncated
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 환경에서는 필터링하려는 로그를 전송하는 컨테이너에서 `com.datadoghq.ad.logs` 레이블을 사용하여 `log_processing_rules`를 지정합니다. 예를 들면 다음과 같습니다.

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "exclude_truncated"
        }]
      }]
```

**참고**: 레이블 값은 JSON 구문을 따라야 하므로 후행 쉼표나 주석을 포함해서는 안 됩니다.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 환경에서는 포드에 `ad.datadoghq.com` 주석을 사용하여 `log_processing_rules`를 지정합니다. 예를 들면 다음과 같습니다.

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "exclude_truncated"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**참고**: 주석 값은 JSON 구문을 따라야 하므로 후행 쉼표나 주석을 포함해서는 안 됩니다.

{{% /tab %}}
{{< /tabs >}}

## 로그에서 민감한 데이터 스크러빙 {#scrub-sensitive-data-from-your-logs}

로그에 삭제가 필요한 민감한 정보가 포함되어 있는 경우, 구성 파일의 `log_processing_rules` 파라미터를 `mask_sequences` 유형과 함께 사용하여 Datadog Agent가 민감한 문자열을 스크러빙하도록 구성합니다.

이 기능은 일치하는 모든 그룹을 `replace_placeholder` 파라미터의 값으로 대체합니다.

예를 들어, 신용 카드 번호를 삭제하려면 다음과 같이 하세요.

{{< tabs >}}
{{% tab "구성 파일" %}}

```yaml
logs:
 - type: file
   path: /my/test/file.log
   service: cardpayment
   source: java
   log_processing_rules:
      - type: mask_sequences
        name: mask_credit_cards
        replace_placeholder: "[masked_credit_card]"
        ##One pattern that contains capture groups
        pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 환경에서는 컨테이너에 `com.datadoghq.ad.logs` 레이블을 사용하여 `log_processing_rules`를 지정합니다. 예를 들면 다음과 같습니다.

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "mask_credit_cards",
          "replace_placeholder": "[masked_credit_card]",
          "pattern" : "(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})"
        }]
      }]
```

**참고**:
- 레이블을 사용할 때는 패턴 내 정규식 문자를 이스케이프 처리해야 합니다. 예를 들어 `\d`는 `\\d`가 되고, `\w`는 `\\w`가 됩니다.
- 레이블 값은 JSON 구문을 따라야 하므로 후행 쉼표나 주석을 포함해서는 안 됩니다.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 환경에서는 포드에 `ad.datadoghq.com` 주석을 사용하여 `log_processing_rules`를 지정합니다. 예를 들면 다음과 같습니다.

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "mask_sequences",
              "name": "mask_credit_cards",
              "replace_placeholder": "[masked_credit_card]",
              "pattern" : "(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**참고**:
- 포드 주석을 사용할 때는 패턴 내 정규식 문자를 이스케이프 처리해야 합니다. 예를 들어 `\d`는 `\\d`가 되고, `\w`는 `\\w`가 됩니다.
- 주석 값은 JSON 구문을 따라야 하므로 후행 쉼표나 주석을 포함해서는 안 됩니다.

{{% /tab %}}
{{< /tabs >}}

Agent 버전 7.17 이상에서는 `replace_placeholder` 문자열이 `$1`, `$2` 등의 캡처 그룹 참조를 확장할 수 있습니다. 공백 없이 캡처 그룹 뒤에 문자열을 이어 붙이려면 `${<GROUP_NUMBER>}` 형식을 사용하세요.

예를 들어 로그 `User email: foo.bar@example.com`에서 사용자 정보를 스크러빙하려면 다음을 사용합니다.

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

그러면 다음 로그가 Datadog으로 전송됩니다. `User email: masked_user@example.com`

## 여러 줄 로그 자동 집계 {#automatically-aggregate-multi-line-logs}

자동 여러 줄 감지는 복잡한 형식의 로그 소스가 많거나 각 소스를 개별적으로 구성할 시간이 없을 때 유용합니다. 이 기능은 사용자 지정 정규식 패턴을 작성할 필요 없이 여러 줄 로그를 자동으로 감지하고 집계합니다.

자세한 내용은 [자동 여러 줄 감지 및 집계][7] 설명서를 참조하세요.

기능에 대한 기존 지원은 [자동 여러 줄 감지 및 집계(레거시)][8] 설명서를 참조하세요.

## 여러 줄 로그 수동 집계 {#manually-aggregate-multi-line-logs}

수동 여러 줄 규칙은 로그 형식을 알고 있는 경우 로그 집계를 정밀하게 제어할 수 있게 해줍니다. 이 방식은 특정 로그 구조에 맞춘 사용자 지정 정규식 패턴을 사용하여 일관된 로그 처리를 보장하는 데 적합합니다.

로그가 JSON 형식으로 전송되지 않고 여러 줄을 하나의 항목으로 집계하려는 경우, Datadog Agent가 줄마다 하나의 로그를 생성하는 대신 특정 정규식 패턴을 사용하여 새 로그를 감지하도록 구성할 수 있습니다. `log_processing_rules` 파라미터에서 `multi_line` 유형을 사용하면 지정된 패턴이 다시 감지될 때까지 모든 줄을 하나의 항목으로 집계합니다.

예를 들어 Java 로그의 각 줄은 `yyyy-dd-mm` 형식의 타임스탬프로 시작합니다. 이러한 라인에는 다음과 같이 두 개의 로그로 전송될 수 있는 스택 트레이스가 포함됩니다.

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "구성 파일" %}}

위 예제 로그를 구성 파일을 사용하여 전송하려면 다음 `log_processing_rules`를 사용합니다.

```yaml
logs:
 - type: file
   path: /var/log/pg_log.log
   service: database
   source: postgresql
   log_processing_rules:
      - type: multi_line
        name: new_log_start_with_date
        pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 환경에서는 컨테이너에 `com.datadoghq.ad.logs` 레이블을 사용하여 `log_processing_rules`를 지정합니다. 예를 들면 다음과 같습니다.

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "postgresql",
        "service": "database",
        "log_processing_rules": [{
          "type": "multi_line",
          "name": "log_start_with_date",
          "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"
        }]
      }]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 환경에서는 포드에 `ad.datadoghq.com` 주석을 사용하여 `log_processing_rules`를 지정합니다. 예를 들면 다음과 같습니다.

```yaml
apiVersion: apps/v1
metadata:
  name: postgres
spec:
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "postgresql",
            "service": "database",
            "log_processing_rules": [{
              "type": "multi_line",
              "name": "log_start_with_date",
              "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"
            }]
          }]
      labels:
        app: database
      name: postgres
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: postgres:latest
```

**참고**:
- 포드 주석을 사용하여 여러 줄 집계를 수행할 때는 패턴 내 정규식 문자를 이스케이프 처리해야 합니다. 예를 들어 `\d`는 `\\d`가 되고, `\w`는 `\\w`가 됩니다.
- 주석 값은 JSON 구문을 따라야 하므로 후행 쉼표나 주석을 포함해서는 안 됩니다.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"><strong>중요!</strong> 여러 줄 로그용 정규식 패턴은 반드시 로그의 <em>시작 부분</em>부터 일치해야 합니다. 패턴은 줄 중간에서 일치할 수 없습니다. <em>절대로 일치하지 않는 패턴을 사용하면 로그 라인이 유실될 수 있습니다.</em> <br><br>로그 수집은 밀리초 단위까지의 정밀도만 지원합니다. 그보다 더 높은 정밀도의 로그는 패턴과 일치하더라도 전송되지 않습니다.</div>

더 많은 예시:

| **원시 문자열**           | **패턴**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                             |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |


## 자주 사용되는 로그 처리 규칙 {#commonly-used-log-processing-rules}

예제 목록은 전용 [자주 사용되는 로그 처리 규칙 FAQ][4]를 참조하세요.

## 와일드카드를 사용한 디렉터리 테일링 {#tail-directories-using-wildcards}

로그 파일이 날짜별로 명명되어 있거나 모두 동일한 디렉터리에 저장되어 있는 경우, `path` 속성에 와일드카드를 사용하여 Datadog Agent가 해당 파일들을 모두 모니터링하고 새 파일을 자동으로 감지하도록 구성할 수 있습니다. 선택한 `path`와 일치하는 일부 파일을 제외하려면 `exclude_paths` 속성에 나열하세요.

* `path: /var/log/myapp/*.log` 사용:
  * `/var/log/myapp/` 디렉터리에 포함된 모든 `.log` 파일과 일치합니다.
  * `/var/log/myapp/myapp.conf`와는 일치하지 않습니다.

* `path: /var/log/myapp/*/*.log` 사용:
  * `/var/log/myapp/log/myfile.log`와 일치합니다.
  * `/var/log/myapp/errorLog/myerrorfile.log`와 일치합니다.
  * `/var/log/myapp/mylogfile.log`와는 일치하지 않습니다.

Linux 구성 예시:

```yaml
logs:
  - type: file
    path: /var/log/myapp/log/*.log
    exclude_paths:
      - /var/log/myapp/log/debug.log
      - /var/log/myapp/log/trace.log
    service: mywebapp
    source: go
```

위 예시는 `/var/log/myapp/log/myfile.log`와 일치하며 `/var/log/myapp/log/debug.log` 및 `/var/log/myapp/log/trace.log`는 제외합니다.

Windows 구성 예시:

```yaml
logs:
  - type: file
    path: C:\\MyApp\\*.log
    exclude_paths:
      - C:\\MyApp\\MyLog.*.log
    service: mywebapp
    source: csharp
```

위 예시는 `C:\\MyApp\\MyLog.log`와 일치하며 `C:\\MyApp\\MyLog.20230101.log` 및 `C:\\MyApp\\MyLog.20230102.log`는 제외합니다.

**참고**:
- Agent가 디렉터리 내의 모든 사용 가능한 파일을 나열하려면 해당 디렉터리에 대한 읽기 및 실행 권한이 필요합니다.
- path 및 exclude_paths 값은 대소문자를 구분합니다.

### 수정 시간을 기준으로 테일링 파일 우선순위 지정 {#prioritize-tailed-files-by-modification-time}

이 기능을 사용하려면 Agent 버전 7.40.0 이상이 필요합니다.

Agent는 `logs_config.open_files_limit` 파라미터를 사용하여 동시에 테일링할 수 있는 파일 수를 제한합니다. 구성된 로그 소스(예: 와일드카드)와 일치하는 파일 수가 이 제한 이내인 경우 Agent는 모든 파일을 테일링합니다. 일치하는 파일 수가 제한을 초과하는 경우 Agent는 파일 이름을 역 사전순으로 정렬하여 우선순위를 정합니다. 따라서 최신 타임스탬프 또는 더 큰 번호를 가진 파일이 먼저 테일링됩니다.

파일 이름이 순차적 번호 또는 타임스탬프 규칙을 따르지 않는 경우 기본 정렬 방식이 적합하지 않을 수 있습니다. 대신 수정 시간을 기준으로 우선순위를 지정하려면 `logs_config.file_wildcard_selection_mode`를 `by_modification_time`으로 설정하세요. 이 설정을 사용하면 Agent는 가장 최근에 수정된 파일부터 우선적으로 테일링합니다.

**예시**:
- `open_files_limit` = 500
- 와일드카드 패턴이 700개의 파일과 일치합니다.
- `by_name` 사용 시: Agent는 역 사전순 기준으로 가장 높은 이름을 가진 500개 파일(예: app.log.700 ~ app.log.201)을 테일링합니다.
- `by_modification_time` 사용 시: Agent는 파일 이름과 관계없이 가장 최근에 기록된 500개 파일을 테일링합니다.

```yaml
logs_enabled: true
logs_config:
 [...]
  open_files_limit: 500

  ## @param file_wildcard_selection_mode - string - optional - default: by_name
  ## The strategy used to prioritize wildcard matches if they exceed open_files_limit.
  ## Choices:
  ##   - by_name: files are sorted in reverse lexicographic order (default).
  ##   - by_modification_time: files are sorted by modification time, with the most recent first.
  ## WARNING: by_modification_time is less performant and increases disk I/O.
  file_wildcard_selection_mode: by_modification_time
```

기본 동작으로 되돌리려면 `logs_config.file_wildcard_selection_mode` 항목을 제거하거나 명시적으로 `by_name`으로 설정하세요.

## 로그 파일 인코딩 {#log-file-encodings}

기본적으로 Datadog Agent는 로그가 UTF-8 인코딩을 사용한다고 가정합니다. 애플리케이션 로그가 다른 인코딩을 사용하는 경우 로그 구성 구성에서 `encoding` 파라미터를 지정하세요.

아래 목록은 지원되는 인코딩 값을 보여줍니다. 지원되지 않는 값을 지정하면 Agent는 해당 값을 무시하고 파일을 UTF-8로 읽습니다.
 * `utf-16-le` - UTF-16 리틀 엔디언(Datadog Agent **v6.23/v7.23**)
 * `utf-16-be` - UTF-16 빅 엔디언(Datadog Agent **v6.23/v7.23**)
 * `shift-jis` - Shift-JIS(Datadog Agent **v6.34/v7.34**)

<div class="alert alert-warning">Agent가 <code>encoding</code> <em>이미 테일링 중인</em> 파일의 인코딩을 변경하면 문자가 깨질 수 있습니다. Agent는 이전 바이트 오프셋에서 읽기를 재개하는데, 인코딩이 변경된 후에는 해당 위치가 문자 경계와 일치하지 않을 수 있습니다. 이 문제를 해결하려면 로그 파일을 로테이션하거나 교체하거나 새 인코딩을 사용하는 파일의 처음부터 다시 테일링을 시작하세요. 이러한 작업을 수행하면 Agent가 올바른 인코딩으로 로그를 읽기 시작할 수 있습니다.</div>

구성 예시:

```yaml
logs:
  - type: file
    path: /test/log/hello-world.log
    tags: key:value
    service: utf-16-logs
    source: mysql
    encoding: utf-16-be
```

**참고**: `encoding` 파라미터는 `type` 파라미터가 `file`로 설정된 경우에만 적용됩니다.

## 전역 처리 규칙 {#global-processing-rules}

Datadog Agent v6.10 이상에서는 `exclude_at_match`, `include_at_match`, `mask_sequences` 처리 규칙을 Agent의 [기본 구성 파일][5]에서 또는 환경 변수를 통해 전역적으로 정의할 수 있습니다. `exclude_truncated` 규칙은 Agent v7.69부터 사용할 수 있습니다.

{{< tabs >}}
{{% tab "구성 파일" %}}

`datadog.yaml` 파일에서:

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_healthcheck
      pattern: healthcheck
    - type: mask_sequences
      name: mask_user_email
      pattern: \w+@datadoghq.com
      replace_placeholder: "MASKED_EMAIL"
```

{{% /tab %}}
{{% tab "환경 변수" %}}

전역 처리 규칙을 구성하려면 환경 변수 `DD_LOGS_CONFIG_PROCESSING_RULES`을 사용합니다. 예를 들면 다음과 같습니다.

```shell
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Datadog Operator 매니페스트의 `spec.override.[key].env` 파라미터를 사용하여 `DD_LOGS_CONFIG_PROCESSING_RULES` 환경 변수를 구성하고 전역 처리 규칙을 구성합니다. 여기서 `[key]`는 `nodeAgent`, `clusterAgent` 또는 `clusterChecksRunner`입니다. 예를 들면 다음과 같습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_PROCESSING_RULES
          value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm 차트의 `datadog.env` 파라미터를 사용하여 `DD_LOGS_CONFIG_PROCESSING_RULES` 환경 변수를 구성하고 전역 처리 규칙을 구성합니다. 예를 들면 다음과 같습니다.

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Datadog Agent가 수집하는 모든 로그는 전역 처리 규칙의 영향을 받습니다.

**참고**: 전역 처리 규칙에 형식 문제가 있는 경우 Datadog Agent는 로그 수집기를 시작하지 않습니다. 문제를 해결하려면 Agent의 [상태 하위 명령][6]을 실행하세요.

## 여러 줄 로그 집계 FAQ {#multi-line-log-aggregation-faq}

**1. 수동 여러 줄 규칙과 자동 여러 줄 감지 중 어느 것을 사용해야 하나요?**

로그 형식을 알고 있는 경우에는 정밀한 제어를 위해 수동 여러 줄 규칙을 사용하는 것이 좋습니다.
여러 줄 로그를 대량으로 전송하고 있으며 로그 형식을 정확히 모르거나 모든 소스를 개별적으로 구성할 수 없는 경우에는 자동 여러 줄 감지를 사용하는 것이 좋습니다.

**2. 여러 줄 패턴이 어떤 로그와도 일치하지 않으면 어떻게 되나요?**

JSON 형식이 아닌 모든 로그 라인은 각각 별도의 로그 항목으로 처리됩니다.
JSON 형식의 로그 라인은 모두 하나의 로그 라인으로 처리되며, 첫 번째 유효한 JSON 형식만 수집 대상으로 전달되고 나머지는 폐기됩니다.

**3. 전역 규칙과 통합별 규칙이 모두 있는 경우에는 어떻게 되나요?**
통합별 규칙이 해당 통합에 대해 전역 규칙을 완전히 재정의합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/agent/logs/
[2]: https://golang.org/pkg/regexp/syntax/
[3]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187
[4]: /ko/agent/faq/commonly-used-log-processing-rules
[5]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /ko/agent/configuration/agent-commands/#agent-information
[7]: /ko/agent/logs/auto_multiline_detection
[8]: /ko/agent/logs/auto_multiline_detection_legacy