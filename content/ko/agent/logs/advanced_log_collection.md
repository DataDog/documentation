---
algolia:
  tags:
  - advanced log filter
description: Datadog Agent를 사용하여 로그를 수집하고 Datadog로 전송하기
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 알아보기
- link: /logs/live_tail/
  tag: 설명서
  text: Datadog 라이브 테일 기능
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/logging_without_limits/
  tag: 설명서
  text: Logging without Limits*
- link: /glossary/#tail
  tag: 용어
  text: '"tail"에 대한 용어 항목'
title: 고급 로그 수집 설정
---

[로그 수집][1]을 설정한 후에 수집 설정을 사용자 정의할 수 있습니다.
* [로그 필터링](#filter-logs)
* [로그에서 민감한 데이터 스크러빙](#scrub-sensitive-data-from-your-logs)
* [다중 줄 로그 집계](#multi-line-aggregation)
* [일반적으로 사용되는 예제 복사](#commonly-used-log-processing-rules)
* [와일드카드를 사용하여 디렉토리 모니터링](#tail-directories-using-wildcards)
* [로그 파일 인코딩 지정](#log-file-encodings)
* [글로벌 처리 규칙 정의](#global-processing-rules)

Datadog 에이전트에서 수집한 모든 로그에 처리 규칙을 적용하려면 [Global 처리 규칙](#global-processing-rules) 섹션을 참조하세요.

**참고**:
- 여러 처리 규칙을 설정하면 순차적으로 적용되며 각 규칙은 이전 규칙의 결과에 적용됩니다.
- 처리 규칙 패턴은 [Golang 정규 표현식 구문][2]을 준수해야 합니다.
- `log_processing_rules` 파라미터는 통합 설정에서 로그 수집 설정을 사용자 정의하는 데 사용됩니다. Agent의 [기본 설정][5]에서 `processing_rules` 파라미터는 전역 처리 규칙을 정의하는 데 사용됩니다.

## 로그 필터링

특정 로그 하위 집합만 Datadog으로 보내려면 설정 파일에서 `exclude_at_match` 또는 `include_at_match` 유형과 함께 `log_processing_rules` 파라미터를 사용하세요.

### 매치 시 제외

| 파라미터          | 설명                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | 지정한 패턴이 메시지에 포함된 경우 로그는 제외되고 Datadog으로 전송되지 않습니다. |

예를 들어 Datadog 이메일 주소가 포함된 로그를 **필터링**하려면 다음 `log_processing_rules`을 사용하세요.

{{< tabs >}}
{{% tab "설정 파일" %}}

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

Docker 환경의 경우 **필터링할 로그를 보내는 컨테이너**에서 라벨 `com.datadoghq.ad.logs`을 사용하여 `log_processing_rules`을 지정합니다. 예를 들어:

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

**참고**: 라벨을 사용할 때 패턴의 정규식 문자를 이스케이프하세요. 예를 들어 `\d`는  `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 라벨 값은 JSON 구문을 따라야 하며, 따라오는 쉼표나 주석을 포함해서는 안 됩니다.

{{% /tab %}}
{{% tab "Kubernetes" %}}

지정된 컨테이너에 특정 설정을 적용하기 위해 자동 탐지는 이미지가 아닌 이름으로 컨테이너를 식별합니다. 이는`<CONTAINER_IDENTIFIER>`를 `.spec.containers[0].image.`이 아닌 `.spec.containers[0].name`로 일치시킵니다. 자동 탐지를 사용하여 포드 내의 지정된 `<CONTAINER_IDENTIFIER>`에 컨테이너 로그를 수집하도록 설정하려면 다음 어노테이션을 포드의 `log_processing_rules`에 추가합니다:

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
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
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
        - name: '<CONTAINER_IDENTIFIER>'
          image: cardpayment:latest
```

**참고**: 포드 어노테이션을 사용할 때 패턴의 정규식 문자를 이스케이프하세요. 예를 들어 `\d`는 `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 주석 값은 JSON 구문을 따라야 하며, 따라오는 쉼표나 주석을 포함해서는 안됩니다.

{{% /tab %}}
{{< /tabs >}}

### 일치 시 포함

| 파라미터          | 설명                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | 지정된 패턴이 포함된 메시지가 있는 로그만 Datadog으로 전송됩니다. 여러 `include_at_match` 규칙이 정의된 경우 로그를 포함시키기 위해 모든 규칙 패턴이 일치해야 합니다. |


예를 들어, Datadog 이메일 주소가 포함된 로그를 **필터링**하려면 다음 `log_processing_rules` 설정을 사용하세요.

{{< tabs >}}
{{% tab "설정 파일" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      ## 정규 표현식은 무엇이든 될 수 있습니다.
      pattern: \w+@datadoghq.com
```

하나 이상의 패턴을 일치시키려면 단일 표현식으로 정의해야 합니다.

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

패턴이 너무 길어서 한 줄에 읽을 수 없을 경우 여러 줄로 나눌 수 있습니다.

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

Docker 환경에서는 필터링하려는 로그를 전송하는 컨테이너에서 `com.datadoghq.ad.logs` 라벨을 사용하여 `log_processing_rules`를 지정합니다. 예를 들어:

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

**참고**: 라벨을 사용할 때 패턴의 정규식 문자를 이스케이프하세요. 예를 들어 `\d`는  `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 라벨 값은 JSON 구문을 따라야 하며, 따라오는 쉼표나 주석을 포함해서는 안 됩니다.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 환경인 경우, 포드에서 포드 어노테이션인 `ad.datadoghq.com`을 사용하여 `log_processing_rules`를 다음과 같이 지정합니다:

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
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
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
        - name: '<CONTAINER_IDENTIFIER>'
          image: cardpayment:latest
```

**참고**: 포드 어노테이션을 사용할 때 패턴의 정규식 문자를 이스케이프하세요. 예를 들어 `\d`는 `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 주석 값은 JSON 구문을 따라야 하며, 따라오는 쉼표나 주석을 포함해서는 안됩니다.

{{% /tab %}}
{{< /tabs >}}

## 로그에서 민감한 데이터 스크러빙하기

로그에 삭제가 필요한 민감한 정보가 포함되어 있는 경우 설정 파일의 `log_processing_rules` 파라미터를 `mask_sequences` 유형과 함께 사용하여 민감한 시퀀스를 스크러빙하도록 Datadog Agent를 설정합니다.

일치하는 모든 그룹이 `replace_placeholder` 파라미터 값으로 바뀝니다.

예를 들어, 신용 카드 번호를 삭제하려면:

{{< tabs >}}
{{% tab "설정 파일" %}}

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
        ##캡처 그룹이 포함된 하나의 패턴
        pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 환경인 경우, 컨테이너에서 `com.datadoghq.ad.logs` 라벨을 사용하여 `log_processing_rules`를 다음과 같이 지정합니다:

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

**참고**: 라벨을 사용할 때 패턴의 정규식 문자를 이스케이프하세요. 예를 들어 `\d`는  `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 라벨 값은 JSON 구문을 따라야 하며, 따라오는 쉼표나 주석을 포함해서는 안 됩니다.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 환경인 경우, 포드에서 포드 어노테이션인 `ad.datadoghq.com`을 사용하여 `log_processing_rules`를 다음과 같이 지정합니다:

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
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
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
        - name: '<CONTAINER_IDENTIFIER>'
          image: cardpayment:latest
```

**참고**: 포드 어노테이션을 사용할 때 패턴의 정규식 문자를 이스케이프하세요. 예를 들어 `\d`는 `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 주석 값은 JSON 구문을 따라야 하며, 따라오는 쉼표나 주석을 포함해서는 안됩니다.

{{% /tab %}}
{{< /tabs >}}

Agent 버전 7.17+에서는 `replace_placeholder` 문자열을 사용하여 `$1`,`$2` 등의 캡처 그룹으로 참조를 확장할 수 있습니다. 문자열이 공백 없이 캡처 그룹 뒤에 오게 하려면  `${<GROUP_NUMBER>}` 형식을 사용합니다.

예를 들어, 로그 `User email: foo.bar@example.com`에서 사용자 정보를 스크러빙하려면 다음을 사용합니다:

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

이렇게 하면 다음 로그가 Datadog에 전송됩니다: `User email: masked_user@example.com`

## 다중 줄 집계

로그가 JSON으로 전송되지 않고 여러 줄을 단일 항목으로 집계하려는 경우 한 줄당 하나의 로그 대신 특정 정규식 패턴을 사용하여 새 로그를 감지하도록 Datadog Agent를 설정합니다. 지정된 패턴이 다시 감지될 때까지 모든 행을 단일 항목으로 집계하려면 `log_processing_rules` 파라미터에서 `multi_line` 유형을 사용하세요.

예를 들어, 모든 Java 로그 줄은 `yyyy-dd-mm` 형식의 타임스탬프로 시작됩니다. 이 줄에는 두 개의 로그로 전송할 수 있는 스택 트레이스가 포함됩니다:

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "설정 파일" %}}

설정 파일과 함께 위의 예제 로그를 보내려면 다음`log_processing_rules`을 사용합니다:

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

Docker 환경인 경우, 컨테이너에서 `com.datadoghq.ad.logs` 라벨을 사용하여 `log_processing_rules`를 다음과 같이 지정합니다:

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

Kubernetes 환경인 경우, 포드에서 포드 어노테이션인 `ad.datadoghq.com`을 사용하여 `log_processing_rules`를 다음과 같이 지정합니다:

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
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
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
        - name: '<CONTAINER_IDENTIFIER>'
          image: postgres:latest
```

**참고**: 포드 어노테이션으로 다중 줄 집계를 수행할 때 패턴의 정규식 문자를 이스케이프하세요. 예를 들어 `\d`는 `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 주석 값은 JSON 구문을 따라야 하며, 따라오는 쉼표나 주석을 포함해서는 안됩니다.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>중요!</strong>다중 줄 로그의 정규식 패턴은 로그의<em>시작 부분</em>에서 시작해야 합니다. 패턴은 중간 줄과 일치할 수 없습니다. <em>전혀 일치하지 않는 패턴은 로그 줄 손실을 일으킬 수 있습니다.</em></div>

더 많은 예시:

| **원시 문자열**           | **패턴**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 2014/10/11               | `\d{2}\/\d{2}\/\d{4}`                             |
| 2016년 6월 16일 목요일 08:29:03 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"날짜": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |

### 자동 다중 줄 집계
Agent 7.37+에서 `auto_multi_line_detection`을 사용할 수 있습니다. 이를 통해 Agent가 [공통 다중 줄 패턴][2]을 자동으로 탐지할 수 있습니다.

`datadog.yaml` 파일에서 전체적으로 `auto_multi_line_detection`을 활성화합니다:

```yaml
logs_config:
  auto_multi_line_detection: true
```

컨테이너화된 디플로이먼트의 경우 `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true`환경 변수를 사용하여 `auto_multi_line_detection`을 활성화할 수 있습니다.

로그 설정별로 활성화 또는 비활성화 (글로벌 설정 재정의)할 수도 있습니다:

{{< tabs >}}
{{% tab "설정 파일" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: true
```

자동 다중 줄 탐지는 일반적인 정규식 목록을 사용하여 로그 일치를 시도합니다. 기본 제공 목록이 충분하지 않은 경우 `datadog.yaml` 파일에 커스텀 패턴을 추가할 수도 있습니다:

```yaml
logs_config:
  auto_multi_line_detection: true
  auto_multi_line_extra_patterns:
   - \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   - '[A-Za-z_]+ \d+, \d+ \d+:\d+:\d+ (AM|PM)'
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 환경인 경우, 컨테이너에서 `com.datadoghq.ad.logs` 라벨을 사용하여 `log_processing_rules`를 다음과 같이 지정합니다:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "testApp",
        "auto_multi_line_detection": true
      }]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: apps/v1
metadata:
  name: testApp
spec:
  selector:
    matchLabels:
      app: testApp
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
          [{
            "source": "java",
            "service": "testApp",
            "auto_multi_line_detection": true
          }]
      labels:
        app: testApp
      name: testApp
    spec:
      containers:
        - name: '<CONTAINER_IDENTIFIER>'
          image: testApp:latest
```

{{% /tab %}}
{{< /tabs >}}

이 기능을 활성화하면 새 로그 파일이 열릴 때 Agent가 패턴을 감지하려고 시도합니다. 이 과정에서 로그는 한 줄로 전송됩니다. 탐지 임계값이 충족되면 해당 소스에 대한 향후 모든 로그가 탐지된 패턴으로 집계되거나, 패턴이 발견되지 않으면 단일 줄로 집계됩니다. 탐지에는 최대 30초 또는 처음 500개 로그 (둘 중 먼저 도착하는 로그)가 소요됩니다.

**참고**: 회전된 로그의 이름 지정 패턴을 제어할 수 있는 경우 회전된 파일이 이전에 활성화된 파일을 동일한 이름으로 교체하는지 확인하세요. Agent는 새로 회전된 파일에서 이전에 탐지된 패턴을 재사용하여 탐지가 다시 실행되지 않도록 합니다.

자동 다중 줄 감지는 다음 날짜/시간 형식을 준수하는 로그를 감지합니다: RFC3339, ANSIC, Unix Date Format, Ruby Date Format, RFC822, RFC822Z, RFC850, RFC1123, RFC1123Z, RFC3339Nano, 기본 Java logging SimpleFormatter 날짜 형식.

## 일반적으로 사용되는 로그 처리 규칙

예제 목록을 보려면 [일반적으로 사용되는 로그 처리 규칙 FAQ][4]를 참조하세요.

## 와일드카드를 사용한 테일 디렉토리

로그 파일에 날짜별로 라벨이 지정되어 있거나 모두 동일한 디렉토리에 저장되어 있는 경우, 모든 파일을 모니터링하고 `path` 속성 와일드카드를 사용하여 새 파일을 자동으로 검색하도록 Datadog Agent를 설정합니다. 선택한 `path`과 일치하는 일부 파일을 제외하려면 `exclude_paths` 속성에 나열합니다.

* `path: /var/log/myapp/*.log`를 사용합니다:
  * `/var/log/myapp/` 디렉터리에 포함된 모든 `.log` 파일과 일치합니다.
  * `/var/log/myapp/myapp.conf`와 일치하지 않습니다.

* `path: /var/log/myapp/*/*.log`를 사용합니다:
  * `/var/log/myapp/log/myfile.log`와 일치합니다.
  * `/var/log/myapp/errorLog/myerrorfile.log`와 일치합니다.
  * `/var/log/myapp/mylogfile.log`와 일치하지 않습니다.

Linux 설정 예제

```yaml
logs:
  - type: file
    path: /var/log/myapp/*.log
    exclude_paths:
      - /var/log/myapp/debug.log
      - /var/log/myapp/trace.log
    service: mywebapp
    source: go
```

위의 예제는 `/var/log/myapp/log/myfile.log`와 일치하고 `/var/log/myapp/log/debug.log`와 `/var/log/myapp/log/trace.log`를 제외합니다.  

Windows 설정 예제

```yaml
logs:
  - type: file
    path: C:\\MyApp\\*.log
    exclude_paths:
      - C:\\MyApp\\MyLog.*.log
    service: mywebapp
    source: csharp
```

위의 예시는 `C:\\MyApp\\MyLog.log`와 일치하며, `C:\\MyApp\\MyLog.20230101.log`와 `C:\\MyApp\\MyLog.20230102.log`를 제외합니다.

**참고**: Agent가 디렉터리에서 사용 가능한 모든 파일을 나열하려면 디렉터리에 대한 읽기 및 실행 권한이 필요합니다.
**참고2**: path 및 exclude_paths 값은 대소문자를 구분합니다.

## 가장 최근에 수정한 파일을 먼저 추적

파일의 우선 순위를 테일에 지정할 때, Datadog Agent는 디렉토리 경로의 파일 이름을 역 사전순으로 정렬합니다. 파일 수정 시간을 기준으로 파일을 정렬하려면 설정 옵션 `logs_config.file_wildcard_selection_mode`를 `by_modification_time` 값으로 설정합니다.

이 옵션은 일치하는 총 로그 파일 수가 `logs_config.open_files_limit`를 초과할 때 유용합니다. `by_modification_time`를 사용하면 정의된 디렉토리 경로에서 가장 최근에 업데이트된 파일이 먼저 표시됩니다.

기본 동작을 복원하려면 설정 옵션 `logs_config.file_wildcard_selection_mode`을 `by_name` 값으로 설정합니다.

이 기능을 사용하려면  Agent 버전 7.40.0 이상이 필요합니다.

## 로그 파일 인코딩

기본적으로 Datadog Agent는 로그가 UTF-8 인코딩을 사용한다고 가정합니다. 애플리케이션 로그가 다른 인코딩을 사용하는 경우 로그 구성 설정에서 `encoding` 파라미터를 지정합니다.

아래 목록에는 지원되는 인코딩 값이 나와 있습니다. 지원되지 않는 값을 제공하면 Agent는 이 값을 무시하고 파일을 UTF-8로 읽습니다.
 * `utf-16-le` - UTF-16 little-endian (Datadog Agent **v6.23/v7.23**)
 * `utf-16-be` - UTF-16 big-endian (Datadog Agent **v6.23/v7.23**)
 * `shift-jis` - Shift-JIS (Datadog Agent **v6.34/v7.34**)

설정 예시:

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

## 글로벌 처리 규칙

Datadog Agent v6.10+의 경우 , `exclude_at_match`, `include_at_match`, `mask_sequences` 처리 규칙을 Agent의 [기본 설정 파일][4]에서 전체적으로 정의하거나 환경 변수를 통해 정의할 수 있습니다:

{{< tabs >}}
{{% tab "설정 파일" %}}

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

환경 변수`DD_LOGS_CONFIG_PROCESSING_RULES`를 사용하여 다음과 같은 글로벌 처리 규칙을 설정합니다:

```shell
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

헬름 차트의 `env` 파라미터를 사용하여 다음과 같은 글로벌 처리 규칙을 설정할 `DD_LOGS_CONFIG_PROCESSING_RULES` 환경 변수를 설정합니다:

```yaml
env:
  - name: DD_LOGS_CONFIG_PROCESSING_RULES
    value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Datadog Agent에서 수집한 모든 로그는 글로벌 처리 규칙의 영향을 받습니다.

**참고**: 글로벌 처리 규칙에 형식 문제가 있는 경우 Datadog Agent는 로그 컬렉터를 시작하지 않습니다. Agent의 [상태 하위 명령][5]을 실행하여 문제를 해결하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*제한 없는 로그 수집(Logging without Limits)은 Datadog, Inc.의 상표입니다.

[1]: /ko/agent/logs/
[2]: https://golang.org/pkg/regexp/syntax/
[3]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187
[4]: /ko/agent/faq/commonly-used-log-processing-rules
[5]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /ko/agent/configuration/agent-commands/#agent-information