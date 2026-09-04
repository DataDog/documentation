호스트 또는 컨테이너에 설치된 Datadog 에이전트 버전 `7.46` 이상.

CSM 위협은 다음 Linux 배포를 지원합니다:
| 리눅스 배포                 | 지원 버전                               |
| ---------------------------------- | ------------------------------------------------- |
| Ubuntu LTS                         | 18.04, 20.04, 22.04                              |
| Debian                             | 10 또는 이상                                      |
| Amazon Linux 2                     | 커넬 4.15, 5.4, 5.10, 2023                 |
| SUSE Linux Enterprise Server       | 12 및 15                                        |
| Red Hat Enterprise Linux           | 7, 8, 9                                      |
| Oracle Linux                       | 7, 8, 9                                      |
| CentOS                             | 7                                               |

**참고**: 

* [윈도우즈(Windows)에서 CSM 위협은 베타 버전으로 제공됩니다][103].
* 커스텀 커널 빌드는 지원되지 않습니다.
* 데이터 수집은 eBPF를 사용하여 실행되므로 Datadog 기본 Linux 커널 버전이 최소 4.15.0 이상이거나 eBPF 기능이 백포트된 플랫폼이 필요합니다.
* Cilium 또는 Calico와 같은 커스텀 쿠버네티스(Kubernetes) 네트워크 플러그인과의 호환성에 대해서는 [트러블슈팅 페이지][102]를 참조하세요.

[102]: /security/cloud_security_management/troubleshooting
[103]: /security/cloud_security_management/setup/windows