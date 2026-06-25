---
title: Enabling App and API Protection for Azure Container Apps
disable_sidebar: true
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against Threats with Datadog App and API Protection"
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Tracking user activity"
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
- link: "/security/application_security/how-it-works/"
  tag: "Documentation"
  text: "How App and API Protection Works in Datadog"
---

Learn how to set up App and API Protection (AAP) on your Azure Container Apps by selecting the programming language your application is written in.

<div class="alert alert-info">AAP support for Azure Container Apps is in Preview.</div>

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][1] to block IPs in your [WAF][2].

{{< appsec-integrations >}}
  {{< appsec-integration name="Python" avatar="python" link="./python" >}}
  {{< appsec-integration name="Node.js" avatar="node" link="./nodejs" >}}
  {{< appsec-integration name="Java" avatar="java" link="./java" >}}
  {{< appsec-integration name="Go" avatar="go" link="./go" >}}
  {{< appsec-integration name="Ruby" avatar="ruby" link="./ruby" >}}
  {{< appsec-integration name=".NET" avatar="dotnet" link="./dotnet" >}}
  {{< appsec-integration name="PHP" avatar="php" link="./php" >}}
{{< /appsec-integrations >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/workflows/
[2]: /security/application_security/waf-integration/
