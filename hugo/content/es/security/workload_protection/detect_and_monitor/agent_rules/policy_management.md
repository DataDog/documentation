---
aliases:
- /es/security/workload_protection/workload_security_rules/custom_rules
- /es/security/threats/workload_security_rules/custom_rules
description: Cree, implemente y asigne el contexto a las políticas de Workload Protection,
  y escriba reglas personalizadas de Agent para su infraestructura.
disable_toc: false
title: Gestión de políticas
---
Las reglas de Agent están **organizadas en políticas**. Una política es un conjunto de reglas de Agent que usted implementa en conjunto y **asigna el contexto para una infraestructura específica** (hosts, clústeres, etcétera).

Además de las [reglas predeterminadas de Agent][7] (OOTB), puede escribir **reglas personalizadas de Agent** para detectar eventos que Datadog no muestra solo con las reglas OOTB estándar.

## Políticas {#policies}

### Crear una política {#create-a-policy}

1. Vaya a [Policies][3].
2. Haga clic en {{< ui >}}New Policy{{< /ui >}}. También puede abrir una política existente, hacer clic en {{< ui >}}Actions{{< /ui >}} y clonarla.
3. Ingrese un nombre para la política y haga clic en {{< ui >}}Create{{< /ui >}}.
   La nueva política se crea, pero no está habilitada ni implementada.
4. Haga clic en la política para abrirla.
5. En {{< ui >}}New Rule{{< /ui >}}, agregue reglas personalizadas de Agent a la política. Para crear una regla de Agent, consulte [Create a custom Agent rule][14].
6. Haga clic en {{< ui >}}Edit{{< /ui >}} junto a {{< ui >}}Deployed on 0 agents{{< /ui >}}.
7. Agregue [etiquetas][17] a la política para dirigirse a una infraestructura específica.
8. Para implementar la política, active el interruptor junto a {{< ui >}}Policy is disabled{{< /ui >}} y confirme. Esto utiliza [Remote Configuration](#remote-configuration), como se detalla más adelante en esa página.

### Fije una política administrada por Datadog a su versión actual {#pin-a-datadog-managed-policy-to-its-current-version}

<div class="alert alert-info">La fijación de políticas es compatible con la versión 7.71.0 de Agent y posteriores. Los Agents anteriores siguen recibiendo las últimas actualizaciones de políticas automáticamente.</div>

Cuando Datadog actualiza las políticas administradas por Datadog, estas se implementan automáticamente en su infraestructura.

Para controlar cuándo se implementa una nueva versión de política en su infraestructura, puede fijar la política a su versión actual. Fijar una versión de política evita que las actualizaciones de políticas se implementen automáticamente cuando Datadog lanza una nueva versión de política.

Para fijar una política, haga lo siguiente:

1. Vaya a [Policies][3].
2. Haga clic en una política administrada por Datadog.
3. En {{< ui >}}Version{{< /ui >}}, haga clic en la opción de fijar.
   Si su infraestructura ejecuta Agents con una versión anterior a la 7.71.0, aparecerá una advertencia de Agents obsoletos. Consulte y actualice su versión de Agent en [Fleet Automation][18].
4. Haga clic en {{< ui >}}Pin{{< /ui >}}. Para desanclar la versión de la política, haga clic en la opción de fijar nuevamente.

### Reglas en conflicto {#conflicting-rules}

Cuando dos políticas implementadas en el mismo host contienen la misma regla con un estado diferente (activa e inactiva), la regla se considerará activa.

### Aplicar etiquetas {#apply-tags}

Las etiquetas definen dónde se aplica una política, como en entornos, clústeres o hosts. Agregue etiquetas a una política para limitar sus reglas a una parte de su infraestructura.

1. Vaya a [Agent Configuration][6].
2. Abra una política y haga clic en {{< ui >}}Edit{{< /ui >}}.
3. Ingrese etiquetas y haga clic en {{< ui >}}Apply{{< /ui >}}. Si la política está habilitada, se aplica a los objetivos de las etiquetas.

Cuando agrega etiquetas, Datadog muestra a cuántos agentes apuntan las etiquetas, así como la infraestructura que ejecuta cada agente. Por ejemplo, `Tags match 144 agents`.

## Crear una regla de Agent personalizada {#create-a-custom-agent-rule}

Puede crear una regla de Agent personalizada e implementarla como parte de una política personalizada. Más tarde, al definir una [regla de detección][19] personalizada, usted hace referencia a la regla de Agent personalizada y agrega parámetros de expresión.
Las reglas de Agent personalizadas se implementan en el Agent en una política personalizada separada de las políticas predeterminadas. La política personalizada contiene solo reglas de Agent personalizadas.

1. Vaya a [Agent Configuration][6].
2. Cree una política o abra una existente.
3. Con la política abierta, en {{< ui >}}Actions{{< /ui >}}, seleccione {{< ui >}}Manual rule creator{{< /ui >}} para abrir el editor de reglas de Agent. El mismo editor también está disponible desde la página [Reglas de Agent][21] en Datadog. Para usar el asistente {{< ui >}}Assisted rule creator{{< /ui >}} en su lugar (que lo guía a través de la regla de Agent y la regla de detección de amenazas), consulte [Crear las reglas de Agent y de detección personalizadas juntas][20].
4. Ingrese un {{< ui >}}Name{{< /ui >}} y una {{< ui >}}Description{{< /ui >}} para la regla.
5. En {{< ui >}}Expression{{< /ui >}}, defina la coincidencia usando [Datadog Security Language (SECL)][15].
6. (Opcional) Agregue variables o acciones que se ejecuten cuando la regla coincida con un evento. Consulte [Variables y acciones][22].
7. Haga clic en {{< ui >}}Create Agent Rule{{< /ui >}}. Regresará a la política.

Después de crear una regla de Agent personalizada, el cambio se guarda junto con otras actualizaciones de reglas pendientes. Para aplicar el cambio a su entorno, implemente la política personalizada actualizada en el Agent.

## Habilitar e implementar políticas {#enable-and-deploy-policies}

Las políticas habilitadas aplican sus reglas a los objetivos de infraestructura identificados por sus etiquetas. Habilitar una política es lo mismo que implementarla.

Puede usar **Remote Configuration** en la interfaz de usuario de Datadog para implementar automáticamente la política personalizada en los hosts designados por las etiquetas de política (todos los hosts o un subconjunto definido de hosts), o puede **implementar manualmente** la política en el Agent de cada host.

### Remote Configuration {#remote-configuration}

**Remote Configuration** es la forma en que Datadog entrega automáticamente políticas a sus agentes. Utiliza un mecanismo seguro para garantizar que solo las políticas firmadas y autenticadas se envíen a sus agentes. Para implementar una política mediante Remote Configuration, siga los pasos detallados en Crear una política.

#### Estrategias de implementación {#deployment-strategies}

Para implementar un cambio en las reglas o políticas del Agent con Remote Configuration, puede elegir entre dos estrategias: implementar el cambio al instante en todos sus hosts o escalonar la implementación en pasos mediante una implementación administrada. Realice el seguimiento de las implementaciones desde la [página de implementaciones][23].

##### Implementar al instante {#deploy-instantly}

La implementación instantánea envía la política actualizada a todos los hosts en el contexto al mismo tiempo, sin validación por etapas. Esto generalmente toma unos minutos y es mejor cuando desea que el cambio se aplique en todas partes de inmediato.

Seleccione {{< ui >}}Deploy instantly{{< /ui >}}, luego haga clic en {{< ui >}}Update Policy{{< /ui >}}. Siga el progreso desde la [página de implementaciones][23].

##### Implementación administrada {#managed-deployment}

Una implementación administrada despliega su cambio en etapas para que pueda validarlo en un subconjunto de hosts antes de que llegue a toda su infraestructura.

1. Al editar una política o una regla, seleccione {{< ui >}}Start a managed deployment{{< /ui >}}. Si la política o regla ya se implementó con un despliegue administrado, seleccione {{< ui >}}Start from your last deployment{{< /ui >}} para reutilizar los parámetros de la última implementación. Para un cambio de regla, los parámetros reutilizados son los de la última implementación de la política que contiene la regla.
2. En {{< ui >}}Customize deployment roll-out plan{{< /ui >}}, establezca el alcance de la implementación, luego configure hasta 10 etapas para implementar el cambio gradualmente. Defina cada etapa {{< ui >}}By percentage of hosts in scope{{< /ui >}} o {{< ui >}}By host tags{{< /ui >}}.
3. En {{< ui >}}Set up monitoring and delay time{{< /ui >}}, seleccione uno o más seguimientos para verificar durante la implementación. Si un seguimiento envía una alerta mientras la implementación está en curso, el despliegue se pausa. Luego, establezca el tiempo de retraso para esperar antes de continuar a la siguiente etapa.
4. En {{< ui >}}Set deployment window{{< /ui >}}, establezca los días, las horas y la zona horaria en los que se puede ejecutar la implementación. Si la implementación se extiende más allá de una ventana, se pausa y se reanuda en la siguiente.
5. (Opcional) En {{< ui >}}Add a description{{< /ui >}}, agregue una descripción para la implementación.
6. Haga clic en {{< ui >}}Update Policy{{< /ui >}} para iniciar el despliegue. Siga el progreso desde la [página de implementaciones][23].

### Implementación manual {#manual-deployment}

Para la **implementación manual**, usted mismo instala un archivo de política en cada Agent. Puede crear la política y sus reglas en la interfaz de usuario de Datadog y **descargar** el archivo generado. Si ya conoce la sintaxis de la política, cree un archivo `.policy` manualmente. Luego, cargue o sincronice ese archivo en cada Agent donde deba ejecutarse la política, como se describe a continuación.

1. En la página {{< ui >}}Agent Configuration{{< /ui >}}, abra una política.
2. En Actions, seleccione {{< ui >}}Download Policy{{< /ui >}}.

A continuación, utilice las siguientes instrucciones para cargar el archivo de política en cada servidor.

{{< tabs >}}
{{% tab "Servidor" %}}

Copie el archivo `default.policy` al servidor de destino en la carpeta `/etc/datadog-agent/runtime-security.d` (que contendrá todos sus archivos `.policy`). El archivo debe tener acceso `read` y `write` para el usuario `root` en el servidor.

Para aplicar los cambios, haga **una** de las siguientes opciones:

-   Recargue las políticas de tiempo de ejecución (sin un reinicio completo del Agent):

    ```bash
    sudo /opt/datadog-agent/embedded/bin/system-probe runtime policy reload
    ```

-   O reinicie el [Datadog Agent][27].

[27]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent

{{% /tab %}}

{{% tab "Helm" %}}

1. Cree un ConfigMap que contenga `default.policy`, por ejemplo, `kubectl create configmap jdefaultpol --from-file=default.policy`.
2. Agregue el ConfigMap (`jdefaultpol`) a `values.yaml` con `datadog.securityAgent.runtime.policies.configMap`:

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

3. Actualice el chart de Helm con `helm upgrade <RELEASENAME> -f values.yaml --set datadog.apiKey=<APIKEY> datadog/datadog`.

    **Nota:** Si necesita realizar más cambios en `default.policy`, puede usar `kubectl edit cm jdefaultpol` o reemplazar el configMap con `kubectl create configmap jdefaultpol --from-file default.policy -o yaml --dry-run=client | kubectl replace -f -`.

{{% /tab %}}
{{< /tabs >}}

## Deshabilite las reglas predeterminadas del Agent {#disable-default-agent-rules}

1. Para deshabilitar una regla del Agent, navegue a la página [{{< ui >}}Agent Configuration{{< /ui >}}][6] y seleccione la política que utiliza la regla.
2. En la política, abra la regla.
3. Establezca el estado en {{< ui >}}Inactive{{< /ui >}}.
4. Haga clic en {{< ui >}}Save Changes{{< /ui >}}.

Eliminar una regla de [Configuración de reglas][21] la elimina de **todas las políticas** que incluían esa regla.

## RBAC para la gestión de reglas personalizadas {#rbac-for-custom-rule-management}

Aquí hay algunos [roles y permisos][11] importantes para usar en el RBAC de reglas personalizadas:

-   El permiso `security_monitoring_cws_agent_rules_actions` se puede utilizar para activar y configurar la [Automated response][12] que se usa para habilitar el modo de bloqueo en las reglas.
    -   Para utilizar el permiso `security_monitoring_cws_agent_rules_actions`, un usuario con el rol de Datadog Admin debe crear un rol que contenga el permiso `security_monitoring_cws_agent_rules_actions` y, a continuación, añadir a este rol únicamente a aquellos usuarios que gestionen el Automated response.
-   El rol {{< ui >}}Datadog Standard{{< /ui >}} permite a los usuarios crear/actualizar una regla personalizada de forma predeterminada, siempre y cuando la operación no cambie la configuración de **protección** de la regla.

[3]: https://app.datadoghq.com/security/workload-protection/policies
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /es/security/notifications/variables/?tab=cloudsiem
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: /es/security/workload_protection/detect_and_monitor/agent_rules/#ootb-rules
[8]: /es/security/workload_protection/
[9]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/?tab=threshold#set-a-rule-case
[10]: https://app.datadoghq.com/notebook/list?type=runbook
[11]: /es/account_management/rbac/permissions/
[12]: /es/security/workload_protection/respond_and_report/#automated-response
[13]: #disable-default-agent-rules
[14]: #create-a-custom-agent-rule
[15]: /es/security/workload_protection/detect_and_monitor/agent_rules/secl_guide/
[16]: #prioritize-policies
[17]: #apply-tags
[18]: https://app.datadoghq.com/fleet
[19]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[20]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together
[21]: https://app.datadoghq.com/security/workload-protection/agent-rules
[22]: /es/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[23]: https://app.datadoghq.com/security/workload-protection/deployments