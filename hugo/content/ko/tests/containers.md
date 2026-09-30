---
aliases:
- /ko/continuous_integration/setup_tests/containers
- /ko/continuous_integration/tests/containers
further_reading:
- link: /tests
  tag: 설명서
  text: Test Optimization에 대해 알아보기
title: Containers에서 테스트
---
## 개요 {#overview}

CI 작업에서 [`docker run`][1] 또는 [`docker-compose`][2]와 같은 명령으로 별도의 컨테이너 내 테스트 프로세스를 시작할 때 이 가이드를 활용하세요. Datadog SDK가 빌드 정보를 감지할 수 있도록 CI 공급자의 환경 변수를 테스트 컨테이너로 전달합니다.

CI 공급자의 내장형 Docker 기반 실행기는 작업의 기본 실행 환경입니다. 해당 작업의 명령이 다른 컨테이너에서 테스트를 실행하지 않으면 이 가이드가 적용되지 않습니다. 또한 컨테이너가 데이터베이스 등 지원 서비스만 제공하는 경우에는 이 가이드가 적용되지 않습니다.

[언어별 테스트 계측 지침][3]에서 요구하는 모든 변수를 전달합니다. 변수에는 다음이 포함됩니다.

- 컨테이너가 액세스할 수 있는 `DD_SERVICE`, `DD_ENV` 및 유효 `DD_TRACE_AGENT_URL` 등 SDK 구성
- `RUBYOPT`, `NODE_OPTIONS` 또는 Java 도구 옵션 등 런타임 주입 변수

CI 작업에서 설정되거나 자동 계측 단계에서 내보낸 변수는 해당 작업으로 시작된 컨테이너 내부에서 자동으로 사용할 수 없습니다.

## 계측 방법 선택 {#choose-an-instrumentation-method}

자동 계측은 CI 실행기에서 실행되며 별도로 시작된 테스트 컨테이너로 자동으로 전달되지 않습니다.

- **현재 CI 작업에서 빌드된 이미지:** 이미지를 빌드하기 전에 자동 계측을 실행합니다. 빌드가 통합을 통해 생성된 트레이서 아티팩트나 종속성 변경 사항을 복사하고 런타임 변수를 전달하는 경우에만 이 방법을 사용합니다. 그렇지 않으면 수동 계측을 사용합니다.
- **사전 빌드된 이미지:** 작업이 이미지 태그 또는 다이제스트를 가져오거나 참조만 하는 경우 수동 계측을 사용합니다. 리포지토리 내 Dockerfile은 작업이 이를 통해 테스트 이미지를 빌드하지 않으면 포함되지 않습니다.

## 환경 변수 관리 {#manage-environment-variables}

이 표는 SDK 구성 시 사용할 수 있는 환경 변수의 일부를 제시합니다.

{{< tabs >}}
{{% tab "AppVeyor" %}}

| 환경 변수                          | 설명                                                                                                 |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `APPVEYOR`                                   | 빌드가 AppVeyor 환경에서 실행 중인지 여부를 표시합니다. `True`(또는 Ubuntu 이미지의 경우 `true`)로 설정합니다.    |
| `APPVEYOR_BUILD_ID`                          | AppVeyor 빌드의 고유 식별자입니다.                                                                  |
| `APPVEYOR_BUILD_NUMBER`                      | AppVeyor가 할당한 빌드 번호로, 새 빌드가 생성될 때마다 증가합니다.                                  |
| `APPVEYOR_BUILD_FOLDER`                      | 리포지토리가 복제되는 디렉터리의 경로입니다.                                                     |
| `APPVEYOR_REPO_PROVIDER`                     | 리포지토리의 소스 제어 공급자(예: `github`, `bitbucket`, `kiln`)를 지정합니다.         |
| `APPVEYOR_REPO_NAME`                         | 형식의 리포지토리 이름입니다. `owner-name/repo-name`                                              |
| `APPVEYOR_REPO_BRANCH`                       | 빌드 대상 리포지토리의 브랜치입니다. 풀 리퀘스트의 경우, PR이 병합되는 기본 브랜치입니다.    |
| `APPVEYOR_REPO_COMMIT`                       | 현재 빌드의 커밋 ID(SHA)입니다.                                                                     |
| `APPVEYOR_REPO_TAG_NAME`                     | 태그로 시작된 빌드의 태그 이름입니다. 빌드가 태그에 의해 트리거되지 않은 경우 이 변수는 정의되지 않습니다.  |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH`     | 풀 리퀘스트가 발생한 리포지토리의 브랜치입니다.                                         |
| `APPVEYOR_REPO_COMMIT_MESSAGE`               | 현재 빌드와 관련된 커밋 메시지입니다.                                                         |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`      | 첫 번째 줄 바꿈 이후의 모든 텍스트를 포함하는 확장 커밋 메시지입니다.                                   |
| `APPVEYOR_REPO_COMMIT_AUTHOR`                | 커밋 작성자의 이름입니다.                                                                         |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`          | 커밋 작성자의 이메일 주소입니다.                                                                       |

모든 빌드에 대해 AppVeyor에서 설정한 환경 변수의 전체 목록은 [공식 AppVeyor 설명서][101]를 참조하세요.


[101]: https://www.appveyor.com/docs/environment-variables/

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| 환경 변수                  | 설명                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `TF_BUILD`                                | 빌드가 Azure Pipelines에서 실행 중임을 나타냅니다.                                                     |
| `BUILD_DEFINITIONNAME`                    | 빌드 파이프라인의 이름입니다.                                                                             |
| `BUILD_BUILDID`                           | 완료된 빌드에 대한 레코드의 ID입니다.                                                               |
| `BUILD_SOURCESDIRECTORY`                  | 소스 코드 파일을 다운로드하는 에이전트의 로컬 경로입니다.                                     |
| `BUILD_REPOSITORY_URI`                    | 트리거 리포지토리의 URL입니다.                                                                      |
| `BUILD_SOURCEBRANCH`                      | 빌드가 대기열에 추가된 트리거 리포지토리의 브랜치입니다.                                                 |
| `BUILD_SOURCEVERSION`                     | 이 빌드에 포함된 트리거 리포지토리의 최신 버전 제어 변경 사항입니다.                    |
| `BUILD_SOURCEVERSIONMESSAGE`              | 트리거 리포지토리의 커밋 또는 변경 집합에 대한 추가 설명입니다.                                             |
| `BUILD_REQUESTEDFORID`                    | 빌드를 트리거한 사용자의 ID입니다.                                                                 |
| `BUILD_REQUESTEDFOREMAIL`                 | 빌드를 트리거한 사용자의 이메일 주소입니다.                                                              |
| `SYSTEM_TEAMFOUNDATIONSERVERURI`          | Team Foundation Server 또는 Azure DevOps Services 계정의 URI입니다.                                    |
| `SYSTEM_TEAMPROJECTID`                    | 빌드의 팀 프로젝트 ID입니다.                                                                   |
| `SYSTEM_JOBID`                            | 실행 중인 작업의 ID입니다.                                                                           |
| `SYSTEM_TASKINSTANCEID`                   | 작업 내 태스크 인스턴스의 ID입니다.                                                                 |
| `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI`  | 풀 리퀘스트의 소스 리포지토리 URL입니다.                                                      |
| `SYSTEM_PULLREQUEST_SOURCEBRANCH`         | 풀 리퀘스트의 소스 브랜치입니다.                                                                      |
| `SYSTEM_PULLREQUEST_SOURCECOMMITID`       | 풀 리퀘스트 내 소스 브랜치의 커밋 ID입니다.                                                     |
| `SYSTEM_STAGEDISPLAYNAME`                 | 파이프라인 내 스테이지의 표시 이름입니다.                                                              |
| `SYSTEM_JOBDISPLAYNAME`                   | 파이프라인 내 작업의 표시 이름입니다.                                                                |

모든 빌드에 대해 Azure DevOps Pipelines에서 설정한 환경 변수의 전체 목록은 [공식 Azure 설명서][101]를 참조하세요.


[101]: https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops
{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

| 환경 변수               | 설명                                                                                                                                                      |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BITBUCKET_PIPELINE_UUID`          | 파이프라인의 UUID입니다.                                                                                                                                        |
| `BITBUCKET_BUILD_NUMBER`           | 빌드의 고유 식별자입니다. 빌드를 생성할 때마다 증가하며 고유한 아티팩트 이름을 만드는 데 사용할 수 있습니다.                                                |
| `BITBUCKET_CLONE_DIR`              | Docker 컨테이너 내에서 리포지토리가 복제되는 디렉터리의 절대 경로입니다.                                                                |
| `BITBUCKET_REPO_FULL_NAME`         | 리포지토리의 전체 이름입니다(http://bitbucket.org/ 뒤에 붙은 모든 문자).                                                                             |
| `BITBUCKET_GIT_SSH_ORIGIN`         | SSH 오리진입니다(예: `git@bitbucket.org:/<workspace>/<repo>.git`).                                                                                       |
| `BITBUCKET_COMMIT`                 | 빌드 시작을 유발한 커밋의 커밋 해시입니다.                                                                                                           |
| `BITBUCKET_BRANCH`                 | 소스 브랜치입니다. 이 값은 브랜치에서만 사용할 수 있습니다. 태그 또는 사용자 지정 파이프라인에 대한 빌드에는 사용할 수 없습니다.                                         |
| `BITBUCKET_TAG`                    | 빌드 시작을 유발한 커밋의 태그입니다. 이 값은 태그에서만 사용할 수 있습니다. 브랜치에 대한 빌드에는 사용할 수 없습니다.                                  |


모든 빌드에 대해 Bitbucket에서 설정한 환경 변수의 전체 목록은 [공식 Bitbucket 설명서][101]를 참조하세요.

[101]: https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/

{{% /tab %}}
{{% tab "Bitrise" %}}

| 환경 변수                | 설명                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `BITRISE_BUILD_SLUG`                | bitrise.io에서 빌드를 고유하게 식별하는 슬러그입니다. 빌드 URL의 일부입니다.                             |
| `BITRISE_TRIGGERED_WORKFLOW_ID`     | 트리거된 워크플로의 ID로, 워크플로가 수동으로 트리거되었는지 자동으로 트리거되었는지에 관계없이 표시됩니다. |
| `BITRISE_BUILD_NUMBER`              | bitrise.io에서 생성된 빌드의 번호입니다.                                                                         |
| `BITRISE_BUILD_URL`                 | bitrise.io에서 생성된 빌드의 URL입니다.                                                                              |
| `BITRISE_SOURCE_DIR`                | 기본 작업 디렉터리의 경로입니다. 기본적으로 다른 값을 제공하지 않으면, Bitrise가 실행되는 디렉터리입니다. |
| `GIT_REPOSITORY_URL`                | 앱을 호스팅하는 Git 리포지토리의 URL입니다.                                                               |
| `BITRISE_GIT_COMMIT`                | 빌드를 트리거한 Git 커밋의 커밋 해시입니다(해당하는 경우).                                     |
| `GIT_CLONE_COMMIT_HASH`             | 빌드에서 사용하는 커밋의 해시(복제된 커밋)입니다.                                                  |
| `BITRISEIO_GIT_BRANCH_DEST`         | 빌드를 트리거한 풀 리퀘스트의 대상 브랜치로, 풀 리퀘스트에 의해 트리거된 빌드에서만 사용됩니다. |
| `BITRISE_GIT_BRANCH`                | Bitrise에 의해 빌드되는 Git 브랜치입니다(예: `main`).                                                    |
| `BITRISE_GIT_TAG`                   | Git 태그에 의해 빌드가 트리거된 경우, 사용된 태그가 이 환경 변수에 저장됩니다.                                          |
| `BITRISE_GIT_MESSAGE`               | 커밋 메시지, 풀 리퀘스트 타이틀 또는 수동으로 빌드를 트리거한 경우 지정한 메시지입니다.        |
| `BITRISE_APP_TITLE`                 | bitrise.io에 있는 앱의 제목입니다.                                                                             |
| `GIT_CLONE_COMMIT_MESSAGE_SUBJECT`  | 복제된 커밋의 커밋 메시지 제목입니다.                                                          |
| `GIT_CLONE_COMMIT_MESSAGE_BODY`     | 복제된 커밋의 커밋 메시지 본문(내용)입니다.                                                   |
| `GIT_CLONE_COMMIT_AUTHOR_NAME`      | 복제된 커밋 작성자의 이름입니다.                                                                     |
| `GIT_CLONE_COMMIT_AUTHOR_EMAIL`     | 복제된 커밋 작성자의 이메일 주소입니다.                                                                    |
| `GIT_CLONE_COMMIT_COMMITER_NAME`    | 복제된 커밋 커미터의 이름입니다.                                                                  |
| `GIT_CLONE_COMMIT_COMMITER_EMAIL`   | 복제된 커밋 커미터의 이메일 주소입니다.                                                                 |


모든 빌드에 대해 Bitrise에서 설정한 환경 변수의 전체 목록은 [공식 Bitrise 설명서][101]를 참조하세요.


[101]: https://devcenter.bitrise.io/en/references/available-environment-variables.html

{{% /tab %}}
{{% tab "Buildkite" %}}

| 환경 변수          | 설명                                                                                     |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| `BUILDKITE`                   | 항상 'true'입니다.                                                                                   |
| `BUILDKITE_PIPELINE_SLUG`     | URL에 사용되는 Buildkite의 파이프라인 슬러그입니다.                                                 |
| `BUILDKITE_JOB_ID`            | 이 작업에 대해 Buildkite가 사용하는 내부 UUID입니다.                                                   |
| `BUILDKITE_BUILD_ID`          | 빌드의 UUID입니다.                                                                          |
| `BUILDKITE_BUILD_NUMBER`      | 빌드 번호입니다. 이 번호는 빌드를 생성할 때마다 증가하며 각 파이프라인 내에서 고유합니다.   |
| `BUILDKITE_BUILD_URL`         | Buildkite의 이 빌드에 대한 URL입니다.                                                             |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | 에이전트가 이 빌드에 대해 코드를 체크아웃한 경로입니다.                             |
| `BUILDKITE_REPO`              | 파이프라인의 리포지토리입니다.                                                                  |
| `BUILDKITE_COMMIT`            | 빌드의 Git 커밋 객체입니다.                                                              |
| `BUILDKITE_BRANCH`            | 빌드 중인 브랜치입니다.                                                                         |
| `BUILDKITE_TAG`               | 빌드 중인 태그의 이름입니다(태그에서 빌드가 트리거된 경우)                        |
| `BUILDKITE_MESSAGE`           | 빌드와 관련된 메시지입니다(일반적으로 커밋 메시지).                             |
| `BUILDKITE_BUILD_AUTHOR`      | 빌드 중인 커밋을 작성한 사용자의 이름입니다.                                      |
| `BUILDKITE_BUILD_AUTHOR_EMAIL`| 빌드 중인 커밋을 작성한 사용자의 알림 이메일입니다.                        |
| `BUILDKITE_BUILD_CREATOR`     | 빌드를 생성한 사용자의 이름입니다.                                                     |
| `BUILDKITE_BUILD_CREATOR_EMAIL` | 빌드를 생성한 사용자의 알림 이메일입니다.                                     |
| `BUILDKITE_AGENT_ID`          | 에이전트의 UUID입니다.                                                                          |
| `BUILDKITE_AGENT_META_DATA_*` | 각 에이전트 태그의 값입니다. 태그 이름은 변수 이름 끝에 추가됩니다.           |


모든 빌드에 대해 Buildkite에서 설정한 환경 변수의 전체 목록은 [공식 Buildkite 설명서][101]를 참조하세요.

[101]: https://buildkite.com/docs/pipelines/environment-variables

{{% /tab %}}
{{% tab "CircleCI" %}}

| 환경 변수         | 설명                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CIRCLECI`                    | 빌드가 CircleCI에서 실행 중인지 여부를 표시합니다. 항상 `true`로 설정됩니다.                                |
| `CIRCLE_PROJECT_REPONAME`     | 빌드 대상 리포지토리의 이름입니다.                                                               |
| `CIRCLE_BUILD_NUM`           | 현재 작업의 번호입니다. 작업 번호는 작업별로 고유하게 지정됩니다.                                  |
| `CIRCLE_BUILD_URL`           | CircleCI에서 현재 실행되는 작업의 URL입니다.                                                              |
| `CIRCLE_WORKFLOW_ID`         | 현재 작업 워크플로 인스턴스의 고유 식별자입니다.                                      |
| `CIRCLE_WORKING_DIRECTORY`   | 코드가 체크아웃된 작업 디렉터리의 경로입니다.                                       |
| `CIRCLE_REPOSITORY_URL`      | 빌드 대상 리포지토리의 URL입니다.                                                                 |
| `CIRCLE_SHA1`                | 현재 빌드의 마지막 커밋에 대한 SHA1 해시입니다.                                                 |
| `CIRCLE_BRANCH`              | 빌드 대상 리포지토리의 브랜치입니다.                                                              |
| `CIRCLE_TAG`                 | 현재 빌드가 태그에 의해 트리거된 경우의 태그 이름입니다(그렇지 않으면 비어 있음).                      |
| `CIRCLE_JOB`                 | 현재 작업의 이름입니다.                                                                          |


모든 빌드에 대해 CircleCI에서 설정한 환경 변수의 전체 목록은 [공식 CircleCI 설명서][101]를 참조하세요.


[101]: https://circleci.com/docs/variables/

{{% /tab %}}
{{% tab "Codefresh" %}}

| 환경 변수         | 설명                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CF_BUILD_ID`                | 빌드의 고유 ID입니다.                                                                           |
| `CF_PIPELINE_NAME`           | 파이프라인의 전체 경로입니다(할당된 프로젝트 포함).                 |
| `CF_BUILD_URL`               | Codefresh 내 빌드의 URL입니다.                                                                    |
| `CF_STEP_NAME`               | 단계의 이름입니다(예: "MyUnitTests").                                                     |
| `CF_BRANCH`                  | 실행 시점의 메인 파이프라인과 관련된 Git 리포지토리의 브랜치 이름 또는 태그입니다. |
| `CF_REVISION`                | 실행 시점의 메인 파이프라인 Git 리포지토리 리비전입니다.                   |


모든 빌드에 대해 Codefresh에서 설정한 환경 변수의 전체 목록은 [공식 Codefresh 설명서][101]를 참조하세요.


[101]: https://codefresh.io/docs/docs/pipelines/variables/

{{% /tab %}}
{{% tab "GitHub Actions" %}}

| 환경 변수       | 설명                                                                                           |
|----------------------------|-------------------------------------------------------------------------------------------------------|
| `GITHUB_ACTION`            | 현재 실행 중인 작업의 이름 또는 단계의 ID입니다. 예: `repo-owner_name-of-action-repo` |
| `GITHUB_SERVER_URL`        | GitHub 서버의 URL입니다. 예: `https://github.com`                                       |
| `GITHUB_RUN_ID`            | 리포지토리 내 각각의 워크플로 실행 시마다 부여되는 고유 번호입니다. 예: `1658821493`                 |
| `GITHUB_RUN_NUMBER`        | 리포지토리 내 각각의 특정 워크플로 실행 시마다 부여되는 고유 번호입니다. 예: `3`              |
| `GITHUB_RUN_ATTEMPT`       | 특정 워크플로 실행을 각각 시도할 때마다 부여되는 고유 번호입니다. 예: `3`                      |
| `GITHUB_WORKFLOW`          | 워크플로의 이름입니다. 예: `My test workflow`                                            |
| `GITHUB_WORKSPACE`         | 러너에서 단계가 실행되는 기본 작업 디렉터리입니다. 예: `/home/runner/work/my-repo-name/my-repo-name` |
| `GITHUB_REPOSITORY`        | 소유자 및 리포지토리 이름입니다. 예: `octocat/Hello-World`                                    |
| `GITHUB_SHA`               | 워크플로를 트리거한 커밋 SHA입니다. 예: `ffac537e6cbbf934b08745a378932722df287a53` |
| `GITHUB_HEAD_REF`          | 풀 리퀘스트의 헤드 참조 또는 소스 브랜치(단, `pull_request` 또는 `pull_request_target` 이벤트에 한해서 설정)입니다. 예: `feature-branch-1` |
| `GITHUB_REF`               | 워크플로를 트리거한 브랜치 또는 태그의 전체 참조입니다. 예: `refs/heads/feature-branch-1` |
| `GITHUB_JOB`               | 현재 작업의 ID입니다. 예: `greeting_job`                                           |
| `JOB_CHECK_RUN_ID`         | 현재 작업의 검사 실행 ID입니다. Datadog Test Optimization GitHub Action은 후속 단계 진행을 위해 이 변수를 내보냅니다. 수동 계측의 경우 `JOB_CHECK_RUN_ID: $`{{ job.check_run_id }}`를 설정하세요. |


모든 빌드에 대해 GitHub Actions에서 설정한 환경 변수의 전체 목록은 [공식 GitHub 설명서][101]를 참조하세요.


[101]: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/variables#default-environment-variables

{{% /tab %}}
{{% tab "GitLab CI" %}}

| 환경 변수              | 설명                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `GITLAB_CI`           | CI/CD에서 실행되는 모든 작업에 사용할 수 있습니다 `true`(사용 가능한 경우).                                        |
| `CI_PIPELINE_ID`      | 현재 파이프라인의 인스턴스 수준 ID입니다. 이 ID는 GitLab 인스턴스의 모든 프로젝트 전반에서 고유합니다. |
| `CI_PIPELINE_URL`     | 파이프라인 세부 정보 페이지의 URL입니다.                                                                       |
| `CI_PIPELINE_IID`     | 현재 파이프라인의 프로젝트 수준 IID(내부 ID)입니다. 현재 프로젝트 내에서만 고유합니다.      |
| `CI_PROJECT_PATH`     | 프로젝트 이름이 포함된 프로젝트 네임스페이스입니다.                                                     |
| `CI_PROJECT_URL`      | 프로젝트의 HTTP 주소입니다.                                                                       |
| `CI_PROJECT_DIR`      | 리포지토리 복제와 작업 실행이 이루어지는 전체 경로입니다.                                   |
| `CI_JOB_STAGE`        | 작업의 스테이지 이름입니다.                                                                            |
| `CI_JOB_NAME`         | 작업의 이름입니다.                                                                                     |
| `CI_JOB_URL`          | 작업 세부 정보 페이지의 URL입니다.                                                                                     |
| `CI_JOB_ID`           | GitLab 인스턴스의 모든 작업 전반에서 고유한 내부 ID입니다.                               |
| `CI_RUNNER_ID`        | 사용 중인 러너의 고유 ID입니다.                                                                  |
| `CI_RUNNER_TAGS`      | 러너 태그의 쉼표로 구분된 목록입니다.                                                              |
| `CI_REPOSITORY_URL`   | CI/CD 작업 토큰을 사용하여 리포지토리를 Git 복제(HTTP)하기 위한 전체 경로입니다.                                  |
| `CI_COMMIT_SHA`       | 프로젝트가 빌드되는 커밋 리비전입니다.                                                            |
| `CI_COMMIT_REF_NAME`  | 프로젝트가 빌드되는 브랜치 또는 태그 이름입니다.                                                        |
| `CI_COMMIT_BRANCH`    | 커밋 브랜치 이름입니다. 브랜치 파이프라인에서 사용 가능합니다.                                                   |
| `CI_COMMIT_TAG`       | 커밋 태그 이름입니다. 태그 파이프라인에서만 사용 가능합니다.                                               |
| `CI_COMMIT_AUTHOR`    | 이름 <email> 형식으로 표시된 커밋 작성자입니다.                                                         |
| `CI_COMMIT_MESSAGE`   | 전체 커밋 메시지입니다.                                                                               |
| `CI_COMMIT_TIMESTAMP` | ISO 8601 형식의 커밋 타임스탬프입니다. 예: 2022-01-31T16:47:55Z. 기본값은 UTC입니다.  |


모든 빌드에 대해 GitLab CI에서 설정한 환경 변수의 전체 목록은 [공식 GitLab 설명서][101]를 참조하세요.


[101]: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
{{% /tab %}}
{{% tab "Jenkins" %}}

| 환경 변수              | 설명                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `JENKINS_URL`         | 빌드를 실행 중인 Jenkins 마스터의 URL입니다.                                                 |
| `BUILD_TAG`           | 보다 쉽게 식별할 수 있도록 `jenkins-${JOB_NAME}-${BUILD_NUMBER}` 형식으로 작성한 문자열입니다.                    |
| `BUILD_NUMBER`        | 현재 빌드 번호(예: \"153\")입니다.                                                                 |
| `BUILD_URL`           | 이 빌드의 결과를 확인할 수 있는 URL입니다(예: http://buildserver/jenkins/job/MyJobName/666/).|
| `WORKSPACE`           | 워크스페이스의 절대 경로입니다.                                                                       |
| `JOB_NAME`            | 이 빌드의 프로젝트 이름입니다.                                                                  |
| `JOB_URL`             | 작업 세부 정보 페이지의 URL입니다.                                                                            |
| `GIT_URL`             | 리포지토리에서 사용된 Git URL입니다(예: git@github.com:user/repo.git 또는 https://github.com/user/repo.git).|
| `GIT_URL_1`           | 첫 번째 Git 리포지토리의 URL입니다(여러 리포지토리가 구성된 경우).                            |
| `GIT_COMMIT`          | 빌드를 위해 체크아웃된 커밋의 Git 해시입니다.                                                    |
| `GIT_BRANCH`          | 빌드를 위해 체크아웃된 Git 브랜치입니다.                                                       |
| `NODE_NAME`           | 빌드가 실행 중인 노드의 이름입니다. 마스터 노드의 경우 'master'와 동일합니다.                       |
| `NODE_LABELS`         | 노드에 할당된 레이블의 쉼표로 구분된 목록입니다.                                                   |
| `DD_CUSTOM_TRACE_ID`  | Jenkins Datadog 플러그인에서 트레이스 ID에 대해 설정한 사용자 지정 변수입니다.                                        |
| `DD_CUSTOM_PARENT_ID` | Jenkins Datadog 플러그인에서 상위 ID에 대해 설정한 사용자 지정 변수입니다.                                        |


모든 빌드에 대해 Jenkins에서 설정한 환경 변수의 전체 목록은 [공식 Jenkins 설명서][101]를 참조하세요.


[101]: https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#using-environment-variables
[102]: https://github.com/jenkinsci/datadog-plugin

{{% /tab %}}
{{% tab "TeamCity" %}}

| 환경 변수                     | 설명                                                                                                  |
|------------------------------|--------------------------------------------------------------------------------------------------------------|
| `TEAMCITY_VERSION`           | TeamCity 서버 버전입니다.                                                                        |
| `TEAMCITY_BUILDCONF_NAME`    | 현재 빌드가 속한 빌드 구성의 이름입니다.                                           |
| `BUILD_URL`                  | 현재 빌드의 링크입니다.                                                                             |
| `DATADOG_BUILD_ID`           | [Datadog TeamCity 통합][102]에서 설정한 사용자 지정 변수입니다.                                             |

모든 빌드에 대해 TeamCity에서 설정한 환경 변수의 전체 목록은 [공식 TeamCity 설명서][101]를 참조하세요.


[101]: https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html
[102]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration

{{% /tab %}}
{{% tab "Travis CI" %}}

| 환경 변수                     | 설명                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `TRAVIS`                     | 빌드가 Travis CI에서 실행 중임을 나타내기 위해 항상 `true`로 설정됩니다.                              |
| `TRAVIS_BUILD_ID`            | Travis CI에서 내부적으로 사용하는 현재 빌드의 ID입니다.                                             |
| `TRAVIS_BUILD_NUMBER`        | 현재 빌드의 번호입니다. 예: `4`                                                    |
| `TRAVIS_BUILD_WEB_URL`       | 빌드 로그의 URL입니다.                                                                                 |
| `TRAVIS_BUILD_DIR`           | 빌드 대상 리포지토리가 워커에 복사된 디렉토리의 절대 경로입니다.    |
| `TRAVIS_JOB_WEB_URL`         | 작업 로그의 URL입니다.                                                                                   |
| `TRAVIS_REPO_SLUG`           | 현재 빌드 중인 리포지토리의 슬러그(`owner_name/repo_name` 형식)입니다.                   |
| `TRAVIS_COMMIT`              | 현재 빌드에서 테스트 중인 커밋입니다.                                                         |
| `TRAVIS_BRANCH`              | 브랜치 이름입니다(푸시 필드). PR이 타겟팅하는 브랜치 이름입니다(PR 빌드).    |
| `TRAVIS_TAG`                 | 현재 빌드가 Git 태그와 관련이 있다면 이 변수는 태그 이름으로 설정됩니다(그렇지 않으면 비어 있음). |
| `TRAVIS_PULL_REQUEST_SLUG`   | 현재 작업이 풀 리퀘스트 형태인 경우, PR이 시작된 리포지토리의 슬러그입니다.        |
| `TRAVIS_PULL_REQUEST_BRANCH` | 현재 작업이 풀 리퀘스트 형태인 경우, PR이 시작된 브랜치의 이름입니다.            |
| `TRAVIS_COMMIT_MESSAGE`      | 커밋 제목과 본문(줄 바꿈 없음)입니다.                                                               |



모든 빌드에 대해 Travis CI에서 설정한 환경 변수의 전체 목록은 [공식 Travis CI 설명서][101]를 참조하세요.


[101]: https://docs.travis-ci.com/user/environment-variables/#default-environment-variables

{{% /tab %}}
{{% tab "Buddy CI" %}}

| 환경 변수                                | 설명                                                                                           |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| `BUDDY`                                 | 현재 환경이 Buddy 환경에 해당하는지 여부를 표시합니다. 예: `true`    |
| `BUDDY_SCM_URL`                         | 프로젝트와 동기화된 리포지토리의 URL입니다. 예: `https://github.com/githubaccount/repository` |
| `BUDDY_EXECUTION_REVISION`              | 현재 파이프라인 실행 커밋의 SHA1 해시입니다. 예: `46c360492d6372e5335300776806af412755871` |
| `BUDDY_EXECUTION_BRANCH`                | 현재 파이프라인 실행의 Git 브랜치 이름입니다. 예: `main`             |
| `BUDDY_EXECUTION_TAG`                   | 현재 파이프라인 실행의 Git 태그 이름입니다(태그가 지정된 경우). 예: `v1.0.1`    |
| `BUDDY_PIPELINE_ID`                     | 실행 파이프라인의 ID입니다. 예: `1`                                             |
| `BUDDY_EXECUTION_ID`                    | 현재 파이프라인 실행의 ID입니다. 예: `1`                                     |
| `BUDDY_PIPELINE_NAME`                   | 실행 파이프라인의 이름입니다. 예: `Deploy to Production`                        |
| `BUDDY_EXECUTION_URL`                   | 현재 파이프라인 실행의 URL입니다. 예: `https://app.buddy.works/my-workspace/my-project/pipelines/pipeline/1` |
| `BUDDY_EXECUTION_REVISION_MESSAGE`      | 현재 실행 중인 리비전의 커밋 메시지입니다. 예: `we need to write unit tests!` |
| `BUDDY_EXECUTION_REVISION_COMMITTER_NAME` | 현재 실행 중인 리비전의 커미터 이름입니다. 예: `Mike Benson`      |
| `BUDDY_EXECUTION_REVISION_COMMITTER_EMAIL` | 현재 실행 중인 리비전의 커미터 이메일 주소입니다. 예: `mike.benson@buddy.works` |


</br>

모든 빌드에 대해 Buddy CI에서 설정한 환경 변수의 전체 목록은 [공식 Buddy CI 설명서][101]를 참조하세요.


[101]: https://buddy.works/docs/pipelines/environment-variables#default-environment-variables
{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/engine/reference/run/
[2]: https://docs.docker.com/compose/reference/
[3]: /ko/tests/#setup