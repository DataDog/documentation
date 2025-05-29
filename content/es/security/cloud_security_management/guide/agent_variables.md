---
aliases:
- /es/security/cloud_security_management/setup/agent_variables
title: Variables de Cloud Security Management en el Agent
---

El Datadog Agent tiene varias variables de entorno que pueden ser habilitadas para Cloud Security Management. Este artículo describe el propósito de cada variable de entorno.

<table>
    <tr>
        <th>Variable</th>
        <th>Descripción</th>
    </tr>
    <tr>
        <td><code>DD_COMPLIANCE_CONFIG_ENABLED</code></td>
        <td>Habilita el Agent Cloud Security Posture Management (CSPM) (se ejecuta en el Security Agent).</td>
    </tr>
    <tr>
        <td><code>DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED</code></td>
        <td>Habilita puntos de referencia del host CSPM. Requiere el Agent CSPM. (<code>DD_COMPLIANCE_CONFIG_ENABLED</code>).</td>
    </tr>
    <tr>
       <td><code> DD_RUNTIME_SECURITY_CONFIG_ENABLED</code></td>
    <td>    Habilita Cloud Workload Security (CWS). Se debe habilitar para el System Probe y el Security Agent.</td>
    </tr>
    <tr>
      <td>  <code>DD_SYSTEM_PROBE_ENABLED</code></td>
      <td>  Habilita el System Probe, que es un Agent complemento. De manera similar al Trace Agent o al Process Agent, admite diferentes funcionalidades en comparación con el Datadog Agent vainilla. Se utiliza principalmente con NPM y CWS.</td>
    </tr>
    
    <td><code>DD_RUNTIME_SECURITY_CONFIG_REMOTE<br>_CONFIGURATION_ENABLED</code></td>
       <td> Habilita la Configuración remota de actualizaciones automáticas de reglas predeterminadas del Agent y de los despliegues automáticos de reglas predeterminadas del Agent.</td>
  <tr>  
  <tr>  
       <td> <code>DD_SBOM_ENABLED</code></td>
        Habilita el subsistema de recopilación Software Bill of Materials (SBOM).<td>
</tr>
 <tr>
<td><code> DD_SBOM_CONTAINER_IMAGE_ENABLED</code></td>
     <td>   Habilita la recopilación SBOM de imágenes de contenedor.</td>
    </tr>
    <tr>
       <td> <code>DD_SBOM_HOST_ENABLED</code></td>
        <td>Habilita la recopilación SBOM en hosts.</td>
    </tr>
</table>