---
app_id: open-policy-agent
app_uuid: 98c54837-27eb-48ca-9780-29bb593eecb8
assets:
  dashboards:
    OPA base dashboard: assets/dashboards/open_policy_agent_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: open_policy_agent.policies
      metadata_path: metadata.csv
      prefix: open_policy_agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10142
    source_type_name: open_policy_agent
  logs:
    source: opa
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: ara.pulido@datadoghq.com
  support_email: ara.pulido@datadoghq.com
categories:
- conformidad
- configuración y despliegue
- rastreo
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/README.md
display_on_public_website: true
draft: false
git_integration_title: open_policy_agent
integration_id: open-policy-agent
integration_title: Open Policy Agent
integration_version: 0.0.1
is_public: true
manifest_version: 2.0.0
name: open_policy_agent
public_title: Open Policy Agent
short_description: Integración de OPA
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Cumplimiento
  - Categoría::Configuración y despliegue
  - Categoría::Contenedores
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Sistema operativo compatible::Linux
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Integración de OPA
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Open Policy Agent
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check recopila métricas de [Open Policy Agent][1].

## Configuración

Sigue las instrucciones que se indican a continuación para instalar y configurar este check para un Agent que se ejecuta en un clúster de Kubernetes. Consulta también las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Para instalar el check open_policy_agent en tu clúster de Kubernetes:

1. Instala el [kit de herramientas para desarrolladores][3].
2. Clona el repositorio `integrations-extras`:

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. Actualiza la configuración de `ddev` con la ruta de `integrations-extras/`:

   ```shell
   ddev config set repos.extras ./integrations-extras
   ```

4. Para compilar el paquete `open_policy_agent`, ejecuta:

   ```shell
   ddev -e release build open_policy_agent
   ```

5. [Descarga el manifiesto del Agent para instalar el Datadog Agent como DaemonSet][4].
6. Crea dos `PersistentVolumeClaim`, uno para el código de checks y otro para la configuración.
7. Añádelos como volúmenes a tu plantilla de pods del Agent y úsalos para los checks y configuración:

   ```yaml
        env:
          - name: DD_CONFD_PATH
            value: "/confd"
          - name: DD_ADDITIONAL_CHECKSD
            value: "/checksd"
      [...]
        volumeMounts:
          - name: agent-code-storage
            mountPath: /checksd
          - name: agent-conf-storage
            mountPath: /confd
      [...]
      volumes:
        - name: agent-code-storage
          persistentVolumeClaim:
            claimName: agent-code-claim
        - name: agent-conf-storage
          persistentVolumeClaim:
            claimName: agent-conf-claim
   ```

8. Despliega el Datadog Agent en tu clúster de Kubernetes:

   ```shell
   kubectl apply -f agent.yaml
   ```

9. Copia el archivo .whl del artefacto de integración en tus nodos de Kubernetes o súbelo a una URL pública.

10. Ejecuta el siguiente comando para instalar la rueda de integraciones con el Agent:

    ```shell
    kubectl exec ds/datadog -- agent integration install -w <PATH_OF_OPEN_POLICY_AGENT_ARTIFACT_>/<OPEN_POLICY_AGENT_ARTIFACT_NAME>.whl
    ```

11. Ejecuta los siguientes comandos para copiar los checks y la configuración en los PVCs correspondientes:

    ```shell
    kubectl exec ds/datadog -- sh
    # cp -R /opt/datadog-agent/embedded/lib/python2.7/site-packages/datadog_checks/* /checksd
    # cp -R /etc/datadog-agent/conf.d/* /confd
    ```

12. Reinicia los pods del Datadog Agent.

### Métricas generadas por logs

El dashboard por defecto incluye algunos gráficos relacionados con una métrica sobre las decisiones del OPA, llamada `open_policy_agent.decisions`. Esta métrica se crea basándose en los "Logs de decisión" del OPA. Para generar esta métrica y poblar esta parte del dashboard, crea una nueva métrica generada por logs en Datadog.

En primer lugar, crea una faceta para el campo `msg` de los logs del OPA, ya que solo genera métricas para el tipo de entrada de log "Logs de decisión". Para ello, selecciona cualquiera de las entradas de log procedentes del OPA, haz clic en el log de motor cerca del campo `msg` y selecciona "Create facet for @msg" (Crear faceta para @msg):

![Faceta de mensaje][5]

Crea dos facetas, una para el campo `input.request.kind.kind` y otra para el campo `result.response.allowed`, ambas disponibles en cualquiera de las entradas de log de tipo "Log de decisión".

![Faceta Tipo][6]
![Faceta Permitida][7]

Una vez creadas las facetas, genera las métrica necesarias para que el dashboard esté completo. Haz clic en el menú "Logs -> Generate Metrics" (Logs > Generar métricas). Haz clic en "Add a new metric** (Añadir una nueva métrica) y rellena el formulario con los siguientes datos:

![Métrica de decisión del OPA][8]

### Configuración

1. Edita el archivo `open_policy_agent/conf.yaml`, en la carpeta `/confd` que has añadido al pod del Agent para empezar a recopilar tus datos de rendimiento del OPA. Consulta el [open_policy_agent/conf.yaml de ejemplo][9] para todas las opciones disponibles de configuración.

2. [Reinicia el Agent][10].

### Validación

[Ejecuta el subcomando de estado del Agent][11] y busca `open_policy_agent` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "open-policy-agent" >}}


### Eventos

open_policy_agent no incluye ningún evento.

### Checks de servicios
{{< get-service-checks-from-git "open-policy-agent" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][14].


[1]: https://www.openpolicyagent.org/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/es/developers/integrations/python/
[4]: https://docs.datadoghq.com/es/agent/kubernetes/daemonset_setup/?tab=k8sfile
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/msg_facet.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/kind_facet.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/allowed_facet.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/metric.png
[9]: https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/datadog_checks/open_policy_agent/data/conf.yaml.example
[10]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/assets/service_checks.json
[14]: https://docs.datadoghq.com/es/help/