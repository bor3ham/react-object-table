function deserialize_cells(clipboardData) {
  var gridData = clipboardData.getData('react/object-grid');
  if (gridData) {
    return JSON.parse(gridData);
  }
  var tabbedData = clipboardData.getData('text/plain');
  if (tabbedData) {
    var rows = [];
    var lines = tabbedData.split('\n');
    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      var columns = [];
      var tabs = lines[lineIndex].split('\t');
      for (var tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
        columns.push(tabs[tabIndex]);
      }
      rows.push(columns);
    }
    return rows;
  }
  return [];
}

function string_value(value) {
  switch (typeof value) {
    case 'number':
      return value.toString();

    case 'object':
      if (Array.isArray(value)) {
        var stringValue = '';
        for (var valueIndex = 0; valueIndex < value.length; valueIndex++) {
          stringValue += string_value(value[valueIndex])
          if (valueIndex < value.length - 1)
            stringValue += ', ';
        }
        return stringValue;
      }

      if (value === null)
        return '';
      else
        return 'object';

    case 'boolean':
      if (value)
        return 'true';
      else
        return 'false';

    case 'string':
      return value;
  }
  return '';
}

export {
  deserialize_cells,
  string_value,
}
