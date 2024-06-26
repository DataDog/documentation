---
algolia:
  tags:
  - 원격 구성
  - 원격 구성
aliases:
- /ko/agent/guide/how_rc_works
- /ko/agent/guide/how_remote_config_works
further_reading:
- link: /security/application_security/how-appsec-works/#built-in-protection
  tag: 설명서
  text: 애플리케이션 보안 모니터링의 작동 방식
- link: /dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
  tag: 설명서
  text: 동적 계측
- link: /security/threats/setup
  tag: 설명서
  text: CSM 위협 설정
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: 블로그
  text: Datadog 감사 추적 사용
- link: https://www.datadoghq.com/blog/remote-configuration-for-datadog/
  tag: 블로그
  text: 원격 구성으로 Datadog 구성 요소에 실시간 업데이트 적용
title: 원격 구성
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">원격 구성은 선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

## 개요
원격 구성은 일부 제품 기능에 대해 인프라스트럭처에 배포된 Datadog 구성 요소(예: 에이전트, 추적 라이브러리, 관찰 가능 파이프라인 작업자)의 동작을 원격으로 구성 및 변경할 수 있는 Datadog 기능입니다. 원격 구성을 사용해 환경의 Datadog 구성 요소에 설정을 적용하여 필요에 따라 관리 비용을 절감하고 팀 간의 마찰을 줄이며 문제 해결 시간을 단축할 수 있습니다.

Datadog 보안 제품, 애플리케이션 보안 관리 및 클라우드 보안 관리 위협(CSM 위협), 원격 구성 지원 에이전트 및 호환되는 추적 라이브러리는 실시간 보안 업데이트 및 응답을 제공하여 애플리케이션 및 클라우드 인프라스트럭처의 보안 상태를 강화합니다.

## 작동 원리
Datadog 에이전트에서 원격 구성을 실행하면 설정된 [Datadog 사이트][1]를 주기적으로 폴링하여 원격 구성 실행 에이전트 또는 추적 라이브러리에 적용할 설정 변경 사항이 있는지 확인합니다.

원격 구성 사용 제품 기능에 해당 Datadog 제품 UI에 설정 변경 사항을 제출하면 변경 사항이 Datadog에 저장됩니다.

다음 다이어그램은 원격 구성의 작동 방식을 보여 줍니다:

{{<img src="agent/remote_config/RC_Diagram_v5.png" alt="Users configure features in the UI, the config is stored in Datadog, the Agent requests config updates." width="90%" style="center">}}

1. Datadog UI에서 선택한 제품 기능을 설정합니다.
2. 제품 기능 설정은 Datadog 내에 안전하게 저장됩니다.
3. 사용자 환경의 에이전트는 Datadog에서 안전하게 설정 업데이트를 폴링하고 수신하며 자동으로 적용합니다. 사용자 환경에 배포된 추적 라이브러리는 에이전트와 통신하여 Datadog에서 설정 업데이트를 요청하고 수신합니다.
**참고**: 원격 구성을 통해 적용된 설정 변경 사항이 에이전트 설정 파일에 표시되지 않습니다.

## 지원되는 제품 및 기능
원격 구성에서 지원되는 제품 및 기능은 다음과 같습니다.

### 애플리케이션 보안 관리(ASM)

- **원클릭 ASM 활성화**: Datadog UI에서 원클릭 ASM을 활성화합니다.
- **앱 내 공격 패턴 업데이트**: 새로 공개된 취약점이나 공격 벡터에 따라 Datadog이 최신 웹 애플리케이션 방화벽(WAF) 공격 패턴을 해제하면 자동으로 수신합니다.
- **보호**: Datadog UI를 통해 ASM 보안 신호 및 추적에 플래그가 지정된 공격자의 IP, 인증된 사용자 및 의심스러운 요청을 일시 또는 영구적으로 차단합니다.

### 애플리케이션 성능 모니터링(APM)

- **UI에서 추적 라이브러리 설정 설정** (베타):서비스를 재시작할 필요 없이 [서비스 카탈로그][19] UI 내에서 서비스의 트레이스 샘플링 속도, 로그 삽입 활성화 및 HTTP 헤더 태그를 변경합니다.
- **애플리케이션 성능 모니터링(APM)으로 Kubernetes 서비스를 원격으로 계측**(비공개 베타): Datadog 라이브러리 삽입을 통해 Datadog 애플리케이션 성능 모니터링(APM)으로 Kubernetes에서 서비스를 원격으로 계측하고 Datadog UI 내에서 배포를 모두 관리합니다. Java, Node, Python 애플리케이션에 사용 가능. 자세한 내용은 [원격 계측 설정][2]을 참고하세요.


### 동적 계측
<div class="alert alert-info">이 기능은 베타 버전입니다.</div>

- 코드 변경 없이 실시간 애플리케이션에서 중요한 메트릭, 트레이스, 로그를 전송할 수 있습니다.

### CSM 위협

<div class="alert alert-info">기본 에이전트 규칙의 원격 구성은 베타 버전입니다.</div>

<div class="alert alert-info">커스텀 규칙 원격 구성은 프라이빗 베타 버전입니다. 액세스를 요청하려면 이 <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5Emr7y_Jg3ShcC44HlYtalxKgHUocFAz8dq87xSkjfeALTg/viewform">양식</a>을 작성하세요.</div>

- **자동 기본 에이전트 규칙 업데이트**: 새로운 에이전트 탐지 및 향상 기능이 릴리스됨에 따라 Datadog에서 유지하는 기본 에이전트 규칙을 자동으로 수신하고 업데이트합니다. 자세한 내용은 [CSM 위협 설정][3]을 참고하세요.
- **커스텀 에이전트 규칙 자동 배포**: 커스텀 에이전트 규칙을 지정된 호스트(모든 호스트 또는 정의된 호스트 부분 집합)에 자동으로 배포합니다.

### 관찰 가능성 파이프라인
<div class="alert alert-info">이 기능은 비공개 베타 버전입니다.</div>

- **원격 배치 및 업데이트 [식별 가능 파이프라인 작업자][4](OPW)**: Datadog UI에 파이프라인을 구축 및 편집하여 환경에서 실행 중인 OPW 인스턴스의 설정 변경 사항을 출시합니다.

## 보안 고려사항

Datadog 구성 요소에서 수신하고 적용되는 구성의 기밀성, 무결성, 가용성을 보호하기 위해 다음과 같은 보호 조치를 구현합니다.

* 인프라스트럭처에 배포된 에이전트가 Datadog에 설정을 요청합니다.
* Datadog에서는 에이전트가 요청하지 않는 한 설정을 보내지 않고 요청 에이전트와 관련된 설정만 보냅니다.
* 설정 요청은 에이전트에서 HTTPS를 통해 Datadog으로(포트 443) 시작되므로 네트워크 방화벽에서 추가 포트를 열 필요가 없습니다.
* 에이전트와 Datadog 간의 통신은 HTTPS를 사용하여 암호화되며, Datadog API 키를 사용하여 인증 및 권한이 부여됩니다.
* [`api_keys_write`][5] 권한을 가진 사용자만 API 키에서 원격 구성 기능을 활성화 또는 비활성화하고 지원되는 제품 기능을 사용할 수 있습니다.
* Datadog UI를 통해 제출된 설정 변경 사항은 에이전트에서 서명되고 검증되며 Datadog 구성 요소를 요청하여 설정의 무결성을 확인합니다.

## 원격 구성 활성화

### 필수 구성 요소

- 호스트 또는 컨테이너에 설치된 Datadog 에이전트 버전 `7.41.1`(애플리케이션 성능 모니터링(APM) 샘플링 속도의 경우 `7.42.0`, 애플리케이션 성능 모니터링(APM) 원격계 측의 경우 `7.43.0`) 이상입니다.
- 추적 라이브러리를 사용하는 Datadog 제품의 경우 추적 라이브러리를 원격 구성 호환 버전으로 업그레이드해야 합니다. ASM 보호 기능 및 ASM 원클릭 활성화에 대해서는 [ASM 호환성 요구 사항][6]을 참고하세요. 동적 계측에 대해서는 [동적 계측 필수조건][20]을 참고하세요.

### 설정

원격 구성을 활성화하려면 다음을 실행하세요.

1. 조직에 대해 원격 구성을 실행할 수 있도록 RBAC 권한에 [`org_management`][7]이 포함되어 있는지 확인합니다.

2. 원격 구성 기능을 사용하여 새 API 키를 만들거나 기존 API 키에 기능을 추가할 수 있도록 RBAC 권한에 [`api_keys_write`][5]가 포함되어 있는지 확인하세요. 권한이 없는 경우 조직의 Datadog 관리자에게 문의하여 권한을 업데이트하세요. 이 기능을 가진 키를 사용하면 에이전트에서 원격 구성을 사용하도록 인증하고 권한을 부여할 수 있습니다.

3. [원격 구성][8] 페이지에서 원격 구성을 활성화합니다. 이를 통해 조직 전체의 Datadog 구성 요소가 Datadog으로부터 설정을 수신할 수 있습니다.

4. 기존 API 키를 선택하거나 새 API 키를 만들고 키에서 원격 구성 기능을 사용하도록 설정합니다.

   {{<img src="agent/remote_config/RC_Key_updated.png" alt="API Key properties with Remote Configuration capability Enable button." width="90%" style="center">}}

5. 에이전트 설정 파일을 업데이트합니다.
**참고:** 이 단계는 에이전트 버전 7.46.0 이하의 경우에만 필요합니다. 에이전트 버전 7.47.0 `remote_configuration.enabled`부터는 에이전트에서 `true`가 기본값으로 설정됩니다.

{{< tabs >}}
{{% tab "YAML 파일 구성" %}}
YAML 파일에 원격 구성 기능이 활성화된 API 키를 지정하여 다음 구성을 추가합니다.
```yaml
api_key: xxx
remote_configuration:
  enabled: true
``` 

{{% /tab %}}
{{% tab "환경 변수" %}}
원격 기능이 활성화된 API 키를 지정하여 다음을 Datadog 에이전트 매니페스트에 추가합니다.
```yaml
DD_API_KEY=xxx
DD_REMOTE_CONFIGURATION_ENABLED=true
```

{{% /tab %}}
{{% tab "Helm" %}}
원격 구성 기능이 활성화된 API 키를 지정하여 다음을 Helm 차트에 추가합니다.
```yaml
datadog:
  apiKey: xxx
remoteConfiguration:
  enabled: true
```

{{% /tab %}}
{{< /tabs >}}


6. 변경 내용을 적용하려면 에이전트를 다시 시작합니다.

다음 단계를 실행하면 에이전트가 Datadog에 설정을 요청하고 원격 구성을 사용하는 기능이 실행됩니다.
- [CSM 위협 기본 에이전트 규칙][9]이 해제되면 자동으로 업데이트됩니다.
- [Datadog 원격 계측][2]이 활성화됩니다.
- [애플리케이션 성능 모니터링(APM) 에이전트 수준의 샘플링 비율][10]을 적용합니다.
- [동적 계측][11]이 활성화됩니다.
- [ASM 1-클릭 활성화, IP차단, 공격패턴 업데이트][12]가 활성화 됩니다.

## 모범 사례

### Datadog 감사 추적

[Datadog 감사 추적][13]을 사용하여 조직 액세스 및 원격 구성 지원 이벤트를 모니터링할 수 있습니다. 감사 추적을 사용하면 관리자 및 보안 팀이 Datadog API 및 애플리케이션 키의 생성, 삭제, 수정을 추적할 수 있습니다. 감사 추적을 구성한 후에는 원격 구성 지원 기능과 관련된 이벤트 및 변경을 요청한 사용자를 볼 수 있습니다. 감사 추적을 사용하면 이벤트 시퀀스를 재구성하고 원격 구성에 강력한 Datadog 모니터링을 설정할 수 있습니다.

### 모니터링

[모니터][14]를 설정하여 관심 이벤트가 발생했을 때 알림을 수신합니다.

## 트러블슈팅

원격 구성을 사용하는 데 문제가 발생하는 경우 다음 트러블슈팅을 사용하세요. 추가 지원이 필요한 경우 [Datadog 지원팀][15]에 문의하세요.

### 에이전트 재시작하기

[`datadog.yaml`][16] 파일에서 에이전트 설정이 업데이트된 후 이 변경 내용을 적용하려면 에이전트를 다시 시작합니다.

### 사용자 환경에서 Datadog 원격 구성 엔드포인트에 연결할 수 있는지 확인

원격 구성을 사용하려면 사용자 환경에 배포된 에이전트와 관찰 가능 파이프라인 작업자가 모두 [Datadog 원격 구성 엔드포인트][17]에 통신합니다. 아웃바운드 HTTPS가 사용자 환경에서 이러한 엔드포인트에 액세스할 수 있는지 확인합니다. Datadog와 사용자 환경 사이에 프록시도 있는 경우 [프록시 설정][18]을 업데이트하여 원격 구성 엔드포인트를 통합합니다.

### 조직 수준에서 원격 구성 사용

Datadog UI에서 [조직][8] 수준에서 원격 구성을 활성화하려면 **조직 설정> 보안 > 원격 구성** 메뉴에 따라 인증 및 인증된 Datadog 구성 요소가 Datadog에서 지원되는 기능의 구성 및 보안 탐지 규칙을 원격으로 수신할 수 있습니다. [`org_management`][7] RBAC 권한을 가진 사용자만 조직 수준에서 원격 구성을 활성화할 수 있습니다.

### API 키에서 원격 구성 사용

에이전트가 설정 및 보안 탐지 규칙을 수신하도록 인증 및 권한을 부여하고 식별 가능 파이프라인 작업자가 설정을 수신할 수 있도록 하려면 관련 API 키에서 원격 구성을 활성화합니다. [`api_keys_write`][5] RBAC 권한을 가진 사용자만 API 키에서 원격 구성을 활성화할 수 있습니다.

**참고:** [`api_keys_write`][5] RBAC 권한이 있지만 원격 구성[조직][8] 수준 권한이 없는 경우 새로운 API 키나 기존 API 키에서 원격 구성을 활성화할 수 없고 기존 API 키에서 원격 구성을 비활성화할 수 있는 권한만 있습니다.

### 원격 구성 상태 이벤트 검토

[원격 구성 UI][8]를 통해 에이전트의 원격 구성 상태를 볼 수 있습니다. 각 상태의 의미는 다음 표를 참고하세요.

  | 상태           | 설명                                      |
  |------------------|--------------------------------------------------|
  | 연결됨      | 사용자 환경에 배포된 에이전트가 Datadog에 연결, 인증, 권한 부여를 성공적으로 실행할 수 있습니다. 이 상태는 에이전트가 원격 구성을 위해 사용할 수 있는 최적의 상태입니다.                                               |    
  | 허가되지 않음          | 사용자 환경에 배포된 에이전트가 Datadog에 연결할 수는 있지만 원격 구성 작업을 위해 Datadog으로 인증 및 권한을 부여할 수는 없습니다. 에이전트에서 사용하는 API 키가 원격 구성을 사용할 수 없기 때문일 수 있습니다. 이 문제를 해결하려면 에이전트에서 사용하는 API 키에서 원격 구성 기능을 사용하도록 설정하세요.                                                 | 
  | 연결 오류        |   환경에 배포된 에이전트가 `datadog.yaml` 설정 파일에 `remote_config.enabled`를 true로 설정되어 있지만 원격 구성 서비스에서 에이전트를 찾을 수 없습니다. 가장 가능한 원인은 에이전트가 원격 구성 [엔드포인트][17]에 연결할 수 없기 때문일 수 있습니다. 이 문제를 해결하려면 환경에서 원격 구성 엔드포인트로 아웃바운드 HTTPS 액세스를 허용하세요. 이 상태는 에이전트 버전이 `7.45.0` 또는 이상인 경우 표시됩니다.
  | 비활성화됨       |   환경에 배포된 에이전트가 `datadog.yaml` 설정 파일에 `remote_config.enabled`가 false로 설정되었습니다. 에이전트에서 원격 구성을 사용하도록 `remote_config.enabled`를 true로 설정합니다. 에이전트 버전이 `7.45.0` 또는 이상인 경우 이 상태가 표시됩니다. | 
  | 연결되지 않음       | 원격 구성 서비스에서 에이전트를 찾을 수 없으며 `datadog.yaml` 설정 파일에서 `remote_config.enabled`를 true 또는 false로 설정되었을 수 있습니다. 로컬 에이전트 구성 또는 프록시 설정을 점검하세요. 이 상태는 에이전트 버전이 `7.41.1`보다 높지만 `7.45.0`보다 낮을 경우 표시됩니다.            | 
  | 지원되지 않는 에이전트   | 에이전트가 원격 구성을 사용할 수 없는 버전에 있습니다. 이 문제를 해결하려면 에이전트를 사용 가능한 최신 버전으로 업데이트하세요. |

## 에이전트 수준에서 원격 구성 종료 선택

에이전트 버전 7.47.0부터는 `remote_configuration.enabled`가 에이전트에서 기본적으로 `true`로 설정됩니다. 이 설정으로 인해 에이전트는 Datadog 사이트에 설정 업데이트를 요청합니다.

Datadog에서 설정을 받으려면 다음 단계를 따라야 합니다.
- 조직 수준에서 원격 구성을 활성화합니다.
- Datadog UI에서 API 키에서 원격 구성 기능을 활성화합니다.
- 사용자 환경에서 원격 구성 [엔드포인트][17]에 아웃바운드 HTTPS 액세스를 허용합니다.

에이전트에서 설정 요청을 Datadog으로 보내지 않으려면 `remote_configuration.enabled`를 에이전트에서 `false`로 설정할 수 있습니다.

{{< tabs >}}
{{% tab "YAML 파일 구성" %}}
[YAML 파일 구성][21]에서 `remote_configuration.enabled`를 `true`에서 `false`로 바꿉니다.
```yaml
remote_configuration:
  enabled: false
``` 

{{% /tab %}}
{{% tab "환경 변수" %}}
다음을 Datadog 에이전트 매니페스트에 추가합니다.
```yaml
DD_REMOTE_CONFIGURATION_ENABLED=false
```

{{% /tab %}}
{{% tab "Helm" %}}
다음을 Helm 차트에 추가합니다.
```yaml
datadog:
  remoteConfiguration:
    enabled: false
```

{{% /tab %}}
{{< /tabs >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/site/
[2]: /ko/tracing/trace_collection/library_injection_remote/
[3]: /ko/security/threats/setup
[4]: /ko/observability_pipelines/#observability-pipelines-worker
[5]: /ko/account_management/rbac/permissions#api-and-application-keys
[6]: /ko/security/application_security/enabling/compatibility/
[7]: /ko/account_management/rbac/permissions#access-management
[8]: https://app.datadoghq.com/organization-settings/remote-config
[9]: /ko/security/default_rules/#cat-workload-security
[10]: /ko/tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /ko/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
[12]: /ko/security/application_security/how-appsec-works/#built-in-protection
[13]: /ko/account_management/audit_trail
[14]: /ko/monitors/
[15]: /ko/help/
[16]: /ko/agent/remote_config/?tab=configurationyamlfile#setup
[17]: /ko/agent/configuration/network
[18]: /ko/agent/configuration/proxy/
[19]: /ko/tracing/service_catalog/
[20]: /ko/dynamic_instrumentation/?tab=configurationyaml#prerequisites
[21]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file