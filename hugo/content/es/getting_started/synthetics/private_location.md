---
description: Configure ubicaciones privadas para supervisar aplicaciones internas
  y URL privadas. Cree ubicaciones personalizadas para áreas de misión crítica y entornos
  de prueba internos.
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: Blog
  text: Haga un seguimiento de sus ubicaciones privadas Synthetic con Datadog
- link: /synthetics/private_locations
  tag: Documentación
  text: Más información sobre ubicaciones privadas
- link: /synthetics/guide/kerberos-authentication/
  tag: Guía
  text: Autenticación Kerberos para Synthetic Monitoring
title: Introducción a Private Locations
---
## Descripción general {#overview}

Las ubicaciones privadas le permiten **supervisar aplicaciones internas** o URL privadas que no son accesibles desde Internet pública. 

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Diagrama de arquitectura de cómo funciona una ubicación privada en Synthetic Monitoring" style="width:100%;">}}

También puede usar ubicaciones privadas para:

- **Crear ubicaciones personalizadas** en áreas de misión crítica de su negocio.
- **Verificar el rendimiento de la aplicación en su entorno de prueba interno** antes de lanzar nuevas funciones a producción con [pruebas Synthetic en sus Pipelines de CI/CD][1].
- **Comparar el rendimiento de la aplicación** desde dentro y fuera de su red interna.
- **[Autentique pruebas de Synthetic Monitoring mediante Kerberos SSO][16]** para sitios y API internos basados en Windows.

Las ubicaciones privadas son contenedores de Docker o servicios de Windows que puede instalar en cualquier lugar dentro de su red privada. Obtenga la imagen de Docker en [Docker Hub][2] o descargue el [instalador de Windows][13].**\*** 

**Nota**: Las ubicaciones privadas en contenedores de Docker solo son compatibles con la arquitectura amd64. Si tiene alguna pregunta sobre la compatibilidad con arm64, comuníquese con el [soporte de Datadog][15].

**\*** **El uso y la operación de este software se rigen por el Acuerdo de licencia de usuario final disponible [aquí][14].**

Una vez que haya creado e instalado su ubicación privada, puede asignar [pruebas Synthetic][3] a su ubicación privada tal como lo haría con una ubicación administrada. 

Los resultados de las pruebas de sus ubicaciones privadas se muestran de forma idéntica a los resultados de las pruebas de su ubicación administrada. 

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Asignar una prueba Synthetic a ubicaciones privadas" style="width:100%;">}}

## Cree su ubicación privada {#create-your-private-location}

1. En el sitio de Datadog, pase el cursor sobre {{< ui >}}Digital Experience{{< /ui >}} y seleccione {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Private Locations{{< /ui >}}][5]. 
2. Haga clic en {{< ui >}}Add Private Location{{< /ui >}}.
3. Complete los detalles de su ubicación privada. Solo los campos {{< ui >}}Name{{< /ui >}} y {{< ui >}}API key{{< /ui >}} son obligatorios.
4. Haga clic en {{< ui >}}Save Location and Generate Configuration File{{< /ui >}} para generar el archivo de configuración asociado con su ubicación privada en su worker. 
5. Dependiendo de dónde haya instalado su ubicación privada, es posible que deba ingresar parámetros adicionales en su archivo de configuración: 
    - Si utiliza un proxy, ingrese la URL como `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`. 
    - {{< ui >}}Block reserved IPs{{< /ui >}} está activado de forma predeterminada, lo que limita el acceso de la ubicación privada a las IP reservadas. Para permitir el acceso a puntos de conexión específicos, ingrese rangos de IP y/o nombres de dominio.  

    Para obtener más información, consulte [Opciones de configuración de ubicaciones privadas][6], [Ejecutar pruebas Synthetic desde ubicaciones privadas][7] y [Fortalecimiento de la seguridad de red de ubicaciones privadas][17]. 

6. Copie y pegue el archivo de configuración de su ubicación privada en su directorio de trabajo.

    **Nota**: El archivo de configuración contiene secretos para la autenticación de la ubicación privada, el descifrado de la configuración de pruebas y el cifrado de los resultados de las pruebas. Datadog no almacena los secretos, así que guárdelos localmente antes de salir del formulario de creación de {{< ui >}}Private Locations{{< /ui >}}. **Necesita poder volver a consultar los secretos para agregar más workers a su ubicación privada**. 
7. Cuando esté listo, haga clic en {{< ui >}}View Installation Instructions{{< /ui >}}.
8. Siga las instrucciones de instalación según el entorno en el que desee ejecutar el worker de Private Location.
9. Si utiliza Docker, inicie su worker como un contenedor independiente utilizando el comando `run` de Docker y su archivo de configuración:

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```
    
    This command starts a Docker container and prepares your private location to run tests. Datadog recommends running the container in detached mode with proper restart policy.

    <div class="alert alert-info">Puede utilizar otro entorno de ejecución de contenedores, como Podman. Para obtener más información, consulte la <a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=podman#install-your-private-location">documentación de ubicaciones privadas</a>.</div>
    
    If you are using Windows, [run the Synthetics Private Location Installer with a GUI][12] or run the `msiexec` command on the command line inside the directory where you downloaded the installer:

    ```shell
    msiexec /i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
    ```

10. Si su ubicación privada informa correctamente a Datadog, se mostrará un estado de salud `OK` en {{< ui >}}Private Location Status{{< /ui >}} y en la lista {{< ui >}}Private Locations{{< /ui >}} en la página {{< ui >}}Settings{{< /ui >}}:

    {{< img src="synthetics/private_locations/pl_health.png" alt="Estado de salud de la ubicación privada" style="width:100%;">}}

    Additionally, you can see private location logs in your terminal:

    ```text
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```
11. Una vez que termine de probar su punto de conexión interno, haga clic en {{< ui >}}OK{{< /ui >}}.

## Ejecute pruebas Synthetic con su ubicación privada {#run-synthetic-tests-with-your-private-location}

Utilice su nueva ubicación privada tal como lo haría con una ubicación administrada en sus pruebas Synthetic.

1. Cree una [prueba de API][2], una [prueba de API en varios pasos][8] o una [prueba de navegador][9] en cualquier punto de conexión o aplicación interna que desee monitorear.
2. En {{< ui >}}Private Locations{{< /ui >}}, seleccione su nueva ubicación privada:

    {{< img src="synthetics/private_locations/assign-test-pl_3.png" alt="Asigne una prueba Synthetic a una ubicación privada" style="width:100%;">}}

3. ¡Continúe completando su prueba!

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}



[1]: /es/continuous_testing/cicd_integrations
[2]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[3]: /es/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/settings/private-locations
[6]: /es/synthetics/platform/private_locations/configuration/#all-configuration-options
[7]: /es/synthetics/private_locations/?tab=docker#blocking-reserved-ips
[8]: /es/getting_started/synthetics/api_test#create-a-multistep-api-test
[9]: /es/getting_started/synthetics/browser_test
[10]: https://podman.io/
[11]: https://app.vagrantup.com/ubuntu/boxes/jammy64
[12]: /es/synthetics/private_locations?tab=windows#install-your-private-location
[13]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[14]: https://www.datadoghq.com/legal/eula/
[15]: https://www.datadoghq.com/support/
[16]: /es/synthetics/guide/kerberos-authentication/
[17]: /es/synthetics/platform/private_locations/network_security/