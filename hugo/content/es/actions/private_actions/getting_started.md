---
description: Implemente un ejecutor de Private Action en el Datadog Agent con el Datadog
  Operator, luego ejecute su primera acción utilizando las Execution Policies predeterminadas
  de Datadog.
further_reading:
- link: actions/private_actions
  tag: Documentación
  text: Descripción general de Private Actions
- link: actions/private_actions/reference
  tag: Documentación
  text: Referencia del ejecutor de Private Actions
title: Introducción a las Private Actions
---
## Descripción general {#overview}

Siga esta guía para implementar un ejecutor Private Action dentro del Datadog Agent con el Datadog Operator, luego ejecute una acción de solo lectura que Datadog autoriza automáticamente para usted.

Esta es la ruta recomendada para comenzar. Utiliza la siguiente configuración:

- **Ejecute el runner en el Datadog Agent**, en lugar de como un proceso de servidor independiente.
- **Instale con el Datadog Operator** en Kubernetes.
- **Inscríbase con una clave de API**, para que el runner esté autorizado con Execution Policies.
- **Confíe en las Execution Policies predeterminadas de Datadog**, que Datadog proporciona para usted, para autorizar acciones de solo lectura de Kubernetes y Remote Action en sus runners sin necesidad de configuración.

Al final de esta guía, tendrá un runner inscrito y una acción de solo lectura en funcionamiento.

## Requisitos previos {#prerequisites}

- Un clúster de Kubernetes administrado por el [Datadog Operator][1] v1.28.0 o posterior, que ejecuta Datadog Agent 7.81.0 o posterior.
- [Remote Configuration][2] habilitada para su organización.
- Permiso para crear claves de API en [Organization Settings][3].
- Acceso de red a Datadog en `https://{{< region-param key=dd_site >}}`.

## Paso 1: Cree una clave de API con la capacidad Private Action Runner {#step-1-create-an-api-key-with-the-private-action-runner-capability}

Un runner sin propietario se inscribe con una clave de API que tiene la capacidad Private Action Runner. No necesita una clave de aplicación.

1. En Datadog, vaya a **[Organization Settings > API Keys][3]** y cree o seleccione una clave de API.
1. En la clave, junto a **PAR** (la capacidad Private Action Runner), haga clic en **Enable**.
   {{< img src="actions/private_actions/getting_started/api_key_par_capability.png" alt="Un panel de detalles de la clave de API con la capacidad PAR habilitada, junto a la configuración de Remote Config" style="width:60%;" >}}
1. Almacene el valor de la clave en un secreto de Kubernetes que el Agent pueda leer:
   ```bash
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```

## Paso 2: Implemente el runner con el Datadog Operator {#step-2-deploy-the-runner-with-the-datadog-operator}

Habilite el runner en su `DatadogAgent` recurso mediante anotaciones del Datadog Operator. El siguiente ejemplo habilita el runner tanto en el Agent de nodo como en el Cluster Agent, lo registra como sin propietario con su clave de API y permite un pequeño conjunto de acciones de solo lectura.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/private-action-runner-enabled: "true"
    agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.remoteaction.*"
          - "com.datadoghq.script.*"
    cluster-agent.datadoghq.com/private-action-runner-enabled: "true"
    cluster-agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.kubernetes.*"
          - "com.datadoghq.script.*"
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    site: {{< region-param key=dd_site >}}
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
```

Aplique el manifiesto:

```bash
kubectl apply -f datadog-agent.yaml
```

Debido a que `api_key_only_enrollment` está configurado y usted solo proporciona una clave de API, cada runner se autorregistra como **sin propietario** al iniciarse, lo que significa que está autorizado con Execution Policies. Este manifiesto es la configuración mínima del Datadog Operator para esta guía; para obtener la configuración completa del ejecutor, otros métodos de instalación (Host, Windows, Helm) y la referencia completa de campos, consulte [Configurar un ejecutor de private actions en el Datadog Agent][4]. Para obtener más información sobre el registro, consulte [Enrollment and ownership][5].

Las entradas `actions_allowlist` en el ejemplo utilizan comodines de paquete para permitir las acciones que utiliza esta guía. Para utilizar las acciones de solo lectura integradas del runner, deje `actions_allowlist` vacío. El runner habilita entonces su conjunto de acciones predeterminado, que incluye acciones de red y de shell de Remote Action de solo lectura, además de un conjunto de acciones de Kubernetes de solo lectura en el Cluster Agent.

## Paso 3: Confirme que el runner esté registrado {#step-3-confirm-the-runner-is-enrolled}

En Datadog, vaya a [Private Action Runners][6]. Verifique que su nuevo runner aparezca en la lista.

También puede verificar los registros del Cluster Agent para confirmar que el runner se inició:

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=1000 | grep private
```

Para los registros del node Agent y otras plataformas, consulte [Depuración con registros][12].

Datadog aprovisiona **default Execution Policies** en su organización. Estas políticas utilizan un selector de destino de `*`, por lo que cubren automáticamente a cada Datadog Agent que activa un ejecutor de Private Action, incluido el que usted implementó. Esto es lo que autoriza las acciones de solo lectura sin necesidad de configurar su propia Execution Policy. Consulte [Datadog Default Execution Policies][7].

## Paso 4: Ejecute su primera acción {#step-4-run-your-first-action}

Ejecute una acción de Kubernetes de solo lectura en su nuevo runner desde el Action Catalog. El Action Catalog ejecuta una acción de la misma manera que lo hace un paso de flujo de trabajo; usted elige un target Agent, proporciona entradas y ejecuta la acción.

1. En el Datadog Action Catalog, abra [List Pods][8] (`com.datadoghq.kubernetes.core.listPod`).
1. En **Configure connection**, seleccione la pestaña **Target** (en lugar de **Connection**).
1. Establezca **Orch Cluster ID** en el ID del clúster de orquestación del clúster que ejecuta su runner. Puede encontrar el ID del clúster de orquestación entre las etiquetas de su clúster en [Fleet Automation's Fleet View][11].
1. En **Configure inputs**, ingrese el **Namespace** del cual obtener la lista de pods. También puede establecer **Field selector**, **Label selector** o **Limit**.
1. Haga clic en **Run**. Los resultados aparecen en el panel.
  {{< img src="actions/private_actions/getting_started/run_action_action_catalog.png" alt="La acción List Pods en el Action Catalog, con la conexión establecida en Target y un Orch Cluster ID ingresado." style="width:80%;" >}}

La acción se ejecuta en su runner y devuelve su resultado. Para ejecutar la misma acción desde un flujo de trabajo en lugar de ello, agregue un paso de Private Action en Workflow Automation y elija **Target** en su selector de conexión. Consulte [Usar una política de ejecución en un flujo de trabajo][9].

## Próximos pasos {#next-steps}

Esta guía utiliza los default Execution Policies de Datadog, que autorizan únicamente acciones de solo lectura. Para ejecutar acciones con capacidad de escritura, o para limitar el acceso a equipos o entornos específicos, cree su propia Execution Policy. Consulte [Execution Policies][10].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/containers/datadog_operator/
[2]: /es/remote_configuration
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/actions/private_actions/set_up_agent_based/
[5]: /es/actions/private_actions/enroll_runner/
[6]: https://app.datadoghq.com/actions/private-action-runners
[7]: /es/actions/private_actions/execution_policies/#default-execution-policies
[8]: https://app.datadoghq.com/actions/action-catalog#com.datadoghq.kubernetes/com.datadoghq.kubernetes.core/com.datadoghq.kubernetes.core.listPod
[9]: /es/actions/private_actions/execution_policies/#use-an-execution-policy-in-a-workflow
[10]: /es/actions/private_actions/execution_policies/
[11]: https://app.datadoghq.com/fleet?view_by=clusters
[12]: /es/actions/private_actions/set_up_agent_based/#debugging-with-logs