---
aliases:
- /ko/synthetics/cicd_integrations/jenkins
description: CI/CD 파이프라인에서 Continuous Testing 테스트를 실행하기 위해 Jenkins 인스턴스를 설정하세요.
further_reading:
- link: https://www.datadoghq.com/blog/jenkins-testing/
  tag: 블로그
  text: Jenkins 파이프라인에서 Datadog Synthetic 테스트 실행
- link: /continuous_integration/setup_pipelines/jenkins/
  tag: 설명서
  text: Jenkins 파이프라인에서 트레이스 설정
title: Jenkins
---

## 개요

Jenkins 환경에 Continuous Testing 테스트를 추가합니다.

Datadog은 기존 Jenkins 아키텍처를 모델링하고 비즈니스 요구 사항에 맞는 설치를 결정하기 위해 SRE 및 인프라 팀과 논의할 것을 권장합니다.

## 설정

Jenkins 환경에서 Docker를 사용하려면 [파이프라인으로 Docker 사용하기][1]를 참고하세요.

### 전제 조건

* Node.js v10.24.1+
* [Config File Provider][2]를 통해 Jenkins 인스턴스에 업로드 된 글로벌 JSON 설정 파일입니다. 이 파일은 Synthetics 테스트 설정에 대한 글로벌 속성을 정의하는데 필요합니다.

환경 변수를 글로벌 설정 파일에 직접 저장하거나 [사용자 자격 증명][3]을 사용할 수 있습니다. 테스트 설정에 관한 자세한 내용은 [테스트 설정][4]을 참고하세요.

### `@datadog/datadog-ci` 패키지 실행

Jenkins Node.js 플러그인을 사용해 Jenkins 환경에서 Node.js와 NPM 패키지를 설치하고 실행하세요.

기존 Datadog-Jenkins 통합에 관한 자세한 정보는 [Jenkins 파이프라인에서 트레이스 설정][5]을 참고하세요.

### Node.js 설치 추가

글로벌 Jenkins 설정 패널로 이동하여 Node.js 설치를 추가합니다.

{{< img src="synthetics/cicd_integrations/jenkins/nodejs-installation.png" alt="Node.js Installations in Jenkins" style="width:80%;">}}

모든 관련 Node.js 설치에 `@datadog/datadog-ci`를 전체적으로 설치합니다.

#### 태그

Jenkins Declarative 파이프라인에서 태그로 Continuous Testing 테스트를 실행하려면:

{{< code-block lang="groovy" disable_copy="false" collapsible="true" >}}
pipeline {
   agent any
   stages {
       stage('Run e2e tests') {
           steps {
               withCredentials([string(credentialsId: 'datadog-api-key', variable: 'DATADOG_API_KEY'), string(credentialsId: 'datadog-app-key', variable: 'DATADOG_APP_KEY')]) {
                   nodejs(nodeJSInstallationName: 'Node 10.24.x') {
                       configFileProvider(
                           [configFile(fileId: 'config-file-id', variable: 'DATADOG_CI_CONFIG')]) {
                           sh 'datadog-ci synthetics run-tests -s "tag:e2e" --config $DATADOG_CI_CONFIG'
                       }
                   }
               }
           }
       }
   }
{{< /code-block >}}

#### 커스텀 테스트 파일

Jenkins Declarative 파이프라인에서 커스텀 테스트 파일로 Continuous Testing 테스트를 실행하려면:

{{< code-block lang="groovy" disable_copy="false" collapsible="true" >}}
pipeline {
   agent any
   stages {
       stage('Run e2e tests') {
           steps {
               withCredentials([string(credentialsId: 'datadog-api-key', variable: 'DATADOG_API_KEY'), string(credentialsId: 'datadog-app-key', variable: 'DATADOG_APP_KEY')]) {
                   nodejs(nodeJSInstallationName: 'Node 10.24.x') {
                       configFileProvider(
                           [configFile(fileId: 'config-file-id', variable: 'DATADOG_CI_CONFIG'), configFile(fileId: 'test-file-id', variable: 'DATADOG_CI_TEST_FILE')]) {
                           sh 'datadog-ci synthetics run-tests -f $DATADOG_CI_TEST_FILE --config $DATADOG_CI_CONFIG'
                       }
                   }
               }
           }
       }
   }
}
{{< /code-block >}}

다음과 같은 출력이 나타납니다:

{{< img src="synthetics/cicd_integrations/jenkins/example-test-run.png" alt="Example Test Run in Jenkins" style="width:80%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/pipeline/docker/#using-docker-with-pipeline
[2]: https://plugins.jenkins.io/config-file-provider/
[3]: https://www.jenkins.io/doc/book/using/using-credentials/#adding-new-global-credentials
[4]: /ko/continuous_testing/cicd_integrations/configuration#configure-tests
[5]: /ko/continuous_integration/pipelines/jenkins/