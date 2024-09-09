---
aliases:
- /ko/agent/autodiscovery/template_variables
- /ko/agent/faq/template_variables
- /ko/agent/guide/template_variables
further_reading:
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 자동탐지 통합 템플릿 생성 및 불러오기
- link: /agent/guide/ad_identifiers/
  tag: 설명서
  text: 해당하는 통합 템플릿과 컨테이너 매치하기
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: Agent 자동탐지에 포함할 컨테이너 관리하기
title: 자동탐지 템플릿 변수
---

자동탐지를 설정할 때 다음의 템플릿 변수를 사용해 동적으로 컨테이너 값을 할당하세요.

| 템플릿 변수           | 설명                                                                                                                                                                                                 |
| --------------------------  | ---                                                                                                                                                                                                         |
| `"%%host%%"`                | 네트워크를 자동으로 탐지합니다. 싱글 네트워크 컨테이너의 경우, 해당하는 IP를 반환합니다.                                                                                                                   |
| `"%%host_<NETWORK NAME>%%"` | 여러 네트워크에 연결된 경우, 사용할 네트워크 이름을 특정합니다.                                                                                                                                      |
| `"%%port%%"`                | **숫자 오름차순으로 정렬**했을 때, 가장 많이 노출된 포트를 사용합니다.<br>예를 들어 포트 `80`, `443`, `8443`을 노출하는 컨테이너의 경우 `8443`을 반환합니다.                                    |
| `"%%port_<NUMBER_X>%%"`     | **숫자 오름차순으로 정렬**해 `<NUMBER_X>` 포트를 사용합니다.<br>예를 들어 컨테이너가 포트 `80`, `443`, `8443`을 노출하는 경우 `"%%port_0%%`는 포트 `80`을, `"%%port_1%%"`은 `443`을 참조합니다. |
| `"%%port_<NAME>%%"`     | 포트 이름 `<NAME>`과 연관된 포트를 사용합니다.                                                                                                                                                           |
| `"%%pid%%"`                 | `docker inspect --format '{{.State.Pid}}' <CONTAINER_NAME>`에서 반환하는 컨테이너 프로세스 ID를 가져옵니다.                                                                                              |
| `"%%hostname%%"`            | `hostname` 값을 컨테이너 설정에서 가져옵니다. `"%%host%%"` 변수가 신뢰할 수 있는 IP를(예: [ECS awsvpc mode][1]) 가져올 수 없는 경우에만 사용합니다.                                       |
| `"%%env_<ENV_VAR>%%"`       | `{TX-PL-LABEL}lt;ENV_VAR>` 환경 변수의 요소를 **Agent 프로세스에 표시된 대로** 사용합니다.                                                                                                                |
| `"%%kube_namespace%%"`      | 쿠버네티스(Kubernetes) 네임스페이스를 자동 탐지합니다. |
| `"%%kube_pod_name%%"`       | 쿠버네티스 팟 이름을 자동 탐지합니다.  |
| `"%%kube_pod_uid%%"`        | 쿠버네티스 팟 UID를 자동 탐지합니다.   |

**폴백(Fall back)**:

* `"%%host%%"` 템플릿 변수: Agent가 찾지 못하는 경우, 이 템플릿 변수는 `bridge` 네트워크 IP로 폴백합니다.
* `"%%host_<NETWORK NAME>%%"`: 특정된 `<NETWORK_NAME>`을 찾을 수 없는 경우 템플릿 변수는 `"%%host%%"`처럼 작동합니다.

사용하는 플랫폼에 따라 지원되지 않는 탬플릿 변수가 있을 수 있습니다.

| 플랫폼    | 자동탐지 식별자  | 호스트 | 포트 | 태그 | Pid | Env | 호스트네임 | 쿠버네티스 네임스페이스 | 팟 이름 | 팟 UID |
| ----------- | ---                         | ---  | ---  | --- | --- | --- | ---      | ---            | ---      | ---     |
| 도커(Docker)      | ✅                          | ✅   | ✅   | ✅  | ✅  | ✅  | ✅      | ❌      | ❌      | ❌      |
| ECS Fargate | ✅                          | ✅   | ❌   | ✅  | ❌  | ✅  | ❌      | ❌      | ❌      | ❌      |
| 쿠버네티스(Kubernetes)  | ✅                          | ✅   | ✅   | ✅  | ❌  | ✅  | ❌      | ✅      | ✅      | ✅      |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking.html