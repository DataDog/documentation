---
description: Datadog API 통합을 개발하고 게시하는 방법을 알아보세요.
further_reading:
- link: /api/latest/using-the-api/
  tag: 설명서
  text: Datadog API 사용 방법 알아보기
- link: /developers/authorization/
  tag: 설명서
  text: API 통합을 위한 OAuth 사용 방법 알아보기
- link: /developers/
  tag: 설명서
  text: Datadog 플랫폼에서 개발하는 방법에 대해 알아보세요.
title: API 통합 생성
type: 설명서
---
## 개요

이 페이지에서는 기술 파트너에게 Datadog API 통합을 만드는 과정을 안내합니다.

## API 통합

[Datadog API 엔드포인트][1]를 사용해 백엔드에서 데이텉를 제출하고 사용자의 Datadog 계정에서 데이터를 끌어오는 방법으로 고객 경험을 향상할 수 있습니다. 기술 파트너는 자체적인 환경 내에서 코드를 작성하고 호스팅합니다.

API 통합은 사용자를 인증하는 기존 SaaS 기반 플랫폼을 보유한 기술 파트너에게 이상적입니다.

API 통합은 Datadog에 다음 유형의 데이터를 보낼 수 있습니다.

- [메트릭][2]
- [로그][3]
- [이벤트][4]
- [서비스 점검][5]
- [트레이스][6]
- [인시던트][7]

API 통합에 [모니터][25], [대시보드][26], [로그 파이프라인][27]과 같은 기본 자산을 포함할 수 있습니다. 사용자가 통합 타일에서 **Install**을 클릭하면 설정 지침을 따르라는 메시지가 표시되고 모든 기본 대시보드가 ​​해당 계정에 나타납니다. 로그 파이프라인과 같은 다른 자산은 통합을 적절하게 설치하고 구성한 후에 사용자에게 표시됩니다.

**통합** 또는 **마켓플레이스 페이지**에서 제공 제품/서비스를 표시하려면 타일(아래 그림)을 생성해야 합니다. 이 타일은 제공 제품/서비스를 설치하는 방법에 대한 지침을 비롯해 통합의 역할과 사용 방법에 대한 정보를 포함합니다.

{{< img src="developers/integrations/integration_tile.png" alt="통합 페이지에서 예시 제공 제품/서비스를 표시하는 타일" style="width:25%" >}}

## 개발 프로세스

### OAuth

사용자에게 직접 API와 애플리케이션 키를 요청하는 대신 Datadog는 [OAuth 클라이언트][14]를 사용해 API 기반 통합에 대한 인증과 액세스를 처리합니다. OAuth 구현 환경은 모든 [Datadog 사이트][12]를 지원해야 합니다.

자세한 정보는 [통합을 위한 OAuth][15] 및 [인증 엔드포인트][16]를 참조하세요.

시작하기 위해 [Vantage][17]와 같은 `integrations-extras` 리포지토리에서 OAuth를 사용하는 사례를 알아볼 수 있습니다.

### 통합 빌드

API 기반 통합을 빌드하는 프로세스는 다음과 같습니다.

1. [Datadog 파트너 네트워크][29]에 승인되면 Datadog 기술 파트너 팀에게 제공 제품/서비스와 사용 사례에 대해 논의할 수 있습니다.
2. 개발을 위한 Datadog 샌드박스 계정 요청
3. 통합 개발을 시작하는 과정은 계정에서 통합 코드를 작성하고 호스팅하고 [OAuth 프로토콜][28]을 구현하는 것을 포함합니다.
4. Datadog 샌드박스 계정에서 OAuth 클라이언트와 통합을 테스트합니다.
5. 개발 작업이 테스트되고 완료되면 [Create a Tile][24]의 단계에 따라 **Integrations** 또는 **Marketplace** 페이지에 통합을 표시합니다.
6. 풀 리퀘스트가 제출되고 승인되면 Datadog 기술 파트너 팀이 통합을 최종 검토하기 위해 데모 일정을 잡습니다.
7. 게시하기 전에 Datadog 샌드박스 계정에서 타일 및 통합을 테스트하거나 모든 고객을 위해 즉시 통합을 게시할 수 있는 옵션이 제공됩니다.

[타일 생성][24]를 통해 API 통합 빌드를 시작합니다.

## 통합 업그레이드
관련 파일을 편집하고 [`integrations-extras`][21] 리포지토리의 통합 디렉터리에 대한 새 풀 요청을 열어 언제든지 통합을 업데이트할 수 있습니다.

API 기반 통합의 경우 새 데이터가 전송되거나 주요 버그가 수정되는 등 새로운 기능이 추가되면 통합 버전을 올리는 것이 좋습니다.

통합 버전이 올라간 경우 다음 형식을 준수하는 `CHANGELOG.md` 파일에 항목을 추가해야 합니다.

   ```
   ## 버전 이름 / 날짜

   ***Added***: 

   * New feature
   * New feature

   ***Fixed***:

   * Bug fix
   * Bug fix
   ```

새로운 README 콘텐츠, 매니페스트 정보 또는 대시보드 및 권장 모니터와 같은 자산을 편집하거나 추가하는 경우 버전 범프가 필요하지 않습니다.

대시보드 및 권장 모니터와 같은 자산에 대한 업데이트는 해당 풀 요청이 병합되고 자산이 게시된 후에 고객에게 제공됩니다. `README.md`, `manifest.json` 또는 기타 비코드 파일에 대한 업데이트도 게시 후 고객에게 즉시 제공됩니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/api/latest/using-the-api/
[2]: https://docs.datadoghq.com/ko/api/latest/metrics/
[3]: https://docs.datadoghq.com/ko/logs/faq/partner_log_integration/
[4]: https://docs.datadoghq.com/ko/api/latest/events/
[5]: https://docs.datadoghq.com/ko/api/latest/service-checks/
[6]: https://docs.datadoghq.com/ko/tracing/guide/send_traces_to_agent_by_api/
[7]: https://docs.datadoghq.com/ko/api/latest/incidents/
[8]: https://docs.datadoghq.com/ko/api/latest/security-monitoring/
[9]: https://docs.datadoghq.com/ko/developers/#creating-your-own-solution
[10]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[11]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#application-keys
[12]: https://docs.datadoghq.com/ko/getting_started/site
[13]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[14]: https://docs.datadoghq.com/ko/developers/authorization/
[15]: https://docs.datadoghq.com/ko/developers/integrations/oauth_for_integrations/
[16]: https://docs.datadoghq.com/ko/developers/authorization/oauth2_endpoints/
[17]: https://github.com/DataDog/integrations-extras/tree/master/vantage
[18]: https://www.python.org/downloads/
[19]: https://pypi.org/project/datadog-checks-dev/
[20]: https://docs.datadoghq.com/ko/developers/integrations/check_references/#manifest-file
[21]: https://github.com/DataDog/integrations-extras/
[22]: https://app.datadoghq.com/integrations
[23]: https://docs.datadoghq.com/ko/developers/integrations/python
[24]: https://docs.datadoghq.com/ko/developers/integrations/create_a_tile
[25]: https://docs.datadoghq.com/ko/monitors/
[26]: https://docs.datadoghq.com/ko/dashboards/
[27]: https://docs.datadoghq.com/ko/logs/log_configuration/pipelines/
[28]: /ko/developers/authorization/oauth2_in_datadog/
[29]: https://partners.datadoghq.com/