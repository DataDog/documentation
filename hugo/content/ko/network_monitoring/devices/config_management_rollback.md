---
description: NDM에서 네트워크 장치를 이전 구성으로 롤백하세요.
further_reading:
- link: /network_monitoring/devices/config_management
  tag: 문서
  text: Network Configuration Management
- link: /actions/private_actions/
  tag: 문서
  text: Private Action Runner
title: Network Configuration Management 롤백
---
## 개요 {#overview}

Network Configuration Management(NCM) 롤백을 사용하면 Datadog에서 직접 네트워크 장치를 이전 구성으로 복원할 수 있습니다. 롤백은 [Private Action Runner(PAR)][1]를 사용하여 선택한 구성을 장치에 다시 적용합니다.

롤백은 다음 공급업체 및 플랫폼에서 지원됩니다.

- Cisco IOS
- Arista (EOS)

## 전제 조건 {#prerequisites}

- 장치에 대해 [Network Configuration Management][2]가 설정되어 있어야 합니다.
- Datadog Agent는 `7.83.0` 버전 이상이어야 합니다.
- Agent의 IPC 포트(기본값 `5001`)에서 동일한 호스트 또는 네트워크를 통해 연결할 수 있는 [Private Action Runner][1]

## 설정 {#setup}

### Agent {#agent}

1. 롤백을 활성화하려면 `datadog.yaml`에 다음을 추가합니다.

   ```yaml
   network_devices:
     config_management:
       rollback:
         enabled: true
   ```

   또는 `network_devices.config_management.rollback.enabled` 구성 옵션을 `true`로 설정합니다.

2. `conf.d/network_config_management.d/conf.yaml`에서 필요시 Agent의 구성 인벤토리 보고 빈도를 설정합니다.

   ```yaml
   init_config:
     ## @param inventory_report_max_interval - integer - optional - default: 3600 (1 hour)
     ## Maximum interval, in seconds, between inventory reports.
     inventory_report_max_interval: 3600
   ```

3. 필요시 롤백 가능한 구성을 보관하는 로컬 저장소를 구성합니다.

   ```yaml
   init_config:
     store:
       ## @param min_configs_per_device - integer - optional - default: 2
       ## Minimum number of configurations to retain per device, regardless of age.
       min_configs_per_device: 2
       ## @param max_configs_per_device - integer - optional - default: 24
       ## Maximum number of configurations to retain per device before older ones are evicted.
       max_configs_per_device: 24
       ## @param max_raw_config_store_bytes - integer - optional - default: 2000000000 (2 GB)
       ## Maximum size, in bytes, of the local configuration store before older configurations are evicted.
       max_raw_config_store_bytes: 2000000000
   ```

4. Agent 프로세스는 롤백 데이터가 로컬에 저장되는 `run_path` 디렉터리에 대한 쓰기 권한이 필요합니다.

5. 구성 변경 사항을 적용하려면 Agent를 재시작합니다.

### Private Action Runner {#private-action-runner}

1. Agent의 IPC 포트에서 연결할 수 있는 호스트에 [Private Action Runner 설정][1]을 구성합니다.
2. `/etc/datadog-agent/datadog.yaml`의 `private_action_runner.actions_allowlist` 섹션에 `com.datadoghq.remoteaction.networkconfigmanagement.rollbackConfig`를 추가합니다. 자세한 내용은 [Runner 허용 목록 변경][3]을 참조하세요.
3. Datadog에 Runner를 등록하고 실행 그룹에 할당합니다. 해당 그룹 내에서 `com.datadoghq.remoteaction.networkconfigmanagement.rollbackConfig` 작업을 허용하는 정책을 생성합니다.
   - 정책은 `NCM Device Config Write` 역할을 가진 사용자에게 `Editor` 액세스 권한을 부여해야 합니다.

   {{< img src="/network_device_monitoring/config_mgmt/execution_group_policy.png" alt="실행 그룹 정책에 NCM 쓰기 역할을 추가하는 방법을 보여주는 스크린샷" style="width:100%;" >}}

### 권한 {#permissions}

롤백은 다음 NCM 권한을 사용합니다.

| 권한 | 허용 |
|---|---|
| NCM 읽기 | 장치 구성 보기 |
| NCM 쓰기 | 롤백 실행 |


## 롤백 실행 {#trigger-a-rollback}

1. NDM 장치 보기에서 장치의 [Configuration 탭][2]으로 이동합니다.
2. 롤백할 구성 버전을 선택합니다. 사이드 패널에는 해당 버전에 대한 {{< ui >}}Rollback{{< /ui >}} 버튼이 표시됩니다.
3. {{< ui >}}Rollback{{< /ui >}}을 클릭한 다음 확인 모달에서 차이점을 검토합니다.
4. 확인하려면 {{< ui >}}Rollback{{< /ui >}}을 다시 클릭합니다.

   {{< img src="/network_device_monitoring/config_mgmt/config_rollback.png" alt="롤백이 시작되었을 때의 모습과 예상되는 결과를 보여주는 스크린샷" style="width:100%;" >}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/private_actions/
[2]: /ko/network_monitoring/devices/config_management/#viewing-configurations
[3]: /ko/actions/private_actions/set_up_agent_based/?tab=linux#change-the-allowlist