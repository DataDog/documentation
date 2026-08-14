---
title: Configure Test Optimization
type: multi-code-lang
aliases:
- /continuous_integration/tests/setup/
---

For information about configuration options for [{{< prodname >}}Test Optimization{{< /prodname >}}][1], choose your language:

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

If you use Bazel to run Go, Java, or Python tests, use the Datadog [Bazel rules for Test Optimization][2].

If you run your tests in an environment with network restrictions,
see the [Agent Network Traffic][3] or [Agentless Network Settings][4] guide for information on how to configure allowlisting.

If you run your tests in a container, see the [Tests in Containers][5] guide for additional setup steps.

To have a supported {{< prodname >}}Test Optimization{{< /prodname >}} library upload code coverage reports automatically, see [Upload reports automatically with Test Optimization][6].

## Data Access Control

You can restrict {{< prodname >}}Test Optimization{{< /prodname >}} data at the repository level to the appropriate teams and roles in Datadog. This helps prevent sensitive information, such as test names or source paths, from crossing team boundaries.

To use Data Access Control, go to [Organization Settings > Data Access Control][7] and create a Restricted Dataset scoped to {{< prodname >}}Software Delivery{{< /prodname >}} and the repository you want to restrict. Grant access to the roles or teams that should see it.

[1]: /continuous_integration/tests
[2]: /tests/setup/bazel/
[3]: /agent/configuration/network/
[4]: /tests/network/
[5]: /tests/containers/
[6]: /code_coverage/setup/#upload-reports-automatically-with-test-optimization
[7]: https://app.datadoghq.com/organization-settings/data-access-controls
