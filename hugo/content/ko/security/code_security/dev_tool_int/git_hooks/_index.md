---
aliases:
- /ko/code_analysis/git_hooks/
description: 오류가 있는 코드 병합을 방지
title: Git Hooks
---

## 개요

[Git 훅](https://git-scm.com/docs/githooks)은 사용자가 코드를 리포지토리에 커밋하거나 원격 위치에 푸시하기 전에 실행되는 프로그램입니다.
Git 훅은 일반적으로 원격 브랜치에 푸시하기 전에 코드 검증을 실행하고 요구 사항을 적용하는 데 사용됩니다.

Datadog Code Security는 코드를 푸시하거나 커밋하기 전에 Static Code Analysis (SAST) 위반이나
시크릿을 확인하는 Git hook을 제공합니다.
Code Security Git hook은 최신 커밋과 기본 브랜치의 코드를 검사하고
감지된 오류를 표시합니다.

Datadog Git hook은 개발자가 코딩 오류, 취약점, 비밀이 포함된 코드를 푸시하기 전에 경고합니다. 오류가 있는 코드를 커밋하면 다음과 같은 메시지가 사용자 터미널에 나타납니다.

{{< img src="code_security/git_hooks/git_hook.png" alt="취약점을 감지한 Datadog Git Hook" style="width:100%;">}}

## 설정

1. `datadog-git-hook`를 다음에서 다운로드 합니다: 릴리즈 페이지 또는 [Datadog Static Analyzer
릴리즈](https://github.com/DataDog/datadog-static-analyzer/releases).
2. 컴퓨터에 프로그램을 설치합니다.
3. 아래 스크립트를 사용하여 리포지토리에 `.git/hooks/pre-push` 파일을 추가합니다. **참고:** 스크립트는 `datadog-static-analyzer-git-hook` 바이너리가 `/usr/local/bin/datadog-static-analyzer-git-hook`에 있다고 가정합니다.

```bash
#!/bin/sh

# 리포지토리 루트 경로를 가져옵니다
repo_path=$(git rev-parse --show-toplevel)

# 사용자가 일부 입력을 제공할 수 있는지 확인합니다
exec < /dev/tty

/usr/local/bin/datadog-static-analyzer-git-hook -r $repo_path --static-analysis --secrets --confirmation --default-branch <default-branch>

if [ $? -eq 0 ]; then
    echo "datadog-static-analyzer check passed"
    exit 0
else
    echo "datadog-static-analyzer check failed"
    exit 1
fi
```

이 프로그램은 다음과 같은 파라미터를 허용합니다.

 - `--confirmation`: Git hook 점검을 재정의할지 사용자에게 확인을 요청합니다.
 - `--default-branch`: 기본 브랜치의 이름을 지정합니다.
 - `--static-analysis`: Static Code Analysis를 활성화합니다.
 - `--secrets`: 시크릿 감지 활성화(평가판 버전. [Datadog 지원팀][1]에 문의하세요).
 - `--output <file>`: 커밋에서 발견된 결과를 SARIF 파일로 내보냅니다.

[1]: https://www.datadoghq.com/support/