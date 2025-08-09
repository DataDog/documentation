---
aliases:
- /ko/security/threats/agent
description: CSM Threats 규칙에 관한 에이전트 표현식 속성 및 연산자
disable_edit: true
further_reading:
- link: /security/cloud_workload_security/getting_started/
  tag: 설명서
  text: Datadog CSM Threats 시작하기
title: 에이전트 규칙 표현식 만들기
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-agent -->


## 지원 규칙 생성자를 활용하여 커스텀 규칙 생성하기

**지원 규칙 생성자** 옵션을 사용하면 에이전트 및 종속 탐지 규칙을 함께 생성할 수 있으며, 탐지 규칙에서 에이전트 규칙을 참조하도록 할 수 있습니다. 이 도구를 사용하면 에이전트 및 탐지 규칙을 별도로 생성하는 고급 작업보다 더 빠르게 생성할 수 있습니다.

자세한 내용은 [커스텀 탐지 규칙 생성하기][1]를 참조하세요.

## 에이전트 정규식 구문
클라우드 보안 관리 위협(CSM 위협)은 먼저 Datadog 에이전트 내의 활동을 에이전트 정규식에 대해 평가하여 수집할 활동을 결정합니다. CSM 위협 규칙의 이러한 부분을 에이전트 정규식이라고 합니다. 에이전트 정규식은 Datadog의 보안 언어(SECL)를 사용합니다. SECL 정규식의 표준 형식은 다음과 같습니다.

{{< code-block lang="javascript" >}}
<event-type>.<event-attribute> <operator> <value> [<operator> <event-type>.<event-attribute>] ...

{{< /code-block >}}

이 형식을 사용하는 Linux 시스템의 규칙 예시는 다음과 같습니다.

{{< code-block lang="javascript" >}}
open.file.path == "/etc/shadow" && process.file.path not in ["/usr/sbin/vipw"]

{{< /code-block >}}

## 연산자
SECL 연산자는 이벤트 속성을 전체 정규식에 조합하는 데 사용됩니다. 다음과 같은 연산자를 사용할 수 있습니다.

| SECL 연산자         | 유형            |  정의                              | 에이전트 버전 |
|-----------------------|------------------|------------------------------------------|---------------|
| `==`                  | 프로세스          | Equal                                    | 7.27          |
| `!=`                  | 파일             | Not equal                                | 7.27          |
| `>`                   | 파일             | Greater                                  | 7.27          |
| `>=`                  | 파일             | Greater or equal                         | 7.27          |
| `<`                   | 파일             | Lesser                                   | 7.27          |
| `<=`                  | 파일             | Lesser or equal                          | 7.27          |
| `!`                   | 파일             | Not                                      | 7.27          |
| `^`                   | 파일             | Binary not                               | 7.27          |
| `in [elem1, ...]`     | 파일             | 목록에 포함된 요소             | 7.27          |
| `not in [elem1, ...]` | 파일             | 목록에 포함되지 않은 요소         | 7.27          |
| `=~`                  | 파일             | 문자열 일치                          | 7.27          |
| `!~`                  | 파일             | 문자열이 일치하지 않음                      | 7.27          |
| `&`                   | 파일             | Binary and                               | 7.27          |
| `\|`                  | 파일             | Binary or                                | 7.27          |
| `&&`                  | 파일             | Logical and                              | 7.27          |
| `\|\|`                | 파일             | Logical or                               | 7.27          |
| `in CIDR`             | 네트워크          | IP 범위에 있는 요소               | 7.37          |
| `not in CIDR`         | 네트워크          | IP 범위에 없는 요소           | 7.37          |
| `allin CIDR`          | 네트워크          | IP 범위에 있는 모든 요소     | 7.37          |
| `in [CIDR1, ...]`     | 네트워크          | IP 범위에 있는 요소              | 7.37          |
| `not in [CIDR1, ...]` | 네트워크          | IP 범위에 없는 요소          | 7.37          |
| `allin [CIDR1, ...]`  | 네트워크          | IP 범위에 있는 모든 요소    | 7.37          |

## 패턴 및 정규식
패턴 또는 정규식은 SECL 정규식에 사용할 수 있습니다. `in`, `not in`, `=~`, `!~` 연산자와 같이 사용할 수 있습니다.

| 형식           |  예시             | 지원되는 필드   | 에이전트 버전 |
|------------------|----------------------|--------------------|---------------|
| `~"pattern"`     | `~"httpd.*"`         | 전체                | 7.27          |
| `r"regexp"`      | `r"rc[0-9]+"`        | `.path` 제외 전체 | 7.27          |

`.path` 필드의 패턴은 Glob으로 사용됩니다. `*` 은 파일과 폴더를 같은 레벨에서 일치시킵니다. `**` 는 7.34에서 도입한 것으로, 경로 끝에 사용하여 모든 파일과 하위 폴더를 매칭합니다.

## 기간
SECL을 사용하여 특정 시간 동안 이벤트에서 트리거되는 '기간에 기반한 규칙'을 작성할 수 있습니다. 예를 들어, 프로세스 생성 후 일정 시간 이상 기밀 파일에 액세스하면 이벤트에서 트리거됩니다.
다음과 같이 규칙을 작성할 수 있습니다.

{{< code-block lang="javascript" >}}
open.file.path == "/etc/secret" && process.file.name == "java" && process.created_at > 5s

{{< /code-block >}}

기간은 단위 접미사가 있는 숫자입니다. 지원되는 접미사는 "s", "m", "h"입니다.

## 플랫폼별 구문

SECL 정규식은 여러 플랫폼을 지원합니다. 아래 문서에서 각각에 대해 어떤 속성과 헬퍼를 사용할 수 있는지 확인할 수 있습니다.

* [Linux][2]
* [Windows][3]

[1]: /ko/security/workload_protection/workload_security_rules/custom_rules
[2]: /ko/security/workload_protection/linux_expressions
[3]: /ko/security/workload_protection/windows_expressions