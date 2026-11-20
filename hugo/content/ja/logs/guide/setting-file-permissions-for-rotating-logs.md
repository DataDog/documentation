---
aliases:
- /ja/logs/faq/setting-file-permissions-for-rotating-logs
further_reading:
- link: /logs/guide/log-parsing-best-practice/
  tag: FAQ
  text: ログのパース - ベストプラクティス
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
title: ログローテーションのためのファイルアクセス許可の設定 (Linux)
---

Datadog Agent は、`dd-agent` ユーザーおよび `dd-agent` グループの下で実行されるため、`/var/log` 内のログにアクセスできません。デフォルトでは、これらのファイルにはルート (または sudo 管理者) しかアクセスできないからです。

## ACL を使用したアクセス許可の設定

`datadog-agent` だけに読み取り専用アクセスを許可するには、[ACL を作成し、logrotate を変更してアクセス許可の変更を永続化します][1]。

### システムで ACL が有効かどうかを検証する

この記事で説明する方法を使用してアクセス許可を設定するには、ファイルシステムで [ACL が有効になっている必要があります][2]。ACL が有効になっていることを確認するには、次のように、`getfacl` コマンドと `setfacl` コマンドを使用して、`datadog-agent` ユーザーにテストディレクトリに対するアクセス許可を設定してみます。

```shell
mkdir /var/log/test-dir
getfacl /var/log/test-dir/
setfacl -m u:dd-agent:rx /var/log/test-dir
getfacl /var/log/test-dir/
```

ACL が有効になっている場合は、`datadog-agent` に設定されたアクセス許可が getfacl の出力に表示されます。

{{< img src="logs/faq/setting_file_permission.png" alt="ファイルアクセス許可の設定" >}}

### ログディレクトリに対する読み取りおよび実行アクセス許可を dd-agent に付与する

ACL が有効になっていることを確認したら、適切なログ収集用ディレクトリに対する読み取りおよび実行アクセス許可を `datadog-agent` ユーザーに付与します。たとえば、`/var/log/apache` へのアクセス許可を付与するには、次のコマンドを実行します。

```shell
setfacl -m u:dd-agent:rx /var/log/apache
```

[Linux で ACL を構成する方法については、こちらを参照してください][3]。

### ログファイルローテーションに対応したアクセス許可を設定する

logrotate は ACL の設定を再適用しないため、一度[アクセス許可を設定][4]しても、ログがローテーションすると設定が無効になります。より永続的な解決方法としては、新しいファイルで ACL を再設定する規則を logrotate に追加します。

```shell
sudo touch /etc/logrotate.d/dd-agent_ACLs
```

ファイル例:

```text
/var/log/apache/*.log {
 postrotate
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/apache/access.log
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/apache/error.log
 endscript
}
```

次のコマンドで、ファイルの ACL ステータスをチェックします。

```text
getfacl /var/log/apache/access.log
```

**注**: **PostgreSQL v10** 以前の場合、アクセス許可を **0700** に設定します。**PostgreSQL v11** の場合は、**0700** または **0750** を設定します。0700 または 0750 とは異なるアクセス許可を持つ基本データフォルダーでサーバーを起動しようとすると、postmater プロセスが失敗します。

**注**: PostgreSQL のログディレクトリは、ベースとなる PostgreSQL のインストールと同じディレクトリに配置できません。

## ACL がない場合のアクセス許可の設定

システムに ACL がない場合は、グループアクセスに基づいてアクセス許可を設定します。

たとえば、MySQL サービスが次の場所にログを記録しているとします。

```text
/var/log/mysql/mysql_error.log
/var/log/mysql/mysql-slow.log
```

これらのアクセス許可は、デフォルトでは、ユーザー 'mysql' とグループ 'mysql' に関連付けられています。このログスキームは、'mysql' グループに属していないユーザーからログファイルへのアクセスを拒否します。通常は、次のように表示されます。

```text
$ ls -l /var/log | grep -i mysql
drwxr-x--- 2 mysql mysql 4096 Feb 20 06:25 mysql
```

この場合の最も簡単な解決方法は、logrotate 構成で、すべての人にファイルへの読み取りアクセス許可を付与することです。

```text
/var/log/mysql/mysql_error.log /var/log/mysql/mysql-slow.log {

        daily
        rotate 7
        missingok
        create 644 mysql adm
        compress
}
```

一般的な市販アプリケーションは、どれもこれに似た方式に依っています。この利点は、個別のアカウントに特権的なアクセスを提供する必要がなく、標準化された方法を使用できる点です。これで、監査規則をシンプルにすることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.ubuntu.com/community/FilePermissionsACLs
[2]: https://www.tecmint.com/secure-files-using-acls-in-linux
[3]: http://xmodulo.com/configure-access-control-lists-acls-linux.html
[4]: http://bencane.com/2012/05/27/acl-using-access-control-lists-on-linux