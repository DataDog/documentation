---
aliases:
- /ko/serverless/datadog_lambda_library/
- /ko/serverless/serverless_integrations/cli/
dependencies:
- https://github.com/DataDog/datadog-ci/blob/master/src/commands/lambda/README.md
kind: 설명서
title: Datadog 서버리스 CLI
---
CLI를 사용하여 Datadog으로 AWS 람다 함수를 계측할 수 있습니다. CLI는 기존 람다 함수의 설정을 수정하여 계측을 활성화하므로 재배치할 필요가 *없습니다*. Datadog 서버리스 모니터링을 시작하는 가장 빠른 방법입니다.

또한 CI/CD 파이프라인에 명령을 추가하여 *모든* 서버리스 애플리케이션에 대한 계측을 활성화할 수 있습니다. Datadog CLI 명령에 의해 변경된 내용이 재정의되지 않도록 일반 서버리스 애플리케이션 배포 *후* 명령을 실행합니다.

## 설치

`datadog-ci lambda instrument` 명령을 사용하여 람다 함수를 계측하려면 아래 나열된 특정 런타임에 대한 지침을 따르세요:

- [.NET](https://docs.datadoghq.com/serverless/installation/dotnet/?tab=datadogcli)
- [Go](https://docs.datadoghq.com/serverless/installation/go/?tab=datadogcli)
- [Java](https://docs.datadoghq.com/serverless/installation/java/?tab=datadogcli)
- [Node.js](https://docs.datadoghq.com/serverless/installation/nodejs/?tab=datadogcli)
- [Python](https://docs.datadoghq.com/serverless/installation/python/?tab=datadogcli)
- [Ruby](https://docs.datadoghq.com/serverless/installation/ruby/?tab=datadogcli)

## 명령어

### `instrument`

람다에 Datadog 계측을 적용하려면 `datadog-ci lambda instrument`를 실행합니다. 이 명령은 계측된 람다 함수에 Datadog 람다 라이브러리 및/또는 Datadog 람다 확장을 람다 레이어로 추가하고 설정을 수정합니다.

```bash

datadog-ci lambda instrument -f <function-name> -f <another-function-name> -r us-east-1 -v 46 -e 10

# Instrument function(s) in interactive mode
datadog-ci lambda instrument -i

# Instrument multiple functions that match a regex pattern
datadog-ci lambda instrument --functions-regex <valid-regex-pattern> -r us-east-1 -v 46 -e 10

# Dry run of all updates
datadog-ci lambda instrument -f <function-name> -f <another-function-name> -r us-east-1 -v 46 -e 10 --dry
```

### `uninstrument`

람다에서 Datadog 계측을 되돌리려면 `datadog-ci lambda uninstrument`를 실행하세요. 이 명령은 Datadog 람다 라이브러리 및 Datadog 람다 확장 레이어와 같은 Datadog 설정과 datadog-ci에 의해 적용된 다른 설정을 자동으로 제거합니다.

```bash
# Uninstrument multiple functions specified by names
datadog-ci lambda uninstrument -f <function-name> -f <another-function-name> -r us-east-1

# Uninstrument function(s) in interactive mode
datadog-ci lambda uninstrument -i

# Uninstrument multiple functions that match a regex pattern
datadog-ci lambda uninstrument --functions-regex <valid-regex-pattern> -r us-east-1

# Dry run of all updates
datadog-ci lambda uninstrument -f <function-name> -f <another-function-name> -r us-east-1 --dry
```

추가적인 세팅은 설정 섹션을 확인하세요.

## 설정

### AWS 자격 증명

`datadog-ci lambda` 명령을 실행하는 Lambda 및 CloudWatch 서비스에 액세스할 수 있는 유효한 [AWS 자격 증명](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)이 설정되어 있어야 합니다.

### 환경 변수

`datadog-ci lambda instrument`를 실행 중인 환경에서 다음과 같은 환경 변수를 노출해야 합니다:

| 환경 변수 | 설명 | 예시 |
| --- | --- | --- |
| `DATADOG_API_KEY` | Datadog API 키입니다. 람다 함수 설정에서 `DD_API_KEY` 환경 변수를 설정합니다. Datadog API 키를 가져오기 위한 자세한 방법은 [API 키 설명서][6]를 참조하세요.  | `export DATADOG_API_KEY=<API_KEY>` |
| `DATADOG_API_KEY_SECRET_ARN` | AWS 비밀 관리자에서 Datadog API 키를 저장하는 암호의 ARN입니다. 람다 함수 설정에서`DD_API_KEY_SECRET_ARN`를 설정합니다. 참고: `DD_KMS_API_KEY`를 설정하면 `DD_API_KEY_SECRET_ARN`는 무시됩니다. 람다 실행 역할에 `secretsmanager:GetSecretValue` 권한을 추가합니다. | `export DATADOG_API_KEY_SECRET_ARN=<SECRETS_MANAGER_RESOURCE_ARN>` |
| `DATADOG_KMS_API_KEY` | KMS를 사용하여 암호화된 Datadog API 키입니다. 람다 함수 설정에서 `DD_KMS_API_KEY` 환경 변수를 설정합니다. 참고: `DD_KMS_API_KEY`가 설정되면 `DD_API_KEY`는 무시됩니다. | `export DATADOG_KMS_API_KEY=<KMS_ENCRYPTED_API_KEY>` |
| `DATADOG_SITE` | 데이터를 보낼 Datadog 사이트를 설정합니다. Datadog 람다 확장을 사용하는 경우에만 필요합니다. 가능한 값은`datadoghq.com` , `datadoghq.eu`, `us3.datadoghq.com`,`us5.datadoghq.com` , `ap1.datadoghq.com` 및 `ddog-gov.com`입니다. 기본값은 `datadoghq.com`입니다. 람다 함수 설정에서 `DD_SITE` 환경 변수를 설정합니다. | `export DATADOG_SITE="datadoghq.com"` |


### 인수

명령줄 인수 또는 JSON 설정 파일을 사용하여 설정할 수 있습니다 (다음 섹션 참조).

#### `instrument`
다음 인수를 `instrument`에 전달하여 동작을 지정할 수 있습니다. 이러한 인수는 설정 파일에 설정된 값이 있는 경우 재정의합니다.

| Argument | Shorthand | 설명 | 기본 |
| --- | --- | --- | --- |
| `--function` | `-f` | **계측할** 람다 함수의 ARN 또는 람다 함수의 이름입니다 (`--region`을 정의해야 함). | |
| `--functions-regex` | | 람다 함수 이름과 일치할 정규식 패턴입니다. | |
| `--interactive` | `-i` | 사용자가 자신의 함수가 계측되는 방식을 대화형으로 선택할 수 있습니다. 대화형 모드를 사용하도록 선택하면 정보를 입력하라는 메시지가 표시되므로 다른 플래그를 제공할 필요가 없습니다. | |
| `--region` | `-r` | ARN 대신 함수 이름으로 `--function`을 지정할 때 사용할 기본 영역입니다. | |
| `--service` | | `--service` to group related functions belonging to similar workloads. Learn more about the `service` 태그를 [여기][9]에 사용합니다. | |
| `--version` | | `--version` tag to correlate spikes in latency, load or errors to new versions. Learn more about the `version` 태그를 [여기][8]에 추가합니다. | |
| `--env` | | `--env` to separate out your staging, development, and production environments. Learn more about the `env` 태그를 [여기][7]에 사용합니다. | |
| `--extra-tags` | | Datadog에서 람다 함수에 커스텀 태그를 추가합니다. `layer:api,team:intake`와 같이 쉼표로 구분된 `<key>:<value>` 목록이어야 합니다. | |
| `--profile` | | 계측에 사용할 AWS 명명된 프로필 자격 증명을 지정합니다. AWS 명명된 프로필에 대해 [여기][12]에서 자세히 알아보세요. |  | 
| `--layer-version` | `-v` | 적용할 Datadog 람다 라이브러리 레이어의 버전입니다. 런타임에 따라 다릅니다. 최신 레이어 버전을 확인하려면 [JS][3] 또는 [python][4] datadog-lambda-layer 리포지토리 릴리스 노트를 확인하세요. | |
| `--extension-version` | `-e` | 적용할 Datadog 람다 확장 레이어의 버전입니다. `extension-version`이 설정되면 환경에서도 `DATADOG_API_KEY`(암호화된 경우 `DATADOG_KMS_API_KEY` 또는 `DATADOG_API_KEY_SECRET_ARN`)를 내보내야 합니다. `extension-version`를 사용하는 동안 `forwarder`을 생략합니다.  [여기][5]에서 람다 확장에 대해 자세히 알아보세요. | |
| `--tracing` |  | 람다에 대한 dd-trace 추적을 활성화할지 여부입니다. | `true` |
| `--merge-xray-traces` | | dd-trace 트레이스를 AWS X-Ray 트레이스에 결합할지 여부입니다. API 게이트웨이 스팬을 추적하는 데 유용합니다. | `false` |
| `--flush-metrics-to-logs` | | Datadog 포워더를 통해 [비동기적으로][11] 메트릭을 전송할지 여부입니다. 이 파라미터를 사용하지 않으면`DATADOG_API_KEY`를 내보내야 합니다 (또는 암호화된 경우, `DATADOG_KMS_API_KEY` 또는 `DATADOG_API_KEY_SECRET_ARN`). | `true` |
| `--capture-lambda-payload` | | 람다 호출의 페이로드 및 응답을 캡처하고 저장할지 여부입니다. | `false` |
| `--forwarder` | | 이 함수의 로그 그룹을 연결할 [datadog 포워더)[10]의 ARN입니다. | |
| `--dry` | `-d` | 실행 중인 변경 사항 미리보기 명령이 적용됩니다. | `false` |
| `--log-level` | | 문제 해결을 위해 Datadog 람다 라이브러리 및/또는 람다 확장에서 추가 출력을 확인하려면 `debug`로 설정하세요. | |
| `--source-code-integration` | `-s` | [Datadog 소스 코드 통합][13]을 활성화할지 여부입니다. 이렇게 하면 람다에 Git 저장소 URL과 현재 로컬 디렉토리의 최신 커밋 해시로 태그가 지정됩니다. **참고**: Git 저장소는 원격 저장소보다 앞에 있지 않아야 하며 더럽지 않아야 합니다. | `true` |
| `--no-source-code-integration` | | Datadog 소스 코드 통합을 비활성화합니다. | |
| `--upload-git-metadata` | `-u` | 소스 코드 통합의 일부로 Git 메타데이터 업로드를 사용할지 여부입니다. Datadog Github 통합을 설치하지 않은 경우에만 Git 메타데이터 업로드가 필요합니다. | `true` | 
| `--no-upload-git-metadata` | | 소스 코드 통합의 일부로 Git 메타데이터 업로드를 비활성화합니다. Datadog Github 통합을 설치한 경우 Git 메타데이터 업로드가 불필요하므로 이 플래그를 사용합니다. ||
| `--apm-flush-deadline` | | 밀리초에서 시간 초과하기 전에 기간을 제출할 시기를 결정하는 데 사용됩니다. AWS 람다 호출의 남은 시간이 설정된 값보다 작으면 추적기는 현재 활성 스팬(span)과 완료된 모든 스팬(span)을 제출하려고 시도합니다. NodeJS 및 파이썬(Python)에서 지원됩니다. 기본값은 `100`밀리초입니다. ||
<br />

#### `uninstrument`
다음 인수는 `uninstrument`에 전달되어 동작을 지정합니다. 이러한 인수는 설정 파일에 설정된 값이 있는 경우 재정의합니다.

`instrument` 표에 명시되어 있지만 아래에 있지 않은 다른 인수는 무시되므로 필요한 경우 더 빠르게 계측을 해제할 수 있습니다.

| Argument | Shorthand | 설명 | 기본 |
| --- | --- | --- | --- |
| `--function` | `-f` | **계측되지 않은** 람다 함수의 ARN 또는 람다 함수의 이름입니다 (`--region`을 정의해야 함). | |
| `--functions-regex` | | **계측되지 않은** 람다 함수 이름과 일치할 정규식 패턴입니다. | |
| `--region` | `-r` | ARN 대신 함수 이름으로 '--function'을 지정할 때 사용할 기본 영역입니다. | |
| `--profile` | | 계측을 해제하는 데 사용할 AWS 명명된 프로필 자격 증명을 지정합니다. [여기][12]에서 AWS 명명된 프로필에 대해 자세히 알아보세요. |  | 
| `--forwarder` | | 이 함수에서 제거할 [datadog 포워더][10]의 ARN입니다. | |
| `--dry` | `-d` | 실행 중인 변경 사항 미리보기 명령이 적용됩니다. | `false` |

<br/>

### 설정 파일

인수를 제공하는 대신 프로젝트에서 설정 파일을 생성하고 각 배포에서 `datadog-ci lambda {instrument|uninstrument} --config datadog-ci.json` 명령을 실행합니다. `--config` 인수를 사용하여 `datadog-ci.json`를 지정하고 다음 설정 파일 구조를 사용합니다:

```json
{
    "lambda": {
        "layerVersion": 10,
        "extensionVersion": 8,
        "functions": ["arn:aws:lambda:us-east-1:000000000000:function:autoinstrument"],
        "region": "us-east-1",
        "tracing": true,
        "mergeXrayTraces": true,
        "captureLambdaPayload": true,
        "forwarder": "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder",
        "logLevel": "debug",
        "service":"some-service",
        "version":"b17s47h3w1n",
        "profile": "my-credentials"
        "environment":"staging",
        "extraTags":"layer:api,team:intake"
    }
}
```
## 커뮤니티

제품 피드백 및 질문은 [슬랙의 Datadog 커뮤니티](https://chat.datadoghq.com/)의 `#serverless`에 가입하세요.

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-ci
[3]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[4]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[5]: https://docs.datadoghq.com/ko/serverless/datadog_lambda_library/extension
[6]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[7]: https://docs.datadoghq.com/ko/serverless/troubleshooting/serverless_tagging/#the-env-tag
[8]: https://docs.datadoghq.com/ko/serverless/troubleshooting/serverless_tagging/#the-version-tag
[9]: https://docs.datadoghq.com/ko/serverless/troubleshooting/serverless_tagging/#the-service-tag
[10]: https://docs.datadoghq.com/ko/serverless/forwarder/
[11]: https://docs.datadoghq.com/ko/serverless/custom_metrics?tab=python#enabling-asynchronous-custom-metrics
[12]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html#using-profiles
[13]: https://docs.datadoghq.com/ko/integrations/guide/source-code-integration