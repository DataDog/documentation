---
title: 통합 관리
---

## 개요

Agent에는 Datadog 통합 공식 세트가 포함되므로 애플리케이션 모니터링을 바로 시작할 수 있습니다. 이러한 통합은 각각 하나의 파이썬(Python) 패키지로 준비되며, 개별적으로 업그레이드할 수 있습니다.

Agent v6.8 이상의 버전부터는 `datadog-agent integration` 명령을 사용하여 Agent에서 지원하는 공식 Datadog 통합을 관리할 수 있습니다. 이 명령어에는 다음의 서브 명령어가 있습니다.

 * [install](#install)
 * [remove](#remove)
 * [show](#show)
 * [freeze](#freeze)

이러한 명령어를 사용하는 방법과 문서는 `datadog-agent integration --help`를 사용하여 출력할 수 있습니다.
리눅스(Linux)에서는 `dd-agent` 사용자로, 윈도우즈(Windows)에서는 `administrator`로 명령어를 실행하세요.

## 통합 명령어

### 워크플로우

1. `show` 명령어를 사용하여 Agent에 설치된 통합 버전을 체크합니다.
2. [integrations-core][1] 저장소에 있는 특정 통합의 체인지로그(changelog)를 확인하여 필요한 버전이 무엇인지 결정합니다.
3. `install` 명령어로 통합을 설치합니다.
4. Agent를 재시작합니다.

**참조*: 설정 관리 도구를 사용하는 경우 통합을 원하는 버전으로 고정하시길 권장합니다. Agent를 업그레이드할 준비가 되면 이 고정을 해제하세요. 통합 버전 고정을 해제하지 않고 Agent를 업그레이드하면, 통합 버전이 Agent 새 버전과 호환되지 않을 경우 설정 관리 도구가 제대로 작동하지 않을 수 있습니다.

### 설치

`datadog-agent integration install` 명령을 사용하여 공식 Datadog 통합의 특정 버전을([integrations-core 저장소][1]에서 확인 가능) 설치할 수 있습니다. 단, 해당 버전이 Agent 버전과 호환되어야 합니다. 이 명령은 호환성을 검증하고, 호환되지 않는 경우에는 오류가 발생하며 종료됩니다.

다음의 두 조건을 모두 충족하면 통합이 호환되며 설치할 수 있습니다.

1. [Agent에 포함된 버전][2]보다 최신 버전입니다.
2. 설치된 Agent의 [datadog_checks_base][3] 버전과 호환됩니다.

**참조**: `datadog_checks_base`는 수동으로 설치할 수 없습니다. 베이스 점검은 Agent를 업그레이드해야만 업그레이드됩니다.

이 명령어의 구문은 `datadog-agent integration install <INTEGRATION_PACKAGE_NAME>==<VERSION>`입니다. 여기서 `<INTEGRATION_PACKAGE_NAME>`은 통합 이름이며, 프리픽스(접두어)는 `datadog-`입니다.

예를 들어 vSphere 통합 버전 3.6.0을 설치하려면 다음을 실행하세요.

{{< tabs >}}
{{% tab "리눅스(Linux)" %}}
```shell
sudo -u dd-agent -- datadog-agent integration install datadog-vsphere==3.6.0
```
{{% /tab %}}
{{% tab "윈도우즈(Windows) PowerShell" %}}
**고급** 옵션으로(즉, 관리자 권한으로) `powershell.exe`를 실행하세요.
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration install datadog-vsphere==3.6.0
```
{{% /tab %}}
{{< /tabs >}}

이 명령어는 통합의 파이썬 패키지를 설치함과 동시에 설정 파일(`conf.yaml.example`, `conf.yaml.default`, `auto_conf.yaml`)을 `conf.d` 디렉터리에 복사하여 기존 구성 파일을 덮어씁니다. Agent 전체 업그레이드 시에도 동일한 처리가 이루어집니다. 파일을 복사하던 중에 오류가 발생하는 경우, 명령어는 오류가 있어 종료되지만 지정한 버전의 통합은 설치됩니다.

업그레이드 후 Agent를 재시작해 새롭게 설치된 통합을 사용할 수 있습니다.

이 명령어는 Agent 다음 버전이 출시될 때까지 기다리지 않고도 개별 통합을 업그레이드하여, 신기능이나 버그 수정 사항이 공개되는 대로 사용할 수 있도록 설계되었습니다. **참조**: Agent 최신 릴리스에는 항상 출시 시점에 사용할 수 있는 통합의 최신 버전이 모두 포함되어 있습니다. 가능한 경우 Agent를 업그레이드하시길 권장합니다.

Agent 업그레이드에 따라 개별적으로 업그레이드한 모든 통합은 Agent 내에 포함된 통합에서 덮어쓴 명령어를 사용합니다.

#### 설정 관리 도구

설정 관리 도구는 이 명령어를 사용해 전체 인프라스트럭처에 동일한 통합 버전을 배포합니다.

### 삭제

통합을 삭제하려면 `datadog-agent integration remove` 명령을 사용하세요. 이 명령어의 구문은 `datadog-agent integration remove <INTEGRATION_PACKAGE_NAME>`입니다. 여기서 `<INTEGRATION_PACKAGE_NAME>`은 통합 이름이며 프리픽스(접두어)가 `datadog-`입니다.

예를 들어 vSphere 통합을 삭제하려면 다음을 실행하세요.

{{< tabs >}}
{{% tab "리눅스(Linux)" %}}
```shell
sudo -u dd-agent -- datadog-agent integration remove datadog-vsphere
```
{{% /tab %}}
{{% tab "윈도우즈(Windows) PowerShell" %}}
**고급** 옵션으로(즉, 관리자 권한으로) `powershell.exe`를 실행하세요.
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration remove datadog-vsphere
```
{{% /tab %}}
{{< /tabs >}}

통합을 삭제해도 해당하는 설정 폴더가 `conf.d` 디렉터리에서 삭제되지는 않습니다.

### 보기

버전 등 설치된 통합의 정보를 얻으려면 `datadog-agent integration show` 명령을 사용하세요. 이 명령어의 구문은 `datadog-agent integration show <INTEGRATION_PACKAGE_NAME>`입니다. 여기서 `<INTEGRATION_PACKAGE_NAME>`은 통합 이름이며 프리픽스(접두어)는 `datadog-`입니다.

예를 들어 vSphere 통합 정보를 보려면 다음을 실행하세요.

{{< tabs >}}
{{% tab "리눅스(Linux)" %}}
```shell
sudo -u dd-agent -- datadog-agent integration show datadog-vsphere
```
{{% /tab %}}
{{% tab "윈도우즈(Windows) PowerShell" %}}
**고급** 옵션으로(즉, 관리자 권한으로) `powershell.exe`를 실행하세요.
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration show datadog-vsphere
```
{{% /tab %}}
{{< /tabs >}}

### 동결

Agent의 파이썬 환경에 설치된 모든 파이썬 패키지를 목록으로 표시하려면 `datadog-agent integration freeze` 명령을 사용하세요. 그러면 모든 Datadog 통합(`datadog-`로 시작하는 패키지) 및 통합 실행에 필요한 파이썬 의존 관계가 목록으로 표시됩니다.

{{< tabs >}}
{{% tab "리눅스(Linux)" %}}
```text
sudo -u dd-agent -- datadog-agent integration freeze
```
{{% /tab %}}
{{% tab "윈도우즈(Windows) PowerShell" %}}
**고급** 옵션으로(즉, 관리자 권한으로) `powershell.exe`를 실행하세요.
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration freeze
```
{{% /tab %}}
{{< /tabs >}}

[1]: https://github.com/DataDog/integrations-core
[2]: https://github.com/DataDog/integrations-core/blob/master/AGENT_INTEGRATIONS.md
[3]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base