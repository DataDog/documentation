---
aliases:
- /ko/agent/guide/datadog-disaster-recovery/
further_reading:
- link: agent/remote_config/?tab=configurationyamlfile
  tag: 설명서
  text: Remote Configuration
- link: /getting_started/site/
  tag: 설명서
  text: Datadog 사이트 시작하기
- link: https://www.datadoghq.com/blog/ddr-mitigates-cloud-provider-outages/
  tag: 블로그
  text: Datadog Disaster Recovery는 클라우드 제공업체 중단 문제 완화
site_support_id: datadog_disaster_recovery
title: Datadog Disaster Recovery
---
## 개요 {#overview}

Datadog Disaster Recovery(DDR)는 클라우드 서비스 제공업체 리전이나 클라우드 제공업체 리전 내에서 실행되는 Datadog 서비스에 영향을 미칠 수 있는 이벤트가 발생하는 동안 관측 가능성의 연속성을 제공합니다. DDR을 사용하면 대체 Datadog 사이트에서 실시간 관측 가능성을 복구하여 중요한 관측 가능성 목표를 달성할 수 있습니다.

또한 정기적으로 재해 복구 훈련을 실시하여 중단 이벤트 발생 시 복구할 수 있는 능력을 테스트할 뿐만 아니라 비즈니스 및 규제 준수 요구 사항도 충족할 수 있습니다.

## 전제 조건 {#prerequisites}
필요한 Datadog Agent의 최소 버전은 사용하려는 텔레메트리 유형에 따라 다릅니다.

|지원되는 텔레메트리 |지원되는 제품          |필요한 Agent 버전 | 
|--------------------|----------------------------|-----------------------|
|로그                |로그                        | v7.54+                |
|메트릭             |Infrastructure Monitoring   | v7.54+                |
|트레이스              |APM                         | v7.68+                |



<div class="alert alert-info">
Datadog은 추가 제품에 대한 DDR 지원 요청을 지속적으로 검토하고 있습니다. 위에서 다루지 않은 특정 요구 사항이나 향후 기능에 대해 알아보려면 <a href="mailto:disaster-recovery@datadoghq.com">Disaster Recovery 팀</a>에 문의하세요.
</div>
<br>

## 설정 {#setup}

Datadog Disaster Recovery를 활성화하려면 다음 단계를 따르세요. 단계와 관련하여 궁금한 점이 있으면 [Customer Success Manager][14] 또는 [Datadog Support][15]에 문의하세요.

### 1. DDR 조직을 생성하고 기본 조직에 연결 {#1-create-a-ddr-org-and-link-it-to-your-primary-org}

{{% collapse-content title="DDR 조직 생성 및 공유" level="h4" %}}

<div class="alert alert-info">필요한 경우 Datadog에서 대신 설정해 드릴 수 있습니다.</div>

#### DDR 조직 생성 {#create-your-ddr-org}

1. [Datadog 시작하기][16]로 이동합니다. 이 페이지에 액세스하려면 현재 세션에서 로그아웃하거나 시크릿 모드를 사용해야 할 수 있습니다.
2. 기본 사이트와 다른 Datadog 사이트를 선택합니다(예: `US1`를 사용하는 경우 `EU` 또는 `US5`을 선택).
3. 메시지에 따라 계정을 생성합니다.

모든 Datadog 사이트는 지리적으로 분리되어 있습니다. 선택할 수 있는 사이트는 [Datadog 사이트 목록][17]을 참조하세요.

클라우드 제공업체 통합을 사용하여 Datadog으로 텔레메트리를 전송하는 경우에도, DDR 조직에 클라우드 제공업체 계정을 추가해야 합니다. DDR 사이트가 대기 상태(장애 조치 상태가 아닌 경우)일 때는 Datadog에서 클라우드 제공업체를 사용하여 텔레메트리 데이터를 수신하지 않습니다.

#### DDR 조직 정보를 Datadog과 공유합니다. {#share-the-ddr-org-information-with-datadog}

새 조직 이름을 [Customer Success Manager][14]에게 이메일로 보내세요. 그러면 Customer Success Manager가 이 새 조직을 DDR 조직으로 설정합니다.

{{% /collapse-content %}}

{{% collapse-content title="공개 ID를 검색하고 DDR 조직과 기본 조직 연결" level="h4" %}}

보안상의 이유로 Datadog에서는 사용자를 대신하여 조직을 연결할 수 없습니다.

Datadog 팀이 DDR 조직을 설정한 후, Datadog [공개 API 엔드포인트][1]를 사용하여 기본 조직과 DDR 조직의 공개 ID를 검색하세요.

DDR 조직을 기본 조직에 연결하려면 다음 단계를 따르세요.

- 기본 조직의 애플리케이션 키에 `disaster_recovery_status_write` 범위를 추가합니다.
- 다음 명령을 실행하되, 자리 표시자를 적절한 값으로 바꿉니다.

```shell
export PRIMARY_DD_API_KEY=<PRIMARY_ORG_API_KEY>
export PRIMARY_DD_APP_KEY=<PRIMARY_ORG_APP_KEY>
export PRIMARY_DD_API_URL=<PRIMARY_ORG_API_SITE>

export DDR_ORG_ID=<DDR_ORG_PUBLIC_ID>
export PRIMARY_ORG_ID=<PRIMARY_ORG_PUBLIC_ID>
export USER_EMAIL=<USER_EMAIL>
export CONNECTION='{"data":{"id":"'${PRIMARY_ORG_ID}'","type":"hamr_org_connections","attributes":{"TargetOrgUuid":"'${DDR_ORG_ID}'","HamrStatus":1,"ModifiedBy":"'${USER_EMAIL}'", "IsPrimary":true}}}'

curl -v -H "Content-Type: application/json" -H \
"dd-api-key:${PRIMARY_DD_API_KEY}" -H \
"dd-application-key:${PRIMARY_DD_APP_KEY}" --data "${CONNECTION}" --request POST ${PRIMARY_DD_API_URL}/api/v2/hamr
```

조직을 연결하면 장애 조치 조직에만 이 배너가 표시됩니다.

{{< img src="agent/guide/ddr/ddr-banner.png" alt="DDR 조직의 DDR 배너" >}}

{{% /collapse-content %}}

### 2. 액세스, 통합, 동기화 및 Agent 설정 {#2-set-up-access-integrations-syncing-and-agents}

{{% collapse-content title="DDR 조직에 Single Sign On을 설정" level="h4" %}}

**Datadog은 Single Sign On(SSO) 사용을 권장합니다**. 이를 통해 모든 사용자가 중단이 발생한 동안 Disaster Recovery 조직에 로그인할 수 있습니다.

DDR 조직의 [조직 설정][2]으로 이동하여 사용자를 위한 [SAML][3] 또는 {{< ui >}}Google Login{{< /ui >}}을 구성하세요.

관리형 동기화를 사용하면 기본 조직에서 DDR 조직으로 사용자 계정을 복제합니다. Datadog은 사용자가 비밀번호를 재설정하지 않고도 장애 조치 중에 DDR 조직에 액세스할 수 있도록 [SAML을 사용한 Just-in-Time 프로비저닝][4]을 구성하는 것을 권장합니다.

{{% /collapse-content %}}

{{% collapse-content title="클라우드 통합 설정(AWS, Azure, Google Cloud)" level="h4" %}}

설정 단계는 [AWS][5], [Azure][6] 및 [Google Cloud][7] 통합을 참조하세요.

클라우드 통합은 기본 조직과 DDR 조직 모두에 구성해야 하지만, 한 번에 하나의 조직에서만 실행됩니다. 기본적으로는 기본 조직에서 실행되며, 장애 조치 중에는 DDR 조직에서 실행됩니다.

자세한 내용은 [클라우드 통합 장애 조치](#id-for-cloud) 섹션을 참조하세요.

{{% /collapse-content %}}

{{% collapse-content title="관리형 리소스 동기화를 위한 자격 증명 설정" level="h4" id="syncing-data" %}}

Datadog은 오픈 소스 [datadog-sync-cli][8] 도구를 사용하여 사용자를 대신하여 리소스 동기화를 관리합니다. 이 도구를 직접 실행하거나 운영할 필요는 없습니다.

관리형 동기화를 사용하면 정기적인 일정에 따라 기본 조직에서 DDR 조직으로 리소스를 복제합니다. 복제되는 리소스에는 대시보드, 모니터, 사용자, 노트북 및 [34개 이상의 기타 리소스 유형][9]이 포함됩니다. 이러한 일정에 따라 복제가 실행되므로 중단이 발생하기 전에 DDR 조직이 최신 상태로 유지됩니다.

**사용자는 각 Datadog 사이트로 범위가 지정됩니다.** 관리형 동기화를 사용하면 사용자 계정이 DDR 조직에 복제됩니다. 단, 사용자가 DDR 조직에 처음 로그인할 때 비밀번호를 재설정해야 할 수도 있습니다. Datadog은 사용자가 수동으로 비밀번호를 재설정하지 않고도 DDR 조직에 액세스할 수 있도록 [SAML을 사용한 Just-in-Time 프로비저닝][4]을 구성하는 것을 권장합니다.

**관리형 동기화는 Datadog [서비스 계정][10]을 사용합니다.** 온보딩 중에 DDR 조직에 서비스 계정을 생성하여 기본 조직의 리소스를 조회하고 복제하세요. 관리형 동기화로 동기화된 리소스는 가능한 경우 원래 소유자에 해당하는 사용자에게 프로비저닝됩니다.

{{% /collapse-content %}}

{{% collapse-content title="Remote Configuration 활성화 [**권장]" level="h4" %}}

[Remote Configuration(RC)][11]을 사용하면 인프라에 배포된 Datadog Agent의 동작을 원격으로 구성하고 변경할 수 있습니다.

Remote Configuration은 사용자의 DDR 조직을 포함한 새 조직에서 기본적으로 활성화됩니다. 새로 생성하는 모든 API 키는 Agent와 함께 사용할 수 있도록 RC가 활성화됩니다. 자세한 내용은 [Remote Configuration 설명서][11]를 참조하세요.

Datadog에서는 장애 조치를 보다 효과적으로 제어를 위해 Remote Configuration 사용을 강력히 권장합니다. RC의 대안으로 Agent를 수동으로 구성하거나 Puppet, Ansible 또는 Chef와 같은 구성 관리 도구를 사용할 수도 있습니다.

{{% /collapse-content %}}

{{% collapse-content title="장애 조치 또는 훈련 중 DDR 조직으로 텔레메트리 이중 전송" level="h4" %}}


이중 전송을 활성화하려면 Datadog에서는 대규모 환경에서의 관리를 위해 [Fleet Automation][12] 사용을 권장합니다. 또는 `datadog.yaml` 파일을 수정하여 수동으로 구성할 수도 있습니다.

성능 및 복구 목표 시간(RTO)을 측정할 수 있도록 장애 조치 테스트를 위한 별도의 시간대를 지정하려면 Datadog Customer Success Manager에 문의하세요.

{{< tabs >}}
{{% tab "Fleet Automation 사용(권장)" %}}

장애 조치 조직의 [Fleet Automation][100] 페이지에 있는 {{< ui >}}Configure Agents{{< /ui >}} 탭에서 장애 조치 정책을 생성하거나 기존 정책을 재사용하여 Agent 플릿에 적용할 수 있습니다. 정책을 활성화하면 곧 Agent가 기본 관측 가능성 사이트와 DDR(장애 조치) 관측 가능성 사이트 모두에 텔레메트리를 이중 전송하기 시작합니다.

장애 조치 정책을 생성하려면 {{< ui >}}Create Failover Policy{{< /ui >}}를 클릭합니다.

{{< img src="/agent/guide/ddr/ddr-fa-policy.png" alt="DDR 정책 관리" style="width:80%;" >}}

그런 다음, 안내에 따라 장애 조치가 필요한 호스트 및 텔레메트리(메트릭, 로그, 트레이스)의 범위를 지정합니다.

{{< img src="/agent/guide/ddr/ddr-fa-policy-scope.png" alt="장애 조치에 필요한 호스트 및 텔레메트리 범위 지정" style="width:80%;" >}}

<div class="alert alert-danger">Cloud Integrations는 기본 또는 DDR Datadog 사이트 중 한 곳에서만 실행할 수 있으며, 두 사이트에서 동시에 실행할 수는 없습니다. 따라서 장애 조치를 수행하면 기본 사이트에서는 Cloud Integration 데이터 수집이 중단됩니다. <strong>통합 장애 조치 중에는 Integrations가 DDR 데이터 센터에서만 실행됩니다.</strong> 장애 조치가 해제되면 통합 데이터를 기본 조직에서 다시 수집하도록 장애 조치 정책을 비활성화합니다.</div>

[100]: https://app.datadoghq.com/fleet

{{% /tab %}}

{{% tab "수동으로" %}}

장애 조치 또는 장애 조치 훈련 중에 아래 예시와 같이 Datadog Agent의 `datadog.yaml` 구성 파일을 업데이트하고 Agent를 다시 시작합니다.

- `enabled: true` Agent가 전송할 수 있도록 허용합니다. {{< tooltip text="metadata" tooltip="Agent 및 인프라 호스트에 대한 데이터입니다. 예: `host name`, `host tags`, `Agent version`" >}} DDR Datadog 사이트로 전송하여 DDR 조직에서 Agent 및 인프라 호스트를 조회할 수 있습니다. 이를 통해 장애 조치 조직에서 Agent 및 인프라 호스트를 확인할 수 있습니다.

- `failover_metrics`, `failover_logs` 및 `failover_apm`은 기본적으로 `false`입니다. 이를 `true`로 설정하면 Agent가 전송을 시작합니다. {{< tooltip text="telemetry" tooltip="Datadog 플랫폼으로 전송되는 데이터입니다. 예: `logs`, `metrics`, `traces`" >}} DDR 조직으로

```shell
multi_region_failover:
  enabled: true
  failover_metrics: false
  failover_logs: false
  failover_apm: false
  site: <DDR_SITE>  # For example "site: us5.datadoghq.com" for a US5 site
  api_key: <DDR_SITE_API_KEY>
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="DNS 기반 장애 조치 구성" level="h4" %}}

DNS 기반 장애 조치는 Agent 기반 장애 조치를 보완하는 방식입니다. Agent를 보조 사이트 엔드포인트로 구성하는 대신, 모든 데이터 소스가 Datadog에서 제공하는 단일 사용자 지정 수집 URL로 텔레메트리를 전송하도록 구성합니다. 장애 조치 이벤트가 발생하면 Datadog에서 해당 URL의 DNS 레코드를 업데이트하여 기본 사이트에서 DDR 사이트로 트래픽을 리디렉션합니다.

<div class="alert alert-info">DNS 장애 조치는 전부 아니면 전무(all-or-nothing) 방식입니다. 사용자 지정 엔드포인트를 사용하는 모든 텔레메트리 소스가 동시에 전환됩니다.</div>

#### 사용자 지정 DNS 엔드포인트 수신 {#receive-your-custom-dns-endpoint}

DNS 기반 장애 조치를 사용하기로 선택하면 Datadog에서 조직에 대한 사용자 지정 수집 URL을 프로비저닝합니다(예: `<your-org>.intake.datadoghq.com`). 기본 Datadog 수집 URL 대신 이 엔드포인트로 텔레메트리를 전송하도록 모든 데이터 소스(Agent, 로그 적재기 및 사용자 지정 계측)를 구성합니다. 이는 한 번만 구성하면 되는 설정 변경입니다.

#### DNS 장애 조치 트리거 {#trigger-a-dns-failover}

DNS 장애 조치를 시작하려면 [Customer Success Manager][14] 또는 [Datadog Support][15]를 통해 Datadog에 문의하세요. Datadog은 DNS 레코드를 업데이트하여 트래픽을 기본 사이트에서 DDR 사이트로 리디렉션합니다. 장애 조치가 시작된 시점부터의 복구 목표 시간(RTO)은 2시간입니다.

<div class="alert alert-info">DDR 조직에서 고객이 직접 DNS 장애 조치를 트리거할 수 있는 기능이 미리 보기로 제공됩니다. 자세한 내용을 알아보려면 <a href="mailto:success@datadoghq.com">Customer Success Manager</a>에게 문의하세요.</div>

{{% /collapse-content %}}

### 3. 다양한 환경에서 장애 조치 테스트 실행 {#3-run-failover-tests-in-various-environments}

{{% collapse-content title="Agent 기반 환경에서 DDR 장애 조치 활성화 및 테스트" level="h4" %}}

Agent의 장애 조치를 트리거하려면 DDR 조직의 [Fleet Automation][13]에서 정책 중 하나를 클릭한 다음 {{< ui >}}Enable{{< /ui >}}을 클릭하세요. 장애 조치가 진행되면 각 호스트의 상태가 업데이트됩니다.

{{< img src="/agent/guide/ddr/ddr-fa-policy-enable3.png" alt="DDR 조직에서 장애 조치 정책 활성화" style="width:80%;" >}}

환경에 맞는 단계를 따라 DDR 장애 조치를 활성화하고 테스트합니다.

{{< tabs >}}
{{% tab "비컨테이너화된 환경의 Agent" %}}

비컨테이너화된 환경에 배포된 Agent의 경우 아래 Agent CLI 명령을 사용하세요.

```shell
agent config set multi_region_failover.failover_metrics true
agent config set multi_region_failover.failover_logs true
agent config set multi_region_failover.failover_apm true
```

{{% /tab %}}

{{% tab "컨테이너화된 환경의 Agent" %}}

Kubernetes와 같은 컨테이너화된 환경에서 Agent를 실행하는 경우에도 Agent 명령줄 도구를 사용할 수 있으나, Agent가 실행 중인 컨테이너에서 실행해야 합니다. 필요에 따라 다음 중 하나를 사용하여 변경할 수 있습니다.

- [kubectl](#using-kubectl)
- [Agent 구성 파일(`datadog.yaml`)](#using-the-agent-configuration-file)
- [Helm 차트 또는 Datadog Operator](#using-the-helm-chart-or-datadog-operator)

##### kubectl 사용{#using-kubectl}

다음은 공식 Helm 차트 또는 Datadog Operator로 배포된 Datadog Agent 포드의 메트릭 및 로그를 장애 조치하기 위해 `kubectl`을 사용하는 예시입니다. `<POD_NAME>`은 Agent 포드의 이름으로 바꿔야 합니다.

```shell
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_metrics true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_logs true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_apm true
```

##### Agent 구성 파일 사용 {#using-the-agent-configuration-file}

또는 기본 Agent 구성 파일(`datadog.yaml`)에 아래 설정을 지정하고 Datadog Agent를 다시 시작하여 변경 사항을 적용할 수 있습니다.

```shell
multi_region_failover:
  enabled: true
  failover_metrics: true
  failover_logs: true
  failover_apm: true
  site: NEW_ORG_SITE
  api_key: NEW_SITE_API_KEY
```

##### Helm 차트 또는 Datadog Operator 사용 {#using-the-helm-chart-or-datadog-operator}

사용자 지정 구성을 지정해야 하는 경우 공식 Helm 차트 또는 Datadog Operator를 사용하여 이와 유사하게 변경할 수 있습니다. 그렇지 않은 경우 다음과 같이 환경 변수로 설정할 수 있습니다.

```shell
DD_MULTI_REGION_FAILOVER_ENABLED=true
DD_MULTI_REGION_FAILOVER_FAILOVER_METRICS=true
DD_MULTI_REGION_FAILOVER_FAILOVER_LOGS=true
DD_MULTI_REGION_FAILOVER_FAILOVER_APM=true
DD_MULTI_REGION_FAILOVER_SITE=ADD_NEW_ORG_SITE
DD_MULTI_REGION_FAILOVER_API_KEY=ADD_NEW_SITE_API_KEY
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Cloud Integrations에서 DDR 장애 조치 활성화 및 테스트" level="h4" id="id-for-cloud" %}}

DDR 조직의 랜딩 페이지에서 Cloud Integrations의 장애 조치를 테스트할 수 있습니다:

{{< img src="/agent/guide/ddr/ddr-failover-main-page.png" alt="DDR 조직에서 장애 조치 정책 활성화" style="width:80%;" >}}

장애 조치 랜딩 페이지에서 DDR 조직의 상태를 확인하거나 {{< ui >}}Fail over your integrations{{< /ui >}}를 클릭하여 Cloud Integrations의 장애 조치를 테스트할 수 있습니다.

장애 조치가 해제되면 DDR 조직에서 **장애 조치 정책을 비활성화**하여 통합 데이터를 기본 조직에서 다시 수집합니다.

테스트 중에는 통합 텔레메트리가 두 조직에 분산되어 전송됩니다. 장애 조치 테스트를 취소하면 Integrations가 다시 기본 데이터 센터에서 실행됩니다.

{{% /collapse-content %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/organizations/#list-your-managed-organizations
[2]: https://app.datadoghq.com/organization-settings/users
[3]: /ko/account_management/saml/#overview
[4]: /ko/account_management/saml/#just-in-time-jit-provisioning
[5]: /ko/integrations/amazon-web-services/
[6]: /ko/integrations/azure/
[7]: /ko/integrations/google-cloud-platform/?tab=organdfolderlevelprojectdiscovery#overview
[8]: https://github.com/DataDog/datadog-sync-cli
[9]: https://github.com/DataDog/datadog-sync-cli#supported-resources
[10]: /ko/account_management/org_settings/service_accounts/
[11]: /ko/agent/remote_config/?tab=configurationyamlfile
[12]: /ko/agent/fleet_automation/#overview
[13]: https://app.datadoghq.com/fleet
[14]: mailto:success@datadoghq.com
[15]: https://www.datadoghq.com/support/
[16]: https://app.datadoghq.com/signup
[17]: /ko/getting_started/site#access-the-datadog-site