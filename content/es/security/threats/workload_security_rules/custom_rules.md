---
further_reading:
- link: /security/threats/setup
  tag: Documentación
  text: Configuración de CSM Threats
- link: /security/threats/agent_expressions
  tag: Documentación
  text: Expresiones del Agent
- link: security/threats/backend
  tag: Documentación
  text: Eventos de CSM Threats
- link: /security/notifications/variables/
  tag: Documentación
  text: Más información sobre las variables de notificación de seguridad
title: Creación de reglas de detección personalizadas
---

En este tema, se explica cómo crear reglas personalizadas de Datadog Agent y reglas de detección para [CSM Threats][8].

Además de las [reglas de Agent y reglas de detección predeterminadas][7] predefinidas (OOTB), puedes escribir reglas de Agent y reglas de detección personalizadas. Las reglas personalizadas te ayudan a detectar eventos que Datadog no está detectando con sus reglas predefinidas.

## Resumen de reglas de detección personalizadas

Las reglas de detección personalizadas dependen de las reglas de Agent. Se componen de reglas de Agent existentes y desplegadas y de parámetros de expresión adicionales. 

Hay dos casos de uso:

- **Crear una regla de detección utilizando una regla de Agent existente:** para crear una regla de detección de amenazas que utilice una regla de Agent existente, solo tienes que crear una regla de detección de amenazas que haga referencia a la regla de Agent y añadir los parámetros de expresión adicionales que necesites.
- **Crear una regla de detección de amenazas utilizando una nueva regla de Agent:** para detectar un evento que las reglas actuales de Agent no admiten, debes crear una regla de Agent personalizada para detectar ese evento y, luego, crear una regla de detección de amenazas personalizada que utilice la regla de Agent personalizada.

Para obtener más información, consulta [Reglas de detección de CSM Threats][7]. 

Puedes crear reglas personalizadas utilizando estos métodos:

- **Simple:** utiliza el **Creador de reglas asistido** para crear las reglas de Agent y de detección personalizadas juntas.
  - Para obtener información sobre cómo utilizar el **creador de reglas asistido**, consulta [Crear las reglas de Agent y de detección personalizadas juntas](#create-the-custom-agent-and-detection-rules-together).
- **Avanzado:** crea reglas de detección y de Agent personalizadas individualmente definiendo sus expresiones de detección de amenazas. 
  - Para conocer los pasos de este método, consulta [Crear una regla personalizada de Agent](#create-a-custom-agent-rule) y [Crear una regla de detección personalizada](#create-a-custom-detection-rule).

## Crear conjuntamente las reglas de Agent y de detección personalizadas

La opción **Creador de reglas asistido** te ayuda a crear conjuntamente el Agent y las reglas de detección dependientes, y garantiza que se haga referencia a la regla del Agent en las reglas de detección. El uso de esta herramienta es más rápido que el método avanzado de creación del Agent y de las reglas de detección por separado.

A medida que se definen las reglas mediante esta herramienta, las expresiones de amenaza generadas para estas reglas se muestran en la herramienta.

Para utilizar el creador de reglas simple:

1. En [Configuración del Agent][4] o [Reglas de detección de amenazas][3], selecciona **New rule** (Nueva regla) y, a continuación, selecciona **Assisted rule creator** (Creador de reglas asistido).
2. Define la detección. Para monitorizar tu recurso correctamente, tienes las siguientes opciones de tipo de detección:
   - Para detectar cambios no estándar y sospechosos en los archivos, selecciona **File integrity monitoring (FIM)** (Monitorización de la integridad de archivos (FIM)).
   - Para rastrear y analizar los procesos de software del sistema en busca de comportamientos maliciosos o infracciones de política, selecciona **Process activity monitoring** (Monitorización de la actividad de proceso).
   - Introduce los nombres de archivo/proceso o las rutas para monitorizar.
3. Especifica más condiciones. Introduce los argumentos que desees añadir a la expresión de la regla de amenaza. Por ejemplo, el argumento `foo` se añade como `process.argv in ["foo"]`.
4. Establece listas de gravedad y notificación. 
   - Selecciona la gravedad de la señal generada cuando se detecta esta amenaza. 
   - Selecciona listas de notificación para notificar cuando se genera una señal.
5. Añade el nombre y la descripción de la regla.

   Este es un ejemplo de una nueva regla de FIM, incluidas las expresiones generadas para cada regla.

    {{< img src="/security/csm/csm_threats_simple_rule_creator2.png" alt="Ejemplo del creador de reglas asistido" style="width:100%;" >}}

6. Selecciona **Create _N_ Rules** (Crear _N_ reglas).
7. En **Generate Rules** (Generar reglas), selecciona **Confirm** (Confirmar). Las reglas se generan.
8. Selecciona **Finish** (Finalizar). La página [Configuración del Agent][3] muestra las nuevas reglas.
9. En la [Configuración del Agent][3], selecciona **Deploy Agent Policy** (Desplegar política del Agent).


## Crear una regla del Agent personalizada

Puedes crear una regla personalizada de Agent individual, desplegarla como una [nueva política del Agent](#deploy-the-policy-in-your-environment) y referenciarla en una [regla de detección personalizada](#create-a-custom-detection-rule).

1. En [Configuración del Agent][4], selecciona **New rule** (Nueva regla) y, a continuación, selecciona **Manual rule creator** (Creador de reglas manual).
2. Añade un nombre y una descripción para la regla.
3. En **Expression** (Expresión), define la expresión del Agent utilizando la sintaxis del Lenguaje de seguridad (SECL) de Datadog.

    {{< img src="security/cws/workload_security_rules/define_agent_expression.png" alt="Añadir una regla al campo de Expresión" >}}

    Por ejemplo, para monitorizar clientes sospechosos de contenedor:

    ```text
    exec.file.path in ["/usr/bin/docker", "/usr/local/bin/docker",
    "/usr/bin/kubectl", "/usr/local/bin/kubectl"] && container.id != ""
    ```

4. Haz clic en **Create Agent Rule** (Crear regla de Agent). Esto te lleva automáticamente a la página **Agent Configuration** (Configuración del Agent).

Después de crear una regla de Agent personalizada, el cambio se guarda junto con otras actualizaciones de reglas pendientes. Para aplicar el cambio a tu entorno, [despliega la política personalizada actualizada en el Agent](#deploy-the-policy-in-your-environment).

## Despliegue de la política en tu entorno

Las reglas de Agent personalizadas se despliegan en el Agent en una política personalizada separada de la política predeterminada. La política personalizada contiene reglas de Agent personalizadas así como [reglas predeterminadas que han sido desactivadas](#disable-default-agent-rules).

Puedes utilizar la Configuración remota para desplegar automáticamente la política personalizada en tus hosts designados (todos los hosts o un subconjunto definido de hosts), o cargarla manualmente en el Agent en cada host.

<div class="alert alert-info">La configuración remota para las reglas personalizadas se encuentra en una versión beta privada. Completa este <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5Emr7y_Jg3ShcC44HlYtalxKgHUocFAz8dq87xSkjfeALTg/viewform">formulario</a> para solicitar acceso.</div>

### Configuración remota

1. En la página **Agent Configuration** (Configuración del Agent), selecciona **Deploy Agent Policy** (Desplegar política del Agent).
2. Selecciona **Remote Configuration** (Configuración remota).
3. Elige si deseas **Desplegar a todos los hosts** o **Desplegar a un subconjunto de hosts**. Para desplegar la política en un subconjunto de hosts, especifica hosts seleccionando uno o más etiquetas (tags) de servicio.
4. Haz clic en **Deploy** (Desplegar).

### Despliegue manual

1. En la página **Agent Configuration** (Configuración del Agent), selecciona **Deploy Agent Policy** (Desplegar política del Agent).
2. Selecciona **Manual**.
3. Haz clic en **Download Agent Policy** (Descargar política de Agent), luego, haz clic en **Done** (Listo).

A continuación, utiliza las siguientes instrucciones para cargar el archivo de política en cada host.

{{< tabs >}}
{{% tab "Host" %}}

Copia el archivo `default.policy` en el host de destino de la carpeta `{$DD_AGENT}/runtime-security.d`. Como mínimo, el archivo debe tener acceso a `read` y `write` para el usuario `dd-agent` en el host. Esto puede requerir el uso de una utilidad como SCP o FTP.

Para aplicar los cambios, reinicia el [Datadog Agent][1].

[1]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}

{{% tab "Helm" %}}

1. Crea un ConfigMap que contenga `default.policy`, por ejemplo, `kubectl create configmap jdefaultpol --from-file=default.policy`.
2. Añade el ConfigMap (`jdefaultpol`) a `values.yaml` con `datadog.securityAgent.runtime.policies.configMap`:

    ```yaml
    securityAgent:
      compliance:
        # [...]
      runtime:
        # datadog.securityAgent.runtime.enabled
        # Set to true to enable Security Runtime Module
        enabled: true
        policies:
          # datadog.securityAgent.runtime.policies.configMap
          # Place custom policies here
          configMap: jdefaultpol
      syscallMonitor:
        # datadog.securityAgent.runtime.syscallMonitor.enabled
        # Set to true to enable Syscall monitoring.
        enabled: false
    ```

3. Actualiza la Helm Chart con `helm upgrade <RELEASENAME> -f values.yaml --set datadog.apiKey=<APIKEY> datadog/datadog`.

    **Nota:** Si necesitas realizar más cambios en `default.policy`, puedes utilizar `kubectl edit cm jdefaultpol` o sustituir el configMap por `kubectl create configmap jdefaultpol --from-file default.policy -o yaml --dry-run=client | kubectl replace -f -`.

4. Reinicia el [Datadog Agent][1].

[1]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}
{{< /tabs >}}

## Crear una regla de detección personalizada

Después de cargar el nuevo archivo de política predeterminado en el Agent, navega hasta la página [**Threat Detection Rules** (Reglas de detección de amenazas)][3].

1. En la página [**Threat Detection Rules** (Reglas de detección de amenazas)][3], selecciona **New Rule** (Nueva regla) y, a continuación, selecciona **Manual rule creator** (Creador de reglas manual).
2. **Selecciona un tipo de regla:**
   1. En **Detection rule types** (Tipos de regla de detección), selecciona **Workload Security** (Seguridad de la carga de trabajo).
   2. Selecciona un método de detección como **Umbral** o **Valor nuevo**.
3. **Define las consultas de búsqueda:**
   1. Configura una nueva regla de CSM Threats. Una regla puede tener varios casos de regla combinados con lógica booleana, por ejemplo `(||, &&)`. También puedes configurar el contador, agrupar por (group by) y el intervalo fijo.

    {{< img src="security/cws/workload_security_rules/define_runtime_expression2.png" alt="Añadir una regla al campo de consultas de búsqueda" >}}
   - Introduce una consulta para que solo se genere un desencadenante cuando se cumpla un valor. También puedes introducir consultas de supresión en **Reglas de supresión**, para que no se genere un desencadenante cuando se cumplan los valores especificados.
4. **Establecer casos de reglas:**
   1. Establece un [caso de regla][9] para el desencadenante y la gravedad.
   2. Define la lógica para cuando esta regla activa una señal de seguridad. Por ejemplo, `a>0` significa que se activa una señal de seguridad siempre que la condición de la regla establecida en la consulta de búsqueda se cumpla al menos una vez en el intervalo variable.
   3. Selecciona una gravedad a la que asociar la regla y selecciona todas las partes relevantes a las que desees notificar.

    {{< img src="security/cws/workload_security_rules/rule_cases2.png" alt="Establece un desencadenante de regla, gravedad y notificación" >}}
5. **Di lo que está pasando:**
   1. Asigna un nombre a la regla y añade el mensaje de notificación en formato Markdown. Utiliza [variables de notificación][5] para proporcionar detalles específicos sobre la señal haciendo referencia a sus etiquetas y atributos de evento. Después del mensaje, añade varias etiquetas para dar más contexto a las señales generadas por tu regla personalizada.


      <div class="alert alert-info">Datadog recomienda incluir un [manual][10] de corrección en el cuerpo. Como se indica en la plantilla, utiliza variables de sustitución para generar dinámicamente contenido contextualizado en tiempo de ejecución.</div>

## Desactivar las reglas de Agent predeterminadas

Para desactivar una regla de Agent predeterminada, ve a la página [**Agent Configuration**][6] (Configuración del Agent) y selecciona el conmutador de reglas. Al desactivar una regla de Agent predeterminada, el cambio se guarda junto con otras actualizaciones de reglas pendientes. Para aplicar el cambio a tu entorno, [despliega la política personalizada actualizada en el Agent](#deploy-the-policy-in-your-environment).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://app.datadoghq.com/security/configuration/workload/rules
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /es/security/notifications/variables/?tab=cloudsiem
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /es/security/threats/workload_security_rules
[8]: /es/security/threats/
[9]: /es/security/cloud_siem/log_detection_rules/?tab=threshold#set-a-rule-case
[10]: https://app.datadoghq.com/notebook/list?type=runbook