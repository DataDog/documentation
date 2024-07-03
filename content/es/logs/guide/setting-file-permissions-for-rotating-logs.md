---
aliases:
- /es/logs/faq/setting-file-permissions-for-rotating-logs
further_reading:
- link: /logs/guide/log-parsing-best-practice/
  tag: FAQ
  text: Análisis de logs - Prácticas recomendadas
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprender a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtener más información sobre los análisis
kind: guía
title: Configuración de permisos de archivos para la rotación de logs (Linux)
---

El Datadog Agent se ejecuta con el usuario `dd-agent` y el grupo `dd-agent`. Esto impide que el Datadog Agent acceda a logs en `/var/log`, ya que sólo son accesibles por un administrador raíz (o un administrador sudo).

## Configurar permisos mediante ACL

Para permitir el acceso de sólo lectura sólo a `datadog-agent`, [crea las ACL y modifica logrotate para conservar los cambios de los permisos][1].

### Comprobar que las ACL están habilitadas en tu sistema

[Es necesario que las ACL estén habilitadas][2] en tu sistema de archivos para configurar permisos utilizando los métodos descritos en este artículo. Verifica que las ACL están habilitadas utilizando los comandos `getfacl` y `setfacl` para configurar permisos para el usuario `datadog-agent` en un directorio de test, por ejemplo:

```shell
mkdir /var/log/test-dir
getfacl /var/log/test-dir/
setfacl -m u:dd-agent:rx /var/log/test-dir
getfacl /var/log/test-dir/
```

Si las ACL están habilitadas, los permisos configurados para `datadog-agent` aparecen en el resultado de getfacl.

{{< img src="logs/faq/setting_file_permission.png" alt="Configuración de permisos de archivos" >}}

### Concesión de permisos de lectura y ejecución en directorios de logs a dd-agent

Una vez que hayas verificado que las ACL están habilitadas, concede permisos de lectura y ejecución al usuario `datadog-agent` en los directorios apropiados para la recopilación de logs. Por ejemplo, para conceder acceso a `/var/log/apache`, ejecuta:

```shell
setfacl -m u:dd-agent:rx /var/log/apache
```

[Obtener más información sobre cómo configurar las ACL en Linux][3]

### Configuración de permisos para la rotación de archivos de logs

[Configurar los permisos][4] una vez no servirá para la rotación de logs, ya que logrotate no vuelve a aplicar la configuración de ACL. Para obtener una solución más permanente, añade una regla a logrotate para restablecer la ACL en un nuevo archivo:

```shell
sudo touch /etc/logrotate.d/dd-agent_ACLs
```

Archivo de ejemplo:

```text
/var/log/apache/*.log {
 postrotate
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/apache/access.log
 /usr/bin/setfacl -m g:dd-agent:rx /var/log/apache/error.log
 endscript
}
```

Comprueba el estado de la ACL de un archivo con:

```text
getfacl /var/log/apache/access.log
```

**Nota**: Para **PostgreSQL v10** y versiones anteriores, configura el permiso en **0700**. Para **PostgreSQL v11**, configúralo en **0700** o **0750**. Intentar iniciar un servidor con una carpeta de datos base que tenga permisos diferentes de 0700 o 0750 resultará en un fallo del proceso postmater.

**Nota**: El directorio de gestión de logs de PostgreSQL no puede estar ubicado en el mismo directorio que la instalación base de PostgreSQL.

## Configuración de permisos cuando las ACL no están presentes

Cuando las ACL no estén presentes en un sistema, configura tus permisos basándote en el acceso de grupo.

Por ejemplo, si tu servicio MySQL está gestionando logs en las siguientes localizaciones:

```text
/var/log/mysql/mysql_error.log
/var/log/mysql/mysql-slow.log
```

Sus permisos están asociados al usuario 'mysql' y al grupo 'mysql' por defecto. Este esquema de gestión de logs deniega el acceso al archivo de logs a cualquier usuario que no pertenezca al grupo 'mysql'. Por lo general, es posible que veas algo así:

```text
$ ls -l /var/log | grep -i mysql
drwxr-x--- 2 mysql mysql 4096 Feb 20 06:25 mysql
```

En este caso, el camino más fácil es proporcionar a todos acceso de lectura al archivo en la configuración de logrotate:

```text
/var/log/mysql/mysql_error.log /var/log/mysql/mysql-slow.log {

        daily
        rotate 7
        missingok
        create 644 mysql adm
        compress
}
```

Cada aplicación existente seguirá una nomenclatura similar. La ventaja es que evitas proporcionar acceso privilegiado a una cuenta individual y utilizas una práctica estandarizada. Esto te ayuda a mantener tus reglas de auditoría bajo control.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.ubuntu.com/community/FilePermissionsACLs
[2]: https://www.tecmint.com/secure-files-using-acls-in-linux
[3]: http://xmodulo.com/configure-access-control-lists-acls-linux.html
[4]: http://bencane.com/2012/05/27/acl-using-access-control-lists-on-linux