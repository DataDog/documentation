`DD_GIT_*` 環境変数を使ってアプリケーションを構成します。

```go
export DD_GIT_COMMIT_SHA="<commitSha>"
export DD_GIT_REPOSITORY_URL="<git-provider.example/me/my-repo>"
```

`<commitSha>` を、アプリケーションのビルドに使用したコミット SHA に置き換えます。これはビルド時に `git rev-parse HEAD` を実行することで取得することができます。これをランタイム環境変数に渡す必要があります。