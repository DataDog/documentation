---
title: Identifying Unauthorized and Anomalous Processes
disable_toc: false
further_reading:
- link: "security/workload_protection/workload_security_rules/custom_rules"
  tag: "Documentation"
  text: "Creating Custom Detection Rules"
---

You can use Workload Protection to identify if unauthorized or anomalous processes are running or executed on your IT systems.

For example, you can create a process allowlist and query for processes running on hosts and containers outside of the allowlist. 

In Workload Protection, you can [define custom rules][1] to watch process executions for malicious activity on hosts or containers in real-time. You can define a list of process names and/or arguments that will generate a security signal that can be used to notify users.

This guide shows you how to query for unauthorized and anomalous processes using static and dynamic allowlists as examples.

## Detection for processes not on an allowlist

You can create a detection for processes that are not on a known allowlist.

Here's an example for a host:

```shell
exec.file.name not in [ "0anacron", "agent", "aide", "airflow", "anacron", "appstart.sh", "appstop.sh", "arping", "aws", "awslogs-nanny.sh", "basename", "bash", "blkid", "bounce", "capsh", "cat", "certwatch", "chcon", "chmod", "chown", ~"*chrony", "chronyc", ~"*chrony-dhcp", "chrony-helper", ~"*chrony-onoffline", "classification_move_archive.sh", "cleanup", "clear", "consoletype", "consul", "cp", "curl", "cut", "date", "dbus-send", "df", ~"*dhclient", "dhclient-script", "dircolors", "dirname", "dmidecode", "dnf-3", "du", "echo", "embedded_logrotate.sh", "ethtool", "file", "find", "findmnt", "flock", "gawk", "getconf", "git", "gpg", "gpg2", "gpgconf", "gpgsm", "grep", "grepconf.sh", "groupadd", "grub2-set-bootflag", "gzip", "head", "hostname", "hostnamectl", "httpd", "httpd_daily_logs_gzip.sh", "iconv", "id", "ionice", "ip", "ipcalc", "java", "java_version.sh", "jboss_66_log_rotate.sh", "ldconfig", "less", "ln", "local", "locale", "logger", "logrotate", "ls", "lsattr", "lsblk", "lscpu", "lspci", "mandb", "man-db.cron", "md5sum", "mkdir", "mktemp", "mlocate", "mon-put-instance-data.pl", "more", "moveFilesFromSourceToTarget.sh", "mv", ~"*netreport", "nice", "nm-cloud-setup", ~"*nm-cloud-setup.sh", "nm-dhcp-helper", "nm-dispatcher", "nohup", "on_ac_power", "oracle", "perl", "pickup", "pip", "postdrop", "printenv", "proxymap", "ps", "psql", "pyenv", ~"pyenv-*", ~"python*", "python2.7", "python3.9", "readlink", "renice", "rhn_check-2.7", "rhsmcertd-worker", "rm", "rmdir", "rpm", "rsync", "run-parts", "sa1", "sa2", "sadc", "sar", "_script.sh", "sed", ~"*sendmail", "sendmail.postfix", "setup-policy-routes", "sftp-server", "sg_inq", "sleep", "smtp", "smtpd", "snowsql", "sort", "sqlite3", "ssh", "sshd", "ssm-document-worker", "ssm-session-worker", "stat", "su", "sudo", "systemctl", "systemd", "systemd-coredump", ~"*systemd-environment-d-generator", "systemd-hostnamed", "systemd-networkd-wait-online", "systemd-tmpfiles", "systemd-tty-ask-password-agent", "systemd-user-runtime-dir", "systemd-userwork", "systemd-xdg-autostart-generator", "tail", "tar", "time", "tlsmgr", "touch", "tput", "tr", "trivial-rewrite", "tty", "udevadm", "uname", "unbound-anchor", "unix_chkpwd", "unzip_rename_files.sh", "updatedb", "updater", "urlgrabber-ext-down", "useradd", "usermod", "vault", "vi", "wc", "which", "wkhtmltoimage", "xargs", "yum", "ping", "get_latest_version.sh", ~"rbenv*", "uniq", "diff", "ruby", "get_hosts_for_app_component.sh", "update_health_status.rb", "check.pl", "check_all_pool_db_version.rb", ~"gitaly-git-v*", ~"gitlab-*", "upload_host_info.rb", "sshpass", ~"splunk*", "killall5", "php", "run", "env", "chpst", ~"jenkins*" ]
```

Here's an example for a container:

```shell
exec.file.name not in ["vault"] && container.id == "ca5534a51dd04bbcebe9b23ba05f389466cf0c190f1f8f182d7eea92a9671d00"
```

The container `id` this example generates events for that container only.

If you want to generate an event for any container that executes a process that is not `vault`, the expression would be:

```shell
exec.file.name not in ["vault"] && container.id == ""
```

## Detection for dynamic anomalies

<div class="alert alert-info">Detection for dynamic anomalies is only supported with containers.</div>

If you don't want to create an allowlist when querying for processes, you can create a custom rule to query for drift events dynamically.

The custom rule query is `@agent.rule_id:anomaly_detection`. 

If you want to query for anomalies in a particular container image, you can use the `image_name` tag. For example, `@agent.rule_id:anomaly_detection image_name:IMAGE_NAME`.

{{< img src="/security/cloud_security_management/guide/csm_threats_anomaly_image_query.png" alt="query for anomalies in a particular container image" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/workload_protection/workload_security_rules/custom_rules
