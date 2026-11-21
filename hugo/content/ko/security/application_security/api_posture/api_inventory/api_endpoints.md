---
description: API 트래픽을 모니터링하여 엔드포인트 위험, 인증, 민감한 데이터 흐름, 노출을 평가하세요.
title: API 엔드포인트
---
[API 엔드포인트][1] 탐색기는 API 트래픽을 모니터링하여 다음을 비롯하여 API 보안 상태에 대한 가시성을 제공합니다.

- **인증**: API 인증 절차의 강제 여부입니다.
- **인증 방법**: 사용되는 인증 유형(Basic Auth, API 키 등)입니다.
- **공개 노출**: API가 인터넷에서 트래픽을 처리하고 있는지 여부입니다.
- **민감한 데이터 흐름**: API가 처리하는 민감한 데이터와 API 간 흐름입니다.
- **공격 노출**: 엔드포인트를 대상으로 공격이 발생하는지 여부입니다.
- **비즈니스 로직**: 이 API에 대한 비즈니스 로직 및 관련 비즈니스 로직 제안입니다.
- **취약점**: 엔드포인트에 취약점이 있는지 여부입니다([Code Security][2] 및 [Software Composition Analysis][3] 기반).
- **결과**: 이 API에서 식별된 보안 결과입니다.
- **종속성**: API의 기반이 되는 API 및 데이터베이스입니다.

API 엔드포인트를 사용하여 다음을 수행할 수 있습니다.

- 민감한 데이터를 처리하거나, 인증이 완료되었거나, 취약점/결과가 있거나, 공개적으로 사용 가능한 엔드포인트를 확인합니다.
- 위험한 상태의 엔드포인트를 확인하고 [위협 모니터링 및 보호][4] 서비스로 직접 이동하여 추가 조사 또는 대응을 수행합니다.
- 비즈니스 로직과 관련된 엔드포인트를 확인하고 엔드포인트 트래픽 기록을 바탕으로 비즈니스 로직 제안을 찾습니다.

## 구성 {#configuration}

서비스에서 API 엔드포인트를 보려면 **App and API Protection 위협 탐지를 활성화해야 합니다**.

Amazon Web Services(AWS) API Gateway 통합을 위해서는 다음을 설정해야 합니다.

- [Amazon Web Services][5]
- [Amazon API Gateway Integration][6]

API 엔드포인트는 Datadog 카탈로그, 특히 [Datadog에 업로드된][7] API 정의 페이지에서 검색됩니다. API 정의 업로드에 대한 지침은 [엔터티 생성][8]을 참조하세요.

API Inventory와 호환되는 라이브러리 버전에 대한 정보는 [App and API Protection 활성화][9]를 참조하세요. [Remote Configuration][10]이 필요합니다.

|기술|최소 트레이서 버전| 민감한 데이터 스캔 지원 |
|----------|----------|----------|
|Python    | v2.1.6   | 요청 및 응답 |
|Java      | v1.31.0  | 요청 전용 |
|PHP      | v0.98.0  | 요청 및 응답 |
|.NET Core | v2.42.0  | 요청 및 응답 |
|.NET Fx   | v2.47.0  | 요청 및 응답 |
|Ruby      | v1.15.0  | 요청 전용 |
|Golang    | v1.59.0  | 요청 전용 |
|Node.js   | v3.51.0, v4.30.0, v5.6.0 | 요청 및 응답 |

**참고**: .NET Core 및 .NET Fx 트레이서에서 API Security 기능이 제대로 작동하려면 환경 변수 `DD_API_SECURITY_ENABLED=true`를 설정해야 합니다.

## 작동 방식 {#how-it-works}

API 엔드포인트는 App and API Protection이 활성화된 Datadog SDK와 Amazon API Gateway 구성 및 업로드된 API 정의를 사용하여 API 트래픽에 대한 보안 메타데이터를 수집합니다. 이 데이터는 검색된 API 스키마, 처리된 민감한 데이터(PII) 유형, 사용 중인 인증 체계를 포함하고 있습니다. API 정보는 지속적으로 평가되므로, 전체 API 공격 표면에 관해 포괄적이고 최신 상태의 정보를 파악할 수 있습니다.

API 엔드포인트는 [Remote Configuration][10]을 통해 민감한 데이터와 인증을 감지하는 스캔 규칙을 관리하고 구성합니다.

검색된 엔드포인트가 공개적으로 접근 가능한지, 인증이 필요한지 확인하려면 [엔드포인트 스캐닝][11]을 활성화합니다. 엔드포인트 스캐닝은 적격 엔드포인트를 능동적으로 스캔하고 검증된 공개 접근성, 인증 상태, HTTP 응답 상태, 마지막 평가 데이터를 사용하여 API 인벤토리를 보강합니다.

각 엔드포인트에 대해 다음과 같은 위험 요소가 산출됩니다.

## 데이터 소스 {#data-sources}

[API 엔드포인트][1] 탐색기에서 {{< ui >}}Data Sources{{< /ui >}}는 가시성이 시작되는 위치를 보여줍니다.

다음과 같은 데이터 소스가 탐색됩니다.

### Amazon API Gateway {#amazon-api-gateway}

<div class="alert alert-info">특정 API에 대해 이 통합을 비활성화하려면 <code>dd_skip_endpoint:true</code> 태그를 리소스에 추가합니다.</div>

Amazon API Gateway 서비스는 API 구조를 공식적으로 정의합니다. Datadog AWS 통합은 Amazon API Gateway에서 사전 정의된 구성을 읽어낸 후, Datadog은 이 구성을 사용하여 {{< ui >}}Inventory{{< /ui >}}에 API 엔드포인트 항목을 생성합니다.

{{< ui >}}Data Source{{< /ui >}}에서 {{< ui >}}AWS API Gateway{{< /ui >}}를 사용하여 노출된 엔드포인트에 대한 가시성을 확보합니다. 또한 쿼리 `datasource:aws_apigateway`를 사용할 수 있습니다.

### Catalog {#catalog}

{{< ui >}}Catalog{{< /ui >}} 데이터 소스는 Datadog에 업로드된 공식 사양을 통해 Datadog이 파악한 API 엔드포인트를 보여줍니다. API 사양은 IDP 서비스 엔터티 내 전용 API 구성 요소에 첨부되거나 등록됩니다.

이 소스는 계획되고 공식적으로 문서화된 모든 엔드포인트를 포함하여 API 인벤토리의 완전성을 보장합니다.

### APM 트레이스 {#apm-traces}

{{< ui >}}Spans{{< /ui >}} 데이터 소스는 실제 트래픽과 데이터 노출을 보여줍니다. 코드, 구성, 액세스 제어를 통해 즉시 수정 작업을 수행해야 합니다.

공격 표면에 따라 취해야 할 조치가 달라집니다.

- **취약점:** SCA 또는 런타임 코드 분석으로 발견된 취약한 라이브러리를 패치한 다음 서비스를 재배포합니다.
- **API 발견 사항:** 트레이스된 서비스 맥락에서 각 문제를 검토하고, 코드나 구성을 수정하고, 새로운 트레이스를 사용하여 검증합니다.
- **민감한 데이터 처리:** 데이터 처리가 정책을 준수하는지 확인하고, PII를 삭제하거나 암호화하며, 필수 서비스에 대한 액세스를 제한합니다.
- **인증되지 않은 엔드포인트:** 엔드포인트를 의도적으로 공개한 것이 아니라면 인증을 강제하고 서비스 구성을 업데이트합니다.

### 정적 엔드포인트 검색 {#static-endpoint-discovery}

<div class="alert alert-info">정적 엔드포인트 검색은 미리 보기로 제공되고 있습니다.</div>

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">정적 엔드포인트 검색은 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

{{< ui >}}Source Code{{< /ui >}} 데이터 소스는 소스 코드에서 직접 발견된 API 엔드포인트를 보여줍니다. 이는 개발 수명 주기 초기에 엔드포인트를 노출하는 방식으로 런타임 기반 검색을 보완하며, 실시간 트래픽을 수신하지 않을 수 있는 엔드포인트를 포함합니다.

이 데이터 소스를 사용하려면 GitHub, GitLab, Azure DevOps를 사용하여 [소스 코드 통합][12]을 구성합니다. 지원되는 언어 및 프레임워크는 다음과 같습니다.

| 언어 | 프레임워크 |
|----------|-----------|
| Python   | FastAPI, Flask, Tornado |
| Java     | Spring    |
| Go       | Beego, Chi, Echo, Fiber, Gin, Gorilla Mux, fasthttp, go-zero |
| C#       | ASP.NET Core MVC |
| Node.js  | Express, Fastify |

소스 코드 엔드포인트를 필터링하려면 {{< ui >}}Source Code{{< /ui >}}를 {{< ui >}}Data Source{{< /ui >}} 패싯 또는 `datasource:source_code` 쿼리에서 사용합니다. 스캔은 코드가 기본 브랜치로 푸시되는 시점에, 그리고 8시간 주기 일정에 따라 실행됩니다. 발견된 엔드포인트는 후속 스캔에서 다시 발견되지 않으면 12시간 후에 삭제됩니다.

#### 소스 코드 엔드포인트를 서비스에 매핑 {#map-source-code-endpoints-to-services}

정적 엔드포인트 검색은 휴리스틱을 사용하여 엔드포인트가 속한 서비스를 추론합니다. 보다 정확한 매핑을 위해 [카탈로그 서비스 정의(v3 스키마)][13]의 `codeLocations` 필드를 사용하여 서비스와 코드 간의 관계를 명시적으로 정의합니다.

```yaml
apiVersion: v3
kind: service
metadata:
  name: my-service
  owner: my-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
      paths:
        - path/to/service/code/**
```

`codeLocations`을 명시하지 않으면 엔드포인트가 다른 소스의 데이터와 올바르게 병합되지 않을 수 있습니다.

## 엔드포인트 스키마 조회 및 비교 {#view-and-compare-endpoint-schemas}

API Posture는 관찰된 트래픽을 바탕으로 각 엔드포인트에 적합한 OpenAPI 스키마를 구축합니다. 이 **추론된** 스키마는 프로덕션 환경에서 API가 노출하는 경로, 파라미터, 요청 및 응답 본문, 인증 정보를 설명합니다. 팀에서 **선언된** 스키마(Datadog Software Catalog에 등록된 OpenAPI 정의)를 게시하는 경우, 두 스키마를 비교하여 실행 중인 API가 문서와 어떤 부분이 달라졌는지 확인할 수 있습니다.

### 엔드포인트 스키마 조회 {#view-an-endpoints-schema}

[API 엔드포인트][1]에서 엔드포인트를 클릭하여 세부 정보 패널을 엽니다. **정의** 섹션에는 엔드포인트의 요청 파라미터, 요청 본문 및 응답이 표시됩니다. 민감한 데이터를 포함한 필드에는 관찰된 민감한 데이터의 유형이 표시됩니다.

{{< img src="/security/application_security/api/api_endpoint_definition_schema_cropped.png" alt="엔드포인트 세부 정보 패널의 정의 섹션에는 요청 파라미터와 Raw Schema 조회 및 Inferred Schemas 조회 버튼이 나타납니다." style="width:100%;" >}}

엔드포인트가 Datadog Software Catalog 내 API와 연결된 경우 **정의** 섹션에 선언된 OpenAPI 사양이 표시됩니다. 그렇지 않은 경우 실시간 트래픽을 바탕으로 추론된 스키마가 표시됩니다.

**정의** 섹션에서 다음을 수행할 수 있습니다.

- {{< ui >}}View Raw Schema{{< /ui >}}: 표시된 스키마를 원시 YAML로 조회합니다.
- {{< ui >}}View Inferred Schemas{{< /ui >}}: 실시간 트래픽을 바탕으로 추론된 스키마를 미리 보기 또는 YAML로 조회합니다(선언된 스키마를 사용할 수 있는 경우에도 해당함). 추론된 스키마는 YAML 또는 JSON 형식의 OpenAPI 파일 형식으로 내보낼 수 있습니다.

노이즈를 줄이기 위해 추론된 스키마에는 3회 이상 관찰된 필드만 포함되며, 7일 이내에 다시 관찰되지 않은 필드는 삭제됩니다. 이렇게 하면 하나의 잘못된 요청이나 예상치 못한 필드로 엔드포인트를 탐색하는 공격자 등의 일회성 트래픽이 추론된 스키마를 오염시키는 것을 방지할 수 있습니다. 그렇지 않으면 선언된 스키마와 비교할 때 드리프트로 나타날 수 있습니다.

### 선언된 스키마와 추론된 스키마 비교 {#compare-declared-and-inferred-schemas}

추론된 스키마와 선언된 스키마를 비교하려면 다음을 수행해야 합니다.

- 실시간 트래픽에서 엔드포인트를 검색할 수 있도록 서비스에서 [App and API Protection 활성화][9]를 수행합니다.
- 선언된 스키마의 OpenAPI 정의를 Datadog Software Catalog에 등록합니다. [엔터티 생성][8]을 참조하세요.

스키마 차이점은 엔드포인트의 스키마 조회 페이지에 직접 나타나며 심각도에 따라 강조 표시됩니다.

| 심각도 | 의미 |
|----------|---------|
| 중단 | 특정 필드가 필수 필드로 바뀌거나 파라미터 유형이 변경되는 등의 변경 사항이 발생하면, 선언된 계약에 의존하는 클라이언트가 중단될 가능성이 있습니다. |
| 경고 | 트래픽에서 선언되지 않은 필드가 관찰되거나 파라미터가 선택 사항으로 변경되는 등의 변경 사항은 검토할 가치가 있는 드리프트입니다. |
| 정보 | 선언되었으나 관찰된 트래픽이 없는 엔드포인트와 같은 차이점은 위험도가 낮습니다. |

다음과 같은 스키마 영역에서 차이점이 나타날 수 있습니다.

- **파라미터**: 파라미터가 추가, 제거되거나 선택 사항에서 필수 사항(또는 그 반대로)으로 변경됩니다.
- **요청 본문**: 요청 본문이 추가, 제거되거나 선택 사항에서 필수 사항(또는 그 반대로)으로 변경됩니다.
- **스키마 속성**: 속성이 추가, 제거, 선택 사항에서 필수 사항(또는 그 반대로)으로 변경되거나 유형, 형식, null 허용 여부, enum 값이 변경됩니다.
- **값 제약 조건**: 숫자 또는 길이 제한(`minimum`, `maximum`, `minLength`, `maxLength`), 패턴 또는 고유성 제약 조건이 변경됩니다.
- **스키마 구성**: `oneOf` 또는 `allOf` 구성이나 판별자에서 불일치가 발생합니다.
- **응답**: 상태 코드, 응답 헤더, 콘텐츠 유형이 추가되거나 제거됩니다.

노이즈를 줄이기 위해 유의미한 계약 드리프트를 나타내지 않는 일부 차이점은 제외합니다.

- **요청 헤더 및 쿠키 파라미터:** 이 파라미터는 API 계약의 일부가 아닌 인증 토큰이나 세션 식별자와 같은 값을 전달하는 경우가 많습니다.
- **쿼리 파라미터의 유형 변경:** 쿼리 파라미터는 다른 유형(예: 정수, 부울)으로 선언된 경우에도 트래픽에서 항상 문자열로 관찰됩니다.
- **상태 코드 제거:** 추론된 스키마는 트래픽에서 관찰된 상태 코드만 포함하므로, 관찰 중에 아직 발생하지 않은 선언된 상태 코드는 항상 제거된 것으로 나타납니다.
- **`anyOf` 구성 불일치:** 선언된 스키마와 추론된 스키마는 동등성을 유지하면서 각각 다른 스키마 수준에서 `anyOf`를 사용할 수 있습니다.

## 민감한 데이터 처리 {#processing-sensitive-data}

App and API Protection은 엔드포인트에서 처리하는 민감한 데이터를 감지 및 분류하고, 각 엔드포인트에 발견된 데이터의 범주와 유형을 태그로 지정합니다. 민감한 데이터를 처리하는 엔드포인트를 확인하고, 사용자 지정 API 데이터 스캐너를 생성하려면 [민감한 데이터][16]를 참조하세요.

## 비즈니스 로직 {#business-logic}

이러한 태그(`users.login.success`, `users.login.failure` 등)는 엔드포인트와 관련된 비즈니스 로직 트레이스의 존재 여부에 따라 결정됩니다.

<div class="alert alert-tip">Datadog은 HTTP 메서드, 응답 상태 코드, URL을 기반으로 엔드포인트에 대한 비즈니스 로직 태그를 제안할 수 있습니다.</div>

## 공개적으로 접근 가능 {#publicly-accessible}

클라이언트 IP 주소가 다음 범위에서 벗어난 경우 Datadog은 엔드포인트를 '공개'로 표시합니다.

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
- 169.254.1.0/16

필수 라이브러리 구성에 대한 자세한 내용은 [클라이언트 IP 헤더 구성][14]을 참조하세요.

## 엔드포인트 인증 {#endpoint-authentication}

인증을 결정하는 요인은 다음과 같습니다.

- `Authorization`, `Token` 또는 `X-Api-Key` 헤더의 존재
- 트레이스 내 사용자 ID의 존재(예: `@usr.id` APM 속성)
- 엔드포인트에서 반환된 401 또는 403 상태 코드
- 사용자가 구성한 사용자 지정 [엔드포인트 태그 지정][15] 규칙


인증 유형을 확인할 수 있는 경우, Datadog은 {{< ui >}}Authentication Method{{< /ui >}} 패싯을 통해 헤더에 이를 보고합니다.

### 지원되는 인증 방식 {#supported-authentication-methods}

| 범주| 범주 패싯|
|---------------------------------------------------|------------------|
| JSON 웹 토큰(JWT)                              | `json_web_token` |
| Bearer 토큰(`Authorization` 헤더에서 발견됨)  | `bearer_token`   |
| 기본 인증                              | `basic_auth`     |
| 다이제스트 액세스 인증                      | `digest_auth`    |

### 사용자 지정 인증 지원 {#custom-authentication-support}

[엔드포인트 태그 지정 규칙][15]을 구성하여 사용자 지정 인증을 감지할 수 있습니다. 해당 규칙을 구성하려면 다음과 같은 최소 트레이서 버전이 필요합니다.

|기술| 최소 트레이서 버전 |
|----------|------------------------|
|Java      | v1.55.0                |
|.NET      | 출시 예정            |
|Node.js   | v5.76.0                |
|Python    | v3.17.0                |
|Ruby      | v2.23.0                |
|PHP       | v1.15.0                |
|Golang    | v2.4.0                 |

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /ko/security/code_security/iast/
[3]: /ko/security/code_security/software_composition_analysis/
[4]: /ko/security/application_security/
[5]: /ko/integrations/amazon-web-services
[6]: /ko/integrations/amazon-api-gateway
[7]: /ko/internal_developer_portal/catalog/entity_model/native_entities/?tab=api#native-entity-types
[8]: /ko/internal_developer_portal/catalog/set_up/create_entities/#through-the-datadog-ui
[9]: /ko/security/application_security/setup/
[10]: /ko/tracing/guide/remote_config/
[11]: /ko/security/application_security/api_posture/endpoint_scanning/
[12]: /ko/integrations/guide/source-code-integration/
[13]: /ko/internal_developer_portal/catalog/entity_model/
[14]: /ko/security/application_security/policies/library_configuration/#configuring-a-client-ip-header
[15]: https://app.datadoghq.com/security/configuration/asm/trace-tagging
[16]: /ko/security/application_security/api_posture/sensitive_data/