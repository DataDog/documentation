---
disable_toc: false
further_reading:
- link: security/threats/workload_security_rules/custom_rules
  tag: Documentación
  text: Creación de reglas de detección personalizadas
title: Identificación de casos no autorizados y anómalos procesos
---

Puedes utilizar CSM Threats para identificar si en tus sistemas informáticos se están ejecutando o se ejecutaron procesos no autorizados o anómalos.

Por ejemplo, puedes crear una lista de procesos permitidos y buscar procesos que se ejecuten en hosts y contenedores fuera de la lista de permitidos. 

En CSM Threats, puedes [definir reglas personalizadas][1] para supervisar las ejecuciones de procesos en busca de actividad maliciosa en hosts o contenedores en tiempo real. Puedes definir una lista de nombres de procesos o argumentos que generarán una señal de seguridad que puede utilizarse para notificar a los usuarios.

Esta guía te muestra cómo consultar procesos no autorizados y anómalos utilizando listas de permisos estáticas y dinámicas como ejemplos.

## Detección de procesos que no están en una lista de permitidos

Puedes crear una detección para procesos que no estén en una lista de permitidos conocida.

He aquí un ejemplo para un host:

```shell
exec.file.name not in [ "0anacron", "agent", "aide", "airflow", "anacron", "appstart.sh", "appstop.sh", "arping", "aws", "awslogs-nanny.sh", "basename", "bash", "blkid", "bounce", "capsh", "cat", "certwatch", "chcon", "chmod", "chown", ~"*chrony", "chronyc", ~"*chrony-dhcp", "chrony-helper", ~"*chrony-onoffline", "classification_move_archive.sh", "cleanup", "clear", "consoletype", "consul", "cp", "curl", "cut", "date", "dbus-send", "df", ~"*dhclient", "dhclient-script", "dircolors", "dirname", "dmidecode", "dnf-3", "du", "echo", "embedded_logrotate.sh", "ethtool", "file", "find", "findmnt", "flock", "gawk", "getconf", "git", "gpg", "gpg2", "gpgconf", "gpgsm", "grep", "grepconf.sh", "groupadd", "grub2-set-bootflag", "gzip", "head", "hostname", "hostnamectl", "httpd", "httpd_daily_logs_gzip.sh", "iconv", "id", "ionice", "ip", "ipcalc", "java", "java_version.sh", "jboss_66_log_rotate.sh", "ldconfig", "less", "ln", "local", "locale", "logger", "logrotate", "ls", "lsattr", "lsblk", "lscpu", "lspci", "mandb", "man-db.cron", "md5sum", "mkdir", "mktemp", "mlocate", "mon-put-instance-data.pl", "more", "moveFilesFromSourceToTarget.sh", "mv", ~"*netreport", "nice", "nm-cloud-setup", ~"*nm-cloud-setup.sh", "nm-dhcp-helper", "nm-dispatcher", "nohup", "on_ac_power", "oracle", "perl", "pickup", "pip", "postdrop", "printenv", "proxymap", "ps", "psql", "pyenv", ~"pyenv-*", ~"python*", "python2.7", "python3.9", "readlink", "renice", "rhn_check-2.7", "rhsmcertd-worker", "rm", "rmdir", "rpm", "rsync", "run-parts", "sa1", "sa2", "sadc", "sar", "_script.sh", "sed", ~"*sendmail", "sendmail.postfix", "setup-policy-routes", "sftp-server", "sg_inq", "sleep", "smtp", "smtpd", "snowsql", "sort", "sqlite3", "ssh", "sshd", "ssm-document-worker", "ssm-session-worker", "stat", "su", "sudo", "systemctl", "systemd", "systemd-coredump", ~"*systemd-environment-d-generator", "systemd-hostnamed", "systemd-networkd-wait-online", "systemd-tmpfiles", "systemd-tty-ask-password-agent", "systemd-user-runtime-dir", "systemd-userwork", "systemd-xdg-autostart-generator", "tail", "tar", "time", "tlsmgr", "touch", "tput", "tr", "trivial-rewrite", "tty", "udevadm", "uname", "unbound-anchor", "unix_chkpwd", "unzip_rename_files.sh", "updatedb", "updater", "urlgrabber-ext-down", "useradd", "usermod", "vault", "vi", "wc", "which", "wkhtmltoimage", "xargs", "yum", "ping", "get_latest_version.sh", ~"rbenv*", "uniq", "diff", "ruby", "get_hosts_for_app_component.sh", "update_health_status.rb", "check.pl", "check_all_pool_db_version.rb", ~"gitaly-git-v*", ~"gitlab-*", "upload_host_info.rb", "sshpass", ~"splunk*", "killall5", "php", "run", "env", "chpst", ~"jenkins*" ]
```

He aquí un ejemplo para un contenedor:

```shell
exec.file.name not in ["vault"] && container.id == "ca5534a51dd04bbcebe9b23ba05f389466cf0c190f1f8f182d7eea92a9671d00"
```

El `id` de contenedor de este ejemplo genera eventos para ese contenedor solamente.

Si deseas generar un evento para cualquier contenedor que ejecute un proceso que no sea `vault`, la expresión sería:

```shell
exec.file.name not in ["vault"] && container.id == ""
```

## Detección de anomalías dinámica

<div class="alert alert-info">La detección de anomalías dinámica sólo es compatible con los contenedores.</div>

Si no deseas crear una lista de permitidos al consultar procesos, puedes crear una regla personalizada para consultar los eventos que se desvían de forma dinámica.

La consulta de la regla personalizada es `@agent.rule_id:anomaly_detection`. 

Si deseas consultar anomalías en una imagen de contenedor concreta, puedes utilizar la etiqueta `image_name`. Por ejemplo, `@agent.rule_id:anomaly_detection image_name:IMAGE_NAME`.

{{< img src="/security/cloud_security_management/guide/csm_threats_anomaly_image_query.png" alt="consulta de anomalías en una imagen de contenedor concreta" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/threats/workload_security_rules/custom_rules