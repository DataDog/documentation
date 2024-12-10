Dockerfile에 다음 명령과 인수를 추가하세요.
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# Apache 및 mod_php 기반 이미지에 다음을 사용하세요
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["apache2-foreground"]

# Nginx 및 php-fpm 기반 이미지에 다음을 사용하세요
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD php-fpm; nginx -g daemon off;
```

**참고**: `datadog-init` 엔트리 포인트는 프로세스를 래핑한 후 로그를 수집합니다. 로그가 제대로 작동하려면 Apache, Nginx, 또는 PHP 프로세스가 출력을 `stdout`로 보내야 합니다.

#### 설명


1. Docker 이미지에 Datadog `serverless-init`을 복사합니다.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog PHP 트레이서를 복사하고 설치합니다.
   ```dockerfile
   ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
   RUN php /datadog-setup.php --php-bin=all
   ```
   [수동 트레이서 계측 방법][1]에 안내된 대로 애플리케이션에 바로 Datadog 트레이서 라이브러리를 설치하는 경우에는 이 단계를 건너뛰세요.

3. (선택사항) Datadog 태그를 추가합니다.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-php
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` 프로세스에서 애플리케이션을 래핑하도록 엔트리 포인트를 변경합니다.
   **참고**: Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 [대체 구성 방법](#alt-php)을 참고하세요.
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. 애플리케이션을 실행합니다.

   Apache 및 mod_php 기반 이미지에는 다음을 사용하세요.
   ```dockerfile
   RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
   EXPOSE 8080
   CMD ["apache2-foreground"]
   ```

   Nginx와 php-fpm 기반 이미지에는 다음을 사용하세요.
   ```dockerfile
   RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
   EXPOSE 8080
   CMD php-fpm; nginx -g daemon off;
   ```
#### 대체 구성: CMD 인수 {#alt-php}
Dockerfile에 이미 정의된 엔트리 포인트가 있고 Apache와 mod_php 기반 이미지를 사용하는 중이라면, 대신 CMD 인수를 수정할 수 있습니다.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["/app/datadog-init", "apache2-foreground"]
```

엔트리 포인트도 계측해야 하는 경우 엔트리 포인트와 CMD 인수를 맞바꿀 수 있습니다. 자세한 정보는 [`serverless-init`이 작동하는 방식](#how-serverless-init-works)을 참고하세요.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# Apache 및 mod_php 기반 이미지에 다음을 사용하세요
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["your_entrypoint.sh", "apache2-foreground"]

# Nginx 및 php-fpm 기반 이미지에 다음을 사용하세요
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD your_entrypoint.sh php-fpm; your_entrypoint.sh nginx -g daemon off;
```

실행할 명령이 `datadog-init` 인수로 전달되는 한, 전체 계측을 받을 수 있습니다.

[1]: /tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension