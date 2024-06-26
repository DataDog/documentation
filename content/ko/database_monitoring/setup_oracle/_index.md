---
description: Oracle 데이터베이스에서 데이터베이스 모니터링 설정
disable_sidebar: true
kind: 설명서
title: Oracle 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">이 사이트에서는 데이터베이스 모니터링이 지원되지 않습니다.</div>
{{< /site-region >}}

<div class="alert alert-info">
이 페이지에 설명된 기능은 베타 버전입니다. 피드백을 제공하거나 지원을 요청하려면 Customer Success 매니저에게 문의하세요.
</div>

## 지원되는 Oracle 버전, 기능 및 아키텍처

- **버전**: 19c 및 21c
- **디플로이먼트 설정**: 자체 관리형, RDS, RAC, Exadata, 자율 데이터베이스
- **아키텍처**: 멀티테넌트, 비-CDB, RDS 단일 테넌트

## 개요

### 전제 조건

Oracle용 데이터베이스 모니터링을 설정하려면, 다음 전제 조건을 충족해야 합니다:

1. Oracle 모니터링 기능을 지원하는 [[Agent 버전](#recommended-agent-version)을 설치해야 합니다.
    - [Agent 설치](#install-the-agent)
    - [기존 Agent 설치 업그레이드하기](#upgrade-an-existing-agent-installation)
2. Oracle 통합이 설치되어 있어야 합니다.
    - [Oracle 통합 설치](#install-the-oracle-integration)
    - [기존 Oracle 통합 설치 확인](#verify-your-existing-oracle-integration)

### 설정
위의 전제 조건이 충족되면, 호스팅 유형에 대한 설정 지침을 따르세요:
{{< partial name="dbm/dbm-setup-oracle" >}}

## 전제 조건 상세 정보

### Agent 설치

#### 호스트 요구 사항

Agent를 설치할 위치를 결정하려면 [DBM 설정 아키텍처][10] 문서를 참조하세요.

Agent에는 외부 Oracle 클라이언트가 필요하지 않습니다.

#### 권장 Agent 버전

Datadog은 모든 구현된 Oracle 모니터링 기능과 버그 수정이 포함되어 있는 Oracle DBM 빌드를 권장합니다. Oracle DBM 빌드는 항상 안정적인 Agent 릴리스를 기본으로 합니다. 

- Linux: `7.47.1~dbm~oracle~0.2-1`
- Windows: `7.47.1-dbm-oracle-0.2-1`
- Docker: `7.47.1-dbm-oracle-0.2`

공식 Datadog Agent 릴리스를 선호하는 경우, `7.49.0` 버전이 나올 때까지 기다리세요.

- Oracle 빌드를 설치하려면, [Oracle DBM 빌드 설치]를 참조하세요(#oracle-dbm-build-installation).
- 최신 공식 릴리스를 설치하려면, [플랫폼에 대한 지침][3]을 따르세요.

#### Oracle DBM 빌드 설치

{{< tabs >}}
{{% tab "Linux" %}}

Oracle DBM 빌드는 해당 리포지토리에서 [RHEL][6] 및 [Ubuntu][7]용으로 다운로드할 수 있습니다.

`DD_API_KEY`을 설정하고 다음 명령을 실행하여 Oracle DBM 릴리스를 설치합니다. 예를 들면:

```shell
export DD_AGENT_DIST_CHANNEL=beta
export DD_AGENT_MINOR_VERSION="47.1~dbm~oracle~0.2-1"

DD_API_KEY= DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

[6]: https://yum.datadoghq.com/beta/7/x86_64/
[7]: https://apt.datadoghq.com/dists/beta/7/
{{% /tab %}}
{{% tab "Windows" %}}

Oracle DBM 빌드는 [Windows 빌드 리포지토리][8]에서 다운로드할 수 있습니다.

[Oracle DBM 빌드][4]용 MSI 파일을 다운로드합니다.

`APIKEY`를 설정하고 설치 프로그램을 다운로드한 디렉토리 내의 명령 프롬프트에서 다음 명령을 실행합니다. 예를 들면:

```shell
start /wait msiexec /qn /i datadog-agent-7.47.1-dbm-oracle-0.2-1.x86_64.msi APIKEY="" SITE="datadoghq.com"
```
[4]: https://s3.amazonaws.com/ddagent-windows-stable/beta/datadog-agent-7.47.1-dbm-oracle-0.2-1.x86_64.msi
[8]: https://ddagent-windows-stable.s3.amazonaws.com/

{{% /tab %}}
{{% tab "Docker" %}}
Oracle DBM 이미지는 [Docker 빌드 리포지토리][9]에서 찾을 수 있습니다.

`DD_API_KEY`를 설정하고 다음 명령을 실행하여 Oracle DBM 릴리스를 설치합니다. 예를 들면:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY="" -e DD_SITE="datadoghq.com" gcr.io/datadoghq/agent:7.47.1-dbm-oracle-0.2
```

[9]: https://hub.docker.com/r/datadog/agent/tags?page=1&name=oracle
{{% /tab %}}
{{< /tabs >}}

### 기존 Agent 설치 업그레이드하기

호스팅 유형에 대한 문서에 따라 모든 `grant` 권한 명령을 실행하세요. 새로운 기능에는 이전에 Datadog 데이터베이스 사용자 계정에 부여하지 않았던 시스템 보기에 대한 액세스 권한이 필요합니다.

### Oracle 통합 설치

Datadog의 통합 페이지에서 조직에 맞는 [Oracle 통합][2]을 설치합니다. 그러면 Oracle 데이터베이스의 성능을 모니터링하는 데 사용할 수 있는 [Oracle 대시보드][5]가 계정에 설치됩니다.

### 기존 Oracle 통합 확인

Oracle 통합을 처음 설치하는 경우 이 단계를 건너뛸 수 있습니다.

기존 설치의 경우 설정이 `conf.d/oracle-dbm.d/` 디렉토리에 있는지 확인하세요. `conf.d/oracle.d/` 디렉토리에서 레거시 설정을 마이그레이션해야 할 수도 있습니다.

Oracle 통합을 레거시 통합에서 새 통합으로 마이그레이션하려면 다음 명령을 사용하세요.

```shell
cp /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml
```

레거시 통합을 비활성화합니다.

```shell
mv /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle.d/conf.yaml.bak
```

레거시 통합을 비활성화하면 시스템 메트릭을 두 번 보내는 것을 방지할 수 있습니다.

 Agent에는 외부 Oracle 클라이언트가 필요하지 않으므로 새 파라미터 파일 `/etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml`에서 `jdbc_driver_path` 설정 파라미터를 제거합니다 .

위의 전제 조건이 충족되면, 호스팅 유형에 맞는 [설정 지침](#setup)을 따르세요.

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle
[3]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[10]: /ko/database_monitoring/architecture/
[15]: /ko/agent/versions/upgrade_between_agent_minor_versions/?tab=linux
[20]: /ko/agent/versions/upgrade_to_agent_v7/?tab=linux