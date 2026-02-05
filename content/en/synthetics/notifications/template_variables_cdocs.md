---
title: Synthetic Monitoring Template Variables
further_reading:
  - link: /monitors/manage/
    tag: Documentation
    text: Learn how to manage monitors
  - link: /monitors/templates/
    tag: Documentation
    text: Learn more about monitor templates
  - link: /synthetics/guide/how-synthetics-monitors-trigger-alerts/
    tag: Guide
    text: Understanding Synthetic Monitor Alerting
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
      data-option-id="test_metadata"
      aria-selected="false"
      tabIndex="0"
    >Test Metadata</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="device_info"
      aria-selected="false"
      tabIndex="0"
    >Device Information</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="execution_results"
      aria-selected="false"
      tabIndex="0"
    >Execution Results</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="failed_step_info"
      aria-selected="false"
      tabIndex="0"
    >Failed Step Information</button><button
      class="cdoc-filter__option cdoc-pill " 
      data-filter-id="synthetics_variables" 
      data-option-id="local_global_variables"
      aria-selected="false"
      tabIndex="0"
    >Local & Global Variables</button><button
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
      data-option-id="test_metadata"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Test Metadata</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="device_info"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Device Information</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="execution_results"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Execution Results</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="failed_step_info"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Failed Step Information</a><a 
      class="cdoc-dropdown-option 
      cdoc-filter__option " 
      data-filter-id="synthetics_variables" 
      data-option-id="local_global_variables"
      role="option" 
      aria-selected="false"
      tabIndex="0"
    >Local & Global Variables</a><a 
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
    data-if="7388"
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
      <dd>
        <strong>Note:</strong> Review the
        <a href="/synthetics/notifications/conditional_alerting/"
          >conditional alerting</a
        >
        page for an example of how to use this variable in a notification.
      </dd>
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
    data-description="Variables is Test Metadata"
    data-if="7389"
  >
    <h3 id="test-metadata">Test metadata</h3>
    <p>Path: <code>synthetics.attributes</code></p>
    <p>
      Use these variables to access test configuration and execution location
      information.
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
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Device Information"
    data-if="7399"
  >
    <h3 id="device-information">Device information</h3>
    <p>Path: <code>synthetics.attributes.device</code></p>
    <p>
      Use these variables to access device information for Browser and Mobile
      tests.
    </p>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="not (Test Type is Browser) or (Test Type is Mobile)"
      data-if="7393"
    >
      <div class="alert alert-info">
        <p>
          Device information is not available for this test type. Device
          variables are only available for <strong>Browser</strong> and
          <strong>Mobile</strong> tests.
        </p>
      </div>
    </div>
    <div
      class="cdoc__toggleable"
      data-description="(Test Type is Browser) or (Test Type is Mobile)"
      data-if="7396"
    >
      <dl>
        <dt><code>{{synthetics.attributes.device}}</code></dt>
        <dd>
          The <code>device</code> object contains information about the device
          on which the test is run on
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
    </div>
    <div
      class="cdoc__toggleable"
      data-description="Test Type is Browser"
      data-if="7397"
    >
      <p><strong>Browser-specific:</strong></p>
      <dl>
        <dt><code>{{synthetics.attributes.device.browser.type}}</code></dt>
        <dd>Browser type (for example, <code>chrome</code>)</dd>
      </dl>
    </div>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="Test Type is Mobile"
      data-if="7398"
    >
      <p><strong>Mobile-specific:</strong></p>
      <dl>
        <dt>
          <code>{{synthetics.attributes.device.platform.name}}</code>,
          <code>{{synthetics.attributes.device.platform.version}}</code>
        </dt>
        <dd>
          Platform information (for example, <code>android</code>,
          <code>ios</code>)
        </dd>
      </dl>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Execution Results"
    data-if="7400"
  >
    <h3 id="execution-results">Execution results</h3>
    <p>Path: <code>synthetics.attributes</code></p>
    <p>
      Use these variables to access test execution results, status, duration,
      and step counts.
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
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
          <p>
            For a complete list of API test error codes, see
            <a href="/synthetics/api_tests/errors/">API Testing Errors</a>.
            Review the
            <a
              href="/synthetics/notifications/conditional_alerting#send-alerts-based-on-an-error-code"
              >conditional alerting</a
            >
            page for an example of how to use the
            <code>synthetics.attributes.result.failure</code> variable in a
            notification.
          </p>
        </div>
        <div
          data-lang="count"
          class="tab-pane fade"
          role="tabpanel"
          title="Count"
        >
          <dl>
            <dt><code>{{synthetics.attributes.count}}</code></dt>
            <dd>
              The <code>count</code> object contains step statistics about the
              test
            </dd>
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
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Failed Step Information"
    data-if="7410"
  >
    <h3 id="failed-step-information">Failed step information</h3>
    <p>Path: <code>synthetics.failed_step</code></p>
    <p>
      Use these variables to access information about the step that caused a
      test failure.
    </p>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="not (Test Type is Browser) or (Test Type is Mobile) or (Test Type is Multistep API)"
      data-if="7405"
    >
      <div class="alert alert-info">
        <p>
          Failed step information is only available for Multistep API, Browser,
          and Mobile tests.
        </p>
      </div>
    </div>
    <div
      class="cdoc__toggleable"
      data-description="(Test Type is Browser) or (Test Type is Mobile) or (Test Type is Multistep API)"
      data-if="7409"
    >
      <dl>
        <dt><code>{{synthetics.failed_step}}</code></dt>
        <dd>
          The <code>failed_step</code> object provides a shortcut to the step
          that caused the test to fail, eliminating the need to reference
          <code>{{synthetics.attributes.result.steps.&lt;step-index&gt;}}</code>
          directly.
        </dd>
      </dl>
      <table>
        <thead>
          <tr>
            <th colspan="2">Shortcut</th>
            <th>Test Type</th>
            <th>Maps To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2"><code>{{synthetics.failed_step.name}}</code></td>
            <td>Multistep API</td>
            <td>
              <code
                >{{synthetics.attributes.result.steps.&lt;step-index&gt;.name}}</code
              >
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <code>{{synthetics.failed_step.description}}</code>
            </td>
            <td>Browser, Mobile</td>
            <td>
              <code
                >{{synthetics.attributes.result.steps.&lt;step-index&gt;.description}}</code
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="alert alert-tip">
        <p>
          Review the
          <a
            href="/synthetics/notifications/conditional_alerting/#send-alerts-to-a-specific-slack-channel-based-on-failed-step-using-a-variable-shortcut"
            >conditional alerting</a
          >
          page for an example of how to use the
          <code>synthetics.failed_step.description</code> shortcut variable in a
          Browser Test notification.
        </p>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Local & Global Variables"
    data-if="7411"
  >
    <h3 id="local--global-variables">Local &amp; Global Variables</h3>
    <p>
      Use these variables to access locally configured variables and globally
      defined variables in your notifications.
    </p>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="local"
          class="tab-pane fade"
          role="tabpanel"
          title="Local"
        >
          <p>
            Path: <code>synthetics.attributes.result.variables.config</code>
          </p>
          <p>
            These are local variables configured for API tests or defined
            outside individual steps in step-based tests. This also includes
            variables created by JavaScript code execution.
          </p>
          <dl>
            <dt>
              <code
                >{{synthetics.attributes.result.variables.config.name}}</code
              >
            </dt>
            <dd>Variable name</dd>
            <dt>
              <code
                >{{synthetics.attributes.result.variables.config.type}}</code
              >
            </dt>
            <dd>Variable type</dd>
            <dt>
              <code
                >{{synthetics.attributes.result.variables.config.secure}}</code
              >
            </dt>
            <dd>Whether the variable value is obfuscated</dd>
            <dt>
              <code
                >{{synthetics.attributes.result.variables.config.value}}</code
              >
            </dt>
            <dd>Variable value (non-obfuscated only)</dd>
          </dl>
        </div>
        <div
          data-lang="global"
          class="tab-pane fade"
          role="tabpanel"
          title="Global"
        >
          <p>
            Path: <code>synthetics.attributes.result.variables.extracted</code>
          </p>
          <p>
            These are extracted variables whose value updates a global variable
            value.
          </p>
          <p>
            Available only for <strong>successful test results</strong> and
            <strong>recovery notifications</strong>.
          </p>
          <dl>
            <dt>
              <code
                >{{synthetics.attributes.result.variables.extracted.id}}</code
              >
            </dt>
            <dd>Global variable ID</dd>
            <dt>
              <code
                >{{synthetics.attributes.result.variables.extracted.name}}</code
              >
            </dt>
            <dd>Variable name</dd>
            <dt>
              <code
                >{{synthetics.attributes.result.variables.extracted.secure}}</code
              >
            </dt>
            <dd>Whether the variable value is obfuscated</dd>
            <dt>
              <code
                >{{synthetics.attributes.result.variables.extracted.val}}</code
              >
            </dt>
            <dd>
              Variable value (note: uses <code>.val</code>, not
              <code>.value</code>)
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
  <div
    class="cdoc__toggleable cdoc__hidden"
    data-description="Variables is Extracted"
    data-if="7419"
  >
    <h3 id="extracted-variable-values">Extracted variable values</h3>
    <p>
      Path:
      <code
        >synthetics.attributes.result.steps.&lt;step-index&gt;.extractedValue</code
      >
    </p>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="not (Test Type is Browser) or (Test Type is Mobile)"
      data-if="7415"
    >
      <div class="alert alert-info">
        <p>
          <strong>Note:</strong> Extracted variable values at the step level are
          only available for Browser and Mobile tests. Select
          <strong>Browser</strong> or <strong>Mobile</strong> from the Test Type
          dropdown to see these variables.
        </p>
      </div>
    </div>
    <div
      class="cdoc__toggleable"
      data-description="(Test Type is Browser) or (Test Type is Mobile)"
      data-if="7418"
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
    data-if="7428"
  >
    <h3 id="step-execution-details">Step execution details</h3>
    <p>Path: <code>synthetics.attributes.variables.extracted</code></p>
    <p>
      These are step execution metadata and results containing detailed
      information about how each step ran, including response data, timing
      metrics, and protocol-specific details. These values are only available
      when the step completes successfully.
    </p>
    <div
      class="cdoc__toggleable cdoc__hidden"
      data-description="not (Test Type is Browser) or (Test Type is Mobile) or (Test Type is Multistep API)"
      data-if="7424"
    >
      <div class="alert alert-info">
        <p>
          <strong>Note:</strong> Step execution details are only available for
          Multistep API, Browser, and Mobile tests. Select one of these test
          types to see step execution variables.
        </p>
      </div>
    </div>
    <div class="code-tabs">
      <ul class="nav nav-tabs d-flex"></ul>
      <div class="tab-content">
        <div
          data-lang="general-steps"
          class="tab-pane fade"
          role="tabpanel"
          title="General steps"
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
              <code>synthetics.attributes.variables.extracted.steps.type</code>
            </dt>
            <dd>Type of step being executed</dd>
          </dl>
          <div
            class="cdoc__toggleable"
            data-description="platform is browser"
            data-if="7425"
          >
            <p><strong>Browser-specific:</strong></p>
            <dl>
              <dt><code>{{synthetics.attributes.result.startUrl}}</code></dt>
              <dd>URL from test configuration</dd>
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
          <div
            class="cdoc__toggleable cdoc__hidden"
            data-description="platform is mobile"
            data-if="7426"
          >
            <p><strong>Mobile-specific:</strong></p>
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
          <div
            class="cdoc__toggleable cdoc__hidden"
            data-description="platform is multistep"
            data-if="7427"
          >
            <p><strong>Multistep-specific:</strong></p>
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
        <div
          data-lang="sub-tests"
          class="tab-pane fade"
          role="tabpanel"
          title="Sub-tests"
        >
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
            <dd>Nesting level (1 for subtests, 2 for subtests of subtests)</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
  <h2 id="step-summary">Step summary</h2>
  <p>Path: <code>synthetics.attributes.result.steps</code></p>
  <p>
    Access step data by index, name, or ID to reference specific steps in your
    notification messages. Use these reference methods when working with
    step-related variables throughout this documentation.
  </p>
  <p>
    Each step exposes the following properties: <code>.id</code>,
    <code>.status</code>, <code>.type</code>, <code>.duration</code>,
    <code>.description</code>, <code>.failure.message</code>,
    <code>.code</code>, and <code>.url</code>.
  </p>
  <p>You can reference steps in three ways:</p>
  <div class="code-tabs">
    <ul class="nav nav-tabs d-flex"></ul>
    <div class="tab-content">
      <div
        data-lang="by-index"
        class="tab-pane fade"
        role="tabpanel"
        title="By index"
      >
        <p>
          Use positive numbers to count from the beginning, or negative numbers
          to count from the end:
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
        <p>
          <strong>Example:</strong>
          <code>{{synthetics.attributes.result.steps.-1.status}}</code> returns
          the status of the last step.
        </p>
      </div>
      <div
        data-lang="by-name"
        class="tab-pane fade"
        role="tabpanel"
        title="By name"
      >
        <p>Use the step name in brackets:</p>
        <dl>
          <dt><code>synthetics.attributes.result.steps[Click button]</code></dt>
          <dd>References the step named &quot;Click button&quot;</dd>
        </dl>
        <p>
          <strong>Example:</strong>
          <code
            >{{synthetics.attributes.result.steps[Click button].status}}</code
          >
          returns the status of the step named &quot;Click button&quot;.
        </p>
      </div>
      <div
        data-lang="by-id"
        class="tab-pane fade"
        role="tabpanel"
        title="By ID"
      >
        <p>Use the step's unique identifier:</p>
        <dl>
          <dt><code>synthetics.attributes.result.steps.abc-def-ghi</code></dt>
          <dd>References the step with ID &quot;abc-def-ghi&quot;</dd>
        </dl>
        <p>
          <strong>Example:</strong>
          <code>{{synthetics.attributes.result.steps.abc-def-ghi.status}}</code>
          returns the status of the step with step ID &quot;abc-def-ghi&quot;.
        </p>
      </div>
    </div>
  </div>
  <div class="alert alert-tip">
    <p>
      Review the
      <a href="/synthetics/notifications/conditional_alerting/"
        >conditional alerting</a
      >
      page for an example of how to use the
      <code>synthetics.attributes.result.step</code> variable in a Slack
      notification based on a failed step.
    </p>
  </div>
  <h3 id="accessing-step-properties">Accessing step properties</h3>
  <p>Combine any reference method with a property:</p>
  <ul>
    <li>
      <code>{{synthetics.attributes.result.steps.-1.status}}</code> - Status of
      the last step
    </li>
    <li>
      <code>{{synthetics.attributes.result.steps[Click button].status}}</code> -
      Status of the step named &quot;Click button&quot;
    </li>
    <li>
      <code>{{synthetics.attributes.result.steps.abc-def-ghi.status}}</code> -
      Status of the step with step ID &quot;abc-def-ghi&quot;
    </li>
  </ul>
<h2 id="further-reading">Further reading</h2><div class="whatsnext"><p>Additional helpful documentation, links, and articles<!-- -->:</p><ul class="list-group"><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/monitors/manage/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn how to manage monitors</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/monitors/templates/"><span class="w-100 d-flex justify-content-between "><span class="text">Learn more about monitor templates</span><span class="badge badge-white pe-2 border-0">DOCUMENTATION</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a><a style="border-bottom:1px solid rgba(0, 0, 0, 0.125)" class="list-group-item list-group-item-white list-group-item-action d-flex justify-content-between align-items-center" href="http://localhost:1313/synthetics/guide/how-synthetics-monitors-trigger-alerts/"><span class="w-100 d-flex justify-content-between "><span class="text">Understanding Synthetic Monitor Alerting</span><span class="badge badge-white pe-2 border-0">GUIDE</span></span><picture class="img-fluid static"><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid static" srcSet="http://localhost:1313//images/icons/list-group-arrow.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more"/></picture><picture class="img-fluid hover"><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807&amp;dpr=2 2x" media="(min-width: 1200px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=670&amp;dpr=2 2x" media="(min-width: 992px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 759px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 630px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=496&amp;dpr=2 2x" media="(min-width: 530px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 361px)"/><source srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360 1x, http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=360&amp;dpr=2 2x" media="(min-width: 0px)"/><img class="img-fluid hover" srcSet="http://localhost:1313//images/icons/list-group-arrow-r.png?ch=Width,DPR&amp;fit=max&amp;auto=format&amp;w=807" alt="more" loading="lazy"/></picture></a></ul></div></article>
</div>
<div x-init='const initPage = () => { clientFiltersManager.initialize({    ifFunctionsByRef: {"7388":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"execution"},"v":true,"r":"7388"},"7389":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"test_metadata"},"v":false,"r":"7389"},"7393":{"m":"F","n":"n","p":{"0":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"7390"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"7391"}},"v":true,"r":"7392"}},"v":false,"r":"7393"},"7396":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"7394"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"7395"}},"v":true,"r":"7396"},"7397":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"7397"},"7398":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"7398"},"7399":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"device_info"},"v":false,"r":"7399"},"7400":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"execution_results"},"v":false,"r":"7400"},"7405":{"m":"F","n":"n","p":{"0":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"7401"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"7402"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"multistep"},"v":false,"r":"7403"}},"v":true,"r":"7404"}},"v":false,"r":"7405"},"7409":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"7406"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"7407"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"multistep"},"v":false,"r":"7408"}},"v":true,"r":"7409"},"7410":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"failed_step_info"},"v":false,"r":"7410"},"7411":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"local_global_variables"},"v":false,"r":"7411"},"7415":{"m":"F","n":"n","p":{"0":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"7412"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"7413"}},"v":true,"r":"7414"}},"v":false,"r":"7415"},"7418":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"7416"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"7417"}},"v":true,"r":"7418"},"7419":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"extracted"},"v":false,"r":"7419"},"7424":{"m":"F","n":"n","p":{"0":{"m":"F","n":"o","p":{"0":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"7420"},"1":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"7421"},"2":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"multistep"},"v":false,"r":"7422"}},"v":true,"r":"7423"}},"v":false,"r":"7424"},"7425":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"browser"},"v":true,"r":"7425"},"7426":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"mobile"},"v":false,"r":"7426"},"7427":{"m":"F","n":"e","p":{"0":{"m":"V","p":["platform"],"v":"browser"},"1":"multistep"},"v":false,"r":"7427"},"7428":{"m":"F","n":"e","p":{"0":{"m":"V","p":["synthetics_variables"],"v":"execution"},"1":"step"},"v":false,"r":"7428"}},    filtersManifest: {"filtersByTraitId":{"platform":{"config":{"trait_id":"platform","option_group_id":"synthetics_test_type_options","label":"Test Type"},"defaultValsByOptionGroupId":{"synthetics_test_type_options":"browser"}},"synthetics_variables":{"config":{"trait_id":"synthetics_variables","option_group_id":"synthetics_variables_options","label":"Variables"},"defaultValsByOptionGroupId":{"synthetics_variables_options":"execution"}}},"defaultValsByTraitId":{"platform":"browser","synthetics_variables":"execution"},"optionGroupsById":{"synthetics_test_type_options":[{"default":true,"id":"browser","label":"Browser"},{"id":"mobile","label":"Mobile"},{"id":"multistep","label":"Multistep API"}],"synthetics_variables_options":[{"default":true,"id":"execution","label":"Test execution"},{"id":"test_metadata","label":"Test Metadata"},{"id":"device_info","label":"Device Information"},{"id":"execution_results","label":"Execution Results"},{"id":"failed_step_info","label":"Failed Step Information"},{"id":"local_global_variables","label":"Local & Global Variables"},{"id":"extracted","label":"Extracted"},{"id":"step","label":"Step"}]}}  });}; if (document.readyState === "complete" || document.readyState === "interactive") {  setTimeout(initPage, 1);} else {  document.addEventListener("DOMContentLoaded", initPage);}'></div>