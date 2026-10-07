---
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: 설명서
  text: 사용자 지정 탐지 규칙 만들기
title: 인가되지 않았거나 비정상적인 프로세스 식별
---
Workload Protection을 사용하여 IT 시스템에서 인가되지 않았거나 비정상적인 프로세스가 실행 중인지 또는 실행되었는지 식별할 수 있습니다.

예를 들어, 프로세스 허용 목록을 생성하고 허용 목록 외부에 있는 호스트 및 컨테이너에서 실행 중인 프로세스를 쿼리할 수 있습니다. 

Workload Protection에서는 [사용자 지정 탐지 규칙을 정의][1]하여 호스트나 컨테이너에서 악성 활동에 대한 프로세스 실행을 실시간으로 감시할 수 있습니다. 사용자에게 알림을 보내는 데 사용할 수 있는 보안 신호를 생성할 프로세스 이름 및/또는 인수의 목록을 정의할 수 있습니다.

이 가이드에서는 정적 및 동적 허용 목록을 예로 들어 인가되지 않은 비정상적인 프로세스를 쿼리하는 방법을 보여줍니다.

## 허용 목록에 없는 프로세스 탐지{#detection-for-processes-not-on-an-allowlist}

알려진 허용 목록에 없는 프로세스에 대한 탐지를 생성할 수 있습니다.

호스트의 예시는 다음과 같습니다.

```shell
exec.file.name not in [ "0anacron", "agent", "aide", "airflow", "anacron", "appstart.sh", "appstop.sh", "arping", "aws", "awslogs-nanny.sh", "basename", "bash", "blkid", "bounce", "capsh", "cat", "certwatch", "chcon", "chmod", "chown", ~"*chrony", "chronyc", ~"*chrony-dhcp", "chrony-helper", ~"*chrony-onoffline", "classification_move_archive.sh", "cleanup", "clear", "consoletype", "consul", "cp", "curl", "cut", "date", "dbus-send", "df", ~"*dhclient", "dhclient-script", "dircolors", "dirname", "dmidecode", "dnf-3", "du", "echo", "embedded_logrotate.sh", "ethtool", "file", "find", "findmnt", "flock", "gawk", "getconf", "git", "gpg", "gpg2", "gpgconf", "gpgsm", "grep", "grepconf.sh", "groupadd", "grub2-set-bootflag", "gzip", "head", "hostname", "hostnamectl", "httpd", "httpd_daily_logs_gzip.sh", "iconv", "id", "ionice", "ip", "ipcalc", "java", "java_version.sh", "jboss_66_log_rotate.sh", "ldconfig", "less", "ln", "local", "locale", "logger", "logrotate", "ls", "lsattr", "lsblk", "lscpu", "lspci", "mandb", "man-db.cron", "md5sum", "mkdir", "mktemp", "mlocate", "mon-put-instance-data.pl", "more", "moveFilesFromSourceToTarget.sh", "mv", ~"*netreport", "nice", "nm-cloud-setup", ~"*nm-cloud-setup.sh", "nm-dhcp-helper", "nm-dispatcher", "nohup", "on_ac_power", "oracle", "perl", "pickup", "pip", "postdrop", "printenv", "proxymap", "ps", "psql", "pyenv", ~"pyenv-*", ~"python*", "python2.7", "python3.9", "readlink", "renice", "rhn_check-2.7", "rhsmcertd-worker", "rm", "rmdir", "rpm", "rsync", "run-parts", "sa1", "sa2", "sadc", "sar", "_script.sh", "sed", ~"*sendmail", "sendmail.postfix", "setup-policy-routes", "sftp-server", "sg_inq", "sleep", "smtp", "smtpd", "snowsql", "sort", "sqlite3", "ssh", "sshd", "ssm-document-worker", "ssm-session-worker", "stat", "su", "sudo", "systemctl", "systemd", "systemd-coredump", ~"*systemd-environment-d-generator", "systemd-hostnamed", "systemd-networkd-wait-online", "systemd-tmpfiles", "systemd-tty-ask-password-agent", "systemd-user-runtime-dir", "systemd-userwork", "systemd-xdg-autostart-generator", "tail", "tar", "time", "tlsmgr", "touch", "tput", "tr", "trivial-rewrite", "tty", "udevadm", "uname", "unbound-anchor", "unix_chkpwd", "unzip_rename_files.sh", "updatedb", "updater", "urlgrabber-ext-down", "useradd", "usermod", "vault", "vi", "wc", "which", "wkhtmltoimage", "xargs", "yum", "ping", "get_latest_version.sh", ~"rbenv*", "uniq", "diff", "ruby", "get_hosts_for_app_component.sh", "update_health_status.rb", "check.pl", "check_all_pool_db_version.rb", ~"gitaly-git-v*", ~"gitlab-*", "upload_host_info.rb", "sshpass", ~"splunk*", "killall5", "php", "run", "env", "chpst", ~"jenkins*" ]
```

컨테이너의 예시는 다음과 같습니다.

```shell
exec.file.name not in ["vault"] && container.id == "ca5534a51dd04bbcebe9b23ba05f389466cf0c190f1f8f182d7eea92a9671d00"
```

이 예시는 해당 `id`의 컨테이너에 대해서만 이벤트를 생성합니다.

`vault`가 아닌 프로세스를 실행하는 모든 컨테이너에 대해 이벤트를 생성하려면 표현식은 다음과 같습니다.

```shell
exec.file.name not in ["vault"] && container.id == ""
```

## 동적 이상 징후 탐지 {#detection-for-dynamic-anomalies}

<div class="alert alert-info">동적 이상 징후 탐지는 컨테이너에서만 지원됩니다.</div>

프로세스를 쿼리할 때 허용 목록을 만들고 싶지 않은 경우, 사용자 지정 규칙을 생성하여 드리프트 이벤트를 동적으로 쿼리할 수 있습니다.

사용자 지정 규칙 쿼리는 `@agent.rule_id:anomaly_detection`입니다. 

특정 컨테이너 이미지에서 이상 징후를 쿼리하려면 `image_name` 태그를 사용하세요. 예를 들어, `@agent.rule_id:anomaly_detection image_name:IMAGE_NAME`을 사용할 수 있습니다.

{{< img src="/security/cloud_security_management/guide/csm_threats_anomaly_image_query.png" alt="특정 컨테이너 이미지에서 이상 징후 쿼리" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together