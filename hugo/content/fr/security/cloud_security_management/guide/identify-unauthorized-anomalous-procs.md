---
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: Documentation
  text: Création de règles de détection personnalisées
title: Identification des processus non autorisés et anormaux
---
Vous pouvez utiliser Workload Protection pour identifier si des processus non autorisés ou anormaux sont en cours d'exécution ou exécutés sur vos systèmes informatiques.

Par exemple, vous pouvez créer une liste d'autorisation de processus et interroger les processus s'exécutant sur des hosts et des conteneurs en dehors de cette liste. 

Dans Workload Protection, vous pouvez [définir des règles personnalisées][1] pour surveiller les exécutions de processus à la recherche d'activités malveillantes sur des hosts ou des conteneurs en temps réel. Vous pouvez définir une liste de noms de processus et/ou d'arguments qui générera un signal de sécurité pouvant être utilisé pour avertir les utilisateurs.

Ce guide vous montre comment interroger des processus non autorisés et anormaux en utilisant des listes d'autorisation statiques et dynamiques comme exemples.

## Détection des processus ne figurant pas sur une liste d'autorisation {#detection-for-processes-not-on-an-allowlist}

Vous pouvez créer une détection pour les processus qui ne figurent pas sur une liste d'autorisation connue.

Voici un exemple pour un host :

```shell
exec.file.name not in [ "0anacron", "agent", "aide", "airflow", "anacron", "appstart.sh", "appstop.sh", "arping", "aws", "awslogs-nanny.sh", "basename", "bash", "blkid", "bounce", "capsh", "cat", "certwatch", "chcon", "chmod", "chown", ~"*chrony", "chronyc", ~"*chrony-dhcp", "chrony-helper", ~"*chrony-onoffline", "classification_move_archive.sh", "cleanup", "clear", "consoletype", "consul", "cp", "curl", "cut", "date", "dbus-send", "df", ~"*dhclient", "dhclient-script", "dircolors", "dirname", "dmidecode", "dnf-3", "du", "echo", "embedded_logrotate.sh", "ethtool", "file", "find", "findmnt", "flock", "gawk", "getconf", "git", "gpg", "gpg2", "gpgconf", "gpgsm", "grep", "grepconf.sh", "groupadd", "grub2-set-bootflag", "gzip", "head", "hostname", "hostnamectl", "httpd", "httpd_daily_logs_gzip.sh", "iconv", "id", "ionice", "ip", "ipcalc", "java", "java_version.sh", "jboss_66_log_rotate.sh", "ldconfig", "less", "ln", "local", "locale", "logger", "logrotate", "ls", "lsattr", "lsblk", "lscpu", "lspci", "mandb", "man-db.cron", "md5sum", "mkdir", "mktemp", "mlocate", "mon-put-instance-data.pl", "more", "moveFilesFromSourceToTarget.sh", "mv", ~"*netreport", "nice", "nm-cloud-setup", ~"*nm-cloud-setup.sh", "nm-dhcp-helper", "nm-dispatcher", "nohup", "on_ac_power", "oracle", "perl", "pickup", "pip", "postdrop", "printenv", "proxymap", "ps", "psql", "pyenv", ~"pyenv-*", ~"python*", "python2.7", "python3.9", "readlink", "renice", "rhn_check-2.7", "rhsmcertd-worker", "rm", "rmdir", "rpm", "rsync", "run-parts", "sa1", "sa2", "sadc", "sar", "_script.sh", "sed", ~"*sendmail", "sendmail.postfix", "setup-policy-routes", "sftp-server", "sg_inq", "sleep", "smtp", "smtpd", "snowsql", "sort", "sqlite3", "ssh", "sshd", "ssm-document-worker", "ssm-session-worker", "stat", "su", "sudo", "systemctl", "systemd", "systemd-coredump", ~"*systemd-environment-d-generator", "systemd-hostnamed", "systemd-networkd-wait-online", "systemd-tmpfiles", "systemd-tty-ask-password-agent", "systemd-user-runtime-dir", "systemd-userwork", "systemd-xdg-autostart-generator", "tail", "tar", "time", "tlsmgr", "touch", "tput", "tr", "trivial-rewrite", "tty", "udevadm", "uname", "unbound-anchor", "unix_chkpwd", "unzip_rename_files.sh", "updatedb", "updater", "urlgrabber-ext-down", "useradd", "usermod", "vault", "vi", "wc", "which", "wkhtmltoimage", "xargs", "yum", "ping", "get_latest_version.sh", ~"rbenv*", "uniq", "diff", "ruby", "get_hosts_for_app_component.sh", "update_health_status.rb", "check.pl", "check_all_pool_db_version.rb", ~"gitaly-git-v*", ~"gitlab-*", "upload_host_info.rb", "sshpass", ~"splunk*", "killall5", "php", "run", "env", "chpst", ~"jenkins*" ]
```

Voici un exemple pour un conteneur :

```shell
exec.file.name not in ["vault"] && container.id == "ca5534a51dd04bbcebe9b23ba05f389466cf0c190f1f8f182d7eea92a9671d00"
```

Le conteneur `id` de cet exemple génère des événements pour ce conteneur uniquement.

Si vous souhaitez générer un événement pour tout conteneur qui exécute un processus qui n'est pas `vault`, l'expression serait :

```shell
exec.file.name not in ["vault"] && container.id == ""
```

## Détection des anomalies dynamiques {#detection-for-dynamic-anomalies}

<div class="alert alert-info">La détection des anomalies dynamiques n'est prise en charge qu'avec les conteneurs.</div>

Si vous ne souhaitez pas créer de liste d'autorisation lors de l'interrogation des processus, vous pouvez créer une règle personnalisée pour interroger les drift events de manière dynamique.

La requête de règle personnalisée est `@agent.rule_id:anomaly_detection`. 

Si vous souhaitez interroger des anomalies dans une image de conteneur particulière, vous pouvez utiliser le tag `image_name`. Par exemple, `@agent.rule_id:anomaly_detection image_name:IMAGE_NAME`.

{{< img src="/security/cloud_security_management/guide/csm_threats_anomaly_image_query.png" alt="interroger des anomalies dans une image de conteneur particulière" style="width:100%;" >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together