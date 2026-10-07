---
aliases:
- /es/security_monitoring/detection_rules/
- /es/cloud_siem/detection_rules/
- /es/security_platform/detection_rules/
- /es/security/security_monitoring/log_detection_rules/
further_reading:
- link: /security/default_rules/#all
  tag: Documentación
  text: Explore las reglas de detección predeterminadas
- link: /security/notifications/
  tag: Documentación
  text: Obtenga más información sobre las notificaciones de seguridad
- link: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
  tag: Blog
  text: Detecte el abuso de funcionalidad con Datadog
- link: https://www.datadoghq.com/blog/impossible-travel-detection-rules/
  tag: Blog
  text: Detecte actividad de inicio de sesión sospechosa con reglas de detección de
    viajes imposibles
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
title: Reglas de detección
---
{{< product-availability >}}

Las reglas de detección definen la lógica condicional que se aplica a todos los registros ingeridos y configuraciones de la nube. Cuando al menos una incidencia definida en una regla coincide durante un período de tiempo determinado, se genera una señal de seguridad. Puede ver estas señales en el [Explorador de señales][1].

## Reglas de detección predeterminadas {#out-of-the-box-detection-rules}

Datadog proporciona [reglas de detección predeterminadas][2] para señalar técnicas de atacantes y posibles configuraciones erróneas. Cuando se lanzan nuevas reglas de detección, se importan automáticamente a su cuenta, a su biblioteca de App and API Protection y al Agent, dependiendo de su configuración.

Las reglas predeterminadas están disponibles para los siguientes productos de seguridad:

- [Cloud SIEM][3] utiliza la detección de registros para analizar los registros ingeridos en tiempo real.
- Cloud Security:
    - [Cloud Security Misconfigurations][4] utiliza reglas de detección de configuración de la nube y de infraestructura para escanear el estado de su entorno en la nube.
    - [Cloud Security Identity Risks][6] utiliza reglas de detección para detectar riesgos basados en IAM en su infraestructura en la nube.
- [Workload Protection][5] utiliza el Datadog Agent y reglas de detección para hacer un seguimiento y evaluar activamente la actividad del sistema.
- [App and API Protection][7] (AAP) aprovecha [APM][8] de Datadog, el [Datadog Agent][9] y reglas de detección para detectar amenazas en su entorno de aplicaciones.

## Mapa de MITRE ATT&CK {#mitre-attck-map}

{{< product-availability names="Cloud SIEM,App and API Protection,Workload Protection" >}}

MITRE ATT&CK es un marco de trabajo que ayuda a las organizaciones a comprender cómo operan los ciberatacantes. Mapea lo siguiente:

- **Tácticas:** El "porqué" de un ataque. Estos son los objetivos de alto nivel, como obtener acceso inicial, ejecutar código malicioso o robar datos.
- **Técnicas:** El "cómo" de un ataque. Estas son las acciones específicas que realiza un atacante para lograr una táctica, como usar phishing para ingresar a un sistema o explotar una vulnerabilidad en el software.

Al mapear tácticas y técnicas, MITRE ATT&CK proporciona a los equipos de seguridad un lenguaje común para comunicar amenazas y preparar mejor las defensas.

Para usar el mapa de MITRE ATT&CK, haga lo siguiente:

1. Abra Reglas de detección en [SIEM][16] o [Workload Protection][17].
2. Seleccione {{< ui >}}MITRE ATT&CK map{{< /ui >}}.
3. Seleccione uno o más productos en el filtro <i class="icon-filter"></i>.
4. Revise el mapa para lo siguiente:
   - Evaluación de la cobertura: Determine qué técnicas de ataque están bien cubiertas y cuáles tienen poca supervisión.
   - Priorización de la creación de reglas: Enfóquese en crear reglas de detección para técnicas con poca o nula cobertura.
   - Optimización de la gestión de reglas: Gestione y actualice las reglas de detección, asegurándose de que se alineen con la inteligencia de amenazas más reciente.
El mapa de MITRE ATT&CK está disponible en SIEM o Workload Protection, pero puede seleccionar Application and API Protection en el filtro. Application and API Protection se incluye en el mapa de MITRE ATT&CK para una cobertura de seguridad integral.

## Reglas de detección beta {#beta-detection-rules}

El equipo de investigación de seguridad de Datadog agrega continuamente nuevas reglas de detección de seguridad listas para usar. Aunque el objetivo es ofrecer detecciones de alta calidad con el lanzamiento de integraciones u otras funciones nuevas, a menudo es necesario observar el rendimiento de la detección a escala antes de que la regla esté disponible de forma general. Esto le da al equipo de investigación de seguridad de Datadog tiempo para refinar o descontinuar las oportunidades de detección que no cumplen con nuestros estándares.

## Reglas de detección personalizadas {#custom-detection-rules}

Puede haber situaciones en las que necesite personalizar una regla según su entorno o carga de trabajo. Por ejemplo, si utiliza AAP, es posible que desee personalizar una regla de detección que detecte usuarios que realizan acciones confidenciales desde una ubicación geográfica donde su empresa no opera.

Para [crear reglas personalizadas](#create-detection-rules), puede clonar las reglas predeterminadas y editar las copias, o crear sus propias reglas desde cero.

## Buscar y filtrar reglas de detección {#search-and-filter-detection-rules}

Para visualizar las reglas de detección listas para usar y personalizadas en Datadog, navegue a la página [{{< ui >}}Security Settings{{< /ui >}}][10]. Las reglas se enumeran en páginas separadas para cada producto (App and API Protection, Cloud Security y Cloud SIEM).

Para buscar y filtrar las reglas, utilice el cuadro de búsqueda y las facetas para realizar consultas por valor. Por ejemplo, para mostrar solo las reglas de un tipo de regla determinado, pase el cursor sobre el tipo de regla y seleccione `only`. También puede filtrar por facetas como `source` y `severity` al investigar y clasificar los problemas entrantes.

{{< img src="security/default_detection_rules.png" alt="La página de configuración muestra las reglas de detección predeterminadas y personalizadas de Cloud SIEM" width="100%">}}

## Crear reglas de detección {#create-detection-rules}

Para crear una regla de detección personalizada, haga clic en el botón {{< ui >}}New Rule{{< /ui >}} en la esquina superior derecha de la página Reglas de detección. También puede [clonar una regla predeterminada o personalizada existente](#clone-a-rule) y usarla como plantilla.

Para obtener instrucciones detalladas, consulte los siguientes artículos:

- [Cloud SIEM][11]
- [AAP][12]
- [Cloud Security Misconfigurations][13]
- [Workload Protection][14]

## Administrar reglas de detección {#manage-detection-rules}

Puede administrar las reglas de detección desde las páginas de [SIEM][16] o [Workload Protection][17] en Datadog. Estas instrucciones describen cómo realizar estas acciones desde esas páginas, pero estas opciones también están disponibles cuando hace clic en una regla de detección para abrirla en un panel lateral.

### Habilitar o deshabilitar reglas {#enable-or-disable-rules}

Para habilitar o deshabilitar una regla, cambie el interruptor a la derecha del nombre de la regla.

También puede habilitar o deshabilitar reglas de forma masiva:

1. Haga clic en {{< ui >}}Select Rules{{< /ui >}}.
1. Seleccione las reglas que desea habilitar o deshabilitar.
1. Haga clic en el menú desplegable {{< ui >}}Bulk Actions{{< /ui >}}.
1. Seleccione {{< ui >}}Enable Rules{{< /ui >}} o {{< ui >}}Disable Rules{{< /ui >}}.

### Editar una regla {#edit-a-rule}

Puede editar reglas de detección listas para usar y personalizadas. Si desea conservar la regla original en lugar de editarla directamente, puede [clonar la regla](#clone-a-rule), realizar cambios en la regla clonada y [deshabilitar la regla original](#enable-or-disable-rules).

Para editar una regla, haga clic en el menú de tres puntos verticales de la regla y seleccione {{< ui >}}Edit default rule{{< /ui >}} o {{< ui >}}Edit rule{{< /ui >}}, según el tipo de regla.

### Clonar una regla {#clone-a-rule}

Para clonar una regla, haga clic en el menú de tres puntos verticales de la regla y seleccione {{< ui >}}Clone rule{{< /ui >}}.

Clonar una regla es útil si desea duplicar una regla existente y modificar ligeramente la configuración para cubrir otras áreas de detección. Por ejemplo, podría duplicar una regla de detección de registro y modificarla de {{< ui >}}Threshold{{< /ui >}} a {{< ui >}}Anomaly{{< /ui >}} para agregar una nueva dimensión a la detección de amenazas utilizando las mismas consultas y activadores.

### Eliminar una regla {#delete-a-rule}

Para eliminar una regla, haga clic en el menú de tres puntos verticales de la regla y seleccione {{< ui >}}Delete rule{{< /ui >}}.

También puede eliminar reglas de forma masiva:

1. Haga clic en {{< ui >}}Select Rules{{< /ui >}}.
1. Seleccione las reglas que desea eliminar.
1. Haga clic en el menú desplegable {{< ui >}}Bulk Actions{{< /ui >}}.
1. Seleccione {{< ui >}}Delete Rules{{< /ui >}}.

### Consulte el historial de versiones de una regla {#see-the-version-history-for-a-rule}

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="El historial de versiones de un token de acceso OAuth de GitHub comprometido, mostrando" style="width:80%;" >}}

Utilice el Historial de versiones de reglas para:
- Vea versiones anteriores de una regla de detección y comprenda los cambios a lo largo del tiempo.
- Vea quién realizó los cambios para mejorar la colaboración.
- Compare las versiones con diferencias para analizar las modificaciones y el impacto de los cambios.

Para ver el historial de versiones de una regla:
1. Navegue a la página [Security Settings][15]. En el panel de navegación izquierdo:
    - Para AAP: Haga clic en {{< ui >}}App and API Protection{{< /ui >}} y luego haga clic en {{< ui >}}Detection Rules{{< /ui >}}.
    - Para Cloud Security: Haga clic en {{< ui >}}Cloud Security{{< /ui >}} y luego haga clic en {{< ui >}}Threat Detection Rules{{< /ui >}}.
    - Para Cloud SIEM: Haga clic en {{< ui >}}Cloud SIEM{{< /ui >}} y luego haga clic en {{< ui >}}Detection Rules{{< /ui >}}.
1. Haga clic en la regla que le interesa y, a continuación, haga clic en {{< ui >}}Edit rule{{< /ui >}}.
1. En el editor de reglas, haga clic en {{< ui >}}Version History{{< /ui >}} para ver los cambios anteriores:
   - Haga clic en una versión específica para ver qué cambios se realizaron.
   - Haga clic en {{< ui >}}Open Version Comparison{{< /ui >}} para ver qué cambió entre las versiones y, luego, seleccione las dos versiones que desea comparar. Haga clic en {{< ui >}}Unified{{< /ui >}} si desea ver la comparación en el mismo panel.
     - Los datos resaltados en rojo indican datos que se modificaron o eliminaron.
     - Los datos resaltados en verde indican datos que se agregaron.

### Restringir permisos de edición {#restrict-edit-permissions}

{{% security-products/detection-rules-granular-access %}}

### Ver señales generadas {#view-generated-signals}

Para visualizar las señales de seguridad de una regla en el [Signals Explorer][1], haga clic en el menú de tres puntos verticales y seleccione {{< ui >}}View generated signals{{< /ui >}}. Esto es útil al correlacionar señales entre múltiples fuentes por regla, o al completar una auditoría de reglas.

### Exportar una regla {#export-a-rule}

Para exportar una copia de una regla, haga clic en la regla para abrirla en el panel lateral. Haga clic en {{< ui >}}Export{{< /ui >}}, luego seleccione {{< ui >}}Export rule to JSON{{< /ui >}} o {{< ui >}}Export rule to Terraform{{< /ui >}}.

También puede exportar reglas de forma masiva:

1. Haga clic en {{< ui >}}Select Rules{{< /ui >}}.
1. Seleccione las reglas que desea exportar.
1. Haga clic en el menú desplegable {{< ui >}}Bulk Actions{{< /ui >}}.
1. Seleccione {{< ui >}}Export to JSON{{< /ui >}} o {{< ui >}}Export to Terraform{{< /ui >}}.

## Depreciación de reglas {#rule-deprecation}

Se realizan auditorías periódicas de todas las reglas de detección para mantener una alta fidelidad en la calidad de las señales. Las reglas depreciadas se reemplazan por una regla mejorada.

El proceso de depreciación de reglas es el siguiente:

- Hay una advertencia con la fecha de depreciación en la regla. En la interfaz de usuario, la advertencia se muestra en:
    - La sección {{< ui >}}Rule Details{{< /ui >}} > {{< ui >}}Playbook{{< /ui >}} del panel lateral de señales
    - Panel lateral de configuraciones incorrectas (solo configuraciones incorrectas de Cloud Security)
    - [Editor de reglas][10] para esa regla específica
- Después de que la regla se marca como obsoleta, hay un periodo de 15 meses antes de que la regla se elimine. Esto se debe al periodo de retención de señales de 15 meses. Durante este tiempo, puede volver a habilitar la regla [clonando la regla](#clone-a-rule) en la interfaz de usuario.
- Después de que la regla se elimina, ya no puede clonarla ni volver a habilitarla.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security
[2]: /es/security/default_rules/
[3]: /es/security/cloud_siem/
[4]: /es/security/cloud_security_management/misconfigurations/
[5]: /es/security/workload_protection/
[6]: /es/security/cloud_security_management/identity_risks/
[7]: /es/security/application_security/
[8]: /es/tracing/
[9]: /es/agent/
[10]: https://app.datadoghq.com/security/configuration/
[11]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[12]: /es/security/application_security/policies/custom_rules/
[13]: /es/security/cloud_security_management/misconfigurations/custom_rules
[14]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-a-custom-detection-rule
[15]: https://app.datadoghq.com/security/configuration/
[16]: https://app.datadoghq.com/security/siem/rules
[17]: https://app.datadoghq.com/security/workload-protection/detection-rules