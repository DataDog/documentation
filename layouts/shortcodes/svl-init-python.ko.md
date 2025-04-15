Dockerfile에 다음 명령과 인수를 추가하세요.
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

#### 설명

1. Docker 이미지에 Datadog `serverless-init`을 복사합니다.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Python 트레이서를 설치합니다.
   ```dockerfile
   RUN pip install --target /dd_tracer/python/ ddtrace
   ```
   [수동 트레이서 계측 방법][1]에 안내된 대로 애플리케이션에 바로 Datadog 트레이서 라이브러리를 설치하는 경우에는 이 단계를 건너뛰세요.

3. (선택사항) Datadog 태그를 추가합니다.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-python
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` 프로세스에서 애플리케이션을 래핑하도록 엔트리 포인트를 변경합니다.
   **참고**: Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 [대체 구성 방법](#alt-python)을 참고하세요.

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. 엔트리 포인트에 래핑된 이진 애플리케이션을 Datadog 트레이스 라이브러리를 이용해 실행합니다. 상황에 맞게 명령줄을 수정하세요. 
   ```dockerfile
   CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
   ```

#### 대체 구성 방법{#alt-python}
Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 대신 CMD 인수를 수정할 수 있습니다.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

엔트리 포인트도 계측해야 하는 경우 엔트리 포인트와 CMD 인수를 맞바꿀 수 있습니다. 자세한 정보는 [`serverless-init`이 작동하는 방식](#how-serverless-init-works)을 참고하세요.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

실행할 명령이 `datadog-init` 인수로 전달되는 한, 전체 계측을 받을 수 있습니다.

[1]: /tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application