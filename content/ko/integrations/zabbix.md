---
app_id: zabbix
app_uuid: 9b7022c4-95c7-4872-83b6-7eaba2cc9d88
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: zabbix.system.uptime
      metadata_path: metadata.csv
      prefix: zabbix.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10166
    source_type_name: Zabbix(커뮤니티 버전)
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: KosukeKamiya@users.noreply.github.com
  support_email: KosukeKamiya@users.noreply.github.com
categories:
- 네트워크
- 이벤트 관리
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zabbix/README.md
display_on_public_website: true
draft: false
git_integration_title: zabbix
integration_id: zabbix
integration_title: zabbix
integration_version: 1.1.1
is_public: true
manifest_version: 2.0.0
name: zabbix
public_title: zabbix
short_description: Zabbix API로 아이템의 과거 데이터를 수집하여 Datadog에 메트릭으로 보고합니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Event Management
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Zabbix API로 아이템의 과거 데이터를 수집하여 Datadog에 메트릭으로 보고합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: zabbix
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Zabbix를 연결해 다음을 할 수 있습니다.

- Datadog Agent를 통해 [Zabbix][1] 모니터링
- Zabbix 알림을 Datadog으로 전송하면 Datadog 이벤트 스트림에서 알림을 이벤트로 확인할 수 있습니다.

## 설정

Zabbix 점검은 [Datadog Agent][2] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

Agent v7.21+/v6.21+의 경우 아래 지침에 따라 호스트에 Zabbix 점검을 설치하세요. Docker Agent 또는 이전 버전의 Agent를 설치하려면 [커뮤니티 통합 사용][3]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-zabbix==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 설정

1. Zabbix 서버 시간대가 UTC로 설정되어 있는지 확인합니다. Zabbix 표준 시간대에 관한 자세한 내용은 [Zabbix 문서][5]에서 확인하세요.

2. Agent 구성 디렉터리 루트의 `conf.d/` 폴더에서 `zabbix.d/conf.yaml` 파일을 편집해 Zabbix 성능 데이터 수집을 시작하세요. 사용할 수 있는 구성 옵션을 모두 보려면 [sample zabbix.d/conf.yaml][6]을 참고하세요.

3. [에이전트를 다시 시작][7]합니다.

#### 이벤트 수집

##### Datadog 미디어 유형 생성하기

1. *Administration > Media Types > Create Media Type*으로 이동합니다.
2. Zabbix 템플릿 변수로 webhook에 파라미터를 추가합니다. Datadog api_key와 다음 Zabbix 템플릿 변수를 파라미터로 추가합니다.

| 파라미터            | 값                                |
| -------------------- | ------------------------------------ |
| `api_key`            | `Your Datadog API key`               |
| `event_date`         | `{EVENT.DATE}`                       |
| `event_name`         | `{EVENT.NAME}`                       |
| `event_nseverity`    | `{EVENT.NSEVERITY}`                  |
| `event_tags`         | `{EVENT.TAGSJSON}`                   |
| `event_time`         | `{EVENT.TIME}`                       |
| `event_value`        | `{EVENT.VALUE}`                      |
| `item_name`          | `{ITEM.NAME}`                        |
| `alert_message`      | `{ALERT.MESSAGE}`                    |
| `alert_subject`      | `{ALERT.SUBJECT}`                    |


3. **Name**을 `Datadog`, **Type**을 `Webhook`으로 설정하고 **Script**로 다음 코드를 입력합니다.
``` 
try {
    Zabbix.Log(4, '[datadog webhook] received value=' + value);

    var params = JSON.parse(value);
    var req = new HttpRequest();
    req.addHeader('Content-Type: application/json');
    var webhook_url = 'https://app.datadoghq.com/intake/webhook/zabbix?api_key=' + params.api_key;
    var webhook_data = value;
    var resp = req.post(webhook_url, webhook_data);
    if (req.getStatus() != 202) {
        throw 'Response code: '+req.getStatus();
    }
    Zabbix.Log(4, '[datadog webhook] received response with status code ' + req.getStatus() + '\n' + resp);
} catch (error) {
    Zabbix.Log(4, '[datadog webhook] event creation failed json : ' + webhook_data)
    Zabbix.Log(4, '[datadog webhook] event creation failed : ' + error);
}
return JSON.stringify({});

```
4. "Test" 버튼으로 Webhook이 올바르게 설정되었는지 확인합니다.

##### 기존 사용자에게 Webhook 미디어 할당하기

1. Webhook 미디어 유형을 구성한 다음, *Administration > Users*로 이동하여 Webhook을 대표할 전용 Zabbix 사용자를 생성합니다. 예를 들어, Datadog Webhook용 `Datadog` 별칭을 사용할 수 있습니다. 이 사용자는 Zabbix에 로그인하지 않으므로 미디어를 제외한 모든 설정은 기본값 그대로 둘 수 있습니다.
2. 사용자 프로필에서 **Media** 탭으로 이동하여 필수 연락처 정보가 포함된 Webhook을 추가합니다. Webhook이 전송 대상 필드를 사용하지 않는 경우, 지원되는 문자 조합을 입력하여 유효성 검사 조건을 우회할 수 있습니다.
3. 이 사용자에게 알림을 보내야 하는 모든 호스트에 최소한 읽기 권한을 부여합니다.

##### Webhook용 알림 작업 구성하기

1. *Configuration > Actions*으로 이동합니다.
2. 페이지 타이틀 드롭다운에서 필수 작업 유형을 선택합니다.
3. **Create Action**를 클릭합니다.
4. 작업의 이름을 지정합니다.
5. 작업 수행 조건을 선택합니다.
6. 수행할 작업을 선택합니다.

### 검증

[Agent 상태 하위 명령][8]을 실행하고 점검 섹션에서 `zabbix`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "zabbix" >}}


### 이벤트

Zabbix 알림은 Datadog 이벤트 스트림에서 이벤트로 수집됩니다.

### 서비스 점검
{{< get-service-checks-from-git "zabbix" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://www.zabbix.com/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://www.zabbix.com/documentation/current/en/manual/web_interface/time_zone
[6]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/datadog_checks/zabbix/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/