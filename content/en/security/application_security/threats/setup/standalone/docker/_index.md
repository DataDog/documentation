---
title: Setup App and API Protection
disable_sidebar: true
type: multi-code-lang
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against Threats with Datadog Application & API Protection"
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Tracking user activity"
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB Application & API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting Application & API Protection"
- link: "/security/application_security/how-it-works/"
  tag: "Documentation"
  text: "How Application & API Protection Works in Datadog"
---

Learn how to setup App and API Protection on your Docker containers by selecting the programming language your service container is written with.

<div class="alert alert-info">
  <p class="fs-bold m-0">Are you missing your environment?</p>
  <span>Send us a request for your missing environment <a href="https://forms.gle/nMGq2Hhe7Z4sCKdy6">here</a>.</span>
</div>

{{< appsec-integrations >}}
  {{< appsec-integration name="Python" logo="{{.Site.Params.img_url}}images/logos/python_avatar.svg" link="/security/application_security/setup/standalone/docker/python" >}}
  {{< appsec-integration name="Node.js" logo="{{.Site.Params.img_url}}images/logos/node_avatar.svg" link="/security/application_security/setup/standalone/docker/nodejs" >}}
  {{< appsec-integration name="Java" logo="{{.Site.Params.img_url}}images/logos/java_avatar.svg" link="/security/application_security/setup/standalone/docker/java" >}}
  {{< appsec-integration name="Go" logo="{{.Site.Params.img_url}}images/logos/go_avatar.svg" link="/security/application_security/setup/standalone/docker/go" >}}
  {{< appsec-integration name="Ruby" logo="{{.Site.Params.img_url}}images/logos/ruby_avatar.svg" link="/security/application_security/setup/standalone/docker/ruby" >}}
  {{< appsec-integration name=".NET" logo="{{.Site.Params.img_url}}images/logos/dotnet_avatar.svg" link="/security/application_security/setup/standalone/docker/dotnet" >}}
  {{< appsec-integration name="PHP" logo="{{.Site.Params.img_url}}images/logos/php_avatar.svg" link="/security/application_security/setup/standalone/docker/php" >}}
{{< /appsec-integrations >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
