Add a build plugin to generate Git properties during the build. The Datadog Java tracer reads the packaged properties directly; Spring Boot Actuator is not required.

For Spring Boot JARs and WARs, package `git.properties` or `datadog_git.properties` under `BOOT-INF/classes/` or `WEB-INF/classes/`. For other layouts, package `datadog_git.properties` at the root of the classpath. The file must contain `git.remote.origin.url` and either `git.commit.id` or `git.commit.id.full`.

The following examples generate `git.properties` for a Spring Boot application. For other layouts, configure the plugin to generate `datadog_git.properties` instead.

**Maven**

Add the following plugin to your `pom.xml`:

```xml
<plugin>
    <groupId>io.github.git-commit-id</groupId>
    <artifactId>git-commit-id-maven-plugin</artifactId>
    <version>9.0.2</version>
    <executions>
        <execution>
            <id>get-the-git-infos</id>
            <goals>
                <goal>revision</goal>
            </goals>
            <phase>initialize</phase>
        </execution>
    </executions>
    <configuration>
        <generateGitPropertiesFile>true</generateGitPropertiesFile>
        <generateGitPropertiesFilename>${project.build.outputDirectory}/git.properties</generateGitPropertiesFilename>
        <commitIdGenerationMode>full</commitIdGenerationMode>
    </configuration>
</plugin>
```

**Gradle**

Add the following to your `build.gradle.kts`:

```kotlin
plugins {
    id("org.springframework.boot") version "2.5.7" // required
    // ...
    id("com.gorylenko.gradle-git-properties") version "2.5.7"
}
```

<div class="alert alert-warning">Both plugins require access to the <code>.git</code> folder at build time.</div>
