---
categories:
- cloud
- compliance
- cost management
- security
dependencies: []
description: '고객님을 위한 CloudHealth 지원: Datadog 인스턴스별 메트릭을 제공해 드립니다.'
doc_link: https://docs.datadoghq.com/integrations/cloudhealth/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog/
  tag: 블로그
  text: 'CloudHealth + Datadog: 클라우드 자산을 효과적으로 관리하세요.'
git_integration_title: cloudhealth
has_logo: true
integration_id: cloudhealth
integration_title: Cloudhealth
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: cloudhealth
public_title: Datadog-Cloudhealth 통합
short_description: '고객님을 위한 CloudHealth 지원: Datadog 인스턴스별 메트릭을 제공해 드립니다.'
team: 웹-통합
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

CloudHealth와 Datadog을 모두 사용하는 경우, CloudHealth 계정을 설정해 Datadog에서 인스턴스별 리소스 사용량 메트릭 을 수집할 수 있습니다. 이렇게 하면 CloudHealth가 클라우드 리소스를 조정하도록 보다 정확한 권장 사항을 제공할 수 있습니다.

본 통합은 CloudHealth에서 Datadog로 **아무것도 전송하지** 않습니다. 단지 CloudHealth가 메트릭용 Datadog 계정을 폴링하도록 도와줍니다.

## 설정

### 설정

아직 CloudHealth로 클라우드를 최적화하지 않으셨다면, 먼저 [위험 부담 없는 14일 평가판][1]에 등록해 보세요. 기존 CloudHealth 고객의 경우, 다음의 간단한 4단계만 수행하면 CloudHealth에서 Datadog 통합을 설정해 클라우드 환경의 모든 차원에 대한 가시성을 개선할 수 있습니다.

1. CloudHealth 플랫폼에서 '설정 -> 계정 -> Datadog'으로 이동하여 오른쪽 상단의 '새 계정' 버튼을 클릭합니다.
   {{< img src="integrations/cloudhealth/cloudhealth_config_2.png" alt="CloudHealth 설정 2" popup="true">}}

2. 다음과 같이 통합하려는 Datadog 계정 정보로 양식을 작성합니다.

    - **이름** - 익숙한 이름을 사용하세요. 언제든지 업데이트할 수 있습니다.
    - **API 키** - 본 API 키는 조직의 고유값입니다.
    - **애플리케이션 키** - 애플리케이션 키는 조직의 API 키와 함께 Datadog API에 대한 접근 권한을 부여합니다. CloudHealth는 호스트 및 메트릭 정보 수집 목적으로만 Datadog을 쿼링하고, Datadog에는 아무것도 작성하지 않습니다.
    - **내보내기 태그** - Datadog 태그를 플랫폼으로 가져옵니다.

3. 허용 태그 - '태그 가져오기'가 활성화된 경우 태그를 활동적으로 수집합니다. 아울러, 특정 태그를 CloudHealth로 가져올 수 있는 추가 필드가 제공됩니다. CloudHealth 플랫폼 내에서 가져오기를 허용할 태그를 선택합니다.
   {{< img src="integrations/cloudhealth/cloudhealth_config_1.png" alt="CloudHealth 설정 1" popup="true">}}

## 수집한 데이터

### 메트릭

CloudHealth 통합은 메트릭을 포함하지 않습니다.

### 이벤트

CloudHealth 통합은 Catchpoint 이벤트를 Datadog 이벤트 스트림으로 푸시합니다.

### 서비스 점검

CloudHealth 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][2]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cloudhealthtech.com
[2]: https://docs.datadoghq.com/ko/help/