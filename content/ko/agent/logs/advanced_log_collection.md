---
algolia:
  tags:
  - advanced log filter
description: Datadog 에이전트를 사용하여 로그를 수집하고 Datadog로 전송하기
further_reading:
- link: /logs/guide/how-to-set-up-only-logs/
  tag: 설명서
  text: Datadog 에이전트를 로그 수집용으로만 사용하기
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
* [와일드카드를 사용하여 디렉터리 모니터링](#tail-directories-using-wildcards)
* [로그 파일 인코딩 지정](#log-file-encodings)
* [전역 처리 규칙 정의](#global-processing-rules)

Datadog 에이전트에서 수집한 모든 로그에 처리 규칙을 적용하려면 [전역 처리 규칙](#global-processing-rules) 섹션을 참조하세요.

**참고**:
- 여러 처리 규칙을 설정하면 순차적으로 적용되며 각 규칙은 이전 규칙의 결과에 적용됩니다.
- 처리 규칙 패턴은 [Golang 정규 표현식 구문][2]을 준수해야 합니다.
- `log_processing_rules` 파라미터는 통합 설정에서 로그 수집 설정을 사용자 정의하는 데 사용됩니다. 에이전트의 [기본 설정][5]에서 `processing_rules` 파라미터는 전역 처리 규칙을 정의하는 데 사용됩니다.

## 로그 필터링

특정 로그 하위 집합만 Datadog으로 보내려면 설정 파일에서 `exclude_at_match` 또는 `include_at_match` 유형과 함께 `log_processing_rules` 파라미터를 사용하세요.

### 일치할 때 제외

| 파라미터          | 설명                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | 지정한 패턴이 메시지에 포함된 경우 로그는 제외되고 Datadog로 전송되지 않습니다. |

예를 들어 Datadog 이메일 주소가 포함된 로그를 **필터링해서 제외**하려면 다음 `log_processing_rules`을 사용하세요.

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

Docker 환경에서 **필터링할 로그를 보내는 컨테이너**의 레이블`com.datadoghq.ad.logs`을 사용하여 `log_processing_rules`을 지정합니다. 예를 들어:

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

**참고**: 라벨을 사용할 때 패턴의 regex 문자에 이스케이프 문자를 사용하세요. 예를 들어 `\d`는  `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 라벨 값은 JSON 구문을 따라야 합니다. 이에 따라 후행 쉼표나 코멘트를 포함해서는 안됩니다.

{{% /tab %}}
{{% tab "Kubernetes" %}}

자동 탐지는 지정된 컨테이너에 특정한 설정을 적용하기 위해 이미지가 아닌 이름으로 컨테이너를 식별합니다.  `<CONTAINER_IDENTIFIER>`를 `.spec.containers[0].image.`가 아닌 `.spec.containers[0].name`과 연결시키고자 합니다. 포드 내 해당 `<CONTAINER_IDENTIFIER>`에서 자동 탐지를 사용하도록 구성하려면, 주석 `log_processing_rules`를 포드에 추가하세요.

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

**참고**: 포드 주석을 사용할 때 패턴의 regex 문자에 이스케이프 문자를 사용하세요. 예를 들어 `\d`는 `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 주석 값은 JSON 구문을 따라야 합니다. 이에 따라 후행 쉼표나 코멘트를 포함해서는 안됩니다.

{{% /tab %}}
{{< /tabs >}}

### 일치할 때 포함

| 파라미터          | 설명                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | 지정한 패턴을 포함하는 메시지 로그만 Datadog로 전송됩니다. `include_at_match` 규칙이 여럿 정의된 경우, 규칙 패턴 모두가 일치해야 로그가 포함됩니다.  |


예를 들어, Datadog 이메일 주소가 포함된 로그를 **필터링해 가져오려면** 다음 `log_processing_rules` 설정을 사용하세요.

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

Docker 환경에서는 필터링하려는 로그를 전송하는 컨테이너에서 `com.datadoghq.ad.logs` 라벨을 사용하여 `log_processing_rules`를 지정합니다. 다음 예를 참고하세요.

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

**참고**: 라벨을 사용할 때 패턴의 regex 문자에 이스케이프 문자를 사용하세요. 예를 들어 `\d`는  `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 라벨 값은 JSON 구문을 따라야 합니다. 이에 따라 후행 쉼표나 코멘트를 포함해서는 안됩니다.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 환경인 경우, 포드에서 포드 주석인 `ad.datadoghq.com`을 사용하여 `log_processing_rules`를 다음과 같이 지정합니다:

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

**참고**: 포드 주석을 사용할 때 패턴의 regex 문자에 이스케이프 문자를 사용하세요. 예를 들어 `\d`는 `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 주석 값은 JSON 구문을 따라야 합니다. 이에 따라 후행 쉼표나 코멘트를 포함해서는 안됩니다.

{{% /tab %}}
{{< /tabs >}}

## 로그에서 민감한 데이터 스크러빙하기

{{< callout url="https://www.datadoghq.com/private-beta/sensitive-data-scanner-using-agent-in-your-premises/" >}}
  에이전트에서 민감한 데이터 스캐너를 사용하는 것이 프라이빗 베타 서비스 중입니다. 자세한 내용은 <a href="https://www.datadoghq.com/blog/sensitive-data-scanner-using-the-datadog-agent/">블로그 포스트</a>와 <a href="https://docs.datadoghq.com/sensitive_data_scanner/">설명서</a>를 참고하세요. 액세스를 요청하려면 다음 양식을 작성하세요.
{{< /callout >}}

로그에 삭제가 필요한 민감한 정보가 포함되어 있는 경우 설정 파일의 `log_processing_rules` 파라미터를 `mask_sequences` 유형과 함께 사용하여 민감한 시퀀스를 스크러빙하도록 Datadog 에이전트를 설정합니다.

그러면 일치하는 그룹을 `replace_placeholder` 파라미터 값으로 모두 변경합니다.

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

**참고**: 라벨을 사용할 때 패턴의 regex 문자에 이스케이프 문자를 사용하세요. 예를 들어 `\d`는  `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 라벨 값은 JSON 구문을 따라야 합니다. 이에 따라 후행 쉼표나 코멘트를 포함해서는 안됩니다.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 환경인 경우, 포드에서 포드 주석인 `ad.datadoghq.com`을 사용하여 `log_processing_rules`를 다음과 같이 지정합니다:

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

**참고**: 포드 주석을 사용할 때 패턴의 regex 문자에 이스케이프 문자를 사용하세요. 예를 들어 `\d`는 `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 주석 값은 JSON 구문을 따라야 합니다. 이에 따라 후행 쉼표나 코멘트를 포함해서는 안됩니다.

{{% /tab %}}
{{< /tabs >}}

에이전트 버전 7.17+의 경우 `replace_placeholder` 문자열의 참조를 확장해 `$1`, `$2` 등과 같은 그룹을 캡처할 수 있습니다. 문자열에서 띄어쓰기 없이 캡처 그룹을 따르려면 `${<GROUP_NUMBER>}` 형식을 사용하세요.

예를 들어, 로그 `User email: foo.bar@example.com`에서 사용자 정보를 스크러빙하려면 다음을 사용하세요.

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

이렇게 하면 `User email: masked_user@example.com` 로그가 Datadog에 전송됩니다.

## 다중 줄 집계

로그가 JSON으로 전송되지 않고 여러 줄을 단일 항목으로 집계하려는 경우 한 줄당 하나의 로그 대신 특정 정규식 패턴을 사용하여 새 로그를 감지하도록 Datadog 에이전트를 설정합니다. 지정된 패턴이 다시 감지될 때까지 모든 행을 단일 항목으로 집계하려면 `log_processing_rules` 파라미터에서 `multi_line` 유형을 사용하세요.

예를 들어, 모든 Java 로그 줄은 `yyyy-dd-mm` 형식의 타임스탬프로 시작됩니다. 이 줄에는 두 개의 로그로 전송할 수 있는 스택 트레이스가 포함됩니다:

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "구성 파일" %}}

설정 파일과 함께 위의 예제 로그를 보내려면 다음`log_processing_rules`을 사용하세요.

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

Kubernetes 환경인 경우, 포드에서 포드 주석인 `ad.datadoghq.com`을 사용하여 `log_processing_rules`를 다음과 같이 지정합니다:

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

**참고**: 포드 주석으로 다중 줄 집계를 할 때 패턴의 패턴의 regex 문자에 이스케이프 문자를 사용하세요. 예를 들어 `\d`는 `\\d`, `\w`는 `\\w`이 됩니다.

**참고**: 주석 값은 JSON 구문을 따라야 합니다. 이에 따라 후행 쉼표나 코멘트를 포함해서는 안됩니다.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>중요!</strong>다중 줄 로그의 정규식 패턴은 로그의<em>시작 부분</em>에서 시작해야 합니다. 패턴은 중간 줄과 일치할 수 없습니다. <em>전혀 일치하지 않는 패턴은 로그 줄 손실을 일으킬 수 있습니다.</em></div>

더 많은 예시:

| **원시 문자열**           | **패턴**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 2014/10/11               | `\d{2}\/\d{2}\/\d{4}`                             |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |

### 자동 다중 줄 집계
에이전트 7.37+에서 `auto_multi_line_detection`을 사용할 수 있습니다. 이를 통해 에이전트에서 [일반적인 다중 줄 패턴][2]을 자동으로 탐지할 수 있습니다.

`datadog.yaml` 파일에서 `auto_multi_line_detection`을 전역적으로 활성화하세요.

```yaml
logs_config:
  auto_multi_line_detection: true
```

컨테이너화된 배포의 경우 `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true`환경 변수를 사용하여 `auto_multi_line_detection`을 활성화할 수 있습니다.

로그 구성별로 활성화하거나 비활성화할 수 있습니다(전역 구성 재정의).

{{< tabs >}}
{{% tab "구성 파일" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: true
```

자동 다중 줄 탐지는 일반적인 정규식 목록을 사용하여 로그 일치를 시도합니다. 기본 제공 목록이 충분하지 않은 경우 `datadog.yaml` 파일에 커스텀 패턴을 추가할 수도 있습니다.

```yaml
logs_config:
  auto_multi_line_detection: true
  auto_multi_line_extra_patterns:
   - \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   - '[A-Za-z_]+ \d+, \d+ \d+:\d+:\d+ (AM|PM)'
```

줄 일치 임계값에 맞는 패턴이 없을 경우 `auto_multi_line_default_match_threshold` 파라미터 값을 낮게 지정해 추가하세요. 이는 자동 다중 줄 집계를 적용할 때 로그가 일치해야 하는 빈도의 임계값을 구성합니다. 현재 임계값을 보려면 [에이전트 `status` 명령[1]을 실행하세요.

```yaml
logs_config:
  auto_multi_line_detection: true
  auto_multi_line_extra_patterns:
   - \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   - '[A-Za-z_]+ \d+, \d+ \d+:\d+:\d+ (AM|PM)'
  auto_multi_line_default_match_threshold: 0.1
```

[1]: https://docs.datadoghq.com/ko/agent/configuration/agent-commands/#agent-information
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
자동 다중 줄 탐지는 일반적인 정규식 목록을 사용하여 로그 일치를 시도합니다. 기본 제공 목록이 충분하지 않은 경우 `datadog.yaml` 파일에 환경 변수 `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS`와 함께 커스텀 패턴을 추가할 수도 있습니다.

줄 일치 임계값에 맞는 패턴이 없을 경우 `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DEFAULT_MATCH_THRESHOLD` 환경 변수 값을 낮게 지정해 추가하세요. 이는 자동 다중 줄 집계를 적용할 때 로그가 일치해야 하는 빈도의 임계값을 구성합니다. 현재 임계값을 보려면 [에이전트 `status` 명령[1]을 실행하세요.

[1]: https://docs.datadoghq.com/ko/agent/configuration/agent-commands/#agent-information

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

자동 다중 줄 탐지는 일반적인 정규식 목록을 사용하여 로그 일치를 시도합니다. 기본 제공 목록이 충분하지 않은 경우 `datadog.yaml` 파일에 환경 변수 `DD_LOGS_CONFIG_AUTO_MULTI_LINE_EXTRA_PATTERNS`와 함께 커스텀 패턴을 추가할 수도 있습니다.

줄 일치 임계값에 맞는 패턴이 없을 경우 `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DEFAULT_MATCH_THRESHOLD` 환경 변수 값을 낮게 지정해 추가하세요. 이는 자동 다중 줄 집계를 적용할 때 로그가 일치해야 하는 빈도의 임계값을 구성합니다. 현재 임계값을 보려면 [에이전트 `status` 명령[1]을 실행하세요.

[1]: https://docs.datadoghq.com/ko/agent/configuration/agent-commands/#agent-information

{{% /tab %}}
{{< /tabs >}}

이 기능을 활성화하면 새 로그 파일을 열  때 에이전트가 패턴을 탐지합니다. 이 과정에서 로그가 단일 줄로 전송됩니다. 탐지 임계값을 충족하면 향후 해당 소스에서 수신하는 모든 로그가 탐지 패턴으로 집계되거나 패턴을 찾을 수 없는 경우에는 단일 줄로 집계됩니다. 탐지에는 최대 30초 또는 최초 로그 500개 정도가 소요됩니다(먼저 실행되는 것).

**참고**: 회전된 로그의 이름 지정 패턴을 제어할 수 있는 경우 회전된 파일 이름이 이전 활성 파일과 같은 이름으로 변경되도록 하세요. 에이전트에서는 이전에 탐지된 패턴을 새 회전 파일에 재사용해 탐지를 재실행하는 것을 방지합니다.

자동 다중 줄 탐지의 경우 RFC3339, ANSIC, Unix Date Format, Ruby Date Format, RFC822, RFC822Z, RFC850, RFC1123, RFC1123Z, RFC3339Nano, 기본 Java logging SimpleFormatter 날짜 형식 규정으로 시작하는 로그를 탐지합니다.

## 일반적으로 사용되는 로그 처리 규칙

예제 목록을 보려면 [일반적으로 사용되는 로그 처리 규칙 FAQ][4]를 참조하세요.

## 와일드카드를 사용해 디렉터리 테일링

로그 파일에 날짜별로 라벨이 지정되어 있거나 모든 로그 파일이 동일한 디렉터리에 저장되어 있는 경우 Datadog 에이전트가 로그 파일을 모두 모니터링하고 `path` 속성에서 와일드카드를 사용하여 새 로그 파일을 자동으로 탐지하도록 설정합니다. 선택한 `path`과 일치하는 일부 파일을 제외하려면 `exclude_paths`속성에 포함하세요.

* `path: /var/log/myapp/*.log` 사용:
  * `/var/log/myapp/` 디렉터리에 포함된 모든 `.log` 파일과 일치
  * `/var/log/myapp/myapp.conf`와 일치하지 않음

* `path: /var/log/myapp/*/*.log` 사용:
  * `/var/log/myapp/log/myfile.log`와 일치
  * `/var/log/myapp/errorLog/myerrorfile.log`와 일치
  * `/var/log/myapp/mylogfile.log`와 일치하지 않음

Linux 구성 예시:

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

위 예시는 `C:\\MyApp\\MyLog.log`와 일치하고 `C:\\MyApp\\MyLog.20230101.log` 및 `C:\\MyApp\\MyLog.20230102.log`를 제외한 것입니다.

**참고**: 사용 가능한 모든 파일 목록을 보려면 에이전트에서 디렉토리 읽기 및 실행 권한이 필요합니다.
**참고2**: path 및 exclude_paths 값은 대소문자를 구분합니다.

## 가장 최근에 수정한 파일을 먼저 추적

추적할 파일의 우선 순위를 정할 때 Datadog 에이전트에서는 디렉터리 내 파일 이름을 사전 역순서로 정렬합니다. 수정 시간을 기반으로 파일을 정렬하려면 구성 옵션 `logs_config.file_wildcard_selection_mode`를 `by_modification_time` 값으로 설정하세요.

이 옵션은 일치하는 로그 파일의 총 개수가 `logs_config.open_files_limit`을 초과할 때 유용합니다.`by_modification_time`를 사용하면 정의된 디렉터리 경로에서 가장 최근에 업데이트한 파일을 먼저 추적합니다.

기본 동작을 복구하려면 구성 옵션 `logs_config.file_wildcard_selection_mode`를 `by_name` 값으로 설정하세요.

이 기능을 사용하려면 에이전트 버전이 7.40.0 이상이어야 합니다.

## 로그 파일 인코딩

기본적으로 Datadog 에이전트에서는 로그가 UTF-8 인코딩을 사용한다고 가정합니다. 내 애플리케이션 로그가 다른 인코딩을 사용한다면 로그 구성 설정의 `encoding` 파라미터에서 지정하세요.

아래는 지원되는 인코딩 값 목록입니다. 지원되지 않는 값이 있을 경우 에이전트에서는 해당 값을 무시하고 UTF-8로 가정하고 값을 읽습니다.
 * `utf-16-le` - UTF-16 little-endian (Datadog Agent **v6.23/v7.23**)
 * `utf-16-be` - UTF-16 big-endian (Datadog Agent **v6.23/v7.23**)
 * `shift-jis` - Shift-JIS (Datadog Agent **v6.34/v7.34**)

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

## 전역 처리 규칙

Datadog 에이전트 v6.10+의 경우 , `exclude_at_match`, `include_at_match`, `mask_sequences` 처리 규칙을 에이전트의 [기본 설정 파일][4]에서 전체적으로 정의하거나 환경 변수를 통해 정의할 수 있습니다:

{{< tabs >}}
{{% tab "구성 파일" %}}

`datadog.yaml` 파일에서 다음을 실행하세요.

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

환경 변수`DD_LOGS_CONFIG_PROCESSING_RULES`를 사용하여 다음과 같은 전역 처리 규칙을 설정하세요.

```shell
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Datadog Operator 매니페스트에 있는 `spec.override.[key].env` 파라미터를 사용해 `DD_LOGS_CONFIG_PROCESSING_RULES` 환경 변수를 전역 처리 규칙으로 설정하세요. `[key]` 값에 `nodeAgent`, `clusterAgent`, 또는 `clusterChecksRunner`가 올 수 있습니다. 다음 예를 참고하세요.

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

Helm 차트의 `datadog.env` 파라미터를 사용해 `DD_LOGS_CONFIG_PROCESSING_RULES` 환경 변수를 설정하여 전역 처리 규칙을 구성하세요. 다음 예시를 참고하세요.

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Datadog 에이전트에서 수집하는 모든 로그는 전역 처리 규칙의 영향을 받습니다.

**참고**: 전역 처리 규칙에 형식 문제가 있는 경우 Datadog 에서 로그 수집기를 시작하지 않습니다. 에이전트의 [상태 하위 명령][5]을 실행해 문제를 해결하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/agent/logs/
[2]: https://golang.org/pkg/regexp/syntax/
[3]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187
[4]: /ko/agent/faq/commonly-used-log-processing-rules
[5]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /ko/agent/configuration/agent-commands/#agent-information
