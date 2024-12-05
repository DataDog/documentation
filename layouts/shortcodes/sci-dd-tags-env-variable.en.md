Configure your application with the `DD_TAGS` environment variable:

```ruby
export DD_TAGS="git.commit.sha:<commitSha>,git.repository_url:<git-provider.example/me/my-repo>"
```

Replace `<commitSha>` with the commit SHA used to build your application. You can retrieve this by running `git rev-parse HEAD` at build time, and it needs to be passed into the runtime environment variables.