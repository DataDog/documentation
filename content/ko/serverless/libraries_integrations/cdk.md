---
dependencies:
- https://github.com/DataDog/datadog-cdk-constructs/blob/main/README.md
kind: 설명서
title: Datadog CDK Construct
---
[![NPM](https://img.shields.io/npm/v/datadog-cdk-constructs?color=blue&label=npm+cdk+v1)](https://www.npmjs.com/package/datadog-cdk-constructs)
[![NPM](https://img.shields.io/npm/v/datadog-cdk-constructs-v2?color=39a356&label=npm+cdk+v2)](https://www.npmjs.com/package/datadog-cdk-constructs-v2)
[![PyPI](https://img.shields.io/pypi/v/datadog-cdk-constructs?color=blue&label=pypi+cdk+v1)](https://pypi.org/project/datadog-cdk-constructs/)
[![PyPI](https://img.shields.io/pypi/v/datadog-cdk-constructs-v2?color=39a356&label=pypi+cdk+v2)](https://pypi.org/project/datadog-cdk-constructs-v2/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-cdk-constructs/blob/main/LICENSE)

AWS CDK를 사용하여 서버리스 애플리케이션을 배포할 수 있도록 Datadog CDK Construct 라이브러리를 사용합니다.

CDK 라이브러리는 다음과 같은 방법으로 서버리스 애플리케이션에서 메트릭, 트레이스 및 로그 수집을 자동으로 설정합니다:

-  [.NET][19], [자바(Java)][15], [Node.js][2] 및 [파이썬(Python)][1] 람다 함수에 대해 Datadog 레이어를 설치하고 설정합니다.
- 람다 기능/함수에서 트레이스 및 커스텀 메트릭 수집을 활성화합니다.
- Datadog 포워더(Forwarder)에서 람다 및 비 람다 로그 그룹에 대한 구독을 관리합니다.

## AWS CDK v1 vs AWS CDK v2

**경고**: `AWS CDK v1`에 대한 지원이 종료되어 더 이상 `datadog-cdk-constructs`는 업데이트를 수신하지 않습니다. `AWS CDK v2`로 업그레이드하여 ([공식 마이그레이션 가이드](https://docs.aws.amazon.com/cdk/v2/guide/migrating-v2.html)) `datadog-cdk-constructs-v2` 사용으로 전환할 것을 강력히 권장합니다.

Datadog CDK Constructs에는 두 개의 개별 버전인 `datadog-cdk-constructs`와 `datadog-cdk-constructs-v2`가 있습니다. 이들은 각각 `AWS CDK v1`및 `AWS CDK v2`와 함께 작동하도록 설계되었습니다.

- `datadog-cdk-constructs-v2`는 Node >= 14가 필요하며, `datadog-cdk-constructs`는 Node >= 12를 지원합니다.
- `datadog-cdk-constructs-v2`는 더 많은 기능을 포함합니다.
- 그렇지 않으면 두 패키지의 사용법은 동일합니다.

## npm 패키지 설치:

AWS CDK v2와 함께 사용하는 경우:
```
yarn add --dev datadog-cdk-constructs-v2
# 또는
npm install datadog-cdk-constructs-v2 --save-dev
```

AWS CDK v1과 함께 사용하는 경우:
```
yarn add --dev datadog-cdk-constructs
# or
npm install datadog-cdk-constructs --save-dev
```

## PyPI 패키지 설치:

AWS CDK v2와 함께 사용하는 경우:
```
pip install datadog-cdk-constructs-v2
```

AWS CDK v1과 함께 사용하는 경우:
```
pip install datadog-cdk-constructs
```

### 참고:

`Datadog CDK Construct Library`에는 피어 종속성이 있으므로 패키지 관리자의 출력에 주의하세요.

## 사용량

### AWS CDK

- _AWS CDK를 처음 사용하는 경우 이 [워크샵][14]을 확인하세요._
- _다음 예시에서는 AWS CDK v2를 사용하는 것으로 가정합니다. CDK v1을 사용하는 경우 `datadog-cdk-constructs-v2`대신 `datadog-cdk-constructs`를 가져옵니다._ 

이를 CDK 스택에 추가하세요:

```typescript
import { Datadog } from "datadog-cdk-constructs-v2";

const datadog = new Datadog(this, "Datadog", {
  nodeLayerVersion: <LAYER_VERSION>,
  pythonLayerVersion: <LAYER_VERSION>,
  javaLayerVersion: <LAYER_VERSION>,
  dotnetLayerVersion: <LAYER_VERSION>
  addLayers: <BOOLEAN>,
  extensionLayerVersion: "<EXTENSION_VERSION>",
  forwarderArn: "<FORWARDER_ARN>",
  createForwarderPermissions: <BOOLEAN>,
  flushMetricsToLogs: <BOOLEAN>,
  site: "<SITE>",
  apiKey: "{Datadog_API_Key}",
  apiKeySecretArn: "{Secret_ARN_Datadog_API_Key}",
  apiKeySecret: <AWS_CDK_ISECRET>, // Only available in datadog-cdk-constructs-v2
  apiKmsKey: "{Encrypted_Datadog_API_Key}",
  enableDatadogTracing: <BOOLEAN>,
  enableMergeXrayTraces: <BOOLEAN>,
  enableDatadogLogs: <BOOLEAN>,
  injectLogContext: <BOOLEAN>,
  logLevel: <STRING>,
  env: <STRING>, //Optional
  service: <STRING>, //Optional
  version: <STRING>, //Optional
  tags: <STRING>, //Optional
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
datadog.addForwarderToNonLambdaLogGroups([<LOG_GROUPS>])
```

## 소스 코드 통합
[소스 코드 통합](https://docs.datadoghq.com/integrations/guide/source-code-integration/) 은 자동 람다 태깅을 통해 기본적으로 활성화되며 다음과 같은 경우에 작동합니다:

- Datadog Github 통합이 설치되었습니다.
- datadog-cdk 종속성은 다음 버전 중 하나를 충족합니다:
  - `datadog-cdk-constructs-v2` >= 1.4.0
  - `datadog-cdk-constructs` >= 0.8.5

### 소스 코드 통합을 활성화하는 다른 방법
자동 구현이 적용되지 않는 경우, 다음 두 가지 가이드 중 하나를 따르세요.

**참고: 이 대체 가이드는 Typescript에서만 사용할 수 있습니다.**
<details>
  <summary>datadog-cdk version satisfied, but Datadog Github Integration NOT installed</summary>

Datadog Github 통합이 설치되어 있지 않은 경우, `datadog-ci` 패키지를 가져와서 수동으로 Git 메타데이터를 Datadog에 업로드해야 합니다.
CDK Stack이 초기화된 곳에서 이 작업을 수행하는 것이 좋습니다.

  ```typescript
  const app = new cdk.App();

  // 패키지 관리자를 통해 @datadog/datadog-ci를 추가해야 합니다.
  const datadogCi = require("@datadog/datadog-ci");
  // Datadog에 수동으로 Git 메타데이터 업로드하기
  datadogCi.gitMetadata.uploadGitCommitHash('{Datadog_API_Key}', '<SITE>')

  const app = new cdk.App();
  new ExampleStack(app, "ExampleStack", {});

  app.synth();
  ```
</details>
<details>
  <summary>datadog-cdk version NOT satisfied</summary>

초기화 함수를 다음과 같이 변경합니다(참고: `gitHash` 값만 CDK에 전달하도록 변경 중입니다):

  ```typescript
  async function main() {
    // 패키지 관리자를 통해 @datadog/datadog-ci를 추가해야 합니다.
    const datadogCi = require("@datadog/datadog-ci");
    const [, gitHash] = await datadogCi.gitMetadata.uploadGitCommitHash('{Datadog_API_Key}', '<SITE>')

    const app = new cdk.App();
    // ExampleStack 컨스트럭터에 해시를 전달합니다.
    new ExampleStack(app, "ExampleStack", {}, gitHash);
  }
  ```
 이 함수를 호출하여 스택을 초기화해야 합니다.

스택 컨스트럭터에서 부수적인 `gitHash` 파라미터를 추가하도록 변경하고 `addGitCommitMetadata()`를 호출합니다:

  ```typescript
  export class ExampleStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps, gitHash?: string) {
      ...
      ...
      datadog.addGitCommitMetadata([<YOUR_FUNCTIONS>], gitHash)
    }
  }
  ```
</details>

## 설정

Datadog 컨스트럭트를 추가로 설정하려면 다음 커스텀 파라미터를 사용합니다:

_참고_: 설명서는 npm 패키지 파라미터를 사용하지만 PyPI 패키지 파라미터에도 적용됩니다.

| npm 패키지 파라미터 | PyPI 패키지 파라미터 | 설명 |
| --- | --- | --- |
| `addLayers` | `add_layers` | 람다 레이어를 추가할지 또는 사용자가 자체적인 레이어를 가져올지 여부입니다. 기본값은 `true`입니다. `true`면 람다 라이브러리 버전 변수도 필요합니다. `false`면 함수의 배포 패키지에 Datadog 람다 라이브러리를 표시해야 합니다. |
| `pythonLayerVersion` | `python_layer_version` | `83` 등 설치할 파이썬(Python) 람다 레이어 버전입니다. 하나 이상의 람다 함수를 파이썬(Python)에서 작성하여 배포하고 `addLayers`가 참인 경우 필요합니다. [여기][5]서 최신 버전을 찾으세요. |
| `nodeLayerVersion` | `node_layer_version` | `100` 등 설치할 Node.js 람바 레이어 버전입니다. Node.js로 작성된 하나 이상의 람다 함수를 배포하고 `addLayers`가 `true`인 경우 필요합니다. [여기][6]에서 최신 버전 번호를 찾으세요. |
| `javaLayerVersion` | `java_layer_version` | `8` 등 설치할 자바(Java) 레이어 버전입니다. 자바로 작성된 하나 이상의 람다 함수를 배포하고 `addLayers`가 `true`인 경우 필요합니다. [서버리스 자바 설치 설명서][15]에서 최신 버전 번호를 찾으세요. **참고**: `extensionLayerVersion >= 25` 및 `javaLayerVersion >= 5`는 Datadog 컨스트럭트가 자바 함수를 제대로 계측하는 데 필요합니다. |
| `dotnetLayerVersion` | `dotnet_layer_version` | `13` 등 설치할 .NET 레이어 버전입니다. .NET으로 작성된 하나 이상의 람다 함수를 배포하고 `addLayers`가 `true`인 경우 필요합니다. [여기][18]에서 최신 버전 번호를 찾으세요. |
| `extensionLayerVersion` | `extension_layer_version` | 설치할 Datadog Lambda 확장 레이어의 버전(예: 5)입니다. `extensionLayerVersion`가 설정된 경우 `apiKey`(암호화된 경우에는 `apiKMSKey` 또는 `apiKeySecretArn`)도 설정해야 합니다. 활성화되면 람다 함수 로그 그룹이 포워더(Forwarder)에 등록되지 않습니다. 람다 확장에 대한 자세한 내용은 [여기][12]에서 확인하세요. |
| `forwarderArn` | `forwarder_arn` | 설정되면 플러그인이 자동으로 Datadog 포워더(Forwarder)를 함수의 로그 그룹에 등록합니다. `extensionLayerVersion`가 설정되어 있으면 `forwarderArn`는 설정하지 마세요. |
| `createForwarderPermissions` | `createForwarderPermissions` | `true`로 설정하면 로그 그룹별로 Datadog 포워더(Forwarder)에 대한 람다 권한을 생성합니다. Datadog 포워더(Forwarder)에는 기본적으로 설정된 권한이 있기 때문에 대부분의 사용 용도에서는 이 권한이 필요하지 않습니다. |
| `flushMetricsToLogs` | `flush_metrics_to_logs` | Datadog 포워더 람다 함수와 함께 CloudWatch 로그를 사용하여 커스텀 메트릭을 전송합니다 (권장 사항). 기본값은 `true`입니다. 이 파라미터를 사용하지 않으면 `apiKey`를 (암호화된 경우에는 `apiKMSKey` 또는 `apiKeySecretArn`) 설정해야 합니다. |
| `site` | `site` | 데이터를 보낼 Datadog 사이트를 설정합니다. 이 옵션은`flushMetricsToLogs`가 `false`일 때 또는 `extensionLayerVersion`이 설정된 경우에만 사용됩니다. 가능한 값은`datadoghq.com`, `datadoghq.eu`,`us3.datadoghq.com`, `us5.datadoghq.com`,`ap1.datadoghq.com` 및 `ddog-gov.com` 입니다. 기본값은 `datadoghq.com`입니다. |
| `apiKey` | `api_key` | Datadog API Key는 `flushMetricsToLogs`가 `false`일 경우 또는 `extensionLayerVersion`이 설정된 경우에만 필요합니다. Datadog API 키를 가져오는 방법에 대한 자세한 내용은 [API 키 설명서][8]를 참조하세요. |
| `apiKeySecretArn` | `api_key_secret_arn` | AWS 비밀 관리자에서 Datadog API 키를 저장하는 암호의 ARN입니다. `flushMetricsToLogs`가 `false`일 경우 또는 `extensionLayer`가 설정된 경우 `apiKey` 대신 이 파라미터를 사용합니다. 람다 실행 역할에 `secretsmanager:GetSecretValue` 권한을 추가해야 합니다. |
| `apiKeySecret` | `api_key_secret` | Datadog API 키를 AWS 비밀 관리자에 저장하는 암호를 나타내는 [AWS CDK ISecret][16]입니다. 람다 실행 역할에 지정된 암호에 대한 읽기 권한을 자동으로 부여하려면 `apiKeySecretArn` 대신 이 파라미터를 사용합니다. 관련 예시는 [여기에서 확인하세요](#automatically-grant-aws-secret-read-access-to-lambda-execution-role). **datadog-cdk-constructs-v2**에서만 사용할 수 있습니다. |
| `apiKmsKey` | `api_kms_key` | KMS를 사용하여 암호화된 Datadog API 키입니다. `flushMetricsToLogs`가 `false`일 경우 또는 `extensionLayerVersion`가 설정된 경우 그리고 KMS 암호화를 사용하고 있는 경우 `apiKey` 대신 이 파라미터를 사용합니다. |
| `enableDatadogTracing` | `enable_datadog_tracing` | 람다 함수에서 Datadog 추적을 활성화합니다. 기본값은 `true`입니다. |
| `enableMergeXrayTraces` | `enable_merge_xray_traces` | 람다 함수에서 X-Ray 트레이스 병합을 활성화합니다. 기본값은 `false`입니다. |
| `enableDatadogLogs` | `enable_datadog_logs` | Datadog 람다 확장을 통해 람다 함수 로그를 Datadog으로 전송합니다. 기본값은 `true`입니다. 참고: 이 설정은 Datadog 포워더(Forwarder)를 통해 전송된 로그에는 적용되지 않습니다. |
| `enableSourceCodeIntegration` | `enable_source_code_integration` | 텔레메트리와 Git 저장소의 애플리케이션 코드를 연결하여 Datadog 소스 코드 통합을 활성화합니다. 이를 위해서는 Datadog Github 통합이 작동해야 합니다. 그렇지 않으면 [대체 방법](#alternative-methods-to-enable-source-code-integration)을 따르세요. 자세한 내용은 [여기](https://docs.datadoghq.com/integrations/guide/source-code-integration/)를 참조하세요. 기본값은 `true`입니다. |
| `injectLogContext` | `inject_log_context` | 설정하면 람다 레이어가 자동으로 Datadog의 추적 ID와 함께 console.log를 패치합니다. 기본값은 `true`입니다. |
| `logLevel` | `log_level` | `debug`로 설정하면 Datadog 람다 라이브러리와 확장이 문제 해결에 도움이 되는 추가 정보를 기록합니다. |
| `env` | `env` | `extensionLayerVersion`와 함께 설정하면 모든 람다 함수에 제공된 값으로 `DD_ENV` 환경 변수가 추가됩니다.`forwarderArn`와 함께 설정하면 모든 람다 함수에 제공된 값으로 `env` 태그가 추가됩니다. |
| `service` | `service` | `extensionLayerVersion`과 함께 설정하면 `DD_SERVICE` 환경 변수가 제공된 값으로 모든 람다 함수에 추가됩니다. `forwarderArn`와 함께 설정하면 제공된 값으로 모든 람다 함수에 `service` 태그가 추가됩니다. |
| `version` | `version` | `extensionLayerVersion`과 함께 설정하면 `DD_VERSION` 환경 변수가 제공된 값으로 모든 람다 함수에 추가됩니다. `forwarderArn`와 함께 설정하면 제공된 값으로 모든 람다 함수에 `version` 태그가 추가됩니다. |
| `tags` | `tags` | 키:값 쌍을 단일 문자열로써 쉼표로 구분한 목록입니다. `extensionLayerVersion`와 함께 설정하면 `DD_TAGS` 환경 변수가 제공된 값으로 모든 람다 함수에 추가됩니다. `forwarderArn`와 함께 설정하면 cdk는 문자열을 구문 분석하고 각 키:값 쌍을 모든 람다 함수에 태그로 설정합니다. |
| `enableColdStartTracing`      | `enable_cold_start_tracing` | `false`로 설정하여 콜드 스타트 추적을 비활성화합니다. Node.js 및 파이썬(Python)에서 사용됩니다. 기본값은 `true`입니다. |
| `coldStartTraceMinDuration`   | `min_cold_start_trace_duration` | 콜드 스타트 추적을 통해 추적할 모듈 로드 이벤트의 최소 지속 시간 (밀리초)을 설정합니다. 번호. 기본값은`3` 입니다. |
| `coldStartTraceSkipLibs`      | `cold_start_trace_skip_libs`| (선택 사항) 쉼표로 구분된 라이브러리 목록에 대한 콜드 스타트 스팬 생성을 건너뛸 수 있습니다. 깊이를 제한하거나 알려진 라이브러리를 건너뛸 때 유용합니다. 기본값은 런타임에 따라 다릅니다. |
| `enableProfiling`             | `enable_profiling` | `true`를 사용해 Datadog 지속성 프로파일러를 활성화합니다. Node.js 및 파이썬(Python) 베타에서 지원됩니다. 기본값은 `false`입니다. |
| `encodeAuthorizerContext`     |`encode_authorizer_context` | 람다 권한 부여자에 대해 `true`로 설정되면 트레이싱 컨텍스트가 전파를 위해 응답을 인코딩합니다. Node.js 및 파이썬(Python)에서 지원됩니다. 기본값은 `true`입니다. |
| `decodeAuthorizerContext`     |`decode_authorizer_context` | 람다 권한 부여자를 통해 권한이 부여된 람다에 대해 `true`로 설정되면 파싱하고 인코딩된 트레이싱 컨텍스트(발견된 경우)를 사용합니다. Node.js 및 파이썬(Python)에서 지원됩니다. 기본값은 `true`입니다.                         |
| `apmFlushDeadline` | `apm_flush_deadline` | 타임아웃이 발생하기 전 스팬을 제출할 시점을 결정하는 데 사용됩니다. AWS 람다 호출에서 남은 시간이 설정된 값 미만인 경우, 트레이서는 현재 활성 스팬과 모든 완료 스팬을 제출하려 시도합니다. Node.js 및 파이썬(Python)에서 지원됩니다. 기본값은 `100`밀리초입니다. |
| `redirectHandler` | `redirect_handler` | `false`로 설정하면 Datadog 람다 라이브러리의 핸들러로 리디렉션 핸들러를 건너뜁니다. Datadog 람다 확장으로만 계측할 때 유용합니다. 기본값은 `true`입니다. |

**참고**: 위의 파라미터를 사용하면 해당 함수 수준 `DD_XXX` 환경 변수를 재정의할 수 있습니다.
### 트레이싱 

람다 함수에서 X-Ray  추적을 활성화합니다. 자세한 내용은 [CDK 설명서][9]를 참조하세요.

```typescript
import * as lambda from "aws-cdk-lib/aws-lambda";

const lambda_function = new lambda.Function(this, "HelloHandler", {
  runtime: lambda.Runtime.NODEJS_14_X,
  code: lambda.Code.fromAsset("lambda"),
  handler: "hello.handler",
  tracing: lambda.Tracing.ACTIVE,
});
```

### 중첩된 스택

Datadog을 사용하여 계측하려는 각 스택에 Datadog CDK Construct를 추가합니다. 아래 예제에서는 Datadog CDK Construct를 초기화하고 `RootStack`와 `NestedStack` 모두에서 `addLambdaFunctions()`를 호출합니다.

```typescript
import { Datadog } from "datadog-cdk-constructs-v2";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

class RootStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new NestedStack(this, "NestedStack");

    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: <LAYER_VERSION>,
      pythonLayerVersion: <LAYER_VERSION>,
      javaLayerVersion: <LAYER_VERSION>,
      dotnetLayerVersion: <LAYER-VERSION>,
      addLayers: <BOOLEAN>,
      forwarderArn: "<FORWARDER_ARN>",
      flushMetricsToLogs: <BOOLEAN>,
      site: "<SITE>",
      apiKey: "{Datadog_API_Key}",
      apiKeySecretArn: "{Secret_ARN_Datadog_API_Key}",
      apiKmsKey: "{Encrypted_Datadog_API_Key}",
      enableDatadogTracing: <BOOLEAN>,
      enableMergeXrayTraces: <BOOLEAN>,
      enableDatadogLogs: <BOOLEAN>,
      injectLogContext: <BOOLEAN>
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);

  }
}

class NestedStack extends cdk.NestedStack {
  constructor(scope: Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: <LAYER_VERSION>,
      pythonLayerVersion: <LAYER_VERSION>,
      javaLayerVersion: <LAYER_VERSION>,
      dotnetLayerVersion: <LAYER-VERSION>,
      addLayers: <BOOLEAN>,
      forwarderArn: "<FORWARDER_ARN>",
      flushMetricsToLogs: <BOOLEAN>,
      site: "<SITE>",
      apiKey: "{Datadog_API_Key}",
      apiKeySecretArn: "{Secret_ARN_Datadog_API_Key}",
      apiKmsKey: "{Encrypted_Datadog_API_Key}",
      enableDatadogTracing: <BOOLEAN>,
      enableMergeXrayTraces: <BOOLEAN>,
      enableDatadogLogs: <BOOLEAN>,
      injectLogContext: <BOOLEAN>
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);

  }
}
```

### 태그

컨스트럭트에 태그를 추가합니다. `env` 및 `service` 태그를 설정하여 Datadog 텔레메트리를 함께 연결하는 것이 좋습니다. 자세한 내용은 [공식 AWS 설명서][10] 및 [CDK 설명서][11]를 참조하세요.

## 람다 실행 역할에 대한 AWS 비밀 읽기 권한 자동 부여
**datadog-cdk-constructs-v2에서만 사용 가능**

람다 실행 역할에 지정된 암호에 대한 읽기 권한을 자동으로 부여하려면 Datadog 컨스트럭트를 초기화할 때 `apiKeySecretArn`대신 `apiKeySecret`을 전달합니다.

```typescript
const { Secret } = require('aws-cdk-lib/aws-secretsmanager');

const secret = Secret.fromSecretPartialArn(this, 'DatadogApiKeySecret', 'arn:aws:secretsmanager:us-west-1:123:secret:DATADOG_API_KEY');

const datadog = new Datadog(this, 'Datadog', {
  ...
  apiKeySecret: secret
  ...
});
```

`addLambdaFunctions`이 호출되면 Datadog CDK 컨스트럭트가 람다 실행 역할에 지정된 AWS 암호에 대한 읽기 액세스 권한을 부여합니다. 이 작업은 [AWS ISecret's grantRead 함수][17]를 통해 수행됩니다.

## 작동 방식

Datadog CDK 컨스트럭트는 람다 함수 목록을 가져와 [.NET][19], [자바][15], [Node.js][2] 및  [파이썬][1]에 대한 람다 레이어를 함수에 추가하여 Datadog 람다 라이브러리를 설치합니다. 필수 코드 변경 없이 람다 라이브러리를 초기화하는 대체 핸들러로 리디렉션됩니다. Datadog CDK 컨스트럭트에 추가된 추가 설정은 또한 각 람다 함수의 해당 환경 변수입니다(해당 경우/필요 시).

람다 함수 기반 로그 그룹은 `addLambdaFunctions` 메소드에 의해 자동으로 처리되지만 컨스트럭트에는 선택한 추가 로그 그룹에 포워더(Forwarder)를 등록하는 추가 함수`addForwarderToNonLambdaLogGroups`이 있습니다.


## CDK에 대해 알아볼 수 있는 리소스

- [CDK 타입스크립트 워크샵](https://cdkworkshop.com/20-typescript.html)
- [데모와 함께 AWS의 CDK를 소개하는 비디오 ](https://youtu.be/ZWCvNFUN-sU)
- [CDK 컨셉](https://youtu.be/9As_ZIjUGmY)

## 저장소 구조

이 저장소에서 폴더 `v1` . `v2`는 패키지`datadog-cdk-constructs`와 `datadog-cdk-contructs-v2`에 해당합니다 . 각각은 별도의 프로젝트로 취급될 수 있습니다 (이들은 별도의 종속성, 설정 파일, 테스트 및 스크립트를 가진 별도의 Projen 프로젝트입니다).

또한 `v1` 및 `v2` 패키지 모두에 공통적으로 적용되는 공유 로직이 포함된 `common` 폴더가 있습니다. 이 작업은 `v1/src`와 `v2/src` 내 `common` 폴더와 저장소 루트에 있는 `common` 폴더를 소프트 링크하면 됩니다.

## Projen 사용하기

`v1`및 `v2` Datadog CDK Construct 라이브러리는 모두 Projen을 사용하여 `package.json`, `.gitignore`, `.npmignore` 등의 프로젝트 설정 파일을 유지 관리합니다. 대부분의 설정 파일은 읽기 전용 권한을 통해 Projen에 의해 보호됩니다. 이러한 파일을 변경하려면 `v1` 또는 `v2` 폴더 내에서 `.projenrc.js` 파일을 편집한 다음 `npx projen`(`v1` 또는 `v2`를 실행한 상태에서)을 실행하여 새 변경 사항을 통합합니다. 자세한 내용은 [Projen][13]에서 확인하세요.

## 이슈 열기

이 패키지와 관련된 버그가 발견되면 알려주시기 바랍니다. 새 이슈를 열기 전에 기존 이슈를 검색하여 중복을 피하세요.

이슈를 열 때, 가능하면  Datadog CDK Construct 버전, Node 버전 및 스택 트레이스(stack trace)를 포함하세요. 또한 가능한 경우 재현 단계를 포함하세요.

기능 요청에 대한 이슈를 열 수도 있습니다.

## 기여하기

이 패키지와 관련된 문제를 발견하고 수정 사항이 있으면 [절차](https://github.com/DataDog/datadog-cdk-constructs/blob/main/CONTRIBUTING.md)에 따라 풀 리퀘스트를 개설해 주세요.

## 테스트

이 패키지에 기여하면 `v1` 또는 `v2` 폴더 내에서 `yarn test`를 사용하여 테스트를 실행할 수 있습니다. 이 패키지에는 수동 테스트를 위한 샘플 애플리케이션도 포함되어 있습니다:

1. 별도의 터미널을 열고 `cd`를 `v1` 또는 `v2`에 엽니다.
2. `yarn watch`를 실행하면 `src` 디렉토리의 타입스크립트 파일이 `lib` 디렉토리의 자바스크립트로 컴파일됩니다.
3. `src/sample`으로 이동한 후 `index.ts`를 편집하여 기여도를 수동으로 테스트할 수 있습니다.
4. `v1` 또는 `v2` 디렉토리 (어느 것이든 작업 중인 디렉토리)의 루트에서 `synth`, `diff`, `deploy`와 같은 일반적인 CDK 명령으로 `<CDK Command>`을 대체하고 `npx cdk --app lib/sample/index.js <CDK Command>`를 실행합니다.

- "... 를 수행할 권한이 없습니다: ..." 라는 메시지가 표시되면 AWS 증명서를 사용하여 명령을 인증해야 할 수도 있습니다.

### 디버그 로그

`cdk synth`가 실행 중인 경우 이 라이브러리에 대한 디버그 로그를 표시하려면 `DD_CONSTRUCT_DEBUG_LOGS` 환경 변수를 `true`로 설정하세요 (생성된 템플릿 출력을 억제하려면 `--quiet`  사용).

예:
_`v1` 또는 `v2`디렉토리의 루트에 있는지 확인하세요_

```
DD_CONSTRUCT_DEBUG_LOGS=true npx cdk --app lib/sample/index.js synth --quiet
```

## 커뮤니티

제품 피드백 및 질문이 있는 경우 [슬랙의 Datadog 커뮤니티](https://chat.datadoghq.com/)의 `#serverless` 채널에 가입하세요.

## 라이센스

명시적으로 규정되지 않은 한 이 저장소의 모든 파일은 Apache License Version 2.0에 따라 라이센스가 부여됩니다.

이 제품에는 Datadog (https://www.datadoghq.com/)에서 개발한 소프트웨어가 포함되어 있습니다. Copyright 2021 Datadog, Inc.

[1]: https://github.com/DataDog/datadog-lambda-layer-python
[2]: https://github.com/DataDog/datadog-lambda-layer-js
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html
[4]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Stack.html
[5]: https://github.com/DataDog/datadog-lambda-python/releases
[6]: https://github.com/DataDog/datadog-lambda-js/releases
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[8]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[9]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Tracing.html
[10]: https://docs.aws.amazon.com/cdk/latest/guide/tagging.html
[11]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.Tags.html
[12]: https://docs.datadoghq.com/ko/serverless/datadog_lambda_library/extension/
[13]: https://github.com/projen/projen
[14]: https://cdkworkshop.com/15-prerequisites.html
[15]: https://docs.datadoghq.com/ko/serverless/installation/java/?tab=awscdk
[16]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_secretsmanager.ISecret.html
[17]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_secretsmanager.ISecret.html#grantwbrreadgrantee-versionstages
[18]: https://github.com/DataDog/dd-trace-dotnet-aws-lambda-layer/releases
[19]: https://docs.datadoghq.com/ko/serverless/aws_lambda/installation/dotnet