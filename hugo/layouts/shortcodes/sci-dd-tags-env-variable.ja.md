`DD_TAGS` 環境変数を使ってアプリケーションを構成します。

```ruby
export DD_TAGS="git.commit.sha:<commitSha>,git.repository_url:<git-provider.example/me/my-repo>"
```

`<commitSha>` を、アプリケーションのビルドに使用したコミットの SHA に置き換えます。これはビルド時に `git rev-parse HEAD` を実行することで取得することができます。これをランタイム環境変数に渡す必要があります。