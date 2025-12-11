---
aliases:
- /es/security_monitoring/detection_rules/
- /es/cloud_siem/detection_rules/
- /es/security_platform/detection_rules/
- /es/security/security_monitoring/log_detection_rules/
further_reading:
- link: /security/default_rules/#all
  tag: Documentación
  text: Explorar las reglas de detección por defecto
- link: /security/notifications/
  tag: Documentación
  text: Más información sobre las notificación de seguridad
- link: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
  tag: Blog
  text: Detectar el uso indebido de funcionalidad con Datadog
- link: https://www.datadoghq.com/blog/impossible-travel-detection-rules/
  tag: Blog
  text: Detectar actividades de inicio de sesión sospechosas con reglas de detección
    de Impossible Travel
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

Las reglas de detección definen una lógica condicional que se aplica a todas las configuraciones de logs y de la nube. Cuando al menos un caso definido en una regla coincide durante un periodo determinado, se genera una señal de seguridad. Puedes ver estas señales en el [Explorador de señales][1].

## Reglas de detección predefinidas

Datadog ofrece [reglas de detección predefinidas][2] para detectar técnicas de ataque y posibles errores de configuración. Cuando se publican nuevas reglas de detección, se importan automáticamente a tu cuenta, a tu biblioteca de App and API Protection y al Agent, según tu configuración.

Las reglas predefinidas están disponibles para los siguientes productos de seguridad:

- [Cloud SIEM][3] utiliza la detección de logs para analizar logs ingeridos en tiempo real.
- Cloud Security:
    - [Cloud Security Misconfigurations][4] utiliza reglas de detección de configuración en la nube y configuración de infraestructura para analizar el estado de tu entorno en la nube.
    - [Cloud Security Identity Risks][6] utiliza reglas de detección para detectar riesgos basados en IAM en tu infraestructura de nube.
- [Workload Protection][5] utiliza las reglas del Agent y de detección para monitorizar activamente y evaluar la actividad del sistema.
- [App and API Protection][7] (AAP) aprovecha Datadog [APM][8], el [Datadog Agent][9] y las reglas de detección para detectar amenazas en el entorno de tu aplicación.

## Mapa de MITRE ATT&CK

{{< product-availability names="Cloud SIEM,App and API Protection,Workload Protection" >}}

MITRE ATT&CK es un marco que ayuda a las organizaciones a comprender cómo actúan los ciberatacantes. Mapea lo siguiente:

- **Táctica:** el "por qué" de un ataque. Son los objetivos generales, como obtener acceso inicial, ejecutar código malicioso o robar datos.
- **Técnicas:** el "cómo" de un ataque. Son las acciones específicas que realiza un atacante para lograr una táctica, como utilizar el phishing para entrar en un sistema o explotar una vulnerabilidad en el software.

Mediante el mapeo de tácticas y técnicas, MITRE ATT&CK proporciona a los equipos de seguridad un lenguaje común para comunicar las amenazas y preparar mejor las defensas.

Para utilizar el mapa de ATT&CK de MITRE, haz lo siguiente:

1. Abrir reglas de detección en [SIEM][16] o [Workload Protection][17].
2. Selecciona el mapa **MITRE ATT&CK**.
3. Selecciona uno o varios productos en el filtro <i class="icon-filter"></i>.
4. Revisa el mapa para ver lo siguiente:
   - Evaluar la cobertura: determina qué técnicas de ataque están bien cubiertas y cuáles están poco vigiladas.
   - Priorizar la creación de reglas: centrarse en la creación de reglas de detección para técnicas con baja o nula cobertura.
   - Racionalización de la gestión de reglas: gestionar y actualizar las reglas de detección, asegurándote de que se ajustan a la información sobre amenazas más reciente.
El mapa de ATT&CK de MITRE está disponible en SIEM o Workload Protection, pero puedes seleccionar Application and API Protection en el filtro. Application and API Protection se incluye en el mapa de MITRE ATT&CK para una cobertura de seguridad integral.
## Reglas de detección beta

El equipo de investigación de seguridad de Datadog añade continuamente nuevas reglas de detección de seguridad predefinidas. Aunque el objetivo es ofrecer detecciones de alta calidad con el lanzamiento de integraciones u otras nuevas funciones, a menudo es necesario observar el rendimiento de la detección a escala antes de poner la regla a disposición general. De este modo, el equipo de investigación de seguridad de Datadog dispone del tiempo necesario para perfeccionar o eliminar las posibilidades de detección que no cumplan nuestras normas.

## Reglas de detección personalizadas

Puede haber situaciones en las que necesites personalizar una regla según tu entorno o carga de trabajo. Por ejemplo, si utilizas AAP, es posible que quieras personalizar una regla de detección que detecte a los usuarios que realizan acciones confidenciales desde una geolocalización en la que no opera tu empresa.

Para [crear reglas personalizadas](#create-detection-rules), puedes clonar las reglas por defecto y editar las copias, o crear tus propias reglas desde cero.

## Buscar y filtrar reglas de detección

Para ver las reglas de detección predefinidas y personalizadas en Datadog, ve a la página [**Parámetros de seguridad**][10]. Las reglas aparecen en páginas separadas para cada producto (Application Security, Cloud Security Management y Cloud SIEM).

Para buscar y filtrar las reglas, utiliza el cuadro de búsqueda y las facetas para consultar por valor. Por ejemplo, para mostrar solo las reglas de un tipo de regla determinado, pasa el ratón por encima del tipo de regla y selecciona `only`. También puedes filtrar por facetas como `source` y `severity` al investigar y clasificar las incidencias entrantes.

{{< img src="security/default_detection_rules.png" alt="La página de configuracion muestra reglas de detección de Cloud SIEM predeterminadas y personalizadas" width="100%">}}

## Crear reglas de detección

Para crear una regla de detección personalizada, haz clic en el botón **New Rule** (Nueva regla) situado en la esquina superior derecha de la página Detection Rules (Reglas de detección). También puedes [clonar una regla predeterminada o personalizada existente](#clone-a-rule) y utilizarla como plantilla.

Para obtener instrucciones detalladas, consulta los siguientes artículos:

- [Cloud SIEM][11]
- [AAP][12]
- [Cloud Security Misconfigurations][13]
- [Workload Protection][14]

## Gestionar las reglas de detección

### Activar o desactivar reglas

Para activar o desactivar una regla, activa el conmutador situado a la derecha del nombre de la regla.

También puedes activar o desactivar reglas en bloque:

1. Haz clic en **Select Rule** (Seleccionar regla).
1. Selecciona las reglas que deseas activar o desactivar.
1. Haz clic en el menú desplegable **Edit Rules** (Editar reglas).
1. Selecciona **Enable Rules** o **Disable Rules** (Activar reglas o Desactivar reglas).

### Editar una regla

Para las reglas de detección predefinidas, solo puedes añadir o editar una consulta de supresión. Para actualizar la consulta, ajustar los desencadenantes o gestionar notificaciones, puedes [clonar la regla predeterminada](#clone-a-rule) y utilizarla como plantilla para una regla personalizada. A continuación, puedes [desactivar la regla predeterminada](#enable-or-disable-rules).

- Para editar una regla por defecto, haz clic en el menú vertical de tres puntos de la regla y selecciona **Edit default rule** (Editar regla por defecto).
- Para editar una regla personalizada, haz clic en el menú vertical de tres puntos de la regla y selecciona **Edit rule** (Editar regla).

### Clonar una regla

Para clonar una regla, haz clic en el menú vertical de tres puntos de la regla y selecciona **Clone rule** (Clonar regla).

Clonar una regla es útil si deseas duplicar una regla existente y modificar ligeramente la configuración para cubrir otras áreas de detección. Por ejemplo, podrías duplicar una regla de detección de log y modificarla de **Umbral** a **Anomalía** para añadir una nueva dimensión a la detección de amenazas utilizando las mismas consultas y desencadenantes.

### Eliminar una regla

Para eliminar una regla personalizada, haz clic en el menú vertical de tres puntos de la regla y selecciona **Delete rule** (Eliminar regla).

**Nota**: Solo puedes eliminar reglas personalizadas. Para eliminar una regla predeterminada, debes [desactivarla](#enable-or-disable-rules).

### Consultar el historial de versiones de una regla

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="Historial de versiones de un compromiso de token de acceso GitHub OAuth" style="width:80%;" >}}

Utiliza el historial de versiones de reglas para:
- Consulta las versiones anteriores de una regla de detección y entiende los cambios a lo largo del tiempo.
- Descubre quién realizó los cambios para mejorar la colaboración.
- Compara versiones con diferencias para analizar las modificaciones y el impacto de los cambios.

Para ver el historial de versiones de una regla:
1. Ve a la página [Parámetros de seguridad][15]. En el panel de navegación izquierdo:
    - Para AAP: Haz clic en **App and API Protection** y luego en **Detection Rules** (Reglas de detección).
    - Para Cloud Security: Haz clic en **Cloud Security** y luego en **Threat Detection Rules** (Reglas de detección de amenazas).
    - Para Cloud SIEM: Haz clic en **Cloud SIEM** y luego en **Detection Rules** (Reglas de detección).
1. Haz clic en la regla que te interese.
1. En el editor de reglas, haz clic en **Version History** (Historial de versiones) para ver los cambios anteriores.
1. Haz clic en una versión concreta para ver los cambios realizados.
1. Haz clic en **Open Version Comparison** (Abrir comparación de versiones) para ver los cambios entre versiones.
1. Selecciona las dos versiones que quieres comparar.
    - Los datos resaltados en rojo indican datos modificados o eliminados.
    - Los datos resaltados en verde indican los datos añadidos.
1. Haz clic en **Unified** (Unificado) si quieres ver la comparación en el mismo panel.

### Restringir permisos de edición

{{% security-products/detection-rules-granular-access %}}

### Ver las señales generadas

Para ver las señales de seguridad de una regla en el [Explorador de señales][1], haz clic en el menú vertical de tres puntos y selecciona **View generated signals** (Ver señales generadas). Esto es útil cuando se correlacionan señales a través de múltiples fuentes por regla, o cuando se completa una auditoría de reglas.

### Exportar una regla como JSON

Para exportar una copia de una regla como JSON, haz clic en el menú vertical de tres puntos de la regla y selecciona **Export as JSON** (Exportar como JSON).

## Obsolescencia de reglas

Se realizan auditorías periódicas de todas las reglas de detección para mantener una calidad de señal de alta fidelidad. Las reglas obsoletas se sustituyen por una regla mejorada.

El proceso de obsolescencia de las reglas es el siguiente:

1. La regla incluye una advertencia con la fecha de obsolescencia. En la interfaz de usuario, la advertencia se muestra en la:
    - Sección **Rule Details > Playbook** (Detalles de la regla > Guía) del panel lateral de señales
    - Panel lateral de Misconfigurations (sólo Cloud Security Misconfigurations)
    - [Editor de reglas][10] para esa regla específica
2. Una vez que la regla se vuelve obsoleta, transcurre un periodo de 15 meses antes de que se elimine la regla. Esto se debe al periodo de conservación de señales de 15 meses. Durante este tiempo, puedes volver a habilitar la regla [clonando la regla][2](#clone-a-rule) en la interfaz de usuario.
3. Una vez eliminada la regla, ya no podrás clonarla ni volver a activarla.

## Referencias adicionales

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
[14]: /es/security/workload_protection/workload_security_rules?tab=host#create-custom-rules
[15]: https://app.datadoghq.com/security/configuration/
[16]: https://app.datadoghq.com/security/siem/rules
[17]: https://app.datadoghq.com/security/workload-protection/detection-rules