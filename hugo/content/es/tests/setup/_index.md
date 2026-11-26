---
aliases:
- /es/continuous_integration/tests/setup/
title: Configure Test Optimization
type: multi-code-lang
---
Para obtener información sobre las opciones de configuración de [Test Optimization][1], elija su idioma:

{{< card-grid card_width="75px" >}}
  {{< image-card href="/tests/setup/dotnet/" src="integrations_logos/dotnet_avatar.svg" alt=".net" >}}
  {{< image-card href="/tests/setup/java/" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/tests/setup/javascript/" src="integrations_logos/javascript.png" alt="javascript" >}}
  {{< image-card href="/tests/setup/python/" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/tests/setup/ruby/" src="integrations_logos/ruby_avatar.svg" alt="ruby" >}}
  {{< image-card href="/tests/setup/swift/" src="integrations_logos/swift_avatar.svg" alt="swift" >}}
  {{< image-card href="/tests/setup/go/" src="integrations_logos/golang-avatar.png" alt="Go" >}}
  {{< image-card href="/tests/setup/junit_xml/" src="integrations_logos/junit_xml.png" alt="cargar pruebas JUnit a Datadog" >}}
{{< /card-grid >}}

Si utiliza Bazel para ejecutar pruebas de Go, Java o Python, utilice las [reglas de Bazel para Test Optimization][2] de Datadog.

Si ejecuta sus pruebas en un entorno con restricciones de red,
consulte la guía de [Tráfico de red de Agent][3] o [Configuración de red de Agentless][4] para obtener información sobre cómo configurar la lista de permitidos (allowlisting).

Si ejecuta sus pruebas en un contenedor, consulte la guía de [Pruebas en Containers][5] para conocer los pasos de configuración adicionales.

Para que una biblioteca de Test Optimization compatible cargue informes de cobertura de código automáticamente, consulte [Cargar informes automáticamente con Test Optimization][6].

## Data Access Control {#data-access-control}

Puede restringir los datos de Test Optimization a nivel de repositorio para los equipos y roles adecuados en Datadog. Esto ayuda a evitar que información confidencial, como nombres de pruebas o rutas del código fuente, cruce los límites de los equipos.

Para usar Data Access Control, vaya a [Organization Settings > Access Control][7] y cree un conjunto de datos restringido (Restricted Dataset) con alcance a Software Delivery y al repositorio que desea restringir. Otorgue acceso a los roles o equipos que deban verlo.

[1]: /es/continuous_integration/tests
[2]: /es/tests/setup/bazel/
[3]: /es/agent/configuration/network/
[4]: /es/tests/network/
[5]: /es/tests/containers/
[6]: /es/code_coverage/setup/#upload-reports-automatically-with-test-optimization
[7]: https://app.datadoghq.com/organization-settings/access-controls