---
title: AWS 계정을 Cloudcraft에 연결
---

AWS 계정을 Cloudcraft에 연결하면, 실시간 환경의 서비스 관계를 역설계하여 시스템 아키텍처 다이어그램으로 시각화할 수 있습니다. 다이어그램을 자동으로 생성하는 것 외에도 예산 모델이 생성되고, 가져온 구성 요소의 라이브 상태 데이터가 다이어그램에 직접 표시됩니다. Cloudcraft에 연결할 수 있는 AWS 계정 수에는 제한이 없습니다.

**참고**: AWS 조직의 경우, 조직 내 각 계정에 Cloudcraft 역할을 수동으로 추가해야 합니다.

이 문서는 AWS 계정을 Cloudcraft에 연결하는 방법을 안내합니다.

<div class="alert alert-info">Datadog 사용자는 Datadog 계정을 Cloudcraft에 연결하여 이 과정을 건너뛸 수 있습니다. 자세한 내용은 <a href="https://docs.datadoghq.com/cloudcraft/getting-started/datadog-integration/" title="Datadog Integration">Datadog 통합</a>을 참고하세요.</div>

## 필수 조건

- [Owner 또는 Administrator 역할][1]을 가진 Cloudcraft 사용자.
- [Cloudcraft Pro를 구독][2] 중.
- AWS 계정에 IAM 역할 생성 권한이 있습니다.

## 라이브 AWS 동기화 작동 방식

Cloudcraft는 [AWS 환경에 안전하게 액세스하기 위해 교차 계정 역할][3]을 사용합니다. 따라서 AWS 계정에 Cloudcraft용 읽기 전용 역할을 생성해야 합니다. 이 역할은 언제든지 취소할 수 있습니다.

모든 구성 요소에 액세스할 수 있는 읽기 전용 역할이 허용되지 않거나 회사 정책을 위반하는 경우 [더 엄격한 최소 액세스 정책 첨부][4] 옵션을 사용할 수도 있습니다. 이렇게 하면 Cloudcraft에서 사용하려는 리소스에 대한 읽기 전용 액세스만 제공하여 역할이 액세스할 수 있는 데이터 양을 더욱 최소화할 수 있습니다.

Cloudcraft는 AWS 환경의 라이브 데이터를 보관하지 않습니다. 대신 AWS 리소스의 고유 식별자인 ARN을 저장합니다. 이를 통해 애플리케이션은 라이브 데이터와 구성 요소를 런타임에 연결할 수 있습니다.

AWS 환경의 데이터는 역할 기반 접근(Role-Based Access)을 통해 Cloudcraft 자체 AWS 환경을 거쳐 브라우저로 실시간 스트리밍되며, 애플리케이션을 사용하는 동안에만 클라이언트 측에 저장됩니다. 애플리케이션을 종료하면 라이브 데이터는 삭제됩니다.

계정에 대한 쓰기 권한이 없으면 Cloudcraft에서 일부 기능(예: 다이어그램과 계정 양쪽에서 C2 인스턴스를 삭제하는 기능)을 제공하지 못하지만, 이는 더 안전한 접근 방식입니다.

Cloudcraft는 SOC2 컴플라이언스 프로그램을 위해 엄격한 보안 프로세스와 통제를 시행합니다. Cloudcraft의 보안 프로그램 및 통제에 대한 자세한 내용은 [보안 페이지][5]에서 확인하세요.

## AWS 계정 관리

### 계정 추가

1. Cloudcraft에서 **User** > **AWS accounts**로 이동합니다.
2. 모달 하단에서 **Add AWS Account**를 클릭합니다.
3. 다음 페이지에서는 단계별 지침을 제공합니다. **Open the AWS IAM Console to the Create Role page**를 클릭하여 AWS에서 읽기 전용 IAM 역할을 구성하세요.

<div class="alert alert-info"><strong>Create Role</strong> 페이지에 액세스할 수 없다면 <strong>AdministrativeAccess</strong> 권한이 없거나 새 IAM 역할을 생성할 수 있는 충분한 IAM 권한이 없는 것일 수 있습니다. AWS 계정 관리자에게 문의하여 다음 단계를 완료하도록 요청하세요.</div>

4. AWS의 **Create role** 페이지에서 **Require MFA**를 선택하지 않은 상태로 두고 **Next**를 클릭합니다.

<div class="alert alert-info"><strong>Require MFA</strong>는 사람이 개입하지 않는 시스템 간 접근에는 적용되지 않으므로 비활성화해야 합니다. 대신 Cloucraft AWS 계정으로만 접근이 제한되어 보호됩니다.</div>

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/create-iam-role.png" alt="역할 구성 시 신뢰할 수 있는 엔터티 선택 옵션을 보여주는 AWS Identity and Access Management 콘솔 화면." responsive="true" style="width:100%;">}}

5. 다음으로, 역할에 권한 정책을 추가합니다. 검색창에 **ReadOnlyAccess**를 입력하고 **Enter** 키를 눌러 이름으로 정책을 필터링합니다.
6. AWS 서비스와 리소스에 대한 읽기 전용 액세스를 제공하는 **ReadOnlyAccess** 정책을 선택한 후 **Next**를 클릭합니다.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/read-only-role.png" alt="'ReadOnlyAccess' 정책이 강조 표시되어 선택된 AWS 관리 콘솔 페이지." responsive="true" style="width:100%;">}}

7. IAM 역할의 이름과 설명을 입력합니다. 태그를 추가하여 역할에 대한 액세스를 구성, 추적, 제어할 수도 있습니다. 역할에 태그를 지정하는 것은 선택 사항입니다. 태그 지정 모범 사례는 [AWS 리소스 태그 지정 모범 사례][6]를 참고하세요.
8. **Create role**을 클릭합니다.
9. 역할 목록에서 `cloudcraft` 역할을 선택하고 **Summary** 페이지에서 **Role ARN**을 복사합니다.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/role-summary.png" alt="Cloudcraft 통합용 Role ARN을 보여주는 AWS IAM 역할 구성 화면." responsive="true" style="width:100%;">}}

10. Cloudcraft에서 **Role ARN** 필드에 ARN을 붙여넣고 계정 이름을 입력합니다.
11. 필요시 **Team access** 아래의 파란색 버튼을 클릭하고 AWS 계정 액세스 권한을 공유할 팀을 선택하여 팀 액세스를 구성합니다.

{{< img src="cloudcraft/getting-started/connect-aws-account-with-cloudcraft/team-access.png" alt="Cloudcraft, Team Demo, Cloudcraft Sales + Support 팀 태그가 포함된 Team 액세스 옵션을 보여주는 Cloudcraft 인터페이스." responsive="true" style="width:100%;">}}

12. **계정 저장**을 클릭합니다.

### 계정 수정

계정을 수정하려면 수정하려는 계정의 왼쪽에 있는 회색 연필 아이콘을 클릭합니다. 이름, ARN, 팀 액세스 권한과 같은 계정 세부 정보를 변경할 수 있습니다.

완료했으면 **계정 저장**을 클릭합니다.

### 계정 삭제

계정을 삭제하려면 삭제하려는 계정 오른쪽의 휴지통 아이콘을 클릭한 다음 **삭제**를 클릭합니다.

[1]: /ko/cloudcraft/account-management/roles-and-permissions/
[2]: https://www.cloudcraft.co/pricing
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[4]: /ko/cloudcraft/advanced/minimal-iam-policy/
[5]: https://www.cloudcraft.co/security
[6]: https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/tagging-best-practices.html