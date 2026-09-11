---
title: Java Lambda 함수용 계측 업그레이드
---

이 문서에서는 Java Lambda 계측을 위한 Datadog 업그레이드 방법을 다룹니다. 계측 설정이 처음이라면 이 문서 대신 [Java Lambda 설치 지침][1]을 참고하세요.

Datadog Lambda 레이어 `dd-trace-java:5`와 `Datadog-Extension:25`는 Java Lambda 함수에 대한 계측 설정 프로세스에 다음과 같은 변경 사항을 도입합니다:

1. [datadog-lambda-java][2] 라이브러리는 더 이상 사용되지 않으며 필요하지 않습니다.
2. 커스텀 계측을 제외하고 `DDLambda` 래퍼와 같은 코드 변경이 필요하지 않습니다.
3. [Datadog CI][3]와 [Datadog 서버리스 플러그인][4]을 사용해 Datadog을 설정할 수 있습니다.

### 업그레이드

1. `datadog-lambda-java`는 더 이상 필요하지 않기 때문에 `build.gradle` 또는 `pom.xml`에서 제거합니다.
2. 함수 코드에서 `DDLambda` 및 가져오기 명령문을 제거합니다.
3. 환경 변수 `AWS_LAMBDA_EXEC_WRAPPER`를 `/opt/datadog_wrapper`로 설정합니다.
4. `dd-trace-java` 버전을 `{{< latest-lambda-layer-version layer="dd-trace-java" >}}`로, `Datadog-Extension`을 `{{< latest-lambda-layer-version layer="extension" >}}`로 증가시킵니다.
5. `DDLambda.metric()` 도우미 함수를 사용해 커스텀 메트릭을 제출하는 경우 표준 [Java용 DogStatsD 클라이언트][5]를 사용하고 [예제 코드][6]를 적용해 메트릭을 분포로 제출합니다. [Lambda에서는 분포만 사용 가능함][7]을 유의하세요. 

[1]: /ko/serverless/installation/java/
[2]: https://github.com/DataDog/datadog-lambda-java
[3]: /ko/serverless/installation/java/?tab=datadogcli
[4]: /ko/serverless/installation/java/?tab=serverlessframework
[5]: /ko/developers/dogstatsd/?tab=hostagent&code-lang=java
[6]: /ko/serverless/custom_metrics/?code-lang=java#with-the-datadog-lambda-extension
[7]: /ko/serverless/custom_metrics#understanding-distribution-metrics