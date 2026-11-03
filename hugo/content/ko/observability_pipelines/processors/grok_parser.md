---
description: Grok Parser 프로세서를 사용하여 사용자 지정 또는 비표준 로그를 구조화하는 구문 분석 규칙을 생성하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: 블로그
  text: Observability Pipelines를 사용하여 AI 앱의 OTel 데이터를 ClickHouse 및 Datadog으로 라우팅
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: 블로그
  text: Datadog Observability Pipelines를 사용하여 MSSP의 로그 수집 및 집계 간소화
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Grok Parser 프로세서
---
{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="미리 보기에 참여하세요!" >}}
규칙별 필터 및 AI 생성 구문 분석 규칙은 미리 보기로 제공되고 있습니다. 액세스 권한을 요청하려면 계정 관리자에게 문의하세요.
{{< /callout >}}

##  개요 {#overview}

사용자 지정 애플리케이션 또는 비표준 로그는 구조화된 형식으로 구문 분석하기 어려운 경우가 많습니다. 이 문제를 해결하려면 Grok Parser 프로세서를 사용하여 AI로 구문 분석 규칙을 생성하거나, 공급업체별 형식(예: Apache, Airflow, MySQL)에 라이브러리 규칙을 적용하거나, 직접 구문 분석 규칙을 생성하세요. 그런 다음 샘플 데이터에서 규칙을 테스트하여 구문을 검증하고 구문 분석된 로그 출력을 미리 보세요.

**참고**:
- 구문 분석하려는 각 필드에 대해 별도의 Grok Parser를 생성해야 합니다.
- 로그는 일치하는 첫 번째 규칙에 의해서만 구문 분석되므로 [규칙의 순서가 중요합니다](#order-of-custom-rules).
- 2.17 이전 버전의 Worker를 사용하는 경우, 프로세서가 로그를 구문 분석하려면 로그에 `source` 또는 `ddsource` 필드와 `message` 필드가 있어야 합니다.

## 설정 {#setup}

Grok Parser 프로세서는 다음 작업을 수행합니다.

1. 프로세서 수준 필터 쿼리를 사용하여 구문 분석 도구로 전송되는 로그를 결정합니다.
1. 로그에서 구문 분석할 지정된 필드를 식별합니다.
1. (미리 보기) 규칙 수준 필터 쿼리를 사용하여 로그와 일치하는 첫 번째 구문 분석 규칙을 적용합니다.
1. 지정된 로그 필드를 규칙의 출력으로 덮어쓴 다음 로그를 파이프라인의 다음 단계로 전송합니다.

{{< img src="observability_pipelines/processors/grok_parser_setup.png" alt="필터 쿼리 및 구문 분석할 필드 설정을 보여주는 Grok Parser 프로세서 패널입니다." style="width:50%;" >}}

Grok Parser 프로세서를 설정하려면 다음 단계를 따르세요.

1. 프로세서 수준 필터 쿼리를 정의합니다. 이 필터 쿼리와 일치하는 로그만 구문 분석 도구로 전송됩니다. 모든 로그는 프로세서에 의해 구문 분석되는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다. 쿼리 생성에 대한 자세한 내용은 [로그 검색 구문][3]을 참조하세요.
1. 구문 분석할 로그 필드를 입력합니다. 예를 들어, `logmessage`를 입력하면 `logmessage` 특성의 콘텐츠가 구문 분석됩니다. 필드가 지정되지 않은 경우 `message`가 기본 필드로 사용됩니다.
1. {{< ui >}}Enable Library Rules{{< /ui >}}를 꺼서 모든 라이브러리 구문 분석 규칙을 비활성화합니다.
   <br>**참고**:
   - 라이브러리 규칙을 비활성화하려면 먼저 사용자 지정 구문 분석 규칙을 생성해야 합니다.
   - 라이브러리 규칙은 기본적으로 적용됩니다. 사용자 지정 구문 분석 규칙을 사용하는 경우에만 라이브러리 규칙을 비활성화하세요.
1. {{< ui >}}View Library Rules{{< /ui >}}를 클릭하여 통합을 위한 사전 설정 규칙을 미리 봅니다. 로그 샘플을 사용하여 기본 제공 구문 분석 규칙을 테스트할 수 있습니다. 자세한 내용은 [라이브러리 규칙](#library-rules)을 참조하세요.

### AI 생성 또는 사용자 지정 구문 분석 규칙 생성 {#create-an-ai-generated-or-custom-parsing-rule}

AI 지원 또는 사용자 지정 구문 분석 규칙을 설정하려면 Grok Parser 프로세서에서 {{< ui >}}Create Parsing Rules{{< /ui >}}를 클릭하세요.

1. 구문 분석 규칙의 이름을 입력합니다.
1. (미리 보기) 이 규칙이 적용될 로그를 정의하기 위한 필터 쿼리를 입력합니다. Grok Parser는 로그가 규칙별 필터 쿼리와 일치하는 경우에만 규칙을 실행하므로 서로 다른 로그 형식에 서로 다른 구문 분석 규칙을 적용할 수 있습니다. 쿼리 생성에 대한 자세한 내용은 [로그 검색 구문][3]을 참조하세요.
1. 구문 분석하려는 로그 샘플을 입력합니다. 샘플은 Live Capture에서 복사하거나 다른 소스에서 붙여넣을 수 있습니다.
1. (미리 보기) {{< ui >}}Generate New Rule{{< /ui >}}을 클릭하여 AI가 샘플 로그를 기반으로 새 구문 분석 규칙을 생성하도록 합니다. 그렇지 않으면 [수동으로 규칙 작성](#manually-write-rules)을 참조하여 직접 규칙을 작성합니다.
    1. {{< ui >}}Preview Changes{{< /ui >}} 패널에서 구문 분석된 로그를 검토합니다.
    1. 로그가 올바르게 구문 분석되도록 {{< ui >}}Generate New Rule{{< /ui >}}을 클릭하여 AI 규칙 생성기를 다시 실행하거나 규칙을 수동으로 업데이트합니다. 구문 분석 규칙 작성에 대한 자세한 내용은 [구문 분석][1]을 참조하세요.
    <br>**참고**:
        - AI 규칙 생성기를 다시 실행하면 새 규칙이 생성됩니다. 이전에 AI가 생성한 규칙을 원하지 않는 경우, 수동으로 삭제해야 합니다.
        - 샘플당 최대 3회까지 AI 규칙 생성기를 실행할 수 있습니다.
    1. 4단계를 반복하여 추가 샘플 로그를 기반으로 규칙을 생성합니다. 규칙 순서에 따라 로그를 구문 분석할 규칙이 결정되는 방법에 대한 자세한 내용은 [사용자 지정 규칙 순서](#order-of-custom-rules)를 참조하세요.
1. 규칙을 추가한 후 {{< ui >}}reference a library rule{{< /ui >}} 드롭다운 메뉴에서 라이브러리 규칙을 선택하여 라이브러리 규칙을 추가할 수 있습니다. 여러 라이브러리 규칙을 추가할 수 있습니다. 자세한 내용은 [라이브러리 규칙](#library-rules)을 참조하세요.
1. 도우미 규칙을 추가하려면 {{< ui >}}Advanced Settings{{< /ui >}}를 클릭합니다. 자세한 내용은 [공통 패턴을 재사용하기 위해 도우미 규칙 사용][2]을 참조하세요.
1. {{< ui >}}Create Rule{{< /ui >}}을 클릭합니다.

{{< img src="observability_pipelines/processors/grok_parser_create_rule.png" alt="Grok Parser 프로세서의 Create Parsing Rule 모달입니다." style="width:50%;" >}}

로그가 구문 분석 도구로 전송되었지만 어떤 규칙으로도 구문 분석되지 않는 경우, Worker는 `The parser failed to apply rule` 오류가 포함된 로그를 생성합니다.

#### 사용자 지정 규칙 순서 {#order-of-custom-rules}

Grok Parser 프로세서에 대해 여러 사용자 지정 규칙이 있는 경우, 로그는 쿼리가 일치하는 첫 번째 규칙에 의해 구문 분석된 다음 파이프라인의 다음 단계로 전송됩니다. 프로세서는 로그를 후속 규칙과 일치시키려고 시도하지 않습니다. 따라서 로그가 여러 규칙과 일치할 수 있는 경우 규칙의 순서가 중요합니다. 규칙의 순서를 변경하려면 규칙을 끌어다가 원하는 순서로 놓으세요.

##### 예시 {#example}

다음 구문 분석 규칙을 사용하는 구문 분석 도구를 고려해 보세요.

1. 규칙 예시 1
1. 규칙 예시 2
1. 규칙 예시 3

구문 분석 도구로 전송된 로그가 세 가지 규칙 쿼리와 모두 일치하는 경우, 해당 로그는 규칙 2와 3보다 먼저 나열되어 있으므로 규칙 예시 1에 의해서_만_ 구문 분석됩니다.

{{< img src="observability_pipelines/processors/grok_parser_rule_order.png" alt="Grok Parser 프로세서에 순서대로 나열된 세 가지 구문 분석 규칙입니다." style="width:50%;" >}}

#### 수동으로 규칙 작성 {#manually-write-rules}

구문 분석 규칙을 수동으로 작성하려면 {{< ui >}}Create Parsing Rule{{< /ui >}} 모달에서 다음 단계를 따르세요.

1. {{< ui >}}write rules manually{{< /ui >}}를 클릭합니다.
1. 로그를 구문 분석하기 위한 규칙을 입력합니다. Datadog Grok 패턴을 사용하여 구문 분석 규칙을 작성하는 방법에 대한 자세한 내용은 [구문 분석][1]을 참조하세요. **참고**: `url`, `useragent` 및 `csv` 필터는 사용할 수 없습니다.
1. {{< ui >}}Preview Changes{{< /ui >}} 패널에서 구문 분석된 로그를 검토하고 로그가 예상대로 구문 분석될 때까지 규칙을 업데이트합니다.
1. {{< ui >}}Add rule{{< /ui >}}을 클릭하여 다른 규칙을 수동으로 작성합니다.

### 라이브러리 규칙 {#library-rules}

로그가 구문 분석 도구로 전송되면 `source` 또는 `ddsource` 필드가 있는 경우 라이브러리 규칙이 로그에 자동으로 적용됩니다. 예를 들어, 로그에 `source:mysql`이 있는 경우 구문 분석 도구는 해당 로그에 MySQL 라이브러리 규칙을 적용합니다. 사용 가능한 모든 라이브러리 규칙을 찾아보려면 Grok Parser 프로세서에서 {{< ui >}}View Library Rules{{< /ui >}}를 클릭하세요. 라이브러리 규칙 표를 검색하고 규칙을 클릭하여 로그에 어떻게 적용되는지 미리 볼 수 있습니다.

사용자 지정 규칙을 생성할 때 라이브러리 규칙을 추가할 수도 있습니다. 자세한 내용은 [AI 지원 또는 사용자 지정 구문 분석 규칙 생성](#create-an-ai-assisted-or-custom-parsing-rule)을 참조하세요.

## 상태 메트릭 {#health-metrics}

모든 프로세서에서 내보내는 [구성 요소 메트릭][4] 및 [프로세서 버퍼 메트릭][5]에 대한 자세한 내용은 [파이프라인 사용량 메트릭][6] 설명서를 참조하세요. Parse 프로세서 메트릭별로 필터링하거나 그룹화하려면 `component_type:parse` 태그를 사용하세요.

[1]: /ko/logs/log_configuration/parsing/
[2]: /ko/logs/log_configuration/parsing/?tab=matchers#using-helper-rules-to-reuse-common-patterns
[3]: /ko/observability_pipelines/search_syntax/logs/
[4]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[5]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[6]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}