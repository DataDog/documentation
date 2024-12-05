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

In order to allow read-only access for `datadog-agent` only, [create ACLs and modify logrotate to persist the permissions changes][1].

### Verifying ACLs are enabled on your system

[ACLs needs to be enabled][2] on your file system to set permissions using the methods outlined in this article. Verify ACLs are enabled by using the`getfacl` and `setfacl` commands to set permissions for the `datadog-agent` user on a test directory, for example:

```shell
mkdir /var/log/test-dir
getfacl /var/log/test-dir/
setfacl -m u:dd-agent:rx /var/log/test-dir
getfacl /var/log/test-dir/
```

The permissions set for `datadog-agent` appears in the output of getfacl if ACLs are enabled.

{{< img src="logs/faq/setting_file_permission.png" alt="Setting file permission" >}}

### Granting dd-agent read and execute permissions on log directories

Once you have verified ACLs are enabled, grant read and execute permissions for the `datadog-agent` user on the appropriate directories for log collection. For example, to grant access to `/var/log/apache` , run:

```shell
setfacl -m u:dd-agent:rx /var/log/apache
```

[Learn more about how to configure ACLs on linux][3]

### Setting permissions for log file rotation

[Setting the permissions][4] once will not persist for rotating logs, as logrotate does not re-apply the ACL setting. For a more permanent solution add a rule to logrotate to reset the ACL in a new file:

```shell
sudo touch /etc/logrotate.d/dd-agent_ACLs
```

Example file:

```text
/var/log/apache/*.log {
 postrotate
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/apache/access.log
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/apache/error.log
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
[3]: http://xmodulo.com/configure-access-control-lists-acls-linux.html
[4]: http://bencane.com/2012/05/27/acl-using-access-control-lists-on-linux
