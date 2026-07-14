1. アプリケーションの Dockerfile に以下の行を追加します。

   ```go
   ARG DD_GIT_REPOSITORY_URL
   ARG DD_GIT_COMMIT_SHA
   ENV DD_TAGS="git.repository_url:${DD_GIT_REPOSITORY_URL},git.commit.sha:${DD_GIT_COMMIT_SHA}"
   ```

1. Docker ビルドコマンドに以下の引数を追加します。

   ```go
   docker build . \
    -t my-application \
    --build-arg DD_GIT_REPOSITORY_URL=<git-provider.example/me/my-repo> \
    --build-arg DD_GIT_COMMIT_SHA=$(git rev-parse HEAD)
   ```