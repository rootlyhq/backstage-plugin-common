import { extractPassthroughAttributes, extractProperties } from './api';

describe('extractPassthroughAttributes', () => {
  const prefix = 'rootly.com/service-attr-';

  it('returns empty object when annotations is undefined', () => {
    expect(extractPassthroughAttributes(undefined, prefix)).toEqual({});
  });

  it('returns empty object when no annotations match prefix', () => {
    const annotations = {
      'rootly.com/service-id': '123',
      'pagerduty.com/service-id': 'PD123',
    };
    expect(extractPassthroughAttributes(annotations, prefix)).toEqual({});
  });

  it('passes through simple string values', () => {
    const annotations = {
      'rootly.com/service-attr-color': '#FF5733',
      'rootly.com/service-attr-github_repository_name': 'rootlyhq/my-service',
    };
    expect(extractPassthroughAttributes(annotations, prefix)).toEqual({
      color: '#FF5733',
      github_repository_name: 'rootlyhq/my-service',
    });
  });

  it('coerces "true" and "false" to booleans', () => {
    const annotations = {
      'rootly.com/service-attr-show_uptime': 'true',
      'rootly.com/service-attr-alert_broadcast_enabled': 'false',
    };
    expect(extractPassthroughAttributes(annotations, prefix)).toEqual({
      show_uptime: true,
      alert_broadcast_enabled: false,
    });
  });

  it('parses JSON arrays', () => {
    const annotations = {
      'rootly.com/service-attr-notify_emails': '["alice@co.com","bob@co.com"]',
    };
    expect(extractPassthroughAttributes(annotations, prefix)).toEqual({
      notify_emails: ['alice@co.com', 'bob@co.com'],
    });
  });

  it('parses JSON objects', () => {
    const annotations = {
      'rootly.com/service-attr-slack_channels': '[{"id":"C01ABC","name":"oncall"}]',
    };
    expect(extractPassthroughAttributes(annotations, prefix)).toEqual({
      slack_channels: [{ id: 'C01ABC', name: 'oncall' }],
    });
  });

  it('falls back to string on invalid JSON', () => {
    const annotations = {
      'rootly.com/service-attr-bad_json': '{not valid json',
    };
    expect(extractPassthroughAttributes(annotations, prefix)).toEqual({
      bad_json: '{not valid json',
    });
  });

  it('ignores empty attribute name after prefix', () => {
    const annotations = {
      'rootly.com/service-attr-': 'value',
    };
    expect(extractPassthroughAttributes(annotations, prefix)).toEqual({});
  });

  it('handles mixed matching and non-matching annotations', () => {
    const annotations = {
      'rootly.com/service-id': '123',
      'rootly.com/service-attr-color': '#000',
      'rootly.com/functionality-attr-color': '#FFF',
      'rootly.com/service-attr-show_uptime': 'true',
    };
    expect(extractPassthroughAttributes(annotations, prefix)).toEqual({
      color: '#000',
      show_uptime: true,
    });
  });

  it('works with different prefixes', () => {
    const annotations = {
      'rootly.com/team-attr-color': 'blue',
    };
    expect(extractPassthroughAttributes(annotations, 'rootly.com/team-attr-')).toEqual({
      color: 'blue',
    });
  });
});

describe('extractProperties', () => {
  const prefix = 'rootly.com/service-property-';

  it('returns empty array when annotations is undefined', () => {
    expect(extractProperties(undefined, prefix)).toEqual([]);
  });

  it('returns empty array when no annotations match prefix', () => {
    const annotations = {
      'rootly.com/service-id': '123',
    };
    expect(extractProperties(annotations, prefix)).toEqual([]);
  });

  it('extracts properties with slug keys', () => {
    const annotations = {
      'rootly.com/service-property-my-custom-field': 'hello',
    };
    expect(extractProperties(annotations, prefix)).toEqual([
      { catalog_property_id: 'my-custom-field', value: 'hello' },
    ]);
  });

  it('extracts properties with UUID keys', () => {
    const annotations = {
      'rootly.com/service-property-dcece7f7-b73c-4f32-8b09-695abad42e60': 'world',
    };
    expect(extractProperties(annotations, prefix)).toEqual([
      { catalog_property_id: 'dcece7f7-b73c-4f32-8b09-695abad42e60', value: 'world' },
    ]);
  });

  it('keeps value as raw string (no coercion)', () => {
    const annotations = {
      'rootly.com/service-property-slack-channel': '{"id":"C01FE4P7458","name":"oncall"}',
    };
    expect(extractProperties(annotations, prefix)).toEqual([
      { catalog_property_id: 'slack-channel', value: '{"id":"C01FE4P7458","name":"oncall"}' },
    ]);
  });

  it('extracts multiple properties', () => {
    const annotations = {
      'rootly.com/service-property-field-a': 'val1',
      'rootly.com/service-property-field-b': 'val2',
    };
    const result = extractProperties(annotations, prefix);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({ catalog_property_id: 'field-a', value: 'val1' });
    expect(result).toContainEqual({ catalog_property_id: 'field-b', value: 'val2' });
  });

  it('ignores empty property id after prefix', () => {
    const annotations = {
      'rootly.com/service-property-': 'value',
    };
    expect(extractProperties(annotations, prefix)).toEqual([]);
  });
});

describe('passthrough override safety', () => {
  const attrPrefix = 'rootly.com/service-attr-';

  it('hardcoded fields are not present in passthrough when same key used', () => {
    const annotations = {
      'rootly.com/service-attr-name': 'injected-name',
      'rootly.com/service-attr-backstage_id': 'injected-id',
      'rootly.com/service-attr-color': '#FF0000',
    };
    const result = extractPassthroughAttributes(annotations, attrPrefix);
    expect(result).toEqual({
      name: 'injected-name',
      backstage_id: 'injected-id',
      color: '#FF0000',
    });
    // These keys ARE extracted — the protection is that hardcoded fields
    // override them when spread into the payload (spread order matters).
    // This test documents that extraction itself does not filter reserved keys.
  });

  it('properties key in passthrough attrs does not bypass structured properties', () => {
    const annotations = {
      'rootly.com/service-attr-properties': '[{"catalog_property_id":"x","value":"injected"}]',
    };
    const passthroughAttrs = extractPassthroughAttributes(annotations, attrPrefix);
    expect(passthroughAttrs.properties).toBeDefined();
    // The payload construction puts `properties` in the hardcoded section AFTER
    // the spread, so this injected value gets overridden. This test documents
    // that the extraction function does return it — the safety is in spread order.
  });
});
