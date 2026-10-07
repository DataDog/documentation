---
aliases:
- /es/observability_pipelines/setup_opw/
disable_toc: false
further_reading:
- link: /observability_pipelines/log_volume_control/
  tag: Documentación
  text: Control del volumen de logs con Observability Pipelines
- link: /observability_pipelines/dual_ship_logs/
  tag: Documentación
  text: Logs de doble envío con Observability Pipelines
- link: /observability_pipelines/archive_logs/
  tag: Documentación
  text: Logs de archivos con Observability Pipelines
- link: /observability_pipelines/split_logs/
  tag: Documentación
  text: Dividir logs con Observability Pipelines
- link: /observability_pipelines/sensitive_data_redaction/
  tag: Documentación
  text: Ocultar datos escritos con Observability Pipelines
- link: /observability_pipelines/update_existing_pipelines/
  tag: Documentación
  text: Actualizar pipelines existentes
title: Configuraciones avanzadas
---

## Información general

Este documento explica el bootstrapping para el worker de Observability Pipelines.

## Opciones de bootstrap

<div class="alert alert-danger">Todas las rutas de archivos de configuración especificadas en el pipeline deben estar bajo <code>DD_OP_DATA_DIR/config</code>.
La modificación de archivos en esta localización, mientras OPW se está ejecutando, podría tener efectos negativos.
</div>

Realiza el bootstrapping del worker de Observability Pipelines dentro de tu infraestructura antes de configurar un pipeline. Estas variables de entorno son independientes de las variables de entorno del pipeline. Localización de los directorios y archivos relacionados:

- Directorio de datos por defecto: `var/lib/observability-pipelines-worker`
- Archivo de bootstrap: `/etc/observability-pipelines-worker/bootstrap.yaml`
- Archivo de variables de entorno: `/etc/default/observability-pipelines-worker`

**Nota**: `DD_OP_DATA_DIR` sólo puede pertenecer a un único worker de Observability Pipelines. Si tienes varios workers, debes utilizar directorios de datos únicos.

Para configurar las opciones de bootstrapping, realiza una de las siguientes acciones:
- Utiliza variables de entorno.
- Crea un `bootstrap.yaml` e inicia la instancia del worker con `--bootstrap-config /path/to/bootstrap.yaml`.

A continuación se muestra una lista de las opciones de bootstrap, sus variables de entorno de pipeline relacionadas y las variables que tienen una mayor precedencia (prioridad).

`api_key`
: **Variable de entorno de pipeline**: `DD_API_KEY`
: **Prioridad**: `DD_API_KEY`
: **Descripción**: Crea una [clave de API Datadog][1] para esta variable de entorno.

`pipeline_id`
: **Variable de entorno de pipeline**: `DD_OP_PIPELINE_ID`
: **Prioridad**: `DD_OP_PIPELINE_ID`
: **Descripción**: Crear un [ID de pipeline de Observability Pipelines][2] para esta variable de entorno.

`site`
: **Variable de entorno de pipeline**: `DD_SITE`
: **Prioridad**: `DD_SITE`
: **Descripción**: Tu sitio Datadog (opcional, por defecto: `datadoghq.com`).
: Para obtener más información, consulta [Empezando con sitios][3].

`data_dir`
: **Variable de entorno de pipeline**: `DD_OP_DATA_DIR`
: **Prioridad**: `DD_OP_DATA_DIR`
: **Descripción**: El directorio de datos (opcional, por defecto: `/var/lib/observability-pipelines-worker`). Este es el directorio del sistema de archivos que el worker de Observability Pipelines utiliza para el estado local.

`tags: []`
: **Variable de entorno de pipeline**: `DD_OP_TAGS`
: **Prioridad**: `DD_OP_TAGS`
: **Descripción**: Las etiquetas (tags) informadas con métricas internas que se pueden utilizar para filtrar instancias de Observability Pipelines para despliegues mediante configuración remota.

`threads`
: **Variable de entorno de pipeline**: `DD_OP_THREADS`
: **Prioridad**: `DD_OP_THREADS`
: **Descripción**: El número de subprocesos a utilizar para el procesamiento (opcional, por defecto: el número de núcleos disponibles).

`proxy`
: **Variable de entorno de pipeline**: `DD_PROXY_HTTP`, `DD_PROXY_HTTPS`, `DD_PROXY_NO_PROXY`
: Configura servidores proxy para el worker de Observability Pipelines. La configuración del proxy para el Worker funciona de la misma manera que para el [Datadog Agent][4].
: **Prioridad**: La configuración se aplica a todo el proceso del worker. Los valores HTTP y del proxy HTTPS se resuelven en este orden:
<br> 1. `DD_PROXY_HTTP(S)`
<br> 2. `HTTP(S)_PROXY`
<br> 3. `proxy`
:
: Ejemplo de configuración del proxy:
: proxy:<br> habilitado: true<br> https: https://foo.bar:3128
: **Descripción**: El worker de Observability Pipelines puede enrutar solicitudes externas a través de proxies de envío, como Squid. Los proxies de envío reenvían las solicitudes de los clientes del worker de Observability Pipelines a Internet. Puedes utilizarlos como cortafuegos web para prohibir o permitir determinados dominios, puertos o protocolos. Los proxies de envío no suele terminar SSL y, por tanto, no tienen acceso al contenido de la solicitud. Sólo pasan paquetes de ida y vuelta entre el cliente y el destino. Los [túneles HTTP][5] se utilizan para asegurar la comunicación a través de un proxy de envío.
: **Notas**:
: <li style="list-style-type: '- '">Esta opción está disponible para el worker de Observability Pipelines v2.1 y posteriores.</li>
: <li style="list-style-type: '- '">El worker de Observability Pipelines no puede enrutar solicitudes externas a través de proxies inversos, como HAProxy y NGINX</li>.
: <li style="list-style-type: '- '">Las variables de entorno <code>DD_PROXY_HTTP(S)</code> y <code>HTTP(S)_PROXY</code> deben estar ya exportadas en tu entorno para que el worker pueda resolverlas. No se pueden añadir al script de instalación del worker.</li>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /es/getting_started/site/
[4]: /es/agent/configuration/proxy/?tab=linux#environment-variables
[5]: https://en.wikipedia.org/wiki/HTTP_tunnel