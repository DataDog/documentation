---
aliases:
- /ko/logs/faq/setting-file-permissions-for-rotating-logs
further_reading:
- link: /logs/guide/log-parsing-best-practice/
  tag: FAQ
  text: 로그 파싱 - 모범 사례
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 배우기
title: 로그 로테이션을 위한 파일 권한 설정(Linux)
---

Datadog 에이전트는 `dd-agent` 사용자 및 `dd-agent` 그룹에서 실행됩니다. 해당 설정은 루트로만 액세스할 수 있으므로 Datadog 에이전트가 `/var/log`에 있는 로그에 액세스할 수 없도록 합니다.

## ACL을 사용한 권한 설정

`datadog-agent`에만 읽기 전용 액세스 권한을 허용하려면 [ACL을 생성하고 logrotate를 수정하여 권한 변경이 지속되도록 합니다][1]. 

### 시스템에서 ACL이 활성화되어 있는지 확인

이 글에 간략히 소개된 방법을 사용해 권한을 설정하려면 파일 시스템에서 [ACL을 활성화해야 합니다][2]. `getfacl` 및 `setfacl` 명령을 사용하여 ACL이 활성화되어 있는지 확인하고 테스트 디렉터리에서 `datadog-agent` 사용자에 대한 권한을 설정합니다. 예시는 다음과 같습니다. 

```shell
mkdir /var/log/test-dir
getfacl /var/log/test-dir/
setfacl -m u:dd-agent:rx /var/log/test-dir
getfacl /var/log/test-dir/
```

ACL이 활성화되어 있으면 `datadog-agent`에 대해 설정된 권한이 getfacl 출력에 나타납니다.

{{< img src="logs/faq/setting_file_permission.png" alt="파일 권한 설정" >}}

### 로그 디렉터리에서 dd-agent에 읽기 및 실행 권한 부여

ACL이 활성화되었는지 확인하면 로그 수집을 위한 적합한 디렉터리에서 `datadog-agent` 사용자에게 읽기 및 실행 권한을 부여합니다. 예를 들어, `/var/log/apache`에 액세스 권한을 부여하려면 다음을 실행합니다.

```shell
setfacl -m u:dd-agent:rx /var/log/apache
```

[Linux에서 ACL 설정하는 방법 자세히 알아보기][3]

### 로그 파일 로테이션 권한 설정

[권한 설정][4]을 한 번 수행하면 로그 로테이션 동안 지속되지 않습니다. logrotate가 ACL 설정에 다시 적용되지 않기 때문입니다. 보다 영구적인 해결 방법은 logrotate에 규칙을 추가하여 새로운 파일에서 ACL을 재설정하는 것입니다. 

```shell
sudo touch /etc/logrotate.d/dd-agent_ACLs
```

예시 파일:

```text
/var/log/apache/*.log {
 postrotate
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/apache/access.log
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/apache/error.log
 endscript
}
```

다음을 사용해 ACL 파일 상태를 확인합니다.

```text
getfacl /var/log/apache/access.log
```

**참고**: **PostgreSQL v10** 이전 버전의 경우 권한을 **0700**으로 설정합니다. **PostgreSQL v11**의 경우 **0700** 또는 **0750**으로 설정합니다. 0700 또는 0750와 같은 각기 다른 권한의 기본 데이터 폴더를 사용해 서버를 시작하려 하면 포스트마스터 프로세스 실패가 발생할 수 있습니다.

**참고**: PostgreSQL 로깅 디렉터리는 기본 PostgreSQL 설치와 동일한 디렉터리에 위치할 수 없습니다.

## ACL이 존재하지 않을 경우 권한 설정

ACL이 시스템에 존재하지 않으면 그룹 액세스를 기준으로 권한을 설정합니다.

예를 들어, MySQL 서비스는 다음 위치에 로깅합니다.

```text
/var/log/mysql/mysql_error.log
/var/log/mysql/mysql-slow.log
```

해당 권한은 기본적으로 사용자 'mysql' 및 그룹 'mysql'과 연결되어 있습니다. 로깅 체계는 'mysql' 그룹에 없는 모든 사용자에게 로그 파일에 대한 액세스를 거부하는 것입니다. 일반적으로 아래와 같습니다.

```text
$ ls -l /var/log | grep -i mysql
drwxr-x--- 2 mysql mysql 4096 Feb 20 06:25 mysql
```

여기에서 가장 쉬운 경로는 logrotate 설정에서 모두에게 파일에 대한 읽기 액세스를 부여하는 것입니다.

```text
/var/log/mysql/mysql_error.log /var/log/mysql/mysql-slow.log {

        daily
        rotate 7
        missingok
        create 644 mysql adm
        compress
}
```

일반적인 각 상용 애플리케이션은 유사한 명명법을 따릅니다. 이점은 개별 계정에 특별 권한을 제공하는 것을 피하고 표준화된 프로세스를 사용할 수 있다는 것입니다. 이를 통해 감사 규칙을 제어할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.ubuntu.com/community/FilePermissionsACLs
[2]: https://www.tecmint.com/secure-files-using-acls-in-linux
[3]: http://xmodulo.com/configure-access-control-lists-acls-linux.html
[4]: http://bencane.com/2012/05/27/acl-using-access-control-lists-on-linux