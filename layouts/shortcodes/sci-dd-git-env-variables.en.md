Configure your application with the `DD_GIT_*` environment variables:

```go
export DD_GIT_COMMIT_SHA="<commitSha>"
export DD_GIT_REPOSITORY_URL="<git-provider.example/me/my-repo>"
```

Replace `<commitSha>` with the commit SHA used to build your application. You can retrieve this by running `git rev-parse HEAD` at build time, and it needs to be passed into the runtime environment variables.