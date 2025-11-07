---
app_id: gatekeeper
app_uuid: 9c48b05d-ee74-4557-818e-14456c6f427b
assets:
  dashboards:
    Gatekeeper base dashboard: assets/dashboards/gatekeeper_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: gatekeeper.constraints
      metadata_path: metadata.csv
      prefix: gatekeeper.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10148
    source_type_name: Gatekeeper
  logs:
    source: gatekeeper
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: ara.pulido@datadoghq.com
  support_email: ara.pulido@datadoghq.com
categories:
- nube
- conformidad
- configuración y despliegue
- rastreo
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/README.md
display_on_public_website: true
draft: false
git_integration_title: gatekeeper
integration_id: gatekeeper
integration_title: Gatekeeper
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: gatekeeper
public_title: Gatekeeper
short_description: Integración de Gatekeeper
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Cumplimiento
  - Categoría::Configuración y despliegue
  - Categoría::Contenedores
  - Categoría::Seguridad
  - Sistema operativo compatible::Linux
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Integración de Gatekeeper
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Gatekeeper
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check recopila métricas de [OPA Gatekeeper][1].

![Dashboard de información general de Gatekeeper][2]

## Configuración

Sigue las instrucciones que se indican a continuación con el fin de instalar y configurar este check para un Agent que se ejecuta en un clúster de Kubernetes. También consulta las [plantillas de integración de Autodiscovery][3] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

#### Versiones 7.26.0 y 6.26.0 o posteriores del Agent

Para usar una integración de `integrations-extra` con el Docker Agent, Datadog recomienda crear el Agent con la integración instalada. Usa el siguiente archivo de Docker para crear una versión actualizada del Agent que incluya la integración `gatekeeper` desde `integrations-extras`:

```
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-gatekeeper==<INTEGRATION_VERSION>
```

#### Versiones 7.26.0 y 6.26.0 o anteriores del Agent

Para instalar el check de Gatekeeper en tu clúster de Kubernetes:

1. Instala el [kit de herramientas para desarrolladores][4].
2. Clona el repositorio `integrations-extras`:

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. Actualiza la configuración de `ddev` con la ruta de `integrations-extras/`:

   ```shell
   ddev config set repos.extras ./integrations-extras
   ```

4. Para crear el paquete de `gatekeeper`, ejecuta:

   ```shell
   ddev -e release build gatekeeper
   ```

5. [Descarga el manifiesto del Agent para instalar el Datadog Agent como DaemonSet][5].
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

9. Copia el archivo .whl del artefacto de la integración en tus nodos de Kubernetes o súbelo a una URL pública.

10. Ejecuta el siguiente comando para instalar la rueda de integraciones con el Agent:

    ```shell
    kubectl exec ds/datadog -- agent integration install -w <PATH_OF_GATEKEEPER_ARTIFACT_>/<GATEKEEPER_ARTIFACT_NAME>.whl
    ```

11. Ejecuta los siguientes comandos para copiar los checks y la configuración en los PVCs correspondientes:

    ```shell
    kubectl exec ds/datadog -- sh
    # cp -R /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/* /checksd
    # cp -R /etc/datadog-agent/conf.d/* /confd
    ```

12. Reinicia los pods del Datadog Agent.

### Configuración

1. Edita el archivo `gatekeeper/conf.yaml`, en la carpeta `/confd` que has añadido al pod del Agent para empezar a recopilar tus datos de rendimiento de Gatekeeper. Consulta el [gatekeeper/conf.yaml de ejemplo][6] para conocer todas las opciones de configuración disponibles.

2. [Reinicia el Agent][7].

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `gatekeeper` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "gatekeeper" >}}


### Eventos

Gatekeeper no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "gatekeeper" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][11].


[1]: https://github.com/open-policy-agent/gatekeeper
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gatekeeper/images/gatekeeper_dashboard.png
[3]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/es/developers/integrations/python/
[5]: https://docs.datadoghq.com/es/agent/kubernetes/daemonset_setup/?tab=k8sfile
[6]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/datadog_checks/gatekeeper/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/