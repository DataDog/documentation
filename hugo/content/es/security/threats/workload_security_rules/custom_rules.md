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
title: Crear políticas y reglas personalizadas
---

En este tema, se explica cómo crear políticas y reglas de detección personalizadas del Datadog Agent para [CSM Threats][8].

Además de las [reglas de Agent y reglas de detección predeterminadas][7] predefinidas (OOTB), puedes escribir reglas de Agent y reglas de detección personalizadas. Las reglas personalizadas te ayudan a detectar eventos que Datadog no está detectando con sus reglas predefinidas.

Las reglas del Agent se recopilan en políticas. En primer lugar, se crea una política y, a continuación, se añaden las reglas predeterminadas y personalizadas que deseas que aplique la política.

Cuando se crea una política de configuración del Agent sólo contiene las reglas por defecto. Puedes añadir reglas personalizadas a la política para dirigirse a localizaciones de infraestructura específicas.

## RBAC para la gestión de reglas personalizadas

Aquí hay algunos [roles y permisos][11] importantes para usar en las reglas personalizadas RBAC:

- El permiso `security_monitoring_cws_agent_rules_actions` se puede utilizar para activar y configurar la función [Active Protection][12]. Active Protection te permite bloquear y terminar proactivamente las amenazas de minería criptográfica identificadas por las reglas de detección de amenazas del Datadog Agent.
  - Para utilizar el permiso `security_monitoring_cws_agent_rules_actions`, un usuario con el rol Datadog Admin debe crear una función que contenga el permiso `security_monitoring_cws_agent_rules_actions` y, a continuación, añadir a este rol únicamente a los usuarios que gestionan Active Protection.
- El rol **Datadog Standard** permite a los usuarios crear/actualizar una regla personalizada por defecto, siempre y cuando la operación no cambie la configuración de **protección** de la regla.

## Políticas

Las reglas se gestionan y aplican mediante políticas. Para ver las políticas, ve a [Security > Cloud Security Management > Agent Configuration][3] (Seguridad > Cloud Security Management > Configuración del Agent).

Puedes crear y desplegar diferentes políticas personalizadas que contengan reglas que desees aplicar a diferentes conjuntos de hosts en tu infraestructura.

Por ejemplo, puedes hacer lo siguiente con las políticas:

- [Asigna prioridades][17] a tus políticas. Las prioridades pueden tener en cuenta políticas con solapamientos parciales de etiquetas (tags).
- Despliega múltiples reglas en un subconjunto específico de un infraestructura utilizando [etiquetas][18].

### Política predeterminada

La política predeterminada y sus reglas no pueden modificarse. Puedes utilizar el ajuste de prioridad de la política para anular la política predeterminada con políticas personalizadas.

### Crear una política

1. Ve a [Security > Cloud Security Management > Agent Configuration][3] (Seguridad > Cloud Security Management > Configuración del Agent).
2. Haz clic en **New Policy** (Nuevo política). También puedes abrir un política existente, hacer clic en **Actions** (Acciones) y clonarla.
3. Introduce un nombre para la política y haz clic en **Create** (Crear).
   La nueva política se crea y se coloca como máxima prioridad, pero no se activa ni se despliega.
4. Haz clic en la política para abrirla.
5. En **Actions** (Acciones), añade reglas personalizadas del Agent a la política. Para más detalles, consulta [Crear las reglas personalizadas del Agent y de detección conjuntamente][14].
6. Haz clic en **Apply Tags & Deploy** (Aplicar etiquetas y desplegar). 
7. Añade etiquetas a la política para dirigirse a una infraestructura específica.
8. Para desplegar la política, selecciona **Enable** (Activar) y haz clic en **Apply** (Aplicar).

### Priorizar las políticas

1. Ve a [Security > Cloud Security Management > Agent Configuration][3] (Seguridad > Cloud Security Management > Configuración del Agent).
2. Haz clic en **Determine Priority** (Determinar prioridad).
3. Arrastra las políticas para establecer su prioridad.
4. Haz clic en **Confirm Reordering** (Confirmar reorganización).

Los Agents que se encuentran en el contexto de varias políticas aplican configuraciones basadas en el orden de prioridad. En los casos en los que una política de mayor prioridad contenga las mismas reglas que una de menor prioridad, las reglas de la política de mayor prioridad prevalecerán sobre las de la política de menor prioridad.

Cuando se anula una política, aparece el estado **Overridden** (Anulado). Pasa el ratón por encima del estado para ver el nombre de política que se ha anulado.

### Aplicar etiquetas

[Las etiquetas][15] son la localización de destino donde se aplica la política (entornos, clústeres, hosts, etc.). Añade etiquetas personalizadas a las políticas para dirigir las reglas de política a determinadas partes de tu infraestructura.

Las etiquetas identifican dos cosas: los Agents que utilizan la política y la infraestructura en la que esos Agents aplican la política. Por ejemplo, si una política tiene la etiqueta `cluster_name:mycluster` los Agents en ese clúster utilizan la política en los hosts en ese clúster.

1. Ve a [Security > Cloud Security Management > Agent Configuration][3] (Seguridad > Cloud Security Management > Configuración del Agent).
2. Pasa el ratón por encima de una política, o abre una política y haz clic en **Apply Tags & Deploy Policy** (Aplicar etiquetas y desplegar la política).
3.  Introduce etiquetas y haz clic en **Apply** (Aplicar). Si la política está activada, la política se aplica a los objetivos de etiqueta.

Al añadir etiquetas, Datadog muestra cuántos hosts son el objetivo de las etiquetas. Por ejemplo, `Tags match 144 hosts`. 

En la política, haz clic en **Tags With This Policy** (Etiquetas con esta política). El número de hosts a los que se dirige cada etiqueta se muestran en **Hosts matching this tag** (Hosts que coinciden con esta etiqueta).

## Resumen de reglas de detección personalizadas

Las reglas de detección personalizadas dependen de las reglas de Agent. Se componen de reglas de Agent existentes y desplegadas y de parámetros de expresión adicionales. 

Hay dos casos de uso:

- **Crear una regla de detección utilizando una regla de Agent existente:** para crear una regla de detección de amenazas que utilice una regla de Agent existente, solo tienes que crear una regla de detección de amenazas que haga referencia a la regla de Agent y añadir los parámetros de expresión adicionales que necesites.
- **Crear una regla de detección de amenazas utilizando una nueva regla de Agent:** para detectar un evento que las reglas actuales de Agent no admiten, debes crear una regla de Agent personalizada para detectar ese evento y, luego, crear una regla de detección de amenazas personalizada que utilice la regla de Agent personalizada.

Para obtener más información, consulta [Reglas de detección de CSM Threats][7]. 

Puedes crear reglas personalizadas utilizando estos métodos:

- **Simple:** utiliza el **Creador de reglas asistido** para crear las reglas de Agent y de detección personalizadas juntas.
  - Para conocer los pasos para utilizar el **Assisted rule creator** (Creador de reglas asistido), consulta [Crear conjuntamente las reglas personalizadas del Agent y de detección][1].
- **Avanzado:** crea reglas de detección y de Agent personalizadas individualmente definiendo sus expresiones de detección de amenazas. 
  - Para conocer los pasos de este método, consulta [Crear una regla personalizada del Agent][2] y crear una regla de detección personalizada.

## Crear conjuntamente las reglas de Agent y de detección personalizadas

Las reglas personalizadas del CSM Agent se agrupan en políticas. Las políticas agrupan las reglas del Agent para que puedas aplicar varias reglas de forma más eficaz.


## Crear conjuntamente las reglas de Agent y de detección personalizadas

Cuando se crea una política de configuración del Agent sólo contiene las reglas predeterminadas del Agent. Puedes añadir reglas del Agent personalizadas a la política para aplicar reglas específicas a Agents concretos.

Cuando añadas una política de configuración del Agent, puedes utilizar la opción **Assisted rule creator** (Creador de reglas asistido) para crear conjuntamente las reglas de detección del Agent y las reglas dependientes. Este método asegura que se haga referencia a la regla del Agent en las reglas de detección. Utilizar esta herramienta es más rápido que crear las reglas del Agent y de detección por separado y luego referenciar las reglas del Agent en las reglas de detección.

A medida que se definen las reglas mediante esta herramienta, las expresiones de amenaza generadas para estas reglas se muestran en la herramienta.

Para utilizar el creador de reglas asistido:

1. Ve a [Security > Cloud Security Management > Agent Configuration][3] (Seguridad > Cloud Security Management > Configuración del Agent).
2. Crea o abre una política.
3. En **Actions** (Acciones), selecciona **Assisted rule creator** (Creador de reglas asistido).
4. Define la detección. Para monitorizar tu recurso correctamente, tienes las siguientes opciones de tipo de detección:
   - Para detectar cambios no estándar y sospechosos en los archivos, selecciona **File integrity monitoring (FIM)** (Monitorización de la integridad de archivos (FIM)).
   - Para rastrear y analizar los procesos de software del sistema en busca de comportamientos maliciosos o infracciones de política, selecciona **Process activity monitoring** (Monitorización de la actividad de proceso).
   - Introduce los nombres de archivo/proceso o las rutas para monitorizar.
5. Especifica más condiciones. Introduce los argumentos que desees añadir a la [expresión de la regla de amenaza][16]. Por ejemplo, el argumento `foo` se añade como `process.argv in ["foo"]`.
6. Establece listas de gravedad y notificación. 
   - Selecciona la gravedad de la señal generada cuando se detecta esta amenaza. 
   - Selecciona listas de notificación para notificar cuando se genera una señal.
7. Añade el nombre y la descripción de la regla.
8. Selecciona **Create _N_ Rules** (Crear _N_ reglas).
9. En **Generate Rules** (Generar reglas), selecciona **Confirm** (Confirmar). Las reglas se generan.
10. Selecciona **Finish** (Finalizar). La política muestra las nuevas reglas.

## Crear una regla del Agent personalizada

Puedes crear una regla personalizada del Agent e implementarla como parte de una nueva política del Agent. Más tarde, al definir una [regla de detección] personalizada[3], se hace referencia a la regla personalizada del Agent y se añaden parámetros de expresión.

1. Ve a [Security > Cloud Security Management > Agent Configuration][3] (Seguridad > Cloud Security Management > Configuración del Agent).
2. Crea o abre una política.
3. En **Actions** (Acciones), selecciona **Manual rule creator** (Creador de reglas manual).
4. Añade un nombre y una descripción para la regla.
5. En **Expression** (Expresión), define la expresión del Agent utilizando la [sintaxis del Lenguaje de seguridad (SECL) de Datadog][16].
6. Haz clic en **Create Agent Rule** (Crear regla de Agent). Esto te lleva automáticamente a la página de política.

Después de crear una regla de Agent personalizada, el cambio se guarda junto con otras actualizaciones de reglas pendientes. Para aplicar el cambio a tu entorno, despliega la política personalizada actualizada en el Agent.

### Configuración remota

Para realizar una configuración remota, se utiliza la interfaz de usuario de Datadog para aplicar políticas a infraestructura. Cuando se activa una política, se aplica a la infraestructura identificada por las etiquetas de la política.

1. En la página **Agent Configuration** (Configuración del Agent), pasa el ratón por encima de una política y haz clic en **Apply Tags & Deploy Policy** (Aplicar etiquetas y desplegar la política). También puedes abrir una política y hacer clic en **Apply Tags & Deploy Policy** (Aplicar etiquetas y desplegar la política).
2. Añade etiquetas para identificar el objetivo de infraestructura.
3. Selecciona **Enabled** (Habilitado).
4. Haz clic en **Apply** (Aplicar). La política se aplica a toda la infraestructura a la que se dirigen las etiquetas de política.

### Despliegue manual

Para realizar un despliegue manual, debes crear la política y sus reglas en la interfaz de usuario de Datadog, descargarla y, a continuación, cargarla en los Agents en los que desees aplicarla.

1. En la página **Agent Configuration** (Configuración del Agent), abre una política.
2. En Actions (Acciones), selecciona **Download Policy** (Descargar política).

A continuación, utiliza las siguientes instrucciones para cargar el archivo de política en cada host.

{{< tabs >}}
{{% tab "Host" %}}

Copia el archivo `default.policy` en el host de destino de la carpeta `/etc/datadog-agent/runtime-security.d`. El archivo debe tener acceso de `read` y `write` para el usuario `root` en el host. Esto puede requerir el uso de una utilidad como SCP o FTP.

Para aplicar los cambios, reinicia el [Datadog Agent][1].

[1]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}

{{% tab "Helm" %}}

1. Crea un ConfigMap que contenga `default.policy`, por ejemplo, `kubectl create configmap jdefaultpol --from-file=default.policy`.
2. Añade el ConfigMap (`jdefaultpol`) a `values.yaml` con `datadog.securityAgent.runtime.policies.configMap`:

    ```yaml
    securityAgent:
      # [...]
      runtime:
        # datadog.securityAgent.runtime.enabled
        # Set to true to enable Security Runtime Module
        enabled: true
        policies:
          # datadog.securityAgent.runtime.policies.configMap
          # Place custom policies here
          configMap: jdefaultpol
      # [...]
    ```

3. Actualiza la Helm Chart con `helm upgrade <RELEASENAME> -f values.yaml --set datadog.apiKey=<APIKEY> datadog/datadog`.

    **Nota:** Si necesitas realizar más cambios en `default.policy`, puedes utilizar `kubectl edit cm jdefaultpol` o sustituir el configMap por `kubectl create configmap jdefaultpol --from-file default.policy -o yaml --dry-run=client | kubectl replace -f -`.

[1]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}
{{< /tabs >}}


## Habilitar y desplegar políticas

Las políticas habilitadas aplican sus reglas a los objetivos de infraestructura identificados por sus etiquetas (tags). Habilitar una política es lo mismo que desplegarla.

Puedes utilizar la configuración remota en la interfaz de usuario de Datadog para desplegar automáticamente la política personalizada en los hosts designados por las etiquetas de la política (todos los hosts o un subconjunto definido de hosts), o puedes cargar manualmente la política en el Agent en cada host.

Para habilitar una política utilizando la configuración remota en la interfaz de usuario de Datadog, haz lo siguiente:

1. En la página **Agent Configuration** (Configuración del Agent), pasa el ratón por encima de una política y haz clic en **Apply Tags & Deploy Policy** (Aplicar etiquetas y desplegar la política). También puedes abrir una política y hacer clic en **Apply Tags & Deploy Policy** (Aplicar etiquetas y desplegar la política).
2. Añade etiquetas para identificar el objetivo de infraestructura.
3. Selecciona **Enabled** (Habilitado).
4. Haz clic en **Apply** (Aplicar). La política se aplica a toda la infraestructura a la que se dirigen las etiquetas de política.

Si desactivas una política, sus reglas dejarán de aplicarse a la infraestructura identificada por sus etiquetas.

Las reglas de Agent personalizadas se despliegan en el Agent en una política personalizada separada de la política predeterminada. La política personalizada contiene reglas de Agent personalizadas así como [reglas predeterminadas que han sido desactivadas][13].

## Crear una regla de detección personalizada

Después de cargar el nuevo archivo de política predeterminado en el Agent, navega hasta la página [**Threat Detection Rules** (Reglas de detección de amenazas)][3].

1. En la página [**Threat Detection Rules** (Reglas de detección de amenazas)][3], selecciona **New Rule** (Nueva regla) y, a continuación, selecciona **Manual rule creator** (Creador de reglas manual).
2. **Selecciona un tipo de regla:**
   1. En **Detection rule types** (Tipos de regla de detección), selecciona **Workload Security** (Seguridad de la carga de trabajo).
   2. Selecciona un método de detección como **Umbral** o **Valor nuevo**.
3. **Define las consultas de búsqueda:**
   1. Configura una nueva regla de CSM Threats. Una regla puede tener varios casos de regla combinados con lógica booleana, por ejemplo `(||, &&)`. También puedes configurar el contador, agrupar por (group by) y el intervalo fijo.

      {{< img src="security/cws/workload_security_rules/define_runtime_expression2.png" alt="Añadir una regla al campo de consultas de búsqueda" >}}

   2. Introduce una consulta para que solo se genere un desencadenante cuando se cumpla un valor. También puedes introducir consultas de supresión en **Reglas de supresión**, para que no se genere un desencadenante cuando se cumplan los valores especificados.
4. **Establecer casos de reglas:**
   1. Establece un [caso de regla][9] para el desencadenante y la gravedad.
   2. Define la lógica para cuando esta regla activa una señal de seguridad. Por ejemplo, `a>0` significa que se activa una señal de seguridad siempre que la condición de la regla establecida en la consulta de búsqueda se cumpla al menos una vez en el intervalo variable.
   3. Selecciona una gravedad a la que asociar la regla y selecciona todas las partes relevantes a las que desees notificar.

      {{< img src="security/cws/workload_security_rules/rule_cases2.png" alt="Establece un desencadenante de regla, gravedad y notificación" >}}
5. **Di lo que está pasando:**
   1. Asigna un nombre a la regla y añade el mensaje de notificación en formato Markdown. Utiliza [variables de notificación][5] para proporcionar detalles específicos sobre la señal haciendo referencia a sus etiquetas y atributos de evento. Después del mensaje, añade varias etiquetas para dar más contexto a las señales generadas por tu regla personalizada.

Datadog recomienda incluir un [manual][10] de corrección en el cuerpo. Como se indica en la plantilla, utiliza variables de sustitución para generar dinámicamente contenido contextualizado en tiempo de ejecución.</div>

## Desactivar las reglas de Agent predeterminadas

1. Para desactivar una regla del Agent, ve a la página [**Agent Configuration**][6] (Configuración del Agent) y selecciona la política que utiliza la regla.
2. En la política, abre la regla.
3. Junto al título de la regla, haz clic en **Monitoring** (Monitorización) y, a continuación, selecciona **Disable Rule** (Desactivar regla).
4. Haz clic en **Save Changes** (Guardar cambios).

También puedes desactivar una regla estableciendo la sección **Then...** (Entonces...) de una regla en **Do Nothing** (No realizar ninguna acción).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]:#create-the-custom-agent-and-detection-rules-together
[2]:#create-a-custom-agent-rule
[3]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /es/security/notifications/variables/?tab=cloudsiem
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /es/security/threats/workload_security_rules
[8]: /es/security/threats/
[9]: /es/security/cloud_siem/detection_rules/?tab=threshold#set-a-rule-case
[10]: https://app.datadoghq.com/notebook/list?type=runbook
[11]: /es/account_management/rbac/permissions/
[12]: /es/security/cloud_security_management/guide/active-protection
[13]: #disable-default-agent-rules
[14]: #create-the-custom-agent-and-detection-rules-together
[15]: https://app.datadoghq.com/cost/settings/tags
[16]: /es/security/threats/agent_expressions/
[17]: #prioritize-policies
[18]: #apply-tags