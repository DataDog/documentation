---
further_reading:
- link: /security/ai_guard/
  tag: Documentación
  text: AI Guard
- link: /security/ai_guard/onboarding/
  tag: Documentación
  text: Comience con AI Guard
- link: /security/detection_rules/
  tag: Documentación
  text: Reglas de detección
title: Señales de seguridad de AI Guard
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard no está disponible en el {{< region-param key="dd_site_name" >}} sitio.</div>
{{< /site-region >}}

Las señales de seguridad de AI Guard proporcionan visibilidad sobre las amenazas y ataques que AI Guard detecta en sus aplicaciones. Estas señales se basan en [señales de seguridad de AAP (Protección de aplicaciones y API)][1] y se integran con los flujos de trabajo de monitoreo de seguridad de Datadog.

## Comprender las señales de AI Guard {#understand-ai-guard-signals}

Datadog crea señales de seguridad de AI Guard cuando detecta una amenaza basada en una regla de detección configurada. Las señales que indican amenazas como inyección de prompts, jailbreaking o uso indebido de herramientas aparecen en el explorador de señales de Datadog Security. Estas señales pueden proporcionar:

- **Detección de amenazas**: contexto de ataque basado en sus reglas de detección configuradas
- **Información sobre acción**: información sobre acciones bloqueadas o permitidas según la configuración de sus reglas
- **Contexto de investigación enriquecido**: categorías de ataque detectadas, resultados de evaluación de AI Guard y enlaces a tramos de AI Guard relacionados para un análisis integral
- **Runbooks personalizados**: orientación de remediación personalizada y procedimientos de respuesta para escenarios de amenazas específicos

Para ayudarle a priorizar sus esfuerzos de remediación, AI Guard asigna automáticamente un nivel de gravedad a cada señal de seguridad. Puede crear [reglas de detección personalizadas](#create-detection-rules) para personalizar los niveles de gravedad y definir respuestas de seguridad específicas.

## Crear reglas de detección {#create-detection-rules}

Puede crear reglas de detección personalizadas definiendo umbrales para cuando desee recibir notificaciones; por ejemplo, más de 5 `DENY` acciones en 10 minutos. Cuando las evaluaciones de AI Guard superan esos umbrales, se generan señales de seguridad.

Para crear reglas de detección de AI Guard:
1. En Datadog, vaya al [explorador de reglas de detección de AI Guard][2] y haga clic en {{< ui >}}New Rule{{< /ui >}}.
   {{< img src="security/ai_guard/ai_guard_detection_rules_1.png" alt="Explorador de reglas de detección de AI Guard" style="width:100%;" >}}
1. En {{< ui >}}Define your Real-time rule{{< /ui >}}, elija el tipo de regla que desea crear.
1. En {{< ui >}}Define Search Queries{{< /ui >}}, defina los tipos de etiquetas para los que desea crear señales. Puede utilizar los siguientes atributos de AI Guard para filtrar y dirigirse a patrones de amenazas específicos:
   <table>
     <thead>
       <tr>
         <th>Etiqueta</th>
         <th>Descripción</th>
         <th>Valores posibles</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><code>@ai_guard.action</code></td>
         <td>Filtrar por el resultado de la evaluación de AI Guard</td>
         <td><code>ALLOW</code> o <code>DENY</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.attack_categories</code></td>
         <td>Dirigirse a tipos de ataque específicos</td>
         <td>
           <ul>
             <li><code>jailbreak</code></li>
             <li><code>indirect-prompt-injection</code></li>
             <li><code>destructive-tool-call</code></li>
             <li><code>denial-of-service-tool-call</code></li>
             <li><code>security-exploit</code></li>
             <li><code>authority-override</code></li>
             <li><code>role-play</code></li>
             <li><code>instruction-override</code></li>
             <li><code>obfuscation</code></li>
             <li><code>system-prompt-extraction</code></li>
             <li><code>data-exfiltration</code></li>
           </ul>
         </td>
       </tr>
       <tr>
         <td><code>@ai_guard.blocked</code></td>
         <td>Filtrar según si una acción en la traza fue bloqueada</td>
         <td><code>true</code> o <code>false</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.tools</code></td>
         <td>Filtrar por nombres de herramientas específicos involucrados en la evaluación</td>
         <td><code>get_user_profile</code>, <code>user_recent_transactions</code>, etc.</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.categories</code></td>
         <td>Filtrar por categorías de datos confidenciales detectadas por Sensitive Data Scanner</td>
         <td><code>credentials</code>, <code>email_address</code>, etc.</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.rule_tags</code></td>
         <td>Filtrar por etiquetas de regla de datos confidenciales específicas</td>
         <td><code>aws_access_key_id</code>, <code>aws_secret_access_key</code>, <code>claude_api_key</code>, <code>email_address</code>, etc.</td>
       </tr>
     </tbody>
   </table>
1. En {{< ui >}}Define Rule Conditions{{< /ui >}}:
   1. Defina sus condiciones de umbral, si corresponde al tipo de regla que eligió.
   1. Establezca el nivel de gravedad de las señales de seguridad que AI Guard genera con esta regla.
   1. Elija quién debe recibir notificaciones sobre nuevas señales y con qué frecuencia.
   1. Elija las respuestas de seguridad que se tomarán, como el bloqueo automatizado de IP o de usuario, y el marcado de IP.
   1. Configure ajustes adicionales, como actualizar la misma señal en lugar de crear una nueva si AI Guard detecta nuevos valores dentro de una cantidad de tiempo determinada, y disminuir la gravedad de la señal para entornos que no son de producción.
1. En {{< ui >}}Describe your Playbook{{< /ui >}}, personalice la notificación y defina las etiquetas que se enviarán con las señales.
1. Haga clic en {{< ui >}}Save Rule{{< /ui >}}.

Para obtener capacidades de reglas de detección más completas, consulte [reglas de detección][3].

## Investigar señales {#investigate-signals}

Para ver e investigar las señales de seguridad de AI Guard, y correlacionarlas con otros eventos de seguridad, puede ver las señales en dos lugares:
- [Explorador de señales de seguridad de protección de aplicaciones y API][4]
- [Explorador de señales de seguridad de Cloud SIEM][5]

  En el explorador de señales de seguridad de Cloud SIEM, junto a la barra de búsqueda, haga clic en el icono {{< ui >}}Filter{{< /ui >}} y seleccione la casilla de verificación {{< ui >}}App & API Protection{{< /ui >}} para ver las señales de AI Guard.

Los exploradores de señales de seguridad le permiten filtrar, priorizar e investigar las señales de AI Guard junto con otras amenazas de seguridad de aplicaciones, proporcionando una visualización unificada de su postura de seguridad.

Puede crear o vincular casos directamente desde una señal de seguridad de AI Guard, y hacer clic en cualquier señal para abrir un panel lateral que contiene contexto adicional.

## Obtenga contexto adicional con tramos {#get-additional-context-with-spans}

Los tramos de AI Guard ofrecen información detallada sobre las evaluaciones que realizó y por qué. Cuando abre un tramo desde la página [Investigar][6] o desde una señal, puede obtener contexto sobre los prompts específicos que utilizó su Agent, leer las entradas y salidas exactas, y ver cualquier categoría de ataque que contribuyó a que AI Guard evaluara una llamada de herramienta como insegura.

### Obtenga contexto sobre un tramo {#get-context-on-a-span}

Cuando hace clic en un tramo en el explorador, puede ver:
- El servicio y el entorno en los que ocurrieron las solicitudes
- La [política de bloqueo][7] configurada para ese servicio, la cual determina si AI Guard bloquea las solicitudes inseguras, o las detecta y etiqueta sin bloquearlas
- El usuario que interactuó con el Agent
- Las entradas y salidas específicas de su Agent, y si provinieron de LLM o herramientas externas
- Si AI Guard evaluó cada solicitud como segura o insegura
- Si AI Guard bloqueó la solicitud
- Si AI Guard evaluó la llamada como insegura, qué categorías de ataque incluyó
- Si la solicitud incluyó datos confidenciales, y de ser así, qué tipo de datos confidenciales
- Etiquetas adicionales, que puede usar para filtrar tramos en el explorador

Además, puede hacer clic en {{< ui >}}Explore in graph view{{< /ui >}} para ver las solicitudes de la conversación graficadas, o ver el tramo en [APM][8] o [Agent Observability][9].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/security_signals/
[2]: https://app.datadoghq.com/security/ai-guard/settings/detection-rules
[3]: /es/security/detection_rules/
[4]: https://app.datadoghq.com/security/ai-guard/signals
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://app.datadoghq.com/security/ai-guard/investigate
[7]: /es/security/ai_guard/setup/#blocking-policy
[8]: /es/tracing/
[9]: /es/llm_observability/