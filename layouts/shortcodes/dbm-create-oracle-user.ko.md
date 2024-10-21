레거시 Oracle 통합을 이미 설치했고 사용자가 이미 존재한다면 이 단계를 건너뛸 수 있습니다.

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 권한을 부여하세요.

```SQL
CREATE USER datadog IDENTIFIED BY <YOUR_PASSWORD>;
```