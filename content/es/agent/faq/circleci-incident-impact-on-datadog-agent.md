---
kind: faq
title: Impacto de la incidencia de seguridad de CircleCI en el Agent de Datadog
---
<details>
  <summary><strong>Registros de cambios de la página</strong></summary>

  <table>
    <tr>
        <td><strong>Fecha</strong></td>
        <td><strong>Descripción</strong></td>
    </tr>
    <tr>
        <td>13 de enero de 2023</td>
        <td>Publicación inicial</td>
    </tr>
    <tr>
        <td>16 de enero de 2023</td>
        <td>Actualización del script <code>rpm_check</code> v1.1.0, modificaciones para garantizar la claridad</td>
    </tr>
    <tr>
        <td>17 de enero de 2023</td>
        <td>Actualización del script <a href="/resources/sh/rpm_check.sh"><code>rpm_check</code></a> v1.2.0, pasos de identificación y solución más claros</td>
    </tr>
    <tr>
        <td>3 de febrero de 2023</td>
        <td>Aclaración de qué versiones del Agent 5 están firmadas con la clave afectada</td>
    </tr>
</table>
</details>

<div class="alert alert-warning"><strong>Resumen</strong>: comprueba tus hosts basados en RPM (RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, SUSE/SLES, Fedora) para encontrar y corregir cualquier configuración de confianza en la clave con huella digital <code>60A389A44A0C32BAE3C03F0B069B56F54172A230</code>.</a></div>

El 4 de enero de 2023, CircleCI notificó a Datadog que se estaba investigando una [incidencia de seguridad][1] que podría haber dado lugar a la filtración de secretos almacenados. Datadog identificó un único secreto almacenado en CircleCI que, en teoría, un posible atacante podría usar indebidamente: se trataba de una clave de firma privada RPM GNU Privacy Guard (GPG) antigua y su frase de contraseña. Esta página ofrece información sobre las implicaciones de la posible fuga, qué debes hacer en tus hosts y qué medidas estamos tomando en Datadog para mitigar cualquier riesgo para nuestros clientes.

<div class="alert alert-info">
<strong>Nota</strong>: A fecha del 16 de enero de 2023, en Datadog no tenemos indicios de que esta clave se haya filtrado o utilizado de forma indebida. Sin embargo, seguimos adoptando y recomendando las siguientes medidas por precaución.
</div>

## Clave afectada

La clave de firma RPM GPG afectada tiene la huella digital `60A389A44A0C32BAE3C03F0B069B56F54172A230`, a la que se puede acceder desde [nuestra localización de claves de firma][2]. Históricamente, esta clave se utilizó para firmar:

* Las versiones del Agent 5 hasta la v5.32.8 y las del Agent 6 hasta la v6.13.0, ambas inclusive, (paquete `datadog-agent`)
* Las versiones de DogStatsD 6 independientes y de DogStatsD 7 independientes hasta la v7.23.1 incluida (paquete`datadog-dogstatsd`)

<div class="alert alert-info">
<strong>Nota</strong>: Los repositorios oficiales de Datadog <strong>no</strong> se han visto afectados. De llegar realmente a filtrarse la clave de firma, esta podría usarse para crear un paquete RPM que parezca ser de Datadog, aunque eso no sería suficiente para colocarlo en nuestros repositorios de paquetes oficiales. Para tener éxito, un atacante hipotético con la clave afectada debería ser capaz de cargar el paquete RPM creado en un repositorio que utilicen tus hosts.
</div>

## Buscar los hosts afectados

La incidencia puede afectar a los hosts que ejecutan **distribuciones de Linux basadas en RPM**, incluido RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, SUSE/SLES y Fedora. Los hosts que se ejecutan otros sistemas operativos, como macOS, Windows, Debian y Ubuntu, y los Agents de contenedores no se ven afectados.

Antes de comenzar, si tienes una infraestructura grande, **prioriza la búsqueda** de hosts que confíen en la clave. Debido a la variedad de formas en que pueden instalarse y actualizarse los paquetes a lo largo del tiempo, Datadog recomienda comprobar **todos** los hosts de Linux basados ​​en RPM que tengan instalado un paquete de Datadog. Para ayudarte a priorizar qué hosts comprobar primero, ten en cuenta las siguientes pautas. **Es muy probable** que las situaciones indicadas se vean afectadas:
   * Agent v5 o v6
   * DogStatsD v6 independiente o v7.23.2 y versiones anteriores

   En hosts de Linux basados ​​en RPM, es **poco probable** que las siguientes situaciones se vean afectadas. Aun así, merece la pena comprobar tus hosts:
   * Agent v7
   * DogStatsD independiente a partir de la v7.23.2.

   Los siguientes casos **no** se ven afectados:
   * El Agent se instaló con paquetes de Datadog en macOS, Windows, Debian o Ubuntu.
   * El host utiliza el Agent de contenedores.

Comprueba cada host para ver si confía en la clave afectada de la base de datos de RPM o del archivo de repositorio de Datadog, o ambos:

1. Comprueba la base de datos de RPM ejecutando el siguiente comando:

   ```bash
   $ rpm -q gpg-pubkey-4172a230-55dd14f6
   ```

   **El host confía en la clave y es necesario actuar** si el comando se ejecuta correctamente e imprime `gpg-pubkey-4172a230-55dd14f6`. **El host no confía en la clave en la base de datos de RPM** si el comando falla, y muestra un código de salida distinto de 0 y emite un mensaje como`package gpg-pubkey-4172a230-55dd14f6 is not installed`.

2. Comprueba el archivo de repositorio de Datadog, cuya localización predeterminada es:

   - RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux y Fedora: `/etc/yum.repos.d/datadog.repo`
   - OpenSUSE y SLES:  `/etc/zypp/repos.d/datadog.repo`

   Si el archivo de repositorio menciona `DATADOG_RPM_KEY.public` en la entrada `gpgkey` tal como se muestra en los siguientes ejemplos, **el host confía en la clave afectada y es necesario actuar**:

   * `https://s3.amazonaws.com/public-signing-keys/DATADOG_RPM_KEY.public`
   * `https://keys.datadoghq.com/DATADOG_RPM_KEY.public`
   * `https://s3.amazonaws.com/yum.datadoghq.com/DATADOG_RPM_KEY.public`
   * `https://yum.datadoghq.com/DATADOG_RPM_KEY.public`

Si se determina que uno o ambos confían en la clave, haz lo que se indica en las siguientes secciones para proteger el host afectado. Si se determina que ninguno confía en ella, no es necesario hacer otra acción.

## Proteger los hosts afectados

Asegúrate de que tus hosts **dejen de confiar en la clave afectada**. Si los pasos anteriores indicaron que algún host confía en la clave, sigue estos pasos:

1. Si utilizas herramientas o complementos de automatización de la configuración, como el rol de Datadog de Ansible, actualízalos a la versión más reciente que se indique en [Qué está haciendo Datadog](#what-datadog-is-doing).

   Si sigues utilizando versiones antiguas de herramientas o complementos de automatización de la configuración, las medidas de corrección que adoptes podrían no ser eficaces. Si aún no puedes actualizar a las nuevas versiones corregidas, añade los pasos de eliminación manual de claves (pasos 3 y 4) a tus manuales de ejecución de las herramientas de automatización y asegúrate de que se ejecuten _después_ de las herramientas y complementos de Datadog en el orden de tu manual de ejecución.

2. Para los hosts que se configuran con los scripts de instalación oficiales de Datadog, ejecuta la última versión del script de instalación para dejar de confiar en la clave y aprovisiona los archivos de repositorio actualizados.

3. Si al ejecutar `rpm -q gpg-pubkey-4172a230-55dd14f6` se sigue detectando la clave, elimínala de la base de datos de RPM y deja de confiar en ella al ejecutar el siguiente comando:

   ```bash
   $ sudo rpm --erase gpg-pubkey-4172a230-55dd14f6
   ```

4. Si sigue apareciendo `DATADOG_RPM_KEY.public` en el archivo de repositorio, elimina la clave al quitar la línea `gpgkey` que termina por `DATADOG_RPM_KEY.public`. Si se trata de la única entrada `gpgkey` de tu archivo de repositorio, remplázala por `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public`. Encontrarás más información en la sección [Implicaciones de dejar de confiar en la clave afectada](#implications-of-no-longer-trusting-the-affected-key).

5. Por precaución, comprueba que Datadog haya creado los paquetes firmados por la clave afectada en los hosts afectados al ejecutar [este script][3]:

   ```bash
   $ curl -o /tmp/rpm_check.sh https://docs.datadoghq.com/resources/sh/rpm_check.sh && chmod +x /tmp/rpm_check.sh
   $ /tmp/rpm_check.sh
   ```

   Este script comprueba que todos los paquetes de Datadog instalados y firmados por la clave afectada hayan sido creados por Datadog y busca cualquier paquete firmado por la clave afectada no creado por Datadog.

   Si la salida contiene líneas que empiezan por `[ ERROR ]`, **notifícalo al [equipo de asistencia de Datadog][4]** junto con la salida completa del script.

## Implicaciones de dejar de confiar en la clave afectada

Si el host en cuestión utiliza el Agent 7, no hay ninguna implicación, ya que los paquetes del Agent 7 nunca se firmaron con la clave afectada.

Los hosts ya no pueden instalar:
- Agents con versiones anteriores a la v6.14.0. Actualiza al menos a la v6.14.0 o al Agent v7.
- DogStatsD v6 independiente o versiones de DogStatsD independiente anteriores a la v7.24.0 (paquetes `datadog-dogstatsd`). Actualiza a una versión de DogStatsD a partir de la 7.24.0.
- Agents anteriores a la v5.32.8. Instala una versión del Agent v5.32.9 a partir de la v6.14.0 o el Agent v7.

## Qué está haciendo Datadog

Hemos lanzado un **nuevo RPM del Agent 5** para CentOS/RHEL, [5.32.9-1][5], firmado con la [clave de firma de RPM actual][6], `C6559B690CA882F023BDF3F63F4D1729FD4BF915`. El RPM está disponible a través del [repositorio RPM del Agent 5][7].

Hemos lanzado nuevas versiones de **métodos de instalación del Agent** para garantizar que los hosts sean seguros, ya que eliminan expresamente la clave afectada de la base de datos de RPM y del archivo de repositorio de Datadog:
  * [Rol de Datadog de Ansible][8] versión [4.18.0][9]
  * [Receta de Datadog Chef][10] versión [4.16.0][11]
  * [Módulo de Puppet de Datadog][12] versión [3.20.0][13]
  * [Fórmula SaltStack de Datadog][14] versión [3.5][15]
  * Scripts de instalación de Datadog Agent 6/7 Linux, publicados en las siguientes localizaciones con la versión 1.13.0 a las 13:00 UTC del 12 de enero de 2023:
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh][16]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh][17]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script.sh][18] (Obsoleto y no está recomendado. Está actualizado).
  * [Script de instalación del Datadog Agent 5 Linux][19], publicado en su [localización de descarga][19] a las 16:25 UTC del 12 de enero de 2023



[1]: https://circleci.com/blog/january-4-2023-security-alert/
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY.public
[3]: /resources/sh/rpm_check.sh
[4]: /es/help/
[5]: https://yum.datadoghq.com/rpm/x86_64/datadog-agent-5.32.9-1.x86_64.rpm
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
[7]: https://yum.datadoghq.com/rpm/x86_64/
[8]: https://github.com/DataDog/ansible-datadog/
[9]: https://github.com/DataDog/ansible-datadog/releases/tag/4.18.0
[10]: https://github.com/DataDog/chef-datadog
[11]: https://github.com/DataDog/chef-datadog/releases/tag/v4.16.0
[12]: https://github.com/DataDog/puppet-datadog-agent
[13]: https://github.com/DataDog/puppet-datadog-agent/releases/tag/v3.20.0
[14]: https://github.com/DataDog/datadog-formula
[15]: https://github.com/DataDog/datadog-formula/releases/tag/3.5
[16]: https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh
[17]: https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh
[18]: https://s3.amazonaws.com/dd-agent/scripts/install_script.sh
[19]: https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh