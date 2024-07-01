---
description: Instala la herramienta de desarrollo de la integración de Datadog Agent.
title: Instalar la herramienta de desarrollo de la integración de Datadog Agent
---
Este documento explica cómo configurar un entorno de Python para que funcione en integraciones basadas en el Agent, incluida la instalación del intérprete y la herramienta de desarrollo.

## Instalar Python

Muchos sistemas operativos vienen con una versión preinstalada de Python. Sin embargo, la versión de Python instalada por defecto puede no ser la misma que la utilizada por la última versión del Agent. Para asegurarte de que dispones de todo lo necesario para poner en marcha una integración, instala un intérprete dedicado al Python.

{{< tabs >}}

{{% tab "MacOS" %}}
Instala Python 3.11 usando [Homebrew][1]:

1. Actualizar Homebrew:
   ```
   brew update
   ```

2. Instalar Python:
   ```
   brew install python@3.11
   ```

3. Comprueba la salida de la instalación de Homebrew y ejecuta cualquier comando adicional recomendado por el script de instalación.

4. Comprueba que el binario de Python está instalado en tu `PATH` y que se ha instalado la versión correcta:
   ```
   which python3.11
   ```

   Deberías ver la siguiente salida según la arquitectura de tu Mac:
   - Máquinas ARM (M1+):
     ```
     /opt/homebrew/bin/python3.11
     ```
   - MacOS en máquinas Intel:
     ```
     /usr/local/bin/python3.11
     ```

[1]: https://brew.sh/
{{% /tab %}}

{{% tab "Windows" %}}
1. Descarga el [instalador ejecutable para Python 3.11 64 bit][1] y ejecútalo.
1. Selecciona la opción para añadir Python a tu PATH.
1. Haz clic en **Install Now** (Instalar ahora).
1. Una vez finalizada la instalación, reinicia el equipo.
1. Comprueba que el binario de Python está instalado en tu `PATH`:
   ```
   > where python

   C:\Users\<USER>\AppData\Local\Programs\Python\Python39\python.exe
   ```

[1]: https://www.python.org/downloads/release/python-3115/
{{% /tab %}}

{{% tab "Linux" %}}
Para instalaciones de Linux, evita modificar tu sistema Python. Datadog recomienda instalar Python 3.11 usando [pyenv][1] o [miniconda][2].

[1]: https://github.com/pyenv/pyenv#automatic-installer
[2]: https://conda.io/projects/conda/en/stable/user-guide/install/linux.html
{{% /tab %}}

{{< /tabs >}}

## Instalar herramientas para desarrolladores

Tienes 2 opciones para instalar la CLI `ddev`.

### Instalación mediante una GUI

{{< tabs >}}
{{% tab "MacOS" %}}
1. En tu navegador, descarga el archivo `.pkg` file: [ddev-{{< sdk-version "integrations-core" >}}.pkg](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}.pkg)
2. Ejecuta el archivo descargado y sigue las instrucciones que aparecen en pantalla.
3. Reinicia tu terminal.
4. Para verificar que el comando `ddev` ha sido añadido a tu `PATH`, ejecuta el siguiente comando para recuperar la versión `ddev`:
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}

{{% tab "Windows" %}}
1. En tu navegador, descarga uno de los siguientes archivos `.msi`:
     - [ddev-{{< sdk-version "integrations-core" >}}-x64.msi (64-bit)](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x64.msi)
     - [ddev-{{< sdk-version "integrations-core" >}}-x86.msi (32-bit) ](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86.msi)
2. Ejecuta el archivo descargado y sigue las instrucciones que aparecen en pantalla.
3. Reinicia tu terminal.
4. Para verificar que el comando `ddev` ha sido añadido a tu `PATH`, ejecuta el siguiente comando para recuperar la versión `ddev`:
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}
{{< /tabs >}}

### Instalación desde la línea de comandos

{{< tabs >}}
{{% tab "MacOS" %}}
1. En tu navegador, descarga el archivo `curl`. El `-o` option specifies the file name that the downloaded package is written to. In this example, the file is written to `ddev-{{< sdk-version "integrations-core" >}}.pkg` en el directorio actual.
   ```shell
   curl -o ddev-{{< sdk-version "integrations-core" >}}.pkg https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}.pkg
   ```
2. Ejecute el programa estándar de macOS [`installer`](https://ss64.com/osx/installer.html), especificando el archivo descargado `.pkg` como la fuente. Usa `-pkg` parameter to specify the name of the package to install, and the `-target /` parameter for the drive in which to install the package. The files are installed to `/usr/local/ddev`, and an entry is created at `/etc/paths.d/ddev` that instructs shells to add the `/usr/local/ddev` directory to. You must include `sudo` en el comando para conceder permiso de escritura a esas carpetas.
   ```shell
   sudo installer -pkg ./ddev-{{< sdk-version "integrations-core" >}}.pkg -target /
   ```
3. Reinicia tu terminal.
4. Para verificar que el shell puede encontrar y ejecutar el comando `ddev` en tu `PATH`, utiliza el siguiente comando.
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}

{{% tab "Windows" %}}
1. Descarga y ejecuta el instalador mediante el programa estándar de Windows [`msiexec`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/msiexec), especificando uno de los archivos `.msi` como la fuente. Utiliza los parámetros `/passive` y `/i` para solicitar una instalación independiente y normal.
   - `x64`:
      ```shell
      msiexec /passive /i https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x64.msi
      ```
   - `x86`:
      ```shell
      msiexec /passive /i https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86.msi
      ```
2. Reinicia tu terminal.
3. Para verificar que el shell puede encontrar y ejecutar el comando `ddev` en tu `PATH`, utiliza el siguiente comando.
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}
{{< /tabs >}}

### Instalar desde un binario independiente

Tras descargar el archivo correspondiente a tu plataforma y arquitectura, extrae el binario en un directorio que esté en tu `PATH` y renombra el binario como `ddev`.

{{< tabs >}}
{{% tab "MacOS" %}}
- [ddev-{{< sdk-version "integrations-core" >}}-aarch64-apple-darwin.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-aarch64-apple-darwin.tar.gz)
- [ddev-{{< sdk-version "integrations-core" >}}-x86_64-apple-darwin.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86_64-apple-darwin.tar.gz)
{{% /tab %}}

{{% tab "Windows" %}}
- [ddev-{{< sdk-version "integrations-core" >}}-x86_64-pc-windows-msvc.zip](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86_64-pc-windows-msvc.zip)
- [ddev-{{< sdk-version "integrations-core" >}}-i686-pc-windows-msvc.zip](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-i686-pc-windows-msvc.zip)
{{% /tab %}}

{{% tab "Linux" %}}
- [ddev-{{< sdk-version "integrations-core" >}}-aarch64-unknown-linux-gnu.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-aarch64-unknown-linux-gnu.tar.gz)
- [ddev-{{< sdk-version "integrations-core" >}}-x86_64-unknown-linux-gnu.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86_64-unknown-linux-gnu.tar.gz)
- [ddev-{{< sdk-version "integrations-core" >}}-x86_64-unknown-linux-musl.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86_64-unknown-linux-musl.tar.gz)
- [ddev-{{< sdk-version "integrations-core" >}}-i686-unknown-linux-gnu.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-i686-unknown-linux-gnu.tar.gz)
- [ddev-{{< sdk-version "integrations-core" >}}-powerpc64le-unknown-linux-gnu.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-powerpc64le-unknown-linux-gnu.tar.gz)
{{% /tab %}}
{{< /tabs >}}