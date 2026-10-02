---
aliases:
- /es/bits_ai/bits_ai_security_analyst
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-security-analyst/
  tag: Blog
  text: Automatice las investigaciones de Cloud SIEM con Bits AI Security Analyst
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: Blog
  text: 'Novedades en Cloud SIEM: investigaciones impulsadas por IA, inteligencia
    de amenazas mejorada y operaciones de seguridad escalables'
- link: https://www.datadoghq.com/blog/cloud-security-investigation-ai/
  tag: Blog
  text: Cómo investigar el compromiso de credenciales en la nube con Bits Security
    Analyst
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: Blog
  text: Evalúe, optimice y asegure su pila de IA de Google Cloud con Datadog
title: Bits Security Analyst
---
## Descripción general {#overview}

Bits Security Analyst es un agente de IA autónomo que investiga señales de Cloud SIEM de principio a fin. Consulta señales y registros de seguridad, y utiliza razonamiento basado en datos para ayudar a los ingenieros de seguridad a investigar alertas de amenazas y hacer una recomendación sobre el veredicto de cada señal de alerta. Al reducir el esfuerzo manual y la fatiga del analista, Bits Security Analyst hace que las operaciones de seguridad sean más fluidas y eficientes.

### Capacidades clave {#key-capabilities}

Las investigaciones de Bits Security Analyst son autónomas. Si una regla de detección está habilitada, Bits AI investiga de forma autónoma las señales asociadas a ella.

En el [Cloud SIEM Signals Explorer][5], puede hacer clic en la pestaña {{< ui >}}Bits Security Analyst{{< /ui >}} para mostrar solo las señales que Bits AI investigó. En la columna Severity, un estado de Bits AI aparece como Investigating, hasta que marca la señal como Benign o Suspicious.

{{< img src="bits_ai/bits_security_analyst_signals_explorer.png" alt="El explorador de señales de Cloud SIEM, en la pestaña Bits Security Analyst" style="width:100%;" >}}

Cuando hace clic en una fila con una investigación de Bits AI, se abre el panel lateral Bits AI Investigation:

{{< img src="bits_ai/bits_security_analyst_example.png" alt="Ejemplo de detección de Bits Security Analyst, titulada 'Okta phishing detection with FastPass origin verificación'." style="width:100%;" >}}

En el panel lateral, puede ver los hallazgos de investigación de Bits AI, que incluyen:
- Conclusión general
- Evidencia clave utilizada para llegar a esa conclusión
- Siguientes pasos sugeridos para remediar el problema o suprimir reglas de detección con atributos específicos
- Pasos de investigación que muestran las consultas de datos de Bits AI, incluidos resultados integrados y enlaces a consultas completas
- Análisis de cada paso de la investigación

También puede realizar pasos adicionales directamente desde el panel lateral:
- Crear un elemento de trabajo con resultados de investigación de Bits AI precargados
- Ejecutar un flujo de trabajo con un plano de SOAR
- Declarar un incidente
- Agregar una supresión de regla
- Archivar la señal o visualizar la señal con la interfaz habitual de Cloud SIEM
- Dar retroalimentación a Bits AI sobre su análisis

Además, cuando utiliza las notificaciones de Cloud SIEM para enviar nuevas alertas de señales a Slack o Jira, Bits AI actualiza automáticamente esas notificaciones. Incluye respuestas que muestran la conclusión de la investigación de Bits AI, con un enlace a la investigación completa.

### Fuentes admitidas {#supported-sources}

Bits AI puede ejecutar investigaciones en las siguientes fuentes de registro de Security:
- Amazon GuardDuty, donde los [tipos de hallazgos][6] admitidos cubren:
  - Credenciales de IAM anómalas y comprometidas
  - Exfiltración y uso indebido de credenciales de EC2 y recursos
  - Cambios en el registro de Bedrock, invocación anómala de modelos, recopilación de costos e inyección directa de prompts
  - secuencias de ataque a clústeres de EKS y ECS comprometidos
  - Acceso a credenciales de Kubernetes, comportamiento anómalo, ejecución, escalada de privilegios, persistencia, cambios de políticas y llamadores malintencionados
  - Comportamiento anómalo de S3, exposición de datos, llamadores malintencionados y actividad de pruebas de penetración
  - Evasión de defensa de CloudTrail o S3
  - Secuencias de ataque que correlacionan el compromiso de credenciales IAM y datos de S3
- AWS CloudTrail
- Azure
- Cloudflare
- CrowdStrike
- GCP
- Kubernetes
- Microsoft Entra ID
- Okta
- Google Workspace
- Microsoft 365
- GitLab
- GitHub
- JumpCloud
- Salesforce
- Slack
- Snowflake
- SentinelOne
- Windows
- Correo electrónico de phishing

## Configurar Bits Security Analyst {#set-up-bits-security-analyst}

### Requisitos previos {#prerequisites}

Para usar Bits Security Analyst:
- Asegúrese de que su organización esté utilizando una versión no heredada de Cloud SIEM. Si necesita asistencia, comuníquese con [soporte de Datadog][1].
- Para configurar Bits Security Analyst, necesita el **Bits Security Analyst Config Write** [permission][2].
- Para visualizar las investigaciones, debe tener **14 días o más** de historial de registros. Si tiene un historial de registros más corto, aún puede configurar Bits Security Analyst, pero no verá ninguna investigación hasta que tenga esa cantidad de historial.

### Configuración {#setup}

Cuando habilita Bits Security Analyst, Datadog analiza sus reglas, incluidas las reglas personalizadas, para determinar si puede investigar con confianza las señales asociadas a ellas. Para todas las reglas elegibles por encima de una gravedad media, comienza a investigar señales de forma autónoma. 

La elegibilidad de las reglas depende de si Datadog ha desarrollado la capacidad de investigación para la fuente de registros y de si el Agent puede investigar la regla específica. Si tiene nuevas reglas personalizadas para evaluar o desea consultar sobre una regla que no se hizo elegible, comuníquese con [soporte de Datadog][1].

1. En Datadog, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Analyst Configuration{{< /ui >}}][3].
1. Active el interruptor para {{< ui >}}Enable Bits Security Analyst{{< /ui >}}. Aparecerán configuraciones adicionales.
1. (Opcional) Configure para qué reglas y qué niveles de gravedad desea que Bits Security Analyst investigue señales automáticamente. Hay dos formas de hacerlo:
   - Haga clic en {{< ui >}}Rule Settings{{< /ui >}} para configurar las investigaciones de reglas individuales. Puede cambiar la gravedad mínima para que las señales sean investigadas y habilitar o deshabilitar reglas individuales para la investigación.
   - Haga clic en {{< ui >}}Query Filter{{< /ui >}} para escribir un filtro de consulta de señales, de modo que Bits Security Analyst solo investigue las señales que coincidan con su filtro.
1. Algunas fuentes de registro requieren credenciales para ejecutar o mejorar las investigaciones mediante el acceso a registros, telemetría u otros datos que no están en Datadog. Para agregar credenciales, haga clic en {{< ui >}}Edit credentials{{< /ui >}}. En la ventana {{< ui >}}Select or Add Connection{{< /ui >}} que se abre, siga las instrucciones para seleccionar una [conexión existente][4] del Catálogo de acciones o agregue una conexión. Datadog almacena y restringe de forma segura todas las credenciales mediante el Catálogo de acciones.
   
   Algunas fuentes de registro requieren una configuración adicional para que pueda crear conexiones HTTP. Aquí hay algunos ejemplos:
   {{< collapse-content title="Configurar SentinelOne" level="h4" expanded=false id="sentinelone" >}}
   <ol>
     <li>En SentinelOne, asegúrese de tener permiso para crear un token de API. Cree un usuario de servicio de API de S1, luego asigne el rol {{< ui >}}Viewer{{< /ui >}} a ese usuario.</li>
     <li>En Datadog, en la ventana {{< ui >}}Select or Add Connection{{< /ui >}}, en el menú desplegable, seleccione {{<  ui >}}New Connection{{< /ui >}}, luego haga clic en el mosaico {{< ui >}}HTTP{{< /ui >}}.</li>
     <li>Agregue la siguiente información:
       <ul>
         <li>En el campo {{< ui >}}Description{{< /ui >}}, Datadog recomienda agregar la fecha de vencimiento de su token para que sea fácilmente accesible.</li>
         <li>En el campo {{< ui >}}Base URL{{< /ui >}}, ingrese la URL de su consola de administración de SentinelOne.</li>
         <li>En {{< ui >}}Token Auth{{< /ui >}}:
           <ol>
             <li>Ingrese un nombre para su token en el campo {{< ui >}}Token Name{{< / ui >}} y su token de API en el campo {{< ui >}}Token Value{{< /ui >}}.</li>
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

   {{< collapse-content title="Configurar CrowdStrike" level="h4" expanded=false id="crowdstrike" >}}
   <ol>
     <li>En CrowdStrike, vaya a <strong>Support and resources</strong>, luego haga clic en <strong>API clients and keys</strong>.</li>
     <li>Haga clic en <strong>Create API client</strong>.</li>
     <li>Seleccione los contextos para el cliente de API:
       <ul>
         <li>Establezca todos los contextos en <strong>Read Only</strong>, excepto <strong>NGSIEM</strong>.</li>
         <li>Establezca el contexto de <strong>NGSIEM</strong> en <strong>Lectura y escritura</strong>. La consulta de NGSIEM requiere solicitudes POST, que CrowdStrike clasifica como una acción de escritura.</li>
       </ul>
     </li>
     <li>Después de crear el cliente de API, guarde de forma segura el <strong>ID de cliente</strong>, el <strong>Secreto</strong> y la <strong>URL base</strong>. El secreto solo se muestra una vez, y la URL base debe coincidir con su región de CrowdStrike.</li>
     <li>En Datadog, en la ventana {{< ui >}}Select or Add Connection{{< /ui >}}, en el menú desplegable, seleccione {{< ui >}}New Connection{{< /ui >}}, luego haga clic en el mosaico {{< ui >}}HTTP{{< /ui >}}.</li>
     <li>Agregue la siguiente información:
       <ul>
         <li>En el campo {{< ui >}}Base URL{{< /ui >}}, ingrese su URL de administración de CrowdStrike.</li>
         <li>Para {{< ui >}}Authentication Type{{< /ui >}}, seleccione {{< ui >}}2 Step Auth{{< /ui >}}.</li>
       </ul>
     </li>
     <li>En {{< ui >}}Query your access token{{< /ui >}}:
       <ul>
         <li>Para {{< ui >}}Secret Type{{< /ui >}}, seleccione {{< ui >}}Token Auth{{< /ui >}}, luego agregue dos tokens:
           <table>
             <thead>
               <tr>
                 <th>Nombre del token</th>
                 <th>Valor del token</th>
               </tr>
             </thead>
             <tr>
               <td><code>secret</code></td>
               <td>Su secreto de CrowdStrike</td>
             </tr>
             <tr>
               <td><code>clientid</code></td>
               <td>Su ID de cliente de CrowdStrike</td>
             </tr>
           </table>
         </li>
         <li>En el campo {{< ui >}}Request URL{{< /ui >}}, ingrese <code>{your_base_url}/oauth2/token</code> (por ejemplo, <code>https://api.crowdstrike.com/oauth2/token</code>).</li>
         <li>En el campo {{< ui >}}Body{{< /ui >}}, agregue su <code>client_id</code> y <code>client_secret</code>. El tipo de contenido debe ser <code>application/x-www-form-urlencoded</code>.</li>
       </ul>
     </li>
     <li>En {{< ui >}}Get Access Token from Response{{< /ui >}}:
       <ul>
         <li>Establecer {{< ui >}}Variable Path to Access Token{{< /ui >}} en <code>body.access_token</code>.</li>
         <li>Establecer {{< ui >}}Refresh Interval{{< /ui >}} en <code>1700</code>.</li>
         <li>En {{< ui >}}Request Headers{{< /ui >}}, agregue los siguientes dos encabezados:
           <table>
             <thead>
               <tr>
                 <th>Nombre</th>
                 <th>Valor</th>
               </tr>
             </thead>
             <tr>
               <td><code>Authorization</code></td>
               <td><code>Bearer</code> seguido de un espacio, luego <code>{{accessToken}}</code></td>
             </tr>
             <tr>
               <td><code>Accept</code></td>
               <td><code>application/json</code></td>
             </tr>
           </table>
         </li>
       </ul>
     </li>
     <li>Haga clic en {{< ui >}}Next, Confirm Access{{< /ui >}} para verificar su conexión.</li>
   </ol>
   {{< /collapse-content >}}

### Agregue fuentes de conocimiento {#add-knowledge-sources}

Puede proporcionar contexto adicional para Bits Security Analyst, como detalles sobre las reglas de autorización, políticas y entorno de su organización, lo que permite a Bits producir investigaciones más precisas adaptadas a las necesidades de su organización.

Para agregar conocimiento, en Datadog, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Knowledge Sources{{< /ui >}}][8]. Allí, puede agregar dos tipos de conocimiento:
- **Contexto general de la organización (Bits.md)**: Instrucciones a nivel de organización que Bits Security Analyst debe aplicar a todas las investigaciones.
  1. Haga clic en **Editar** para que el campo sea editable y pueda realizar sus cambios.
  1. Haga clic en **Guardar**.
- **Contexto situacional**: Hechos específicos de la investigación que Bits Security Analyst debe aplicar en situaciones específicas. Puede buscar y filtrar la tabla de entradas de contexto, y elegir visualizar las entradas caducadas, para obtener una descripción general del contexto existente.
  1. Haga clic en **Crear entrada de contexto**. En la ventana que se abre, ingrese:
     1. **Título**: Un título breve para su entrada.
     1. **Descripción del contexto**: La información que desea que Bits Security Analyst tome en cuenta.
     1. **Estado**: Elija habilitar esta pieza de contexto o guardarla sin habilitarla.
     1. **Fecha de vencimiento** (opcional): Una fecha para que Bits Security Analyst deje de tomar en cuenta esta pieza de contexto.
  1. Haga clic en **Crear entrada**. La ventana se cierra y su contexto aparece en la tabla.

### Recibir notificaciones de investigaciones completadas {#get-notifications-for-completed-investigations}

Puede crear reglas de notificación de seguridad para recibir una notificación cuando Bits Security Analyst complete una investigación. Para hacerlo, siga las instrucciones en [Crear reglas de notificaciones][7]. Al especificar las etiquetas y atributos que deben estar presentes para que se active la regla de notificación, agregue la etiqueta `@workflow.bits_investigator.state:*`.

## Deshabilitar Bits Security Analyst {#disable-bits-security-analyst}

1. En Datadog, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Analyst Configuration{{< /ui >}}][3].
1. Desplácese hasta la parte inferior de la página. En {{< ui >}}Disable Bits Security Analyst{{< /ui >}}, desactive el interruptor{{< ui >}}Enabled{{< /ui >}}.
   <div class="alert alert-warning">Deshabilitar Bits Security Analyst restablece permanentemente todos los ajustes de configuración.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help
[2]: /es/account_management/rbac/permissions/#cloud-security-platform
[3]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst/analyst-configuration
[4]: /es/actions/connections/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html
[7]: /es/security/notifications/rules/#create-notification-rules
[8]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst/knowledge-sources