If you use Spring Boot, add a build plugin to embed git information in your JAR. The Datadog Java tracer reads the `git.properties` file that Spring Boot Actuator generates at startup.

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
