import fs from 'fs';
import path from 'path';

const JAVA_PROFILER_DOC_PATH = 'content/en/profiler/enabling/java.md';

describe('Java Profiler Documentation', () => {
  let documentContent;

  beforeAll(() => {
    const fullPath = path.resolve(JAVA_PROFILER_DOC_PATH);
    documentContent = fs.readFileSync(fullPath, 'utf8');
  });

  describe('Environment-based navigation structure', () => {
    it('should contain the main environment selection tabs', () => {
      expect(documentContent).toMatch(/{{< tabs >}}/);
      expect(documentContent).toMatch(/{{% tab "Standard Application" %}}/);
      expect(documentContent).toMatch(/{{% tab "Containerized \(Docker\/Kubernetes\)" %}}/);
      expect(documentContent).toMatch(/{{% tab "Constrained Environments" %}}/);
    });

    it('should have proper tab closing tags', () => {
      const tabOpenings = (documentContent.match(/{{% tab "/g) || []).length;
      const tabClosings = (documentContent.match(/{{% \/tab %}}/g) || []).length;
      expect(tabOpenings).toBe(tabClosings);
    });

    it('should have proper tabs container closing', () => {
      const tabsOpenings = (documentContent.match(/{{< tabs >}}/g) || []).length;
      const tabsClosings = (documentContent.match(/{{< \/tabs >}}/g) || []).length;
      expect(tabsOpenings).toBe(tabsClosings);
    });
  });

  describe('Quick Start configurations', () => {
    it('should contain profiling type configuration tabs', () => {
      expect(documentContent).toMatch(/{{% tab "CPU Performance" %}}/);
      expect(documentContent).toMatch(/{{% tab "Memory Analysis" %}}/);
      expect(documentContent).toMatch(/{{% tab "Latency Debugging" %}}/);
      expect(documentContent).toMatch(/{{% tab "Complete Profiling" %}}/);
    });

    it('should contain practical configuration examples', () => {
      expect(documentContent).toMatch(/export DD_PROFILING_ENABLED=true/);
      expect(documentContent).toMatch(/export DD_PROFILING_DDPROF_CPU_ENABLED=true/);
      expect(documentContent).toMatch(/export DD_PROFILING_DDPROF_WALL_ENABLED=true/);
      expect(documentContent).toMatch(/export DD_PROFILING_DDPROF_ALLOC_ENABLED=true/);
    });

    it('should include Docker configuration example', () => {
      expect(documentContent).toMatch(/FROM openjdk:17-jre-slim/);
      expect(documentContent).toMatch(/ADD 'https:\/\/dtdg\.co\/latest-java-tracer'/);
      expect(documentContent).toMatch(/ENV DD_PROFILING_ENABLED=true/);
    });

    it('should include Kubernetes configuration example', () => {
      expect(documentContent).toMatch(/apiVersion: apps\/v1/);
      expect(documentContent).toMatch(/kind: Deployment/);
      expect(documentContent).toMatch(/- name: DD_PROFILING_ENABLED/);
      expect(documentContent).toMatch(/value: "true"/);
    });
  });

  describe('Collapsible content sections', () => {
    it('should have properly formatted collapse-content shortcodes', () => {
      const collapseOpenings = (documentContent.match(/{{% collapse-content title="/g) || []).length;
      const collapseClosings = (documentContent.match(/{{% \/collapse-content %}}/g) || []).length;
      expect(collapseOpenings).toBe(collapseClosings);
    });

    it('should contain performance tuning collapsible section', () => {
      expect(documentContent).toMatch(/{{% collapse-content title="Optimize profiling performance" level="h4" %}}/);
    });

    it('should contain advanced profiling options collapsible section', () => {
      expect(documentContent).toMatch(/{{% collapse-content title="Advanced profiling options" level="h4" %}}/);
    });

    it('should contain GraalVM Native Image collapsible section', () => {
      expect(documentContent).toMatch(/{{% collapse-content title="GraalVM Native Image Support" level="h4" %}}/);
    });
  });

  describe('Configuration reference tables', () => {
    it('should contain properly formatted markdown tables', () => {
      // Check for table headers
      expect(documentContent).toMatch(/\| Variable \| Type \| Description \|/);
      expect(documentContent).toMatch(/\| Variable \| Type \| Default \| Description \|/);
      
      // Check for table separators
      expect(documentContent).toMatch(/\|----------|------|-------------|/);
      expect(documentContent).toMatch(/\|----------|------|---------|-------------|/);
    });

    it('should contain key configuration variables', () => {
      expect(documentContent).toMatch(/DD_PROFILING_ENABLED/);
      expect(documentContent).toMatch(/DD_SERVICE/);
      expect(documentContent).toMatch(/DD_ENV/);
      expect(documentContent).toMatch(/DD_VERSION/);
      expect(documentContent).toMatch(/DD_PROFILING_DDPROF_CPU_ENABLED/);
      expect(documentContent).toMatch(/DD_PROFILING_DDPROF_WALL_ENABLED/);
    });
  });

  describe('Internal links validation', () => {
    it('should contain proper internal link references', () => {
      // Check for reference-style links
      expect(documentContent).toMatch(/\[1\]: \/tracing\/trace_collection\//);
      expect(documentContent).toMatch(/\[7\]: \/integrations\/guide\/source-code-integration\//);
      expect(documentContent).toMatch(/\[8\]: https:\/\/app\.datadoghq\.com\/profiling/);
      expect(documentContent).toMatch(/\[13\]: \/profiler\/enabling\/supported_versions\//);
      expect(documentContent).toMatch(/\[15\]: \/profiler\/profiler_troubleshooting\/java\//);
    });

    it('should not contain broken link patterns', () => {
      // Check that there are no orphaned link references like [text][] or [text][missing]
      expect(documentContent).not.toMatch(/\]\[\s*\]/);
      expect(documentContent).not.toMatch(/\]\[(?![\d])/);
    });
  });

  describe('Code block formatting', () => {
    it('should have properly formatted bash code blocks', () => {
      expect(documentContent).toMatch(/```bash\n/);
      expect(documentContent).toMatch(/```dockerfile\n/);
      expect(documentContent).toMatch(/```yaml\n/);
    });

    it('should contain essential profiling commands', () => {
      expect(documentContent).toMatch(/java -javaagent:dd-java-agent\.jar/);
      expect(documentContent).toMatch(/wget.*dd-java-agent\.jar.*latest-java-tracer/);
      expect(documentContent).toMatch(/curl.*dd-java-agent\.jar.*latest-java-tracer/);
    });
  });

  describe('Content structure validation', () => {
    it('should maintain proper heading hierarchy', () => {
      expect(documentContent).toMatch(/^## Choose your setup/m);
      expect(documentContent).toMatch(/^## Installation/m);
      expect(documentContent).toMatch(/^## Configuration/m);
      expect(documentContent).toMatch(/^## Next Steps/m);
    });

    it('should not contain deprecated engine references in user-facing text', () => {
      // Ensure we're not confusing users with engine details
      expect(documentContent).not.toMatch(/Java Flight Recorder \(JFR\).*engine/);
      expect(documentContent).not.toMatch(/Datadog Profiler.*engine.*JFR.*engine/);
      // Note: We may still reference these in technical contexts, just not in the main user flow
    });

    it('should contain outcome-focused language', () => {
      expect(documentContent).toMatch(/Find CPU bottlenecks and hot code paths/);
      expect(documentContent).toMatch(/Track memory allocations and leaks/);
      expect(documentContent).toMatch(/Profile application latency/);
    });
  });

  describe('Accessibility and UX', () => {
    it('should have clear environment descriptions', () => {
      expect(documentContent).toMatch(/\*\*For:\*\* Java applications running on servers, VMs, or bare metal/);
      expect(documentContent).toMatch(/\*\*For:\*\* Java applications running in containers/);
      expect(documentContent).toMatch(/\*\*For:\*\* Environments with limited privileges/);
    });

    it('should provide copy-paste ready examples', () => {
      // Check for complete, runnable examples
      expect(documentContent).toMatch(/export DD_SERVICE=my-java-app/);
      expect(documentContent).toMatch(/export DD_ENV=production/);
      expect(documentContent).toMatch(/java -javaagent:dd-java-agent\.jar -jar myapp\.jar/);
    });
  });
});