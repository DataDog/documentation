---
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docs/dev/python.md
title: Datadog 에이전트 통합 개발자 도구 설치
---
이 문서에서는 에이전트 기반 통합에서 작동하도록 Python 환경을 설정하는 방법에 대해 설명합니다. 여기에는 인터프리터 설치 및 필요한 모든 종속성에 대한 확인이 포함됩니다.

## Python 설치

많은 운영 체제에는 Python 버전이 사전에 설치되어 있습니다. 하지만 기본적으로 설치된 Python 버전이 에이전트에서 사용되는 버전보다 오래되었을 수 있으며 일부 필수 도구 및 종속성이 부족할 수 있습니다. 통합을 실행하는 데 필요한 모든 것을 갖추려면 전용 Python 인터프리터를 설치하세요.

{{< tabs >}}

{{% tab "MacOS" %}}
[Homebrew][1]를 사용하여 Python 3.8 설치:

1. Homebrew 업데이트:
   ```
   brew update
   ```

1. Python 설치:
   ```
   brew install python@3.8
   ```

1. Homebrew 설치 출력을 확인하고 설치 스크립트에서 권장하는 추가 명령을 실행합니다.

1. `PATH`에 Python 바이너리가 설치되어 있고 올바른 버전을 설치했는지 확인합니다:
   ```
   which python3.8
   ```

   Mac 아키텍처에 따라 다음과 같은 출력이 표시됩니다:
   - ARM (M1+) machines:
     ```
     /opt/homebrew/bin/python3.8
     ```
   - MacOS on Intel machines:
     ```
     /usr/local/bin/python3.8
     ```

[1]: https://brew.sh/
{{< /tabs >}}

{{% tab "Windows" %}}
1. [Python 3.8 64비트 실행 파일 설치 프로그램][1]을 다운로드하고 실행합니다.
1. Python을 PATH에 추가하는 옵션을 선택합니다.
1. **지금 설치**를 클릭합니다.
1. 설치가 완료되면 컴퓨터를 재시작합니다.
1.  Python 바이너리가 `PATH`에 설치되어 있는지 확인합니다:
   ```
   > where python

   C:\Users\<USER>\AppData\Local\Programs\Python\Python38\python.exe
   ```

[1]: https://www.python.org/downloads/release/python-3810/
{{< /tabs >}}

{{% tab "Linux" %}}
Linux 설치의 경우, 시스템 Python을 수정하지 마십시오. Datadog은 [pyenv][1] 또는 [miniconda][2]를 사용하여 Python 3.8을 설치할 것을 권장합니다.

[1]: https://github.com/pyenv/pyenv#automatic-installer
[2]: https://conda.io/projects/conda/en/stable/user-guide/install/linux.html
{{< /tabs >}}

{{< /tabs >}}

## pipx 설치

`ddev` 명령줄 도구를 사용하려면 `pipx` python 패키지가 필요합니다.

{{< tabs >}}
{{% tab "MacOS" %}}
1. pipx 설치:
   ```
   brew install pipx
   ```
1. Homebrew 설치 출력을 확인하고 설치 스크립트에서 권장하는 추가 명령을 실행합니다.

1. pipx가 설치되어 있는지 확인합니다:
   ```
   which pipx
   ```

   Mac 아키텍처에 따라 다음과 같은 출력이 표시됩니다:
   - ARM (M1+) machines:
     ```
     /opt/homebrew/bin/pipx
     ```
   - MacOS on Intel machines:
     ```
     /usr/local/bin/pipx
     ```

{{< /tabs >}}

{{% tab "Windows" %}}
1. pipx 설치:
   ```
   python -m pip install pipx
   ```

1. pipx가 설치되어 있는지 확인합니다:
   ```
   > where pipx
   C:\Users\<USER>\AppData\Local\Programs\Python\Python38\Scripts\pipx.exe
   ```

{{< /tabs >}}

{{% tab "Linux" %}}
1. pipx 설치:
   ```
   python -m pip install pipx
   ```
1. pipx가 설치되어 있는지 확인합니다:
   ```
   pipx --version
   ```
{{< /tabs >}}
{{< /tabs >}}

## Datadog 에이전트 통합 개발자 도구 설치

{{< tabs >}}
{{% tab "MacOS" %}}

1. 다음 명령을 실행하고 출력에 표시된 실행 파일을 모두 제거합니다:
   ```
   which -a ddev
   ```

1. 실행 중인 가상 환경이 없는지 확인합니다:
   1. 다음 명령을 실행합니다:
      ```
      echo $VIRTUAL_ENV
      ```

   1. 명령이 출력을 반환하면 가상 환경이 실행 중인 것입니다. `deactivate`를 실행하면 가상 환경이 종료됩니다.

1. `ddev` 설치:
   <div class="alert alert-warning"><code>sudo</code>로 이 명령을 실행하지 마세요.</a></div>

   - ARM (M1+) machines:
     ```
     pipx install ddev --python /opt/homebrew/bin/python3.8
     ```

   - MacOS on Intel machines:
     ```
     pipx install ddev --python /usr/local/bin/python3.8
     ```

1. 설치 출력을 확인하고 설치 스크립트에서 권장하는 추가 명령을 실행합니다.

{{< /tabs >}}

{{% tab "Windows" %}}
1. `ddev`를 설치하려면 다음을 실행하세요:
   ```
   pipx install ddev
   ```

{{< /tabs >}}

{{% tab "Linux" %}}
1. `ddev`를 설치하려면 다음을 실행하세요:
   <div class="alert alert-warning">`sudo`로 이 명령을 실행하지 마세요.</a></div>

   ```
   pipx install ddev
   ```
{{< /tabs >}}
{{< /tabs >}}