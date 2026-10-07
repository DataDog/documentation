---
algolia:
  subcategory: Marketplace 통합
app_id: steadybit-steadybit
app_uuid: bd3cef52-d435-4149-a78f-3c88c09fdfb2
assets: {}
author:
  homepage: https://steadybit.com/
  name: Steadybit
  sales_email: office@steadybit.com
  support_email: support@steadybit.com
  vendor_id: steadybit
categories:
- marketplace
- incidents
- 테스트
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: steadybit_steadybit
integration_id: steadybit-steadybit
integration_title: Steadybit
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: steadybit_steadybit
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: steadybit-professional-plan-1-team
  short_description: Steadybit(Professional Plan)[https://steadybit.com/pricing?utm_campaign=datadogmarketplace&utm_source=datadog&utm_medium=marketplace].
    요금은 월당 한 팀 기준입니다.
  unit_price: 1250.0
public_title: Steadybit
short_description: 카오스 엔지니어링을 통해 시스템 안정성을 즉시 향상시키세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Incidents
  - Category::Testing
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 카오스 엔지니어링을 통해 시스템 안정성을 즉시 향상시키세요.
  media:
  - caption: 3분 안에 Steadybit 제품 살펴보기
    image_url: images/steadybit_product_demo.png
    media_type: 비디오
    vimeo_id: 832367690
  - caption: 직관적인 카오스 엔지니어링 실험 에디터를 활용하면 터뷸런스 상황을 쉽게 리플레이할 수 있습니다.
    image_url: images/steadybit_experiment_editor.png
    media_type: image
  - caption: 클릭 단 한 번으로 실험을 실행하여 시스템의 모든 정보를 한눈에 파악할 수 있습니다.
    image_url: images/steadybit_experiment_run_active.png
    media_type: image
  - caption: Datadog 모니터를 통합하여 문제가 발생할 때마다 알림을 받을 수 있는 이점을 누려보세요. Steadybit은 전부 자동
      롤백하여 사용자를 보호합니다.
    image_url: images/steadybit_experiment_run_ended.png
    media_type: image
  - caption: Steadybit은 조직 전체가 인지할 수 있도록 이벤트를 Datadog에 다시 보고합니다.
    image_url: images/steadybit_datadog_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Steadybit
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

[Steadybit][1]은 카오스 엔지니어링 플랫폼으로, 네트워크 레이턴시나 컨테이너 크래시와 같은 터뷸런스 상황을 제어된 방식으로 시뮬레이션하여 시스템 안정성을 개선하고, 조직이 더 나은 인시던트 관리를 할 수 있도록 안내합니다.

사용하기 쉬운 드래그 앤 드롭 사용자 인터페이스를 통해 과거 인시던트를 재빌드할 수 있습니다. 느린 네트워크, 부하가 걸린 리소스 또는 사용할 수 없는 DNS를 시스템에 시뮬레이션하여 시스템이 어떻게 반응하는지, 옵저버빌리티 솔루션이 해당 오류를 감지하는지 확인하세요.


[Steadybit DataDog 통합][2]으로 카오스 엔지니어링 실험을 실행하는 동안 Datadog 모니터 유효성을 검사하는 추가 상태 점검을 할 수 있습니다. 본 통합은 카오스 엔지니어링 실험 실행의 결과, 시작, 종료 시간을 Datadog 이벤트로 제공하여 해당 실행을 모니터링합니다.

본 Marketplace 혜택은 한 팀용 [Professional Plan][3] 라이선스에 적용됩니다. 다른 요구 사항이 있으시다면 [office@steadybit.com][4]로 연락하여 프라이빗 혜택에 대해 문의하세요.


## 지원

지원이나 기능 요청은 다음 채널을 통해 Steadybit에 문의하세요.

 - 이메일: [Steadybit 지원 팀][7].

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 Steadybit 제품으로 카오스 엔지니어링 실험 모니터하기][8]

[1]: https://steadybit.com/?utm_campaign=datadogmarketplace&utm_source=datadog&utm_medium=marketplace-readme
[2]: https://hub.steadybit.com/extension/com.steadybit.extension_datadog?utm_campaign=datadogmarketplace&utm_source=datadog&utm_medium=marketplace-readme
[3]: https://steadybit.com/pricing?utm_campaign=datadogmarketplace&utm_source=datadog&utm_medium=marketplace-readme
[4]: office@steadybit.com
[5]: https://signup.steadybit.io/?utm_campaign=datadogmarketplace&utm_source=datadog&utm_medium=marketplace-readme
[6]: https://hub.steadybit.com/extension/com.steadybit.extension_datadog?utm_campaign=datadogmarketplace&utm_source=datadog&utm_medium=marketplace-readme#content-installation
[7]: mailto:support@steadybit.com
[8]: https://www.datadoghq.com/blog/steadybit-datadog-marketplace/
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/steadybit-steadybit" target="_blank">Marketplace에서 구매하세요</a>.