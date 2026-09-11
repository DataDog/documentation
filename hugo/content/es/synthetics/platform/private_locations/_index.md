---
aliases:
- /es/synthetics/private_locations
description: Ejecute pruebas Synthetic API y pruebas de navegador desde ubicaciones
  privadas
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: Blog
  text: Monitoree sus ubicaciones privadas Synthetic con Datadog
- link: /getting_started/synthetics/private_location
  tag: Documentación
  text: Introducción a las ubicaciones privadas
- link: /synthetics/private_locations/monitoring
  tag: Documentación
  text: Monitoree sus ubicaciones privadas
- link: /synthetics/private_locations/dimensioning
  tag: Documentación
  text: Dimensione sus ubicaciones privadas
- link: https://www.datadoghq.com/architecture/protect-sensitive-data-with-synthetics-private-location-runners/
  tag: Centro de Arquitectura
  text: Proteja datos sensibles con los ejecutores de ubicaciones privadas Synthetics
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
  tag: Sitio Externo
  text: Cree y gestione ubicaciones privadas Synthetic con Terraform
title: Ejecute pruebas Synthetic desde ubicaciones privadas
---
## Resumen {#overview}

Las ubicaciones privadas le permiten **monitorear aplicaciones internas o cualquier punto de conexión privado** que no sea accesible desde internet público También se pueden utilizar para:

* **Crear ubicaciones Synthetic personalizadas** en áreas que son críticas para su negocio
* **Verificar el rendimiento de la aplicación en su entorno interno de CI** antes de lanzar nuevas características a producción con [Continuous Testing y CI/CD][28]
* **Comparar el rendimiento de la aplicación** tanto desde dentro como desde fuera de su red interna
* **[Autenticar pruebas de Synthetic Monitoring usando Kerberos SSO][33]** para sitios y APIs internas basadas en Windows

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Diagrama de arquitectura de cómo funciona una ubicación privada en Synthetic Monitoring" style="width:100%;">}}

Las ubicaciones privadas se presentan como contenedores Docker o servicios de Windows que puede instalar dentro de su red privada Después de crear e instalar una ubicación privada, puede asignarle [pruebas Synthetic][29], al igual que con cualquier ubicación administrada

El trabajador de su ubicación privada obtiene las configuraciones de prueba de los servidores de Datadog utilizando HTTPS, ejecuta la prueba según un horario o bajo demanda, y devuelve los resultados de la prueba a los servidores de Datadog Luego puede visualizar los resultados de las pruebas de sus ubicaciones privadas de manera completamente idéntica a como visualizaría las pruebas que se ejecutan desde ubicaciones administradas:

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Asigne una prueba Synthetic a una ubicación privada" style="width:100%;">}}

## Requisitos previos {#prerequisites}

Para usar ubicaciones privadas para [Continuous Testing tests][23], necesita la versión v1.27.0 o posterior.

{{< tabs >}}
{{% tab "Docker" %}}

Las ubicaciones privadas son contenedores Docker que puede instalar en cualquier lugar dentro de su red privada. Puede acceder a la [imagen del trabajador de ubicación privada][101] en Docker hub. Puede ejecutarse en un sistema operativo basado en Linux o en Windows si el [motor de Docker][102] está disponible en su host y puede funcionar en modo de contenedores de Linux.**\***

{{< site-region region="gov,gov2" >}}

Si requiere soporte FIPS, utilice la [imagen compatible con FIPS][26] en Docker hub.

[26]: https://hub.docker.com/r/datadog/synthetics-private-location-worker-fips

{{< /site-region >}}

**\*** **El uso y operación de este software está regido por el Acuerdo de Licencia de Usuario Final disponible [aquí][103].**

[101]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[102]: https://docs.docker.com/engine/install/
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Helm" %}}

Las ubicaciones privadas son implementaciones de Kubernetes que puede instalar en su clúster de Kubernetes con Helm. El [chart de helm][101] puede ejecutarse en Kubernetes basado en Linux.

**Nota**: El uso y operación de este software está regido por el [Acuerdo de Licencia de Usuario Final][103].

[101]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Windows" %}}

Las ubicaciones privadas son servicios de Windows que puede instalar en cualquier lugar dentro de su red privada utilizando un [archivo MSI][101]. Ejecute este archivo desde la máquina virtual o física en la que desea instalar la ubicación privada.**\***

**\*** **El uso y operación de este software está regido por el Acuerdo de Licencia de Usuario Final disponible [aquí][102].**

Los requisitos de esta máquina se enumeran en la tabla a continuación. La ejecución de scripts de PowerShell debe estar habilitada en la máquina en la que está instalando el trabajador de ubicación privada.

| Sistema | Requisitos |
|---|---|
| SO | Windows Server 2022, Windows Server 2019, Windows Server 2016 o Windows 10. |
| RAM | 4GB mínimo. 8GB recomendado. |
| CPU | Procesador Intel o AMD con soporte de 64 bits. Se recomienda un procesador de 2.8 GHz o más rápido. |

**Nota**: Para que las Ubicaciones Privadas de Windows ejecuten pruebas en el navegador, los navegadores (por ejemplo, Chrome, Edge o Firefox) deben estar instalados en la computadora con Windows.

Debe instalar la versión 4.7.2 o posterior de .NET en su computadora antes de usar el instalador MSI.

**Habilitar el modo criptográfico FIPS 140-2**: </br>
Habilitar módulos criptográficos compatibles con FIPS para comunicaciones seguras. El host de Windows debe estar ejecutándose en modo FIPS de Windows para usar esta opción. Disponible en Ubicación Privada `v1.63.0` y superior.

{{< img src="synthetics/private_locations/synthetics_pl_windows_fips.png" alt="Asistente de trabajador de Ubicación Privada Synthetics, instalador MSI. La configuración del modo criptográfico FIPS 140-2 se muestra." style="width:80%;" >}}

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[102]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{< /tabs >}}

### Puntos de conexión de ubicaciones privadas de Datadog {#datadog-private-locations-endpoints}

Para obtener configuraciones de prueba y enviar resultados de prueba, el trabajador de ubicación privada necesita acceso a los siguientes puntos de conexión de la API de Datadog.

| Puerto | Punto de conexión                               | Descripción                                                   |
| ---- | -------------------------------------- | ------------------------------------------------------------- |
| 443  | {{< region-param key=synthetics_intake_endpoint code="true" >}} | Utilizado por la ubicación privada para obtener configuraciones de prueba y enviar resultados de prueba a Datadog utilizando un protocolo interno basado en [AWS Signature Version 4 protocol][1].{{< site-region region="gov,gov2" >}} Para versiones `1.32.0` y posteriores, las solicitudes de **Ubicaciones Privadas en contenedores de Linux** son compatibles con los Estándares Federales de Procesamiento de Información (FIPS). Para **Ubicaciones Privadas de Windows**, se admite cifrado compatible con FIPS en la versión `1.63.0` y posteriores.{{< /site-region >}} |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< site-region region="eu" >}}

**Nota**: Estos dominios apuntan a un conjunto de direcciones IP estáticas. Estas direcciones se pueden encontrar en https://ip-ranges.datadoghq.eu.

{{< /site-region >}}

## Configure su ubicación privada {#set-up-your-private-location}

Solo los usuarios con el rol de **Synthetics Private Locations Write** pueden crear ubicaciones privadas. Para más información, consulta [Permisos](#permissions).

### Cree su ubicación privada {#create-your-private-location}

Navegue a [**Synthetic Monitoring** > **Settings** > **Private Locations**][22] y haga clic en **Add Private Location**.

{{< img src="synthetics/private_locations/synthetics_pl_add_1.png" alt="Cree una ubicación privada" style="width:90%;">}}

Complete los detalles de su ubicación privada:

1. Especifique el **Nombre** y la **Descripción** de su ubicación privada.
2. Agregue cualquier **Etiqueta** que desee asociar con su ubicación privada.
3. Elija una de sus **Claves API** existentes. Seleccionar una clave de API permite la comunicación entre su ubicación privada y Datadog. Si no tiene una clave de API existente, haga clic en **Generate API key** para crear una en la página dedicada. Solo los campos `Name` y `API key` son obligatorios.
4. Establezca el acceso para su ubicación privada y haga clic en **Save Location and Generate Configuration File**. Datadog crea su ubicación privada y genera el archivo de configuración asociado.

{{< img src="synthetics/private_locations/pl_creation_1.png" alt="Agregue detalles a la ubicación privada" style="width:85%;">}}

### Configure su ubicación privada {#configure-your-private-location}

Configure su ubicación privada personalizando el archivo de configuración generado. Cuando agrega parámetros de configuración iniciales como [proxies](#proxy-configuration) y [IPs reservadas bloqueadas](#blocking-reserved-ips) en **Paso 3**, su archivo de configuración generado se actualiza automáticamente en **Paso 4**.

Puede acceder a opciones avanzadas para ajustar la configuración según la configuración de su red interna. Para más información sobre el `help` comando, consulte [Configuración][5].

#### Configuración del proxy {#proxy-configuration}

Si el tráfico entre su ubicación privada y Datadog debe pasar por un proxy, especifique la URL de su proxy como `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` para agregar el parámetro `proxyDatadog` asociado a su archivo de configuración generado.

{{<img src="synthetics/private_locations/pl_proxy_1.png" alt="Agregue un proxy a su archivo de configuración de ubicación privada." style="width:90%;">}}

#### Bloqueo de IPs reservadas {#blocking-reserved-ips}

Por defecto, los usuarios de Synthetic pueden crear pruebas Synthetic en puntos de conexión utilizando cualquier IP. Si desea evitar que los usuarios creen pruebas en IPs internas sensibles de su red, active el botón **Block reserved IPs** para bloquear un conjunto predeterminado de rangos de IPs reservadas ([IPv4 address registry][6] y [IPv6 address registry][7]) y establezca el parámetro asociado `enableDefaultBlockedIpRanges` en `true` en su archivo de configuración generado.

Si algunos de los puntos de conexión que desea probar se encuentran dentro de uno o varios de los rangos de IPs reservadas bloqueadas, puede agregar sus IPs y/o CIDRs a las listas permitidas para añadir los parámetros asociados `allowedIPRanges` a su archivo de configuración generado.

{{< img src="synthetics/private_locations/pl_reserved_ips_1.png" alt="Configure IPs reservadas" style="width:90%;">}}

### Vea su archivo de configuración {#view-your-configuration-file}

Después de agregar las opciones apropiadas a su archivo de configuración de ubicación privada, puede copiar y pegar este archivo en su directorio de trabajo. El archivo de configuración contiene secretos para la autenticación de ubicación privada, la desencriptación de la configuración de prueba y la encriptación de los resultados de prueba.

{{< img src="synthetics/private_locations/pl_view_file_1.png" alt="Configure IPs reservadas" style="width:90%;">}}

Datadog no almacena sus secretos, así que guárdelos localmente antes de hacer clic en **Ver Instrucciones de Instalación**.

**Nota:** Necesita poder referenciar estos secretos nuevamente si decide agregar más trabajadores o instalar trabajadores en otro servidor.

### Instale su ubicación privada {#install-your-private-location}

Puede usar `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` y `DATADOG_PRIVATE_KEY` variables de entorno en la definición de su tarea.

Lance su ubicación privada en:

{{< tabs >}}
{{% tab "Docker" %}}

Ejecute este comando para iniciar su trabajador de ubicación privada montando su archivo de configuración en el contenedor. Asegúrese de que su `<MY_WORKER_CONFIG_FILE_NAME>.json` archivo esté en `/etc/docker`, no en la carpeta raíz de inicio:

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**Nota:** Si ha bloqueado IPs reservadas, agregue las `NET_ADMIN` [capacidades de Linux][26] a su contenedor de ubicación privada.

Este comando inicia un contenedor de Docker y prepara su ubicación privada para ejecutar pruebas. **Datadog recomienda ejecutar el contenedor en modo desacoplado con una política de reinicio adecuada.**

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
La configuración de Podman es muy similar a Docker; sin embargo, debe establecer `NET_RAW` como una capacidad adicional para soportar pruebas ICMP.

1. Ejecute `sysctl -w "net.ipv4.ping_group_range = 0 2147483647"` desde el servidor donde se ejecuta el contenedor.
2. Ejecute este comando para iniciar su trabajador de ubicación privada montando su archivo de configuración en el contenedor. Asegúrese de que su archivo `<MY_WORKER_CONFIG_FILE_NAME>.json` sea accesible para montarlo en el contenedor:

   ```shell
   podman run --cap-add=NET_RAW --rm -it -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json gcr.io/datadoghq/synthetics-private-location-worker:latest
   ```

   Si ha configurado direcciones IP reservadas bloqueadas, agregue `NET_ADMIN` las capacidades de Linux a su contenedor de ubicación privada.

Este comando inicia un contenedor de Podman y prepara su ubicación privada para ejecutar pruebas. Datadog recomienda ejecutar el contenedor en modo desacoplado con una política de reinicio adecuada.
{{< /tab >}}

{{% tab "Despliegue de Kubernetes" %}}

Para desplegar el trabajador de ubicación privada de manera segura, configure y monte un secreto de Kubernetes en el contenedor bajo `/etc/datadog/synthetics-check-runner.json`.

1. Cree un secreto de Kubernetes con el archivo JSON creado previamente ejecutando lo siguiente:

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

{{% tab "Chart de Helm" %}}

Puede establecer variables de entorno en sus parámetros de configuración que apunten a secretos que ya ha configurado. Para crear variables de entorno con secretos, consulte la [documentación de Kubernetes][3].

Alternativamente:

1. Agregue la [Ubicación Privada de Datadog Synthetics][2] a sus repositorios de Helm:

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

2. Instale el gráfico con el nombre de lanzamiento `<RELEASE_NAME>` utilizando el archivo JSON creado previamente:

    ```shell
    helm install <RELEASE_NAME> datadog/synthetics-private-location --set-file configFile=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

**Nota:** Si ha bloqueado IPs reservadas, agregue `NET_ADMIN` las [capacidades de Linux][26] a su contenedor de ubicación privada.

[2]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#define-container-environment-variables-using-secret-data
[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "ECS" %}}

Cree una nueva definición de tarea EC2 que coincida con lo siguiente. Reemplace cada parámetro con el valor correspondiente encontrado en su archivo de configuración de ubicación privada generado previamente:

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

- Si ha bloqueado IPs reservadas, configure un [linuxParameters][31] para otorgar `NET_ADMIN` capacidades a sus contenedores de ubicación privada.
- Si utiliza las variables de entorno `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` y `DATADOG_PRIVATE_KEY`, no necesita incluirlas en la sección `"command": [ ]`.

[31]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{< /tab >}}

{{% tab "Fargate" %}}

Cree una nueva definición de tarea Fargate que coincida con lo siguiente. Reemplace cada parámetro con el valor correspondiente encontrado en su archivo de configuración de ubicación privada generado previamente:

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

**Nota:** Debido a que la opción de firewall de ubicación privada no es compatible con AWS Fargate, el parámetro `enableDefaultBlockedIpRanges` no puede establecerse en `true`.

{{< /tab >}}

{{% tab "Fargate con AWS Secret Manager" %}}

Cree un secreto en el administrador de secretos de AWS para almacenar todo o parte de la configuración de ubicación privada generada previamente. Tenga en cuenta que el `publicKey` no puede mantenerse tal como está en el archivo de configuración. Por ejemplo:

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

Se requieren permisos para permitir que la definición de tarea y la instancia de AWS Fargate lean del administrador de secretos. Consulte [Especificar datos sensibles utilizando secretos de Secrets Manager en Amazon ECS][25] para más información.

Cree una definición de tarea de Fargate que coincida con el siguiente ejemplo, reemplazando los valores en la lista de secretos con el ARN del secreto que creó en el paso anterior. Por ejemplo: `arn:aws:secretsmanager:<region>:<account-id>:secret:<secret_arn>:<secret_key>::`.

Si no guardó toda la configuración en el administrador de secretos, aún puede pasar el valor como argumentos de cadena codificados.

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

**Nota:** Debido a que la opción de firewall de ubicación privada no es compatible con AWS Fargate, el parámetro `enableDefaultBlockedIpRanges` no puede establecerse en `true`.

[25]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html

{{< /tab >}}

{{% tab "EKS" %}}

Debido a que Datadog ya se integra con Kubernetes y AWS, está listo para monitorear EKS.

1. Cree un secreto de Kubernetes con el archivo JSON creado anteriormente ejecutando lo siguiente:

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

{{% tab "Windows a través de la interfaz gráfica de usuario (GUI)" %}}

1. Descargue el archivo [`datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi`][101] y ejecute este archivo desde la máquina en la que desea instalar la ubicación privada.
1. Haga clic en **Siguiente** en la página de bienvenida, lea el EULA y acepte los términos y condiciones. Haga clic en **Siguiente**.
1. Modifique dónde se instalará la aplicación, o deje la configuración predeterminada. Haga clic en **Siguiente**.
1. Para configurar su ubicación privada de Windows, puede optar por:
   - Pegue e ingrese una configuración JSON para su Trabajador de Ubicación Privada de Datadog Synthetics. Este archivo es generado por Datadog cuando [cree una ubicación privada][102].
   - Navegue o escriba una ruta de archivo a un archivo que contenga una configuración JSON para su Trabajador de Ubicación Privada de Datadog Synthetics.
   - Puede dejarlo en blanco y ejecutar `C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=<PathToYourConfiguration>` en el símbolo del sistema de Windows después de que la instalación esté completa.

   {{< img src="synthetics/private_locations/configuration_selector_paste.png" alt="Asistente de trabajador de Ubicación Privada Synthetics, instalador MSI. La opción 'Pegar en una configuración JSON' está seleccionada. Se muestra un campo de texto para esta configuración JSON." style="width:80%;" >}}

1. Puede aplicar las siguientes opciones de configuración:

   {{< img src="synthetics/private_locations/synthetics_pl_windows_fips.png" alt="Asistente de trabajador de Ubicación Privada Synthetics, instalador MSI. La configuración del modo criptográfico FIPS 140-2 se muestra." style="width:80%;" >}}

   Aplique las reglas de firewall necesarias para este programa en el Firewall de Windows.
   : Permita que el instalador aplique las reglas de firewall durante la instalación y las elimine al desinstalar.

   Aplique reglas para bloquear IPs reservadas en el Firewall de Windows.
   : Configure reglas de bloqueo para Chrome, Firefox y Edge (si están instalados) y agregue reglas para bloquear rangos de direcciones IP reservadas salientes en el Firewall de Windows.

   Habilitar registro de archivos.
   : Permita que el trabajador de ubicación privada de Synthetics registre archivos en el directorio de instalación.

   Días de rotación de registros.
   : Especifica cuántos días mantener los registros antes de eliminarlos del sistema local.

   Verbosidad del registro.
   : Especifica la verbosidad del registro en consola y archivos para el trabajador de ubicación privada de Synthetics.

   Habilitar modo criptográfico FIPS 140-2.
   : Habilite módulos criptográficos compatibles con FIPS para comunicaciones seguras. El servidor de Windows debe estar ejecutándose en modo FIPS de Windows para usar esta opción. Disponible en Private Location v1.63.0 y superiores.

1. Haga clic en **Siguiente** y **Instalar** para iniciar el proceso de instalación.

Una vez que el proceso esté completo, haga clic en **Finalizar** en la página de finalización de la instalación.

<div class="alert alert-danger">Si ingresó su configuración JSON, el servicio de Windows comenzará a ejecutarse utilizando esa configuración. Si no ingresó su configuración, ejecute <code>C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=< PathToYourConfiguration ></code> desde un símbolo del sistema o use el <code>start menu</code> acceso directo para iniciar el Trabajador de Ubicación Privada de Synthetics.</div>

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[102]: https://app.datadoghq.com/synthetics/settings/private-locations

{{< /tab >}}

{{% tab "Windows a través de CLI" %}}

1. Descargue el archivo [`datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi`][101] y ejecute este archivo desde la máquina en la que desea instalar la ubicación privada.
2. Ejecute uno de los siguientes comandos dentro del directorio donde descargó el instalador:

   - En una terminal de PowerShell:

     ```powershell
     Start-Process msiexec "/i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi /quiet /qn CONFIG_FILEPATH=<ruta_a_tu_archivo_de_configuración_de_trabajador>";
     ```

   - O en una terminal de comandos:

     ```cmd
     msiexec /i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi /quiet /qn CONFIG_FILEPATH=<ruta_a_tu_archivo_de_configuración_de_trabajador>
     ```

Se pueden agregar parámetros adicionales:

| Parámetro Opcional | Definición | Valor | Valor por Defecto | Tipo |
|---|---|---|---|---|
| APPLYDEFAULTFIREWALLRULES | Aplica las reglas de firewall necesarias para el programa. | 1 | N/A | 0: Desactivado<br>1: Activado |
| APPLYFIREWALLDEFAULTBLOCKRULES | Bloquea las direcciones IP reservadas para cada navegador que tenga instalado (Chrome, Edge y Firefox). No es posible bloquear conexiones de loopback en el Firewall de Windows. | 0 | N/A | 0: Desactivado<br>1: Activado |
| LOGGING_ENABLED | Cuando está habilitado, esto configura el registro de archivos. Estos registros se almacenan en el directorio de instalación bajo la carpeta de registros. | 0 | `--enableFileLogging` | 0: Desactivado<br>1: Activado |
| LOGGING_VERBOSITY | Configura la verbosidad del registro para el programa. Esto afecta los registros de consola y de archivos. | Esto afecta los registros de consola y de archivos. | `-vvv` | `-v`: Error<br>`-vv`: Advertencia<br>`-vvv`: Información<br>`vvvv`: Depuración |
| LOGGING_MAXDAYS | Número de días para mantener los registros de archivos en el sistema antes de eliminarlos. Puede ser cualquier número al ejecutar una instalación desatendida. | 7 | `--logFileMaxDays` | Entero |
| CONFIG_FILEPATH | Esto debe cambiarse a la ruta de su archivo de configuración JSON del Trabajador de Ubicación Privada de Synthetics. Envuelva esta ruta entre comillas si su ruta contiene espacios. | <None> | `--config` | Cadena |

Para habilitar el modo criptográfico FIPS 140-2, establezca la variable de entorno `ENABLE_FIPS=1` antes de ejecutar el ejecutable del trabajador. El servidor de Windows debe estar ejecutándose en modo FIPS de Windows para usar esta opción. Disponible en Private Location v1.63.0 y superiores.

Ejemplo:

```cmd
set ENABLE_FIPS=1 && .\synthetics-pl-worker.exe --config "<PathToYourConfiguration>"
```

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi

{{< /tab >}}
{{< /tabs >}}

Para más información sobre los parámetros de ubicaciones privadas para administradores, consulte [Configuración][32].

#### Certificados raíz {#root-certificates}

Puede cargar certificados raíz personalizados en sus ubicaciones privadas para que sus pruebas de API y navegador realicen el SSL handshake utilizando sus propios `.pem` archivos.

{{< tabs >}}
{{% tab "Contenedor de Linux" %}}

Al iniciar sus contenedores de ubicación privada, monte los archivos de certificado relevantes `.pem` en `/etc/datadog/certs` de la misma manera que monta su archivo de configuración de ubicación privada. Estos certificados son considerados CA de confianza y se utilizan en el tiempo de ejecución de las pruebas.

<div class="alert alert-info">Si combina todos sus <code>.pem</code> archivos en un solo archivo, la secuencia de los certificados dentro del archivo es importante. Es necesario que el certificado intermedio preceda al certificado raíz para establecer con éxito una cadena de confianza.</div>

{{% /tab %}}

{{% tab "Servicio de Windows" %}}

Para instalar certificados raíz para ubicaciones privadas en un servicio de Windows, use los siguientes pasos:

1. Abra la aplicación del Editor del Registro.
2. Navegue a la entrada `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\synthetics-private-location`.
3. Cree una clave del Registro llamada `Environment` con el tipo de valor `Multi-string`.

<div class="alert alert-info">Su certificado debe estar en la misma carpeta que su Servicio de Monitoreo Sintético:
predeterminado: <code>C:\Program Files\Datadog-Synthetics\Synthetics</code>.</div>

4. Establezca el valor `NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem`

   {{< img src="synthetics/private_locations/windows_pl_set_service.png" alt="La descripción de su imagen" style="width:100%;" >}}

5. Abra la aplicación de Servicios y recargue el servicio de Ubicación Privada de Monitoreo Sintético de Datadog.

{{% /tab %}}

{{% tab "Windows independiente" %}}

Para instalar certificados raíz para ubicaciones privadas en un proceso independiente de Windows con `synthetics-private-location.exe`, utilice los siguientes pasos:

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

El servidor de Windows debe estar ejecutándose en modo FIPS de Windows para usar esta opción. Disponible en Private Location v1.63.0 y superiores.

{{% /tab %}}
{{< /tabs >}}

#### Configure las sondas de disponibilidad y preparación {#set-up-liveness-and-readiness-probes}

Agregue una sonda de disponibilidad o preparación para que su orquestador pueda asegurar que los trabajadores estén funcionando correctamente.

Para las sondas de preparación, necesita habilitar las sondas de estado de ubicación privada en el puerto `8080` en su implementación de ubicación privada. Para más información, consulte [Configuración de Ubicaciones Privadas][5].

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

{{% tab "Gráfico de Helm" %}}

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

#### Configuraciones adicionales de verificación de salud {#additional-health-check-configurations}

<div class="alert alert-warning">Este método de agregar verificaciones de salud de ubicación privada ya no es compatible. Datadog recomienda usar sondas liveness y readiness.</div>

El archivo `/tmp/liveness.date` de contenedores de ubicación privada se actualiza después de cada sondeo exitoso de Datadog (2s por defecto). El contenedor se considera no saludable si no se ha realizado un sondeo en un tiempo, por ejemplo: sin obtención en el último minuto.

Utiliza la configuración a continuación para establecer verificaciones de salud en tus contenedores con `livenessProbe`:

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

{{% tab "Gráfico de Helm" %}}

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

### Actualiza una imagen de ubicación privada {#upgrade-a-private-location-image}

Para actualizar una ubicación privada existente, haga clic en el ícono de **Engranaje** en el panel lateral de ubicación privada y haga clic en **Instrucciones de instalación**.

{{< img src="synthetics/private_locations/pl_edit_config.png" alt="Acceda al flujo de trabajo de configuración para una ubicación privada" style="width:90%;" >}}

Luego, ejecute el comando de configuración [ basado en su entorno](#install-your-private-location) para obtener la última versión de la imagen de ubicación privada.

**Nota**: Si está utilizando `docker run` para lanzar su imagen de ubicación privada y ha instalado previamente la imagen de ubicación privada usando la etiqueta `latest`, asegúrese de agregar `--pull=always` al comando `docker run` para garantizar que se obtenga la versión más nueva en lugar de depender de la versión en caché de la imagen que pueda existir localmente con la misma etiqueta `latest`.

### Pruebe su punto de conexión interno {#test-your-internal-endpoint}

Una vez que al menos un trabajador de ubicación privada comience a reportar a Datadog, el estado de la ubicación privada se muestra en verde.

{{< img src="synthetics/private_locations/pl_reporting.png" alt="Reporte de ubicación privada" style="width:90%;">}}

Puedes ver un estado de salud `REPORTING` y un estado de monitor asociado en la lista de Ubicaciones Privadas en la página de **Configuraciones**.

{{< img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="Estado de salud y monitor de ubicación privada" style="width:100%;">}}

Comience a probar su primer punto de conexión interno lanzando una prueba rápida en uno de sus puntos de conexión internos para ver si obtiene la respuesta esperada:

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="Prueba rápida en ubicación privada" video="true" width="90%">}}

**Nota:** Datadog solo envía tráfico saliente desde su ubicación privada, no se transmite tráfico entrante.

## Lance pruebas sintéticas desde su ubicación privada {#launch-synthetic-tests-from-your-private-location}

Cree una prueba de API, API de múltiples pasos o prueba de navegador, y seleccione sus **Ubicaciones Privadas** de interés.

{{< img src="synthetics/private_locations/assign-test-pl_3.png" alt="Asigne prueba Synthetic a ubicación privada" style="width:90%;">}}

Utilice ubicaciones privadas de la misma manera que sus ubicaciones gestionadas por Datadog: asigne [Synthetic tests][29] a ubicaciones privadas, visualice los resultados de las pruebas, recupere [Synthetic metrics][11] y más.

## Escale su ubicación privada {#scale-your-private-location}

Debido a que puede ejecutar varios trabajadores para una sola ubicación privada con un único archivo de configuración, puede **escalar horizontalmente** sus ubicaciones privadas añadiendo o eliminando trabajadores de ellas. Al hacerlo, asegúrese de establecer un `concurrency` parámetro y asignar recursos de trabajadores que sean consistentes con los tipos y el número de pruebas que desea que su ubicación privada ejecute.

También puede **escalar verticalmente** sus ubicaciones privadas aumentando la carga que sus trabajadores de ubicación privada pueden manejar. De manera similar, debe usar el parámetro `concurrency` para ajustar el número máximo de pruebas que sus trabajadores pueden ejecutar y actualizar los recursos asignados a ellos.

Para más información, consulte [Dimensionamiento de Ubicaciones Privadas][18].

Para utilizar ubicaciones privadas para Continuous Testing, establezca un valor en el `concurrency` parámetro para controlar su paralelización. Para más información, consulte [Continuous Testing][23].

## Realice el seguimiento de su ubicación privada {#monitor-your-private-location}

Mientras inicialmente añade recursos que son consistentes con el número y tipo de pruebas a ejecutar desde su ubicación privada, la forma más fácil de saber si debe reducir o aumentar la escala de su ubicación privada es monitorearlos de cerca. [Seguimiento de Ubicaciones Privadas][19] proporciona información sobre el rendimiento y el estado de su ubicación privada, así como métricas y Monitors listos para usar.

Para más información, consulte [Seguimiento de Ubicaciones Privadas][19].

## Permisos {#permissions}

Por defecto, solo los usuarios con el Rol de Datadog Admin pueden crear ubicaciones privadas, eliminar ubicaciones privadas y acceder a las pautas de instalación de ubicaciones privadas.

Los usuarios con los [roles de Datadog Admin y Datadog Standard][20] pueden ver ubicaciones privadas, buscar ubicaciones privadas y asignar pruebas Synthetic a ubicaciones privadas. Conceda acceso a la [**página de Ubicaciones Privadas**][22] actualizando su usuario a uno de estos dos [roles predeterminados][19].

Si está utilizando la [función de rol personalizado][21], añada su usuario a un rol personalizado que incluya permisos de `synthetics_private_location_read` y `synthetics_private_location_write`.

<div class="alert alert-warning">Si una prueba incluye ubicaciones privadas restringidas, actualizar la prueba elimina esas ubicaciones de la prueba.</div>

## Restringir acceso {#restrict-access}

Utilice [control de acceso granular][24] para limitar quién tiene acceso a su prueba según roles, equipos o usuarios individuales:

1. Abra la sección de permisos del formulario.
2. Haga clic en **Editar Acceso**.
  {{< img src="synthetics/settings/grace_2.png" alt="Establezca permisos para su prueba desde el formulario de configuración de Ubicaciones Privadas." style="width:100%;" >}}
3. Haga clic en **Restringir Acceso**.
4. Seleccione equipos, roles o usuarios.
5. Haga clic en **Agregar**.
6. Seleccione el nivel de acceso que desea asociar con cada uno de ellos.
7. Haga clic en **Listo**.

<div class="alert alert-info">Puede ver resultados de una Ubicación Privada incluso sin acceso de visualización a esa Ubicación Privada. <br><br>
Restringir una Ubicación Privada puede impedir que otros usuarios la agreguen a una prueba o la editen, pero aún podrán ver el nombre de la ubicación si fue agregada a una prueba por un usuario autorizado.</div>

| Nivel de acceso | Ver instrucciones de PL | Ver métricas de PL | Usar PL en prueba | Editar configuración de PL  |
| ------------ | ---------------------| --------------- | -------------- | ---------------------- |
| Sin acceso    |                      |                 |                |                        |
| Viewer       | {{< X >}}            | {{< X >}}       | {{< X >}}      |                        |
| Editor       | {{< X >}}            | {{< X >}}       | {{< X >}}      | {{< X >}}              |

## Lectura adicional {#further-reading}

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