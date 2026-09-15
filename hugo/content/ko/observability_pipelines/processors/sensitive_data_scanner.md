---
description: Sensitive Data Scanner 프로세서를 사용하여 로그나 트레이스에서 개인 식별 정보(PII) 및 결제 카드 산업(PCI)
  데이터와 같은 민감한 정보를 탐지하고 비식별화하거나 해싱하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: /logs/guide/regex_log_parsing/
  tag: 가이드
  text: 정규 표현식을 사용하여 효과적인 Grok 구문 분석 규칙 작성하기
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: 블로그
  text: Observability Pipelines를 사용하여 AI 앱의 OTel 데이터를 ClickHouse 및 Datadog으로 라우팅하기
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Sensitive Data Scanner 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

Sensitive Data Scanner 프로세서는 로그를 스캔하여 PII, PCI 및 사용자 지정 민감 데이터와 같은 민감 정보를 탐지하고 비식별화하거나 해싱합니다. Datadog의 사전 정의된 라이브러리 규칙 중에서 선택하거나 사용자 지정 정규식 규칙을 입력하여 민감 데이터를 스캔할 수 있습니다.

파이프라인과 프로세서는 [UI](#set-up-the-processor-in-the-ui), [API][10] 또는 [Terraform](#set-up-the-processor-using-terraform)에서 설정할 수 있습니다.

리소스 사용량을 줄이는 방법은 [성능 최적화 모범 사례](#best-practices-to-optimize-performance)를 참조하세요.

## UI에서 프로세서 설정 {#set-up-the-processor-in-the-ui}

프로세서를 설정하려면 다음 단계를 따르세요.

1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 자세한 내용은 [로그 검색 구문][1]을 참조하세요.
    - 필터와 일치하는 이벤트만 스캔 및 처리됩니다.
    - 모든 이벤트는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다.
1. {{< ui >}}Add Scanning Rule{{< /ui >}}을 클릭합니다.
1. 다음 중 하나를 선택합니다.

{{< tabs >}}
{{% tab "라이브러리 규칙" %}}

1. 드롭다운 메뉴에서 사용할 라이브러리 규칙을 선택합니다.
1. 선택한 라이브러리 규칙에 따라 권장 키워드가 자동으로 추가됩니다. 스캔 규칙을 추가한 후 [키워드를 추가하거나 권장 키워드를 제거](#add-additional-keywords)할 수 있습니다.
1. {{< ui >}}Define rule target and conditions{{< /ui >}} 섹션의 드롭다운 메뉴에서 {{< ui >}}Entire Event{{< /ui >}}, {{< ui >}}Specific Attributes{{< /ui >}} 또는 {{< ui >}}Exclude Attributes{{< /ui >}} 중 무엇을 스캔할지 선택합니다.
    - 전체 이벤트를 스캔하는 경우, 특정 속성을 스캔 대상에서 선택적으로 제외할 수 있습니다. 중첩된 키에 액세스하려면 [경로 표기법](#path-notation-example)(`outer_key.inner_key`)을 사용하세요. 중첩된 데이터가 있는 속성을 지정하면 해당 속성의 모든 중첩된 데이터가 제외됩니다.
    - 특정 속성을 스캔하는 경우 스캔할 속성을 지정하세요. 중첩된 키에 액세스하려면 [경로 표기법](#path-notation-example)(`outer_key.inner_key`)을 사용하세요. 중첩된 데이터가 있는 속성을 지정하면 해당 속성의 모든 중첩된 데이터가 스캔됩니다.
1. {{< ui >}}Define actions on match{{< /ui >}}에서 일치하는 정보에 대해 수행할 액션을 선택합니다. **참고**: 비식별화, 부분 비식별화 및 해싱은 모두 되돌릴 수 없는 작업입니다.
    - {{< ui >}}Redact{{< /ui >}}: 일치하는 모든 값을 {{< ui >}}Replacement text{{< /ui >}} 필드에서 지정한 텍스트로 대체합니다.
    - {{< ui >}}Partially Redact{{< /ui >}}: 일치하는 모든 데이터에서 지정된 부분을 대체합니다. {{< ui >}}Redact{{< /ui >}} 섹션에서 비식별화할 문자 수와 일치하는 데이터의 어느 부분을 비식별화할지 지정합니다.
    - {{< ui >}}Hash{{< /ui >}}: 일치하는 모든 데이터를 고유 식별자로 대체합니다. 일치하는 UTF-8 바이트를 FarmHash의 64비트 지문으로 해시합니다.
1. 필요시 {{< ui >}}Add Field{{< /ui >}}를 클릭하여 일치하는 이벤트와 연결할 태그를 추가합니다.
1. 스캔 규칙의 이름을 추가합니다.
1. 필요시 규칙 설명을 추가합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

### 키워드 추가 {#add-additional-keywords}

라이브러리에서 스캔 규칙을 추가한 후 각 규칙을 개별적으로 편집하고 키워드 사전에 키워드를 추가할 수 있습니다.

1. [파이프라인][1]으로 이동합니다.
1. 편집하려는 규칙이 있는 Sensitive Data Scanner 프로세서에서 {{< ui >}}Manage Scanning Rules{{< /ui >}}를 클릭합니다.
1. 규칙에서 권장 키워드를 사용하려면 {{< ui >}}Use recommended keywords{{< /ui >}}를 활성화합니다. 그렇지 않은 경우, {{< ui >}}Create keyword dictionary{{< /ui >}} 필드에 직접 키워드를 추가하세요. 또한 이러한 키워드가 일치 항목으로부터 지정된 문자 수 이내에 있도록 설정할 수 있습니다. 기본적으로 키워드는 일치한 값 앞의 30자 이내에 있어야 합니다.
1. {{< ui >}}Update{{< /ui >}}를 클릭합니다.

[1]: https://app.datadoghq.com/observability-pipelines

{{% /tab %}}
{{% tab "사용자 지정 규칙" %}}

1. {{< ui >}}Define match conditions{{< /ui >}} 섹션에서 {{< ui >}}Define the regex{{< /ui >}} 필드의 이벤트와 일치시킬 정규식 패턴을 지정합니다. 자세한 내용은 [정규식을 사용한 효과적인 Grok 구문 분석 규칙 작성][1]을 참조하세요.
    Sensitive Data Scanner는 Perl Compatible Regular Expressions(PCRE)를 지원하지만 다음 패턴은 지원하지 않습니다.
    - 역참조 및 캡처 하위 표현식(lookaround)
    - 임의의 제로폭 어설션(zero-width assertion)
    - 서브루틴 참조 및 재귀 패턴
    - 조건부 패턴
    - 백트래킹 제어 동사
    - UTF-8 시퀀스를 손상시키는 `\C` "single-byte" 지시문
    - `\R` 줄바꿈 일치
    - `\K` 일치 시작 재설정 지시문
    - 콜아웃 및 임베디드 코드
    - 원자적 그룹화 및 소유형 수량자(possessive quantifiers)
1. {{< ui >}}Add sample data{{< /ui >}} 필드에 샘플 데이터를 입력하여 정규식 패턴이 유효한지 확인합니다.
1. {{< ui >}}Create keyword dictionary{{< /ui >}}에서 정규식 조건과 일치할 때 탐지 정확도를 높이기 위해 키워드를 추가합니다. 예를 들어 16자리 Visa 신용카드 번호를 스캔하는 경우 `visa`, `credit` 및 `card`와 같은 키워드를 추가할 수 있습니다. 또한 이러한 키워드가 일치 항목으로부터 지정된 문자 수 이내에 있도록 설정할 수 있습니다. 기본적으로 키워드는 일치한 값 앞의 30자 이내에 있어야 합니다.
1. {{< ui >}}Define rule target and conditions{{< /ui >}} 섹션의 드롭다운 메뉴에서 {{< ui >}}Entire Event{{< /ui >}}, {{< ui >}}Specific Attributes{{< /ui >}} 또는 {{< ui >}}Exclude Attributes{{< /ui >}} 중 무엇을 스캔할지 선택합니다.
    - 전체 이벤트를 스캔하는 경우, 특정 속성을 스캔 대상에서 선택적으로 제외할 수 있습니다. 중첩된 키에 액세스하려면 [경로 표기법](#path-notation-example)(`outer_key.inner_key`)을 사용하세요. 중첩된 데이터가 있는 속성을 지정하면 해당 속성의 모든 중첩된 데이터가 제외됩니다.
    - 특정 속성을 스캔하는 경우 스캔할 속성을 지정하세요. 중첩된 키에 액세스하려면 [경로 표기법](#path-notation-example-custom)(`outer_key.inner_key`)을 사용하세요. 중첩된 데이터가 있는 속성을 지정하면 해당 속성의 모든 중첩된 데이터가 스캔됩니다.
1. {{< ui >}}Define actions on match{{< /ui >}}에서 일치하는 정보에 대해 수행할 액션을 선택합니다. **참고**: 비식별화, 부분 비식별화 및 해싱은 모두 되돌릴 수 없는 작업입니다.
    - {{< ui >}}Redact{{< /ui >}}: 일치하는 모든 값을 {{< ui >}}Replacement text{{< /ui >}} 필드에서 지정한 텍스트로 대체합니다.
    - {{< ui >}}Partially Redact{{< /ui >}}: 일치하는 모든 데이터에서 지정된 부분을 대체합니다. {{< ui >}}Redact{{< /ui >}} 섹션에서 비식별화할 문자 수와 일치하는 데이터의 어느 부분을 비식별화할지 지정합니다.
    - {{< ui >}}Hash{{< /ui >}}: 일치하는 모든 데이터를 고유 식별자로 대체합니다. 일치하는 UTF-8 바이트를 FarmHash의 64비트 지문으로 해싱합니다.
1. 필요시 {{< ui >}}Add Field{{< /ui >}}를 클릭하여 일치하는 이벤트와 연결할 태그를 추가합니다.
1. 스캔 규칙의 이름을 추가합니다.
1. 필요시 규칙 설명을 추가합니다.
1. {{< ui >}}Add Rule{{< /ui >}}을 클릭합니다.

[1]: /ko/logs/guide/regex_log_parsing/

{{% /tab %}}
{{< /tabs >}}

### 규칙 삭제 {#delete-a-rule}

Sensitive Data Scanner에서 규칙을 삭제하려면 다음 단계를 따르세요.

1. [Observability Pipelines][2]로 이동합니다.
1. 파이프라인을 선택합니다.
1. Sensitive Data Scanner 프로세서를 클릭하여 확장합니다.
1. {{< ui >}}Manage Scanning Rules{{< /ui >}}를 클릭합니다.
1. 삭제할 규칙을 선택합니다.
1. {{< ui >}}Delete{{< /ui >}}를 클릭합니다.

### 경로 표기법 예시 {#path-notation-example}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

## Terraform을 사용하여 프로세서를 설정 {#set-up-the-processor-using-terraform}

[Datadog Observability Pipeline Terraform 리소스][4]를 사용하여 Sensitive Data Scanner 프로세서가 포함된 파이프라인을 설정할 수 있습니다. Terraform을 사용하여 Sensitive Data Scanner 프로세서에 규칙을 추가하려면 다음 단계를 따르세요.

1. [Datadog Sensitive Data Scanner Standard Pattern][5] 데이터 소스를 사용하여 Sensitive Data Scanner [라이브러리 규칙][6]의 규칙 ID를 검색합니다.

   {{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "<RULE_IDENTIFIER>" {
  filter = "<RULE_NAME>"
}
   {{< /code-block >}}

   다음 자리 표시자를 바꿉니다.

   - `<RULE_IDENTIFIER>`: 나중에 Observability Pipeline 리소스에서 Sensitive Data Scanner 프로세서를 설정할 때 사용할 이름으로 바꾸세요.
   - `<RULE_NAME>`: 규칙의 정확한 이름으로 바꾸세요. 전체 규칙 목록은 [라이브러리 규칙][6]을 참조하세요.

   예를 들어 [AWS Access Key ID Scanner][7]를 사용하려면 데이터 소스를 다음과 같이 구성하세요.

   {{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  filter = "AWS Access Key ID Scanner"
}
   {{< /code-block >}}
    여러 규칙의 데이터 소스를 추가하는 방법은 [전체 구성 예시](#full-configuration-example)를 참조하세요.

1. 라이브러리 규칙에 대한 Observability Pipeline 리소스에 [rule][9] 블록을 추가합니다.

   {{< code-block lang="terraform" >}}
...
  sensitive_data_scanner {
    rule {
      name = "<YOUR_RULE_NAME>"
      tags = []
      on_match {
        redact {
          replace = "***"
        }
      }
      pattern {
        library {
          id                       = data.datadog_sensitive_data_scanner_standard_pattern.<RULE_IDENTIFIER>.id
          use_recommended_keywords = true
        }
      }
      scope {
        all = true
      }
    }
  }
   {{< /code-block >}}

   다음 자리 표시자를 바꿉니다.

   - `<YOUR_RULE_NAME>`: 규칙의 이름을 입력하세요. 이 이름은 Pipelines UI에 표시됩니다.
   - `<RULE_IDENTIFIER>`: 1단계에서 데이터 소스에 사용한 규칙 식별자를 입력하세요.

   예를 들어, 1단계에서 [AWS Access Key ID Scanner][7] 소스를 사용하는 경우 규칙 블록을 다음과 같이 구성하세요.

   {{< code-block lang="terraform" >}}
...
  sensitive_data_scanner {
    rule {
      name = "Redact AWS Access Key IDs"
      tags = []
      on_match {
        redact {
          replace = "***"
        }
      }
      pattern {
        library {
          id                       = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
          use_recommended_keywords = true
        }
      }
      scope {
        all = true
      }
    }
  }
   {{< /code-block >}}

   여러 규칙을 추가하는 방법은 [전체 설정 예시](#full-configuration-example)를 참조하세요.

1. 추가하려는 모든 라이브러리 규칙에 대해 1단계와 2단계를 반복합니다.

### 전체 구성 예시 {#full-configuration-example}

{{< img src="observability_pipelines/processors/sds_tf_ui.png" alt="두 가지 스캔 규칙(AWS Access Key ID 비식별화 및 미국 SSN 비식별화)이 표시된 Sensitive Data Scanner 프로세서 패널" style="width:60%;" >}}

Sensitive Data Scanner 프로세서를 사용하여 AWS Access Key ID 및 미국 사회보장번호를 스캔하고 `***` 문자열로 대체하여 비식별화하려면 다음 단계를 따르세요.

1. [Datadog Sensitive Data Scanner Standard Pattern][5] 데이터 소스를 사용하여 [AWS Access Key ID Scanner][7] 및 [US Social Security Number Scanner][8]에 대한 규칙 ID를 검색합니다.
1. [Datadog Observability Pipeline][4] 리소스의 Sensitive Data Scanner 프로세서에서 데이터 소스에 정의된 Sensitive Data Scanner 규칙을 사용합니다.

{{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  filter = "AWS Access Key ID Scanner"
}
data "datadog_sensitive_data_scanner_standard_pattern" "us_ssn" {
  filter = "US Social Security Number Scanner"
}

resource "datadog_observability_pipeline" "sensitive_data_pipeline" {
  name = "Sensitive Data Pipeline"

  config {
    source {
      id = "source-0"
      datadog_agent {}
    }

    processor_group {
      display_name = "Processors"
      enabled      = true
      id           = "group-0"
      include      = "*"
      inputs       = ["source-0"]

      processor {
        display_name = "Sensitive Data Scanner"
        enabled      = true
        id           = "processor-sds-0"
        include      = "*"

        sensitive_data_scanner {
          rule {
            name = "Redact AWS Access Key IDs"
            tags = []
            on_match {
              redact {
                replace = "***"
              }
            }
            pattern {
              library {
                id                       = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
                use_recommended_keywords = true
              }
            }
            scope {
              all = true
            }
          }
          rule {
            name = "Redact US SSNs"
            tags = []
            on_match {
              redact {
                replace = "***"
              }
            }
            pattern {
              library {
                id                       = data.datadog_sensitive_data_scanner_standard_pattern.us_ssn.id
                use_recommended_keywords = true
              }
            }
            scope {
              all = true
            }
          }
        }
      }
    }

    destination {
      id     = "destination-0"
      inputs = ["group-0"]
      datadog_logs {}
    }
  }
}
{{< /code-block >}}

##  성능 최적화 모범 사례 {#best-practices-to-optimize-performance}

Sensitive Data Scanner 프로세서는 CPU 사용량이 높습니다. 성능을 최적화하려면 다음 모범 사례를 따르세요.

###  Observability Pipelines Overview 대시보드에서 스캔 규칙 사용량 조회 {#view-scanning-rule-usage-with-the-observability-pipelines-overview-dashboard}

Observability Pipelines에는 **Sensitive data found by Observability Pipelines** 섹션이 포함된 기본 제공 [Observability Pipelines Overview][16] 대시보드가 있습니다. 해당 섹션의 위젯을 사용하여 어떤 스캔 규칙이 데이터와 일치하는지 조회하세요.

1. Dashboards > [Observability Pipelines Overview][16]로 이동합니다.
1. 대시보드 상단의 템플릿 변수(`pipeline_id`, `host`, `worker_uuid`, `component_type`, `component_kind`, `component_id`)를 사용하여 특정 파이프라인 또는 Worker로 조회 범위를 지정합니다.
1. 시간 선택기를 사용하여 더 넓은 시간 범위로 범위를 지정합니다.

다음 위젯을 사용하여 Sensitive Data Scanner 프로세서의 스캔 규칙 사용량을 평가하세요.

- **Logs containing sensitive data per scanning rule**:  선택한 시간 범위 동안의 일치 횟수와 함께 각 규칙을 이름별로 나열합니다(예: `visa_card_scanner_1x16_1x19_digits` 또는 `redact_ipv4`). 일치 횟수가 높은 규칙은 데이터를 활발하게 매칭하고 있습니다. 어떤 규칙이 사용 중인지 확인하는 기본 위젯입니다.
- **Total count of logs containing sensitive data**: 모든 규칙에서 일치한 민감 데이터의 총 볼륨을 표시합니다.
- **Logs containing sensitive data by Pipeline**: 민감 데이터가 포함된 일치 로그를 표시합니다. `pipeline_id`를 기준으로 범위를 좁혀 민감 데이터가 포함된 로그가 모든 파이프라인에서 발견되는지 아니면 특정 파이프라인에서만 발견되는지 확인할 수 있습니다.
- **Logs containing sensitive data per host**: 민감 데이터 일치 항목을 Worker 호스트별로 분류합니다. 이 위젯을 사용하여 배포 전반의 적용 범위를 확인하세요.
- **Patterns containing sensitive information** 및 **List of logs containing sensitive data**: 민감 데이터가 발견된 로그 패턴과 샘플 이벤트를 표시합니다.

대표성 있는 시간 범위 동안 일치 항목이 없는 규칙을 식별한 후, 해당 규칙이 필요하지 않은지 확인하고 삭제하세요. [규칙 삭제](#delete-a-rule)를 참조하세요.

**참고**: 일치 항목이 0인 규칙은 선택한 시간 범위 내에서 일치 항목이 없었다는 의미이며, 규칙이 유효하지 않다는 의미는 아닙니다.

### 필요한 규칙만 활성화 {#only-enable-rules-you-need}

활성화되어 있지만 사용되지 않는 규칙은 불필요한 리소스를 소비합니다. Sensitive Data Scanner 프로세서에서 지난 24시간 동안 각 규칙이 일치한 횟수를 조회하세요.

1. [Observability Pipelines][2]로 이동합니다.
1. 파이프라인을 선택합니다.
1. Sensitive Data Scanner 프로세서를 클릭하여 확장합니다.
1. {{< ui >}}View Scanning Rules{{< /ui >}}를 클릭하여 사이드 패널을 열고 각 규칙의 {{< ui >}}Matches in the last 24 hours{{< /ui >}}를 확인합니다.

사용하지 않는 규칙을 삭제하려면 [규칙 삭제](#delete-a-rule)를 참조하세요.

### 민감 데이터 스캔이 필요한 이벤트와 필드만 스캔 {#only-scan-the-events-and-fields-that-need-to-be-scanned-for-sensitive-data}

Sensitive Data Scanner가 이벤트를 스캔하는 데 걸리는 시간은 대체로 이벤트 크기에 비례합니다. 프로세서 성능을 최적화하려면 다음을 수행하세요.

- 스캔하려는 이벤트 유형을 알고 있다면 해당 이벤트만 프로세서로 보내는 프로세서 쿼리를 정의하세요.

- 스캔할 특정 이벤트 속성을 지정하거나 스캔에서 이벤트 속성을 제외하여 스캔 시간을 단축하세요. [프로세서 설정](#set-up-the-processor-in-the-ui)의 {{< ui >}}Define rule target and conditions{{< /ui >}} 단계를 참조하세요.

### 성능 최적화 평가 및 벤치마킹 {#evaluate-and-benchmark-performance-optimizations}

`pipelines.component_latency_seconds` 메트릭을 사용하여 다음을 수행할 수 있습니다.

- 규칙을 추가할 때 프로세서 성능 벤치마킹
- 스캔할 필드 수를 줄이거나 사용하지 않는 규칙을 제거하는 등 최적화 변경 후 성능 평가

`pipelines.component_latency_seconds` 메트릭을 조회하려면 다음 단계를 따르세요.

1. [Metrics Explorer][11]로 이동합니다.
1. 메트릭 필드에 `pipelines.component_latency_seconds`를 입력합니다.
1. {{< ui >}}from{{< /ui >}} 필드에 `component_id:<COMPONENT_ID>` 태그를 입력합니다. 여기서 `<COMPONENT_ID>`는 Sensitive Data Scanner 프로세서의 ID입니다.

**참고**: `pipelines.component_latency_seconds`는 분포 메트릭이므로 해당 메트릭의 백분위수를 활성화해야 합니다. 자세한 내용은 [고급 쿼리 기능 활성화][12]를 참조하세요.

## 상태 메트릭 {#health-metrics}

모든 프로세서에서 내보내는 [구성 요소 메트릭][13] 및 [프로세서 버퍼 메트릭][14]에 대한 자세한 내용은 [파이프라인 사용량 메트릭][15] 문서를 참조하세요.

### Sensitive Data Scanner 메트릭 {#sensitive-data-scanner-metrics}

- 개별 구성 요소별로 필터링하거나 그룹화하려면 `component_id` 태그를 사용하세요.
- Sensitive Data Scanner 프로세서 메트릭의 `component_type` 태그 값은 `sensitive_data_scanner`입니다.

`pipelines.sds_rule_matched_total`
: **설명**: Sensitive Data Scanner 규칙과 일치하는 이벤트 수입니다. 일치하는 규칙 이름이 태그로 지정됩니다.
: **메트릭 유형**: 카운트

`pipelines.scanned_events`
: **설명**: Sensitive Data Scanner 엔진에서 스캔한 이벤트 수입니다.
: **메트릭 유형**: 카운트

`pipelines.scanning.match_count`
: **설명**: Sensitive Data Scanner에서 발견한 일치 항목 수입니다.
: **메트릭 유형**: 카운트

`pipelines.scanning.suppressed_match_count`
: **설명**: Sensitive Data Scanner에 의해 억제된 일치 항목의 수입니다.
: **메트릭 유형**: 카운트

`pipelines.scanning.duration`
: **설명**: 이벤트를 스캔하는 데 소요된 누적 벽시계 시간(초)입니다. 이 메트릭을 사용하여 프로세서 성능을 벤치마킹하고 최적화 효과를 평가하세요.
: **메트릭 유형**: 카운트

`pipelines.scanning.cpu_duration`
: **설명**: 이벤트를 스캔하는 데 소요된 누적 CPU 시간(초)입니다.
: **메트릭 유형**: 카운트

`pipelines.scanner.total_count`
: **설명**: 현재 실행 중인 Sensitive Data Scanner 프로세서의 수입니다.
: **메트릭 유형**: 게이지

`pipelines.scanner.total_regexes`
: **설명**: 모든 Sensitive Data Scanners에 포함된 정규식의 수입니다.
: **메트릭 유형**: 게이지

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/search_syntax/logs/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ko/logs/guide/regex_log_parsing/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/sensitive_data_scanner_standard_pattern
[6]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/
[7]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/?search=AWS+Access+Key+ID+Scanner
[8]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/?search=US+Social+Security+Number+Scanner
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline#nested-schema-for-configprocessor_groupprocessorsensitive_data_scanner
[10]: /ko/api/latest/observability-pipelines/#create-a-new-pipeline
[11]: https://app.datadoghq.com/metric/explorer
[12]: /ko/metrics/distributions/#enabling-advanced-query-functionality
[13]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[15]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[16]: https://app.datadoghq.com/dash/integration/32326/observability-pipelines-overview