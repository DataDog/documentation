---
aliases:
- /es/security/agentless_scanning
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning/quick_start
  tag: Documentación
  text: Inicio rápido de Agentless Scanning para Cloud Security Management
- link: /security/cloud_security_management/setup/agentless_scanning/terraform
  tag: Documentación
  text: Configuración de Agentless Scanning utilizando Terraform
- link: /security/cloud_security_management/setup/agentless_scanning/cloudformation
  tag: Documentación
  text: Configuración de Agentless Scanning con la integración AWS
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
<div class="alert alert-warning">Agentless Scanning para Cloud Security Management no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Información general

Agentless Scanning proporciona visibilidad de las vulnerabilidades que existen en tu infraestructura en la nube, sin necesidad de instalar el Datadog Agent . Datadog recomienda activar Agentless Scanning como primer paso para obtener una visibilidad completa de tus recursos en la nube y luego instalar el Datadog Agent en tus activos principales con el tiempo para obtener un contexto de seguridad y observabilidad más profundo.

## Disponibilidad

La siguiente tabla proporciona un resumen de las tecnologías Agentless scanning en relación con tus componentes correspondientes para cada proveedor de la nube compatible:

| Componente                                       | AWS                                                                                                                                       | Azure                                                                                                                                                                             |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Registros del contenedor                            | Registros públicos de ECR </br> Registros privados de ECR                                                                                        | -                                                                                                                                                                             |
| Sistema operativo                                | Linux                                                                                                                                     | Linux                                                                                                                                                                             |
| Sistema de archivos del host                                 | Btrfs, Ext2, Ext3, Ext4, xfs                                                                                                              | Btrfs, Ext2, Ext3, Ext4, xfs                                                                                                                                                      |
| Gestor de paquetes                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                                                    | Deb (Debian, Ubuntu) <br> RPM (Fedora, redhat, CentOS) <br> APK (alpine)                                                                                                          |
| Cifrado                                      | AWS </br> Sin cifrar </br> Cifrado - Clave gestionada por la plataforma (PMK) </br> Cifrado - Clave gestionada por el cliente (CMK)                           | Cifrado - Clave gestionada por plataforma (PMK): Cifrado del lado del servidor de almacenamiento en el disco Azure, Cifrado en host </br> **Nota**: Cifrado - Clave gestionada por el cliente (CMK) **no** es compatible. |
| Tiempo de ejecución del contenedor                               | Docker, en contenedor </br> **Nota**: CRI-O **no** es compatible                                                                             | Docker, en contenedor </br> **Nota**: CRI-O **no** es compatible                                                                                                                     |
| Serverless                                      | AWS Lambda                                                                                                                                | Para solicitar esta función, póngase en contacto con [Asistencia técnica de Datadog][12]                                                                                                                                                         |
| Lenguajes de aplicaciones (en hosts y contenedores) | Java.Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                       | Java.Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                               |

**Nota**: Las AMI deben almacenarse en una cuenta que utilice la integración de AWS de Datadog. De lo contrario, Datadog no puede leer el snapshot de Amazon Elastic Block Store (EBS) subyacente de la AMI, por lo que no puede escanear ni generar informes sobre la AMI.

## Cómo funciona

Después de [configurar el Agentless scanning][1] para tus recursos, Datadog programa escaneos automatizados en intervalos de 12 horas a través de la [Configuración remota][2]. Durante un ciclo de escaneo, los escáneres Agentless recopilan dependencias de código Lambda y crean snapshots de tus instancias de VM. Con estos snapshots, los escáneres Agentless escanean, generan y transmiten una lista de paquetes a Datadog para check en busca de vulnerabilidades, junto con dependencias de código Lambda. Una vez finalizados los escaneos de un snapshot, se elimina el snapshot. Nunca se transmite información personal confidencial o privada fuera de tu infraestructura.

El siguiente diagrama ilustra el funcionamiento de Agentless Scanning:

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagrama que muestra el funcionamiento de Agentless Scanning" width="90%" >}}

1. Datadog programa un análisis y determina qué recursos analizar mediante configuración remota.

    **Nota**: Los análisis programados ignoran hosts que ya tienen el [Datadog Agent instalado con Cloud Security Management habilitado](#agentless-scanning-with-existing-Agent-installations). Datadog programa nuevos análisis continuos de los recursos cada 12 horas para proporcionar información actualizada sobre vulnerabilidades y debilidades potenciales.

2. Para las funciones Lambda, los analizadores obtienen el código de la función.
3. Para Container Images de los registros, los escáneres escanean las imágenes de todas las tareas en ejecución, extrayendo las capas de los registros mediante API OCI estándar.

    **Nota**: Las últimas 1000 imágenes publicadas en los registros privados accesibles también se seleccionan para su escaneado.

4. El escáner crea snapshots de volúmenes utilizados en instancias de VM en ejecución. Estos snapshots sirven como base para realizar escaneos. Utilizando los snapshots, o el código, el escáner genera un lista de paquetes.
5. Una vez finalizado el escaneado, la lista de paquetes y la información relacionada con los hosts recopilados se transmiten a Datadog, mientras que el resto de los datos permanece dentro de tu infraestructura. Los snapshots creados durante el ciclo de escaneado se eliminan.
6. Utilizando la lista de paquetes recopilada, junto con el acceso de Datadog a la base de datos de vulnerabilidades de Trivy, Datadog encuentra las vulnerabilidades afectadas coincidentes en tus recursos y código.

**Notas**:
- El escáner funciona como una instancia de VM independiente dentro de tu infraestructura, lo que garantiza un impacto mínimo en los sistemas y recursos existentes.
- El analizador recopila de forma segura una lista de paquetes de tus hosts, sin transmitir ninguna información personal confidencial o privada fuera de tu infraestructura.
- El escáner limita su uso de la API del proveedor de la nube para evitar alcanzar cualquier límite de velocidad y utiliza un backoff exponencial si es necesario.

## Datos que se envían a Datadog
El analizador Agentless utiliza el formato OWASP [cycloneDX][3] para transmitir una lista de paquetes a Datadog. Nunca se transmite información personal confidencial o privada fuera de tu infraestructura.

Datadog **no** envía:
- Configuraciones de sistemas y paquetes 
- Claves de cifrado y certificados
- Logs y registros de auditoría
- Datos empresariales sensibles

## Cuestiones de seguridad

Dado que las instancias de escáner conceden [permisos][4] para crear y copiar snapshots y describir volúmenes, Datadog aconseja restringir el acceso a estas instancias únicamente a los usuarios administrativos.

Para reducir aún más este riesgo, Datadog aplica las siguientes medidas de seguridad:

- El analizador de Datadog funciona _dentro_ de tu infraestructura, garantizando que todos los datos, incluidos los snapshots y la lista de paquetes, permanecen aislados y seguros.
- Toda la transmisión de datos entre el analizador y Datadog se cifra mediante protocolos estándar del sector (como HTTPS) para garantizar la confidencialidad e integridad de los datos.
- El analizador de Datadog opera bajo el principio de mínimo privilegio. Esto significa que sólo se conceden los permisos mínimos necesarios para realizar eficazmente las funciones deseadas.
- Datadog revisa y limita cuidadosamente los permisos concedidos al analizador para garantizar que pueda realizar análisis sin acceder innecesariamente a datos o recursos confidenciales.
- Las actualizaciones de seguridad no supervisadas están habilitadas en las instancias del analizador de Datadog. Esta función automatiza el proceso de instalación de parches y actualizaciones de seguridad críticos sin necesidad de una intervención manual.
- Las instancias de escáner de Datadog se rotan automáticamente cada 24 horas. Esta rotación garantiza que las instancias de escáner se actualicen continuamente con las últimas imágenes de Ubuntu.
- El acceso a las instancias del analizador está estrictamente controlado mediante el uso de grupos de seguridad. No se permite el acceso entrante al analizador, lo que restringe la posibilidad de comprometer la instancia.
- Nunca se transmite información personal confidencial o privada fuera de tu infraestructura.

## Agentless Scanning con instalaciones existentes del Agent 

Una vez instalado, el Datadog Agent ofrece una visibilidad profunda y en tiempo real de los riesgos y las vulnerabilidades existentes en tus cargas de trabajo en la nube. Se recomienda instalar completamente el Datadog Agent.

Como resultado, Agentless Scanning excluye de tus análisis los recursos que tienen instalado y configurado el Datadog Agent para [Vulnerability Management][5]. De este modo, Cloud Security Management te ofrece una visibilidad completa de tu panorama de riesgos sin anular las ventajas de la instalación del Datadog Agent con Vulnerability Management.

El siguiente diagrama muestra cómo funciona Agentless Scanning con las instalaciones existentes del Agent:

{{< img src="/security/agentless_scanning/agentless_existing.png" alt="Diagrama que muestra cómo funciona Agentless Scanning cuando el Agent ya está instalado con CSM Vulnerability Management" width="90%" >}}

## Análisis del almacenamiento en la nube

{{< callout header="Disponibilidad limitada" url="https://www.datadoghq.com/private-beta/data-security" >}}
La compatibilidad del análisis de buckets de Amazon S3 e instancias RDS está en Disponibilidad limitada. Para inscribirte, haz clic en <strong>Request Access</strong> (Solicitar acceso).
{{< /callout >}}

Si tienes activado [Sensitive Data Scanner][8], puedes catalogar y clasificar los datos confidenciales en tus buckets de Amazon S3 e instancias RDS.

Sensitive Data Scanner analiza datos confidenciales desplegando [analizadores Agentless][1] en tus entornos de nube. Estas instancias de análisis recuperan una lista de todos los buckets de S3 e instancias RDS mediante [configuración remota][10] y tienen instrucciones para analizar archivos de texto, como CSV y JSON, y tablas en cada almacén de datos a lo largo del tiempo. Sensitive Data Scanner aprovecha sus [bibliotecas de reglas completas][11] para encontrar coincidencias. Cuando se encuentra una coincidencia, la instancia de análisis envía la localización de la coincidencia a Datadog. Los almacenes de datos y sus archivos sólo se leen en tu entorno. No se reenvía ningún dato confidencial a Datadog.

Además de mostrar las coincidencias de datos confidenciales, Sensitive Data Scanner muestra cualquier problema de seguridad detectado por [Cloud Security Management][9] que afecte a los almacenes de datos confidenciales. Puedes hacer clic en cualquier problema para continuar con la clasificación y la corrección en Cloud Security Management.

## Coste del proveedor de servicio en la nube

Cuando se utiliza Agentless Scanning, existen costos adicionales del proveedor de la nube para ejecutar los escáneres y analizar tus entornos de la nube.

Tu configuración de la nube afecta a los costos de tu proveedor de la nube. Normalmente, utilizando la [configuración recomendada][13], estos oscilan en torno a 1 USD por host escaneado y por año. Consulta la información de tu proveedor de la nube para conocer los importes exactos, que están sujetos a cambios sin la participación de Datadog.

Para grandes cargas de trabajo en la nube distribuidas en varias regiones, Datadog recomienda configurar [Agentless Scanning con Terraform][6] para evitar la creación de redes entre regiones.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/setup/agentless_scanning/quick_start
[2]: /es/agent/remote_config/?tab=configurationyamlfile
[3]: https://cyclonedx.org/
[4]: /es/security/cloud_security_management/setup/agentless_scanning/quick_start#prerequisites
[5]: https://app.datadoghq.com/security/csm/vm
[6]: /es/security/cloud_security_management/setup/agentless_scanning/terraform
[7]: mailto:success@datadoghq.com
[8]: /es/sensitive_data_scanner
[9]: /es/security/cloud_security_management
[10]: /es/agent/remote_config
[11]: /es/sensitive_data_scanner/scanning_rules/library_rules/
[12]: /es/help
[13]: /es/security/cloud_security_management/agentless_scanning/deployment_methods#recommended-configuration