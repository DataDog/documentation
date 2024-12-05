1. Add the following lines to your application's Dockerfile:

   ```go
   ARG DD_GIT_REPOSITORY_URL
   ARG DD_GIT_COMMIT_SHA
   ENV DD_TAGS="git.repository_url:${DD_GIT_REPOSITORY_URL},git.commit.sha:${DD_GIT_COMMIT_SHA}"
   ```

1. Add the following arguments to your Docker build command:

   ```go
   docker build . \
    -t my-application \
    --build-arg DD_GIT_REPOSITORY_URL=<git-provider.example/me/my-repo> \
    --build-arg DD_GIT_COMMIT_SHA=$(git rev-parse HEAD)
   ```