---
aliases:
- /ko/continuous_integration/tests/setup/
title: Test Optimization 구성
type: multi-code-lang
---
[Test Optimization][1]의 구성 옵션에 대한 자세한 내용을 보려면 사용하는 언어를 선택하십시오:

{{< card-grid card_width="75px" >}}
  {{< image-card href="/tests/setup/dotnet/" src="integrations_logos/dotnet_avatar.svg" alt=".net" >}}
  {{< image-card href="/tests/setup/java/" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/tests/setup/javascript/" src="integrations_logos/javascript.png" alt="javascript" >}}
  {{< image-card href="/tests/setup/python/" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/tests/setup/ruby/" src="integrations_logos/ruby_avatar.svg" alt="ruby" >}}
  {{< image-card href="/tests/setup/swift/" src="integrations_logos/swift_avatar.svg" alt="swift" >}}
  {{< image-card href="/tests/setup/go/" src="integrations_logos/golang-avatar.png" alt="go" >}}
  {{< image-card href="/tests/setup/junit_xml/" src="integrations_logos/junit_xml.png" alt="Datadog에 junit 테스트 업로드" >}}
{{< /card-grid >}}

Bazel을 사용하여 Go, Java 또는 Python 테스트를 실행하는 경우 Datadog [Test Optimization용 Bazel 규칙][2]을 사용하십시오.

네트워크 제한이 있는 환경에서 테스트를 실행하는 경우,
허용 목록 구성 방법에 대한 자세한 내용은 [Agent Network Traffic][3] 또는 [Agentless Network Settings][4] 가이드를 참조하십시오.

container에서 테스트를 실행하는 경우 추가 설정 단계는 [Tests in Containers][5] 가이드를 참조하십시오.

지원되는 Test Optimization 라이브러리가 코드 커버리지 보고서를 자동으로 업로드하도록 하려면 [Upload reports automatically with Test Optimization][6]을 참조하십시오.

## Data Access Control {#data-access-control}

Datadog에서 리포지토리 수준의 Test Optimization 데이터에 대한 접근을 적절한 팀과 역할로 제한할 수 있습니다. 이는 테스트 이름이나 소스 경로와 같은 민감한 정보가 팀 경계를 넘어가는 것을 방지하는 데 도움이 됩니다.

Data Access Control을 사용하려면 [Organization Settings > Access Control][7]로 이동하여 Software Delivery 및 제한하려는 리포지토리로 범위가 지정된 Restricted Dataset을 생성하십시오. 해당 데이터를 확인해야 하는 역할이나 팀에 액세스 권한을 부여합니다.

[1]: /ko/continuous_integration/tests
[2]: /ko/tests/setup/bazel/
[3]: /ko/agent/configuration/network/
[4]: /ko/tests/network/
[5]: /ko/tests/containers/
[6]: /ko/code_coverage/setup/#upload-reports-automatically-with-test-optimization
[7]: https://app.datadoghq.com/organization-settings/access-controls