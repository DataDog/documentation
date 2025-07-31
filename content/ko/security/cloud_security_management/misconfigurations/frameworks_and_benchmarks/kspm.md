---
further_reading:
- link: security/default_rules
  tag: 설명서
  text: 기본 CSM Misconfigurations 클라우드 설정 감지 규칙 살펴보기
- link: /security/misconfigurations/custom_rules
  tag: 설명서
  text: 커스텀 규칙 생성
title: Kubernetes 보안 상태 관리
---

Cloud Security Management(CSM)용 Kubernetes Security Posture Management(KSPM)는 [CIS][1]에서 정의한 업계의 검증된 모범 사례나 사용자가 설정한 [커스텀 감지 정책](#create-your-own-kubernetes-detection-rules)을 기준으로 환경을 벤치마킹하여, Kubernetes 배포의 보안 상태를 사전에 강화합니다.

## KSPM 설정

KSPM을 최대한 활용하려면 Datadog Agent와 클라우드 통합을 모두 설치해야 합니다. 자세한 방법은 아래 문서에서 확인하세요.

- CSM Enterprise ([Agent][14] 및 [클라우드 통합][15])
- CSM Pro ([Agent][12] 및 [클라우드 통합][13])

이를 통해 Datadog은 다음 각 리소스 유형에 대한 Kubernetes 배포의 위험을 감지할 수 있습니다.

| 리소스 유형            | 설치 방법    | 프레임워크        |
|--------------------------|-------------------|------------------|
| `aws_eks_cluster`        | 클라우드 통합 | `cis-eks`        |
| `aws_eks_worker_node`    | 에이전트             | `cis-eks`        |
| `azure_aks_cluster`      | 클라우드 통합 | `cis-aks`        |
| `azure_aks_worker_node`  | 에이전트             | `cis-aks`        |
| `kubernetes_master_node` | 에이전트             | `cis-kubernetes` |
| `kubernetes_worker_node` | 에이전트             | `cis-kubernetes` |

## Kubernetes 배포 전반에 걸쳐 위험 모니터링

KSPM으로 Datadog은 50개 이상의 기본 Kubernetes 감지 규칙이 정의한 위험을 사용자 환경에서 스캔합니다. 특정 기간 동안 규칙이 정의한 위험 발견 시 [알림이 전송되고][6] [Misconfigurations Explorer][11]에 결과가 나타납니다.

각 결과는 전체 리소스 구성, 리소스 수준 태그, 인프라스트럭처의 다른 구성 요소와 리소스 간의 관계 맵 등을 포함하여 문제가 미치는 영향을 파악하는데 도움이 됩니다. 문제와 영향을 파악한 다음 CSM 내에서 [Jira 티켓을 생성하거나][7] [사전 정의된 워크플로를 실행하여][8] 문제 해결을 시작할 수 있습니다.

**참고**: [API를 사용하여 결과를 프로그래밍 방식으로 처리할 수도 있습니다][10].

{{< img src="security/csm/kspm_finding.png" alt="EKS Cluster 관련 심각도가 높은 항목 세부 정보 패널에는 공개 액세스 제한 규칙이 있어야 합니다." width="80%">}}

## 업계 표준 프레임워크 기준 Kubernetes 보안 태세 평가

CSM은 단일 지표를 사용하여 보안 및 규정 준수 상태를 파악할 수 있는 [보안 태세 점수][2]를 제공합니다. 이 점수는 모든 활성 기본 클라우드 및 인프라스트럭처 감지 규칙을 충족하는 환경의 비율을 나타냅니다. 전체 조직 또는 Kubernetes 배포를 포함한 특정 팀, 계정, 환경의 점수를 확인할 수 있습니다.

보안 태세 점수에 관한 자세한 내용은 [보안 태세 점수][3]를 참고하세요.

### Kubernetes 배포의 보안 태세 점수 보기

Kubernetes 배포의 보안 태세 점수를 확인하려면 [**Security** > **Compliance**][9] 페이지로 이동하여 CIS Kubernetes 프레임워크 보고서를 찾으세요.

### Kubernetes 프레임워크의 상세 보고서 보기

프레임워크 요구 사항 및 규칙을 기준으로 산정된 점수를 상세 보고서에서 확인하려면 **Framework Overview**를 클릭하세요. 프레임워크 페이지에서 보고서 사본을 PDF 파일로 다운로드하거나 CSV 파일로 내보낼 수 있습니다.

{{< img src="security/csm/kubernetes_posture_score.png" alt="전체 태세 점수가 64%임을 보여주는 CIS Kubernetes 규정 준수 보고서 페이지" width="100%">}}

## 맞춤형 Kubernetes 감지 규칙 만들기

기본으로 제공되는 감지 규칙 외에도 기존 규칙을 복제하거나 새 규칙을 직접 생성할 수도 있습니다. 규칙은 [Rego 정책 언어][4]로 작성됩니다. Rego는 Python과 유사한 유연한 언어로, 감지 규칙을 작성할 때 업계 표준으로 사용됩니다.

감지 규칙을 만든 후 심각도(`Critical`, `High`, `Medium`, `Low`, `Info`)를 정의하고, [실시간 알림을 설정하여][6] 새로운 결과 감지 시 알림을 받을 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisecurity.org/cis-benchmarks
[2]: /ko/security/cloud_security_management#track-your-organizations-health
[3]: /ko/glossary/#security-posture-score
[4]: https://www.openpolicyagent.org/docs/latest/policy-language/
[5]: /ko/security/cloud_security_management/guide/writing_rego_rules/
[6]: /ko/security/misconfigurations/compliance_rules#set-notification-targets-for-compliance-rules
[7]: /ko/security/cloud_security_management/review_remediate/jira
[8]: /ko/security/cloud_security_management/review_remediate/workflows
[9]: https://app.datadoghq.com/security/compliance/home
[10]: /ko/api/latest/security-monitoring/#list-findings
[11]: https://app.datadoghq.com/security/compliance
[12]: /ko/security/cloud_security_management/setup/csm_pro/agent/kubernetes
[13]: /ko/security/cloud_security_management/setup/csm_pro/cloud_accounts
[14]: /ko/security/cloud_security_management/setup/csm_enterprise/agent/kubernetes
[15]: /ko/security/cloud_security_management/setup/csm_enterprise/cloud_accounts