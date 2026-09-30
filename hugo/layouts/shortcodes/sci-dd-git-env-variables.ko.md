애플리케이션을 환경 변수 `DD_GIT_*`로 구성:

```go
export DD_GIT_COMMIT_SHA="<commitSha>"
export DD_GIT_REPOSITORY_URL="<git-provider.example/me/my-repo>"
```

`<commitSha>`를 애플리케이션을 빌드할 때 사용한 커밋 SHA로 변경하세요. 빌드할 때 `git rev-parse HEAD`를 사용해 이 정보를 가져올 수 있으며, 런타임 환경 변수로 전송되어야 합니다.