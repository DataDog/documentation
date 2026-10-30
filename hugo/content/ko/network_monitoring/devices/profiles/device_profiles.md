---
aliases:
- /ko/network_monitoring/devices/guide/device_profiles/
further_reading:
- link: /network_monitoring/devices/profiles/build-ndm-profile/
  tag: 설명서
  text: NDM 프로필 빌드(고급)
- link: /network_monitoring/devices/profiles
  tag: 설명서
  text: NDM 프로필에 대해 자세히 알아보기
site_support_id: snmp_profile_manager
title: 장치 프로필 시작하기
---
## 개요 {#overview}

장치 프로필은 Datadog이 네트워크 장치 그룹에 대해 수집할 SNMP 메트릭을 정의합니다. SNMP 프로필 관리자는 해당 메트릭을 활성화하고 관리하는 과정을 안내합니다. 개별 장치에서 시작하여 다음 작업을 수행할 수 있습니다.

- 카테고리별로 그룹화된 메트릭을 탐색하고 클릭 한 번으로 활성화합니다.
- 프로필이 적용되는 장치를 관리하고 사용 가능한 메트릭을 활성화하거나 비활성화합니다.
- 메트릭 팩을 사용하여 AI 기반의 메트릭 일괄 추천을 받습니다.
- 내장된 감사 화면과 Agent 상태 점검 기능을 활용하여 프로필 변경 사항을 저장하고 Agent에 직접 배포합니다.

고급 프로필 구성에 대한 자세한 내용은 [NDM 프로필 빌드][3]를 참조하세요.

## 전제 조건 {#prerequisites}

- Datadog Agent `7.77.0` 버전 이상
- 조직에서 [Remote Configuration][14]이 활성화되어 있어야 합니다.
- 필수 권한:
  - [NDM Device Profiles View][20]: 프로필 페이지에 대한 읽기 전용 액세스를 제공합니다. (Datadog Standard 역할에 포함됩니다.)
  - [NDM Device Profiles Edit][20]: 장치 프로필을 편집할 수 있습니다. (Datadog Admin 역할에 포함됩니다.)

## 설정 {#setup}

1. `datadog.yaml`에서 `network_devices.default_scan.enabled: true`를 설정하여 장치 스캔을 활성화합니다.

   ```yaml
   network_devices:
       default_scan:
         enabled: true
   ```

2. 구성에서 `use_remote_config_profiles: true`를 설정합니다.

   SNMP Autodiscovery의 경우 `network_devices.autodiscovery` 아래에 있는 `datadog.yaml` 파일에 다음 내용을 추가합니다.

    ```yaml
    network_devices:
        autodiscovery:
          use_remote_config_profiles: true
    ```

   수동 SNMP 검사를 사용하는 경우 `init_config` 아래에 있는 `conf.d/snmp.d/conf.yaml` 파일에 다음 내용을 추가합니다.

    ```yaml
    init_config:
      use_remote_config_profiles: true
    ```

  **참고**: EXOS 33.1.1 장치는 펌웨어 버그로 인해 장치 스캔이 활성화되면 크래시가 발생할 수 있습니다. 해결 방법으로 장치 스캔을 전역에서 비활성화하거나(`network_devices.default_scan.enabled: false`) 장치 펌웨어를 업그레이드합니다. 이 문제가 발생하면 [Datadog 지원팀][21]에 문의합니다.

3. Agent에 사용자 지정 프로필이 있다면 [사용자 지정 프로필 업로드](#upload-custom-profiles) 지침에 따라 UI에 업로드합니다.

## 메트릭 구성 {#configure-metrics}

SNMP 프로필 관리자에 액세스하려면 NDM의 SNMP 장치에서 시작하는 것이 좋습니다. 각 SNMP 장치는 사용자 지정 프로필 또는 Datadog에서 제공하는 범용 프로필 중 하나에 연결됩니다. 장치에서 프로필을 편집하면 사용자 지정 버전이 자동으로 생성되므로 프로필을 처음부터 만들 필요가 없습니다.

1. [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Network Devices{{< /ui >}}][15]로 이동합니다.
2. SNMP로 모니터링되는 장치를 클릭하여 장치 사이드 패널을 엽니다.
3. {{< ui >}}View all metrics{{< /ui >}}를 클릭하여 해당 장치에서 자동으로 수집되는 메트릭 목록을 확인합니다.

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_view_all_metrics.png" alt="Metrics 섹션에서 'View all metrics' 버튼이 강조 표시된 NDM 장치 사이드 패널" style="width:90%;">}}

4. {{< ui >}}Metrics{{< /ui >}} 탭이 열리며 장치에 대해 수집된 모든 메트릭이 표시됩니다. 왼쪽 사이드바를 사용하여 {{< ui >}}Alerting Metrics{{< /ui >}}, {{< ui >}}Starred Metrics{{< /ui >}}, {{< ui >}}Key Metrics{{< /ui >}}, {{< ui >}}Additional Metrics{{< /ui >}} 카테고리별로 탐색합니다. 

   {{< img src="/network_device_monitoring/profile_onboarding/profile_manager_metrics_tab.png" alt="메트릭 그래프와 Alerting Metrics, Starred Metrics, Key Metrics, Additional Metrics 카테고리가 있는 왼쪽 사이드바가 표시된 NDM 장치 Metrics 탭" style="width:90%;">}}

5. 프로필 편집기를 열고 수집할 메트릭을 관리하려면 왼쪽 사이드바에서 {{< ui >}}Configure metrics{{< /ui >}}를 클릭합니다.

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_configure_metrics_2026_10.png" alt="왼쪽 사이드바에서 'Configure metrics'가 강조 표시된 NDM 장치 Metrics 탭" style="width:90%;">}}

   {{< ui >}}Metrics{{< /ui >}} 탭에서 프로필 편집기가 열리며, 프로필이 적용되는 장치에 대해 사용 가능한 모든 메트릭 목록이 이름, MIB, OID, 카테고리 및 호환성별로 정리되어 있습니다. 이는 Datadog이 장치에서 수집하는 데이터를 제어하기 위한 기본 화면입니다. 메트릭 목록을 카테고리별로 필터링하거나 검색 창을 사용하여 이름 또는 OID로 특정 메트릭을 찾을 수 있습니다.

6. 메트릭을 활성화하려면 메트릭 이름 옆의 {{< ui >}}Enable{{< /ui >}} 토글을 클릭합니다. 메트릭을 비활성화하려면 토글을 다시 클릭합니다. 변경 사항은 프로필을 저장하고 배포할 때까지 적용되지 않습니다.

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_profile_editor.png" alt="Metrics 탭에 사용 가능한 모든 메트릭이 이름, MIB, OID, 카테고리 및 호환성별로 나열된 SNMP 프로필 관리자 편집기" style="width:90%;">}}

### 장치 적용 범위 {#device-coverage}

{{< ui >}}Device Coverage{{< /ui >}} 탭에서는 프로필과 연결된 네트워크 장치와 프로필 적용 방식을 확인할 수 있습니다. 이 화면에서 장치 연결을 검증하고, 속성별로 장치를 필터링하며, SNMP 수집 문제를 식별합니다.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_device_coverage.png" alt="IP 주소, SysObjectID, 태그 및 마지막 SNMP 워크 상태와 함께 장치 목록이 표시된 Device Coverage 탭" style="width:90%;">}}


표 상단의 필터를 사용하여 SysObjectID, SysType, 공급업체, 모델, 장치 유형 또는 장치 이름을 기준으로 결과를 좁힙니다.

프로필과 연결된 장치를 업데이트하려면 {{< ui >}}Manage Devices{{< /ui >}}를 클릭합니다. 여기에서 다음 작업을 수행할 수 있습니다.

- 추가할 장치를 검색하거나 제거할 객체 ID를 선택합니다. 객체 ID를 제거하면 해당 ID와 일치하는 모든 장치가 프로필의 적용 범위에서 제외됩니다.
- 장치 유형, 이름 또는 기타 속성별로 장치 목록을 필터링합니다.

#### SNMP 워크 상태 {#snmp-walk-status}

{{< ui >}}Last SNMP walk{{< /ui >}} 열은 Datadog이 장치에 대한 쿼리를 성공적으로 실행했는지 나타냅니다.

- **실패**: SNMP 워크가 성공적으로 완료되지 않았습니다. 메트릭이 누락되었거나 불완전할 수 있습니다.
- **타임스탬프**: 마지막으로 성공한 SNMP 워크의 날짜와 시간을 나타냅니다.

SNMP 워크가 실패하는 경우 다음 사항을 확인합니다.

- 장치에서 SNMP가 올바르게 구성되어 있는지 확인합니다.
- 네트워크 연결을 통해 SNMP 폴링이 가능한지 확인합니다.
- 자격 증명 및 포트가 올바른지 확인합니다.

### 고급 옵션 {#advanced-options}

{{< ui >}}Advanced Options{{< /ui >}}를 클릭하여 장치 메타데이터 및 전역 태그 구성에 액세스합니다. 이 설정은 대부분의 사용 사례에서 필요하지 않습니다.

#### 장치 메타데이터 {#device-metadata}

{{< ui >}}Device metadata{{< /ui >}} 섹션은 Datadog이 SNMP OID를 장치 속성에 매핑하는 방법을 정의합니다. 각 메타데이터 필드는 다음과 같은 표준 장치 속성에 해당합니다.

- 장치 이름
- 벤더
- 모델
- OS 버전
- 위치

값은 SNMP OID를 사용하여 정의됩니다. 데이터 수집 중 Datadog은 이러한 OID를 쿼리하여 장치 메타데이터를 채웁니다. 예시는 다음과 같습니다.

- `1.3.6.1.2.1.1.5.0`은 장치 이름에 매핑됩니다.
- `1.3.6.1.2.1.1.1.0` 은 장치 설명에 매핑됩니다.

이 메타데이터는 UI에서 장치 세부 정보를 보강하고, 필터링 및 그룹화를 지원하며, 장치 전반에 걸쳐 일관된 태깅을 제공합니다.

연필 아이콘을 클릭하여 메타데이터 필드를 편집합니다. 메타데이터는 [Network Device Monitoring][15] 페이지에 검색 가능한 패싯으로 표시되며 장치 사이드 패널에도 표시됩니다.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_advanced_options_edit.png" alt="Device metadata가 선택된 Advanced Options 탭에 Device name, Vendor, Location 등의 메타데이터 필드 이름과 이에 매핑된 SNMP OID 값이 표로 표시된 화면" style="width:90%;">}}

다음 표는 메타데이터 필드에 대한 다양한 수정 옵션을 설명합니다.
| 수정    | 설명                                                                                         |
|-----------------|-----------------------------------------------------------------------------------------------------|
| {{< ui >}}No Modification{{< /ui >}} | 장치가 반환한 값이 태그 값으로 직접 사용됩니다.                                 |
| {{< ui >}}Format{{< /ui >}}          | 이는 [mac_address][5] 또는 [ip_address][6]일 수 있습니다.                                                    |
| {{< ui >}}Extract Value{{< /ui >}}   | 장치에서 제공한 SNMP 값에서 태그 값을 [추출][7]하는 데 사용되는 정규 표현식입니다. |
| {{< ui >}}Mapping{{< /ui >}}         | [프로필 형식 참조][8]를 확인하세요.                                                              |

#### 전역 태그 {#global-tags}

{{< ui >}}Global tags{{< /ui >}}를 사용하여 프로필과 연결된 장치의 모든 메트릭 및 장치 수준 메타데이터에 태그를 적용합니다. 전역 태그는 유사한 장치 간에 태그를 일관되게 적용하고 환경, 위치, 소유자 등의 컨텍스트를 추가하는 데 도움이 됩니다.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_global_tags.png" alt="Global tags가 선택된 Advanced Options 탭에 태그 이름과 해당 OID 값이 담긴 표 및 Add global tag 버튼이 표시된 화면" style="width:90%;">}}


### 메트릭 팩 탐색 {#explore-metric-packs}

메트릭 팩은 일괄 활성화할 수 있도록 선별된 메트릭 모음입니다. {{< ui >}}Metrics{{< /ui >}} 탭에서 메트릭 팩에 액세스할 수 있으며, 장치에 맞는 AI 기반 권장 사항이 제공됩니다.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_metric_packs.png" alt="상단에 Start with metric packs 배너가 표시되고 오른쪽 상단의 Metric packs 버튼이 강조 표시된 Metrics 탭" style="width:90%;">}}

메트릭 팩을 추가하려면 다음 단계를 따르세요.

1. {{< ui >}}Metrics{{< /ui >}} 탭에서 오른쪽 상단의 {{< ui >}}Metric packs{{< /ui >}}를 클릭하거나 {{< ui >}}Start with metric packs{{< /ui >}} 배너에서 {{< ui >}}View All{{< /ui >}}을 클릭합니다.
2. {{< ui >}}Add metric pack{{< /ui >}} 모달에서 사용 가능한 모든 팩을 탐색하거나 {{< ui >}}Suggested packs{{< /ui >}}를 클릭하여 AI 기반 권장 사항을 확인합니다.
3. 팩을 클릭하여 포함된 메트릭, 전역 태그 및 메타데이터를 미리 봅니다.
4. {{< ui >}}Add metric pack{{< /ui >}}을 클릭하여 팩의 모든 메트릭을 한 번에 활성화합니다.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_add_metric_pack.png" alt="왼쪽에 팩 목록이, 오른쪽에 선택한 팩의 메트릭, 전역 태그 및 메타데이터 미리 보기가 표시된 Add metric pack 모달" style="width:90%;">}}

## 인벤토리 페이지 {#inventory-page}

모든 프로필을 한곳에서 보려면 [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Network Devices{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1]로 이동하여 왼쪽 사이드바에서 {{< ui >}}SNMP Profile Manager{{< /ui >}}를 클릭합니다. 이 페이지에는 Datadog 기본 제공 프로필과 사용자가 생성한 모든 사용자 지정 프로필이 목록으로 표시됩니다.

{{< img src="/network_device_monitoring/profile_onboarding/snmp_profile_manager.png" alt="이름, 공급업체, 장치 적용 범위 및 마지막 업데이트 열로 구성된 프로필 목록이 표시된 SNMP Profile Manager 페이지" style="width:90%;">}}

{{< ui >}}Device vendor{{< /ui >}} 필터 또는 검색 창을 사용하여 프로필 이름, 공급업체 또는 장치 이름을 기준으로 목록을 좁힙니다. **일치하는 장치가 있는 프로필만 표시**를 활성화하여 연결된 장치가 없는 프로필을 숨깁니다.

Agent의 Remote Config가 잘못 구성된 경우 페이지 상단에 경고 배너가 표시됩니다. {{< ui >}}Fix Agents{{< /ui >}}를 클릭하여 문제를 해결합니다.

프로필 편집기를 열려면 아무 프로필이나 클릭합니다. Datadog에서 제공하는 프로필의 경우, 편집하면 사용자를 대신하여 사용자 지정 버전이 생성됩니다.

프로필 행 오른쪽에 있는 점 3개 메뉴를 클릭하면 다음 작업을 수행할 수 있습니다.

- {{< ui >}}Edit profile{{< /ui >}}: 해당 프로필에 대한 프로필 편집기를 엽니다.
- {{< ui >}}Delete profile{{< /ui >}}: 사용자 지정 프로필을 영구적으로 삭제합니다.
- {{< ui >}}Review related devices{{< /ui >}}: 해당 프로필과 일치하는 장치만 표시하도록 필터링된 NDM 화면으로 이동합니다.

### 프로필 다운로드 {#download-profiles}

프로필을 YAML 파일로 다운로드하려면 페이지 오른쪽 상단의 {{< ui >}}Download Profiles{{< /ui >}}를 클릭합니다. 그러면 사용자 지정 프로필의 `yaml` 파일이 포함된 `.zip` 번들이 생성됩니다. Agent에 프로필을 수동으로 적용하려면 다음 단계를 따르세요.

1. `yaml` 파일을 해당 Agent가 설치된 각 환경의 [프로필 디렉터리][13]에 배치합니다.
2. Datadog Agent를 재시작합니다.
3. NDM이 일치하는 장치로부터 메트릭을 수신하고 있는지 확인합니다.

### 사용자 지정 프로필 업로드 {#upload-custom-profiles}

기존 SNMP 프로필을 프로필 관리자에 업로드하려면 다음 단계를 따르세요.

1. [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Network Devices{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1]로 이동하여 왼쪽 사이드바에서 {{< ui >}}SNMP Profile Manager{{< /ui >}}를 클릭합니다.
2. 페이지 오른쪽 상단 모서리에 있는 {{< ui >}}Upload Profiles{{< /ui >}}를 클릭합니다.
3. 업로드 모달에서 `.zip` 파일을 드래그 앤 드롭하거나 {{< ui >}}browse files{{< /ui >}}를 클릭하여 파일을 선택합니다. `.zip` 파일에는 `.yaml` 형식의 SNMP 프로필이 하나 이상 포함되어야 합니다.

   {{< img src="/network_device_monitoring/profile_onboarding/upload_custom_profile_2.png" alt=".yaml 형식의 SNMP 프로필이 포함된 .zip 파일을 업로드할 수 있는 드래그 앤 드롭 영역이 표시된 Upload custom SNMP profile 모달" style="width:60%;">}}

4. {{< ui >}}Upload profiles{{< /ui >}}를 클릭합니다.

업로드가 완료되면 프로필 편집기에서 프로필을 사용할 수 있습니다. 그런 다음 다른 사용자 지정 프로필과 동일한 방식으로 업로드된 프로필에 대한 메트릭, 장치 범위 및 고급 옵션을 관리할 수 있습니다.

## 프로필 상속{#profile-inheritance}

프로필 상속은 백그라운드에서 자동으로 수행됩니다. 프로필을 편집하면 Datadog은 해당 프로필의 사용자 지정 확장 버전을 생성합니다. 상속을 수동으로 구성할 필요는 없습니다. Datadog은 기본 상속 프로필(`_base.yaml`, `_generic-if.yaml`, `_generic-ip.yaml`, `_generic-ospf.yaml`, `_generic-tcp.yaml` 및 `_generic-udp.yaml`)을 자동으로 포함합니다.

고급 상속 구성에 대한 자세한 내용은 [프로필 형식 참조][3]를 참조합니다.

## 문제 해결 {#troubleshooting}

### 프로필이란 무엇인가요? {#what-is-a-profile}
* 프로필은 장치에서 수집할 메타데이터, 메트릭 및 태그를 정의하는 구성 파일입니다. 자세한 내용은 [메타데이터 정의][17]를 참조합니다.

### 장치 스캔이란 무엇인가요? {#what-is-a-device-scan}
* 장치 스캔은 장치의 전체 SNMP 워크를 수행하여 사용 가능한 모든 데이터를 수집하고 UI에 표시할 수 있도록 Datadog으로 포워딩합니다. 이 프로세스는 장치에서 사용 가능한 OID를 식별하고 프로필 편집기에서 사용 가능한 메트릭 목록을 채웁니다.

### 일치하는 장치가 없는 이유는 무엇인가요? {#why-are-there-no-matching-devices}
일치하는 장치가 검색되지 않는 경우 다음과 같은 원인이 있을 수 있습니다.
  * **프로필이 적용되었지만 일치하는 장치가 없음**:
    * 프로필은 SysObjectID를 기준으로 장치와 매칭됩니다. 프로필의 SysObjectID가 모니터링 중인 장치 중 하나 이상과 일치하는지 확인합니다.
  * **여러 프로필이 동일한 SysObjectID를 가짐**:
    * 여러 프로필이 동일한 SysObjectID를 공유하면 Agent 수준에서 매칭 충돌이 발생할 수 있습니다. 각 SysObjectID가 하나의 프로필에만 할당되었는지 확인하세요.

### 장치가 스캔되지 않는 이유는 무엇인가요? {#why-would-a-device-not-be-scanned}

장치 스캔이 완료되는 데 최대 10분이 소요될 수 있습니다. UI에서 스캔 진행 상황을 모니터링할 수 있습니다.

장치가 스캔되지 않는 경우 다음과 같은 원인이 있을 수 있습니다.

- **기본 장치 스캔이 비활성화됨**: 장치 스캔은 기본적으로 비활성화되어 있습니다. `datadog.yaml`에서 `network_devices.default_scan.enabled: true`를 설정합니다.
- **무한 루프 탐지됨**: 스캔이 무한 루프를 탐지하여 종료되었습니다. Agent 로그에서 `next OID 'X' is not after last OID 'Y'`를 확인합니다. 이는 일부 장치 펌웨어에서 발생할 수 있습니다.
- **장치 펌웨어**: 장치 스캔을 활성화하기 전에 [Setup](#setup)의 펌웨어 경고를 확인합니다.

{{< site-region region="gov,gov2" >}}
- **GovCloud**: UI에서 장치 스캔을 트리거할 수 없습니다. 기본 장치 스캔(`network_devices.default_scan.enabled: true`)을 활성화하고 특정 장치에 대해 Agent에서 수동으로 스캔을 실행합니다.
{{< /site-region >}}

### 수집기에서 Remote Configuration이 활성화되지 않음 {#remote-configuration-is-not-enabled-on-collectors}

Profile Manager를 사용하려면 다음 조건을 충족해야 합니다.

- Agent 버전 `7.77.0` 이상
- [Remote Configuration][14] 활성화
- `use_remote_config_profiles: true`를 SNMP 구성에 설정
장치 스캔을 위한 - `network_devices.default_scan.enabled: true` 설정

Remote Configuration이 활성화되지 않은 경우, UI를 통해 장치 스캔을 트리거하거나 프로필을 Agent와 동기화할 수 없습니다. 프로필을 수동으로 적용하려면 [프로필 다운로드](#download-profiles)를 참조하세요.

Datadog은 UI에서 제공하는 모든 기능을 활용하고 Agent를 직접 조작하는 작업을 최소화할 수 있도록 Remote Configuration을 활성화할 것을 권장합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/profiles
[2]: /ko/network_monitoring/devices/profiles/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
[5]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-mac_address
[6]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-ip_address
[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[8]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#mapping-index-to-tag-string-value
[13]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[14]: /ko/agent/remote_config
[15]: https://app.datadoghq.com/devices
[17]: /ko/network_monitoring/devices/profiles/#metadata-definition-by-profile
[20]: /ko/account_management/rbac/permissions/#network-device-monitoring
[21]: /ko/help/