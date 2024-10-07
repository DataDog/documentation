---
title: Install the Datadog Agent Integration Developer Tool
description: Install the Datadog Agent Integration Developer Tool.
aliases:
- /developers/integrations/python
---

This document covers how to set up a Python environment to work on Agent-based Integrations, including installing the Python interpreter and developer tool.

## Install Python

Many operating systems come with a pre-installed version of Python. However, the version of Python installed by default may not be the same as the one used by the latest Agent. To ensure that you have everything you need to get an integration running, install a dedicated Python interpreter.

{{< tabs >}}

{{% tab "macOS" %}}
Install Python 3.11 using [Homebrew][1]:

1. Update Homebrew:
   ```
   brew update
   ```

2. Install Python:
   ```
   brew install python@3.11
   ```

3. Check the Homebrew installation output and run any additional commands recommended by the installation script.

4. Verify that the Python binary is installed in your `PATH` and that have installed the correct version:
   ```
   which python3.11
   ```

   You should see the following output depending on your Mac architecture:
   - ARM (M1+) machines:
     ```
     /opt/homebrew/bin/python3.11
     ```
   - macOS on Intel machines:
     ```
     /usr/local/bin/python3.11
     ```

[1]: https://brew.sh/
{{% /tab %}}

{{% tab "Windows" %}}
1. Download the [Python 3.11 64-bit executable installer][1] and run it.
1. Select the option to add Python to your PATH.
1. Click **Install Now**.
1. After the installation has completed, restart your machine.
1. Verify that the Python binary is installed in your `PATH`:
   ```
   > where python

   C:\Users\<USER>\AppData\Local\Programs\Python\Python39\python.exe
   ```

[1]: https://www.python.org/downloads/release/python-3115/
{{% /tab %}}

{{% tab "Linux" %}}
For Linux installations, avoid modifying your system Python. Datadog recommends installing Python 3.11 using [pyenv][1] or [miniconda][2].

[1]: https://github.com/pyenv/pyenv#automatic-installer
[2]: https://conda.io/projects/conda/en/stable/user-guide/install/linux.html
{{% /tab %}}

{{< /tabs >}}

## Install developer tooling

On macOS or Windows, you can install `ddev` from the CLI or use a GUI installer for your operating system. On Linux, [use a standalone binary](#install-from-a-standalone-binary).

### Install using a GUI

{{< tabs >}}
{{% tab "macOS" %}}
1. In your browser, download the `.pkg` file: [ddev-{{< sdk-version "integrations-core" >}}.pkg](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}.pkg).
2. Run your downloaded file and follow the on-screen instructions.
3. Restart your terminal.
4. To verify that the `ddev` command has been added to your `PATH`, run the following command to retrieve the `ddev` version:
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
   If your version does not match, ensure you're using the correct version of Python.
{{% /tab %}}

{{% tab "Windows" %}}
1. In your browser, download one of the following `.msi` files:
     - [ddev-{{< sdk-version "integrations-core" >}}-x64.msi (64-bit)](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x64.msi)
     - [ddev-{{< sdk-version "integrations-core" >}}-x86.msi (32-bit) ](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86.msi)
2. Run your downloaded file and follow the on-screen instructions.
3. Restart your terminal.
4. To verify that the `ddev` command has been added to your `PATH`, run the following command to retrieve the `ddev` version:
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
   If your version does not match, ensure you're using the correct version of Python.
{{% /tab %}}
{{< /tabs >}}

### Install from the command line

{{< tabs >}}
{{% tab "macOS" %}}
1. Download the PKG file using the `curl` command:
   ```shell
   curl -L -o ddev-{{< sdk-version "integrations-core" >}}.pkg https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}.pkg
   ```
   - The `-L` option allows for redirects.
   - The `-o` option specifies a file name for the downloaded package. In this example, the file is written to `ddev-{{< sdk-version "integrations-core" >}}.pkg` in the current directory.

2. Run the macOS [`installer`](https://ss64.com/osx/installer.html) program, specifying the downloaded `.pkg` file as the source:
   ```shell
   sudo installer -pkg ./ddev-{{< sdk-version "integrations-core" >}}.pkg -target /
   ```
   - The `-pkg` parameter specifies the name of the package to install.
   - The `-target /` parameter specifies the drive in which to install the package. 
   - The files are installed to `/usr/local/ddev`, and an entry is created at `/etc/paths.d/ddev` that instructs shells to add the `/usr/local/ddev` directory. You must include `sudo` on the command to grant permissions to write to the `/etc/` directory.

3. Restart your terminal.
4. To verify that the shell can find and run the `ddev` command in your `PATH`, use the following command.
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
   If your version does not match, ensure you're using the correct version of Python.
{{% /tab %}}

{{% tab "Windows" %}}
1. Download and run the installer using the standard Windows [`msiexec`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/msiexec) program, specifying one of the `.msi` files as the source. Use the `/passive` and `/i` parameters to request an unattended, normal installation.
   - `x64`:
      ```shell
      msiexec /passive /i https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x64.msi
      ```
   - `x86`:
      ```shell
      msiexec /passive /i https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86.msi
      ```
2. Restart your terminal.
3. To verify that the shell can find and run the `ddev` command in your `PATH`, use the following command.
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
   If your version does not match, ensure you're using the correct version of Python.
{{% /tab %}}
{{< /tabs >}}

### Install from a standalone binary

After downloading the archive corresponding to your platform and architecture, extract the binary to a directory that is on your `PATH` and rename the binary to `ddev`.

{{< tabs >}}
{{% tab "macOS" %}}
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
