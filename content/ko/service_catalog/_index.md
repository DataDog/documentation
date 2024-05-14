---
algolia:
  tags:
  - service catalog
aliases:
- /ko/tracing/faq/service_catalog/
- /ko/tracing/services/services_list/
- /ko/tracing/visualization/services_list/
- /ko/tracing/service_catalog/
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: 설명서
  text: Service Definition API로 서비스 등록하기
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Terraform
  text: Terraform을 사용하여 서비스 정의 생성 및 관리
- link: /tracing/service_catalog/guides/understanding-service-configuration
  tag: 가이드
  text: 서비스 설정 이해하기
- link: /tracing/service_catalog/guides/upstream-downstream-dependencies
  tag: 가이드
  text: 인시던트 발생 중 업스트림 및 다운스트림 종속성 확인하기
- link: https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/
  tag: 블로그
  text: Service Definition JSON Schema를 사용하여 Service Catalog 항목 관리
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: 블로그
  text: APM 보안 보기를 통해 리스크, 취약성, 공격에 대한 가시성 확보
- link: https://www.datadoghq.com/blog/service-catalog-setup/
  tag: 블로그
  text: 간소화된 Service Catalog 설정으로 서비스에 태그와 메타데이터를 쉽게 추가하세요.
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: 블로그
  text: 저는 Datadog의 Service Catalog에 GitHub Actions를 사용하며 여러분도 그렇게 해야 합니다.
- link: https://www.datadoghq.com/blog/shift-left-datadog-service-catalog/
  tag: 블로그
  text: Datadog Service Catalog로 Shift-Left 옵저버빌리티 향상시키기
- link: https://www.datadoghq.com/blog/service-ownership-best-practices-datadog/
  tag: 블로그
  text: Datadog Service Catalog를 사용한 엔드투엔드 서비스 소유권 모범 사례
kind: 설명서
title: Datadog 서비스 카탈로그
---

{{< img src="tracing/service_catalog/service_catalog_updated.mp4" video=true alt="Service Catalog 탐색하기" style="width:100%;" >}}

## 개요

Datadog [Service Catalog][1]는 소유권 메타데이터, 성능 인사이트, 보안 분석, 비용 할당 등을 결합하여 서비스에 대한 통합된 보기를 제공합니다. 이를 통해 조직은 손쉽게 대규모의 엔드투엔드 서비스 소유권을 가질 수 있고, 성능에 대한 실시간 인사이트를 확보하며, 안정성과 보안 위험을 감지 및 해결하고, 애플리케이션 종속성을 모두 한 곳에서 관리할 수 있습니다.

### 사용 사례

#### 서비스 검색
- Datadog Service Catalog에는 기본적으로 APM, USM 및 RUM에서 검색된 모든 서비스가 포함됩니다. 이러한 제품을 사용하는 경우 카탈로그가 항목으로 미리 채워집니다.
- 환경 전반에 걸쳐 더 많은 애플리케이션을 계측하면 해당 애플리케이션이 Service Catalog에 자동으로 추가됩니다.

#### 종속성 매핑 및 관리
- APM, USM 및 RUM에서 수집한 애플리케이션 원격 측정을 통해 모든 업스트림 및 다운스트림 종속성을 자동으로 문서화하고 추적합니다.
- 구성 요소 간 종속 관계를 수동으로 선언합니다([메타데이터 스키마 v3.0][8]을 통해 사용 가능).
- 팀과 서비스 전반에 걸쳐 성능에 미치는 영향을 이해하고 평가합니다.

#### 거버넌스 및 최적화
- [Service Scorecards][9]를 통해 팀과 서비스 전반에 걸쳐 모범 사례에 대한 높은 수준의 시각을 갖춘 엔지니어링 리더십을 제공합니다.
- 서비스 종속성에서 알려진 보안 취약성을 찾아 수정함으로써 애플리케이션 위험을 줄입니다.
- 서비스와 관련된 비용의 추세를 이해하고 비효율성을 식별합니다.

#### 지식 공유
- 수많은 리포지토리, 채널 또는 문서 페이지를 탐색하지 않고도 정보를 찾을 수 있습니다.
- 새로운 팀원을 온보딩할 때 런북이나 위키 페이지를 검색하는 시간을 절약하세요.
- 실시간 자동 생성 토폴로지 맵을 활용하여 시스템 아키텍처를 이해합니다.

#### 모니터링 범위 평가
- 옵저버빌리티 데이터를 보고하지 않거나 해당 데이터를 모니터링하지 않는 서비스를 감지합니다.
- [태그 지정 모범 사례][6]를 촉진하고 [교차 원격 측정 인사이트][7]를 최적화하기 위한 권장 설정을 확인합니다.
- 누락된 SLO, 모니터 또는 소유권이 없는 서비스와 같은 문제를 발견합니다.

#### 인시던트 발생 시 협업 간소화
- 모니터링 및 문제 해결 세부 사항에 대한 간소화된 액세스와 함께 올바른 소유권 정보 및 커뮤니케이션 채널을 설정하여 모든 사람의 비상대기 경험을 개선합니다.
- 엔지니어가 이미 사용하고 있는 옵저버빌리티 도구에 직접 솔루션 및 문제 해결 도구(예: 런북 및 설명서)에 대한 링크를 포함합니다.
- 신뢰도를 높이고 업스트림 및 다운스트림 서비스와 종속성의 소유자를 찾는 작업을 간소화하여 인시던트 복구 속도를 높입니다.


## 시작하기

{{< whatsnext desc="서비스 카탈로그 기능:" >}}
    {{< nextlink href="/service_catalog/navigating/" >}}서비스 카탈로그 살펴보기{{< /nextlink >}}
    {{< nextlink href="/service_catalog/investigating" >}}서비스 자세히 살펴보기{{< /nextlink >}}
{{< /whatsnext >}}

## 역할 기반 액세스 및 권한

자세한 내용은  [역할 기반 액세스 제어][2] 또는 [역할 권한][3]을 참고하세요.
### 읽기 권한

Service Catalog 읽기 권한을 통해 사용자는 서비스 카탈로그 데이터를 읽을 수 있으며 다음 기능을 사용할 수 있습니다.
- Service Catalog 목록
- UI 검색
- 서비스 정의 엔드포인트: `/api/v2/services/definition/<service_name>`

이 권한은 **Datadog Read Only Role** 및 **Datadog Standard Role**에서 기본적으로 활성화됩니다.

### 쓰기 권한 

Service Catalog 쓰기 권한을 통해 사용자는 서비스 카탈로그 데이터를 수정할 수 있습니다. 다음 기능에는 쓰기 권한이 필요합니다.
- `POST /api/v2/services/definitions` 엔드포인트를 사용하여 서비스 정의 삽입 또는 업데이트
- `DELETE /api/v2/services/definition/<service_name>` 엔드포인트를 사용하여 서비스 정의 삭제
- Discover Services UI에서 온보딩 프로세스 완료
- UI에서 서비스 메타데이터 업데이트

이 권한은 **Datadog Admin Role** 및 **Datadog Standard Role**에서 기본적으로 활성화됩니다.

## 서비스 유형

모니터링되는 모든 서비스는 유형과 연결됩니다. Datadog은 수신 범위 데이터에 연결된 `span.type` 속성을 기반으로 이 유형을 자동으로 결정합니다. 유형은 Datadog Agent가 통합되는 애플리케이션 또는 프레임워크의 이름을 지정합니다.

예를 들어 공식 Flask 통합을 사용하는 경우 `Type`은 "Web"으로 설정됩니다. 커스텀 애플리케이션을 모니터링하는 경우 `Type`은 "Custom"으로 나타납니다.

서비스 유형은 다음 중 하나일 수 있습니다.

*  Cache
*  Custom
*  DB
*  서버리스 함수
*  Web

일부 통합은 유형에 대한 별칭입니다. 예를 들어 Postgres, MySQL 및 Cassandra는 "DB" 유형에 매핑됩니다. Redis 및 Memcache 통합은 "Cache" 유형에 매핑됩니다.

## 데이터 보존
**Service List** 및 **Service Page**의 서비스 및 리소스 통계와 스팬 요약은 최대 30일 동안 유지됩니다. APM 트레이스 메트릭에 대한 사용자 정의 쿼리의 경우 Metric Explorer를 사용하세요. [APM의 데이터 보존에 대해 자세히 알아보세요][4].


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ko/account_management/rbac/
[3]: /ko/account_management/rbac/permissions/
[4]: /ko/developers/guide/data-collection-resolution-retention/
[5]: /ko/tracing/service_catalog/adding_metadata#service-definition-schema-v22
[6]: https://www.datadoghq.com/blog/tagging-best-practices/#assign-owners-to-services-with-tags
[7]: /ko/tracing/other_telemetry/
[8]: /ko/service_catalog/add_metadata#metadata-schema-v30-beta
[9]: /ko/service_catalog/scorecards/