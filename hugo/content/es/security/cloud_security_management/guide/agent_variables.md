---
aliases:
- /es/security/cloud_security_management/setup/agent_variables
title: Variables del Agent de Cloud Security
---

El Datadog Agent tiene varias variables de entorno que pueden ser habilitadas para Cloud Security. Este artículo describe el propósito de cada variable de entorno.

<table>
    <tr>
        <th>Variable</th>
        <th>Descripción</th>
    </tr>
    <tr>
        <td><code>DD_COMPLIANCE_CONFIG_ENABLED</code></td>
        <td>Habilita el Agent de Cloud Security Posture Management (CSPM) (se ejecuta en el Security Agent).</td>
    </tr>
    <tr>
        <td><code>DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED</code></td>
        <td>Habilita las referencias de host de CSPM. Requiere el Agent de CSPM (<code>DD_COMPLIANCE_CONFIG_ENABLED</code>).</td>
    </tr>
    <tr>
        <td><code>DD_RUNTIME_SECURITY_CONFIG_ENABLED</code></td>
        <td>Habilita Cloud Workload Security (CWS). Debe estar habilitado para System Probe y Security Agent.</td>
    </tr>
    <tr>
        <td><code>DD_SYSTEM_PROBE_ENABLED</code></td>
        <td>Habilita el System Probe, que es un Agent complementario. Es similar al Trace Agent o al Process Agent, admite distintas funcionalidades de las que admite el Datadog Agent común. Se usa principalmente con NPM y CWS.</td>
    </tr>
    <tr>
        <td><code>DD_RUNTIME_SECURITY_CONFIG_REMOTE<br>_CONFIGURATION_ENABLED</code></td>
        <td>Habilita Remote Configuration para las actualizaciones automáticas de las reglas predeterminadas del Agent y el despliegue automático de las reglas personalizadas del Agent.</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_ENABLED</code></td>
        <td>Habilita el subsistema de recopilación Software Bill of Materials (SBOM).</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_CONTAINER_IMAGE_ENABLED</code></td>
        <td>Habilita la recopilación SBOM en imágenes de contenedor.</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_HOST_ENABLED</code></td>
        <td>Habilita la recopilación de SBOM en hosts.</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_CONTAINER_IMAGE_CONTAINER_EXCLUDE</code></td>
        <td>Permite hacer una lista de denegación con contenedores específicos de la recopilación SBOM.</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_CONTAINER_IMAGE_CONTAINER_INCLUDE</code></td>
        <td>Permite hacer una lista de permitidos con contenedores específicos en la recopilación SBOM.</td>
    </tr>
</table>