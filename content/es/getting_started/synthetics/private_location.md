---
description: Configura localizaciones privadas para monitorizar aplicaciones internas
  y URL privadas. Crea localizaciones personalizadas para áreas de misión crítica
  y entornos de pruebas internos.
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: Blog
  text: Monitoriza tus localizaciones privadas Synthetic con Datadog
- link: /synthetics/private_locations
  tag: Documentación
  text: Más información sobre las localizaciones privadas
- link: /synthetics/guide/kerberos-authentication/
  tag: Guía
  text: Autenticación Kerberos para la monitorización Synthetic
title: Empezando con las localizaciones privadas
---

## Información general

Las localizaciones privadas te permiten **monitorizar aplicaciones internas** o direcciones URL privadas que no son accesibles a través de la red pública de Internet. 

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Diagrama de arquitectura que muestra cómo funciona una localización privada durante la monitorización Synthetic" style="width:100%;">}}

También puedes utilizar las localizaciones privadas para:

- **Crear localizaciones personalizadas** en áreas consideradas críticas para el desarrollo de tu negocio.
- **Verificar el rendimiento de la aplicación en tu entorno de testeo interno** antes de lanzar nuevas funciones a la fase de producción con [tests Synthetic en tus pipelines de integración/distribución continuas (CI/CD)][1].
- **Comparar el rendimiento de la aplicación** desde dentro y fuera de tu red interna.
- **[Autenticar tests de monitorización Synthetic utilizando el inicio de sesión único de Kerberos][16]** para sitios y API internos basados en Windows.

Las localizaciones privadas son contenedores Docker o servicios Windows que puedes instalar en cualquier lugar dentro de tu red privada. Busca la imagen Docker en [Google Container Registry][2] o descarga el [instalador de Windows][13].**\***

**Nota**: Las localizaciones privadas en Docker sólo son compatibles con la arquitectura amd64. Si tienes alguna pregunta sobre la compatibilidad con arm64, ponte en contacto con el [servicio de asistencia de Datadog][15].

**\*** **El uso y funcionamiento de este software se rige por el Acuerdo de licencia de usuarios finales, disponible [aquí][14].**

Una vez que hayas creado e instalado tu localización privada, puedes asignar [tests Synthetic][3] a tu localización privada igual que harías con una localización gestionada.

Los resultados de los tests de las localizaciones privadas se muestran de forma idéntica a los resultados de los tests de la localización gestionada.

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Asignar un test Synthetic a localizaciones privadas" style="width:100%;">}}

## Creación de tu localización privada

1. En el sitio Datadog, pasa el ratón sobre **Experiencia digital** y selecciona **Configuración** > [**Localizaciones privadas**][5].
2. Haz clic en **Add Private Location** (Añadir localización privada).
3. Rellena los datos de tu localización privada. Solo los campos `Name` y `API key` son obligatorios.
4. Haz clic en **Save Location and Generate Configuration File** (Guardar localización y generar archivo de configuración) para generar el archivo de configuración asociado a tu localización privada en tu worker. 
5. Dependiendo de dónde hayas instalado tu localización privada, es posible que tengas que introducir parámetros adicionales en el archivo de configuración:
    - Si utilizas un proxy, introduce la URL del siguiente modo: `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`.
    - Si quieres bloquear direcciones IP reservadas, activa **Block reserved IPs** (Bloquear IP reservadas) e introduce los rangos de IP.

    Para obtener más información, consulta las [opciones de configuración de las localizaciones privadas][6] y cómo [realizar tests Synthetic desde localizaciones privadas][7].

6. Copia y pega el archivo de configuración de tu localización privada en tu directorio de trabajo.

    **Nota**: El archivo de configuración contiene secretos para autenticar la localización privada, descifrar la configuración del test y cifrar sus resultados. Datadog no almacena estos secretos, así que guárdalos en una unidad local antes de salir del formulario de creación de **localizaciones privadas**. **Para poder añadir más workers a tu localización privada, es necesario que puedas volver a consultar estos secretos**.
7. Cuando lo tengas todo listo, haz clic en **View Installation Instructions** (Ver instrucciones de instalación).
8. Sigue las instrucciones de instalación en función del entorno en el que quieras ejecutar el worker de la localización privada.
9. Si utilizas Docker, lanza tu worker como un contenedor autónomo, utilizando el comando Docker `run` y tu archivo de configuración:

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

    Este comando lanza un contenedor Docker y prepara tu localización privada para ejecutar pruebas. Datadog recomienda ejecutar el contenedor en modo separado con la política de reinicio adecuada.

    <div class="alert alert-info">Puedes utilizar otro tiempo de ejecución de contenedor, como por ejemplo Podman. Para obtener más información, consulta la <a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=podman#install-your-private-location">documentación sobre localizaciones privadas</a>.</div>

    Si usas Windows, [ejecuta el instalador de localizaciones privadas de Synthetics con una GUI][12] o ejecuta el comando `msiexec` en la línea de comandos, dentro del directorio donde has descargado el instalador:

    ```shell
    msiexec /i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
    ```

10. Si tu localización privada envía información correctamente a Datadog, aparecerá un `OK` en **Private Location Status** (Estado de la localización privada) y en la lista de **Private Locations** (Localizaciones privadas) de la página **Settings** (Configuración):

    {{< img src="synthetics/private_locations/pl_health.png" alt="Estado de localización privada" style="width:100%;">}}

    Además, puedes ver los logs de una localización privada en tu terminal:

    ```text
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```
11. Una vez que hayas terminado con todos los tests de tu endpoint interno, haz clic en **OK**.

## Ejecuta tests Synthetic con tu localización privada

Utiliza tu nueva localización privada como si fuese una localización gestionada en tus tests Synthetic.

1. Crea un [test de API][2], un [test de API multipaso][8] o un [test de navegador][9] en cualquier endpoint interno o aplicación que quieras monitorizar.
2. En la sección **Private Locations** (Localizaciones privadas), selecciona tu nueva localización privada:

    {{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Asignar un test Synthetic a una localización privada" style="width:100%;">}}

3. ¡Continúa rellenando el test!

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}



[1]: /es/continuous_testing/cicd_integrations
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[3]: /es/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/settings/private-locations
[6]: /es/synthetics/private_locations/configuration/#configuration-options
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