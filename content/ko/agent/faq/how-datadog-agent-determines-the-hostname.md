---
aliases:
- /ko/agent/faq/how-can-i-change-the-hostname/
comments: <!– 원본 순서도가 루시드차트에 있습니다. Trello를 검색하여 링크를 찾거나 Grant에게 문의하세요.––>
kind: faq
title: Datadog에서는 에이전트 호스트 이름을 어떻게 결정하나요?
---

## 잠재적 호스트 이름

Datadog 에이전트에서는 다양한 소스에서 잠재적인 호스트 이름을 수집합니다. 에이전트의 [하위 명령상태][1]를 실행하여 에이전트가 탐지하는 모든 이름을 확인할 수 있습니다.
```text
...
Hostnames
=========

  hostname: my.special.hostname
  agent-hostname: my.special.hostname
  ec2-hostname: ip-192-0-0-1.internal
  instance-id: i-deadbeef
  socket-hostname: myhost
  socket-fqdn: myhost.mydomain
...
```

이름 중에서 호스트 정식 이름이 선택됩니다. 에이전트는 Datadog에서 이 이름을 사용해 자신을 식별합니다. 다른 이름도 전달되나 별칭 후보로 전달됩니다.

정식 호스트 이름은 다음 규칙에 따라 선택되며, 첫 번째 일치 항목이 선택됩니다.

1. **agent-hostname**: ip 또는 domu로 시작하지 않으면 [에이전트 설정 파일][2]에 명시적으로 설정된 호스트 이름입니다.
2. **hostname**(Linux의 `hostname -f`): DNS 호스트 이름이 EC2 기본값이 아닌 경우, 호스트 이름은 `ip-192-0-0-1`와 같이 됩니다.
3. **instance-id**: 에이전트가 호스트에서 EC2 메타데이터 엔드포인트에 연결할 수 있는지 여부.
4. **hostname**: EC2 기본값인 경우에도 DNS 호스트 이름을 다시 사용합니다.

이름이 일반적으로 고유하지 않은 이름(예:`localhost.localdomain`)이면 규칙이 실패하고 다음 규칙으로 이동합니다.

### AWS 호스트

[Datadog API][3]에서 AWS 호스트 정보를 가져올 때 가용성에 따라 다음 특성이 표시됩니다.

| 속성      | 설명                                         |
|----------------|-----------------------------------------------------|
| `aws_id`       | 인스턴스 ID, 인스턴스 ID가 없으면 호스트로 폴백 |
| `aws_name`     | 클라우드 `providername` 태그                        |
| `display_name` | 정식 호스트 이름(호스트 식별자 값)   |

### 호스트 별칭

EC2에서 실행되는 단일 호스트에서는 인스턴스 ID(i-abcd1234), 호스트 IP 주소(ip-192-0-0-1)를 기반으로 EC2에서 제공하는 일반 호스트 이름, 내부 DNS 서버나 구성 관리 호스트 파일(myhost.mydomain)에서 제공하는 호스트 이름이 정식 이름이 될 수 있습니다. Datadog에서는 단일 호스트에 고유하게 식별 가능한 이름이 여러 개 있을 경우 호스트 이름의 별칭을 만듭니다.

에이전트가 수집한 이름(위에서 자세히 설명)은 선택한 정식 이름에 더해 별칭으로 추가됩니다.

[인프라스트럭처 목록][4]에서 계정에 있는 호스트 전체 목록을 확인합니다. 각 호스트와 연결된 별칭은 호스트 행 위에 커서를 두고 **Inspect** 버튼을 클릭하여 검사 패널로 이동해 사용할 수 있습니다.

{{< img src="agent/faq/host_aliases.png" alt="호스트 별칭" >}}

**참고**: 검색이나 필터링에는 별칭을 사용할 수 없습니다. 위에서 안내한 검사 패널에서만 사용할 수 있습니다.

## 에이전트 버전

에이전트 v5와 에이전트 v6는 호스트 이름 확인 방법이 다릅니다.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

### Linux 및 macOS

에이전트 v5에서 에이전트 v6로 업그레이드할 때 에이전트에서 보고하는 호스트 이름에 차이가 있을 수 있습니다. 에이전트 v5에서는 시스템 호스트 이름을 확인할 때 `hostname -f` 명령을 사용하고 에이전트 v6에서는 Golang API `os.Hostname()`을 사용합니다. 업그레이드 시 에이전트 호스트 이름은 정규화된 도메인 이름(FQDN)에서 짧은 호스트 이름으로 변경될 수 있습니다. 다음 예를 참고하세요.

`sub.domain.tld` --> `sub`

**참고**: 에이전트 v6.3부터 `hostname_fqdn` 구성 옵션을 도입해 에이전트 v6이 v5와 같은 방법으로 작동하도록 했습니다. 버전 6.3+에서 이 플래그의 기본값이 사용하지 않음으로 되어 있습니다. 이 옵션을 사용하려면 [예: datadog.yaml][1]을 참고하세요.

#### 내 버전에 영향이 있는지 여부 확인

v6.3.0부터 변경 사항으로 영향을 받는 경우 에이전트 로그가 아래 경고를 로그합니다.
```text
사용 종료 알림: 에이전트가 사용자의 호스트 이름을 <HOSTNAME>로 확인했습니다. 그러나 이후 버전에서는 기본값으로 <FQDN>로  확인됩니다. 향후 동작을 활성화하려면 설정에서 `hostname_fqdn` 플래그를 활성화하세요.

```

다음 중 하나라도 해당되는 경우에는 영향을 받지 않습니다.

* 에이전트를 GCE에서 실행 중입니다.
* 호스트 이름이 [에이전트의 기본 설정][2] 파일이나 `DD_HOSTNAME`환경 변수를 통해 설정됩니다.
* 에이전트가 Docker나 Kubernetes API에 액세스할 수 있는 컨테이너에서 실행됩니다.
* `cat /proc/sys/kernel/hostname`와 `hostname -f`의 호스트 이름 출력이 동일합니다.

#### 권장 작업

이 변경 사항에 영향을 받는 경우 에이전트를 업그레이드할 때 다음 작업을 실행하는 것이 좋습니다.

* **에이전트 v5에서 에이전트 v < 6.3으로 업그레이드**: [에이전트의 주요 설정][2] 파일에서 호스트 이름을 하드코딩합니다.
* **에이전트 v5에서 에이전트 v >=6.3으로 업그레이드**: [에이전트의 기본 설정][2] 파일에서 `hostname_fqdn` 옵션을 활성화합니다. 이렇게 하면 동일한 호스트 이름을 유지할 수 있습니다.
* **에이전트 v5에서 에이전트 v6으로 업그레이드(기본값으로 fqdn을 사용하는 향후 버전)**: 아무런 작업을 할 필요가 없습니다.
* 나중에 에이전트를 업그레이드할 때 에이전트 v6의 현재 기본 동작이 유지되도록 하려면 `hostname_fqdn`을 `false`로 설정합니다. Datadog에서는 가능하면 `hostname_fqdn`를 `true`로 전환하는 것을 권장합니다.

### 윈도우즈(Windows)

Windows에서 실행되는 에이전트 v5에서는 기본적으로 정규화되지 않은 호스트 이름을 보고합니다. 이전 버전과의 호환성을 유지하기 위해 에이전트 v6에서도 동일하게 이용 가능합니다. 새 플래그 `hostname_fqdn`는 Windows에서 기본값으로 사용하지 않음으로 설정되어 있으며, 이후에 출시되는 **v6** 버전에서도 동일하게 이 기본값으로 유지됩니다.

이 설정 플래그는 Windows 에이전트 v6.5부터 본격적으로 적용됩니다. `hostname_fqdn`를 true로 설정하면 Windows 에이전트가 정규화된 호스트 이름을 보고합니다.

#### 권장 작업

아무 작업을 할 필요가 없습니다. 특히 에이전트 v5에서 업그레이드하는 경우 기존 동작을 유지합니다.

Windows 호스트에서 정규화된 호스트 이름을 특별히 보고하도록 하려면 [에이전트의 기본 설정 파일][2]에 `true`로 설정된 `hostname_fqdn`를 추가합니다.

### GCE

_GCE에서 실행 중인 에이전트에만 해당_

기본적으로 에이전트 v6에서는 GCE에서 제공하는 인스턴스의 호스트 이름을 사용합니다. `gce_updated_hostname`이 `datadog.conf`에서 true로 설정된 경우 에이전트 v5.5.1+의 동작과 일치합니다.

`gce_updated_hostname`을 설정하지 않거나 false로 설정된 상태로 에이전트 v5를 업그레이드하고 `datadog.conf`/`datadog.yaml`에서 에이전트 호스트 이름을 하드코딩하지 않은 경우, Datadog에서 보고되는 호스트 이름이 GCE 인스턴스 `name`에서 전체 GCE 인스턴스 `hostname`(GCE 프로젝트 ID 포함)로 변경됩니다.

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "에이전트 v5" %}}

{{< img src="agent/faq/agent_hostname.jpeg" alt="에이전트 호스트 이름 구성표" >}}

{{% /tab %}}
{{< /tabs >}}

[1]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[2]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /ko/api/v1/hosts/
[4]: https://app.datadoghq.com/infrastructure