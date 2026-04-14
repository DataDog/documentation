---
aliases:
- /es/synthetics/private_locations
description: Ejecutar tests de API y de navegador Synthetic desde localizaciones privadas
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: Blog
  text: Monitorizar tus localizaciones privadas Synthetic con Datadog
- link: /getting_started/synthetics/private_location
  tag: Documentación
  text: Empezando con las localizaciones privadas
- link: /synthetics/private_locations/monitoring
  tag: Documentación
  text: Monitorizar tus localizaciones privadas
- link: /synthetics/private_locations/dimensioning
  tag: Documentación
  text: Dimensionar tus localizaciones privadas
- link: /synthetics/api_tests
  tag: Documentación
  text: Configurar un test de API
- link: https://www.datadoghq.com/architecture/protect-sensitive-data-with-synthetics-private-location-runners/
  tag: Centro de arquitectura
  text: Protege los datos confidenciales con los ejecutores de localización privada
    de Synthetics
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
  tag: Sitio externo
  text: Crear y gestionar localizaciones privadas Synthetic con Terraform
title: Ejecutar tests Synthetic desde localizaciones privadas
---

## Información general

Las localizaciones privadas permiten **monitorizar aplicaciones internas o cualquier endpoint privado** que no resultan accesibles a través de la red pública de Internet. También pueden utilizarse para:

* **Crear localizaciones de Synthetic** en áreas consideradas críticas para el desarrollo de tu negocio.
* **Verificar el rendimiento de la aplicación en tu entorno interno de integración continua** antes de lanzar nuevas funciones a la fase de producción con [tests continuos y (CI/CD)][28].
* **Comparar el rendimiento de la aplicación** desde dentro y fuera de tu red interna.

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Diagrama de arquitectura que muestra cómo funciona una localización privada durante la monitorización Synthetic" style="width:100%;">}}

Las localizaciones privadas vienen como contenedores Docker o servicios de Windows que puedes instalar en tu red privada. Después de crear e instalar una localización privada, puedes asignarle [tests de Synthetic][29], como a cualquier localización gestionada.

El worker de tu localización privada extrae tus configuraciones de test de los servidores de Datadog utilizando HTTPS, ejecuta el test de forma programada o bajo demanda y devuelve los resultados a los servidores de Datadog. A continuación, puedes ver los resultados de tus tests de localizaciones privadas exactamente de la misma forma que verías los tests que se ejecutan desde localizaciones gestionadas:

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Asignar un test Synthetic a una localización privada" style="width:100%;">}}

## Requisitos previos

Para utilizar localizaciones privadas para [tests continuos][23], necesitas v1.27.0 o posterior.

{{< tabs >}}
{{% tab "Docker" %}}

Las localizaciones privadas son contenedores Docker que puedes instalar en cualquier lugar de tu red privada. Puedes acceder a la [imagen del worker de la localización privada][101] en el hub Docker. Puede ejecutarse en un sistema operativo basado en Linux o un sistema operativo Windows, si el [motor Docker][102] está disponible en tu host y puede ejecutarse en modo de contenedor Linux.**\***

{{< site-region region="gov" >}}

Si necesitas compatibilidad con FIPS, utiliza la [imagen compatible con FIPS][26] en el centro de Docker.

[26]: https://hub.docker.com/repository/docker/datadog/synthetics-private-location-worker-fips/general

{{< /site-region >}}

**\*** **El uso y el funcionamiento de este software se rigen por el Acuerdo de licencia del usuario final, disponible [aquí][103]**.

[101]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[102]: https://docs.docker.com/engine/install/
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Helm" %}}

Las localizaciones privadas son despliegues de Kubernetes que puedes instalar en tu clúster Kubernetes utilizando Helm. El [Helm Chart][101] puede ejecutarse en Kubernetes basado en Linux.

**Nota**: El uso y el funcionamiento de este software se rigen por el [Acuerdo de licencia del usuario final[103].

[101]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Windows" %}}

Las localizaciones privadas son servicios de Windows que puedes instalar en cualquier lugar de tu red privada utilizando un [archivo MSI][101]. Ejecuta este archivo desde la máquina virtual o física en la que quieres instalar la localización privada.**\***

**\*** **El uso y el funcionamiento de este software se rigen por el Acuerdo de licencia del usuario final, disponible [aquí][102]**.

Los requisitos de esta máquina se enumeran en la tabla siguiente. Los scripts de PowerShell deben estar habilitados en el equipo en el que instalas el worker de la localización privada.

| Sistema | Requisitos |
|---|---|
| Sistema operativo | Windows Server 2022, Windows Server 2019, Windows Server 2016 o Windows 10. |
| RAM | 4GB mínimo. 8GB recomendado. |
| CPU | Procesador Intel o AMD compatible con 64 bits. Procesador de 2,8 GHz o superior recomendado. |

**Nota**: Para que las localizaciones privadas de Windows ejecuten tests de navegador, los navegadores (por ejemplo, Chrome, Edge o Firefox) deben estar instalados en el ordenador Windows.

Debes instalar .NET versión 4.7.2 o posterior en tu ordenador antes de utilizar el instalador de MSI.

{{< site-region region="gov" >}}

<div class="alert alert-warning">El cumplimiento de FIPS no es compatible con las localizaciones privadas que informan a <code>ddog-gov.com</code>. Para deshabilitar este comportamiento, utiliza la opción <a href="https://docs.datadoghq.com/synthetics/private_locations/configuration/?tab=docker#all-configuration-options"><code>--disableFipsCompliance</code></a>.</div>

{{< /site-region >}}

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[102]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{< /tabs >}}

### Endpoints de localizaciones privadas de Datadog

Para extraer configuraciones de test y enviar resultados de test, el worker de la localización privada necesita acceso a los siguientes endpoints de API de Datadog.

{{< site-region region="us" >}}

| Puerto | Endpoint                               | Descripción                                                   |
| ---- | -------------------------------------- | ------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.com`      | Utilizado por la localización privada para extraer configuraciones de test y enviar resultados de test en Datadog utilizando un protocolo interno basado en el [protocolo AWS Signature versión 4][1]. |
| 443  | `intake-v2.synthetics.datadoghq.com` para las versiones 0.2.0 o posteriores y 1.4.0 o anteriores   | Utilizado por la localización privada para extraer artefactos de test de navegador, como capturas de pantalla, errores y recursos.       |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="eu" >}}

| Puerto | Endpoint                           | Descripción                                                    |
| ---- | ---------------------------------- | -------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.eu`   | Utilizado por la localización privada para extraer configuraciones de test y enviar resultados de test en Datadog utilizando un protocolo interno basado en el [protocolo AWS Signature versión 4][1]. |

**Nota**: Estos dominios apuntan a un conjunto de direcciones IP estáticas. Estas direcciones se pueden encontrar en https://ip-ranges.datadoghq.eu.

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="us3" >}}

| Puerto | Endpoint                                | Descripción                                                                        |
| ---- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.us3.datadoghq.com`  | Utilizado por la localización privada para extraer configuraciones de test y enviar resultados de test en Datadog utilizando un protocolo interno basado en el [protocolo AWS Signature versión 4][1]. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="ap1" >}}

| Puerto | Endpoint                                | Descripción                                                                        |
| ---- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.ap1.datadoghq.com`  | Utilizado por la localización privada para extraer configuraciones de test y enviar resultados de test en Datadog utilizando un protocolo interno basado en el [protocolo AWS Signature versión 4][1]. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="ap2" >}}

| Puerto | Endpoint                                | Descripción                                                                        |
| ---- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.ap2.datadoghq.com`  | Utilizado por la localización privada para extraer configuraciones de test y enviar resultados de test en Datadog utilizando un protocolo interno basado en el [protocolo AWS Signature versión 4][1]. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="us5" >}}

| Puerto | Endpoint                              | Descripción                                                    |
| ---- | ------------------------------------- | -------------------------------------------------------------- |
| 443  | `intake.synthetics.us5.datadoghq.com` | Utilizado por la localización privada para extraer configuraciones de test y enviar resultados de test en Datadog utilizando un protocolo interno basado en el [protocolo AWS Signature versión 4][1]. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="gov" >}}

| Puerto | Endpoint                         | Descripción                                                                                                                                                                                                                                                                       |
|------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 443  | `intake.synthetics.ddog-gov.com` | Utilizado por la localización privada para extraer configuraciones de test y enviar resultados de test en Datadog utilizando un protocolo interno basado en el [protocolo AWS Signature versión 4][1]. Para la versión 1.32.0 y posteriores, estas solicitudes son compatibles con el Estándar federal de procesamiento de información (FIPS). |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

## Configuración de tu localización privada

Sólo los usuarios con el rol **Synthetics Private Locations Write** pueden crear localizaciones privadas. Para obtener más información, consulta [Permisos](#permissions).

### Creación de tu localización privada

Ve a [**Monitorización Synthetic** > **Parámetros** > **Localizaciones privadas**][22] y haz clic en **Add Private Location** (Añadir localización privada).

{{< img src="synthetics/private_locations/synthetics_pl_add_1.png" alt="Crear una localización privada" style="width:90%;">}}

Rellena la información de tu localización privada:

1. Especifica el **nombre** y la **descripción** de tu localización privada.
2. Añade cualquier **Etiqueta** (tag) que quieras asociar a tu localización privada.
3. Selecciona una de tus **claves de API** actuales. Al seleccionar una clave de API, se posibilita la comunicación entre tu localización privada y Datadog. Si aún no tienes una clave de API, haz clic en **Generate API key** (Generar clave de API) para crear una en la página correspondiente. Sólo son obligatorios los campos `Name` y `API key`.
4. Configura el acceso para tu localización privada y haz clic en **Save Location and Generate Configuration File** (Guardar localización y generar archivo de configuración). Datadog creará tu localización privada y generará el archivo de configuración asociado.

{{< img src="synthetics/private_locations/pl_creation_1.png" alt="Añadir detalles a una localización privada" style="width:85%;">}}

### Configuración de tu localización privada

Configura tu localización privada personalizando el archivo de configuración generado. Cuando añadas parámetros de configuración inicial como [proxies](#proxy-configuration) e [IP reservadas bloqueadas](#blocking-reserved-ips) en el **Paso 3**, el archivo de configuración generado se actualizará automáticamente en el **Paso 4**.

Puedes acceder a opciones avanzadas para ajustar la configuración en función de tu configuración de red interna. Para obtener más información sobre el comando `help`, consulta [Configuración][5].

#### Configuración del proxy

Si el tráfico entre tu localización privada y Datadog debe ir a través de un proxy, especifica la URL del proxy como `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` para añadir el parámetro `proxyDatadog` asociado al archivo de configuración generado.

{{<img src="synthetics/private_locations/pl_proxy_1.png" alt="Add a proxy to your private location configuration file" style="width:90%;">}}

#### Bloqueo de direcciones IP reservadas

De forma predeterminada, los usuarios de Synthetic pueden crear tests Synthetic en endpoints utilizando cualquier dirección IP. Si quieres impedir que los usuarios creen tests en direcciones IP internas confidenciales de tu red, activa el botón **Block reserved IPs** (Bloquear IP reservadas) para bloquear un conjunto predeterminado de intervalos de direcciones IP reservadas ([registro de direcciones IPv4][6] y [registro de direcciones IPv6][7]) y configura el parámetro `enableDefaultBlockedIpRanges` asociado como `true` en el archivo de configuración generado.

Si algunos de los endpoints a los que quieres hacer un test se encuentran dentro de uno o varios intervalos de direcciones IP reservadas bloqueadas, puedes añadir sus IP o CIDR a las listas de permisos para añadir los parámetros `allowedIPRanges` asociados al archivo de configuración generado.

{{< img src="synthetics/private_locations/pl_reserved_ips_1.png" alt="Configurar direcciones IP reservadas" style="width:90%;">}}

### Visualizar tu archivo de configuración

Luego de añadir las opciones correspondientes al archivo de configuración de tu localización privada, puedes copiar y pegar este archivo en tu directorio de trabajo. El archivo de configuración contiene secretos para la autenticación de localizaciones privadas, el descifrado de configuraciones de tests y el cifrado de resultados de tests.

{{< img src="synthetics/private_locations/pl_view_file_1.png" alt="Configurar direcciones IP reservadas" style="width:90%;">}}

Como Datadog no almacena tus secretos, debes almacenarlos localmente antes de hacer clic en **View Installation Instructions** (Ver instrucciones de instalación).

**Nota:** Debes poder volver a hacer referencia a estos secretos, si decides añadir más workers o instalar workers en otro host.

### Instalación de tu localización privada

Puedes utilizar las variables de entorno  `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` y `DATADOG_PRIVATE_KEY` en tu definición de tarea.

Inicia tu localización privada en:

{{< tabs >}}
{{% tab "Docker" %}}

Ejecuta este comando para iniciar el worker de la localización privada montando tu archivo de configuración en el contenedor. Asegúrate de que tu archivo `<MY_WORKER_CONFIG_FILE_NAME>.json` está en `/etc/docker` y no la carpeta de inicio raíz:

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**Nota:** Si tienes direcciones IP bloqueadas reservadas, añade [funcionalidades de Linux] `NET_ADMIN`[26] a tu contenedor de localización privada.

Este comando inicia un contenedor Docker y prepara tu localización privada para realizar tests. **Datadog recomienda ejecutar el contenedor en modo independiente con la política de reinicio adecuada.**

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Docker Compose" %}}

1. Crea un archivo con `docker-compose.yml`:

    ```yaml
    version: "3"
    services:
        synthetics-private-location-worker:
            image: datadog/synthetics-private-location-worker:latest
            volumes:
                - PATH_TO_PRIVATE_LOCATION_CONFIG_FILE:/etc/datadog/synthetics-check-runner.json
    ```
    **Nota:** Si ha bloqueado IPs reservadas, añada las [Linux capacidades][26] de `NET_ADMIN` a su contenedor de ubicaciones privadas.

2. Empieza tu contenedor con:

    ```shell
    docker-compose -f docker-compose.yml up
    ```
[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Podman" %}}
La configuración de Podman es muy similar a Docker, sin embargo, debes configurar `NET_RAW` como una capacidad adicional para admitir tests de ICMP.

1. Ejecuta `sysctl -w "net.ipv4.ping_group_range = 0 2147483647"` desde el host donde se ejecuta el contenedor.
2. Ejecuta este comando para iniciar el worker de la localización privada montando tu archivo de configuración en el contenedor. Asegúrate de que tu archivo `<MY_WORKER_CONFIG_FILE_NAME>.json` esté accesible para montarlo en el contendor:

   ```shell
   podman run --cap-add=NET_RAW --rm -it -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json gcr.io/datadoghq/synthetics-private-location-worker:latest
   ```

   Si tienes direcciones IP reservadas bloqueadas configuradas, añade las funcionalidades de Linux `NET_ADMIN` a tu contenedor de localización privada.

Este comando inicia un contenedor Podman y prepara tu localización privada para realizar tests. Datadog recomienda ejecutar el contenedor en modo independiente con la política de reinicio adecuada.
{{< /tab >}}

{{% tab "Despliegue Kubernetes" %}}

Para desplegar el worker de localizaciones privadas de forma segura, configura y monta un recurso de secreto de Kubernetes en el contenedor en `/etc/datadog/synthetics-check-runner.json`.

1. Crea un secreto de Kubernetes con el archivo JSON creado anteriormente, ejecutando lo siguiente:

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Utiliza despliegues para describir el estado deseado asociado a tus localizaciones privadas. Crea el siguiente archivo `private-location-worker-deployment.yaml`:

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: datadog-private-location-worker
      namespace: default
    spec:
      selector:
        matchLabels:
          app: private-location
      template:
        metadata:
          name: datadog-private-location-worker
          labels:
            app: private-location
        spec:
          containers:
          - name: datadog-private-location-worker
            image: datadog/synthetics-private-location-worker
            volumeMounts:
            - mountPath: /etc/datadog/synthetics-check-runner.json
              name: worker-config
              subPath: <MY_WORKER_CONFIG_FILE_NAME>
          volumes:
          - name: worker-config
            secret:
              secretName: private-location-worker-config
    ```

    **Nota:** Si tienes direcciones IP bloqueadas reservadas, añade [funcionalidades de Linux][26] `NET_ADMIN` a tu contenedor de localización privada.

3. Aplica la configuración:

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

Para OpenShift, ejecuta la localización privada con el SCC `anyuid`. Esto es necesario para que se ejecute tu test de navegador.

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Helm Chart" %}}

Puedes configurar variables de entorno en tus parámetros de configuración que apunten a secretos ya configurados. Para crear variables de entorno con secretos, consulta la [documentación de Kubernetes][3].

También puedes hacer lo siguiente:

1. Añade la [localización privada Synthetics de Datadog][2] a tus repositorios Helm:

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

2. Instala el chart con el nombre de la versión `<RELEASE_NAME>` utilizando el archivo JSON creado anteriormente:

    ```shell
    helm install <RELEASE_NAME> datadog/synthetics-private-location --set-file configFile=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

**Nota:** Si tienes direcciones IP bloqueadas reservadas, añade [funcionalidades de Linux] `NET_ADMIN`[26] a tu contenedor de localización privada.

[2]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#define-container-environment-variables-using-secret-data
[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "ECS" %}}

Crea una nueva definición de tarea de EC2 que coincida con lo siguiente. Sustituye cada parámetro con el valor correspondiente de tu archivo de configuración de localización privada generado anteriormente:

```yaml
{
    ...
    "containerDefinitions": [
        {
            "command": [
                "--site='...'",
                "--locationID='...'",
                "--accessKey='...'",
                "--datadogApiKey='...'",
                "--secretAccessKey='...'",
                "--privateKey='-----BEGIN RSA PRIVATE KEY-----XXXXXXXX-----END RSA PRIVATE KEY-----'",
                "--publicKey.pem='-----BEGIN PUBLIC KEY-----XXXXXXXX-----END PUBLIC KEY-----'",
                "--publicKey.fingerprint='...'"
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2"
    ],
    ...
}
```
**Notas:**

- Si tienes direcciones IP reservadas bloqueadas, configura un [parámetro de Linux][31] para conceder funcionalidades `NET_ADMIN` a tus contenedores de localización privada.
- Si utilizas las variables de entorno `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` y `DATADOG_PRIVATE_KEY`, no es necesario incluirlas en la sección `"command": [ ]`.

[31]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{< /tab >}}

{{% tab "Fargate" %}}

Crea una nueva definición de tarea de Fargate que coincida con lo siguiente. Sustituye cada parámetro con el valor correspondiente de tu archivo de configuración de localización privada generado anteriormente:

```yaml
{
    ...
    "containerDefinitions": [
        {
            "command": [
                "--site='...'",
                "--locationID='...'",
                "--accessKey='...'",
                "--datadogApiKey='...'",
                "--secretAccessKey='...'",
                "--privateKey='-----BEGIN RSA PRIVATE KEY-----XXXXXXXX-----END RSA PRIVATE KEY-----'",
                "--publicKey.pem='-----BEGIN PUBLIC KEY-----XXXXXXXX-----END PUBLIC KEY-----'",
                "--publicKey.fingerprint='...'"
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2",
        "FARGATE"
    ],
    ...
}
```

**Nota:** Como la opción de firewall de localización privada no es compatible con AWS Fargate, no es posible configurar el parámetro `enableDefaultBlockedIpRanges` como `true`.

{{< /tab >}}

{{% tab "Fargate con AWS Secret Manager" %}}

Crea un secreto en AWS Secret Manager para almacenar toda o parte de la configuración de localización privada generada anteriormente. Ten en cuenta que la `publicKey` no puede guardarse tal cual en el archivo de configuración. Por ejemplo:

```json
{
    "datadogApiKey": "...",
    "id": "...",
    "site": "...",
    "accessKey": "...",
    "secretAccessKey": "...",
    "privateKey": "...",
    "pem": "...",
    "fingerprint": "..."
}
```

Se requieren permisos para permitir que la definición de tarea y la instancia de AWS Fargate lean en Secret Manager. Consulta [Especificación de datos confidenciales mediante secretos de Secret Manager en Amazon ECS][25] para obtener más información.

Crea una definición de tarea de Fargate que coincida con el siguiente ejemplo, sustituyendo los valores de la lista de secretos por el ARN del secreto que creaste en el paso anterior. Por ejemplo: `arn:aws:secretsmanager:<region>:<account-id>:secret:<secret_arn>:<secret_key>::`.

Si no guardaste toda la configuración en el gestor de secretos, aún puedes pasar el valor como argumentos de cadena hardcoded.

```yaml
{
    ...
    "containerDefinitions": [
        {
            "entryPoint": [
                "/bin/bash",
                "-c"
            ],
            "command": [
                "/home/dog/scripts/entrypoint.sh --locationID=$locationID --publicKey.fingerprint=$fingerprint"
            ],
            "secrets": [
              {
                "name": "DATADOG_ACCESS_KEY",
                "valueFrom": "..."
              },
              {
                "name": "DATADOG_API_KEY",
                "valueFrom": "...",
              },
              {
                "name": "fingerprint",
                "valueFrom": "...",
              },
              {
                "name": "locationID",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_PUBLIC_KEY_PEM",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_PRIVATE_KEY",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_SECRET_ACCESS_KEY",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_SITE",
                "valueFrom": "...",
              }
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2",
        "FARGATE"
    ],
    ...
}
```

**Nota:** Como la opción de firewall de localización privada no es compatible con AWS Fargate, no es posible configurar el parámetro `enableDefaultBlockedIpRanges` como `true`.

[25]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html

{{< /tab >}}

{{% tab "EKS" %}}

Como Datadog ya se integra con Kubernetes y AWS, está preparado para monitorizar EKS.

1. Crea un secreto de Kubernetes con el archivo JSON creado anteriormente, ejecutando lo siguiente:

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Utiliza despliegues para describir el estado deseado asociado a tus localizaciones privadas. Crea el siguiente archivo `private-location-worker-deployment.yaml`:

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: datadog-private-location-worker
      namespace: default
    spec:
      selector:
        matchLabels:
          app: private-location
      template:
        metadata:
          name: datadog-private-location-worker
          labels:
            app: private-location
        spec:
          containers:
          - name: datadog-private-location-worker
            image: datadog/synthetics-private-location-worker
            volumeMounts:
            - mountPath: /etc/datadog/synthetics-check-runner.json
              name: worker-config
              subPath: <MY_WORKER_CONFIG_FILE_NAME>
          volumes:
          - name: worker-config
            configMap:
              name: private-location-worker-config
    ```

    **Nota:** Si tienes direcciones IP reservadas bloqueadas, configura un contexto de seguridad para conceder [funcionalidades de Linux][26] `NET_ADMIN` a tus contenedores de localización privada.

3. Aplica la configuración:

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Windows via GUI" %}}

1. Descarga el archivo [`datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi`][101] y ejecútalo desde la máquina en la que deseas instalar la localización privada.
1. Haz clic en **Next** (Siguiente) en la página de bienvenida, lee el EULA y acepta los términos y condiciones. Luego, haz clic en **Next** (Siguiente).
1. Modifica dónde se instalará la aplicación o deja la configuración predeterminada. Haz clic en **Next** (Siguiente).
1. Para configurar tu localización Windows privada, puedes:
   - Pegar e introducir una configuración JSON para tu worker de la localización privada Synthetics de Datadog. Este archivo es generado por Datadog cuando [creas una localización privada][102].
   - Busca o escribe una ruta de acceso a un archivo que contenga una configuración JSON para tu worker de la localización privada Synthetics de Datadog.
   - Una vez finalizada la instalación, puedes dejarla en blanco y ejecutar `C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=<PathToYourConfiguration>` en la línea de comandos Windows.

   {{< img src="synthetics/private_locations/configuration_selector_paste.png" alt="Asistente del worker de la localización privada Synthetics, instalador MSI. La opción 'Pegar en una configuración JSON' está seleccionada. Se muestra un campo de texto para esta configuración JSON." style="width:80%;" >}}

1. Puedes aplicar las siguientes opciones de configuración:

   {{< img src="synthetics/private_locations/settings.png" alt="Asistente del worker de la localización privada Synthetics, instalador MSI. Se muestran los parámetros de firewalls y logs." style="width:80%;" >}}

   Aplica las reglas de firewall que necesita este programa a Windows Firewall
   : Permite que el instalador aplique reglas de firewall durante la instalación y las elimine durante la desinstalación.

   Aplica reglas para bloquear direcciones IP reservadas en Windows Firewall
   : Configura reglas de bloqueo para Chrome, Firefox y Edge (si están instalados) y añade reglas para bloquear rangos de direcciones IP reservadas salientes en Windows Firewall.

   Habilita el registro de archivos
   : Permite que el worker de la localización privada Synthetics registre archivos en el directorio de instalación.

   Días de rotación de logs
   : Especifica cuántos días conservar logs antes de eliminarlos del sistema local.

   Verbosidad del registro
   : Especifica la verbosidad de la consola y el registro de archivos para el el worker de la localización privada Synthetics.

1. Haz clic en **Next** (Siguiente) e **Install** (Instalar) para iniciar el proceso de instalación.

Una vez completado el proceso, haz clic en **Finish** (Finalizar) en la página de finalización de la instalación.

<div class="alert alert-danger">Si introdujiste tu configuración JSON, el servicio de Windows comienza a ejecutarse utilizando esa configuración. Si no introdujiste tu configuración JSON, ejecuta <code>C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=< PathToYourConfiguration ></code> desde un símbolo del sistema o utilice el acceso directo del <code>menú de inicio</code> para iniciar el worker de la localización privada Synthetics.</div>

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[102]: https://app.datadoghq.com/synthetics/settings/private-locations

{{< /tab >}}

{{% tab "Windows via CLI" %}}

1. Descarga el archivo [`datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi`][101] y ejecútalo desde la máquina en la que deseas instalar la localización privada.
2. Ejecuta uno de los siguientes comandos dentro del directorio en el que descargaste el instalador.

   - En un terminal PowerShell:

     ```powershell
     Start-Process msiexec "/i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi /quiet /qn WORKERCONFIG_FILEPATH=C:\ProgramData\Datadog-Synthetics\worker-config.json";
     ```

   - O en un terminal de comandos:

     ```cmd
     msiexec /i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi /quiet /qn WORKERCONFIG_FILEPATH=C:\ProgramData\Datadog-Synthetics\worker-config.json
     ```

Se pueden añadir parámetros adicionales:

| Parámetro opcional | Definición | Valor | Valor por defecto | Tipo |
|---|---|---|---|---|
| APPLYDEFAULTFIREWALLRULES | Aplica las reglas de firewall necesarias para el programa. | 1 | N/A | 0: Deshabilitado<br>1: Habilitado |
| APPLYFIREWALLDEFAULTBLOCKRULES | Bloquea las direcciones IP reservadas para cada navegador que tengas instalado (Chrome, Edge y Firefox). El bloqueo de conexiones loopback no es posible en Windows Firewall. | 0 | N/A | 0: Deshabilitado<br>1: Habilitado |
| LOGGING_ENABLED | Cuando se habilita, se configura el registro de archivos. Estos logs se almacenan en el directorio de instalación en la carpeta de logs. | 0 | `--enableFileLogging` | 0: Deshabilitado<br>1: Habilitado |
| LOGGING_VERBOSITY | Configura la verbosidad del registro para el programa. Esto afecta a la consola y a los logs de archivo. | Esto afecta a la consola y a los logs de archivo. | `-vvv` | `-v`: Error<br>`-vv`: Advertencia<br>`-vvv`: Información<br>`vvvv`: Depurar |
| LOGGING_MAXDAYS | Número de días para conservar logs de archivo en el sistema antes de eliminarlos. Puede ser cualquier número cuando se ejecuta una instalación desatendida. | 7 | `--logFileMaxDays` | Entero |
| WORKERCONFIG_FILEPATH | Debe cambiarse por la ruta a tu archivo de configuración JSON del worker de la localización privada Synthetics. Escriba esta ruta entre comillas, si la ruta contiene espacios. | <None> | `--config` | Cadena |

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi

{{< /tab >}}
{{< /tabs >}}

Para obtener más información sobre parámetros de localizaciones privadas para administradores, consulta [Configuración][32].

#### Certificados raíz

Puedes cargar certificados raíz personalizados en tus localizaciones privadas para que tus tests de API y de navegador realicen el enlace SSL utilizando tus propios archivos `.pem`.

{{< tabs >}}
{{% tab "Contenedor Linux" %}}

A la hora de preparar tus contenedores de localizaciones privadas, monta los archivos `.pem` de certificado correspondientes en `/etc/datadog/certs` de la misma forma que el archivo de configuración de localización privada. Estos certificados se consideran CA de confianza y se utilizan en el tiempo de ejecución de test.

<div class="alert alert-info"><strong>Nota</strong>: Si combinas todos tus archivos <code>.pem</code> en un solo archivo, la secuencia de los certificados dentro del archivo es importante. Es necesario que el certificado intermedio preceda al certificado raíz para establecer correctamente una cadena de confianza.</div>

{{% /tab %}}

{{% tab "Windows service" %}}

Para instalar certificados raíz para ubicaciones privadas en un servicio de Windows, sigue estos pasos:

1. Abre la aplicación de editor del registro.
2. Navega hasta la entrada `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\synthetics-private-location`.
3. Crea una clave de registro llamada `Environment` con el tipo de valor `Multi-string`.

<div class="alert alert-info"><strong>Nota</strong>: Tu certificado debe estar en la misma carpeta que tu servicio Synthetic Monitoring:
por defecto: <code>C:\Program Files\Datadog-Synthetics\Synthetics</code>.</div>

4. Fija el valor `NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem`

   {{< img src="synthetics/private_locations/windows_pl_set_service.png" alt="Tu descripción de imagen" style="width:100%;" >}}

5. Abre la aplicación de servicios y vuelve a cargar el servicio de localización privada de Datadog Synthetic Monitoring.

{{% /tab %}}

{{% tab "Windows standalone" %}}

Para instalar certificados raíz para localizaciones privadas en un proceso independiente de Windows con `synthetics-private-location.exe`, sigue estos pasos:

1. Abre el símbolo del sistema Windows o PowerShell.

2. Establece la variable de entorno y llama al ejecutable.

Ejemplo:

```text
set NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem && .\synthetics-private-location.exe --config "C:\ProgramData\Datadog-Synthetics\Synthetics\worker-config.json"
```

{{% /tab %}}
{{< /tabs >}}

#### Configurar sondeos de ejecución y preparación

Añade un sondeo de ejecución o preparación para que tu orquestador pueda garantizar el correcto funcionamiento de los workers.

Para los sondeos de preparación, debes habilitar sondeos de estado de localización privada en el puerto `8080` en tu implementación de localización privada. Para obtener más información, consulta [Configuración de localizaciones privadas][5].

{{< tabs >}}

{{% tab "Docker Compose" %}}

```yaml
healthcheck:
  retries: 3
  test: [
    "CMD", "wget", "-O", "/dev/null", "-q", "http://localhost:8080/liveness"
  ]
  timeout: 2s
  interval: 10s
  start_period: 30s
```

{{% /tab %}}

{{% tab "Despliegue Kubernetes" %}}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{{% /tab %}}

{{% tab "Helm Chart" %}}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{{% /tab %}}

{{% tab "ECS" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/usr/bin/wget", "-O", "/dev/null", "-q", "http://localhost:8080/liveness"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "Fargate" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "wget -O /dev/null -q http://localhost:8080/liveness || exit 1"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "EKS" %}}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{{% /tab %}}
{{< /tabs >}}

#### Configuraciones de checks de estado adicionales

<div class="alert alert-warning">Este método de añadir checks de estado de localizaciones privadas ya no es compatible. Datadog recomienda utilizar sondeos de ejecución y preparación.</div>

El archivo `/tmp/liveness.date` de contenedores de localización privada se actualiza después de cada análisis que se realiza correctamente desde Datadog (por defecto, 2s). Se considera que el estado del contenedor no es adecuado si ha pasado tiempo sin realizar ningún análisis, por ejemplo: sin recuperación en el último minuto.

Utiliza la siguiente configuración para configurar checks de estado en tus contenedores con el `livenessProbe`:

{{< tabs >}}

{{% tab "Docker Compose" %}}

```yaml
healthcheck:
  retries: 3
  test: [
    "CMD", "/bin/sh", "-c", "'[ $$(expr $$(cat /tmp/liveness.date) + 300000) -gt $$(date +%s%3N) ]'"
  ]
  timeout: 2s
  interval: 10s
  start_period: 30s
```

{{% /tab %}}

{{% tab "Despliegue Kubernetes" %}}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{{% /tab %}}

{{% tab "Helm Chart" %}}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{{% /tab %}}

{{% tab "ECS" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/bin/sh -c '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "Fargate" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/bin/sh -c '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "EKS" %}}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{{% /tab %}}

{{< /tabs >}}

### Actualizar una imagen de localización privada

Para actualizar una localización privada existente, haga clic en el icono del **engranaje** del panel lateral de la localización privada y haz clic en **Installation instructions** (Instrucciones de instalación).

{{< img src="synthetics/private_locations/pl_edit_config.png" alt="Acceder al flujo (flow) de trabajo de una localización privada" style="width:90%;" >}}

A continuación, ejecuta el [comando de configuración basado en tu entorno](#install-your-private-location) para obtener la versión más reciente de la imagen de localización privada.

**Nota**: Si estás utilizando `docker run` para iniciar la imagen de tu localización privada y ya has instalado la imagen de la localización privada utilizando la etiqueta `latest`, asegúrate de añadir `--pull=always` al comando `docker run` para asegurarte de que se extraiga la última versión, en lugar de depender de la versión en caché de la imagen que pueda existir localmente con la misma etiqueta `latest`.

### Realizar un test de tu endpoint interno

Una vez que al menos un worker de la localización privada comienza a informar a Datadog, el estado de la localización privada aparece en verde.

{{< img src="synthetics/private_locations/pl_reporting.png" alt="Localización privada informando" style="width:90%;">}}

Puedes ver el estado de `REPORTING` y el estado de un monitor asociado mostrados en la lista de localizaciones privadas lista en la página **Parámetros**.

{{< img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="Estado de la localización privada y estado del monitor" style="width:100%;">}}

Empieza realizando un test de tu primer endpoint interno ejecutando un test rápido en uno de tus endpoints internos para ver si obtienes la respuesta esperada:

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="Test rápido de una localización privada" video="true" width="90%">}}

**Nota:** Datadog sólo transmite tráfico saliente desde tu localización privada, pero no transmite tráfico entrante.

## Iniciar tests Synthetic desde tu localización privada

Crea un test de API, de API de varios pasos o de navegador y selecciona tus **Localizaciones privadas** elegidas.

{{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Asignar un test Synthetic a una localización privada" style="width:90%;">}}

Utiliza localizaciones privadas de la misma forma que utilizas tus localizaciones gestionadas de Datadog: asigna [tests de Synthetic][29] a localizaciones privadas, visualiza resultados de test, obtén [métricas de Synthetic][11], etc.

## Escalar tu localización privada

Dado que puedes ejecutar varios workers para una única localización privada con un único archivo de configuración, puedes **escalar horizontalmente** tus localizaciones privadas añadiéndoles o quitándoles workers. Al hacerlo, asegúrate de configurar un parámetro `concurrency` y asignar recursos de worker que correspondan a los tipos y número de tests que quieres que ejecute tu localización privada.

También puedes **escalar verticalmente** tus localizaciones privadas aumentando la carga que tus workers de localización privada pueden manejar. Del mismo modo, debes utilizar el parámetro `concurrency` para ajustar el número máximo de tests que tus workers pueden ejecutar y actualizar los recursos asignados a tus workers.

Para obtener más información, consulta [Dimensionar tus localizaciones privadas][18].

Para utilizar localizaciones privadas para tests continuos, define un valor en el parámetro `concurrency` para controlar tu paralelización. Para obtener más información, consulta [Tests continuos][23].

## Monitorizar tu localización privada

Mientras añades inicialmente recursos que se ajustan al número y tipo de tests que se van a ejecutar desde tu localización privada, la forma más sencilla de saber si vas a tener que reducir o ampliar la escala de tu localización privada es monitorizarlos con detalle. En [Monitorización de localizaciones privadas][19] encontrarás información sobre el rendimiento y estado de tu localización privada, además de métricas y monitores predefinidos.

Para obtener más información, consulta [Monitorización de localizaciones privadas][19].

## Permisos

De forma predeterminada, sólo los usuarios que tienen el rol de administrador de Datadog pueden crear localizaciones privadas, eliminarlas y acceder a directrices para instalarlas.

Los usuarios que tienen el [rol de administrador de Datadog y el rol estándar de Datadog][20] pueden visualizar localizaciones privadas, buscarlas y asignarles tests Synthetic. Para conceder acceso a la página [**Localizaciones privadas**][22], actualiza tu usuario a uno de estos dos [roles predeterminados][19].

Si utilizas la [función de rol personalizado][21], añade tu usuario a un rol personalizado que incluya los permisos `synthetics_private_location_read` y `synthetics_private_location_write`.

<div class="alert alert-warning"><strong>Nota</strong>: Si un test incluye localizaciones privadas restringidas, la actualización de test elimina dichas localizaciones de test.</div>

## Restringir el acceso

Utiliza el [control de acceso granular][24] para limitar quién tiene acceso a tu test en función de roles, equipos o usuarios individuales:

1. Abre la sección de permisos del formulario.
2. Haz clic en **Edit Access** (Editar acceso).
  {{< img src="synthetics/settings/grace_2.png" alt="Establecer permisos para tu test en el formulario de configuración de Localizaciones privadas" style="width:100%;" >}}
3. Haz clic en **Restrict Access** (Restringir el acceso).
4. Selecciona equipos, roles o usuarios.
5. Haz clic en **Add** (Añadir).
6. Selecciona el nivel de acceso que deseas asociar a cada uno de ellos.
7. Haz clic en **Done** (Listo).

<div class="alert alert-info"><strong>Nota</strong>: Puedes ver los resultados de una localización privada incluso sin tener acceso a esa localización privada.</div>

| Nivel de acceso | Ver instrucciones de PL | Ver métricas de PL | Utilizar PL en el test | Editar la configuración de PL  |
| ------------ | ---------------------| --------------- | -------------- | ---------------------- |
| Sin acceso    |                      |                 |                |                        |
| Visor       | {{< X >}}            | {{< X >}}       | {{< X >}}      |                        |
| Editor       | {{< X >}}            | {{< X >}}       | {{< X >}}      | {{< X >}}              |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[4]: https://docs.docker.com/engine/install/
[5]: /es/synthetics/private_locations/configuration/
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[10]: https://docs.docker.com/engine/reference/builder/#healthcheck
[11]: /es/synthetics/metrics
[12]: /es/synthetics/api_tests/
[13]: /es/synthetics/multistep?tab=requestoptions
[14]: /es/synthetics/browser_tests/?tab=requestoptions
[16]: /es/agent/
[17]: /es/synthetics/metrics/
[18]: /es/synthetics/private_locations/dimensioning
[19]: /es/synthetics/private_locations/monitoring
[20]: /es/account_management/rbac/permissions
[21]: /es/account_management/rbac#custom-roles
[22]: https://app.datadoghq.com/synthetics/settings/private-locations
[23]: /es/continuous_testing/cicd_integrations/configuration
[24]: /es/account_management/rbac/granular_access
[25]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[26]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
[27]: https://docs.datadoghq.com/es/synthetics/private_locations/configuration/#private-locations-admin
[28]: /es/continuous_testing/cicd_integrations
[29]: /es/synthetics/
[30]: https://github.com/DataDog/helm-charts/tree/master/charts/synthetics-private-location
[31]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html
[32]: /es/synthetics/platform/private_locations/configuration