---
aliases:
- /es/synthetics/private_locations
description: Ejecute pruebas Synthetic de API y de navegador desde ubicaciones privadas
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: Blog
  text: Haga un seguimiento de sus ubicaciones privadas Synthetic con Datadog
- link: /getting_started/synthetics/private_location
  tag: Documentación
  text: Introducción a Private Locations
- link: /synthetics/private_locations/monitoring
  tag: Documentación
  text: Haga un seguimiento de sus Private Locations
- link: /synthetics/private_locations/dimensioning
  tag: Documentación
  text: Dimensione sus Private Locations
- link: https://www.datadoghq.com/architecture/protect-sensitive-data-with-synthetics-private-location-runners/
  tag: Centro de arquitectura
  text: Proteja datos confidenciales con los ejecutores de Private Locations de Synthetic
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
  tag: Sitio externo
  text: Cree y administre Synthetic Private Locations con Terraform
title: Ejecute pruebas Synthetic desde Private Locations
---
## Descripción general {#overview}

Las ubicaciones privadas le permiten **hacer un seguimiento de aplicaciones internas o de cualquier punto de conexión privado** que no son accesibles desde Internet pública. También se pueden utilizar para:

* **Cree ubicaciones sintéticas personalizadas** en áreas que sean críticas para su negocio.
* **Verifique el rendimiento de la aplicación en su entorno de CI interno** antes de lanzar nuevas funciones a producción con [Continuous Testing and CI/CD][28].
* **Compare el rendimiento de la aplicación** tanto desde dentro como desde fuera de su red interna.
* **[Autentique pruebas de Synthetic Monitoring mediante Kerberos SSO][33]** para sitios y API internos basados en Windows.

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Diagrama de arquitectura de cómo funciona una ubicación privada en Synthetic Monitoring" style="width:100%;">}}

Las ubicaciones privadas vienen como contenedores de Docker o servicios de Windows que puede instalar dentro de su red privada. Después de crear e instalar una ubicación privada, puede asignarle [pruebas Synthetic][29], al igual que con cualquier ubicación administrada.

El trabajador de su ubicación privada extrae las configuraciones de prueba de los servidores de Datadog mediante HTTPS, ejecuta la prueba programada o a demanda, y devuelve los resultados de la prueba a los servidores de Datadog. Luego, puede visualizar los resultados de las pruebas de sus ubicaciones privadas de una manera completamente idéntica a como visualizaría las pruebas que se ejecutan desde ubicaciones administradas:

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Asigne una prueba Synthetic a una ubicación privada" style="width:100%;">}}

## Requisitos previos {#prerequisites}

Para usar ubicaciones privadas para [pruebas Continuous Testing][23], necesita la versión 1.27.0 o posterior.

{{< tabs >}}
{{% tab "Docker" %}}

Las ubicaciones privadas son contenedores de Docker que puede instalar en cualquier lugar dentro de su red privada. Puede acceder a la [imagen del trabajador de ubicación privada][101] en Docker Hub. Puede ejecutarse en un sistema operativo basado en Linux o en un sistema operativo Windows si el [motor de Docker][102] está disponible en su servidor y puede ejecutarse en modo de contenedores de Linux.**\***

{{< site-region region="gov,gov2" >}}

Si requiere soporte FIPS, utilice la [imagen compatible con FIPS][26] en Docker Hub.

[26]: https://hub.docker.com/r/datadog/synthetics-private-location-worker-fips

{{< /site-region >}}

***** **El uso y la operación de este software se rigen por el Acuerdo de licencia de usuario final disponible [aquí][103].**

[101]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[102]: https://docs.docker.com/engine/install/
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Helm" %}}

Las ubicaciones privadas son implementaciones de Kubernetes que puede instalar en su clúster de Kubernetes con Helm. El [helm chart][101] puede ejecutarse en Kubernetes basado en Linux.

**Nota**: El uso y la operación de este software se rigen por el [Acuerdo de licencia de usuario final][103].

[101]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Windows" %}}

Las ubicaciones privadas son servicios de Windows que puede instalar en cualquier lugar dentro de su red privada mediante un [archivo MSI][101]. Ejecute este archivo desde la máquina virtual o física en la que desea instalar la ubicación privada.*****

**\*** **El uso y la operación de este software se rigen por el Acuerdo de licencia de usuario final disponible [aquí][102].**

Los requisitos de esta máquina se enumeran en la tabla a continuación. La ejecución de scripts de PowerShell debe estar habilitada en la máquina donde está instalando el trabajador de ubicación privada.

| Requisitos | del sistema |
|---|---|
| SO | Windows Server 2025, Windows Server 2022, Windows Server 2019, Windows Server 2016, Windows 11 o Windows 10. |
| RAM | 4GB mínimo. 8GB recomendado. |
| CPU | Procesador Intel o AMD con soporte de 64 bits. Se recomienda un procesador de 2.8 GHz o más rápido. |

**Nota:** Las pruebas de navegador requieren navegadores instalados en el servidor Windows:
- Windows Private Location 1.71.0 y versiones posteriores: se incluyen Chrome y Firefox. Instale Edge por separado.
- Windows Private Location 1.70.0 y versiones anteriores: instale Chrome, Edge y Firefox.

Debe instalar .NET versión 4.7.2 o posterior en su computadora antes de usar el instalador MSI.

**Habilitar modo criptográfico FIPS 140-2**: </br>
Habilite módulos criptográficos compatibles con FIPS para comunicaciones seguras. El servidor de Windows debe estar ejecutándose en modo FIPS de Windows para usar esta opción. Disponible en Private Location `v1.63.0` y versiones superiores.

{{< img src="synthetics/private_locations/synthetics_pl_windows_fips.png" alt="Asistente de Synthetics Private Location Worker, instalador MSI. Se muestra la configuración del modo criptográfico FIPS 140-2." style="width:80%;" >}}

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[102]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{< /tabs >}}

### Puntos de conexión de ubicaciones privadas de Datadog {#datadog-private-locations-endpoints}

Para extraer configuraciones de prueba y enviar resultados de prueba, el trabajador de la ubicación privada necesita acceso a los siguientes puntos de conexión de Datadog API.

| Puerto | Punto de conexión                               | Descripción                                                   |
| ---- | -------------------------------------- | ------------------------------------------------------------- |
| 443  | {{< region-param key=synthetics_intake_endpoint code="true" >}} | Utilizado por la ubicación privada para extraer configuraciones de prueba y enviar resultados de prueba a Datadog mediante un protocolo interno basado en el [protocolo AWS Signature Version 4][1].{{< site-region region="gov,gov2" >}} Para las versiones `1.32.0` y posteriores, las solicitudes de **ubicaciones privadas en contenedores Linux** cumplen con los Estándares Federales de Procesamiento de Información (FIPS). Para **Windows Private Locations**, se admite el cifrado compatible con FIPS en la versión `1.63.0` y posteriores.{{< /site-region >}} |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< site-region region="eu" >}}

**Nota**: Estos dominios apuntan a un conjunto de direcciones IP estáticas. Estas direcciones se pueden encontrar en https://ip-ranges.datadoghq.eu.

{{< /site-region >}}

## Configure su ubicación privada {#set-up-your-private-location}

Solo los usuarios con el rol **Synthetics Private Locations Write** pueden crear ubicaciones privadas. Para obtener más información, consulte [Permisos](#permissions).

### Cree su ubicación privada {#create-your-private-location}

Vaya a [{{< ui >}}Synthetic Monitoring{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Private Locations{{< /ui >}}][22] y haga clic en {{< ui >}}Add Private Location{{< /ui >}}.

{{< img src="synthetics/private_locations/synthetics_pl_add_1.png" alt="Cree una ubicación privada" style="width:90%;">}}

Complete los detalles de su ubicación privada:

1. Especifique el {{< ui >}}Name{{< /ui >}} y la {{< ui >}}Description{{< /ui >}} de su ubicación privada.
2. Agregue cualquier {{< ui >}}Tags{{< /ui >}} que desee asociar con su ubicación privada.
3. Elija una de sus {{< ui >}}API Keys{{< /ui >}} existentes. Seleccionar una clave de API permite la comunicación entre su ubicación privada y Datadog. Si no tiene una clave de API existente, haga clic en {{< ui >}}Generate API key{{< /ui >}} para crear una en la página dedicada. Solo los campos `Name` y `API key` son obligatorios.
4. Establezca el acceso para su ubicación privada y haga clic en {{< ui >}}Save Location and Generate Configuration File{{< /ui >}}. Datadog crea su ubicación privada y genera el archivo de configuración asociado.

{{< img src="synthetics/private_locations/pl_creation_1.png" alt="Agregue detalles a la ubicación privada." style="width:85%;">}}

### Configure su ubicación privada {#configure-your-private-location}

Configure su ubicación privada personalizando el archivo de configuración generado. Cuando agrega parámetros de configuración iniciales como [proxies](#proxy-configuration) y [IPs reservadas bloqueadas](#blocking-reserved-ips) en el **Paso 3**, su archivo de configuración generado se actualiza automáticamente en el **Paso 4**.

Puede acceder a opciones avanzadas para ajustar la configuración según la configuración de su red interna. Para obtener más información sobre el comando `help`, consulte [Configuración][5].

#### Configuración de proxy {#proxy-configuration}

Si el tráfico entre su ubicación privada y Datadog debe pasar por un proxy, especifique su URL de proxy como `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` para agregar el parámetro `proxyDatadog` asociado a su archivo de configuración generado.

{{<img src="synthetics/private_locations/pl_proxy_1.png" alt="Agregar un proxy al archivo de configuración de su ubicación privada" style="width:90%;">}}

#### Bloqueo de IPs reservadas {#blocking-reserved-ips}

De forma predeterminada, los usuarios de Synthetic pueden crear pruebas Synthetic en endpoints utilizando cualquier IP. Si desea evitar que los usuarios creen pruebas en IPs internas confidenciales de su red, active el botón {{< ui >}}Block reserved IPs{{< /ui >}} para bloquear un conjunto predeterminado de rangos de IP reservados ([registro de direcciones IPv4][6] y [registro de direcciones IPv6][7]) y establezca el parámetro `enableDefaultBlockedIpRanges` asociado en `true` en su archivo de configuración generado.

Si algunos de los puntos de conexión que desea probar se encuentran dentro de uno o varios de los rangos de IP reservados bloqueados, puede agregar sus IPs y/o CIDR a las listas permitidas para agregar los parámetros `allowedIPRanges` asociados a su archivo de configuración generado.

{{< img src="synthetics/private_locations/pl_reserved_ips_1.png" alt="Configurar IPs reservadas" style="width:90%;">}}

### Ver su archivo de configuración {#view-your-configuration-file}

Después de agregar las opciones adecuadas al archivo de configuración de su ubicación privada, puede copiar y pegar este archivo en su directorio de trabajo. El archivo de configuración contiene secretos para la autenticación de la ubicación privada, el descifrado de la configuración de pruebas y el cifrado de los resultados de las pruebas.

{{< img src="synthetics/private_locations/pl_view_file_1.png" alt="Configurar IPs reservadas" style="width:90%;">}}

Datadog no almacena sus secretos, así que guárdelos localmente antes de hacer clic en {{< ui >}}View Installation Instructions{{< /ui >}}.

**Nota:** Debe poder volver a consultar estos secretos si decide agregar más trabajadores o instalarlos en otro servidor.

### Instale su ubicación privada {#install-your-private-location}

Puede usar las variables de entorno `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` y `DATADOG_PRIVATE_KEY` en su definición de tarea.

Inicie su ubicación privada en:

{{< tabs >}}
{{% tab "Docker" %}}

Ejecute este comando para iniciar su trabajador de ubicación privada montando su archivo de configuración en el contenedor. `$PWD` en el comando a continuación se refiere al directorio desde el cual ejecuta el comando, así que reemplácelo con la ruta donde esté almacenado su archivo `<MY_WORKER_CONFIG_FILE_NAME>.json`. La ruta antes de los dos puntos (la ubicación en su servidor) puede ser cualquier directorio; solo la ruta después de los dos puntos (`/etc/datadog/synthetics-check-runner.json`) debe coincidir exactamente, ya que es donde el trabajador espera encontrar su configuración dentro del contenedor:

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**Nota:** Si ha bloqueado IPs reservadas, agregue `NET_ADMIN` [capacidades de Linux][26] a su contenedor de ubicación privada.

Este comando inicia un contenedor de Docker y prepara su ubicación privada para ejecutar pruebas. **Datadog recomienda ejecutar el contenedor en modo separado (detached) con una política de reinicio adecuada.**

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Docker Compose" %}}

1. Cree un archivo `docker-compose.yml` con:

    ```yaml
    version: "3"
    services:
        synthetics-private-location-worker:
            image: datadog/synthetics-private-location-worker:latest
            volumes:
                - PATH_TO_PRIVATE_LOCATION_CONFIG_FILE:/etc/datadog/synthetics-check-runner.json
    ```
    **Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities][26] to your private location container.

2. Inicie su contenedor con:

    ```shell
    docker-compose -f docker-compose.yml up
    ```
[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Podman" %}}
La configuración de Podman es muy similar a la de Docker; sin embargo, debe establecer `NET_RAW` como una capacidad adicional para admitir pruebas ICMP.

1. Ejecute `sysctl -w "net.ipv4.ping_group_range = 0 2147483647"` desde el servidor donde se ejecuta el contenedor.
2. Ejecute este comando para iniciar su trabajador de ubicación privada montando su archivo de configuración en el contenedor. Asegúrese de que su archivo `<MY_WORKER_CONFIG_FILE_NAME>.json` sea accesible para montarlo en el contenedor:

   ```shell
   podman run --cap-add=NET_RAW --rm -it -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json gcr.io/datadoghq/synthetics-private-location-worker:latest
   ```

   Si ha configurado direcciones IP reservadas bloqueadas, agregue las capacidades de Linux `NET_ADMIN` a su contenedor de ubicación privada.

Este comando inicia un contenedor de Podman y prepara su ubicación privada para ejecutar pruebas. Datadog recomienda ejecutar el contenedor en modo separado con una política de reinicio adecuada.
{{< /tab >}}

{{% tab "Despliegue de Kubernetes" %}}

Para desplegar el trabajador de ubicaciones privadas de manera segura, configure y monte un recurso Kubernetes Secret en el contenedor bajo `/etc/datadog/synthetics-check-runner.json`.

1. Cree un Kubernetes Secret con el archivo JSON creado anteriormente ejecutando lo siguiente:

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Utilice despliegues para describir el estado deseado asociado con sus ubicaciones privadas. Cree el siguiente archivo `private-location-worker-deployment.yaml`:

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

    **Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities][26] to your private location container.

3. Aplique la configuración:

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

Para OpenShift, ejecute la ubicación privada con el SCC `anyuid`. Esto es necesario para que su prueba de navegador se ejecute.

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Helm Chart" %}}

Puede establecer variables de entorno en sus parámetros de configuración que apunten a secretos que ya haya configurado. Para crear variables de entorno con secretos, consulte la [documentación de Kubernetes][3].

Alternativamente:

1. Agregue [Datadog Synthetics Private Location][2] a sus repositorios de Helm:

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

2. Instale el gráfico con el nombre de versión `<RELEASE_NAME>` utilizando el archivo JSON creado anteriormente:

    ```shell
    helm install <RELEASE_NAME> datadog/synthetics-private-location --set-file configFile=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

**Nota:** Si ha bloqueado IPs reservadas, agregue `NET_ADMIN` [capacidades de Linux][26] a su contenedor de ubicación privada.

[2]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#define-container-environment-variables-using-secret-data
[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "ECS" %}}

Cree una nueva definición de tarea de EC2 que coincida con lo siguiente. Reemplace cada parámetro con el valor correspondiente que se encuentra en su archivo de configuración de ubicación privada generado anteriormente:

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

- Si ha bloqueado IPs reservadas, configure [linuxParameters][31] para otorgar `NET_ADMIN` capacidades a sus contenedores de ubicación privada.
- Si utiliza las variables de entorno `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` y `DATADOG_PRIVATE_KEY`, no necesita incluirlas en la sección `"command": [ ]`.

[31]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{< /tab >}}

{{% tab "Fargate" %}}

Cree una nueva definición de tarea de Fargate que coincida con lo siguiente. Reemplace cada parámetro con el valor correspondiente que se encuentra en su archivo de configuración de ubicación privada generado anteriormente:

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

**Nota:** Debido a que la opción de firewall de ubicación privada no es compatible con AWS Fargate, el parámetro `enableDefaultBlockedIpRanges` no se puede establecer en `true`.

{{< /tab >}}

{{% tab "Fargate con AWS Secret Manager" %}}

Cree un secreto en AWS Secret Manager para almacenar toda o parte de la configuración de ubicación privada generada anteriormente. Tenga en cuenta que `publicKey` no se puede mantener tal como está en el archivo de configuración. Por ejemplo:

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

Se requieren permisos para permitir que la definición de tarea y la instancia de AWS Fargate lean desde el administrador de secretos. Consulte [Especificación de datos confidenciales mediante secretos de Secrets Manager en Amazon ECS][25] para obtener más información.

Cree una definición de tarea de Fargate que coincida con el siguiente ejemplo, reemplazando los valores en la lista de secretos con el ARN del secreto que creó en el paso anterior. Por ejemplo: `arn:aws:secretsmanager:<region>:<account-id>:secret:<secret_arn>:<secret_key>::`.

Si no guardó toda la configuración en el administrador de secretos, aún puede pasar el valor como argumentos de cadena codificados de forma rígida.

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

**Nota:** Debido a que la opción de firewall de ubicación privada no es compatible con AWS Fargate, el parámetro `enableDefaultBlockedIpRanges` no se puede establecer en `true`.

[25]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html

{{< /tab >}}

{{% tab "EKS" %}}

Debido a que Datadog ya se integra con Kubernetes y AWS, está listo para monitorear EKS.

1. Cree un Kubernetes Secret con el archivo JSON creado anteriormente ejecutando lo siguiente:

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. Utilice despliegues para describir el estado deseado asociado con sus ubicaciones privadas. Cree el siguiente archivo `private-location-worker-deployment.yaml`:

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

    **Note:** If you have blocked reserved IPs, configure a security context to grant `NET_ADMIN` [Linux capabilities][26] to your private location containers.

3. Aplique la configuración:

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Windows mediante GUI" %}}

1. Descargue el archivo [`datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi`][101] y ejecute este archivo desde la máquina en la que desea instalar la ubicación privada.
1. Haga clic en {{< ui >}}Next{{< /ui >}} en la página de bienvenida, lea el EULA y acepte los términos y condiciones. Haga clic en {{< ui >}}Next{{< /ui >}}.
1. Modifique dónde se instalará la aplicación o deje la configuración predeterminada. Haga clic en {{< ui >}}Next{{< /ui >}}.
1. Para configurar su ubicación privada de Windows, puede:
   - Pegue e ingrese una configuración JSON para su trabajador de ubicación privada de Datadog Synthetics. Este archivo es generado por Datadog cuando usted [crea una ubicación privada][102].
   - Explore o escriba una ruta de archivo para un archivo que contenga una configuración JSON para su trabajador de ubicación privada de Datadog Synthetics.
   - Puede dejarlo en blanco y ejecutar `C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=<PathToYourConfiguration>` en el símbolo del sistema de Windows después de que se complete la instalación.

   {{< img src="synthetics/private_locations/configuration_selector_paste.png" alt="Asistente de Synthetics Private Location Worker, instalador MSI. La opción 'Pegar una configuración JSON' está seleccionada. Se muestra un campo de texto para esta configuración JSON." style="width:80%;" >}}

1. Puede aplicar las siguientes opciones de configuración:

   {{< img src="synthetics/private_locations/synthetics_pl_windows_fips.png" alt="Asistente de Synthetics Private Location Worker, instalador MSI. Se muestra la configuración del modo criptográfico FIPS 140-2." style="width:80%;" >}}

   Aplicar las reglas de firewall necesarias para este programa al Firewall de Windows
   : Permita que el instalador aplique reglas de firewall durante la instalación y las elimine durante la desinstalación.

   Aplicar reglas para bloquear IPs reservadas en el Firewall de Windows
   : Configure reglas de bloqueo para Chrome, Firefox y Edge (si están instalados) y agregue reglas para bloquear rangos de direcciones IP reservadas salientes en el Firewall de Windows.

   Habilitar registro de archivos
   : Permita que el Worker de Private Location de Synthetics registre archivos en el directorio de instalación.

   Días de rotación de registros
   : Especifica cuántos días conservar los registros antes de eliminarlos del sistema local.

   Nivel de detalle del registro
   : Especifica el nivel de detalle del registro de la consola y de archivos para el Worker de Private Location de Synthetics.

   Habilitar modo criptográfico FIPS 140-2
   : Habilite módulos criptográficos compatibles con FIPS para comunicaciones seguras. El servidor de Windows debe estar ejecutándose en modo FIPS de Windows para usar esta opción. Disponible en Private Location v1.63.0 y versiones posteriores.

1. Haga clic en {{< ui >}}Next{{< /ui >}} y {{< ui >}}Install{{< /ui >}} para iniciar el proceso de instalación.

Una vez que el proceso se complete, haga clic en {{< ui >}}Finish{{< /ui >}} en la página de finalización de la instalación.

<div class="alert alert-danger">Si ingresó su configuración JSON, el Servicio de Windows comenzará a ejecutarse utilizando esa configuración. Si no ingresó su configuración, ejecute <code>C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=< PathToYourConfiguration ></code> desde un símbolo del sistema o utilice el <code>start menu</code> acceso directo para iniciar el Synthetics Private Location Worker.</div>

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[102]: https://app.datadoghq.com/synthetics/settings/private-locations

{{< /tab >}}

{{% tab "Windows a través de CLI" %}}

1. Descargue el archivo [`datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi`][101] y ejecute este archivo desde la máquina en la que desea instalar la ubicación privada.
2. Ejecute uno de los siguientes comandos dentro del directorio donde descargó el instalador:

   - En una terminal de PowerShell:

     ```powershell
     Start-Process msiexec "/i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi /quiet /qn CONFIG_FILEPATH=<path_to_your_worker_config_file>";
     ```

   - O en una terminal de comandos:

     ```cmd
     msiexec /i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi /quiet /qn CONFIG_FILEPATH=<path_to_your_worker_config_file>
     ```

Se pueden agregar parámetros adicionales:

| Parámetro opcional | Definición | Valor | Valor predeterminado | Tipo |
|---|---|---|---|---|
| APPLYDEFAULTFIREWALLRULES | Aplica las reglas de firewall necesarias para el programa. | 1 | N/A | 0: Deshabilitado<br>1: Habilitado |
| APPLYFIREWALLDEFAULTBLOCKRULES | Bloquea las direcciones IP reservadas para cada navegador que tenga instalado (Chrome, Edge y Firefox). No es posible bloquear las conexiones de bucle local (loopback) en el Firewall de Windows. | 0 | N/A | 0: Deshabilitado<br>1: Habilitado |
| LOGGING_ENABLED | Cuando está habilitado, esto configura el registro en archivo. Estos registros se almacenan en el directorio de instalación bajo la carpeta logs. | 0 | `--enableFileLogging` | 0: Deshabilitado<br>1: Habilitado |
| LOGGING_VERBOSITY | Configura la verbosidad del registro para el programa. Esto afecta a los registros de consola y de archivo. | Esto afecta a los registros de consola y de archivo. | `-vvv` | `-v`: Error<br>`-vv`: Advertencia<br>`-vvv`: Información<br>`vvvv`: Depuración |
| LOGGING_MAXDAYS | Número de días para mantener los registros de archivo en el sistema antes de eliminarlos. Puede ser cualquier número al ejecutar una instalación desatendida. | 7 | `--logFileMaxDays` | Entero |
| CONFIG_FILEPATH | Esto debería cambiarse a la ruta de su archivo de configuración JSON Synthetics Private Location Worker. Encierre esta ruta entre comillas si contiene espacios. | <None> | `--config` | Cadena |

Para habilitar el modo criptográfico FIPS 140-2, establezca la variable de entorno `ENABLE_FIPS=1` antes de ejecutar el ejecutable del trabajador. El servidor de Windows debe estar ejecutándose en modo FIPS de Windows para usar esta opción. Disponible en Private Location v1.63.0 y versiones posteriores.

Ejemplo:

```cmd
set ENABLE_FIPS=1 && .\synthetics-pl-worker.exe --config "<PathToYourConfiguration>"
```

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi

{{< /tab >}}
{{< /tabs >}}

Para obtener más información sobre los parámetros de Private Location para administradores, consulte [Configuration][32].

#### Certificados raíz {#root-certificates}

Puede cargar certificados raíz personalizados en sus Private Locations para que sus pruebas de API y navegador realicen el protocolo de enlace SSL utilizando sus propios archivos `.pem`.

{{< tabs >}}
{{% tab "Linux - contenedor" %}}

Al iniciar sus contenedores de Private Location, monte los archivos de certificado `.pem` relevantes en `/etc/datadog/certs` de la misma manera que monta su archivo de configuración de Private Location. Estos certificados se consideran CA de confianza y se utilizan durante la ejecución de la prueba.

<div class="alert alert-info">Si combina todos sus <code>.pem</code> archivos en uno solo, la secuencia de los certificados dentro del archivo es importante. Es necesario que el certificado intermedio preceda al certificado raíz para establecer correctamente una cadena de confianza.</div>

{{% /tab %}}

{{% tab "Servicio de Windows" %}}

Para instalar certificados raíz para Private Location en un servicio de Windows, siga estos pasos:

1. Abra la aplicación Editor del Registro.
2. Navegue a la entrada `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\synthetics-private-location`.
3. Cree una clave de Registro llamada `Environment` con el tipo de valor `Multi-string`.

<div class="alert alert-info">Su certificado debe estar en la misma carpeta que su servicio Synthetic Monitoring:
predeterminado: <code>C:\Program Files\Datadog-Synthetics\Synthetics</code>.</div>

4. Establezca el valor `NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem`

   {{< img src="synthetics/private_locations/windows_pl_set_service.png" alt="Descripción de su imagen" style="width:100%;" >}}

5. Abra la aplicación Servicios y recargue el servicio Datadog Synthetic Monitoring Private Location.

{{% /tab %}}

{{% tab "Windows independiente" %}}

Para instalar certificados raíz para Private Location en un proceso de Windows independiente con `synthetics-private-location.exe`, siga estos pasos:

1. Abra su símbolo del sistema de Windows o PowerShell.

2. Establezca la variable de entorno y llame al ejecutable.

Ejemplo:

```text
set NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem && .\synthetics-private-location.exe --config "C:\ProgramData\Datadog-Synthetics\Synthetics\worker-config.json"
```

Para habilitar el modo criptográfico FIPS 140-2, incluya `ENABLE_FIPS=1`:

```text
set ENABLE_FIPS=1 && set NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem && .\synthetics-private-location.exe --config "C:\ProgramData\Datadog-Synthetics\Synthetics\worker-config.json"
```

El servidor de Windows debe estar ejecutándose en modo FIPS de Windows para usar esta opción. Disponible en Private Location v1.63.0 y versiones posteriores.

{{% /tab %}}
{{< /tabs >}}

#### Configure sondeos de actividad y preparación {#set-up-liveness-and-readiness-probes}

Agregue un sondeo de actividad o de preparación para que su orquestador pueda asegurarse de que los trabajadores se estén ejecutando correctamente.

Para los sondeos de preparación, debe habilitar los sondeos de estado de Private Location en el puerto `8080` en su implementación de Private Location. Para obtener más información, consulte [Private Location Configuration][5].

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

{{% tab "Despliegue de Kubernetes" %}}

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

#### Configuraciones adicionales de verificación de estado {#additional-health-check-configurations}

<div class="alert alert-warning">Este método para agregar verificaciones de estado de Private Location ya no es compatible. Datadog recomienda usar sondeos de actividad (liveness) y preparación (readiness).</div>

El archivo `/tmp/liveness.date` de los contenedores de Private Location se actualiza después de cada sondeo exitoso desde Datadog (2s de forma predeterminada). El contenedor se considera en mal estado si no se ha realizado ningún sondeo en un tiempo, por ejemplo: ninguna recuperación en el último minuto.

Utilice la configuración a continuación para configurar verificaciones de estado en sus contenedores con `livenessProbe`:

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

{{% tab "Despliegue de Kubernetes" %}}

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

### Actualizar una imagen de Private Location {#upgrade-a-private-location-image}

Para actualizar una Private Location existente, haga clic en el icono {{< ui >}}Gear{{< /ui >}} en el panel lateral de la Private Location y haga clic en {{< ui >}}Installation instructions{{< /ui >}}.

{{< img src="synthetics/private_locations/pl_edit_config.png" alt="Acceda al flujo de trabajo de configuración para Private Location" style="width:90%;" >}}

Luego, ejecute el [comando de configuración según su entorno](#install-your-private-location) para obtener la versión más reciente de la imagen de Private Location.

**Nota**: Si está utilizando `docker run` para iniciar su imagen de Private Location y ha instalado previamente la imagen de Private Location usando la etiqueta `latest`, asegúrese de agregar `--pull=always` al comando `docker run` para garantizar que se extraiga la versión más reciente en lugar de depender de la versión en caché de la imagen que pueda existir localmente con la misma etiqueta `latest`.

#### Actualizar una Ubicación privada de Windows {#upgrade-a-windows-private-location}

1. Haga una copia de seguridad de su archivo de configuración (`C:\ProgramData\Datadog Synthetics Private Location\config.json`) antes de actualizarlo o cambiarlo.
2. Descargue el [instalador MSI][34] más reciente, ejecútelo y siga las instrucciones. Si se le solicita modificar o actualizar su configuración, utilice siempre el archivo del que hizo una copia de seguridad.
3. Si utiliza la opción **Modificar** del instalador, seleccione su archivo de configuración existente. Dejar el campo en blanco o generar una nueva configuración reemplaza la actual.
4. Confirme que el servicio de trabajador de la ubicación privada se esté ejecutando y haga referencia al archivo de configuración correcto.

### Ejecutar las versiones de navegador más recientes {#run-the-latest-browser-versions}

Las versiones de Chrome, Edge y Firefox en la imagen `latest` se actualizan con cada lanzamiento de ubicación privada después de ser probadas. Como resultado, pueden ser más antiguas que las versiones más recientes lanzadas por los proveedores de navegadores. Utilice la imagen de suscripción `browsers-latest` para ejecutar los navegadores más recientes y sus parches de seguridad antes, lo que reduce las vulnerabilidades del navegador (CVE) reportadas contra su ubicación privada.

La imagen `browsers-latest` se reconstruye cada semana. Para usarla, extraiga la etiqueta `browsers-latest` en lugar de `latest`:

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:browsers-latest
```

Para fijar un trabajador a una compilación semanal específica, utilice la etiqueta fechada e inmutable publicada junto a ella, en el formato `X.Y.Z-rc.N-browsers-YYYY-MM-DD`. Una imagen compatible con FIPS se publica como `datadog/synthetics-private-location-worker-fips:browsers-latest`.

**Nota**: Los navegadores `browsers-latest` no están validados en ubicaciones administradas por Datadog, por lo que las pruebas de navegador pueden ser menos estables que en la imagen `latest`. El canal intercambia estabilidad por las versiones de navegador más recientes.

### Pruebe su punto de conexión interno {#test-your-internal-endpoint}

Una vez que al menos un trabajador de ubicación privada comience a informar a Datadog, el estado de la ubicación privada se mostrará en verde.

{{< img src="synthetics/private_locations/pl_reporting.png" alt="Informes de ubicación privada" style="width:90%;">}}

Puede ver un estado de salud `REPORTING` y un estado de seguimiento asociado que se muestran en la lista de Ubicaciones privadas en la página {{< ui >}}Settings{{< /ui >}}.

{{< img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="Estado de salud y seguimiento de la ubicación privada" style="width:100%;">}}

Comience a probar su primer punto de conexión interno lanzando una prueba rápida en uno de sus puntos de conexión internos para ver si obtiene la respuesta esperada:

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="Prueba rápida en ubicación privada" video="true" width="90%">}}

**Nota:** Datadog solo envía tráfico saliente desde su ubicación privada, no se transmite tráfico entrante.

## Lance pruebas Synthetic desde su ubicación privada {#launch-synthetic-tests-from-your-private-location}

Cree una prueba de API, API de varios pasos o prueba de navegador, y seleccione su {{< ui >}}Private Locations{{< /ui >}} de interés.

{{< img src="synthetics/private_locations/assign-test-pl_3.png" alt="Asignar prueba Synthetic a ubicación privada" style="width:90%;">}}

Utilice ubicaciones privadas igual que sus ubicaciones gestionadas por Datadog: asigne [pruebas Synthetic][29] a ubicaciones privadas, visualice los resultados de las pruebas, recupere [Synthetic metrics][11] y más.

## Escale su ubicación privada {#scale-your-private-location}

Debido a que puede ejecutar varios trabajadores para una sola ubicación privada con un único archivo de configuración, puede **escalar horizontalmente** sus ubicaciones privadas agregando o eliminando trabajadores de ellas. Al hacerlo, asegúrese de establecer un parámetro `concurrency` y asignar recursos de trabajador que sean coherentes con los tipos y el número de pruebas que desea que ejecute su ubicación privada.

También puede **escalar verticalmente** sus ubicaciones privadas aumentando la carga que pueden manejar los trabajadores de su ubicación privada. De manera similar, debe utilizar el parámetro `concurrency` para ajustar el número máximo de pruebas que sus trabajadores pueden ejecutar y actualizar los recursos asignados a sus trabajadores.

Para obtener más información, consulte [Dimensioning Private Locations][18].

Para utilizar ubicaciones privadas para Continuous Testing, establezca un valor en el parámetro `concurrency` para controlar su paralelización. Para obtener más información, consulte [Continuous Testing][23].

## Haga un seguimiento de su ubicación privada {#monitor-your-private-location}

Aunque inicialmente agregue recursos que sean coherentes con el número y el tipo de pruebas que se ejecutarán desde su ubicación privada, la forma más fácil de saber si debe reducir o ampliar su ubicación privada es hacer un seguimiento de ella de cerca. [Private Location Monitoring][19] proporciona información sobre el rendimiento y el estado de su ubicación privada, así como métricas y seguimientos listos para usar.

Para obtener más información, consulte [Private Location Monitoring][19].

## Permisos {#permissions}

De forma predeterminada, solo los usuarios con el rol Datadog Admin pueden crear ubicaciones privadas, eliminar ubicaciones privadas y acceder a las directrices de instalación de ubicaciones privadas.

Los usuarios con los [roles Datadog Admin y Datadog Standard][20] pueden visualizar ubicaciones privadas, buscar ubicaciones privadas y asignar pruebas Synthetic a ubicaciones privadas. Otorgue acceso a la [página **Private Locations**][22] actualizando su usuario a uno de estos dos [roles predeterminados][19].

Si está utilizando la [función de rol personalizado][21], agregue su usuario a un rol personalizado que incluya los permisos `synthetics_private_location_read` y `synthetics_private_location_write`.

<div class="alert alert-warning">Si una prueba Synthetic incluye ubicaciones privadas restringidas, actualizar la prueba Synthetic elimina esas ubicaciones de la prueba Synthetic.</div>

## Restringir acceso {#restrict-access}

Utilice el [control de acceso granular][24] para limitar quién tiene acceso a su prueba según los roles, equipos o usuarios individuales:

1. Abra la sección de permisos del formulario.
2. Haga clic en {{< ui >}}Edit Access{{< /ui >}}.
  {{< img src="synthetics/settings/grace_2.png" alt="Establezca los permisos para su prueba desde el formulario de configuración de Private Locations" style="width:100%;" >}}
3. Haga clic en {{< ui >}}Restrict Access{{< /ui >}}.
4. Seleccione equipos, roles o usuarios.
5. Haga clic en {{< ui >}}Add{{< /ui >}}.
6. Seleccione el nivel de acceso que desea asociar con cada uno de ellos.
7. Haga clic en {{< ui >}}Done{{< /ui >}}.

<div class="alert alert-info">Puede visualizar los resultados de una Ubicación privada incluso sin acceso de visualización a esa Ubicación privada. <br><br>
Restringir una Ubicación privada puede limitar que otros usuarios la agreguen a una prueba o la editen, pero aún pueden visualizar el nombre de la ubicación si fue agregada a una prueba por un usuario autorizado.</div>

| Nivel de acceso | Visualizar PL instructions | Visualizar PL metrics | Usar PL in test | Editar PL configuration  |
| ------------ | ---------------------| --------------- | -------------- | ---------------------- |
| Sin acceso    |                      |                 |                |                        |
| Viewer       | {{< X >}}            | {{< X >}}       | {{< X >}}      |                        |
| Editor       | {{< X >}}            | {{< X >}}       | {{< X >}}      | {{< X >}}              |

## Lecturas adicionales {#further-reading}

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
[33]: /es/synthetics/guide/kerberos-authentication/
[34]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi