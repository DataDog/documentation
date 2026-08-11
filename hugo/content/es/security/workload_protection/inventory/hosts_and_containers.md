---
disable_toc: false
title: Hosts and Containers
---

La vista [Hosts and Containers][1] en Datadog Workload Protection **Inventory** proporciona una vista unificada del despliegue de agents a nivel de host, el estado de la configuración y el estado de las funciones de seguridad. 

La vista **Hosts and Containers** muestra el nombre de host de todos los Agents activos que se ejecutan directamente en hosts o como contenedores. Esto incluye hosts con Workload Protection activada o desactivada.

**Hosts and Containers** permite a los equipos de DevSecOps:

- Verificar que las protecciones están correctamente desplegadas y funcionando en todos los entornos, incluyendo: 
  - [Workload Protection][3]  
  - [CSM Misconfigurations][2]  
  - [Container Vulnerability Scanning][4]  
  - [Host Vulnerability Scanning][4]  
- Identificar qué hosts y contenedores ejecutan versiones antiguas del Agent 
- Acceder a orientaciones para corregir la falta de protección

## Casos prácticos

El inventario de [Hosts and Containers][1] admite varios casos de uso comunes de DevSecOps.

### Evaluar el estado de la cobertura

Para identificar los hosts en los que no está configurada la detección de amenazas en tiempo de ejecución:

1. En [Hosts and Containers][1], establece las siguientes facetas en **false**:
   - **Workload Protection Enabled**
   - **Misconfigurations Enabled**
   - **Hosts VM Enabled**
   - **Containers VM Enabled**

   Los hosts y contenedores que carecen de una o más de estas características se muestran con un icono naranja. Esta lista señala las brechas de cobertura que exponen la carga de trabajo a amenazas no detectadas a nivel de procesos, archivos o redes.
2. Para obtener orientación sobre la corrección, pasa el ratón por encima del icono de una función y haz clic en **Configure** (Configurar).

<div class="alert alert-info">
Filtrar por <b>Containers VM Enabled: true</b> para garantizar que el análisis también se aplica a las cargas de trabajo de contenedores que se ejecutan dentro de un contexto de VM.
</div>

### Validar el estado del Agent 

Para validar el estado del Agent:

1. En la columna **Agent Version** (Versión del Agent), busca las versiones anteriores identificadas con etiquetas amarillas.

   Las etiquetas amarillas indican versiones que podrían no ser compatibles con todas las funciones de seguridad.
2. Haz clic en una etiqueta de versión (por ejemplo, 7.69.1) y selecciona **Filter by agent_version:[number]** (Filtrar por agent_version:[número]). 
   Esto aísla todos los hosts que ejecutan esa versión. 
3. Fuera de [Hosts and Containers][1], comprueba si cada host del Agent está listo para la actualización y [programa actualizaciones en consecuencia][5].

### Detectar errores de configuración

Los hosts sin CSM Misconfigurations activado no pueden sacar a la luz los errores de configuración de IAM, registro o cifrado. Los checks de errores de configuración son fundamentales para los tests de CIS y la gestión de la postura de seguridad en la nube alineada con el NIST.

Para comprobar si los checks de postura están activados para un host:

1. En [Hosts and Containers][1], establece la faceta **Misconfigurations Enabled** a **false**.

   Los hosts y contenedores sin CSM Misconfigurations activado se indican con un icono naranja. 
2. Para obtener orientación sobre cómo solucionar el problema, pasa el ratón por encima del icono **CSM Misconfigurations** y haz clic en **Configure** (Configurar).

Consulta los [métodos de despliegue][6] de Cloud Security Vulnerabilities.

### Seguimiento a nivel de clúster

La columna **Cluster Name** (Nombre de clúster) vincula los hosts a los límites lógicos de la infraestructura, como los clústeres de Kubernetes. Filtra un clúster haciendo clic en su nombre y seleccionando **Filter by cluster_name:[name]** (Filtrar por cluster_name:[nombre]).

El filtrado en un clúster confirma si las protecciones se aplican de manera uniforme. Esto garantiza que las protecciones se aplican de forma coherente en todos los entornos y regiones.

### Priorizar la respuesta

[Hosts and Containers][1] admite investigaciones y clasificación de incidentes. Utiliza el panel de iconos de funciones para detectar brechas de protección. 

Por lo general, los hosts que carecen de funciones críticas como **Workload Protection** o **Host/Container Vulnerability Scanning** se clasifican en primer lugar. 

Pasa el ratón por encima del icono de una característica y haz clic en **Configure** (Configurar) para ver los pasos de corrección de todas las carencias de características. Esto permite la clasificación sin cambiar de contexto.

### Pruebas de conformidad

[Hosts and Containers][1] proporciona una vista de auditoría en directo de la postura de seguridad de la carga de trabajo. Filtros como **Workload Protection Enabled** y **Agent Version** demuestran la cobertura de control para frameworks como SOC 2, PCI DSS o FedRAMP.


[1]: https://app.datadoghq.com/security/workload-protection/inventory/hosts
[2]: /es/security/cloud_security_management/misconfigurations/
[3]: /es/security/workload_protection/
[4]: /es/security/cloud_security_management/vulnerabilities/
[5]: /es/agent/guide/upgrade_agent_fleet_automation
[6]: /es/security/cloud_security_management/vulnerabilities/