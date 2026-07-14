---
description: Datadog 에이전트 통합 개발자 도구를 설치합니다.
title: Datadog 에이전트 통합 개발자 도구 설치
---
이 문서에서는 에이전트 기반 통합에서 작동하도록 Python 환경을 설정하는 방법에 대해 설명합니다. 여기에는 인터프리터 및 개발 툴 설치가 포함됩니다.

## Python 설치

많은 운영 체제에는 Python 버전이 미리 설치되어 있습니다. 하지만 기본 설치된 Python 버전이 에이전트에서 사용되는 최신 버전과 같지 않을 수 있습니다. 통합을 실행하는 데 필요한 모든 사항을 갖추려면 전용 Python 인터프리터를 설치하세요.

{{< tabs >}}

{{% tab "MacOS" %}}
[Homebrew][1]를 사용하여 Python 3.12 설치:

1. Homebrew 업데이트:
   ```
   brew update
   ```

2. Python 설치:
   ```
   brew install python@3.12
   ```

3. Homebrew 설치 출력을 확인하고 설치 스크립트에서 권장하는 추가 명령을 실행합니다.

4. `PATH`에 Python 바이너리가 설치되어 있고 올바른 버전을 설치했는지 확인합니다.
   ```
   which python3.12
   ```

   Mac 아키텍처에 따라 다음과 같은 출력이 표시됩니다:
   - ARM (M1+) machines:
     ```
     /opt/homebrew/bin/python3.12
     ```
   - MacOS on Intel machines:
     ```
     /usr/local/bin/python3.12
     ```

[1]: https://brew.sh/
{{% /tab %}}

{{% tab "Windows" %}}
1. [Python 3.12 64비트 실행 파일 설치 프로그램][1]을 다운로드하고 실행합니다.
1. Python을 PATH에 추가하는 옵션을 선택합니다.
1. **지금 설치**를 클릭합니다.
1. 설치가 완료되면 컴퓨터를 재시작합니다.
1.  Python 바이너리가 `PATH`에 설치되어 있는지 확인합니다:
   ```
   > where python

   C:\Users\<USER>\AppData\Local\Programs\Python\Python39\python.exe
   ```

[1]: https://www.python.org/downloads/release/python-3115/
{{% /tab %}}

{{% tab "Linux" %}}
Linux 설치의 경우, 시스템 Python을 수정하지 마시기 바랍니다. Datadog은 [pyenv][1] 또는 [miniconda][2]를 사용하여 Python 3.12를 설치할 것을 권장합니다.

[1]: https://github.com/pyenv/pyenv#automatic-installer
[2]: https://conda.io/projects/conda/en/stable/user-guide/install/linux.html
{{% /tab %}}

{{< /tabs >}}

## 개발자 도구 설치

`ddev` CLI를 설치하는 두 가지 옵션이 있습니다.

### GUI로 설치

{{< tabs >}}
{{% tab "MacOS" %}}
1. 브라우저에서 `.pkg` 파일을 다운로드: [ddev-{{< sdk-version "integrations-core" >}}.pkg](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}.pkg)
2. 다운로드한 파일을 실행하고 화면의 지침을 따릅니다.
3. 터미널을 다시 시작합니다.
4. `PATH`에 `ddev` 명령이 추가되었는지 확인하려면 다음 명령을 실행하여 `ddev` 버전을 검색합니다.
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}

{{% tab "Windows" %}}
1. 브라우저에서 다음 `.msi` 파일 중 하나를 다운로드합니다.
     - [ddev-{{< sdk-version "integrations-core" >}}-x64.msi (64-bit)](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x64.msi)
     - [ddev-{{< sdk-version "integrations-core" >}}-x86.msi (32-bit) ](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86.msi)
2. 다운로드한 파일을 실행하고 화면의 지침을 따릅니다.
3. 터미널을 다시 시작합니다.
4. `PATH`에 `ddev` 명령이 추가되었는지 확인하려면 다음 명령을 실행하여 `ddev` 버전을 검색합니다.
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}
{{< /tabs >}}

### 명령줄로 설치

{{< tabs >}}
{{% tab "MacOS" %}}
1. `curl` 명령을 사용하여 파일을 다운로드합니다. -L 옵션은 리디렉션을 허용하고 -o 옵션은 다운로드한 패키지 파일이 기록될 파일 이름을 지정합니다. 본 예시에서는 현재 디렉토리의 `ddev-{{< sdk-version "integrations-core" >}}.pkg`에 파일이 기록됩니다.
   ```shell
   curl -L -o ddev-{{< sdk-version "integrations-core" >}}.pkg https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}.pkg
   ```
2. 다운로드한 `.pkg` 파일을 소스로 지정하여 표준 macOS [`installer`](https://ss64.com/osx/installer.html) 프로그램을 실행합니다. `-pkg` 파라미터를 사용하여 설치할 패키지 의 이름을 지정하고, `-target /` 파라미터를 사용하여 패키지를 설치할 드라이브에 지정합니다. 파일은 `/usr/local/ddev`에 설치되고 셸이 `/usr/local/ddev` 디렉토리를 추가하도록 지시하는 엔트리가 `/etc/paths.d/ddev`에 생성됩니다. 해당 폴더에 쓰기 권한을 부여하려면 명령에 `sudo`을 포함해야 합니다.
   ```shell
   sudo installer -pkg ./ddev-{{< sdk-version "integrations-core" >}}.pkg -target /
   ```
3. 터미널을 다시 시작합니다.
4. 셸이 `PATH`에서 `ddev` 명령을 찾아 실행할 수 있는지 확인하려면 다음 명령을 사용합니다.
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}

{{% tab "Windows" %}}
1. `.msi` 파일 중 하나를 소스로 지정하여 표준 윈도우즈(Windows) [`msiexec`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/msiexec)  프로그램으로 설치 프로그램을 다운로드 및 실행합니다. `/passive` 및 `/i` 파라미터를 사용하여 무인 일반 설치를 요청합니다.
   - `x64`:
      ```shell
      msiexec /passive /i https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x64.msi
      ```
   - `x86`:
      ```shell
      msiexec /passive /i https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86.msi
      ```
2. 터미널을 다시 시작합니다.
3. 셸이 `PATH`에서 `ddev` 명령을 찾아 실행할 수 있는지 확인하려면 다음 명령을 사용합니다.
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}
{{< /tabs >}}

### 독립형 바이너리로 설치

플랫폼 및 아키텍처에 해당하는 아카이브를 다운로드한 다음 `PATH`의 디렉토리에 바이너리를 추출하고 바이너리 이름을 `ddev`로 변경합니다.

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