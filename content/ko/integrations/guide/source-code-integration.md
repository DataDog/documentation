---
description: 애플리케이션 성능 모니터링(APM)과 통합된 소스 코드 통합을 설정하여 텔레메트리를 리포지토리와 연결하고, CI 파이프라인
  아티팩트에 Git 정보를 임베딩하고, GitHub 통합을 사용해 인라인 코드 스니펫을 사용하세요.
further_reading:
- link: /integrations/github/
  tag: 설명서
  text: GitHub 통합 알아보기
- link: /tracing/error_tracking/
  tag: 설명서
  text: 백엔드 서비스 오류 추적에 대해 알아보기
- link: /profiler/
  tag: 설명서
  text: 연속 프로파일러에 대해 알아보기
- link: /serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
  tag: 설명서
  text: 서버리스 모니터링에 대해 알아보기
- link: /tests/developer_workflows/
  tag: 설명서
  text: 테스트 최적화에 대해 알아보기
- link: /security/code_security/
  tag: 설명서
  text: 코드 보안에 대해 알아보기
- link: /security/application_security/
  tag: 설명서
  text: 애플리케이션 보안 모니터링에 대해 알아보기
- link: /logs/error_tracking/
  tag: 설명서
  text: 로그 오류 추적에 대해 알아보기
- link: https://www.datadoghq.com/blog/live-debugging/
  tag: 블로그
  text: Datadog 라이브 디버깅으로 프로덕션 버그를 효율적으로 수정하기
title: Datadog 소스 코드 통합
---

## 개요

Datadog 소스 코드 통합을 사용하면 Git 리포지토리에 텔레메트리를 연결할 수 있습니다. 또한 소스 코드의 해당 줄에 액세스하여 스택 트레이스, 느린 프로파일과 다른 이슈를 디버깅할 수 있습니다.

{{< img src="integrations/guide/source_code_integration/inline-code-snippet.png" alt="GitHub 내 코드를 볼 수 있고 버튼이 있는 Java RuntimeException 인라인 코드 조각" style="width:100%;">}}


## 설정

Datadog 에이전트 v7.35.0 이상이 필요합니다.

애플리케이션 성능 모니터링(APM)][6]을 이미 설정한 경우 [**통합** > **소스 코드 연결**][7]로 이동하여 백엔드 서비스의 소스 코드 통합을 설정하세요.

## Git 정보를 사용해 텔레메트리 태깅하기

텔레메트리에는 실행 중인 애플리케이션 버전과 특정 리포지토리 및 커밋을 연결하는 Git 정보로 태그를 지정해야 합니다.

지원되는 언어의 경우 Datadog에서 배포된 아티팩트에 [Git 정보를 임베딩하는 것](#embed-git-information-in-your-build-artifacts)을 권장합니다. 아티팩트는 [Datadog 추적 라이브러리][9]에 의해 자동으로 추출됩니다.

다른 언어 및 설정의 경우 직접 [텔레메트리 태깅 설정](#configure-telemetry-tagging)을 사용하세요.

### 빌드 아티팩트에 Git 정보 임베딩

빌드 아티팩트에서 리포지토리 URL과 커밋 해시를 임베딩할 수 있습니다. [Datadog 추적 라이브러리][9]는 이 정보를 사용하여 애플리케이션 성능 모니터링(APM) 서비스 텔레메트리에 올바른 태그를 자동으로 추가합니다.

다음 언어 중 git 정보 임베딩을 지원하는 언어를 선택합니다.

{{< tabs >}}
{{% tab "Go" %}}

<div class="alert alert-info">Go 클라이언트 라이브러리 버전 1.48.0 이상이 필요합니다.</div>

#### 컨테이너

Docker 컨테이너를 사용하는 경우, Docker나 Datadog 추적 라이브러리를 사용하거나, `DD_GIT_*` 환경 변수를 사용하여 애플리케이션을 설정하는 세 가지 옵션이 있습니다.

##### 옵션 1: Docker

{{% sci-docker %}}

##### 옵션 2: Datadog 추적 라이브러리

{{% sci-dd-tracing-library %}}

##### 옵션 3: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

#### 서버리스

서버리스를 사용하는 경우 서버리스 애플리케이션의 설정에 따라 세 가지 옵션이 있습니다.

##### 옵션 1: Datadog 도구 구성

{{% sci-dd-serverless %}}

##### 옵션 2: Datadog 추적 라이브러리

{{% sci-dd-tracing-library %}}

##### 옵션 3: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

#### 호스트

호스트를 사용하는 경우 두 가지 옵션이 있습니다.

##### 옵션 1: Datadog 추적 라이브러리

{{% sci-dd-tracing-library %}}

##### 옵션 2: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

[101]: https://tip.golang.org/doc/go1.18
[102]: https://www.npmjs.com/package/@datadog/datadog-ci
[103]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/plugin/
[104]: https://github.com/DataDog/datadog-cdk-constructs

{{% /tab %}}

{{% tab "Python" %}}

<div class="alert alert-info">Python 클라이언트 라이브러리 버전 1.12.0 이상이 필요합니다.</div>

#### 컨테이너

Docker 컨테이너를 사용하는 경우 Docker 또는 Datadog 추적 라이브러리를 사용하거나 `DD_GIT_*` 환경 변수를 사용하여 애플리케이션을 설정하는 세 가지 옵션이 있습니다.

##### 옵션 1: Docker

{{% sci-docker %}}

##### 옵션 2: 설정 도구 또는 통합 Python 프로젝트 설정 파일

{{% sci-dd-setuptools-unified-python %}}

##### 옵션 3: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

[101]: https://github.com/DataDog/dd-trace-go
[102]: https://github.com/DataDog/hatch-datadog-build-metadata#readme

#### 서버리스

서버리스를 사용하는 경우 서버리스 애플리케이션의 설정에 따라 세 가지 옵션이 있습니다.

##### 옵션 1: Datadog 도구 구성

{{% sci-dd-serverless %}}

##### 옵션 2: 설정 도구 또는 통합 Python 프로젝트 설정 파일

{{% sci-dd-setuptools-unified-python %}}

##### 옵션 3: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

#### 호스트

호스트를 사용하는 경우 두 가지 옵션이 있습니다.

##### 옵션 1: 설정 도구 또는 통합 Python 프로젝트 설정 파일

{{% sci-dd-setuptools-unified-python %}}

##### 옵션 2: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab ".NET" %}}

<div class="alert alert-info">NET 클라이언트 라이브러리 버전 2.24.1 이상이 필요합니다.</div>

첫 번째 단계로 `.pdb` 파일이 .NET 어셈블리(`.dll` 또는 `.exe`)와 함께 같은 폴더에 배포되었는지 확인합니다.
그런 다음 구체적인 배포 모델에 맞는 지침을 따르세요.

#### 컨테이너

Docker 컨테이너를 사용하는 경우 세 가지 옵션이 있습니다. Docker 또는 Microsoft SourceLink를 사용하거나 `DD_GIT_*` 환경 변수를 사용하여 애플리케이션을 설정하는 것입니다.

##### 옵션 1: Docker

{{% sci-docker %}}

##### 옵션 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### 옵션 3: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

#### 서버리스

서버리스를 사용하는 경우 서버리스 애플리케이션의 설정에 따라 세 가지 옵션이 있습니다.

##### 옵션 1: Datadog 도구 구성

{{% sci-dd-serverless %}}

##### 옵션 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### 옵션 3: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

#### 호스트

호스팅하다 을 사용하는 경우 Microsoft SourceLink를 사용하거나 `DD_GIT_*` 환경 변수를 사용하여 애플리케이션을 구성하는 두 가지 옵션이 있습니다.

##### 옵션 1: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### 옵션 2: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "Node.js" %}}

<div class="alert alert-info">
  Node.js 클라이언트 라이브러리 버전 3.21.0 이상이 필요합니다.
 </br>
  </br>
  TypeScript 애플리케이션에 대한 코드 링크 및 스니펫을 표시하려면 Node 애플리케이션을 실행해야 합니다:
 </br>
  <a href="https://NodeJS.org/dist/v12.22.12/docs/API/cli.html#cli_enable_source_maps"><code>--enable-source-maps</code></a>.
</div>

#### 컨테이너

Docker 컨테이너를 사용하는 경우 두 가지 옵션이 있습니다. Docker를 사용하거나 `DD_GIT_*` 환경 변수를 사용하여 애플리케이션을 설정하는 것입니다.

##### 옵션 1: Docker

{{% sci-docker %}}

##### 옵션 2: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

#### 서버리스

서버리스를 사용하는 경우 서버리스 애플리케이션의 설정에 따라 두 가지 옵션이 있습니다.

##### 옵션 1: Datadog 도구 구성

{{% sci-dd-serverless %}}

##### 옵션 2: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

#### 호스트

호스트를 사용하는 경우 `DD_GIT_*` 환경 변수를 사용해 애플리케이션을 설정하세요.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "Ruby" %}}

<div class="alert alert-info">Ruby 클라이언트 라이브러리 버전 1.6.0 이상이 필요합니다.</div>

#### 컨테이너

Docker 컨테이너를 사용하는 경우 두 가지 옵션이 있습니다. Docker를 사용하거나 `DD_TAGS` 환경 변수를 사용하여 애플리케이션을 설정하는 것입니다.

##### 옵션 1: Docker

{{% sci-docker-ddtags %}}

##### 옵션 2: `DD_TAGS` 환경 변수

{{% sci-dd-tags-env-variable %}}

#### 서버리스

서버리스를 사용하는 경우 서버리스 애플리케이션의 설정에 따라 두 가지 옵션이 있습니다.

##### 옵션 1: Datadog 도구 구성

{{% sci-dd-serverless %}}

##### 옵션 2: `DD_TAGS` 환경 변수

{{% sci-dd-tags-env-variable %}}

#### 호스트

호스트를 사용하는 경우 `DD_TAGS` 환경 변수를 사용해 애플리케이션을 설정하세요.

{{% sci-dd-tags-env-variable %}}

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-info">Java 클라이언트 라이브러리 버전 1.12.0 이상이 필요합니다.</div>

#### 컨테이너

도커(Docker) 컨테이너를 사용하는 경우 두 가지 옵션이 있습니다. 도커(Docker)를 사용하거나 `DD_GIT_*` 환경 변수를 통해 애플리케이션을 설정하는 것입니다.

##### 옵션 1: Docker

{{% sci-docker %}}

##### 옵션 2: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

#### 서버리스

서버리스를 사용하는 경우 서버리스 애플리케이션의 설정에 따라 두 가지 옵션이 있습니다.

##### 옵션 1: Datadog 도구 구성

{{% sci-dd-serverless %}}

##### 옵션 2: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

#### 호스트

호스트를 사용하는 경우 `DD_GIT_*` 환경 변수를 통해 애플리케이션을 설정하세요.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "PHP" %}}

<div class="alert alert-info">PHP 클라이언트 라이브러리 버전 1.2.0 이상이 필요합니다.</div>

#### 컨테이너

도커(Docker) 컨테이너를 사용하는 경우 두 가지 옵션이 있습니다. 도커(Docker)를 사용하거나 `DD_GIT_*` 환경 변수를 통해 애플리케이션을 설정하는 것입니다.

##### 옵션 1: Docker

{{% sci-docker %}}

##### 옵션 2: `DD_GIT_*` 환경 변수

{{% sci-dd-git-env-variables %}}

#### 호스트

호스트를 사용하는 경우 `DD_GIT_*` 환경 변수를 통해 애플리케이션을 설정하세요.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{< /tabs >}}

### Docker 컨테이너 내 구축

빌드 프로세스가 도커(Docker) 컨테이너 내의 CI에서 실행되는 경우 다음 단계를 수행하여 빌드가 Git 정보에 액세스할 수 있는지 확인합니다.

1. `.dockerignore` 파일에 다음 텍스트를 추가합니다. 이렇게 하면 프로세스 빌드가 `.git` 폴더의 하위 집합에 액세스하여 git 커밋 해시 및 리포지토리 URL을 확인할 수 있습니다.

   ```
   !.git/HEAD
   !.git/config
   !.git/refs
   ```

2. `Dockerfile`에 다음 코드 줄을 추가합니다. 실제 빌드가 실행되기 전에 작성해야 합니다.

   ```
   COPY .git ./.git
   ```

### 텔레메트리 태깅 설정

지원되지 않는 언어의 경우 `git.commit.sha` 및 `git.repository_url` 태그를 사용하여 데이터를 특정 커밋에 연결하세요. `git.repository_url` 태그를 설정할 때 프로토콜이 포함되어 있지 않은지 확인하세요. 예를 들어 리포지토리 URL이 `https://github.com/example/repo`인 경우 `git.repository_url` 태그를 설정하는 값은 `github.com/example/repo`이어야 합니다.

## 내 리포지토리 메타데이터 동기화

텔레메트리를 소스 코드와 연결하려면 리포지토리 메타데이터를 Datadog에 동기화해야 합니다. Datadog는 리포지토리에 파일의 실제 콘텐츠를 저장하지 않고 Git 커밋과 트리 개체만 저장합니다.

### Git 공급자

소스 코드 통합은 다음 Git 공급자를 지원합니다.

| 공급자 | 컨텍스트 링크 지원 | 코드 스니펫 지원 |
|---|---|---|
| GitHub SaaS(github.com) | Yes | Yes |
| GitHub Enterprise Server | Yes | Yes |
| GitLab SaaS(gitlab.com) | Yes | Yes |
| GitLab 자체 관리형 | Yes | 네(제한된 평가판) |
| Bitbucket | Yes | No |
| Azure DevOps Services | Yes | No |
| Azure DevOps Server | Yes | No |

{{< tabs >}}
{{% tab "GitHub" %}}

Datadog의 [GitHub 통합][101]을 [GitHub][102]에 설치하여 가 리포지토리 메타데이터를 자동으로 동기화하도록 허용합니다.  통합 타일에서 권한을 지정할 때 **콘텐츠**에 대해 **읽기** 권한 이상을 선택합니다.

GitHub 통합을 설정하면 [**오류 추적**][103], [**연속 프로파일러**][104], [**서버리스 모니터링 **][105], [**CI 가시성**][106], [**애플리케이션 보안 모니터링**][107]에서 인라인 코드 스니펫을 볼 수 있습니다.

[101]: https://docs.datadoghq.com/ko/integrations/github/
[102]: https://app.datadoghq.com/integrations/github/
[103]: /ko/logs/error_tracking/backend/?tab=serilog#setup
[104]: /ko/integrations/guide/source-code-integration/?tab=continuousprofiler#links-to-git-providers
[105]: /ko/serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
[106]: /ko/tests/developer_workflows/#open-tests-in-github-and-your-ide
[107]: /ko/security/application_security/

{{% /tab %}}
{{% tab "GitLab" %}}

<div class="alert alert-danger">
GitLab 인스턴스의 리포지토리는 제한된 평가판 상태로 제공됩니다. <a href="https://www.datadoghq.com/product-preview/gitlab-source-code-integration/">평가판을 신청하세요</a>.
</div>

소스 코드와 원격 측정을 연결하려면 GitLab 통합을 설치하거나(제한된 평가판 신청) [`datadog-ci git-metadata upload`][2] 명령을 사용하여 리포지토리 메타데이터를 업로드하세요. `datadog-ci v2.10.0` 이상이 필요합니다.

Git 리포지토리 내에서 `datadog-ci git-metadata upload`를 실행하면 Datadog는 리포지토리 URL, 현재 브랜치의 커밋 SHA, 추적된 파일 경로의 목록을 받습니다.

Datadog와 동기화해야 하는 모든 커밋에 대해 이 명령을 실행합니다.

[gitlab.com][1]을 사용하면 또한 [**오류 추적**][103], [**연속 프로파일러**][104], [**서버리스 모니터링 **][105], [**CI 가시성**][106], [**애플리케이션 보안 모니터링**][107]에서 인라인 코드 스니펫을 볼 수 있습니다.

### 검증

데이터가 수집되고 있는지 확인하려면 CI 파이프라인에서 `datadog-ci git-metadata upload`를 실행하세요.

다음과 같은 출력이 표시될 것입니다.

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
Successfully uploaded tracked files in 1.358 seconds.
Syncing GitDB...
Successfully synced git DB in 3.579 seconds.
✅ Uploaded in 5.207 seconds.
```

[1]: https://gitlab.com
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
[3]: /ko/logs/error_tracking/backend/?tab=serilog#setup
[4]: /ko/integrations/guide/source-code-integration/?tab=continuousprofiler#links-to-git-providers
[5]: /ko/serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code
[6]: /ko/tests/developer_workflows/#open-tests-in-github-and-your-ide
[7]: /ko/security/application_security/

{{% /tab %}}
{{% tab "Other Git Providers" %}}

<div class="alert alert-danger">
자체 호스팅 인스턴스 또는 비공개 URL의 리포지토리는 소스 코드 통합에서 기본적으로 지원되지 않습니다. 이 기능을 사용 설정하려면 <a href="/도움/도움말">지원팀에 문의하세요</a>.
</div>

텔레메트리를 소스 코드와 연결하려면 [`datadog-ci git-metadata upload`][1] 명령으로 리포지토리 메타데이터를 업로드하세요. `datadog-ci v2.10.0` 이상이 필요합니다.

Git 리포지토리 내에서 `datadog-ci git-metadata upload`를 실행하면 Datadog는 리포지토리 URL, 현재 브랜치의 커밋 SHA, 추적된 파일 경로의 목록을 받습니다.

Datadog와 동기화해야 하는 모든 커밋에 대해 이 명령을 실행합니다.

### 검증

데이터가 수집되고 있는지 확인하려면 CI 파이프라인에서 `datadog-ci git-metadata upload`를 실행하세요.

다음과 같은 출력이 표시될 것입니다.

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
Successfully uploaded tracked files in 1.358 seconds.
Syncing GitDB...
Successfully synced git DB in 3.579 seconds.
✅ Uploaded in 5.207 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## 사용법

### Git 공급자 링크

{{< tabs >}}
{{% tab "Error Tracking" %}}
[오류 추적][1]에서 스택 프레임에서 소스 리포지토리에 이르는 링크를 확인할 수 있습니다..

1. [**애플리케이션 성능 모니터링(APM)** > **오류 추적**][2]으로 이동합니다.
2. 이슈를 클릭합니다. 오른쪽에 **이슈 상세 정보** 패널이 나타납니다.
3. **최신 이벤트**에서 프레임 오른쪽에 있는 **보기** 버튼을 클릭하거나 **파일 보기**, **Git 불만 보기** 또는 **커밋 보기**를 선택하면 소스 코드 관리 도구로 리디렉션됩니다.

{{< img src="integrations/guide/source_code_integration/error-tracking-panel-full.png" alt="오류 추적의 오류 스택 트레이스의 오른쪽에 세 가지 옵션(파일 보기, 불만 보기, 커밋 보기)이 있는 리포지토리 보기 버튼과 스택 트레이스의 인라인 코드 스니펫이 있습니다." style="width:100%;">}}

GitHub(통합)를 사용 중이거나 GitLab SaaS 인스턴스(gitlab.com)에서 리포지토리를 호스팅하는 경우 스택 프레임에서 **미리 보기 연결**을 클릭하세요. 스택 트레이스에서 직접 인라인 코드 스니펫을 볼 수 있습니다.

[1]: /ko/tracing/error_tracking/
[2]: https://app.datadoghq.com/apm/error-tracking

{{% /tab %}}
{{% tab "Continuous Profiler" %}}

[연속 프로파일러][1]에서 프로파일 프레임의 소스 코드 미리 보기를 확인할 수 있습니다.

1. [**애플리케이션 성능 모니터링(APM)** > **프로파일검색**][2]으로 이동합니다.
2. 마우스 커서를 플레임 그래프에 있는 메서드 위에 올립니다.
3. 필요한 경우 `Opt` 또는 `Alt`를 눌러 미리 보기를 활성화합니다.

{{< img src="integrations/guide/source_code_integration/profiler-source-code-preview.png" alt="연속 프로파일러에서 소스 코드 미리 보기" style="width:100%;">}}

프로파일 프레임에서 해당 소스 리포지토리로 연결되는 링크도 볼 수 있습니다. 이는 줄, 메서드 또는 파일별로 세분화된 프로파일에 대해 지원됩니다.

1. [**애플리케이션 성능 모니터링(APM)** > **프로파일검색**][2]으로 이동합니다.
2. 마우스 커서를 플레임 그래프 위에 있는 메서드에 올립니다. 우측에 **More actions** 레이블이 있는 케밥 아이콘이 나타납니다.
3. **추가 작업** > **리포지토리에서 보기**를 클릭하여 소스 코드 리포지토리에서 트레이스를 엽니다.

{{< img src="integrations/guide/source_code_integration/profiler-link-to-git.png" alt="연속 프로파일러에서 GitHub 연결" style="width:100%;">}}

[1]: /ko/profiler/
[2]: https://app.datadoghq.com/profiling/explorer
{{% /tab %}}
{{% tab "Serverless Monitoring" %}}

람다 함수 관련 스택 트레이스의 오류에서 **서버리스 모니터링 **의 소스 리포지토리로 연결되는 링크를 확인할 수 있습니다.

1. [**인프라스트럭처** > **서버리스**][101]로 이동하여 **AWS** 탭 을 클릭합니다.
2. 람다 함수를 클릭하고 **트레이스 열기** 버튼을 클릭하면 연결된 스택 트레이스와 함께 호출할 수 있습니다.
3. **코드 보기**를 클릭하여 소스 코드 리포지토리에서 오류를 엽니다.

GitHub 통합을 사용하는 경우 오류 프레임에서 **미리 보기 연결**을 클릭하세요. 람다 함수의 스택 트레이스에서 인라인 코드 스니펫을 바로 확인할 수 있습니다.

{{< img src="integrations/guide/source_code_integration/serverless-aws-function-errors.mp4" alt="서버리스 모니터링에서 GitHub 연결" video="true" >}}

[101]: https://app.datadoghq.com/functions?cloud=aws&entity_view=lambda_functions

{{% /tab %}}
{{% tab "Test Optimization" %}}

**테스트 최적화**에서 실패한 테스트 실행에서 소스 리포지토리로 연결되는 링크를 확인할 수 있습니다.

1. [**소프트웨어 제공** > **테스트 최적화** > **테스트 실행**][101]으로 이동하여 실패한 테스트 실행을 선택합니다.
2. **GitHub에서 보기** 버튼을 클릭하여 소스 코드 리포지토리에서 테스트를 엽니다.

{{< img src="integrations/guide/source_code_integration/test_run_blurred.png" alt="CI 가시성 탐색기에서 GitHub로 연결" style="width:100%;">}}

자세한 내용은 [Datadog를 활용한 개발자 워크플로 개선][102]을 참조하세요.

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /ko/tests/developer_workflows/#open-tests-in-github-and-your-ide

{{% /tab %}}
{{% tab "코드 보안" %}}

**코드 보안**을 통해 실패한 정적 분석 및 소프트웨어 구성 분석 스캔에서 해당 소스 리포지토리로 연결되는 링크를 확인할 수 있습니다.

1. [**Software Delivery** > **Code Security**][101]로 이동해 리포지토리를 선택합니다.
2. **코드 취약성** 또는 **코드 품질** 보기에서 코드 취약성 또는 위반 사항을 클릭합니다. **세부 정보** 섹션에서 **코드 보기** 버튼을 클릭하면 소스 코드 리포지토리에서 플래그가 지정된 코드가 열립니다.

{{< img src="integrations/guide/source_code_integration/code-analysis-scan.png" alt=" Code Security Code Vulnerabilities 보기에서 GitHub에 대한 링크" style="width:100%;">}}

자세한 내용은 [코드 보안 문서][102]에서 확인하세요.

[101]: https://app.datadoghq.com/ci/code-analysis
[102]: /ko/security/code_security/

{{% /tab %}}
{{% tab "Application Security Monitoring" %}}

보안 신호와 관련된 스택 트래이스의 오류에서 **애플리케이션 보안 모니터링**의 소스 리포지토리로 연결되는 링크를 확인할 수 있습니다.

1. [**보안** > **애플리케이션 보안**][101]으로 이동하여 보안 신호를 선택합니다.
2. **관련 신호** 탭 에서 **트레이스** 섹션까지 아래로 스크롤하여 연결된 스택 트레이스를 클릭합니다.
3. **코드 보기**를 클릭하여 소스 코드 리포지토리에서 오류를 엽니다.

GitHub 통합을 사용하는 경우 오류 프레임에서 **미리 보기 연결**을 클릭하세요. 보안 신호의 스택 트레이스에서 인라인 코드 스니펫을 바로 확인할 수 있습니다.

{{< img src="integrations/guide/source_code_integration/asm-signal-trace-blur.png" alt="애플리케이션 보안 모니터링에서 GitHub 연결" style="width:100%;">}}

[101]: https://app.datadoghq.com/security/appsec

{{% /tab %}}
{{% tab "동적 계측" %}}

계측(동적 로그, 메트릭, 스팬 또는 스팬 태그)을 생성하거나 편집할 때 [**동적 계측**][102]에서 전체 소스 코드 파일을 볼 수 있습니다.

#### 새 계측 만들기

1.  [**APM** > **Dynamic Instrumentation**][101]로 이동합니다.
2. **Create New Instrumentation**를 선택한 후 계측할 서비스를 선택합니다.
3. 소스 코드 파일 이름이나 메서드를 검색하고 선택합니다.

#### 계측 확인 또는 편집

1.  [**APM** > **Dynamic Instrumentation**][101]로 이동합니다.
2. 목록에서 기존 계측을 선택한 후 **View Events**를 클릭합니다.
3. 소스 코드에서 해당 위치를 보려면 계측 카드를 선택합니다.

{{< img src="integrations/guide/source_code_integration/dynamic-instrumentation-create-new.png" alt="동적 계측의 소스 코드 파일" style="width:100%;">}}

자세한 내용은 [동적 계측 문서][102]를 참조하세요.

[101]: https://app.datadoghq.com/dynamic-instrumentation/events
[102]: /ko/dynamic_instrumentation/

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/error-tracking
[2]: https://app.datadoghq.com/integrations/github/
[3]: https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps
[5]: /ko/integrations/github/
[6]: /ko/tracing/
[7]: https://app.datadoghq.com/source-code/setup/apm
[8]: /ko/tracing/error_tracking/
[9]: /ko/tracing/trace_collection/dd_libraries/