---
algolia:
  tags:
  - 시크릿
  - 시크릿 실행 가능 프로그램
  - 시크릿 공급자
  - 시크릿 목록
aliases:
- /ko/agent/faq/kubernetes-secrets
- /ko/agent/guide/secrets-management
further_reading:
- link: /agent/autodiscovery/
  tag: 설명서
  text: 자동탐지
title: 시크릿 관리
---

에이전트 구성 파일에 시크릿을 일반 텍스트로 저장하는 것을 방지하기 위해 시크릿 관리 패키지를 사용할 수 있습니다.

에이전트에서는 `secrets` 패키지를 사용해 사용자가 제공한 실행 가능 프로그램을 호출해 시크릿을 가져오고 암호 해독한 후 메모리에 저장합니다. 이 방법을 사용하면 사용자는 다양한 시크릿 관리 백엔드(HashiCorp Vault나 AWS Secrets Manager)를 사용할 수 있고, 첫 트러스트를 확립할 때 원하는 인증 방법을 선택할 수 있습니다. 이와 같이 실행 가능 프로그램에 사용하기 위해 에이전트의 컨테이너화된 배포가 [Helper Scripts](#helper-scripts-for-autodiscovery)로 사전 패키징되어 더욱 편리합니다.

6.12 버전부터 시크릿 관리 패키지를 Linux에서 메트릭, APM, 프로세스 모니터링용으로 사용할 수 있고, Windows에서는 메트릭과 APM용으로 사용할 수 있습니다.

## 시크릿 사용

### 구성 내 시크릿 정의

구성에서 YAML 필드 값에 `ENC[]` 표기법을 사용해 시크릿을 표기하세요.

파일, etcd, consul, 환경 변수 등 다양한 구성 백엔드에서 시크릿을 지원합니다.

`datadog.yaml`에서도 시크릿을 지원합니다. 에이전트에서는 먼저 주 구성을 로드한 후 시크릿의 암호를 해독합니다. 따라서 `secret_*` 설정에서 시크릿을 사용할 수 없습니다.

시크릿은 항상 문자열이며 정수나 부울 값으로 설정할 수 없습니다.

예시:

```yaml
instances:
  - server: db_prod
    # 유효한 시크릿 핸들 2개
    user: "ENC[db_prod_user]"
    password: "ENC[db_prod_password]"

    # `ENC[]` 핸들은 YAML 전체 값이어야 함
    # 따라서 다음은 시크릿 핸들로 확인되지 않음:
    password2: "db-ENC[prod_password]"
```

이 예시에서 시크릿 2개는 `db_prod_user`와 `db_prod_password`입니다. 이를 시크릿 _핸들_이라고 하며 시크릿 관리 백엔드에서 각각 고유하게 시크릿으로 식별됩니다.

YAML 구성이 유효하면 괄호 안에 어떤 문자든 허용됩니다. 이에 따라 따옴표를 이스케이프 문자로 사용해야 합니다. 다음 예를 참고하세요.

```text
"ENC[{\"env\": \"prod\", \"check\": \"postgres\", \"id\": \"user_password\"}]"
```

위 예시에서 시크릿 핸들 문자열은 `{"env": "prod", "check": "postgres", "id": "user_password"}`입니다.

내부 `[`와 `]`는 이스케이프할 필요가 없습니다. 다음 예를 참고하세요.

```text
"ENC[user_array[1234]]"
```

위 예시에서 시크릿 핸들 문자열은 `user_array[1234]`입니다.

[자동탐지][1] 탬플릿 변수를 처리한 후 시크릿을 처리하기 때문에 시크릿 핸들에서 사용할 수 있습니다. 다음 예를 참고하세요.

```yaml
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

### 실행 가능 프로그램 제공

시크릿을 가져오려면 시크릿 관리 백엔드에 인증하고 시크릿을 가져올 실행 가능 프로그램을 제공해야 합니다.

에이전트에서는 호출 수를 줄이기 위해 시크릿을 내부에서 캐시합니다(컨테이너화된 환경에서 유용함). 에이전트가 점검 구성 파일에 액세스할 때 메모리에 로드되어 있지 않은 시크릿을 포함한 시크릿 핸들이 하나라도 있으면 그때마다 실행 가능 프로그램을 호출합니다. 시크릿이 메모리에 이미 로드되어 있으면 추가 호출을 트리거하지 않습니다. 그러므로 시작할 때 시크릿 핸들이 있는 파일당 한 번씩 실행 가능 프로그램을 호출하며, 추후 에이전트 또는 인스턴스 재시작 시, 또는 에이전트가 시크릿 핸들을 포함하고 있는 새 점검(예: 자동탐지)을 동적으로 로드할 때 추가로 호출을 합니다.

APM과 프로세스 모니터링의 경우 자체 프로세스/서비스 내에서 실행되고, 프로세스를 공유하지 않기 때문에 각각 따로 시크릿을 로드하고 암호 해독해야 합니다. 따라서 `datadog.yaml`에 시크릿이 포함되어 있으면 각 프로세스에서 실행 가능 프로그램을 한번 호출합니다. 예를 들어, 프로세스 모니터링을 활성화한 상태로 `api_key`를 `datadog.yaml` 파일에 시크릿으로 저장하면 시크릿 백엔드에 3번 호출합니다.

사용자가 제공한 실행 가능 프로그램은 사용자에게 필요한 오류 처리 메커니즘을 모두 실행하도록 설계되어야 합니다. 역으로, 메모리에서 시크릿을 새로 고쳐야 할 때는 에이전트를 재시작해야 합니다(예: 암호 변경).

사용자가 제공하는 실행 가능 프로그램을 사용하면 다양한 이점이 있습니다.

* 시크릿 핸들이 없는 경우에 에이전트가 메모리 파라미터에서 로드를 시도하지 않습니다.
* 에이전트에서 필요한 시크릿으로만 에이전트 가시성을 제한할 수 있습니다(예: 키 관리 백엔드에서 시크릿 목록 접근 제한을 통해).
* 사용자에게 에이전트를 다시 빌드하지 않고도 원하는 시크릿 관리 백엔드를 사용할 수 있는 자유와 유연성이 생깁니다.
* 각 사용자가 시크릿 관리 백엔드의 초기 트러스트 문제를 에이전트에서 직접 해결할 수 있습니다. 각 사용자가 원하는 인증 방법을 활용해 연속 통합 워크플로우에 적합한 방법으로 해결할 수 있습니다.

#### 구성

`datadog.yaml`에서 다음 변수를 설정합니다.

```yaml
secret_backend_command: <EXECUTABLE_PATH>
```

#### 에이전트 보안 요구 사항

에이전트에서는 `secret_backend_command` 실행 가능 프로그램을 하위 프로세스로 실행합니다. 실행 패턴은 Linux와 Windows에 따라 다릅니다.

{{< tabs >}}
{{% tab "Linux" %}}

Linux의 경우 `secret_backend_command`로 설정된 실행 가능 프로그램은 다음 요건을 갖춰야 합니다.

* 에이전트를 실행하는 사용자에게 속해 있어야 합니다(기본값 `dd-agent` 또는 컨테이너 내 `root`).
* 그룹이나 기타 다른 권한이 없어야 합니다.
* 최소 소유자 실행 권한이 있어야 합니니다.

{{% /tab %}}
{{% tab "Windows" %}}

Windows의 경우 `secret_backend_command`로 설정된 실행 가능 프로그램은 다음 요건을 갖춰야 합니다.

* `ddagentuser` 읽기/실행 권한이 있어야 합니다(에이전트를 실행하는 사용자).
* `Administrators` 그룹 외 다른 사용자나 그룹, 빌트인 로컬 시스템 계정, 에이전트 사용자 컨텍스트와 관련한 권한이 없어야 합니다(기본값 `ddagentuser`).
* 에이전트가 실행할 수 있고 유효한 Win32 애플리케이션이어야 합니다(PowerShell이나 Python 스크립트 등은 안 됨).

{{% /tab %}}
{{< /tabs >}}

**참고**: 사용 가능 프로그램은 에이전트와 같은 환경 변수를 공유합니다.

`stderr`에는 절대로 중요한 정보를 출력하지 마세요. `0`이 아닌 다른 상태 코드로 이진이 종료되는 경우, 에이전트에서 트러블슈팅을 용이하게 하기 위해 실행 가능 프로그램의 표준 오류 출력을 로그합니다.

#### 실행 가능 프로그램 API

실행 가능 프로그램은 간단한 API를 따릅니다. 표준 입력에서 JSON을 읽고 암호가 해독된 시크릿을 포함한 JSON을 표준 출력으로 출력합니다.

실행 가능 프로그램의 종료 코드가 `0`이 아닌 경우, 암호 해독 중인 현재 통합 구성을 잘못된 것으로 보고 작업을 중단합니다.

##### API 입력 예시

실행 가능 프로그램은 가져올 시크릿 목록이 포함된 JSON 페이로드를 표준 입력으로부터 수신합니다.

```json
{"version": "1.0", "secrets": ["secret1", "secret2"]}
```

* `version`: 포맷 버전(현재 1.0)을 포함한 문자열.
* `secrets`: 문자열 목록. 각 문자열은 가져올 시크릿에 상응하는 구성 내 핸들임.

##### API 출력 예시

실행 가능 프로그램은 가져온 시크릿을 포함한 JSON 페이로드를 표준 출력에 출력합니다.

```json
{
  "secret1": {"value": "secret_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

페이로드는 JSON 개체이며, 각 키는 입력 페이로드에서 요청한 핸들입니다. 각 핸들 값은 필드 2개가 있는 JSON 개체입니다.

* `value`: 문자열. 점검 구성에서 사용될 실제 시크릿 값(오류가 발생할 경우 null일 수 있음).
* `error`: 문자열. 필요할 경우 나타나는 오류 메시지. 오류가 null이 아닌 경우, 이 핸들을 사용하는 통합 구성을 잘못된 것으로 보고 작업을 중단합니다.

##### 사용 가능 프로그램 예시

다음은 시크릿마다 접두사 `decrypted_`를 붙이는 더미 Go 프로그램입니다.

```go
package main

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "os"
)

type secretsPayload struct {
  Secrets []string `json:secrets`
  Version int      `json:version`
}

func main() {
  data, err := ioutil.ReadAll(os.Stdin)

  if err != nil {
    fmt.Fprintf(os.Stderr, "Could not read from stdin: %s", err)
    os.Exit(1)
  }
  secrets := secretsPayload{}
  json.Unmarshal(data, &secrets)

  res := map[string]map[string]string{}
  for _, handle := range secrets.Secrets {
    res[handle] = map[string]string{
      "value": "decrypted_" + handle,
    }
  }

  output, err := json.Marshal(res)
  if err != nil {
    fmt.Fprintf(os.Stderr, "could not serialize res: %s", err)
    os.Exit(1)
  }
  fmt.Printf(string(output))
}
```

이는 점검 파일 내 다음 구성을

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

에이전트 메모리 내에 다음과 같이 업데이트합니다.

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

## 자동탐지용 Helper 스크립트

Datadog 통합에서는 메트릭을 가져올 때 자격 증명을 요구하는 경우가 많습니다. [자동탐지 템플릿][1]에서 자격 증명을 하드코딩하는 것을 피하려면 시크릿 관리를 사용해 자격 증명을 템플릿에서 분리하는 것이 좋습니다.

7.32.0부터는 에이전트의 컨테이너 이미지에서 [Helper 스크립트][2]를 `/readsecret_multiple_providers.sh`로 사용할 수 있고, 이를 사용해 파일과 Kubernetes Secrets에서 시크릿을 가져올 수 있습니다. 이전 버전에서 제공되었던 스크립트 2개(`readsecret.sh`와 `readsecret.py`)도 지원은 되나 파일에서 읽기만 가능합니다.

### 여러 시크릿 공급자 읽기 스크립트

#### 여러 공급자 사용
파일 2개와 Kubernetes Secrets에서 `readsecret_multiple_providers.sh` 스크립트를 사용할 수 있습니다. 이 시크릿은 `ENC[provider@some/path]` 형식을 따라야 합니다.

| 공급자               | 형식                                           |
|------------------------|--------------------------------------------------|
| 파일에서 읽기        | `ENC[file@/path/to/file]`                        |
| Kubernetes Secrets     | `ENC[k8s_secret@some_namespace/some_name/a_key]` |

{{< tabs >}}
{{% tab "Helm" %}}

Helm 차트에서 이 실행 가능 프로그램을 사용하려면 다음과 같이 설정하세요.
```yaml
datadog:
  [...]
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}

이 실행 가능 프로그램을 사용하려면 `DD_SECRET_BACKEND_COMMAND` 환경 변수를 다음과 같이 설정하세요.
```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

{{% /tab %}}
{{< /tabs >}}

#### 파일에서 읽기 예시
에이전트에서는 제공된 경로와 연관된 지정 파일을 읽습니다. 이 파일은  [Kubernetes Secrets](#kubernetes-secrets), [Docker Swarm Secrets](#docker-swarm-secrets) 등과 같은 다른 커스텀 방법에서 가져올 수 있습니다.

에이전트 컨테이너에 내용이 일반 텍스트인 `/etc/secret-volume/password` 파일이 있으면 `ENC[file@/etc/secret-volume/password]`와 같은 표기로 참조할 수 있습니다.

##### Kubernetes Secrets
Kubernetes에서는 Pod에 [시크릿을 파일로 노출][3]하는 기능을 지원합니다. 예를 들어, 시크릿인 `Secret: test-secret`에 `db_prod_password: example` 데이터가 있다고 합시다. 이 시크릿은 다음과 같은 구성으로 에이전트 컨테이너에 연결됩니다.
```yaml
  containers:
    - name: agent
      #(...)
      volumeMounts:
        - name: secret-volume
          mountPath: /etc/secret-volume
  #(...)
  volumes:
    - name: secret-volume
      secret:
        secretName: test-secret
```
이 예시에서 에이전트 컨테이너에는 `/etc/secret-volume/db_prod_password` 파일과 `example` 내용이 담겨 있습니다. 구성에는 `ENC[file@/etc/secret-volume/db_prod_password]`를 사용해 참조됩니다.

**참고:**
- 시크릿은 연결된 Pod와 같은 네임스페이스에 있어야 합니다.
- 스크립트는 중요 정보인 `/var/run/secrets/kubernetes.io/serviceaccount/token`를 포함해 하위 폴더 모두에 액세스할 수 있습니다. 이에 따라 Datadog에서는 `/var/run/secrets` 대신 전용 폴더를 사용하기를 권합니다.

##### Docker Swarm 시크릿
[Docker Swarm 시크릿][4]은 `/run/secrets` 폴더에 연결됩니다. 예를 들어, Docker 시크릿인 `db_prod_passsword`는 에이전트 컨테이너 내 `/run/secrets/db_prod_password`에 위치하고 있습니다. 이는 구성에서 `ENC[file@/run/secrets/db_prod_password]`로 참조됩니다.

#### Kubernetes Secrets 예시 읽기
다음 설정을 이용하면 에이전트가 자체에서는 물론, *다른* 네임스페이스에서 Kubernetes Secrets을 직접 읽을 수 있습니다. 이렇게 하려면 에이전트의 `ServiceAccount`에 적합한 `Roles`와 `RoleBindings` 권한을 부여해야 합니다.

`Secret: database-secret`가 `Namespace: database`에 있고 `password: example` 데이터를 포함하고 있는 경우, 구성에 `ENC[k8s_secret@database/database-secret/password]`로 참조됩니다. 이 설정을 이용하면 에이전트가 Kubernetes에서 직접 시크릿을 가져옵니다. 이는 에이전트가 있는 네임스페이스가 아닌 다른 네임스페이스에 있는 시크릿을 참조할 때 유용합니다.

이를 위해서는 에이전트 서비스 계정에 필요 권한을 수동으로 부여해야 합니다. 예를 들어, 다음 BRAC 정책을 따를 수 있습니다.
```yaml
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: datadog-secret-reader
  namespace: database
rules:
  - apiGroups: [""]
    resources: ["secrets"]
    resourceNames: ["database-secret"]
    verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: datadog-read-secrets
  namespace: database
subjects:
  - kind: ServiceAccount
    name: datadog-agent
    apiGroup: ""
    namespace: default
roleRef:
  kind: Role
  name: datadog-secret-reader
  apiGroup: ""
```
이 `Role`을 이용하면 `Namespace: database`에 있는 `Secret: database-secret`에 액세스할 수 있습니다. `RoleBinding`을 통해 이 권한을 `Namespace: default`에 있는 `ServiceAccount: datadog-agent`에 연결할 수 있습니다. 배포된 리소스에 따라 클러스터에 수동으로 추가해야 합니다.

이 권한을 부여한 후 Kubernetes Secrets 공급자를 사용할 경우 여러 공급자`"/readsecret_multiple_providers.sh"`로부터 읽을 수 있도록 스크립트를 활성화해야 합니다.

### (레거시) 파일에서 읽기 스크립트
Datadog 에이전트 v7.32에서 `readsecret_multiple_providers.sh` 스크립트가 도입되었습니다. Datadog에서는 에이전트 v6.12까지 사용되었던 `/readsecret.py`와 `/readsecret.sh` 대신에 이 스크립트를 사용하기를 권장합니다. `/readsecret.py`와 `/readsecret.sh`를 사용해 파일을 읽는 기능도 계속해서 지원합니다.

#### 사용
이 스크립트는 인수를 전달할 폴더가 필요합니다. 이 폴더와 관련해 파일 이름,\으로 시크릿 핸들을 해석합니다. 중요한 정보가 누출되는 것을 방지하기 위해 지정된 루트 폴더 외 액세스(대상 바로 가기 링크 포함)를 거절합니다.

이 스크립트는 [OpenShift 제한 SCC 운영][5]과 호환되지 않으며 에이전트를 `root` 사용자로 실행해야 합니다.

##### Docker
[Docker Swarm 시크릿][4]은 `/run/secrets` 폴더에 연결됩니다. 에이전트 컨테이너에 다음 환경 변수를 전달해 읽을 수 있습니다.

```
DD_SECRET_BACKEND_COMMAND=/readsecret.py
DD_SECRET_BACKEND_ARGUMENTS=/run/secrets
```

이 설정을 사용하면 Datadog 에이전트가 `/run/secrets` 디렉터리에 있는 모든 시크릿 파일을 읽습니다. 예를 들어, `ENC[password]` 구성에는 에이전트가 `/run/secrets/password` 파일을 찾는 것이 포함되어 있습니다.

##### Kubernetes
Kubernetes는 Pod 내에서  [시크릿을 파일로 노출][3]시키는 것을 지원합니다. 예를 들어, 시크릿이 `/etc/secret-volume`에 연결되어 있는 경우, 다음 환경 변수를 사용할 수 있습니다.

```
DD_SECRET_BACKEND_COMMAND=/readsecret.py
DD_SECRET_BACKEND_ARGUMENTS=/etc/secret-volume
```

이 설정을 이용하면 Datadog 에이전트가 `/etc/secret-volume` 디렉터리에 있는 모든 시크릿 파일을 읽습니다. 예를 들어, `ENC[password]` 구성에는 에이전트가 `/etc/secret-volume/password` 파일을 찾는 것이 포함되어 있습니다.

## 트러블슈팅

### 감지된 시크릿 목록

에이전트 CLI에서 `secret` 명령을 사용하면 설정과 관련된 오류가 모두 표시됩니다. 예를 들어, 실행 가능 프로그램의 권한이 잘못된 경우 이를 표시합니다. 또 검색된 핸들과 위치 목록도 표시합니다.

Linux에서 이 명령을 실행하면 파일 모드, 사용 가능 프로그램의 소유자와 그룹을 출력합니다. Windows에서 실행하면 ACL 권한 목록을 출력합니다.

{{< tabs >}}
{{% tab "Linux" %}}

Linux 예시:

```shell
$> datadog-agent secret
=== Checking executable rights ===
Executable path: /path/to/you/executable
Check Rights: OK, the executable has the correct rights

Rights Detail:
file mode: 100700
Owner username: dd-agent
Group name: dd-agent

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from postgres.yaml
- db_prod_password: from postgres.yaml
```

{{% /tab %}}
{{% tab "Windows" %}}

Windows 예시(Administrator PowerShell에서):
```powershell
PS C:\> & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" secret
=== Checking executable rights ===
Executable path: C:\path\to\you\executable.exe
Check Rights: OK, the executable has the correct rights

Rights Detail:
Acl list:
stdout:

Path   : Microsoft.PowerShell.Core\FileSystem::C:\path\to\you\executable.exe
Owner  : BUILTIN\Administrators
Group  : WIN-ITODMBAT8RG\None
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         WIN-ITODMBAT8RG\ddagentuser Allow  ReadAndExecute, Synchronize
Audit  :
Sddl   : O:BAG:S-1-5-21-2685101404-2783901971-939297808-513D:PAI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200
         a9;;;S-1-5-21-2685101404-2783901971-939297808-1001)

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from sqlserver.yaml
- db_prod_password: from sqlserver.yaml
```

{{% /tab %}}
{{< /tabs >}}


### 시크릿 삽입 후 구성 보기

점검 구성이 해결되었는지 빠르게 확인하려면 `configcheck` 명령을 사용하세요.

```shell
sudo -u dd-agent -- datadog-agent configcheck

=== a check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host>
port: <decrypted_port>
password: <obfuscated_password>
~
===

=== another check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host2>
port: <decrypted_port2>
password: <obfuscated_password2>
~
===
```

**참고**: 에이전트를 [재시작][6]해야 구성 파일의 변경 사항이 적용됩니다.

### secret_backend_command 디버깅

에이전트 외부에서 테스트나 디버깅하려면 에이전트가 실행하는 방법을 모방하면 됩니다.

{{< tabs >}}
{{% tab "Linux" %}}
#### Linux

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

Datadog 에이전트를 설치하면 `dd-agent` 사용자가 생성됩니다.


{{% /tab %}}
{{% tab "Windows" %}}
#### Windows

##### 권한 관련 오류

다음 오류 중 하나가 발생하면 설정 과정에 누락된 부분이 있다는 뜻입니다. [Windows 설명서](#windows)를 참고하세요.

1. 실행 가능 프로그램에 필수 사용자나 그룹 외 권한이 있는 사용자나 그룹이 있을 경우 다음과 같은 오류가 로그됩니다.
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. `ddagentuser`가 파일에서 읽고 실행할 권한이 없을 경우, 다음과 같은 오류가 로그됩니다.
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. 실행 가능 프로그램은 유효한 Win32 애플리케이션이어야 합니다. 그러지 않을 경우 다음과 같은 오류가 로그됩니다.
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

##### 실행 가능 프로그램 테스트

에이전트는 시크릿을 가져올 때 실행 가능 프로그램을 실행합니다. Datadog 에이전트는 `ddagentuser`로 프로그램을 실행합니다. 이 사용자는 특별한 권한이 없으며 `Performance Monitor Users` 그룹에 속해 있습니다. 설치하는 동안 이 사용자의 암호가 무작위로 생성되며, 암호는 어디에도 저장되지 않습니다.

기본 사용자나 개발자 사용자로도 실행 가능 프로그램을 실행할 수 있습니다. 그러나 에이전트가 실행할 때는 권한이 더 제한된  `ddagentuser`로 실행합니다.

에이전트와 같은 조건에서 실행 가능 프로그램을 실행하려면 개발 상자에 있는 `ddagentuser`의 암호를 업데이트하세요. 그러면 `ddagentuser`로 인증 확인하고 에이전트가 실행하는 방법과 동일한 방법으로 실행 가능 프로그램을 실행할 수 있습니다.

이를 실행하려면 다음 단계를 따르세요.

1. `Local Security Policy`에 있는 `Local Policies/User Rights Assignement/Deny Log on locally` 목록에서 `ddagentuser`를 제거합니다.
2. `ddagentuser`의 새 암호를 설정합니다(설치 시에 생성되는 암호는 어차피 어디에도 저장되지 않음). PowerShell에서 다음을 실행하세요.
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. 서비스 제어 메니저에서 `DatadogAgent` 서비스에서 사용할 암호를 업데이트합니다. PowerShell에서 다음을 실행하세요.
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

이제 `ddagentuser`로 로그인해 실행 가능 프로그램을 테스트할 수 있습니다. Datadog에는 실행 가능 프로그램을 테스트하는 데 도움을 주는
 [PowerShell 스크립트][7]가 있습니다. 이 스크립트를 사용하면 사용자 컨텍스트를 전환하고 에이전트가 실행 가능 프로그램을 실행하는 방법을 모방할 수 있습니다.

사용 방법은 다음 예시를 참고하세요.

```powershell
.\secrets_tester.ps1 -user ddagentuser -password a_new_password -executable C:\path\to\your\executable.exe -payload '{"version": "1.0", "secrets": ["secret_ID_1", "secret_ID_2"]}'
Creating new Process with C:\path\to\your\executable.exe
Waiting a second for the process to be up and running
Writing the payload to Stdin
Waiting a second so the process can fetch the secrets
stdout:
{"secret_ID_1":{"value":"secret1"},"secret_ID_2":{"value":"secret2"}}
stderr: None
exit code:
0
```

{{% /tab %}}
{{< /tabs >}}


### 에이전트가 시작 거부

에이전트를 실행하면 먼저 `datadog.yaml`를 로드해 그 안에 있는 시크릿의 암호를 해독합니다. 이 작업을 로깅 전에 실행합니다. 그렇기 때문에 Windows와 같은 플랫폼에서는 `datadog.yaml` 로딩 중에 발생하는 오류가 로그에 기록되지 않고 `stderr`에 기록됩니다. 에이전트에 제공한 실행 가능 프로그램이 오류를 반환할 때 이와 같은 현상이 발생합니다.

`datadog.yaml`에 시크릿이 있고 에이전트가 실행을 거부하면 다음 단계를 따르세요.

* `stderr`를 볼 수 있도록 에이전트를 수동으로 시작합니다.
* `datadog.yaml`에서 시크릿을 제거하고 점검 구성 파일에서 먼저 시크릿을 테스트해 보세요.

### Kubernetes 권한 테스트
Kubernetes에서 시크릿을 바로 읽을 경우에 `kubectl auth` 명령으로 권한을 다시 한번 확인하세요. 다음은 일반적인 형태입니다.

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

이전 [Kubernetes Secerets 예시](#read-from-kubernetes-secret-example)를 참고하세요. 시크릿 `Secret:database-secret`은 `Namespace: database`에 있고, 서비스 계정 `ServiceAccount:datadog-agent`는 `Namespace: default`에 있습니다.

이 경우, 다음 명령을 사용하세요.

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

이 명령을 사용하면 에이전트가 보유한 시크릿 보기 권한이 유효한 지 여부를 반환합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/datadog-agent/blob/main/Dockerfiles/agent/secrets-helper/readsecret_multiple_providers.sh
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[4]: https://docs.docker.com/engine/swarm/secrets/
[5]: https://github.com/DataDog/datadog-agent/blob/6.4.x/Dockerfiles/agent/OPENSHIFT.md#restricted-scc-operations
[6]: /ko/agent/configuration/agent-commands/#restart-the-agent
[7]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/secrets_scripts/secrets_tester.ps1