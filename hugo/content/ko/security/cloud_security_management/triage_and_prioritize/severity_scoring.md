---
aliases:
- /ko/security/cloud_security_management/severity_scoring/
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: 설명서
  text: Cloud Security Misconfigurations를 사용하여 잘못된 구성 추적 시작
- link: /security/cloud_security_management/identity_risks/
  tag: 설명서
  text: Cloud Security Identity Risks를 사용하여 ID 환경 파악
- link: /security/cloud_security_management/vulnerabilities/
  tag: 설명서
  text: Cloud Security Vulnerabilities에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: 블로그
  text: Cloudcraft를 사용하여 보안 리스크를 시각적으로 식별하고 우선순위 지정
title: 심각도 평가
---
정확한 심각도 점수는 보안 팀이 취약점이 환경에 미치는 리스크를 이해하는 데 도움을 줍니다. 이 가이드는 Cloud Security가 심각도를 계산하기 위해 사용하는 다양한 측정 방법을 설명합니다.

## Cloud Security 심각도 점수 측정 프레임워크 {#cloud-security-severity-scoring-framework}

Cloud Security Misconfigurations, Cloud Security Identity Risks, Security Inbox 구성 오류는 Cloud Security 심각도 점수 측정 프레임워크를 사용하여 발견 사항의 심각도를 결정합니다. 이 프레임워크는 공격자가 잘못된 구성을 악용할 가능성과 해당 구성이 사용자의 환경에 미치는 리스크를 비교합니다. 이 두 가지 측면에 가중치를 부여해 실제 리스크에 따라 더 정확하게 발견사항에 대한 우선순위를 매길 수 있습니다. 아래의 매트릭스는 잘못된 구성의 심각도 점수가 악용 가능성과 영향도에 따라 어떻게 계산되는지 보여줍니다.

### 가능성 {#likelihood}

가능성 구성 요소는 두 개의 하위 구성 요소로 이루어져 있습니다.

* **공격 벡터**: 잘못된 구성을 악용할 수 있는 수단입니다.
* **접근성**: 리소스가 공개되어 접근 가능한지 여부입니다.

#### 공격 벡터 {#attack-vector}

공격 벡터는 다음 기준에 의해 결정됩니다.

|    공격 벡터    |                                                              정의                                                              |
|:-------------------:|:------------------------------------------------------------------------------------------------------------------------------------:|
| Required Privileges |                                           악용하기 위해 특정 권한이나 액세스가 필요합니다.                                           |
|    취약점    | 악용하기 위해 취약한 구성 요소가 필요합니다. 예를 들어 컴퓨팅 인스턴스의 소프트웨어 취약점이나 유출된 비밀번호 또는 액세스 키가 있습니다. |
|  권한 없음   |                                        악용하기 위해 권한이나 인증이 필요하지 않습니다.                                         |

#### 접근성 {#accessibility}

접근성은 다음 기준에 의해 결정됩니다.

| 접근성 |                              정의                               |
|:-------------:|:---------------------------------------------------------------------:|
|    Private    |     취약한 구성 요소 또는 리소스가 사설 네트워크에 있습니다.     |
|    Public     | 취약한 구성 요소 또는 리소스에 인터넷을 통해 접근할 수 있습니다. |

#### 가능성 점수 {#likelihood-score}

공격 벡터와 접근성을 조합하여 가능성 점수를 결정합니다.

| 공격 벡터           | 접근성 |                 |
|-------------------------|---------------|-----------------|
|                         | **Private**   | **Public**      |
| **Required Privileges** | Improbable    | Possible        |
| **Vulnerability**       | Possible      | Probable        |
| **No Authorization**    | Probable      | Highly Probable |

### 영향도 {#impact}

영향도 구성 요소는 잘못된 구성의 악용이 환경에 얼마나 피해를 줄 수 있는지 나타냅니다.

|  영향도  |                                                                                                                 정의                                                                                                                |
|:--------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|    Low   | 이 잘못된 구성은 보안 강화, 위생, 리소스 메타데이터 또는 산업 모범 사례 구성과 관련된 항목입니다. 이 잘못된 구성 자체만으로는 환경에 미치는 영향이 거의 없거나 아예 없습니다.                                                                                                             |
|  Medium  | 이 잘못된 구성을 악용하면 취약한 구성 요소 또는 이와 직접적으로 연관된 리소스의 기밀성, 무결성, 가용성에 영향을 미칩니다.                                                                   |
|   High   | 이 잘못된 구성을 악용하면 취약한 구성 요소의 기밀성, 무결성, 가용성에 영향을 미치고 다른 수많은 리소스에도 영향을 미칩니다. 예로는 `S3FullAccess` 정책이 연결된 ID가 있습니다. |
| Critical | 이 잘못된 구성을 악용하면 계정의 모든 리소스를 완전히 제어할 수 있습니다. 예로는 `AdministratorAccess` 정책이 연결된 ID가 있습니다. |

### 심각도 점수 매트릭스 {#severity-scoring-matrix}

악용 가능성과 영향도 구성 요소를 조합하여 잘못된 구성에 대한 전반적인 최종 심각도 점수를 계산합니다.

| 가능성          | 영향도  |            |          |              |
|---------------------|---------|------------|----------|--------------|
|                     | **Low** | **Medium** | **High** | **Critical** |
| **Improbable**      | Low     | Low        | Medium   | Medium       |
| **Possible**        | Low     | Medium     | High     | High         |
| **Probable**        | Medium  | High       | High     | Critical     |
| **Highly Probable** | Medium  | High       | Critical | Critical     |

### 예시 {#examples}

다음은 프레임워크가 어떻게 사용되는지 설명하는 몇 가지 예시입니다.

#### 예시 1: SNS Topic은 {#example-1-sns-topic-should-have-access-restrictions-set-for-subscription} 구독에 대한 액세스 제한이 설정되어야 함

[SNS Topic은 구독에 대한 액세스 제한이 설정되어야 함][1]에 대한 탐지 규칙은 SNS 주제가 `Principal`에 `*`를 포함하고 `Action`에 `sns:Subscribe` 권한을 포함하는 리소스 기반 정책을 가지고 있는지 검사합니다. 이 조합이 허용되면 누구나 해당 SNS 주제를 구독하고 알림을 받을 수 있습니다. 

Cloud Security 심각도 점수 측정 프레임워크를 적용한 규칙의 점수는 다음과 같습니다.

- **가능성 점수**: Highly Probable
  - **공격 벡터**: No Authorization
    - 리소스 기반 정책에 `*`가 포함되어 있으므로 공격 벡터가 'No Authorization'으로 표시됩니다. 이 와일드카드는 누구에게나 리소스에 조치를 취할 수 있는 권한을 부여합니다. 잘못된 구성을 악용하는 데 인증이나 권한 부여가 필요하지 않습니다.
  - **접근성**: Public
    - 리소스 기반 정책을 통해 인터넷상에서 이 잘못된 설정을 악용할 수 있으므로 접근성이 'Public'으로 지정됩니다 특정 네트워크 접근이 필요하지 않습니다.
- **영향도**: Medium
  - 리소스의 기밀성에 영향을 미치므로 영향도는 'Medium'으로 표시됩니다. 적대자가 이 잘못된 구성을 악용하면 SNS 주제가 전송하는 메시지를 수신할 수 있습니다.
- **심각도 점수**: Highly Probable x Medium = High
  - 최종 심각도 점수는 High입니다. Highly Probable 가능성과 Medium 영향도를 조합하면 전체 점수는 High가 됩니다.

#### 예시 2: EC2 인스턴스에 IMDSv2를 강제 적용해야 함 {#example-2-ec2-instances-should-enforce-imdsv2}

[EC2 인스턴스에 IMDSv2를 강제 적용해야 함][2]에 대한 탐지 규칙은 EC2 인스턴스가 일반 웹 애플리케이션 공격에 취약한 인스턴스 메타데이터 서비스 버전1([IMDSv1][3])을 사용하고 있는지 검사합니다. 이 취약점이 악용되면 적대자는 IMDS에 저장된 IAM 자격 증명에 액세스하고 이를 사용하여 AWS 계정의 리소스에 액세스할 수 있습니다.

Cloud Security 심각도 점수 측정 프레임워크를 적용한 규칙의 점수는 다음과 같습니다.

- **가능성 점수**: Possible
  - **공격 벡터**: Vulnerability
    - 공격 벡터는 'Vulnerability'로 표시됩니다. 이 잘못된 설정을 악용하려면 해당 리소스에 취약한 구성 요소가 포함되어 있어야 하기 때문입니다. 예를 들어 EC2 인스턴스에서 실행 중인 취약한 소프트웨어가 [서버 측 요청 위조][4] 공격에 악용되는 경우가 해당됩니다.
  - **접근성**: Private
    - 접근성은 EC2 인스턴스가 명시적으로 공개되지 않았기 때문에 'Private'으로 표시됩니다.
- **영향도**: Medium
  - EC2 인스턴스의 기밀성에 미치는 영향으로 인해 영향도가 'Medium'으로 표시됩니다. 적대자는 IMDS에 접근할 수 있으며 리소스와 관련된 IAM 자격 증명을 탈취할 가능성이 있습니다.
- **심각도 점수**: Possible x Medium = Medium
  - 최종 심각도 점수는 'Medium'입니다. Possible 수준의 가능성과 Medium 수준의 영향도를 조합하면 전체 점수는 Medium이 됩니다.

## CVSS 4.0 {#cvss-40}

Cloud Security Vulnerabilities는 Common Vulnerability Scoring System version 4.0([CVSS 4.0][5])을 사용해 취약점의 기본 점수를 결정하며 4.0 점수가 없는 경우 이전 버전(3.1, 3.0, 2)의 점수를 적용합니다. 이후 다음 사항을 고려하여 기본 점수를 수정합니다.

- 기반 인프라가 실행 중인지 여부와 영향의 범위 고려
- 기반 인프라가 실행 중인 환경(예: 프로덕션 환경이 아닌 경우 심각도 하향 조정)
- [CISA KEV 카탈로그][6] 등의 소스를 바탕으로 해당 취약점에 대한 활성 익스플로잇이 있는지 여부
- [EPSS][7]를 사용하여 계산 및 검증한 악용 가능성 반영

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/security/default_rules/aws-sns-topic-sns-topic-should-have-access-restrictions-set-for-subscription/
[2]: https://docs.datadoghq.com/ko/security/default_rules/aws-ec2-instance-ec2-instances-and-autoscaling-groups-should-enforce-imdsv2/
[3]: https://hackingthe.cloud/aws/general-knowledge/intro_metadata_service/
[4]: https://hackingthe.cloud/aws/exploitation/ec2-metadata-ssrf/
[5]: https://www.first.org/cvss/v4-0/
[6]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[7]: https://www.first.org/epss/