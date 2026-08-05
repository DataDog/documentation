애플리케이션을 배포하기 전에 Go 트레이서를 [수동으로 설치][1]하세요. Dockerfile에 다음 지침과 인수를 추가합니다.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/path/to/your-go-binary"]
```

#### 설명

1. Docker 이미지에 Datadog `serverless-init`을 복사합니다.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

4. Datadog `serverless-init` 프로세스에서 애플리케이션을 래핑하도록 엔트리 포인트를 변경합니다.
   **참고**: Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 [대체 구성 방법](#alt-go)을 참고하세요.
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. (선택사항) Datadog 태그를 추가합니다.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-go
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. 엔트리 포인트에 래핑된 이진 애플리케이션을 실행합니다. 상황에 맞게 명령줄을 수정하세요. 
   ```dockerfile
   CMD ["/path/to/your-go-binary"]
   ```

#### 대체 구성 방법{#alt-go}
Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 대신 CMD 인수를 수정할 수 있습니다.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "/path/to/your-go-binary"]
```

엔트리 포인트도 계측해야 하는 경우 엔트리 포인트와 CMD 인수를 맞바꿀 수 있습니다. 자세한 정보는 [`serverless-init`이 작동하는 방식](#how-serverless-init-works)을 참고하세요.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/path/to/your-go-binary"]
```

실행할 명령이 `datadog-init` 인수로 전달되는 한, 전체 계측을 받을 수 있습니다.

**참고**: Go 코드를 자동으로 계측하는 도구인 [Orchestrion][2]을 사용할 수도 있습니다. Orchestrion은 비공개 베타 버전입니다. 자세한 내용을 보려면 Orchestrion 리포지토리에서 GitHub 이슈를 열거나 [지원팀에 문의][3]하세요.

[1]: /tracing/trace_collection/library_config/go/
[2]: https://github.com/DataDog/orchestrion
[3]: /help