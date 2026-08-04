---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-splunk-to-datadog-migration
app_uuid: 47bde0bc-6e76-4307-afa3-9e382fffc211
assets: {}
author:
  contact_link: https://www.crestdata.ai/contact-us/
  homepage: https://www.crestdata.ai/
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: migrationapps@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_splunk_to_datadog_migration
integration_id: crest-data-systems-splunk-to-datadog-migration
integration_title: Splunk to Datadog Migration 앱
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: crest_data_systems_splunk_to_datadog_migration
pricing:
- includes_assets: true
  private_offer_only: true
  product_id: splunk-to-datadog-migration
  short_description: 몇 분만에 Splunk에서 Datadog로 마이그레이션하세요.
  unit_price: null
public_title: Splunk to Datadog Migration 앱
short_description: 자동화된 도구는 원활하고 신속한 Splunk에서 Datadog 마이그레이션을 보장합니다.
supported_os:
- linux
- macos
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Marketplace
  - Offering::Professional Service
  configuration: README.md#Setup
  description: 자동화된 도구는 원활하고 신속한 Splunk에서 Datadog 마이그레이션을 보장합니다.
  media:
  - caption: Migrated Dashboard
    image_url: images/All-combined.png
    media_type: 이미지
  - caption: Splunk to Datadog 구성
    image_url: images/SP-DD-Configuration.png
    media_type: 이미지
  - caption: Splunk to Datadog Datamodel-mapping
    image_url: images/SP-DD-Datamodel-mapping.png
    media_type: 이미지
  - caption: Splunk to Datadog 목록
    image_url: images/SP-DD-App-list.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Splunk to Datadog Migration 앱
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
**Splunk에서 Datadog로 마이그레이션 앱**은 Splunk 대시보드와 쿼리를 Datadog에 대응하는 대시보드와 쿼리로 자동으로 변환합니다. 메타데이터를 Datadog 전용 대시보드, 쿼리 및 모니터로 자동 변환하여 마이그레이션을 더욱 쉽고 빠르게 진행합니다.

- [여기에서 등록][1]

### 이점
- **자동화된 마이그레이션**: 예전에는 몇 주 또는 몇 달이 걸리던 작업을 이제 몇 분 만에 완료할 수 있어 귀중한 시간과 리소스를 절약할 수 있습니다.
- **원활한 전환**: 중단을 최소화하고 Splunk에서 Datadog로 원활하게 전환하여 중요한 모니터링 및 알림 워크플로를 유지합니다.
- **빠른 도입**: 최소한의 개입으로 Datadog의 강력한 모니터링 기능에 빠르게 통합하고 적응할 수 있습니다.

### 주요 기능
- **자동 변환:** 대시보드, 차트, 그래프 등 Splunk 관련 시각화 자료를 Datadog와 호환되는 형식으로 자동 변환합니다.
- **쿼리 변환:** Splunk 쿼리(예: SPL 쿼리)를 Datadog의 동등한 쿼리 언어로 변환하여 정확한 데이터 표현을 보장합니다.
- **심층 평가 보고서:** 얼마나 많은 쿼리와 패널을 자동으로 변환할 수 있는지 보여주는 자세한 평가 보고서를 제공하여 사용자가 마이그레이션을 진행하기 전에 범위와 효율성을 이해하는 데 도움이 됩니다. 
- **간편한 필드 매핑:** Splunk에서 Datadog로 필드 이름을 정렬하여 표준화와 일관성을 보장합니다.
- **성공 기반 청구:** 성공적으로 마이그레이션된 패널과 쿼리에만 요금이 적용되어 비용 효율성이 보장됩니다.

마이그레이션 앱은 앱 대시보드 및 패널 쿼리와 같은 메타데이터의 마이그레이션을 자동화합니다. 이 애플리케이션을 사용하기 전에 다양한 소스의 관련 데이터를 Datadog 플랫폼에 온보딩했는지 확인하세요. 원활한 시각화 전환을 위해서는 Datadog 계정에 Splunk와 유사한 데이터가 이미 저장되어 있어야 합니다.

**데이터 개인정보 보호 보장:** Crest Data는 Splunk 또는 Datadog 환경의 어떠한 데이터에도 접근할 수 없습니다. 당사는 고객이 연결한 메타데이터 정보만을 사용하여 운영됩니다. 당사 플랫폼은 사용자 환경의 실제 데이터와 상호 작용하거나 처리하지 않으므로 데이터 개인정보 보호 및 보안을 보장합니다.

현재 원격 옵션을 사용하면 대시보드 마이그레이션을 지원합니다. 오프라인 옵션을 사용하면 대시보드 마이그레이션에는 `.json` 파일을, 패널 쿼리나 검색 쿼리 등 모든 유형의 쿼리에는 `.csv` 파일을 지원합니다.

전체 기능 및 제한 사항은 사용자 가이드를 참조하세요. 마이그레이션 앱에 대한 문의 사항이 있거나 사용 사례가 지원되지 않는 경우 [migrationapps@crestdata.ai][3]로 문의해 주세요.

### 플랜 및 가격 책정 탭
Datadog로의 간편한 마이그레이션을 원하시면 지금 바로 Crest Data에 문의하세요!
플랫폼에 등록하여 마이그레이션 여정을 시작하세요.

## 지원
지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.
- **지원 이메일:** [migrationapps@crestdata.ai][3]
- **영업 이메일:** [datadog-sales@crestdata.ai][5]
- **웹사이트:** [https://www.crestdata.ai/][4]
- **사용자 가이드:** [Splunk to Datadog 사용자 가이드][2]


[1]: https://migration-app1.crestdata.ai:3000/auth/signup
[2]: https://s3.amazonaws.com/docs.crestdata.ai/datadog-migration-readme/Splunk-to-Datadog-Migration-Platform-User-Guide.pdf
[3]: mailto:migrationapps@crestdata.ai
[4]: https://www.crestdata.ai/
[5]: mailto:datadog-sales@crestdata.ai

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-splunk-to-datadog-migration" target="_blank">Marketplace에서 이 애플리케이션을 구매하세요</a>.