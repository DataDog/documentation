---
title: Setting file permissions for rotating logs (linux)
kind: faq
further_reading:
- link: "/logs/faq/log-parsing-best-practice"
  tag: "FAQ"
  text: Log Parsing - Best Practice
- link: "/logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "/logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
---

The datadog agent runs under the dd-agent user and dd-agent group. This prevents dd-agent accessing the logs in `/var/log` as they are only accessible by root (or a sudo admin).

## Setting permissions using ACL's

In order to allow read only access for dd-agent only, [create ACL's and modify logrotate to persist the permissions changes](https://help.ubuntu.com/community/FilePermissionsACLs).

### Verifying ACL's are enabled on your system

[ACL's needs to be enabled](https://www.tecmint.com/secure-files-using-acls-in-linux/) on your file system to set permissions using the methods outlined in this article.  Verify ACL's are enabled by using the`getfacl` and `setfacl` commands to set permissions for the dd-agent user on a test directory, for example:

```
mkdir /var/log/test-dir
getfacl /var/log/test-dir/
setfacl -m u:dd-agent:rx /var/log/test-dir
getfacl /var/log/test-dir/
```

The permissions set for dd-agent appears in the output of getfacl if ACL's are enabled.

{{< img src="logs/faq/setting_file_permission.png" alt="Setting file permission" responsive="true" popup="true">}}

### Granting dd-agent read and execute permissions on log directories

Once you have verified ACL's are enabled, grant read and execute permissions for the dd-agent user on the appropriate directories for log collection.  For example, to grant access to `/var/log/apache` , run:

```
setfacl -m u:dd-agent:rx /var/log/apache
```

[Learn more about how to configure ACLs on linux]( http://xmodulo.com/configure-access-control-lists-acls-linux.html)

### Setting permissions for log file rotation

[Setting the permissions](http://bencane.com/2012/05/27/acl-using-access-control-lists-on-linux/) once will not persist for rotating logs, as logrotate does not re-apply the ACL setting. For a more permanent solution add a rule to logrotate to reset the ACL in a new file:

```
sudo touch /etc/logrotate.d/dd-agent_ACLs
```

Example file:

```
{
 postrotate
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/apache
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/nginx
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/myapp
 endscript
}
```

Check the ACL status of a file with:

```
getfacl /var/log/<application-directory>
```


## Setting permissions when ACL's are not present

When ACLs are not present in a system, set your permissions based on group access.  

For instance, if your MySQL service is logging to the following locations:

```
/var/log/mysql/mysql_error.log
/var/log/mysql/mysql-slow.log
```

Their permissions are associated with user 'mysql' and the group 'mysql' by default. This logging scheme denies access to the log file to any user not in the 'mysql' group. Typically you may see something like this:

```
$ ls -l /var/log | grep -i mysql
drwxr-x--- 2 mysql mysql 4096 Feb 20 06:25 mysql
```

The easiest path here is to give everyone the read access to ht file in the logrotate configuration:

```
/var/log/mysql/mysql_error.log /var/log/mysql/mysql-slow.log {

        daily
        rotate 7
        missing ok
        create 644 mysql adm
        Compress
}
```

Each common-off-the-shelf application will follow a similar nomenclature. The advantage is that we avoid providing privileged access to an individual account and use a standardized practice. This will keep your audit rules in check.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}