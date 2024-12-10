Datadog은 Git 정보를 사용하여 테스트 결과를 시각화하고 리포지토리, 브랜치, 커밋별로 그룹화합니다. Git 메타데이터는 CI 공급자 환경 변수와 프로젝트 경로의 로컬 `.git` 폴더(사용 가능한 경우)에서 테스트 계측으로 자동 수집합니다.

지원되지 않는 CI 공급자이거나 `.git` 폴더가 없는 상태에서 테스트를 실행하는 경우, 환경 변수를 사용하여 Git 정보를 수동으로 설정할 수 있습니다. 해당 환경 변수는 자동 탐지된 정보보다 우선합니다. 다음 환경 변수를 설정하여 Git 정보를 제공합니다.

`DD_GIT_REPOSITORY_URL`
: 코드가 저장된 리포지토리 URL입니다. HTTP, SSH URL이 모두 지원됩니다.<br/>
**예시**: `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: 테스트 중인 Git 브랜치입니다. 대신 태그 정보를 제공하는 경우 비워 둡니다.<br/>
**예시**: `develop`


`DD_GIT_TAG`
: 테스트 중인 Git 태그입니다(해당되는 경우). 대신 브랜치 정보를 제공하는 경우 비워 둡니다.<br/>
**예시**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: 전체 커밋 해시입니다.<br/>
**예시**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: 커밋 메시지입니다.<br/>
**예시**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: 커밋 작성자 이름입니다.<br/>
**예시**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: 커밋 작성자 이메일입니다.<br/>
**예시**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: ISO 8601 형식의 커밋 작성자 날짜입니다.<br/>
**예시**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: 커밋 커미터 이름입니다.<br/>
**예시**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: 커밋 커미터 이메일입니다.<br/>
**예시**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: ISO 8601 형식의 커밋 커미터 날짜입니다.<br/>
**예시**: `2021-03-12T16:00:28Z`
