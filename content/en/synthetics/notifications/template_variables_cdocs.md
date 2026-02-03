---
title: Synthetic Monitoring Template Variables
---
<div id="cdoc-selector"><div id="cdoc-filters-menu"><div class="filter-selector-menu" id="cdoc-filters-pill-menu"><div class="cdoc-pills-container"><p 
    id="cdoc-platform-pills-label" 
    class="cdoc-filter-label"
  >Test Type</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="platform" 
      data-option-id="browser"
      aria-selected="true"
      tabIndex="0"
    >Browser</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="mobile"
      aria-selected="false"
      tabIndex="0"
    >Mobile</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="platform" 
      data-option-id="multistep"
      aria-selected="false"
      tabIndex="0"
    >Multistep API</button></div><div class="cdoc-pills-container"><p 
    id="cdoc-synthetics_variables-pills-label" 
    class="cdoc-filter-label"
  >Variables</p><button
      class="cdoc-filter__option cdoc-pill selected" 
      data-filter-id="synthetics_variables" 
      data-option-id="execution"
      aria-selected="true"
      tabIndex="0"
    >Test execution</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="result"
      aria-selected="false"
      tabIndex="0"
    >Result</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="local"
      aria-selected="false"
      tabIndex="0"
    >Local</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="global"
      aria-selected="false"
      tabIndex="0"
    >Global</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="extracted"
      aria-selected="false"
      tabIndex="0"
    >Extracted</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="step"
      aria-selected="false"
      tabIndex="0"
    >Step</button></div></div><div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu"><div class="cdoc-dropdown-container"><p 
    id="cdoc-platform-dropdown-label" 
    class="cdoc-filter-label"
  >Test Type</p><div 
    id="cdoc-dropdown-platform" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-platform-dropdown-label">
      <span 
        id="cdoc-dropdown-platform-label" 
        class="cdoc-btn-label"
      >Browser</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-platform-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="platform" 
      data-option-id="browser"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Browser</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="mobile"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Mobile</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="platform" 
      data-option-id="multistep"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Multistep API</a></div></div></div><div class="cdoc-dropdown-container"><p 
    id="cdoc-synthetics_variables-dropdown-label" 
    class="cdoc-filter-label"
  >Variables</p><div 
    id="cdoc-dropdown-synthetics_variables" 
    class="cdoc-dropdown">
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="cdoc-synthetics_variables-dropdown-label">
      <span 
        id="cdoc-dropdown-synthetics_variables-label" 
        class="cdoc-btn-label"
      >Test execution</span>
      <div class="cdoc-chevron"></div>
    </button><div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="cdoc-synthetics_variables-dropdown-label"><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option selected" 
      data-filter-id="synthetics_variables" 
      data-option-id="execution"
      role="option" 
      aria-selected="true"
      tabIndex="0"
    >Test execution</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="result"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Result</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="local"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Local</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="global"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Global</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="extracted"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Extracted</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="step"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Step</a></div></div></div></div></div><hr /></div><div id="cdoc-content" class="customizable"><article>
  <h2 id="overview">Overview</h2>
  <p>
    Template variables allow you to insert dynamic values from your test results
    and configuration into Synthetic Monitoring notification messages. These
    variables are accessed using the <code>synthetics.attributes</code> prefix.
  </p>
  <div
    class="cdoc__toggleable"
    data-description="Variables is Test execution"
    data-if="6243"
  >
    <h3 id="test-execution-variables">Test execution variables</h3>
    <p>Path: <code>synthetics</code> (various shortcuts)</p>
    <p>
      Use these variables to access common test execution data such as failure
      messages, step counts, duration, and tags.
    </p>
    <dl>
      <dt><code>{{synthetics.failed_step.failure.message}}</code></dt>
      <dd>
        The error message (for example,
        <code>Element's content should match the given regex</code>).
      </dd>
      <dt><code>{{synthetics.failed_step.url}}</code></dt>
      <dd>
        The URL of the failed step (for example,
        <code>https://www.datadoghq.com/blog/</code>).
      </dd>
      <dt><code>{{synthetics.attributes.result.response.statusCode}}</code></dt>
      <dd>The HTTP status code (for example, <code>403</code>).</dd>
      <dt><code>{{synthetics.result.step_count}}</code></dt>
      <dd>Number of steps (for example, <code>4</code>).</dd>
      <dt><code>{{synthetics.result.duration}}</code></dt>
      <dd>
        Duration of the test run (in milliseconds) (for example,
        <code>9096</code>).
      </dd>
      <dt><code>{{tags}}</code></dt>
      <dd>Lists all the tags added to the synthetics test.</dd>
      <dd>
        To access individual tag values, use
        <code>{{tags.&lt;tag-key&gt;}}</code>. For example, if your test is
        tagged with <code>env:prod</code>, use <code>{{tags.env}}</code> to
        return the tag value <code>prod</code>.
      </dd>
    </dl>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Result"
    data-if="6261"
  >
    <h3 id="result-attributes">Result attributes</h3>
    <p>Path: <code>synthetics.attributes</code></p>
    <p>
      Use these variables to include details about the test, execution location,
      device, counts, and result status in your notification messages.
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="test-info"
          class="tab-pane fade"
          role="tabpanel"
          title="Test Info"
        >
          <dl>
            <dt><code>{{synthetics.attributes.test}}</code></dt>
            <dd>
              The <code>test</code> object contains information about the test
              like its <code>name</code>, <code>type</code>,
              <code>subtype</code>, and <code>id</code>
            </dd>
            <dt><code>{{synthetics.attributes.test.name}}</code></dt>
            <dd>The name of the test</dd>
            <dt><code>{{synthetics.attributes.test.type}}</code></dt>
            <dd>Test type (for example, <code>api</code>)</dd>
            <dt><code>{{synthetics.attributes.test.subType}}</code></dt>
            <dd>
              Subtype for API tests (for example, <code>http</code>,
              <code>dns</code>, and <code>multi</code>)
            </dd>
            <dt><code>{{synthetics.attributes.test.id}}</code></dt>
            <dd>
              The test's public ID (for example, <code>abc-def-ghi</code>)
            </dd>
          </dl>
        </div>
        <div
          data-lang="location"
          class="tab-pane fade"
          role="tabpanel"
          title="Location"
        >
          <dl>
            <dt><code>{{synthetics.attributes.location}}</code></dt>
            <dd>
              The <code>location</code> object contains information about the
              location of where the test is run from
            </dd>
            <dt><code>{{synthetics.attributes.location.id}}</code></dt>
            <dd>Location ID (for example, <code>aws:eu-central-1</code>)</dd>
            <dt><code>{{synthetics.attributes.location.name}}</code></dt>
            <dd>
              Name of the location (for example, <code>Frankfurt (AWS)</code>)
            </dd>
            <dt>
              <code>{{synthetics.attributes.location.privateLocation}}</code>
            </dt>
            <dd><code>true</code> for Private Locations</dd>
          </dl>
        </div>
        <div
          class="cdoc__toggleable"
          data-description="(platform is browser) or (platform is mobile)"
          data-if="6248"
        >
          <div
            data-lang="device"
            class="tab-pane fade"
            role="tabpanel"
            title="Device"
          >
            <dl>
              <dt><code>{{synthetics.attributes.device}}</code></dt>
              <dd>
                The <code>device</code> object contains information about the
                device on which the test is run on
              </dd>
              <dt><code>{{synthetics.attributes.device.id}}</code></dt>
              <dd>Device identifier</dd>
              <dt><code>{{synthetics.attributes.device.name}}</code></dt>
              <dd>Human-readable device name</dd>
              <dt><code>{{synthetics.attributes.device.type}}</code></dt>
              <dd>Device type classification</dd>
              <dt>
                <code>{{synthetics.attributes.device.width}}</code>,
                <code>{{synthetics.attributes.device.height}}</code>
              </dt>
              <dd>Screen resolution dimensions</dd>
            </dl>
            <div
              class="cdoc__toggleable"
              data-description="platform is browser"
              data-if="6244"
            >
              <dl>
                <dt>
                  <code>{{synthetics.attributes.device.browser.type}}</code>
                </dt>
                <dd>Browser type (browser tests only)</dd>
              </dl>
            </div>
            <div
              class="cdoc__toggleable cdoc__hidden"
              data-description="platform is mobile"
              data-if="6245"
            >
              <dl>
                <dt>
                  <code>{{synthetics.attributes.device.platform.name}}</code>,
                  <code>{{synthetics.attributes.device.platform.version}}</code>
                </dt>
                <dd>Platform information (mobile tests only)</dd>
              </dl>
            </div>
          </div>
        </div>
        <div
          data-lang="result"
          class="tab-pane fade"
          role="tabpanel"
          title="Result"
        >
          <dl>
            <dt><code>{{synthetics.attributes.result}}</code></dt>
            <dd>
              The <code>result</code> object contains information about the
              executed test run
            </dd>
            <dt><code>{{synthetics.attributes.result.id}}</code></dt>
            <dd>Unique result ID</dd>
            <dt><code>{{synthetics.attributes.result.status}}</code></dt>
            <dd>
              Test execution status (for example, <code>passed</code> or
              <code>failed</code>)
            </dd>
            <dt><code>{{synthetics.attributes.result.duration}}</code></dt>
            <dd>Test duration in milliseconds</dd>
            <dt>
              <code>{{synthetics.attributes.result.testStartedAt}}</code>,
              <code>{{synthetics.attributes.result.testFinishedAt}}</code>,
              <code>{{synthetics.attributes.result.testTriggeredAt}}</code>
            </dt>
            <dd>Epoch timestamps in milliseconds</dd>
            <dt><code>{{synthetics.attributes.result.failure}}</code></dt>
            <dd>
              The <code>failure</code> object contains information about why the
              test failed
            </dd>
            <dt>
              <code>{{synthetics.attributes.result.failure.message}}</code>
            </dt>
            <dd>The failure message</dd>
            <dt><code>{{synthetics.attributes.result.failure.code}}</code></dt>
            <dd>The failure code</dd>
          </dl>
        </div>
        <div
          class="cdoc__toggleable"
          data-description="(platform is browser) or (platform is mobile) or (platform is multistep)"
          data-if="6252"
        >
          <div
            data-lang="count"
            class="tab-pane fade"
            role="tabpanel"
            title="Count"
          >
            <p>
              Applies to Multistep, Browser, and Mobile tests.
              <code>{{synthetics.attributes.count}}</code> : The
              <code>count</code> object contains step statistics about the test
            </p>
            <dl>
              <dt><code>{{synthetics.attributes.count.steps.total}}</code></dt>
              <dd>The total number of steps</dd>
              <dt>
                <code>{{synthetics.attributes.count.steps.completed}}</code>
              </dt>
              <dd>The number of steps that were run</dd>
              <dt><code>{{synthetics.attributes.count.errors}}</code></dt>
              <dd>
                The total number of errors that occurred while running the test.
                For multistep and mobile tests, this is the number of failed
                steps. For browser tests, this is the sum of all browser errors.
              </dd>
              <dt><code>{{synthetics.attributes.count.hops}}</code></dt>
              <dd>The number of traceroute hops for TCP and ICMP tests</dd>
            </dl>
          </div>
        </div>
        <div
          class="cdoc__toggleable"
          data-description="(platform is browser) or (platform is mobile) or (platform is multistep)"
          data-if="6260"
        >
          <div
            data-lang="failed-step"
            class="tab-pane fade"
            role="tabpanel"
            title="Failed step"
          >
            <p>
              Applies to Multistep, Browser, and Mobile tests.
              <code>{{synthetics.failed_step}}</code> : The
              <code>failed_step</code> object provides a shortcut to the step
              that caused the test to fail, eliminating the need to reference
              <code
                >{{synthetics.attributes.result.steps.&lt;step-index&gt;}}</code
              >
              directly.
            </p>
            <div
              class="cdoc__toggleable cdoc__hidden"
              data-description="platform is multistep"
              data-if="6253"
            >
              <dl>
                <dt><code>{{synthetics.failed_step.name}}</code></dt>
                <dd>
                  Maps to
                  <code
                    >{{synthetics.attributes.result.steps.&lt;step-index&gt;.name}}</code
                  >
                  (Multistep API)
                </dd>
              </dl>
            </div>
            <div
              class="cdoc__toggleable"
              data-description="(platform is browser) or (platform is mobile)"
              data-if="6256"
            >
              <dl>
                <dt><code>{{synthetics.failed_step.description}}</code></dt>
                <dd>
                  Maps to
                  <code
                    >{{synthetics.attributes.result.steps.&lt;step-index&gt;.description}}</code
                  >
                  (Browser, Mobile)
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Local"
    data-if="6262"
  >
    <h3 id="local-variables">Local variables</h3>
    <p>Path: <code>synthetics.attributes.result.variables.config</code></p>
    <p>
      These are local variables configured for API tests or defined outside
      individual steps in step-based tests. This also includes variables created
      by JavaScript code execution.
    </p>
    <dl>
      <dt>
        <code>{{synthetics.attributes.result.variables.config.name}}</code>
      </dt>
      <dd>Variable name</dd>
      <dt>
        <code>{{synthetics.attributes.result.variables.config.type}}</code>
      </dt>
      <dd>Variable type</dd>
      <dt>
        <code>{{synthetics.attributes.result.variables.config.secure}}</code>
      </dt>
      <dd>Whether the variable value is obfuscated</dd>
      <dt>
        <code>{{synthetics.attributes.result.variables.config.value}}</code>
      </dt>
      <dd>Variable value (non-obfuscated only)</dd>
    </dl>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Global"
    data-if="6263"
  >
    <h3 id="global-variables">Global variables</h3>
    <p>Path: <code>synthetics.attributes.result.variables.extracted</code></p>
    <p>
      These are extracted variables whose value updates a global variable value.
    </p>
    <p>
      Available only for <strong>successful test results</strong> and
      <strong>recovery notifications</strong>.
    </p>
    <dl>
      <dt>
        <code>{{synthetics.attributes.result.variables.extracted.id}}</code>
      </dt>
      <dd>Global variable ID</dd>
      <dt>
        <code>{{synthetics.attributes.result.variables.extracted.name}}</code>
      </dt>
      <dd>Variable name</dd>
      <dt>
        <code>{{synthetics.attributes.result.variables.extracted.secure}}</code>
      </dt>
      <dd>Whether the variable value is obfuscated</dd>
      <dt>
        <code>{{synthetics.attributes.result.variables.extracted.val}}</code>
      </dt>
      <dd>
        Variable value (note: uses <code>.val</code>, not <code>.value</code>)
      </dd>
    </dl>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Extracted"
    data-if="6267"
  >
    <h3 id="extracted-variable-values">Extracted variable values</h3>
    <p>
      Path:
      <code
        >synthetics.attributes.result.steps.&lt;step-index&gt;.extractedValue</code
      >
    </p>
    <div
      class="cdoc__toggleable"
      data-description="(Test Type is Browser) or (Test Type is Mobile)"
      data-if="6266"
    >
      <p>
        These are the actual variable values that a step captured during test
        execution. For example, if you have a Browser test step that extracts
        text from a page element into a variable, this is where you access that
        extracted value.
      </p>
      <p>
        For information on how to access the <code>&lt;step-index&gt;</code>,
        see the step summary section.
      </p>
      <dl>
        <dt>
          <code
            >synthetics.attributes.result.steps.&lt;step-index&gt;.extractedValue.name</code
          >
        </dt>
        <dd>Variable name</dd>
        <dt>
          <code
            >synthetics.attributes.result.steps.&lt;step-index&gt;.extractedValue.secure</code
          >
        </dt>
        <dd>Whether the variable value is obfuscated</dd>
        <dt>
          <code
            >synthetics.attributes.result.steps.&lt;step-index&gt;.extractedValue.value</code
          >
        </dt>
        <dd>Variable value (if step was successful)</dd>
      </dl>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Step"
    data-if="6275"
  >
    <h3 id="step-execution-details">Step execution details</h3>
    <p>Path: <code>synthetics.attributes.variables.extracted</code></p>
    <p>
      These are step execution metadata and results containing detailed
      information about how each step ran, including response data, timing
      metrics, and protocol-specific details. These values are only available
      when the step completes successfully.
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          class="cdoc__toggleable"
          data-description="(platform is browser) or (platform is mobile) or (platform is multistep)"
          data-if="6271"
        >
          <div
            data-lang="general"
            class="tab-pane fade"
            role="tabpanel"
            title="General"
          >
            <dl>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.steps.allowFailure</code
                >
              </dt>
              <dd>
                Whether the step is allowed to fail without failing the entire
                test
              </dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.steps.duration</code
                >
              </dt>
              <dd>Step execution duration in milliseconds</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.steps.failure</code
                >
              </dt>
              <dd>
                Failure information object containing <code>.code</code> and
                <code>.message</code>
              </dd>
              <dt>
                <code>synthetics.attributes.variables.extracted.steps.id</code>
              </dt>
              <dd>Unique step identifier</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.steps.isCritical</code
                >
              </dt>
              <dd>Whether the step is critical to the test</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.steps.status</code
                >
              </dt>
              <dd>Step execution status</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.steps.type</code
                >
              </dt>
              <dd>Type of step being executed</dd>
            </dl>
            <p><strong>Subtest information:</strong></p>
            <dl>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.steps.subTest.id</code
                >
              </dt>
              <dd>Subtest identifier</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.steps.subStep.parentStep.id</code
                >
              </dt>
              <dd>Parent step identifier</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.steps.subStep.parentTest.id</code
                >
              </dt>
              <dd>Parent test identifier</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.steps.subStep.level</code
                >
              </dt>
              <dd>
                Nesting level (1 for subtests, 2 for subtests of subtests)
              </dd>
            </dl>
          </div>
        </div>
        <div
          class="cdoc__toggleable"
          data-description="platform is browser"
          data-if="6272"
        >
          <div
            data-lang="browser"
            class="tab-pane fade"
            role="tabpanel"
            title="Browser"
          >
            <p><strong>General:</strong></p>
            <dl>
              <dt><code>{{synthetics.attributes.result.startUrl}}</code></dt>
              <dd>URL from test configuration</dd>
            </dl>
            <p><strong>Steps:</strong></p>
            <dl>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.apiTest.request</code
                >
              </dt>
              <dd>
                API test request configuration (only for &quot;Run API
                Test&quot; steps where <code>type</code> is
                <code>runApiTest</code>)
              </dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.apiTest.result</code
                >
              </dt>
              <dd>
                API test result data (similar to
                <code>attributes.result</code> for API tests)
              </dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.assertionResult.expected</code
                >
              </dt>
              <dd>Expected value for assertions</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.assertionResults.checkType</code
                >
              </dt>
              <dd>Type of assertion check</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.assertionResults.actual</code
                >
              </dt>
              <dd>Actual value found during assertion</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.browserErrors</code
                >
              </dt>
              <dd>List of browser errors encountered</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.timings.firstByte</code
                >
              </dt>
              <dd>Time to first byte</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.timings.tcp</code
                >
              </dt>
              <dd>TCP connection timing</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.description</code
                >
              </dt>
              <dd>Step description</dd>
            </dl>
          </div>
        </div>
        <div
          class="cdoc__toggleable cdoc__hidden"
          data-description="platform is mobile"
          data-if="6273"
        >
          <div
            data-lang="mobile"
            class="tab-pane fade"
            role="tabpanel"
            title="Mobile"
          >
            <dl>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.application.versionId</code
                >
              </dt>
              <dd>Mobile application version identifier</dd>
              <dt>
                <code>synthetics.attributes.variables.extracted.apiTest</code>
              </dt>
              <dd>API test data (for API test steps within mobile tests)</dd>
              <dt>
                <code
                  >synthetics.attributes.variables.extracted.description</code
                >
              </dt>
              <dd>Step description</dd>
            </dl>
          </div>
        </div>
        <div
          class="cdoc__toggleable cdoc__hidden"
          data-description="platform is multistep"
          data-if="6274"
        >
          <div
            data-lang="api"
            class="tab-pane fade"
            role="tabpanel"
            title="API"
          >
            <p><strong>Multistep:</strong></p>
            <dl>
              <dt>
                <code>synthetics.attributes.variables.extracted.name</code>
              </dt>
              <dd>Step name</dd>
              <dt>
                <code>synthetics.attributes.variables.extracted.type</code>
              </dt>
              <dd>Step type</dd>
            </dl>
            <p><em>Note: Follow regular API fields per subType</em></p>
          </div>
        </div>
      </div>
    </div>
    <h3 id="step-summary">Step summary</h3>
    <p>Path: <code>synthetics.attributes.result.steps</code></p>
    <p>
      Access step data by index, name, or ID to reference specific steps in your
      notification messages.
    </p>
    <p>
      Each step exposes the following properties: <code>.id</code>,
      <code>.status</code>, <code>.type</code>, <code>.duration</code>,
      <code>.description</code>, <code>.failure.message</code>,
      <code>.code</code>, and <code>.url</code>.
    </p>
    <p>You can reference steps in three ways:</p>
    <h4 id="by-index--0-based">By index (0-based)</h4>
    <p>
      Use positive numbers to count from the beginning, or negative numbers to
      count from the end:
    </p>
    <dl>
      <dt><code>synthetics.attributes.result.steps.0</code></dt>
      <dd>First step</dd>
      <dt><code>synthetics.attributes.result.steps.1</code></dt>
      <dd>Second step</dd>
      <dt><code>synthetics.attributes.result.steps.-1</code></dt>
      <dd>Last step</dd>
      <dt><code>synthetics.attributes.result.steps.-2</code></dt>
      <dd>Second to last step</dd>
    </dl>
    <h4 id="by-step-name">By step name</h4>
    <p>Use the step name in brackets:</p>
    <p><code>.steps[Click button]</code></p>
    <h4 id="by-step-id">By step ID</h4>
    <p>Use the step's unique identifier:</p>
    <p><code>.steps.abc-def-ghi</code></p>
    <h4 id="accessing-step-properties">Accessing step properties</h4>
    <p>Combine any reference method with a property:</p>
    <ul>
      <li>
        <code>{{synthetics.attributes.result.steps.-1.status}}</code> - Status
        of the last step
      </li>
      <li>
        <code>{{synthetics.attributes.result.steps[Click button].status}}</code>
        - Status of the step named &quot;Click button&quot;
      </li>
      <li>
        <code>{{synthetics.attributes.result.steps.abc-def-ghi.status}}</code> -
        Status of the step with step ID &quot;abc-def-ghi&quot;
      </li>
    </ul>
  </div>
</article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"6243":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"execution"},"v":true,"r":"6243"},"6244":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"6244"},"6245":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"6245"},"6248":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"6246"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"6247"}},"v":true,"r":"6248"},"6252":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"6249"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"6250"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"multistep"},"v":false,"r":"6251"}},"v":true,"r":"6252"},"6253":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"multistep"},"v":false,"r":"6253"},"6256":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"6254"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"6255"}},"v":true,"r":"6256"},"6260":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"6257"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"6258"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"multistep"},"v":false,"r":"6259"}},"v":true,"r":"6260"},"6261":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"result"},"v":false,"r":"6261"},"6262":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"local"},"v":false,"r":"6262"},"6263":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"global"},"v":false,"r":"6263"},"6266":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"6264"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"6265"}},"v":true,"r":"6266"},"6267":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"extracted"},"v":false,"r":"6267"},"6271":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"6268"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"6269"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"multistep"},"v":false,"r":"6270"}},"v":true,"r":"6271"},"6272":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"6272"},"6273":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"6273"},"6274":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"multistep"},"v":false,"r":"6274"},"6275":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"step"},"v":false,"r":"6275"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"synthetics_test_type_options","label":"Test Type"},"defaultValsByOptionGroupId":{"synthetics_test_type_options":"browser"}},"synthetics_variables":{"config":{"trait_id":"synthetics_variables","option_group_id":"synthetics_variables_options","label":"Variables"},"defaultValsByOptionGroupId":{"synthetics_variables_options":"execution"}}},"defaultValsByTraitId":{"platform":"browser","synthetics_variables":"execution"},"optionGroupsById":{"synthetics_test_type_options":[{"default":true,"id":"browser","label":"Browser"},{"id":"mobile","label":"Mobile"},{"id":"multistep","label":"Multistep API"}],"synthetics_variables_options":[{"default":true,"id":"execution","label":"Test execution"},{"id":"result","label":"Result"},{"id":"local","label":"Local"},{"id":"global","label":"Global"},{"id":"extracted","label":"Extracted"},{"id":"step","label":"Step"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>