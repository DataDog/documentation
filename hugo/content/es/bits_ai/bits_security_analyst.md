---
aliases:
- /es/bits_ai/bits_ai_security_analyst
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-security-analyst/
  tag: Blog
  text: Automatiza investigaciones de Cloud SIEM con el Analista de Seguridad de Bits
    AI
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: Blog
  text: 'Novedades en Cloud SIEM: investigaciones impulsadas por IA, inteligencia
    de amenazas mejorada y operaciones de seguridad escalables'
title: Analista de Seguridad de Bits
---
## Descripción general {#overview}

El Analista de Seguridad de Bits es un agente autónomo de IA que investiga señales de Cloud SIEM de principio a fin. Consulta señales de seguridad y registros, y utiliza razonamiento basado en datos para ayudar a los ingenieros de seguridad a investigar alertas de amenazas y hacer una recomendación sobre el veredicto de cada señal de alerta. Al reducir el esfuerzo manual y la fatiga del analista, el Analista de Seguridad de Bits hace que las operaciones de seguridad sean más fluidas y eficientes.

### Capacidades clave {#key-capabilities}

Las investigaciones del Analista de Seguridad de Bits son autónomas. Si se habilita una regla de detección, Bits AI investiga de manera autónoma las señales asociadas con ella.

En el [Explorador de Señales de Cloud SIEM][5], puede hacer clic en la pestaña {{< ui >}}Bits Security Analyst{{< /ui >}} para mostrar solo las señales que investigó Bits AI. En la columna de Severidad, un estado de Bits AI se muestra como Investigando, hasta marcar la señal como Benigna o Sospechosa.

{{< img src="bits_ai/bits_security_analyst_signals_explorer.png" alt="El explorador de señales de Cloud SIEM, en la pestaña del Analista de Seguridad de Bits" style="width:100%;" >}}

Cuando hace clic en una fila con una investigación de Bits AI, se abre el panel lateral de Investigación de Bits AI:

{{< img src="bits_ai/bits_security_analyst_example.png" alt="Ejemplo de detección del Analista de Seguridad de Bits, titulado 'Detección de phishing de Okta con verificación de origen de FastPass'." style="width:100%;" >}}

En el panel lateral, puede ver los hallazgos de investigación de Bits AI, incluyendo:
- Conclusión general
- Evidencia clave utilizada para llegar a esa conclusión
- Pasos de investigación que muestran las consultas de datos de Bits AI, incluyendo resultados incrustados y enlaces a consultas completas
- Análisis de cada paso de investigación

También puede tomar pasos adicionales directamente desde el panel lateral:
- Cree un caso con resultados de investigación de Bits AI prellenados
- Ejecute un flujo de trabajo con un plano SOAR
- Declare un incidente
- Agregue una supresión de regla
- Archive la señal, o visualice la señal con la interfaz habitual de Cloud SIEM
- Déle retroalimentación a Bits AI sobre su análisis

Además, cuando utiliza notificaciones de Cloud SIEM para enviar nuevas alertas de señales a Slack o Jira, Bits AI actualiza automáticamente esas notificaciones. Incluye respuestas que muestran la conclusión de investigación de Bits AI, con un enlace a la investigación completa.

### Fuentes soportadas {#supported-sources}

Bits AI puede realizar investigaciones sobre las siguientes fuentes de registro de seguridad:
- Amazon GuardDuty
  - Las [categorías de hallazgos][6] incluyen comportamiento anómalo de IAM, exfiltración y uso indebido de credenciales de EC2, exposición de datos de S3, evasión de defensa de CloudTrail o S3, y secuencias de ataque que correlacionan la compromisión de credenciales de IAM y datos de S3
- AWS CloudTrail
- Azure
- GCP
- Kubernetes
- Microsoft Entra ID
- Okta
- Google Workspace
- Microsoft 365
- GitHub
- Snowflake
- SentinelOne
- Phishing por correo electrónico

## Configurar Bits Security Analyst {#set-up-bits-security-analyst}

### Requisitos previos {#prerequisites}

Para usar Bits Security Analyst:
- Asegúrese de que su organización esté utilizando una versión no heredada de Cloud SIEM. Si necesita asistencia, comuníquese con [soporte de Datadog][1].
- Para configurar Bits Security Analyst, necesita el **Bits Security Analyst Config Write** [permiso][2].
- Para ver investigaciones, debe tener **14 días o más** de historial de registros. Si tiene un historial de registros más corto, aún puede configurar Bits Security Analyst, pero no verá ninguna investigación hasta que tenga ese historial.

### Configuración {#setup}

Cuando habilita Bits Security Analyst, Datadog analiza sus reglas, incluidas las reglas personalizadas, para determinar si puede investigar con confianza las señales asociadas con ellas. Para todas las reglas elegibles de severidad media o superior, comienza a investigar señales de manera autónoma. 

La elegibilidad de la regla depende de si Datadog ha construido la capacidad de investigación para la fuente de registro y si el Agente puede investigar la regla específica. Si tiene nuevas reglas personalizadas para evaluar, o desea preguntar sobre una regla que no fue habilitada, comuníquese con [soporte de Datadog][1].

1. En Datadog, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Bits Security Analyst{{< /ui >}}][3].
1. Active el interruptor para {{< ui >}}Enable Bits Security Analyst{{< /ui >}}. Aparecen configuraciones adicionales.
1. (Opcional) Configure qué reglas y qué niveles de severidad desea que Bits Security Analyst investigue automáticamente en las señales. Hay dos formas de hacerlo:
   - Haga clic en {{< ui >}}Rule Settings{{< /ui >}} para configurar investigaciones para reglas individuales. Puede cambiar la severidad mínima para que las señales sean investigadas, y habilitar o deshabilitar reglas individuales para la investigación.
   - Haga clic en {{< ui >}}Query Filter{{< /ui >}} para escribir un filtro de consulta de señales, de modo que Bits Security Analyst solo investigue señales que coincidan con su filtro.
1. Algunas fuentes de registro requieren credenciales para ejecutar o mejorar investigaciones accediendo a registros, telemetría u otros datos que no están en Datadog. Para agregar credenciales, haga clic en {{< ui >}}Edit credentials{{< /ui >}}. En la ventana {{< ui >}}Select or Add Connection{{< /ui >}} que se abre, siga las indicaciones para seleccionar una [conexión existente][4] del Catálogo de Acciones, o agregue una conexión. Datadog almacena y restringe de manera segura todas las credenciales utilizando el Catálogo de Acciones.
   
   Algunas fuentes de registro requieren configuración adicional para que pueda crear conexiones HTTP. Aquí hay un ejemplo:
   {{< collapse-content title="Configure SentinelOne" level="h4" expanded=false id="sentinelone" >}}
   <ol>
     <li>En SentinelOne, asegúrese de tener permiso para crear un token de API. Cree un usuario de servicio de API de S1, luego asigne el rol {{< ui >}}Viewer{{< /ui >}} a ese usuario.</li>
     <li>En Datadog, en la ventana {{< ui >}}Select or Add Connection{{< /ui >}}, en el menú desplegable, seleccione {{<  ui >}}New Connection{{< /ui >}}, luego haga clic en el mosaico {{< ui >}}HTTP{{< /ui >}}.</li>
     <li>Agregue la siguiente información:
       <ul>
         <li>En el campo {{< ui >}}Description{{< /ui >}}, Datadog recomienda agregar la fecha de expiración de su token, para que sea fácilmente accesible.</li>
         <li>En el campo {{< ui >}}Base URL{{< /ui >}}, ingrese la URL de su Consola de Gestión de SentinelOne.</li>
         <li>Bajo {{< ui >}}Token Auth{{< /ui >}}:
           <ol>
             <li>Ingrese un nombre para su token en el campo {{< ui >}}Token Name{{< / ui >}}, y su token de API en el campo {{< ui >}}Token Value{{< /ui >}}.</li>
             <li>En la pestaña {{< ui >}}Headers{{< /ui >}}, bajo {{< ui  >}}Request Headers{{< /ui >}}, haga clic en {{< ui >}}Add a Header{{< /ui >}}. Agregue los siguientes dos encabezados:
               <table>
                 <thead>
                   <tr>
                     <th>Nombre</th>
                     <th>Valor</th>
                   </tr>
                 </thead>
                 <tr>
                   <td><code>Authorization</code></td>
                   <td><code>Bearer</code> seguido de un espacio, luego inserte el {{< ui >}}Token Name{{< /ui >}} que definió</td>
                 </tr>
                 <tr>
                   <td><code>Content-Type</code></td>
                   <td><code>application/json</code></td>
                 </tr>
               </table>
             </li>
           </ol>
       </ul>
     </li>
     <li>Haga clic en {{< ui >}}Next, Confirm Access{{< /ui >}} para verificar su conexión.</li>
   </ol>
   {{< /collapse-content >}}

## Desactive el Analista de Seguridad de Bits {#disable-bits-security-analyst}

1. En Datadog, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Bits Security Analyst{{< /ui >}}][3].
1. Desplácese hasta la parte inferior de la página. Bajo {{< ui >}}Disable Bits Security Analyst{{< /ui >}}, apague el interruptor de {{< ui >}}Enabled{{< /ui >}}.
   <div class="alert alert-warning">Desactivar el Analista de Seguridad de Bits restablece permanentemente todas las configuraciones.</div>

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help
[2]: /es/account_management/rbac/permissions/#cloud-security-platform
[3]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst
[4]: /es/actions/connections/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html