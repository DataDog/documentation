---
aliases:
- /es/security/workload_protection/detect_and_monitor/detection_rules
- /es/security/workload_protection/setup/ootb_rules
description: Cree y administre las reglas de backend que analizan los eventos del
  Agent y generan señales de seguridad de Workload Protection.
disable_toc: false
title: Reglas de detección
---
Las reglas de detección describen la lógica de backend utilizada para detectar amenazas en su entorno mediante el análisis de [eventos del Agent][1]. Cuando una regla de detección coincide, Workload Protection genera una [señal de seguridad][2] que puede investigar y a la cual puede responder en Datadog.

Las reglas de detección combinan una o más reglas del Agent (referenciadas con `@agent.rule_id`), aplican métodos de detección como umbrales o anomalías, suprimen el ruido y dirigen las alertas a los equipos correctos. Las reglas del Agent recopilan telemetría de tiempo de ejecución en el servidor; las reglas de detección convierten esa telemetría en detecciones de amenazas priorizadas.

Esta página explica cómo funcionan las reglas de detección listas para usar (OOTB) y cómo crear reglas de detección personalizadas en Datadog.

## Reglas de detección OOTB {#ootb-detection-rules}

Workload Protection incluye **reglas de detección** OOTB mantenidas por Datadog. Combinan la telemetría recopilada a través de las reglas del Agent con expresiones de backend para generar señales de seguridad cuando la actividad parece sospechosa. Explore el catálogo completo en [reglas de detección predeterminadas][3], o revíselas y ajústelas en la lista de [reglas de detección][4] de Workload Protection en Datadog.

## Crear una regla de detección personalizada {#create-a-custom-detection-rule}

Para crear una regla de detección personalizada, vaya a la página de [reglas de detección][4] de Workload Protection y haga clic en {{< ui >}}New Rule{{< /ui >}}. También puede usar {{< ui >}}Assisted rule creator{{< /ui >}} para configurar tanto la regla del Agent como la regla de detección en un solo flujo. Consulte [Crear las reglas personalizadas del Agent y de detección juntas](#create-the-custom-agent-and-detection-rules-together).

El editor de reglas lo guía a través de cinco pasos.

### Paso 1: Defina su regla en tiempo real {#step-1-define-your-real-time-rule}

Seleccione el método de detección que desea utilizar:

- {{< ui >}}Threshold{{< /ui >}}: Defina una ventana de tiempo y la cantidad de eventos coincidentes necesarios para activar una señal. Por ejemplo, active cuando ocurran más de 5 eventos coincidentes en un lapso de 5 minutos.
- {{< ui >}}New value{{< /ui >}}: Active cuando un atributo rastreado aparezca con un valor que no se haya observado anteriormente.
- {{< ui >}}Anomaly{{< /ui >}}: Se activa cuando el volumen o el comportamiento de los eventos se desvía de la línea base esperada.
- {{< ui >}}Content anomaly{{< /ui >}}: Se activa cuando el contenido de los eventos coincidentes es estadísticamente inusual en comparación con los datos históricos.

### Paso 2: Definir la consulta de búsqueda {#step-2-define-search-query}

Defina la consulta que selecciona qué [Agent events][1] evalúa la regla. La consulta de búsqueda determina qué eventos se consideran al decidir si se debe emitir una señal.

Usted puede:

- Filtre por **campos específicos** en los eventos de Agent para refinar la consulta y hacer que la detección sea más precisa. Por ejemplo, filtre por `@process.executable.path`, `@file.path` o `@agent.rule_id`. Las reglas de detección pueden consultar cualquier campo del esquema de eventos del backend. Consulte la [sintaxis del backend de Linux][13] y la [sintaxis del backend de Windows][14] para ver el conjunto completo de campos disponibles.
- Combine múltiples condiciones para definir el contexto de la regla a un subconjunto de su infraestructura o cargas de trabajo.

Para las reglas de **umbral**, defina también la **ventana de retrospectiva**: el período durante el cual Datadog cuenta los eventos coincidentes antes de comparar el recuento con las condiciones de su regla.

Utilice el [Explorador de eventos de Agent][6] para probar su consulta y validar qué eventos coinciden antes de publicar la regla.

### Paso 3: Definir las condiciones de la regla {#step-3-define-rule-conditions}

Establezca los límites que determinan cuándo la regla emite una señal. Puede crear **varios casos**, cada uno asociado con un nivel de gravedad diferente.

Por ejemplo, con una regla de umbral, podría definir:

- {{< ui >}}Critical{{< /ui >}} cuando ocurren más de 10 eventos coincidentes en un lapso de 5 minutos.
- {{< ui >}}High{{< /ui >}} cuando ocurren más de 5 eventos coincidentes en un lapso de 5 minutos.
- {{< ui >}}Medium{{< /ui >}} cuando ocurren más de 2 eventos coincidentes en un lapso de 5 minutos.

En la sección {{< ui >}}Add notify{{< /ui >}}, configure opcionalmente quién recibe una notificación cuando se activa la regla. Puede agregar destinatarios individuales o confiar en las [notification rules][7] para administrar las alertas en múltiples reglas de detección.

### Paso 4: Describa su playbook {#step-4-describe-your-playbook}

Configure el **título** y la **descripción** de la señal que aparece cuando la abre en el [Explorador de señales][2].

1. Ingrese un {{< ui >}}Rule name{{< /ui >}}. El nombre aparece en la lista de reglas de detección y se convierte en el título de la señal de seguridad generada.
2. En la sección {{< ui >}}Rule message{{< /ui >}}, utilice [notification variables][8] y Markdown para describir lo que sucedió y cómo deben actuar los encargados de responder. Las variables de plantilla inyectan contexto dinámico de los eventos de Agent que activan la señal directamente en la señal y sus notificaciones.
3. Utilice el menú desplegable {{< ui >}}Tag resulting signals{{< /ui >}} para agregar etiquetas a las señales generadas. Por ejemplo, `security:attack` o `technique:T1059-command-and-scripting-interpreter`.

### Paso 5: Crear una supresión {#step-5-create-a-suppression}

Opcionalmente, agregue una **consulta de supresión** para reducir el ruido excluyendo infraestructura o eventos específicos de esta regla. Las supresiones ayudan a evitar que se generen señales cuando la actividad coincidente es esperada o benigna.

Por ejemplo, para excluir a un usuario de automatización conocido de una regla, agregue una consulta de supresión como `@usr.name:automation-bot`.

Este paso también proporciona una **descripción general de la cantidad de eventos coincidentes** en el pasado, para que pueda estimar con qué frecuencia se habría activado la regla antes de guardarla. Utilice esta vista previa para ajustar su consulta, umbrales o supresiones y evitar un volumen excesivo de alertas.

Para obtener más información sobre las supresiones en las reglas de detección, consulte [Suppressions][9].

## Cree las reglas personalizadas de Agent y de detección juntas {#create-the-custom-agent-and-detection-rules-together}

Para saber cómo se empaquetan las reglas predeterminadas de Agent en las políticas y cómo se implementan, consulte la descripción general de [Agent rules][10] y [Policy management][11].

Puede definir una regla de Agent y una regla de detección coincidentes de una de estas maneras:

- {{< ui >}}Assisted rule creator{{< /ui >}}: En Datadog, inicie una [regla de detección][4] de Workload Protection personalizada y utilice el asistente para configurar tanto la expresión de Agent como la lógica de la regla de detección de backend.
- {{< ui >}}Manual rule creator{{< /ui >}}: Desde [Configuración de Agent][12], abra o cree una política y elija {{< ui >}}Manual rule creator{{< /ui >}} para crear primero la regla de Agent, luego agregue una regla de detección que haga referencia a ella. Para conocer los pasos de la interfaz de usuario y la implementación, consulte [Gestión de políticas][11].

[1]: /es/security/workload_protection/investigate_and_triage/agent_events
[2]: /es/security/workload_protection/investigate_and_triage/security_signals
[3]: /es/security/default_rules/#cat-workload-security
[4]: https://app.datadoghq.com/security/configuration/rules?product=cws
[5]: /es/security/workload_protection/respond_and_report/#automated-response
[6]: https://app.datadoghq.com/security/agent-events
[7]: /es/security/notifications/rules/
[8]: /es/security/notifications/variables/
[9]: /es/security/suppressions/
[10]: /es/security/workload_protection/detect_and_monitor/agent_rules
[11]: /es/security/workload_protection/detect_and_monitor/agent_rules/policy_management#create-a-custom-agent-rule
[12]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[13]: /es/security/workload_protection/backend_linux
[14]: /es/security/workload_protection/backend_windows