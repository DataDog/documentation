---
aliases:
- /ko/agent/faq/downgrade-datadog-agent
kind: faq
title: 에이전트를 이전 마이너 버전으로 다운그레이드
---

Datadog 에이전트의 DEB 또는 RPM 패키지의 경우 아래 지침에 따라 Datadog 에이전트를 이전 마이너 버전으로 다운그레이드할 수 있습니다.

Datadog 에이전트를 이전 주 버전으로 다운그레이드하려면 [이 페이지][1]에 안내된 지침을 따르세요.

**참조**:

* 이 지침은 Datadog 에이전트 버전 6.x 이상에만 적용됩니다.
* 아래 지침에서 설정 관리 도구와 관련된 내용에는 해당 도구의 최신 주요 버전을 사용해야 합니다. Chef 쿡북 버전4.x, Puppet 모듈은 버전 3.x, Ansible 역할 버전4.x을 사용하세요. 그 이전 버전을 사용하는 경우 해당하는 도구의 리포지토리에서 해당 버전의 설명서를 참고하세요. [Chef 쿡북 v3.x][2], [Puppet 모듈 v2.x][3], 또는 [Ansible 역할 버전 3.x][4]을 참고하세요.

## Debian/Ubuntu

### CLI

```shell
sudo apt-get update && sudo apt-get install --allow-downgrades datadog-agent=1:X.Y.Z-1
```

**참고**: `--allow-downgrades` 옵션이 없으면 대신 `--force-yes`를 사용할 수 있습니다.

### 설정 관리 도구

{{< tabs >}}
{{% tab "Chef" %}}

```rb
node["datadog"]["agent_version"] = "1:X.Y.Z-1"
node["datadog"]["agent_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

```conf
class { 'datadog_agent':
      ...
      agent_version => "1:X.Y.Z-1",
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

플레이북에 다음 속성을 추가합니다.

```yaml
datadog_agent_version: "1:X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

## RHEL/CentOS/Amazon Linux

### CLI

```shell
sudo yum clean expire-cache metadata && sudo yum downgrade datadog-agent-X.Y.Z-1
```

### 설정 관리 도구

{{< tabs >}}
{{% tab "Chef" %}}

노드에서 다음 속성을 설정합니다.

```rb
node["datadog"]["agent_version"] = "X.Y.Z-1"
node["datadog"]["agent_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

```conf
class { 'datadog_agent':
      ...
      agent_version => "X.Y.Z-1",
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

플레이북에 다음 속성을 추가합니다(CentOS의 경우 Ansible 2.4+에만 적용됨).

```yaml
datadog_agent_version: "X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

## SUSE

### CLI

```shell
sudo zypper --no-gpg-check refresh datadog && sudo zypper install --oldpackage datadog-agent-1:X.Y.Z-1
```

### 설정 관리 도구

{{< tabs >}}
{{% tab "Chef" %}}

노드에서 다음 특성을 설정합니다.

```rb
node["datadog"]["agent_version"] = "1:X.Y.Z-1"
node["datadog"]["agent_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

Datadog 모듈은 SUSE를 지원하지 않습니다.

{{% /tab %}}
{{% tab "Ansible" %}}

플레이북에 다음 속성을 추가합니다.

```yaml
datadog_agent_version: "1:X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

[1]: /ko/agent/faq/agent-downgrade-major/
[2]: https://github.com/DataDog/chef-datadog/tree/3.x
[3]: https://github.com/DataDog/puppet-datadog-agent/tree/2.x
[4]: https://github.com/DataDog/ansible-datadog/tree/3.x