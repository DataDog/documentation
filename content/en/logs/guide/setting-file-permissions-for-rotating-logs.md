---
title: Setting file permissions for rotating logs (Linux)

aliases:
  - /logs/faq/setting-file-permissions-for-rotating-logs
further_reading:
- link: "/logs/guide/log-parsing-best-practice/"
  tag: "FAQ"
  text: "Log Parsing - Best Practice"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
---

The Datadog Agent runs under the `dd-agent` user and `dd-agent` group. This prevents the Datadog Agent from accessing the logs in `/var/log` as they are only accessible by root (or a sudo admin).

## Setting permissions using ACLs

To allow read-only access for the `dd-agent` user, create [access control lists (ACLs)][1] and modify logrotate to persist the permission changes.

### Verifying ACLs are enabled on your system

[ACLs need to be enabled][2] on your file system to set permissions using the methods outlined in this article. Verify ACLs are enabled by using the`getfacl` and `setfacl` commands to set permissions for the `dd-agent` user on a test directory, for example:

```shell
mkdir /var/log/test-dir
getfacl /var/log/test-dir/
setfacl -m u:dd-agent:rx /var/log/test-dir
getfacl /var/log/test-dir/
```

The permissions set for `dd-agent` appears in the output of getfacl if ACLs are enabled.

{{< img src="logs/faq/setting_file_permission.png" alt="Setting file permission" >}}

### Granting dd-agent read and execute permissions on log directories

After you verify ACLs are enabled, grant read and execute permissions for the `dd-agent` user on the appropriate directories for log collection. A plain `setfacl -m` command applies the ACL only to the directory itself, not to the log files already inside it. Use the `-R` (recursive) flag to also grant access to existing files. For example, to grant access to `/var/log/apache`, run:

```shell
setfacl -R -m u:dd-agent:rx /var/log/apache
```

To have new log files inherit this access automatically, set a default ACL on the directory with the `-d` flag:

```shell
setfacl -R -d -m u:dd-agent:rx /var/log/apache
```

A default ACL only applies to files created in the directory after the default has been set, including those that log rotation creates. This reduces the need for a separate logrotate rule. Files that already exist when you set the default ACL are unaffected, so run both commands above.

[Learn more about how to configure ACLs on Linux][3]

### Setting permissions for log file rotation

If you set a default ACL with the `-d` flag, log files created by a rotation inherit `dd-agent` access automatically, and no further configuration is required. However, a default ACL does not cover every rotation scheme. For example, a configuration that uses `copytruncate` keeps the original file (and its ACL) in place rather than creating a new file.

When a default ACL does not apply to your setup, add a rule to logrotate to reset the ACL after each rotation. Avoid defining a rule for log files that another logrotate configuration already manages, because logrotate reports an `error: duplicate log entry for <FILE>` message when two configurations match the same file. Instead, add a `postrotate` script to the service's existing configuration, or create a separate file for paths that are not already managed:

```shell
sudo touch /etc/logrotate.d/dd-agent_ACLs
```

Example file:

```text
/var/log/apache/*.log {
 postrotate
 /usr/bin/setfacl -m u:dd-agent:rx /var/log/apache/access.log
 /usr/bin/setfacl -m u:dd-agent:rx /var/log/apache/error.log
 endscript
}
```

Check the ACL status of a file with:

```text
getfacl /var/log/apache/access.log
```

**Note**: For **PostgreSQL v10** and older, set the permission to **0700**. For **PostgreSQL v11**, set either **0700** or **0750**. Trying to start a server with a base data folder that has permissions different from 0700 or 0750 will result in a failure of the postmater process.

**Note**: The PostgreSQL logging directory cannot be located in the same directory as the base PostgreSQL installation.

## Setting permissions when ACLs are not present

When ACLs are not present in a system, set your permissions based on group access.

For instance, if your MySQL service is logging to the following locations:

```text
/var/log/mysql/mysql_error.log
/var/log/mysql/mysql-slow.log
```

Their permissions are associated with user 'mysql' and the group 'mysql' by default. This logging scheme denies access to the log file to any user not in the 'mysql' group. Typically you may see something like this:

```text
$ ls -l /var/log | grep -i mysql
drwxr-x--- 2 mysql mysql 4096 Feb 20 06:25 mysql
```

The easiest path here is to give everyone read access to the file in the logrotate configuration:

```text
/var/log/mysql/mysql_error.log /var/log/mysql/mysql-slow.log {

        daily
        rotate 7
        missingok
        create 644 mysql adm
        compress
}
```

Each common off-the-shelf application will follow a similar nomenclature. The advantage is that you avoid providing privileged access to an individual account and use a standardized practice. This keeps your audit rules in check.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.ubuntu.com/community/FilePermissionsACLs
[2]: https://www.tecmint.com/secure-files-using-acls-in-linux
[3]: https://www.xmodulo.com/configure-access-control-lists-acls-linux.html
