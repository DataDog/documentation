---
title: Configure Test Optimization
type: multi-code-lang
aliases:
- /continuous_integration/tests/setup/
---

For information about configuration options for [Test Optimization][1], choose your language:

{{< card-grid card_width="75px" >}}
  {{< image-card href="/tests/setup/dotnet/" src="integrations_logos/dotnet_avatar.svg" alt=".net" >}}
  {{< image-card href="/tests/setup/java/" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/tests/setup/javascript/" src="integrations_logos/javascript.png" alt="javascript" >}}
  {{< image-card href="/tests/setup/python/" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/tests/setup/ruby/" src="integrations_logos/ruby_avatar.svg" alt="ruby" >}}
  {{< image-card href="/tests/setup/swift/" src="integrations_logos/swift_avatar.svg" alt="swift" >}}
  {{< image-card href="/tests/setup/go/" src="integrations_logos/golang-avatar.png" alt="go" >}}
  {{< image-card href="/tests/setup/junit_xml/" src="integrations_logos/junit_xml.png" alt="upload junit tests to datadog" >}}
{{< /card-grid >}}

<br>

If you use Bazel to run Go, Java, or Python tests, use the Datadog [Bazel rules for Test Optimization][5].

If you run your tests in an environment with network restrictions,
see the [Agent Network Traffic][2] or [Agentless Network Settings][3] guide for information on how to configure whitelisting.

If you run your tests in a container, see the [Tests in Containers][4] guide for additional setup steps.

[1]: /continuous_integration/tests
[2]: /agent/configuration/network/
[3]: /tests/network/
[4]: /tests/containers/
[5]: /tests/setup/bazel/
