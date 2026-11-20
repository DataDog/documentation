
### CSM 위협

CSM 위협은 Linux 분포를 지원합니다.

| Linux 분포        | 지원되는 버전                    |
| ---------------------------| --------------------------------------|
| 우분투(Ubuntu) LTS                 | 18.04, 20.04, 22.04                   |
| Debian                      | 10 이상                           |
| 아마존 리눅스 2              | 커널 4.15, 5.4, 5.10 및 2023      |
| SUSE Linux 엔터프라이즈 서버| 12 및 15                              |
| 레드햇(Red Hat) 엔터프라이즈 Linux    | 7, 8, 9                            |
| Oracle Linux                | 7, 8, 9                            |
| CentOS                      | 7                                     |

**참고:**

- 커스텀 커널 빌드는 지원되지 않습니다.
- Cilium 또는 Calico와 같은 커스텀 쿠버네티스(Kubernetes) 네트워크 플러그인과의 호환성에 대해서는 [트러블슈팅 페이지][102]를 참조하세요.
- 데이터 수집은 eBPF를 사용하여 이루어지므로 Datadog 최소 Linux 커널 버전이 4.15.0 이상이거나 eBPF 기능이 백포트된 플랫폼이 필요합니다.

### CSM 취약성

| 구성 요소                | 버전/요구 사항                     |
| ------------------------ | ----------------------------------------|
| [조타실 차트][103]            | v3.49.6 이상(쿠버네티스(Kubernetes)만 해당)      |
| [컨테이너][104]              | v1.5.6 이상(쿠버네티스(Kubernetes) 및 호스트 전용)|

**참고**: 다음 컨테이너 런타임에 대해 CSM 취약점을 **이용할 수 없습니다.**

  - CRI-O runtime
  - podman 런타임

### CSM 신원 위험

<div class="alert alert-info"><strong>참고</strong>: 현재 CSM 신원 위험은 AWS 에서만 사용할 수 있습니다.</div>

CSM 신원 확인 위험을 사용하려면 [ AWS][105]에 대한 리소스 수집을 활성화해야 합니다. 이미 이 작업을 수행한 경우에는 추가 설정이 필요하지 않습니다.

**참고**: 

- AWS 계정에 대해 CSM 잘못된 구성을 사용 설정한 경우][106] 이미 클라우드 리소스 수집을 사용 설정한 것입니다.
- 필수는 아니지만, CloudTrail 로그 전달을 사용 설정하면[107], 인프라스트럭처 에서 리소스의 실제 사용(또는 미사용)을 기반으로 추가 인사이트를 얻을 수 있습니다(예: 프로비저닝된 권한과 사용된 권한 간에 상당한 차이가 있는 사용자 및 역할).

[102]: /security/cloud_security_management/troubleshooting
[103]: /containers/kubernetes/installation/?tab=helm
[104]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[105]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[106]: /security/cloud_security_management/setup/csm_enterprise?tab=aws#enable-resource-scanning-for-cloud-accounts
[107]: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#enable-cloudtrail-logs-forwarding
