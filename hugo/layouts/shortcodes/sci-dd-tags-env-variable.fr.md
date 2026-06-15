Configurez votre application avec la variable d'environnement `DD_TAGS` :

```ruby
export DD_TAGS="git.commit.sha:<commit_Sha>,git.repository_url:<git-provider.example/me/my-repo>"
```

Remplacez `<commit_Sha>` par le SHA du commit servant à build votre application. Pour l'obtenir, exécutez `git rev-parse HEAD` lors du build. Le SHA doit être passé aux variables d'environnement du runtime.