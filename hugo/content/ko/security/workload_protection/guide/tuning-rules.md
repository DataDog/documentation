---
aliases:
- /ko/security_platform/cloud_workload_security/guide/tuning-rules/
- /ko/security_platform/cloud_security_management/guide/
- /ko/security/cloud_security_management/guide/tuning-rules
description: 탐지 범위를 유지하면서 Workload Protection 노이즈를 줄이는 신호 억제 구축 모범 사례입니다.
title: Workload Protection Security 신호 조정을 위한 모범 사례
---
Workload Protection은 워크로드 수준에서 발생하는 의심스러운 활동을 모니터링합니다. 그러나 경우에 따라 사용자 환경의 특정 설정으로 인해 정상적인 활동이 악성으로 플래그 지정되기도 합니다. 정상적인 예상 활동으로 인해 신호가 발생하는 경우 해당 활동에 대한 트리거를 억제하여 노이즈를 줄일 수 있습니다.

이 가이드에서는 신호 억제를 세부 조정하기 위한 모범 사례 관련 고려 사항과 단계를 제공합니다.

## 억제 전략 {#suppression-strategy}

정상적인 패턴을 억제하기 전에 탐지 활동 유형을 기준으로 신호의 공통 특성을 식별하세요. 속성 조합이 구체적일수록 억제가 더 정밀해집니다.

위험 관리 관점에서 더 적은 속성을 기준으로 억제할수록 실제 악성 활동까지 제외할 가능성이 커집니다. 악성 동작에 대한 탐지 범위를 잃지 않으면서 억제를 효과적으로 세부 조정하려면 활동 유형별로 분류된 다음의 일반적인 주요 속성을 고려하세요.

### 프로세스 활동 {#process-activity}

공통 키:
- `@process.args`
- `@process.executable.name`
- `@process.group`
- `@process.args`
- `@process.envs`
- `@process.parent.comm`
- `@process.parent.args`
- `@process.parent.executable.path`
- `@process.executable.user`
- `@process.ancestors.executable.user`
- `@process.ancestors.executable.path`
- `@process.ancestors.executable.envs`

프로세스가 정상적인지 확인하려면 프로세스 트리에서 해당 부모 프로세스를 검토하세요. 프로세스 계보 트리는 프로세스를 시작 지점까지 추적하여 실행 흐름에 대한 컨텍스트를 제공합니다. 이는 현재 프로세스로 이어지는 이벤트의 순서를 이해하는 데 도움이 됩니다.

일반적으로 부모 프로세스 및 원치 않는 프로세스 속성에 모두 기반하여 억제하는 것으로 충분합니다.

조합 예시:
- `@process.args`
- `@process.executable.group`
- `@process.parent.executable.comm`
- `@process.parent.executable.args`
- `@process.user`

넓은 기간에 걸쳐 억제할 경우 값이 변경되면 억제가 더 이상 효과적이지 않으므로 임시 값이 포함된 인수를 사용하는 프로세스는 피하세요.

예를 들어, 특정 프로그램은 재부팅하거나 실행할 때 임시 파일(`/tmp`)을 사용합니다. 이러한 값을 기반으로 억제를 구성하면 유사한 활동이 탐지될 때 효과적으로 억제할 수 없습니다.

컨테이너에서 특정 활동으로 인해 발생하는 모든 신호의 노이즈를 완전히 억제하려는 경우를 가정해 보겠습니다. 컨테이너를 시작하는 프로세스를 실행하는 프로세스 트리 내 전체 명령을 선택합니다. 실행 중에 프로세스는 컨테이너가 존재하는 동안 유지되는 파일에 액세스합니다. 대상으로 삼으려는 동작이 워크로드 로직과 관련된 경우 일시적인 프로세스 인스턴스를 기반으로 한 억제 정의는 다른 컨테이너의 유사한 활동을 억제하는 데 효과적이지 않습니다.

### 파일 활동 {#file-activity}

워크로드, 문제의 파일 및 파일에 접근하는 프로세스에 대한 식별 정보를 반영하는 속성에 기반하여 파일 작업과 관련한 억제를 구체화합니다.

공통 키:
- 워크로드 태그:
  - `kube_container_name`
  - `kube_service`
  - `host`
  - `env`
- 프로세스:
  - `@process.args`
  - `@process.executable.path`
  - `@process.executable.user`
  - `@process.group`
  - `@process.args`
  - `@process.parent.comm`
  - `@process.parent.args`
  - `@process.parent.executable.path`
  - `@process.user`
- 파일:
  - `@file.path`
  - `@file.inode`
  - `@file.mode`

신호를 조사하면서 실제 악성 활동인지 판단하려면 프로세스가 파일에 액세스하고 수정하는 컨텍스트가 예상된 것인지 검증하세요. 전체 인프라에서 파일에 대한 의도된 동작까지 억제하지 않으려면 위에 나열된 공통 키를 조합하여 관련 컨텍스트 정보를 모두 수집해야 합니다.

조합 예시:
  - `@process.args`
  - `@process.executable.path`
  - `@process.user`
  - `@file.path`
  - `kube_service `
  - `host`
  - `kube_container_name`

### 네트워크 DNS 기반 활동 {#network-dns-based-activity}

네트워크 활동 모니터링은 DNS 트래픽을 확인하고 서버 네트워크를 손상시킬 수 있는 의심스러운 동작을 탐지하는 것을 목표로 합니다. 특정 IP에서 DNS 서버로 전송된 쿼리를 확인하는 동안 프라이빗 네트워크 IP나 클라우드 네트워크 IP와 같이 알려진 IP 주소 집합의 정상적인 액세스로 인해 신호가 발생할 수 있습니다.

공통 키:
- 프로세스:
  - `@process.args`
  - `@process.executable.group`
  - `@process.executable.path`
  - `@process.parent.executable.comm`
  - `@process.parent.executable.args`
  - `@process.user`
- 네트워크/DNS 관련:
  - `@dns.question.name`
  - `@network.destination.ip/port`
  - `@network.ip/port`

로컬 애플리케이션이 연결하여 DNS 이름을 확인할 때마다 가장 먼저 확인해야 하는 특성은 조회를 유도한 IP의 목록과 DNS 쿼리입니다.

조합 예시:
  - `@network.ip/port`
  - `@network.destination.ip/port`
  - `@dns.question.*`

### 커널 활동 {#kernel-activity}

커널 관련 신호의 경우 노이즈는 일반적으로 워크로드 로직이나 특정 커널 버전과 관련된 취약성에서 발생합니다. 무엇을 억제할지 결정하기 전에 다음 속성을 고려하세요.

공통 키:
- 프로세스
  - `@process.args`
  - `@process.executable.group`
  - `@process.executable.path`
  - `@process.parent.executable.comm`
  - `@process.parent.executable.args`
  - `@process.user`
- 파일
  - `@file.path `
  - `@file.inode`
  - `@file.mode`

해당 유형 작업에 대한 조합을 정의하는 것은 파일링 또는 프로세스 작업과 유사하지만 공격에 사용된 시스템 호출과 관련된 몇 가지 추가 특이점이 있습니다.

예를 들어, Dirty Pipe 익스플로잇은 권한 상승 취약성입니다. 로컬 사용자가 이 공격을 이용해 시스템에서 권한을 상승시키면 심각한 문제가 될 수 있으므로 루트 사용자가 정상적인 프로세스를 실행하면서 발생시키는 노이즈를 억제하는 것이 적절합니다.
- `@process.executable.user`
- `@process.executable.uid`

또한 일부 머신에서 패치된 커널 버전을 실행하는 경우에도 신호가 생성되는 것을 확인할 수 있습니다(예: Dirty Pipe 취약성이 패치된 Linux 버전 5.16.11, 5.15.25 및 5.10). 이 경우 `host`, `kube_container_name` 또는 `kube_service`와 같은 워크로드 수준 태그를 조합에 추가하세요. 그러나 워크로드 수준 속성이나 태그를 사용할 때는 광범위한 대상에 적용되어 탐지 범위와 적용 범위가 줄어들 수 있다는 점에 유의하세요. 이를 방지하려면 워크로드 수준 태그를 프로세스 또는 파일 기반 속성과 함께 사용하여 더 세분화된 억제 기준을 정의하세요.