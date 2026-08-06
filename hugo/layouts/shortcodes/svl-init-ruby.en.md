
[Manually install][1] the Ruby tracer before you deploy your application. See the [example application][2].

Add the following instructions and arguments to your Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (Optional) add Datadog tags
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

3. This environment variable is needed for trace propagation to work properly in Cloud Run. Ensure that you set this variable for all Datadog-instrumented downstream services.
   ```dockerfile
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
    **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-ruby).
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```
#### Alternative configuration {#alt-ruby}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
```

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "rails", "server", "-b", "0.0.0.0"]
```

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails