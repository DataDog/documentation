---
aliases:
- /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting/
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
  tag: Documentación
  text: Instrumentación de APM de un solo paso
- link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
  tag: Centro de aprendizaje
  text: Solución de problemas de instrumentación de APM en un servidor
title: Solución de problemas de APM de un solo paso
---
## Descripción general {#overview}

La instrumentación de un solo paso (SSI) ayuda a instrumentar aplicaciones al cargar automáticamente los SDK de Datadog en los procesos de las aplicaciones. SSI funciona para aplicaciones que se ejecutan en servidores Linux, en entornos de contenedores como Kubernetes y Docker, y para aplicaciones .NET servidas por Windows IIS, sin requerir cambios en las dependencias o imágenes de la aplicación. Si encuentra problemas al habilitar APM con SSI, utilice esta guía para solucionar y resolver problemas comunes. Para obtener más asistencia, comuníquese con [Datadog Support][1].

## Métodos de solución de problemas {#troubleshooting-methods}

Puede investigar problemas de inyección en la interfaz de usuario de Datadog con Fleet Automation o manualmente a nivel de contenedor. Para obtener una vista de nivel inferior de lo que decidió el inyector para cada proceso, consulte [registros de depuración del inyector](#injector-debug-logs).

### Solucionar problemas de inyección en Datadog Fleet Automation {#troubleshoot-injection-in-datadog-fleet-automation}


Fleet Automation proporciona dos tipos de información sobre la instrumentación para SSI:
- **Información a nivel de proceso** muestra el estado de la instrumentación y los detalles de instalación del SDK para servidores o contenedores individuales.
- **Información del clúster de Kubernetes** proporciona una vista de nivel superior de la instrumentación en sus clústeres, lo que le ayuda a comprender cómo se aplican la configuración y la inyección de SSI a escala.

En conjunto, estas vistas le permiten diagnosticar problemas de inyección tanto desde la perspectiva del proceso como del clúster.

#### Requisitos previos {#prerequisites}

Esta funcionalidad está disponible para:

- **Lenguajes**: Python, Java, Node.js, PHP, .NET
- **Entornos**: servidores Linux, contenedores, Kubernetes
- Datadog Agent v7.68.2+

#### Visualizar información a nivel de proceso {#view-process-level-insights}

Utilice la información a nivel de proceso para verificar si se ha aplicado correctamente SSI a sus procesos de aplicación y para identificar cualquier fallo de inyección.

1. Navegue a [Fleet Automation][9].
1. Use facetas para filtrar y obtener los servidores relevantes:
   - `single_step_instrumentation` muestra qué servidores tienen SSI habilitado o deshabilitado.
   - `single_step_instrumentation_status` muestra qué servidores han encontrado problemas con la instrumentación del servicio.
1. Seleccione un servidor para abrir el panel de detalles del Agent.
1. En el panel del Agent, vaya a la pestaña {{< ui >}}Services{{< /ui >}}.
1. Si SSI está habilitado en el servidor, la pestaña muestra:
   - Un banner con el mensaje: "Single Step Instrumentation is enabled on this host."
   - Una sección {{< ui >}}SDK Installations{{< /ui >}} si hay problemas que solucionar.

#### Visualizar información detallada del clúster de Kubernetes {#view-kubernetes-cluster-insights}

Utilice la información a nivel de clúster para comprender cómo está configurado SSI y cómo funciona en sus clústeres de Kubernetes. Esta información amplía la solución de problemas más allá de los procesos individuales para mostrar cómo se aplica la instrumentación a las cargas de trabajo a nivel de clúster.

1. Vaya a [{{< ui >}}Fleet Automation{{< /ui >}}][9] > {{< ui >}}View Agents{{< /ui >}} y seleccione {{< ui >}}Kubernetes Clusters{{< /ui >}} en la esquina superior derecha.
1. Seleccione un clúster para visualizar sus detalles, incluidos:
   - Si el clúster es administrado por Helm o por Datadog Operator
   - Las versiones de Cluster Agent y Node Agent
   - Las integraciones y servicios que se ejecutan en cada servidor
1. Abra la pestaña {{< ui >}}Single Step Instrumentation{{< /ui >}} para revisar:
   - La configuración SSI del clúster (vista YAML)
   - Los pods identificados como objetivos de instrumentación según la configuración del clúster o las anotaciones a nivel de pod
   - El estado de cada pod objetivo, incluyendo si la instrumentación fue exitosa
   - Los SDK inyectados en cada pod, incluyendo el lenguaje y la versión
   - Si cada carga de trabajo instrumentada está generando trazas 
1. Pase el cursor sobre cualquier icono de estado para ver detalles contextuales sobre el estado de la instrumentación o la recopilación de trazas. 

{{< img src="tracing/trace_collection/k8s-ssi-tab.png" alt="La pestaña Instrumentación de un solo paso de un clúster de Kubernetes, que muestra la configuración YAML de SSI y una lista de pods instrumentados" style="width:100%;" >}}

### Verifique manualmente la inyección en el contenedor de la aplicación {#manually-verify-injection-in-the-application-container}

Si la interfaz de usuario de Datadog no muestra problemas de instrumentación, o si está solucionando problemas de un servicio o contenedor específico, puede verificar manualmente si la inyección ocurrió como se esperaba. Este método es útil al depurar en entornos donde la visibilidad centralizada es limitada o cuando un servicio específico no está reportando trazas.

Para confirmar la inyección a nivel de contenedor, verifique lo siguiente:

1. `/etc/ld.so.preload` incluye la siguiente entrada: 
   ```
   /opt/datadog-packages/datadog-apm-inject/stable/inject/launcher.preload.so
   ``` 
2. La variable de entorno `LD_PRELOAD` está configurada con el mismo valor.
3. El directorio `/opt/datadog-packages/datadog-apm-inject` existe, con los subdirectorios `stable` y `$version`.
4. Existen directorios específicos del lenguaje (por ejemplo, `/opt/datadog/apm/library/java/` para Java).

Para habilitar los registros de depuración durante la verificación manual:

1. Configure lo siguiente en la especificación de su pod:
 
   {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
   env:
     - name: DD_TRACE_DEBUG    # debug logging for the SDK
       value: "true"
     - name: DD_APM_INSTRUMENTATION_DEBUG    # debug logging for the injector
       value: "true"
   {{< /code-block >}}
   
2. Elimine el pod para habilitar los registros de depuración durante la inyección.


## Registros de depuración del inyector {#injector-debug-logs}

Los registros de depuración del inyector muestran lo que el inyector decidió para cada proceso: si la inyección fue exitosa, si fue denegada o si se omitió, y por qué. Habilítelos cuando [Fleet Automation](#troubleshoot-injection-in-datadog-fleet-automation) no explique una falla, cuando esté diagnosticando a nivel de servidor o contenedor, o cuando esté recopilando información para [Datadog Support][1].

Los registros de depuración del inyector son independientes de los registros de depuración del trazador. Use los registros del inyector para diagnosticar si un trazador fue inyectado y cómo; después de la inyección, use [registros de depuración del trazador][13] para diagnosticar el trazador que se ejecuta dentro del proceso.

### Habilitar modo de depuración {#enable-debug-mode}

Establezca la siguiente variable de entorno en el proceso que desea instrumentar:

```
DD_APM_INSTRUMENTATION_DEBUG=true
```

Esto aumenta el nivel de registro del inyector a `DEBUG` y agrega `stderr` como un destino de registro.

La variable debe establecerse en el entorno que hereda el proceso inyectado:

#### Servidor {#host}

Exporte la variable antes de iniciar el proceso:

```sh
export DD_APM_INSTRUMENTATION_DEBUG=true
./my-service
```

#### Docker {#docker}

Agregue la variable de entorno al contenedor de la aplicación:

```sh
docker run -e DD_APM_INSTRUMENTATION_DEBUG=true my-image
```

La salida de depuración aparece en los registros del contenedor (`docker logs <container>`).

#### Kubernetes {#kubernetes}

Agregue la variable a la especificación del contenedor en su plantilla de pod:

{{< code-block lang="yaml" disable_copy="true" >}}
spec:
  containers:
    - name: my-app
      env:
        - name: DD_APM_INSTRUMENTATION_DEBUG
          value: "true"
{{< /code-block >}}

Alternativamente, agregue la siguiente anotación de pod para habilitar el modo de depuración sin editar la especificación del contenedor:

{{< code-block lang="yaml" disable_copy="true" >}}
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.debug: "true"
{{< /code-block >}}

La salida de depuración aparece en los registros del pod de la aplicación (`kubectl logs <pod>`).

### Revisar registros de depuración {#review-debug-logs}

#### Dónde encontrar los registros {#where-to-find-the-logs}

Con el modo de depuración habilitado, el inyector escribe en el `stderr` del proceso instrumentado:

| Entorno | Dónde buscar |
| --- | --- |
| Servidor o shell | La terminal del proceso o el destino al que se redirige su `stderr` |
| Docker | `docker logs <container>` |
| Kubernetes | `kubectl logs <pod>` (el pod de la aplicación, no el Cluster Agent) |

**Nota**: Para enviar la salida de depuración a un archivo en lugar de `stderr`, establezca `DD_APM_INSTRUMENTATION_OUTPUT_PATHS` en una ruta absoluta.

#### Inyección exitosa {#successful-injection}

Para confirmar que ocurrió la inyección, busque el bloque de registro cuyo ejecutable coincida con su tiempo de ejecución. El siguiente ejemplo muestra una inyección exitosa de Node.js:

```
<DEBUG> ... [linux/process.c:405] process_exe: 'node'
<DEBUG> ... [linux/process.c:443] Main executable path: '/usr/local/bin/node'
<DEBUG> ... [workload_selection.c:147] Workload selection allowed injection: continuing
<DEBUG> ... [workload_selection.c:90] Succesfully loaded policy: 'requirements.bin from SDK policies' from '/opt/datadog-packages/datadog-apm-inject/0.67.0/requirements/nodejs/requirements.bin' [size: 3864]
<DEBUG> ... [languages.c:71] detected language: 'nodejs'
<DEBUG> ... [languages.c:72] detected language version: '20.20.2'
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_TELEMETRY_FORWARDER_PATH=/opt/datadog-packages/datadog-apm-inject/0.67.0/inject/process
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_TAGS=_dd.injection.mode:k8s
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_INJECTION_ENABLED=tracer
<DEBUG> ... [linux/env_injector.c:38] injection config: NODE_OPTIONS=--require /opt/datadog/apm/library/js/node_modules/dd-trace/init.js
<INFO>  ... [./libinject.c:81] injection duration: 1.066500 ms
<DEBUG> ... [injection_metadata.c:101] sending injection-metadata telemetry: result='0', result_reason='injection completed successfully'
<DEBUG> ... [./libinject.c:231] injector finished
```

| Línea de registro | Significado |
| --- | --- |
| `process_exe: '<exe>'` / `Main executable path: '<path>'` | El proceso que se está evaluando. |
| `Workload selection allowed injection: continuing` | La política permitió la inyección. |
| `Succesfully loaded policy: 'requirements.bin...'` | Se cargó la política de requisitos de lenguaje para el tiempo de ejecución detectado. |
| `detected language: '<lang>'` / `detected language version: '<version>'` | Se identificó el tiempo de ejecución (`nodejs`, `java`, `python`, `ruby`, `dotnet`, `php`) y se leyó su versión. |
| `injection config: <VAR>=<value>` | Cada variable de entorno que configuró el inyector. Ver `DD_INJECTION_ENABLED=tracer` más la variable específica del lenguaje (por ejemplo, `NODE_OPTIONS` o `JAVA_TOOL_OPTIONS`) confirma que el SDK de rastreo se cargó. |
| `injection duration: <N> ms` | Inyección completada y el tiempo transcurrido. |
| `injection completed successfully` (`result='0'`) | El inyector notificó mediante telemetría que la inyección se realizó correctamente. Un `result` distinto de cero con un `result_reason` diferente indica un error. |
| `injector finished` | El constructor del inyector devolvió el control. |

#### Mensajes de registro comunes {#common-log-messages}

**Inyección deshabilitada**

Si `DD_INSTRUMENT_SERVICE_WITH_APM=false` está configurado o la inyección está deshabilitada de otro modo:

```
<DEBUG> ... [libinject.c:115] disabled flag set, not injecting
```

El inyector se cargó pero omitió intencionalmente la inyección. Elimine `DD_INSTRUMENT_SERVICE_WITH_APM=false` o establézcalo en `true` para permitir la inyección.

**No se detectó ningún tiempo de ejecución**

Si el proceso no es un tiempo de ejecución de lenguaje compatible:

```
<DEBUG> ... [libinject.c:175] No known runtime was detected - not injecting!
```

El inyector se ejecutó, pero el proceso no es uno de los que instrumenta (`nodejs`, `java`, `python`, `ruby`, `dotnet`, `php`). Esto es normal en procesos que no son aplicaciones.

**Se denegó la selección de carga de trabajo**

```
<DEBUG> ... [workload_selection.c:149] Workload selection denied injection
```

Una política impidió la inyección para este proceso. Las `Evaluating '<policy-name>'` líneas anteriores muestran qué regla coincidió y los valores que comparó.

**Se detectó una reejecución**

```
<DEBUG> ... [libinject.c:102] Re-exec detected!
```

El proceso se reejecutó a sí mismo para que las variables de entorno inyectadas surtan efecto. Este es el comportamiento esperado. La inyección continúa en el proceso reejecutado, el cual produce su propio conjunto de líneas de depuración.

## Opciones de configuración que afectan la inyección {#configuration-options-that-affect-injection}

Existen varios mecanismos de configuración que pueden bloquear o alterar el comportamiento de la inyección.

### Requisitos de almacenamiento {#storage-requirements}

SSI descarga los SDK de los lenguajes y un paquete del inyector en cada servidor. La cantidad de espacio en disco requerida depende del número de lenguajes en uso y del número de pods que se están instrumentando. Una estimación aproximada es:

<div style="text-align:center;">
  <pre><code>[sum of the language library sizes]
+
[injector package size] * [number of injected pods per host]</code></pre>
</div>

Debido a que los paquetes de biblioteca se actualizan con frecuencia y pueden crecer cuando se agrega soporte para nuevas versiones de lenguaje, el uso del disco puede cambiar con el tiempo. Si su entorno tiene espacio en disco limitado, haga un seguimiento del tamaño de los paquetes y reserve capacidad adicional para evitar fallas de inyección.

### Versión del inyector {#injector-version}

Para establecer la versión del inyector:
- A nivel de clúster:
  
  Establezca la versión en `values.yaml`, dentro de `datadog.apm.instrumentation.injector.imageTag`.

- A nivel de pod:
 
  Establezca la versión mediante la anotación `admission.datadoghq.com/apm-inject.version`.


Para la inyección en servidores o Docker, no se recomienda modificar la versión de `auto_inject`. 

### Listas de permitidos y denegados {#allow-and-deny-lists}

#### Lista de denegados predeterminada {#default-deny-list}

Datadog mantiene una lista de denegados interna para evitar la inyección en ciertos procesos (por ejemplo, IDE o bases de datos). Si un comando de proceso o punto de entrada está en esta lista, el inyector omite el proceso de inyección.  

#### Reglas de instrumentación de Linux {#linux-instrumentation-rules}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSdMu6WAsUCD3djkl_oN0Qh7fQmBCiKYyUvuqlYWRyObebAc6Q/viewform" header="¡Únase a la vista previa!">}}
Las reglas de instrumentación están disponibles para aplicaciones basadas en Linux a través de una vista previa de disponibilidad limitada. Para configurar reglas de permitidos o denegados para la inyección de procesos, regístrese para obtener acceso a la vista previa.
{{< /callout >}}

#### Reglas de instrumentación de Kubernetes {#kubernetes-instrumentation-rules}

Las reglas de instrumentación permiten la inyección basada en etiquetas y selectores de Kubernetes. Reglas a considerar:

1. `disabledNamespaces` siempre tiene prioridad.
2. Cuando un pod se inicializa, la lista de objetivos se verifica de arriba a abajo. Solo se aplica la primera regla coincidente por pod.

#### Contenedor de inyección marcado por escáneres de seguridad {#injection-container-flagged-by-security-scanners}

Las herramientas de seguridad pueden marcar el contenedor `apm-inject` porque ejecuta un archivo ejecutable al inicio, lo cual puede parecerse a software malicioso. 

El comportamiento del contenedor es esperado y seguro; el ejecutable configura el entorno para la instrumentación automática.

Datadog se adhiere a las mejores prácticas de seguridad y está trabajando con proveedores de seguridad para incluir este contenedor en la lista de permitidos.

### Entornos con configuraciones estrictas de seguridad de pods {#environments-with-strict-pod-security-settings}

Si las reglas de seguridad de pods bloquean el contenedor de inicialización de Datadog, es posible que vea errores como:

```
Privilege escalation container is not allowed or violates PodSecurity "restricted: latest": allowPrivilegeEscalation is false
```

Para resolver esto, establezca una de las siguientes opciones del Cluster Agent:
- `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_SECURITY_CONTEXT`
- `admission_controller.auto_instrumentation.init_security_context`

El valor debe ser una cadena JSON que aplique el contexto de seguridad necesario a los contenedores de inicialización de Datadog.  

### Instrumentación personalizada {#custom-instrumentation}

La instrumentación personalizada aún requiere que importe el SDK. Las variables de configuración como `DD_TRACE_METHODS` de .NET siguen estando disponibles para definir spans personalizados.

## Solución de problemas general {#general-troubleshooting}

### SSI sigue ejecutándose después de establecer DD_TRACE_ENABLED=false {#ssi-continues-running-after-setting-dd-trace-enabledfalse}

Establecer `DD_TRACE_ENABLED=false` no impide que SSI cargue el SDK. El [inyector][11] se ejecuta antes de que el SDK evalúe sus variables de entorno, por lo que las variables de entorno a nivel de SDK no tienen efecto en SSI. Para deshabilitar o eliminar SSI, consulte la [página de configuración de SSI][12] de su plataforma.

## Solución de problemas específica del entorno {#environment-specific-troubleshooting}

### Entornos de servidor y Docker {#host-and-docker-environments}

#### La inyección en el servidor no se aplica a los procesos existentes {#host-injection-does-not-apply-to-existing-processes}

La biblioteca de precarga solo se inyecta en procesos recién iniciados. Inicie una nueva sesión de shell o cierre la sesión y vuelva a iniciarla para aplicar la instrumentación.

**Nota:** La inyección basada en Docker no tiene esta limitación.

#### La inyección falla en tipos de instancia pequeños {#injection-fails-on-small-instance-types}

La biblioteca de precarga permite al analizador un segundo para completar su trabajo. En instancias de VM pequeñas que ejecutan múltiples servicios (por ejemplo, `t2.micro`), este límite de tiempo puede excederse. Para solucionar este problema, utilice un tamaño de instancia mayor, como `t2.small`.

#### Errores después de la desinstalación manual de archivos del Agent {#errors-after-manual-uninstallation-of-agent-files}

Si elimina manualmente los archivos del Agent, es posible que vea errores como:

```
ERROR: ld.so: object /opt/datadog/apm/inject/launcher.preload.so from /etc/ld.so.preload cannot be preloaded (cannot open shared object file): ignored
```

Para desinstalar SSI correctamente, siga las instrucciones específicas de la plataforma:

* [Kubernetes][1]
* [Docker][2]
* [Linux][3]
* [Windows][4]

#### La inyección no funciona con Docker sin privilegios {#injection-not-working-with-rootless-docker}

Cuando utilice Docker sin privilegios, configure `docker_socket` en `/etc/datadog-agent/inject/docker_config.yaml` con la ruta del socket de Docker que usa el usuario actual (normalmente `/run/user/$UID/docker.sock`). No se requiere reiniciar.

#### La inyección falla con lanzadores vinculados estáticamente {#injection-fails-with-statically-linked-launchers}

Si un lanzador personalizado está vinculado estáticamente (común con Go), es posible que la biblioteca de precarga no se invoque. La inyección aún puede tener éxito si:
- La línea de comandos del lanzador incluye el nombre del lenguaje
- El lanzador ejecuta un programa intermediario vinculado dinámicamente

Sin embargo, no se inyecta en los procesos que se inician directamente desde binarios vinculados estáticamente.

### Entornos de Kubernetes {#kubernetes-environments}

El Admission Controller de Datadog debe estar implementado y configurado antes de que se creen los pods de la aplicación; no puede modificar pods existentes.

Para solucionar problemas del Admission Controller:

1. Verifique el estado del pod del Cluster Agent:
   ```
   kubectl get pods
   kubectl get deployments
   ```
1. Verifique los registros del líder del Cluster Agent en busca de mensajes `INFO` que indiquen que el Admission Controller se inició correctamente. Por ejemplo:

   ```
   Group version 'admissionregistration.k8s.io/v1' is available, Starting secrets controller, Starting webhook controller
   ```

1. Verifique el estado del Admission Controller haciendo una de las siguientes acciones:

   - Ejecute `agent status` dentro del pod del Cluster Agent para obtener una salida de estado en tiempo real.
   - Si está solucionando problemas de forma retrospectiva, verifique `status.log` dentro de un flare. Cuando se genera un flare, el sistema ejecuta `agent status` y almacena la salida en `status.log`.

   En ambos casos, busque las secciones de Admission Controller y Webhooks, y verifique lo siguiente:
   - Todos los recursos `MutatingWebhookConfiguration` esperados están listados (para instrumentación automática, inyección de configuración e inyección de etiquetas).
   - Las configuraciones del webhook hacen referencia al Secret correcto.
   - El resumen del paquete de CA coincide en todas las configuraciones.

1. Inspeccione los intentos de inyección en `telemetry.log` o en la salida del siguiente comando:

   ```
   kubectl exec -it <cluster agent pod> agent telemetry
   ```

   Busque `admission_webhooks_library_injection_attempts` para ver los intentos de inyección por lenguaje.

#### La configuración de DatadogInstrumentation no se aplica {#datadoginstrumentation-configuration-is-not-applied}

Si utiliza un recurso `DatadogInstrumentation` para habilitar SSI:

1. Confirme que el Agent y el Cluster Agent sean v7.85+ y que el CRD incluya `spec.config.apm`. Datadog Operator v1.31+ incluye el esquema de APM:

   ```shell
   kubectl explain datadoginstrumentation.spec.config.apm
   ```

1. Inspeccione las condiciones del recurso:

   ```shell
   kubectl describe datadoginstrumentation <RESOURCE_NAME> -n <WORKLOAD_NAMESPACE>
   ```

   Confirme `APMReady=True` con el motivo `Configured`. Un motivo `UnsupportedLanguage` o `InvalidTracerConfig` indica que la configuración debe corregirse. Los identificadores de lenguaje del SDK deben ser compatibles y los nombres `ddTraceConfigs` deben comenzar con `DD_`.

1. Confirme que el recurso y la carga de trabajo estén en el mismo espacio de nombres, y que `targetRef` coincida con la versión de API, el tipo y el nombre de una carga de trabajo compatible.
1. Confirme que el controlador DDI y el Admission Controller estén habilitados. Para pods sin una etiqueta de aceptación de admisión, establezca `features.admissionController.mutateUnlabelled: true` en el recurso `DatadogAgent`. Verifique las exclusiones de espacios de nombres y la etiqueta `admission.datadoghq.com/enabled` del pod.
1. Verifique si hay anotaciones del pod para seleccionar el SDK que tengan prioridad sobre DDI. Después de aplicar la configuración, reemplace los pods de la carga de trabajo. `APMReady=True` confirma que la configuración fue aceptada; no confirma que los pods en ejecución hayan sido instrumentados.

Para conocer los pasos de configuración y las reglas de prioridad, consulte [Habilitar APM con DatadogInstrumentation][14].

#### Mutaciones fallidas {#failed-mutations}

El Cluster Agent registra advertencias y errores por fallas de inyección, generalmente desde `admission/server.go`. Por ejemplo, podría aparecer una advertencia si `JAVA_TOOL_OPTIONS` se establece usando `valueFrom`.

Utilice la métrica `datadog.cluster_agent.admission_webhooks.library_injection_errors` para una depuración adicional.

##### No se puede aplicar la anotación de lenguaje {#language-annotation-cannot-be-applied}

Durante la configuración, SSI detecta el lenguaje de la aplicación de su servicio y aplica una etiqueta de servicio con el formato `internal.dd.datadoghq.com/service-name.detected_langs`. Si la etiqueta no se puede aplicar, la inyección falla.

A veces, los errores de etiquetado ocurren porque un nombre de servicio supera los límites de cadena de Kubernetes ([63 caracteres][6]). Por ejemplo:

```
languagedetection/patcher.go:231 in handleDeploymentEvent) | failed to handle deployment event: annotations: Invalid value: "internal.dd.datadoghq.com/dummy-python-container-long-long-long-long-long-x.detected_langs": name part must be no more than 63 characters
```

Las infracciones del límite de cadena son comunes si las etiquetas de servicio no se establecen explícitamente a través de [Unified Service Tagging][8], en cuyo caso se utilizan los nombres de imagen predeterminados.

##### La inyección parece exitosa, pero faltan rastreos {#injection-appears-successful-but-traces-are-missing}

Si los registros no muestran problemas pero faltan rastreos, puede haber una configuración incorrecta del lado de la aplicación. Verifique que:
- Las anotaciones y etiquetas requeridas estén presentes.
- [Unified Service Tagging][8] esté configurado correctamente.
- Las listas de elementos permitidos y denegados para las reglas de instrumentación estén definidas correctamente.

## Solución de problemas específica del lenguaje {#language-specific-troubleshooting}

### Java {#java}

#### `JAVA_TOOL_OPTIONS` es demasiado largo {#java-tool-options-is-too-long}

La variable de entorno `JAVA_TOOL_OPTIONS` tiene un límite impuesto por la JVM de 1024 caracteres. Durante la inyección, Datadog añade una bandera `-javaagent` a esta variable para habilitar el rastreo. Si el valor combinado excede el límite, la JVM emite una advertencia e ignora la variable, lo que impide la inyección.

Para evitar este problema, excluya el proceso afectado de la inyección.

####  `JAVA_TOOL_OPTIONS` cambia la salida del programa {#java-tool-options-changes-program-output}

Cuando `JAVA_TOOL_OPTIONS` está configurado, la JVM imprime un mensaje en stdout, como `Picked up JAVA_TOOL_OPTIONS: -Xmx1024m`. Si un proceso lee y depende de esta salida, podría verse afectado.

A partir de la versión 0.12.2, se omite la inyección para `java -version` para evitar interferir con los procesos que analizan su salida.

#### Varios sitios de Java informan bajo el mismo nombre de servicio {#multiple-java-sites-report-under-the-same-service-name}

De forma predeterminada, Single Step establece la variable de entorno `DD_SERVICE`, la cual aplica un único nombre de servicio en todas las aplicaciones web que se ejecutan en el mismo servidor (como Tomcat o WebLogic). Como resultado, todos los sitios informan bajo el mismo nombre.

Utilice una de las siguientes opciones para habilitar **split-by-tags** de modo que cada sitio informe bajo su propio nombre:
- Propiedad del sistema JVM: `-Ddd.trace.split-by-tags=servlet.context`
- Variable de entorno: `DD_TRACE_SPLIT_BY_TAGS=servlet.context`

#### El rastreador ya existe {#tracer-already-exists}

SSI no se inyecta en aplicaciones que ya utilizan una opción `-javaagent` u otra configuración de rastreo.

### Ruby {#ruby}

La inyección de Ruby modifica el `Gemfile` para agregar el SDK de Datadog. Si el soporte de inyección se elimina posteriormente, es posible que la aplicación no inicie debido a la dependencia faltante.

Para resolver esto, restaure el `Gemfile` original. Si aún desea utilizar APM después de eliminar la inyección, ejecute `bundle install` para descargar la gema.

### Python {#python}

Las versiones <=2.7.5 contienen una dependencia de protobuf preempaquetada que puede entrar en conflicto con las bibliotecas del sistema.

### .NET {#net}

#### SSI se aplica, pero no llegan rastreos de .NET al Agent {#ssi-is-applied-but-no-net-traces-reach-the-agent}

Si las anotaciones de SSI y los contenedores de inicialización están presentes en el pod pero no llegan rastreos de .NET, es posible que otro generador de perfiles tenga prioridad. Verifique `CORECLR_PROFILER` en el contenedor principal. Si el valor no es `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` (el CLSID del rastreador de .NET de Datadog), se carga otro generador de perfiles en lugar de Datadog.

Elimine las variables de entorno `CORECLR_*` conflictivas (y cualquier entrada `LD_PRELOAD` que haga referencia al otro generador de perfiles) de la fuente que las inyectó: el operador de otro proveedor, el contenedor de inicialización, la plantilla de pod o los valores de Helm. Luego, reinicie los pods. [La .NET CLR Profiling API permite solo un suscriptor por proceso][10].

## Recopile información de diagnóstico para el soporte {#collect-diagnostic-information-for-support}

Al contactar al soporte técnico sobre problemas de inyección, recopile la siguiente información para ayudar en la resolución de problemas:

1. ¿Está utilizando inyección en el servidor, inyección en Docker o ambas?
1. Verifique que los directorios `/opt/datadog-packages/datadog-apm*` existan.
1. Para la inyección en el servidor, verifique la existencia y los permisos de `/etc/ld.so.preload`:

   ```
   sudo ls -l /etc/ld.so.preload
   ```

   Debe ser propiedad de `root` con permisos `644` (`-rw-r--r--`).

1. Habilite los registros de depuración del inyector y recopile la salida. Para obtener instrucciones, consulte [Registros de depuración del inyector](#injector-debug-logs).

1. Proporcione un flare del Agent.

### Información adicional para la inyección basada en Kubernetes {#additional-information-for-kubernetes-based-injection}

Recopile los siguientes detalles si está solucionando problemas de inyección en un entorno de Kubernetes:

- El método utilizado para implementar el Cluster Agent (por ejemplo, Helm, Datadog Operator o comandos kubectl).
- Archivos de implementación para el pod de la aplicación.
- Flares tanto del Node Agent como del Cluster Agent, idealmente con el modo `DEBUG` habilitado.
- Salida de:
  ```
  kubectl describe pod <app pod>
  ```
- Registros de depuración del inyector del pod de la aplicación (no del Cluster Agent). Para obtener instrucciones, consulte [Registros de depuración del inyector](#injector-debug-logs).

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes?tab=agentv764recommended#remove-apm-for-all-services-on-the-infrastructure
[2]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker#remove-apm-for-all-services-on-the-infrastructure
[3]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux#remove-single-step-apm-instrumentation-from-your-agent
[4]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/windows#remove-single-step-apm-instrumentation-from-your-agent
[5]: /es/containers/guide/sync_container_images/#copy-an-image-to-another-registry-using-crane
[6]: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set
[7]: https://datatracker.ietf.org/doc/html/rfc1035
[8]: /es/getting_started/tagging/unified_service_tagging/
[9]: https://app.datadoghq.com/fleet
[10]: /es/tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[11]: /es/tracing/guide/injectors/
[12]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/#instrument-sdks-across-applications
[13]: /es/tracing/troubleshooting/tracer_debug_logs/
[14]: /es/tracing/trace_collection/single-step-apm/kubernetes/?tab=datadoginstrumentationcrdrecommended#enable-apm-with-datadoginstrumentation