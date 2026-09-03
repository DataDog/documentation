---
description: Aprenda a recopilar registros enviados a través de una conexión de socket
  TCP o UDP utilizando el Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente Socket
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice la fuente Socket de Observability Pipelines para enviar registros al Worker a través de una conexión de socket (TCP o UDP).

## Requisitos previos {#prerequisites}

{{% observability_pipelines/prerequisites/socket %}}

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores para la dirección del socket y, si corresponde, la contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure esta fuente cuando [configure una canalización][1]. Puede configurar una canalización en la [interfaz de usuario][3], utilizando la [API][4] o con [Terraform][5]. Las instrucciones de esta sección son para configurar la fuente en la interfaz de usuario.

**Nota**: El Worker solo puede recibir registros a través de TCP o UDP. Si su aplicación escribe en un socket de dominio UNIX, consulte [sockets de dominio UNIX](#unix-domain-sockets) para obtener más información.

Después de seleccionar la fuente Socket en la interfaz de usuario de la canalización:

1.  Ingrese el identificador para su dirección de socket. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. En el menú desplegable {{< ui >}}Mode{{< /ui >}}, seleccione el tipo de socket que desea utilizar.
1. En el menú desplegable {{< ui >}}Framing{{< /ui >}}, seleccione cómo delimitar el flujo de eventos.
    <table>
        <colgroup>
            <col style="width:40%">
            <col style="width:60%">
        </colgroup>
        <thead>
            <tr>
                <th>MÉTODO DE ENMARCADO</th>
                <th>DESCRIPCIÓN</th>
            </tr>
        </thead>
        <tr>
            <td><code>newline_delimited</code></td>
            <td>Los marcos de bytes están delimitados por un carácter de nueva línea.</td>
        </tr>
        <tr>
            <td><code>bytes</code></td>
            <td>Los marcos de bytes se pasan tal cual según los límites de E/S subyacentes (por ejemplo, divididos entre mensajes o segmentos de flujo).</td>
        </tr>
        <tr>
            <td><code>character_delimited</code></td>
            <td>Los marcos de bytes están delimitados por un carácter elegido.</td>
        </tr>
        <tr>
            <td><code>chunked_gelf</code></td>
            <td>Los marcos de bytes son mensajes GELF fragmentados.</td>
        </tr>
        <tr>
            <td><code>octet_counting</code></td>
            <td>Los marcos de bytes están delimitados según el formato de conteo de octetos.</td>
        </tr>
    </table>

{{% observability_pipelines/secrets_env_var_note %}}

### Configuración de TLS opcional {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Sockets de dominio UNIX {#unix-domain-sockets}

La fuente Socket solo admite la recepción de registros a través de TCP o UDP. Si su aplicación escribe en un socket de dominio UNIX, utilice `socat` para conectarlo a un socket TCP o UDP y enviar los registros al Worker.

### Puente independiente {#standalone-bridge}

Ejecute `socat` junto con su aplicación para reenviar desde el socket UNIX al Worker:

```
socat UNIX-RECV:/var/run/app.sock TCP:<OPW_HOST>
```

Reemplace <OPW_HOST> con la dirección IP del servidor o la URL del balanceador de carga asociada con el Observability Pipelines Worker.

### Sidecar de Kubernetes {#kubernetes-sidecar}

En Kubernetes, el Worker normalmente se ejecuta como un StatefulSet detrás de un Service, por lo que no es accesible a través de `localhost`. Ejecute `socat` como un contenedor sidecar en el mismo pod que su aplicación y comparta un volumen para el archivo de socket. Por ejemplo:

```yaml
volumes:
  - name: app-socket
    emptyDir: {}

initContainers:
  # Remove any stale socket file before the sidecar starts
  - name: socket-cleanup
    image: busybox:1.36
    command: ["sh", "-c", "rm -f /var/run/app/app.sock"]
    volumeMounts:
      - name: app-socket
        mountPath: /var/run/app

containers:
  # Your application container
  - name: app
    # ...
    volumeMounts:
      - name: app-socket
        mountPath: /var/run/app

  # socat sidecar: bridges the UNIX socket to the Worker's Service
  - name: socat-opw-bridge
    image: alpine/socat:1.8.0.0
    args:
      - UNIX-RECV:/var/run/app/app.sock,fork
      - TCP:<RELEASE_NAME>-observability-pipelines-worker.<NAMESPACE>.svc.cluster.local:5000
    volumeMounts:
      - name: app-socket
        mountPath: /var/run/app

# Monitor and adjust resources as necessary
    resources:
      requests:
        cpu: 10m
        memory: 16Mi
    securityContext:
      runAsNonRoot: true
      runAsUser: 1000
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
```

Apunte el argumento `TCP` al punto de conexión del servicio de Kubernetes del Worker en lugar de `localhost`. No se garantiza que los pods del StatefulSet del Worker se ejecuten en cada nodo, por lo que es posible que el pod del Worker no sea accesible en `localhost`. Esto es especialmente cierto si tiene grupos de nodos dedicados para el Worker y sus cargas de trabajo.

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de dirección de socket:
	- Hace referencia a la dirección y el puerto donde el Observability Pipelines Worker escucha los registros entrantes.
	- El identificador predeterminado es `SOURCE_SOCKET_ADDRESS`.
- Identificador de frase de contraseña TLS del socket (cuando TLS está habilitado):
	- El identificador predeterminado es `SOURCE_SOCKET_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /es/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline