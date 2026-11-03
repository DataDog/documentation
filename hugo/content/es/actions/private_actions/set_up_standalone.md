---
description: Instale, conecte, administre y actualice un ejecutor de acciones privado
  independiente que usted despliega y administra por su cuenta con Docker o Helm.
disable_toc: false
further_reading:
- link: actions/private_actions/
  tag: Documentación
  text: Descripción general de Private Actions
- link: actions/private_actions/set_up_agent_based
  tag: Documentación
  text: Configure un ejecutor de acciones privado en el Datadog Agent
- link: actions/connections
  tag: Documentación
  text: Conexiones
title: Configure un ejecutor de acciones privado independiente
---
## Descripción general {#overview}

El ejecutor de acciones privado independiente es un contenedor dedicado que puede instalar y administrar independientemente del Datadog Agent con Docker o Helm. Es compatible y está en modo de mantenimiento: continúa recibiendo actualizaciones de seguridad y estabilidad, y no hay nuevas funciones planificadas. Para nuevos despliegues, y para usar Políticas de ejecución, ejecute el ejecutor en el Datadog Agent en su lugar. Consulte [Set up a private action runner in the Datadog Agent][1].

La configuración del ejecutor requiere tres pasos:

1. [**Instale**](#install-the-runner) el ejecutor con Docker, Docker Compose o Kubernetes.
1. [**Conecte**](#connect-the-runner) el ejecutor a Datadog con una conexión.
1. [**Actualice**](#update-the-runner) el ejecutor a medida que se lancen nuevas versiones.

Un ejecutor independiente siempre tiene un **propietario**: crearlo, mediante cualquiera de los métodos a continuación, siempre lo registra bajo el usuario que lo crea, autorizado con [Connections][2].

## Requisitos previos {#prerequisites}

- Docker o un clúster de Kubernetes.
- Acceso de red a Datadog en `https://{{< region-param key=dd_site >}}` and `https://config.{{< region-param key=dd_site >}}`.

## Instale el ejecutor {#install-the-runner}

1. En Datadog, navegue a [**Action Catalog > Private Action Runners**][3] y haga clic en **New Private Action Runner**.
1. Ingrese un nombre para su ejecutor de acciones privado y seleccione las acciones permitidas.
1. Cree un directorio en su servidor donde el ejecutor de acciones privado pueda almacenar su configuración, como `./config`.
1. Implemente su ejecutor de acciones privado siguiendo los pasos para su plataforma de contenedores:

{{< tabs >}}
{{% tab "Docker" %}}

1. Haga clic en **Docker**.
1. Ejecute el comando `docker run` proporcionado en su servidor, reemplazando `./config` con la ruta al directorio que creó para la configuración del ejecutor de acciones privado.

**Nota**: Puede ignorar sin problemas el error `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.

{{% /tab %}}
{{% tab "Docker Compose" %}}

1. Haga clic en **Docker Compose**.
1. Cree un archivo `docker-compose.yaml` y agregue el YAML proporcionado, o agregue la sección `runner` a un archivo de Docker Compose existente.
1. Reemplace `./config` con la ruta al directorio que creó para la configuración del ejecutor de acciones privado.
1. Ejecute `docker compose up -d`.

**Nota**: Puede ignorar sin problemas el error `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

1. Haga clic en **Kubernetes**.
1. Confirme que `kubectl` y `helm` estén instalados, y que tenga los permisos suficientes para crear recursos de Kubernetes en su clúster.
1. Siga las instrucciones proporcionadas en la aplicación para registrar el runner, generar la configuración, agregar el repositorio de Helm de Private Action Runner e instalar el gráfico.
1. Ejecute `kubectl get pods -w` y verifique que el estado del pod del ejecutor de acciones privado cambie a **Ready**.

{{% /tab %}}
{{< /tabs >}}

## Alternativa: instalación programática {#alternative-programmatic-installation}

Como alternativa a la configuración basada en la interfaz de usuario anterior, puede registrar y configurar un ejecutor de acciones privado independiente de forma programática utilizando su clave de API y su clave de aplicación. Este enfoque es adecuado para implementaciones automatizadas, canalizaciones de CI/CD y flujos de trabajo de infraestructura como código. Al igual que la configuración basada en la interfaz de usuario, esto siempre crea un ejecutor de acciones privado propio. A pesar del nombre de la bandera `--with-api-key`, esta ruta aún requiere una clave de aplicación: el ejecutor utiliza ambas credenciales juntas para registrarse y asignar al propietario de la clave de aplicación como Editor del ejecutor.

Para configurar el ejecutor de acciones privado mediante programación:

1. Proporcione sus claves de API y de aplicación de Datadog a través de las variables de entorno `DD_API_KEY` y `DD_APP_KEY`.
1. Pase la bandera `--with-api-key` al contenedor del ejecutor de acciones privado.

{{< tabs >}}
{{% tab "Docker" %}}

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run -d \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME=<YOUR_RUNNER_NAME> \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

```yaml
services:
  private-runner:
    image: gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
    command: ["--with-api-key"]
    environment:
      DD_API_KEY: ${DD_API_KEY}
      DD_APP_KEY: ${DD_APP_KEY}
      DD_BASE_URL: https://{{< region-param key=dd_site >}}
      DD_PRIVATE_RUNNER_CONFIG_DIR: /etc/dd-action-runner/config
      RUNNER_NAME: my-compose-runner
    volumes:
      - "./config:/etc/dd-action-runner/config"
```

Ejecute con:

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"
docker compose up -d
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Genere la configuración del ejecutor de acciones privado:

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME="my-runner" \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key --enroll -f helm-values > values.yaml
```

Implemente el gráfico de Helm:

```bash
helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

Cuando el ejecutor muestre **Ready to use**, cree una conexión para él o visualícelo en la página **Private Action Runners**.

## Certificados de CA personalizados {#custom-ca-certificates}

Si su organización utiliza una autoridad de certificación (CA) personalizada para emitir certificados para servicios internos, como puntos finales HTTP o Jenkins, puede configurar un ejecutor de acciones privado independiente para que confíe en esa CA.

{{< tabs >}}
{{% tab "Docker" %}}

Agregue la variable de entorno `SSL_CERT_DIR` y monte su certificado en el comando `docker run`, reemplazando `<PATH_TO_YOUR_CA_CERTIFICATE>` con la ruta a su archivo de certificado de CA:

{{< highlight bash "hl_lines=7 9" >}}
docker run -d \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME=<YOUR_RUNNER_NAME> \
  -e SSL_CERT_DIR=/etc/dd-action-runner/config/ca-certificates \
  -v ./config:/etc/dd-action-runner/config \
  -v <PATH_TO_YOUR_CA_CERTIFICATE>:/etc/dd-action-runner/config/ca-certificates/ca.crt \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key
{{< /highlight >}}

{{% /tab %}}
{{% tab "Docker Compose" %}}

Agregue la variable de entorno `SSL_CERT_DIR` y monte su certificado en su archivo `docker-compose.yaml`, reemplazando `<PATH_TO_YOUR_CA_CERTIFICATE>` con la ruta a su archivo de certificado de CA:

```yaml
services:
  private-runner:
    environment:
      SSL_CERT_DIR: /etc/dd-action-runner/config/ca-certificates
    volumes:
      - "<PATH_TO_YOUR_CA_CERTIFICATE>:/etc/dd-action-runner/config/ca-certificates/ca.crt"
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Cree un ConfigMap que contenga su certificado de CA:

   ```bash
   kubectl create configmap my-ca-cert --from-file=ca.crt=./my-custom-ca.pem
   ```

1. En su archivo `values.yaml` de Helm, haga referencia al ConfigMap:

   ```yaml
   runner:
     customCaCert:
       configMapName: my-ca-cert
   ```

1. Aplique los valores actualizados:

   ```bash
   helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f values.yaml
   ```

{{% /tab %}}
{{< /tabs >}}

## Conecte el ejecutor {#connect-the-runner}

Un ejecutor de acciones privado independiente siempre está asignado a un propietario y utiliza el modelo de autorización de Connections. Una conexión almacena las credenciales de un servicio y las vincula con el ejecutor de acciones privado. Para crear una conexión y vincularla con su ejecutor de acciones privado, consulte [Connections][2]. Para saber cómo funcionan los permisos en el propio ejecutor de acciones privado, consulte [Manage access to owned runners][4].

## Administrar el ejecutor de acciones privado{#manage-the-runner}

### Editar conexiones o eliminar un ejecutor de acciones privado{#edit-connections-or-delete-a-runner}

Desde la página **Private Action Runner** en Action Catalog, puede visualizar todos sus runners privados junto con los flujos de trabajo o aplicaciones que utiliza cada uno. Para editar las conexiones de un ejecutor de acciones privado, haga clic en **View Details**. Haga clic en el icono de la papelera para eliminar un ejecutor de acciones privado.

### Cambiar la lista de permitidos {#change-the-allowlist}

Para editar la lista de permitidos de un ejecutor de acciones privado independiente, edite la sección `actionsAllowlist` del archivo `config.yaml` en el entorno de su ejecutor de acciones privado y, a continuación, reinícielo reiniciando su contenedor o implementación.

## Actualizar el ejecutor de acciones privado{#update-the-runner}

Elija la pestaña que coincida con la forma en que instaló el ejecutor de acciones privado. Utilice la versión `v{{< private-action-runner-version "private-action-runner" >}}` actual en lugar de una etiqueta codificada de forma rígida.

{{< tabs >}}
{{% tab "Docker" %}}

Busque el ID actual de su contenedor:

```bash
docker ps
```

Detenga el contenedor:

```bash
docker stop <id>
```

Inicie un nuevo contenedor con [la imagen más reciente][101]. No se necesitan variables de entorno: todo está configurado en el archivo `config/config.yaml`.

```bash
docker run -d \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
```

Después de confirmar que la nueva versión funciona, elimine el contenedor antiguo:

```bash
docker rm <id>
```

[101]: https://api.datadoghq.com/api/v2/on-prem-management-service/runner/latest-image

{{% /tab %}}
{{% tab "Docker Compose" %}}

Navegue al directorio que contiene su archivo `docker-compose.yaml` y actualice la versión de la imagen:

```yaml
services:
  private-actions-runner:
    image: gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
```

Inicie el contenedor de nuevo:

```bash
docker compose up -d
```

{{% /tab %}}
{{% tab "Helm" %}}

Existen dos opciones para actualizar con Helm:

1. **(Recomendado)** Actualice el chart, lo cual utiliza la versión más reciente del ejecutor de acciones privado. Puede haber cambios en el chart; revise [el registro de cambios][101].
1. Actualice solo el ejecutor de acciones privado, sin actualizar el chart.

**Actualización del chart (recomendado):**

```bash
helm repo update
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

**Actualización solo del ejecutor de acciones privado:** especifique la versión del ejecutor de acciones privado en `values.yaml` bajo la clave `common.image.tag` con un valor del [archivo de valores del chart][102].

```yaml
common:
  image:
    tag: v{{< private-action-runner-version "private-action-runner" >}}
```

Luego ejecute:

```bash
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

[101]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/CHANGELOG.md
[102]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/private_actions/set_up_agent_based/
[2]: /es/actions/connections/
[3]: https://app.datadoghq.com/actions/private-action-runners
[4]: /es/actions/private_actions/enroll_runner/#manage-access-to-owned-runners