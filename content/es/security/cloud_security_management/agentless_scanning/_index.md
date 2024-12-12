---
aliases:
- /es/security/agentless_scanning
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning
  tag: Documentación
  text: Configuración de Agentless Scanning
- link: https://www.datadoghq.com/blog/agentless-scanning/
  tag: Blog
  text: Detectar vulnerabilidades en minutos con Agentless Scanning para Cloud Security
    Management
- link: /security/vulnerabilities
  tag: Documentación
  text: Más información sobre CSM Vulnerabilities
title: Agentless Scanning de Cloud Security Management
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Agentless Scanning para Cloud Security Management no es compatible con tu <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Información general

Agentless Scanning brinda visibilidad de la vulnerabilidades que existen en tus hosts de AWS, contenedores en ejecución, funciones de Lambda e Amazon Machine Images (AMIs) sin necesidad de instalar el Datadog Agent. Datadog recomienda habilitar Agentless Scanning como el primer paso para obtener una visibilidad completa de tus recursos en la nube y, luego, instalar el Datadog Agent en tus activos principales en un contexto de seguridad y observabilidad detallado.

## Disponibilidad

La siguiente tabla brinda un resumen de tecnologías de Agentless Scanning en relación con sus componentes correspondientes:

| Componente | Tecnología compatible |
|-----------------------------|-------------------------------------------------------------|
| Proveedor en la nube | AWS |
| Sistema operativo | Linux |
| Sistema de archivos de host | Btrfs, Ext2, Ext3, Ext4, xfs |
| Gestor de paquetes | Deb (debian, ubuntu)<br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine) |
| Cifrado | AWS </br> No cifrado </br> Cifrado - Platform Managed Key (PMK) </br> **Nota**: Cifrado - Customer Managed Key (CMK) **no** es compatible |
| Tiempo de ejecución del contenedor | Docker, containerd </br> **Nota**: CRI-O **no** es compatible |
| Serverless | AWS, AWS Lambda |
| Lenguajes serverless | .Net, Python, Java, Ruby, Node.js, Go |

## Cómo funciona

Después de [configurar Agentless scanning][1] para tus recursos, Datadog programa escaneos automatizados en intervalos de 12 horas mediante la [Configuración remota][2]. Durante un ciclo de escaneo, Agentless scanners reúne dependencias de código de Lambda y crea instantáneas de tus instancias de EC2. Con estas instantáneas, los Agentless scanners escanean, generan y trasmiten una lista de paquetes a Datadog para comprobar las vulnerabilidades, junto con las dependencias principales de Lambda. Cuando se completan escaneos de una instantánea, esta se elimina. Nunca se trasmite información confidencial o personal privada fuera de tu infraestructura.

El siguiente diagrama muestra cómo funciona Agentless Scanning:

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagrama que muestra cómo funciona Agentless Scanning" width="90%" >}}

1. Datadog programa un escaneo y envía qué recursos escanear mediante la configuración remota.

**Nota**: Los escaneos programados ignoran los hosts que ya tienen [Datadog Agent instalado con Cloud Security Management activado](#agentless-scanning-with-existing-agent-installations). Datadog programa un segundo escaneo continuo de los recursos cada 12 horas para brindar información actualizada de las posibles vulnerabilidades y debilidades.

2. Para las funciones de Lambda, los escáneres buscan el código de la función.
3. El escáner crea instantáneas de volúmenes de EBS utilizadas por instancias de EC2. Estas instantáneas funcionan como la base para realizar escaneos. Mediante las instantáneas, o el código, el escáner genera una lista de paquetes.
4. Después de terminar el escaneo, la lista de los paquetes y la información relacionada con los hosts recopilados (nombres de hosts/instancias de EC2) se trasmiten a Datadog, con todos los otros datos restantes dentro de tu infraestructura. Las instantáneas creadas durante el ciclo de escaneo se eliminan.
5. Con la lista de paquetes recopilados y el acceso de Datadog a la base de datos de vulnerabilidades de Trivy, Datadog encuentra vulnerabilidades coincidentes en tus recursos y código.

**Notas**:
- El escáner funciona como una instancia de EC2 independiente dentro de tu infraestructura, asegurando el mínimo impacto posible en los sistemas y recursos.
- El escáner recopila de forma segura una lista de paquetes desde tus hosts sin trasmitir información confidencial o personal privada fuera de tu infraestructura.
- El escáner limita su uso de la API de AWS para evitar llegar al límite de tasa de AWS y usa un refuerzo exponencial si es necesario.

## Qué datos se envían a Datadog
El Agentless scanner usa el formato OWASP [cycloneDX][3] para trasmitir una lista de paquetes a Datadog. No se trasmite ninguna información confidencial o personal privada fuera de tu infraestructura.

Datadog **no** envía:
- Configuraciones de sistema y paquete
- Certificados y claves de cifrado
- Seguimientos de logs y auditoría
- Datos empresariales confidenciales

## Consideraciones de seguridad

Dado que las instancias del escáner conceden [permisos][4] para crear y copiar instantáneas de EBS y describir volúmenes, Datadog sugiere restringir el acceso a esas instancias únicamente a usuarios administrativos. 

Para mitigar más el riesgo, Datadog implementa las siguientes medidas de seguridad:

- El escáner de Datadog opera _dentro_ de tu infraestructura, de manera que asegura que todos los datos, incluidas instantáneas y listas de paquetes, permanezcan aislados y seguros.
- Toda la trasmisión de datos entre el escáner y Datadog está cifrada con los protocolos estándar del sector (como HTTPS) para asegurar la confidencialidad e integridad de los datos.
- El escáner de Datadog opera bajo el principio de privilegio mínimo. Esto significa que se concede solo el permiso mínimo necesario para realizar sus funciones previstas de forma eficaz.
- Datadog revisa y limita en detalle los permisos que concede al escáner para asegurar que se realicen los escaneos sin tener que acceder a datos o recursos confidenciales.
- Las actualizaciones de seguridad automáticas están activadas en las instancias del escáner de Datadog. Esta función automatiza el proceso de instalar actualizaciones y parches de seguridad críticos sin necesidad de intervención manual.
- Las instancias del escáner de Datadog se rotan automáticamente cada 24 horas. La rotación asegura que las instancias del escáner estén actualizadas con las Ubuntu Amazon Machine Images (AMIs) más recientes.
- El acceso a las instancias del escáner está controlado mediante los grupos de seguridad. No se permite ningún acceso entrante al escáner, para limitar el compromiso de la instancia.
- No se transmite ninguna información confidencial o personal privada fuera de tu infraestructura.

## Agentless Scanning con las instalaciones existentes del Agent

Una vez instalado, el Datadog Agent ofrece visibilidad detallada en tiempo real de los riesgos y las vulnerabilidades que existen en tus cargas de trabajo en la nube. Se recomienda instalar el Datadog Agent por completo.

Como resultado, Agentless Scanning excluye de los escaneos los recursos que tienen instalado el Datadog Agent y configurado para [Vulnerability Management][5]. De esta manera, Cloud Security Management ofrece una visibilidad completa de la situación de riesgo sin anular los beneficios que se obtienen de la instalación del Datadog Agent con Vulnerability Management.

El siguiente diagrama demuestra cómo funciona Agentless scanning con las instalaciones existentes del Agent:

{{< img src="/security/agentless_scanning/agentless_existing.png" alt="Diagrama que muestra cómo funciona Agentless scanning cuando el Agent ya está instalado con CSM vulnerability management" width="90%" >}}

## Seguridad de datos

<div class="alert alert-warning">La Seguridad de datos está en fase beta privada. Para inscribirte en la fase beta privada, <a href="https://www.datadoghq.com/private-beta/data-security">regístrate aquí</a>.</div>

Si tienes activados [Sensitive Data Scanner][8] y [Cloud Security Management][9], puedes utilizar Data Security para localizar datos confidenciales y solucionar problemas de seguridad que afecten a los buckets de AWS S3 y las instancias de RDS.

Los escáneres de la Seguridad de los datos busca datos confidenciales desplegando [Agentless scanners][1] en tu entornos en la nube. Estas instancias de escaneo recuperan una lista de todos los buckets S3 e instancias RDS a través de la [Configuración remota][10], y han establecido instrucciones para analizar archivos de texto, como CSV y JSON, y tablas en cada almacén de datos a lo largo del tiempo. La Seguridad de datos aprovecha las reglas proporcionadas por Sensitive Data Scanner para encontrar coincidencias. Cuando se encuentra una coincidencia, la localización de la coincidencia se envía a Datadog mediante la instancia de escaneo. Los almacenes de datos y sus archivos solo se leen en tu entorno; ningún dato confidencial se envía de vuelta a Datadog.

Además de mostrar las coincidencias de datos confidenciales, la Seguridad de datos muestra cualquier problema de seguridad detectado por Cloud Security Management que afecte a los almacenes de datos confidenciales. Puedes hacer clic en cualquier problema para continuar el análisis y la corrección dentro de Cloud Security Management.

## Coste del proveedor de servicio en la nube

Cuando se utiliza Agentless Scanning, hay costes adicionales para ejecutar escáneres en tu entornos en la nube. Para optimizar los costes y, al mismo tiempo, poder escanear de forma fiable cada 12 horas, Datadog recomienda configurar [Agentless Scanning con Terraform][6] como plantilla predeterminada, ya que así también se evitan las generación de redes entre regiones. 

Para establecer estimaciones sobre los costes del escáner, ponte en contacto con tu [gerente de Éxito del cliente de Datadog.][7]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/setup/agentless_scanning
[2]: /es/agent/remote_config/?tab=configurationyamlfile
[3]: https://cyclonedx.org/
[4]: /es/security/cloud_security_management/setup/agentless_scanning/#permissions
[5]: https://app.datadoghq.com/security/csm/vm
[6]: /es/security/cloud_security_management/setup/agentless_scanning#terraform
[7]: mailto:success@datadoghq.com
[8]: /es/sensitive_data_scanner
[9]: /es/security/cloud_security_management
[10]: /es/agent/remote_config