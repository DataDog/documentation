Embed git information directly in your application's JAR using a build plugin. The Datadog Java tracer automatically reads the embedded `datadog_git.properties` file at startup.

{{< tabs >}}
{{% tab "Maven" %}}

Add the following plugin to your `pom.xml`. This generates both `git.properties` (for Spring Boot Actuator compatibility) and `datadog_git.properties` (read by the Datadog tracer):

```xml
<plugin>
    <groupId>io.github.git-commit-id</groupId>
    <artifactId>git-commit-id-maven-plugin</artifactId>
    <version>9.0.2</version>
    <executions>
        <execution>
            <id>git-properties</id>
            <goals>
                <goal>revision</goal>
            </goals>
            <configuration>
                <generateGitPropertiesFilename>${project.build.outputDirectory}/git.properties</generateGitPropertiesFilename>
            </configuration>
        </execution>
        <execution>
            <id>dd-git-properties</id>
            <goals>
                <goal>revision</goal>
            </goals>
            <configuration>
                <generateGitPropertiesFilename>${project.build.outputDirectory}/datadog_git.properties</generateGitPropertiesFilename>
            </configuration>
        </execution>
    </executions>
</plugin>
```

{{% /tab %}}
{{% tab "Gradle" %}}

Add the following to your `build.gradle.kts`. This generates `git.properties` (for Spring Boot Actuator compatibility) and copies it to `datadog_git.properties` (read by the Datadog tracer):

```kotlin
import org.gradle.api.plugins.BasePlugin.BUILD_GROUP

plugins {
    // ...
    id("com.gorylenko.gradle-git-properties") version "2.5.2"
}

// Copy git.properties to datadog_git.properties before the JAR is assembled
tasks.register<Copy>("ddGitProperties") {
    inputs.file(layout.buildDirectory.file("resources/main/git.properties"))
    outputs.file(layout.buildDirectory.file("resources/main/datadog_git.properties"))
    description = "Copy the git.properties file where Datadog will look for it"
    group = BUILD_GROUP
    dependsOn("generateGitProperties")
    mustRunAfter("processResources")

    from(layout.buildDirectory.dir("resources/main")) {
        include("git.properties")
        rename("git.properties", "datadog_git.properties")
    }
    into(layout.buildDirectory.dir("resources/main"))
}

tasks["classes"].dependsOn("ddGitProperties")
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">Both plugins require access to the <code>.git</code> folder at build time.
