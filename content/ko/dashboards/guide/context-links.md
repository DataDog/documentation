---
further_reading:
- link: /dashboards/widgets
  tag: 설명서
  text: 대시보드 위젯 목록
title: 컨텍스트 링크
---

## 개요

대시보드는 여러 소스에서 데이터를 수집하고 이 데이터를 시각화로 표시합니다. 

대시보드를 연결해 [알림을 모니터링][1]하거나 대시보드를 스크린보드로 사용해 핵심 기술이나 비즈니스 지표를 관찰할 수 있습니다. 또 [런북][2]에서 참조로 사용해 추가 컨텍스트를 제공할 수도 있습니다. 대시보드로 플랫폼의 현재 상태와 상호 작용의 스냅샷을 보고 문제를 선점해서 보고 전용 페이지에서 더 심도 있게 분석할 수 있습니다.

다음 비디오에서 웹 애플리케이션에서 개요 대시보드 보는 방법을 확인할 수 있습니다. 사용자는 기술 메트릭 급증을 식별하고, 상세 정보를 확대해서 보고, 기본 호스트 대시보드에 액세스해 잠정 근본 원인을 확인할 수 있습니다.

{{< img src="dashboards/guide/context_links/overview.mp4" alt="대시보드 메트릭 그래프의 트러블슈팅 워크플로우, 문제의 근본 원인을 찾기 위해 컨텍스트 사용" video="true" style="width:80%;" >}}

이 가이드에서는 대시보드의 **컨텍스트 링크**를 소개하고 다음의 내용을 다룹니다.

1. [컨텍스트 링크의 작동 방식 및 정확한 요구 사항에 맞게 조정하는 방법](#introduction-to-context-links).
2. [컨텍스트 링크 설정의 사용 사례 예](#example-use-cases).

## 컨텍스트 링크 소개

컨텍스트 링크는 대시보드 위젯을 Datadog의 다른 페이지 및 워크플로에 통합된 타사 애플리케이션과 연결합니다.

대시보드에 대한 [편집 권한][3]이 있는 사용자는 링크 목록에서 액세스할 수 있는 링크를 설정할 수 있습니다.

### 기본 컨텍스트 링크

 {{< img src="dashboards/guide/context_links/default-links.png" alt="기본 링크" style="width:75%;" >}}

기본적으로 위젯 메뉴에는 호스트에 대한 링크, [트레이스][4] 및 [로그][5]가 위젯의 데이터 소스에 해당하는 링크와 함께 표시됩니다. 예를 들어, 위젯이 [RUM 데이터][7]를 사용하는 경우 메뉴에 [**RUM Explorer**][6] 링크가 표시됩니다. **More Related Data Actions**을 클릭하면 드롭다운 메뉴에서 추가 링크를 볼 수 있습니다. 

위젯에는 다음 페이지 링크가 포함되어 있습니다.  

| 링크           | 설명                                                                           |
|----------------|---------------------------------------------------------------------------------------|
| 호스트          | 시리즈가 둘 이상의 호스트로 구성된 경우 [호스트 맵][8]에 연결됩니다. 시리즈가 하나의 호스트로 구성된 경우 [호스트 대시보드][9]로 연결됩니다.|
| 컨테이너     | [라이브 컨테이너][10] 페이지로 연결됩니다.                                                |
| 프로세스    | [라이브 프로세스][11] 페이지로 연결됩니다.                                                 |
| APM 트레이스     | [Trace Explorer][12]에 연결되는 기본 트레이스를 표시하는 측면 패널을 엽니다.|
| RUM 이벤트     | [RUM Explorer][13] 링크입니다.                                                      |
| 프로필       | APM [Profile Explorer][14]에 연결합니다.                                              |
| 로그           | [Log Explorer][15]에 연결되는 기본 로그를 표시하는 측면 패널을 엽니다.    |

해당되는 경우 컨텍스트 링크에 다음이 포함됩니다.

* 위젯 필터를 템플릿 변수(있는 경우)와 결합하고, 그룹별 쿼리의 경우에는 사용자가 클릭하는 하나의 시리즈를 결합하는 **필터**
* **시간 범위**. 시계열 및 히트맵 위젯의 경우 시간 범위는 데이터 포인트의 시간 버킷에 해당합니다. 다른 위젯의 경우 시간 범위는 전체 위젯 시간 범위가 됩니다.


### 컨텍스트 링크 맞춤 설정

[일반 위젯][16]의 경우 편집 모드로 들어가 **Context Links** 섹션으로 이동할 수 있습니다. 여기서 고유한 컨텍스트 링크를 만들고, 기본 링크를 재정의하고, 링크를 올리거나 숨길 수 있습니다.

{{< img src="dashboards/guide/context_links/edit-links.png" alt="링크 편집" style="width:75%;" >}}

커스텀 링크를 정의하거나 기본 링크를 재정의하려면 **Label** 필드에 링크 이름을 지정하고 **URL** 필드에 링크 경로를 지정합니다. **+ Add URL Parameter**를 클릭하여 키-값 도우미를 사용합니다.


#### 컨텍스트 링크 변수

{{< img src="dashboards/guide/context_links/custom-link.png" alt="URL에서 URL 파라미터의 키-값 쌍 설정" style="width:75%;" >}}

컨텍스트 링크에 사용 가능한 변수 유형은 다음과 같습니다.

* **시간 범위 변수** `{{timestamp_start}}` 및 `{{timestamp_end}}`. 이들 변수는 위젯의 시간 범위에 해당합니다. 
* **쿼리 변수**(위 예시의 `{{@MerchantTier}}` 및 `{{@MerchantTier.value}}`). 이들 변수는 그룹 쿼리가 있는 위젯용이며, 사용자가 클릭하는 특정 그룹을 식별합니다.
* **대시보드 템플릿 변수**(위 예시의 `{{$env}}` 및 `{{$env.value}}`). 이들 변수는 사용자가 클릭할 때 템플릿 변수에 사용 중인 현재 값을 식별합니다.
* **`{{tags}}`**, 위 모든 변수의 기본 조합.

`{{something}}`과 `{{something.value}}` 중에서 선택해야 하는 경우:

* `{{something}}`은(는) 키를 접두사로 하는 값을 반환합니다. 예를 들면, `env:prod` 등이 있습니다.
* `{{something.value}}`은(는) 원시 값을 반환합니다. 예를 들면, `prod` 등이 있습니다.
* [여러 변수를 구성할 때의 사용 사례 예시](#configure-multiple-variables)를 참고하세요.


이 예시에서 **View in Acme**를 클릭하면 링크가 `https://prod.acme.io/search?what=basic&when=1643021787564`(으)로 연결됩니다.

{{< img src="dashboards/guide/context_links/view-in-acme.png" alt="Acme에 대한 예시 컨텍스트 링크" style="width:60%;" >}}

컨텍스트 링크:

* `{{env.value}}`을(를) `prod`(으)로 바꿉니다.
* `{{@MerchantTier.value}}`을(를) `basic`(으)로 바꿉니다.
* 그리고 `{{timestamp_end}}`을(를) `1643021787564`(으)로 바꿉니다.


#### 복사-붙여넣기를 이용한 부트스트랩 컨텍스트 링크

{{< img src="dashboards/guide/context_links/override-link.mp4" alt="부트스트랩 설정에 링크 복사-붙여넣기" video="true" style="width:75%;" >}}

다양한 파라미터를 인코딩하는 복잡한 컨텍스트 링크의 경우 **URL** 필드에 전체 URL을 복사 및 붙여넣어 설정을 부트스트랩한 뒤 여기서 변수를 재작업하는 것이 더 편리할 수 있습니다.


#### URL 인코딩

{{< img src="dashboards/guide/context_links/url-encoding.png" alt="URL 및 키-값 파라미터 스크린샷" style="width:75%;" >}}

Datadog은 컨텍스트 링크에서 URL 인코딩을 처리합니다.

위 예시는 `status:error source:nginx {{@shopist.webstore.merchant.tier}}` 쿼리 매개변수가 있는 링크를 표시합니다. 여기서 `{{@shopist.webstore.merchant.tier}}`은(는) `@shopist.webstore.merchant.tier:basic`(으)로 해석됩니다. 그러면 전체 쿼리 파라미터가 `&query=status%3Aerror%20source%3Anginx%20%40shopist.webstore.merchant.tier%3Abasic`(으)로 변환됩니다.


## 사용 사례

이 섹션에는 컨텍스트 링크를 활용하여 대시보드를 워크플로에 통합하는 방법을 보여주는 예시가 포함되어 있습니다.

### 고객 지원 솔루션에 대한 대시보드 링크 

다음 예시에서는 대시보드 사용자에서 해당 Zendesk 사용자 페이지로 연결되는 링크를 만드는 방법을 설명합니다.

#### 컨텍스트

Datadog을 사용하여 판매자 웹사이트를 모니터링합니다. 고객 지원 팀은 [프론트엔드][17] 및 [보안][18] 팀이 설정한 대시보드를 사용하여 가장 관련성이 높은 고객 또는 문제가 있는 고객을 사전에 식별하고 잠재적으로 이들에게 연락할 수 있습니다.

이 문제 해결 워크플로를 가속화하기 위해 고객 지원 팀은 대시보드와 지원 솔루션(예: Zendesk)을 직접 연결하고자 합니다.

#### 접근

Datadog에서 플랫폼 전체에 걸쳐 로그인된 사용자를 추적하는 기본 ID는 사용자 이메일이며, 이는 일부 대시보드 위젯에 표시되는 패싯에 해당합니다.

{{< img src="dashboards/guide/context_links/zendesk_query.png" alt="Zendesk 쿼리" style="width:90%;">}}

사용자를 검색하기 위한 일반적인 Zendesk 링크는 `https://acme.zendesk.com/agent/search/1?type=user&q=email%3Ashane%40doe.com`이며, 여기서 사용자의 이메일은 검색 파라미터가 됩니다.

URL에 변수를 추가하면 템플릿 링크가 `https://acme.zendesk.com/agent/search/1?type=user&q=email:{{@usr.email.value}}`이(가) 됩니다.

{{< img src="dashboards/guide/context_links/zendesk_link.png" alt="Zendesk 사용자 페이지 컨텍스트 링크" style="width:80%;">}}

#### 결과

고객 지원 팀의 대시보드 위젯에는 적절한 컨텍스트가 있는 고객 지원 플랫폼으로 연결되는 컨텍스트 링크가 포함되어 있습니다.

{{< img src="dashboards/guide/context_links/zendesk_interaction.png" alt="Zendesk 사용자 페이지 컨텍스트 링크" style="width:80%;">}}

**Zendesk User Page** 링크를 클릭하면 Zendesk에 있는 이 사용자 페이지로 연결됩니다.

{{< img src="dashboards/guide/context_links/zendesk_result.png" alt="Zendesk 결과" style="width:80%;">}}

### AWS 콘솔에 대한 대시보드 링크

다음 예시에서는 대시보드 위젯의 호스트에서 AWS 콘솔의 해당 Amazon EC2 인스턴스 페이지로 연결되는 링크를 생성하는 방법을 설명합니다.

#### 컨텍스트

플랫폼이 [Amazon EC2][19] 인스턴스에서 호스팅되며, 플랫폼을 확장 및 축소하는 절차는 대부분 수동으로 이뤄집니다.

Datadog의 인프라에 대한 주요 상태 메트릭을 통합한 대시보드가 있습니다. 

이 작업 워크플로를 가속화하려면 이 대시보드와 [AWS Console][20] 사이에 직접 연결을 구현해야 합니다. 예를 들어, `t2.micro`에서 `t2.large`(으)로 업그레이드합니다.

#### 접근

일반적인 Amazon EC2 인스턴스 요약 링크는 `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId=i-04b737b9f8bf94a94`입니다. 여기서 읽을 수 있는 내용은 다음과 같습니다.

* `eu-west-3`: 하위 도메인 및 URL 파라미터로 표시되는 데이터 센터 리전입니다.
* `i-04b737b9f8bf94a94`: 해시 파라미터로 표시되는 호스트 ID입니다.

플랫폼이 한 리전에서만 실행되는 경우 호스트 ID를 컨텍스트 링크 템플릿에 넣으면 `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId={{host.value}}`와(과) 같이 됩니다.

플랫폼이 여러 리전에서 실행되는 경우 위젯 설정은 다음에 따라 달라집니다.

* 리전이 쿼리 집계의 일부인 경우(예: 아래 스크린샷) 템플릿 링크는 `https://{{region.value}}.console.aws.amazon.com/ec2/v2/home? region={{region.value}}#InstanceDetails:instanceId={{host.value}}`이(가) 됩니다. 여기서 `{{region.value}}`은(는) **쿼리** 변수입니다.

{{< img src="dashboards/guide/context_links/ec2_query.png" alt="Amazon EC2 쿼리" style="width:90%;" >}}

* 리전이 쿼리 집계의 일부인 경우(예: 아래 스크린샷) 템플릿 링크는 `https://{{$region.value}}.console.aws.amazon.com/ec2/v2/home입니다. ?region={{$region.value}}#InstanceDetails:instanceId={{host.value}}`이(가) 되며, 여기서 `{{region.value}}`은(는) **템플릿** 변수입니다. 

{{< img src="dashboards/guide/context_links/ec2_query2.png" alt="Amazon EC2 쿼리" style="width:90%;" >}}

#### 결과

대시보드 위젯에는 AWS 콘솔의 적절한 호스트로 연결되는 링크가 포함되어 있습니다.

{{< img src="dashboards/guide/context_links/ec2_interaction.png" alt="Amazon EC2 쿼리 컨텍스트 링크" style="width:90%;" >}}

**Amazon EC2 인스턴스 요약** 링크를 클릭하면 AWS 콘솔의 Amazon EC2 인스턴스 페이지로 바로 이동합니다.

{{< img src="dashboards/guide/context_links/ec2_result.png" alt="Amazon EC2 쿼리 결과" style="width:70%;" >}}

### Datadog의 저장된 보기 및 재매핑 속성에 대한 대시보드 링크

다음 예시에서는 대시보드 위젯의 RUM 이벤트에서 해당 로그로의 링크를 생성하는 방법을 설명합니다.

#### 컨텍스트

Datadog으로 기업 웹사이트를 모니터링합니다. [RUM][17]을 사용하여 사용자를 이해하고, [Logs][21]를 사용하여 더 기술적인 관점에서 [API 게이트웨이를 감독][22]할 수 있습니다.

프런트엔드 엔지니어는 일반적으로 높은 수준의 RUM 인사이트가 있는 대시보드를 사용합니다. API 게이트웨이 팀은 로그 탐색기에서 [Saved View][23]를 유지 관리합니다. 이는 프런트엔드 모니터링 팀이 관련된 정보를 모니터링하기 위해 참조하는 미세 조정 보기에 해당합니다. 

{{< img src="dashboards/guide/context_links/logs-saved-view_result.jpg" alt="로그가 저장된 보기 결과" style="width:90%;" >}}

이 트러블슈팅 워크플로를 가속화하기 위해 프런트엔드 모니터링 팀은 대시보드의 현재 컨텍스트로 저장된 보기에 액세스하려고 합니다.

#### 저장된 보기에 접근

[Saved Views][23]는 로그 탐색기에서 기본 쿼리, 시각화 및 설정 옵션을 정의합니다. 일반적인 저장된 보기 링크는 `https://app.datadoghq.com/logs?saved_view=305130`이며, 이는 내부적으로 로그 탐색기 URL을 인코딩합니다. 

저장된 보기에 있는 짧은 링크를 추가하여 결과적 로그 탐색기 URL의 파라미터를 재정의할 수 있습니다.

예를 들어, `https://app.datadoghq.com/logs?saved_view=305130&query=@source:nginx @network.client.ip:123.123.12.1`은(는) 마치 저장된 보기를 먼저 연 것처럼 [Log Explorer][15]로 이동합니다. 그렇지만 기본 쿼리 필터는 `@source:nginx @network.client.ip:123.123.12.1`(으)로 바뀝니다.

#### 재매핑 속성에 대한 접근

웹사이트 탐색이 익명인 경우 IP 주소를 프록시로 사용하여 사용자를 식별할 수 있습니다.

RUM 이벤트의 `@session.ip` 속성을 로그의 `@network.client.ip` 속성으로 식별해야 할 수 있습니다. 두 속성은 일반적으로 의미가 다르기 때문에 이름이 다르지만, 이러한 인증 로그 컨텍스트에서는 둘 다 식별할 수 있습니다.

이렇게 하려면 `@network.client.ip` 기반 필터에 `@session.ip`을(를) 삽입하고 적절한 필터 `@network.client.ip:{{@session.ip.value}}`을(를) 구축합니다.

{{< img src="dashboards/guide/context_links/logs-saved-view_query.png" alt="저장된 보기의 검색 쿼리 예시" style="width:70%;">}}

세션 IP 및 특정 국가의 인사이트를 표시하는 RUM 대시보드 위젯의 경우에는 이 링크 설정을 따르세요.

{{< img src="dashboards/guide/context_links/logs-saved-view_link.png" alt="저장된 보기의 URL 설정 예시" style="width:70%;">}}

#### 결과

API 게이트웨이 팀이 수신 로그의 최신 업데이트를 설명하기 위해 저장된 보기를 업데이트할 경우 컨텍스트 링크는 최신 상태로 유지됩니다. 

IP 주소를 재매핑하면 RUM 이벤트를 해당 로그와 연결하는 컨텍스트 링크가 생성됩니다.

### 여러 변수 구성

다음 예에서는 내 컨텍스트 링크 쿼리의 여러 변수와 조건을 구성하는 방법을 설명합니다. 

#### 컨텍스트

특정 로그나 조건을 조사하기 위해 컨텍스트 링크를 추가합니다.
- 동일한 컨텍스트가 있는 여러 태그 값이 있습니다(예: `env:production OR env:prod`).
- 로그를 여러 조건이 있는 로그를 필터링하고자 합니다(예: `env:prod AND service:backend`).

#### 접근

트러블슈팅하고자 하는 템플릿 변수를 선택하면 컨텍스트 링크 구성에 따라 템플릿 변수가 쿼리에 삽입됩니다. **참고**: 구문과 괄호 엔클로저가 쿼리에 영향을 미칩니다.

예를 들어 `service:backend` AND(`env:production` OR `env:prod`)가 있는 컨텍스트 링크를 구성하고 싶으면 다음 구성을 사용하세요.

```
service:backend (env:{{$env.value}})
```

#### 결과

괄호는 `(env:{{$env.value}})`를 `(env:*)`로 변환하기 때문에 컨텍스트 링크 쿼리에 여러 변수를 입력할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/monitors/notify/
[2]: /ko/notebooks/
[3]: /ko/dashboards/configure/#permissions
[4]: https://app.datadoghq.com/apm/traces/
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/rum/explorer/
[7]: /ko/real_user_monitoring/data_collected/
[8]: /ko/infrastructure/hostmap/#overview
[9]: /ko/getting_started/dashboards/#explore-out-of-the-box-dashboards
[10]: /ko/infrastructure/livecontainers/
[11]: /ko/infrastructure/process/?tab=linuxwindows
[12]: /ko/tracing/trace_explorer/?tab=listview
[13]: /ko/real_user_monitoring/explorer/
[14]: /ko/profiler/profile_visualizations/
[15]: /ko/logs/explorer/
[16]: /ko/dashboards/widgets/
[17]: /ko/real_user_monitoring/
[18]: /ko/security/cloud_siem/
[19]: /ko/integrations/amazon_ec2/
[20]: https://aws.amazon.com/console/
[21]: /ko/logs/
[22]: /ko/integrations/#cat-log-collection
[23]: /ko/logs/explorer/saved_views/