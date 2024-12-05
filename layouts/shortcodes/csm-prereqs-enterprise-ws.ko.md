* Datadog 에이전트 7.44 이상
* 데이터 수집은 eBPF를 사용하여 실행되므로, Datadog은 최소 기본 Linux 커널 버전이 4.15.0+이거나 eBPF 기능이 백포트된 플랫폼이 필요합니다. CSM 위협은 다음의 Linux 배포판을 지원합니다.
  * 우분투(Ubuntu) LTS (18.04, 20.04 및 22.04)
  * 데비안(Debian) 10 이상
  * 아마존 리눅스 2 (커널 4.15, 5.4 및 5.10) 및 2023
  * SUSE 리눅스 엔터프라이즈 서버 12 및 15
  * 레드햇(Red Hat) 엔터프라이즈 리눅스 7, 8 및 9
  * Oracle Linux 7, 8 및 9
  * CentOS 7
  * 커스텀 커널 빌드는 지원되지 않습니다.
* Cilium 또는 Calico 등의 커스텀 쿠버네티스(Kubernetes) 네트워크 플러그인과의 호환성에 대한 항목은 [트러블슈팅 페이지][15]를 참조하세요.

[15]: /security/cloud_security_management/troubleshooting