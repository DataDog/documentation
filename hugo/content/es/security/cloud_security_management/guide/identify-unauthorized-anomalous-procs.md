---
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: Documentación
  text: Creación de reglas de detección personalizadas
title: Identificación de procesos no autorizados y anómalos
---
Puede usar Workload Protection para identificar si se están ejecutando o si se han ejecutado procesos no autorizados o anómalos en sus sistemas de TI.

Por ejemplo, puede crear una lista de procesos permitidos y consultar los procesos que se ejecutan en servidores y contenedores fuera de dicha lista. 

En Workload Protection, puede [definir reglas personalizadas][1] para observar la ejecución de procesos en busca de actividad maliciosa en servidores o contenedores en tiempo real. Puede definir una lista de nombres de procesos y/o argumentos que generarán una señal de seguridad que se puede utilizar para notificar a los usuarios.

Esta guía le muestra cómo consultar procesos no autorizados y anómalos utilizando listas de procesos permitidos estáticas y dinámicas como ejemplos.

## Detección de procesos que no están en una lista de procesos permitidos {#detection-for-processes-not-on-an-allowlist}

Puede crear una detección para procesos que no se encuentran en una lista de procesos permitidos conocida.

Aquí tiene un ejemplo para un servidor:

```shell
exec.file.name not in [ "0anacron", "agent", "aide", "airflow", "anacron", "appstart.sh", "appstop.sh", "arping", "aws", "awslogs-nanny.sh", "basename", "bash", "blkid", "bounce", "capsh", "cat", "certwatch", "chcon", "chmod", "chown", ~"*chrony", "chronyc", ~"*chrony-dhcp", "chrony-helper", ~"*chrony-onoffline", "classification_move_archive.sh", "cleanup", "clear", "consoletype", "consul", "cp", "curl", "cut", "date", "dbus-send", "df", ~"*dhclient", "dhclient-script", "dircolors", "dirname", "dmidecode", "dnf-3", "du", "echo", "embedded_logrotate.sh", "ethtool", "file", "find", "findmnt", "flock", "gawk", "getconf", "git", "gpg", "gpg2", "gpgconf", "gpgsm", "grep", "grepconf.sh", "groupadd", "grub2-set-bootflag", "gzip", "head", "hostname", "hostnamectl", "httpd", "httpd_daily_logs_gzip.sh", "iconv", "id", "ionice", "ip", "ipcalc", "java", "java_version.sh", "jboss_66_log_rotate.sh", "ldconfig", "less", "ln", "local", "locale", "logger", "logrotate", "ls", "lsattr", "lsblk", "lscpu", "lspci", "mandb", "man-db.cron", "md5sum", "mkdir", "mktemp", "mlocate", "mon-put-instance-data.pl", "more", "moveFilesFromSourceToTarget.sh", "mv", ~"*netreport", "nice", "nm-cloud-setup", ~"*nm-cloud-setup.sh", "nm-dhcp-helper", "nm-dispatcher", "nohup", "on_ac_power", "oracle", "perl", "pickup", "pip", "postdrop", "printenv", "proxymap", "ps", "psql", "pyenv", ~"pyenv-*", ~"python*", "python2.7", "python3.9", "readlink", "renice", "rhn_check-2.7", "rhsmcertd-worker", "rm", "rmdir", "rpm", "rsync", "run-parts", "sa1", "sa2", "sadc", "sar", "_script.sh", "sed", ~"*sendmail", "sendmail.postfix", "setup-policy-routes", "sftp-server", "sg_inq", "sleep", "smtp", "smtpd", "snowsql", "sort", "sqlite3", "ssh", "sshd", "ssm-document-worker", "ssm-session-worker", "stat", "su", "sudo", "systemctl", "systemd", "systemd-coredump", ~"*systemd-environment-d-generator", "systemd-hostnamed", "systemd-networkd-wait-online", "systemd-tmpfiles", "systemd-tty-ask-password-agent", "systemd-user-runtime-dir", "systemd-userwork", "systemd-xdg-autostart-generator", "tail", "tar", "time", "tlsmgr", "touch", "tput", "tr", "trivial-rewrite", "tty", "udevadm", "uname", "unbound-anchor", "unix_chkpwd", "unzip_rename_files.sh", "updatedb", "updater", "urlgrabber-ext-down", "useradd", "usermod", "vault", "vi", "wc", "which", "wkhtmltoimage", "xargs", "yum", "ping", "get_latest_version.sh", ~"rbenv*", "uniq", "diff", "ruby", "get_hosts_for_app_component.sh", "update_health_status.rb", "check.pl", "check_all_pool_db_version.rb", ~"gitaly-git-v*", ~"gitlab-*", "upload_host_info.rb", "sshpass", ~"splunk*", "killall5", "php", "run", "env", "chpst", ~"jenkins*" ]
```

Aquí tiene un ejemplo para un contenedor:

```shell
exec.file.name not in ["vault"] && container.id == "ca5534a51dd04bbcebe9b23ba05f389466cf0c190f1f8f182d7eea92a9671d00"
```

El contenedor `id` de este ejemplo genera eventos solo para ese contenedor.

Si desea generar un evento para cualquier contenedor que ejecute un proceso que no sea `vault`, la expresión sería:

```shell
exec.file.name not in ["vault"] && container.id == ""
```

## Detección de anomalías dinámicas {#detection-for-dynamic-anomalies}

<div class="alert alert-info">La detección de anomalías dinámicas solo es compatible con contenedores.</div>

Si no desea crear una lista de procesos permitidos al consultar procesos, puede crear una regla personalizada para consultar eventos de desviación de forma dinámica.

La consulta de la regla personalizada es `@agent.rule_id:anomaly_detection`. 

Si desea consultar anomalías en una imagen de contenedor en particular, puede usar la etiqueta `image_name`. Por ejemplo, `@agent.rule_id:anomaly_detection image_name:IMAGE_NAME`.

{{< img src="/security/cloud_security_management/guide/csm_threats_anomaly_image_query.png" alt="consultar anomalías en una imagen de contenedor en particular" style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together