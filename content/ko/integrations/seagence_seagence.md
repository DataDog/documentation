---
algolia:
  subcategory: Marketplace 통합
app_id: seagence-seagence
app_uuid: 194f32bb-fc70-41e5-a742-bcacc3db13ed
assets: {}
author:
  homepage: https://www.seagence.com
  name: Seagence Technologies
  sales_email: sales@seagence.com
  support_email: support@seagence.com
  vendor_id: seagence
categories:
- alerting
- 자동화
- marketplace
- 개발 툴
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: seagence_seagence
integration_id: seagence-seagence
integration_title: seagence
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: seagence_seagence
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.seagence.seagence
  product_id: seagence
  short_description: 월 호스트당 Seagence 라이선스
  tag: 호스트
  unit_label: 호스트
  unit_price: 21
public_title: seagence
short_description: 디버깅 없이 실시간으로 결함을 감지하고 해결하는 도구.
supported_os:
- 모두
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Any
  - Category::Alerting
  - Category::Automation
  - Category::Marketplace
  - Category::Developer Tools
  - Offering::Software License
  configuration: README.md#Setup
  description: 디버깅 없이 실시간으로 결함을 감지하고 해결하는 도구.
  media:
  - caption: Seagence Defects Overview 대시보드
    image_url: images/datadog-dashboard.png
    media_type: image
  - caption: 트랜잭션 타임라인 뷰에서 결함 및 성공 트랜잭션 강조 표시하기
    image_url: images/timeline.png
    media_type: image
  - caption: 결함 및 성공 트랜잭션을 별도의 클러스터로 그룹화하는 Seagence의 클러스터링 기능
    image_url: images/defect-and-success-clusters.png
    media_type: image
  - caption: 트랜잭션 및 예외 목록
    image_url: images/list-of-transactions-and-exceptions.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: seagence
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

[Seagence][1]는 Java 애플리케이션용 프로덕션급 실시간 결함 탐지 및 해결 도구입니다. Seagence는 고유한 접근 방식을 활용하여 멀티스레딩 문제, 무시된 예외, 처리되거나 처리되지 않은 예외 등으로 발생하는 알려진/알려지지 않은 결함을 실시간으로 탐지하며, HTTP 200 성공 응답 코드 속에 숨겨진 결함도 감지합니다. 결함을 감지하면 [즉시 사용 가능한 통합][5]이 Datadog에 이벤트를 전송하여 팀에 알립니다. 기본 대시보드는 감지한 결함 및 근본 원인에 대한 가시성을 제공하여 디버깅 및 트러블슈팅 작업을 할 필요가 없습니다. 결함에 대한 자세한 내용은 [SeagenceWeb][2]에서 확인하세요.

Seagence는 처음부터 Kubernetes 배포, 마이크로서비스, 모노리스, 컨테이너, 서비스 애플리케이션과 같은 프로덕션 환경과 최신 아키텍처를 고려하여 설계되었습니다.

**실시간 결함 감지**: Seagence는 고유한 접근 방식을 활용하여 멀티스레딩 문제와 처리되거나 처리되지 않은 예외 및 무시된 예외를 포함한 발생 예외로 인한 결함을 실시간으로 감지합니다. Seagence의 유일한 전제 조건은 결함이 약 5회 발생해야 한다는 것입니다(**Seagence의 Think Time**). 해당 전제 조건이 충족되면, Seagence는 6번째 결함이 발생한 후부터 발생한 모든 결함을 실시간으로 감지합니다. Seagence는 최종 사용자가 결함을 보고하기 전에, 심지어 로그 파일에 **트레이스가 없더라도** 결함을 감지합니다.

**디버깅 및 트러블슈팅 작업 제거**: 디버깅과 트러블슈팅 작업을 할 필요가 없습니다. Seagence가 제공하는 결함 및 근본 원인을 파악하면 오류 코드를 수정하고 MTTR을 3일에서 반나절로 단축할 수 있습니다.

**코드 변경 불필요**: Seagence는 소형 Java 에이전트를 사용하므로 코드를 변경할 필요가 없습니다. Seagence는 처리된 예외, 처리되지 않은 예외, 무시된 예외를 포함한 모든 오류와 발생 예외를 기록합니다. 이렇게 하면 트랜잭션에 필요한 모든 컨텍스트를 확보할 수 있습니다.

**클러스터링**: 클러스터링으로 노이즈 분석을 중단할 수 있습니다. 클러스터링 기능은 유사한 트랜잭션을 그룹화합니다. 클러스터의 트랜잭션 1개를 분석하면 해당 클러스터의 트랜잭션 100만 개가 어떻게 처리되는지 즉시 알 수 있습니다.

## 지원

도움이 필요하신가요? [Seagence 지원 팀][4]에 문의하세요.

[1]: https://www.seagence.com
[2]: https://app.seagence.com/SeagenceWeb/
[3]: https://seagence.com/product/getting-started/
[4]: mailto:support@seagence.com
[5]: https://app.datadoghq.com/integrations/seagence

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/seagence-seagence" target="_blank">Marketplace에서 구매하세요</a>.