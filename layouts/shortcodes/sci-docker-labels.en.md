This approach requires Docker, or containerd >= 1.5.6. It doesn't support containers running on AWS Fargate.
Datadog can extract source code information directly from your images' Docker labels. During build time, follow the [Open Containers standard][101] to add the git commit SHA and repository URL as Docker labels:

```shell
docker build . \
  -t my-application \
  --label org.opencontainers.image.revision=$(git rev-parse HEAD) \
  --label org.opencontainers.image.source=$(git config --get remote.origin.url)
```

[101]: https://github.com/opencontainers/image-spec/blob/main/annotations.md#pre-defined-annotation-keys
