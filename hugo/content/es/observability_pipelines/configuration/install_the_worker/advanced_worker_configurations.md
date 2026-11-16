---
aliases:
- /es/observability_pipelines/setup_opw/
- /es/observability_pipelines/advanced_configurations/
description: Obtenga información sobre las opciones de arranque del Worker y otras
  opciones de configuración.
disable_toc: false
further_reading:
- link: /observability_pipelines/sensitive_data_redaction/
  tag: Documentación
  text: Redactar datos con Observability Pipelines
- link: /observability_pipelines/configuration/update_existing_pipelines/
  tag: Documentación
  text: Actualizar canalizaciones existentes
title: Configuraciones avanzadas del Worker
---
## Descripción general {#overview}

Este documento explica el [arranque](#bootstrap-options) para el Observability Pipelines Worker, [otras opciones de configuración del Worker](#other-worker-configuration-options) y cómo [habilitar el punto de conexión de verificación de estado y las sondas de actividad y preparación](#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes).

## Opciones de arranque {#bootstrap-options}

<div class="alert alert-danger">Todas las rutas de archivos de configuración especificadas en la canalización deben estar bajo <code>/DD_OP_DATA_DIR/config</code>.
Modificar archivos en esa ubicación mientras OPW se está ejecutando podría tener efectos adversos.
</div>

Realice el arranque del Observability Pipelines Worker dentro de su infraestructura antes de configurar una canalización. Estas variables de entorno son independientes de las variables de entorno de la canalización. La ubicación de los directorios y archivos relacionados:

- Directorio de datos predeterminado: `/var/lib/observability-pipelines-worker`
- Archivo de arranque: `/etc/observability-pipelines-worker/bootstrap.yaml`
- Archivo de variables de entorno: `/etc/default/observability-pipelines-worker`

**Nota**: `DD_OP_DATA_DIR` solo puede ser propiedad de un único Observability Pipelines Worker. Si tiene varios Workers, debe usar directorios de datos únicos.

Para establecer las opciones de arranque, realice una de las siguientes acciones:
- Use variables de entorno.
- Cree un `bootstrap.yaml` e inicie la instancia del Worker con `--bootstrap-config /path/to/bootstrap.yaml`.

A continuación se presenta una lista de opciones de arranque, sus variables de entorno de canalización relacionadas y cuál de ellas, el valor de arranque o la variable de entorno, tiene mayor precedencia (prioridad) si ambos se han establecido.

`api`
: **Variable de entorno de canalización**: `DD_OP_API_ENABLED`
: **Prioridad**: `DD_OP_API_ENABLED`
: Un ejemplo de configuración:
: &nbsp;&nbsp;&nbsp;&nbsp;`api`:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`enabled`: `true`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`address`: `"127.0.0.1:8686" # optional`
: Nota: Establecer `address` es opcional. Es la dirección de red a la que debe vincularse la API. Si está ejecutando el Worker en un contenedor de Docker, vincúlelo a `0.0.0.0`. De lo contrario, la API no se expone fuera del contenedor.
: **Descripción**: Habilite la API del Observability Pipelines Worker para que pueda ver los procesos del Worker con el comando `tap` o `top`. Consulte [Ejecutar, interceptar o supervisar el Worker][8] para obtener más información. Si está utilizando los gráficos de Helm proporcionados al [configurar una canalización][7], entonces la API ya se ha habilitado. De lo contrario, asegúrese de que la variable de entorno `DD_OP_API_ENABLED` esté establecida en `true` en `/etc/observability-pipelines-worker/bootstrap.yaml`. Esto configura la API para que escuche en `localhost` y el puerto `8686`, que es lo que espera la CLI para `tap`.
<br><br>Consulte [Habilitar sondeo de actividad y preparación](#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes) sobre cómo exponer el punto de conexión `/health`.

`api_key`
: **Variable de entorno de canalización**: `DD_API_KEY`
: **Prioridad**: `DD_API_KEY`
: **Descripción**: Cree una [clave de Datadog API][1] para esta variable de entorno. [Remote Configuration][6] debe estar habilitada para la clave de API. Consulte [Security considerations][11] para obtener información sobre las salvaguardas implementadas para Remote Configuration.

`data_dir`
: **Variable de entorno de canalización**: `DD_OP_DATA_DIR`
: **Prioridad**: `DD_OP_DATA_DIR`
: **Descripción**: El directorio de datos (opcional, predeterminado: `/var/lib/observability-pipelines-worker`). Este es el directorio del sistema de archivos que utiliza el Observability Pipelines Worker para el estado local.

`pipeline_id`
: **Variable de entorno de canalización**: `DD_OP_PIPELINE_ID`
: **Prioridad**: `DD_OP_PIPELINE_ID`
: **Descripción**: Cree un [ID de canalización de Observability Pipelines][2] para esta variable de entorno.

`proxy`
: **Variables de entorno de canalización**: `DD_PROXY_HTTP`, `DD_PROXY_HTTPS`, `DD_PROXY_NO_PROXY`
: Establezca servidores proxy para el Observability Pipelines Worker. La configuración de proxy para el Worker funciona de la misma manera que para el [Datadog Agent][4].
: **Prioridad**: Los ajustes se aplican a todo el proceso del Worker. Los valores de proxy HTTP y HTTPS se resuelven en este orden:
<br>&nbsp;&nbsp;&nbsp;1. `DD_PROXY_HTTP(S)`
<br>&nbsp;&nbsp;&nbsp;2. `HTTP(S)_PROXY`
<br>&nbsp;&nbsp;&nbsp;3. `proxy`
:
: Un ejemplo de configuración de proxy:
: &nbsp;&nbsp;&nbsp;&nbsp;`proxy`:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`enabled`: `true`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`https`: `https://foo.bar:3128`
: **Descripción**: El Observability Pipelines Worker puede enrutar solicitudes externas a través de proxies de reenvío, como Squid. Los proxies de reenvío reenvían las solicitudes del cliente desde el Observability Pipelines Worker a internet. Puede usarlos como un firewall web para prohibir o permitir ciertos dominios, puertos o protocolos. Los proxies de reenvío generalmente no terminan SSL y, por lo tanto, no tienen acceso al contenido de la solicitud. Solo pasan paquetes de un lado a otro entre el cliente y el destino. Los [túneles HTTP][5] se utilizan para asegurar la comunicación a través de un proxy de reenvío.
: **Notas**:
: <li style="list-style-type: '- '">Esta opción está disponible para Observability Pipelines Worker 2.1 y versiones posteriores.</li>
: <li style="list-style-type: '- '">El Observability Pipelines Worker no puede enrutar solicitudes externas a través de proxies inversos, como HAProxy y NGINX.</li>
: <li style="list-style-type: '- '">Las <code>DD_PROXY_HTTP(S)</code> y <code>HTTP(S)_PROXY</code> variables de entorno deben estar ya exportadas en su entorno para que el Worker pueda resolverlas. No se pueden anteponer al script de instalación del Worker.</li>

`secret`
: **Variable de entorno de canalización**: Ninguna
: **Prioridad**: N/A
: **Descripción**: Conecta el Worker a su administrador de secretos. Consulte [Gestión de secretos][12] para obtener información sobre la configuración.

`site`
: **Variable de entorno de canalización**: `DD_SITE`
: **Prioridad**: `DD_SITE`
: **Descripción**: Su sitio de Datadog (opcional, valor predeterminado: `datadoghq.com`).
: Consulte [Introducción a los sitios][3] para obtener más información.

`tags: []`
: **Variable de entorno de canalización**: `DD_OP_TAGS`
: **Prioridad**: `DD_OP_TAGS`
: **Descripción**: Las etiquetas reportadas con métricas internas y que pueden utilizarse para filtrar instancias de Observability Pipelines para implementaciones de Remote Configuration.

`threads`
: **Variable de entorno de canalización**: `DD_OP_THREADS`
: **Prioridad**: `DD_OP_THREADS`
: **Descripción**: El número de hilos que se utilizarán para el procesamiento (opcional, valor predeterminado: el número de núcleos disponibles).

## Otras opciones de configuración del Worker {#other-worker-configuration-options}

Utilice la variable de entorno `VECTOR_HOSTNAME` para asignar un nombre de host único y ayudarle a identificar el Worker.

## Habilite el punto de conexión de verificación de estado y los sondeos de actividad y preparación {#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes}

Configure la verificación de estado de su balanceador de carga con el punto de conexión `/health` para verificar que el Worker esté en funcionamiento. Consulte [Configuraciones del balanceador de carga][13] para obtener más recomendaciones sobre cómo configurar un balanceador de carga frente al Worker.

Para Kubernetes, los sondeos de actividad y preparación están habilitados de forma predeterminada en el [gráfico de Helm][9] y en el archivo [values.yaml][10]. Estos sondeos verifican un socket TCP en el puerto de la API del Worker en lugar del `/health` punto de conexión.

Para otras instalaciones, como las basadas en VM, debe establecer `DD_OP_API_ENABLED` en `true` y establecer `DD_OP_API_ADDRESS` en `0.0.0.0:8686` para exponer el punto de conexión `/health`. Un ejemplo de configuración:

```
api:
  enabled: true
  address: "0.0.0.0:8686"
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /es/getting_started/site/
[4]: /es/agent/configuration/proxy/?tab=linux#environment-variables
[5]: https://en.wikipedia.org/wiki/HTTP_tunnel
[6]: /es/remote_configuration
[7]: /es/observability_pipelines/set_up_pipelines/
[8]: /es/observability_pipelines/install_the_worker/worker_commands/#run-tap-or-top-the-worker
[9]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L33-L40
[10]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L303-L329
[11]: /es/remote_configuration/#security-considerations
[12]: /es/observability_pipelines/configuration/secrets_management/
[13]: /es/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#load-balancer-configurations