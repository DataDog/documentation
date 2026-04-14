Create a YAML file that contains your configuration. You can use the following example and adapt it to your needs:

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: '<SERVICE_NAME>'
  labels:
    cloud.googleapis.com/location: '<LOCATION>'
    service: '<SERVICE_NAME>'
spec:
  template:
    metadata:
      labels:
        service: '<SERVICE_NAME>'
      annotations:
        # The maximum number of instances that can be created for this service.
        # https://cloud.google.com/run/docs/reference/rest/v1/RevisionTemplate
        autoscaling.knative.dev/maxScale: '100'
        # The startup CPU boost feature for revisions provides additional CPU during
        # instance startup time and for 10 seconds after the instance has started.
        # https://cloud.google.com/run/docs/configuring/services/cpu#startup-boost
        run.googleapis.com/startup-cpu-boost: 'true'
    spec:
      containers:
        - env:
            - name: DD_SERVICE
              value: '<SERVICE_NAME>'
          image: '<CONTAINER_IMAGE>'
          name: run-sidecar-1
          ports:
            - containerPort: 8080
              name: http1
          resources:
            limits:
              cpu: 1000m
              memory: 512Mi
          startupProbe:
            failureThreshold: 1
            periodSeconds: 240
            tcpSocket:
              port: 8080
            timeoutSeconds: 240
          volumeMounts:
            - mountPath: /shared-volume
              name: shared-volume
        - env:
            - name: DD_SERVERLESS_LOG_PATH
              value: shared-volume/logs/*.log
            - name: DD_SITE
              value: '<DATADOG_SITE>'
            - name: DD_ENV
              value: '<ENV>'
            - name: DD_API_KEY
              value: '<API_KEY>'
            - name: DD_SERVICE
              value: '<SERVICE_NAME>'
            - name: DD_VERSION
              value: '<VERSION>'
            - name: DD_LOG_LEVEL
              value: debug
            - name: DD_LOGS_INJECTION
              value: 'true'
            - name: DD_SOURCE
              value: '{{ .Get "language" }}'
            - name: DD_HEALTH_PORT
              value: '12345'
          image: gcr.io/datadoghq/serverless-init:<YOUR_TAG>
          name: serverless-init-1
          resources:
            limits:
              cpu: 1000m
              memory: 512Mi
          startupProbe:
            failureThreshold: 3
            periodSeconds: 10
            tcpSocket:
              port: 12345
            timeoutSeconds: 1
          volumeMounts:
            - mountPath: /shared-volume
              name: shared-volume
      volumes:
        - emptyDir:
            medium: Memory
            sizeLimit: 512Mi
          name: shared-volume
  traffic:
    - latestRevision: true
      percent: 100
```

This example uses the latest version of serverless-init. See the [latest releases on Docker Hub][1004] to pin a specific version.

See the [Environment Variables](#environment-variables) for more information.

In this example, the environment variables, startup health check, and volume mount are already added. If you don't want to enable logs, remove the shared volume.

Ensure the container port for the main container is the same as the one exposed in your Dockerfile/service.

To deploy your container, run:
```shell
gcloud run services replace <FILENAME>.yaml
```

[1001]: /getting_started/tagging/unified_service_tagging
[1002]: /getting_started/site/
[1003]: https://app.datadoghq.com/organization-settings/api-keys
[1004]: https://hub.docker.com/r/datadog/serverless-init
