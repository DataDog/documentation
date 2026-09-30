Configurez votre application avec les variables d'environnement `DD_GIT_*` :

```go
export DD_GIT_COMMIT_SHA="<commit_Sha>"
export DD_GIT_REPOSITORY_URL="<git-provider.example/me/my-repo>"
```

Remplacez `<commit_Sha>` par le SHA du commit servant à build votre application. Pour l'obtenir, exécutez `git rev-parse HEAD` lors du build. Le SHA doit être passé aux variables d'environnement du runtime.