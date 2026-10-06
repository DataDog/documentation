---
description: Data Observability를 통해 데이터 품질, 성능 및 비용을 모니터링하여 이상 징후를 탐지하고, 데이터 계보를 분석하며,
  다운스트림 시스템에 영향을 미치는 문제를 예방하세요.
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-metaplane-aquistion/
  tag: 블로그
  text: Datadog, Metaplane 인수를 통해 데이터 팀에 Data Observability 제공
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: 블로그
  text: Datadog으로 Google Cloud AI 스택 평가, 최적화 및 보안 강화
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: 블로그
  text: '데이터 파이프라인 모니터링 101: 데이터 스택 전반에서 상태 및 성능 추적하기'
title: Data Observability 개요
---
## 개요 {#overview}
Data Observability(DO)는 데이터 팀이 분석 및 AI 애플리케이션을 위한 데이터 신뢰성을 개선하고, 데이터 파이프라인의 성능과 비용을 최적화하도록 돕습니다. 프로덕션에서 소비에 이르기까지 품질 및 작업 모니터링을 통합함으로써 팀은 비용과 성능을 최적화하면서 문제를 더 빠르게 탐지하고 해결할 수 있습니다.

{{< img src="data_observability/do_suite_root_cause_analysis-1.png" alt="Spark 작업 트레이스를 포함한 Datadog Data Observability 엔드투엔드 계보." style="width:100%;" >}}

## 주요 기능 {#key-capabilities}

- **조기 실패 탐지**: ML 기반 모니터링을 통해 대시보드, 이해관계자 또는 AI 모델이 영향을 받기 전에 Snowflake, Databricks 및 BigQuery와 같은 웨어하우스에서 잘못된 데이터를 포착합니다. Databricks, Spark, Airflow 또는 dbt에서 실행되는 작업의 업스트림 파이프라인 실패를 탐지합니다.
- **해결 가속화**: 엔드투엔드 계보를 사용해 문제를 더 빠르게 분류함으로써 근본 원인을 정확히 찾아내고, 인시던트 영향 범위를 평가하며, 적절한 소유자에게 라우팅합니다. 파이프라인에서 어떤 작업이 실패했거나 지연되었는지 확인하고, 작업 실행 트레이스와 로그로 전환하여 원인을 파악합니다.
- **비용 및 성능 최적화**: Spark 및 Databricks 작업과 클러스터의 비용 및 효율성에 대한 가시성을 확보하고, 권장 사항을 활용하여 클러스터 구성, 코드 및 쿼리를 최적화합니다.
- **엔드투엔드 관측 가능성 통합**: 전체 데이터 수명 주기에 걸쳐 데이터 품질, 파이프라인 실행 및 인프라 신호를 한곳에서 상호 연관시킵니다.

## 시작하기 {#get-started}

{{< whatsnext desc="Data Observability는 다음과 같이 구성됩니다." >}}
   {{< nextlink href="/data_observability/data_catalog/" >}}Data Catalog: 연결된 통합 전반에 걸쳐 데이터 자산의 중앙 집중식 인벤토리를 탐색하고 검색합니다.{{< /nextlink >}}
   {{< nextlink href="/data_observability/lineage/" >}}계보: 데이터 스택 전반에서 업스트림 종속성 및 다운스트림 소비자를 추적합니다.{{< /nextlink >}}
   {{< nextlink href="/data_observability/quality_monitoring/" >}}Quality Monitoring: 다운스트림 BI 및 AI 애플리케이션에 영향을 미치기 전에 데이터 문제를 식별합니다.{{< /nextlink >}}
   {{< nextlink href="/data_observability/jobs_monitoring/" >}}Jobs Monitoring: 데이터 파이프라인 전반의 작업을 모니터링하고, 문제를 해결하고, 최적화합니다.{{< /nextlink >}}
   {{< nextlink href="/data_observability/cicd/" >}}CI/CD: 데이터 품질 문제가 병합되기 전에 이를 방지합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}