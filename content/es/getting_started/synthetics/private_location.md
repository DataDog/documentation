---
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: Blog
  text: Monitoriza tus localizaciones privadas Synthetic con Datadog
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Crea tu primer test de API
- link: /getting_started/synthetics/browser_test
  tag: Documentación
  text: Crea tu primer test de navegador
- link: /synthetics/private_locations
  tag: Documentación
  text: Más información sobre las localizaciones privadas
kind: documentación
title: Empezando con las localizaciones privadas
---

## Información general

Las localizaciones privadas te permiten **monitorizar aplicaciones internas** o direcciones URL privadas que no son accesibles a través de la red pública de Internet. 

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Diagrama de arquitectura que muestra cómo funciona una localización privada durante la monitorización de Synthetic" style="width:100%;">}}

También puedes utilizar las localizaciones privadas para:

- **Crear localizaciones personalizadas** en áreas consideradas críticas para el desarrollo de tu negocio.
- **Verificar el rendimiento de la aplicación en tu entorno de testeo interno** antes de lanzar nuevas funciones a la fase de producción con [tests Synthetic en tus pipelines de integración/distribución continuas (CI/CD)][1].
- **Comparar el rendimiento de la aplicación** desde dentro y fuera de tu red interna.

Los localizaciones privadas son contenedores de servicios de Docker o Windows que puedes instalar en cualquier lugar de tu red privada. Recupera la imagen Docker en [Google Container Registry][2] o descarga el [instalador de Windows][13].

Una vez que hayas creado e instalado tu localización privada, puedes asignar [tests Synthetic][3] a tu localización privada igual que harías con una localización gestionada.

Los resultados de los tests de las localizaciones privadas se muestran de forma idéntica a los resultados de los tests de la localización gestionada.

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Asignar un test Synthetic a localizaciones privadas" style="width:100%;">}}

## Crea tu localización privada

1. En el sitio de Datadog, pasa el cursor sobre **[UX Monitoring][5]** (Monitorizar la experiencia de uso) y selecciona *Settings** > **Private Locations** (Configuración > Localizaciones privadas).
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
9. Si utilizas Docker, lanza tu worker como un contenedor autónomo utilizando el comando Docker `run` y tu archivo de configuración:

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

    Este comando inicia un contenedor Docker y prepara tu localización privada para ejecutar pruebas. Datadog recomienda ejecutar el contenedor en modo separado con la política de reinicio adecuada.

    <div class="alert alert-info">Puedes utilizar otro tiempo de ejecución de contenedor, como por ejemplo Podman. Para obtener más información, consulta la <a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=podman#install-your-private-location">documentación sobre localizaciones privadas</a>.</div>

    Si utiliza Windows, ejecuta el instalador de localizaciones privadas de Synthetics con una GUI][12] o ejecuta el comando `msiexec` en la línea de comandos, dentro del directorio donde has descargado el instalador:

    ```shell
    msiexec /i datadog-synthetics-worker-<version-number>.amd64.msi
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

Utiliza tu nueva localización privada como si fuese una localización gestionada en tus test de Synthetic.

1. Crea un [test de API][2], un [test de API multipaso][8] o un [test de navegador][9] en cualquier endpoint interno o aplicación que quieras monitorizar.
2. En la sección **Private Locations**, selecciona tu nueva localización privada:

    {{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Asignar un test Synthetic a una localización privada" style="width:100%;">}}

3. ¡Continúa rellenando el test!

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_testing/cicd_integrations
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[3]: /es/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/list
[6]: /es/synthetics/private_locations/configuration/#configuration-options
[7]: /es/synthetics/private_locations/?tab=docker#blocking-reserved-ips
[8]: /es/getting_started/synthetics/api_test#create-a-multistep-api-test
[9]: /es/getting_started/synthetics/browser_test
[10]: https://podman.io/
[11]: https://app.vagrantup.com/ubuntu/boxes/jammy64
[12]: /es/synthetics/private_locations?tab=windows#install-your-private-location
[13]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-1.43.0.amd64.msi