---
build:
  list: never
  render: never
---
{{% collapse-content title="Atributos centrales" level="h3" id="core-attributes" %}}

Estos atributos están presentes en todos los hallazgos de Security y describen la naturaleza fundamental y el estado del hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>additional_resources</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@additional_resources</code><br>Recursos adicionales. Por ejemplo, una instancia de AWS EC2 puede tener grupos de Security y grupos de Auto Scaling como recursos adicionales.</td>
    </tr>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@base_severity</code><br>Nivel de gravedad base del hallazgo antes de cualquier ajuste. Valores válidos: <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@description</code><br>Explicación legible por humanos del hallazgo. Puede incluir formato Markdown.</td>
    </tr>
    <tr>
      <td><code>detection_changed_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@detection_changed_at</code><br>Marca de tiempo en milisegundos (UTC) de cuándo cambió por última vez el estado de evaluación o detección del hallazgo.</td>
    </tr>
    <tr>
      <td><code>exposure_time_seconds</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@exposure_time_seconds</code><br>Indica el tiempo transcurrido, en segundos, entre el momento en que el hallazgo se cerró por última vez y cuando se detectó por primera vez.</td>
    </tr>
    <tr>
      <td><code>finding_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@finding_id</code><br>Identificador único del hallazgo.</td>
    </tr>
    <tr>
      <td><code>finding_type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@finding_type</code><br>Categoría del hallazgo. Valores válidos: <code>api_security</code>, <code>attack_path</code>, <code>runtime_code_vulnerability</code>, <code>static_code_vulnerability</code>, <code>host_and_container_vulnerability</code>, <code>iac_misconfiguration</code>, <code>identity_risk</code>, <code>library_vulnerability</code>, <code>misconfiguration</code>, <code>secret</code>, <code>workload_activity</code>, <code>sensitive_data</code>, <code>code_quality</code>.</td>
    </tr>
    <tr>
      <td><code>first_seen_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@first_seen_at</code><br>Marca de tiempo en milisegundos (UTC) de cuándo se detectó el hallazgo por primera vez.</td>
    </tr>
    <tr>
      <td><code>is_in_security_inbox</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@is_in_security_inbox</code><br><code>true</code> si el hallazgo aparece en la Bandeja de entrada de Security; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>last_detected_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@last_detected_at</code><br>Marca de tiempo en milisegundos (UTC) de cuándo la plataforma de hallazgos recibió la última detección.</td>
    </tr>
    <tr>
      <td><code>last_seen_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@last_seen_at</code><br>Marca de tiempo en milisegundos (UTC) de cuándo se detectó el hallazgo más recientemente.</td>
    </tr>
    <tr>
      <td><code>origin</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@origin</code><br>Orígenes de detección que produjeron el hallazgo, como escaneos sin agente, APM, SCA (Software Composition Analysis) o CI (Continuous Integration).</td>
    </tr>
    <tr>
      <td><code>related_services</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@related_services</code><br>Servicios que se infieren de la integración de código fuente (por ejemplo, para hallazgos de SAST).</td>
    </tr>
    <tr>
      <td><code>resource_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@resource_id</code><br>Identificador único del recurso afectado por el hallazgo.</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@resource_name</code><br>Nombre legible por humanos del recurso afectado por el hallazgo.</td>
    </tr>
    <tr>
      <td><code>resource_type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@resource_type</code><br>Tipo del recurso.</td>
    </tr>
    <tr>
      <td><code>severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@severity</code><br>Nivel de gravedad final del hallazgo, después de los ajustes de Datadog y cualquier modificación de gravedad definida por el usuario. Valores válidos: <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>source_finding_raw_data</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@source_finding_raw_data</code><br>Datos sin procesar de integraciones de terceros que generaron el hallazgo.</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@status</code><br>Estado del flujo de trabajo del hallazgo. Valores válidos: <code>open</code>, <code>muted</code>, <code>auto_closed</code>, <code>resolved</code>, <code>in-progress</code>.</td>
    </tr>
    <tr>
      <td><code>time_to_acknowledge</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@time_to_acknowledge</code><br>Tiempo en segundos entre el momento en que se detectó el hallazgo por primera vez y el momento en que se reconoció mediante la asignación o la creación de un ticket.</td>
    </tr>
    <tr>
      <td><code>time_to_resolution</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@time_to_resolution</code><br>Tiempo en segundos entre el momento en que se detectó el hallazgo por primera vez y el momento en que se resolvió.</td>
    </tr>
    <tr>
      <td><code>title</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@title</code><br>Título legible por humanos para el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Recursos adicionales {#additional-resources}

Recursos adicionales. Por ejemplo, una instancia de AWS EC2 puede tener grupos de Security y grupos de Auto Scaling como recursos adicionales.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>category</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@additional_resources.category</code><br>Categoría del recurso adicional. Valores válidos: <code>cloud_resource</code>, <code>k8s</code>, <code>host</code>, <code>service</code>, <code>git</code>, <code>iac_resource</code>, <code>serverless_function</code>.</td>
    </tr>
    <tr>
      <td><code>configuration</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@additional_resources.configuration</code><br>Configuración del recurso adicional.</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@additional_resources.key</code><br>Identificador de recurso en la nube canónico (CCRID) del recurso adicional cuando el recurso está respaldado por la nube (por ejemplo, cuando <code>category</code> es <code>cloud_resource</code>). Este campo puede omitirse para categorías que no sean de la nube, como <code>k8s</code>, <code>host</code>, <code>service</code>, o <code>git</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Aviso" level="h3" id="advisory" %}}

Vincula una vulnerabilidad a un conjunto de versiones de software específicas. Los hallazgos de vulnerabilidades con avisos indican que se detectó una versión vulnerable del software (normalmente a través de SBOM).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>aliases</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@advisory.aliases</code><br>Identificadores adicionales que hacen referencia a la misma vulnerabilidad, creados por otras entidades.</td>
    </tr>
    <tr>
      <td><code>cve</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@advisory.cve</code><br>Identificador principal reconocido a nivel mundial para una vulnerabilidad de Security, siguiendo el <code>CVE-YYYY-NNNN</code> formato.</td>
    </tr>
    <tr>
      <td><code>first_remediation_available_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@advisory.first_remediation_available_at</code><br>Marca de tiempo en milisegundos (UTC) en la que estuvo disponible la primera corrección para el aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@advisory.id</code><br>Identificador interno para el aviso.</td>
    </tr>
    <tr>
      <td><code>modified_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@advisory.modified_at</code><br>Marca de tiempo en milisegundos (UTC) en la que se actualizó el aviso por última vez.</td>
    </tr>
    <tr>
      <td><code>published_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@advisory.published_at</code><br>Marca de tiempo en milisegundos (UTC) en la que se publicó el aviso.</td>
    </tr>
    <tr>
      <td><code>summary</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@advisory.summary</code><br>Resumen breve del aviso.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@advisory.type</code><br>Tipo de aviso. Valores válidos: <code>component_with_known_vulnerability</code>, <code>unmaintained</code>, <code>end_of_life</code>, <code>dangerous_workflows</code>, <code>risky_license</code>, <code>malicious_package</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Punto de conexión de la API" level="h3" id="api-endpoint" %}}

Representación del punto de conexión HTTP.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>method</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@api_endpoint.method</code><br>Método del punto de conexión (verbo HTTP o método gRPC).</td>
    </tr>
    <tr>
      <td><code>operation_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@api_endpoint.operation_name</code><br>Nombre del punto de entrada a un servicio (por ejemplo, <code>http.request</code>, <code>grpc.server</code>).</td>
    </tr>
    <tr>
      <td><code>path</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@api_endpoint.path</code><br>Ruta relativa con plantilla del punto de conexión.</td>
    </tr>
    <tr>
      <td><code>request_path</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@api_endpoint.request_path</code><br>Ruta relativa del punto de conexión.</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@api_endpoint.resource_name</code><br>Identificación interna del punto de conexión en el formato <code>&lt;method&gt; &lt;path&gt;</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Recurso en la nube" level="h3" id="cloud-resource" %}}

Atributos que identifican el recurso en la nube afectado por el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.account</code><br>Cuenta de la nube propietaria del recurso en la nube (por ejemplo, cuenta de AWS, suscripción de Azure, proyecto de GCP, arrendamiento de OCI).</td>
    </tr>
    <tr>
      <td><code>account_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.account_name</code><br>Nombre legible por humanos de la cuenta de la nube propietaria del recurso.</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.category</code><br>Categoría a la que pertenece el tipo de recurso.</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.cloud_provider</code><br>Proveedor de la nube que aloja el recurso. Valores válidos: <code>aws</code>, <code>azure</code>, <code>gcp</code>, <code>oci</code>.</td>
    </tr>
    <tr>
      <td><code>cloud_provider_url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.cloud_provider_url</code><br>Enlace al recurso en la consola del proveedor de la nube.</td>
    </tr>
    <tr>
      <td><code>configuration</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.configuration</code><br>Configuración del recurso en la nube, tal como la devuelve el proveedor de la nube.</td>
    </tr>
    <tr>
      <td><code>context</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.context</code><br>Contexto para el recurso en la nube.</td>
    </tr>
    <tr>
      <td><code>display_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.display_name</code><br>Nombre para mostrar del recurso.</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.key</code><br>Identificador de recurso en la nube canónico (CCRID).</td>
    </tr>
    <tr>
      <td><code>public_accessibility_paths</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.public_accessibility_paths</code><br>Rutas de red a través de las cuales se puede acceder al recurso desde Internet pública.</td>
    </tr>
    <tr>
      <td><code>public_port_ranges</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.public_port_ranges</code><br>Rangos de puertos en el recurso que están expuestos a la internet pública.</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.region</code><br>Región de la nube donde se encuentra el recurso.</td>
    </tr>
  </tbody>
</table>

### Rangos de puertos públicos {#public-port-ranges}

Rangos de puertos en el recurso que están expuestos a Internet pública.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>from_port</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.public_port_ranges.from_port</code><br>Número de puerto inicial del rango expuesto.</td>
    </tr>
    <tr>
      <td><code>to_port</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@cloud_resource.public_port_ranges.to_port</code><br>Número de puerto final del rango expuesto.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Ubicación del código" level="h3" id="code-location" %}}

Atributos que señalan el archivo específico y los números de línea donde se encuentra el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@code_location.column_end</code><br>Posición de la columna final.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@code_location.column_start</code><br>Posición de la columna inicial.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@code_location.filename</code><br>Ruta relativa al archivo.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@code_location.is_test_file</code><br><code>true</code> si el archivo de código es un archivo de prueba; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@code_location.line_end</code><br>Número de línea final.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@code_location.line_start</code><br>Número de línea inicial.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@code_location.symbol</code><br>Nombre del símbolo en la ubicación del código.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@code_location.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), resaltando la ubicación del código.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Compliance" level="h3" id="compliance" %}}

Información específica sobre los hallazgos de cumplimiento, como la regla de cumplimiento o la evaluación (`pass`/`fail`).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>agent</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@compliance.agent</code><br>Metadatos sobre el Compliance Agent que produjo el hallazgo.</td>
    </tr>
    <tr>
      <td><code>evaluation</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@compliance.evaluation</code><br>Resultado de la evaluación de compliance. Valores válidos: <code>pass</code> (el recurso está configurado correctamente), <code>fail</code> (el recurso está mal configurado).</td>
    </tr>
    <tr>
      <td><code>frameworks</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@compliance.frameworks</code><br>Marcos de compliance asignados al hallazgo.</td>
    </tr>
  </tbody>
</table>

### Agent {#agent}

Metadatos sobre el Compliance Agent que generó el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>agent_framework_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@compliance.agent.agent_framework_id</code><br>Identificador del marco de cumplimiento utilizado por el Compliance Agent.</td>
    </tr>
    <tr>
      <td><code>agent_rule_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@compliance.agent.agent_rule_id</code><br>Identificador de la regla del Agent que activó el hallazgo.</td>
    </tr>
    <tr>
      <td><code>agent_version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@compliance.agent.agent_version</code><br>Versión del Compliance Agent que generó el hallazgo.</td>
    </tr>
    <tr>
      <td><code>data</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@compliance.agent.data</code><br>Datos adicionales generados por la evaluación del Compliance Agent.</td>
    </tr>
    <tr>
      <td><code>evaluator</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@compliance.agent.evaluator</code><br>Nombre del evaluador que analizó el hallazgo de cumplimiento.</td>
    </tr>
  </tbody>
</table>

### Frameworks {#frameworks}

Marcos de compliance asignados al hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>control</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@compliance.frameworks.control</code><br>Identificador del control dentro del marco de cumplimiento.</td>
    </tr>
    <tr>
      <td><code>framework</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@compliance.frameworks.framework</code><br>Identificador del marco de cumplimiento (p. ej., <code>cis</code>, <code>pci-dss</code>).</td>
    </tr>
    <tr>
      <td><code>is_default</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@compliance.frameworks.is_default</code><br><code>true</code> si este es el mapeo de marco predeterminado para el hallazgo, <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>requirement</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@compliance.frameworks.requirement</code><br>Identificador del requisito dentro del control.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@compliance.frameworks.version</code><br>Versión del marco de cumplimiento.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Imagen de contenedor" level="h3" id="container-image" %}}

Imagen de contenedor donde se detectó el hallazgo, incluyendo información de registro, repositorio y resumen.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>architectures</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@container_image.architectures</code><br>Arquitecturas asociadas con la imagen de contenedor.</td>
    </tr>
    <tr>
      <td><code>base_image</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@container_image.base_image</code><br>Imagen base sobre la que se construye esta imagen de contenedor. Una imagen base es en sí misma una imagen de contenedor y puede tener sus propios <code>base_image</code>. Ausente cuando no se identifica una imagen base.</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@container_image.git_repository_url</code><br>URL del repositorio Git para el código utilizado para compilar la imagen de contenedor. Disponible solo cuando la Integración de código fuente está configurada.</td>
    </tr>
    <tr>
      <td><code>image_layer_diff_ids</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@container_image.image_layer_diff_ids</code><br>IDs de diferencia de las capas de la imagen, en el orden en que se aplicaron. Cada ID de diferencia es el SHA256 del contenido de la capa sin comprimir.</td>
    </tr>
    <tr>
      <td><code>image_layer_digests</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@container_image.image_layer_digests</code><br>Resúmenes (digests) de las capas de la imagen, en el orden en que se aplicaron. Cada resumen es el SHA256 del blob de la capa comprimida.</td>
    </tr>
    <tr>
      <td><code>is_running_as_serverless_function</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@container_image.is_running_as_serverless_function</code><br><code>true</code> si la imagen de contenedor se está ejecutando como una función sin servidor; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@container_image.name</code><br>Nombre completo de la imagen de contenedor.</td>
    </tr>
    <tr>
      <td><code>oses</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@container_image.oses</code><br>Sistemas operativos asociados con la imagen de contenedor.</td>
    </tr>
    <tr>
      <td><code>registries</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@container_image.registries</code><br>Registro de contenedor donde se almacena la imagen o desde donde se extrajo.</td>
    </tr>
    <tr>
      <td><code>repo_digests</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@container_image.repo_digests</code><br>Resúmenes (digests) del repositorio de la imagen de contenedor donde se detectó el hallazgo.</td>
    </tr>
    <tr>
      <td><code>repository</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@container_image.repository</code><br>Repositorio de la imagen de contenedor.</td>
    </tr>
    <tr>
      <td><code>tags</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@container_image.tags</code><br>Parte de la etiqueta del nombre de la imagen de contenedor (por ejemplo, <code>latest</code> o <code>1.2.3</code>).</td>
    </tr>
    <tr>
      <td><code>versions</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@container_image.versions</code><br>Versiones de la imagen de contenedor donde se detectó el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Sistemas operativos {#operating-systems}

Sistemas operativos asociados con la imagen de contenedor.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@container_image.oses.name</code><br>Nombre del sistema operativo.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@container_image.oses.version</code><br>Versión del sistema operativo.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Herramienta de detección" level="h3" id="detection-tool" %}}

Información sobre la herramienta o motor responsable de detectar el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@detection_tool.name</code><br>Nombre de la herramienta o motor de detección que generó el hallazgo.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@detection_tool.version</code><br>Versión de la herramienta o motor de detección que generó el hallazgo.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Git" level="h3" id="git" %}}

Metadatos de Git que vinculan un hallazgo con el contexto del código fuente. Incluye información sobre el repositorio, la rama, la confirmación, el autor y quien realiza la confirmación.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>author</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@git.author</code><br>Contiene detalles sobre el autor original de la confirmación, incluyendo nombre, correo electrónico y marca de tiempo de creación. Permanece sin cambios cuando la confirmación se rebase, se enmiende o se aplique.</td>
    </tr>
    <tr>
      <td><code>branch</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@git.branch</code><br>Nombre de la rama de Git relacionada con el hallazgo.</td>
    </tr>
    <tr>
      <td><code>codeowners</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@git.codeowners</code><br>Equipos propietarios del código extraídos del archivo CODEOWNERS del proveedor de SCM (Gestión de Control de Fuente) en plataformas como GitHub.</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@git.committer</code><br>Contiene detalles sobre la persona que aplicó la confirmación al repositorio por última vez, incluyendo nombre, correo electrónico y marca de tiempo de la confirmación. Puede diferir del autor cuando la confirmación se rebase, se enmiende o se aplique con <code>git am</code>.</td>
    </tr>
    <tr>
      <td><code>default_branch</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@git.default_branch</code><br>Rama predeterminada definida para el repositorio Git.</td>
    </tr>
    <tr>
      <td><code>is_default_branch</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@git.is_default_branch</code><br><code>true</code> si la rama actual es la rama predeterminada para el repositorio; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>repository_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@git.repository_id</code><br>Identificador normalizado del repositorio Git.</td>
    </tr>
    <tr>
      <td><code>repository_url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@git.repository_url</code><br>URL del repositorio Git relacionado con el hallazgo.</td>
    </tr>
    <tr>
      <td><code>repository_visibility</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@git.repository_visibility</code><br>Visibilidad del repositorio. Valores válidos: <code>public</code>, <code>private</code>, <code>not_detected</code>.</td>
    </tr>
    <tr>
      <td><code>sha</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@git.sha</code><br>Identificador de confirmación de Git (SHA).</td>
    </tr>
  </tbody>
</table>

### Autor {#author}

Contiene detalles sobre el autor original de la confirmación, incluyendo nombre, correo electrónico y marca de tiempo de autoría. Permanece sin cambios cuando la confirmación se rebase, se enmiende o se aplique.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>authored_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@git.author.authored_at</code><br>Marca de tiempo en milisegundos (UTC) en la que se realizaron los cambios originales.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@git.author.email</code><br>Dirección de correo electrónico del autor de la confirmación.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@git.author.name</code><br>Nombre del autor de la confirmación.</td>
    </tr>
  </tbody>
</table>

### Confirmador {#committer}

Contiene detalles sobre la persona que aplicó por última vez la confirmación al repositorio, incluyendo nombre, correo electrónico y marca de tiempo de la confirmación. Puede diferir del autor cuando la confirmación se rebase, se enmiende o se aplique con `git am`.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>committed_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@git.committer.committed_at</code><br>Marca de tiempo en milisegundos (UTC) en la que los cambios se modificaron significativamente por última vez (por ejemplo, durante una operación de rebase o enmienda).</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@git.committer.email</code><br>Dirección de correo electrónico del autor de la confirmación.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@git.committer.name</code><br>Nombre del autor de la confirmación.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Servidor" level="h3" id="host" %}}

Información sobre la máquina del servidor en la que se detectó el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>architectures</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@host.architectures</code><br>Arquitecturas asociadas con el servidor.</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@host.cloud_provider</code><br>Proveedor de nube al que pertenece el servidor.</td>
    </tr>
    <tr>
      <td><code>image</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@host.image</code><br>Nombre de la imagen de servidor utilizada para construir el servidor (por ejemplo, <code>ami-1234</code>).</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@host.key</code><br>Identificador de recurso en la nube canónico (CCRID).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@host.name</code><br>Nombre del servidor.</td>
    </tr>
    <tr>
      <td><code>os</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@host.os</code><br>Atributos del sistema operativo que se ejecuta en el servidor.</td>
    </tr>
  </tbody>
</table>

### Sistema operativo {#operating-system}

Atributos del sistema operativo que se ejecuta en el servidor.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@host.os.name</code><br>Nombre del sistema operativo.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@host.os.version</code><br>Versión del sistema operativo.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Recurso de IaC" level="h3" id="iac-resource" %}}

Atributos que identifican el recurso de Infraestructura como Código (IaC) relacionado con el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>module</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module</code><br>Módulo de Terraform que declara el recurso afectado.</td>
    </tr>
    <tr>
      <td><code>platform</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.platform</code><br>Plataforma de IaC (Infraestructura como Código) en la que se encontró la vulnerabilidad (por ejemplo, <code>terraform</code>, <code>kubernetes</code>).</td>
    </tr>
    <tr>
      <td><code>provider</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.provider</code><br>Proveedor de IaC (Infraestructura como Código) donde se define el recurso (por ejemplo, <code>aws</code>, <code>gcp</code>, <code>azure</code>).</td>
    </tr>
  </tbody>
</table>

### Módulo {#module}

Módulo de Terraform que declara el recurso afectado.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>code_location</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.code_location</code><br>Ubicación del recurso afectado en relación con la raíz del módulo hoja.</td>
    </tr>
    <tr>
      <td><code>dependency_type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.dependency_type</code><br>Indica cómo el módulo raíz llega al módulo hoja. Valores válidos: <code>direct</code>, <code>transitive</code>.</td>
    </tr>
    <tr>
      <td><code>module_path</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path</code><br>Cadena de llamada de módulo ordenada desde la declaración en su repositorio hasta el módulo hoja. Omitido para módulos llamados directamente.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.name</code><br>Etiqueta de Terraform del módulo hoja.</td>
    </tr>
    <tr>
      <td><code>source</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.source</code><br>Dirección de fuente normalizada del módulo hoja, con las credenciales eliminadas.</td>
    </tr>
    <tr>
      <td><code>source_type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.source_type</code><br>Tipo de fuente utilizada por el módulo hoja. Valores válidos: <code>registry</code>, <code>git</code>, <code>local</code>.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.version</code><br>Versión de registro resuelta o referencia de Git del módulo hoja.</td>
    </tr>
  </tbody>
</table>

### Ubicación del código {#code-location}

Ubicación del recurso afectado en relación con la raíz del módulo hoja.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.code_location.column_end</code><br>Posición de la columna final.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.code_location.column_start</code><br>Posición de la columna inicial.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.code_location.filename</code><br>Ruta relativa al archivo.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.code_location.is_test_file</code><br><code>true</code> si el archivo de código es un archivo de prueba; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.code_location.line_end</code><br>Número de línea final.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.code_location.line_start</code><br>Número de línea inicial.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.code_location.symbol</code><br>Nombre del símbolo en la ubicación del código.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.code_location.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), resaltando la ubicación del código.</td>
    </tr>
  </tbody>
</table>

### Ruta del módulo {#module-path}

Cadena de llamada de módulo ordenada desde la declaración en su repositorio hasta el módulo hoja. Omitido para módulos llamados directamente.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>code_location</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.code_location</code><br>Ubicación de la declaración del módulo relativa a su llamador.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.name</code><br>Etiqueta de Terraform de la llamada al módulo.</td>
    </tr>
    <tr>
      <td><code>source</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.source</code><br>Fuente normalizada y sin credenciales del módulo llamado.</td>
    </tr>
    <tr>
      <td><code>source_type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.source_type</code><br>Tipo de fuente utilizada por el módulo llamado. Valores válidos: <code>registry</code>, <code>git</code>, <code>local</code>.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.version</code><br>Versión de registro resuelta o referencia de Git del módulo llamado.</td>
    </tr>
  </tbody>
</table>

### Ubicación del código {#code-location-1}

Ubicación de la declaración del módulo relativa a su llamador.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.code_location.column_end</code><br>Posición de la columna final.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.code_location.column_start</code><br>Posición de la columna inicial.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.code_location.filename</code><br>Ruta relativa al archivo.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.code_location.is_test_file</code><br><code>true</code> si el archivo de código es un archivo de prueba; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.code_location.line_end</code><br>Número de línea final.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.code_location.line_start</code><br>Número de línea inicial.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.code_location.symbol</code><br>Nombre del símbolo en la ubicación del código.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@iac_resource.module.module_path.code_location.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), resaltando la ubicación del código.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Kubernetes" level="h3" id="k8s" %}}

Información de Kubernetes para hallazgos generados contra recursos de Kubernetes.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cluster_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@k8s.cluster_id</code><br>Identificador del clúster de Kubernetes.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Metadatos" level="h3" id="metadata" %}}

Metadatos adicionales sobre el hallazgo, como la versión del esquema o la fuente.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>schema_version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@metadata.schema_version</code><br>Indica la versión del esquema de hallazgos utilizada para el hallazgo.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Paquete" level="h3" id="package" %}}

Información del administrador de paquetes. Un administrador de paquetes automatiza la instalación, actualización, configuración y eliminación de paquetes de software.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>additional_names</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@package.additional_names</code><br>Nombres adicionales de paquetes afectados, si la vulnerabilidad en la nube afectó a varios paquetes derivados del mismo paquete fuente.</td>
    </tr>
    <tr>
      <td><code>declaration</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@package.declaration</code><br>Ubicaciones de código de la definición del paquete.</td>
    </tr>
    <tr>
      <td><code>dependency_location_text</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.dependency_location_text</code><br>(obsoleto) Representación de texto de la ubicación de la dependencia, como la ruta del archivo donde se declara el paquete vulnerable. Utilice <code>custom.package.disk_locations</code> para rutas de archivo en disco, o <code>custom.package.declaration</code> para la ubicación del código donde se declara el paquete.</td>
    </tr>
    <tr>
      <td><code>dependency_type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.dependency_type</code><br>Si el paquete es una dependencia directa, una dependencia transitiva, o no es compatible si la información no se puede recuperar.</td>
    </tr>
    <tr>
      <td><code>disk_locations</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@package.disk_locations</code><br>Ubicaciones en disco donde se encontró el paquete.</td>
    </tr>
    <tr>
      <td><code>has_suid</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@package.has_suid</code><br><code>true</code> si el paquete tiene el bit SUID establecido; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_running</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@package.is_running</code><br><code>true</code> si el paquete se está ejecutando actualmente; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_running_as_root</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@package.is_running_as_root</code><br><code>true</code> si el paquete se está ejecutando actualmente como root; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>loading_type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.loading_type</code><br>Si el componente siempre está cargado y en ejecución (<code>hot</code>), en ejecución con poca frecuencia (<code>cold</code>), o cargado bajo demanda (<code>lazy</code>).</td>
    </tr>
    <tr>
      <td><code>manager</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.manager</code><br>Ecosistema de gestión de paquetes o registro de fuente del que proviene el componente vulnerable.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.name</code><br>Nombre del paquete o biblioteca donde se identificó la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>normalized_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.normalized_name</code><br>Nombre normalizado según el ecosistema del paquete o biblioteca donde se identificó la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>purl</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.purl</code><br>URL del paquete (PURL), un formato estandarizado que identifica el tipo, espacio de nombres, nombre y versión del paquete.</td>
    </tr>
    <tr>
      <td><code>root_parents</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents</code><br>lista de dependencias para las cuales el paquete es una dependencia transitiva.</td>
    </tr>
    <tr>
      <td><code>scope</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.scope</code><br>Contexto de uso previsto del paquete (<code>production</code> o <code>development</code>).</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.type</code><br>Indica la categoría del paquete. Valores válidos: <code>application</code> (paquete gestionado por un gestor de paquetes a nivel de aplicación, como npm, PyPI o Maven) y <code>os</code> (paquete gestionado por un gestor de paquetes a nivel de SO, como apt, apk o yum).</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.version</code><br>Versión del paquete o biblioteca donde se identificó la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

### Declaración {#declaration}

Ubicaciones de código de la definición del paquete.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>block</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.block</code><br>Ubicación del código que declara la declaración completa de la dependencia.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.name</code><br>Ubicación del código que declara el nombre de la dependencia.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.version</code><br>Versión declarada para el padre raíz.</td>
    </tr>
  </tbody>
</table>

### Bloqueo {#block}

Ubicación del código que declara la declaración completa de la dependencia.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.block.column_end</code><br>Posición de la columna final.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.block.column_start</code><br>Posición de la columna inicial.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.block.filename</code><br>Ruta relativa al archivo.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.block.is_test_file</code><br><code>true</code> si el archivo de código es un archivo de prueba; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.block.line_end</code><br>Número de línea final.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.block.line_start</code><br>Número de línea inicial.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.block.symbol</code><br>Nombre del símbolo en la ubicación del código.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.block.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), resaltando la ubicación del código.</td>
    </tr>
  </tbody>
</table>

### Nombre {#name}

Ubicación del código que declara el nombre de la dependencia.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.name.column_end</code><br>Posición de la columna final.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.name.column_start</code><br>Posición de la columna inicial.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.name.filename</code><br>Ruta relativa al archivo.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.name.is_test_file</code><br><code>true</code> si el archivo de código es un archivo de prueba; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.name.line_end</code><br>Número de línea final.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.name.line_start</code><br>Número de línea inicial.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.name.symbol</code><br>Nombre del símbolo en la ubicación del código.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.name.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), resaltando la ubicación del código.</td>
    </tr>
  </tbody>
</table>

### Versión {#version}

Versión declarada para el padre raíz.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.version.column_end</code><br>Posición de la columna final.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.version.column_start</code><br>Posición de la columna inicial.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.version.filename</code><br>Ruta relativa al archivo.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.version.is_test_file</code><br><code>true</code> si el archivo de código es un archivo de prueba; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.version.line_end</code><br>Número de línea final.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.version.line_start</code><br>Número de línea inicial.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.version.symbol</code><br>Nombre del símbolo en la ubicación del código.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.declaration.version.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), resaltando la ubicación del código.</td>
    </tr>
  </tbody>
</table>

### Ubicaciones en disco {#disk-locations}

Contiene las ubicaciones en disco donde se encontró este paquete.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.disk_locations.filename</code><br>Ruta al archivo en el disco donde se encontró el paquete.</td>
    </tr>
  </tbody>
</table>

### Padres raíz {#root-parents}

Lista de dependencias para las cuales el paquete es una dependencia transitiva.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>declaration</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration</code><br>Ubicación del código que declara la versión de un padre raíz.</td>
    </tr>
    <tr>
      <td><code>language</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.language</code><br>Lenguaje de dependencia para el cual el paquete es una dependencia transitiva.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.name</code><br>Nombre de la dependencia para el cual el paquete es una dependencia transitiva.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.version</code><br>Versión de la dependencia para el cual el paquete es una dependencia transitiva.</td>
    </tr>
  </tbody>
</table>

### Declaración {#declaration-1}

Ubicación del código que declara la versión de un padre raíz.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>block</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.block</code><br>Ubicación del código que declara la declaración completa de la dependencia.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.name</code><br>Ubicación del código que declara el nombre de la dependencia.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.version</code><br>Versión declarada para el padre raíz.</td>
    </tr>
  </tbody>
</table>

### Bloqueo {#block-1}

Ubicación del código que declara la declaración completa de la dependencia.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.block.column_end</code><br>Posición de la columna final.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.block.column_start</code><br>Posición de la columna inicial.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.block.filename</code><br>Ruta relativa al archivo.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.block.is_test_file</code><br><code>true</code> si el archivo de código es un archivo de prueba; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.block.line_end</code><br>Número de línea final.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.block.line_start</code><br>Número de línea inicial.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.block.symbol</code><br>Nombre del símbolo en la ubicación del código.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.block.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), resaltando la ubicación del código.</td>
    </tr>
  </tbody>
</table>

### Nombre {#name-1}

Ubicación del código que declara el nombre de la dependencia.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.name.column_end</code><br>Posición de la columna final.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.name.column_start</code><br>Posición de la columna inicial.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.name.filename</code><br>Ruta relativa al archivo.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.name.is_test_file</code><br><code>true</code> si el archivo de código es un archivo de prueba; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.name.line_end</code><br>Número de línea final.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.name.line_start</code><br>Número de línea inicial.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.name.symbol</code><br>Nombre del símbolo en la ubicación del código.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.name.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), resaltando la ubicación del código.</td>
    </tr>
  </tbody>
</table>

### Versión {#version-1}

Versión declarada para el padre raíz.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.version.column_end</code><br>Posición de la columna final.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.version.column_start</code><br>Posición de la columna inicial.</td>
    </tr>
    <tr>
      <td><code>filename</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.version.filename</code><br>Ruta relativa al archivo.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.version.is_test_file</code><br><code>true</code> si el archivo de código es un archivo de prueba; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.version.line_end</code><br>Número de línea final.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.version.line_start</code><br>Número de línea inicial.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.version.symbol</code><br>Nombre del símbolo en la ubicación del código.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@package.root_parents.declaration.version.url</code><br>URL para visualizar el archivo en línea (por ejemplo, en GitHub), resaltando la ubicación del código.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Corrección" level="h3" id="remediation" %}}

Información sobre la corrección del hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_image</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.base_image</code><br>Actualización de la imagen base pública que puede corregir la vulnerabilidad heredada.</td>
    </tr>
    <tr>
      <td><code>code_update</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.code_update</code><br>Cambios de código a aplicar para corregir el hallazgo.</td>
    </tr>
    <tr>
      <td><code>codegen</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.codegen</code><br>Estado del hallazgo para la plataforma de generación de código.</td>
    </tr>
    <tr>
      <td><code>container_image</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.container_image</code><br>Versión de imagen de contenedor más reciente que puede corregir la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.description</code><br>Descripción de la corrección.</td>
    </tr>
    <tr>
      <td><code>host_image</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.host_image</code><br>Última versión de imagen de servidor que puede corregir la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>is_available</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.is_available</code><br><code>true</code> si una corrección está actualmente disponible para el hallazgo; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>microsoft_kb</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.microsoft_kb</code><br>Estrategia de corrección mediante un artículo de Microsoft Knowledge Base (KB).</td>
    </tr>
    <tr>
      <td><code>package</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.package</code><br>Información del paquete de corrección.</td>
    </tr>
    <tr>
      <td><code>recommended</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.recommended</code><br>Detalles de la corrección recomendada.</td>
    </tr>
    <tr>
      <td><code>recommended_type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.recommended_type</code><br>Tipo de corrección recomendada para el hallazgo.</td>
    </tr>
    <tr>
      <td><code>root_package</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package</code><br>Información del paquete raíz de corrección.</td>
    </tr>
  </tbody>
</table>

### Imagen base {#base-image}

Actualización de imagen base pública que puede corregir la vulnerabilidad heredada.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_major</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.base_image.latest_major</code><br>Última versión principal de la imagen base pública que puede corregir la vulnerabilidad heredada.</td>
    </tr>
  </tbody>
</table>

### Versión principal más reciente {#latest-major}

Última versión principal de la imagen base pública que puede corregir la vulnerabilidad heredada.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>image_url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.base_image.latest_major.image_url</code><br>URL de la imagen de contenedor que puede corregir la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.base_image.latest_major.name</code><br>Nombre de la imagen de contenedor que puede remediar la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>repo_digest</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.base_image.latest_major.repo_digest</code><br>Digest del manifiesto (<code>sha256:...</code>) de la imagen de contenedor que puede remediar la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>tag</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.base_image.latest_major.tag</code><br>Etiqueta de la imagen de contenedor que puede remediar la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

### Actualización de código {#code-update}

Cambios de código a aplicar para remediar el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>edits</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.code_update.edits</code><br>Cambios de código necesarios para remediar el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Ediciones {#edits}

Cambios de código necesarios para remediar el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>column_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@remediation.code_update.edits.column_end</code><br>Posición de la columna final del cambio de código.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@remediation.code_update.edits.column_start</code><br>Posición de la columna inicial del cambio de código.</td>
    </tr>
    <tr>
      <td><code>content</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.code_update.edits.content</code><br>Contenido del cambio de código.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@remediation.code_update.edits.line_end</code><br>Número de línea final del cambio de código.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@remediation.code_update.edits.line_start</code><br>Número de línea inicial del cambio de código.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.code_update.edits.type</code><br>Naturaleza del cambio de código.</td>
    </tr>
  </tbody>
</table>

### Codegen {#codegen}

Estado del hallazgo para la plataforma de generación de código.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.codegen.id</code><br>Identificador utilizado para rastrear la remediación en el backend de generación de código.</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.codegen.status</code><br>Estado de la generación de correcciones automatizada. Valores válidos: <code>generated</code>, <code>not_available_non_default_branch</code>, <code>not_available_unsupported_tool</code>, <code>not_available_unsupported_rule</code>, <code>not_available_disabled</code>, <code>not_available_git_provider_not_supported</code>, <code>not_available_confidence_too_low</code>, <code>error</code>, <code>not_available_has_deterministic_fixes</code>, <code>not_available_unknown_reason</code>, <code>not_available_org_not_onboarded</code>, <code>not_available_repository_disabled</code>, <code>not_available_unsupported_resource_type</code>, <code>not_available_unsupported_ecosystem</code>, <code>not_available_severity_too_low</code>, <code>not_available_transitive_library</code>, <code>not_available_no_remediation</code>, <code>not_available_unsupported_vulnerability_type</code>.</td>
    </tr>
  </tbody>
</table>

### Imagen de contenedor {#container-image}

Versión más reciente de la imagen de contenedor que puede remediar la vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_major</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.container_image.latest_major</code><br>Versión principal más reciente de la imagen de contenedor que puede remediar la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

### Versión principal más reciente {#latest-major-1}

Versión principal más reciente de la imagen de contenedor que puede remediar la vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>image_url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.container_image.latest_major.image_url</code><br>URL de la imagen de contenedor que puede corregir la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.container_image.latest_major.name</code><br>Nombre de la imagen de contenedor que puede remediar la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>repo_digest</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.container_image.latest_major.repo_digest</code><br>Digest del manifiesto (<code>sha256:...</code>) de la imagen de contenedor que puede remediar la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>tag</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.container_image.latest_major.tag</code><br>Etiqueta de la imagen de contenedor que puede remediar la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

### Imagen de servidor {#host-image}

Versión más reciente de la imagen de servidor que puede remediar la vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_major</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.host_image.latest_major</code><br>Información sobre la Amazon Machine Image (AMI) más reciente que puede corregir la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

### Versión principal más reciente {#latest-major-2}

Información sobre la Amazon Machine Image (AMI) más reciente que puede corregir la vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.host_image.latest_major.name</code><br>Nombre de la Amazon Machine Image más reciente (por ejemplo, <code>ami-12345678</code>) que puede corregir la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

### Microsoft KB {#microsoft-kb}

Estrategia de corrección mediante un artículo de Microsoft Knowledge Base (KB).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>closest_fix_advisory</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@remediation.microsoft_kb.closest_fix_advisory</code><br>El parche más cercano disponible para abordar el aviso actual.</td>
    </tr>
  </tbody>
</table>

### Aviso de corrección más cercano {#closest-fix-advisory}

El parche más cercano disponible para abordar el aviso actual.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>article</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.microsoft_kb.closest_fix_advisory.article</code><br>Nombre del artículo para el parche más cercano.</td>
    </tr>
  </tbody>
</table>

### Paquete {#package}

Información del paquete de corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base</code><br>Versión actual del paquete en la que se detectó el hallazgo, antes de aplicar cualquier corrección.</td>
    </tr>
    <tr>
      <td><code>closest_minimum_risk_only_no_fix_vulnerabilities</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities</code><br>Versión del paquete más cercana que solo contiene vulnerabilidades para las cuales no hay una solución disponible, minimizando la exposición al riesgo.</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical</code><br>Versión del paquete más cercana sin vulnerabilidades críticas (según la puntuación base).</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities</code><br>La versión de paquete más cercana sin vulnerabilidades.</td>
    </tr>
    <tr>
      <td><code>latest_no_critical</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical</code><br>La versión de paquete de corrección más reciente sin vulnerabilidades críticas (basada en la puntuación base).</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities</code><br>La versión de paquete más reciente sin vulnerabilidades.</td>
    </tr>
  </tbody>
</table>

### Base {#base}

Versión actual del paquete en la que se detectó el hallazgo, antes de aplicar cualquier corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.fixed_advisories</code><br>Avisos que la corrección solucionará.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.has_incomplete_data</code><br>Indicador para señalar si la corrección puede tener datos de dependencia incompletos y, por lo tanto, podría no ser 100% precisa.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.is_auto_solvable</code><br>Indicador para señalar si la corrección se puede resolver automáticamente (solo se necesita recompilar).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.name</code><br>Nombre del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.new_advisories</code><br>Avisos que aparecerán si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.original_name</code><br>Nombre original del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.remaining_advisories</code><br>Avisos que permanecerán sin corregir si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.version</code><br>Versión del paquete recomendado que corrige el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Avisos corregidos {#fixed-advisories}

Avisos que la corrección solucionará.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.fixed_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.fixed_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Nuevos avisos {#new-advisories}

Avisos que aparecerán si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.new_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.new_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Avisos restantes {#remaining-advisories}

Avisos que permanecerán sin corregir si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.remaining_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.base.remaining_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Vulnerabilidades sin solución, de riesgo mínimo, más cercanas {#closest-minimum-risk-only-no-fix-vulnerabilities}

Versión de paquete más cercana que solo contiene vulnerabilidades para las cuales no hay una corrección disponible, minimizando la exposición al riesgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories</code><br>Avisos que la corrección solucionará.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.has_incomplete_data</code><br>Indicador para señalar si la corrección puede tener datos de dependencia incompletos y, por lo tanto, podría no ser 100% precisa.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.is_auto_solvable</code><br>Indicador para señalar si la corrección se puede resolver automáticamente (solo se necesita recompilar).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.name</code><br>Nombre del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories</code><br>Avisos que aparecerán si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.original_name</code><br>Nombre original del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories</code><br>Avisos que permanecerán sin corregir si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.version</code><br>Versión del paquete recomendado que corrige el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Avisos corregidos {#fixed-advisories-1}

Avisos que la corrección solucionará.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Nuevos avisos {#new-advisories-1}

Avisos que aparecerán si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Avisos restantes {#remaining-advisories-1}

Avisos que permanecerán sin corregir si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Más cercano sin críticas {#closest-no-critical}

Versión de paquete más cercana sin vulnerabilidades críticas (basado en la puntuación base).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.fixed_advisories</code><br>Avisos que la corrección solucionará.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.has_incomplete_data</code><br>Indicador para señalar si la corrección puede tener datos de dependencia incompletos y, por lo tanto, podría no ser 100% precisa.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.is_auto_solvable</code><br>Indicador para señalar si la corrección se puede resolver automáticamente (solo se necesita recompilar).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.name</code><br>Nombre del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.new_advisories</code><br>Avisos que aparecerán si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.original_name</code><br>Nombre original del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.remaining_advisories</code><br>Avisos que permanecerán sin corregir si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.version</code><br>Versión del paquete recomendado que corrige el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Avisos corregidos {#fixed-advisories-2}

Avisos que la corrección solucionará.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.fixed_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.fixed_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Nuevos avisos {#new-advisories-2}

Avisos que aparecerán si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.new_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.new_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Avisos restantes {#remaining-advisories-2}

Avisos que permanecerán sin corregir si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.remaining_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_critical.remaining_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Más cercano sin vulnerabilidades {#closest-no-vulnerabilities}

Versión del paquete más cercana sin vulnerabilidades.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.fixed_advisories</code><br>Avisos que la corrección solucionará.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.has_incomplete_data</code><br>Indicador para señalar si la corrección puede tener datos de dependencia incompletos y, por lo tanto, podría no ser 100% precisa.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.is_auto_solvable</code><br>Indicador para señalar si la corrección se puede resolver automáticamente (solo se necesita recompilar).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.name</code><br>Nombre del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.new_advisories</code><br>Avisos que aparecerán si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.original_name</code><br>Nombre original del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.remaining_advisories</code><br>Avisos que permanecerán sin corregir si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.version</code><br>Versión del paquete recomendado que corrige el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Avisos corregidos {#fixed-advisories-3}

Avisos que la corrección solucionará.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.fixed_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.fixed_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Nuevos avisos {#new-advisories-3}

Avisos que aparecerán si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.new_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.new_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Avisos restantes {#remaining-advisories-3}

Avisos que permanecerán sin corregir si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.remaining_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.closest_no_vulnerabilities.remaining_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Más reciente sin vulnerabilidades críticas {#latest-no-critical}

La versión del paquete de corrección más reciente sin vulnerabilidades críticas (basada en la puntuación base).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.fixed_advisories</code><br>Avisos que la corrección solucionará.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.has_incomplete_data</code><br>Indicador para señalar si la corrección puede tener datos de dependencia incompletos y, por lo tanto, podría no ser 100% precisa.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.is_auto_solvable</code><br>Indicador para señalar si la corrección se puede resolver automáticamente (solo se necesita recompilar).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.name</code><br>Nombre del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.new_advisories</code><br>Avisos que aparecerán si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.original_name</code><br>Nombre original del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.remaining_advisories</code><br>Avisos que permanecerán sin corregir si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.version</code><br>Versión del paquete recomendado que corrige el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Avisos corregidos {#fixed-advisories-4}

Avisos que la corrección solucionará.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.fixed_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.fixed_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Nuevos avisos {#new-advisories-4}

Avisos que aparecerán si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.new_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.new_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Avisos restantes {#remaining-advisories-4}

Avisos que permanecerán sin corregir si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.remaining_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_critical.remaining_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Más reciente sin vulnerabilidades {#latest-no-vulnerabilities}

Versión del paquete más reciente sin vulnerabilidades.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.fixed_advisories</code><br>Avisos que la corrección solucionará.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.has_incomplete_data</code><br>Indicador para señalar si la corrección puede tener datos de dependencia incompletos y, por lo tanto, podría no ser 100% precisa.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.is_auto_solvable</code><br>Indicador para señalar si la corrección se puede resolver automáticamente (solo se necesita recompilar).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.name</code><br>Nombre del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.new_advisories</code><br>Avisos que aparecerán si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.original_name</code><br>Nombre original del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.remaining_advisories</code><br>Avisos que permanecerán sin corregir si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.version</code><br>Versión del paquete recomendado que corrige el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Avisos corregidos {#fixed-advisories-5}

Avisos que la corrección solucionará.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.fixed_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.fixed_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Nuevos avisos {#new-advisories-5}

Avisos que aparecerán si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.new_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.new_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Avisos restantes {#remaining-advisories-5}

Avisos que permanecerán sin corregir si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.remaining_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.package.latest_no_vulnerabilities.remaining_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Paquete raíz {#root-package}

Información del paquete raíz de corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base</code><br>Versión actual del paquete en la que se detectó el hallazgo, antes de aplicar cualquier corrección.</td>
    </tr>
    <tr>
      <td><code>closest_minimum_risk_only_no_fix_vulnerabilities</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities</code><br>Versión del paquete más cercana que solo contiene vulnerabilidades para las cuales no hay una solución disponible, minimizando la exposición al riesgo.</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical</code><br>Versión del paquete más cercana sin vulnerabilidades críticas (según la puntuación base).</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities</code><br>La versión de paquete más cercana sin vulnerabilidades.</td>
    </tr>
    <tr>
      <td><code>latest_no_critical</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical</code><br>La versión de paquete de corrección más reciente sin vulnerabilidades críticas (basada en la puntuación base).</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities</code><br>La versión de paquete más reciente sin vulnerabilidades.</td>
    </tr>
  </tbody>
</table>

### Base {#base-1}

Versión actual del paquete en la que se detectó el hallazgo, antes de aplicar cualquier corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.fixed_advisories</code><br>Avisos que la corrección solucionará.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.has_incomplete_data</code><br>Indicador para señalar si la corrección puede tener datos de dependencia incompletos y, por lo tanto, podría no ser 100% precisa.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.is_auto_solvable</code><br>Indicador para señalar si la corrección se puede resolver automáticamente (solo se necesita recompilar).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.name</code><br>Nombre del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.new_advisories</code><br>Avisos que aparecerán si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.original_name</code><br>Nombre original del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.remaining_advisories</code><br>Avisos que permanecerán sin corregir si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.version</code><br>Versión del paquete recomendado que corrige el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Avisos corregidos {#fixed-advisories-6}

Avisos que la corrección solucionará.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.fixed_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.fixed_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Nuevos avisos {#new-advisories-6}

Avisos que aparecerán si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.new_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.new_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Avisos restantes {#remaining-advisories-6}

Avisos que permanecerán sin corregir si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.remaining_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.base.remaining_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Vulnerabilidades sin solución, de riesgo mínimo, más cercanas {#closest-minimum-risk-only-no-fix-vulnerabilities-1}

Versión de paquete más cercana que solo contiene vulnerabilidades para las cuales no hay una corrección disponible, minimizando la exposición al riesgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories</code><br>Avisos que la corrección solucionará.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.has_incomplete_data</code><br>Indicador para señalar si la corrección puede tener datos de dependencia incompletos y, por lo tanto, podría no ser 100% precisa.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.is_auto_solvable</code><br>Indicador para señalar si la corrección se puede resolver automáticamente (solo se necesita recompilar).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.name</code><br>Nombre del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories</code><br>Avisos que aparecerán si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.original_name</code><br>Nombre original del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories</code><br>Avisos que permanecerán sin corregir si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.version</code><br>Versión del paquete recomendado que corrige el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Avisos corregidos {#fixed-advisories-7}

Avisos que la corrección solucionará.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.fixed_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Nuevos avisos {#new-advisories-7}

Avisos que aparecerán si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.new_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Avisos restantes {#remaining-advisories-7}

Avisos que permanecerán sin corregir si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_minimum_risk_only_no_fix_vulnerabilities.remaining_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Más cercano sin críticas {#closest-no-critical-1}

Versión de paquete más cercana sin vulnerabilidades críticas (basado en la puntuación base).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.fixed_advisories</code><br>Avisos que la corrección solucionará.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.has_incomplete_data</code><br>Indicador para señalar si la corrección puede tener datos de dependencia incompletos y, por lo tanto, podría no ser 100% precisa.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.is_auto_solvable</code><br>Indicador para señalar si la corrección se puede resolver automáticamente (solo se necesita recompilar).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.name</code><br>Nombre del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.new_advisories</code><br>Avisos que aparecerán si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.original_name</code><br>Nombre original del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.remaining_advisories</code><br>Avisos que permanecerán sin corregir si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.version</code><br>Versión del paquete recomendado que corrige el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Avisos corregidos {#fixed-advisories-8}

Avisos que la corrección solucionará.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.fixed_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.fixed_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Nuevos avisos {#new-advisories-8}

Avisos que aparecerán si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.new_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.new_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Avisos restantes {#remaining-advisories-8}

Avisos que permanecerán sin corregir si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.remaining_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_critical.remaining_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Más cercano sin vulnerabilidades {#closest-no-vulnerabilities-1}

Versión del paquete más cercana sin vulnerabilidades.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.fixed_advisories</code><br>Avisos que la corrección solucionará.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.has_incomplete_data</code><br>Indicador para señalar si la corrección puede tener datos de dependencia incompletos y, por lo tanto, podría no ser 100% precisa.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.is_auto_solvable</code><br>Indicador para señalar si la corrección se puede resolver automáticamente (solo se necesita recompilar).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.name</code><br>Nombre del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.new_advisories</code><br>Avisos que aparecerán si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.original_name</code><br>Nombre original del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.remaining_advisories</code><br>Avisos que permanecerán sin corregir si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.version</code><br>Versión del paquete recomendado que corrige el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Avisos corregidos {#fixed-advisories-9}

Avisos que la corrección solucionará.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.fixed_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.fixed_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Nuevos avisos {#new-advisories-9}

Avisos que aparecerán si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.new_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.new_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Avisos restantes {#remaining-advisories-9}

Avisos que permanecerán sin corregir si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.remaining_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.closest_no_vulnerabilities.remaining_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Más reciente sin vulnerabilidades críticas {#latest-no-critical-1}

La versión del paquete de corrección más reciente sin vulnerabilidades críticas (basada en la puntuación base).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.fixed_advisories</code><br>Avisos que la corrección solucionará.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.has_incomplete_data</code><br>Indicador para señalar si la corrección puede tener datos de dependencia incompletos y, por lo tanto, podría no ser 100% precisa.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.is_auto_solvable</code><br>Indicador para señalar si la corrección se puede resolver automáticamente (solo se necesita recompilar).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.name</code><br>Nombre del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.new_advisories</code><br>Avisos que aparecerán si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.original_name</code><br>Nombre original del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.remaining_advisories</code><br>Avisos que permanecerán sin corregir si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.version</code><br>Versión del paquete recomendado que corrige el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Avisos corregidos {#fixed-advisories-10}

Avisos que la corrección solucionará.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.fixed_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.fixed_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Nuevos avisos {#new-advisories-10}

Avisos que aparecerán si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.new_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.new_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Avisos restantes {#remaining-advisories-10}

Avisos que permanecerán sin corregir si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.remaining_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_critical.remaining_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Más reciente sin vulnerabilidades {#latest-no-vulnerabilities-1}

Versión del paquete más reciente sin vulnerabilidades.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.fixed_advisories</code><br>Avisos que la corrección solucionará.</td>
    </tr>
    <tr>
      <td><code>has_incomplete_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.has_incomplete_data</code><br>Indicador para señalar si la corrección puede tener datos de dependencia incompletos y, por lo tanto, podría no ser 100% precisa.</td>
    </tr>
    <tr>
      <td><code>is_auto_solvable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.is_auto_solvable</code><br>Indicador para señalar si la corrección se puede resolver automáticamente (solo se necesita recompilar).</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.name</code><br>Nombre del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>new_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.new_advisories</code><br>Avisos que aparecerán si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>original_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.original_name</code><br>Nombre original del paquete recomendado que corrige el hallazgo.</td>
    </tr>
    <tr>
      <td><code>remaining_advisories</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.remaining_advisories</code><br>Avisos que permanecerán sin corregir si se aplica la corrección.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.version</code><br>Versión del paquete recomendado que corrige el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Avisos corregidos {#fixed-advisories-11}

Avisos que la corrección solucionará.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.fixed_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.fixed_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Nuevos avisos {#new-advisories-11}

Avisos que aparecerán si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.new_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.new_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

### Avisos restantes {#remaining-advisories-11}

Avisos que permanecerán sin corregir si se aplica la corrección.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>base_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.remaining_advisories.base_severity</code><br>Gravedad base del aviso.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@remediation.root_package.latest_no_vulnerabilities.remaining_advisories.id</code><br>Identificador del aviso.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Riesgo" level="h3" id="risk" %}}

Atributos relacionados con el riesgo para el hallazgo. Cada clave debe tener una clave coincidente en el espacio de nombres `risk_details`.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.has_exploit_available</code><br><code>true</code> si existen exploits conocidos para el hallazgo; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.has_high_exploitability_chance</code><br><code>true</code> si la puntuación del EPSS (Exploit Prediction Scoring System) es superior al 1%; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.has_privileged_access</code><br><code>true</code> si el recurso del hallazgo se está ejecutando con privilegios elevados o tiene la capacidad de asumir un rol privilegiado; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>has_sensitive_data</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.has_sensitive_data</code><br><code>true</code> si el hallazgo tiene acceso a un recurso que contiene datos confidenciales; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_authenticated</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_authenticated</code><br><code>true</code> si el punto de conexión de la API requiere autenticación para acceder; <code>false</code> si el punto de conexión no requiere autenticación. Se omite si se desconoce el estado de la autenticación.</td>
    </tr>
    <tr>
      <td><code>is_crown_jewel</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_crown_jewel</code><br><code>true</code> si el recurso afectado es crítico para su negocio; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_emerging</code><br><code>true</code> si la vulnerabilidad está vinculada a un aviso clasificado como una vulnerabilidad emergente; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_exposed_to_attacks</code><br><code>true</code> si ya se han detectado ataques en el recurso; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_function_reachable</code><br><code>true</code> si la función vulnerable puede ejecutarse; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_image_running</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_image_running</code><br><code>true</code> si la imagen del recurso del hallazgo tiene contenedores o servidores en ejecución; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_kernel_running</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_kernel_running</code><br><code>true</code> si la vulnerabilidad afecta al kernel que se está ejecutando actualmente en el servidor; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_package_running</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_package_running</code><br><code>true</code> si el paquete del recurso del hallazgo se está ejecutando; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_production</code><br><code>true</code> si el recurso del hallazgo se está ejecutando en producción; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_publicly_accessible</code><br><code>true</code> si el recurso del hallazgo es accesible públicamente; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_tainted_from_database</code><br><code>true</code> si la cadena está contaminada debido a que proviene de una fuente de base de datos no confiable; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_tainted_from_query_string</code><br><code>true</code> si la cadena está contaminada con elementos derivados de una cadena de consulta HTTP; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_tainted_from_request_url</code><br><code>true</code> si la URL final contiene partes contaminadas que se originan en la URL de la solicitud; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk.is_using_sha1</code><br><code>true</code> si se utiliza SHA1 en un hash débil; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Detalles del riesgo" level="h3" id="risk-details" %}}

Factores de riesgo contextuales que ayudan a evaluar el impacto potencial de un hallazgo. Estos campos describen características como la exposición, la sensibilidad y los signos de explotación activa.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_exploit_available</code><br>Información sobre si existe un exploit conocido para el aviso del hallazgo.</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_high_exploitability_chance</code><br>Evidencia e indicadores sobre si es probable que la vulnerabilidad sea explotada según el EPSS (Sistema de puntuación de predicción de exploits).</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_privileged_access</code><br>Evidencia e indicadores sobre si el recurso tiene acceso privilegiado.</td>
    </tr>
    <tr>
      <td><code>has_sensitive_data</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_sensitive_data</code><br>Evidencia e indicadores sobre si el recurso afectado tiene datos confidenciales.</td>
    </tr>
    <tr>
      <td><code>is_authenticated</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_authenticated</code><br>Evidencia e indicadores sobre si el punto de conexión de la API requiere autenticación.</td>
    </tr>
    <tr>
      <td><code>is_crown_jewel</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_crown_jewel</code><br>Evidencia e indicadores sobre si el recurso afectado es crítico.</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_emerging</code><br>Evidencia e indicadores sobre si la vulnerabilidad está clasificada como una vulnerabilidad emergente.</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_exposed_to_attacks</code><br>Evidencia e indicadores sobre si el servicio donde se detectó el hallazgo está expuesto a ataques.</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_function_reachable</code><br>Evidencia e indicadores sobre si la función o el módulo vulnerable se utiliza en el código.</td>
    </tr>
    <tr>
      <td><code>is_image_running</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_image_running</code><br>Evidencia e indicadores sobre si la imagen afectada tiene contenedores o hosts en ejecución.</td>
    </tr>
    <tr>
      <td><code>is_kernel_running</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_kernel_running</code><br>Evidencia e indicadores sobre si la vulnerabilidad afecta al kernel que se está ejecutando actualmente en el servidor.</td>
    </tr>
    <tr>
      <td><code>is_package_running</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_package_running</code><br>Evidencia e indicadores sobre si el paquete afectado se está ejecutando.</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_production</code><br>Evidencia e indicadores sobre si el recurso asociado con el hallazgo se está ejecutando en un entorno de producción.</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_publicly_accessible</code><br>Información sobre si el recurso afectado es accesible desde la internet pública.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_tainted_from_database</code><br>Información sobre si las partes contaminadas provienen de una base de datos.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_tainted_from_query_string</code><br>Información sobre si las partes contaminadas provienen de una cadena de consulta.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_tainted_from_request_url</code><br>Información sobre si las partes contaminadas provienen de la URL de solicitud.</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_using_sha1</code><br>Información sobre si SHA1 se utiliza en un hash débil.</td>
    </tr>
  </tbody>
</table>

### Tiene exploit disponible {#has-exploit-available}

Información sobre si existe un exploit conocido para el aviso del hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_exploit_available.evidence</code><br>Evidencia de la disponibilidad de exploits.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_exploit_available.impact_cvss</code><br>Cómo la disponibilidad de exploits conocidos cambia la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_exploit_available.value</code><br><code>true</code> si existen exploits conocidos para el hallazgo; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

### Evidencia {#evidence}

Evidencia de la disponibilidad de exploits.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>exploit_sources</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_exploit_available.evidence.exploit_sources</code><br>Fuentes de exploits asociadas con el hallazgo (por ejemplo, <code>NIST</code>, <code>CISA</code>, <code>Exploit-DB</code>).</td>
    </tr>
    <tr>
      <td><code>exploit_urls</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_exploit_available.evidence.exploit_urls</code><br>URLs de exploits asociadas con el hallazgo.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_exploit_available.evidence.type</code><br>Tipo de evidencia de disponibilidad de exploits. Valores válidos: <code>production_ready</code>, <code>poc</code>, <code>unavailable</code>.</td>
    </tr>
  </tbody>
</table>

### Tiene alta probabilidad de explotabilidad {#has-high-exploitability-chance}

Evidencia e indicadores sobre si es probable que la vulnerabilidad sea explotada según el EPSS (Sistema de puntuación de predicción de exploits).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_high_exploitability_chance.evidence</code><br>Evidencia para la puntuación EPSS.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_high_exploitability_chance.impact_cvss</code><br>Cómo afecta la alta probabilidad de explotabilidad a la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_high_exploitability_chance.value</code><br><code>true</code> si la puntuación EPSS es superior al 1%; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

### Evidencia {#evidence-1}

Evidencia para la puntuación EPSS.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>epss_score</code></td>
      <td>número</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_high_exploitability_chance.evidence.epss_score</code><br>Puntuación EPSS como porcentaje que representa la probabilidad de explotación.</td>
    </tr>
    <tr>
      <td><code>epss_severity</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_high_exploitability_chance.evidence.epss_severity</code><br>Puntuación de gravedad EPSS. Valores válidos: <code>Critical</code>, <code>High</code>, <code>Medium</code>, <code>Low</code>.</td>
    </tr>
    <tr>
      <td><code>threshold</code></td>
      <td>número</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_high_exploitability_chance.evidence.threshold</code><br>Puntuación EPSS mínima requerida para que una vulnerabilidad sea considerada como de alta probabilidad de explotabilidad.</td>
    </tr>
  </tbody>
</table>

### Tiene acceso privilegiado {#has-privileged-access}

Evidencia e indicadores sobre si el recurso tiene acceso privilegiado.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_privileged_access.evidence</code><br>Evidencia que muestra una prueba de acceso privilegiado.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_privileged_access.impact_cvss</code><br>Cómo cambia el acceso privilegiado la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_privileged_access.value</code><br><code>true</code> si el recurso asociado con el hallazgo tiene acceso privilegiado; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

### Evidencia {#evidence-2}

Evidencia que muestra una prueba de acceso privilegiado.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>resource_key</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_privileged_access.evidence.resource_key</code><br>Identificador de recurso en la nube canónico con prueba de acceso privilegiado.</td>
    </tr>
  </tbody>
</table>

### Tiene datos confidenciales {#has-sensitive-data}

Evidencia e indicadores sobre si el recurso afectado tiene datos confidenciales.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_sensitive_data.evidence</code><br>Evidencia que respalda la presencia de datos confidenciales.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_sensitive_data.impact_cvss</code><br>Cómo la presencia de datos confidenciales cambia la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_sensitive_data.value</code><br>Igual que <code>risk.has_sensitive_data</code>.</td>
    </tr>
  </tbody>
</table>

### Evidencia {#evidence-3}

Evidencia que respalda la presencia de datos confidenciales.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>sds_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.has_sensitive_data.evidence.sds_id</code><br>Identificador de una entrada de datos confidenciales que detectó Datadog Sensitive Data Scanner.</td>
    </tr>
  </tbody>
</table>

### Está autenticado {#is-authenticated}

Evidencia e indicadores sobre si el punto de conexión de la API requiere autenticación.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_authenticated.value</code><br>Igual que <code>risk.is_authenticated</code>.</td>
    </tr>
  </tbody>
</table>

### Es Crown Jewel {#is-crown-jewel}

Evidencia e indicadores sobre si el recurso afectado es crítico.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_crown_jewel.evidence</code><br>Evidencia utilizada para identificar el recurso como crítico.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_crown_jewel.impact_cvss</code><br>Cómo la criticidad del recurso cambia la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_crown_jewel.value</code><br><code>true</code> si el recurso es crítico para su negocio; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

### Evidencia {#evidence-4}

Evidencia utilizada para identificar el recurso como crítico.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>explanation</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_crown_jewel.evidence.explanation</code><br>Explicación que detalla por qué el recurso o el recurso relacionado se identifica como crítico.</td>
    </tr>
    <tr>
      <td><code>related_resource_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_crown_jewel.evidence.related_resource_name</code><br>Nombre de un activo crítico de larga duración, como un servicio crítico, que justifica por qué el recurso afectado se considera crítico.</td>
    </tr>
    <tr>
      <td><code>related_resource_type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_crown_jewel.evidence.related_resource_type</code><br>Tipo de activo crítico de larga duración que justifica por qué el recurso afectado se considera crítico.</td>
    </tr>
    <tr>
      <td><code>sensitive_data</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_crown_jewel.evidence.sensitive_data</code><br>Tipos de datos confidenciales detectados en el recurso que contribuyen a su clasificación como activo crítico (por ejemplo, <code>visa_credit_card</code>).</td>
    </tr>
  </tbody>
</table>

### Es emergente {#is-emerging}

Evidencia e indicadores sobre si la vulnerabilidad está clasificada como una vulnerabilidad emergente.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_emerging.impact_cvss</code><br>Cómo el estado de vulnerabilidad emergente afecta la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_emerging.value</code><br>Igual que <code>risk.is_emerging</code>.</td>
    </tr>
  </tbody>
</table>

### Está expuesto a ataques {#is-exposed-to-attacks}

Evidencia e indicadores sobre si el servicio donde se detectó el hallazgo está expuesto a ataques.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_exposed_to_attacks.evidence</code><br>Evidencia de la presencia de ataques.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_exposed_to_attacks.impact_cvss</code><br>Cómo la exposición del recurso afecta la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_exposed_to_attacks.value</code><br>Igual que <code>risk.is_exposed_to_attacks</code>.</td>
    </tr>
  </tbody>
</table>

### Evidencia {#evidence-5}

Evidencia de la presencia de ataques.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>attacks_details</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_exposed_to_attacks.evidence.attacks_details</code><br>Detalles sobre uno de los ataques detectados.</td>
    </tr>
    <tr>
      <td><code>trace_example</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_exposed_to_attacks.evidence.trace_example</code><br>Ejemplo de una traza con ataques detectados en el recurso del hallazgo.</td>
    </tr>
    <tr>
      <td><code>trace_query</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_exposed_to_attacks.evidence.trace_query</code><br>Consulta utilizada para encontrar trazas con ataques relacionados con el recurso del hallazgo.</td>
    </tr>
  </tbody>
</table>

### Es la función alcanzable {#is-function-reachable}

Evidencia e indicadores sobre si la función o el módulo vulnerable se utiliza en el código.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_function_reachable.evidence</code><br>Evidencia utilizada para determinar si la función es alcanzable.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_function_reachable.impact_cvss</code><br>Cómo la alcanzabilidad de la función cambia la evaluación de riesgo CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_function_reachable.value</code><br><code>true</code> si la función es alcanzable; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

### Evidencia {#evidence-6}

Evidencia utilizada para determinar si la función es alcanzable.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>is_supported</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_function_reachable.evidence.is_supported</code><br><code>true</code> si el análisis de alcanzabilidad está soportado para este hallazgo, <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>locations</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_function_reachable.evidence.locations</code><br>Arreglo de ubicaciones de código donde se llama a la función.</td>
    </tr>
    <tr>
      <td><code>not_supported_reason</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_function_reachable.evidence.not_supported_reason</code><br>Razón por la cual el análisis de alcanzabilidad no está soportado para este hallazgo. Valores válidos: <code>language_not_supported</code>, <code>vulnerable_symbol_not_available</code>.</td>
    </tr>
    <tr>
      <td><code>unreachable_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_function_reachable.evidence.unreachable_at</code><br>Marca de tiempo en milisegundos (UTC) en la que el hallazgo pasa a un estado no alcanzable si no se llama a la función vulnerable.</td>
    </tr>
  </tbody>
</table>

### Ubicaciones {#locations}

Arreglo de ubicaciones de código donde se llama a la función.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_function_reachable.evidence.locations.filename</code><br>Ruta relativa al archivo.</td>
    </tr>
    <tr>
      <td><code>last_detected_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_function_reachable.evidence.locations.last_detected_at</code><br>Marca de tiempo en milisegundos (UTC) de la detección más reciente de esta función en la ubicación del código.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_function_reachable.evidence.locations.line_start</code><br>Número de línea inicial.</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_function_reachable.evidence.locations.symbol</code><br>Nombre del símbolo en la ubicación del código.</td>
    </tr>
  </tbody>
</table>

### ¿Está la imagen en ejecución? {#is-image-running}

Evidencia e indicadores sobre si la imagen afectada tiene contenedores o hosts en ejecución.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_image_running.evidence</code><br>Evidencia que demuestra la existencia de contenedores o hosts en ejecución.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_image_running.impact_cvss</code><br>Cómo afecta la ejecución de contenedores o hosts a la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_image_running.value</code><br><code>true</code> si la imagen del recurso del hallazgo tiene contenedores o servidores en ejecución; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

### Evidencia {#evidence-7}

Evidencia que muestra pruebas de contenedores o servidores en ejecución.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>detected_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_image_running.evidence.detected_at</code><br>Marca de tiempo de cuándo se detectaron los contenedores o servidores en ejecución.</td>
    </tr>
  </tbody>
</table>

### ¿El kernel está en ejecución? {#is-kernel-running}

Evidencia e indicadores sobre si la vulnerabilidad afecta al kernel que se está ejecutando actualmente en el servidor.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_kernel_running.evidence</code><br>Evidencia que demuestra que la vulnerabilidad afecta al kernel en ejecución.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_kernel_running.value</code><br><code>true</code> si la vulnerabilidad afecta al kernel que se está ejecutando actualmente en el servidor; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

### Evidencia {#evidence-8}

Evidencia que demuestra que la vulnerabilidad afecta al kernel en ejecución.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>kernel_version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_kernel_running.evidence.kernel_version</code><br>Versión del kernel que se está ejecutando actualmente en el servidor.</td>
    </tr>
  </tbody>
</table>

### Está Ejecutándose el Paquete {#is-package-running}

Evidencia e indicadores sobre si el paquete afectado se está ejecutando.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_package_running.impact_cvss</code><br>Cómo afecta el hecho de que un paquete se esté ejecutando a la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_package_running.value</code><br><code>true</code> si el paquete del recurso del hallazgo se está ejecutando; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

### Es Producción {#is-production}

Evidencia e indicadores sobre si el recurso asociado con el hallazgo se está ejecutando en un entorno de producción.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_production.evidence</code><br>El <code>env</code> El valor de etiqueta que determina si el recurso está en producción.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_production.impact_cvss</code><br>Cómo afecta la puntuación CVSS el estado del entorno de producción. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_production.value</code><br>Igual que <code>risk.is_production</code>.</td>
    </tr>
  </tbody>
</table>

### Es accesible públicamente {#is-publicly-accessible}

Información sobre si el recurso afectado es accesible desde la internet pública.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evidence</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_publicly_accessible.evidence</code><br>Evidencia que muestra una prueba de acceso desde internet.</td>
    </tr>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_publicly_accessible.impact_cvss</code><br>Cómo afecta la accesibilidad pública a la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_publicly_accessible.value</code><br>Igual que <code>risk.is_publicly_accessible</code>.</td>
    </tr>
  </tbody>
</table>

### Evidencia {#evidence-9}

Evidencia que muestra una prueba de acceso desde internet.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>resource_key</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_publicly_accessible.evidence.resource_key</code><br>Identificador de recurso en la nube canónico del recurso accesible desde internet.</td>
    </tr>
  </tbody>
</table>

### Está contaminado por la fuente de datos {#is-tainted-from-database}

Información sobre si las partes contaminadas provienen de una fuente de datos.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_tainted_from_database.impact_cvss</code><br>Cómo afecta la contaminación de la base de datos a la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_tainted_from_database.value</code><br><code>true</code> si la cadena está contaminada debido a que proviene de una fuente de base de datos no confiable; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

### Está contaminado por la cadena de consulta {#is-tainted-from-query-string}

Información sobre si las partes contaminadas provienen de una cadena de consulta.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_tainted_from_query_string.impact_cvss</code><br>Cómo afecta la contaminación de la cadena de consulta a la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_tainted_from_query_string.value</code><br><code>true</code> si la cadena contiene elementos derivados de una cadena de consulta HTTP; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

### Está contaminado por la URL de solicitud {#is-tainted-from-request-url}

Información sobre si las partes contaminadas provienen de la URL de solicitud.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_tainted_from_request_url.impact_cvss</code><br>Cómo afecta la contaminación de la URL de solicitud a la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_tainted_from_request_url.value</code><br><code>true</code> si la URL final contiene partes contaminadas que se originan en la URL de la solicitud; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

### Está usando SHA1 {#is-using-sha1}

Información sobre si se utiliza SHA1 en un hash débil.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_using_sha1.impact_cvss</code><br>Cómo cambia el uso de SHA1 la puntuación CVSS. Valores válidos: <code>riskier</code>, <code>neutral</code>, <code>safer</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@risk_details.is_using_sha1.value</code><br><code>true</code> si se utiliza SHA1 en un hash débil; <code>false</code> de lo contrario.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Regla" level="h3" id="rule" %}}

Cómo descubrir una vulnerabilidad. Los hallazgos de vulnerabilidades con reglas indican que la vulnerabilidad se detectó en el código fuente o en el código en ejecución. Las reglas también se utilizan para hallazgos que no son vulnerabilidades, como configuraciones incorrectas o API Security.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>default_rule_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@rule.default_rule_id</code><br>Identificador de regla predeterminado de la regla. Vacío si es una regla personalizada.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@rule.id</code><br>Identificador de la regla que generó el hallazgo.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@rule.name</code><br>Nombre de la regla que generó el hallazgo.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@rule.type</code><br>Tipo de la regla que generó el hallazgo.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@rule.version</code><br>Versión de la regla que generó el hallazgo.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Contexto de tiempo de ejecución" level="h3" id="runtime-context" %}}

Agrupa atributos relacionados con el contexto de tiempo de ejecución.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>database_monitoring</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@runtime_context.database_monitoring</code><br>Contiene el contexto de monitoreo de base de datos asociado con el hallazgo.</td>
    </tr>
    <tr>
      <td><code>span_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@runtime_context.span_id</code><br>Identificador de tramo donde se detectó el hallazgo. Disponible solo para IAST (Interactive Application Security Testing).</td>
    </tr>
    <tr>
      <td><code>stacktrace_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@runtime_context.stacktrace_id</code><br>Identificador de traza de pila donde se detectó el hallazgo. Disponible solo para IAST (Interactive Application Security Testing).</td>
    </tr>
    <tr>
      <td><code>trace_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@runtime_context.trace_id</code><br>Identificador de traza donde se detectó el hallazgo. Disponible solo para IAST (Interactive Application Security Testing).</td>
    </tr>
    <tr>
      <td><code>vulnerable_services</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@runtime_context.vulnerable_services</code><br>Enumera las versiones de servicio en ejecución afectadas por el hallazgo, cada una identificada por entorno de despliegue, versión y SHA de confirmación de Git.</td>
    </tr>
  </tbody>
</table>

### Database Monitoring {#database-monitoring}

Contiene el contexto de monitoreo de la base de datos asociado con el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>database_instances</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@runtime_context.database_monitoring.database_instances</code><br>Identificadores de las instancias de base de datos afectadas por el hallazgo.</td>
    </tr>
    <tr>
      <td><code>query_signature</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@runtime_context.database_monitoring.query_signature</code><br>Hash de la consulta SQL normalizada asociada con el hallazgo.</td>
    </tr>
  </tbody>
</table>

### Servicios vulnerables {#vulnerable-services}

Enumera las versiones de servicio en ejecución afectadas por el hallazgo, cada una identificada por entorno de despliegue, versión y SHA de confirmación de Git.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>commit_sha</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@runtime_context.vulnerable_services.commit_sha</code><br>Contiene el SHA de confirmación de Git del servicio vulnerable.</td>
    </tr>
    <tr>
      <td><code>env</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@runtime_context.vulnerable_services.env</code><br>Indica el entorno de despliegue del servicio vulnerable (por ejemplo, <code>prod</code>, <code>staging</code>).</td>
    </tr>
    <tr>
      <td><code>service_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@runtime_context.vulnerable_services.service_name</code><br>Contiene el nombre del servicio vulnerable.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@runtime_context.vulnerable_services.version</code><br>Contiene el identificador de versión del servicio vulnerable.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Secreto" level="h3" id="secret" %}}

Información específica sobre hallazgos de secretos, como el estado de validación del secreto.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>is_git_history_only</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@secret.is_git_history_only</code><br><code>true</code> si el secreto aparece solo en confirmaciones anteriores y no en la rama <code>HEAD</code>; <code>false</code> si el secreto está presente en <code>HEAD</code>.</td>
    </tr>
    <tr>
      <td><code>validation_status</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@secret.validation_status</code><br>Resultado del intento de validar si el secreto está activo.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Datos confidenciales" level="h3" id="sensitive-data" %}}

Atributos específicos de los hallazgos de Sensitive Data Scanner (SDS).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>match_action_type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@sensitive_data.match_action_type</code><br>Indica la acción de coincidencia configurada en la regla de Sensitive Data Scanner, tal como <code>redact</code> o <code>hash</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Servicio" level="h3" id="service" %}}

Información sobre el servicio donde se detectó el hallazgo, incluyendo su nombre y metadatos del código fuente.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>git_commit_sha</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@service.git_commit_sha</code><br>SHA de la confirmación de Git de la última confirmación donde se detectó el hallazgo para el servicio. Disponible solo cuando la Integración de código fuente está configurada.</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@service.git_repository_url</code><br>URL del repositorio de Git para el servicio asociado con el hallazgo. Disponible solo cuando la Integración de código fuente está configurada.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@service.name</code><br>Nombre del servicio donde se detectó el hallazgo.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Detalles de gravedad" level="h3" id="severity-details" %}}

Información detallada de gravedad para el hallazgo, incluyendo la gravedad base y ajustada.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>adjusted</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@severity_details.adjusted</code><br>Gravedad ajustada del hallazgo después de considerar factores contextuales o ambientales.</td>
    </tr>
    <tr>
      <td><code>base</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@severity_details.base</code><br>Gravedad base del hallazgo según lo definido por la regla, aviso o escáner original, antes de cualquier ajuste contextual.</td>
    </tr>
    <tr>
      <td><code>user_adjusted</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@severity_details.user_adjusted</code><br>Gravedad del hallazgo después de la aplicación de modificaciones de gravedad definidas por el usuario.</td>
    </tr>
  </tbody>
</table>

### Ajustado {#adjusted}

Gravedad ajustada del hallazgo tras tener en cuenta factores contextuales o ambientales.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>score</code></td>
      <td>número</td>
      <td><strong>Ruta:</strong> <code>@severity_details.adjusted.score</code><br>Puntuación numérica de gravedad (escala CVSS).</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@severity_details.adjusted.value</code><br>Nivel de gravedad. Valores válidos: <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value_id</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@severity_details.adjusted.value_id</code><br>Representación numérica de la gravedad. Valores: <code>critical</code> = <code>10</code>, <code>high</code> = <code>9</code>, <code>medium</code> = <code>7</code>, <code>low</code> = <code>4</code>, <code>none</code> = <code>0</code>.</td>
    </tr>
    <tr>
      <td><code>vector</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@severity_details.adjusted.vector</code><br>Cadena de vector CVSS.</td>
    </tr>
  </tbody>
</table>

### Base {#base-2}

Gravedad base del hallazgo según lo definido por la regla, aviso o escáner original, antes de cualquier ajuste contextual.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>score</code></td>
      <td>número</td>
      <td><strong>Ruta:</strong> <code>@severity_details.base.score</code><br>Puntuación numérica de gravedad (escala CVSS).</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@severity_details.base.value</code><br>Nivel de gravedad. Valores válidos: <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value_id</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@severity_details.base.value_id</code><br>Representación numérica de la gravedad. Valores: <code>critical</code> = <code>10</code>, <code>high</code> = <code>9</code>, <code>medium</code> = <code>7</code>, <code>low</code> = <code>4</code>, <code>none</code> = <code>0</code>.</td>
    </tr>
    <tr>
      <td><code>vector</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@severity_details.base.vector</code><br>Cadena de vector CVSS.</td>
    </tr>
  </tbody>
</table>

### Ajustado por el usuario {#user-adjusted}

Gravedad del hallazgo tras la aplicación de modificaciones de gravedad definidas por el usuario.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>score</code></td>
      <td>número</td>
      <td><strong>Ruta:</strong> <code>@severity_details.user_adjusted.score</code><br>Puntuación numérica de gravedad (escala CVSS).</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@severity_details.user_adjusted.value</code><br>Nivel de gravedad. Valores válidos: <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>, <code>none</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value_id</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@severity_details.user_adjusted.value_id</code><br>Representación numérica de la gravedad. Valores: <code>critical</code> = <code>10</code>, <code>high</code> = <code>9</code>, <code>medium</code> = <code>7</code>, <code>low</code> = <code>4</code>, <code>none</code> = <code>0</code>.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Vulnerabilidad" level="h3" id="vulnerability" %}}

Información específica sobre vulnerabilidades.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cisa</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.cisa</code><br>Metadatos de la Agencia de Ciberseguridad y Seguridad de Infraestructura (CISA) para la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>cisa_bod2604_remediation_timeline</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.cisa_bod2604_remediation_timeline</code><br>(obsoleto) Tiempo máximo, en días naturales, para remediar la vulnerabilidad bajo la Directiva Operativa Vinculante (BOD) 26-04 de CISA. Valores válidos: <code>three_days_and_forensic_triage</code>, <code>three_days</code>, <code>fourteen_days</code>, <code>sixty_days</code>, <code>fix_on_system_upgrade</code>. Datadog vuelve a calcular este valor cuando cambian las entradas de CISA o de exposición. Utilice <code>@vulnerability.cisa.bod2604_remediation_timeline</code> en su lugar.</td>
    </tr>
    <tr>
      <td><code>confidence</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.confidence</code><br>La probabilidad evaluada de que la vulnerabilidad sea un verdadero positivo.</td>
    </tr>
    <tr>
      <td><code>confidence_reason</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.confidence_reason</code><br>La justificación detrás del nivel de confianza asignado.</td>
    </tr>
    <tr>
      <td><code>cwes</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.cwes</code><br>Identificador CWE (Common Weakness Enumeration) asociado con la vulnerabilidad. Cada entrada debe utilizar el <code>CWE-&lt;id&gt;</code> formato (por ejemplo, <code>CWE-416</code>).</td>
    </tr>
    <tr>
      <td><code>first_commit</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.first_commit</code><br>La confirmación en la que se introdujo la vulnerabilidad por primera vez.</td>
    </tr>
    <tr>
      <td><code>hash</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.hash</code><br>Hash de vulnerabilidad utilizado para correlacionar la misma vulnerabilidad en el tiempo de ejecución de SCA (Software Composition Analysis) y el análisis estático.</td>
    </tr>
    <tr>
      <td><code>introduced_at_commit</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.introduced_at_commit</code><br>Contiene detalles de la confirmación de Git que introdujo la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.is_emerging</code><br><code>true</code> si la vulnerabilidad se clasifica como una amenaza emergente; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>is_inherited_from_base_image</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.is_inherited_from_base_image</code><br><code>true</code> si la vulnerabilidad se origina en una capa de imagen base, <code>false</code> si se origina en una capa añadida por el autor de la imagen del contenedor.</td>
    </tr>
    <tr>
      <td><code>last_commit</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.last_commit</code><br>La confirmación en el que se corrigió la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>owasp_top10_years</code></td>
      <td>array (integer)</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.owasp_top10_years</code><br>Los años en los que la vulnerabilidad apareció en la lista OWASP Top 10 de vulnerabilidades críticas.</td>
    </tr>
    <tr>
      <td><code>removed_at_commit</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.removed_at_commit</code><br>Contiene detalles de la confirmación de Git que eliminó la vulnerabilidad.</td>
    </tr>
    <tr>
      <td><code>stack</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.stack</code><br>La pila tecnológica donde se encontró la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

### CISA {#cisa}

Metadatos de la Agencia de Seguridad de Infraestructura y Ciberseguridad (CISA) relacionados con esta vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>bod2604_remediation_timeline</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.cisa.bod2604_remediation_timeline</code><br>Tiempo máximo, en días calendario, para remediar la vulnerabilidad bajo la Directiva Operativa Vinculante (BOD) 26-04 de CISA. Valores válidos: <code>three_days_and_forensic_triage</code>, <code>three_days</code>, <code>fourteen_days</code>, <code>sixty_days</code>, <code>fix_on_system_upgrade</code>. Datadog vuelve a calcular este valor cuando cambian las entradas de CISA o de exposición.</td>
    </tr>
    <tr>
      <td><code>kev_added_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.cisa.kev_added_at</code><br>Marca de tiempo en milisegundos (UTC) cuando la vulnerabilidad se agregó al catálogo de Vulnerabilidades Explotadas Conocidas (KEV) de CISA.</td>
    </tr>
  </tbody>
</table>

### Introducido en la confirmación {#introduced-at-commit}

Contiene detalles de la confirmación de Git que introdujo la vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>author</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.introduced_at_commit.author</code><br>Contiene detalles sobre el autor original de la confirmación.</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.introduced_at_commit.committer</code><br>Contiene detalles sobre la persona que aplicó la confirmación al repositorio.</td>
    </tr>
    <tr>
      <td><code>message</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.introduced_at_commit.message</code><br>Contiene el mensaje de la confirmación de Git.</td>
    </tr>
    <tr>
      <td><code>sha</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.introduced_at_commit.sha</code><br>Identificador de confirmación de Git (SHA).</td>
    </tr>
  </tbody>
</table>

### Autor {#author-1}

Contiene detalles sobre el autor original de la confirmación.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>authored_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.introduced_at_commit.author.authored_at</code><br>Marca de tiempo en milisegundos (UTC) en la que se realizaron los cambios originales.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.introduced_at_commit.author.email</code><br>Dirección de correo electrónico del autor de la confirmación.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.introduced_at_commit.author.name</code><br>Nombre del autor de la confirmación.</td>
    </tr>
  </tbody>
</table>

### Confirmador {#committer-1}

Contiene detalles sobre la persona que aplicó la confirmación al repositorio.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>committed_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.introduced_at_commit.committer.committed_at</code><br>Marca de tiempo en milisegundos (UTC) en la que los cambios se modificaron significativamente por última vez (por ejemplo, durante una operación de rebase o enmienda).</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.introduced_at_commit.committer.email</code><br>Dirección de correo electrónico del autor de la confirmación.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.introduced_at_commit.committer.name</code><br>Nombre del autor de la confirmación.</td>
    </tr>
  </tbody>
</table>

### Eliminado en la confirmación {#removed-at-commit}

Contiene detalles de la confirmación de Git que eliminó la vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>author</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.removed_at_commit.author</code><br>Contiene detalles sobre el autor original de la confirmación.</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.removed_at_commit.committer</code><br>Contiene detalles sobre la persona que aplicó la confirmación al repositorio.</td>
    </tr>
    <tr>
      <td><code>message</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.removed_at_commit.message</code><br>Contiene el mensaje de la confirmación de Git.</td>
    </tr>
    <tr>
      <td><code>sha</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.removed_at_commit.sha</code><br>Identificador de confirmación de Git (SHA).</td>
    </tr>
  </tbody>
</table>

### Autor {#author-2}

Contiene detalles sobre el autor original de la confirmación.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>authored_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.removed_at_commit.author.authored_at</code><br>Marca de tiempo en milisegundos (UTC) en la que se realizaron los cambios originales.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.removed_at_commit.author.email</code><br>Dirección de correo electrónico del autor de la confirmación.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.removed_at_commit.author.name</code><br>Nombre del autor de la confirmación.</td>
    </tr>
  </tbody>
</table>

### Confirmador {#committer-2}

Contiene detalles sobre la persona que aplicó la confirmación al repositorio.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>committed_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.removed_at_commit.committer.committed_at</code><br>Marca de tiempo en milisegundos (UTC) en la que los cambios se modificaron significativamente por última vez (por ejemplo, durante una operación de rebase o enmienda).</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.removed_at_commit.committer.email</code><br>Dirección de correo electrónico del autor de la confirmación.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.removed_at_commit.committer.name</code><br>Nombre del autor de la confirmación.</td>
    </tr>
  </tbody>
</table>

### Pila {#stack}

La pila tecnológica donde se encontró la vulnerabilidad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ecosystem</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.stack.ecosystem</code><br>El ecosistema de gestión de paquetes o registro de fuente del que proviene el componente vulnerable.</td>
    </tr>
    <tr>
      <td><code>language</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@vulnerability.stack.language</code><br>El lenguaje donde se encontró la vulnerabilidad.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}

{{% collapse-content title="Flujo de trabajo" level="h3" id="workflow" %}}

Toda la información mutable relacionada con la gestión de un hallazgo después de que fue detectado. Incluye campos que pueden actualizarse manualmente a través de la interfaz de usuario o automáticamente a través de tuberías.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>auto_closed_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@workflow.auto_closed_at</code><br>Marca de tiempo en milisegundos (UTC) en la que el hallazgo fue cerrado automáticamente por el sistema.</td>
    </tr>
    <tr>
      <td><code>automations</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@workflow.automations</code><br>Información sobre cualquier regla de automatización que se aplique al hallazgo.</td>
    </tr>
    <tr>
      <td><code>due_date</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.due_date</code><br>Regla de fecha de vencimiento aplicada al hallazgo.</td>
    </tr>
    <tr>
      <td><code>integrations</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations</code><br>Integrations como Jira, Case Management o ServiceNow utilizadas para clasificar y remediar el hallazgo.</td>
    </tr>
    <tr>
      <td><code>mute</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.mute</code><br>Información y metadatos de silenciamiento.</td>
    </tr>
    <tr>
      <td><code>severity_override</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.severity_override</code><br>Metadatos sobre las modificaciones de gravedad definidas por el usuario aplicadas al hallazgo.</td>
    </tr>
    <tr>
      <td><code>triage</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.triage</code><br>Información de asignación y estado. La asignación puede estar sincronizada con la información de incidencia o de Jira.</td>
    </tr>
  </tbody>
</table>

### Automatizaciones {#automations}

Información sobre cualquier regla de automatización que se aplique al hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>rule_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.automations.rule_id</code><br>Identificador único para la regla de automatización.</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.automations.rule_name</code><br>Nombre legible por humanos de la regla de automatización que se aplica al hallazgo.</td>
    </tr>
    <tr>
      <td><code>rule_type</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.automations.rule_type</code><br>Tipo de regla de automatización que se aplica al hallazgo. Valores válidos: <code>due_date</code>, <code>mute</code>, <code>security_inbox</code>, <code>severity_modifier</code>, <code>ticket_creation</code>.</td>
    </tr>
  </tbody>
</table>

### Fecha de vencimiento {#due-date}

Regla de fecha de vencimiento aplicada al hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>due_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@workflow.due_date.due_at</code><br>Marca de tiempo en milisegundos (UTC) para la fecha de vencimiento del hallazgo.</td>
    </tr>
    <tr>
      <td><code>is_overdue</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@workflow.due_date.is_overdue</code><br><code>true</code> si se ha alcanzado la fecha de vencimiento; <code>false</code> de lo contrario.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.due_date.rule_id</code><br>Identificador único para la regla de fecha de vencimiento aplicada al hallazgo.</td>
    </tr>
  </tbody>
</table>

### Integrations {#integrations}

Integrations como Jira, Case Management o ServiceNow utilizadas para clasificar y remediar el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cases</code></td>
      <td>matriz (objeto)</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases</code><br>Matriz de incidencias adjuntas al hallazgo.</td>
    </tr>
    <tr>
      <td><code>jira</code></td>
      <td>matriz (cadena)</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.jira</code><br>Claves de incidencia de Jira adjuntas al hallazgo en el formato <code>&lt;PROJECT&gt;-&lt;NUMBER&gt;</code> (por ejemplo, <code>PROJ-123</code>).</td>
    </tr>
  </tbody>
</table>

### Incidencias {#cases}

Matriz de incidencias adjuntas al hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>assignee</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.assignee</code><br>Usuario asignado a la incidencia.</td>
    </tr>
    <tr>
      <td><code>created_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.created_at</code><br>Marca de tiempo en milisegundos (UTC) cuando se creó la incidencia.</td>
    </tr>
    <tr>
      <td><code>created_by</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.created_by</code><br>Usuario que creó la incidencia.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.id</code><br>Identificador único de la incidencia en formato UUID.</td>
    </tr>
    <tr>
      <td><code>jira_issue</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.jira_issue</code><br>Incidencia de Jira adjunta a la incidencia.</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.key</code><br>Identificador legible por humanos para la incidencia en el formato <code>PROJECT-NUMBER</code> (por ejemplo, <code>CSMINV-66</code>).</td>
    </tr>
    <tr>
      <td><code>linear_issue</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.linear_issue</code><br>Incidencia de Linear adjunta a la incidencia.</td>
    </tr>
    <tr>
      <td><code>servicenow_ticket</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.servicenow_ticket</code><br>Ticket de ServiceNow adjunto a la incidencia.</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.status</code><br>Estado de la incidencia.</td>
    </tr>
    <tr>
      <td><code>title</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.title</code><br>Título de la incidencia.</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.updated_at</code><br>Marca de tiempo en milisegundos (UTC) en la que se actualizó la incidencia por última vez.</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.updated_by</code><br>Usuario que actualizó la incidencia por última vez.</td>
    </tr>
  </tbody>
</table>

### Asignado a {#assignee}

Usuario asignado a la incidencia.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.assignee.id</code><br>Identificador único del usuario en formato UUID.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.assignee.name</code><br>Nombre para mostrar del usuario.</td>
    </tr>
  </tbody>
</table>

### Creado por {#created-by}

Usuario que creó la incidencia.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.created_by.id</code><br>Identificador único del usuario en formato UUID.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.created_by.name</code><br>Nombre para mostrar del usuario.</td>
    </tr>
  </tbody>
</table>

### Incidencia de Jira {#jira-issue}

Incidencia de Jira adjunta a la incidencia.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>key</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.jira_issue.key</code><br>Identificador de incidencia de Jira en el formato <code>PROJECT-NUMBER</code> (por ejemplo, <code>CSMSEC-103991</code>).</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.jira_issue.status</code><br>Estado actual de la incidencia de Jira.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.jira_issue.url</code><br>URL completa a la incidencia de Jira.</td>
    </tr>
  </tbody>
</table>

### Incidencia de Linear {#linear-issue}

Incidencia de Linear adjunta a la incidencia.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>key</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.linear_issue.key</code><br>Identificador de incidencia de Linear en el formato <code>TEAM-NUMBER</code> (por ejemplo, <code>SEC-42</code>).</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.linear_issue.status</code><br>Estado actual de la incidencia de Linear.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.linear_issue.url</code><br>URL completa a la incidencia de Linear.</td>
    </tr>
  </tbody>
</table>

### Ticket de ServiceNow {#servicenow-ticket}

Ticket de ServiceNow adjunto a la incidencia.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>state</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.servicenow_ticket.state</code><br>Estado actual del ticket de ServiceNow.</td>
    </tr>
    <tr>
      <td><code>sys_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.servicenow_ticket.sys_id</code><br>Identificador de ticket hexadecimal de 32 caracteres de ServiceNow (por ejemplo, 9f8c7e2d3b4a5c6d7e8f9a0b1c2d3e4f).</td>
    </tr>
    <tr>
      <td><code>table_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.servicenow_ticket.table_name</code><br>El nombre de la tabla donde se almacena el ticket. Valores válidos: <code>incident</code>, <code>em_event</code>.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.servicenow_ticket.url</code><br>URL directa al ticket de ServiceNow.</td>
    </tr>
  </tbody>
</table>

### Actualizado por {#updated-by}

Usuario que actualizó la incidencia por última vez.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.updated_by.id</code><br>Identificador único del usuario en formato UUID.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.integrations.cases.updated_by.name</code><br>Nombre para mostrar del usuario.</td>
    </tr>
  </tbody>
</table>

### Silenciar {#mute}

Información y metadatos de silenciamiento.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>description</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.mute.description</code><br>Explicación de texto libre del motivo por el cual se silenció el hallazgo.</td>
    </tr>
    <tr>
      <td><code>expire_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@workflow.mute.expire_at</code><br>Marca de tiempo en milisegundos (UTC) en la que expira el silenciamiento. Si no se establece, el silenciamiento es permanente.</td>
    </tr>
    <tr>
      <td><code>is_muted</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@workflow.mute.is_muted</code><br><code>true</code> si el hallazgo está silenciado; <code>false</code> si está activo.</td>
    </tr>
    <tr>
      <td><code>is_muted_by_rule</code></td>
      <td>Booleano</td>
      <td><strong>Ruta:</strong> <code>@workflow.mute.is_muted_by_rule</code><br><code>true</code> si el hallazgo fue silenciado por una regla de automatización; <code>false</code> de lo contrario. Si <code>true</code>, la regla de automatización relevante se referencia en la sección flujo de trabajo.automations.</td>
    </tr>
    <tr>
      <td><code>muted_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@workflow.mute.muted_at</code><br>Marca de tiempo en milisegundos (UTC) en la que se silenció el hallazgo.</td>
    </tr>
    <tr>
      <td><code>muted_by</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.mute.muted_by</code><br>Usuario que silenció el hallazgo.</td>
    </tr>
    <tr>
      <td><code>reason</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.mute.reason</code><br>Motivo proporcionado para silenciar el hallazgo. Valores válidos: <code>none</code>, <code>no_pending_fix</code>, <code>human_error</code>, <code>no_longer_accepted_risk</code>, <code>other</code>, <code>pending_fix</code>, <code>false_positive</code>, <code>accepted_risk</code>, <code>no_fix</code>, <code>duplicate</code>, <code>risk_accepted</code>, <code>muted_in_code</code>.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.mute.rule_id</code><br>Identificador único de la regla de automatización que silenció el hallazgo. Solo se establece cuando <code>is_muted_by_rule</code> es <code>true</code>.</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.mute.rule_name</code><br>Nombre legible por humanos de la regla de automatización que silenció el hallazgo. Solo se establece cuando <code>is_muted_by_rule</code> es <code>true</code>.</td>
    </tr>
  </tbody>
</table>

### Silenciado por {#muted-by}

Usuario que silenció el hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.mute.muted_by.id</code><br>Identificador único del usuario en formato UUID.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.mute.muted_by.name</code><br>Nombre para mostrar del usuario.</td>
    </tr>
  </tbody>
</table>

### Anulación de gravedad {#severity-override}

Metadatos sobre las modificaciones de gravedad definidas por el usuario aplicadas al hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>description</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.severity_override.description</code><br>Descripción de la modificación de gravedad definida por el usuario aplicada al hallazgo.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.severity_override.rule_id</code><br>Identificador de la regla de automatización modificadora de gravedad que aplicó esta anulación de gravedad. Solo se establece cuando la anulación fue aplicada por una regla de automatización.</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.severity_override.rule_name</code><br>Nombre de la regla de automatización modificadora de gravedad que aplicó esta anulación de gravedad. Solo se establece cuando la anulación fue aplicada por una regla de automatización.</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@workflow.severity_override.updated_at</code><br>Marca de tiempo en milisegundos (UTC) en la que se aplicó la anulación manual de gravedad.</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.severity_override.updated_by</code><br>Usuario que aplicó la anulación manual de gravedad.</td>
    </tr>
  </tbody>
</table>

### Actualizado por {#updated-by-1}

Usuario que aplicó la anulación manual de gravedad.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.severity_override.updated_by.id</code><br>Identificador único del usuario en formato UUID.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.severity_override.updated_by.name</code><br>Nombre para mostrar del usuario.</td>
    </tr>
  </tbody>
</table>

### Triaje {#triage}

Información de asignación y estado. La asignación puede estar sincronizada con la incidencia o con la información de Jira.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>assignee</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.triage.assignee</code><br>Usuario asignado al hallazgo.</td>
    </tr>
  </tbody>
</table>

### Asignado a {#assignee-1}

Usuario asignado al hallazgo.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.triage.assignee.id</code><br>Identificador único en formato UUID para el asignado.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.triage.assignee.name</code><br>Nombre para mostrar del asignado.</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>entero</td>
      <td><strong>Ruta:</strong> <code>@workflow.triage.assignee.updated_at</code><br>Marca de tiempo en milisegundos (UTC) en la que se modificó por última vez al asignado.</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>objeto</td>
      <td><strong>Ruta:</strong> <code>@workflow.triage.assignee.updated_by</code><br>Usuario que modificó por última vez al asignado.</td>
    </tr>
  </tbody>
</table>

### Actualizado por {#updated-by-2}

Usuario que modificó por última vez al asignado.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Nombre del atributo</th>
      <th style="width: 15%;">Tipo</th>
      <th style="width: 60%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.triage.assignee.updated_by.id</code><br>Identificador único del usuario en formato UUID.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>cadena</td>
      <td><strong>Ruta:</strong> <code>@workflow.triage.assignee.updated_by.name</code><br>Nombre para mostrar del usuario.</td>
    </tr>
  </tbody>
</table>

{{% /collapse-content %}}