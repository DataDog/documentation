---
title: Datadog 통합
---

## 개요

Datadog과 Cloudcraft를 통합하여 사용자가 클라우드 인프라를 모니터링하고 시각화하는 워크플로를 간소화할 수 있습니다.

Datadog의 강력한 모니터링 플랫폼을 활용하면 사용자는 Datadog 계정으로 Cloudcraft에 로그인하고, Cloudcraft의 모든 리소스에서 Datadog의 관련 뷰로 원활하게 이동할 수 있으며, Datadog에 이미 구성된 클라우드 계정을 자동으로 가져와 Cloudcraft에서 사용할 수 있습니다.

## Datadog Single Sign-On (SSO)

Cloudcraft는 사용자가 Datadog 계정을 사용하여 가입하고 로그인할 수 있도록 지원합니다. 이 통합 기능은 Datadog 모니터링 데이터를 Cloudcraft 아키텍처 다이어그램과 연결하여 통합된 환경을 제공합니다.

### Datadog SSO로 가입하기

시작하려면 Cloudcraft 가입 과정에서 **Sign up with Datadog** 옵션을 선택합니다. 가입 후 Datadog 계정 정보를 사용하여 Cloudcraft에 로그인할 수 있습니다. 이렇게 하면 로그인 절차가 간소화되고 두 플랫폼 간의 통합이 가능해집니다.

Datadog SSO를 사용하면 다음에 자동으로 액세스할 수 있습니다.

- **크로스 플랫폼 기능**: Cloudcraft와 Datadog 사이를 손쉽게 오가며 클라우드 인프라와 성능을 분석할 수 있습니다.
- **자동화된 클라우드 계정 통합**: Datadog에 구성된 클라우드 계정은 Cloudcraft에 자동으로 추가되어 두 플랫폼 모두에서 인프라를 전체적으로 볼 수 있습니다.

### 기존 계정에 Datadog SSO 활성화

원래 다른 로그인 방식(예: Google SSO 또는 표준 사용자 이름 및 비밀번호)으로 가입한 경우, Datadog 통합 기능의 전체 세트를 이용할 수 없습니다. Datadog SSO로 전환하려면 [Cloudcraft 지원팀에 문의][1]하세요.

## 클라우드 계정 통합

<div class="alert alert-info">이 기능은 Amazon Web Services(AWS) 계정만 지원합니다. Azure 또는 다른 클라우드 제공업체와의 동기화는 현재 제공되지 않습니다.</div>

Cloudcraft와 Datadog의 통합으로 클라우드 계정 관리가 간소화되어 Datadog에 이미 구성된 계정이 Cloudcraft에 자동으로 추가됩니다. Cloudcraft에서는 추가 설정이 필요하지 않습니다.

기본적으로 이러한 계정은 Cloudcraft 팀의 모든 구성원과 공유되므로 누구나 쉽게 액세스할 수 있습니다.

{{< img src="cloudcraft/getting-started/datadog-integration/manage-aws-accounts.png" alt="Datadog과 통합된 Cloudcraft에서 AWS 계정 인터페이스를 관리합니다." responsive="true" style="width:100%;">}}

Cloudcraft에서 리소스를 시각화하고 다이어그램으로 표현하려면 [Datadog에서 리소스 수집이 활성화되어 있는지 확인하세요][2]. 리소스 수집이 활성화되면 Datadog은 AWS 계정에 읽기 전용 API 호출을 수행하여 AWS 리소스에 대한 정보를 수집합니다. Cloudcraft는 이 정보를 사용하여 인프라를 시각화합니다. 이 기능이 없으면 AWS 계정은 Cloudcraft에 추가되지만 다이어그램으로 표현할 수 있는 리소스는 제공되지 않습니다.

Datadog에 AWS 계정이 추가되어 있지 않다면 먼저 추가해야 합니다. [AWS 통합 가이드][3]를 참고하세요.

### Cloudcraft에서 풀링된 AWS 계정 관리

Datadog에서 가져온 AWS 계정은 Cloudcraft의 **Live** 탭 아래 계정 선택기에서 Bits 아이콘으로 표시됩니다.

{{< img src="cloudcraft/getting-started/datadog-integration/bits-icon.png" alt="Cloudcraft와 Datadog 통합에서 관리되는 AWS 계정을 표시하는 클라우드 계정 선택기." responsive="true" style="width:100%;">}}

여러 계정 중 일부 계정에만 집중해야 하는 경우, **Live** 탭의 계정 선택기에서 표시 설정을 통해 특정 계정을 숨길 수 있습니다.

이러한 계정의 표시 설정을 관리하는 방법:

1. **User > AWS Accounts**로 이동합니다.
2. **Edit** 아이콘(계정 이름 옆에 있는 연필 아이콘)을 선택합니다.
3. **Visibility on Live** 탭 토글을 전환하여 계정 표시 여부를 제어합니다.

계정 이름을 관리하는 방법:

1. **User > AWS Accounts**로 이동합니다.
2. **Edit** 아이콘(계정 이름 옆에 있는 연필 아이콘)을 선택합니다.
3. **Name** 필드에서 계정 이름을 업데이트합니다.

<div class="alert alert-info">이름이나 표시 설정을 변경해도 Datadog 계정에는 영향을 미치지 않습니다.</div>

### 성능상의 이점

Datadog에서 가져온 AWS 계정은 Cloudcraft에서 직접 추가한 계정보다 다이어그램 생성 성능이 향상됩니다. 이는 Cloudcraft가 AWS API 대신 이미 Datadog에서 수집된 데이터를 사용하기 때문입니다.

## Bits 메뉴

Cloudcraft의 Bits 메뉴는 아키텍처 다이어그램의 모든 리소스에서 관련 Datadog 인사이트에 액세스할 수 있는 게이트웨이입니다. 로그를 확인하든, APM 트레이스를 보든, 메트릭을 분석하든, Bits 메뉴를 통해 한 번의 클릭만으로 Cloudcraft에서 Datadog으로의 상황에 적합한 탐색이 가능합니다.

Bits 메뉴에 대한 자세한 사용 방법은 [Bits 메뉴 문서][4]를 참고하세요.

[1]: https://app.cloudcraft.co/app/support
[2]: /ko/integrations/amazon_web_services/#resource-collection
[3]: /ko/integrations/amazon_web_services/
[4]: /ko/cloudcraft/getting-started/using-bits-menu/