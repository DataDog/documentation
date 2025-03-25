---
aliases:
- /ko/security/cloud_security_management/mute_issues
further_reading:
- link: security/default_rules
  tag: 설명서
  text: 기본 보안 탐지 규칙 살펴보기
products:
- icon: cloud-security-management
  name: CSM Misconfigurations
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: CSM 신원 위험
  url: /security/cloud_security_management/identity_risks/
title: Cloud Security Management의 음소거 이슈
---

{{< product-availability >}}

잘못된 구성, 이슈 또는 ID 위험이 비즈니스 사용 사례와 일치하지 않거나 이를 알려진 위험으로 간주하는 경우가 있습니다. 이를 무시하려면 영향을 받는 리소스에 대한 근본적인 구성 오류, 이슈 또는 ID 위험을 숨길 수 있습니다.

예를 들어 CSM Misconfigurations 규칙 ['Block Public Access' feature is enabled for S3 bucket][1]은 S3 버킷에 공개적으로 액세스할 수 있는지 여부를 평가합니다. 공개적으로 공유할 정적 자산이 포함된 S3 버킷이 있는 경우 S3 버킷의 잘못된 구성을 숨길 수 있습니다.

**참고**: 잘못된 구성을 음소거하면 상태 점수 계산에서 해당 내용이 제거됩니다.

{{< img src="security/csm/mute_issue.png" alt="Mute Issue 대화 상자에는 음소거 이유와 기간을 지정하는 필드가 포함됩니다" style="width:100%;">}}

1. 잘못된 구성, 이슈 또는 ID 위험 사이드 패널에서 하나 이상의 리소스를 선택합니다.
2. **Actions** > **Mute for...**를 선택합니다.
3. 음소거 이유를 선택합니다 (예: 수정 보류 중, 거짓 긍정, 허용되는 위험).
4. 필요시 추가 **Description**을 입력합니다.
5. 음소거 기간을 선택합니다.
6. **Mute**를 클릭합니다.

### 이슈 음소거 해제

음소거된 이슈는 지정된 기간이 만료되면 음소거가 자동으로 해제됩니다. 음소거 해제는 수동으로도 가능합니다.

1. 잘못된 구성, 이슈 또는 ID 위험 사이드 패널에서 음소거된 이슈가 있는 리소스를 선택합니다.
2. **Actions** > **Unmute**를 선택합니다.
3. 음소거 해제 이유를 선택합니다 (예: 보류 중인 수정 사항 없음, 사용자 실수, 더 이상 허용되는 위험 아님).
4. 필요시 **Description**을 입력합니다.
5. **Unmute**를 클릭합니다.

### 음소거된 이슈 감사

조직의 음소거된 이슈를 확인하려면:

- Security Inbox 및 Misconfigurations Issue Explorer에서 **Muted** 열을 기준으로 정렬합니다.
-  **Muted** 패싯을 사용하여 Security Inbox, Misconfigurations, Identity Risks Issue Explorer를 필터링합니다.

잘못된 구성에 대한 음소거 기록을 감사하려면:

1. 잘못 구성된 사이드 패널을 엽니다.
2. 음소거된 잘못된 구성이 있는 리소스를 선택합니다.
3. **Overview** 탭에서 **Resource evaluation over time** 타임라인을 사용하여 지정된 기간(최대 6개월) 동안 잘못된 구성이 음소거되거나 음소거 해제된 시기를 확인합니다.

{{< img src="security/csm/muted_finding_evaluation_over_time.png" alt="Resource evaluation over time 타임라인에는 음소거된 기간을 포함하여 잘못된 구성 기록이 표시됩니다." style="width:90%;">}}

4. 잘못된 구성의 시간순 기록을 보려면  **Timeline** 탭을 클릭합니다. 음소거 이유, 음소거 지속 시간, 음소거한 사람 등 추가 세부 정보를 보려면 음소거 또는 음소거 해제 작업 위로 마우스를 가져가세요.

{{< img src="security/csm/muted_finding_timeline.png" alt="Timeline 탭에는 잘못된 구성이 음소거된 시기에 대한 세부 정보를 포함하여 잘못된 구성에 대한 시간순 기록이 표시됩니다." style="width:90%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/default_rules/cis-aws-1.5.0-2.1.5/