
## 사전 필수 조건

<div class="alert alert-info"><strong>1-클릭 활성화</strong><br>
서비스가 <a href="/agent/guide/how_rc_works/#enabling-remote-configuration">원격 구성이 활성화된 Agent와 이를 지원하는 추적 라이브러리 버전</a>으로 실행 중인 경우 ASM 상태 열의 <strong>Not Enabled</strong> 표시 위로 마우스를 가져간 다음 <strong>Enable ASM</strong>를 클릭합니다. <code>DD_APPSEC_ENABLED=true</code> 또는 <code>--enable-appsec</code> 플래그를 사용하여 서비스를 다시 시작할 필요가 없습니다.</div>

- [Datadog Agent][101]는 애플리케이션의 운영 체제나 컨테이너, 클라우드 또는 가상 환경에 맞게 설치 및 구성됩니다.
- [Datadog APM][103]이 애플리케이션이나 서비스에 대해 구성되어 있으며, Datadog에서 트레이스를 수신하고 있습니다.
- 서비스가 [원격 구성이 활성화된 Agent 및 이를 지원하는 추적 라이브러리 버전][104]으로 실행 중인 경우 Agent 또는 추적 라이브러리를 추가로 구성하지 않고도 Datadog UI에서 공격자를 차단할 수 있습니다.

[101]: https://app.datadoghq.com/account/settings#agent
[102]: https://app.datadoghq.com/services?lens=Security
[103]: /tracing/trace_collection/dd_libraries/
[104]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration