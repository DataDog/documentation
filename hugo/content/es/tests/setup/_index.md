---
aliases:
- /es/continuous_integration/tests/setup/
title: Configurar Test Optimization
type: multi-code-lang
---

Para obtener información sobre las opciones de configuración de [Test Optimization][1], elige tu lenguaje:

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

Si ejecutas tus tests en un entorno con restricciones de red,
consulta la guía [Tráfico de red del Agent][2] o [Configuración de red sin Agent][3] para obtener información sobre cómo configurar las listas blancas.

Si ejecutas tus tests en un contenedor, consulta la guía [Tests en contenedores][4] para conocer los pasos de configuración adicionales.

[1]: /es/continuous_integration/tests
[2]: /es/agent/configuration/network/
[3]: /es/tests/network/
[4]: /es/tests/containers/