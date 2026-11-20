---
description: End User Device Monitoring을 설정하여 직원의 데스크톱 및 노트북에서 성능 및 연결 데이터를 수집하세요.
further_reading:
- link: /infrastructure/end_user_device_monitoring/
  tag: 설명서
  text: End User Device Monitoring
title: End User Device Monitoring 설정하기
---
{{< callout url="https://www.datadoghq.com/product-preview/end-user-device-monitoring/" btn_hidden="false" >}}
End User Device Monitoring은 미리 보기로 제공되고 있습니다. 등록하려면 <b>Request Access</b>를 클릭하세요.
{{< /callout >}}

직원 데스크톱 및 노트북에 Datadog Agent를 설정하여 [End User Device Monitoring 데이터][11]를 수집하세요.

<div class="alert alert-danger">데이터가 Datadog에 표시되기 전에 미리 보기 액세스가 승인되었다는 확인을 받아야 합니다. 요청을 제출한 후 아래 설정 단계를 완료하기 전에 액세스 확인을 기다리세요.</div>

## 지원 플랫폼 {#supported-platforms}

- Windows 10 이상
- macOS 11 이상

## Datadog Agent 설정 {#set-up-the-datadog-agent}

1. 계속하기 전에 미리 보기 액세스 권한을 받았는지 확인합니다. 확인을 받지 못한 경우 [액세스를 요청하고][12] 승인을 기다리세요.

2. 플랫폼에 대한 설정 지침을 따릅니다.
    - [macOS][14]
    - [Windows][15]

## 다음 단계 {#next-steps}

모니터링되는 장치에서 추가 데이터를 수집하려면 다음 기능 또는 통합 중 하나 이상을 활성화하세요.

- [Live Processes][5]
- [Logs][6]
- [Network Path][7]
- [WiFi/WLAN 통합][8]
- [Windows Crash Detection 통합][9]
- [Windows Event Log][13]

## 시작 {#getting-started}
장치가 표시되기 시작하면 다음과 같은 방법으로 End User Devices를 살펴보세요.
1. **Reference Table을 사용하여 장치를 최종 사용자에게 매핑** Settings 페이지에서 Edit을 클릭하여 호스트 이름과 같은 장치 식별자와 이름, 이메일, 팀과 같은 사용자 속성 간의 매핑을 업로드하세요.
2. **Bits에 장치 상태 및 추세 질문** [Bits Chat][16]을 열고 자연어로 장치 플릿에 대해 질문하세요. 예를 들어, 어떤 장치가 CPU를 가장 많이 사용하는지, 어떤 노트북의 배터리 용량이 낮은지, 어떤 사용자의 연결이 끊겼는지 질문하세요.
3. **Datadog MCP Server로 장치 데이터 쿼리** Cursor 또는 Claude와 같은 AI 클라이언트를 [Datadog MCP Server][17]에 연결하여 해당 클라이언트를 통해 장치 메트릭, 로그 및 관련 텔레메트리를 검색하세요. 시작하려면 [Datadog MCP Server 설정][18]을 참조하세요.
4. **배터리 상태 검토** 최대 용량, 사이클 횟수, 충전 상태와 같은 [배터리 메트릭][20]으로 대시보드를 생성하여 교체할 노트북을 식별하세요.
5. **목적지까지의 지연 시간 추적** 모니터링되는 장치에서 [Network Path][7]를 설정하여 장치에서 SaaS 애플리케이션과 같은 목적지까지의 지연 시간을 측정하고 지연이 발생하는 홉을 찾으세요. 예시는 [사용자 장치에서 SaaS 애플리케이션까지의 네트워크 경로 추적하기][19]를 참조하세요.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[5]: /ko/infrastructure/process/
[6]: /ko/logs/
[7]: /ko/network_monitoring/network_path/setup/
[8]: /ko/integrations/wlan/
[9]: /ko/integrations/wincrashdetect/
[11]: /ko/infrastructure/end_user_device_monitoring/
[12]: https://www.datadoghq.com/product-preview/end-user-device-monitoring/
[13]: /ko/integrations/event-viewer/?tab=logs
[14]: /ko/infrastructure/end_user_device_monitoring/setup/macos/
[15]: /ko/infrastructure/end_user_device_monitoring/setup/windows/
[16]: /ko/bits_ai/bits_chat/
[17]: /ko/mcp_server/
[18]: /ko/mcp_server/setup/
[19]: /ko/infrastructure/end_user_device_monitoring/#trace-network-paths-from-user-devices-to-saas-applications
[20]: /ko/integrations/battery/#data-collected